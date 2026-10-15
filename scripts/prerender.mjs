#!/usr/bin/env node
/**
 * Build-time prerender.
 *
 * Runs after `vite build` and `vite build --ssr` (see the "build" script in
 * package.json). For every public route it renders the real React page to HTML
 * and writes dist/<route>/index.html with:
 *   - the page's own <title>, meta description, canonical URL, Open Graph /
 *     Twitter tags and JSON-LD (Product, FAQPage, ...) baked into the <head>
 *   - the page's visible content inside <div id="root">
 *
 * Why: this site is a client-rendered React app. Crawlers that don't run
 * JavaScript (most AI crawlers) used to receive the same generic homepage HTML
 * for every URL. Now each URL returns its own complete HTML. In the browser,
 * React still mounts normally and replaces the prerendered markup.
 *
 * Tags come from the same useSEO() calls the pages already make, so there is
 * nothing to keep in sync by hand. Products are read from productData.js.
 *
 * It also cross-checks public/sitemap.xml, llms.txt, robots.txt and index.html
 * against the real route list and FAILS the build if they point at pages that
 * don't exist or at the wrong domain.
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SSR_ENTRY = path.join(ROOT, "dist-ssr", "entry-server.js");
const STRICT = process.env.PRERENDER_STRICT === "1";

// React warns about useLayoutEffect on the server. It's harmless here (effects
// never run during a server render), so keep the build log readable.
const origError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("useLayoutEffect does nothing on the server")) return;
  origError(...args);
};

// ---------------------------------------------------------------- html helpers

const escAttr = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escText = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// NOTE: every .replace() below uses a function as the replacement so characters
// like "$" in prices or descriptions are never treated as special patterns.

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${escText(title)}</title>`);
}

function setMeta(html, attr, key, value) {
  if (value === undefined || value === null || value === "") return html;
  const tag = `<meta ${attr}="${key}" content="${escAttr(value)}" />`;
  const re = new RegExp(`<meta\\s+${attr}="${escRe(key)}"[^>]*>`, "i");
  return re.test(html)
    ? html.replace(re, () => tag)
    : html.replace("</head>", () => `    ${tag}\n  </head>`);
}

function removeMeta(html, attr, key) {
  const re = new RegExp(`[ \\t]*<meta\\s+${attr}="${escRe(key)}"[^>]*>\\n?`, "i");
  return html.replace(re, "");
}

function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escAttr(url)}" />`;
  const re = /<link\s+rel="canonical"[^>]*>/i;
  return re.test(html)
    ? html.replace(re, () => tag)
    : html.replace("</head>", () => `    ${tag}\n  </head>`);
}

function addJsonLd(html, data) {
  if (!data) return html;
  // "<" is escaped so a description can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  // Same id the browser-side useSEO() uses, so React replaces it instead of duplicating.
  const tag = `<script type="application/ld+json" id="page-structured-data">${json}</script>`;
  return html.replace("</head>", () => `    ${tag}\n  </head>`);
}

function applySeo(html, seo) {
  html = setTitle(html, seo.fullTitle);
  html = setMeta(html, "name", "description", seo.description);
  html = setMeta(html, "name", "robots", seo.noindex ? "noindex, nofollow" : "index, follow");
  html = setCanonical(html, seo.url);

  html = setMeta(html, "property", "og:title", seo.fullTitle);
  html = setMeta(html, "property", "og:description", seo.description);
  html = setMeta(html, "property", "og:url", seo.url);
  html = setMeta(html, "property", "og:image", seo.image);
  html = setMeta(html, "property", "og:type", seo.type);

  html = setMeta(html, "name", "twitter:title", seo.fullTitle);
  html = setMeta(html, "name", "twitter:description", seo.description);
  html = setMeta(html, "name", "twitter:image", seo.image);

  // The template's 1200x630 hint belongs to the default share image only.
  if (!seo.isDefaultImage) {
    html = removeMeta(html, "property", "og:image:width");
    html = removeMeta(html, "property", "og:image:height");
  }

  return addJsonLd(html, seo.structuredData);
}

const outFileFor = (routePath) =>
  routePath === "/" ? path.join(DIST, "index.html") : path.join(DIST, routePath.slice(1), "index.html");

const normalizePath = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p) || "/";

// ------------------------------------------------------------------------ main

if (!fs.existsSync(path.join(DIST, "index.html"))) {
  throw new Error("dist/index.html not found — run `vite build` first.");
}
if (!fs.existsSync(SSR_ENTRY)) {
  throw new Error("dist-ssr/entry-server.js not found — run `vite build --ssr src/entry-server.jsx --outDir dist-ssr` first.");
}

const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error(
    'dist/index.html has no empty <div id="root"></div> to fill. If you ran this script twice, ' +
    "run a fresh `vite build` first — it needs the original, un-prerendered index.html."
  );
}

// Untouched copy of the empty app shell. vercel.json serves it for any URL that
// has no prerendered file of its own (mistyped links, brand-new routes), so those
// visitors never see a flash of the homepage before the app loads.
fs.writeFileSync(path.join(DIST, "app-shell.html"), template);

const { render, getRoutes, SITE_URL } = await import(pathToFileURL(SSR_ENTRY).href);
const SITE_HOST = new URL(SITE_URL).host;
const routes = getRoutes();

const rows = [];
const failures = [];
const warnings = [];

for (const route of routes) {
  try {
    const { html: body, seo } = render(route.path);
    if (!seo) throw new Error("the page never called useSEO()");

    const canonicalPath = normalizePath(new URL(seo.url).pathname);
    if (canonicalPath !== route.path) {
      throw new Error(`canonical path "${canonicalPath}" does not match route "${route.path}"`);
    }

    let page = applySeo(template, seo);
    if (route.indexable) {
      page = page.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);

      if (!/<h1[\s>]/i.test(body)) warnings.push(`${route.path}: no <h1> in rendered content`);
      if (!seo.description) warnings.push(`${route.path}: no meta description`);
      else if (seo.description.length > 170) warnings.push(`${route.path}: meta description is ${seo.description.length} chars (Google usually shows ~155)`);
    }

    const file = outFileFor(route.path);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page);

    rows.push({
      route: route.path,
      mode: route.indexable ? "full page" : "head only",
      title: seo.fullTitle,
      kb: (Buffer.byteLength(page) / 1024).toFixed(1),
    });
  } catch (err) {
    failures.push({ route: route.path, message: err?.stack || String(err) });
  }
}

// --------------------------------------------- consistency checks (hard errors)

const errors = [];
const known = new Set(routes.map((r) => r.path));
const indexable = new Set(routes.filter((r) => r.indexable).map((r) => r.path));

const readIfExists = (rel) => {
  const f = path.join(ROOT, rel);
  return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
};

function checkUrl(source, raw) {
  let u;
  try { u = new URL(raw); } catch { return null; }
  if (u.host !== SITE_HOST) {
    errors.push(`${source}: ${raw} is on "${u.host}" but the site is "${SITE_HOST}"`);
    return null;
  }
  const p = normalizePath(u.pathname);
  if (!known.has(p)) errors.push(`${source}: ${raw} is not a real page (no matching route) — it would show "not found"`);
  return p;
}

const sitemap = readIfExists("public/sitemap.xml");
if (sitemap) {
  const inSitemap = new Set();
  for (const m of sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    const p = checkUrl("public/sitemap.xml", m[1]);
    if (p) inSitemap.add(p);
  }
  for (const p of indexable) {
    if (!inSitemap.has(p)) warnings.push(`public/sitemap.xml is missing ${SITE_URL}${p === "/" ? "/" : p}`);
  }
} else {
  warnings.push("public/sitemap.xml not found");
}

const llms = readIfExists("public/llms.txt");
if (llms) {
  for (const m of llms.matchAll(/https?:\/\/[^\s)>\]]+/g)) {
    const raw = m[0].replace(/[.,;]+$/, "");
    // Only check links that claim to be on this site.
    if (/^https?:\/\/(www\.)?korzavo\./i.test(raw) || raw.startsWith(SITE_URL)) checkUrl("public/llms.txt", raw);
  }
}

const robots = readIfExists("public/robots.txt");
if (robots) {
  for (const m of robots.matchAll(/^\s*Sitemap:\s*(\S+)/gim)) {
    try {
      const u = new URL(m[1]);
      if (u.host !== SITE_HOST) errors.push(`public/robots.txt: Sitemap URL ${m[1]} is on "${u.host}" but the site is "${SITE_HOST}"`);
    } catch { /* ignore */ }
  }
}

const homeHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
for (const m of homeHtml.matchAll(/<(?:link\s+rel="canonical"\s+href|meta\s+property="og:url"\s+content)="([^"]+)"/gi)) {
  try {
    const u = new URL(m[1]);
    if (u.host !== SITE_HOST) errors.push(`index.html: ${m[1]} is on "${u.host}" but the site is "${SITE_HOST}"`);
  } catch { /* ignore */ }
}

// ---------------------------------------------------------------------- report

console.log(`\nPrerendered ${rows.length}/${routes.length} routes for ${SITE_URL}\n`);
const w = Math.max(...rows.map((r) => r.route.length), 5);
for (const r of rows) {
  console.log(`  ${r.route.padEnd(w)}  ${r.mode.padEnd(9)}  ${String(r.kb).padStart(6)} kB  ${r.title}`);
}

if (warnings.length) {
  console.log("\nWarnings:");
  for (const x of warnings) console.log(`  ! ${x}`);
}

if (failures.length) {
  console.log(`\n${"=".repeat(70)}`);
  console.log(`PRERENDER PROBLEM: ${failures.length} route(s) could not be prerendered.`);
  console.log("They will still work — visitors get the normal app — but search and AI");
  console.log("crawlers that don't run JavaScript will only see the generic homepage HTML.");
  for (const f of failures) console.log(`\n  ${f.route}\n    ${String(f.message).split("\n").slice(0, 6).join("\n    ")}`);
  console.log("=".repeat(70));
}

if (errors.length) {
  console.log(`\n${"=".repeat(70)}`);
  console.log("BUILD STOPPED: these files point to pages or domains that don't exist:");
  for (const e of errors) console.log(`  x ${e}`);
  console.log("Fix them, then build again.");
  console.log("=".repeat(70));
}

if (errors.length || (STRICT && failures.length)) process.exit(1);
console.log("\nPrerender complete.\n");
