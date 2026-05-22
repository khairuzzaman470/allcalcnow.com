// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://allcalcnow.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api/exchange-rates': {
          target: 'https://open.er-api.com',
          changeOrigin: true,
          rewrite: () => '/v6/latest/USD',
        },
      },
    },
  },
});
