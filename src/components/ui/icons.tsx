/**
 * Brand glyphs that lucide does not ship.
 *
 * lucide v1 removed third-party brand icons, so the LinkedIn mark is drawn
 * here. It is used only to label a link that goes to LinkedIn, which is what
 * the mark is for.
 */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05c.53-.95 1.83-1.96 3.77-1.96C21.6 8.75 23 11 23 14.4V21h-4v-5.9c0-1.4-.03-3.2-1.98-3.2-1.98 0-2.28 1.53-2.28 3.1V21h-4V9Z" />
    </svg>
  );
}
