import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Content validation, development only. A DYNAMIC import inside a branch Vite
// resolves to `false` at build time, so Rollup removes the call, the module,
// its schemas and Zod itself from the production bundle. A static import would
// keep all of that reachable from the chunk every route loads — which is
// exactly the problem this replaced.
if (import.meta.env.DEV) {
  void import("./content/validate.dev");
}

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
