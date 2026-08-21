/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import appCss from "@/styles/globals.css?url";
import { SiteLayout } from "@/app/layout/SiteLayout";
import { Section } from "@/components/common/Section";
import { buttonVariants } from "@/components/ui/Button";
import { organizationJsonLd, seoMeta, site } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1B2A4A" },
      // Fallback only — every route overrides these. Uses seoMeta rather than
      // seo() because the canonical link belongs to the individual route, not
      // to the root, or every page would claim to be the homepage.
      ...seoMeta({
        title: "Seiran Partners | Strategy & Business Advisory, Nairobi",
        description: site.description,
        path: "/",
      }),
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd()),
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <RootDocument>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-KE">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <Section tone="navy" width="narrow" className="min-h-[60vh]">
      <p className="text-label text-accent font-semibold tracking-[0.1em] uppercase">
        404
      </p>
      <h1 className="text-h1 mt-4">This page does not exist.</h1>
      <p className="text-body text-ink-muted mt-4">
        The link may be out of date, or the page may have moved.
      </p>
      <Link to="/" className={cn(buttonVariants(), "mt-8")}>
        Back to home
      </Link>
    </Section>
  );
}
