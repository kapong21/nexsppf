import React from 'react';
import { getAsset } from '../data/assets/registry.js';

// Shared UI bits — placeholders, icons, brand mark
export const Mark = ({ showDescriptor = false }) => (
  <span className="nav-brand" style={{ flexDirection: showDescriptor ? "column" : "row", alignItems: showDescriptor ? "flex-start" : "center" }}>
    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span className="mark">N</span>
      <span>NEXS</span>
    </span>
    {showDescriptor && (
      <span className="descriptor">ENGINEERED FOR PERFECT SURFACES</span>
    )}
  </span>
);

export const ImgPh = ({ label, dark, ratio = "16 / 10", className = "", style, assetId }) => {
  // If assetId given + produced (src present), render <img>. Otherwise show placeholder.
  const asset = assetId ? getAsset(assetId) : null;

  if (asset && asset.src) {
    return (
      <img
        src={asset.src}
        alt={asset.alt || label || ""}
        loading="lazy"
        className={className}
        style={{ aspectRatio: ratio.replace(" ", ""), objectFit: "cover", borderRadius: "var(--nexs-radius-md)", ...style }}
      />
    );
  }

  return (
    <div
      className={`imgph ${dark ? "imgph-dark" : ""} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      role="img"
      aria-label={asset?.alt || label || ""}
    >
      <span className="imgph-label">{assetId ? `${assetId} · ${label || asset?.title || ""}` : label}</span>
    </div>
  );
};

// Minimal stroke icons (24x24)
export const Icon = ({ name, size = 20, stroke = 1.4 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "arrow-right": return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "arrow-up-right": return <svg {...p}><path d="M7 17 17 7M9 7h8v8"/></svg>;
    case "check": return <svg {...p}><path d="M5 12.5 10 17 19 7"/></svg>;
    case "shield": return <svg {...p}><path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3z"/></svg>;
    case "qr": return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4"/></svg>;
    case "spark": return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case "globe": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>;
    case "store": return <svg {...p}><path d="M4 8 5 4h14l1 4M4 8v12h16V8M4 8h16M9 14h6"/></svg>;
    case "menu": return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "x": return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "lock": return <svg {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>;
    case "phone": return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 1-2z"/></svg>;
    case "mail": return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case "map": return <svg {...p}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>;
    case "car": return <svg {...p}><path d="M5 17V11l2-5h10l2 5v6M5 17h14M5 17v2M19 17v2M7 14h2M15 14h2"/></svg>;
    case "droplet": return <svg {...p}><path d="M12 3c4 5 7 8 7 12a7 7 0 0 1-14 0c0-4 3-7 7-12z"/></svg>;
    case "sparkle": return <svg {...p}><path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18"/></svg>;
    case "layers": return <svg {...p}><path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5M3 18l9 5 9-5"/></svg>;
    case "clipboard": return <svg {...p}><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9z"/></svg>;
    case "history": return <svg {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>;
    case "users": return <svg {...p}><circle cx="9" cy="8" r="3.5"/><path d="M2.5 19c.5-3.5 3.5-5.5 6.5-5.5s6 2 6.5 5.5"/><circle cx="17" cy="9" r="3"/><path d="M16 14c2.5.5 4.5 2.5 5 5"/></svg>;
    case "chart": return <svg {...p}><path d="M4 19V5M4 19h16M8 16v-5M12 16V9M16 16v-3"/></svg>;
    case "wand": return <svg {...p}><path d="m4 20 12-12M14 6l4 4M16 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>;
    default: return null;
  }
};

export const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>;

// Subtle decorative QR mark (visual only, not scannable)
export const QrGlyph = ({ size = 96 }) => {
  const cells = [
    "1110111","1010001","1011101","1010001","1110111",
    "0000000","1011010","1100101","1010110","1101001",
    "1110010","1011101","0010011","1011010","1110100"
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" shapeRendering="crispEdges">
      <rect width="15" height="15" fill="white"/>
      {cells.map((row, y) => row.split("").map((c, x) =>
        c === "1" ? <rect key={x+"-"+y} x={x} y={y} width="1" height="1" fill="#1D1D1F"/> : null
      ))}
      {[[0,0],[8,0],[0,8]].map(([fx,fy],i)=>(
        <g key={i}>
          <rect x={fx} y={fy} width="7" height="7" fill="white"/>
          <rect x={fx} y={fy} width="7" height="7" fill="none" stroke="#1D1D1F" strokeWidth="1"/>
          <rect x={fx+2} y={fy+2} width="3" height="3" fill="#1D1D1F"/>
        </g>
      ))}
    </svg>
  );
};
