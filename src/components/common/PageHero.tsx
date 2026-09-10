import { Section } from "./Section";
import { Eyebrow } from "./Eyebrow";
import { Photo } from "./Photo";

/**
 * The page masthead shared by every route, matching the reference layout's
 * hero: parchment ground, eyebrow, serif display heading, a short lede.
 *
 * Two shapes. With `photoNote` it splits content left / image right, as Home
 * does. Without one it centres — right for pages whose opening is a statement
 * rather than a scene, and better than forcing a placeholder into a slot that
 * has no natural subject.
 *
 * Centralised so the eight pages cannot drift apart in spacing, size or
 * alignment, which is exactly what happened when each page set its own.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  photoNote,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  /** ReactNode, not string — /about needs to mark up the Japanese 晴嵐 with
   *  lang="ja" so a screen reader switches pronunciation for it. */
  lede?: React.ReactNode;
  photoNote?: string;
  children?: React.ReactNode;
}) {
  if (!photoNote) {
    return (
      <Section tone="parchment" width="default" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-hero mt-6">{title}</h1>
          {lede && (
            <p className="text-body text-ink-muted mx-auto mt-6 max-w-xl">{lede}</p>
          )}
          {children}
        </div>
      </Section>
    );
  }

  return (
    <Section tone="parchment" width="wide" className="py-14 md:py-20">
      <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow align="start">{eyebrow}</Eyebrow>
          <h1 className="text-hero mt-6">{title}</h1>
          {lede && <p className="text-body text-ink-muted mt-6 max-w-xl">{lede}</p>}
          {children}
        </div>
        <div className="lg:col-span-5">
          <Photo note={photoNote} aspect="aspect-[4/3]" priority />
        </div>
      </div>
    </Section>
  );
}
