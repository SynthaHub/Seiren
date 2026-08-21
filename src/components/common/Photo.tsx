import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  placeholders,
  usingPlaceholderImagery,
  type PlaceholderKey,
} from "@/content/placeholders";

/**
 * An image slot.
 *
 * Pass `slot` for a stand-in from the placeholder set, or `src` for a real
 * photograph. With neither it renders an empty frame carrying the art direction
 * for that slot, so the layout can still be judged.
 *
 * Alt text is the point of care here. While `usingPlaceholderImagery` is true,
 * every stand-in announces itself as a placeholder — so a screen-reader user is
 * never told that a stock workspace photo is a portrait of Eldaah Toi. See
 * src/content/placeholders.ts.
 */

export type PhotoProps = {
  /** Art direction for this slot. Used as alt text once real imagery lands. */
  note?: string;
  /** Draws from the placeholder set. */
  slot?: PlaceholderKey;
  /** A real photograph. Wins over `slot`. */
  src?: string;
  alt?: string;
  className?: string;
  /** Tailwind aspect utility, e.g. "aspect-[4/5]". */
  aspect?: string;
  priority?: boolean;
};

export function Photo({
  note,
  slot,
  src,
  alt,
  className,
  aspect = "aspect-[4/3]",
  priority,
}: PhotoProps) {
  const entry = slot ? placeholders[slot] : undefined;
  const resolvedSrc = src ?? entry?.src;
  const description = note ?? entry?.note ?? "";

  if (resolvedSrc) {
    const isStandIn = !src && usingPlaceholderImagery;
    return (
      <img
        src={resolvedSrc}
        alt={alt ?? (isStandIn ? `Placeholder image — ${description}` : description)}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={cn("rounded-media h-full w-full object-cover", aspect, className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Image placeholder — ${description}`}
      className={cn(
        "rounded-media border-border bg-surface-sunken",
        "flex flex-col items-center justify-center gap-3 border p-4 text-center",
        aspect,
        className,
      )}
    >
      <ImageIcon className="text-ink-muted size-6 opacity-40" aria-hidden="true" />
      <span className="text-ink-muted max-w-[22ch] text-[0.72rem] leading-snug">
        {description}
      </span>
    </div>
  );
}
