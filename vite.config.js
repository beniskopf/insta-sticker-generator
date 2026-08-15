import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  // Served from https://beniskopf.github.io/insta-sticker-generator/, so assets
  // need that prefix. The dev server applies it too and redirects "/" there,
  // so http://localhost:5178 keeps working.
  base: '/insta-sticker-generator/',
  server: { port: 5178 },
  // .ttf fonts are imported as URLs and fetched at runtime for opentype.js
  assetsInclude: ['**/*.ttf'],
});
