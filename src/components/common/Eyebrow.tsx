import { cn } from "@/lib/cn";

/**
 * The tagline eyebrow, following the reference's treatment.
 *
 * Two things distinguish it from a plain section label, and both are the point:
 *
 * 1. **Sentence case, set in the serif italic.** The reference sets these as a
 *    written phrase, not a shouted category. Uppercase-and-tracked reads as
 *    filing; italic serif reads as a voice, which is right for a firm whose
 *    product is written thinking. SPES-001 · 04 sanctions italic for the Quote
 *    style, so this stays inside the type system rather than inventing a
 *    treatment. Note it is deliberately NOT letterspaced — the spec bars
 *    letterspacing on lowercase.
 *
 * 2. **It carries a phrase, not a label.** "Turning complexity into clarity…"
 *    does work; "Advisory services" only names the section the heading is about
 *    to name again. Where a section genuinely wants a label rather than a
 *    tagline, that is what `SectionLabel` is for.
 *
 * The rules replace the reference's leaf ornaments — Seiran's identity has no
 * botanical motif, and inventing one would put a mark on the page that is not
 * in the brand.
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
  return (
    <p
      className={cn(
        "text-accent font-serif text-[1.05rem] italic",
        "flex items-center gap-4",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      <span className="bg-accent/45 h-px w-8 shrink-0" aria-hidden="true" />
      <span>{children}</span>
      {align === "center" && (
        <span className="bg-accent/45 h-px w-8 shrink-0" aria-hidden="true" />
      )}
    </p>
  );
}
