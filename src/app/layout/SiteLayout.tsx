import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  // Keyed on the path so the wrapper genuinely remounts on navigation —
  // including between two pillar pages, which are the same component with
  // different params and would otherwise swap their content without a beat.
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/*
        First focusable element on every page. Without it a keyboard user tabs
        through six nav items and a CTA before reaching content, on every route.
      */}
      <a
        href="#main"
        className="rounded-control focus:bg-accent focus:text-accent-ink sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <Header />

      {/*
        The shell holds still and the content settles into it. 4px and 240ms:
        enough that a route change reads as a change rather than a jump cut,
        short enough that it is over before anyone has finished looking up.
        Header and Footer sit outside it deliberately — a site chrome that
        re-animates on every navigation is the thing that feels slow.
      */}
      <main id="main" tabIndex={-1}>
        <div key={pathname} className="animate-rise-in">
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}
