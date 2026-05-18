// useSEO — sets document.title + meta description + canonical link
// + injects JSON-LD organization schema once at app mount.

import React from 'react';
import { SEO, ORGANIZATION_LD } from '../data/seo.js';

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

let orgLDInjected = false;
function injectOrgLD() {
  if (orgLDInjected) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(ORGANIZATION_LD);
  document.head.appendChild(script);
  orgLDInjected = true;
}

export function useSEO(route) {
  React.useEffect(() => {
    injectOrgLD();
    const meta = SEO[route] || SEO.home;
    document.title = meta.title;
    setMeta("description", meta.description);
    setMeta("keywords", meta.keywords);
    setMeta("og:title", meta.title, "property");
    setMeta("og:description", meta.description, "property");
    setMeta("og:url", `${window.location.origin}/#${route}`, "property");

    // Hash-based canonical for now — Sprint 5 should migrate to history routing
    setCanonical(`${window.location.origin}/#${route}`);

    // GA4 page_view
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "page_view",
        page_path: `/${route}`,
        page_title: meta.title,
        language: document.documentElement.lang,
      });
    }
  }, [route]);
}
