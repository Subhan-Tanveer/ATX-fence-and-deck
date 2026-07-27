# 🪵 AI Image & Video Prompt Kit — ATX Fence and Deck ("Warm Cedar")

Everything you need to replace the placeholder panels with on-brand imagery that
matches the site's **warm, honest, daylight** look — the feel of a real family
carpenter's work, not a luxury magazine.

**Read the brand rule first (from the build brief):**
> Bias **hard** toward real photography. Jared has 126 real project photos on Yelp
> plus an active Instagram (@atxfence). Real images of his actual work will always
> beat generated ones for a local trade business — and presenting another builder's
> AI render as *his* work would be dishonest.

So AI images here are **development scaffolding**, allowed only in a few slots.
Everything a visitor would read as *documentation of his real work* must be a
**real photo** before launch.

| Slot | AI placeholder OK? |
|---|---|
| Hero background / hero video | ✅ as placeholder — replace with real before launch |
| Service card thumbnails | ✅ as placeholder |
| Texture / background accents | ✅ |
| **Gallery / "Our Work" tiles** | ❌ real photos only |
| **Before / After pair** | ❌ real project only — never fake a transformation |
| **Jared's portrait & any headshots** | ❌ real photo only |

Every placeholder in the code is tagged `data-ph="Placeholder — …"` and commented
`<!-- PLACEHOLDER -->`, so nothing ships by accident. See `public/media/README.txt`
for exactly how to swap a placeholder for a real `<img>` or `<video>`.

---

## 🧰 Tools & workflow

- **Images:** Midjourney v6.1, Flux 1.1 Pro, Google Imagen / Gemini, DALL·E 3, Ideogram.
  - Midjourney: append `--ar {RATIO} --style raw --v 6.1`
- **Video (image-to-video):** Runway Gen-3, Kling 1.6, Luma Dream Machine, Google Veo, Pika.
  - Generate the **starter image first**, then upload it + paste the **video prompt**.
- **Specs:** heroes/video = **1920×1080 (16:9)**; keep clips **10–15s, muted, ≥1080p**,
  export **MP4 (H.264)**. Compress stills to optimized JPG/WebP (< 350 KB each).
- **Where files go:** drop into `public/media/`, then swap the placeholder `<div class="ph">`
  for a real `<img>`/`<video>` (see `public/media/README.txt`).

---

## 🎛️ GLOBAL STYLE BLOCK — paste at the END of EVERY image prompt

```
— warm natural daylight (late-afternoon golden hour or bright open shade), honest
documentary real-estate photography, real cedar and pressure-treated lumber with
rich natural wood grain, a lived-in Central Texas / Hill Country backyard, clear
Texas sky, genuine and unstaged (not a glossy magazine set), soft warm color and
gentle contrast, palette of cedar brown, warm cream, sage green and a clay-orange
accent, shot on a full-frame camera at a realistic aperture, crisp natural detail,
photorealistic, 8k, no people (unless noted), no text, no logos, no watermark.
Aspect ratio {RATIO}.
```

> **Tone check:** if a result looks dark, moody, glossy, or "premium-lifestyle,"
> it's wrong for this brand. We want honest daylight and real wood. Warm, not fancy.

---

# 📸 PART 1 — IMAGES

### 1. Home hero — poster still · 16:9  →  `/media/home-hero.jpg`
```
A warm, inviting Central Texas backyard in late-afternoon golden light: a freshly
built cedar deck with a simple pergola, clean railings, a couple of comfortable
outdoor chairs, a live oak throwing soft shadows, a modest one-story home behind.
Real, lived-in, welcoming — not luxury. Wide, slightly low establishing angle.
[+ GLOBAL STYLE BLOCK, RATIO 16:9]
```
> Replace with a real photo of one of Jared's finished decks before launch.

### 2. Craftsmanship detail — 3:2  →  `/media/craft-detail.jpg`
```
Close-up of a carpenter's hands driving a hidden fastener into a cedar deck board
with a cordless impact driver, fine sawdust catching warm daylight, honest work
gloves, rich wood grain, shallow realistic depth of field, documentary feel.
[+ GLOBAL STYLE BLOCK, RATIO 3:2]
```

### 3–8. Service card thumbnails · 16:11  →  `/media/svc-*.jpg`
Use each line + the global block.
- **Decks — `svc-decks.jpg`:** `A tidy multi-level cedar-and-composite backyard deck with clean railings and hidden fasteners, warm afternoon sun raking across the boards, three-quarter angle.`
- **Pergolas — `svc-pergolas.jpg`:** `A simple, well-proportioned cedar pergola over a back patio, dappled shade on the ground, a couple of chairs beneath it, warm daylight.`
- **Patio Covers — `svc-patio.jpg`:** `A covered back patio with a tongue-and-groove cedar ceiling and a ceiling fan, comfortable seating, bright open shade, home wall behind.`
- **Fences — `svc-fences.jpg`:** `A dead-straight horizontal cedar-slat privacy fence, freshly stained warm wood, long low afternoon shadows across a neat Texas backyard.`
- **Gates & Repairs — `svc-gates.jpg`:** `A custom cedar privacy gate with clean steel hardware that lines up perfectly, set into a matching fence, warm daylight, honest craftsmanship.`
- **Wrought Iron — `svc-iron.jpg`:** `A custom black powder-coated wrought-iron porch railing with clean welds and simple pickets, mounted on a cedar porch, warm daylight, crisp detail.`

### 9. "Why us" finished deck — 4:3  →  `/media/deck-golden.jpg`
```
A finished cedar backyard deck at warm golden hour, string lights just glowing on,
simple furniture, potted plants, a relaxed and genuinely welcoming family feel —
grounded and real, not staged luxury. Straight-on wide shot. [+ GLOBAL STYLE
BLOCK, RATIO 4:3]
```

### 10. Service-area / Hill Country — 4:3  →  `/media/round-rock.jpg`
```
A wide, warm view of a tidy Round Rock / Texas Hill Country residential backyard
with a cedar fence and live oaks, clear afternoon sky, calm and homey.
[+ GLOBAL STYLE BLOCK, RATIO 4:3]
```

### 11. Interior page heroes · 16:9 (use as posters behind the page titles)
Reuse the global block for each:
- **Services head — `head-services.jpg`:** `Assorted freshly cut cedar boards and a framing square laid out on sawhorses in warm daylight, honest jobsite.`
- **Gallery head — `head-gallery.jpg`:** `A sweeping wide shot of a beautiful finished cedar deck and pergola in a Texas backyard, warm afternoon light.`
- **Reviews head — `head-reviews.jpg`:** `A welcoming finished backyard deck with comfortable chairs in warm evening light, the kind of place neighbors compliment.`
- **Contact head — `head-contact.jpg`:** `A carpenter's warm daylight jobsite: cedar boards, tape measure, and a truck tailgate, ready to start, honest and approachable.`
- **About head — `head-about.jpg`:** `A warm, tidy woodworking workspace with cedar boards, hand tools on a pegboard, and sawdust in a shaft of daylight — a real working carpenter's shop.`

### 12. Social share card · 1200×630  →  `/media/og-home.jpg`
```
A clean, warm hero shot of a finished cedar deck and pergola in a Texas backyard at
golden hour, plenty of open sky at the top for a title overlay. [+ GLOBAL STYLE
BLOCK, RATIO 1.91:1]
```

---

## ❌ REAL-PHOTO SLOTS (prompts provided ONLY as dev scaffolding — do not ship)

> These exist so the layout looks right while you gather Jared's real photos.
> **Replace every one with a real photo before launch.** Never present an AI image
> in these slots as documentation of his actual work.

### A. Jared's portrait · 4:5  →  `/media/jared-portrait.jpg`  *(use a REAL photo)*
```
Authentic, friendly portrait of a 40-something master carpenter standing on a
freshly built cedar deck in warm afternoon light, clean work shirt, relaxed and
trustworthy, arms comfortably crossed, genuine slight smile, real and grounded.
[+ GLOBAL STYLE BLOCK, RATIO 4:5]
```

### B. Signature BEFORE / AFTER pair *(use a REAL project — never fake a transformation)*
If you must scaffold during development, generate the **AFTER first**, then make the
**BEFORE** from the *exact same camera angle & framing* so the wipe lines up.
- **AFTER — `after.jpg` · 16:9:** `A finished cedar backyard deck with a simple pergola and clean railings in warm afternoon light, comfortable furniture, tidy landscaping, photographed straight-on from the back of the yard, wide shot. [+ GLOBAL STYLE BLOCK, RATIO 16:9]`
- **BEFORE — `before.jpg` · 16:9 (identical framing):** `The exact same backyard from the exact same camera angle and framing, but BEFORE any deck — a bare patchy dirt-and-grass yard, plain back door, no deck, no landscaping, flat daylight. Match the house, fence line and horizon of the reference image precisely. [+ GLOBAL STYLE BLOCK, RATIO 16:9]`

### C. Gallery / "Our Work" tiles *(REAL photos only)*
Sort Jared's 126 real photos into: **decks, pergolas, patio, fences, gates, iron**
and set each tile's `data-cat` to match (see `gallery.html`). No AI here.

---

# 🎬 PART 2 — VIDEO (starter image + video prompt)

**Workflow:** (1) generate the **starter image**, (2) upload it into an image-to-video
tool and paste the **video prompt**, (3) export a **10–15s muted MP4**, (4) drop it in
`public/media/` and swap the hero placeholder for a `<video>` (see README.txt).
> Optional & low priority. Real phone footage of a build in progress beats any
> generated clip. If you have none, ship the still — don't fake his work with stock.

### 🎥 V1 — HOME HERO LOOP  →  `/media/home-hero.mp4`
**Starter image:**
```
Warm wide establishing shot of a finished cedar backyard deck with a simple pergola
in late-afternoon Texas golden light, comfortable chairs, a live oak throwing soft
shadows, a modest home behind, clear warm sky. Honest and welcoming, photorealistic,
16:9.
```
**Video prompt:**
```
Very slow, gentle push-in across the deck. Soft parallax between the foreground
railing and the background oak, warm sunlight slowly shifting across the cedar
boards, leaves swaying lightly in a breeze. Calm, unhurried, homey — a "come sit out
back" feeling. No people, no camera shake, seamless loop. 12 seconds.
```

### 🎥 V2 — BUILD-IN-PROGRESS (About / craftsmanship ambient)  →  `/media/craft.mp4`
**Starter image:**
```
A carpenter's hands setting a cedar deck board in warm daylight, cordless driver
nearby, fine sawdust in the air, rich wood grain, honest jobsite, photorealistic,
16:9.
```
**Video prompt:**
```
Slow macro: the driver gently seats a hidden fastener, sawdust drifts slowly through
warm daylight, a soft rack focus from the screw to the wood grain. Tactile, honest,
craftsmanship-documentary feel. No fast motion, no shake. 10 seconds, subtle loop.
```

### 🎥 V3 — FENCE LINE (optional ambient)  →  `/media/fence.mp4`
**Starter image:**
```
A dead-straight horizontal cedar-slat privacy fence in warm late-afternoon light,
long slat shadows across a tidy Texas backyard, freshly stained wood, photorealistic,
16:9.
```
**Video prompt:**
```
Slow tracking glide along the fence line, warm slat shadows sliding across the frame,
light breeze moving nearby grass. Grounded, warm, honest. No people, no shake,
loopable. 12 seconds.
```

---

# 🎬 PART 3 — PER-PAGE HERO VIDEO CLIPS (starter image + video prompt)

One hero clip per page. Each hero has a dark warm scrim over it for text legibility,
so keep the **upper-left / lower-left calmer and a touch darker** (that's where the
headline sits) and the warm detail toward the right. All starter images are **16:9**;
all clips **10–15s, muted, ≥1080p, H.264 MP4**, one slow camera move, seamless loop.
Drop each in `public/media/` and swap the page's hero placeholder for a `<video>`.

### 🏠 HOME  →  `/media/home-hero.mp4`
**Starter image:**
```
Warm wide establishing shot of a finished cedar backyard deck with a simple pergola in
late-afternoon Texas golden light, comfortable chairs, a live oak throwing soft shadows
across the left of the frame, a modest one-story home behind, clear warm sky with open
space upper-left for a headline. Honest and welcoming, photorealistic, 16:9.
```
**Video prompt:**
```
Very slow, gentle push-in across the deck. Soft parallax between the foreground railing
and the background oak, warm sunlight slowly shifting across the cedar boards, leaves
swaying lightly in a breeze. Calm, unhurried, homey. No people, no camera shake,
seamless loop. 12 seconds.
```

### 🛠️ SERVICES  →  `/media/services-hero.mp4`
**Starter image:**
```
An honest carpenter's jobsite in warm daylight: freshly cut cedar boards and a framing
square laid out on sawhorses, a tool belt and cordless driver resting nearby, sawdust
softly catching light, tidy and real, open darker space in the upper-left for a
headline. Photorealistic, 16:9.
```
**Video prompt:**
```
Slow lateral slide across the laid-out cedar boards and tools, warm daylight drifting,
fine sawdust floating gently in the air, a soft rack focus from the framing square to
the wood grain. Grounded, capable, unhurried. No people, no shake, loopable. 12 seconds.
```

### 🖼️ OUR WORK / GALLERY  →  `/media/gallery-hero.mp4`
**Starter image:**
```
A sweeping wide hero shot of a beautiful finished cedar deck and pergola in a Texas
backyard at warm late-afternoon light, clean railings, tidy landscaping, live oaks, a
sense of a real completed project, calmer shaded area lower-left for a headline.
Photorealistic, 16:9.
```
**Video prompt:**
```
Slow cinematic crane-up that gradually reveals more of the finished deck and yard, warm
sun sweeping across the boards, gentle breeze in nearby foliage, soft natural light
shift. Proud, calm, aspirational-but-honest. No people, no shake, loopable. 13 seconds.
```

### 👤 ABOUT  →  `/media/about-hero.mp4`
**Starter image:**
```
A warm, tidy woodworking workspace: cedar boards on a workbench, hand tools on a
pegboard, a hand plane mid-board, sawdust drifting in a shaft of daylight from a side
window, honest and lived-in, darker calm zone upper-left for a headline. Photorealistic,
16:9.
```
**Video prompt:**
```
Very slow push-in toward the workbench and tools, sawdust particles drifting slowly
through the warm light beam, a subtle glint moving along a hand plane. Quiet, honest,
craftsmanship-documentary feel. No fast motion, no shake. 11 seconds, subtle loop.
```

### ⭐ REVIEWS  →  `/media/reviews-hero.mp4`
**Starter image:**
```
A welcoming finished backyard cedar deck with comfortable chairs and string lights just
beginning to glow at warm early evening, the kind of inviting place neighbors compliment,
soft calm shaded area lower-left for a headline. Photorealistic, 16:9.
```
**Video prompt:**
```
Slow, smooth push-in toward the cozy deck as the string lights gently glow warmer and the
evening light deepens, faint breeze in the trees. Warm, grateful, "come sit a while"
feeling. No people, no shake, seamless loop. 12 seconds.
```

### 📞 CONTACT  →  `/media/contact-hero.mp4`
**Starter image:**
```
A carpenter's warm daylight jobsite, ready to start: cedar boards stacked on a truck
tailgate, a tape measure and pencil, work gloves, an open honest scene with a Texas
backyard softly blurred behind, calm darker space upper-left for a headline.
Photorealistic, 16:9.
```
**Video prompt:**
```
Slow gentle dolly toward the tailgate and tools, warm daylight shifting, a light breeze
moving grass in the soft background, an inviting "let's get started" mood. Approachable,
honest, calm. No people, no shake, loopable. 11 seconds.
```

> **Wiring tip:** each hero currently shows a placeholder `<div class="ph …">`. Replace it with:
> ```html
> <video autoplay muted loop playsinline poster="/media/PAGE-hero.jpg">
>   <source src="/media/PAGE-hero.mp4" type="video/mp4">
> </video>
> ```
> Export a matching still (first frame) as the `poster` so it shows instantly and stays
> as the fallback if the video can't play.

---

## ✅ Pre-launch checklist
- [ ] Hero placeholder replaced with a real photo (or real 10–15s muted loop).
- [ ] All gallery tiles are **real** photos, sorted into the right `data-cat`.
- [ ] Before/After is a **real** project, identical framing on both frames.
- [ ] Jared's portrait is a **real** photo.
- [ ] Every image has `alt` text and explicit `width`/`height`; below-fold uses `loading="lazy"`.
- [ ] Stills < 350 KB; videos muted, ≥1080p, H.264 MP4.
- [ ] `og-home.jpg` (1200×630) set for social sharing.
- [ ] Search the code for `data-ph="Placeholder` — zero results means nothing fake shipped.
