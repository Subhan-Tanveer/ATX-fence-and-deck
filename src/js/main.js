import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { mountLayout } from './layout.js';
import { initGallery } from './gallery.js';
import { initForm } from './form.js';

gsap.registerPlugin(ScrollTrigger);

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Smooth inertia scroll (Lenis) driven by GSAP ticker ---------- */
function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        lenis.scrollTo(id, { offset: -90 });
      }
    });
  });
  window.__lenis = lenis;
}

/* ---------- Page transition: full-screen brand wipe between pages ----------
   The overlay is fully covering by default (see CSS), so:
   - On load: it "exits" by sliding out to the right, revealing the page.
   - On an internal link click: it slides in from the left to re-cover the
     screen, then navigates once fully covered — so the next page loads
     already hidden behind it and picks up the exit animation seamlessly. */
function initPageTransitions() {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;
  if (REDUCE) { overlay.style.display = 'none'; return; }

  gsap.set(overlay, { xPercent: 0 });
  gsap.to(overlay, { xPercent: 101, duration: 0.65, ease: 'power3.inOut', delay: 0.15 });

  let navigating = false;
  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) return;
    if (href.startsWith('tel:') || href.startsWith('mailto:') || a.target === '_blank') return;

    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || navigating) return;
      e.preventDefault();
      navigating = true;
      gsap.set(overlay, { xPercent: -101 });
      gsap.to(overlay, {
        xPercent: 0, duration: 0.6, ease: 'power3.inOut',
        onComplete: () => { window.location.href = href; },
      });
    });
  });
}

/* ---------- Header: solidify + hide on scroll down ---------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  // Stays visible at all scroll positions/directions — only the solid
  // background + shadow toggle once you've scrolled past the hero.
  const onScroll = () => {
    header.classList.toggle('is-solid', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Scroll reveals — IntersectionObserver + GSAP ----------
   IntersectionObserver re-measures against the live viewport on every
   frame, so it can't drift out of sync the way a one-time ScrollTrigger
   position calculation can when images/video below the fold are still
   loading and shifting page height. */
function initReveals() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  if (REDUCE) {
    els.forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }

  // group by container so items in the same grid/gallery/timeline stagger together
  const containers = new Map();
  els.forEach((el) => {
    const parent = el.closest('[data-gallery], .svc-grid, .timeline, .masonry, .grid, .reviews-grid, .footer-top, [data-lightbox-frame]') || document.body;
    if (!containers.has(parent)) containers.set(parent, []);
    containers.get(parent).push(el);
  });
  containers.forEach((elements) => {
    elements.forEach((el, idx) => {
      el.__revealDelay = el.dataset.revealDelay ? parseFloat(el.dataset.revealDelay) * 0.07 : idx * 0.08;
    });
  });

  const reveal = (el) => {
    if (el.__revealed) return;
    el.__revealed = true;
    gsap.to(el, {
      opacity: 1, x: 0, y: 0, scale: 1,
      duration: 0.7, ease: 'power2.out', delay: el.__revealDelay || 0,
      overwrite: 'auto',
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 20% 0px' });

  els.forEach((el) => observer.observe(el));
  // No load-based force-reveal here: IntersectionObserver fires reliably
  // whenever an element genuinely scrolls into view, however long that
  // takes — a timeout would reveal below-fold content (e.g. the footer)
  // before the user ever scrolls to it, killing the animation entirely.
}

/* ---------- Count-up stats (once, ~1.2s) ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = (el.dataset.count.split('.')[1] || '').length;
  const prefix = el.dataset.prefix || '';
  const suffixEl = el.querySelector('.suffix');
  const suffix = suffixEl ? suffixEl.outerHTML : (el.dataset.suffix || '');
  if (REDUCE) { el.firstChild ? (el.childNodes[0].nodeValue = prefix + target.toFixed(decimals)) : (el.textContent = prefix + target.toFixed(decimals)); return; }
  const obj = { v: 0 };
  gsap.to(obj, {
    v: target, duration: 1.2, ease: 'power2.out',
    onUpdate: () => { el.innerHTML = prefix + obj.v.toFixed(decimals) + suffix; },
    onComplete: () => { el.innerHTML = prefix + target.toFixed(decimals) + suffix; },
  });
}
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 15% 0px' });
  els.forEach((el) => observer.observe(el));
}

/* ---------- Hero: slow scale + parallax ---------- */
function initHeroParallax() {
  if (REDUCE) return;
  const media = document.querySelector('.hero__media > *');
  if (media) {
    gsap.fromTo(media, { scale: 1, yPercent: 0 }, {
      scale: 1.08, yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }
  // .pagehead sits at the very top of the document on every page (like
  // .hero above) — it must use start:'top top' so progress is 0 at
  // scroll:0. Using 'top bottom' (correct for elements that scroll up
  // into view from below, like .cta-band further down the page) instead
  // produced a non-zero offset even on initial load, pushing the video
  // down and exposing a gap at the very top of the page.
  document.querySelectorAll('.pagehead__media > *').forEach((m) => {
    gsap.fromTo(m, { yPercent: -6 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: m.closest('section') || m, start: 'top top', end: 'bottom top', scrub: true } });
  });
  document.querySelectorAll('.cta-band__media > *').forEach((m) => {
    gsap.fromTo(m, { yPercent: -6 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: m.closest('section') || m, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/* ---------- Hero headline: word-by-word + letter animations ---------- */
function initHeroTitle() {
  const title = document.querySelector('[data-hero-title]');
  if (!title) return;
  if (REDUCE) { title.style.opacity = 1; return; }

  gsap.set(title, { opacity: 1 });

  // word-by-word reveal: each line animates in
  const lines = title.querySelectorAll('.line-inner');
  gsap.from(lines, {
    yPercent: 120, opacity: 0, duration: 0.95, ease: 'power3.out', stagger: 0.14, delay: 0.1
  });

  // letter-by-letter sparkle on headline
  lines.forEach((line, idx) => {
    const text = line.textContent;
    // Spaces must stay bare text (not wrapped in display:inline-block spans) —
    // a lone space inside an inline-block collapses to zero width, since CSS
    // trims leading/trailing whitespace within that element's own formatting
    // context, which silently ran every word together.
    const letters = text.split('').map((char) => char === ' '
      ? ' '
      : `<span class="letter" style="display:inline-block;opacity:0">${char}</span>`
    ).join('');
    line.innerHTML = letters;
    const letterEls = line.querySelectorAll('.letter');
    gsap.to(letterEls, {
      opacity: 1, duration: 0.04, stagger: 0.025, delay: 0.15 + idx * 0.14
    });
  });

  // hero subtitle & buttons fade in with stagger
  const fade = document.querySelectorAll('[data-hero-fade]');
  gsap.from(fade, { y: 28, opacity: 0, duration: 0.75, ease: 'power2.out', stagger: 0.12, delay: 0.65 });
}

/* ---------- Testimonial cross-fade ---------- */
function initTestimonials() {
  const stage = document.querySelector('.quote-stage');
  if (!stage) return;
  const quotes = [...stage.querySelectorAll('.quote')];
  const dotsWrap = document.querySelector('.quote-dots');
  const prev = document.querySelector('.quote-arrow.prev');
  const next = document.querySelector('.quote-arrow.next');
  let i = 0, timer;
  const dots = quotes.map((_, idx) => {
    const d = document.createElement('button');
    d.className = 'quote-dot'; d.setAttribute('aria-label', `Review ${idx + 1}`);
    d.addEventListener('click', () => go(idx, true));
    dotsWrap && dotsWrap.appendChild(d);
    return d;
  });
  function go(n, manual) {
    quotes[i].classList.remove('is-active');
    dots[i] && dots[i].classList.remove('is-active');
    i = (n + quotes.length) % quotes.length;
    quotes[i].classList.add('is-active');
    dots[i] && dots[i].classList.add('is-active');
    if (manual) restart();
  }
  function restart() { clearInterval(timer); if (!REDUCE) timer = setInterval(() => go(i + 1), 7000); }
  prev && prev.addEventListener('click', () => go(i - 1, true));
  next && next.addEventListener('click', () => go(i + 1, true));
  stage.addEventListener('mouseenter', () => clearInterval(timer));
  stage.addEventListener('mouseleave', restart);
  go(0); restart();
}

/* ---------- Process timeline: draw the connecting line ---------- */
function initTimeline() {
  const fill = document.querySelector('.timeline__line span');
  if (!fill) return;
  if (REDUCE) { fill.style.transform = 'scaleY(1)'; return; }
  gsap.to(fill, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 75%', scrub: true },
  });
  document.querySelectorAll('.tl-step__dot').forEach((dot) => {
    gsap.from(dot, { scale: 0, ease: 'back.out(2)', scrollTrigger: { trigger: dot, start: 'top 82%' } });
  });
}

/* ---------- Signature before/after (scrub on desktop, tap on mobile) ---------- */
function initBeforeAfter() {
  const section = document.querySelector('.ba');
  if (!section) return;
  const after = section.querySelector('.ba__after');
  const handle = section.querySelector('.ba__handle');
  const stage = section.querySelector('.ba__stage');
  const setWipe = (p) => {
    after.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
    if (handle) handle.style.left = `${p * 100}%`;
  };

  // Reduced motion: render the finished AFTER state, no scrub, no pin.
  if (REDUCE) { setWipe(1); return; }

  const mm = gsap.matchMedia();
  // Desktop: full scroll-scrubbed pin
  mm.add('(min-width: 861px)', () => {
    setWipe(0);
    const st = ScrollTrigger.create({
      trigger: section, start: 'top top', end: '+=120%', pin: '.ba__pin', scrub: 0.4,
      onUpdate: (self) => setWipe(self.progress),
    });
    return () => { st.kill(); after.style.clipPath = ''; };
  });
  // Mobile: draggable slider handle (Pointer Events cover touch + mouse).
  // Starts at the midpoint so both photos are visible immediately. Tracks
  // via a plain flag + window-level move/up listeners rather than
  // setPointerCapture — keeps tracking smoothly even if a fast swipe
  // drifts slightly outside the image bounds, and avoids capture-related
  // edge cases on some mobile browsers.
  mm.add('(max-width: 860px)', () => {
    if (!stage) return;
    section.classList.add('ba--toggle');
    setWipe(0.5);

    let dragging = false;
    const moveTo = (clientX) => {
      const rect = stage.getBoundingClientRect();
      setWipe(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)));
    };
    const onDown = (e) => { dragging = true; moveTo(e.clientX); };
    const onMove = (e) => { if (dragging) moveTo(e.clientX); };
    const onUp = () => { dragging = false; };

    stage.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      stage.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  });
}

/* ---------- Generic section parallax accents ---------- */
function initFloat() {
  if (REDUCE) return;
  document.querySelectorAll('[data-float]').forEach((el) => {
    const amt = parseFloat(el.dataset.float) || 40;
    gsap.fromTo(el, { yPercent: amt / 4 }, { yPercent: -amt / 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

const HAS_FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Magnetic buttons — CTAs drift slightly toward the cursor ---------- */
function initMagneticButtons() {
  if (REDUCE || !HAS_FINE_POINTER) return;
  document.querySelectorAll('.btn').forEach((btn) => {
    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.32, y: y * 0.32, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
  });
}

/* ---------- Subtle 3D tilt on service cards + gallery tiles ---------- */
function initCardTilt() {
  if (REDUCE || !HAS_FINE_POINTER) return;
  [{ selector: '.svc-card', lift: -8, max: 5 }, { selector: '.tile', lift: -3, max: 4 }].forEach(({ selector, lift, max }) => {
    document.querySelectorAll(selector).forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        gsap.to(card, {
          rotateX: (0.5 - py) * max * 2, rotateY: (px - 0.5) * max * 2, y: lift,
          transformPerspective: 800, duration: 0.5, ease: 'power2.out', overwrite: 'auto',
        });
      };
      const onLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  });
}

/* ---------- Cinematic curtain reveal on card/tile/feature imagery ----------
   A brand-colored panel slides off each image as it scrolls into view,
   layered on top of the existing fade-up reveal. IntersectionObserver only
   (no load-based failsafe like initReveals) — these are meant to stay
   covered until actually scrolled to, however long that takes; a timeout
   would reveal them early and defeat the effect. */
function initMediaReveals() {
  if (REDUCE) return;
  const containers = document.querySelectorAll('.svc-card__media, .tile__media, .feature__media');
  if (!containers.length) return;

  containers.forEach((el) => {
    const curtain = document.createElement('div');
    curtain.className = 'media-curtain';
    el.appendChild(curtain);
    el.__curtain = curtain;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const curtain = entry.target.__curtain;
      if (curtain) gsap.to(curtain, { xPercent: 100, duration: 0.9, ease: 'power3.inOut', onComplete: () => curtain.remove() });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 18% 0px' });

  containers.forEach((el) => observer.observe(el));
}

/* Wrap the words inside a heading's text nodes in .word spans, walking the
   existing DOM in place instead of flattening to textContent — that would
   silently drop <br> line breaks and nested <span class="serif-i"> italics
   (several headings use <br> as their only word separator, with no literal
   space, so flattening glued the words on either side of it together).
   Whitespace between words is left as plain text (not wrapped) — a lone
   space inside a display:inline-block span collapses to zero width. */
function wordifyHeading(node) {
  [...node.childNodes].forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      if (!child.textContent) return;
      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.className = 'word';
          span.style.cssText = 'display:inline-block;opacity:0';
          span.textContent = part;
          frag.appendChild(span);
        }
      });
      node.replaceChild(frag, child);
    } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
      wordifyHeading(child);
    }
  });
}

/* ---------- Animate section headings word-by-word ---------- */
function initHeadingAnimations() {
  if (REDUCE) return;
  const headings = [...document.querySelectorAll('.h1, .h2, .h3')].filter((h) => !h.querySelector('.letter'));
  if (!headings.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const wordSpans = entry.target.querySelectorAll('.word');
      gsap.to(wordSpans, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05, overwrite: 'auto' });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 20% 0px' });

  headings.forEach((heading) => {
    wordifyHeading(heading);
    observer.observe(heading);
  });

  // No load-based force-reveal: same reasoning as initReveals — a timeout
  // would reveal below-fold headings before the user scrolls to them.
}

/* ---------- Keep scrub-based ScrollTrigger positions accurate as media loads ----------
   Hero/before-after/timeline/float rely on ScrollTrigger's cached element
   positions. Images and (especially) video below the fold change document
   height as they load, which can silently desync those trigger points.
   Refresh whenever anything that affects layout finishes loading. */
function initScrollTriggerRefresh() {
  let pending = null;
  const scheduleRefresh = () => {
    clearTimeout(pending);
    pending = setTimeout(() => ScrollTrigger.refresh(), 120);
  };
  document.querySelectorAll('img').forEach((img) => {
    if (!img.complete) img.addEventListener('load', scheduleRefresh, { once: true });
  });
  document.querySelectorAll('video').forEach((v) => {
    v.addEventListener('loadeddata', scheduleRefresh, { once: true });
  });
  window.addEventListener('load', scheduleRefresh);
  window.addEventListener('resize', scheduleRefresh);
}

/* ---------- Boot ---------- */
function boot() {
  mountLayout();
  initPageTransitions();
  initHeader();
  if (!REDUCE) initSmoothScroll();
  initReveals();
  initHeadingAnimations();
  initCounters();
  initHeroTitle();
  initHeroParallax();
  initTestimonials();
  initTimeline();
  initBeforeAfter();
  initFloat();
  initMediaReveals();
  initMagneticButtons();
  initCardTilt();
  initGallery();
  initForm();
  if (!REDUCE) initScrollTriggerRefresh();
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
