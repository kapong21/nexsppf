// Maps legacy route IDs (from Vite hash router) to clean Next.js paths.
// Used by useGo() and href() so existing components don't need rewrites.

export const ROUTE_TO_PATH: Record<string, string> = {
  'home': '/',
  'clear-ppf': '/clear-ppf',
  'matte-ppf': '/matte-ppf',
  'color-ppf': '/color-ppf',
  'technology': '/technology',
  'compare': '/compare',
  'for-dealers': '/for-dealers',
  'about-nexs': '/about',
  'faq': '/faq',
  'contact': '/contact',
  'warranty': '/warranty',
  'support-warranty': '/support/warranty',
  'support-inspection': '/support/inspection',
  // legacy stubs — kept so onClick handlers don't 404 in components we still mount
  'login': '/contact',
  'admin': '/contact',
};

export function href(route: string): string {
  return ROUTE_TO_PATH[route] ?? `/${route}`;
}
