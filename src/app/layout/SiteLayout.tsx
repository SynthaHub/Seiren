import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
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

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </>
  );
}
