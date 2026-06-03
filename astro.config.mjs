// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Shim to support legacy tailwind() integration syntax with Tailwind v4 Vite plugin
const tailwind = () => ({
  name: '@tailwindcss/vite-shim',
  hooks: {}
});

export default defineConfig({
  site: 'https://allcalcnow.com',
  trailingSlash: 'never',
  output: 'static',
  integrations: [sitemap(), tailwind()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api/exchange-rates': {
          target: 'https://open.er-api.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/exchange-rates/, '/v6/latest/USD'),
        },
      },
    },
  },
});
