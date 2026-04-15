// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  site: 'https://dev.casinoenligne.paris',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
