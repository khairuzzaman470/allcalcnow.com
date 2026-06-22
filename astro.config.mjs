// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Shim to support legacy tailwind() integration syntax with Tailwind v4 Vite plugin
const tailwind = () => ({
  name: '@tailwindcss/vite-shim',
  hooks: {}
});

// Mapping of future pages to their publish ISO dates
const postPublishDates = {
  'https://allcalcnow.com/blog/simple-interest-vs-compound-interest': '2026-06-23',
  'https://allcalcnow.com/blog/fixed-vs-variable-rate-loans': '2026-06-23',
  'https://allcalcnow.com/blog/apr-vs-interest-rate': '2026-06-23',
  'https://allcalcnow.com/blog/how-to-calculate-debt-to-income-ratio': '2026-06-23',
  'https://allcalcnow.com/blog/renting-vs-buying-home': '2026-06-23',

  'https://allcalcnow.com/blog/how-to-calculate-discount': '2026-06-24',
  'https://allcalcnow.com/blog/metric-to-imperial-conversion': '2026-06-24',
  'https://allcalcnow.com/blog/how-to-calculate-fuel-cost': '2026-06-24',
  'https://allcalcnow.com/blog/how-to-calculate-gpa': '2026-06-24',
  'https://allcalcnow.com/blog/international-tipping-guide': '2026-06-24',

  'https://allcalcnow.com/blog/markup-vs-margin': '2026-06-25',
  'https://allcalcnow.com/blog/how-to-split-bill-fairly': '2026-06-25',
  'https://allcalcnow.com/blog/unit-conversion-cheat-sheet': '2026-06-25',
  'https://allcalcnow.com/blog/how-to-calculate-price-per-unit': '2026-06-25',
  'https://allcalcnow.com/blog/manual-percentage-math-vs-calculator': '2026-06-25',

  'https://allcalcnow.com/blog/body-fat-percentage-methods': '2026-06-26',
  'https://allcalcnow.com/blog/bmi-vs-body-fat-percentage': '2026-06-26',
  'https://allcalcnow.com/blog/how-to-calculate-daily-calorie-needs': '2026-06-26',
  'https://allcalcnow.com/blog/healthy-weight-range-by-height': '2026-06-26',
  'https://allcalcnow.com/blog/how-to-track-body-composition': '2026-06-26',

  'https://allcalcnow.com/blog/how-to-calculate-age-from-date-of-birth': '2026-06-27',
  'https://allcalcnow.com/blog/how-to-calculate-days-between-two-dates': '2026-06-27',
  'https://allcalcnow.com/blog/pregnancy-due-date-calculation': '2026-06-27',
  'https://allcalcnow.com/blog/how-to-calculate-work-tenure': '2026-06-27',
  'https://allcalcnow.com/blog/leap-years-explained': '2026-06-27',
};

const todayISO = new Date().toISOString().split('T')[0];

export default defineConfig({
  site: 'https://allcalcnow.com',
  trailingSlash: 'never',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => {
        // Strip trailing slash from page URL to look up in mapping
        const cleanPage = page.endsWith('/') ? page.slice(0, -1) : page;
        const publishDate = postPublishDates[cleanPage];
        if (publishDate && publishDate > todayISO) {
          return false; // Exclude from sitemap if in the future
        }
        return true;
      }
    }),
    tailwind()
  ],
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
