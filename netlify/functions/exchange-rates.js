/**
 * Netlify Function: /api/exchange-rates
 *
 * Proxies requests to open.er-api.com so the browser never has to call an
 * external origin in production. This also avoids CSP issues and lets us
 * cache the response at the edge for 1 hour.
 *
 * Local dev: Vite's proxy in astro.config.mjs handles /api/exchange-rates.
 * Production: This function handles it at the same URL path.
 */
export default async () => {
  const res = await fetch('https://open.er-api.com/v6/latest/USD');

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Upstream API error', status: res.status }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Cache rates for 1 hour — free tier updates daily so this is safe
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const config = {
  path: '/api/exchange-rates',
};
