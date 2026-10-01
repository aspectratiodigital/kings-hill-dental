// node build-v2/build.js  ->  writes static pages into site-v2/
const fs = require('fs');
const path = require('path');
const { layout } = require('./parts');
const A = require('./pages-a');
const H = require('./pages-home');
const B = require('./pages-b');

const OUT = path.join(__dirname, '..', 'site-v2');
const pages = [H.home(), A.about(), A.contact(), B.dentistry(), B.aesthetics(), B.aestheticsAntiWrinkle(), B.aestheticsSkinCare(), B.aestheticsProfhilo(), B.aestheticsFillers(), B.feesPage(), B.membership(), B.referrals(), B.topicGeneral(), B.examinations(), B.hygiene(), B.childrensDentistry(), B.bruxism(), B.restorativeField(), B.cosmeticField(), B.orthodonticField(), B.fillings(), B.crownsBridges(), B.rootCanals(), B.dentures(), B.implants(), B.whitening(), B.bonding(), B.veneers(), B.invisalign(), B.invisalignGo(), B.fixedBraces(), B.sparkAligners(), B.privacy(), B.termsConditions(), B.complaintsProcedure(), B.accessibility()];
for (const p of pages) {
  const dir = path.join(OUT, p.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), layout({ title: p.title, description: p.description, path: p.path, body: p.body, bodyClass: p.bodyClass }));
  console.log('built', p.path);
}
