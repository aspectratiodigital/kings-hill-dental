// "Meet the team": hover a name in the list and the portrait swaps. Click opens the full bio.
const TONES = ['var(--pink)', 'var(--blush)', 'var(--rose)'];

function teamOptions(people) {
  return `<section class="section" aria-label="Meet the team">
<div class="wrap">
<h2 class="h1" id="team-h" data-split>Meet the team</h2>
<div class="tA" data-tA>
<ul class="tA-list">${people.map((p, i) => `<li><button type="button" class="tA-item${i ? '' : ' is-on'}" data-person="${i}" data-idx="${i}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="nm">${p.name}</span><span class="rl">${p.role}</span></button></li>`).join('')}</ul>
<div class="tA-stage" aria-hidden="true">${people.map((p, i) => `<figure class="tA-fig${i ? '' : ' is-on'}" data-idx="${i}" style="--tone:${TONES[i % 3]}"><img src="${p.img}" alt="" loading="lazy" width="600" height="750"><figcaption><b>${p.name}</b><span>${p.role}</span></figcaption></figure>`).join('')}</div>
</div></div></section>`;
}
module.exports = { teamOptions };
