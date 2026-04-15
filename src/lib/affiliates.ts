/**
 * Centralized affiliate link management.
 *
 * Each partner is defined with a base URL and default tracking parameters.
 * Casino content references a partner key; the outbound URL is built here
 * so tracking params stay consistent and easy to update in one place.
 */

export interface AffiliatePartner {
  name: string;
  baseUrl: string;
  defaultParams: Record<string, string>;
}

/**
 * Register affiliate partners here. The key is used in content frontmatter
 * via the `affiliateUrl` field, or can be looked up programmatically.
 */
export const partners: Record<string, AffiliatePartner> = {
  // Example partner — replace with real affiliate program details
  'casino-exemple': {
    name: 'Casino Exemple',
    baseUrl: 'https://example.com/go/casino-exemple',
    defaultParams: {
      utm_source: 'casinoguide',
      utm_medium: 'affiliate',
      utm_campaign: 'review',
    },
  },
};

/**
 * Build a tracked affiliate URL from a partner key and optional overrides.
 */
export function buildAffiliateUrl(
  partnerKey: string,
  overrides: Record<string, string> = {},
): string {
  const partner = partners[partnerKey];
  if (!partner) return '#';

  const url = new URL(partner.baseUrl);
  const allParams = { ...partner.defaultParams, ...overrides };
  for (const [key, value] of Object.entries(allParams)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

/**
 * Build a cloaked redirect URL that goes through /go/[partner].
 * The redirect page handles tracking before forwarding.
 */
export function getCloakedUrl(partnerKey: string): string {
  return `/go/${partnerKey}/`;
}
