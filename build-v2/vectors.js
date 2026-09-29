// Turns the brown PNG service icons into single-path SVGs (fill = currentColor) and
// normalises the partner-logo SVGs so their colour is controlled from CSS.
const potrace = require('potrace');
const sharp = require('../_capture/node_modules/sharp');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(__dirname, 'vec');
fs.mkdirSync(OUT, { recursive: true });

const icons = [['Orthodontics D Brown.png', 'orthodontics'], ['Dental Implants D Brown.png', 'restoration'], ['Dental Hygiene D Brown.png', 'hygiene'], ['Asthetics D Brown.png', 'aesthetics']];

const trace = (buf) => new Promise((res, rej) => potrace.trace(buf, { threshold: 128, turdSize: 6, optTolerance: 0.3, color: 'currentColor', background: 'transparent' }, (e, svg) => (e ? rej(e) : res(svg))));

(async () => {
  for (const [file, name] of icons) {
    // flatten onto white, then threshold: potrace traces the dark shape
    const buf = await sharp(path.join(ROOT, 'Icons', file)).resize({ width: 900 }).flatten({ background: '#ffffff' }).greyscale().png().toBuffer();
    let svg = await trace(buf);
    svg = svg.replace(/<\?xml[^>]*>\s*/, '').replace(/<!DOCTYPE[^>]*>\s*/, '').replace(/ width="\d+"| height="\d+"/g, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" ').replace(/fill="[^"]*"/g, 'fill="currentColor"').replace(/stroke="[^"]*"/g, '');
    fs.writeFileSync(path.join(OUT, 'icon-' + name + '.svg'), svg);
    console.log(name, svg.length);
  }
  const pl = path.join(ROOT, 'Partner Logos');
  for (const f of fs.readdirSync(pl).filter((x) => / SVG\.svg$/.test(x))) {
    let s = fs.readFileSync(path.join(pl, f), 'utf8');
    s = s.replace(/<\?xml[^>]*>\s*/, '').replace(/<defs>[\s\S]*?<\/defs>/g, '').replace(/<style>[\s\S]*?<\/style>/g, '').replace(/ class="[^"]*"/g, '').replace(/ (id|data-name)="[^"]*"/g, '').replace(/ style="[^"]*"/g, '');
    s = s.replace('<svg ', '<svg aria-hidden="true" focusable="false" fill="currentColor" ');
    fs.writeFileSync(path.join(OUT, 'logo-' + f.replace(/ SVG\.svg$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.svg'), s);
  }
  console.log(fs.readdirSync(OUT).length, 'vectors');
})();
