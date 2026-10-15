// Build-time server entry, used ONLY by scripts/prerender.mjs (never shipped to
// the browser). It renders each public route to an HTML string and captures the
// SEO tags the page declared through useSEO().

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/App";
import { PRODUCTS } from "@/lib/productData";
import { SITE_URL } from "@/lib/brand";
import { DEFAULT_IMAGE } from "@/hooks/useSEO";

export { SITE_URL };

// Every route that gets its own static HTML file.
//  - indexable: true  → full page content is written into the HTML (for search
//    engines and AI crawlers) and the tags come from the page's useSEO().
//  - indexable: false → only the <head> is written (title + noindex); the body
//    stays empty so shoppers never see a stale cart/checkout flash.
// Product pages are generated from productData.js, so adding a product there
// is enough — no list to keep in sync.
export function getRoutes() {
  const pages = [
    "/",
    "/shop",
    "/performance-nutrition",
    "/stack",
    "/about",
    "/contact",
    "/policy",
  ].map((path) => ({ path, indexable: true }));

  const products = PRODUCTS.map((p) => ({
    path: `/product/${p.slug}`,
    indexable: true,
  }));

  const private_ = ["/cart", "/checkout", "/thank-you"].map((path) => ({
    path,
    indexable: false,
  }));

  return [...pages, ...products, ...private_];
}

export function render(url) {
  globalThis.__KORZAVO_SEO__ = null;

  const html = renderToString(
    <QueryClientProvider client={new QueryClient()}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </QueryClientProvider>
  );

  const seo = globalThis.__KORZAVO_SEO__;
  globalThis.__KORZAVO_SEO__ = null;

  return {
    html,
    seo: seo ? { ...seo, isDefaultImage: seo.image === DEFAULT_IMAGE } : null,
  };
}
