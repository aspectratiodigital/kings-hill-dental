// Copy / download the images referenced by the built pages.
const fs = require('fs'), path = require('path'), https = require('https');
const ROOT = path.join(__dirname, '..'); const CAP = path.join(ROOT, '_capture');
const imgmap = JSON.parse(fs.readFileSync(path.join(CAP, 'imgmap.json'), 'utf8'));
function download(url, dest) {
  return new Promise((res, rej) => {
    https.get(url, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return download(r.headers.location, dest).then(res, rej);
      if (r.statusCode !== 200) return rej(new Error(url + ' ' + r.statusCode));
      const f = fs.createWriteStream(dest); r.pipe(f); f.on('finish', () => f.close(res));
    }).on('error', rej);
  });
}
async function copyAssets(usedImages, usedBgs) {
  const out = path.join(ROOT, 'site', 'assets', 'img'); fs.mkdirSync(out, { recursive: true });
  for (const [uri, name] of usedImages) {
    const dest = path.join(out, name); if (fs.existsSync(dest)) continue;
    const local = imgmap[uri];
    if (local) fs.copyFileSync(path.join(ROOT, local), dest);
    else {
      const cache = path.join(CAP, 'wixmedia', uri);
      if (!fs.existsSync(cache)) { try { await download('https://static.wixstatic.com/media/' + uri, cache); } catch (e) { console.log('img download failed', uri, String(e)); continue; } }
      fs.copyFileSync(cache, dest);
    }
  }
  for (const [url, name] of usedBgs) {
    const dest = path.join(out, name); if (fs.existsSync(dest)) continue;
    try { await download(url, dest); } catch (e) { console.log('bg download failed', url.slice(0, 120), String(e)); }
  }
}
module.exports = { copyAssets };
