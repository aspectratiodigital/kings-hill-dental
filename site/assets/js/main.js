(function () {
  "use strict";

  // Header shadow on scroll
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav toggle
  var toggle = document.querySelector("[data-menu-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.classList.toggle("is-open", !open);
      document.body.style.overflow = !open ? "hidden" : "";
    });

    mobileNav.querySelectorAll(".mobile-caret").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.closest(".mobile-nav-item").classList.toggle("is-open");
      });
    });

    // Close on link click (but not the expand caret)
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  // Desktop dropdown keyboard support (click to toggle on touch/no-hover)
  document.querySelectorAll(".nav-item.has-children").forEach(function (item) {
    var caret = item.querySelector(".nav-caret");
    if (caret) {
      caret.addEventListener("click", function (e) {
        e.preventDefault();
        item.classList.toggle("force-open");
      });
    }
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  // Accordion (Fees page)
  document.querySelectorAll("[data-accordion] .accordion-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".accordion-item");
      var isOpen = item.classList.contains("is-open");
      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // Testimonial carousel dots
  var track = document.querySelector("[data-testimonial-track]");
  var inner = document.querySelector("[data-testimonial-inner]");
  var dotsWrap = document.querySelector("[data-testimonial-dots]");
  if (track && inner && dotsWrap) {
    var cards = Array.prototype.slice.call(inner.children);
    cards.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", function () {
        cards[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      });
      dotsWrap.appendChild(dot);
    });

    var dots = Array.prototype.slice.call(dotsWrap.children);
    var syncDots = function () {
      var trackLeft = track.scrollLeft;
      var closest = 0;
      var closestDist = Infinity;
      cards.forEach(function (card, i) {
        var dist = Math.abs(card.offsetLeft - trackLeft);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === closest); });
    };
    track.addEventListener("scroll", debounce(syncDots, 80), { passive: true });
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      var args = arguments;
      t = setTimeout(function () { fn.apply(null, args); }, wait);
    };
  }

  // Static forms (no backend yet) — friendly inline confirmation
  document.querySelectorAll("[data-static-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      if (btn) {
        var original = btn.textContent;
        btn.textContent = "Thank you — we'll be in touch shortly";
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
          form.reset();
        }, 3600);
      }
    });
  });
})();
