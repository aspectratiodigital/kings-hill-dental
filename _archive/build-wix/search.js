// Builds site/assets/search.json (title, route, plain text) from the generated pages
const fs = require('fs');
const path = require('path');
const { SLUG_ROUTES } = require('./routes');

function writeSearchIndex(OUT, pages) {
  const out = [];
  for (const p of pages) {
    const route = SLUG_ROUTES[p.slug];
    const file = route && path.join(OUT, route.replace(/^\//, ''), 'index.html');
    if (!file || !fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    const main = (html.match(/<main>([\s\S]*)<\/main>/) || [])[1] || '';
    const text = main
      .replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&#39;|&#x27;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
    out.push({ t: p.title, u: route, x: text.slice(0, 900) });
  }
  fs.writeFileSync(path.join(OUT, 'assets', 'search.json'), JSON.stringify(out));
}

module.exports = { writeSearchIndex };
