import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  // Relative asset URLs, so the same build works both at a domain root
  // (Cloudflare Pages) and under a repository subpath (GitHub Pages).
  base: './',
  server: { port: 5178 },
  // .ttf fonts are imported as URLs and fetched at runtime for opentype.js
  assetsInclude: ['**/*.ttf'],
});
