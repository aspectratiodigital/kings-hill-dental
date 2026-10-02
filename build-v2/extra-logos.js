// Single-colour (currentColor) vectors for the two partners added after the first logo batch:
//   Denplan   <- Partner Logos/Denplan Original.svg   (from denplan.co.uk; tagline cropped off)
//   Enlighten <- Partner Logos/Enlighten Wordmark Black.png (from enlightensmiles.com; traced)
const potrace = require('potrace');
const sharp = require('../_capture/node_modules/sharp');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(__dirname, 'vec');
const trace = (buf) => new Promise((res, rej) => potrace.trace(buf, { threshold: 140, turdSize: 4, optTolerance: 0.3, color: 'currentColor', background: 'transparent' }, (e, svg) => (e ? rej(e) : res(svg))));
const tidy = (svg) => svg.replace(/<\?xml[^>]*>\s*/, '').replace(/<!DOCTYPE[^>]*>\s*/, '').replace(/ width="[\d.]+(px)?"| height="[\d.]+(px)?"/g, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" fill="currentColor" ');

(async () => {
  const aspects = JSON.parse(fs.readFileSync(path.join(OUT, 'logo-aspects.json'), 'utf8'));
  let dp = fs.readFileSync(path.join(ROOT, 'Partner Logos', 'Denplan Original.svg'), 'utf8');
  dp = tidy(dp.replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="currentColor"').replace(/viewBox="0 0 365 136"/, 'viewBox="0 0 365 105"'));
  fs.writeFileSync(path.join(OUT, 'logo-denplan.svg'), dp);
  aspects.denplan = +(365 / 105).toFixed(3);

  const src = path.join(ROOT, 'Partner Logos', 'Enlighten Wordmark Black.png');
  const { width, height } = await sharp(src).metadata();
  const buf = await sharp(src).flatten({ background: '#ffffff' }).greyscale().png().toBuffer();
  // pad the viewBox: the glyphs touch the PNG edges, so the svg viewport clipped the g's tail and the E/R edges
const P = 24;
const en = tidy(await trace(buf)).replace(/viewBox="0 0 (\d+) (\d+)"/, (_, w, h) => `viewBox="${-P} ${-P} ${+w + 2 * P} ${+h + 2 * P}"`);
  fs.writeFileSync(path.join(OUT, 'logo-enlighten.svg'), en);
  aspects.enlighten = +((width + 2 * P) / (height + 2 * P)).toFixed(3);

  fs.writeFileSync(path.join(OUT, 'logo-aspects.json'), JSON.stringify(Object.fromEntries(Object.entries(aspects).sort()), null, 1) + '\n');
  console.log('denplan', dp.length, aspects.denplan, '| enlighten', en.length, aspects.enlighten);
})();
