// About page opener: a personal, signed letter from the principal dentists — their photo on the
// left, the note styled visually like a letter (letterhead, salutation, sign-off) on the right.
function aboutIntro() {
  return `<section class="section section--tight" aria-label="A letter from your dentists"><div class="wrap">
<h2 class="h1" data-split>A letter from Simon &amp; Amelia</h2>
<div class="ai-letter">
<figure class="ai-letter-media" data-reveal="fade"><img src="/img/about-founders.webp" alt="Simon and Amelia, the principal dentists at Kings Hill Dental" loading="lazy" width="500" height="750"></figure>
<div class="ai-letter-copy" data-reveal>
<div class="ai-letterhead"><span class="ai-letterhead-name">Kings Hill Dental</span><span class="ai-letterhead-place">West Malling, Kent</span></div>
<p class="ai-salute">An open letter,</p>
<p>We've been the principal dentists at our family-owned practice since 2009, getting to know our patients as people, not appointments. Rather than following the wave of cosmetic-first dentistry online, we offer honest, informed advice — and a full range of general, cosmetic and orthodontic treatment, all under one roof and delivered with the same gentle, unhurried care.</p>
<p class="ai-sign-off">With warm regards,</p>
<div class="ai-sign"><span class="ai-sign-name">Simon &amp; Amelia</span><span class="ai-sign-role">Principal Dentists, Kings Hill Dental</span></div>
</div>
</div>
</div></section>`;
}
module.exports = { aboutIntro };
