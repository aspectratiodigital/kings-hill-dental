// Removes unreferenced images and converts the rest to WebP, rewriting references.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const SITE = path.join(__dirname, '..', 'site');
const IMG = path.join(SITE, 'assets', 'img');

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const textFiles = walk(SITE).filter((f) => /\.(html|css|js|json)$/.test(f));
const read = (f) => fs.readFileSync(f, 'utf8');

(async () => {
  const corpus = textFiles.map(read).join('\n');
  for (const f of walk(IMG)) if (/.webp$/.test(f) && ['.png', '.jpg', '.jpeg'].some((e) => fs.existsSync(f.replace(/.webp$/, e)))) fs.unlinkSync(f);
  const imgs = walk(IMG);
  let removed = 0, converted = 0, before = 0, after = 0;
  const rewrites = new Map();
  for (const f of imgs) {
    const rel = path.relative(SITE, f).replace(/\\/g, '/');
    const url = '/' + rel;
    before += fs.statSync(f).size;
    if (!corpus.includes(url)) { fs.unlinkSync(f); removed++; continue; }
    if (!/\.(png|jpe?g)$/i.test(f)) { after += fs.statSync(f).size; continue; }
    const out = f.replace(/\.(png|jpe?g)$/i, '.webp');
    const img = sharp(f);
    const meta = await img.metadata();
    const buf = await img.resize({ width: Math.min(meta.width, 2200), withoutEnlargement: true }).webp({ quality: 84, alphaQuality: 92, effort: 5 }).toBuffer();
    if (buf.length >= fs.statSync(f).size) { after += fs.statSync(f).size; continue; }
    fs.writeFileSync(out, buf);
    fs.unlinkSync(f);
    rewrites.set(url, '/' + path.relative(SITE, out).replace(/\\/g, '/'));
    after += buf.length; converted++;
  }
  for (const f of textFiles) {
    let t = read(f), c = false;
    for (const [a, b] of rewrites) if (t.includes(a)) { t = t.split(a).join(b); c = true; }
    if (c) fs.writeFileSync(f, t);
  }
  console.log({ removed, converted, beforeMB: (before / 1e6).toFixed(1), afterMB: (after / 1e6).toFixed(1) });
})();
