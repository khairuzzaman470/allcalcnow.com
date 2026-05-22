const SITE_URL = 'https://allcalcnow.com';

/** JSON-LD WebApplication schema for calculator tool pages (Prompt 17). */
export function webApplicationSchema(
  calculatorName: string,
  pathname: string,
  description: string,
): Record<string, unknown> {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${calculatorName} — AllCalcNow`,
    url: `${SITE_URL}${path}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description,
    provider: { '@type': 'Organization', name: 'AllCalcNow', url: SITE_URL },
  };
}
