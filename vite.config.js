import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: { port: 5178 },
  // .ttf fonts are imported as URLs and fetched at runtime for opentype.js
  assetsInclude: ['**/*.ttf'],
});
