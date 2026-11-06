import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, ShieldCheck, Package, Truck, ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { formatNZD } from "@/lib/brand";
import { cn } from "@/lib/utils";

// A full "sales page" layout for stacks, driven by `product.landing`
// (see productData.js). Progression:
//   1. Hero            – gallery, promise, intro, price + saving, add to cart
//   2. Benefits        – numbered key benefits, each with a "why it matters"
//   3. How it works    – step-by-step timeline + the "approach" summary
//   4. The formulas    – a detailed panel per product (+ supplement facts)
//   5. Fitness education
//   6. Why choose      – recap list + closing call to action
//   7. Disclaimer
// Names, images, prices and supplement-facts images are read from the
// included products, so they stay in sync with the rest of the site.
const ICONS = { shield: ShieldCheck, package: Package, truck: Truck };

function Eyebrow({ children }) {
  return <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">{children}</p>;
}
function H2({ id, children }) {
  return (
    <h2 id={id} className="font-display text-3xl md:text-5xl font-bold tracking-tight text-av-alloy leading-[1.05]">
      {children}
    </h2>
  );
}

export default function StackLanding({ product, all, onAdd, added }) {
  const L = product.landing;
  const [active, setActive] = useState(0);

  const items = (product.includes || [])
    .map((inc) => ({ inc, p: all.find((x) => x.id === inc.id) }))
    .filter((x) => x.p);
  const separate = items.reduce((sum, { inc, p }) => sum + p.price * inc.quantity, 0);
  const saving = separate - product.price;
  const soldOut = product.inStock === false;

  const AddButton = ({ className }) =>
    soldOut ? (
      <div className="inline-flex items-center justify-center rounded-full border border-av-teal/60 bg-av-teal/10 px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold text-av-alloy/60">
        Out of Stock
      </div>
    ) : (
      <button
        type="button"
        onClick={onAdd}
        className={cn(
          "inline-flex items-center justify-center gap-2 bg-av-gold text-av-deep px-8 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition",
          className
        )}
      >
        {added ? <><Check className="h-5 w-5" /> Added</> : <>Add to Cart · {formatNZD(product.price)}</>}
      </button>
    );

  return (
    <div>
      {/* 1. HERO */}
      <section className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <div className="frame-corner relative overflow-hidden bg-av-teal/20">
            <img src={L.gallery[active]?.src} alt={L.gallery[active]?.alt || product.name} className="w-full h-auto block" />
          </div>
          {L.gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {L.gallery.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={g.alt}
                  aria-pressed={i === active}
                  className={cn(
                    "overflow-hidden bg-av-teal/20 border transition",
                    i === active ? "border-av-gold" : "border-av-teal/40 hover:border-av-gold/60"
                  )}
                >
                  <img src={g.src} alt="" loading="lazy" className="w-full h-auto block" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-7">
          <div>
            <Eyebrow>{product.headline}</Eyebrow>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-av-alloy">
              {product.display_name || product.name}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-av-gold/90 leading-relaxed">{L.subtitle}</p>
            {L.promise && <p className="mt-5 font-display text-xl md:text-2xl font-semibold text-av-alloy leading-snug">{L.promise}</p>}
          </div>

          <div className={cn("space-y-4 text-av-alloy/70 leading-relaxed", !L.promise && "-mt-2")}>
            {L.intro.map((t) => <p key={t}>{t}</p>)}
          </div>

          <div className="border-y border-av-teal/40 py-6 flex items-baseline gap-3 flex-wrap">
            <span className="font-display text-4xl md:text-5xl font-bold text-av-gold">{formatNZD(product.price)}</span>
            {saving > 0 && (
              <>
                <span className="text-lg text-av-alloy/40 line-through">{formatNZD(separate)}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">Save {formatNZD(saving)}</span>
              </>
            )}
          </div>

          <div>
            <AddButton className="w-full md:w-auto" />
            {product.allergen && <p className="mt-4 text-sm font-semibold text-av-alloy/80">{product.allergen}</p>}
          </div>

          <ul className="space-y-3">
            {items.map(({ inc, p }) => (
              <li key={p.id}>
                <Link to={`/product/${p.slug}`} className="group flex items-center gap-4 border border-av-teal/40 hover:border-av-gold/60 transition p-3">
                  <img src={p.image} alt="" loading="lazy" className="h-16 w-16 object-cover shrink-0 bg-av-teal/20" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-av-alloy group-hover:text-av-gold transition">
                      {p.display_name || p.name}{inc.quantity > 1 ? ` × ${inc.quantity}` : ""}
                    </p>
                    <p className="text-xs text-av-alloy/60 truncate">{p.tagline}</p>
                  </div>
                  <span className="text-sm text-av-alloy/50 shrink-0">{formatNZD(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-3 gap-3 text-center">
            {(L.trust || []).map((t) => {
              const Icon = ICONS[t.icon] || Check;
              return (
                <div key={t.label} className="border border-av-teal/30 p-3">
                  <Icon className="h-5 w-5 mx-auto text-av-gold" aria-hidden="true" />
                  <p className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-av-alloy/70 leading-snug">{t.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. BENEFITS */}
      <section className="mt-24 md:mt-32" aria-labelledby="landing-benefits">
        <ScrollReveal className="max-w-3xl">
          <Eyebrow>{L.benefits.eyebrow}</Eyebrow>
          <H2 id="landing-benefits">{L.benefits.heading}</H2>
        </ScrollReveal>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {L.benefits.items.map((b, i) => (
            <ScrollReveal key={b.title} delay={(i % 2) * 0.06} className="border border-av-teal/40 bg-av-teal/5 p-7 md:p-9 flex flex-col">
              <div className="font-mono text-av-gold/50 text-sm">0{i + 1}</div>
              <h3 className="mt-2 font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-av-alloy">{b.title}</h3>
              <div className="mt-4 space-y-3 text-sm md:text-base text-av-alloy/70 leading-relaxed">
                {b.paragraphs.map((t) => <p key={t}>{t}</p>)}
              </div>
              {b.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {b.bullets.map((x) => (
                    <li key={x} className="flex gap-3 text-sm md:text-base text-av-alloy/85">
                      <Check className="h-4 w-4 mt-1 shrink-0 text-av-gold" aria-hidden="true" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              )}
              {b.why && (
                <div className="mt-6 pt-5 border-t border-av-teal/40 border-l-2 border-l-av-gold pl-4 mt-auto">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-av-gold mb-1.5">Why it matters</p>
                  <p className="text-sm text-av-alloy/85 leading-relaxed">{b.why}</p>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="mt-24 md:mt-32" aria-labelledby="landing-how">
        <ScrollReveal className="max-w-3xl">
          <Eyebrow>{L.how.eyebrow}</Eyebrow>
          <H2 id="landing-how">{L.how.heading}</H2>
        </ScrollReveal>
        <ol className="mt-12 max-w-3xl">
          {L.how.steps.map((st, i) => (
            <li key={st.title} className="relative pl-16 pb-10 last:pb-0">
              {i < L.how.steps.length - 1 && <span className="absolute left-[19px] top-10 bottom-0 w-px bg-av-teal/50" aria-hidden="true" />}
              <span className="absolute left-0 top-0 grid place-items-center h-10 w-10 rounded-full border border-av-gold text-av-gold font-display font-bold">
                {i + 1}
              </span>
              <ScrollReveal>
                <p className="text-[11px] uppercase tracking-[0.25em] text-av-gold/80">Step {i + 1}</p>
                <h3 className="mt-1 font-display text-xl md:text-2xl font-bold text-av-alloy">{st.title}</h3>
                <div className="mt-3 space-y-3 text-av-alloy/70 leading-relaxed">
                  {st.paragraphs.map((t) => <p key={t}>{t}</p>)}
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        {L.how.result && (
          <ScrollReveal className="mt-10 max-w-3xl border border-av-gold/40 bg-av-gold/5 p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.25em] text-av-gold mb-2">{L.how.result.label}</p>
            <p className="text-av-alloy/90 leading-relaxed md:text-lg">{L.how.result.text}</p>
          </ScrollReveal>
        )}

        {L.how.approach && (
        <ScrollReveal className="mt-14">
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-av-alloy mb-5">{L.how.approach.heading}</h3>
          <div className="grid md:grid-cols-3 gap-px bg-av-teal/30 border border-av-teal/30">
            {L.how.approach.items.map((a) => (
              <div key={a.name} className={cn("p-7 md:p-8", a.highlight ? "bg-av-gold/10" : "bg-av-deep")}>
                <p className={cn("font-display text-xl font-bold", a.highlight ? "text-av-gold" : "text-av-alloy")}>{a.name}</p>
                <p className="mt-3 text-sm text-av-alloy/75 leading-relaxed">{a.line}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
        )}
      </section>

      {/* 4. THE FORMULAS */}
      <section className="mt-24 md:mt-32" aria-labelledby="landing-products">
        <ScrollReveal className="max-w-3xl">
          <Eyebrow>{L.products.eyebrow}</Eyebrow>
          <H2 id="landing-products">{L.products.heading}</H2>
        </ScrollReveal>
        <div className="mt-12 space-y-20 md:space-y-28">
          {L.products.items.map((f, i) => {
            const p = all.find((x) => x.id === f.id);
            if (!p) return null;
            return (
              <article key={f.id} className="grid lg:grid-cols-5 gap-8 lg:gap-14 items-start">
                <ScrollReveal className={cn("lg:col-span-2", i % 2 === 1 && "lg:order-2")}>
                  <div className="frame-corner relative overflow-hidden bg-av-teal/20">
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-auto block" />
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {f.specs.map((sp) => (
                      <li key={sp} className="border border-av-teal/50 px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-av-alloy/80">{sp}</li>
                    ))}
                  </ul>
                  {p.supplement_facts_image && (
                    <details className="group mt-4 border border-av-teal/40">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-av-alloy/80 hover:text-av-gold">
                        View Supplement Facts
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <img src={p.supplement_facts_image} alt={`${p.name} supplement facts`} loading="lazy" className="w-full h-auto block border-t border-av-teal/40" />
                    </details>
                  )}
                  <Link to={`/product/${p.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-av-alloy hover:text-av-gold transition">
                    Full {p.name} details <ArrowRight className="h-4 w-4" />
                  </Link>
                </ScrollReveal>

                <ScrollReveal delay={0.1} className={cn("lg:col-span-3", i % 2 === 1 && "lg:order-1")}>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-av-gold">{f.kicker}</p>
                  <h3 className="mt-2 font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-av-alloy">
                    {p.display_name || p.name}
                  </h3>
                  {f.intro && <p className="mt-4 text-av-alloy/75 leading-relaxed">{f.intro}</p>}

                  <div className="mt-8 space-y-8">
                    {f.groups.map((g, gi) => (
                      <div key={gi}>
                        {g.title && (
                          <div className="mb-3">
                            <h4 className="font-display text-lg font-bold uppercase tracking-tight text-av-gold">{g.title}</h4>
                            {g.sub && <p className="text-[11px] uppercase tracking-[0.2em] text-av-alloy/55 mt-1">{g.sub}</p>}
                          </div>
                        )}
                        {g.lead && <p className="mb-3 text-av-alloy/75">{g.lead}</p>}
                        <ul className="border-t border-av-teal/30">
                          {g.items.map((it) => (
                            <li key={it.label} className="border-b border-av-teal/30 py-4 flex gap-4 md:gap-5">
                              {it.image && (
                                <img src={it.image} alt={it.label} loading="lazy" className="h-28 w-28 md:h-36 md:w-36 object-cover shrink-0 border border-av-teal/40" />
                              )}
                              <div className="min-w-0">
                                <p className="font-semibold text-av-alloy">{it.label}</p>
                                {it.text && <p className="mt-1 text-sm text-av-alloy/70 leading-relaxed">{it.text}</p>}
                                {it.bullets && (
                                  <ul className="mt-2 space-y-1.5">
                                    {it.bullets.map((x) => (
                                      <li key={x} className="flex gap-2.5 text-sm text-av-alloy/75 leading-relaxed">
                                        <Check className="h-3.5 w-3.5 mt-1 shrink-0 text-av-gold" aria-hidden="true" />
                                        <span>{x}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {f.summary && (
                    <div className="mt-8 border border-av-gold/40 bg-av-gold/5 p-5 md:p-6">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-av-gold mb-2">{f.summaryLabel}</p>
                      <p className="text-av-alloy/85 leading-relaxed">{f.summary}</p>
                    </div>
                  )}
                </ScrollReveal>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. FITNESS EDUCATION */}
      <section className="mt-24 md:mt-32" aria-labelledby="landing-education">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <Eyebrow>{L.education.eyebrow}</Eyebrow>
          <H2 id="landing-education">{L.education.heading}</H2>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-av-alloy/50">{L.education.label}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="mt-10 max-w-3xl mx-auto">
          <blockquote className="border-l-2 border-av-gold bg-av-teal/10 px-6 md:px-10 py-8 space-y-5 text-av-alloy/85 leading-relaxed md:text-lg">
            {L.education.paragraphs.map((t, i) => (
              <p key={t} className={L.education.emphasizeLast && i === L.education.paragraphs.length - 1 ? "font-semibold text-av-alloy" : ""}>{t}</p>
            ))}
            {L.education.attribution && (
              <footer className="pt-2 text-xs uppercase tracking-[0.2em] text-av-alloy/50">— {L.education.attribution}</footer>
            )}
          </blockquote>
        </ScrollReveal>
      </section>

      {/* 6. WHY CHOOSE + CLOSING CTA */}
      <section className="mt-24 md:mt-32" aria-labelledby="landing-why">
        {L.why.heading && (
          <ScrollReveal className="max-w-3xl">
            <Eyebrow>{L.why.eyebrow}</Eyebrow>
            <H2 id="landing-why">{L.why.heading}</H2>
            <p className="mt-4 font-display text-xl text-av-gold">{L.why.subheading}</p>
            <p className="mt-6 text-av-alloy/75">{L.why.lead}</p>
            <ul className="mt-4 space-y-3">
              {L.why.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-av-alloy/85">
                  <Check className="h-5 w-5 mt-0.5 shrink-0 text-av-gold" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        )}

        <ScrollReveal className={cn(L.why.heading && "mt-14", "border border-av-gold/40 bg-av-gold/5 px-6 py-12 md:py-16 text-center")}>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-av-gold">{L.why.tagline}</p>
          <p className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight text-av-alloy">{L.why.name}</p>
          <p className="mt-4 text-sm md:text-base uppercase tracking-[0.25em] text-av-alloy/75">{L.why.signoff}</p>
          <div className="mt-8 flex items-baseline justify-center gap-3 flex-wrap">
            <span className="font-display text-4xl md:text-5xl font-bold text-av-gold">{formatNZD(product.price)}</span>
            {saving > 0 && (
              <>
                <span className="text-lg text-av-alloy/40 line-through">{formatNZD(separate)}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">Save {formatNZD(saving)}</span>
              </>
            )}
          </div>
          <div className="mt-6"><AddButton /></div>
        </ScrollReveal>
      </section>

      {/* 7. RECOMMENDED USE + DISCLAIMER */}
      {L.usageNote && (
        <div className="mt-14 mx-auto max-w-3xl border border-av-teal/50 bg-av-teal/10 px-6 py-5 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-av-gold mb-1.5">Recommended use</p>
          <p className="text-sm md:text-base text-av-alloy/85">{L.usageNote.replace(/^Recommended use:\s*/, "")}</p>
        </div>
      )}
      {L.disclaimer && <p className="mt-8 mx-auto max-w-3xl text-xs text-av-alloy/50 leading-relaxed text-center">{L.disclaimer}</p>}
    </div>
  );
}
