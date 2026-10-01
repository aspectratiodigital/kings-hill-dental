const fs = require('fs');
const path = require('path');
const { I, wave, PORTAL, PHONE, EMAIL, WHATSAPP, HOURS, splitHero } = require('./parts');
const { teamOptions, teamPopups } = require('./team-options');
const { aboutIntro } = require('./about-intro-options');
const copy = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '_capture', 'copy.json'), 'utf8'));

const arrowBtn = (t, href, cls = '', ext = false) => `<a class="btn ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${t}${I.arrow}</a>`;

/* ---------- shared components ---------- */
const PARTNER_URLS = { '3-shape': 'https://www.3shape.com/', 'philips-sonicare': 'https://www.philips.co.uk/c-m-pe/sonicare-electric-toothbrushes', invisalign: 'https://www.invisalign.co.uk/', 'angel-aligner': 'https://www.angelalign.com/', ems: 'https://www.ems-dental.com/', 'oral-b': 'https://www.oralb.co.uk/', itero: 'https://www.itero.com/', sensodyne: 'https://www.sensodyne.co.uk/', 'spark-aligner': 'https://sparkaligners.com/', straumann: 'https://www.straumann.com/', suri: 'https://www.trysuri.com/', 'ems-gbt': 'https://www.ems-dental.com/en/guided-biofilm-therapy' };
function partners() {
  const aspects = JSON.parse(fs.readFileSync(path.join(__dirname, 'vec', 'logo-aspects.json'), 'utf8'));
  const logos = ['3-shape', 'philips-sonicare', 'invisalign', 'angel-aligner', 'ems', 'oral-b', 'itero', 'sensodyne', 'spark-aligner', 'straumann', 'suri', 'ems-gbt'];
  const alt = { '3-shape': '3Shape', 'philips-sonicare': 'Philips Sonicare', invisalign: 'Invisalign', 'angel-aligner': 'Angel Aligner', ems: 'EMS', 'oral-b': 'Oral-B', itero: 'iTero', sensodyne: 'Sensodyne', 'spark-aligner': 'Spark Aligner', straumann: 'Straumann', suri: 'Suri', 'ems-gbt': 'Guided Biofilm Therapy' };
  return `<section class="section section--tight partners-sec" aria-labelledby="partners-h"><div class="wrap"><h2 class="h1" id="partners-h" data-split>Our partners</h2></div><div class="marquee"><div class="marquee-track">${logos.map((l) => `<a class="plogo" href="${PARTNER_URLS[l]}" target="_blank" rel="noopener" aria-label="${alt[l]} (opens in a new tab)" style="--k:${(1 / Math.sqrt(aspects[l])).toFixed(3)}">${fs.readFileSync(path.join(__dirname, 'vec', 'logo-' + l + '.svg'), 'utf8')}</a>`).join('')}</div></div></section>`;
}

function contactForm({ id = 'contact-form', heading = true, note = true } = {}) {
  return `<div class="form-card" data-reveal>
<form class="form form--compact" id="${id}" data-form data-done="${id}-done" data-subject="Website enquiry" novalidate>
<fieldset><legend>What can we help with?</legend><div class="choices">${['Check-up', 'Hygiene', 'Orthodontics', 'Implants', 'Aesthetics', 'Something else'].map((c, i) => `<label class="choice"><input type="radio" name="reason" value="${c}"${i === 0 ? ' checked' : ''}><span>${c}</span></label>`).join('')}</div></fieldset>
<div class="fields fields--2">
<div class="field"><input id="${id}-fn" name="first_name" placeholder=" " autocomplete="given-name" required><label for="${id}-fn">First name</label><p class="err" role="alert"></p></div>
<div class="field"><input id="${id}-ln" name="last_name" placeholder=" " autocomplete="family-name" required><label for="${id}-ln">Last name</label><p class="err" role="alert"></p></div>
<div class="field"><input id="${id}-em" name="email" type="email" placeholder=" " autocomplete="email" required><label for="${id}-em">Email</label><p class="err" role="alert"></p></div>
<div class="field"><input id="${id}-ph" name="phone" type="tel" placeholder=" " autocomplete="tel" required><label for="${id}-ph">Phone</label><p class="err" role="alert"></p></div>
</div>
<div class="field"><textarea id="${id}-msg" name="message" placeholder=" " required></textarea><label for="${id}-msg">Message</label><p class="err" role="alert"></p></div>
<label class="check"><input type="checkbox" name="offers" value="on"><span>I’d like to be informed of exclusive offers and other practice information</span></label>
<div><button class="btn" type="submit">Send message${I.arrow}</button></div>
${note ? `<p class="form-note">Our friendly reception team will call you back to answer your questions promptly.</p>` : ''}
</form>
<div class="form-done" id="${id}-done" role="status"><div class="badge">${I.check}</div><h3 class="h3">Thank you.</h3><p style="margin-inline:auto">Your message is ready to go. If your email app didn’t open, you can reach us on <a href="tel:${PHONE.replace(/ /g, '')}">${PHONE}</a>.</p></div>
</div>`;
}

function infoList() {
  const it = (ic, html) => `<div class="info-item"><span class="ic">${ic}</span><div>${html}</div></div>`;
  return `<div class="info-list">
${it(I.pin, '<strong>Kings Hill Clinic</strong><br>Suite 14, 10 Churchill Square<br>Kings Hill, West Malling, Kent ME19 4YU')}
${it(I.mail, `<a href="mailto:${EMAIL}">${EMAIL}</a>`)}
${it(I.phone, `<a href="tel:${PHONE.replace(/ /g, '')}">${PHONE}</a>`)}
${it(I.chat, `<a href="${WHATSAPP}" target="_blank" rel="noopener">Chat on WhatsApp</a>`)}
</div>`;
}

function hoursTable() {
  return `<table class="hours"><caption class="vh">Opening hours</caption><tbody>${HOURS.map(([d, t, n]) => `<tr data-day="${n}"><th scope="row">${d}</th><td>${t}</td></tr>`).join('')}</tbody></table>`;
}

const clip = (s) => s.replace(/\s+/g, ' ').trim();

/* ---------- HOME ---------- */
function home() {
  const testimonials = [
    ['I have had such professional, friendly advice and care for myself and my family at Kings Hill Dental. I am a bit nervous when going to the dentist, but both Simon and Amelia have been really patient with all my concerns. I have been a number of times now, once in an emergency situation and the work has been outstanding and I always feel fully informed and consulted. I can’t rate them highly enough.', 'Victoria Hampson'],
    ['Our caring team of dental professionals are dedicated to looking after your little ones and ensuring they feel safe and happy throughout their visit.', 'Fiona Gillard'],
    ['Would highly recommend Kings Hill Dental. The level of care we receive as a family is fantastic and the staff are always warm and welcoming. Simon is so friendly and approachable and very patient with all my children during their check ups.', 'Lucy Machen'],
    ['Exceptionally good. I had a front tooth that had suffered damage some forty five years ago. At Kings Hill Dental I was able to make a short notice appointment, the dentist put me completely at ease and his work is astonishing. To cap it all, the fee was not impossibly more than I would have had to pay for NHS treatment, if, of course, I could have had the work done under the NHS', 'Dave Gilbert'],
    ['I have been with Kings Hill Dental for around 15 years and couldn’t be happier. The service is friendly & professional. Whether it’s a routine or being fitted in for an emergency appointment (like recently) I couldn’t fault them. Highly recommend.', 'Elaine Terry'],
    ['Kings Hill Dental is by far the best dental practice I’ve ever had treatment at. I couldn’t be more grateful to Simon, Lacey, Simran and team for the treatment I’ve received (invisalign, whitening and composite bonding), and for squeezing in so many last minute appointments for me when I needed a slight adjustment to bonding. The results are perfect. Highly recommend!', 'Ellis Gemmel'],
  ];
  const services = [
    ['Orthodontics', 'Our range of teeth straightening treatments can improve so much more than appearance. Orthodontics can help address jaw issues and improve oral health.', '/dentistry/#orthodontic', 'orthodontics'],
    ['Dental Restoration', 'Dental restoration techniques such as dentures or implants can help restore your full dental functionality and bring back your beautiful smile!', '/dentistry/#restorative', 'restoration'],
    ['Dental Hygiene', 'A healthy smile is a beautiful smile. Hygiene appointments prevent gum disease and so protect your natural teeth from future problems.', '/dentistry/general-preventative/hygiene-gum-health/', 'hygiene'],
    ['Aesthetics', 'Achieve a smile that you can be proud of with our range of cosmetic treatments.', '/aesthetics/', 'aesthetics'],
  ];
  const assure = [
    [I.heart, 'Friendly Team', 'Our team is always warm, welcoming and supportive.'],
    [I.book, 'Professional advice', 'We ensure you are as informed as possible.'],
    [I.award, '20+ Years Experience', 'You can trust our dentists to provide high quality care.'],
    [I.users, 'Patient Focused', 'Our patients are our priority and we don’t push procedures.'],
  ];
  const childFeat = ['A scale and polish treatment, with oral hygiene instruction', 'Up to two dental examinations per year', 'Any necessary x rays', '10% discount off routine treatment', 'Worldwide dental accident and emergency cover'];
  const adultFeat = ['Up to two dental hygiene treatments per year', 'Up to two dental examinations per year', 'Up to two routine X rays per year', '10% discount off routine treatment', 'Worldwide dental accident and emergency cover'];
  const ticks = (a) => `<ul class="ticks">${a.map((t, i) => `<li style="--i:${i}">${I.tickBig}<span>${t}</span></li>`).join('')}</ul>`;
  const body = `
<section class="hero"><div class="wrap hero-grid">
<div>
<h1 class="display" data-split>Care that starts with listening</h1>
<p class="lede" data-reveal style="--d:4"><strong style="color:var(--brown);font-weight:400">A Professional, honest and ethical practice that puts dental health first, aesthetics second.</strong></p>
<p data-reveal style="--d:5">We understand that dentistry can be scary and so we are here for you, to help give you professional, caring advice that ensures you get the best treatment tailored specifically to your personal dental needs.</p>
<div class="actions" data-reveal style="--d:6">${arrowBtn('Book Consultation', PORTAL, '', true)}<a class="btn btn--ghost" href="#approach">Our Approach</a></div>
</div>
<div class="hero-media" data-reveal="fade">
<div class="hero-sun" aria-hidden="true"></div>
<div class="arch hero-arch"><img data-parallax="46" src="/img/hero.webp" alt="A dentist talking with a patient in the treatment room at Kings Hill Dental" fetchpriority="high" width="1800" height="720"></div>
<div class="hero-badge" data-status><span class="status-dot"></span><div><strong data-status-text>Open today</strong><span data-status-sub>09:30 - 17:30</span></div></div>
</div>
</div>
<div class="wrap"><ul class="assure">${assure.map(([ic, t, d]) => `<li data-reveal>${ic}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ul></div>
</section>

${wave('wave--top')}
<div class="dark" id="approach">
<section class="welcome"><div class="wrap split split--wide-r">
<div class="blob clip-in"><img data-parallax="30" src="/img/welcome-team.webp" alt="The Kings Hill Dental team gathered in reception" loading="lazy" width="1600" height="983"></div>
<div>
<h2 class="h1"><span class="h3 it" style="display:block;color:var(--blush);margin-bottom:10px" data-split>Welcome to…</span><span data-split>Kings Hill Dental</span></h2>
<div class="rule" data-reveal></div>
<p data-reveal>We create beautiful smiles in West Malling. At Kings Hill Dental, we combine cutting-edge dental technology with a standard of care that goes above and beyond. Our exceptional treatments focus on your comfort and care, promoting great oral health and boosting your confidence with life-changing cosmetic treatments. We have a brilliant team of specialists, dentists, therapists and nurses who care and support you through your patient journey, providing expert care with a gentle touch.</p>
<h3 class="sub" data-reveal>Get in touch with our team today</h3>
<div class="actions" data-reveal>${arrowBtn('Book Online', PORTAL, 'btn--light', true)}<a class="btn btn--outline-light" href="tel:${PHONE.replace(/ /g, '')}">Call Us</a></div>
</div>
</div></section>
</div>
${wave('wave--flip')}

<section class="section" aria-labelledby="svc-h"><div class="wrap services">
<div class="services-intro">
<h2 class="h1" id="svc-h" data-split>Our services</h2>
<div class="rule" data-reveal></div>
<p class="lede" data-reveal>We have a fantastic range of preventative, restorative and cosmetic treatments that focus on creating a beautiful and natural smile. We see patients of all ages and treat many families. Our services include orthodontics for adults and children, dental implants, full hygiene support and facial aesthetics.</p>
<div class="actions" data-reveal>${arrowBtn('Discover more Services', '/dentistry/')}</div>
</div>
<ul class="svc-list">${services.map(([t, d, h, ic], i) => `<li class="svc" data-reveal style="--d:${i}"><a href="${h}"><span class="svc-icon"><img src="/img/icon-${ic}.webp" alt="" width="120" height="120" loading="lazy"></span><span><h3>${t}</h3><p>${d}</p></span><span class="go">${I.arrow}</span></a></li>`).join('')}</ul>
</div></section>

<section class="section tint" aria-labelledby="mem-h"><div class="wrap plans">
<div>
<h2 class="h1" id="mem-h" data-split>Become a Member</h2>
<div class="rule" data-reveal></div>
<p class="lede" data-reveal>Our plans provide all the essential dental treatments you need, looking after your teeth and gums while making your dental care more affordable.</p>
<h3 class="h4" style="margin-top:32px" data-reveal>Not interested in a membership?</h3>
<p data-reveal>No problem! You can find out about our specific per procedure pricing using the button below.</p>
<div class="actions" style="margin-top:32px" data-reveal>${arrowBtn('Our Pricing', '/fees/', 'btn--ghost')}</div>
</div>
<div data-reveal>
<div class="seg" role="tablist" aria-label="Membership plan"><button type="button" role="tab" aria-selected="true">Children’s</button><button type="button" role="tab" aria-selected="false">Adult</button></div>
<div class="plan-card">
<div class="plan-photo"><img class="on" src="/img/plan-child.webp" alt="A child brushing their teeth with a dental hygienist" loading="lazy" width="1200" height="800"><img src="/img/plan-adult.webp" alt="A smiling patient in the dental chair" loading="lazy" width="1200" height="800"></div>
<div class="plan-body" data-plan><h3 class="h3">Children’s Membership</h3><p style="margin-top:16px">Our child’s plan encourages regular attendance, ensuring your child maintains healthy teeth and gums for life, preventing expensive procedures later in life.</p><div class="price"><small>from</small><b>£10.40</b><small>per month</small></div>${ticks(childFeat)}${arrowBtn('View plan details', '/fees/membership-plan/', 'btn--sm')}</div>
<div class="plan-body" data-plan hidden><h3 class="h3">Adult Membership</h3><p style="margin-top:16px">The plan provides all the essential dental treatments you need, looking after your teeth and gums while making your dental care more affordable.</p><div class="price"><b>£25.85</b><small>per month</small></div>${ticks(adultFeat)}${arrowBtn('View plan details', '/fees/membership-plan/', 'btn--sm')}</div>
</div>
</div>
</div></section>

<section class="section" aria-labelledby="q-h"><div class="wrap">
<h2 class="h1" id="q-h" data-split>What our patients say</h2>
<div class="quotes" data-quotes style="margin-top:clamp(36px,5vw,72px)" data-reveal>
<div class="q-track">${testimonials.map(([q, n]) => `<figure class="q" style="margin:0"><blockquote>${q}</blockquote><figcaption>${n}</figcaption></figure>`).join('')}</div>
<div class="q-nav"><button class="car-btn" type="button" data-qprev aria-label="Previous review">${I.prev}</button><button class="car-btn" type="button" data-qnext aria-label="Next review">${I.arrow}</button><div class="q-dots" role="group" aria-label="Choose review"></div></div>
</div>
</div></section>

${partners()}

<section class="section blush" aria-labelledby="c-h"><div class="wrap split split--wide-l split--top">
<div>
<h2 class="h1" id="c-h" data-split>Get in contact</h2>
<div class="rule" data-reveal></div>
<p class="lede" data-reveal style="color:var(--brown)">Simply fill out the form and our friendly reception team will call you back to answer your questions promptly.</p>
<div style="margin-top:32px" data-reveal>${infoList()}</div>
</div>
${contactForm({ id: 'home-form' })}
</div></section>`;
  return { path: '/', title: 'Kings Hill Dental | Dentistry & Aesthetics in West Malling', description: 'A professional, honest and ethical dental practice in Kings Hill, West Malling. Preventative, restorative, cosmetic and orthodontic dentistry plus facial aesthetics.', body };
}

/* ---------- ABOUT ---------- */
const iconForFact = (t) => /GDC number/i.test(t) ? I.shield : /BDS|BSc|MSc|BChD|BDent|Graduate|University/i.test(t) ? I.gradCap : I.award;
const factRow = (t) => `<span class="fact-ic" aria-hidden="true">${iconForFact(t)}</span><span>${t}</span>`;

function peopleData() {
  const order = [['amelia-madan-dumper', 'Amelia Madan-Dumper', 'Principal Dentist', 'team-amelia', '#ffd0c5'], ['simon-dumper', 'Simon Dumper', 'Principal Dentist', 'team-simon', '#e0a192'], ['lucy-hicks', 'Lucy Hicks', 'Dental Hygienist', 'team-lucy', '#fbe9d9'], ['mohammed-lalji', 'Mohammed Lalji', 'Dentist', 'team-mohammed', '#ffd0c5'], ['dr-furqan-jamal', 'Dr Furqan Jamal', 'Specialist Orthodontist', 'team-furqan', '#bc7b69'], ['gemma-abbott', 'Gemma Abbott', 'Orthodontic Coordinator', 'team-gemma', '#e0a192'], ['carly-marinelli', 'Carly Marinelli', 'Practice Coordinator', 'team-carly', '#fbe9d9'], ['chelsea-white', 'Chelsea White', 'Qualified Dental Nurse', 'team-chelsea', '#ffd0c5'], ['vicky-mayne', 'Vicky Mayne', 'Qualified Dental Nurse', 'team-vicky', '#e0a192']];
  return order.map(([slug, name, role, img, tone]) => {
    const items = copy['team__' + slug].secs.filter((s) => s.tag === 'SECTION').flatMap((s) => s.items).map((t) => t.replace(/^h\d: /, '').replace(/^A\[[^\]]*\]: /, '').replace(/​/g, '').trim()).filter(Boolean);
    const g = items.findIndex((t) => /^GDC Number/.test(t));
    const facts = []; const bio = [];
    items.slice(g >= 0 ? g : 2).forEach((t) => { if (/^GDC Number/.test(t)) return; if (/^\d{4,}$/.test(t)) { facts.push('<b>GDC number</b> ' + t); return; } (t.length > 110 ? bio : facts).push(t.replace(/Orthondontist/g, 'Orthodontist').replace(/\bimpove\b/g, 'improve')); });
    const cleanFacts = facts.filter((f) => !/^Morning jaw/.test(f)).slice(0, 4);
    return { slug, name, role, img: '/img/' + img + '.webp', tone, factsRaw: cleanFacts, facts: cleanFacts.map(factRow), bio: bio.slice(0, 3) };
  });
}

function about() {
  const people = peopleData();
  const shots = ['exterior', 'entrance', 'reception', 'reception-closeup', 'waiting-room', 'waiting-room-closeup', 'consultation', 'the-practice', 'main-room-2', 'main-room-3', 'main-room-4', 'children-s-area'];
  const labels = ['Exterior', 'Entrance', 'Reception', 'Reception Close-up', 'Waiting Room', 'Waiting Room Close-up', 'Consultation', 'The Practice', 'The Practice 2', 'The Practice 3', 'The Practice 4', 'Children’s Area'];
  const mosaic = [['exterior', 'Exterior'], ['entrance', 'Entrance'], ['reception', 'Reception'], ['waiting-room', 'Waiting room'], ['consultation', 'Consultation'], ['the-practice', 'The practice'], ['main-room-2', 'Treatment room'], ['main-room-3', 'Surgery'], ['children-s-area', 'Children’s area']];
  const STREETVIEW = 'https://www.google.com/maps/embed?pb=!4v1780588251079!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ2Mwc0thcFFF!2m2!1d51.27284324136546!2d0.3971868508402939!3f213.80807936468835!4f-17.75704165562172!5f0.7820865974627469';
  const body = `
${splitHero({ crumbs: `<ul class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li>About</li></ul>`, title: `About us`, img: 'about-1', alt: `Treatment room at Kings Hill Dental`, objectPosition: '70% center' })}

${aboutIntro()}

${teamOptions(people)}
${teamPopups(people)}

<section class="section" id="practice" aria-labelledby="prac-h"><div class="wrap prac-head">
<div class="prac-head-row">
<div class="prac-head-side" data-reveal>
<div class="chips" role="tablist" aria-label="View"><button class="chip" type="button" data-mode="photos" aria-selected="true">Photos</button><button class="chip" type="button" data-mode="tour" aria-selected="false">360° tour</button></div>
<p class="prac-cap" aria-live="polite"><span data-mcap>Exterior</span></p>
</div>
<div class="prac-head-title">
<h2 class="h1" id="prac-h" data-split>Our practice</h2>
<div class="rule" data-reveal></div>
<p data-reveal>Take a look around. Hover a photo to see more of the practice.</p>
</div>
</div>
</div>
<div class="wrap wrap-mosaic">
<div class="mosaic" data-mosaic data-reveal>${mosaic.map(([s, l], i) => `<button type="button" class="mo mo${i + 1}" data-i="${i}" aria-label="${l}"><img src="/img/practice-${s}.webp" alt="${l} at Kings Hill Dental" loading="${i < 3 ? 'eager' : 'lazy'}" width="1600" height="900"><span>${l}</span></button>`).join('')}</div>
<div class="tour" hidden><iframe title="360 degree tour of Kings Hill Dental" data-src="${STREETVIEW}" loading="lazy" allowfullscreen></iframe></div>
</div>
</section>

${partnerGrid()}`;
  return { path: '/about/', title: 'About us | Kings Hill Dental', description: 'Family owned dental practice in Kings Hill since 2009. Meet our team and take a look around the practice.', body };
}

/* ---------- CONTACT ---------- */
function contact() {
  const body = `
${splitHero({ crumbs: `<ul class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li>Contact</li></ul>`, title: `Get in contact`, img: 'practice-reception-closeup', alt: `The reception at Kings Hill Dental` })}
<section class="phero-intro"><div class="wrap"><div class="phero-copy"><p class="lede" data-reveal>Simply fill out the form and our friendly reception team will call you back to answer your questions promptly.</p></div></div></section>
<section class="section section--tight" style="padding-top:0"><div class="wrap split split--wide-l split--top">
${contactForm({ id: 'contact-form' })}
<div class="stack" data-reveal>
<div class="map"><iframe title="Map of Kings Hill Clinic" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Kings+Hill+Clinic,+Suite+14,+10+Churchill+Square,+Kings+Hill,+West+Malling,+ME19+4YU&output=embed"></iframe></div>
<h2 class="h3" style="margin-top:32px">Contact us.</h2>
${infoList()}
<h2 class="h3" style="margin-top:32px" data-status>Opening hours.</h2>
${hoursTable()}
</div>
</div></section>`;
  return { path: '/contact/', title: 'Contact | Kings Hill Dental', description: 'Contact Kings Hill Dental in West Malling: phone, email, WhatsApp, opening hours and a simple enquiry form.', body };
}

module.exports = { home, about, contact, partners, contactForm, infoList, hoursTable, arrowBtn, clip };

/* about page: partner logos as a quiet grid */
function partnerGrid() {
  const aspects = JSON.parse(fs.readFileSync(path.join(__dirname, 'vec', 'logo-aspects.json'), 'utf8'));
  const list = [['3-shape', '3Shape'], ['philips-sonicare', 'Philips Sonicare'], ['invisalign', 'Invisalign'], ['angel-aligner', 'Angel Aligner'], ['ems', 'EMS'], ['oral-b', 'Oral-B'], ['itero', 'iTero'], ['sensodyne', 'Sensodyne'], ['spark-aligner', 'Spark Aligner'], ['straumann', 'Straumann'], ['suri', 'Suri'], ['ems-gbt', 'Guided Biofilm Therapy']];
  return `<section class="section section--tight partners-tint" aria-labelledby="pg-h"><div class="wrap"><h2 class="h1" id="pg-h" data-split>Our partners</h2>
<div class="ptiles">${list.map(([k, n], i) => `<a class="ptile" href="${PARTNER_URLS[k]}" target="_blank" rel="noopener" aria-label="${n} (opens in a new tab)" data-reveal style="--d:${i};--k:${(1 / Math.sqrt(aspects[k])).toFixed(3)}">${fs.readFileSync(path.join(__dirname, 'vec', 'logo-' + k + '.svg'), 'utf8')}</a>`).join('')}</div></div></section>`;
}
