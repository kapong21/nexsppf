// GA4 / GTM dataLayer push wrapper.
// No-op if dataLayer isn't present (e.g., during SSR or when NEXT_PUBLIC_GA_ID is unset).

type AnalyticsEvent =
  | { event: 'page_view'; page_path: string; page_title?: string; language?: string }
  | { event: 'cta_click'; cta_label: string; destination?: string; page_path?: string }
  | {
      event: 'lead_submit_contact' | 'lead_submit_quote' | 'lead_submit_dealer' | 'lead_submit_installer';
      product_interest?: string;
      source_page?: string;
    }
  | { event: 'line_click'; page_path?: string; cta_label?: string }
  | { event: 'faq_open'; faq_category?: string; question_id?: string };

type WindowWithDataLayer = Window & { dataLayer?: Array<Record<string, unknown>> };

export function trackEvent(payload: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  const w = window as WindowWithDataLayer;
  if (!w.dataLayer) w.dataLayer = [];
  w.dataLayer.push(payload);
}
