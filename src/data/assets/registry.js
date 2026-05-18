// Asset registry — maps Asset IDs from NEXS_Image_Asset_Tracker_v3_1_AI_Render.xlsx
// to placeholders / produced image files. When real assets land, set `src` to the file path
// or Sanity asset URL and the components will swap automatically.
//
// Priority: P0 (28 assets) → produce first for launch.

export const ASSETS = {
  // ---- Global ----
  "GLO-001": { title: "NEXS logo lockup", ratio: "vector", priority: "P0", status: "vector queued", src: null, alt: "NEXS logo with engineered for perfect surfaces descriptor" },
  "GLO-002": { title: "Line icon set", ratio: "1:1", priority: "P0", status: "vector queued", src: null, alt: "Minimal line icon set for NEXS film technology benefits" },
  "GLO-003": { title: "Footer background gradient", ratio: "16:9", priority: "P1", status: "to produce", src: null, alt: "Subtle dark footer background with premium light reflection" },
  "GLO-004": { title: "Red accent kit", ratio: "vector", priority: "P1", status: "to produce", src: null, alt: "NEXS red accent elements for UI highlights" },

  // ---- Homepage ----
  "HOME-001": { title: "Homepage hero car", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "White silver sports car in a clean studio for NEXS homepage hero" },
  "HOME-002": { title: "Headlight close-up thumbnail", ratio: "16:9", priority: "P1", status: "to produce", src: null, alt: "Close-up of a premium car headlight with clear reflective surface" },
  "HOME-003": { title: "Hydrophobic water beads thumbnail", ratio: "16:9", priority: "P1", status: "to produce", src: null, alt: "Water beads on a glossy paint protection film surface" },
  "HOME-004": { title: "Wheel and red caliper thumbnail", ratio: "16:9", priority: "P1", status: "to produce", src: null, alt: "Close-up of a premium wheel with subtle red brake accent" },
  "HOME-005": { title: "Red color close-up thumbnail", ratio: "16:9", priority: "P1", status: "to produce", src: null, alt: "Close-up of red color paint protection film on a car panel" },
  "HOME-006": { title: "Clear PPF category card", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Clear PPF category image showing water beads on a protected car surface" },
  "HOME-007": { title: "Matte PPF category card", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Matte PPF category image showing a satin gray car surface" },
  "HOME-008": { title: "Color PPF category card", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Color PPF category image showing a red premium car surface" },
  "HOME-009": { title: "Clear lineup film roll group", ratio: "4:3", priority: "P0", status: "AI render queued", src: null, alt: "Transparent film roll renders for the Clear PPF lineup" },
  "HOME-010": { title: "Matte section car and roll", ratio: "16:9", priority: "P1", status: "to produce", src: null, alt: "Matte PPF section image with a satin gray car and matte film rolls" },
  "HOME-012": { title: "Advanced film layer stack", ratio: "3:2", priority: "P0", status: "AI render queued", src: null, alt: "Multilayer film cross-section technical render" },

  // ---- Clear PPF ----
  "CLR-001": { title: "Clear PPF hero car", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Silver sports car on white studio floor for Clear PPF hero" },
  "CLR-002": { title: "Begin film roll", ratio: "4:3", priority: "P0", status: "AI render queued", src: null, alt: "Transparent Clear PPF Begin film roll" },
  "CLR-003": { title: "Prime film roll", ratio: "4:3", priority: "P0", status: "AI render queued", src: null, alt: "Transparent Clear PPF Prime film roll" },
  "CLR-004": { title: "Pro film roll", ratio: "4:3", priority: "P0", status: "AI render queued", src: null, alt: "Transparent Clear PPF Pro film roll" },
  "CLR-005": { title: "Ultimate film roll", ratio: "4:3", priority: "P0", status: "AI render queued", src: null, alt: "Transparent Clear PPF Ultimate film roll" },

  // ---- Matte ----
  "MC-001": { title: "Matte and Color hero split", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Split hero showing matte gray and color paint protection film" },
  "MAT-001": { title: "Matte Prime car image", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Satin gray car with Matte Prime PPF installed" },
  "MAT-002": { title: "Matte Pro car image", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Satin gray car with Matte Pro PPF installed" },
  "MAT-003": { title: "Matte Ultimate car image", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Premium matte car with Matte Ultimate PPF installed" },

  // ---- Color ----
  "COL-001": { title: "Color Begin swatch car", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Color Begin PPF on a vibrant car panel" },
  "COL-002": { title: "Color Prime swatch car", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Color Prime refined sophisticated color PPF" },
  "COL-003": { title: "Color Pro swatch car", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Color Pro premium deep color PPF" },
  "COL-004": { title: "Color Ultimate swatch car", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Color Ultimate luxurious color PPF" },
  "COL-005": { title: "Color Ultimate Carbon Fiber detail", ratio: "16:9", priority: "P0", status: "AI render queued", src: null, alt: "Close-up of premium Color Ultimate Carbon Fiber PPF" },

  // ---- Technology ----
  "TECH-001": { title: "Layer stack cross-section", ratio: "3:2", priority: "P0", status: "AI render queued", src: null, alt: "NEXS film layer stack cross-section" },
  "TECH-002": { title: "Self-healing detail", ratio: "4:3", priority: "P1", status: "to produce", src: null, alt: "Self-healing topcoat detail" },

  // ---- Dealer ----
  "DLR-001": { title: "Authorized installer workshop", ratio: "5:4", priority: "P0", status: "AI render queued", src: null, alt: "Professional installer in clean premium workshop" },

  // ---- About ----
  "ABT-001": { title: "About brand hero", ratio: "4:3", priority: "P1", status: "to produce", src: null, alt: "About NEXS brand hero" },

  // ---- Contact ----
  "CON-001": { title: "Showroom interior", ratio: "16:9", priority: "P2", status: "to produce", src: null, alt: "NEXS showroom interior" },
};

// Helper — returns asset metadata or placeholder fallback
export function getAsset(id) {
  return ASSETS[id] || { title: "Unknown asset", alt: id, src: null, ratio: "16:9" };
}
