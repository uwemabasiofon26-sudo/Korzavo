import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useProducts } from "@/hooks/useProducts";
import { formatNZD } from "@/lib/brand";
import { cn } from "@/lib/utils";

// Marketing copy for the bundle spotlight sections. Names, images, prices and
// contents come from productData.js; only the hook / teaser / CTA live here.
// Savings are calculated from the live prices of the bundle's `includes`, and
// only shown when the bundle really is cheaper than buying the parts.
const BUNDLES = [
  {
    id: "dominance-stack",
    kicker: "NITROXAR™ + ANDROZAR",
    hook: "Two formulas. One focused routine.",
    teaser:
      "Circulation-focused ingredients on one side, traditional vitality botanicals on the other. Two distinct profiles, thoughtfully paired for people who train with purpose and care about everyday wellbeing.",
    cta: "Unlock the Dominance Stack",
  },
  {
    id: "alpha-24-stack",
    kicker: "NITROXAR + ANDROZAR + NIGHT RECOVERY",
    hook: "Own your day. Prioritise your night.",
    teaser:
      "Your daytime goals and your evening wind-down, together in one routine. Three formulas built around the full 24 hours.",
    cta: "Build your Alpha 24 routine",
  },
  {
    id: "performance-stack",
    kicker: "EXPLOVEX + CREATINE",
    hook: "Power your next level.",
    teaser:
      "Pre-workout meets creatine and electrolytes — a powerful pairing for demanding sessions, in refreshing Raspberry Lemonade. Two products. One goal.",
    cta: "Shop the Performance Stack",
  },
  {
    id: "night-recovery-3-bottles",
    kicker: "NIGHT RECOVERY × 3",
    hook: "Make rest part of your routine.",
    teaser:
      "Turn the evening wind-down into a habit you don’t run out of. Three bottles of NIGHT RECOVERY, ready for the nights ahead.",
    cta: "Stock up on Night Recovery",
  },
];

export default function BundleShowcase({ className }) {
  const { data: products } = useProducts();
  const all = products || [];

  const rows = BUNDLES.map((b) => {
    const product = all.find((p) => p.id === b.id);
    if (!product) return null;
    const separate = (product.includes || []).reduce((sum, inc) => {
      const item = all.find((p) => p.id === inc.id);
      return sum + (item ? item.price * inc.quantity : 0);
    }, 0);
    const saving = separate - product.price;
    return { ...b, product, separate, saving: saving >= 1 ? saving : 0 };
  }).filter(Boolean);

  if (!rows.length) return null;

  return (
    <section className={cn("relative py-10 md:py-16", className)} aria-labelledby="bundle-showcase-heading">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <ScrollReveal className="mb-10 md:mb-16 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">Stacks &amp; Bundles</p>
          <h2
            id="bundle-showcase-heading"
            className="font-display text-3xl md:text-6xl font-bold tracking-tight text-av-alloy leading-[1.05]"
          >
            Pair up. Level up.
          </h2>
          <p className="mt-4 md:mt-5 text-av-alloy/70 leading-relaxed text-sm md:text-base">
            Four curated routines, each one a single click away from your cart.
          </p>
        </ScrollReveal>

        <div className="space-y-14 md:space-y-24">
          {rows.map((r, i) => {
            const href = `/product/${r.product.slug}`;
            const flip = i % 2 === 1;
            return (
              <div key={r.id} className="grid md:grid-cols-2 gap-6 md:gap-14 items-center">
                <ScrollReveal className={cn(flip && "md:order-2")}>
                  <Link
                    to={href}
                    aria-label={`${r.product.name} — ${r.cta}`}
                    className="group block frame-corner relative overflow-hidden bg-av-teal/20"
                  >
                    {/* Natural aspect ratio: these are designed collages and must not be cropped. */}
                    <img
                      src={r.product.image}
                      alt={r.product.name}
                      loading="lazy"
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </Link>
                </ScrollReveal>

                <ScrollReveal delay={0.1} className={cn(flip && "md:order-1")}>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-av-gold">{r.kicker}</p>
                  <h3 className="mt-3 font-display text-2xl md:text-5xl font-bold tracking-tight text-av-alloy leading-[1.05]">
                    {r.hook}
                  </h3>
                  <p className="mt-4 md:mt-5 text-av-alloy/70 leading-relaxed max-w-lg text-sm md:text-base">
                    {r.teaser}
                  </p>

                  <div className="mt-5 md:mt-6 flex items-baseline gap-3 flex-wrap">
                    <span className="font-display text-3xl md:text-4xl font-bold text-av-gold">
                      {formatNZD(r.product.price)}
                    </span>
                    {r.saving > 0 && (
                      <>
                        <span className="text-av-alloy/50 line-through">{formatNZD(r.separate)}</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                          Save {formatNZD(r.saving)}
                        </span>
                      </>
                    )}
                  </div>

                  <Link
                    to={href}
                    className="mt-6 md:mt-8 inline-flex items-center gap-2 bg-av-gold text-av-deep px-6 md:px-7 py-3 md:py-3.5 rounded-full text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition"
                  >
                    {r.cta} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
