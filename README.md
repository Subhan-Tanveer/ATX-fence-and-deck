# ATX Fence and Deck — Website

Family-owned deck, pergola, patio cover & fence builder in **Round Rock, TX**
(serving greater Austin). Warm, honest, unhurried — built to feel like Jared, not
like a marketing agency.

**Stack:** Vanilla HTML + [Vite](https://vitejs.dev) · [GSAP](https://gsap.com) +
ScrollTrigger · [Lenis](https://lenis.darkroom.engineering) smooth scroll. No
framework, no runtime bloat — fast, portable, easy to host anywhere static.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs static site to /dist
npm run preview    # preview the production build
```

Deploy the contents of `/dist` to Netlify, Vercel, Cloudflare Pages, or any static host.

---

## Structure

```
index.html        Home — hero, stats, services, gallery, before/after, reviews, process, CTA
services.html     Detailed section per service (anchors: #decks #pergolas #patio-covers #fences #gates #iron)
gallery.html      Filterable "Our Work" masonry + lightbox
about.html        Jared's story, values, service area
reviews.html      Review grid + Google/Yelp links
contact.html      Free-quote form (photo upload) + click-to-call
src/css/main.css  "Warm Cedar" design system (all styles + reduced-motion)
src/js/
  layout.js       Injects header, mobile menu, footer, sticky call bar into every page
  main.js         Lenis + GSAP: reveals, counters, hero parallax, testimonials, timeline, before/after
  gallery.js      Filters + accessible lightbox
  form.js         Validation, photo uploads, submit
public/media/     Drop real photos/videos here (see README.txt there)
AI_IMAGE_AND_VIDEO_PROMPTS.md   Prompt kit for all imagery + hero video
```

---

## Animation notes (per the brief — gentle, warm, never flashy)

- **Smooth inertia scroll** site-wide (Lenis), soft damping.
- **Scroll reveals** on every section (fade + subtle rise) at ~15% viewport entry.
- **Count-up stats** — `5.0` rating, `30` Google reviews, `126` photos, `38` Yelp — once, ~1.2s.
  *(No "years in business" counter — the 2005 founding date is unverified per the brief.)*
- **Signature before/after** — scroll-scrubbed wipe on desktop; **tap-to-toggle** on mobile / reduced-motion.
- **Hero** — slow image scale + line-reveal headline.
- **Testimonials** — 7s cross-fade, pause on hover, arrows + dots.
- **Process** — connecting line draws down on scroll.
- **`prefers-reduced-motion: reduce`** — disables smooth scroll, scrubbing and counters; renders final states.

---

## Before launch — checklist (from the brief)

- [ ] **Wire the quote form.** Set `ENDPOINT` in `src/js/form.js` to your Formspree/Netlify
      form URL, then **submit a real test with a photo attached** and confirm the email arrives.
      (Until wired, the form runs a safe demo success — it does not silently fail.)
- [ ] **Replace every placeholder image** with real photos. Search the code for
      `data-ph="Placeholder` — zero hits means nothing fake shipped. See `AI_IMAGE_AND_VIDEO_PROMPTS.md`.
- [ ] **Gallery** — real photos only, sorted into the right `data-cat` (decks/pergolas/patio/fences/gates/iron).
- [ ] **Before/After** — swap in a **real** project, identical framing on both frames.
- [ ] **Test on a real mid-range Android over throttled 4G** — gallery scroll + before/after
      scrub should hold frame rate (it auto-degrades to tap-to-toggle on small screens).
- [ ] **Tap `tel:` on a real phone** — confirm (512) 902-8877 dials.
- [ ] Confirm the domain in canonical / OG / schema URLs (currently `atxfenceanddeck.com`).
- [ ] Set the social card at `public/media/og-home.jpg` (1200×630).
- [ ] Add `alt` text + `width`/`height` to every real image; `loading="lazy"` below the fold.
- [ ] Run Lighthouse (target 90+ mobile). JS is code-split (gsap/lenis/main) and deferred.

## SEO in place
- Unique `<title>` + meta description per page; canonical, Open Graph, viewport.
- `LocalBusiness` schema on Home (name, address, phone, hours, `aggregateRating` 5.0/30).
- `public/robots.txt` + `public/sitemap.xml`.
- Local keywords woven into copy: deck builder Round Rock, pergola installation Round Rock TX,
  fence repair Georgetown TX, patio cover Austin, deck builder Pflugerville.

---

## Business facts (single source of truth)
- **Owner:** Jared Yandell, master carpenter · family owned & operated
- **Phone:** (512) 902-8877 · **tel:5129028877**
- **Address:** 1605 Old Settlement Rd, Round Rock, TX 78664 · Mon–Sat 8am–6pm
- **Rating:** 5.0★ · 30 Google reviews · 38 Yelp · 126 photos
- **Socials:** Instagram [@atxfence](https://www.instagram.com/atxfence), Facebook, Nextdoor
- ⚠️ **Do not** add a "years in business" / "since 2005" badge until Jared confirms it.
