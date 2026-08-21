import { cn } from "@/lib/cn";

/**
 * The ornamented section label from the approved layout — a short tracked label
 * flanked by rules.
 *
 * Uppercase and letterspacing are permitted here because this is the Label
 * style, which SPES-001 · 04 exempts. The rules replace the reference's leaf
 * ornaments: Seiran's identity has no botanical motif, and inventing one would
 * put a mark on the page that is not in the brand.
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
        "text-label text-accent flex items-center gap-3 font-semibold tracking-[0.14em] uppercase",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      <span className="bg-accent/50 h-px w-6" aria-hidden="true" />
      {children}
      <span className="bg-accent/50 h-px w-6" aria-hidden="true" />
    </p>
  );
}
