// Turns the captured header/footer (positioned boxes with no anchors) into real links.
const NAV_HREF = { about: '/about/', dentistry: '/dentistry/', aesthetics: '/aesthetics/', fees: '/fees/', referrals: '/referrals/', contact: '/contact/' };

function wrapSvg(html, cls, href, label, external) {
  const open = `<svg class="o ${cls}"`;
  const i = html.indexOf(open);
  if (i < 0) return html;
  const j = html.indexOf('</svg>', i) + '</svg>'.length;
  const svg = html.slice(i, j).replace(open, '<svg style="width:100%;height:100%;display:block"');
  const a = `<a class="o ${cls}" href="${href}" aria-label="${label}"${external ? ' target="_blank" rel="noopener"' : ''}>${svg}</a>`;
  return html.slice(0, i) + a + html.slice(j);
}

function linkHeader(html) {
  // logo = first standalone svg after the menu button
  for (const m of [...html.matchAll(/<svg class="o (\w+)"[^>]*viewBox="0 0 1586 600"/g)]) html = wrapSvg(html, m[1], '/', 'Kings Hill Dental - home');
  html = html.replace(/(<div class="o \w+" data-nav="(\w+)"[^>]*>)/g, (all, open, name) => (NAV_HREF[name] ? `${open}<a class="navlink" href="${NAV_HREF[name]}" aria-label="${name}"></a>` : all));
  return html;
}

function linkFooter(html) {
  // Wix ships a second, absolutely positioned copy of every footer link; keep one
  html = html.replace(/<a class="o \w+" href="[^"]*"[^>]*>[\s\S]*?<\/a>/g, '');
  html = html.replace(/<a href="https:\/\/api\.whatsapp[^"]*"/, (a) => a + ' target="_blank" rel="noopener"');
  html = html.replace(/<a href="http:\/\/aspectratiodigital\.com"/, '<a href="http://aspectratiodigital.com" target="_blank" rel="noopener"');
  const icons = [
    ['https://share.google/nbIuslfrwmR400lkT', 'Find us on Google', true],
    ['mailto:reception@kingshilldental.co.uk', 'Email us', false],
    ['tel:01732523500', 'Call us', false],
    ['https://api.whatsapp.com/send/?phone=447414104409&amp;text&amp;type=phone_number&amp;app_absent=0', 'Chat on WhatsApp', true],
    ['https://www.facebook.com/kingshilldental/', 'Facebook', true],
    ['https://www.instagram.com/kingshilldental/?hl=en', 'Instagram', true],
  ];
  const classes = [...html.matchAll(/<svg class="o (\w+)"/g)].map((m) => m[1]);
  icons.forEach(([href, label, ext], k) => { if (classes[k]) html = wrapSvg(html, classes[k], href, label, ext); });
  return html;
}

module.exports = { linkHeader, linkFooter };
