import { useEffect } from "react";
import { SITE_URL, SITE_NAME } from "@/lib/brand";

export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Turns the options passed to useSEO() into the final tag values. Used by the
 * browser (below) and by the build-time prerender (src/entry-server.jsx →
 * scripts/prerender.mjs), so both always produce identical tags.
 */
export function resolveSEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  structuredData = null,
}) {
  return {
    fullTitle: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
    description,
    url: `${SITE_URL}${path}`,
    image,
    type,
    noindex,
    structuredData,
  };
}

/**
 * Sets per-page <title>, meta description, canonical link, Open Graph /
 * Twitter Card tags, robots directive, and (optionally) a JSON-LD
 * structured-data block — all via direct DOM updates, so no extra
 * dependency (react-helmet etc.) is required.
 *
 * In the browser these updates are applied after render. At build time the
 * same values are captured during server rendering and written straight into
 * each page's static HTML (see scripts/prerender.mjs), so crawlers that do
 * not run JavaScript still get correct per-page tags.
 *
 * @param {object} opts
 * @param {string} opts.title - Page title (site name is appended automatically).
 * @param {string} opts.description - Meta description (~150-160 chars ideal).
 * @param {string} opts.path - Path for the canonical/OG URL, e.g. "/shop".
 * @param {string} [opts.image] - Absolute image URL for social previews.
 * @param {"website"|"product"|"article"} [opts.type] - og:type.
 * @param {boolean} [opts.noindex] - Set true for cart/checkout/thank-you pages.
 * @param {object|object[]} [opts.structuredData] - JSON-LD object(s) to inject.
 */
export function useSEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  structuredData = null,
}) {
  // Build-time server render only (this branch is removed from the browser
  // bundle): hand the resolved values to the prerender script.
  if (import.meta.env.SSR) {
    globalThis.__KORZAVO_SEO__ = resolveSEO({
      title, description, path, image, type, noindex, structuredData,
    });
  }

  useEffect(() => {
    const seo = resolveSEO({
      title, description, path, image, type, noindex, structuredData,
    });
    document.title = seo.fullTitle;

    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", seo.noindex ? "noindex, nofollow" : "index, follow");

    upsertMeta("property", "og:title", seo.fullTitle);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", seo.url);
    upsertMeta("property", "og:image", seo.image);
    upsertMeta("property", "og:type", seo.type);
    upsertMeta("property", "og:site_name", SITE_NAME);

    upsertMeta("name", "twitter:title", seo.fullTitle);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", seo.image);

    upsertCanonical(seo.url);
    upsertStructuredData(seo.structuredData);

    // No cleanup: the next page's useSEO call overwrites these same tags,
    // so there's never a stale flash between routes in this SPA.
  }, [title, description, path, image, type, noindex, structuredData]);
}

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

function upsertStructuredData(data) {
  const existing = document.getElementById("page-structured-data");
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "page-structured-data";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
