import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes so the caller's win.
 *
 * Tailwind utilities have no cascade priority — `"px-2 px-4"` resolves by the
 * order Tailwind emitted them, not by which was written last. Without twMerge, a
 * parent passing `px-4` to a component that sets `px-2` gets whichever the build
 * happened to output first, which is a coin flip that changes between builds.
 *
 * Every component that accepts `className` runs it through here.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
