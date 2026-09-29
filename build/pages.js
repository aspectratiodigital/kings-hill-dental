const { site, esc, para, icon, layout, pageHero, ctaBand } = require("./templates");
const { team, practiceGallery, testimonials, fees } = require("./data/site");
const { hubs, details } = require("./data/services");

const hubIcon = { "general-preventative": "shield", restorative: "crown", cosmetic: "sparkle", orthodontic: "align", aesthetics: "droplet", dentistry: "tooth" };

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------

function homePage() {
  const principals = team.slice(0, 3);
  const body = `
  <section class="hero reveal">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Welcome to Kings Hill Dental</p>
        <h1>Care that starts with<br>listening.</h1>
        <p class="lead">A professional, honest and ethical practice that puts dental health first, aesthetics second.</p>
        <p>We understand that dentistry can be scary, so we're here for you — with professional, caring advice that ensures you get the best treatment, tailored specifically to your personal dental needs.</p>
        <div class="hero-actions">
          <a href="${site.bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">Book Consultation</a>
          <a href="/about/" class="btn btn-ghost">Our Approach</a>
        </div>
      </div>
      <div class="hero-media">
        <img src="/assets/img/misc/hero-consultation.jpg" alt="A Kings Hill Dental clinician talking with a smiling patient in the surgery" width="1000" height="750" loading="eager">
      </div>
    </div>
  </section>

  <section class="section principals reveal">
    <div class="container">
      <p class="eyebrow center">Designed by</p>
      <h2 class="center">Caring professionals.</h2>
      <div class="principal-grid">
        ${principals
          .map(
            (p, i) => `
          <a href="/team/${p.slug}/" class="principal-card blob-${(i % 3) + 1}">
            <img src="${p.homeImg || p.img}" alt="${esc(p.name)}" loading="lazy">
            <div class="principal-info">
              <span class="principal-name">${p.name}</span>
              <span class="principal-role">${p.role}</span>
            </div>
          </a>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="section welcome reveal">
    <div class="container welcome-grid">
      <div class="welcome-media">
        <img src="/assets/img/practice/practice-3.jpg" alt="Reception at Kings Hill Dental" loading="lazy">
      </div>
      <div class="welcome-copy">
        <p class="eyebrow">Welcome to</p>
        <h2>Kings Hill Dental</h2>
        <p>We create beautiful smiles in West Malling. At Kings Hill Dental, we combine cutting-edge dental technology with a standard of care that goes above and beyond. Our exceptional treatments focus on your comfort and care, promoting great oral health and boosting your confidence with life-changing cosmetic treatments.</p>
        <p>We have a brilliant team of specialists, dentists, therapists and nurses who care and support you through your patient journey, providing expert care with a gentle touch.</p>
        <div class="welcome-actions">
          <span class="welcome-label">Get in touch with our team today</span>
          <a href="${site.bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">Book Online</a>
          <a href="${site.phoneHref}" class="btn btn-ghost">Call Us</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section services reveal">
    <div class="container">
      <p class="eyebrow center">Our services</p>
      <h2 class="center">Treatment, tailored to you.</h2>
      <p class="section-intro center">We have a fantastic range of preventative, restorative and cosmetic treatments that focus on creating a beautiful, natural smile. We see patients of all ages and treat many families — from orthodontics and dental implants, to full hygiene support and facial aesthetics.</p>
      <div class="service-grid">
        <a href="/dentistry/orthodontic/" class="service-card">${icon("align", "icon-lg")}<h3>Orthodontics</h3><p>Teeth-straightening treatments that can improve so much more than appearance — addressing jaw issues and improving oral health.</p></a>
        <a href="/dentistry/restorative/" class="service-card">${icon("crown", "icon-lg")}<h3>Dental Restoration</h3><p>Restoration techniques such as dentures or implants help restore your full dental functionality and bring back your smile.</p></a>
        <a href="/dentistry/general-preventative/" class="service-card">${icon("shield", "icon-lg")}<h3>Dental Hygiene</h3><p>A healthy smile is a beautiful smile. Hygiene appointments prevent gum disease and protect your natural teeth.</p></a>
        <a href="/aesthetics/" class="service-card">${icon("droplet", "icon-lg")}<h3>Aesthetics</h3><p>Achieve a smile — and complexion — you can be proud of, with our range of considered cosmetic treatments.</p></a>
      </div>
      <div class="center" style="margin-top:2.5rem"><a href="/dentistry/" class="btn btn-ghost">Discover more services</a></div>
    </div>
  </section>

  <section class="section membership-teaser reveal">
    <div class="container membership-grid">
      <div class="membership-card">
        <h3>Children's Membership</h3>
        <p>Our children's plan encourages regular attendance, ensuring your child maintains healthy teeth and gums for life, preventing expensive procedures later on.</p>
        <p class="price">from <strong>£10.40</strong> / month</p>
        <a href="/fees/membership-plan/" class="btn btn-ghost btn-small">View plan details</a>
      </div>
      <div class="membership-card">
        <h3>Adult Membership</h3>
        <p>Our plan provides all the essential dental treatments you need, looking after your teeth and gums while making dental care more affordable.</p>
        <p class="price"><strong>£25.85</strong> / month</p>
        <a href="/fees/membership-plan/" class="btn btn-ghost btn-small">View plan details</a>
      </div>
    </div>
    <div class="container membership-note">
      <div>
        <h3>Not interested in a membership?</h3>
        <p>No problem — you can find out about our per-procedure pricing using the button below.</p>
      </div>
      <a href="/fees/" class="btn btn-primary">Our Pricing</a>
    </div>
  </section>

  ${testimonialSection()}

  <section class="section contact-teaser reveal">
    <div class="container contact-teaser-inner">
      <div>
        <p class="eyebrow">Get in contact</p>
        <h2>Start your journey with us.</h2>
        <p>Simply fill out the form and our friendly reception team will call you back to answer your questions promptly.</p>
        <a href="/contact/" class="btn btn-primary">Get in Touch</a>
      </div>
      <img src="/assets/img/misc/amelia-and-simon.jpg" alt="Amelia and Simon Dumper, Principal Dentists at Kings Hill Dental" loading="lazy">
    </div>
  </section>
  `;

  return layout({
    title: "Home",
    description: "A professional, honest and ethical dental practice in West Malling, Kent. Care that starts with listening — book your consultation with Kings Hill Dental today.",
    path: "/",
    body,
    bodyClass: "page-home",
  });
}

function testimonialSection() {
  return `
  <section class="section testimonials reveal">
    <div class="container">
      <p class="eyebrow center">What our patients say</p>
      <h2 class="center">Trusted by families across West Malling.</h2>
    </div>
    <div class="testimonial-track" data-testimonial-track>
      <div class="testimonial-track-inner" data-testimonial-inner>
        ${testimonials
          .map(
            (t) => `
          <blockquote class="testimonial-card">
            ${icon("quote", "icon-quote")}
            <p>${t.quote}</p>
            <cite>${t.name}</cite>
          </blockquote>`
          )
          .join("")}
      </div>
    </div>
    <div class="testimonial-dots" data-testimonial-dots></div>
  </section>`;
}

// ---------------------------------------------------------------------------
// GENERIC HUB (dentistry, general-preventative, restorative, cosmetic, orthodontic, aesthetics)
// ---------------------------------------------------------------------------

function hubPage(hub, breadcrumbs) {
  const body = `
  ${pageHero({ eyebrow: hub.eyebrow, title: hub.title, lead: hub.intro, breadcrumbs })}
  <section class="section reveal">
    <div class="container">
      <div class="card-grid">
        ${hub.cards
          .map(
            (c) => `
          <a href="${c.href}" class="treatment-card">
            ${icon(hubIcon[hub.slug] || "tooth", "icon-lg")}
            <h3>${c.title}</h3>
            <p>${c.blurb}</p>
            <span class="card-link">Find out more ${icon("arrow")}</span>
          </a>`
          )
          .join("")}
      </div>
    </div>
  </section>
  ${ctaBand()}
  `;

  return layout({
    title: hub.title,
    description: hub.intro.slice(0, 155),
    path: `/${hub.parent ? "dentistry/" + hub.slug : hub.slug}/`,
    body,
    bodyClass: "page-hub",
  });
}

// ---------------------------------------------------------------------------
// GENERIC DETAIL PAGE
// ---------------------------------------------------------------------------

function detailPage(slug, d, path, breadcrumbs) {
  const body = `
  <section class="page-hero detail-hero reveal">
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">${breadcrumbs
        .map((b, i) =>
          i === breadcrumbs.length - 1
            ? `<span>${b.label}</span>`
            : `<a href="${b.href}">${b.label}</a><span class="crumb-sep">/</span>`
        )
        .join("")}</nav>
      <h1>${d.title}.</h1>
      <p class="lead">${d.lead}</p>
    </div>
  </section>

  <section class="section detail-intro reveal">
    <div class="container detail-grid">
      <div>
        <p>${d.intro}</p>
        <h2 class="benefits-label">${d.benefitsLabel}</h2>
        <ul class="benefits-list">
          ${d.benefits.map((b) => `<li>${icon("plus")}<span>${b}</span></li>`).join("")}
        </ul>
        <a href="${site.bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">Book an Appointment</a>
      </div>
      <div class="detail-media">
        <img src="/assets/img/practice/practice-${(hashSlug(slug) % 12) + 1}.jpg" alt="Inside the Kings Hill Dental practice" loading="lazy">
      </div>
    </div>
  </section>

  ${d.sections
    .map(
      (s, i) => `
    <section class="section detail-section ${i % 2 ? "alt-bg" : ""} reveal">
      <div class="container detail-section-inner">
        <h2>${s.heading}</h2>
        ${para(s.body)}
      </div>
    </section>`
    )
    .join("")}

  ${ctaBand()}
  `;

  return layout({
    title: d.title,
    description: d.lead.slice(0, 155),
    path,
    body,
    bodyClass: "page-detail",
  });
}

function hashSlug(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// ---------------------------------------------------------------------------
// ABOUT
// ---------------------------------------------------------------------------

function aboutPage() {
  const stats = [
    { icon: "chat", title: "Friendly Team", body: "Our team is always warm, welcoming and supportive." },
    { icon: "shield", title: "Professional Advice", body: "We ensure you are as informed as possible." },
    { icon: "clock", title: "20+ Years' Experience", body: "You can trust our dentists to provide high quality care." },
    { icon: "sparkle", title: "Patient Focused", body: "Our patients are our priority — we don't push procedures." },
  ];

  const body = `
  ${pageHero({ eyebrow: "About us", title: "Care that starts with listening.", breadcrumbs: [{ label: "Home", href: "/" }, { label: "About" }] })}

  <section class="section about-stats reveal">
    <div class="container stat-grid">
      ${stats.map((s) => `<div class="stat-card">${icon(s.icon, "icon-lg")}<h3>${s.title}</h3><p>${s.body}</p></div>`).join("")}
    </div>
  </section>

  <section class="section about-intro reveal">
    <div class="container detail-grid">
      <div class="about-media">
        <img src="/assets/img/practice/practice-1.jpg" alt="The exterior of Kings Hill Dental" loading="lazy">
      </div>
      <div>
        <p class="eyebrow">About us</p>
        <h2>Two decades of family-owned care.</h2>
        <p>We have been the principal dentists at our family-owned dental surgery since 2009, with over 20 years of experience each. Our passion and dedication to dentistry has seen the practice grow and expand, and we are deeply thankful for the wonderful environment, team and patients that surround us.</p>
        <p>We are a dentistry focused solely on your interests, and we endeavour to provide our patients with the best quality of care and advice, so you can make the most informed decision about the dental work you're looking for. We're pushing back against the wave of cosmetic-first dentistry seen across social media, offering professional advice and guidance to help assess the best option for each individual patient — for both dental care and cosmetic work. We believe the best smile is the one you want to show off, and we work to build that smile in the least invasive and most caring way possible.</p>
        <p>With our well-equipped, state-of-the-art surgeries, we offer a wide range of general and preventative dentistry, as well as specialist treatments such as orthodontics and implants — alongside premium, patient-oriented cosmetic treatment and skin care.</p>
      </div>
    </div>
  </section>

  <section class="section team-section reveal">
    <div class="container">
      <p class="eyebrow center">Meet the team</p>
      <h2 class="center">The people behind your care.</h2>
      <div class="team-grid">
        ${team
          .map(
            (p) => `
          <a href="/team/${p.slug}/" class="team-card">
            <img src="${p.img}" alt="${esc(p.name)}" loading="lazy">
            <div class="team-card-info">
              <span class="team-card-name">${p.name}</span>
              <span class="team-card-role">${p.role}</span>
            </div>
          </a>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="section practice-gallery reveal">
    <div class="container">
      <p class="eyebrow center">Our practice</p>
      <h2 class="center">A calm space to be looked after.</h2>
      <p class="section-intro center">Hover over each tile for a closer look.</p>
      <div class="gallery-grid">
        ${practiceGallery
          .map(
            (g) => `
          <figure class="gallery-tile">
            <img src="${g.file}" alt="${esc(g.label)} at Kings Hill Dental" loading="lazy">
            <figcaption>${g.label}</figcaption>
          </figure>`
          )
          .join("")}
      </div>
    </div>
  </section>

  ${ctaBand({ heading: "Ready to meet us in person?", body: "Book a consultation and experience the calm, considered care our patients tell us about." })}
  `;

  return layout({
    title: "About",
    description: "Meet the principal dentists and team behind Kings Hill Dental — a family-owned practice in West Malling with over 20 years of experience.",
    path: "/about/",
    body,
    bodyClass: "page-about",
  });
}

// ---------------------------------------------------------------------------
// TEAM MEMBER
// ---------------------------------------------------------------------------

function teamPage(p) {
  const body = `
  <section class="section team-detail reveal">
    <div class="container team-detail-grid">
      <div class="team-detail-media">
        <img src="${p.img}" alt="${esc(p.name)}" loading="eager">
      </div>
      <div class="team-detail-copy">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/about/">About</a><span class="crumb-sep">/</span><span>${p.name}</span></nav>
        <h1>${p.name}</h1>
        <p class="team-detail-role">${p.role}</p>
        ${p.gdc ? `<p class="team-detail-gdc">GDC Number: ${p.gdc}</p>` : ""}
        <ul class="team-quals">${p.quals.map((q) => `<li>${icon("plus")}<span>${q}</span></li>`).join("")}</ul>
        ${para(p.bio)}
        <a href="${site.bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">Book Consultation</a>
      </div>
    </div>
  </section>
  ${ctaBand({ heading: "Meet the rest of the team", body: "Every member of our team is here to make your visit calm, informed and pressure-free.", primary: { label: "Meet the Team", href: "/about/#team" }, secondary: { label: "Back to About", href: "/about/" } })}
  `;

  return layout({
    title: p.name,
    description: `${p.name}, ${p.role} at Kings Hill Dental in West Malling, Kent.`,
    path: `/team/${p.slug}/`,
    body,
    bodyClass: "page-team",
  });
}

// ---------------------------------------------------------------------------
// FEES
// ---------------------------------------------------------------------------

function feesPage() {
  const body = `
  ${pageHero({ eyebrow: "Fees", title: "Fees.", lead: "All of our patients receive a written treatment plan, clearly outlining the clinical needs and costs of treatment.", breadcrumbs: [{ label: "Home", href: "/" }, { label: "Fees" }] })}

  <section class="section reveal">
    <div class="container">
      <div class="accordion" data-accordion>
        ${fees
          .map(
            (group, i) => `
          <div class="accordion-item${i === 0 ? " is-open" : ""}">
            <button class="accordion-trigger" aria-expanded="${i === 0}">
              <span>${group.category}</span>
              ${icon("plus", "icon accordion-icon")}
            </button>
            <div class="accordion-panel">
              <div class="accordion-panel-inner">
                <table class="fee-table">
                  ${group.items.map(([label, price]) => `<tr><td>${label}</td><td class="fee-price">${price}</td></tr>`).join("")}
                </table>
              </div>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="section membership-teaser reveal">
    <div class="container membership-note">
      <div>
        <h3>Prefer predictable monthly costs?</h3>
        <p>Our membership plans cover essential treatments for one simple monthly fee — with a 10% discount on routine treatment.</p>
      </div>
      <a href="/fees/membership-plan/" class="btn btn-primary">View Membership Plans</a>
    </div>
  </section>

  ${ctaBand({ heading: "Need help choosing?", body: "Not sure which treatment is right for you, or nervous about getting treatment or aesthetic work for the first time? Our kind team of dental professionals are here to help you choose the right procedure for your smile." })}
  `;

  return layout({
    title: "Fees",
    description: "Transparent fees for examinations, hygiene, restorative, cosmetic, orthodontic and facial aesthetic treatment at Kings Hill Dental.",
    path: "/fees/",
    body,
    bodyClass: "page-fees",
  });
}

function membershipPage() {
  const body = `
  ${pageHero({ eyebrow: "Fees", title: "Membership Plan.", lead: "Our membership plans make it easy to keep your smile healthy, by providing consistent, quality care for one simple monthly cost.", breadcrumbs: [{ label: "Home", href: "/" }, { label: "Fees", href: "/fees/" }, { label: "Membership Plan" }] })}

  <section class="section reveal">
    <div class="container plan-grid">
      <div class="plan-card">
        <h3>Children's Membership</h3>
        <p>Our child's plan encourages regular attendance, ensuring your child maintains healthy teeth and gums for life, preventing expensive procedures later in life.</p>
        <div class="plan-tiers">
          <div><span>Under 8 years</span><strong>£10.40</strong></div>
          <div><span>8–12 years</span><strong>£11.25</strong></div>
          <div><span>13–17 years</span><strong>£12.10</strong></div>
        </div>
        <p class="plan-note">per month</p>
        <ul class="benefits-list">
          <li>${icon("plus")}<span>A scale and polish treatment, with oral hygiene instruction</span></li>
          <li>${icon("plus")}<span>Up to two dental examinations per year</span></li>
          <li>${icon("plus")}<span>Any necessary x-rays</span></li>
          <li>${icon("plus")}<span>10% discount off routine treatment</span></li>
          <li>${icon("plus")}<span>Worldwide dental accident and emergency cover</span></li>
        </ul>
        <a href="${site.bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">Sign up Now</a>
      </div>

      <div class="plan-card">
        <h3>Adult Membership</h3>
        <p>The plan provides all the essential dental treatments you need, looking after your teeth and gums while making your dental care more affordable.</p>
        <div class="plan-tiers plan-tiers-single"><div><strong>£25.85</strong></div></div>
        <p class="plan-note">per month</p>
        <ul class="benefits-list">
          <li>${icon("plus")}<span>Up to two dental hygiene treatments per year</span></li>
          <li>${icon("plus")}<span>Up to two dental examinations per year</span></li>
          <li>${icon("plus")}<span>Up to two routine x-rays per year</span></li>
          <li>${icon("plus")}<span>10% discount off routine treatment</span></li>
          <li>${icon("plus")}<span>Worldwide dental accident and emergency cover</span></li>
        </ul>
        <a href="${site.bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">Sign up Now</a>
      </div>
    </div>
  </section>

  <section class="section about-stats reveal">
    <div class="container stat-grid stat-grid-3">
      <div class="stat-card">${icon("shield", "icon-lg")}<h3>Insurance</h3><p>Worldwide dental accident and emergency insurance to put your mind at ease.</p></div>
      <div class="stat-card">${icon("clock", "icon-lg")}<h3>Spread costs</h3><p>Pay for routine appointments throughout the year, reducing the upfront cost.</p></div>
      <div class="stat-card">${icon("sparkle", "icon-lg")}<h3>Prevention</h3><p>Regular, continued monitoring to prevent problems before they start.</p></div>
    </div>
  </section>

  ${ctaBand()}
  `;

  return layout({
    title: "Membership Plan",
    description: "Children's and adult membership plans from Kings Hill Dental — essential treatment for one simple monthly cost.",
    path: "/fees/membership-plan/",
    body,
    bodyClass: "page-membership",
  });
}

// ---------------------------------------------------------------------------
// REFERRALS
// ---------------------------------------------------------------------------

function referralsPage() {
  const treatments = ["Orthodontics", "Implants", "Facial Aesthetics", "Skin Care", "Hygiene", "Endodontic treatment & CBCT"];
  const body = `
  ${pageHero({ eyebrow: "Referrals", title: "Referrals.", lead: "Refer a patient to Kings Hill Dental and our specialist team will take great care of them, keeping you informed at every stage.", breadcrumbs: [{ label: "Home", href: "/" }, { label: "Referrals" }] })}

  <section class="section reveal">
    <div class="container form-wrap">
      <form class="referral-form" data-static-form>
        <fieldset>
          <legend>Referral for which treatment(s)?</legend>
          <div class="checkbox-grid">
            ${treatments.map((t, i) => `<label class="checkbox-pill"><input type="checkbox" name="treatment" value="${t}"><span>${t}</span></label>`).join("")}
          </div>
        </fieldset>

        <fieldset>
          <legend>Referring dentist details</legend>
          <div class="field-grid">
            <label>Name<input type="text" name="dentist_name" required></label>
            <label>Email<input type="email" name="dentist_email" required></label>
            <label>Phone<input type="tel" name="dentist_phone"></label>
            <label>Practice name<input type="text" name="practice_name"></label>
            <label class="field-full">Practice address<input type="text" name="practice_address"></label>
            <label>City<input type="text" name="city"></label>
            <label>Postcode<input type="text" name="postcode"></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Patient details</legend>
          <div class="field-grid">
            <label>First name<input type="text" name="patient_first_name" required></label>
            <label>Last name<input type="text" name="patient_last_name" required></label>
            <label>Email<input type="email" name="patient_email"></label>
            <label>Phone<input type="tel" name="patient_phone"></label>
            <label>Gender<select name="gender"><option>Prefer not to say</option><option>Female</option><option>Male</option><option>Other</option></select></label>
            <label>Date of birth<input type="date" name="dob"></label>
            <label class="field-full">Reason for referral<textarea name="reason" rows="4"></textarea></label>
          </div>
        </fieldset>

        <button type="submit" class="btn btn-primary">Submit Referral</button>
      </form>
    </div>
  </section>
  `;

  return layout({
    title: "Referrals",
    description: "Refer a patient to Kings Hill Dental's specialist team for orthodontics, implants, facial aesthetics, skin care, hygiene or endodontic treatment.",
    path: "/referrals/",
    body,
    bodyClass: "page-referrals",
  });
}

// ---------------------------------------------------------------------------
// CONTACT
// ---------------------------------------------------------------------------

function contactPage() {
  const body = `
  ${pageHero({ eyebrow: "Get in contact", title: "We'd love to hear from you.", lead: "Simply fill out the form and our friendly reception team will call you back to answer your questions promptly.", breadcrumbs: [{ label: "Home", href: "/" }, { label: "Contact" }] })}

  <section class="section reveal">
    <div class="container contact-grid">
      <form class="contact-form" data-static-form>
        <div class="field-grid">
          <label>First name<input type="text" name="first_name" required></label>
          <label>Last name<input type="text" name="last_name" required></label>
          <label>Email<input type="email" name="email" required></label>
          <label>Phone<input type="tel" name="phone"></label>
          <label class="field-full">Message<textarea name="message" rows="5"></textarea></label>
        </div>
        <label class="checkbox-pill checkbox-pill-wide">
          <input type="checkbox" name="marketing">
          <span>I'd like to be informed of exclusive offers and other practice information</span>
        </label>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

      <div class="contact-side">
        <div class="contact-side-block">
          <h3>${icon("pin")} Visit us</h3>
          <p><a href="${site.address.mapUrl}" target="_blank" rel="noopener">${site.address.line1}<br>${site.address.line2}<br>${site.address.line3}, ${site.address.line4}<br>${site.address.postcode}</a></p>
        </div>
        <div class="contact-side-block">
          <h3>${icon("phone")} Call or message</h3>
          <p><a href="${site.phoneHref}">${site.phone}</a></p>
          <p><a href="mailto:${site.email}">${site.email}</a></p>
          <p><a href="${site.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a></p>
        </div>
        <div class="contact-side-block">
          <h3>${icon("clock")} Opening hours</h3>
          <ul class="footer-hours">${site.hours.map(([d, h]) => `<li><span>${d}</span><span>${h}</span></li>`).join("")}</ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section map-section reveal">
    <div class="container">
      <iframe title="Map to Kings Hill Dental" src="https://www.google.com/maps?q=Kings+Hill+Clinic,+Suite+14,+10+Churchill+Square,+Kings+Hill,+West+Malling,+ME19+4YU&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </section>
  `;

  return layout({
    title: "Contact",
    description: "Get in touch with Kings Hill Dental in West Malling, Kent — call, message or visit us, and our friendly reception team will help with your questions.",
    path: "/contact/",
    body,
    bodyClass: "page-contact",
  });
}

module.exports = {
  homePage,
  hubPage,
  detailPage,
  aboutPage,
  teamPage,
  feesPage,
  membershipPage,
  referralsPage,
  contactPage,
};
