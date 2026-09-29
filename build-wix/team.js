// Native (non-Wix-layout) "Meet the team" section for the About page.
const G = require('./gen');
const B = require('./build');

const SLUGS = {
  'Amelia Madan-Dumper': 'amelia-madan-dumper',
  'Simon Dumper': 'simon-dumper',
  'Lucy Hicks': 'lucy-hicks',
  'Mohammed Lalji': 'mohammed-lalji',
  'Dr Furqan Jamal': 'dr-furqan-jamal',
  'Gemma Abbott': 'gemma-abbott',
  'Carly Marinelli': 'carly-marinelli',
  'Chelsea White': 'chelsea-white',
  'Vicky Mayne': 'vicky-mayne',
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function nativeTeam(page, secId) {
  const S = page.samples[G.lastTag('d')];
  const R = S.secs.find((x) => x.id === secId).recs;
  const roots = R.map((r, i) => [r, i]).filter(([r]) => r.p === 0 && r.rad && r.w > 300 && r.h > 400).map(([, i]) => i);
  const tiles = [];
  for (let k = 1; k < roots.length; k += 2) {
    const seg = R.slice(roots[k], roots[k + 1] || R.length);
    const a = seg.find((r) => r.tag === 'a' && r.href);
    const imgs = seg.filter((r) => r.img);
    const h6 = seg.filter((r) => r.tag === 'h6').map((r) => r.html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    if (!a || !imgs.length || h6.length < 2) continue;
    const im = imgs[imgs.length - 1];
    tiles.push({ name: h6[0], role: h6[1], src: B.imgPublic(im.img.uri), pos: (im.imgbox && im.imgbox.pos) || '50% 50%', clay: /144, 88, 73/.test(a.bg) });
  }
  const cards = tiles.map((t) => {
    const slug = SLUGS[t.name] || t.name.toLowerCase().replace(/[^a-z]+/g, '-');
    return `<li><a class="tm ${t.clay ? 'tm--clay' : 'tm--pink'}" href="/team/${slug}/"><span class="tm__pic"><img src="${t.src}" alt="${esc(t.name)}, ${esc(t.role)}" style="object-position:${t.pos}" loading="lazy" decoding="async"></span><span class="tm__cap"><span class="tm__role">${esc(t.role)}</span><span class="tm__name">${esc(t.name)}</span></span></a></li>`;
  }).join('');
  return `<h2 class="team__h" data-anim="FadeIn" data-dur="900">Meet the team.</h2><ul class="tgrid">${cards}</ul>`;
}

module.exports = { nativeTeam };
