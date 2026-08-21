/**
 * The faint ground behind the hero.
 *
 * The reference scatters botanical mandalas across the whole band. Those belong
 * to a lawn-care company; Seiran's identity has no botanical motif and
 * inventing one would put a mark on the page that is not in the brand.
 *
 * These are contour lines instead — the concentric rings of a pressure chart or
 * a survey map. It is the one place the brand idea is allowed to surface as an
 * image, and it earns that: isobars are how a storm is read before it clears,
 * contours are how ground is understood before it is crossed. Both are what the
 * firm does. Abstract enough to stay quiet, specific enough not to be wallpaper.
 *
 * Three clusters at different scales and densities, spread across the band so
 * it reads as a ground rather than as decoration parked in the empty half. Each
 * is drifted off-centre — concentric rings on a shared centre read as a
 * bullseye, and the drift is what makes them read as terrain.
 */

type Cluster = {
  cx: number;
  cy: number;
  count: number;
  step: number;
  ratio: number;
  drift: number;
};

const clusters: Cluster[] = [
  { cx: 170, cy: 210, count: 7, step: 46, ratio: 0.78, drift: 7 },
  { cx: 640, cy: 330, count: 9, step: 58, ratio: 0.74, drift: -9 },
  { cx: 1090, cy: 150, count: 6, step: 52, ratio: 0.82, drift: 6 },
];

export function HeroPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1280 560"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="var(--color-navy)" strokeWidth="1">
        {clusters.map((c, ci) =>
          Array.from({ length: c.count }, (_, i) => {
            const rx = 40 + i * c.step;
            return (
              <ellipse
                key={`${ci}-${i}`}
                cx={c.cx + i * c.drift}
                cy={c.cy + i * (c.drift / 2)}
                rx={rx}
                ry={rx * c.ratio}
                opacity={Math.max(0.55 - i * 0.06, 0.07)}
              />
            );
          }),
        )}
      </g>
    </svg>
  );
}
