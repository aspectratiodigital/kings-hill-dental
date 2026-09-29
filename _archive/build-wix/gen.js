// Generates static HTML/CSS from the multi-width Wix captures in ../_capture/data
const fs = require('fs');
const path = require('path');
const { fitScalar, fitString, expr, rs } = require('./fit');

const CAP = path.join(__dirname, '..', '_capture');

const OLD = !!process.env.OLD_TAGS;
const GROUPS = OLD ? [
  { g: 'd', samples: ['d1', 'd2', 'd3', 'd4', 'd5'], min: 1001, max: 1501, mq: null },
  { g: 't', samples: ['t1', 't2', 't3', 't4', 't5'], min: 751, max: 1000, mq: '(max-width:1000px)' },
  { g: 'm', samples: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'], min: 320, max: 750, mq: '(max-width:750px)' },
] : [
  { g: 'd', samples: ['d1024', 'd1100', 'd1200', 'd1280', 'd1300', 'd1366', 'd1400', 'd1440', 'd1500'], min: 1001, max: 1501, mq: null },
  { g: 't', samples: ['t760', 't768', 't820', 't880', 't940', 't1000'], min: 751, max: 1000, mq: '(max-width:1000px)' },
  { g: 'm', samples: ['m340', 'm360', 'm375', 'm390', 'm414', 'm430', 'm480', 'm540', 'm640', 'm740'], min: 320, max: 750, mq: '(max-width:750px)' },
];

const COLORS = {
  'rgb(255, 246, 236)': 'var(--cream)',
  'rgb(70, 28, 17)': 'var(--brown)',
  'rgb(224, 161, 146)': 'var(--pink)',
  'rgb(255, 208, 197)': 'var(--blush)',
  'rgb(188, 123, 105)': 'var(--rose)',
  'rgb(144, 88, 73)': 'var(--clay)',
  'rgb(118, 72, 60)': 'var(--umber)',
  'rgb(255, 154, 126)': 'var(--coral)',
};
const col = (c) => (c ? c.replace(/rgb\(\d+, \d+, \d+\)/g, (m) => COLORS[m] || m) : c);
const isTransparent = (c) => !c || /rgba?\(\s*\d+,\s*\d+,\s*\d+,\s*0\)/.test(c) || c === 'transparent';

const FONT_MAP = [
  [/^wfont_573543_dbb2/, 'var(--font-head)'],
  [/^mandioca/i, 'var(--font-body)'],
  [/^wf_ad8238/, 'var(--font-script)'],
  [/^wfont_9299a8/, 'var(--font-script)'],
  [/^madefor-display/, 'var(--font-display)'],
  [/^madefor-text/i, 'var(--font-text)'],
  [/^avenir-lt/, 'var(--font-avenir)'],
];
const fontFam = (f) => {
  for (const [re, v] of FONT_MAP) if (re.test(f)) return v;
  return `"${f}", var(--font-body)`;
};

// Wix ships SMIL path-morph frames with its animated icons; keep only start/end paths.
function leanSvg(h) {
  return h.replace(/<animate\b[^>]*>(?:<\/animate>)?/g, '').replace(/ data-testid="[^"]*"/g, '');
}

function loadPage(slug) {
  const d = JSON.parse(fs.readFileSync(path.join(CAP, process.env.DATA_DIR || 'data', slug + '.json'), 'utf8'));
  for (const s of Object.values(d.samples)) {
    for (const sec of s.secs) {
      for (const r of sec.recs) {
        if (r.svg !== undefined) r.svgHtml = leanSvg(s.svgs[r.svg]);
        if (r.html) r.html = r.html.replace(/<i data-svg="(\d+)"><\/i>/g, (m, i) => leanSvg(s.svgs[+i]));
      }
    }
  }
  const sp = path.join(CAP, process.env.DATA_DIR || 'data', slug + '.img.json');
  if (fs.existsSync(sp)) {
    const supp = JSON.parse(fs.readFileSync(sp, 'utf8'));
    for (const s of Object.values(d.samples)) for (const sec of s.secs) for (const r of sec.recs) if (r.img && supp[r.id]) r.isupp = supp[r.id];
  }
  return d;
}

const num = (s) => parseFloat(s);
const bwOf = (b) => (b ? parseFloat(b) : 0);

// ---------------------------------------------------------------------------
// Build a merged tree for one section id.
// ---------------------------------------------------------------------------
function buildSection(page, secId) {
  const nodes = new Map(); // key -> node
  const order = []; // keys in DOM order
  const sectionInfo = {};

  const sampleTags = Object.keys(page.samples);
  for (const tag of sampleTags) {
    const S = page.samples[tag];
    const sec = S.secs.find((x) => x.id === secId);
    if (!sec) continue;
    const g = tag[0];
    sectionInfo[tag] = { W: S.cw, h: sec.h, top: sec.top };
    const keyOf = (i) => (i < 0 ? 'ROOT' : sec.recs[i].key);
    for (const r of sec.recs) {
      let n = nodes.get(r.key);
      if (!n) {
        n = { key: r.key, byTag: {}, parentKey: keyOf(r.p), tag: r.tag };
        nodes.set(r.key, n);
        order.push(r.key);
      }
      n.byTag[tag] = { rec: r, W: S.cw, parentKey: keyOf(r.p) };
    }
  }
  // parents can differ between samples (collector timing); use the majority parent and re-express positions
  const absMemo = {};
  const absOf = (tag, key) => {
    if (key === 'ROOT') return { x: 0, y: 0 };
    const mk = tag + '|' + key;
    if (absMemo[mk]) return absMemo[mk];
    const nn = nodes.get(key); const bb = nn && nn.byTag[tag];
    if (!bb) return null;
    const p = absOf(tag, bb.parentKey);
    return (absMemo[mk] = p ? { x: bb.rec.x + p.x, y: bb.rec.y + p.y } : null);
  };
  const fixes = [];
  for (const n of nodes.values()) {
    const cands = new Set(Object.values(n.byTag).filter((b) => !b.rec.hid).map((b) => b.parentKey));
    if (cands.size < 2) continue;
    const score = (c) => c === 'ROOT' ? 1e9 : Object.keys(n.byTag).filter((t) => { const p = nodes.get(c); const pb = p && p.byTag[t]; return pb && !pb.rec.hid; }).length;
    const mode = [...cands].sort((p, q) => score(q) - score(p))[0];
    for (const [t, b] of Object.entries(n.byTag)) {
      if (b.parentKey === mode) continue;
      const a1 = absOf(t, n.key), pa = absOf(t, mode);
      if (a1 && pa && (mode === 'ROOT' || (nodes.get(mode).byTag[t] && !nodes.get(mode).byTag[t].rec.hid))) fixes.push([b, mode, a1.x - pa.x, a1.y - pa.y]);
    }
    n.parentKey = mode;
  }
  for (const [b, mode, x, y] of fixes) { b.rec.x = x; b.rec.y = y; b.parentKey = mode; }
  // preserve a stable DOM order: use first sample with most records
  return { nodes, order, sectionInfo, secId };
}

// ---------------------------------------------------------------------------
function tagsFor(g) {
  return GROUPS.find((x) => x.g === g).samples;
}

function visRecs(node, g) {
  return tagsFor(g).map((t) => node.byTag[t]).filter((x) => x && !x.rec.hid);
}

// ---------------------------------------------------------------------------
// Determine which nodes are full-bleed backgrounds.
// ---------------------------------------------------------------------------
function markBleed(sec) {
  const visualOf = (r) => (r.bgi || r.img || r.svg !== undefined || r.video || r.container || r.html !== undefined || !isTransparent(r.bg) || r.bt || r.bb || r.bl || r.br || r.sh || r.mask || r.clip);
  for (const k of sec.order) {
    const n = sec.nodes.get(k);
    n.bleed = false; n.skip = false;
    const p = n.parentKey === 'ROOT' ? null : sec.nodes.get(n.parentKey);
    const top = !p || p.bleed || p.skip;
    if (!top) continue;
    let all = true, any = false, vis = false;
    for (const t of Object.keys(n.byTag)) {
      const { rec, W } = n.byTag[t];
      if (rec.hid) continue;
      any = true;
      if (!(Math.abs(rec.x) <= 2 && Math.abs(rec.w - W) <= 3)) all = false;
      if (visualOf(rec)) vis = true;
    }
    if (any && all) {
      const r = Object.values(n.byTag).find((x) => !x.rec.hid).rec;
      if (!vis) n.skip = true;
      else if (r.html === undefined) n.bleed = true;
    }
  }
}

function attachTree(sec) {
  const kids = new Map();
  kids.set('ROOT', []);
  for (const k of sec.order) kids.set(k, []);
  for (const k of sec.order) {
    const n = sec.nodes.get(k);
    let pk = n.parentKey;
    n.offsetChain = [];
    while (pk !== 'ROOT' && sec.nodes.has(pk) && (sec.nodes.get(pk).bleed || sec.nodes.get(pk).skip)) {
      n.offsetChain.push(pk);
      pk = sec.nodes.get(pk).parentKey;
    }
    if (pk !== 'ROOT' && !sec.nodes.has(pk)) pk = 'ROOT';
    n.rparent = pk;
    kids.get(pk).push(k);
  }
  sec.kids = kids;
}

function measure(sec, node, tag, f) {
  const b = node.byTag[tag];
  if (!b || b.rec.hid) return null;
  let v = b.rec[f];
  // children are positioned from the parent's padding edge, measurements are from its border edge
  if ((f === 'x' || f === 'y') && node.rparent && node.rparent !== 'ROOT') {
    const pb = sec.nodes.get(node.rparent) && sec.nodes.get(node.rparent).byTag[tag];
    if (pb && !pb.rec.hid) {
      const bw = f === 'x' ? pb.rec.bl : pb.rec.bt;
      if (bw) v -= parseFloat(bw);
    }
  }
  if (node.offsetChain && node.offsetChain.length && (f === 'x' || f === 'y')) {
    for (const ok of node.offsetChain) {
      const pb = sec.nodes.get(ok).byTag[tag];
      if (pb) v += pb.rec[f];
    }
  }
  return v;
}

const lastTag = (g) => GROUPS.find((x) => x.g === g).samples.slice(-1)[0];
module.exports = { lastTag, GROUPS, loadPage, buildSection, markBleed, attachTree, measure, tagsFor, visRecs, col, isTransparent, fontFam, COLORS, bwOf, num };
