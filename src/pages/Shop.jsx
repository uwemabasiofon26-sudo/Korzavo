import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "supplement", label: "Supplements" },
  { key: "stack", label: "Stacks" },
];

export default function Shop() {
  useSEO({
    title: "Shop Supplements & Performance Nutrition",
    description: "Shop the full Korzavo range — pre-workout, creatine, daily performance and recovery supplements. Fully disclosed formulas, no proprietary blends.",
    path: "/shop",
  });

  const { data: products, isLoading } = useProducts();
  const [params, setParams] = useSearchParams();
  const active = params.get("category") || "all";

  const setFilter = (key) => {
    if (key === "all") setParams({});
    else setParams({ category: key });
  };

  const list = (products || []).filter((p) => active === "all" || p.category === active);

  return (
    <div className="bg-av-deep pt-28 md:pt-36">
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 pb-12">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">The System Range</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-av-alloy">
            Shop
          </h1>
          <p className="mt-4 text-av-alloy/60 max-w-xl">
            Performance nutrition, built for people who train with purpose. Buy individually, or pick a stack and save.
          </p>
        </ScrollReveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-semibold border transition-all",
                active === f.key
                  ? "bg-av-gold text-av-deep border-av-gold"
                  : "border-av-teal text-av-alloy/70 hover:border-av-gold hover:text-av-gold"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 md:px-10 pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-av-teal/20 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
