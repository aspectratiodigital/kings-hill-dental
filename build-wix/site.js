// Full site build
const fs = require('fs');
const path = require('path');
const G = require('./gen');
const Rn = require('./render');
const B = require('./build');
const { fitScalar, expr } = require('./fit');
const { SLUG_ROUTES } = require('./routes');
const { copyAssets } = require('./assets');
const M = require('./motion');
const Hv = require('./hover');
const L = require('./links');
const { nativeTeam } = require('./team');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'site');
const pages = require(path.join(ROOT, '_capture', 'pages.json'));

function cssText(layers) {
  return layers.d.join('\n') + '\n@media (max-width:1000px){\n' + layers.t.join('\n') + '\n}\n@media (max-width:750px){\n' + layers.m.join('\n') + '\n}\n';
}

function renderSection(page, secId, prefix, className, extra = {}) {
  const sec = G.buildSection(page, secId);
  G.markBleed(sec);
  G.attachTree(sec);
  if (extra.annotate) extra.annotate(sec);
  if (extra.motion) M.attachAnimations(sec, extra.motion);
  let n = 0;
  const ctx = { prefix, nextClass: () => (++n).toString(36), keepHidden: false };
  const kids = sec.kids.get('ROOT');
  const bleed = kids.filter((k) => sec.nodes.get(k).bleed).map((k) => Rn.emitNode(sec, k, ctx)).join('');
  const stage = kids.filter((k) => !sec.nodes.get(k).bleed).map((k) => Rn.emitNode(sec, k, ctx)).join('');
  const layers = Rn.cssForNodes(sec, ctx);
  for (const gr of G.GROUPS) {
    const pts = G.tagsFor(gr.g).map((t) => (sec.sectionInfo[t] ? { W: page.samples[t].cw, v: sec.sectionInfo[t].h } : null)).filter(Boolean);
    layers[gr.g].push(`.${className}{height:${expr(fitScalar(pts))}}`);
  }
  if (extra.hover) {
    const h = Hv.hoverCssForSection(sec, extra.hover, secId, className);
    const hasTrans = new Set();
    for (const r of layers.d) { const m = r.match(/^.(S+?){[^}]*transition:/); if (m) hasTrans.add(m[1]); }
    const tcls = h.transition.split(',').filter(Boolean).map((c) => c.slice(1)).filter((c) => !hasTrans.has(c.replace(/>img$/, '')) || /img$/.test(c));
    if (tcls.length) layers.d.push(tcls.map((c) => '.' + c).join(',') + '{transition:all .3s ease}');
    if (h.css) layers.d.push(h.css);
  }
  // sticky sections (Wix "stacking" effect)
  for (const gr of G.GROUPS) {
    const t = G.tagsFor(gr.g).slice(-1)[0];
    const S = page.samples[t];
    const ss = S && S.secs.find((x) => x.id === secId);
    const sticky = ss && ss.recs.some((r) => r.tag === 'section' && r.pos === 'sticky');
    layers[gr.g].push(`.${className}{position:${sticky ? 'sticky' : 'relative'};${sticky ? 'top:0;' : ''}}`);
  }
  return { bleed, stage, layers, sec };
}

const BGDATA = JSON.parse(fs.readFileSync(path.join(ROOT, '_capture', 'bgdata.json'), 'utf8'));
function sectionTexture(slug, secId) {
  const list = (BGDATA[slug] && BGDATA[slug].bgs) || [];
  const b = list.find((x) => x.id === 'bgImgOverlay_' + secId);
  if (!b) return '';
  const url = (b.bgi.match(/url\("?([^")]+)"?\)/) || [])[1];
  if (!url) return '';
  const local = B.bgPublic(url);
  const st = [`background-image:url(&quot;${local}&quot;)`];
  if (b.rep && b.rep !== 'repeat') st.push('background-repeat:' + b.rep);
  if (b.size && b.size !== 'auto') st.push('background-size:' + b.size);
  if (b.pos && b.pos !== '0% 0%') st.push('background-position:' + b.pos);
  return `<div class="secbg" style="${st.join(';')}"></div>`;
}

function accordionFees(html) {
  const A = JSON.parse(fs.readFileSync(path.join(ROOT, '_capture', 'acc-fees.json'), 'utf8')).d2[0];
  const dec = (t) => t.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'");
  let n = 0;
  html = html.replace(/<div class="o (\w+)"><span class="o (\w+)">([^<]*)<\/span><svg class="o/g, (m, a, b, t) => {
    const i = A.titles.indexOf(dec(t));
    if (i < 0) return m;
    n++;
    return `<div class="o ${a}" data-acc="${i}"><span class="o ${b}">${t}</span><svg class="o`;
  });
  if (n !== A.titles.length) console.log('WARN fees accordion items', n, '/', A.titles.length);
  return html + '<script type="application/json" id="acc-data">' + JSON.stringify(A.tables) + '</script><script src="/assets/js/acc.js" defer></script>';
}

function contactMap(page) {
  const SEC = 'comp-mr21pufw';
  const rec4 = (t) => page.samples[t].secs.find((x) => x.id === SEC).recs.find((r) => r.key.includes('comp-mr21r1xf2'));
  const css = { d: '', t: '', m: '' };
  const fit = (g, fn) => expr(fitScalar(G.tagsFor(g).map((t) => ({ W: page.samples[t].cw, v: fn(rec4(t), page.samples[t]) }))));
  css.d = `.cmap{left:calc(0.016 * var(--W));top:calc((100% - 585.56px) / 2);width:calc(0.515 * var(--W));height:585.56px}`;
  css.t = `.cmap{left:calc(0.0145 * var(--W));top:${fit('t', (r) => r.y)};width:calc(0.5046 * var(--W));height:500px}`;
  css.m = `.cmap{left:calc(0.0556 * var(--W));top:${fit('m', (r, S) => r.y + r.h + 0.05 * S.cw)};width:calc(0.889 * var(--W));height:325px}`;
  const html = '<div class="o cmap"><iframe title="Map showing Kings Hill Dental" src="https://www.google.com/maps?q=Kings+Hill+Clinic,+Suite+14,+10+Churchill+Square,+Kings+Hill,+West+Malling,+ME19+4YU&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>';
  return { html, css };
}

const TILE_BTNS = ['mpzfgz4r', 'mpzheerg', 'mpzheql9', 'mpzhf2ja', 'mpzhfjtk', 'mpzhgck4', 'mpzhgouu', 'mpzhh0cu', 'mpzhh6rw', 'mpzhhjqa', 'mpzhhref', 'mpzhhyjw'];
const TILE_IMGS = ['mpzohev0', 'mpzhwzs4', 'mpzi1gzd', 'mpzi8a7f', 'mpziib04', 'mpzilu2p', 'mpzit22r', 'mpzitpne', 'mpziubyh', 'mpzivl4z', 'mpziv3h6', 'mpziwhuf'];
const STREETVIEW = 'https://www.google.com/maps/embed?pb=!4v1780588251079!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ2Mwc0thcFFF!2m2!1d51.27284324136546!2d0.3971868508402939!3f213.80807936468835!4f-17.75704165562172!5f0.7820865974627469';
function aboutPractice(html) {
  TILE_BTNS.forEach((id, i) => { html = html.replace(new RegExp('(<button class="o \\w+" type="button" data-c="' + id + '")'), '$1 data-tile="' + i + '"'); });
  TILE_IMGS.forEach((id, i) => { html = html.replace(new RegExp('(<div class="o \\w+" data-c="' + id + '")'), '$1 data-tile-img="' + i + '"'); });
  html = html.replace(/(Children(?:'|&#39;|’)s Area<\/span><\/button>)<div class="o (\w+)"><\/div>/, '$1<div class="o $2" data-tile-frame><iframe title="360 view of Kings Hill Dental" src="' + STREETVIEW + '" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe></div>');
  return html;
}

const MGAL = [['entrance', 'Entrance'], ['exterior', 'Exterior'], ['reception', 'Reception'], ['reception-closeup', 'Reception Close-Up'], ['waiting-room', 'Waiting Room'], ['waiting-room-closeup', 'Waiting Room Close-Up'], ['consultation', 'Consultation'], ['main-room-2', 'The Practice'], ['the-practice', 'The Practice 2'], ['main-room-4', 'The Practice 3'], ['main-room-3', 'The Practice 4'], ['children-s-area', "Children’s Area"]];
function mobileGallery() {
  const slides = MGAL.map(([f, t]) => `<div class="mgal__slide"><img src="/assets/img/practice-${f}.jpg" alt="${t}" loading="lazy" decoding="async"><div class="mgal__capbox"><span class="mgal__cap">${t}</span></div></div>`).join('');
  return `<div class="o mgal" data-mgal><div class="mgal__track">${slides}</div><button type="button" class="mgal__btn mgal__prev" aria-label="Previous photo" hidden><svg viewBox="0 0 12.3 20.8" aria-hidden="true"><path d="M10.5 1.3L1.8 10.4l8.7 9.1" fill="none" stroke="#461c11" stroke-width="1.6"/></svg></button><button type="button" class="mgal__btn mgal__next" aria-label="Next photo"><svg viewBox="0 0 12.3 20.8" aria-hidden="true"><path d="M1.8 1.3l8.7 9.1-8.7 9.1" fill="none" stroke="#461c11" stroke-width="1.6"/></svg></button></div>`;
}

const SERVICE_LINKS = { 'Orthodontics': '/dentistry/orthodontic/', 'Dental Restoration': '/dentistry/restorative/', 'Dental Hygiene': '/dentistry/general-preventative/hygiene-gum-health/', 'Aesthetics': '/aesthetics/' };
function fixServices(html) {
  for (const [name, href] of Object.entries(SERVICE_LINKS)) {
    html = html.replace(new RegExp('<a href="[^"]*">' + name + '</a>', 'g'), '<a href="' + href + '">' + name + '</a>');
    html = html.replace(new RegExp('(<h6 class="o \\w+">)' + name + '(</h6>)', 'g'), '$1<a href="' + href + '">' + name + '</a>$2');
  }
  return html;
}

function buildPageSlug(slug, sIdx) {
  const page = G.loadPage(slug);
  const d2 = page.samples[G.lastTag('d')];
  const secs = d2.secs.filter((s) => s.tag === 'SECTION');
  const all = { d: [], t: [], m: [] };
  let html = '';
  const motion = M.loadMotion(slug);
  const hover = Hv.loadHover(slug);
  secs.forEach((s, i) => {
    if (slug === 'home-new' && s.id === 'comp-mshdwdou') return;
    if (slug === 'about' && s.id === 'comp-mpy355ua') { html += `<section id="team" class="sec team">${nativeTeam(page, s.id)}</section>
`; return; }
    const cn = `p${sIdx}s${i}`;
    const r = renderSection(page, s.id, `p${sIdx}s${i}_`, cn, { motion, hover });
    for (const g of ['d', 't', 'm']) all[g].push(...r.layers[g]);
    if (slug === 'referrals') {
      const tels = [...r.stage.matchAll(/<input class="o (\w+) fld" type="tel"/g)];
      if (tels[1]) {
        const cls = tels[1][1];
        r.stage = r.stage.replace(tels[1][0], '<img class="o flag-gb" src="/assets/img/flag-gbr.png" alt="" width="25" height="16">' + tels[1][0]);
        for (const g of ['d', 't', 'm']) {
          const rule = r.layers[g].find((l) => l.startsWith('.' + cls + '{'));
          if (!rule) continue;
          const v = (k) => (rule.match(new RegExp('[{;]' + k + ':((?:[^;}(]|\\((?:[^()]|\\([^()]*\\))*\\))*)')) || [])[1];
          all[g].push('.' + cn + ' .flag-gb{left:calc(' + v('left') + ' - 43px);top:calc(' + v('top') + ' + (' + v('height') + ' - 16px) / 2)}');
        }
      }
    }
    if (slug === 'contact' && s.id === 'comp-mr21pufw') {
      const cm = contactMap(page);
      r.stage += cm.html;
      for (const g of ['d', 't', 'm']) all[g].push('.' + cn + ' ' + cm.css[g]);
    }
    if (slug === 'about' && s.id === 'comp-mpzdnims') {
      r.stage += mobileGallery();
      all.m.push(`.${cn}{height:calc(1.432 * var(--W))}`);
      all.m.push(`.${cn} .mgal{display:block;left:calc(0.0556 * var(--W));top:calc(0.2241 * var(--W));width:calc(0.889 * var(--W));height:calc(0.5 * var(--W))}`);
      all.m.push(`.${cn} .mgal__cap{font-size:calc(0.2513 * var(--W))}`);
    }
    html += `<section id="${s.id.replace(/^comp-/, '')}" class="sec ${cn}">${r.bleed}${r.layers.d.some((l) => l.includes("/assets/img/bg-")) ? '' : sectionTexture(slug, s.id)}<div class="stage">${r.stage}</div></section>\n`;
  });
  return { html, css: cssText(all), title: page.title };
}

const NAV_TEXT = { ABOUT: 'about', DENTISTRY: 'dentistry', AESTHETICS: 'aesthetics', FEES: 'fees', REFERRALS: 'referrals', CONTACT: 'contact' };
function annotateHeader(sec) {
  for (const n of sec.nodes.values()) {
    const rec = Object.values(n.byTag).map((b) => b.rec).find((r) => r.html !== undefined);
    if (rec) {
      const t = rec.html.replace(/<[^>]+>/g, '').trim();
      if (NAV_TEXT[t]) {
        const p = sec.nodes.get(n.parentKey);
        if (p && !p.attrs) p.attrs = 'data-nav="' + NAV_TEXT[t] + '"';
      }
    }
    if (Object.values(n.byTag).some((b) => b.rec.btn && !b.rec.hid) || (n.tag === 'button' && !n.attrs)) {
      const kids = [...sec.nodes.values()].filter((k) => k.parentKey === n.key);
      if (kids.some((k) => Object.values(k.byTag).some((b) => b.rec.html && /Menu/.test(b.rec.html)))) n.attrs = 'data-menu-btn aria-label="Open menu"';
      if (kids.some((k) => Object.values(k.byTag).some((b) => b.rec.html && /Search/.test(b.rec.html)))) n.attrs = 'data-search-btn aria-label="Search"';
    }
  }
}

const DD = JSON.parse(fs.readFileSync(path.join(ROOT, '_capture', 'dd-data.json'), 'utf8'));
const { hrefMap } = require('./routes');
function buildDropdowns() {
  let html = '';
  const css = [];
  const fx = (a, b) => expr(fitScalar([{ W: 1100, v: a }, { W: 1500, v: b }]));
  for (const [name, slug] of [['DENTISTRY', 'dentistry'], ['AESTHETICS', 'aesthetics'], ['FEES', 'fees']]) {
    const A = DD['1100'][name], B = DD['1500'][name];
    const cls = 'dd-' + slug;
    css.push(`.${cls}{left:${fx(A.dd[0], B.dd[0])};top:${fx(A.dd[1], B.dd[1])};width:${fx(A.dd[2], B.dd[2])};height:${fx(A.dd[3], B.dd[3])}}`);
    let links = '';
    A.links.forEach((la, i) => {
      const lb = B.links[i];
      const c = `${cls}-${i}`;
      css.push(`.${c}{left:${fx(la.a[0] - A.dd[0], lb.a[0] - B.dd[0])};top:${fx(la.a[1] - A.dd[1], lb.a[1] - B.dd[1])};width:${fx(la.a[2], lb.a[2])};font-size:${fx(parseFloat(la.fs), parseFloat(lb.fs))};${la.lh !== 'normal' ? 'line-height:' + fx(parseFloat(la.lh), parseFloat(lb.lh)) + ';' : ''}font-weight:${la.fw}}`);
      links += `<a class="o dd-a ${c}" href="${hrefMap(la.href)}">${Rn.esc(la.t).replace(/&amp;/g, '&amp;')}</a>`;
    });
    html += `<div class="o dd ${cls}" data-dd="${slug}">${links}</div>`;
  }
  return { html, css: css.join('\n') };
}

function buildMobileMenu() {
  const items = [['Home', '/'], ['About', '/about/'], ['Dentistry', '/dentistry/'], ['Aesthetics', '/aesthetics/'], ['Fees', '/fees/'], ['Membership Plan', '/fees/membership-plan/'], ['Referrals', '/referrals/'], ['Contact', '/contact/']];
  return `<div class="mm" data-mm hidden><div class="mm-scrim" data-mm-close></div><nav class="mm-panel" aria-label="Menu"><button class="mm-close" data-mm-close aria-label="Close menu"><svg viewBox="0 0 50 50" aria-hidden="true"><path d="M9 9L41 41M41 9L9 41" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="square"/></svg></button><ul>${items.map(([t, h]) => `<li><a href="${h}" data-mm-link="${h}">${t.toUpperCase()}</a></li>`).join('')}</ul></nav></div>`;
}

function buildShared() {
  const home = G.loadPage('home-new');
  const d2 = home.samples[G.lastTag('d')];
  const hdr = d2.secs.find((s) => s.tag === 'HEADER');
  const ftr = d2.secs.find((s) => s.tag === 'FOOTER');
  const h = renderSection(home, hdr.id, 'h_', 'hdr', { annotate: annotateHeader });
  const f = renderSection(home, ftr.id, 'f_', 'ftr');
  const dd = buildDropdowns();
  const css = { d: [...h.layers.d, ...f.layers.d, dd.css], t: [...h.layers.t, ...f.layers.t], m: [...h.layers.m, ...f.layers.m] };
  return {
    header: L.linkHeader(`<header class="sec hdr">${h.bleed}<div class="stage">${h.stage}${dd.html}</div></header>`),
    mobileMenu: buildMobileMenu(),
    footer: L.linkFooter(`<footer class="sec ftr">${f.bleed}<div class="stage">${f.stage}</div></footer>`),
    css: cssText(css),
  };
}

function pageShell({ title, description, route, body, cssHref, bodyClass = '', shared }) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Kings Hill Dental</title>
<meta name="description" content="${description || ''}">
<link rel="icon" href="data:,">
<link rel="preload" href="/assets/fonts/heading.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/mandioca-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/shared.css">
<link rel="stylesheet" href="${cssHref}">
</head>
<body class="${bodyClass}">
<div class="page">
${shared.header}
<main>
${body}
</main>
${shared.footer}
</div>
${shared.mobileMenu}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}

async function main() {
  const only = process.argv.slice(2);
  const shared = buildShared();
  fs.mkdirSync(path.join(OUT, 'assets', 'css', 'p'), { recursive: true });
  fs.writeFileSync(path.join(OUT, 'assets', 'css', 'shared.css'), shared.css);
  let idx = 0;
  for (const p of pages) {
    idx++;
    const route = SLUG_ROUTES[p.slug];
    if (!route) { console.log('no route for', p.slug); continue; }
    if (only.length && !only.some((o) => p.slug.includes(o))) continue;
    const r = buildPageSlug(p.slug, idx);
    const cssName = p.slug + '.css';
    fs.writeFileSync(path.join(OUT, 'assets', 'css', 'p', cssName), r.css);
    const dir = path.join(OUT, route.replace(/^\//, ''));
    fs.mkdirSync(dir, { recursive: true });
    if (p.slug === 'fees') r.html = accordionFees(r.html);
    if (p.slug === 'about') r.html = aboutPractice(r.html);
    if (p.slug === 'home-new') r.html = fixServices(r.html);
        fs.writeFileSync(path.join(dir, 'index.html'), pageShell({ title: p.title, route, body: r.html, cssHref: '/assets/css/p/' + cssName, shared }));
    console.log('built', route, (r.html.length / 1024) | 0, 'KB html', (r.css.length / 1024) | 0, 'KB css');
  }
  if (!only.length) require('./search').writeSearchIndex(OUT, pages);
  await copyAssets(B.usedImages, B.usedBgs);
  fs.copyFileSync(path.join(__dirname, 'static', 'flag-gbr.png'), path.join(OUT, 'assets', 'img', 'flag-gbr.png'));
  console.log('images', B.usedImages.size, 'bgs', B.usedBgs.size);
}
if (require.main === module) main();
module.exports = { buildPageSlug, buildShared };
