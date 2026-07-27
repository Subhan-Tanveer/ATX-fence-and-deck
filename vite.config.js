import { defineConfig } from 'vite';
import { resolve } from 'path';

// Multi-page static site. Each page is its own HTML entry; shared JS/CSS
// live in /src and are bundled + code-split by Vite for a fast Lighthouse score.
export default defineConfig({
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        about: resolve(__dirname, 'about.html'),
        reviews: resolve(__dirname, 'reviews.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
      output: {
        manualChunks: {
          gsap: ['gsap'],
          lenis: ['lenis'],
        },
      },
    },
  },
});
