/* Gallery: category filters (no 404s, no empty states) + accessible lightbox
   (Escape, click-outside, close button, prev/next). Works on the Home
   featured strip and the full Our Work page. */
import ScrollTrigger from 'gsap/ScrollTrigger';

export function initGallery() {
  const grid = document.querySelector('[data-gallery]');
  if (!grid) return;

  const tiles = [...grid.querySelectorAll('.tile')];
  const filters = document.querySelectorAll('[data-filter]');

  /* ---- Filtering ---- */
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      filters.forEach((b) => b.classList.toggle('is-active', b === btn));
      let shown = 0;
      tiles.forEach((tile) => {
        const match = cat === 'all' || tile.dataset.cat === cat;
        tile.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      const empty = document.querySelector('[data-gallery-empty]');
      if (empty) empty.style.display = shown === 0 ? 'block' : 'none';
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  });

  /* ---- Lightbox ---- */
  const box = document.querySelector('[data-lightbox]');
  if (!box) return;
  const frame = box.querySelector('[data-lightbox-frame]');
  const capTitle = box.querySelector('[data-lightbox-title]');
  const capMeta = box.querySelector('[data-lightbox-meta]');
  let visible = [];
  let idx = 0;

  function currentVisible() {
    return tiles.filter((t) => !t.classList.contains('is-hidden'));
  }
  function render() {
    const tile = visible[idx];
    if (!tile) return;
    const media = tile.querySelector('.ph, img, video');
    const clone = media.cloneNode(true);
    clone.style.aspectRatio = '3/2';
    clone.style.height = 'auto';
    frame.querySelector('[data-lightbox-media]').replaceChildren(clone);
    capTitle.textContent = tile.dataset.title || '';
    capMeta.textContent = tile.dataset.meta || '';
  }
  function open(tile) {
    visible = currentVisible();
    idx = visible.indexOf(tile);
    render();
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop?.();
  }
  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    window.__lenis?.start?.();
  }
  const step = (d) => { idx = (idx + d + visible.length) % visible.length; render(); };

  tiles.forEach((tile) => {
    tile.setAttribute('tabindex', '0');
    tile.setAttribute('role', 'button');
    tile.addEventListener('click', () => open(tile));
    tile.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(tile); } });
  });

  box.querySelector('[data-lightbox-close]').addEventListener('click', close);
  box.querySelector('[data-lightbox-prev]').addEventListener('click', () => step(-1));
  box.querySelector('[data-lightbox-next]').addEventListener('click', () => step(1));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
}
