import { cn } from "@/lib/cn";

/**
 * The tagline eyebrow.
 *
 * The first version was two hairlines at 45% opacity around thin italic, and it
 * read as faint rather than deliberate — the rules looked like they had been
 * left in by accident. Three changes fix that:
 *
 * 1. **The rule is solid and short.** A 2px bar at full accent weight is a
 *    mark; a 1px line at 45% is a smudge. Short, so it reads as punctuation
 *    rather than as a divider trying to span something.
 *
 * 2. **Asymmetric when left-aligned.** A trailing rule on a left-aligned label
 *    closes a bracket around nothing. BizFusionX sets its eyebrows with no
 *    ornament at all; keeping one leading mark is the middle ground that stays
 *    distinctive without looking indecisive. Centred headings keep both, where
 *    the symmetry is the point.
 *
 * 3. **Semibold, and slightly larger.** Source Serif 4 italic at 400 is too
 *    light to hold the accent colour at this size. At 600 it carries.
 *
 * Sentence case, never letterspaced — SPES-001 · 04 bars letterspacing on
 * lowercase, and the Label style it exempts is a different thing used for
 * footer headings and pills.
 */
export function Eyebrow({
  children,
  align = "center",
  className,
}: {
  children: React.ReactNode;
  align?: "center" | "start";
  className?: string;
}) {
  const rule = (
    <span className="bg-accent rounded-pill h-0.5 w-7 shrink-0" aria-hidden="true" />
  );

  return (
    <p
      className={cn(
        "text-accent font-serif text-[1.15rem] font-semibold italic",
        "flex items-center gap-3.5",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      {rule}
      <span>{children}</span>
      {align === "center" && rule}
    </p>
  );
}
