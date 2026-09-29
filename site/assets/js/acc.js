(() => {
  const dataEl = document.getElementById('acc-data');
  const items = [...document.querySelectorAll('[data-acc]')];
  if (!dataEl || !items.length) return;
  const data = JSON.parse(dataEl.textContent);
  const sec = items[0].closest('.sec');
  const bleeds = [...sec.children].filter((c) => c.classList.contains('o'));
  const PLUS = items[0].querySelector('svg').outerHTML;
  const MINUS = '<svg viewBox="0 0 14 4" xmlns="http://www.w3.org/2000/svg"><rect width="14" height="4" rx="1"></rect></svg>';
  const ROW = 40;
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const state = items.map(() => ({ open: false, h: 0 }));
  let baseSec = null, baseBleed = [];

  items.forEach((it, i) => {
    const rows = data[i] || [];
    const panel = document.createElement('div');
    panel.className = 'acc-panel';
    panel.innerHTML = '<table><tbody>' + rows.map((r) => `<tr><td>${esc(r[0].trim())}</td><td>${esc(r[1] || '')}</td></tr>`).join('') + '</tbody></table>';
    it.appendChild(panel);
    state[i].panelH = rows.length * ROW + 15;
    it.setAttribute('role', 'button');
    it.setAttribute('tabindex', '0');
    it.setAttribute('aria-expanded', 'false');
    const toggle = () => { state[i].open = !state[i].open; render(true); };
    it.addEventListener('click', (e) => { if (e.target.closest('.acc-panel')) return; toggle(); });
    it.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });

  function render(animate) {
    const heads = items.map((it) => { it.style.height = ''; return parseFloat(getComputedStyle(it).height); });
    if (baseSec === null || !animate) {
      sec.style.height = ''; bleeds.forEach((b) => (b.style.height = ''));
      baseSec = sec.getBoundingClientRect().height;
      baseBleed = bleeds.map((b) => b.getBoundingClientRect().height);
    }
    let shift = 0;
    items.forEach((it, i) => {
      const s = state[i];
      it.style.transform = shift ? `translateY(${shift}px)` : '';
      it.style.height = heads[i] + (s.open ? s.panelH : 0) + 'px';
      it.setAttribute('aria-expanded', s.open);
      it.classList.toggle('is-open', s.open);
      const svg = it.querySelector(':scope > svg');
      if (svg) { const wrap = document.createElement('div'); wrap.innerHTML = s.open ? MINUS : PLUS; const n = wrap.firstChild; n.setAttribute('class', svg.getAttribute('class')); n.setAttribute('aria-hidden', 'true'); if (svg.outerHTML !== n.outerHTML) svg.replaceWith(n); }
      if (s.open) shift += s.panelH;
    });
    sec.style.height = baseSec + shift + 'px';
    bleeds.forEach((b, k) => (b.style.height = baseBleed[k] + shift + 'px'));
  }
  let rt;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { baseSec = null; render(false); }, 120); });
})();
