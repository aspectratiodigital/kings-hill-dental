// Build the static site from the Wix captures.
//   node build-wix/build.js [slug ...]
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const G = require('./gen');
const Rn = require('./render');
const { routeFor, hrefMap } = require('./routes');

const ROOT = path.join(__dirname, '..');
const CAP = path.join(ROOT, '_capture');
const OUT = path.join(ROOT, 'site');
const imgmap = JSON.parse(fs.readFileSync(path.join(CAP, 'imgmap.json'), 'utf8')); // wix file -> local rel path

// ---------------------------------------------------------------------------
// image registry: wix uri -> public path (files are copied by copyAssets)
// ---------------------------------------------------------------------------
const usedImages = new Map(); // uri -> outName
const usedBgs = new Map(); // remote url -> outName
function slugName(s) {
  return s.toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function imgPublic(uri) {
  if (usedImages.has(uri)) return '/assets/img/' + usedImages.get(uri);
  const local = imgmap[uri];
  const ext = path.extname(uri);
  let name;
  if (local) name = slugName(local.replace(/\//g, '-')) + ext.toLowerCase();
  else name = 'wix-' + uri.slice(7, 15) + ext.toLowerCase();
  usedImages.set(uri, name);
  return '/assets/img/' + name;
}
function bgPublic(url) {
  if (usedBgs.has(url)) return '/assets/img/' + usedBgs.get(url);
  const ext = (url.match(/\.(png|jpg|jpeg|webp|gif|svg)/i) || ['.png'])[0].toLowerCase();
  const name = 'bg-' + crypto.createHash('md5').update(url).digest('hex').slice(0, 8) + ext;
  usedBgs.set(url, name);
  return '/assets/img/' + name;
}
Rn.hooks.img = imgPublic;
Rn.hooks.href = (h) => hrefMap(h);
Rn.hooks.bgUrl = (v) => v.replace(/url\("?(https?:[^")]+)"?\)/g, (m, u) => `url("${bgPublic(u)}")`);

// ---------------------------------------------------------------------------
function buildPage(slug, opts = {}) {
  const page = G.loadPage(slug);
  const dTag = (page.samples.d1200 || page.samples.d2);
  const sections = dTag.secs.filter((s) => s.tag === 'SECTION');
  let html = '';
  const css = { d: [], t: [], m: [] };
  let n = 0;
  const ctx = { prefix: 's', nextClass: () => (++n).toString(36), keepHidden: false };
  sections.forEach((s, si) => {
    const sec = G.buildSection(page, s.id);
    G.markBleed(sec);
    G.attachTree(sec);
    const kids = sec.kids.get('ROOT');
    const bleedHtml = kids.filter((k) => sec.nodes.get(k).bleed).map((k) => Rn.emitNode(sec, k, ctx)).join('');
    const stageHtml = kids.filter((k) => !sec.nodes.get(k).bleed).map((k) => Rn.emitNode(sec, k, ctx)).join('');
    const layers = Rn.cssForNodes(sec, ctx);
    for (const g of ['d', 't', 'm']) css[g].push(...layers[g]);
    // section height per layout
    const secCls = `sec${si}`;
    for (const gr of G.GROUPS) {
      const pts = G.tagsFor(gr.g).map((t) => (sec.sectionInfo[t] ? { W: page.samples[t].cw, v: sec.sectionInfo[t].h } : null)).filter(Boolean);
      const fit = require('./fit').fitScalar(pts);
      css[gr.g].push(`.${secCls}{height:${require('./fit').expr(fit)}}`);
    }
    html += `<section id="${s.id.replace(/^comp-/, '')}" class="sec ${secCls}">${bleedHtml}<div class="stage">${stageHtml}</div></section>\n`;
  });
  return { html, css, title: page.title };
}

function writeCss(css) {
  const parts = [];
  parts.push(css.d.join('\n'));
  parts.push('@media (max-width:1000px){\n' + css.t.join('\n') + '\n}');
  parts.push('@media (max-width:750px){\n' + css.m.join('\n') + '\n}');
  return parts.join('\n');
}

module.exports = { buildPage, writeCss, usedImages, usedBgs, imgPublic, bgPublic };

if (require.main === module) {
  const slug = process.argv[2] || 'home-new';
  const { html, css, title } = buildPage(slug);
  fs.mkdirSync(path.join(OUT, 'assets', 'css'), { recursive: true });
  fs.writeFileSync(path.join(OUT, 'assets', 'css', 'page-test.css'), writeCss(css));
  fs.writeFileSync(path.join(OUT, 'test.html'), `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><link rel="stylesheet" href="/assets/css/base.css"><link rel="stylesheet" href="/assets/css/page-test.css"></head><body><div class="page"><main>${html}</main></div></body></html>`);
  console.log('written', html.length, 'bytes html;', usedImages.size, 'images;', usedBgs.size, 'bgs');
  fs.writeFileSync(path.join(ROOT, '_capture', 'used-assets.json'), JSON.stringify({ images: [...usedImages], bgs: [...usedBgs] }, null, 1));
}
