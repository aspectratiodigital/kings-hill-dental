// "Meet the team": hover a name in the list and the portrait swaps. Click opens the full bio.
const { I } = require('./parts');
const TONES = ['var(--pink)', 'var(--blush)', 'var(--rose)'];

function teamOptions(people) {
  return `<section class="section team-sec" aria-label="Meet the team">
<div class="wrap">
<h2 class="h1" id="team-h" data-split>Meet the team</h2>
<div class="tA" data-tA>
<ul class="tA-list">${people.map((p, i) => `<li><button type="button" class="tA-item${i ? '' : ' is-on'}" data-person="${i}" data-idx="${i}" data-open="person-${i}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="nm">${p.name}</span><span class="rl">${p.role}</span></button></li>`).join('')}</ul>
<div class="tA-stage" aria-hidden="true">${people.map((p, i) => `<figure class="tA-fig${i ? '' : ' is-on'}" data-idx="${i}" style="--tone:${TONES[i % 3]}"><img src="${p.img}" alt="" loading="lazy" width="600" height="750"><figcaption><b>${p.name}</b><span>${p.role}</span></figcaption></figure>`).join('')}</div>
</div></div></section>`;
}
const GDC_REGISTER_URL = 'https://olr.gdc-uk.org/searchregister';
// one shared "meet the team" popup layout (chosen by the client after comparing four options):
// photo left, quick facts as icon pills under the name, GDC number pulled out as its own link
// through to the official register rather than sitting in a pill.
function teamPopups(people) {
  const bio = (p) => p.bio.map((t) => `<p>${t}</p>`).join('');
  return people.map((p, i) => {
    const gdcIdx = p.factsRaw.findIndex((f) => /^<b>GDC number<\/b>/.test(f));
    const gdcNumber = gdcIdx >= 0 ? p.factsRaw[gdcIdx].replace(/^<b>GDC number<\/b>\s*/, '') : '';
    const pills = p.facts.filter((f, idx) => idx !== gdcIdx).map((f) => `<span class="pill">${f}</span>`).join('');
    return `<dialog id="person-${i}" aria-label="${p.name}"><div class="modal"><div class="modal-card mc-v1-card">
<button class="modal-x" type="button" aria-label="Close">×</button>
<div class="mc-v1-photo" style="--tone:${p.tone}"><img src="${p.img}" alt="${p.name}"></div>
<div class="mc-v1-body">
<h3>${p.name}</h3><p class="role">${p.role}</p>
${gdcNumber ? `<a class="mc-v1-gdc" href="${GDC_REGISTER_URL}" target="_blank" rel="noopener"><span class="fact-ic" aria-hidden="true">${I.shield}</span><span>GDC Number – ${gdcNumber}</span></a>` : ''}
<div class="mc-v1-pills">${pills}</div>
<div class="stack">${bio(p)}</div>
</div>
</div></div></dialog>`;
  }).join('\n');
}
module.exports = { teamOptions, teamPopups };
