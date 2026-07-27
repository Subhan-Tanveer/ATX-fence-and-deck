DROP REAL MEDIA HERE
=====================

Every image and video on the site is currently a clearly-labeled procedural
PLACEHOLDER (warm wood panels tagged "Placeholder — ..."). Replace them with
Jared's real project photos before launch.

HOW TO SWAP:
1. Export/collect real photos (see AI_IMAGE_AND_VIDEO_PROMPTS.md for the shot list
   and, if you need scaffolding, AI prompts to match the look).
2. Drop files in this folder, e.g.:
     /media/home-hero.jpg
     /media/home-hero.mp4        (optional 10–15s muted loop)
     /media/before.jpg  /media/after.jpg   (identical framing!)
     /media/deck-1.jpg ... etc.
3. In the HTML, replace the placeholder element:
     <div class="ph ..." data-ph="Placeholder — deck"></div>
   with a real image:
     <img src="/media/deck-1.jpg" alt="Two-level cedar deck in Round Rock, TX"
          width="1200" height="800" loading="lazy" decoding="async" />
   (Always set width/height + alt text. Use loading="lazy" below the fold.)
4. For the hero video, replace the hero placeholder div with:
     <video autoplay muted loop playsinline poster="/media/home-hero.jpg">
       <source src="/media/home-hero.mp4" type="video/mp4">
     </video>

NAMING SUGGESTIONS (match the shot list in AI_IMAGE_AND_VIDEO_PROMPTS.md):
  home-hero.jpg / .mp4, craft-detail.jpg, jared-portrait.jpg,
  before.jpg, after.jpg, deck-1..n.jpg, pergola-1..n.jpg, fence-1..n.jpg,
  patio-1..n.jpg, gate-1..n.jpg, iron-1..n.jpg, og-home.jpg (1200×630 social card)
