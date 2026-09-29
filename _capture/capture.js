const puppeteer=require('puppeteer-core'); const fs=require('fs'); const path=require('path');
const BASE='https://aspectratiodigitial.wixstudio.com/kingshilldental/';
const SAMPLES=[].concat([1024,1100,1200,1280,1300,1366,1400,1440,1500].map(vp=>({tag:"d"+vp,vp})),[760,768,820,880,940,1000].map(vp=>({tag:"t"+vp,vp})),[340,360,375,390,414,430,480,540,640,740].map(vp=>({tag:"m"+vp,vp})));
const DATA=process.env.DATA||"data", MOTION=process.env.MOTION||"motion";
const only=process.argv[2]; const conc=+(process.argv[3]||3);
const pages=require('./pages.json').filter(p=>!only||only==='all'||p.slug.includes(only)||p.title.toLowerCase().includes(only.toLowerCase()));
fs.mkdirSync(DATA,{recursive:true}); fs.mkdirSync(MOTION,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function capturePage(browser,pg){
  const out=path.join(DATA,pg.slug+'.json'); if(fs.existsSync(out)&&!process.env.FORCE){ console.log('skip',pg.slug); return; }
  const page=await browser.newPage(); const motion=[];
  page.on('response',async r=>{ try{ const u=r.url(); if(/siteassets\.parastorage\.com\/pages\/pages\/thunderbolt\?/.test(u)&&/pageId=/.test(u)){ const t=await r.json(); if(t&&t.props&&t.props.motion) motion.push({motion:t.props.motion.animationDataByCompId,tr:t.props.triggersAndReactions}); } }catch(e){} });
  await page.setViewport({width:SAMPLES[0].vp,height:900});
  await page.goto(BASE+pg.path,{waitUntil:'networkidle2',timeout:90000});
  await page.addScriptTag({path:'collector.js'});
  await sleep(1500);
  const res={title:pg.title,path:pg.path,samples:{}};
  for(const s of SAMPLES){
    await page.setViewport({width:s.vp,height:900,isMobile:false}); await sleep(1600);
    const H=await page.evaluate(()=>document.documentElement.scrollHeight);
    for(let y=0;y<H;y+=500){ await page.evaluate(y=>window.scrollTo(0,y),y); await sleep(110); }
    for(let k=0;k<12;k++){ const pend=await page.evaluate(()=>[...document.querySelectorAll('wix-bg-image')].filter(w=>getComputedStyle(w).backgroundImage==='none').length); if(!pend) break; await sleep(400); }
    await page.evaluate(()=>window.scrollTo(0,0)); await sleep(700);
    res.samples[s.tag]=await page.evaluate(()=>window.__collect()); res.samples[s.tag].vp=s.vp;
  }
  fs.writeFileSync(out,JSON.stringify(res)); fs.writeFileSync(path.join(MOTION,pg.slug+'.json'),JSON.stringify(motion));
  console.log('done',pg.slug,(fs.statSync(out).size/1024|0)+'KB'); await page.close();
}
(async()=>{
  const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:'new',args:['--no-sandbox','--hide-scrollbars']});
  const q=[...pages]; const workers=Array.from({length:conc},async()=>{ while(q.length){ const pg=q.shift(); try{ await capturePage(browser,pg);}catch(e){ console.log('ERR',pg.slug,String(e).slice(0,200)); } } });
  await Promise.all(workers); await browser.close();
})();
