(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // --- current page in nav ------------------------------------------------
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const navMap = { '/about': 'about', '/dentistry': 'dentistry', '/aesthetics': 'aesthetics', '/fees': 'fees', '/referrals': 'referrals', '/contact': 'contact' };
  Object.keys(navMap).forEach((p) => {
    if (path === p || path.indexOf(p + '/') === 0) $$('[data-nav="' + navMap[p] + '"]').forEach((e) => e.classList.add('is-current'));
  });
  $$('[data-mm-link]').forEach((a) => {
    const h = a.getAttribute('data-mm-link').replace(/\/+$/, '') || '/';
    if (h === path || (h !== '/' && path.indexOf(h + '/') === 0)) a.classList.add('is-current');
  });

  // --- desktop dropdowns ---------------------------------------------------
  let closeTimer;
  const dds = $$('.dd');
  function closeAll() { dds.forEach((d) => d.classList.remove('is-open')); $$('[data-nav].is-open').forEach((n) => n.classList.remove('is-open')); }
  function openDd(name) { closeAll(); const d = $('.dd[data-dd="' + name + '"]'); const n = $('[data-nav="' + name + '"]'); if (d) d.classList.add('is-open'); if (n) n.classList.add('is-open'); }
  ['dentistry', 'aesthetics', 'fees'].forEach((name) => {
    const n = $('[data-nav="' + name + '"]'); const d = $('.dd[data-dd="' + name + '"]');
    if (!n || !d) return;
    const enter = () => { clearTimeout(closeTimer); openDd(name); };
    const leave = () => { clearTimeout(closeTimer); closeTimer = setTimeout(closeAll, 140); };
    [n, d].forEach((e) => { e.addEventListener('mouseenter', enter); e.addEventListener('mouseleave', leave); });
    n.addEventListener('focusin', enter);
  });
  $$('[data-nav]').forEach((n) => { if (!['dentistry', 'aesthetics', 'fees'].includes(n.getAttribute('data-nav'))) n.addEventListener('mouseenter', closeAll); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeAll(); closeMenu(); } });

  // --- mobile / tablet menu ------------------------------------------------
  const mm = $('[data-mm]');
  function openMenu() { if (!mm) return; mm.hidden = false; mm.setAttribute('data-open', ''); document.body.classList.add('mm-lock'); }
  function closeMenu() { if (!mm) return; mm.removeAttribute('data-open'); mm.hidden = true; document.body.classList.remove('mm-lock'); }
  $$('[data-menu-btn]').forEach((b) => b.addEventListener('click', openMenu));
  $$('[data-mm-close]').forEach((b) => b.addEventListener('click', closeMenu));
  $$('[data-mm-link]').forEach((a) => a.addEventListener('click', closeMenu));

  // --- entrance animations (mirrors the Wix draft's viewport-enter effects) ---
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = { cubicInOut: 'cubic-bezier(0.645,0.045,0.355,1)', cubicIn: 'cubic-bezier(0.55,0.055,0.675,0.19)', cubicOut: 'cubic-bezier(0.215,0.61,0.355,1)', sineInOut: 'cubic-bezier(0.445,0.05,0.55,0.95)', sineOut: 'cubic-bezier(0.39,0.575,0.565,1)', quadOut: 'cubic-bezier(0.25,0.46,0.45,0.94)', linear: 'linear' };
  const CLIP = { left: 'inset(0 100% 0 0)', right: 'inset(0 0 0 100%)', top: 'inset(0 0 100% 0)', bottom: 'inset(100% 0 0 0)', center: 'inset(50% 50% 50% 50%)' };
  const OFFSET = { left: [-80, 0], right: [80, 0], top: [0, -80], bottom: [0, 80] };
  function frames(el) {
    const t = el.dataset.anim, dir = el.dataset.dir || 'left', sc = parseFloat(el.dataset.scale) || 1;
    switch (t) {
      case 'FadeIn': return [{ opacity: 0 }, { opacity: 1 }];
      case 'FloatIn': { const o = OFFSET[dir] || [0, 80]; return [{ opacity: 0, translate: o[0] + 'px ' + o[1] + 'px' }, { opacity: 1, translate: '0 0' }]; }
      case 'SlideIn': { const o = OFFSET[dir] || [0, 0]; return [{ clipPath: CLIP[dir] || CLIP.left, translate: (o[0] / 2) + 'px ' + (o[1] / 2) + 'px' }, { clipPath: 'inset(0 0 0 0)', translate: '0 0' }]; }
      case 'RevealIn': return [{ clipPath: CLIP[dir] || CLIP.left }, { clipPath: 'inset(0 0 0 0)' }];
      case 'DropIn': case 'ExpandIn': return [{ opacity: 0, scale: String(sc) }, { opacity: 1, scale: '1' }];
      case 'ShuttersIn': return [{ clipPath: CLIP[dir] || CLIP.top }, { clipPath: 'inset(0 0 0 0)' }];
      default: return [{ opacity: 0 }, { opacity: 1 }];
    }
  }
  function play(el) {
    el.classList.add('is-anim');
    if (reduce || !el.animate) return;
    const a = el.animate(frames(el), { duration: +el.dataset.dur || 1200, delay: +el.dataset.delay || 0, easing: EASE[el.dataset.ease] || 'cubic-bezier(0.25,0.46,0.45,0.94)', fill: 'backwards' });
    a.onfinish = () => { try { a.cancel(); } catch (e) {} };
  }
  const anims = $$('[data-anim]');
  if (anims.length) {
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { io.unobserve(en.target); play(en.target); } });
    }, { threshold: 0.12 }) : null;
    anims.forEach((el) => {
      const min = +el.dataset.min || 0;
      if ((min && !matchMedia('(min-width:' + min + 'px)').matches) || !io) { el.classList.add('is-anim'); return; }
      io.observe(el);
    });
  }

  // --- animated icons: path morph on hover (start path -> Wix "end path") ---
  const NUM = /-?\d*\.?\d+(?:e-?\d+)?/g;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function morph(path, to) {
    const A = path._a, B = path._b; if (!A || !B) return;
    const from = path._cur || (to ? A : B), dest = to ? B : A, t0 = performance.now(), dur = 220;
    cancelAnimationFrame(path._raf);
    (function step(now) {
      const p = Math.min(1, (now - t0) / dur), e = ease(p);
      path._cur = from.map((v, i) => v + (dest[i] - v) * e);
      let i = 0; path.setAttribute('d', path._tpl.replace(NUM, () => +path._cur[i++].toFixed(3)));
      if (p < 1) path._raf = requestAnimationFrame(step);
    })(t0);
  }
  $$('svg[data-animate-id="animatedSvg"]').forEach((svg) => {
    const paths = $$('path[data-animated-end-path]', svg).filter((p) => {
      p._tpl = p.getAttribute('d'); p._a = p._tpl.match(NUM).map(Number); p._b = p.getAttribute('data-animated-end-path').match(NUM).map(Number);
      return p._a.length === p._b.length;
    });
    if (!paths.length) return;
    const host = svg.closest('a, button') || svg.parentElement;
    host.addEventListener('mouseenter', () => paths.forEach((p) => morph(p, true)));
    host.addEventListener('mouseleave', () => paths.forEach((p) => morph(p, false)));
  });

  // --- pointer-follow tilt (Wix 'AiryMouse') ------------------------------
  $$('[data-mouse]').forEach((el) => {
    const p = el.dataset.mouse.split('|'), dist = +p[0] || 20, ang = +p[1] || 6;
    el.style.transition = 'translate 0.5s ease-out, rotate 0.5s ease-out';
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      el.style.translate = (nx * dist).toFixed(1) + 'px 0';
      el.style.rotate = (nx * ang).toFixed(2) + 'deg';
    });
    el.addEventListener('pointerleave', () => { el.style.translate = ''; el.style.rotate = ''; });
  });
  // --- 'Our practice' tile gallery (about) ----------------------------------
  const tiles = $$('[data-tile]'), imgs = $$('[data-tile-img]'), frame = $('[data-tile-frame]');
  if (tiles.length && imgs.length) {
    let cur = -1;
    const show = (i) => {
      if (i === cur) return;
      if (cur >= 0) { imgs[cur].classList.remove('tile-on'); tiles[cur].classList.remove('tile-on'); }
      cur = i;
      if (i >= 0) { imgs[i].classList.add('tile-on'); tiles[i].classList.add('tile-on'); }
      if (frame) frame.classList.toggle('tile-hide', i >= 0);
    };
    tiles.forEach((t, i) => {
      t.addEventListener('mouseenter', () => show(i));
      t.addEventListener('mouseleave', () => show(-1));
      t.addEventListener('focus', () => show(i));
      t.addEventListener('blur', () => show(-1));
      t.addEventListener('click', () => show(cur === i ? -1 : i));
    });
  }

  // --- about (mobile): practice slideshow -----------------------------------
  const mg = $('[data-mgal]');
  if (mg) {
    const track = $('.mgal__track', mg), prev = $('.mgal__prev', mg), next = $('.mgal__next', mg);
    const step = () => track.querySelector('.mgal__slide').offsetWidth + 24;
    const sync = () => { prev.hidden = track.scrollLeft < 10; next.hidden = track.scrollLeft > track.scrollWidth - track.clientWidth - 10; };
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    track.addEventListener('scroll', sync, { passive: true });
  }

  // --- clickable areas that Wix left without a link ---------------------------
  const PORTAL = 'https://kings-hill-dental.portal.dental';
  $$('main *').forEach((el) => {
    if (el.children.length || el.closest('a[href], form, .srch')) return;
    const t = el.textContent.trim();
    if (/^sign up now$/i.test(t)) {
      const btn = el.parentElement && el.parentElement.classList.contains('o') && el.parentElement.parentElement.classList.contains('o') ? el.parentElement : el;
      btn.style.cursor = 'pointer';
      btn.setAttribute('role', 'link'); btn.tabIndex = 0;
      const open = () => window.open(PORTAL, '_blank', 'noopener');
      btn.addEventListener('click', open);
      btn.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(); });
    }
  });
  // icon/label tiles whose only link is the title: the whole tile follows it
  $$('main .sec').forEach((sec) => {
    $$('*', sec).forEach((el) => {
      if (el.closest('a[href], button, [data-acc], .srch') || getComputedStyle(el).cursor !== 'pointer') return;
      let box = el.parentElement;
      for (let i = 0; i < 4 && box && box !== sec; i++, box = box.parentElement) {
        const links = $$('a[href]', box);
        if (links.length === 1) {
          const a = links[0];
          el.addEventListener('click', () => { if (a.target === '_blank') window.open(a.href, '_blank', 'noopener'); else location.href = a.href; });
          return;
        }
        if (links.length > 1) break;
      }
      const r = el.getBoundingClientRect();
      if (r.width < 20 || r.height < 20) return;
      let best = null, bd = 1e9;
      $$('a[href]', sec).forEach((a) => {
        const q = a.getBoundingClientRect();
        if (!q.width) return;
        const d = Math.hypot(q.x + q.width / 2 - (r.x + r.width / 2), q.y + q.height / 2 - (r.y + r.height / 2));
        if (d < bd) { bd = d; best = a; }
      });
      if (best && bd < 240) el.addEventListener('click', () => { if (best.target === '_blank') window.open(best.href, '_blank', 'noopener'); else location.href = best.href; });
    });
  });
  // about page tabs
  const TABS = { 'about us': 0, 'meet the team': '#team', 'our practice': '#mpzdnims' };
  $$('main .sec').slice(0, 1).forEach((sec) => {
    $$('*', sec).forEach((el) => {
      if (el.children.length) return;
      const k = el.textContent.trim().toLowerCase();
      if (!(k in TABS) || !/about/.test(location.pathname)) return;
      const host = el.closest('.o') || el;
      host.setAttribute('role', 'link'); host.tabIndex = 0; host.style.cursor = 'pointer';
      const go = () => { const tgt = TABS[k] === 0 ? document.querySelector('main .sec') : document.querySelector(TABS[k]); if (tgt) tgt.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
      host.addEventListener('click', go);
      host.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
    });
  });

  // --- forms ----------------------------------------------------------------
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const COUNTRIES = ['United Kingdom', 'Ireland', 'United States', 'Canada', 'Australia', 'New Zealand', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Poland', 'India', 'Pakistan', 'Other'];
  const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
  function overlaySelect(host, options, current) {
    const sel = document.createElement('select');
    sel.className = 'fsel';
    sel.innerHTML = '<option value="">' + (current || 'Select') + '</option>' + options.map((o) => '<option>' + o + '</option>').join('');
    host.appendChild(sel);
    return sel;
  }
  $$('.sec').forEach((sec) => {
    const submit = $$('button', sec).find((b) => /^submit$/i.test(b.textContent.trim()));
    if (!submit) return;
    const fields = $$('input, textarea', sec);
    let n = 0;
    const box = (i) => { const s = i.nextElementSibling; return s && s.tagName === 'DIV' && !s.children.length ? s : null; };
    // checkboxes: the drawn square and its text act as one control
    fields.filter((f) => f.type === 'checkbox').forEach((cb) => {
      cb.id = cb.id || 'cb-' + (++n) + '-' + Math.random().toString(36).slice(2, 6);
      const b = box(cb);
      if (b) { b.classList.add('cbx-box'); const lab = b.nextElementSibling; if (lab) { lab.classList.add('cbx-label'); lab.addEventListener('click', () => cb.click()); } }
      cb.setAttribute('aria-label', (b && b.nextElementSibling ? b.nextElementSibling.textContent.trim() : 'Option'));
    });
    // Wix-style dropdown buttons become real selects
    $$('button', sec).filter((b) => b !== submit && b.querySelector('svg')).forEach((b) => {
      const label = b.textContent.trim();
      const opts = /month/i.test(label) ? MONTHS : /gender/i.test(label) ? GENDERS : null;
      if (!opts) return;
      const sel = overlaySelect(b, opts, label);
      b.classList.add('fsel-host');
      const txt = b.querySelector('div,span');
      sel.addEventListener('change', () => { if (txt) txt.textContent = sel.value || label; });
      sel.name = label.toLowerCase();
    });
    // country row: the text input becomes a select
    $$('p, div, span', sec).filter((e) => !e.children.length && /^country\/region$/i.test(e.textContent.trim())).forEach((lab) => {
      const inp = fields.find((f) => f.type === 'text' && (lab.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING));
      if (!inp) return;
      const sel = document.createElement('select');
      sel.className = inp.className + ' fsel-country';
      sel.name = 'country';
      sel.setAttribute('aria-label', 'Country/Region');
      sel.innerHTML = '<option value="">&nbsp;</option>' + COUNTRIES.map((c) => '<option>' + c + '</option>').join('');
      inp.replaceWith(sel);
    });
    fields.filter((f) => f.isConnected && !f.name).forEach((f) => { f.name = (f.getAttribute('aria-label') || f.placeholder || f.type).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'field'; });
    // submit
    const label = $('span, div', submit) || submit;
    const idle = label.textContent;
    const collect = () => {
      const data = {};
      $$('input, textarea, select', sec).forEach((f) => {
        if (f.type === 'checkbox') { if (f.checked) (data[f.name] = data[f.name] || []).push(f.getAttribute('aria-label')); }
        else if (f.value.trim()) data[f.name] = f.value.trim();
      });
      return data;
    };
    const say = (t, state) => { label.textContent = t; submit.dataset.state = state || ''; if (state) setTimeout(() => { label.textContent = idle; submit.dataset.state = ''; }, 5000); };
    const go = async () => {
      const inputs = $$('input, textarea, select', sec).filter((f) => f.type !== 'checkbox');
      const bad = inputs.find((f) => f.required && !f.value.trim()) || inputs.find((f) => f.type === 'email' && f.value && !/^\S+@\S+\.\S+$/.test(f.value));
      if (bad) { bad.focus(); bad.classList.add('fld-bad'); say(bad.type === 'email' && bad.value ? 'Check email address' : 'Please fill in ' + (bad.getAttribute('aria-label') || 'this field').toLowerCase(), 'error'); return; }
      inputs.forEach((f) => f.classList.remove('fld-bad'));
      const data = collect();
      const ep = (document.querySelector('meta[name="form-endpoint"]') || {}).content;
      say('Sending…', 'busy');
      try {
        if (ep) {
          const r = await fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page: location.pathname, ...data }) });
          if (!r.ok) throw new Error('bad status');
        } else {
          const body = Object.entries(data).map(([k, v]) => k + ': ' + (Array.isArray(v) ? v.join(', ') : v)).join('\n');
          location.href = 'mailto:reception@kingshilldental.co.uk?subject=' + encodeURIComponent('Website enquiry: ' + document.title) + '&body=' + encodeURIComponent(body);
        }
        $$('input, textarea, select', sec).forEach((f) => { if (f.type === 'checkbox') f.checked = false; else f.value = ''; });
        $$('.fsel-host div, .fsel-host span', sec).forEach(() => {});
        say('Thank you!', 'ok');
      } catch (e) { say('Something went wrong', 'error'); }
    };
    submit.addEventListener('click', go);
    sec.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches('input:not([type=checkbox])')) { e.preventDefault(); go(); } });
  });

  // --- site search overlay ---------------------------------------------------
  const searchBtn = $('[data-search-btn]');
  if (searchBtn) {
    let ov, input, list, more, index = null, results = [], showAll = false;
    const titleCase = (s) => s.toLowerCase().replace(/(^|[\s(-])([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/&/g, '&');
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const build = () => {
      ov = document.createElement('div');
      ov.className = 'srch';
      ov.hidden = true;
      ov.innerHTML = '<div class="srch__panel" role="dialog" aria-modal="true" aria-label="Site search"><form class="srch__bar" role="search"><span class="srch__field"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M13 13l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg><input type="search" placeholder="Search" aria-label="Search" autocomplete="off"></span><button type="button" class="srch__close">Close</button></form><div class="srch__out" hidden><h2>Other Pages</h2><ul class="srch__list"></ul><button type="button" class="srch__more">Show All Results</button></div></div>';
      document.body.appendChild(ov);
      input = $('input', ov); list = $('.srch__list', ov); more = $('.srch__more', ov);
      const out = $('.srch__out', ov);
      const render = () => {
        const q = input.value.trim().toLowerCase();
        if (!index) return;
        const words = q.split(/\s+/).filter(Boolean);
        results = q ? index.map((p) => {
          const t = p.t.toLowerCase(), x = p.x.toLowerCase();
          let sc = 0;
          for (const w of words) { if (t.includes(w)) sc += 10; if (x.includes(w)) sc += 1; else if (!t.includes(w)) return null; }
          return { p, sc };
        }).filter(Boolean).sort((a, b) => b.sc - a.sc).map((r) => r.p) : [];
        out.hidden = !q;
        const shown = showAll ? results : results.slice(0, 3);
        list.innerHTML = shown.length ? shown.map((p) => {
          const i = p.x.toLowerCase().indexOf(words[0] || '');
          const st = i > 40 ? p.x.indexOf(' ', i - 30) + 1 : 0;
          const snip = p.x.slice(st, st + 120);
          return '<li><a href="' + p.u + '"><span class="srch__t">' + esc(titleCase(p.t)) + '</span><span class="srch__d">' + esc(snip) + '…</span></a></li>';
        }).join('') : '<li class="srch__none">No results found.</li>';
        more.hidden = showAll || results.length <= 3;
      };
      input.addEventListener('input', () => { showAll = false; render(); });
      more.addEventListener('click', () => { showAll = true; render(); });
      $('.srch__bar', ov).addEventListener('submit', (e) => { e.preventDefault(); showAll = true; render(); });
      $('.srch__close', ov).addEventListener('click', close);
      ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
    };
    const open = () => {
      if (!ov) build();
      ov.hidden = false;
      requestAnimationFrame(() => ov.classList.add('is-open'));
      document.body.classList.add('mm-lock');
      input.focus();
      if (!index) fetch('/assets/search.json').then((r) => r.json()).then((d) => { index = d; input.dispatchEvent(new Event('input')); }).catch(() => {});
    };
    const close = () => {
      ov.classList.remove('is-open');
      document.body.classList.remove('mm-lock');
      setTimeout(() => { ov.hidden = true; }, 250);
      searchBtn.focus();
    };
    searchBtn.addEventListener('click', open);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ov && !ov.hidden) close(); });
  }
})();
