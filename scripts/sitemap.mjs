/**
 * Generates sitemap.xml from what was actually prerendered.
 *
 * Derived from the built output rather than a hand-maintained list, because a
 * hand-maintained sitemap silently falls behind the moment someone adds a route
 * — and a sitemap that omits a page is worse than none, since it tells Google
 * the omission was deliberate.
 *
 * Runs after `vite build` (see package.json), once prerendering has written
 * every page to disk.
 */
import { readdir, writeFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const DIST = "dist/client";

/** Keep in sync with `site.url` in src/lib/seo.ts. OUTSTANDING: final domain. */
const BASE = process.env.SITE_URL ?? "https://seiranpartners.co.ke";

/** Routes that exist but should never be indexed. */
const EXCLUDE = [/^\/404$/, /^\/admin$/];

async function findPages(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await findPages(full)));
    } else if (entry.name === "index.html") {
      out.push(full);
    }
  }
  return out;
}

function toRoute(file) {
  const rel = relative(DIST, file).split(sep).slice(0, -1).join("/");
  return rel === "" ? "/" : `/${rel}`;
}

const files = await findPages(DIST);

// The prerenderer emits both /services and /services/ for the same page. The
// canonical tag already resolves that for crawlers; the sitemap must not list
// both, or it advertises duplicate URLs itself.
const routes = [...new Set(files.map(toRoute))]
  .filter((r) => !EXCLUDE.some((re) => re.test(r)))
  .sort();

// Home first, then alphabetical — priority is advisory only, but ordering costs
// nothing and makes the file readable by a human.
const ordered = [...routes].sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

const lastmod = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ordered
  .map((route) => {
    const loc = route === "/" ? BASE : `${BASE}${route}`;
    const priority = route === "/" ? "1.0" : route.split("/").length > 2 ? "0.6" : "0.8";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n")}
</urlset>
`;

await writeFile(join(DIST, "sitemap.xml"), xml, "utf8");

// robots.txt is written here too so it can point at the sitemap without the
// base URL being duplicated in a static file that nobody remembers to update.
const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${BASE}/sitemap.xml
`;

await writeFile(join(DIST, "robots.txt"), robots, "utf8");

await stat(join(DIST, "sitemap.xml"));
console.log(`[sitemap] ${ordered.length} URLs -> ${DIST}/sitemap.xml, robots.txt`);
