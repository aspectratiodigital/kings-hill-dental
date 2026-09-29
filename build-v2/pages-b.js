const fs = require('fs');
const path = require('path');
const { I, PORTAL } = require('./parts');
const { arrowBtn, partners, pageHero } = require('./pages-a');
const fees = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '_capture', 'acc-fees.json'), 'utf8')).d2[0];

const crumbs = (...c) => `<ul class="crumbs" aria-label="Breadcrumb">${c.map(([t, h]) => `<li>${h ? `<a href="${h}">${t}</a>` : t}</li>`).join('')}</ul>`;
const ctaBand = (title = 'Not sure where to start?', text = 'Book an appointment and one of our dentists will help you find the right treatment.') => `<section class="section--tight cta-band"><div class="wrap"><h2 class="h1" data-split>${title}</h2><p class="lede" data-reveal style="margin-inline:auto;margin-top:22px">${text}</p><div class="actions" data-reveal>${arrowBtn('Book an Appointment', PORTAL, '', true)}<a class="btn btn--ghost" href="/contact/">Contact us</a></div></div></section>`;

/* ---------- DENTISTRY hub ---------- */
function dentistry() {
  const cats = [
    ['general', 'General & Preventative', 'Protecting oral health with routine dentistry and general dental care. Regular visits to the dentist and hygiene will help you take the very best care of your natural smile.', 'topic-general', [['Dental examinations', '/dentistry/general-preventative/dental-examinations/'], ['Hygiene & gum health', '/dentistry/general-preventative/hygiene-gum-health/'], ['Children’s dentistry'], ['Bruxism']], '/dentistry/general-preventative/'],
    ['restorative', 'Restorative Dentistry', 'Teeth go through a lot during our lifetime. Restorative dentistry allows us to fix any problems such as cavities, chips, and broken or missing teeth, restoring your beautiful smile.', 'topic-restorative', [['Fillings', '/dentistry/restorative/#fillings'], ['Crowns & bridges', '/dentistry/restorative/#crowns-bridges'], ['Root canals', '/dentistry/restorative/#root-canals'], ['Dentures', '/dentistry/restorative/#dentures'], ['Implants', '/dentistry/restorative/#implants']], '/dentistry/restorative/'],
    ['cosmetic', 'Cosmetic Dentistry', 'We have an expansive range of cosmetic treatments that can correct minor issues, straighten smiles and whiten teeth. We want to help you build a natural looking smile.', 'topic-cosmetic', [['Teeth whitening', '/dentistry/cosmetic/#whitening'], ['Composite bonding', '/dentistry/cosmetic/#bonding'], ['Veneers', '/dentistry/cosmetic/#veneers']], '/dentistry/cosmetic/'],
    ['orthodontic', 'Orthodontic Dentistry', 'Creating beautifully straight and healthy smiles with orthodontic treatment. Orthodontics is the branch of dentistry that corrects irregularities of the teeth and jaws.', 'topic-orthodontic', [['Invisalign', '/dentistry/orthodontic/#invisalign'], ['Invisalign Go', '/dentistry/orthodontic/#invisalign-go'], ['Fixed braces', '/dentistry/orthodontic/#fixed-braces'], ['Spark aligners', '/dentistry/orthodontic/#spark-aligners']], '/dentistry/orthodontic/'],
  ];
  const body = `
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Dentistry'])}`, title: `Dentistry`, img: 'hero-old', alt: `A dentist talking with a patient`, intro: `<p class="lede" data-reveal>At Kings Hill Dental our number 1 priority is our patients. Our warm and skilled team endeavour to provide the highest quality of advice and care, whilst ensuring our patients feel comfortable, safe and informed.</p><p data-reveal>We never push our patients towards treatments or cosmetic work and instead we work with you, to find the best treatment to improve your confidence and create the natural beautiful smile you deserve!</p>` })}
<section class="section section--tight" style="padding-top:0"><div class="wrap">
<p class="lede" data-reveal style="max-width:44em">You can discover our range of dentistry options, from general health, dental repairs, long term treatments and cosmetic work, or if you’re not sure, you can book an appointment with one of our dentists to find the right treatment for you.</p>
<div class="actions" data-reveal>${arrowBtn('Book an Appointment', PORTAL, '', true)}</div>
</div></section>
<section class="section" style="padding-top:0"><div class="wrap rows">
${cats.map(([id, t, d, img, pills, href], i) => `<article class="row" id="${id}"><div class="row-media clip-in"><img data-parallax="34" src="/img/${img}.webp" alt="" loading="lazy" width="1800" height="800"></div><div><h2 class="h2" data-split>${t}</h2><div class="rule" data-reveal></div><p class="lede" data-reveal>${d}</p><div class="pills" data-reveal>${pills.map(([n, h]) => (h ? `<a href="${h}">${n}</a>` : `<span class="pill-off">${n}</span>`)).join('')}</div><div class="actions" style="margin-top:32px" data-reveal>${arrowBtn('Find out More', href, 'btn--ghost')}</div></div></article>`).join('')}
</div></section>`;
  return { path: '/dentistry/', title: 'Dentistry | Kings Hill Dental', description: 'General and preventative, restorative, cosmetic and orthodontic dentistry at Kings Hill Dental in West Malling.', body };
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
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Aesthetics'])}`, title: `Aesthetics`, img: 'aes-skin-care', alt: `Skin care treatment`, intro: `<p class="lede" data-reveal>We are able to help reverse the signs of ageing with confidence-boosting facial aesthetic treatments. Non-surgical treatments such as anti-wrinkle injections and dermal fillers can restore lost volume and reduce noticeable lines.</p><p data-reveal>We believe natural is beautiful and our aesthetics procedures exist to help reduce small imperfections and boost your confidence. We aim to ensure all of our patients are well informed about the type of treatment they are undergoing, especially by matching patients with the correct specific treatment for them.</p>` })}
<section class="section section--tight" style="padding-top:0"><div class="wrap">
<p class="lede" data-reveal style="max-width:44em">You can discover our range of aesthetic procedures below or if you’re not sure what kind of work you want done, you can book an appointment with our team and we can help you find the right treatment!</p>
<div class="actions" data-reveal>${arrowBtn('Book an Appointment', PORTAL, '', true)}</div>
</div></section>
<section class="section tint"><div class="wrap cards cards--4">
${items.map(([id, t, d, img], i) => `<a class="card" id="${id}" href="/contact/?about=Aesthetics" data-reveal style="--d:${i}"><div class="card-img"><img src="/img/${img}.webp" alt="" loading="lazy" width="1400" height="900"></div><div class="card-body"><h3>${t}</h3><p>${d}</p><span class="link-arrow" style="align-self:flex-start">Find out More${I.arrow}</span></div></a>`).join('')}
</div></section>`;
  return { path: '/aesthetics/', title: 'Aesthetics | Kings Hill Dental', description: 'Non-surgical facial aesthetics in West Malling: anti-wrinkle treatments, Obagi skin care, Profhilo and dermal fillers.', body };
}

/* ---------- FEES ---------- */
function feesPage() {
  const acc = fees.titles.map((t, i) => {
    const rows = (fees.tables[i] || []).map(([n, p]) => `<tr><td>${n.trim()}</td><td>${p}</td></tr>`).join('');
    return `<details${i === 0 ? ' open data-keep="1"' : ''}><summary>${t.replace(/&/g, '&amp;')}<span class="pm" aria-hidden="true"></span></summary><div class="panel"><div><div class="panel-in"><table class="price-table"><caption class="vh">${t}</caption><tbody>${rows}</tbody></table></div></div></div></details>`;
  }).join('');
  const body = `
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Fees'])}`, title: `Fees`, img: 'practice-consultation', alt: `A consultation at Kings Hill Dental`, intro: `<p class="lede" data-reveal>All of our patients at Kings Hill Clinic receive a written treatment plan, clearly outlining the clinical needs and costs of treatment.</p>` })}
<section class="section" style="padding-top:0"><div class="wrap tx-layout">
<div>
<div class="search" data-reveal><label class="vh" for="fee-search">Search fees</label>${I.search}<input id="fee-search" type="search" placeholder="Search treatments, e.g. hygiene or X-ray" autocomplete="off"></div>
<div class="acc" data-single style="margin-top:32px" data-reveal>${acc}</div>
<p class="empty" id="fee-none" hidden>Nothing matches that search. Try a different word, or call us and we’ll help.</p>
</div>
<aside class="tx-aside"><div class="aside-card"><h3>Need help choosing?</h3><p>Not sure which treatment is right for you, or nervous about getting treatment/aesthetic work for the first time?</p><p>Our kind team of dental professionals are here to help you choose the right procedure for your smile…</p>${arrowBtn('Book an Appointment', PORTAL, 'btn--light', true)}<div class="aside-links"><a href="/fees/membership-plan/">Membership plan${I.arrow}</a><a href="/contact/">Contact us${I.arrow}</a></div></div></aside>
</div></section>`;
  return { path: '/fees/', title: 'Fees | Kings Hill Dental', description: 'Clear, transparent fees for examinations, hygiene, dental treatments, orthodontics, implants and aesthetics at Kings Hill Dental.', body };
}

/* ---------- MEMBERSHIP ---------- */
function membership() {
  const tiles = [[I.shield, 'Insurance', 'Worldwide dental accident and emergency insurance to put your mind at ease'], [I.coins, 'Spread costs', 'Pay for routine appointments throughout the year, reducing the upfront costs.'], [I.eye, 'Prevention', 'Regular and continued monitoring to prevent problems before they start']];
  const tk = (a) => `<ul class="ticks">${a.map((t, i) => `<li style="--i:${i}">${I.tickBig}<span>${t}</span></li>`).join('')}</ul>`;
  const body = `
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Fees', '/fees/'], ['Membership plan'])}`, title: `Membership Plan`, img: 'practice-waiting-room', alt: `The waiting room at Kings Hill Dental`, intro: `<p class="lede" data-reveal>Our membership plans make it easy to keep your smile healthy by providing consistent quality care.</p>` })}
<section class="section section--tight" style="padding-top:0"><div class="wrap"><ul class="values" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));border-left:0">${tiles.map(([ic, t, d]) => `<li data-reveal style="border-left:0;padding-left:0">${ic}<div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ul></div></section>
<section class="section tint"><div class="wrap plans" style="align-items:start">
<div style="position:sticky;top:calc(var(--header-h) + 30px)"><h2 class="h1" data-split>Choose a plan</h2><div class="rule" data-reveal></div><p class="lede" data-reveal>Our plans provide all the essential dental treatments you need, looking after your teeth and gums while making your dental care more affordable.</p></div>
<div data-reveal>
<div class="seg" role="tablist" aria-label="Membership plan"><button type="button" role="tab" aria-selected="true">Children’s</button><button type="button" role="tab" aria-selected="false">Adult</button></div>
<div class="plan-card">
<div class="plan-photo"><img class="on" src="/img/plan-child.webp" alt="" loading="lazy" width="1200" height="800"><img src="/img/plan-adult.webp" alt="" loading="lazy" width="1200" height="800"></div>
<div class="plan-body" data-plan><h3 class="h3">Children’s Membership</h3><p style="margin-top:16px">Our child’s plan encourages regular attendance, ensuring your child maintains healthy teeth and gums for life, preventing expensive procedures later in life.</p>
<div class="ages" role="group" aria-label="Age group"><button type="button" aria-pressed="true" data-price="£10.40">Under 8 Years</button><button type="button" aria-pressed="false" data-price="£11.25">8-12 Years</button><button type="button" aria-pressed="false" data-price="£12.10">13-17 Years</button></div>
<div class="price"><b>£10.40</b><small>per month</small></div>${tk(['A scale and polish treatment, with oral hygiene instruction', 'Up to two dental examinations per year', 'Any necessary x rays', '10% discount off routine treatment', 'Worldwide dental accident and emergency cover'])}${arrowBtn('Sign up Now', PORTAL, '', true)}</div>
<div class="plan-body" data-plan hidden><h3 class="h3">Adult Membership</h3><p style="margin-top:16px">The plan provides all the essential dental treatments you need, looking after your teeth and gums while making your dental care more affordable.</p>
<div class="price"><b>£25.85</b><small>per month</small></div>${tk(['Up to two dental hygiene treatments per year', 'Up to two dental examinations per year', 'Up to two routine X rays per year', '10% discount off routine treatment', 'Worldwide dental accident and emergency cover'])}${arrowBtn('Sign up Now', PORTAL, '', true)}</div>
</div></div>
</div></section>`;
  return { path: '/fees/membership-plan/', title: 'Membership plan | Kings Hill Dental', description: 'Kings Hill Dental membership plans for children and adults: examinations, hygiene, x-rays, discounts and worldwide emergency cover.', body };
}

/* ---------- REFERRALS ---------- */
function referrals() {
  const tx = ['Orthodontics', 'Implants', 'Facial Aesthetics', 'Skin Care', 'Hygiene', 'Endodontic treatment & CBCT'];
  const f = (id, name, label, extra = '', type = 'text') => `<div class="field"><input id="${id}" name="${name}" type="${type}" placeholder=" " ${extra}><label for="${id}">${label}</label><p class="err" role="alert"></p></div>`;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const countries = ['United Kingdom', 'Ireland', 'United States', 'Canada', 'Australia', 'New Zealand', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'India', 'Other'];
  const body = `
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Referrals'])}`, title: `Referrals`, img: 'practice-entrance', alt: `The entrance to Kings Hill Dental`, intro: `<p class="lede" data-reveal>Referring a patient to us takes a few minutes. Tell us what treatment they need, who you are and who you’re referring, and we’ll take it from there.</p>` })}
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
    ['childrens', 'Children’s Dentistry', 'Dental visits from a young age can help identify developmental issues that can be fixed early, as well as protecting your child from long term damage and expensive treatment.', 'tx-children', '/contact/?about=Check-up', '62% 25%'],
    ['bruxism', 'Bruxism', 'If you are suffering with consistent grinding and clenching of your teeth, then you might have Bruxism. Our experts can help diagnose and treat, leaving you discomfort free.', 'tx-bruxism', '/contact/?about=Check-up'],
  ];
  const body = `
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['General & preventative'])}`, title: `General &amp; Preventative`, img: 'hero-general', alt: `A dentist and patient sharing a laugh during a consultation`, intro: `<p class="lede" data-reveal>We focus on helping patients maintain healthy teeth and gums through regular examinations and preventative care. We understand the dentist can seem daunting and so our team of kind, professional dentists are here to make your visit as relaxing and informative as possible.</p><p data-reveal>Hover or select a treatment below to find out more.</p>` })}
<section class="section" style="padding-top:0" aria-label="General and preventative treatments"><div class="wrap">
<div class="gp-accordion" data-accordion data-reveal>${items.map(([id, t, d, img, h, pos], i) => `<div class="gp-tile" id="${id}" style="--d:${i}"><img class="gp-photo" src="/img/${img}.webp" alt="" loading="lazy" width="900" height="700"${pos ? ` style="object-position:${pos}"` : ''}><div class="gp-caption"><h3>${t}</h3><p>${d}</p><a class="gp-more" href="${h}"><span class="lbl">Find out more</span>${I.arrow}</a></div></div>`).join('')}</div>
</div></section>
${ctaBand('Not sure which treatment is right for you?', 'Book an appointment and one of our dentists will help you find the right treatment.')}`;
  return { path: '/dentistry/general-preventative/', title: 'General & Preventative Dentistry | Kings Hill Dental', description: 'Dental examinations, hygiene and gum health, children’s dentistry and bruxism care at Kings Hill Dental.', bodyClass: 'gp-page', body };
}

/* ---------- TREATMENT pages ---------- */
function asideCard(current) {
  const links = [['Dental examinations', '/dentistry/general-preventative/dental-examinations/'], ['Hygiene & gum health', '/dentistry/general-preventative/hygiene-gum-health/'], ['All general & preventative', '/dentistry/general-preventative/']].filter((l) => l[1] !== current);
  return `<aside class="tx-aside"><div class="aside-card"><h3>Book a visit</h3><p>Our team will explain everything before we begin, so you always know what to expect.</p>${arrowBtn('Book an Appointment', PORTAL, 'btn--light', true)}<div class="aside-links">${links.map(([t, h]) => `<a href="${h}">${t}${I.arrow}</a>`).join('')}</div></div></aside>`;
}
const checklist = (a) => `<ul class="checklist">${a.map((t, i) => `<li style="--i:${i}">${I.tickBig}<span>${t}</span></li>`).join('')}</ul>`;
const accItem = (t, html, open, id) => `<details${open ? ' open' : ''}${id ? ` id="${id}"` : ''}><summary>${t}<span class="pm" aria-hidden="true"></span></summary><div class="panel"><div><div class="panel-in stack">${html}</div></div></div></details>`;

function examinations() {
  const body = `
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['General & preventative', '/dentistry/general-preventative/'], ['Dental examinations'])}`, title: `Dental Examinations`, img: 'tx-exam', alt: `A dentist and patient during an examination`, intro: `<p class="lede" data-reveal>Routine examinations are the foundation of your oral health care. Regular check-ups allow us to spot and address any problems early.</p>` })}
<section class="section" style="padding-top:0"><div class="wrap tx-layout">
<div>
<p class="lede" data-reveal>During your appointment, we will examine and assess your teeth, gums and mouth, as well as look at your overall health.</p>
<h2 class="h3" style="margin:36px 0 0" data-reveal>Our dental examination includes:</h2>
${checklist(['Check teeth and gums for any signs of wear, decay or gum disease', 'Soft tissues and tongue, ensuring they are all looking healthy', 'Face, neck and jaw, checking for any issues or abnormalities', 'Bite, making sure your teeth mesh together properly', 'Oral cancer check'])}
<div class="acc" data-single style="margin-top:48px" data-reveal>
${accItem('What happens during the check up?', '<p>We carry out a thorough examination that covers every aspect of your oral health. As well as assessing your teeth, we will ask some questions about your general health and medical history, in case this is affecting your dental wellbeing.</p><p>We will also check any previous treatment you have had, including crowns, bridges and implants, to make sure they are still working correctly. We may need to take x-rays of your mouth. We will also discuss any concerns you may have, or if there are any cosmetic treatments you wish to know more about.</p><p>If necessary, we can provide advice and tips for your oral hygiene routine at home, to ensure you are able to keep your teeth in top condition.</p><p>Following the assessment, if we find anything that requires further treatment, we will set out your treatment plan and discuss with you the next steps and expected costs.</p>', true)}
${accItem('How often do I need to see a dentist?', '<p>You may not need to see us every six months and your dentist will let you know when you need to come back for your next check-up. If you have any problems between check-ups please phone us to arrange an earlier appointment.</p>')}
</div>
</div>
${asideCard('/dentistry/general-preventative/dental-examinations/')}
</div></section>`;
  return { path: '/dentistry/general-preventative/dental-examinations/', title: 'Dental Examinations | Kings Hill Dental', description: 'Routine dental examinations at Kings Hill Dental: what happens during a check-up and how often you should visit.', body };
}

function hygiene() {
  const steps = ['To begin with, we will assess your mouth and gum health, looking for any signs of gum disease or decay.', 'We then apply a disclosing solution to your teeth which will make any dental biofilm easier to detect.', 'We will then show you any problem areas and provide tips on how to improve your oral health.', 'At this point we will begin the Dental Spa treatment. The combination of air, fine powder and warm water creates a spray that will gently and comfortably exfoliate and remove stain.', 'After this, we will remove any remaining tartar using our no pain instrument. This is minimally invasive, comfortable and highly efficient.', 'A final check is then performed to ensure all biofilm and tartar has been removed. It may be necessary to use a handscaler to remove any stubborn deposits.', 'At the end of this appointment, we will set a date for your next treatment.'];
  const body = `
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['General & preventative', '/dentistry/general-preventative/'], ['Hygiene & gum health'])}`, title: `Hygiene &amp; Gum health`, img: 'tx-hygiene', alt: `A patient smiling during a hygiene appointment`, intro: `<p class="lede" data-reveal>Defending your oral health from gum disease with hygiene and periodontal treatments. Hygienists are trained in assessing, tracking and treating gum disease.</p>` })}
<section class="section" style="padding-top:0"><div class="wrap tx-layout">
<div>
<p class="lede" data-reveal>It’s important to see a hygienist and have your teeth professionally cleaned to prevent gum disease from developing and affecting your smile.</p>
<h2 class="h3" style="margin:36px 0 0" data-reveal>Reasons to visit the hygienist:</h2>
${checklist(['Visits every 6 months drastically reduce the chance of developing gum disease or teeth damage', 'Frequent visits are crucial if there’s family history with gum issues', 'Helps prevent future expensive dental treatment'])}
<p data-reveal>Poor gum health is also linked to conditions such as heart disease, respiratory infections, diabetes and dementia.</p>
<div class="acc" data-single style="margin-top:48px" data-reveal>
${accItem('What happens during the appointment?', '<p>Hygiene appointments are designed around assessing and treating gum disease, so the first step is to check for signs of the condition. Following this examination, your hygienist will carry out a scale and polish – a thorough clean that removes tartar and plaque from the tooth surfaces and around the gum line. This is especially effective as they can reach areas that you can’t with a toothbrush.</p><p>The clean will leave your teeth smooth and clean, plus it will also remove some stains. Once the polish is finished, your hygienist will provide advice on how to keep your gums bacteria-free.</p>', true)}
${accItem('Guided Biofilm Therapy', '<p>At Kings Hill Dental we are very proud to be able to offer the revolutionary EMS GBT “Dental Spa” Treatment. We aim to create a relaxing, calm atmosphere at our practice, and this new equipment helps us to achieve this by providing hygiene treatment in a revolutionary new way.</p>')}
</div>
<h2 class="h2" style="margin-top:clamp(56px,8vw,110px)" data-split>What is GBT?</h2>
<div class="stack" style="margin-top:32px" data-reveal><p>Biofilm is a layer of bacteria that accumulates on your teeth and can lead to gum disease if good oral hygiene is not maintained. It can also increase the risk of cardiovascular and respiratory disease, diabetes and arthritis. This spa treatment is a new state-of-the-art approach to remove biofilm.</p>
<p>Guided Biofilm Therapy (GBT) is based on clinically proven technologies invented in cooperation with highly respected and experienced periodontologists, caries specialists and dental hygienists. It is minimally invasive, safe, effective and gentle to teeth and soft tissues, implants and restorations. The treatment works especially well for nervous patients as it is more comfortable than the traditional scale and polish.</p></div>
<ol class="timeline" style="margin-top:48px"><span class="prog" aria-hidden="true"></span>${steps.map((s) => `<li><p>${s}</p></li>`).join('')}</ol>
</div>
${asideCard('/dentistry/general-preventative/hygiene-gum-health/')}
</div></section>`;
  return { path: '/dentistry/general-preventative/hygiene-gum-health/', title: 'Hygiene & Gum Health | Kings Hill Dental', description: 'Hygiene appointments and Guided Biofilm Therapy at Kings Hill Dental: protect your gums and your natural teeth.', body };
}

/* ---------- TREATMENT FIELD: restorative (design kept from the dentistry hub — feature row + pills) ---------- */
function restorativeField() {
  const treatments = [
    ['fillings', 'Fillings', 'A well-established and inexpensive way to repair tooth damage — often the first treatment we recommend for a cavity, or a cracked or broken tooth.', ['Prevents decay growing deeper and damaging the root', 'Relieves pain and sensitivity', 'Restores the tooth’s functionality', 'A seamless, natural-looking finish']],
    ['crowns-bridges', 'Crowns & Bridges', 'A crown restores and protects a heavily filled or broken tooth, while a bridge replaces a missing tooth by joining crowns either side of the gap.', ['Restores functionality and improves aesthetics', 'Durable, and prevents further damage', 'Looks, feels and functions like a natural tooth', 'Can improve speech affected by missing teeth']],
    ['root-canals', 'Root Canal Treatment', 'When the internal tissue of a tooth becomes infected, root canal treatment removes it and seals the tooth, saving it from extraction.', ['Stops the infection spreading further', 'Relieves pain from an infected tooth', 'Less expensive than replacing the tooth', 'A treated tooth can last a long time']],
    ['dentures', 'Dentures', 'Removable partial or full dentures give you a complete, natural-looking smile, and can also improve how you eat and speak.', ['Natural-looking appearance', 'Can enhance facial shape', 'Improves eating and speaking ability', 'An effective, affordable way to restore your smile']],
    ['implants', 'Implants', 'One of the most effective and long-lasting ways to replace one or more missing teeth, using titanium posts that act like natural tooth roots.', ['Sturdy, permanent positioning', 'Protects the jawbone and surrounding teeth', 'Restores speaking and chewing ability', 'Avoids adhesives or daily soaking routines']],
  ];
  const body = `
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['Restorative'])}`, title: `Restorative Dentistry`, img: 'hero-restorative', alt: `A dentist showing a patient a shade guide during a consultation`, intro: `<p class="lede" data-reveal>Teeth go through a lot during our lifetime. Whether it’s a cavity, a chip, or a missing tooth, restorative dentistry can repair the damage and bring back your natural, confident smile.</p><p data-reveal>You can find out more about each of our restorative options below.</p><div class="actions" data-reveal>${arrowBtn('Book an Appointment', PORTAL, '', true)}</div>` })}
<section class="section" style="padding-top:0"><div class="wrap rows">
<article class="row"><div class="row-media clip-in"><img data-parallax="34" src="/img/topic-restorative.webp" alt="" loading="lazy" width="1800" height="800"></div><div><h2 class="h2" data-split>Fixing, restoring, rebuilding</h2><div class="rule" data-reveal></div><p class="lede" data-reveal>From a simple filling to a full implant, our restorative treatments repair damage, relieve discomfort and restore the look and function of your natural teeth. Choose a treatment below to find out more.</p><div class="pills" data-reveal>${treatments.map(([id, t]) => `<a href="#${id}">${t}</a>`).join('')}</div></div></article>
</div></section>
<section class="section tint"><div class="wrap" style="max-width:900px">
<h2 class="h1" data-split>Explore our restorative treatments</h2>
<div class="rule" data-reveal></div>
<div class="acc" data-single style="margin-top:32px" data-reveal>
${treatments.map(([id, t, d, benefits], i) => accItem(t, `<p>${d}</p>${checklist(benefits)}<div class="actions" style="margin-top:8px">${arrowBtn('Enquire about ' + t, '/contact/?about=' + encodeURIComponent(t), 'btn--ghost')}</div>`, i === 0, id)).join('')}
</div>
</div></section>
${ctaBand('Not sure which treatment is right for you?', 'Book an appointment and one of our dentists will help you find the right treatment.')}`;
  return { path: '/dentistry/restorative/', title: 'Restorative Dentistry | Kings Hill Dental', description: 'Fillings, crowns & bridges, root canal treatment, dentures and implants at Kings Hill Dental in West Malling.', body };
}

/* ---------- TREATMENT FIELD: cosmetic (new layout option — a segmented, tabbed showcase) ---------- */
function cosmeticField() {
  const treatments = [
    ['whitening', 'Teeth Whitening', 'topic-cosmetic', 'A simple, effective way to lift years of staining and reveal a brighter smile — professional-strength whitening, applied and monitored by our team rather than a high-street kit.', ['A noticeably brighter smile', 'Professional strength, safely supervised', 'Longer-lasting than over-the-counter kits', 'Safe for teeth and gums']],
    ['bonding', 'Composite Bonding', 'cx-bonding', 'A quick, minimally-invasive way to reshape a chipped, gapped or uneven tooth. We sculpt tooth-coloured composite directly onto the tooth, blending it seamlessly with your natural smile.', ['Corrects chips, gaps and uneven edges', 'No drilling in most cases', 'Usually completed in a single visit', 'A natural, seamless finish']],
    ['veneers', 'Veneers', 'hero-cosmetic', 'Thin, custom-made shells bonded to the front of your teeth — ideal for correcting colour, shape and alignment together, for a natural-looking, long-lasting smile.', ['Corrects colour, shape and alignment together', 'Custom shade-matched to your natural teeth', 'Stain-resistant and durable', 'A natural, long-lasting result']],
  ];
  const body = `
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['Cosmetic'])}`, title: `Cosmetic Dentistry`, img: 'hero-cosmetic', alt: `A dentist matching a veneer shade for a patient`, intro: `<p class="lede" data-reveal>We have an expansive range of cosmetic treatments that can correct minor issues, straighten smiles and whiten teeth. We want to help you build a natural-looking smile you’re proud of.</p><p data-reveal>We never push our patients towards cosmetic work — instead, we’ll help you find the treatment that’s genuinely right for you.</p><div class="actions" data-reveal>${arrowBtn('Book an Appointment', PORTAL, '', true)}</div>` })}
<section class="section" style="padding-top:0" aria-label="Cosmetic treatments"><div class="wrap">
<h2 class="h1" data-split>Choose a treatment</h2>
<div class="rule" data-reveal></div>
<p class="lede" data-reveal style="max-width:44em">Whatever’s holding your smile back, there’s a cosmetic treatment to help — select one below to find out more.</p>
<div class="cx" data-cx data-reveal>
<div class="cx-tabs" role="tablist" aria-label="Choose a cosmetic treatment">${treatments.map(([id, t], i) => `<button type="button" id="${id}" role="tab" aria-selected="${i === 0}">${t}</button>`).join('')}</div>
<div class="cx-card">
<div class="cx-media">${treatments.map(([id, t, img], i) => `<img class="${i === 0 ? 'on' : ''}" src="/img/${img}.webp" alt="" loading="lazy" width="1200" height="900">`).join('')}</div>
<div class="cx-body">${treatments.map(([id, t, img, d, benefits], i) => `<div data-cx-body${i ? ' hidden' : ''}><h3 class="h3">${t}</h3><p style="margin-top:14px">${d}</p>${checklist(benefits)}<div class="actions" style="margin-top:24px">${arrowBtn('Enquire about ' + t, '/contact/?about=' + encodeURIComponent(t), 'btn--ghost')}</div></div>`).join('')}</div>
</div>
</div>
</div></section>
${ctaBand('Not sure which treatment is right for you?', 'Book an appointment and one of our dentists will help you find the right treatment.')}`;
  return { path: '/dentistry/cosmetic/', title: 'Cosmetic Dentistry | Kings Hill Dental', description: 'Teeth whitening, composite bonding and veneers at Kings Hill Dental in West Malling.', body };
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
${pageHero({ crumbs: `${crumbs(['Home', '/'], ['Dentistry', '/dentistry/'], ['Orthodontic'])}`, title: `Orthodontic Dentistry`, img: 'hero-orthodontic', alt: `A clear aligner and dental mould held in hand`, intro: `<p class="lede" data-reveal>Orthodontics is the branch of dentistry that corrects irregularities of the teeth and jaws, creating beautifully straight, healthy smiles.</p><p data-reveal>You can find out more about our options of Orthodontic care below.</p><div class="actions" data-reveal>${arrowBtn('Book an Appointment', PORTAL, '', true)}</div>` })}
<section class="section tint"><div class="wrap cards">
${cards.map(([t, d, img, h, id], i) => `<a class="card" id="${id}" href="${h}" data-reveal style="--d:${i % 2}"><div class="card-img" style="aspect-ratio:16/9"><img src="/img/${img}.webp" alt="" loading="lazy" width="1800" height="800"></div><div class="card-body"><h3>${t}</h3><p>${d}</p><span class="link-arrow" style="align-self:flex-start">Find out More${I.arrow}</span></div></a>`).join('')}
</div></section>
${ctaBand('Not sure which treatment is right for you?', 'Book an appointment and one of our dentists will help you find the right treatment.')}`;
  return { path: '/dentistry/orthodontic/', title: 'Orthodontic Dentistry | Kings Hill Dental', description: 'Invisalign, Invisalign Go, fixed braces and Spark aligners at Kings Hill Dental in West Malling.', body };
}

module.exports = { dentistry, aesthetics, feesPage, membership, referrals, topicGeneral, examinations, hygiene, restorativeField, cosmeticField, orthodonticField };

/* ---------- LEGAL (client copy carried over as-is; still Wix template text) ---------- */
function legal(slug, title, p, description) {
  const c = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '_capture', 'copy.json'), 'utf8'));
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const items = c[slug].secs.filter((s) => s.tag === 'SECTION').flatMap((s) => s.items).map((t) => t.replace(/\u200b/g, '').trim()).filter(Boolean);
  const html = items.map((t) => (/^h2: /.test(t) ? '' : /^h3: /.test(t) ? `<h2 class="h4" style="margin-top:1.6em">${esc(t.slice(4))}</h2>` : /^A\[/.test(t) ? '' : `<p>${esc(t)}</p>`)).join('\n');
  const body = `${pageHero({ crumbs: `${crumbs(['Home', '/'], [title])}`, title: `${title}`, img: 'practice-exterior', alt: `Kings Hill Dental`, intro: `` })}
<section class="section" style="padding-top:0"><div class="wrap" style="max-width:820px"><div class="stack">${html}</div></div></section>`;
  return { path: p, title: title + ' | Kings Hill Dental', description, body };
}
const privacy = () => legal('blank-4', 'Privacy Policy', '/privacy-policy/', 'Privacy policy for Kings Hill Dental.');
const accessibility = () => legal('blank-5', 'Accessibility Statement', '/accessibility-statement/', 'Accessibility statement for the Kings Hill Dental website.');
module.exports.privacy = privacy;
module.exports.accessibility = accessibility;
