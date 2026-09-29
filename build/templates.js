const { site, nav } = require("./data/site");

// ---------------------------------------------------------------------------
// small helpers
// ---------------------------------------------------------------------------

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const para = (arr = []) => arr.map((p) => `<p>${p}</p>`).join("\n");

// ---------------------------------------------------------------------------
// icon set — single-weight line icons, consistent stroke, matches brand
// ---------------------------------------------------------------------------

const icons = {
  tooth: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 8c-3.2-3-8.5-3.6-12-1-3.8 2.8-4.8 8-3.6 13.4.9 4.1 2.9 8.8 4.3 13.7.8 2.9 1.6 6.4 4.3 6.7 3 .3 3.4-3.6 4-6.6.6-3 1.4-6.6 2.9-6.6s2.3 3.6 2.9 6.6c.6 3 1 6.9 4 6.6 2.7-.3 3.5-3.8 4.3-6.7 1.4-4.9 3.4-9.6 4.3-13.7C40.8 15.4 39.8 10.2 36 7.4c-3.5-2.6-8.8-2-12 1Z"/></svg>`,
  crown: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 20 15 27l9-13 9 13 7-7 2 18H6l2-18Z"/><path d="M6 38h36"/></svg>`,
  sparkle: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6c1 7 3 12 6 15 3 3 8 5 15 6-7 1-12 3-15 6-3 3-5 8-6 15-1-7-3-12-6-15-3-3-8-5-15-6 7-1 12-3 15-6 3-3 5-8 6-15Z"/></svg>`,
  align: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 29c0-10.5 6.3-19 14-19s14 8.5 14 19"/><path d="M13 29h22"/><path d="M15.5 29v5M20.5 29v5M25.5 29v5M30.5 29v5"/></svg>`,
  leaf: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 36C8 24 14 10 32 8c2 18-8 26-20 28Z"/><path d="M12 36c4-8 10-15 20-24"/></svg>`,
  droplet: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6c8 10 14 18.5 14 25.5A14 14 0 0 1 10 31.5C10 24.5 16 16 24 6Z"/></svg>`,
  shield: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6l16 6v11c0 10-6.5 17.5-16 19-9.5-1.5-16-9-16-19V12l16-6Z"/><path d="M17 24l5 5 10-11"/></svg>`,
  chat: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12h32v20H21l-8 7v-7H8V12Z"/></svg>`,
  pin: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 44s14-13.8 14-24a14 14 0 1 0-28 0c0 10.2 14 24 14 24Z"/><circle cx="24" cy="20" r="5"/></svg>`,
  phone: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8h7l3 9-5 3c2 5 5 8 10 10l3-5 9 3v7c0 2-2 4-4 4C20 39 9 28 9 12c0-2 2-4 4-4Z"/></svg>`,
  mail: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="10" width="36" height="28" rx="3"/><path d="M8 13l16 13 16-13"/></svg>`,
  clock: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="17"/><path d="M24 14v10l7 5"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  quote: `<svg viewBox="0 0 48 36" fill="currentColor"><path d="M0 36V21.6C0 8.6 7.4 1 18.8 0l1.6 5.6C13 7 9.4 11 9 17.6h9.8V36H0Zm27.2 0V21.6C27.2 8.6 34.6 1 46 0l1.6 5.6c-7.4 1.4-11 5.4-11.4 12h9.8V36H27.2Z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.2h-3V7.7c0-.9.3-1.6 1.7-1.6h1.8V3.2C16.8 3.1 15.7 3 14.5 3c-2.6 0-4.4 1.6-4.4 4.5v2.3H7.4v3.2H10v8h3.5Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 16.3a7.3 7.3 0 0 1-3.7-1l-.3-.2-2.7.7.7-2.6-.2-.3A7.3 7.3 0 1 1 12 19.3Zm4-5.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.1-.2.1-.4 0-.2-.1-.9-.3-1.7-1-.6-.6-1-1.3-1.2-1.5-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.4-.5-.4h-.5c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1l-.4-.2Z"/></svg>`,
};

const icon = (name, cls = "") => `<span class="icon${cls ? " " + cls : ""}" aria-hidden="true">${icons[name] || ""}</span>`;

// ---------------------------------------------------------------------------
// nav / header / footer
// ---------------------------------------------------------------------------

function navItemHtml(item, path) {
  const active = path === item.href || path.startsWith(item.href + "");
  const hasChildren = item.children && item.children.length;
  const isNested = hasChildren && item.children.some((c) => c.children && c.children.length);
  return `
  <li class="nav-item${hasChildren ? " has-children" : ""}">
    <a href="${item.href}" class="nav-link${active ? " is-active" : ""}">${item.label}</a>
    ${
      hasChildren
        ? `<button class="nav-caret" aria-label="Show ${esc(item.label)} menu">${icon("arrow")}</button>
    <div class="nav-panel${isNested ? " nav-panel-columns" : ""}">
      <ul class="nav-panel-list">
        ${item.children
          .map(
            (c) => `<li class="nav-panel-item">
              <a href="${c.href}" class="nav-panel-link">${c.label}</a>
              ${
                c.children
                  ? `<ul class="nav-subpanel-list">${c.children
                      .map((g) => `<li><a href="${g.href}">${g.label}</a></li>`)
                      .join("")}</ul>`
                  : ""
              }
            </li>`
          )
          .join("")}
      </ul>
    </div>`
        : ""
    }
  </li>`;
}

function header(path) {
  return `
  <header class="site-header" data-header>
    <div class="container header-inner">
      <a href="/" class="logo" aria-label="${site.name} — home">
        <span class="logo-word">Kings Hill</span>
        <span class="logo-sub"><em>Dental</em><i>Dentistry &amp; Aesthetics</i></span>
      </a>

      <nav class="site-nav" aria-label="Primary">
        <ul class="nav-list">
          ${nav.map((item) => navItemHtml(item, path)).join("")}
        </ul>
      </nav>

      <div class="header-actions">
        <a href="${site.phoneHref}" class="header-phone">${icon("phone")}<span>${site.phone}</span></a>
        <a href="${site.bookingUrl}" class="btn btn-primary btn-small" target="_blank" rel="noopener">Book Consultation</a>
        <button class="menu-toggle" data-menu-toggle aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-nav" data-mobile-nav>
    <ul class="mobile-nav-list">
      ${nav
        .map(
          (item) => `
        <li class="mobile-nav-item${item.children ? " has-children" : ""}">
          <div class="mobile-nav-row">
            <a href="${item.href}">${item.label}</a>
            ${item.children ? `<button class="mobile-caret" aria-label="Expand ${esc(item.label)}">${icon("arrow")}</button>` : ""}
          </div>
          ${
            item.children
              ? `<ul class="mobile-sub-list">${item.children
                  .map(
                    (c) => `<li>
                      <a href="${c.href}">${c.label}</a>
                      ${
                        c.children
                          ? `<ul class="mobile-subsub-list">${c.children
                              .map((g) => `<li><a href="${g.href}">${g.label}</a></li>`)
                              .join("")}</ul>`
                          : ""
                      }
                    </li>`
                  )
                  .join("")}</ul>`
              : ""
          }
        </li>`
        )
        .join("")}
    </ul>
    <div class="mobile-nav-footer">
      <a href="${site.bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">Book Consultation</a>
      <a href="${site.phoneHref}" class="mobile-phone">${icon("phone")} ${site.phone}</a>
    </div>
  </div>`;
}

function footer() {
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo logo-footer">
          <span class="logo-word">Kings Hill</span>
          <span class="logo-sub"><em>Dental</em><i>Dentistry &amp; Aesthetics</i></span>
        </a>
        <p>Dentistry built on trust, relationships and long-term health. Treatments can come afterwards.</p>
        <div class="footer-social">
          <a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook")}</a>
          <a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
          <a href="${site.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("whatsapp")}</a>
        </div>
      </div>

      <div class="footer-col">
        <h3>Explore</h3>
        <ul>
          <li><a href="/about/">About</a></li>
          <li><a href="/dentistry/">Dentistry</a></li>
          <li><a href="/aesthetics/">Aesthetics</a></li>
          <li><a href="/fees/">Fees</a></li>
          <li><a href="/referrals/">Referrals</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3>Contact us</h3>
        <ul class="footer-contact">
          <li><a href="${site.address.mapUrl}" target="_blank" rel="noopener">${icon("pin")}<span>${site.address.line1}, ${site.address.line2}, ${site.address.line3}, ${site.address.line4}, ${site.address.postcode}</span></a></li>
          <li><a href="mailto:${site.email}">${icon("mail")}<span>${site.email}</span></a></li>
          <li><a href="${site.phoneHref}">${icon("phone")}<span>${site.phone}</span></a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3>Opening hours</h3>
        <ul class="footer-hours">
          ${site.hours.map(([d, h]) => `<li><span>${d}</span><span>${h}</span></li>`).join("")}
        </ul>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>&copy; ${new Date().getFullYear()} Kings Hill Dental. All rights reserved.</p>
    </div>
  </footer>`;
}

// ---------------------------------------------------------------------------
// page shell
// ---------------------------------------------------------------------------

function layout({ title, description, path, body, bodyClass = "" }) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | Kings Hill Dental</title>
<meta name="description" content="${esc(description)}">
<link rel="icon" href="data:,">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// shared blocks
// ---------------------------------------------------------------------------

function pageHero({ eyebrow, title, lead, breadcrumbs = [] }) {
  return `
  <section class="page-hero reveal">
    <div class="container">
      ${
        breadcrumbs.length
          ? `<nav class="breadcrumbs" aria-label="Breadcrumb">${breadcrumbs
              .map((b, i) =>
                i === breadcrumbs.length - 1
                  ? `<span>${b.label}</span>`
                  : `<a href="${b.href}">${b.label}</a><span class="crumb-sep">/</span>`
              )
              .join("")}</nav>`
          : ""
      }
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
    </div>
  </section>`;
}

function ctaBand({ heading = "Not sure where to start?", body = "Book a consultation with our team and we'll help you find the right treatment for you — no pressure, just honest advice.", primary = { label: "Book Consultation", href: site.bookingUrl, external: true }, secondary } = {}) {
  return `
  <section class="cta-band reveal">
    <div class="container cta-band-inner">
      <div>
        <h2>${heading}</h2>
        <p>${body}</p>
      </div>
      <div class="cta-band-actions">
        <a href="${primary.href}" class="btn btn-primary" ${primary.external ? 'target="_blank" rel="noopener"' : ""}>${primary.label}</a>
        ${secondary ? `<a href="${secondary.href}" class="btn btn-ghost">${secondary.label}</a>` : ""}
      </div>
    </div>
  </section>`;
}

module.exports = { site, nav, esc, para, icons, icon, header, footer, layout, pageHero, ctaBand };
