import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

// Full-width, image-led ingredient sections shown below the main product
// columns. Content comes from `product.story` in productData.js — add a
// `story` (and optionally `guarantee` / `disclaimer`) to a product and this
// renders automatically.
export default function IngredientStory({ product, onCta }) {
  const { story, guarantee, disclaimer } = product;
  if (!story?.items?.length) return null;
  let splitCount = 0; // alternates image side across the split (non-wide) items

  return (
    <section className="mt-24 md:mt-32" aria-labelledby="ingredient-story-heading">
      <ScrollReveal>
        <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">{story.eyebrow || "Inside the Formula"}</p>
        <h2
          id="ingredient-story-heading"
          className="font-display text-3xl md:text-6xl font-bold uppercase tracking-tight text-av-alloy max-w-4xl leading-[1.05]"
        >
          {story.heading}
        </h2>
      </ScrollReveal>

      <div className="mt-12 md:mt-20 space-y-16 md:space-y-28">
        {story.items.map((item, i) =>
          item.wide ? (
            <article key={item.name || item.alt || i} className="space-y-8 md:space-y-10">
              {item.image && (
                <ScrollReveal>
                  <div className="frame-corner relative overflow-hidden bg-av-teal/20">
                    <img
                      src={item.image}
                      alt={item.alt || item.name || product.name}
                      loading="lazy"
                      className="w-full h-auto block"
                    />
                  </div>
                </ScrollReveal>
              )}
              {(item.name || item.paragraphs?.length > 0 || item.href) && (
                <ScrollReveal delay={0.1} className="max-w-3xl mx-auto">
                  <ItemText item={item} index={i} numbered={story.numbered !== false} />
                </ScrollReveal>
              )}
            </article>
          ) : (
            (() => {
              const flip = item.flip ?? splitCount++ % 2 === 1;
              return (
            <article key={item.name} className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
              <ScrollReveal className={cn(flip && "md:order-2")}>
                {/* Plain <img>: square, text-bearing artwork that must show uncropped. */}
                <div className="frame-corner relative overflow-hidden bg-av-teal/20">
                  <img
                    src={item.image}
                    alt={item.alt || `${item.name} — ${product.name}`}
                    width={item.width || 1000}
                    height={item.height || 1000}
                    loading="lazy"
                    className="w-full h-auto block"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1} className={cn(flip && "md:order-1")}>
                <ItemText item={item} index={i} numbered={story.numbered !== false} />
              </ScrollReveal>
            </article>
              );
            })()
          )
        )}
      </div>

      {story.closing && (
        <ScrollReveal className="mt-20 md:mt-32 border-y border-av-teal/40 py-12 md:py-16 text-center">
          <h3 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight text-av-gold max-w-3xl mx-auto leading-tight">
            {story.closing.heading}
          </h3>
          {story.closing.body && (
            <p className="mt-4 text-av-alloy/70 max-w-xl mx-auto leading-relaxed">{story.closing.body}</p>
          )}
          {story.closing.cta && onCta && (
            <button
              type="button"
              onClick={onCta}
              className="mt-8 inline-flex items-center gap-2 bg-av-gold text-av-deep px-8 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition"
            >
              {story.closing.cta} <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </ScrollReveal>
      )}

      {guarantee && (
        <ScrollReveal className="mt-10 mx-auto max-w-3xl border border-av-gold/40 bg-av-gold/5 p-6 md:p-8 flex gap-4 md:gap-5">
          <ShieldCheck className="h-8 w-8 text-av-gold shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-display text-sm md:text-base font-bold uppercase tracking-[0.15em] text-av-gold">
              {guarantee.title}
            </h3>
            <p className="mt-2 text-av-alloy/80 leading-relaxed">{guarantee.body}</p>
            {guarantee.note && (
              <p className="mt-2 text-sm text-av-alloy/50">
                <Link to="/policy" className="underline underline-offset-4 hover:text-av-gold">
                  {guarantee.note}
                </Link>
              </p>
            )}
          </div>
        </ScrollReveal>
      )}

      {product.usage_note && (
        <div className="mt-12 mx-auto max-w-3xl border border-av-teal/50 bg-av-teal/10 px-6 py-5 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-av-gold mb-1.5">Recommended use</p>
          <p className="text-sm md:text-base text-av-alloy/85">{product.usage_note.replace(/^Recommended use:\s*/, "")}</p>
        </div>
      )}

      {disclaimer && (
        <p className="mt-8 mx-auto max-w-3xl text-xs text-av-alloy/50 leading-relaxed text-center">{disclaimer}</p>
      )}
    </section>
  );
}

function ItemText({ item, index, numbered }) {
  return (
    <>
      {numbered && <div className="font-mono text-av-gold/50 text-sm mb-3">0{index + 1}</div>}
      {item.name && (
        <h3 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight text-av-alloy">
          {item.name}
        </h3>
      )}
      {item.dose && (
        <p className="mt-3 text-[11px] md:text-xs uppercase tracking-[0.2em] text-av-gold">{item.dose}</p>
      )}
      {item.headline && (
        <p className="mt-6 font-display text-base md:text-lg font-semibold uppercase tracking-[0.08em] text-av-alloy">
          {item.headline}
        </p>
      )}
      {item.paragraphs?.length > 0 && (
        <div className="mt-4 space-y-4 text-av-alloy/70 leading-relaxed">
          {item.paragraphs.map((para, j) =>
            typeof para === "string" ? (
              <p key={j}>{para}</p>
            ) : (
              <p key={j}>
                <span className="block text-[11px] uppercase tracking-[0.25em] text-av-gold/80 mb-1">
                  {para.label}
                </span>
                {para.text}
              </p>
            )
          )}
        </div>
      )}
      {item.list?.items?.length > 0 && (
        <div className="mt-5">
          {item.list.label && (
            <p className="text-[11px] uppercase tracking-[0.25em] text-av-gold/80 mb-2">{item.list.label}</p>
          )}
          <ul className="space-y-2 text-av-alloy/80">
            {item.list.items.map((li) => (
              <li key={li} className="flex gap-3">
                <Check className="h-4 w-4 mt-1 shrink-0 text-av-gold" aria-hidden="true" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {item.ingredients?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4">
          {item.ingredients.map((ing) => (
            <figure key={ing.label} className="w-36">
              <img src={ing.src} alt={ing.label} loading="lazy" className="w-36 h-36 object-cover border border-av-teal/40" />
              <figcaption className="mt-2 text-[10px] uppercase tracking-[0.2em] text-av-alloy/60">Key ingredient<br /><span className="text-av-alloy/90">{ing.label}</span></figcaption>
            </figure>
          ))}
        </div>
      )}
      {item.note && <p className="mt-5 text-sm font-semibold text-av-alloy/90">{item.note}</p>}
      {item.href && (
        <Link
          to={item.href}
          className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-av-alloy hover:text-av-gold transition"
        >
          {item.cta || "View product"} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
      {item.tags && (
        <p className="mt-6 pt-5 border-t border-av-teal/40 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-av-alloy/50">
          {item.tags}
        </p>
      )}
    </>
  );
}
