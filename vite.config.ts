import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: { port: 3000 },
  // Vite 8 resolves tsconfig `paths` natively, so the vite-tsconfig-paths
  // plugin is no longer needed for the @/ alias.
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      // Prerender every static route to real HTML at build time.
      //
      // This is the whole reason Start is here rather than a plain SPA: LinkedIn,
      // WhatsApp and X do not execute JavaScript, so a client-rendered Insights
      // article previews as a blank card on the channel this audience actually
      // shares on. See .claude/skills/hawi-structure/references/seo.md.
      prerender: {
        enabled: true,
        // Discovers the eight top-level pages automatically.
        autoStaticPathsDiscovery: true,
        // Follows links out of /insights so each article is prerendered too,
        // even though its route has a path parameter.
        crawlLinks: true,
        // A page that fails to prerender would ship as an empty shell. Fail the
        // build instead of shipping it quietly.
        failOnError: true,
      },
    }),
    viteReact(),
    tailwindcss(),
  ],
});
