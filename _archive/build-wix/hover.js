// Turn captured hover diffs (../_capture/hover/<slug>.json) into :hover CSS
const fs = require('fs');
const path = require('path');
const { expr, fitScalar, rs } = require('./fit');
const G = require('./gen');
const R = require('./render');

const CAP = path.join(__dirname, '..', '_capture');

function loadHover(slug) {
  const f = path.join(CAP, 'hover', slug + '.json');
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : [];
}

function nodeById(sec, id) {
  if (!id) return null;
  for (const n of sec.nodes.values()) if (Object.values(n.byTag).some((b) => b.rec.id === id)) return n;
  return null;
}
function lca(sec, nodes) {
  if (!nodes.length) return null;
  const chain = (n) => { const out = []; for (let k = n.key; k && k !== 'ROOT'; ) { out.push(k); const p = sec.nodes.get(k); k = p ? p.parentKey : null; } return out; };
  let common = chain(nodes[0]);
  for (const n of nodes.slice(1)) { const c = new Set(chain(n)); common = common.filter((k) => c.has(k)); }
  const k = common.find((x) => !nodes.some((n) => n.key === x)) || common[0];
  return k ? sec.nodes.get(k) : null;
}
function isDesc(sec, n, anc) {
  for (let k = n.parentKey; k && k !== 'ROOT'; ) {
    if (k === anc.key) return true;
    const p = sec.nodes.get(k);
    k = p ? p.parentKey : null;
  }
  return false;
}

const PROP_MAP = {
  op: 'opacity', bg: 'background-color', sh: 'box-shadow', fl: 'filter',
  bt: 'border-top', bb: 'border-bottom', bl: 'border-left', br: 'border-right', rad: 'border-radius',
  'font.c': 'color', 'font.td': 'text-decoration', 'font.w': 'font-weight',
};

function baseExpr(sec, n, f) {
  const pts = G.tagsFor('d').map((t) => {
    const v = G.measure(sec, n, t, f);
    return v === null ? null : { W: n.byTag[t].W, v };
  }).filter(Boolean);
  const fit = fitScalar(pts);
  return fit ? expr(fit) : null;
}

// returns css text for one section
function hoverCssForSection(sec, entries, secId, secClass) {
  const rules = new Map();
  const needTransition = new Set();
  const add = (sel, prop, val) => {
    if (!rules.has(sel)) rules.set(sel, new Map());
    rules.get(sel).set(prop, val);
  };
  for (const e of entries) {
    const changes = e.changes.filter((c) => c.sec === secId);
    if (!changes.length) continue;
    let trig = nodeById(sec, e.trigger.id);
    if (!trig) {
      const c0 = /^(A|BUTTON)$/.test(e.trigger.tag) ? changes.find((c) => /^(a|button)$/.test(c.tag)) : null;
      if (c0) trig = sec.nodes.get(c0.key);
    }
    if (!trig && secId === 'comp-mshdwe32' && e.trigger.why === 'trig') trig = lca(sec, changes.map((c) => sec.nodes.get(c.key)).filter(Boolean));
    if (secId === 'comp-mshdwe32' && trig && !trig.cls && trig.parentKey === 'ROOT' && secClass) trig = { key: trig.key, cls: secClass };
    if (!trig || !trig.cls) continue;
    for (const c of changes) {
      const n = sec.nodes.get(c.key);
      if (!n || !n.cls) continue;
      let sel;
      if (n === trig) sel = `.${trig.cls}:hover`;
      else if (isDesc(sec, n, trig)) sel = `.${trig.cls}:hover .${n.cls}`;
      else continue;
      // inner image opacity
      if (c.ch['img.op']) { add(sel + '>img', 'opacity', c.ch['img.op'][1]); needTransition.add(n.cls + '>img'); }
      for (const [k, v] of Object.entries(c.ch)) {
        const p = PROP_MAP[k];
        if (!p) continue;
        let val = v[1];
        if (val === '' || val === undefined) { val = p === 'transform' ? 'none' : p === 'opacity' ? '1' : val; }
        if (val === '') continue;
        if (typeof val === 'string') val = R.hooks.bgUrl ? val : val;
        add(sel, p, String(val).replace(/rgb\(\d+, \d+, \d+\)/g, (m) => G.col(m)));
        needTransition.add(n.cls);
      }
      // geometry (only when no transform change explains it)
      let moved = false;
      if (secId === 'comp-mshdwe32' && (c.ch.x || c.ch.y)) {
        // layout shifts in a card that rests rotated/translated: the real change is the ancestor's transform going away
        let top = null;
        for (let a = n; a; a = sec.nodes.get(a.parentKey)) {
          const lv = Object.values(a.byTag).filter((b) => !b.rec.hid).pop();
          if (a.cls && lv && lv.rec.tf && /matrix/.test(lv.rec.tf) && (a === trig || isDesc(sec, a, trig))) top = a;
        }
        if (top) { add('.' + trig.cls + ':hover .' + top.cls, 'transform', 'none'); needTransition.add(top.cls); moved = true; }
      }
    }
  }
  const out = [];
  for (const [sel, props] of rules) out.push(`${sel}{${[...props].map(([p, v]) => p + ':' + v).join(';')}}`);
  const tr = [...needTransition].map((c) => `.${c}`).join(',');
  return { css: out.length ? `@media (hover:hover){\n${out.join('\n')}\n}` : '', transition: tr };
}

module.exports = { loadHover, hoverCssForSection };
