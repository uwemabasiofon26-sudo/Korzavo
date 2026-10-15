import { useQuery } from "@tanstack/react-query";
import { PRODUCTS } from "@/lib/productData";

// Static-data-backed versions of the original Base44 hooks.
// Kept as useQuery so every consuming component (Header, Home, Shop,
// ProductDetail, Stack, PerformanceNutrition) needs zero changes.
//
// The catalog lives in memory, so it is also passed as `initialData`: the
// very first render already has products. That is what lets the build-time
// prerender (scripts/prerender.mjs) write real product content into the HTML,
// and it avoids a loading flash for visitors.

const SORTED_PRODUCTS = [...PRODUCTS].sort(
  (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
);

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => SORTED_PRODUCTS,
    initialData: SORTED_PRODUCTS,
  });
}

export function useProduct(slug) {
  return useQuery({
    queryKey: ["product", slug],
    // null (not undefined) for an unknown slug: React Query treats undefined
    // as an error and retries, which delayed the "not found" state.
    queryFn: async () => PRODUCTS.find((p) => p.slug === slug) ?? null,
    initialData: PRODUCTS.find((p) => p.slug === slug),
    enabled: !!slug,
  });
}
