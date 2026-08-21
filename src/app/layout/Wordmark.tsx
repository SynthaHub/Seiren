import { cn } from "@/lib/cn";

/**
 * SPES-001 · 04 permits capitals in exactly two places: the Label style, and
 * PARTNERS in the wordmark. That is the whole reason this is a component rather
 * than a string — the mixed case is a brand rule, and typing "SEIRAN PARTNERS"
 * anywhere would break it.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-[0.4em]", className)}>
      <span className="text-h3 font-serif font-semibold tracking-[-0.01em]">Seiran</span>
      <span className="text-label text-accent font-semibold tracking-[0.14em] uppercase">
        Partners
      </span>
    </span>
  );
}
