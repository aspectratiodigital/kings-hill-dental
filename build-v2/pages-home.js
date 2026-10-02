const fs = require('fs');
const path = require('path');
const { I, PORTAL, PHONE, footerBottom } = require('./parts');
const { arrowBtn, partners, contactForm, infoList, hoursTable } = require('./pages-a');

const vec = (n) => fs.readFileSync(path.join(__dirname, 'vec', n + '.svg'), 'utf8');

// Welcome section: team photo fading into the text on the right
const WELCOME_P = "We create beautiful smiles in West Malling. At Kings Hill Dental, we combine cutting-edge dental technology with a standard of care that goes above and beyond. Our exceptional treatments focus on your comfort and care, promoting great oral health and boosting your confidence with life-changing cosmetic treatments. We have a brilliant team of specialists, dentists, therapists and nurses who care and support you through your patient journey, providing expert care with a gentle touch.";
const welcomeActions = `<div class="actions" data-reveal>${arrowBtn('Book Online', PORTAL, '', true)}<a class="btn btn--ghost" href="tel:${PHONE.replace(/ /g, '')}">Call Us</a></div>`;

function welcome() {
  return `<section class="wv" aria-labelledby="welcome-h"><div class="wrap wv-grid">
<figure class="wv-fig" data-reveal><img src="/img/welcome-team.webp" alt="The Kings Hill Dental team gathered in reception" loading="lazy" width="1420" height="873"></figure>
<div class="wv-text"><p class="wv-kicker" data-reveal>Welcome to…</p><h2 id="welcome-h" data-reveal>Kings Hill Dental</h2><p data-reveal>${WELCOME_P}</p><h3 data-reveal>Get in touch with our team today</h3>${welcomeActions}</div>
</div></section>`;
}

const tickRow = (t, i) => `<li style="--i:${i}"><span class="tk" aria-hidden="true"></span><span>${t}</span></li>`;

function memberCard(kind, href = '/fees/membership-plan/', linkText = 'View plan details', { ext = false, extra = '', badge = false } = {}) {
  const child = kind === 'child';
  const feats = child
    ? ['A scale and polish treatment, with oral hygiene instruction', 'Up to two dental examinations per year', 'Any necessary x rays', '10% discount off routine treatment', 'Worldwide dental accident and emergency cover']
    : ['Up to two dental hygiene treatments per year', 'Up to two dental examinations per year', 'Up to two routine X rays per year', '10% discount off routine treatment', 'Worldwide dental accident and emergency cover'];
  return `<article class="mcard" data-reveal>
<div class="mcard-photo"><img src="/img/plan-${kind}.webp" alt="${child ? 'A child brushing their teeth with a dental hygienist' : 'A smiling patient'}" loading="lazy" width="900" height="600"></div>
<div class="mcard-body">
<h3>${child ? 'Children’s' : 'Adult'} Membership</h3>
<p>${child ? 'Our child’s plan encourages regular attendance, ensuring your child maintains healthy teeth and gums for life, preventing expensive procedures later in life.' : 'The plan provides all the essential dental treatments you need, looking after your teeth and gums while making your dental care more affordable.'}</p>
${extra}
<div class="price">${child ? '<small>from</small>' : ''}<b>${child ? '£10.40' : '£25.85'}</b><small>per month</small>${badge ? '<span class="price-badge" hidden></span>' : ''}</div>
<ul class="benefits">${feats.map(tickRow).join('')}</ul>
</div>
<a class="mcard-foot" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${linkText}${I.arrow}</a>
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
<div class="wrap"><div class="hero-old-stage"><div class="hero-old-top">
<div class="hero-old-img" data-reveal="fade"><picture><source media="(max-width: 450px)" srcset="/img/hero-general.webp"><source media="(min-width: 900px)" srcset="/img/hero-general.webp"><img src="/img/hero-old.webp" alt="A dentist talking with a patient in the treatment room at Kings Hill Dental" fetchpriority="high" width="2000" height="800"></picture></div>
<div class="hero-old-text">
<h1 class="display hero-h1" aria-label="Care that starts with listening"><span data-split>Care that starts</span><span data-split>with listening</span></h1>
<p class="lede" data-reveal style="--d:4">A Professional, honest and ethical practice that puts dental health first, aesthetics second.</p>
<p data-reveal style="--d:5">We understand that dentistry can be scary and so we are here for you, to help give you professional, caring advice that ensures you get the best treatment tailored specifically to your personal dental needs.</p>
<div class="actions" data-reveal style="--d:6"><a class="btn" href="${PORTAL}" target="_blank" rel="noopener">Book Consultation</a><a class="btn btn--ghost" href="#welcome-h">Our Approach</a></div>
</div>
</div></div>
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
${contactForm({ id: 'home-form', note: false })}
</div>
<div class="wrap" style="margin-top:clamp(20px,2.5vw,32px)">${footerBottom()}</div>
</section>`;
  return { path: '/', title: 'Kings Hill Dental | Dentistry & Aesthetics in West Malling', description: 'A professional, honest and ethical dental practice in Kings Hill, West Malling. Preventative, restorative, cosmetic and orthodontic dentistry plus facial aesthetics.', bodyClass: 'home-page', body };
}

module.exports = { home, memberCard };
