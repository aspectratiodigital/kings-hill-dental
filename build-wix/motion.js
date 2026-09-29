// Motion + hover data -> markup attributes and CSS
const fs = require('fs');
const path = require('path');
const { expr, fitScalar } = require('./fit');

const CAP = path.join(__dirname, '..', '_capture');

function loadMotion(slug) {
  const f = path.join(CAP, 'motion', slug + '.json');
  if (!fs.existsSync(f)) return { effects: [], scrubs: [] };
  const m = JSON.parse(fs.readFileSync(f, 'utf8'));
  const e = m.find((x) => x.motion && Object.keys(x.motion).length);
  if (!e) return { effects: [], scrubs: [] };
  const trig = (e.tr && e.tr.compsToTriggers) || {};
  const effects = [];
  const scrubs = [];
  for (const [cid, es] of Object.entries(e.motion)) {
    for (const [eid, arr] of Object.entries(es)) {
      const a = arr[0];
      const ne = a.namedEffect || {};
      // breakpoint gating from viewport-enter trigger
      let minW = 0;
      const vt = trig[cid] && trig[cid]['viewport-enter'];
      if (vt) {
        const list = Object.values(vt)[0] || [];
        const mob = list.find((x) => x.triggerBpRange && x.triggerBpRange.min === 320);
        if (mob && (!mob.reactions || !mob.reactions.length)) minW = 751;
      }
      if (a.type === 'TimeAnimationOptions') {
        effects.push({ comp: cid, type: ne.type, dur: a.duration || 1200, delay: a.delay || 0, ease: a.easing || '', dir: ne.direction || '', scale: ne.initialScale || '', power: ne.power || '', shutters: ne.shutters || '', minW });
      } else if (a.type === 'ScrubAnimationOptions') {
        scrubs.push({ comp: cid, type: ne.type, angle: ne.angle, dist: ne.distance && ne.distance.value, axis: ne.axis, trans: a.transitionDuration });
      }
    }
  }
  return { effects, scrubs };
}

function animAttr(e) {
  return `data-anim="${e.type}" data-dur="${e.dur}" data-delay="${e.delay}"${e.ease ? ` data-ease="${e.ease}"` : ''}${e.dir ? ` data-dir="${e.dir}"` : ''}${e.scale ? ` data-scale="${e.scale}"` : ''}${e.shutters ? ` data-shutters="${e.shutters}"` : ''}${e.minW ? ` data-min="${e.minW}"` : ''}`;
}

// Attach animation attributes to matching nodes in a merged section tree
function attachAnimations(sec, motion) {
  const used = [];
  const find = (compId) => {
    const direct = [...sec.nodes.values()].filter((n) => Object.values(n.byTag).some((b) => b.rec.id === compId));
    if (direct.length) return direct;
    const pref = compId + '|';
    const cand = [...sec.nodes.values()].filter((n) => n.key.startsWith(pref));
    return cand.filter((n) => !(sec.nodes.get(n.parentKey) && sec.nodes.get(n.parentKey).key.startsWith(pref)));
  };
  for (const e of motion.effects) {
    const nodes = find(e.comp);
    for (const n of nodes) { n.attrs = ((n.attrs || '') + ' ' + animAttr(e)).trim(); used.push(e.comp); }
  }
  for (const s of motion.scrubs) {
    const nodes = find(s.comp);
    for (const n of nodes) { n.attrs = ((n.attrs || '') + ` data-mouse="${s.dist || 20}|${s.angle || 6}"`).trim(); used.push(s.comp); }
  }
  return used;
}

module.exports = { loadMotion, attachAnimations };
