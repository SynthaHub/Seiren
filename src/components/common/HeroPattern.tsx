/**
 * The faint field behind the hero.
 *
 * The reference uses botanical line-art, which belongs to a lawn-care company
 * and would be a motif Seiran's identity does not have. This draws contour
 * lines instead — the concentric rings of a pressure chart or a survey map.
 *
 * It is the one place the brand idea is allowed to surface as an image:
 * isobars are how a storm is read before it clears, and contour lines are how
 * terrain is understood before it is crossed. Both are what the firm does.
 * Abstract enough to be quiet, specific enough not to be wallpaper.
 *
 * Kept at very low opacity and marked decorative — it must never compete with
 * the headline, and it carries no information a reader needs.
 */
export function HeroPattern({ className }: { className?: string }) {
  // Concentric, progressively offset ellipses. The drift keeps the rings from
  // reading as a bullseye, which is what makes them feel like contours.
  const rings = Array.from({ length: 9 }, (_, i) => ({
    rx: 90 + i * 62,
    ry: 70 + i * 48,
    cx: 520 + i * 9,
    cy: 250 + i * 5,
    opacity: 0.5 - i * 0.045,
  }));

  return (
    <svg
      className={className}
      viewBox="0 0 900 520"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="var(--color-navy)" strokeWidth="1">
        {rings.map((r) => (
          <ellipse
            key={r.rx}
            cx={r.cx}
            cy={r.cy}
            rx={r.rx}
            ry={r.ry}
            opacity={Math.max(r.opacity, 0.06)}
          />
        ))}
      </g>
    </svg>
  );
}
