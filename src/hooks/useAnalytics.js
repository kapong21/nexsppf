// Lightweight analytics wrapper — pushes events to window.dataLayer (GA4 / GTM).
// Real GA4/Meta Pixel/TikTok scripts get inserted in index.html at production-launch time.

const safeLayer = () => {
  if (typeof window === "undefined") return null;
  if (!window.dataLayer) window.dataLayer = [];
  return window.dataLayer;
};

export function track(eventName, params = {}) {
  const layer = safeLayer();
  if (!layer) return;
  layer.push({ event: eventName, ...params });
}

// Helper: wrap button onClick to emit cta_click event.
export function trackCTA(label, destination, onClick) {
  return (e) => {
    track("cta_click", { cta_label: label, destination, page_path: window.location.hash || "/" });
    onClick && onClick(e);
  };
}
