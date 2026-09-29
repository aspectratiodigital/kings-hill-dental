// Turns a merged section tree into HTML + responsive CSS.
const G = require('./gen');
const { fitScalar, fitString, expr, rs } = require('./fit');
const { GROUPS, measure, tagsFor, visRecs, col, isTransparent, fontFam, bwOf } = G;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// ---- link + image rewriting hooks (set by build) ---------------------------
const hooks = {
  href: (h) => h,
  img: (uri) => '/assets/img/' + uri,
  bgUrl: (u) => u,
};

function fitField(sec, node, g, f, opts = {}) {
  const pts = [];
  for (const t of tagsFor(g)) {
    const v = measure(sec, node, t, f);
    if (v === null || v === undefined) continue;
    pts.push({ W: node.byTag[t].W, v });
  }
  const fit = fitScalar(pts);
  return fit ? expr(fit) : null;
}

function fitStr(node, g, getter) {
  const pts = [];
  for (const t of tagsFor(g)) {
    const b = node.byTag[t];
    if (!b || b.rec.hid) continue;
    const v = getter(b.rec);
    pts.push({ W: b.W, v });
  }
  return fitString(pts);
}

function fitPx(node, g, getter) {
  const pts = [];
  for (const t of tagsFor(g)) {
    const b = node.byTag[t];
    if (!b || b.rec.hid) continue;
    const v = parseFloat(getter(b.rec));
    if (!Number.isNaN(v)) pts.push({ W: b.W, v });
  }
  const f = fitScalar(pts, 0.12);
  return f ? expr(f) : null;
}

function lastVis(node, g) {
  const v = visRecs(node, g);
  return v.length ? v[v.length - 1].rec : null;
}

function borderDecl(node, g, key, prop) {
  const recs = visRecs(node, g).filter((b) => b.rec[key]);
  if (!recs.length) return null;
  const last = recs[recs.length - 1].rec[key];
  const m = last.match(/^(-?[\d.]+)px (.*)$/);
  if (!m) return null;
  const widths = recs.map((b) => ({ W: b.W, v: parseFloat(b.rec[key]) }));
  const uniq = new Set(widths.map((w) => w.v));
  let wExpr;
  if (uniq.size === 1) wExpr = widths[0].v + 'px';
  else {
    // quantised integers: estimate the true width as (v + 0.5) scaled with W
    let num = 0, den = 0;
    for (const { W, v } of widths) { num += W * (v + 0.5); den += W * W; }
    wExpr = 'calc(' + rs(num / den) + ' * var(--W))';
  }
  return prop + ':' + wExpr + ' ' + col(m[2]);
}

// CSS declarations for one node in one layout group
function declsFor(sec, node, g, isRoot) {
  const r = lastVis(node, g);
  if (!r) return null;
  const d = new Map();
  const isText = r.html !== undefined;
  const push = (s) => { if (!s) return; const i = s.indexOf(':'); d.set(s.slice(0, i), s.slice(i + 1)); };

  const x = fitField(sec, node, g, 'x');
  const y = fitField(sec, node, g, 'y');
  const w = fitField(sec, node, g, 'w');
  const h = fitField(sec, node, g, 'h');
  if (node.bleed) {
    push('left:0'); push('width:100%');
    if (y) push(`top:${y}`);
    if (h) push(`height:${h}`);
  } else {
    if (x) push(`left:${x}`);
    if (y) push(`top:${y}`);
    if (w) push(`width:${w}`);
    const vertical = isText && r.font && r.font.wm !== 'horizontal-tb';
    if (h && (!isText || vertical || node.needsHeight)) push(`height:${h}`);
  }

  if (isText || r.input) {
    const f = r.font;
    push(`font-family:${fontFam(f.f)}`);
    const fs = fitPx(node, g, (rr) => rr.font.s) || fitStr(node, g, (rr) => rr.font.s);
    push(`font-size:${fs}`);
    if (f.lh !== 'normal') push(`line-height:${/^[\d.]+px$/.test(f.lh) ? fitPx(node, g, (rr) => rr.font.lh) : fitStr(node, g, (rr) => rr.font.lh)}`);
    if (f.w !== '400') push(`font-weight:${f.w}`);
    if (f.st !== 'normal') push(`font-style:${f.st}`);
    if (f.ls !== 'normal' && f.ls !== '0px') push(`letter-spacing:${fitStr(node, g, (rr) => rr.font.ls)}`);
    push(`color:${col(f.c)}`);
    if (f.ta !== 'start' && f.ta !== 'left') push(`text-align:${f.ta}`);
    if (f.tt !== 'none') push(`text-transform:${f.tt}`);
    if (f.wm !== 'horizontal-tb') push(`writing-mode:${f.wm}`);
    if (f.td && f.td !== 'none') push(`text-decoration:${f.td}`);
    const oneLine = f.wm === 'horizontal-tb' && !/\n|<br/.test(r.html || '') && visRecs(node, g).every((b) => { const bf = b.rec.font; const lh = bf.lh === 'normal' ? parseFloat(bf.s) * 1.3 : parseFloat(bf.lh); return b.rec.h <= lh * 1.45; });
    if (oneLine) push('white-space:nowrap');
    else if (f.ws && f.ws !== 'normal') push(`white-space:${f.ws}`);
    if (f.dsp === 'flex' || f.dsp === 'inline-flex') {
      push('display:flex');
      if (f.jc && f.jc !== 'normal') push(`justify-content:${f.jc}`);
      if (f.ai && f.ai !== 'normal') push(`align-items:${f.ai}`);
    }
    for (const [k, p] of [['pl', 'padding-left'], ['pr', 'padding-right'], ['pt', 'padding-top'], ['pb', 'padding-bottom']]) {
      if (f[k] && f[k] !== '0px') push(`${p}:${fitStr(node, g, (rr) => rr.font[k])}`);
    }
  }

  if (!isTransparent(r.bg)) push(`background-color:${col(r.bg)}`);
  if (r.bgi) {
    push(`background-image:${hooks.bgUrl(r.bgi)}`);
    if (r.bgs) {
      if (r.bgs.size && r.bgs.size !== 'auto') push(`background-size:${r.bgs.size}`);
      if (r.bgs.pos) push(`background-position:${r.bgs.pos}`);
      if (r.bgs.rep && r.bgs.rep !== 'repeat') push(`background-repeat:${r.bgs.rep}`);
      if (r.bgs.att && r.bgs.att !== 'scroll') push(`background-attachment:${r.bgs.att}`);
    }
  }
  push(borderDecl(node, g, 'bt', 'border-top'));
  push(borderDecl(node, g, 'bb', 'border-bottom'));
  push(borderDecl(node, g, 'bl', 'border-left'));
  push(borderDecl(node, g, 'br', 'border-right'));
  if (r.rad) push(`border-radius:${fitStr(node, g, (rr) => rr.rad || '0px')}`);
  if (r.sh) push(`box-shadow:${col(fitStr(node, g, (rr) => rr.sh || 'none'))}`);
  if (r.op) push(`opacity:${r.op}`);
  if (r.fl) push(`filter:${r.fl}`);
  if (r.bf) push(`backdrop-filter:${r.bf}`);
  if (r.ts) push(`text-shadow:${r.ts}`);
  if (r.mask) {
    push(`-webkit-mask-image:${r.mask}`); push(`mask-image:${r.mask}`);
    if (r.masks) { for (const p of ['-webkit-mask-', 'mask-']) { push(`${p}size:${r.masks.size}`); push(`${p}position:${r.masks.pos}`); push(`${p}repeat:${r.masks.rep}`); } }
  }
  if (r.clip) push(`clip-path:${r.clip}`);
  if (r.isupp && r.isupp.wmask) { push(`-webkit-mask-image:${r.isupp.wmask}`); push(`mask-image:${r.isupp.wmask}`); }
  if (r.isupp && r.isupp.wfl) push(`filter:${r.isupp.wfl}`);
  if (r.blend) push(`mix-blend-mode:${r.blend}`);
  if (r.ox && /auto|scroll/.test(r.ox + (r.oy || ''))) { push(`overflow-x:${r.ox}`); push(`overflow-y:${r.oy}`); push('scrollbar-width:none'); if (r.snap) push(`scroll-snap-type:${r.snap}`); }
  else if (r.ov) push(`overflow:${r.ov}`);
  if (r.tf && !(node.attrs && /data-mouse/.test(node.attrs))) {
    const m = r.tf.match(/matrix\(([^)]+)\)/);
    if (m) {
      const nums = m[1].split(',').map(Number);
      const pts = (i) => tagsFor(g).map((t) => node.byTag[t]).filter((b) => b && !b.rec.hid && b.rec.tf).map((b) => ({ W: b.W, v: Number(b.rec.tf.match(/matrix\(([^)]+)\)/)[1].split(',')[i]) }));
      const ex = fitScalar(pts(4));
      const fy = fitScalar(pts(5));
      const has = (f) => f && (Math.abs(f.a) > 0.05 || Math.abs(f.b) > 1e-5);
      let t = '';
      if (has(ex) || has(fy)) t = `translate(${ex && has(ex) ? expr(ex) : '0px'},${fy && has(fy) ? expr(fy) : '0px'}) `;
      push(`transform:${t}matrix(${rs(nums[0])},${rs(nums[1])},${rs(nums[2])},${rs(nums[3])},0,0)`);
    }
    if (r.tfo && r.w && r.h) {
      const [ox, oy] = r.tfo.split(' ').map(parseFloat);
      if (Math.abs(ox - r.w / 2) > 1 || Math.abs(oy - r.h / 2) > 1) push(`transform-origin:${rs((ox / r.w) * 100)}% ${rs((oy / r.h) * 100)}%`);
    }
  }
  if (r.z) push(`z-index:${r.z}`);
  if (r.ptr) push('cursor:pointer');
  if (r.trn) push(`transition:${r.trn.split(' ').slice(0, 3).join(' ').replace(/,\s*$/, '')}`);
  if (r.tag === 'svg') {}
  return d;
}

// ---------------------------------------------------------------------------
function svgWithClass(html, cls) {
  return html.replace(/^<svg/, `<svg class="${cls}" aria-hidden="true" focusable="false"`);
}

function attrLink(r) {
  let a = '';
  if (r.href) {
    a += ` href="${esc(hooks.href(r.href))}"`;
    if (/^https?:\/\//.test(r.href) && !/aspectratiodigitial\.wixstudio\.com/.test(r.href)) a += ' target="_blank" rel="noopener"';
  }
  return a;
}

function textHTML(html) {
  return html.replace(/<a href="([^"]*)"/g, (m, h) => `<a href="${esc(hooks.href(h))}"`);
}

// emit element markup (recursive)
function emitNode(sec, key, ctx) {
  const node = sec.nodes.get(key);
  const anyVisible = GROUPS.some((gr) => lastVis(node, gr.g));
  if (node.skip) return (sec.kids.get(key) || []).map((k) => emitNode(sec, k, ctx)).join('');
  if (!anyVisible && !ctx.keepHidden) return '';
  const idx = ctx.nextClass();
  node.cls = ctx.prefix + idx;
  const any = GROUPS.map((gr) => lastVis(node, gr.g)).find(Boolean);
  const r = any;
  const kids = (sec.kids.get(key) || []).map((k) => emitNode(sec, k, ctx)).join('');
  const cls = `o ${node.cls}${node.extraClass ? ' ' + node.extraClass : ''}`;
  const data = node.attrs ? ' ' + node.attrs : '';
  const idAttr = r.id ? ` data-c="${esc(r.id.replace(/^(img-)?comp-/, ''))}"` : '';
  if (r.svg !== undefined) return svgWithClass(r.svgHtml, cls);
  if (r.img) {
    const ib = r.imgbox;
    return `<div class="${cls}"${idAttr}${data}><img src="${esc(hooks.img(r.img.uri))}" alt="${esc(r.alt && !/\.(jpg|png|jpeg|webp)$/i.test(r.alt) ? r.alt : '')}" loading="lazy" decoding="async"></div>`;
  }
  if (r.video) return `<video class="${cls}" src="${esc(r.video)}" autoplay muted loop playsinline></video>`;
  if (r.input) {
    const ip = r.input;
    const cs = (ip.type === 'checkbox' || ip.type === 'radio') ? '' : '';
    if (ip.type === 'textarea' || r.tag === 'textarea') return `<textarea class="${cls} fld"${idAttr} name="${esc(ip.name || 'message')}" placeholder="${esc(ip.ph)}"${ip.req ? ' required' : ''} aria-label="${esc(ip.aria || ip.ph)}"></textarea>`;
    if (r.tag === 'select') return `<select class="${cls} fld"${idAttr} name="${esc(ip.name)}"></select>`;
    const itype = /^Phone/i.test(ip.aria || '') || /phone/i.test(ip.ph || '') ? 'tel' : ip.type;
    return `<input class="${cls} fld" type="${esc(itype)}" name="${esc(ip.name)}" placeholder="${esc(ip.ph)}"${ip.req ? ' required' : ''} aria-label="${esc(ip.aria || ip.ph)}"${idAttr}>`;
  }
  if (r.html !== undefined) {
    const tag = /^(h[1-6]|p|a|button|span|div|label)$/.test(r.tag) ? r.tag : 'div';
    const inner = textHTML(r.html);
    const isLink = tag === 'a';
    return `<${tag} class="${cls}"${idAttr}${isLink ? attrLink(r) : ''}${data}>${inner}${kids}</${tag}>`;
  }
  if (r.tag === 'a') return `<a class="${cls}"${idAttr}${attrLink(r)}${data}>${kids}</a>`;
  if (r.tag === 'button') return `<button class="${cls}" type="button"${idAttr}${data}>${kids}</button>`;
  if (r.tag === 'section' || r.tag === 'header' || r.tag === 'footer') return `<div class="${cls}"${idAttr}${data}>${kids}</div>`;
  return `<div class="${cls}"${idAttr}${data}>${kids}</div>`;
}

function cssForNodes(sec, ctx) {
  const layers = { d: [], t: [], m: [] };
  for (const k of sec.order) {
    const n = sec.nodes.get(k);
    if (!n.cls) continue;
    let prev = new Map(); // properties cascaded so far
    let hiddenBefore = false;
    for (const gr of GROUPS) {
      const m = declsFor(sec, n, gr.g, false);
      if (!m) {
        layers[gr.g].push(`.${n.cls}{display:none}`);
        hiddenBefore = true;
        continue;
      }
      const out = new Map(m);
      if (hiddenBefore && !out.has('display')) out.set('display', 'block');
      hiddenBefore = false;
      if (gr.g !== 'd') {
        for (const p of prev.keys()) if (!out.has(p) && p !== 'display') out.set(p, RESET[p] || 'initial');
      }
      for (const [p, v] of out) prev.set(p, v);
      layers[gr.g].push(`.${n.cls}{${[...out].map(([p, v]) => p + ':' + v).join(';')}}`);
      const lr = lastVis(n, gr.g);
      if (lr && lr.input && lr.font && lr.font.phc) layers[gr.g].push(`.${n.cls}::placeholder{color:${col(lr.font.phc)};opacity:1}`);
      if (lr && lr.snap) layers[gr.g].push(`.${n.cls}>.o{scroll-snap-align:start}`);
      const ir = imgRule(sec, n, gr.g);
      if (ir) layers[gr.g].push(`.${n.cls}>img{${ir}}`);
    }
  }
  return layers;
}

function imgRule(sec, node, g) {
  const r = lastVis(node, g);
  if (!r || !r.img) return null;
  const d = [];
  const boxes = tagsFor(g).map((t) => node.byTag[t]).filter((b) => b && !b.rec.hid && b.rec.imgbox);
  if (boxes.length) {
    const same = boxes.every((b) => Math.abs(b.rec.imgbox.x) < 1.5 && Math.abs(b.rec.imgbox.y) < 1.5 && Math.abs(b.rec.imgbox.w - b.rec.w) < 2 && Math.abs(b.rec.imgbox.h - b.rec.h) < 2);
    if (!same) {
      const fit = (f) => expr(require('./fit').fitScalar(boxes.map((b) => ({ W: b.W, v: b.rec.imgbox[f] }))));
      d.push('inset:auto', 'left:' + fit('x'), 'top:' + fit('y'), 'width:' + fit('w'), 'height:' + fit('h'));
    }
    const ib = r.imgbox;
    if (ib.fit && ib.fit !== 'cover') d.push('object-fit:' + ib.fit);
    if (ib.pos && ib.pos !== '50% 50%') d.push('object-position:' + ib.pos);
  }
  const s = r.isupp;
  if (s) {
    if (s.mask) { for (const p of ['-webkit-mask-', 'mask-']) { d.push(p + 'image:' + s.mask, p + 'size:' + s.size, p + 'position:' + s.pos, p + 'repeat:' + s.rep); } }
    if (s.fl) d.push('filter:' + s.fl);
    if (s.op) d.push('opacity:' + s.op);
  }
  return d.join(';');
}

const RESET = { 'background-color': 'transparent', 'border-top': '0', 'border-bottom': '0', 'border-left': '0', 'border-right': '0', 'border-radius': '0', 'box-shadow': 'none', 'opacity': '1', 'filter': 'none', 'transform': 'none', 'overflow': 'visible', 'z-index': 'auto', 'text-align': 'start', 'text-transform': 'none', 'writing-mode': 'horizontal-tb', 'font-weight': '400', 'font-style': 'normal', 'letter-spacing': 'normal', 'line-height': 'normal', 'white-space': 'normal', 'background-image': 'none' };

module.exports = { hooks, emitNode, cssForNodes, fitField, lastVis, declsFor, esc };
