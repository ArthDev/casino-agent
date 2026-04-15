/**
 * Client-side affiliate click tracking.
 *
 * Sends click events to analytics (GA4 or custom endpoint).
 * This runs in the browser — keep it lightweight.
 */

export interface ClickEvent {
  partnerId: string;
  placement: string; // e.g. 'review_cta', 'bonus_table', 'comparison'
  pageUrl: string;
}

/**
 * Track an affiliate click. Fires a GA4 event if gtag is available,
 * otherwise falls back to navigator.sendBeacon to a custom endpoint.
 */
export function trackAffiliateClick(event: ClickEvent): void {
  // GA4 custom event
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'affiliate_click', {
      partner_id: event.partnerId,
      placement: event.placement,
      page_url: event.pageUrl,
    });
    return;
  }

  // Fallback: beacon to custom endpoint (configure when analytics is set up)
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon(
      '/api/track',
      JSON.stringify(event),
    );
  }
}
