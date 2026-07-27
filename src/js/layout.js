/* Shared chrome injected into every page: header, mobile menu, footer,
   sticky mobile call bar. Keeps 6 pages DRY and consistent. */

const PHONE = '(512) 902-8877';
const TEL = 'tel:5129028877';

const LOGO = `
<svg class="brand__mark" viewBox="0 0 44 44" fill="none" aria-hidden="true">
  <rect x="1.5" y="1.5" width="41" height="41" rx="11" fill="#B4632C"/>
  <rect x="1.5" y="1.5" width="41" height="41" rx="11" stroke="#8F4A1E" stroke-width="1.4"/>
  <g stroke="#F8F2E8" stroke-width="2.4" stroke-linecap="round">
    <path d="M12 30V17l10-6 10 6v13"/>
    <path d="M12 23h20M22 11.5V30"/>
  </g>
</svg>`;

const TRANSITION_LOGO = LOGO.replace('class="brand__mark"', 'class="page-transition__mark"');

const NAV_LINKS = [
  ['Home', 'index.html'],
  ['Services', 'services.html'],
  ['Our Work', 'gallery.html'],
  ['About', 'about.html'],
  ['Reviews', 'reviews.html'],
  ['Contact', 'contact.html'],
];

const ICON = {
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
};

function currentPage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path === '' ? 'index.html' : path;
}

export function mountLayout() {
  const here = currentPage();

  // Full-screen brand wipe played on every page load (reveal) and on
  // internal link clicks (cover, then navigate). See initPageTransitions().
  // Lives as static markup at the top of <body> in every page (not JS-created)
  // so it's part of the very first paint — no gap where raw content shows
  // through before the overlay exists. Fallback here only covers a page
  // that's missing the static block.
  if (!document.querySelector('.page-transition')) {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.setAttribute('aria-hidden', 'true');
    transition.innerHTML = `
      <div class="page-transition__inner">
        ${TRANSITION_LOGO}
        <span class="page-transition__name">ATX Fence &amp; Deck<small>Round Rock, TX</small></span>
      </div>`;
    document.body.prepend(transition);
  }

  const navLinksHtml = NAV_LINKS.map(
    ([label, href]) => `<a href="${href}"${href === here ? ' class="is-active" aria-current="page"' : ''}>${label}</a>`
  ).join('');

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="container">
      <nav class="nav" aria-label="Primary">
        <a class="brand" href="index.html" aria-label="ATX Fence and Deck — home">
          ${LOGO}
          <span class="brand__name">ATX Fence &amp; Deck<small>Round Rock, TX</small></span>
        </a>
        <div class="nav__links">${navLinksHtml}</div>
        <div class="nav__cta">
          <a class="nav__phone" href="${TEL}">${ICON.phone}<span>${PHONE}</span></a>
          <a class="btn" href="contact.html">Free Quote</a>
          <button class="nav__toggle" aria-label="Open menu" aria-expanded="false"><span></span></button>
        </div>
      </nav>
    </div>`;

  const drawer = document.createElement('div');
  drawer.className = 'mobile-menu';
  drawer.innerHTML = `
    ${NAV_LINKS.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
    <div class="mobile-menu__foot">
      <a class="btn btn--lg" href="contact.html">Get a Free Quote</a>
      <a class="nav__phone" href="${TEL}">${ICON.phone}<span>${PHONE}</span></a>
    </div>`;

  document.body.prepend(drawer);
  document.body.prepend(header);

  // Mobile menu toggle
  const toggle = header.querySelector('.nav__toggle');
  const closeMenu = () => { document.body.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // Sticky call bar (mobile)
  const callbar = document.createElement('div');
  callbar.className = 'call-bar';
  callbar.innerHTML = `
    <a class="btn btn--forest" href="${TEL}">${ICON.phone} Call Jared</a>
    <a class="btn btn--ghost" href="contact.html" style="background:var(--white)">Free Quote</a>`;
  document.body.appendChild(callbar);

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-col" data-reveal>
          <a class="brand" href="index.html">${LOGO}<span class="brand__name">ATX Fence &amp; Deck<small>Round Rock, TX</small></span></a>
          <p class="muted" style="margin-top:1.1rem;max-width:34ch">Family owned and operated. Master carpenter Jared Yandell builds decks, pergolas, patio covers and fences across the greater Austin metro — the kind you won't have to redo.</p>
          <div class="footer-social">
            <a href="https://www.instagram.com/atxfence" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg></a>
            <a href="https://nextdoor.com/" target="_blank" rel="noopener" aria-label="Nextdoor"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg></a>
          </div>
        </div>
        <div class="footer-col" data-reveal>
          <h4>Services</h4>
          <a href="services.html#decks">Decks</a>
          <a href="services.html#pergolas">Pergolas</a>
          <a href="services.html#patio-covers">Patio Covers</a>
          <a href="services.html#fences">Fences</a>
          <a href="services.html#gates">Gates &amp; Repairs</a>
          <a href="services.html#iron">Wrought Iron</a>
        </div>
        <div class="footer-col" data-reveal>
          <h4>Company</h4>
          <a href="about.html">About Jared</a>
          <a href="gallery.html">Our Work</a>
          <a href="reviews.html">Reviews</a>
          <a href="contact.html">Free Quote</a>
        </div>
        <div class="footer-col" data-reveal>
          <h4>Get in touch</h4>
          <a href="${TEL}">${PHONE}</a>
          <a href="https://maps.google.com/?q=1605+Old+Settlement+Rd+Round+Rock+TX+78664" target="_blank" rel="noopener">1605 Old Settlement Rd<br>Round Rock, TX 78664</a>
          <p class="muted" style="margin-top:0.6rem;font-size:0.86rem">Mon–Sat, 8am–6pm<br>Serving Round Rock, Georgetown, Pflugerville &amp; greater Austin.</p>
        </div>
      </div>
      <div class="footer-bottom" data-reveal data-reveal-delay="5">
        <span>© ${new Date().getFullYear()} ATX Fence and Deck. All rights reserved.</span>
        <span>5.0 ★ · 30 Google reviews · Round Rock, Texas</span>
      </div>
    </div>`;
  document.body.appendChild(footer);
}
