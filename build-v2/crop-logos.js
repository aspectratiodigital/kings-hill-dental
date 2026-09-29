// Crops every vec/logo-*.svg viewBox to the artwork's real bounding box (run after vectors.js),
// and writes vec/logo-aspects.json so the build can size all logos to the same visual weight.
const puppeteer = require('../_capture/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'vec');
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  const aspects = {};
  for (const f of fs.readdirSync(dir).filter((x) => /^logo-.*\.svg$/.test(x) && x !== 'logo-aspects.json')) {
    let s = fs.readFileSync(path.join(dir, f), 'utf8');
    await p.setContent('<body style="margin:0">' + s + '</body>');
    const bb = await p.evaluate(() => { const sv = document.querySelector('svg'); sv.setAttribute('width', '2000'); const r = sv.getBBox(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    const pad = Math.max(bb.w, bb.h) * 0.005;
    const vb = [bb.x - pad, bb.y - pad, bb.w + 2 * pad, bb.h + 2 * pad].map((n) => +n.toFixed(2)).join(' ');
    s = s.replace(/viewBox="[^"]*"/, 'viewBox="' + vb + '"');
    fs.writeFileSync(path.join(dir, f), s);
    aspects[f.replace(/^logo-|\.svg$/g, '')] = +(bb.w / bb.h).toFixed(3);
  }
  fs.writeFileSync(path.join(dir, 'logo-aspects.json'), JSON.stringify(aspects, null, 1));
  console.log(aspects);
  await b.close();
})();
