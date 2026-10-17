import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { formatNZD, SITE_URL } from "@/lib/brand";
import { useCart } from "@/context/CartContext";
import FuelBar from "@/components/FuelBar";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import { researchForIngredient } from "@/lib/ingredientResearch";
import IngredientStory from "@/components/IngredientStory";
import { useSEO } from "@/hooks/useSEO";

// Search results show ~155-160 characters. Trim the product blurb at a word
// boundary and always keep the price + brand name on the end of the line.
function productMetaDescription(product) {
  const suffix = ` ${formatNZD(product.price)} — shop ${product.name} at Korzavo.`;
  const room = 160 - suffix.length;
  const text = String(product.meta_description || product.description || "").replace(/\s+/g, " ").trim();
  if (text.length <= room) return text + suffix;
  const cut = text.slice(0, room - 1);
  const atWord = cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—-]+$/, "");
  return `${atWord}…${suffix}`;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { data: product, isLoading } = useProduct(slug);
  const { data: all } = useProducts();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useSEO({
    title: product ? product.name : "Product",
    description: product ? productMetaDescription(product) : undefined,
    path: `/product/${slug}`,
    noindex: !product && !isLoading,
    image: product?.image ? `${SITE_URL}${product.image}` : undefined,
    type: "product",
    structuredData: product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.meta_description || product.description,
          image: `${SITE_URL}${product.image}`,
          sku: product.id,
          brand: { "@type": "Brand", name: "Korzavo" },
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/product/${product.slug}`,
            priceCurrency: "NZD",
            price: product.price,
            availability: product.inStock === false
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
          },
        }
      : null,
  });

  if (isLoading)
    return <div className="pt-40 min-h-screen bg-av-deep" />;

  if (!product)
    return (
      <div className="pt-40 min-h-screen bg-av-deep text-center">
        <p className="text-av-alloy/60">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block text-av-gold">Back to shop</Link>
      </div>
    );

  const price = product.price;

  const related = (all || []).filter((p) => p.id !== product.id && p.category !== "stack").slice(0, 3);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price,
      purchaseType: "one_time",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-av-deep pt-24 md:pt-28 pb-12 md:pb-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <nav className="text-[11px] uppercase tracking-[0.2em] text-av-alloy/40 mb-8">
          <Link to="/shop" className="hover:text-av-gold">Shop</Link> / <span className="text-av-alloy/70">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* STICKY IMAGE */}
          <div className="md:sticky md:top-28 md:self-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="frame-corner relative overflow-hidden bg-av-teal/20 aspect-[4/5]"
            >
              <Image src={product.image} alt={product.name} fittingType="fill" className="h-full w-full" />
            </motion.div>
            {product.supplement_facts_image && (
              // Plain <img>, not the cropping <Image> component: this is a
              // pre-designed, text-heavy facts graphic that must display in
              // full and uncropped, at its own natural aspect ratio.
              <ScrollReveal delay={0.1} className="mt-6 frame-corner relative overflow-hidden bg-av-teal/20">
                <img
                  src={product.supplement_facts_image}
                  alt={`${product.name} supplement facts`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </ScrollReveal>
            )}
          </div>

          {/* BLUEPRINT */}
          <div className="space-y-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">{product.headline || product.tagline}</p>
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-av-alloy">{product.display_name || product.name}</h1>
              <p className="mt-5 text-av-alloy/70 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* PRICE */}
            <div className="border-y border-av-teal/40 py-6">
              <div className="hidden md:flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-av-gold">{formatNZD(price)}</span>
                {product.compare_at_price && product.compare_at_price > price && (
                  <>
                    <span className="text-lg text-av-alloy/40 line-through">{formatNZD(product.compare_at_price)}</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">Launch Price</span>
                  </>
                )}
              </div>
            </div>

            {/* ADD */}
            {product.inStock === false ? (
              <div className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-av-teal/60 bg-av-teal/10 px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold text-av-alloy/60">
                Out of Stock
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-av-gold text-av-deep px-8 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition"
              >
                {added ? <><Check className="h-5 w-5" /> Added</> : <>Add to Cart · {formatNZD(price)}</>}
              </button>
            )}

            {/* ALLERGEN NOTE (optional) — kept right next to the purchase button */}
            {product.allergen && (
              <p className="-mt-6 text-sm font-semibold text-av-alloy/80">{product.allergen}</p>
            )}

            {/* LONG DESCRIPTION (optional extra paragraphs) */}
            {product.long_description?.length > 0 && (
              <div className="space-y-4">
                {product.long_description.map((para, i) => (
                  <p key={i} className="text-av-alloy/70 leading-relaxed">{para}</p>
                ))}
              </div>
            )}

            {/* KEY BENEFITS */}
            {product.benefits?.length > 0 && (
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-4">Key Benefits</h2>
                <ul className="space-y-3">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex gap-3 text-av-alloy/80">
                      <Check className="h-5 w-5 text-av-gold shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CLOSING LINE (optional sign-off) */}
            {product.closing_line && (
              <p className="font-display text-sm md:text-base font-bold uppercase tracking-[0.2em] text-av-gold">
                {product.closing_line}
              </p>
            )}

            {/* BUNDLE CONTENTS (optional) */}
            {product.includes?.length > 0 && (
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-4">What’s Included</h2>
                <div className="border border-av-teal/40">
                  {product.includes.map((inc) => {
                    const item = (all || []).find((x) => x.id === inc.id);
                    if (!item) return null;
                    return (
                      <Link
                        key={inc.id}
                        to={`/product/${item.slug}`}
                        className="flex items-center justify-between px-5 py-3 text-sm border-b border-av-teal/30 last:border-0 text-av-alloy/80 hover:text-av-gold transition-colors"
                      >
                        <span>{item.name}</span>
                        <span className="text-av-alloy/50">× {inc.quantity}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SPECS */}
            {(product.servings || product.size || product.usage || product.fit) && (
              <div className="grid grid-cols-2 gap-px bg-av-teal/30 border border-av-teal/30">
                {product.servings && <Spec label="Servings" value={product.servings} />}
                {product.size && <Spec label="Size" value={product.size} />}
                {product.usage && <Spec label="Usage" value={product.usage} full />}
                {product.fit && <Spec label="Fit" value={product.fit} full />}
              </div>
            )}

            {/* INGREDIENTS / FORMULA */}
            {/* Always show the plain-text ingredient list alongside the
                designed facts graphic above — the graphic is decorative and
                its text isn't accessible to screen readers, and relying on
                it alone made ingredients easy to miss. */}
            {product.ingredients?.length > 0 && (
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-4">The Formula</h2>
                <div className="border border-av-teal/40">
                  {product.ingredients.map((ing, i) => (
                    <div key={i} className="flex justify-between px-5 py-3 text-sm border-b border-av-teal/30 last:border-0">
                      <span className="text-av-alloy/80">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCIENTIFIC RESEARCH — products with their own ingredient story
                (see IngredientStory below) already cover each ingredient. */}
            {product.ingredients?.length > 0 && !product.story && (
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-4">Scientific Research</h2>
                <div className="space-y-4">
                  {product.ingredients
                    .map((ing) => ({ ing, res: researchForIngredient(ing) }))
                    .filter((x) => x.res)
                    .map((x, i) => (
                      <div key={i} className="border border-av-teal/40 p-5 rounded">
                        <h3 className="font-display text-sm font-bold text-av-alloy mb-1">{x.res.name}</h3>
                        <p className="text-sm text-av-alloy/70 leading-relaxed">{x.res.note}</p>
                        <p className="text-[11px] text-av-alloy/40 mt-2 italic">{x.res.ref}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* INGREDIENT STORY (optional, per product) */}
        <IngredientStory product={product} />

        {/* RELATED */}
        {related.length > 0 && (
          <section className="mt-24 md:mt-32">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-av-alloy mb-10">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.slug}`} className="group">
                  <div className="frame-corner relative aspect-[4/5] overflow-hidden bg-av-teal/20">
                    <Image src={p.image} alt={p.name} fittingType="fill" className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-display text-lg font-bold text-av-alloy group-hover:text-av-gold transition">{p.name}</h3>
                      <p className="text-sm text-av-alloy/60">{p.tagline}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-av-gold opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <FuelBar product={product} purchaseType="one_time" price={price} />
    </div>
  );
}

function Spec({ label, value, full }) {
  return (
    <div className={cn("bg-av-deep p-5", full && "col-span-2")}>
      <div className="text-[10px] uppercase tracking-[0.25em] text-av-gold/70 mb-2">{label}</div>
      <div className="text-av-alloy/90 text-sm">{value}</div>
    </div>
  );
}