import { cn } from "@/lib/cn";

/**
 * A full-bleed band with a constrained inner container.
 *
 * `tone` is how the clearing is built. Each page is a stack of Sections that
 * moves navy -> parchment -> white down the scroll. Setting tone="navy" applies
 * the `.on-navy` class, which re-resolves every semantic token inside it, so
 * nothing nested needs a navy variant — including the accent, which becomes
 * Gold Leaf only here, where it is legal.
 *
 * See .claude/skills/hawi-design/references/tokens.md §5.
 */

type SectionTone = "navy" | "parchment" | "white";
type SectionWidth = "narrow" | "default" | "wide";

const toneClass: Record<SectionTone, string> = {
  navy: "on-navy bg-surface text-ink",
  parchment: "bg-surface-sunken text-ink",
  white: "bg-surface text-ink",
};

const widthClass: Record<SectionWidth, string> = {
  narrow: "max-w-2xl",
  default: "max-w-5xl",
  wide: "max-w-7xl",
};

export type SectionProps = React.ComponentProps<"section"> & {
  tone?: SectionTone;
  width?: SectionWidth;
  /** Escape hatch for bands that manage their own inner layout. */
  bare?: boolean;
};

export function Section({
  tone = "white",
  width = "default",
  bare = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(toneClass[tone], "px-4 py-16 md:px-8 md:py-24", className)}
      {...props}
    >
      {bare ? (
        children
      ) : (
        <div className={cn("mx-auto", widthClass[width])}>{children}</div>
      )}
    </section>
  );
}

/**
 * The uppercase Label style from SPES-001 · 04 — the only place capitals and
 * letterspacing are permitted anywhere on the site.
 */
export function SectionLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-label text-accent font-semibold tracking-[0.1em] uppercase",
        className,
      )}
      {...props}
    />
  );
}
