// Shared building blocks: icons, header, footer, layout.
const fs = require('fs');
const path = require('path');

const PORTAL = 'https://kings-hill-dental.portal.dental';
const PHONE = '01732 523 500';
const EMAIL = 'reception@kingshilldental.co.uk';
const WHATSAPP = 'https://api.whatsapp.com/send/?phone=447414104409&text&type=phone_number&app_absent=0';

const S = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
const I = {
  arrow: S('<path d="M4 12h15M13 6l6 6-6 6"/>'),
  chev: S('<path d="m6 9 6 6 6-6"/>', 'class="chev"'),
  chevRight: S('<path d="m9 6 6 6-6 6"/>', 'class="chevr"'),
  up: S('<path d="M12 19V5M6 11l6-6 6 6"/>'),
  prev: S('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  check: S('<path d="m5 12.5 4.5 4.5L19 7"/>'),
  phone: S('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
  mail: S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  pin: S('<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  chat: S('<path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/>'),
  search: S('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'),
  clock: S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  fb: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.4-4 4.100v2.400H7.600V13h2.700v8z"/></svg>`,
  ig: S('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>'),
  heart: S('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/>'),
  book: S('<path d="M4 5.500A2.500 2.500 0 0 1 6.500 3H20v16H6.500A2.500 2.500 0 0 0 4 21.500z"/><path d="M4 19V5.500M9 8h7"/>'),
  award: S('<circle cx="12" cy="9" r="6"/><path d="m8.500 14.500-1.500 6.500 5-3 5 3-1.500-6.500"/>'),
  users: S('<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20c.5-3.600 3-5.500 6.500-5.500s6 1.900 6.500 5.500M16 4.800a3.500 3.500 0 0 1 0 6.400M18 14.800c2 .6 3.200 2.300 3.500 5.200"/>'),
  shield: S('<path d="M12 3 4.500 6v5.500c0 4.500 3 8 7.500 9.500 4.500-1.500 7.500-5 7.500-9.500V6z"/><path d="m9 12 2.200 2.200L15.500 10"/>'),
  coins: S('<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.700 3.100 3 7 3s7-1.300 7-3V6M5 12v6c0 1.700 3.100 3 7 3s7-1.300 7-3v-6"/>'),
  eye: S('<path d="M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  tick: S('<path d="m4.500 12.500 5 5L19.500 7"/>'),
  gradCap: S('<path d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5Z"/><path d="M6.5 11.6v4.4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.4"/><path d="M20.5 9.5v6"/>'),
};
I.tickBig = `<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="17" cy="17" r="15" stroke-width="1.4" opacity=".4"/><path d="m9.500 17.500 5 5 10-11"/></svg>`;

const logoRaw = fs.readFileSync(path.join(__dirname, 'logo.svg'), 'utf8');
const logo = (extra = '') => logoRaw
  .replace(/fill="rgb\(19, 18, 18\)"/g, 'class="logo-ink"')
  .replace(/stroke="rgb\(19, 18, 18\)"/g, '')
  .replace(/<svg /, `<svg role="img" aria-label="Kings Hill Dental, dentistry and aesthetics" ${extra} `);

const wave = (cls = '') => `<svg class="wave ${cls}" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path fill="currentColor" d="M0 120V64C120 24 240 8 360 30c150 28 240 84 420 74 150-8 250-62 380-78 110-14 200 6 280 34v60z"/></svg>`;

const NAV = [
  { t: 'About', h: '/about/' },
  {
    t: 'Dentistry', h: '/dentistry/', mega: [
      { t: 'General & preventative', h: '/dentistry/general-preventative/', items: [['Dental examinations', '/dentistry/general-preventative/dental-examinations/'], ['Hygiene & gum health', '/dentistry/general-preventative/hygiene-gum-health/'], ['Children’s dentistry', '/dentistry/general-preventative/childrens-dentistry/'], ['Bruxism', '/dentistry/general-preventative/bruxism/']] },
      { t: 'Restorative', h: '/dentistry/restorative/', items: [['Fillings', '/dentistry/restorative/fillings/'], ['Crowns & bridges', '/dentistry/restorative/crowns-bridges/'], ['Root canals', '/dentistry/restorative/root-canals/'], ['Dentures', '/dentistry/restorative/dentures/'], ['Implants', '/dentistry/restorative/implants/']] },
      { t: 'Cosmetic', h: '/dentistry/cosmetic/', items: [['Teeth whitening', '/dentistry/cosmetic/whitening/'], ['Composite bonding', '/dentistry/cosmetic/bonding/'], ['Veneers', '/dentistry/cosmetic/veneers/']] },
      { t: 'Orthodontic', h: '/dentistry/orthodontic/', items: [['Invisalign', '/dentistry/orthodontic/invisalign/'], ['Invisalign Go', '/dentistry/orthodontic/invisalign-go/'], ['Fixed braces', '/dentistry/orthodontic/fixed-braces/'], ['Spark aligners', '/dentistry/orthodontic/spark-aligners/']] },
    ],
  },
  { t: 'Aesthetics', h: '/aesthetics/', mega: [{ t: 'Treatments', h: '/aesthetics/', items: [['Anti-wrinkle treatments', '/aesthetics/anti-wrinkle/'], ['Skin care', '/aesthetics/skin-care/'], ['Profhilo', '/aesthetics/profhilo/'], ['Dermal fillers', '/aesthetics/dermal-fillers/']] }] },
  { t: 'Membership Plan', h: '/fees/membership-plan/' },
  { t: 'Fees', h: '/fees/' },
  { t: 'Referrals', h: '/referrals/' },
  { t: 'Contact', h: '/contact/' },
];

function header(current) {
  // the most specific NAV entry whose path matches wins "current" — stops a parent section
  // (e.g. Fees) from also underlining when you're actually on one of its nested pages.
  const matches = (n) => current === n.h || current.startsWith(n.h);
  const items = NAV.map((n) => {
    const shadowed = NAV.some((o) => o.h !== n.h && o.h.length > n.h.length && o.h.startsWith(n.h) && matches(o));
    const cur = matches(n) && !shadowed ? ' aria-current="page"' : '';
    if (!n.mega) return `<li><a class="nav-link" href="${n.h}"${cur}>${n.t}</a></li>`;
    if (n.mega.length > 1) {
      // several categories: hovering one extends this same box to reveal its items alongside the list
      const cats = n.mega.map((c, i) => `<li class="mega-cat"><a class="mega-cat-link" href="${c.h}" data-idx="${i}"><span class="lbl">${c.t}</span>${I.chevRight}</a></li>`).join('');
      const subs = n.mega.map((c, i) => `<div class="mega-sub" data-idx="${i}"><ul>${c.items.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>`).join('');
      return `<li class="has-menu"><a class="nav-link" href="${n.h}" aria-expanded="false" aria-haspopup="true"${cur}><span class="lbl">${n.t}</span>${I.chev}</a><div class="mega mega--flyout" data-mega-extend><div class="mega-inner"><ul class="mega-cats">${cats}</ul><div class="mega-subs">${subs}</div></div></div></li>`;
    }
    // single category: no need for its own heading, just list the items directly
    const list = `<ul>${n.mega[0].items.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>`;
    return `<li class="has-menu"><a class="nav-link" href="${n.h}" aria-expanded="false" aria-haspopup="true"${cur}><span class="lbl">${n.t}</span>${I.chev}</a><div class="mega mega--flyout">${list}</div></li>`;
  }).join('');
  const drawer = NAV.map((n, i) => {
    if (!n.mega) return `<li><a class="big" style="--i:${i}" href="${n.h}">${n.t}</a></li>`;
    return `<li><details style="--i:${i}"><summary>${n.t}${I.chev}</summary><ul>${n.mega.flatMap((c) => c.items).map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}<li><a href="${n.h}"><strong>All ${n.t.toLowerCase()}</strong></a></li></ul></details></li>`;
  }).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap nav-bar">
<a class="brand" href="/" aria-label="Kings Hill Dental home">${logo()}</a>
<nav aria-label="Main"><ul class="nav">${items}</ul></nav>
<a class="btn btn--sm nav-cta" href="${PORTAL}" target="_blank" rel="noopener">Book consultation</a>
<button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
</div></header>
<div class="drawer" aria-label="Menu"><nav><ul>${drawer}</ul></nav><div class="drawer-foot"><a class="btn btn--pink" href="${PORTAL}" target="_blank" rel="noopener">Book consultation</a><a href="tel:${PHONE.replace(/ /g, '')}">${PHONE}</a></div></div>`;
}

const HOURS = [['Monday', '09:30 - 17:30', 1], ['Tuesday', '09:30 - 18:30', 2], ['Wednesday', '09:30 - 18:30', 3], ['Thursday', '09:30 - 18:30', 4], ['Friday', '09:30 - 14:30', 5], ['Saturday', 'By Appointment', 6], ['Sunday', 'Closed', 0]];

function footerBottom() {
  return `<div class="foot-bottom"><span>© <span class="year">2026</span> Kings Hill Dental</span><span><a href="/privacy-policy/">Privacy policy</a> &nbsp;·&nbsp; <a href="/terms-and-conditions/">Terms &amp; conditions</a> &nbsp;·&nbsp; <a href="/complaints-procedure/">Complaints procedure</a> &nbsp;·&nbsp; <a href="/accessibility-statement/">Accessibility</a></span><span>Website by <a class="credit-link" href="http://aspectratiodigital.com" target="_blank" rel="noopener">Aspect Ratio Digital</a></span></div>`;
}

function footer() {
  const hrs = HOURS.map(([d, t, n]) => `<div data-day="${n}"><span>${d}</span><span>${t}</span></div>`).join('');
  return `<footer class="site-footer"><div class="wrap"><div class="foot-top">
<div class="foot-brand"><a class="brand" href="/" aria-label="Kings Hill Dental home">${logo()}</a><a href="https://www.google.com/maps?q=Kings+Hill+Dental,+Ste+14,+10+Churchill+Square,+Kings+Hill,+West+Malling,+ME19+4YU" target="_blank" rel="noopener">Kings Hill Clinic<br>Suite 14, 10 Churchill Square<br>Kings Hill<br>West Malling, Kent<br>ME19 4YU</a><div class="socials"><a href="https://www.facebook.com/kingshilldental/" target="_blank" rel="noopener" aria-label="Facebook">${I.fb}</a><a href="https://www.instagram.com/kingshilldental/?hl=en" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a></div></div>
<div><h4>Explore</h4><ul><li><a href="/about/">About</a></li><li><a href="/dentistry/">Dentistry</a></li><li><a href="/aesthetics/">Aesthetics</a></li><li><a href="/fees/">Fees</a></li><li><a href="/fees/membership-plan/">Membership plan</a></li><li><a href="/referrals/">Referrals</a></li><li><a href="/contact/">Contact</a></li></ul></div>
<div class="foot-contact"><h4>Get in touch</h4><a href="mailto:${EMAIL}">${EMAIL}</a><a href="tel:${PHONE.replace(/ /g, '')}">${PHONE}</a><a href="${WHATSAPP}" target="_blank" rel="noopener">Chat on WhatsApp</a><div style="margin-top:18px"><a class="btn btn--sm" href="${PORTAL}" target="_blank" rel="noopener">Book online</a></div></div>
<div><h4>Opening hours</h4><div class="foot-hours">${hrs}</div></div>
</div>
${footerBottom()}</div>
</footer>`;
}

function layout({ title, description, path: p, body, bodyClass = '', schema = '' }) {
  const isHome = p === '/';
  return `<!doctype html>
<html lang="en-GB" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#fff6ec">
<meta name="form-endpoint" content="">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='16' fill='%23461c11'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-family='Georgia' font-size='18' fill='%23ffd0c5'%3EK%3C/text%3E%3C/svg%3E">
<link rel="preload" href="/fonts/heading.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mandioca-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/main.css">
<link rel="stylesheet" href="/css/home.css">
${schema}
</head>
<body class="${bodyClass}">
${header(p)}
<main id="main">
${body}
</main>
${isHome ? '' : footer()}
<button class="to-top" type="button" aria-label="Back to top">${I.up}</button>
<script src="/js/main.js" defer></script>
</body>
</html>
`;
}

// Shared "split" page header: cream panel carries the crumbs/title, photo blends in on the right
// via a mask-fade (see .split-hero in home.css). objectPosition keeps each photo's face clear.
function splitHero({ crumbs, title, img, alt = '', objectPosition = 'center' }) {
  return `<section class="phero tx-phero split-hero"><div class="phero-frame">
<img class="phero-img split-hero-img" data-parallax="20" src="/img/${img}.webp" alt="${alt}" fetchpriority="high" style="object-position:${objectPosition}">
<div class="phero-fade" aria-hidden="true"></div>
<div class="simple-hero-content">${crumbs}<h1 data-split>${title}</h1></div>
</div></section>`;
}

module.exports = { I, logo, wave, layout, PORTAL, PHONE, EMAIL, WHATSAPP, HOURS, NAV, footerBottom, splitHero };
