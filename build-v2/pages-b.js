const fs = require('fs');
const path = require('path');
const { I, PORTAL, WHATSAPP, splitHero } = require('./parts');
const { arrowBtn, partners } = require('./pages-a');
const { memberCard } = require('./pages-home');
const fees = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '_capture', 'acc-fees.json'), 'utf8')).d2[0];

const crumbs = (...c) => `<ul class="crumbs" aria-label="Breadcrumb">${c.map(([t, h]) => `<li>${h ? `<a href="${h}">${t}</a>` : t}</li>`).join('')}</ul>`;
const ctaBand = (title = 'Not sure where to start?', text = 'Book an appointment and one of our dentists will help you find the right treatment.', actions = `${arrowBtn('Book an Appointment', PORTAL, '', true)}<a class="btn btn--ghost" href="/contact/">Contact us</a>`) => `<section class="section--tight cta-band"><div class="wrap"><h2 class="h1" data-split>${title}</h2><p class="lede" data-reveal style="margin-inline:auto;margin-top:22px">${text}</p><div class="actions" data-reveal>${actions}</div></div></section>`;

/* ---------- DENTISTRY hub ---------- */
function dentistry() {
  const cats = [
    ['general', 'General & Preventative', 'Protecting oral health with routine dentistry and general dental care. Regular visits to the dentist and hygiene will help you take the very best care of your natural smile.', 'topic-general', [['Dental examinations', '/dentistry/general-preventative/dental-examinations/'], ['Hygiene & gum health', '/dentistry/general-preventative/hygiene-gum-health/'], ['Children’s dentistry', '/dentistry/general-preventative/childrens-dentistry/'], ['Bruxism', '/dentistry/general-preventative/bruxism/']], '/dentistry/general-preventative/'],
    ['restorative', 'Restorative Dentistry', 'Teeth go through a lot during our lifetime. Restorative dentistry allows us to fix any problems such as cavities, chips, and broken or missing teeth, restoring your beautiful smile.', 'topic-restorative', [['Fillings', '/dentistry/restorative/#fillings'], ['Crowns & bridges', '/dentistry/restorative/#crowns-bridges'], ['Root canals', '/dentistry/restorative/#root-canals'], ['Dentures', '/dentistry/restorative/#dentures'], ['Implants', '/dentistry/restorative/#implants']], '/dentistry/restorative/'],
    ['cosmetic', 'Cosmetic Dentistry', 'We have an expansive range of cosmetic treatments that can correct minor issues, straighten smiles and whiten teeth. We want to help you build a natural looking smile.', 'topic-cosmetic', [['Teeth whitening', '/dentistry/cosmetic/#whitening'], ['Composite bonding', '/dentistry/cosmetic/#bonding'], ['Veneers', '/dentistry/cosmetic/#veneers']], '/dentistry/cosmetic/'],
    ['orthodontic', 'Orthodontic Dentistry', 'Creating beautifully straight and healthy smiles with orthodontic treatment. Orthodontics is the branch of dentistry that corrects irregularities of the teeth and jaws.', 'topic-orthodontic', [['Invisalign', '/dentistry/orthodontic/#invisalign'], ['Invisalign Go', '/dentistry/orthodontic/#invisalign-go'], ['Fixed braces', '/dentistry/orthodontic/#fixed-braces'], ['Spark aligners', '/dentistry/orthodontic/#spark-aligners']], '/dentistry/orthodontic/'],
  ];
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Dentistry']), title: `Dentistry`, img: 'topic-general-2', alt: `Three children brushing their teeth together at the practice`, objectPosition: '60% center' })}
<section class="phero-intro"><div class="wrap"><div class="phero-copy"><p class="lede" data-reveal>At Kings Hill Dental our number 1 priority is our patients. Our warm and skilled team endeavour to provide the highest quality of advice and care, whilst ensuring our patients feel comfortable, safe and informed.</p><p data-reveal>We never push our patients towards treatments or cosmetic work and instead we work with you, to find the best treatment to improve your confidence and create the natural beautiful smile you deserve!</p><p data-reveal>You can discover our range of dentistry options, from general health, dental repairs, long term treatments and cosmetic work, or if you’re not sure, you can book an appointment with one of our dentists to find the right treatment for you.</p></div></div></section>
<section class="section"><div class="wrap rows">
${cats.map(([id, t, d, img, pills, href], i) => `<article class="row" id="${id}"><div class="row-media clip-in"><img data-parallax="34" src="/img/${img}.webp" alt="" loading="lazy" width="1800" height="800"></div><div><h2 class="h2" data-split>${t}</h2><div class="rule" data-reveal></div><p class="lede" data-reveal>${d}</p><div class="hover-tabs" data-hover-tabs data-reveal>${pills.map(([n, h]) => `<a href="${h}">${n}</a>`).join('')}</div><div class="actions" style="margin-top:32px" data-reveal>${arrowBtn('Find out More', href, 'btn--ghost')}</div></div></article>`).join('')}
</div></section>`;
  return { path: '/dentistry/', title: 'Dentistry | Kings Hill Dental', description: 'General and preventative, restorative, cosmetic and orthodontic dentistry at Kings Hill Dental in West Malling.', bodyClass: 'wide-intro', body };
}

/* ---------- AESTHETICS ---------- */
function aesthetics() {
  const items = [
    ['anti-wrinkle', 'Anti-Wrinkle Treatments', 'We combat wrinkles and lines with non-invasive anti-ageing injections, such as Botox. These treatments involve using a purified protein that relaxes specific muscles under the skin, eliminating lines that appear through excessive movements.', 'aes-anti-wrinkle'],
    ['skin-care', 'Skin Care', 'We offer Obagi Blue Peel RADIANCE facial, a salicylic acid-based peel which addresses fine lines and wrinkles, rough skin and blemishes on the face, giving your skin a new lease of life.', 'aes-skin-care'],
    ['profhilo', 'Profhilo', 'Using a unique hyaluronic acid gel, Profhilo intensely moisturises and hydrates ageing skin, smoothing lines and creating a tightening effect.', 'aes-profhilo'],
    ['dermal-fillers', 'Dermal Fillers', 'Dermal fillers are a common aesthetic treatment that use hyaluronic acid, a substance found naturally in the body, to replenish lost volume and hydration in the skin.', 'aes-fillers'],
  ];
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Aesthetics']), title: `Aesthetics`, img: 'aes-skin-care', alt: `Skin care treatment` })}
<section class="phero-intro"><div class="wrap"><div class="phero-copy"><p class="lede" data-reveal>We are able to help reverse the signs of ageing with confidence-boosting facial aesthetic treatments. Non-surgical treatments such as anti-wrinkle injections and dermal fillers can restore lost volume and reduce noticeable lines.</p><p data-reveal>We believe natural is beautiful and our aesthetics procedures exist to help reduce small imperfections and boost your confidence. We aim to ensure all of our patients are well informed about the type of treatment they are undergoing, especially by matching patients with the correct specific treatment for them.</p><p data-reveal>You can discover our range of aesthetic procedures below or if you’re not sure what kind of work you want done, you can book an appointment with our team and we can help you find the right treatment!</p></div></div></section>
<section class="section tint" style="padding-top:0"><div class="wrap cards cards--4">
${items.map(([id, t, d, img], i) => `<a class="card" id="${id}" href="/aesthetics/${id}/" data-reveal style="--d:${i}"><div class="card-img"><img src="/img/${img}.webp" alt="" loading="lazy" width="1400" height="900"></div><div class="card-body"><h3>${t}</h3><p>${d}</p><span class="link-arrow" style="align-self:flex-start">Find out More${I.arrow}</span></div></a>`).join('')}
</div></section>`;
  return { path: '/aesthetics/', title: 'Aesthetics | Kings Hill Dental', description: 'Non-surgical facial aesthetics in West Malling: anti-wrinkle treatments, Obagi skin care, Profhilo and dermal fillers.', body };
}

const AESTH_LINKS = [['Anti-wrinkle treatments', '/aesthetics/anti-wrinkle/'], ['Skin care', '/aesthetics/skin-care/'], ['Profhilo', '/aesthetics/profhilo/'], ['Dermal fillers', '/aesthetics/dermal-fillers/']];
const aesthPractitioner = () => accItem('Our Aesthetic Practitioner', '<p>Our practitioner trained in Aesthetics with Oris Medical, before going on to further develop her skills with Avanti Aesthetics and introduce Obagi medical skincare to the practice. She is passionate about healthy skin and helping patients treat the signs of ageing.</p>');

/* ---------- AESTHETICS sub-pages (built to the Hygiene & Gum Health template; copy sourced from kingshilldental.co.uk) ---------- */
function aestheticsAntiWrinkle() {
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Aesthetics', '/aesthetics/'], ['Anti-wrinkle treatments']), title: 'Anti-Wrinkle Treatments', img: 'aes-anti-wrinkle', alt: 'An anti-wrinkle treatment at Kings Hill Dental' })}
<section class="section"><div class="wrap tx-layout">
<div>
<p class="lede" data-reveal>Combat wrinkles and lines with non-invasive anti-ageing injections, such as Botox. These treatments use a purified protein that relaxes specific muscles under the skin, eliminating lines caused by excessive movement, such as frowning and laughing.</p>
<h2 class="tx-h3" style="margin:36px 0 0" data-reveal>Areas we can treat:</h2>
${checklist(['Forehead lines', 'Frown lines', 'Vertical lip lines', 'Crow’s feet'])}
<h2 class="tx-h3" style="margin:36px 0 0" data-reveal>Why have anti-wrinkle treatment?</h2>
${checklist(['Non-surgical option', 'Appearance enhancing', 'Confidence boosting', 'Quick, simple procedure', 'Lasting results'])}
<div class="acc" style="margin-top:48px" data-reveal>
${accItem('What does the treatment involve?', '<p>Treatment only takes around 10-15 minutes, and we make sure you are comfortable and relaxed throughout the appointment. We then give small injections into the muscles of your face.</p><p>There is no need to take time to recover, and the effects of treatment will show in a couple of days. You may experience minimal short-lived side effects, including minor redness and swelling, and in rare cases, some bruising.</p><p>The outcome of the treatment lasts for around six months and does wear off over time. Top-up treatments will be needed to maintain smooth, youthful results.</p>')}
${aesthPractitioner()}
</div>
</div>
${asideCard('/aesthetics/anti-wrinkle/', ['Aesthetics', '/aesthetics/'], AESTH_LINKS)}
</div></section>`;
  return { path: '/aesthetics/anti-wrinkle/', title: 'Anti-Wrinkle Treatments | Kings Hill Dental', description: 'Non-surgical anti-wrinkle treatment in West Malling to smooth forehead lines, frown lines and crow’s feet.', bodyClass: 'tx-page', body };
}

function aestheticsSkinCare() {
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Aesthetics', '/aesthetics/'], ['Skin care']), title: 'Skin Care', img: 'aes-skin-care', alt: 'A skin care consultation at Kings Hill Dental' })}
<section class="section"><div class="wrap tx-layout">
<div>
<p class="lede" data-reveal>Give your skin a new lease of life that will get your face glowing with vigour and energy. We offer Obagi skin care, a range of products and peels that does more than revitalise your skin.</p>
<p data-reveal>Our popular chemical peels give facial skin a new lease of life by gently removing the outer layer of skin. This takes away old skin that may be blemished, uneven and dry, and encourages a new layer of fully rejuvenated skin to grow.</p>
<h2 class="tx-h3" style="margin:36px 0 0" data-reveal>Areas of concern we can treat:</h2>
${checklist(['Acne & acne scarring', 'Melasma', 'Dryness', 'Pigmentation', 'Sun damage', 'Signs of ageing', 'Enlarged pores'])}
<div class="acc" style="margin-top:48px" data-reveal>
${accItem('Personalised care for your individual skin needs', '<p>We carry out a full face-to-face skin consultation, discussing your individual skin concerns and the results you hope to achieve. Using the Observ 520 skin analyser, we can produce a series of images which give us a full overview of your skin condition.</p><p>In under a minute, the Observ 520 can reveal your skin’s pigmentation, sun damage and condition, giving a detailed overview and helping to visualise what your skin needs. Your treatment is then tailored exactly to you.</p>')}
${accItem('Obagi Blue Peel RADIANCE', '<p>We offer the Obagi Blue Peel RADIANCE facial, a salicylic acid-based peel which addresses fine lines and wrinkles, rough skin and blemishes on the face. An exfoliating peel, it helps to balance uneven skin tone and results in smoother, brighter-looking skin after just one use.</p>')}
${aesthPractitioner()}
</div>
</div>
${asideCard('/aesthetics/skin-care/', ['Aesthetics', '/aesthetics/'], AESTH_LINKS)}
</div></section>`;
  return { path: '/aesthetics/skin-care/', title: 'Skin Care | Kings Hill Dental', description: 'Obagi skin care and chemical peels in West Malling, with personalised skin analysis using the Observ 520.', bodyClass: 'tx-page', body };
}

function aestheticsProfhilo() {
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Aesthetics', '/aesthetics/'], ['Profhilo']), title: 'Profhilo', img: 'aes-profhilo', alt: 'A Profhilo skin treatment at Kings Hill Dental' })}
<section class="section"><div class="wrap tx-layout">
<div>
<p class="lede" data-reveal>Using a unique hyaluronic acid gel, Profhilo intensely moisturises and hydrates ageing skin, smoothing lines and creating a tightening effect.</p>
<p data-reveal>Hyaluronic acid occurs naturally in the body to maintain the skin’s moisture, but levels dip over time, drying out the skin. Profhilo’s unique form of hyaluronic acid remodels the skin and boosts skin cells to work effectively, providing elasticity and support, while stimulating collagen production to counteract sagging. It is very effective, safe and long lasting.</p>
<h2 class="tx-h3" style="margin:36px 0 0" data-reveal>Areas we can treat:</h2>
${checklist(['Face', 'Neck', 'Hands', 'Arms', 'Elbows', 'Knees', 'Abdomen'])}
<div class="acc" style="margin-top:48px" data-reveal>
${accItem('What does the treatment involve?', '<p>Initially, we invite you for a full medical face-to-face consultation, where we ensure the treatment is suitable for you and discuss your ideal results. You will be required to give your consent before we can begin treatment.</p><p>We ensure you are comfortable and relaxed before beginning the procedure. A specially formulated hyaluronic acid gel is injected under your skin, dispersing easily and allowing hydration from within. It promotes collagen and elastin production, helping to smooth out fine lines, lifting and tightening.</p><p>There is no downtime following treatment, so you can return to your normal routine straight away. You may experience some sensitivity or mild swelling, but this will fade after a few days.</p><p>Results can be visible as soon as 24 hours after treatment. Profhilo involves two sessions, repeated one month after the initial treatment, with further sessions at three or six month intervals discussed at consultation.</p>')}
${aesthPractitioner()}
</div>
</div>
${asideCard('/aesthetics/profhilo/', ['Aesthetics', '/aesthetics/'], AESTH_LINKS)}
</div></section>`;
  return { path: '/aesthetics/profhilo/', title: 'Profhilo | Kings Hill Dental', description: 'Profhilo hyaluronic acid skin treatment in West Malling, to hydrate, smooth and tighten ageing skin.', bodyClass: 'tx-page', body };
}

function aestheticsFillers() {
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Aesthetics', '/aesthetics/'], ['Dermal fillers']), title: 'Dermal Fillers', img: 'aes-fillers', alt: 'A dermal filler consultation at Kings Hill Dental' })}
<section class="section"><div class="wrap tx-layout">
<div>
<p class="lede" data-reveal>Dermal fillers are a common aesthetic treatment that use hyaluronic acid, a substance found naturally in the body, to replenish lost volume and hydration in the skin. Fillers can smooth fine lines and wrinkles, giving your appearance a youthful boost.</p>
<p data-reveal>Fillers help maintain the structure of the face, which loses volume due to depleted collagen as we age. The treatment can also improve the appearance of facial skin affected by weight loss, smoking or sun damage. We look at your face as a whole, planning the areas to be treated during a full face assessment.</p>
<h2 class="tx-h3" style="margin:36px 0 0" data-reveal>Areas we can treat:</h2>
${checklist(['Lips', 'Cheeks', 'Nasolabial lines', 'Marionette lines', 'Upper lip area', 'Chin'])}
<div class="acc" style="margin-top:48px" data-reveal>
${accItem('What does the treatment involve?', '<p>At your initial consultation, we carry out a full face-to-face consultation, including a full-face assessment and careful planning of your treatment and costs involved. We also take photographs of your face, so we can clearly show you the difference fillers can make. You will be required to give your consent before we can begin treatment.</p><p>There are a number of dermal fillers available, so we select the one suited to the end result you want to achieve. We ensure you are comfortable before beginning the procedure and can use topical local anaesthetic if needed. You may feel some discomfort, but it shouldn’t be painful.</p><p>The treatment involves injecting sterilised hyaluronic acid gel under the skin using needles. We can also sometimes use cannulas (blunt-ended tubes) to inject, ensuring the gel is placed safely under the skin.</p><p>Treatment is straightforward and quick. Your results can be visible soon after treatment and will last for around 6-10 months before needing to be topped up.</p>')}
${aesthPractitioner()}
</div>
</div>
${asideCard('/aesthetics/dermal-fillers/', ['Aesthetics', '/aesthetics/'], AESTH_LINKS)}
</div></section>`;
  return { path: '/aesthetics/dermal-fillers/', title: 'Dermal Fillers | Kings Hill Dental', description: 'Dermal filler treatments in West Malling to restore volume and smooth fine lines and wrinkles.', bodyClass: 'tx-page', body };
}

/* ---------- FEES ---------- */
function feesPage() {
  const acc = fees.titles.map((t, i) => {
    const rows = (fees.tables[i] || []).map(([n, p]) => `<tr><td>${n.trim()}</td><td>${p}</td></tr>`).join('');
    return `<details${i === 0 ? ' open data-keep="1"' : ''}><summary>${t.replace(/&/g, '&amp;')}<span class="pm" aria-hidden="true"></span></summary><div class="panel"><div><div class="panel-in"><table class="price-table"><caption class="vh">${t}</caption><tbody>${rows}</tbody></table></div></div></div></details>`;
  }).join('');
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Fees']), title: `Fees`, img: 'practice-consultation', alt: `A consultation at Kings Hill Dental` })}
<section class="phero-intro"><div class="wrap"><div class="phero-copy"><p class="lede" data-reveal>All of our patients at Kings Hill Clinic receive a written treatment plan, clearly outlining the clinical needs and costs of treatment.</p></div></div></section>
<section class="section" style="padding-top:0"><div class="wrap tx-layout">
<div>
<div class="search" data-reveal><label class="vh" for="fee-search">Search fees</label>${I.search}<input id="fee-search" type="search" placeholder="Search treatments, e.g. hygiene or X-ray" autocomplete="off"></div>
<div class="acc fees-acc" data-single style="margin-top:32px" data-reveal>${acc}</div>
<p class="empty" id="fee-none" hidden>Nothing matches that search. Try a different word, or <a class="empty-wa" href="${WHATSAPP}" target="_blank" rel="noopener">message us on WhatsApp</a> and we’ll be happy to help.</p>
</div>
<aside class="tx-aside"><div class="aside-card"><h3>Need help choosing?</h3><p>Not sure which treatment is right for you, or nervous about getting treatment/aesthetic work for the first time?</p><p>Our kind team of dental professionals are here to help you choose the right procedure for your smile…</p>${arrowBtn('Book an Appointment', PORTAL, 'btn--light', true)}<div class="aside-links"><a href="/fees/membership-plan/">Membership plan${I.arrow}</a><a href="/contact/">Contact us${I.arrow}</a></div></div></aside>
</div></section>`;
  return { path: '/fees/', title: 'Fees | Kings Hill Dental', description: 'Clear, transparent fees for examinations, hygiene, dental treatments, orthodontics, implants and aesthetics at Kings Hill Dental.', body };
}

/* ---------- MEMBERSHIP ---------- */
function membership() {
  const tiles = [[I.shield, 'Insurance', 'Worldwide dental accident and emergency insurance to put your mind at ease'], [I.coins, 'Spread costs', 'Pay for routine appointments throughout the year, reducing the upfront costs.'], [I.eye, 'Prevention', 'Regular and continued monitoring to prevent problems before they start']];
  const ageTabs = `<div class="cx-tabs" data-age-tabs role="tablist" aria-label="Age group">
<button type="button" role="tab" aria-selected="true" data-price="£10.40">Under 8</button>
<button type="button" role="tab" aria-selected="false" data-price="£11.25">8-12</button>
<button type="button" role="tab" aria-selected="false" data-price="£12.10">13-17</button>
</div>`;
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Fees', '/fees/'], ['Membership plan']), title: `Membership Plan`, img: 'practice-waiting-room', alt: `The waiting room at Kings Hill Dental` })}
<section class="section section--tight"><div class="wrap"><ul class="values" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));border-left:0">${tiles.map(([ic, t, d]) => `<li data-reveal style="border-left:0;padding-left:0">${ic}<div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ul></div></section>
<section class="section mplan-top"><div class="wrap">
<div style="max-width:640px;margin-inline:auto;text-align:center"><h2 class="h1" data-split>Become a Member</h2><div class="rule" data-reveal style="margin-inline:auto"></div><p class="lede" data-reveal>Our plans provide all the essential dental treatments you need, looking after your teeth and gums while making your dental care more affordable.</p></div>
<div class="mcards" style="margin-top:clamp(32px,4vw,56px)">${memberCard('child', PORTAL, 'Sign up today', { ext: true, extra: ageTabs })}${memberCard('adult', PORTAL, 'Sign up today', { ext: true })}</div>
</div></section>
<section class="section tint mplan-left"><div class="wrap">
<div style="max-width:640px;margin-inline:auto;text-align:center"><h2 class="h1" data-split>Become a Member</h2><div class="rule" data-reveal style="margin-inline:auto"></div><p class="lede" data-reveal>Our plans provide all the essential dental treatments you need, looking after your teeth and gums while making your dental care more affordable.</p></div>
<div class="mcards" style="margin-top:clamp(32px,4vw,56px)">${memberCard('child', PORTAL, 'Sign up today', { ext: true, extra: ageTabs })}${memberCard('adult', PORTAL, 'Sign up today', { ext: true })}</div>
</div></section>
${ctaBand('Not interested in a membership?', 'No problem — you can find out about our specific per procedure pricing using the button below.', `${arrowBtn('Our Pricing', '/fees/')}<a class="btn btn--ghost" href="/contact/">Contact us</a>`)}`;
  return { path: '/fees/membership-plan/', title: 'Membership plan | Kings Hill Dental', description: 'Kings Hill Dental membership plans for children and adults: examinations, hygiene, x-rays, discounts and worldwide emergency cover.', bodyClass: 'mplan-page', body };
}

/* ---------- REFERRALS ---------- */
function referrals() {
  const tx = ['Orthodontics', 'Implants', 'Facial Aesthetics', 'Skin Care', 'Hygiene', 'Endodontic treatment & CBCT'];
  const f = (id, name, label, extra = '', type = 'text') => `<div class="field"><input id="${id}" name="${name}" type="${type}" placeholder=" " ${extra}><label for="${id}">${label}</label><p class="err" role="alert"></p></div>`;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const countries = ['United Kingdom', 'Ireland', 'United States', 'Canada', 'Australia', 'New Zealand', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'India', 'Other'];
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Referrals']), title: `Referrals`, img: 'practice-entrance', alt: `The entrance to Kings Hill Dental` })}
<section class="phero-intro"><div class="wrap"><div class="phero-copy"><p class="lede" data-reveal>Referring a patient to us takes a few minutes. Tell us what treatment they need, who you are and who you’re referring, and we’ll take it from there.</p></div></div></section>
<section class="section" style="padding-top:0"><div class="wrap" style="max-width:860px">
<div class="form-card" data-reveal>
<div class="steps" aria-hidden="true"><i class="done"></i><i></i><i></i><i></i></div>
<form class="form" id="referral-form" data-form data-steps data-done="referral-done" data-subject="Patient referral" novalidate>
<div class="step is-active"><fieldset><legend class="h3" style="font-family:var(--serif);font-weight:400;font-size:1.8rem;margin-bottom:18px">Referral for which treatment(s):</legend><div class="choices">${tx.map((t) => `<label class="choice"><input type="checkbox" name="treatments" value="${t}"><span>${t}</span></label>`).join('')}</div><p class="tx-err" id="tx-err" role="alert" hidden>Choose at least one treatment.</p></fieldset>
<div class="step-actions"><span></span><button class="btn" type="button" data-next>Next${I.arrow}</button></div></div>
<div class="step"><h2 class="h3">Referring Dentist Details</h2>
<div class="fields fields--2">${f('rd-name', 'dentist_name', 'Name', 'required autocomplete="name"')}${f('rd-email', 'dentist_email', 'Email', 'required autocomplete="email"', 'email')}${f('rd-phone', 'dentist_phone', 'Phone number', 'autocomplete="tel"', 'tel')}<div class="field"><select id="rd-country" name="country"><option value=""></option>${countries.map((c) => `<option>${c}</option>`).join('')}</select><label for="rd-country">Country/Region</label><p class="err"></p></div></div>
<div class="field"><textarea id="rd-addr" name="dentist_address" placeholder=" " style="min-height:110px"></textarea><label for="rd-addr">Address</label><p class="err"></p></div>
<div class="fields fields--2">${f('rd-city', 'dentist_city', 'City')}${f('rd-zip', 'dentist_postcode', 'Zip / Postal code')}</div>
<div class="step-actions"><button class="btn btn--ghost" type="button" data-back>Back</button><button class="btn" type="button" data-next>Next${I.arrow}</button></div></div>
<div class="step"><h2 class="h3">Patient Details</h2>
<div class="fields fields--2">${f('pt-name', 'patient_name', 'Name', 'required autocomplete="off"')}<div class="field"><select id="pt-gender" name="patient_gender"><option value=""></option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select><label for="pt-gender">Gender</label><p class="err"></p></div>
${f('pt-email', 'patient_email', 'Email', 'required', 'email')}${f('pt-phone', 'patient_phone', 'Phone', '', 'tel')}</div>
<fieldset><legend>Birthday</legend><div class="fields" style="grid-template-columns:1fr 2fr 1fr;gap:12px">${f('pt-day', 'birth_day', 'Day', 'inputmode="numeric" maxlength="2"')}<div class="field"><select id="pt-month" name="birth_month"><option value=""></option>${months.map((m) => `<option>${m}</option>`).join('')}</select><label for="pt-month">Month</label><p class="err"></p></div>${f('pt-year', 'birth_year', 'Year', 'inputmode="numeric" maxlength="4"')}</div></fieldset>
<div class="step-actions"><button class="btn btn--ghost" type="button" data-back>Back</button><button class="btn" type="button" data-next>Review${I.arrow}</button></div></div>
<div class="step"><h2 class="h3">Check and send</h2><div class="summary" aria-live="polite"></div><p class="form-note">We’ll be in touch with you and the patient to arrange their appointment.</p>
<div class="step-actions"><button class="btn btn--ghost" type="button" data-back>Back</button><button class="btn" type="submit">Send referral${I.arrow}</button></div></div>
</form>
<div class="form-done" id="referral-done" role="status"><div class="badge">${I.check}</div><h3 class="h3">Referral ready to send.</h3><p style="margin-inline:auto">Thank you. If your email app didn’t open, please email <a href="mailto:reception@kingshilldental.co.uk">reception@kingshilldental.co.uk</a>.</p></div>
</div></div></section>`;
  return { path: '/referrals/', title: 'Referrals | Kings Hill Dental', description: 'Refer a patient to Kings Hill Dental for orthodontics, implants, facial aesthetics, skin care, hygiene or endodontic treatment and CBCT.', body };
}

/* ---------- TOPIC: general & preventative (new layout — an image accordion, one treatment expands on hover) ---------- */
function topicGeneral() {
  const items = [
    ['exam', 'Dental Examinations', 'Routine dental examinations are the foundation of your oral health care. Regular check-ups allow us to keep an eye on your oral health and spot any problems early.', 'tx-exam', '/dentistry/general-preventative/dental-examinations/'],
    ['hygiene', 'Hygiene & Gum Health', 'Defending your oral health from gum disease with hygiene and periodontal treatments. Hygienists are trained experts in assessing, tracking and treating gum disease.', 'tx-hygiene', '/dentistry/general-preventative/hygiene-gum-health/', '40% 24%'],
    ['childrens', 'Children’s Dentistry', 'Dental visits from a young age can help identify developmental issues that can be fixed early, as well as protecting your child from long term damage and expensive treatment.', 'tx-children', '/dentistry/general-preventative/childrens-dentistry/', '62% 25%'],
    ['bruxism', 'Bruxism', 'If you are suffering with consistent grinding and clenching of your teeth, then you might have Bruxism. Our experts can help diagnose and treat, leaving you discomfort free.', 'tx-bruxism', '/dentistry/general-preventative/bruxism/'],
  ];
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['General & preventative']), title: `General &amp; Preventative`, img: 'hero-general', alt: `A dentist and patient sharing a laugh during a consultation`, objectPosition: '70% center' })}
<section class="phero-intro"><div class="wrap"><div class="phero-copy"><p class="lede" data-reveal>We focus on helping patients maintain healthy teeth and gums through regular examinations and preventative care. We understand the dentist can seem daunting and so our team of kind, professional dentists are here to make your visit as relaxing and informative as possible.</p><p data-reveal>Hover or select a treatment below to find out more.</p></div></div></section>
<section class="section" style="padding-top:0" aria-label="General and preventative treatments"><div class="wrap">
<div class="gp-accordion" data-accordion data-reveal>${items.map(([id, t, d, img, h, pos], i) => `<div class="gp-tile" id="${id}" style="--d:${i}"><img class="gp-photo" src="/img/${img}.webp" alt="" loading="lazy" width="900" height="700"${pos ? ` style="object-position:${pos}"` : ''}><div class="gp-caption"><h3>${t}</h3><p>${d}</p><a class="gp-more" href="${h}"><span class="lbl">Find out more</span>${I.arrow}</a></div></div>`).join('')}</div>
</div></section>
${ctaBand('Not sure which treatment is right for you?', 'Book an appointment and one of our dentists will help you find the right treatment.')}`;
  return { path: '/dentistry/general-preventative/', title: 'General & Preventative Dentistry | Kings Hill Dental', description: 'Dental examinations, hygiene and gum health, children’s dentistry and bruxism care at Kings Hill Dental.', bodyClass: 'gp-page', body };
}

/* ---------- TREATMENT pages ---------- */
function asideCard(current, field = ['General & Preventative', '/dentistry/general-preventative/'], items = [['Dental examinations', '/dentistry/general-preventative/dental-examinations/'], ['Hygiene & gum health', '/dentistry/general-preventative/hygiene-gum-health/'], ['Children’s dentistry', '/dentistry/general-preventative/childrens-dentistry/'], ['Bruxism', '/dentistry/general-preventative/bruxism/']]) {
  items = items.filter((l) => l[1] !== current);
  const links = [field, ...items];
  return `<aside class="tx-aside"><div class="aside-card"><h3>Book a visit</h3><p>Our team will explain everything before we begin, so you always know what to expect.</p>${arrowBtn('Book an Appointment', PORTAL, 'btn--light btn--sm', true)}<a class="btn btn--outline-light btn--sm" href="${WHATSAPP}" target="_blank" rel="noopener">Get Advice</a><div class="aside-links">${links.map(([t, h]) => `<a href="${h}">${t}${I.arrow}</a>`).join('')}</div></div></aside>`;
}
const checklist = (a) => `<ul class="checklist">${a.map((t, i) => `<li style="--i:${i}">${I.tickBig}<span>${t}</span></li>`).join('')}</ul>`;
const accItem = (t, html, open, id) => `<details${open ? ' open' : ''}${id ? ` id="${id}"` : ''}><summary>${t}<span class="pm" aria-hidden="true"></span></summary><div class="panel"><div><div class="panel-in stack">${html}</div></div></div></details>`;

function examinations() {
  const steps = [
    ['Teeth & gums', 'Checking for any signs of wear, decay or gum disease.'],
    ['Soft tissues', 'A look at your tongue and soft tissues, making sure they’re healthy.'],
    ['Face, neck & jaw', 'Checking for any issues or abnormalities.'],
    ['Bite', 'Making sure your teeth mesh together properly.'],
    ['Oral cancer check', 'A routine screening for early warning signs.'],
  ];
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['General & preventative', '/dentistry/general-preventative/'], ['Dental examinations']), title: 'Dental Examinations', img: 'tx-exam', alt: 'A dentist and patient during an examination', objectPosition: '70% center' })}
<section class="section"><div class="wrap tx-layout">
<div>
<p class="lede" data-reveal>Routine examinations are the foundation of your oral health care. Regular check-ups allow us to spot and address any problems early.</p>
<p data-reveal>During your appointment, we will examine and assess your teeth, gums and mouth, as well as look at your overall health.</p>
<h2 class="tx-h3" style="margin:36px 0 0" data-reveal>Reasons to keep up with your check-ups:</h2>
${checklist(['Regular check-ups let us spot problems while they’re still simple to treat', 'We keep track of any previous treatment, making sure crowns, bridges and fillings are still working well', 'An oral cancer screening is included as standard at every examination'])}
<p data-reveal>Most patients are seen every six months, though your dentist will let you know what’s right for you.</p>
<div class="acc" style="margin-top:48px" data-reveal>
${accItem('What happens during the check up?', '<p>We carry out a thorough examination that covers every aspect of your oral health. As well as assessing your teeth, we will ask some questions about your general health and medical history, in case this is affecting your dental wellbeing.</p><p>We will also check any previous treatment you have had, including crowns, bridges and implants, to make sure they are still working correctly. We may need to take x-rays of your mouth. We will also discuss any concerns you may have, or if there are any cosmetic treatments you wish to know more about.</p><p>Following the assessment, if we find anything that requires further treatment, we will set out your treatment plan and discuss with you the next steps and expected costs.</p>')}
${accItem('How often do I need to see a dentist?', '<p>You may not need to see us every six months and your dentist will let you know when you need to come back for your next check-up. If you have any problems between check-ups please phone us to arrange an earlier appointment.</p>')}
</div>
<h2 class="tx-h3" style="margin-top:clamp(32px,4vw,48px)" data-reveal>What we check during your examination</h2>
<ol class="timeline" style="margin-top:32px"><span class="prog" aria-hidden="true"></span>${steps.map(([t, d]) => `<li><h3 class="h4" style="margin-bottom:4px">${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div>
${asideCard('/dentistry/general-preventative/dental-examinations/')}
</div></section>`;
  return { path: '/dentistry/general-preventative/dental-examinations/', title: 'Dental Examinations | Kings Hill Dental', description: 'Routine dental examinations at Kings Hill Dental: what happens during a check-up and how often you should visit.', bodyClass: 'tx-page', body };
}

function hygiene() {
  const steps = ['To begin with, we will assess your mouth and gum health, looking for any signs of gum disease or decay.', 'We then apply a disclosing solution to your teeth which will make any dental biofilm easier to detect.', 'We will then show you any problem areas and provide tips on how to improve your oral health.', 'At this point we will begin the Dental Spa treatment. The combination of air, fine powder and warm water creates a spray that will gently and comfortably exfoliate and remove stain.', 'After this, we will remove any remaining tartar using our no pain instrument. This is minimally invasive, comfortable and highly efficient.', 'A final check is then performed to ensure all biofilm and tartar has been removed. It may be necessary to use a handscaler to remove any stubborn deposits.', 'At the end of this appointment, we will set a date for your next treatment.'];
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['General & preventative', '/dentistry/general-preventative/'], ['Hygiene & gum health']), title: 'Hygiene &amp; Gum health', img: 'tx-hygiene', alt: 'A patient smiling during a hygiene appointment', objectPosition: '40% center' })}
<section class="section"><div class="wrap tx-layout">
<div>
<p class="lede" data-reveal>Defending your oral health from gum disease with hygiene and periodontal treatments. Hygienists are trained in assessing, tracking and treating gum disease.</p>
<p data-reveal>It’s important to see a hygienist and have your teeth professionally cleaned to prevent gum disease from developing and affecting your smile.</p>
<h2 class="tx-h3" style="margin:36px 0 0" data-reveal>Reasons to visit the hygienist:</h2>
${checklist(['Visits every 6 months drastically reduce the chance of developing gum disease or teeth damage', 'Frequent visits are crucial if there’s family history with gum issues', 'Helps prevent future expensive dental treatment'])}
<p data-reveal>Poor gum health is also linked to conditions such as heart disease, respiratory infections, diabetes and dementia.</p>
<div class="acc" style="margin-top:48px" data-reveal>
${accItem('What happens during the appointment?', '<p>Hygiene appointments are designed around assessing and treating gum disease, so the first step is to check for signs of the condition. Following this examination, your hygienist will carry out a scale and polish – a thorough clean that removes tartar and plaque from the tooth surfaces and around the gum line. This is especially effective as they can reach areas that you can’t with a toothbrush.</p><p>The clean will leave your teeth smooth and clean, plus it will also remove some stains. Once the polish is finished, your hygienist will provide advice on how to keep your gums bacteria-free.</p>')}
${accItem('Guided Biofilm Therapy', '<p>At Kings Hill Dental we are very proud to be able to offer the revolutionary EMS GBT “Dental Spa” Treatment. We aim to create a relaxing, calm atmosphere at our practice, and this new equipment helps us to achieve this by providing hygiene treatment in a revolutionary new way.</p>')}
${accItem('What is GBT?', `<p>Biofilm is a layer of bacteria that accumulates on your teeth and can lead to gum disease if good oral hygiene is not maintained. It can also increase the risk of cardiovascular and respiratory disease, diabetes and arthritis. This spa treatment is a new state-of-the-art approach to remove biofilm.</p><p>Guided Biofilm Therapy (GBT) is based on clinically proven technologies invented in cooperation with highly respected and experienced periodontologists, caries specialists and dental hygienists. It is minimally invasive, safe, effective and gentle to teeth and soft tissues, implants and restorations. The treatment works especially well for nervous patients as it is more comfortable than the traditional scale and polish.</p><ol class="timeline" style="margin-top:32px"><span class="prog" aria-hidden="true"></span>${steps.map((s) => `<li><p>${s}</p></li>`).join('')}</ol>`)}
</div>
</div>
${asideCard('/dentistry/general-preventative/hygiene-gum-health/')}
</div></section>`;
  return { path: '/dentistry/general-preventative/hygiene-gum-health/', title: 'Hygiene & Gum Health | Kings Hill Dental', description: 'Hygiene appointments and Guided Biofilm Therapy at Kings Hill Dental: protect your gums and your natural teeth.', bodyClass: 'tx-page', body };
}

/* ---------- TREATMENT pages: Children's Dentistry and Bruxism ----------
   Both were, until now, just a sentence on the General & Preventative accordion, linking out to the
   contact form. Built out here to match the Hygiene & Gum Health page's layout (chosen as the shared
   template over the other draft concepts). Copy beyond the original one-sentence blurb is still new
   and should have a proper clinical read-through before this goes live. */
function childrensDentistry() {
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['General & preventative', '/dentistry/general-preventative/'], ['Children’s dentistry']), title: 'Children’s Dentistry', img: 'tx-children', alt: 'A young child brushing their teeth with a dentist, watching in a mirror', objectPosition: '62% 25%' })}
<section class="section"><div class="wrap tx-layout">
<div>
<p class="lede" data-reveal>Dental visits from a young age can help identify developmental issues that can be fixed early, as well as protecting your child from long term damage and expensive treatment.</p>
<p data-reveal>We know a first trip to the dentist can feel like a big moment — for both of you. Our team keeps visits short, friendly and unhurried, so your child grows up seeing the dentist as a normal, positive part of looking after themselves.</p>
<h2 class="tx-h3" style="margin:36px 0 0" data-reveal>Reasons to start early:</h2>
${checklist(['The same kind, familiar team at every visit', 'A dedicated kids’ corner while you wait', 'Short, positive appointments — just long enough, never longer', 'Building healthy habits early, for life'])}
<div class="acc" style="margin-top:48px" data-reveal>
${accItem('When should my child have their first check-up?', '<p>We recommend a first check-up once the first tooth appears, or by their first birthday. We keep the visit short — often just a friendly look and a count of teeth — so your child can meet the team before any treatment is ever needed.</p>')}
${accItem('What happens as they get older?', '<p>From around age three, regular check-ups let us catch early signs of decay while it’s still simple to treat, and we can apply fluoride varnish and fissure sealants to help protect new teeth.</p><p>Once adult teeth start coming through, we keep an eye on spacing and bite, and can flag anything that may benefit from an orthodontic opinion later on.</p>')}
</div>
<h2 class="tx-h3" style="margin-top:clamp(32px,4vw,48px)" data-reveal>What to expect, by age</h2>
<ol class="timeline" style="margin-top:32px"><span class="prog" aria-hidden="true"></span>
<li><h3 class="h4" style="margin-bottom:4px">First tooth</h3><p>Book a first check-up once the first tooth appears, or by their first birthday. It helps your child meet the team before any treatment is ever needed.</p></li>
<li><h3 class="h4" style="margin-bottom:4px">Ages 3–6</h3><p>Regular check-ups catch early signs of decay while it’s still simple to treat, and we’ll help you build a fuss-free brushing routine at home.</p></li>
<li><h3 class="h4" style="margin-bottom:4px">Ages 7+</h3><p>Adult teeth start coming through, so we keep an eye on spacing and bite, and talk to your child directly, building their own confidence and ownership.</p></li>
</ol>
</div>
${asideCard('/dentistry/general-preventative/childrens-dentistry/')}
</div></section>`;
  return { path: '/dentistry/general-preventative/childrens-dentistry/', title: 'Children’s Dentistry | Kings Hill Dental', description: 'Gentle, friendly dental care for children at Kings Hill Dental, from their first tooth onwards.', bodyClass: 'tx-page', body };
}

function bruxism() {
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['General & preventative', '/dentistry/general-preventative/'], ['Bruxism']), title: 'Bruxism', img: 'tx-bruxism', alt: 'A man experiencing jaw discomfort', objectPosition: '70% center' })}
<section class="section"><div class="wrap tx-layout">
<div>
<p class="lede" data-reveal>If you are suffering with consistent grinding and clenching of your teeth, then you might have bruxism. Our experts can help diagnose and treat it, leaving you discomfort free.</p>
<p data-reveal>Grinding or clenching often happens without realising — most people find out from a partner, a headache pattern, or a dentist spotting the wear. None of these on their own mean much, but a few together are worth a conversation.</p>
<h2 class="tx-h3" style="margin:36px 0 0" data-reveal>Signs to look out for:</h2>
${checklist(['Waking up with a sore or tired jaw', 'Headaches, especially first thing in the morning', 'Noticeably flat or worn edges on your teeth', 'A partner mentioning they’ve heard you grinding at night'])}
<div class="acc" style="margin-top:48px" data-reveal>
${accItem('What can cause it?', '<p>Stress and anxiety are by far the most common trigger, alongside sleep disorders such as snoring or sleep apnoea, lifestyle factors like caffeine, alcohol or smoking, and a bite that isn’t quite meeting evenly.</p>')}
${accItem('How we can help', '<p>We can fit a custom night guard to protect your teeth as you sleep, review your bite and jaw alignment for any contributing cause, and monitor wear over time so we catch any changes early.</p>')}
</div>
</div>
${asideCard('/dentistry/general-preventative/bruxism/')}
</div></section>`;
  return { path: '/dentistry/general-preventative/bruxism/', title: 'Bruxism | Kings Hill Dental', description: 'Recognise the signs of bruxism (teeth grinding) and how Kings Hill Dental can help treat it.', bodyClass: 'tx-page', body };
}

/* ---------- TREATMENT FIELD: restorative (design kept from the dentistry hub — feature row + pills) ---------- */
function restorativeField() {
  const treatments = [
    ['fillings', 'Fillings', 'A well-established and inexpensive way to repair tooth damage — often the first treatment we recommend for a cavity, or a cracked or broken tooth.', ['Prevents decay growing deeper and damaging the root', 'Relieves pain and sensitivity', 'Restores the tooth’s functionality', 'A seamless, natural-looking finish'], 'rx-fillings'],
    ['crowns-bridges', 'Crowns & Bridges', 'A crown restores and protects a heavily filled or broken tooth, while a bridge replaces a missing tooth by joining crowns either side of the gap.', ['Restores functionality and improves aesthetics', 'Durable, and prevents further damage', 'Looks, feels and functions like a natural tooth', 'Can improve speech affected by missing teeth'], 'hero-restorative'],
    ['root-canals', 'Root Canal Treatment', 'When the internal tissue of a tooth becomes infected, root canal treatment removes it and seals the tooth, saving it from extraction.', ['Stops the infection spreading further', 'Relieves pain from an infected tooth', 'Less expensive than replacing the tooth', 'A treated tooth can last a long time'], 'topic-restorative'],
    ['dentures', 'Dentures', 'Removable partial or full dentures give you a complete, natural-looking smile, and can also improve how you eat and speak.', ['Natural-looking appearance', 'Can enhance facial shape', 'Improves eating and speaking ability', 'An effective, affordable way to restore your smile'], 'rx-dentures', 'center 18%'],
    ['implants', 'Implants', 'One of the most effective and long-lasting ways to replace one or more missing teeth, using titanium posts that act like natural tooth roots.', ['Sturdy, permanent positioning', 'Protects the jawbone and surrounding teeth', 'Restores speaking and chewing ability', 'Avoids adhesives or daily soaking routines'], 'practice-consultation'],
  ];
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['Restorative']), title: `Restorative Dentistry`, img: 'hero-restorative', alt: `A dentist showing a patient a shade guide during a consultation`, objectPosition: '70% center' })}
<section class="phero-intro"><div class="wrap"><div class="phero-copy"><p class="lede" data-reveal>Teeth go through a lot during our lifetime. Whether it’s a cavity, a chip, or a missing tooth, restorative dentistry can repair the damage and bring back your natural, confident smile.</p><p data-reveal>You can find out more about each of our restorative options below.</p></div></div></section>
<section class="section" style="padding-top:0"><div class="wrap rows">
<article class="row"><div class="row-media clip-in"><img data-parallax="34" src="/img/topic-restorative.webp" alt="" loading="lazy" width="1800" height="800"></div><div><h2 class="h2" data-split>Fixing, restoring, rebuilding</h2><div class="rule" data-reveal></div><p class="lede" data-reveal>From a simple filling to a full implant, our restorative treatments repair damage, relieve discomfort and restore the look and function of your natural teeth. Choose a treatment below to find out more.</p><div class="pills" data-reveal>${treatments.map(([id, t]) => `<a href="#${id}">${t}</a>`).join('')}</div></div></article>
</div></section>
<section class="section" style="background:#fff"><div class="wrap" style="max-width:1080px">
<h2 class="h1" data-split>Explore our restorative treatments</h2>
<div class="rule" data-reveal></div>
<div class="acc rx-acc" data-single style="margin-top:32px" data-reveal>
${treatments.map(([id, t, d, benefits, img, pos], i) => accItem(t, `<div class="rx-row"><div class="rx-text"><p>${d}</p>${checklist(benefits)}<div class="actions" style="margin-top:8px">${arrowBtn('Enquire about ' + t, '/contact/?about=' + encodeURIComponent(t), 'btn--ghost')}</div></div><div class="rx-media"><img src="/img/${img}.webp" alt="" loading="lazy" width="900" height="700"${pos ? ` style="object-position:${pos}"` : ''}></div></div>`, i === 0, id)).join('')}
</div>
</div></section>
${ctaBand('Not sure which treatment is right for you?', 'Book an appointment and one of our dentists will help you find the right treatment.')}`;
  return { path: '/dentistry/restorative/', title: 'Restorative Dentistry | Kings Hill Dental', description: 'Fillings, crowns & bridges, root canal treatment, dentures and implants at Kings Hill Dental in West Malling.', bodyClass: 'wide-intro', body };
}

/* ---------- TREATMENT FIELD: cosmetic (new layout option — a segmented, tabbed showcase) ---------- */
function cosmeticField() {
  const treatments = [
    ['whitening', 'Teeth Whitening', 'cx-whitening', 'A simple, effective way to lift years of staining and reveal a brighter smile — professional-strength whitening, applied and monitored by our team rather than a high-street kit.', ['A noticeably brighter smile', 'Professional strength, safely supervised', 'Longer-lasting than over-the-counter kits', 'Safe for teeth and gums'], '50% 25%'],
    ['bonding', 'Composite Bonding', 'cx-bonding', 'A quick, minimally-invasive way to reshape a chipped, gapped or uneven tooth. We sculpt tooth-coloured composite directly onto the tooth, blending it seamlessly with your natural smile.', ['Corrects chips, gaps and uneven edges', 'No drilling in most cases', 'Usually completed in a single visit', 'A natural, seamless finish'], '28% 35%'],
    ['veneers', 'Veneers', 'hero-cosmetic', 'Thin, custom-made shells bonded to the front of your teeth — ideal for correcting colour, shape and alignment together, for a natural-looking, long-lasting smile.', ['Corrects colour, shape and alignment together', 'Custom shade-matched to your natural teeth', 'Stain-resistant and durable', 'A natural, long-lasting result'], '82% 38%'],
  ];
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['Cosmetic']), title: `Cosmetic Dentistry`, img: 'hero-cosmetic', alt: `A dentist matching a veneer shade for a patient`, objectPosition: '70% center' })}
<section class="phero-intro"><div class="wrap"><div class="phero-copy"><p class="lede" data-reveal>We have an expansive range of cosmetic treatments that can correct minor issues, straighten smiles and whiten teeth. We want to help you build a natural-looking smile you’re proud of.</p><p data-reveal>We never push our patients towards cosmetic work — instead, we’ll help you find the treatment that’s genuinely right for you.</p></div></div></section>
<section class="section" style="padding-top:0" aria-label="Cosmetic treatments"><div class="wrap">
<h2 class="h1" data-split>Choose a treatment</h2>
<div class="rule" data-reveal></div>
<p class="lede" data-reveal style="max-width:44em">Whatever’s holding your smile back, there’s a cosmetic treatment to help — select one below to find out more.</p>
<div class="cx" data-cx data-reveal>
<div class="cx-tabs" role="tablist" aria-label="Choose a cosmetic treatment">${treatments.map(([id, t], i) => `<button type="button" id="${id}" role="tab" aria-selected="${i === 0}">${t}</button>`).join('')}</div>
<div class="cx-card">
<div class="cx-media">${treatments.map(([id, t, img, d, benefits, pos], i) => `<img class="${i === 0 ? 'on' : ''}" src="/img/${img}.webp" alt="" loading="lazy" width="1200" height="900"${pos ? ` style="object-position:${pos}"` : ''}>`).join('')}</div>
<div class="cx-body">${treatments.map(([id, t, img, d, benefits], i) => `<div data-cx-body${i ? ' hidden' : ''}><h3 class="h3">${t}</h3><p style="margin-top:14px">${d}</p>${checklist(benefits)}<div class="actions" style="margin-top:24px">${arrowBtn('Enquire about ' + t, '/contact/?about=' + encodeURIComponent(t), 'btn--ghost')}</div></div>`).join('')}</div>
</div>
</div>
</div></section>
${ctaBand('Not sure which treatment is right for you?', 'Book an appointment and one of our dentists will help you find the right treatment.')}`;
  return { path: '/dentistry/cosmetic/', title: 'Cosmetic Dentistry | Kings Hill Dental', description: 'Teeth whitening, composite bonding and veneers at Kings Hill Dental in West Malling.', bodyClass: 'wide-intro', body };
}

/* ---------- TREATMENT FIELD: orthodontic (new layout option — hover list with a swapping portrait, echoing the team section) ---------- */
function orthodonticField() {
  const cards = [
    ['Invisalign', 'Clear, removable aligners for a subtle way to straighten your smile — comfortable, virtually invisible, and fitted around your lifestyle.', 'hero-orthodontic', '/contact/?about=Invisalign', 'invisalign'],
    ['Invisalign Go', 'A shorter, more affordable Invisalign treatment designed for mild-to-moderate cases, giving you a straighter smile sooner.', 'topic-orthodontic', '/contact/?about=Invisalign%20Go', 'invisalign-go'],
    ['Fixed Braces', 'Traditional fixed braces for precise, reliable results — a tried-and-tested option for even the more complex cases.', 'tx-fixed-braces', '/contact/?about=Fixed%20braces', 'fixed-braces'],
    ['Spark Aligners', 'A clear aligner alternative, virtually invisible in everyday wear, offering a discreet way to straighten your teeth.', 'tx-spark', '/contact/?about=Spark%20aligners', 'spark-aligners'],
  ];
  const body = `
${splitHero({ crumbs: crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['Orthodontic']), title: `Orthodontic Dentistry`, img: 'hero-orthodontic', alt: `A clear aligner and dental mould held in hand`, objectPosition: '65% center' })}
<section class="phero-intro"><div class="wrap"><div class="phero-copy"><p class="lede" data-reveal>Orthodontics is the branch of dentistry that corrects irregularities of the teeth and jaws, creating beautifully straight, healthy smiles.</p><p data-reveal>You can find out more about our options of Orthodontic care below.</p></div></div></section>
<section class="section tint"><div class="wrap cards">
${cards.map(([t, d, img, h, id], i) => `<a class="card" id="${id}" href="${h}" data-reveal style="--d:${i % 2}"><div class="card-img" style="aspect-ratio:16/9"><img src="/img/${img}.webp" alt="" loading="lazy" width="1800" height="800"></div><div class="card-body"><h3>${t}</h3><p>${d}</p><span class="link-arrow" style="align-self:flex-start">Find out More${I.arrow}</span></div></a>`).join('')}
</div></section>
${ctaBand('Not sure which treatment is right for you?', 'Book an appointment and one of our dentists will help you find the right treatment.')}`;
  return { path: '/dentistry/orthodontic/', title: 'Orthodontic Dentistry | Kings Hill Dental', description: 'Invisalign, Invisalign Go, fixed braces and Spark aligners at Kings Hill Dental in West Malling.', bodyClass: 'wide-intro', body };
}

module.exports = { dentistry, aesthetics, aestheticsAntiWrinkle, aestheticsSkinCare, aestheticsProfhilo, aestheticsFillers, feesPage, membership, referrals, topicGeneral, examinations, hygiene, childrensDentistry, bruxism, restorativeField, cosmeticField, orthodonticField };

/* ---------- LEGAL (client copy carried over as-is; still Wix template text) ---------- */
function legal(slug, title, p, description) {
  const c = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '_capture', 'copy.json'), 'utf8'));
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const items = c[slug].secs.filter((s) => s.tag === 'SECTION').flatMap((s) => s.items).map((t) => t.replace(/\u200b/g, '').trim()).filter(Boolean);
  const html = items.map((t) => (/^h2: /.test(t) ? '' : /^h3: /.test(t) ? `<h2 class="h4" style="margin-top:1.6em">${esc(t.slice(4))}</h2>` : /^A\[/.test(t) ? '' : `<p>${esc(t)}</p>`)).join('\n');
  const body = `${splitHero({ crumbs: crumbs(['Home', '/'], [title]), title: `${title}`, img: 'practice-exterior', alt: `Kings Hill Dental` })}
<section class="section"><div class="wrap" style="max-width:820px"><div class="stack">${html}</div></div></section>`;
  return { path: p, title: title + ' | Kings Hill Dental', description, body };
}
const privacy = () => legal('blank-4', 'Privacy Policy', '/privacy-policy/', 'Privacy policy for Kings Hill Dental.');
const accessibility = () => legal('blank-5', 'Accessibility Statement', '/accessibility-statement/', 'Accessibility statement for the Kings Hill Dental website.');
module.exports.privacy = privacy;
module.exports.accessibility = accessibility;
