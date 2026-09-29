// Wix draft URL paths -> clean local paths
const WIX_BASE = 'https://aspectratiodigitial.wixstudio.com/kingshilldental';

const ROUTES = {
  '': '/',
  'home-new': '/',
  'about': '/about/',
  'dentistry': '/dentistry/',
  'dentistry-2': '/aesthetics/',
  'fees': '/fees/',
  'membership-plan': '/fees/membership-plan/',
  'referrals': '/referrals/',
  'contact': '/contact/',
  'blank-4': '/privacy-policy/',
  'blank-5': '/accessibility-statement/',
  'dentistry/general-and-preventative': '/dentistry/general-preventative/',
  'dentistry/general-and-preventative/dental-examinations': '/dentistry/general-preventative/dental-examinations/',
  'dentistry/general-and-preventative/dental-examinations-3': '/dentistry/general-preventative/hygiene-gum-health/',
  'dentistry/general-and-preventative/dental-examinations-1': '/dentistry/general-preventative/childrens-dentistry/',
  'dentistry/general-and-preventative/bruxism': '/dentistry/general-preventative/bruxism/',
  'dentistry/restorative-dentistry': '/dentistry/restorative/',
  'dentistry/restorative-dentistry/fillings': '/dentistry/restorative/fillings/',
  'dentistry/restorative-dentistry/crowns-and-bridges': '/dentistry/restorative/crowns-bridges/',
  'dentistry/restorative-dentistry/root-canals': '/dentistry/restorative/root-canals/',
  'dentistry/restorative-dentistry/dentures': '/dentistry/restorative/dentures/',
  'dentistry/restorative-dentistry/implants': '/dentistry/restorative/implants/',
  'dentistry/general-and-preventative-1': '/dentistry/cosmetic/',
  'dentistry/restorative-dentistry/implants-1': '/dentistry/cosmetic/teeth-whitening/',
  'dentistry/restorative-dentistry/implants-1-1': '/dentistry/cosmetic/composite-bonding/',
  'dentistry/restorative-dentistry/implants-1-1-1': '/dentistry/cosmetic/veneers/',
  'dentistry/general-and-preventative-3': '/dentistry/orthodontic/',
  'dentistry/restorative-dentistry/implants-1-1-1-1': '/dentistry/orthodontic/invisalign/',
  'dentistry/restorative-dentistry/implants-1-1-1-1-1': '/dentistry/orthodontic/invisalign-go/',
  'dentistry/restorative-dentistry/implants-1-1-1-1-1-1': '/dentistry/orthodontic/fixed-braces/',
  'dentistry/restorative-dentistry/implants-1-1-1-1-1-1-1': '/dentistry/orthodontic/spark-aligners/',
  'dentistry/restorative-dentistry/implants-1-1-1-1-1-1-1-1': '/aesthetics/anti-wrinkle-treatments/',
  'dentistry/restorative-dentistry/implants-1-1-1-1-1-1-1-2': '/aesthetics/skin-care/',
  'dentistry/restorative-dentistry/implants-1-1-1-1-1-1-1-2-1': '/aesthetics/profhilo/',
  'dentistry/restorative-dentistry/implants-1-1-1-1-1-1-1-2-1-1': '/aesthetics/dermal-fillers/',
};

for (const n of ['amelia-madan-dumper', 'mohammed-lalji', 'simon-dumper', 'lucy-hicks', 'dr-furqan-jamal', 'gemma-abbott', 'carly-marinelli', 'chelsea-white', 'vicky-mayne']) ROUTES['team/' + n] = '/team/' + n + '/';

function routeFor(wixPath) {
  const k = wixPath.replace(/^\/+|\/+$/g, '');
  if (ROUTES[k] !== undefined) return ROUTES[k];
  if (/^team\//.test(k)) return '/' + k + '/';
  return null;
}

function hrefMap(h) {
  if (!h) return h;
  if (h.startsWith(WIX_BASE)) {
    const rest = h.slice(WIX_BASE.length).split(/[?#]/)[0];
    const hash = (h.match(/#.*$/) || [''])[0];
    const r = routeFor(rest);
    if (r) return r + hash;
  }
  return h;
}

// slug from pages.json -> local route
const SLUG_ROUTES = {};
for (const [k, v] of Object.entries(ROUTES)) SLUG_ROUTES[k.replace(/\//g, '__') || 'root'] = v;

module.exports = { ROUTES, routeFor, hrefMap, SLUG_ROUTES, WIX_BASE };
