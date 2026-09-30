// Produces web-ready images in site-v2/img from the client's source folders.
const sharp = require('../_capture/node_modules/sharp');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'site-v2', 'img');
fs.mkdirSync(OUT, { recursive: true });

const jobs = [
  // [source, output name, max width, quality]
  ['KHD Stock/General Preventative.jpg', 'hero', 2000, 80],
  ['Home/Welcome To.jpg', 'welcome-team', 1600, 80],
  ['Team/Amelia and Simon.jpg', 'amelia-simon', 900, 80],
  ['Team/Amelia-Dumper T.png', 'team-amelia', 900, 84],
  ['Team/Simon-Dumper T.png', 'team-simon', 900, 84],
  ['Team/Lucy Hicks T.png', 'team-lucy', 900, 84],
  ['Team/Mohammed T.png', 'team-mohammed', 900, 84],
  ['Team/Furqan Jamal T.png', 'team-furqan', 900, 84],
  ['Team/Gemma-Abbott.png', 'team-gemma', 900, 84],
  ['Team/Carly Marinelli T.png', 'team-carly', 900, 84],
  ['Team/Chelsea White T.png', 'team-chelsea', 900, 84],
  ['Team/Vicky Mayne T.png', 'team-vicky', 900, 84],
  ['KHD Stock/General Preventative.jpg', 'topic-general', 1800, 80],
  ['KHD Stock/General Preventative 2.jpg', 'topic-general-2', 1800, 80],
  ['KHD Stock/Restorative.jpg', 'topic-restorative', 1800, 80],
  ['KHD Stock/Composite Bonding.jpg', 'topic-cosmetic', 1800, 80],
  ['KHD Stock/Invisalign Go.jpg', 'topic-orthodontic', 1800, 80],
  ['KHD Stock/General Preventative.jpg', 'hero-general', 2000, 80],
  ['KHD Stock/Crowns and Bridges.jpg', 'hero-restorative', 2000, 80],
  ['KHD Stock/Veneers.jpg', 'hero-cosmetic', 2000, 80],
  ['KHD Stock/Invisalign.jpg', 'hero-orthodontic', 2000, 80],
  ['External Stock/fixed-braces.jpg', 'tx-fixed-braces', 900, 80], // Pexels photo, free for commercial use — no clean local asset existed for this treatment
  ['Stock Assets/Spark Aligners.jpg', 'tx-spark', 900, 80],
  ['KHD Stock/Composite Bonding.jpg', 'cx-bonding', 1400, 80],
  ['KHD Stock/Teeth Whitening.jpg', 'cx-whitening', 1400, 80],
  ['KHD Stock/Fillings.jpg', 'rx-fillings', 1400, 80],
  ['KHD Stock/Dentures.jpg', 'rx-dentures', 1400, 80],
  ['KHD Stock/Anti Wrinkle.jpg', 'aes-anti-wrinkle', 1400, 80],
  ['KHD Stock/Skin Care.jpg', 'aes-skin-care', 1400, 80],
  ['KHD Stock/Profhilo.jpg', 'aes-profhilo', 1400, 80],
  ['KHD Stock/Dermal Fillers.jpg', 'aes-fillers', 1400, 80],
  ['KHD Stock/Hygeine Gum Health.jpg', 'tx-hygiene', 1800, 80],
  ['KHD Stock/Childrens Dentistry.jpg', 'tx-children', 1800, 80],
  ['KHD Stock/Bruxism.jpg', 'tx-bruxism', 1800, 80],
  ['External Stock/dental-examination.jpg', 'tx-exam', 1600, 80], // was 'Stock Assets/Stock 11.jpg' (an unlicensed watermarked Adobe Stock preview) — replaced with a Pexels photo, free for commercial use
  ['Stock Assets/Stock 14.jpg', 'tx-hygiene-2', 1600, 80],
  ['KHD Stock/Childrens Dentistry.jpg', 'plan-child', 1200, 80],
  ['Stock Assets/Stock 14.jpg', 'plan-adult', 1200, 80],
  ['Practice/Reception.JPG', 'about-1', 1800, 80],
  ['Icons/Orthodontics Brown.png', 'icon-orthodontics', 400, 90],
  ['Icons/Dental Implants Brown.png', 'icon-restoration', 400, 90],
  ['Icons/Dental Hygiene Brown.png', 'icon-hygiene', 400, 90],
  ['Icons/Asthetics Brown.png', 'icon-aesthetics', 400, 90],
];
for (const f of fs.readdirSync(path.join(ROOT, 'Practice'))) {
  if (/^WhatsApp|Old Pic/.test(f)) continue;
  const name = 'practice-' + f.replace(/\.[a-z]+$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  jobs.push(['Practice/' + f, name, 1600, 78]);
}

(async () => {
  for (const [src, name, w, q] of jobs) {
    const file = path.join(ROOT, src);
    if (!fs.existsSync(file)) { console.log('missing', src); continue; }
    const img = sharp(file).rotate();
    const meta = await img.metadata();
    await img.resize({ width: Math.min(meta.width, w), withoutEnlargement: true }).webp({ quality: q, alphaQuality: 92 }).toFile(path.join(OUT, name + '.webp'));
  }
  // partner logos (svg) copied as-is
  const pl = path.join(ROOT, 'Partner Logos');
  for (const f of fs.readdirSync(pl)) if (/ SVG\.svg$/.test(f)) fs.copyFileSync(path.join(pl, f), path.join(OUT, 'logo-' + f.replace(/ SVG\.svg$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.svg'));
  console.log(fs.readdirSync(OUT).length, 'files');
})();
