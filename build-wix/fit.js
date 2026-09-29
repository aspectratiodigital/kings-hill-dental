// Numeric helpers: turn measurements taken at several container widths into CSS
// expressions of the form  calc(A px + B * var(--W)).

const r2 = (n) => Math.round(n * 100) / 100;
const rs = (n) => {
  if (n === 0) return '0';
  const s = Number(n.toPrecision(5));
  return String(s);
};

// points: [[W, v], ...]  ->  { a, b } such that v ≈ a + b*W
function fitPoints(points) {
  if (points.length === 1) return { a: points[0][1], b: 0 };
  const n = points.length;
  const mw = points.reduce((s, p) => s + p[0], 0) / n;
  const mv = points.reduce((s, p) => s + p[1], 0) / n;
  let sxx = 0, sxy = 0;
  for (const [w, v] of points) { sxx += (w - mw) * (w - mw); sxy += (w - mw) * (v - mv); }
  const spread = Math.max(...points.map((p) => p[1])) - Math.min(...points.map((p) => p[1]));
  if (spread <= 0.6) return { a: mv, b: 0 }; // constant
  let b = sxx ? sxy / sxx : 0;
  let a = mv - b * mw;
  if (Math.abs(a) <= 1.2) { // proportional to width
    let num = 0, den = 0;
    for (const [w, v] of points) { num += w * v; den += w * w; }
    return { a: 0, b: num / den };
  }
  return { a, b };
}

// Build CSS length from {a,b}
function expr(fit) {
  if (fit && fit.kind === 'pw') {
    const p = fit.pts;
    let out = rs(r2(p[0][1])) + 'px';
    for (let i = 0; i < p.length - 1; i++) {
      const dW = p[i + 1][0] - p[i][0];
      const sl = (p[i + 1][1] - p[i][1]) / dW;
      if (Math.abs(sl) < 1e-4) continue;
      const d = 'var(--W) - ' + rs(p[i][0]) + 'px';
      const t = i === 0 ? 'min(' + d + ',' + rs(dW) + 'px)' : i === p.length - 2 ? 'max(' + d + ',0px)' : 'clamp(0px,' + d + ',' + rs(dW) + 'px)';
      out += ' + ' + rs(sl) + ' * ' + t;
    }
    return 'calc(' + out + ')';
  }
  if (fit && fit.kind) return `${fit.kind}(${fit.parts.map(expr).join(',')})`;
  const { a, b } = fit;
  if (!b) return `${rs(r2(a))}px`;
  if (!a) return `calc(${rs(b)} * var(--W))`;
  return `calc(${rs(r2(a))}px + ${rs(b)} * var(--W))`;
}

const PW_TOL = 2.5;
const evalLine = (l, W) => l.a + l.b * W;
// Robust scalar fit: a single line, or max()/min() of two lines when the
// quantity is content-driven at one end of the range.
function fitScalar(samples, scale = 1) {
  const pts = samples.filter((s) => s.v !== null && s.v !== undefined && !Number.isNaN(s.v)).map((s) => [s.W, s.v]).sort((p, q) => p[0] - q[0]);
  if (!pts.length) return null;
  const L = fitPoints(pts);
  if (pts.length < 4) return L;
  const err = (fn) => Math.max(...pts.map(([w, v]) => Math.abs(fn(w) - v)));
  const e0 = err((w) => evalLine(L, w));
  if (e0 <= 1 * scale) return L;
  let best = { e: e0, fit: L };
  for (let k = 1; k <= pts.length - 3 + 1; k++) {
    const left = pts.slice(0, k + 1), right = pts.slice(k);
    if (left.length < 2 || right.length < 2) continue;
    const l1 = fitLS(left), l2 = fitLS(right);
    for (const kind of ['max', 'min']) {
      const fn = kind === 'max' ? (w) => Math.max(evalLine(l1, w), evalLine(l2, w)) : (w) => Math.min(evalLine(l1, w), evalLine(l2, w));
      const e = err(fn);
      if (e < best.e - 0.5 * scale) best = { e, fit: { kind, parts: [l1, l2] } };
    }
  }
  if (best.e > PW_TOL * scale && pts.length >= 4) return { kind: 'pw', pts: pts.map((p) => [p[0], p[1]]) };
  return best.fit;
}
// plain least squares (no proportional snapping)
function fitLS(points) {
  const n = points.length;
  if (n === 1) return { a: points[0][1], b: 0 };
  const mw = points.reduce((s, p) => s + p[0], 0) / n, mv = points.reduce((s, p) => s + p[1], 0) / n;
  let sxx = 0, sxy = 0;
  for (const [w, v] of points) { sxx += (w - mw) * (w - mw); sxy += (w - mw) * (v - mv); }
  const b = sxx ? sxy / sxx : 0;
  return { a: mv - b * mw, b };
}

const PX = /(-?\d*\.?\d+)px/g;

// Fit every "<n>px" token inside a CSS string across samples. Falls back to the
// last string when token counts differ.
function fitString(samples) {
  const list = samples.filter((s) => s.v !== null && s.v !== undefined);
  if (!list.length) return null;
  const last = list[list.length - 1].v;
  const toks = list.map((s) => [...s.v.matchAll(PX)].map((m) => parseFloat(m[1])));
  const n = toks[0].length;
  if (!toks.every((t) => t.length === n) || list.length === 1 || n === 0) {
    return last.replace(PX, (m, num) => `${rs(parseFloat(num))}px`);
  }
  const fits = [];
  for (let i = 0; i < n; i++) fits.push(fitPoints(list.map((s, j) => [s.W, toks[j][i]])));
  let i = 0;
  return last.replace(PX, () => {
    const f = fits[i++];
    const e = expr(f);
    return e.startsWith('calc(') ? e : e;
  });
}

module.exports = { fitPoints, fitScalar, fitString, expr, r2, rs };
