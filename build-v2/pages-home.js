const fs = require('fs');
const path = require('path');
const { I, PORTAL, PHONE, footerBottom } = require('./parts');
const { arrowBtn, partners, contactForm, infoList, hoursTable } = require('./pages-a');

const vec = (n) => fs.readFileSync(path.join(__dirname, 'vec', n + '.svg'), 'utf8');

// old "welcome" composition: organic masks + brown shapes, positioned as fractions of the section width
const BLOB = 'M99.949 49.636c14.615-.63 29.231-1.255 43.846-1.891 5.373-.234 10.746-.471 16.117-.745 5.693-.29 11.385-.609 17.075-.947 3.176-.189 3.265-.025 2.819 3.049-.399 2.751-.798 5.493-1.518 8.181-1.11 4.146-2.673 8.113-4.768 11.866-2.411 4.317-5.97 7.549-10.112 10.136-2.394 1.495-5.106 2.226-7.97 2.293a43.6 43.6 0 0 1-10.878-1.115c-2.824-.653-5.617-1.438-8.523-1.744-4.175-.439-7.878.558-11.14 3.199-1.853 1.501-3.401 3.26-4.703 5.24-1.769 2.689-3.198 5.557-4.521 8.483a459 459 0 0 1-3.243 6.971c-4.315 9.127-11.724 13.603-21.704 14.113-3.005.154-6.029.243-9.032.104-7.002-.324-12.453 2.708-17.126 7.509-2.413 2.479-4.082 5.485-5.835 8.428a313 313 0 0 1-4.684 7.661c-2.286 3.599-5.369 6.385-9.131 8.396-4.971 2.658-10.245 4.431-15.879 5.035a24 24 0 0 1-3.543.12c-3.213-.137-3.565-.536-3.614-3.811-.356-23.392-.687-46.784-1.079-70.175-.12-7.155-.404-14.308-.619-21.462-.042-1.388-.129-2.775-.166-4.163-.063-2.352-.054-2.373 2.191-2.453 3.225-.115 6.452-.194 9.677-.293l68.06-2.082.004.094Z';
const MASK_A = "M33.758 60.174c-17.32 24.757-8.751 62.067 3.819 86.859 7.773 15.332 21.838 35.886 46.141 31.984 5.526-.887 10.586-3.167 16.054-4.271 16.952-3.424 36.019 4.667 51.766-1.53 6.229-2.451 11.013-6.889 14.686-11.707 11.588-15.202 12.988-35.352 3.585-51.58-6.596-11.383-18.021-20.815-22.417-32.896-4.313-11.851-1.286-24.74-4.481-36.828-3.886-14.703-20.471-25.243-37.541-16.56-6.449 3.28-11.975 7.686-19.005 10.185-7.319 2.602-15.435 3.282-22.862 5.674-13.94 4.488-23.516 11.767-29.745 20.67z";
const MASK_B = "M174.761 109.25c.733-12.075.003-24.139-5.324-35.632-8.069-17.408-23.705-32.533-42.663-43.175-22.025-12.364-54.487-15.325-75.156-1.561-15.273 10.171-20.931 26.719-23.951 42.375-5.73 29.704-3.7 62.905 20.85 85.758 23.015 21.424 70.254 30.188 101.761 15.515 17.856-8.316 20.664-27.907 22.375-42.658.791-6.808 1.688-13.717 2.108-20.622z";
const maskUrl = (vb, d) => `url(data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='${vb}'><path d='${d}'/></svg>`).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29')})`;

// (left, top, width, height) as fractions of section width; height of the art box = 1129/1440 of width
const K = 1440 / 720;
const box = (l, t, w, h, extra = '') => `left:${(l * 100).toFixed(3)}%;top:${(t * 100 * K).toFixed(3)}%;width:${(w * 100).toFixed(3)}%;height:${(h * 100 * K).toFixed(3)}%;${extra}`;

function welcome() {
  const shape = (cls, style, vb, d, flip) => `<svg class="w-shape ${cls}" style="${style}${flip ? ';--flip:-1' : ''}" viewBox="${vb}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="currentColor"/></svg>`;
  const rect = (cls, style) => `<span class="w-shape w-rect ${cls}" style="${style}" aria-hidden="true"></span>`;
  return `<section class="welcome" aria-labelledby="welcome-h"><div class="w-art">
<img class="w-img wa" src="/img/welcome-a.webp" alt="The reception area at Kings Hill Dental" loading="lazy" width="1367" height="778" style="${box(-0.039077, 0.016572, 0.49123, 0.42127)};-webkit-mask-image:${maskUrl('23.999 20.502 152 158.998', MASK_A)};mask-image:${maskUrl('23.999 20.502 152 158.998', MASK_A)}">
<img class="w-img wb" src="/img/welcome-b.webp" alt="The Kings Hill Dental team gathered in reception" loading="lazy" width="1420" height="873" style="${box(0.18858, 0.13348, 0.36806, 0.3565)};-webkit-mask-image:${maskUrl('25 19.792 150.001 160', MASK_B)};mask-image:${maskUrl('25 19.792 150.001 160', MASK_B)}">
<div class="w-text">
<p class="w-kicker" data-reveal>Welcome to…</p>
<h2 id="welcome-h" data-split>Kings Hill Dental</h2>
<p data-reveal>We create beautiful smiles in West Malling. At Kings Hill Dental, we combine cutting-edge dental technology with a standard of care that goes above and beyond. Our exceptional treatments focus on your comfort and care, promoting great oral health and boosting your confidence with life-changing cosmetic treatments. We have a brilliant team of specialists, dentists, therapists and nurses who care and support you through your patient journey, providing expert care with a gentle touch.</p>
<h3 data-reveal>Get in touch with our team today</h3>
<div class="actions" data-reveal>${arrowBtn('Book Online', PORTAL, '', true)}<a class="btn btn--ghost" href="tel:${PHONE.replace(/ /g, '')}">Call Us</a></div>
</div></div></section>`;
}

const tickRow = (t, i) => `<li style="--i:${i}"><span class="tk" aria-hidden="true"></span><span>${t}</span></li>`;

function memberCard(kind) {
  const child = kind === 'child';
  const feats = child
    ? ['A scale and polish treatment, with oral hygiene instruction', 'Up to two dental examinations per year', 'Any necessary x rays', '10% discount off routine treatment', 'Worldwide dental accident and emergency cover']
    : ['Up to two dental hygiene treatments per year', 'Up to two dental examinations per year', 'Up to two routine X rays per year', '10% discount off routine treatment', 'Worldwide dental accident and emergency cover'];
  return `<article class="mcard" data-reveal>
<div class="mcard-photo"><img src="/img/plan-${kind}.webp" alt="${child ? 'A child brushing their teeth with a dental hygienist' : 'A smiling patient'}" loading="lazy" width="900" height="600"></div>
<div class="mcard-body">
<h3>${child ? 'Children’s' : 'Adult'} Membership</h3>
<p>${child ? 'Our child’s plan encourages regular attendance, ensuring your child maintains healthy teeth and gums for life, preventing expensive procedures later in life.' : 'The plan provides all the essential dental treatments you need, looking after your teeth and gums while making your dental care more affordable.'}</p>
<div class="price">${child ? '<small>from</small>' : ''}<b>${child ? '£10.40' : '£25.85'}</b><small>per month</small></div>
<ul class="benefits">${feats.map(tickRow).join('')}</ul>
</div>
<a class="mcard-foot" href="/fees/membership-plan/">View plan details${I.arrow}</a>
</article>`;
}

function home() {
  const t = [
    ['I have had such professional, friendly advice and care for myself and my family at Kings Hill Dental. I am a bit nervous when going to the dentist, but both Simon and Amelia have been really patient with all my concerns. I have been a number of times now, once in an emergency situation and the work has been outstanding and I always feel fully informed and consulted. I can’t rate them highly enough.', 'Victoria Hampson', 'pink'],
    ['Our caring team of dental professionals are dedicated to looking after your little ones and ensuring they feel safe and happy throughout their visit.', 'Fiona Gillard', 'brown'],
    ['Would highly recommend Kings Hill Dental. The level of care we receive as a family is fantastic and the staff are always warm and welcoming. Simon is so friendly and approachable and very patient with all my children during their check ups.', 'Lucy Machen', 'clay'],
    ['Exceptionally good. I had a front tooth that had suffered damage some forty five years ago. At Kings Hill Dental I was able to make a short notice appointment, the dentist put me completely at ease and his work is astonishing. To cap it all, the fee was not impossibly more than I would have had to pay for NHS treatment, if, of course, I could have had the work done under the NHS', 'Dave Gilbert', 'blush'],
    ['I have been with Kings Hill Dental for around 15 years and couldn’t be happier. The service is friendly & professional. Whether it’s a routine or being fitted in for an emergency appointment (like recently) I couldn’t fault them. Highly recommend.', 'Elaine Terry', 'umber'],
    ['Kings Hill Dental is by far the best dental practice I’ve ever had treatment at. I couldn’t be more grateful to Simon, Lacey, Simran and team for the treatment I’ve received (invisalign, whitening and composite bonding), and for squeezing in so many last minute appointments for me when I needed a slight adjustment to bonding. The results are perfect. Highly recommend!', 'Ellis Gemmel', 'coral'],
  ];
  const services = [
    ['Orthodontics', 'Our range of teeth straightening treatments can improve so much more than appearance. Orthodontics can help address jaw issues and improve oral health.', '/dentistry/orthodontic/', 'orthodontics'],
    ['Dental Restoration', 'Dental restoration techniques such as dentures or implants can help restore your full dental functionality and bring back your beautiful smile!', '/dentistry/restorative/', 'restoration'],
    ['Dental Hygiene', 'A healthy smile is a beautiful smile. Hygiene appointments prevent gum disease and so protect your natural teeth from future problems.', '/dentistry/general-preventative/hygiene-gum-health/', 'hygiene'],
    ['Aesthetics', 'Achieve a smile that you can be proud of with our range of cosmetic treatments.', '/aesthetics/', 'aesthetics'],
  ];
  const assure = [
    [I.heart, 'Friendly Team', 'Our team is always warm, welcoming and supportive.'],
    [I.book, 'Professional advice', 'We ensure you are as informed as possible.'],
    [I.award, '20+ Years Experience', 'You can trust our dentists to provide high quality care.'],
    [I.users, 'Patient Focused', 'Our patients are our priority and we don’t push procedures.'],
  ];
  const body = `
<section class="hero-old">
<div class="hero-old-img" data-reveal="fade"><img src="/img/hero-old.webp" alt="A dentist talking with a patient in the treatment room at Kings Hill Dental" fetchpriority="high" width="2000" height="800"></div>
<div class="wrap"><div class="hero-old-text">
<h1 class="display hero-h1" aria-label="Care that starts with listening"><span data-split>Care that starts</span><span data-split>with listening</span></h1>
<p class="lede" data-reveal style="--d:4">A Professional, honest and ethical practice that puts dental health first, aesthetics second.</p>
<p data-reveal style="--d:5">We understand that dentistry can be scary and so we are here for you, to help give you professional, caring advice that ensures you get the best treatment tailored specifically to your personal dental needs.</p>
<div class="actions" data-reveal style="--d:6"><a class="btn" href="${PORTAL}" target="_blank" rel="noopener">Book Consultation</a><a class="btn btn--ghost" href="#welcome-h">Our Approach</a></div>
</div>
<ul class="assure">${assure.map(([ic, h, d], i) => `<li data-reveal="left" style="--d:${i}"><span class="ai">${ic}</span><h3>${h}</h3><p>${d}</p></li>`).join('')}</ul>
</div>
</section>

${welcome()}

<section class="section services-svc-tight" aria-labelledby="svc-h"><div class="wrap services">
<div class="services-intro">
<h2 class="h1" id="svc-h" data-split>Our services</h2>
<div class="rule" data-reveal></div>
<p class="lede" data-reveal>We have a fantastic range of preventative, restorative and cosmetic treatments that focus on creating a beautiful and natural smile. We see patients of all ages and treat many families. Our services include orthodontics for adults and children, dental implants, full hygiene support and facial aesthetics.</p>
<div class="actions" data-reveal>${arrowBtn('Discover more Services', '/dentistry/')}</div>
</div>
<ul class="svc-list">${services.map(([n, d, h, ic], i) => `<li class="svc" data-reveal style="--d:${i}"><a href="${h}"><span class="svc-icon">${vec('icon-' + ic)}</span><span><h3>${n}</h3><p>${d}</p></span><span class="go">${I.arrow}</span></a></li>`).join('')}</ul>
</div></section>

<section class="section member" aria-labelledby="mem-h"><div class="wrap plans-old">
<div class="plans-intro">
<h2 class="h1" id="mem-h" data-split>Become a Member</h2>
<div class="rule" data-reveal></div>
<p class="lede" data-reveal style="color:var(--brown)">Our plans provide all the essential dental treatments you need, looking after your teeth and gums while making your dental care more affordable.</p>
<h3 class="h4" style="margin-top:32px" data-reveal>Not interested in a membership?</h3>
<p data-reveal>No problem! You can find out about our specific per procedure pricing using the button below.</p>
<div class="actions" style="margin-top:32px" data-reveal>${arrowBtn('Our Pricing', '/fees/')}</div>
</div>
<div class="mcards">${memberCard('child')}${memberCard('adult')}</div>
</div></section>

<section class="tt-sec" data-hscroll aria-labelledby="q-h"><div class="tt-stick">
<div class="wrap"><h2 class="h1" id="q-h" data-split>What our patients say</h2></div>
<div class="wrap tt-wrap"><div class="tt-track" data-hs-track>${t.map(([q, n, tone]) => `<figure class="tcard tone-${tone}"><blockquote>${q}</blockquote><figcaption>${n}</figcaption></figure>`).join('')}</div></div>
</div></section>

${partners()}

<section class="section dark contact-foot" aria-labelledby="c-h"><div class="wrap contact-grid">
<div class="contact-copy">
<h2 class="h1" id="c-h" data-split>Get in contact</h2>
<div class="rule" data-reveal></div>
<p class="lede" data-reveal>Simply fill out the form and our friendly reception team will call you back to answer your questions promptly.</p>
<div class="contact-info-grid" data-reveal>${infoList()}<div class="contact-hours"><h3 class="h4">Opening hours</h3>${hoursTable()}</div></div>
</div>
${contactForm({ id: 'home-form' })}
</div>
<div class="wrap" style="margin-top:clamp(40px,6vw,80px)">${footerBottom()}</div>
</section>`;
  return { path: '/', title: 'Kings Hill Dental | Dentistry & Aesthetics in West Malling', description: 'A professional, honest and ethical dental practice in Kings Hill, West Malling. Preventative, restorative, cosmetic and orthodontic dentistry plus facial aesthetics.', body };
}

module.exports = { home };
