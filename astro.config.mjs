// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  site: 'https://example.com', // TODO: replace with production domain
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
