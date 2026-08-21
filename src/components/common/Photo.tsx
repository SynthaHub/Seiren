import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * An image, or an empty placeholder when there is no image yet.
 *
 * The layout is photography-led and Seiran has supplied none (brief §9). The
 * placeholder is deliberately plain — a neutral block, an icon, and the art
 * direction for that slot. An earlier version drew decorative artwork inside
 * it, which filled the space but read as real content and made the page harder
 * to judge, not easier.
 *
 * Dropping in a real photo is one prop: `src`.
 */

export type PhotoProps = {
  /** Art direction for this slot. Shown on the placeholder, used as alt text. */
  note: string;
  src?: string;
  alt?: string;
  className?: string;
  /** Tailwind aspect utility, e.g. "aspect-[4/5]". */
  aspect?: string;
  priority?: boolean;
};

export function Photo({
  note,
  src,
  alt,
  className,
  aspect = "aspect-[4/3]",
  priority,
}: PhotoProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? note}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={cn("rounded-media h-full w-full object-cover", aspect, className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Image placeholder — ${note}`}
      className={cn(
        "rounded-media border-border bg-surface-sunken",
        "flex flex-col items-center justify-center gap-3 border p-4 text-center",
        aspect,
        className,
      )}
    >
      <ImageIcon className="text-ink-muted size-6 opacity-40" aria-hidden="true" />
      <span className="text-ink-muted max-w-[22ch] text-[0.72rem] leading-snug">
        {note}
      </span>
    </div>
  );
}
