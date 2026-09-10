import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  placeholders,
  placeholderSrc,
  placeholderSrcSet,
  type PlaceholderKey,
} from "@/content/placeholders";

/**
 * An image slot.
 *
 * Pass `slot` for a stand-in from the placeholder set, or `src` for a real
 * photograph. With neither it renders an empty frame carrying the art direction
 * for that slot, so the layout can still be judged.
 *
 * Alt text is the point of care here, and it comes from the slot's own `alt`
 * field — never from `note`, which is art direction for the photographer. The
 * two used to be one field, which put review notes into the alt attribute of
 * every image on the site. See src/content/placeholders.ts.
 *
 * The standing rule survives that change: alt text must never name a real
 * person unless the photograph is genuinely of them. That is what stops a
 * stock interior being announced as a portrait of Eldaah Toi.
 */

export type PhotoProps = {
  /** Art direction for the empty frame. NEVER used as alt text — see the note
   *  on `placeholders`, where the two were once the same field. */
  note?: string;
  /** Draws from the placeholder set. */
  slot?: PlaceholderKey;
  /** A real photograph. Wins over `slot`. */
  src?: string;
  /** Overrides the slot's alt. Required when passing a bare `src`, since there
   *  is no slot entry to describe it. */
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
  const resolvedSrc = src ?? (entry && placeholderSrc(entry));
  const description = note ?? entry?.note ?? "";

  if (resolvedSrc) {
    return (
      <img
        src={resolvedSrc}
        // Only a slot has variants on disk; a bare `src` is served as given.
        srcSet={entry ? placeholderSrcSet(entry) : undefined}
        sizes={entry?.sizes}
        // The slot's own alt, never the art-direction note.
        alt={alt ?? entry?.alt ?? ""}
        // Intrinsic size, so the browser knows the ratio before bytes arrive
        // and can still reserve the box if the stylesheet is slow or blocked.
        // The aspect utility governs the rendered box; these do not fight it.
        width={entry?.intrinsic.w}
        height={entry?.intrinsic.h}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // The hero is the largest-contentful paint on the homepage; telling the
        // browser that up front lets it start the fetch before layout.
        fetchPriority={priority ? "high" : undefined}
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
