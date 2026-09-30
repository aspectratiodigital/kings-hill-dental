(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.replace('no-js', 'js');
  const raf = (fn) => requestAnimationFrame(fn);

  /* ---------- hero image: centred on the text+button block beside it ---------- */
  function placeHeroImage() {
    const text = $('.hero-old-text'), img = $('.hero-old-img'), sec = $('.hero-old');
    if (!text || !img || !sec) return;
    if (innerWidth < 900) { img.style.top = ''; return; }
    const tRect = text.getBoundingClientRect(), sRect = sec.getBoundingClientRect();
    const midY = tRect.top - sRect.top + tRect.height / 2;
    img.style.top = (midY - img.offsetHeight / 2) + 'px';
  }
  addEventListener('resize', placeHeroImage);
  addEventListener('load', placeHeroImage);
  placeHeroImage();
  document.fonts && document.fonts.ready.then(placeHeroImage).catch(() => {});

  /* ---------- opening hours + live status ---------- */
  const HOURS = [null, ['09:30', '17:30'], ['09:30', '18:30'], ['09:30', '18:30'], ['09:30', '18:30'], ['09:30', '14:30'], 'appt']; // Sun..Sat by index; Sun = 0
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const fmt = (t) => t;
  function status() {
    const uk = new Date(new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }));
    const d = uk.getDay(), mins = uk.getHours() * 60 + uk.getMinutes(), h = HOURS[d];
    if (Array.isArray(h) && mins >= toMin(h[0]) && mins < toMin(h[1])) return { open: true, text: 'Open now', sub: 'Until ' + h[1] + ' today' };
    for (let i = 0; i < 8; i++) {
      const day = (d + i) % 7, hh = HOURS[day];
      if (Array.isArray(hh) && (i > 0 || mins < toMin(hh[0]))) return { open: false, text: 'Closed now', sub: 'Opens ' + (i === 0 ? 'today' : i === 1 ? 'tomorrow' : DAY_NAMES[day]) + ' at ' + hh[0] };
    }
    return { open: false, text: 'Closed now', sub: 'Opens Monday at 09:30' };
  }
  const st = status();
  $$('[data-status]').forEach((el) => {
    el.querySelector('.status-dot')?.classList.toggle('is-closed', !st.open);
    const t = el.querySelector('[data-status-text]'); if (t) t.textContent = st.text;
    const s = el.querySelector('[data-status-sub]'); if (s) s.textContent = st.sub;
  });
  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/London' })).getDay();
  $$('[data-day]').forEach((r) => r.classList.toggle('today', +r.dataset.day === today));

  /* ---------- header, progress, back to top ---------- */
  const pars = $$('[data-parallax]');
  const header = $('.site-header'), bar = $('.progress'), toTop = $('.to-top');
  let lastY = scrollY, ticking = false;
  function onScroll() {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (header) {
      header.classList.toggle('is-stuck', y > 24);
      const open = document.body.classList.contains('menu-open');
      header.classList.remove('is-hidden');
    }
    if (toTop) toTop.classList.toggle('is-shown', y > 900);
    lastY = y; ticking = false;
    parallax(); timeline(); serviceFocus();
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; raf(onScroll); } }, { passive: true });
  toTop?.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* ---------- drawer + mega menus ---------- */
  const menuBtn = $('.menu-btn');
  const setMenu = (open) => { document.body.classList.toggle('menu-open', open); menuBtn?.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : ''; };
  menuBtn?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('.drawer a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  $$('.has-menu').forEach((li) => {
    const btn = $('.nav-link', li);
    btn.addEventListener('click', (e) => { if (btn.tagName === 'BUTTON') { const o = li.classList.toggle('is-open'); btn.setAttribute('aria-expanded', o); e.stopPropagation(); } });
    let t;
    li.addEventListener('mouseenter', () => { clearTimeout(t); btn.setAttribute('aria-expanded', 'true'); });
    li.addEventListener('mouseleave', () => { t = setTimeout(() => { li.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 120); });
  });
  document.addEventListener('click', () => $$('.has-menu.is-open').forEach((l) => { l.classList.remove('is-open'); $('.nav-link', l).setAttribute('aria-expanded', 'false'); }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setMenu(false); $$('.has-menu.is-open').forEach((l) => l.classList.remove('is-open')); } });

  /* ---------- mega menu: hovering a category extends this same box to reveal its items.
     The second layer's height always matches the active category's own item count (never the
     category list's height, and never padded out to fit the largest of the other categories). */
  $$('[data-mega-extend]').forEach((root) => {
    const inner = $('.mega-inner', root), subsEl = $('.mega-subs', root);
    const cats = $$('.mega-cat-link', root), subs = $$('.mega-sub', root);
    const on = (i) => {
      cats.forEach((c, j) => c.classList.toggle('is-on', j === i));
      subs.forEach((s, j) => s.classList.toggle('is-on', j === i));
      subsEl.style.height = subs[i].scrollHeight + 'px';
      subsEl.style.width = subs[i].scrollWidth + 'px';
      inner.classList.add('is-extended');
    };
    const off = () => { inner.classList.remove('is-extended'); subsEl.style.height = ''; subsEl.style.width = ''; cats.forEach((c) => c.classList.remove('is-on')); };
    cats.forEach((c, i) => { c.addEventListener('mouseenter', () => on(i)); c.addEventListener('focus', () => on(i)); });
    root.addEventListener('mouseleave', off);
    inner.addEventListener('focusout', (e) => { if (!inner.contains(e.relatedTarget)) off(); });
  });

  /* ---------- text split + reveals ---------- */
  $$('[data-split]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map((w, i) => '<span class="line" aria-hidden="true"><span style="--d:' + i + '">' + w + '</span></span>').join(' ');
  });
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  $$('[data-split], [data-reveal], .ticks, .checklist').forEach((el) => io.observe(el));
  $$('.clip-in').forEach((el) => { const host = el.parentElement; const o = new IntersectionObserver((en) => { if (en[0].isIntersecting) { el.classList.add('is-in'); o.disconnect(); } }, { threshold: 0.1 }); o.observe(host); });
  if (reduce) $$('[data-split], [data-reveal], .clip-in, .ticks, .checklist').forEach((el) => el.classList.add('is-in'));

  /* ---------- parallax ---------- */
  function parallax() {
    if (reduce) return;
    const vh = innerHeight;
    pars.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = 'translate3d(0,' + (p * -(+el.dataset.parallax || 40)).toFixed(1) + 'px,0)';
    });
  }

  /* ---------- services focus ---------- */
  const svcs = $$('.svc');
  function serviceFocus() {
    return; // lines/icons now react to hover only
    if (!svcs.length || innerWidth < 960) return;
    const mid = innerHeight * 0.5; let best = null, bd = 1e9;
    svcs.forEach((s) => { const r = s.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - mid); if (d < bd) { bd = d; best = s; } });
    svcs.forEach((s) => s.classList.toggle('is-active', s === best && bd < innerHeight * 0.32));
  }

  /* ---------- marquee ---------- */
  $$('.marquee-track').forEach((t) => { t.innerHTML += t.innerHTML; $$('.plogo', t).forEach((im, i, a) => { if (i >= a.length / 2) { im.removeAttribute('role'); im.removeAttribute('aria-label'); im.setAttribute('aria-hidden', 'true'); } }); });

  /* ---------- accordions ---------- */
  function openAcc(d, on) {
    const panel = $('.panel', d);
    if (on) { d.open = true; raf(() => raf(() => d.classList.add('is-open'))); }
    else { d.classList.remove('is-open'); const done = () => { if (!d.classList.contains('is-open')) d.open = false; }; panel ? panel.addEventListener('transitionend', done, { once: true }) : done(); setTimeout(done, 700); }
  }
  $$('.acc').forEach((acc) => {
    const single = acc.hasAttribute('data-single');
    $$('details', acc).forEach((d) => {
      if (d.open) d.classList.add('is-open');
      $('summary', d).addEventListener('click', (e) => {
        e.preventDefault();
        const on = !d.classList.contains('is-open');
        if (on && single) $$('details.is-open', acc).forEach((o) => o !== d && openAcc(o, false));
        openAcc(d, on);
      });
    });
  });
  window.__openAcc = openAcc;

  /* ---------- fee search ---------- */
  const fs = $('#fee-search');
  if (fs) {
    const rows = $$('.price-table tr'), groups = $$('.acc details'), none = $('#fee-none');
    const orig = new Map(rows.map((r) => [r, r.firstElementChild.textContent]));
    const run = () => {
      const q = fs.value.trim().toLowerCase(); let any = false;
      groups.forEach((g) => {
        let hit = 0;
        $$('tr', g).forEach((r) => {
          const t = orig.get(r), m = !q || t.toLowerCase().includes(q);
          r.hidden = !m; r.firstElementChild.innerHTML = m && q ? t.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark class="hl">$1</mark>') : t;
          if (m) hit++;
        });
        g.hidden = !hit; if (hit) any = true;
        if (q && hit && !g.classList.contains('is-open')) openAcc(g, true);
        if (!q && g.classList.contains('is-open') && g.dataset.keep !== '1') openAcc(g, false);
      });
      if (none) none.hidden = any;
    };
    fs.addEventListener('input', run);
  }

  /* ---------- carousels (scroll-snap) ---------- */
  $$('[data-carousel]').forEach((c) => {
    const track = $('.track', c), prev = $('[data-prev]', c), next = $('[data-next]', c), prog = $('.car-bar i', c);
    const step = () => (track.firstElementChild?.getBoundingClientRect().width || 300) + parseFloat(getComputedStyle(track).columnGap || 20);
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (prev) prev.disabled = track.scrollLeft < 8; if (next) next.disabled = track.scrollLeft > max - 8;
      if (prog) prog.style.transform = 'scaleX(' + Math.max(.08, Math.min(1, (track.scrollLeft + track.clientWidth) / track.scrollWidth)) + ')';
    };
    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', () => raf(sync), { passive: true }); addEventListener('resize', sync); sync();
    let down = false, sx = 0, sl = 0, moved = 0;
    track.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; sx = e.clientX; sl = track.scrollLeft; });
    addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx)); if (moved > 6) { track.classList.add('is-drag'); track.scrollLeft = sl - dx; } });
    addEventListener('pointerup', () => { if (!down) return; down = false; setTimeout(() => track.classList.remove('is-drag'), 0); });
    track.addEventListener('click', (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
    const every = +c.dataset.auto;
    if (every && !reduce) {
      let timer, paused = false;
      const tick = () => {
        if (paused || document.hidden) return;
        const max = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft > max - 8) track.scrollTo({ left: 0, behavior: 'smooth' });
        else track.scrollBy({ left: step(), behavior: 'smooth' });
      };
      const start = () => { clearInterval(timer); timer = setInterval(tick, every); };
      c.addEventListener('mouseenter', () => { paused = true; });
      c.addEventListener('mouseleave', () => { paused = false; start(); });
      c.addEventListener('focusin', () => { paused = true; });
      c.addEventListener('focusout', () => { paused = false; });
      [prev, next].forEach((b) => b?.addEventListener('click', start));
      new IntersectionObserver((en) => { paused = !en[0].isIntersecting; }, { threshold: 0.2 }).observe(c);
      start();
    }
  });

  /* ---------- pinned horizontal scroll (testimonials) ---------- */
  $$('[data-hscroll]').forEach((sec) => {
    const stick = $('.tt-stick', sec), track = $('[data-hs-track]', sec);
    if (!stick || !track || reduce) return;
    let travel = 0, ticking = false;
    const measure = () => {
      sec.classList.remove('hs-on'); track.style.transform = '';
      travel = Math.max(0, track.scrollWidth - track.clientWidth);
      if (!travel) return;
      sec.classList.add('hs-on');
      sec.style.height = (stick.offsetHeight + travel) + 'px';
      update();
    };
    const update = () => {
      ticking = false;
      if (!sec.classList.contains('hs-on')) return;
      const r = sec.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -r.top / (sec.offsetHeight - innerHeight)));
      track.style.transform = 'translate3d(' + (-p * travel).toFixed(1) + 'px,0,0)';
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; raf(update); } }, { passive: true });
    addEventListener('resize', measure);
    addEventListener('load', measure);
    measure();
  });

  /* ---------- testimonials ---------- */
  const qs = $('[data-quotes]');
  if (qs) {
    const tr = $('.q-track', qs), n = tr.children.length, dots = $('.q-dots', qs);
    let i = 0, timer;
    dots.innerHTML = Array.from({ length: n }, (_, k) => '<button type="button" aria-label="Show review ' + (k + 1) + '"></button>').join('');
    const go = (k) => { i = (k + n) % n; tr.style.transform = 'translateX(' + (-100 * i) + '%)'; $$('button', dots).forEach((b, j) => b.setAttribute('aria-current', j === i)); $$('.q', tr).forEach((q, j) => q.setAttribute('aria-hidden', j !== i)); };
    const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(i + 1), 9000); };
    $('[data-qprev]', qs).addEventListener('click', () => { go(i - 1); auto(); });
    $('[data-qnext]', qs).addEventListener('click', () => { go(i + 1); auto(); });
    $$('button', dots).forEach((b, k) => b.addEventListener('click', () => { go(k); auto(); }));
    qs.addEventListener('mouseenter', () => clearInterval(timer)); qs.addEventListener('mouseleave', auto);
    let sx = null; qs.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    qs.addEventListener('touchend', (e) => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) { go(i + (dx < 0 ? 1 : -1)); auto(); } sx = null; });
    go(0); auto();
  }

  /* ---------- plan toggle ---------- */
  const seg = $('.seg');
  if (seg) {
    const tabs = $$('button', seg), bodies = $$('[data-plan]'), imgs = $$('.plan-photo img');
    const set = (k) => { seg.dataset.active = k; tabs.forEach((t, j) => t.setAttribute('aria-selected', j === k)); bodies.forEach((b, j) => (b.hidden = j !== k)); imgs.forEach((im, j) => im.classList.toggle('on', j === k)); };
    tabs.forEach((t, k) => t.addEventListener('click', () => set(k))); set(0);
    $$('.ages').forEach((g) => {
      const price = g.closest('[data-plan]').querySelector('.price b');
      $$('button', g).forEach((b) => b.addEventListener('click', () => { $$('button', g).forEach((x) => x.setAttribute('aria-pressed', x === b)); price.textContent = b.dataset.price; }));
    });
  }

  /* ---------- team dialog ---------- */
  $$('[data-person]').forEach((b) => b.addEventListener('click', () => { $('#' + b.dataset.open)?.showModal(); }));
  $$('dialog').forEach((d) => d.addEventListener('click', (e) => { if (e.target.classList.contains('modal') || e.target.closest('.modal-x')) d.close(); }));

  /* ---------- practice mosaic ---------- */
  const mos = $('[data-mosaic]');
  if (mos) {
    const cells = $$('.mo', mos), cap = $('[data-mcap]');
    // [col start, col span, row start, row span] for each tile in the 4x3 layout
    const pos = [[1, 2, 1, 1], [3, 1, 1, 1], [4, 1, 1, 1], [1, 1, 2, 1], [2, 2, 2, 1], [4, 1, 2, 1], [1, 1, 3, 1], [2, 1, 3, 1], [3, 2, 3, 1]];
    const setTracks = (k) => {
      if (k == null) { mos.style.setProperty('--cols', '1fr 1fr 1fr 1fr'); mos.style.setProperty('--rows', '1fr 1fr 1fr'); return; }
      const [c, cs, r, rs] = pos[k];
      const cols = [1, 2, 3, 4].map((n) => (n >= c && n < c + cs ? 1.55 : 0.82) + 'fr').join(' ');
      const rows = [1, 2, 3].map((n) => (n >= r && n < r + rs ? 1.4 : 0.86) + 'fr').join(' ');
      mos.style.setProperty('--cols', cols); mos.style.setProperty('--rows', rows);
    };
    const activate = (k) => { cells.forEach((c, j) => c.classList.toggle('is-on', j === k)); mos.classList.toggle('has-on', k != null); setTracks(k); if (k != null) cap.textContent = cells[k].getAttribute('aria-label'); };
    cells.forEach((c, k) => {
      c.addEventListener('mouseenter', () => activate(k)); c.addEventListener('focus', () => activate(k));
      c.addEventListener('click', () => activate(k));
    });
    mos.addEventListener('mouseleave', () => activate(null));
    setTracks(null);
    const tabs = $$('[data-mode]');
    tabs.forEach((t) => t.addEventListener('click', () => {
      tabs.forEach((x) => x.setAttribute('aria-selected', x === t));
      const tour = $('.tour', mos.parentElement); const tf = $('iframe', tour);
      const is360 = t.dataset.mode === 'tour';
      mos.hidden = is360; tour.hidden = !is360; if (is360 && !tf.src) tf.src = tf.dataset.src;
    }));
  }

  /* ---------- team option A / treatment list: spotlight roster ---------- */
  $$('[data-tA]').forEach((root) => {
    const items = $$('.tA-item', root), figs = $$('.tA-fig', root);
    const on = (i) => { items.forEach((b, j) => b.classList.toggle('is-on', j === i)); figs.forEach((f, j) => f.classList.toggle('is-on', j === i)); };
    items.forEach((b, i) => { b.addEventListener('mouseenter', () => on(i)); b.addEventListener('focus', () => on(i)); });
  });

  /* ---------- cosmetic: segmented treatment tabs ---------- */
  $$('[data-cx]').forEach((root) => {
    const track = $('.cx-tabs', root), tabs = $$('.cx-tabs button', root), imgs = $$('.cx-media img', root), bodies = $$('[data-cx-body]', root);
    const set = (i) => {
      tabs.forEach((t, j) => t.setAttribute('aria-selected', j === i));
      imgs.forEach((im, j) => im.classList.toggle('on', j === i));
      bodies.forEach((b, j) => (b.hidden = j !== i));
      track.style.setProperty('--w', tabs[i].offsetWidth + 'px');
      track.style.setProperty('--x', tabs[i].offsetLeft + 'px');
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => set(i)));
    set(0);
  });

  /* ---------- dentistry hub: hover-driven sliding pill (plain nav links, not a content switcher) ---------- */
  $$('[data-hover-tabs]').forEach((track) => {
    const links = $$('a', track);
    links.forEach((a) => {
      a.addEventListener('mouseenter', () => {
        track.style.setProperty('--w', a.offsetWidth + 'px');
        track.style.setProperty('--x', a.offsetLeft + 'px');
      });
      a.addEventListener('focus', () => {
        track.style.setProperty('--w', a.offsetWidth + 'px');
        track.style.setProperty('--x', a.offsetLeft + 'px');
      });
    });
  });

  /* ---------- general & preventative: image accordion (touch fallback — hover does the rest) ---------- */
  $$('[data-accordion]').forEach((root) => {
    $$('.gp-tile', root).forEach((tile) => {
      tile.addEventListener('click', (e) => {
        if (!matchMedia('(hover: none)').matches || tile.classList.contains('is-on')) return;
        e.preventDefault();
        $$('.gp-tile', root).forEach((t) => t.classList.remove('is-on'));
        tile.classList.add('is-on');
      });
    });
  });

  /* ---------- logo: replay the "lines slide in" animation on hover/focus ---------- */
  if (!reduce) {
    $$('.brand').forEach((b) => {
      const lines = $$('.logo-line, .logo-line-r', b);
      const replay = () => lines.forEach((l) => { l.style.animation = 'none'; void l.getBBox(); l.style.animation = ''; });
      b.addEventListener('mouseenter', replay);
      b.addEventListener('focus', replay);
    });
  }

  /* ---------- about: letter tilts gently toward the cursor ---------- */
  if (!reduce && matchMedia('(hover: hover)').matches) {
    $$('.ai-letter-copy').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1200px) rotateX(${(py * -6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- deep-link into a treatment field page: open the matching accordion / tab / list item ---------- */
  (() => {
    const jump = () => {
      const id = location.hash.slice(1); if (!id) return;
      const el = document.getElementById(id); if (!el) return;
      if (el.tagName === 'DETAILS') el.open = true;
      if (el.tagName === 'BUTTON') { el.focus({ preventScroll: true }); el.dispatchEvent(new Event('focus')); el.click(); }
      requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
    };
    window.addEventListener('hashchange', jump);
    jump();
  })();

  /* ---------- team option C: filter ---------- */
  $$('.tC-bar').forEach((bar) => {
    const list = bar.nextElementSibling, items = $$('.tC-item', list);
    $$('[data-tc]', bar).forEach((b) => b.addEventListener('click', () => {
      $$('[data-tc]', bar).forEach((x) => x.setAttribute('aria-pressed', x === b));
      const g = b.dataset.tc;
      items.forEach((it, i) => {
        const show = g === 'all' || it.dataset.g === g;
        if (show) { it.hidden = false; it.classList.remove('is-out'); it.style.setProperty('--d', i % 4); it.classList.add('is-in'); setTimeout(() => it.classList.remove('is-in'), 700); }
        else { it.classList.add('is-out'); setTimeout(() => { if (it.classList.contains('is-out')) it.hidden = true; }, 320); }
      });
    }));
  });

  /* ---------- team option D: tap to flip on touch ---------- */
  $$('.tD-card').forEach((c) => c.addEventListener('click', (e) => { if (e.target.closest('button')) return; c.classList.toggle('is-flipped'); }));

  /* ---------- header link to the page you are on: scroll to top ---------- */
  $$('.site-header a[href], .drawer a[href]').forEach((a) => a.addEventListener('click', (e) => {
    const u = new URL(a.href, location.href);
    if (u.pathname === location.pathname && !u.hash && u.origin === location.origin) { e.preventDefault(); scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }
  }));

  /* ---------- timeline progress ---------- */
  const tl = $('.timeline');
  function timeline() {
    if (!tl) return;
    const r = tl.getBoundingClientRect(), mid = innerHeight * 0.6;
    const prog = $('.prog', tl); const h = Math.max(0, Math.min(r.height - 24, mid - r.top - 12));
    prog.style.height = h + 'px';
    $$('li', tl).forEach((li) => li.classList.toggle('is-on', li.getBoundingClientRect().top < mid));
  }

  /* ---------- forms ---------- */
  const EMAIL = /^\S+@\S+\.\S+$/;
  function validate(form) {
    let bad = null;
    $$('.field', form).forEach((f) => {
      const i = $('input, textarea, select', f); if (!i) return;
      let msg = '';
      if (i.required && !i.value.trim()) msg = 'Please fill this in.';
      else if (i.type === 'email' && i.value && !EMAIL.test(i.value)) msg = 'That email address doesn’t look right.';
      else if (i.type === 'tel' && i.value && i.value.replace(/\D/g, '').length < 10) msg = 'Please enter a full phone number.';
      f.classList.toggle('is-bad', !!msg); const e = $('.err', f); if (e) e.textContent = msg;
      if (msg && !bad) bad = i;
    });
    if (bad) bad.focus();
    return !bad;
  }
  function payload(form) {
    const o = {};
    $$('input, textarea, select', form).forEach((i) => {
      if (!i.name) return;
      if (i.type === 'checkbox' || i.type === 'radio') { if (i.checked) o[i.name] = (o[i.name] ? o[i.name] + ', ' : '') + (i.value === 'on' ? 'Yes' : i.value); }
      else if (i.value.trim()) o[i.name] = i.value.trim();
    });
    return o;
  }
  async function send(form, data, subject) {
    const ep = $('meta[name="form-endpoint"]')?.content;
    if (ep) { const r = await fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); if (!r.ok) throw new Error('failed'); return; }
    const body = Object.entries(data).map(([k, v]) => k.replace(/_/g, ' ') + ': ' + v).join('\n');
    location.href = 'mailto:reception@kingshilldental.co.uk?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }
  $$('select').forEach((s) => { const f = () => s.classList.toggle('has-value', !!s.value); s.addEventListener('change', f); f(); });
  $$('.field input, .field textarea').forEach((i) => i.addEventListener('input', () => i.closest('.field').classList.remove('is-bad')));
  $$('form[data-form]').forEach((form) => {
    const done = $('#' + form.dataset.done), btn = $('[type=submit]', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate(form)) return;
      const label = btn.textContent; btn.disabled = true; btn.textContent = 'Sending…';
      try {
        await send(form, payload(form), form.dataset.subject || 'Website enquiry');
        form.classList.add('is-sent'); done.classList.add('is-shown'); done.setAttribute('tabindex', '-1'); done.focus();
      } catch (err) { btn.textContent = 'Something went wrong. Try again'; setTimeout(() => (btn.textContent = label), 3500); }
      btn.disabled = false; if (!form.classList.contains('is-sent')) btn.textContent = btn.textContent === 'Sending…' ? label : btn.textContent;
    });
  });
  const about = new URLSearchParams(location.search).get('about');
  if (about) { const t = $('#topic'); if (t) { const opt = Array.from(t.options).find((o) => o.value.toLowerCase() === about.toLowerCase()); if (opt) { t.value = opt.value; t.classList.add('has-value'); } } }

  // multi-step referral form
  const ms = $('[data-steps]');
  if (ms) {
    const steps = $$('.step', ms), bars = $$('.steps i', ms.parentElement);
    let k = 0;
    const show = (n, scroll) => { k = n; steps.forEach((s, j) => s.classList.toggle('is-active', j === k)); bars.forEach((b, j) => b.classList.toggle('done', j <= k)); if (k === steps.length - 1) review(); if (scroll) ms.parentElement.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' }); };
    const review = () => {
      const d = payload(ms); const dl = $('.summary', ms);
      dl.innerHTML = Object.entries(d).map(([a, b]) => '<div><dt>' + a.replace(/_/g, ' ') + '</dt><dd>' + b.replace(/</g, '&lt;') + '</dd></div>').join('') || '<div>Nothing entered yet.</div>';
    };
    $$('[data-next]', ms).forEach((b) => b.addEventListener('click', () => { const s = steps[k]; let ok = true; $$('.field', s).forEach((f) => { const i = $('input,textarea,select', f); if (i && i.required && !i.value.trim()) { f.classList.add('is-bad'); $('.err', f).textContent = 'Please fill this in.'; ok = false; } }); if (k === 0 && !$('input[name=treatments]:checked', ms)) { $('#tx-err').hidden = false; ok = false; } else if (k === 0) $('#tx-err').hidden = true; if (ok) show(k + 1, true); }));
    $$('[data-back]', ms).forEach((b) => b.addEventListener('click', () => show(k - 1, true)));
    show(0);
  }

  onScroll();
  addEventListener('resize', () => { parallax(); });
  $$('.year').forEach((y) => (y.textContent = new Date().getFullYear()));
})();
