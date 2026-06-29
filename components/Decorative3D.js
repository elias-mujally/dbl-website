function decorativeClass(baseClass, className) {
  return className ? `${baseClass} ${className}` : baseClass;
}

export function GlassPanel3D({ className = "" }) {
  return (
    <div className={decorativeClass("decor-3d glass-panel-3d", className)} aria-hidden="true">
      <span className="glass-panel-3d-grid" />
    </div>
  );
}

export function Orb3D({ className = "" }) {
  return <span className={decorativeClass("decor-3d orb-3d", className)} aria-hidden="true" />;
}

export function Ring3D({ className = "" }) {
  return (
    <svg
      className={decorativeClass("decor-3d ring-3d", className)}
      viewBox="0 0 220 120"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse className="ring-3d-outer" cx="110" cy="60" rx="96" ry="40" />
      <ellipse className="ring-3d-inner" cx="110" cy="60" rx="62" ry="25" />
    </svg>
  );
}

export function FloatingCube3D({ className = "" }) {
  return <span className={decorativeClass("decor-3d floating-cube-3d", className)} aria-hidden="true" />;
}

export function LayeredSheets3D({ className = "" }) {
  return (
    <div className={decorativeClass("decor-3d layered-sheets-3d", className)} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export function GlowLine({ className = "" }) {
  return <span className={decorativeClass("decor-3d glow-line", className)} aria-hidden="true" />;
}
