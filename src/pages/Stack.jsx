import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Star, ShoppingBag } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useProducts } from "@/hooks/useProducts";
import { formatNZD } from "@/lib/brand";
import { useCart } from "@/context/CartContext";
import ScrollReveal from "@/components/ScrollReveal";
import BundleShowcase from "@/components/BundleShowcase";
import { useSEO } from "@/hooks/useSEO";

export default function Stack() {
  useSEO({
    title: "The Complete Stack",
    description: "EXPLOVEX, KORZIX, CREATINE, GROW and GLYCOLOAD bundled as a complete performance nutrition system — a discounted one-time purchase for training, nutrition and recovery.",
    path: "/stack",
  });

  const { data: products } = useProducts();
  const { addItem } = useCart();
  const [packed, setPacked] = useState([]);
  const [addedCount, setAddedCount] = useState(0);
  const addedTimer = useRef(null);
  useEffect(() => () => clearTimeout(addedTimer.current), []);

  // Floating copy of the summary bar, shown while the inline one is off-screen.
  // (CSS `position: sticky` doesn't work here because <body> clips overflow.)
  const inlineBarRef = useRef(null);
  const [inlineBarVisible, setInlineBarVisible] = useState(true);
  useEffect(() => {
    const el = inlineBarRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInlineBarVisible(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The Stack Builder offers every individual product (all non-bundle items),
  // so customers can build their own system from the full range.
  const builderProducts = (products || []).filter((p) => p.category !== "stack");
  const stack = (products || []).find((p) => p.id === "complete-stack");

  // Click a product to pack it; click it again to take it back out.
  const togglePack = (p) => {
    if (p.inStock === false) return;
    setAddedCount(0);
    setPacked((prev) => (prev.includes(p.id) ? prev.filter((id) => id !== p.id) : [...prev, p.id]));
  };

  const packedProducts = builderProducts.filter((p) => packed.includes(p.id));
  const packedTotal = packedProducts.reduce((sum, p) => sum + p.price, 0);
  const selectableProducts = builderProducts.filter((p) => p.inStock !== false);
  const allPacked = selectableProducts.length > 0 && packed.length === selectableProducts.length;

  const addPackedToCart = () => {
    if (!packedProducts.length) return;
    packedProducts.forEach((p) =>
      addItem({
        productId: p.id,
        name: p.name,
        slug: p.slug,
        image: p.image,
        price: p.price,
        purchaseType: "one_time",
      })
    );
    setAddedCount(packedProducts.length);
    setPacked([]);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAddedCount(0), 6000);
  };

  const addStack = () => {
    if (!stack) return;
    addItem({
      productId: stack.id,
      name: stack.name,
      slug: stack.slug,
      image: stack.image,
      price: stack.price,
      purchaseType: "one_time",
    });
  };

  const summaryBar = (
    <div className="border border-av-teal/50 bg-av-deep/95 backdrop-blur-md rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
      <div aria-live="polite">
        {addedCount > 0 ? (
          <>
            <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
              {addedCount} {addedCount === 1 ? "product" : "products"} added to your cart
            </p>
            <Link to="/cart" className="mt-1 inline-flex items-center gap-1.5 text-sm text-av-gold hover:underline underline-offset-4">
              View cart <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </>
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-[0.25em] text-av-alloy/50">Your Stack</p>
            <p className="mt-1 text-av-alloy">
              {packedProducts.length === 0 ? (
                <span className="text-av-alloy/60 text-sm">Nothing packed yet — pick products above.</span>
              ) : (
                <>
                  <span className="font-display text-2xl font-bold text-av-gold">{formatNZD(packedTotal)}</span>
                  <span className="ml-3 text-sm text-av-alloy/60">
                    {packedProducts.length} {packedProducts.length === 1 ? "product" : "products"}
                  </span>
                </>
              )}
            </p>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={addPackedToCart}
        disabled={packedProducts.length === 0}
        className="inline-flex items-center justify-center gap-2 bg-av-gold text-av-deep px-7 py-3.5 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
      >
        <ShoppingBag className="h-4 w-4" />
        Add {packedProducts.length > 0 ? `${packedProducts.length} ` : ""}to Cart
      </button>
    </div>  );

  const individualValue = 323.95;
  const stackPrice = stack?.price || 259.99;
  const savings = individualValue - stackPrice;

  return (
    <div className="bg-av-deep pt-28 md:pt-36 pb-24">
      <section className="mx-auto max-w-[1400px] px-5 md:px-10">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">The Korzavo Stack</p>
          <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-av-alloy max-w-4xl">
            One pack. Three systems. Total daily performance.
          </h1>
          <p className="mt-6 text-lg text-av-alloy/70 max-w-2xl">
            Get all five products together as a complete performance system — designed to support preparation, training, nutrition and recovery.
          </p>
        </ScrollReveal>

        {/* TIERED SAVINGS */}
        <ScrollReveal delay={0.1} className="mt-12 grid md:grid-cols-2 gap-px bg-av-teal/30 border border-av-teal/30">
          <div className="bg-av-deep p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-av-alloy/50">Individual Value</p>
            <p className="font-display text-5xl font-bold text-av-alloy/60 mt-3 line-through">{formatNZD(individualValue)}</p>
            <p className="text-sm text-av-alloy/50 mt-3">EXPLOVEX + KORZIX + CREATINE + GROW + GLYCOLOAD bought separately</p>
          </div>
          <div className="bg-av-gold text-av-deep p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-av-deep/70">Stack Price</p>
            <p className="font-display text-5xl font-bold mt-3">{formatNZD(stackPrice)}</p>
            <p className="text-sm mt-3 font-semibold">You save {formatNZD(savings)}</p>
          </div>
        </ScrollReveal>

        {/* STACK BUILDER */}
        <div className="mt-20">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-av-alloy mb-3">Stack Builder</h2>
              <p className="text-av-alloy/60 max-w-xl">
                Click any product to pack it into your system — click it again to take it out. Then add your picks to the cart.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPacked(allPacked ? [] : selectableProducts.map((p) => p.id))}
              className="self-start md:self-auto text-xs uppercase tracking-[0.2em] text-av-alloy/60 hover:text-av-gold transition"
            >
              {allPacked ? "Clear selection" : "Select all"}
            </button>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {builderProducts.map((p) => {
              const isPacked = packed.includes(p.id);
              const soldOut = p.inStock === false;
              return (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() => togglePack(p)}
                  disabled={soldOut}
                  aria-pressed={isPacked}
                  whileTap={soldOut ? undefined : { scale: 0.97 }}
                  className="group text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div
                    className={
                      "relative frame-corner overflow-hidden bg-av-teal/20 aspect-[4/5] transition-shadow " +
                      (isPacked ? "ring-2 ring-av-gold" : "")
                    }
                  >
                    <Image src={p.image} alt={p.name} fittingType="fill" className="h-full w-full" />
                    <AnimatePresence>
                      {isPacked && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-av-deep/40 grid place-items-center"
                        >
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="grid place-items-center h-12 w-12 rounded-full bg-av-gold text-av-deep"
                          >
                            <Check className="h-6 w-6" />
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-display text-lg font-bold text-av-alloy">{p.name}</h3>
                    <p className="text-xs text-av-alloy/80">{p.tagline}</p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-av-gold/80">
                        {soldOut ? "Out of stock" : isPacked ? "Packed · tap to remove" : "Tap to pack"}
                      </p>
                      <p className="text-sm font-semibold text-av-alloy/80">{formatNZD(p.price)}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* YOUR STACK — summary + add to cart */}
          <div ref={inlineBarRef} className="mt-10">
            {summaryBar}
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-av-teal/40 pt-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-av-alloy/50">Complete Performance Stack</p>
              <p className="font-display text-4xl font-bold text-av-gold mt-1">{formatNZD(stackPrice)}</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              {/* Trust signal placed right at the decision point, not
                  buried below the fold with the single review carousel. */}
              <div className="flex items-center gap-1.5 text-[11px] text-av-alloy/80">
                <div className="flex text-av-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-av-gold text-av-gold" />
                  ))}
                </div>
                <span>4.9 rating from 300+ athletes</span>
              </div>
              {stack?.inStock === false ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-av-teal/60 bg-av-teal/10 px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold text-av-alloy/60">
                  Out of Stock
                </div>
              ) : (
                <button
                  onClick={addStack}
                  className="inline-flex items-center gap-2 bg-av-gold text-av-deep px-8 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition"
                >
                  Add Stack To Cart <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <ScrollReveal className="mt-16 text-center">
          <Link to="/shop" className="text-sm uppercase tracking-[0.2em] text-av-alloy/60 hover:text-av-gold transition">
            Or shop individual products →
          </Link>
        </ScrollReveal>
      </section>

      {/* More stacks & bundles */}
      <BundleShowcase className="mt-10 md:mt-16" />

      {/* Floating summary: visible only while picks exist and the inline bar is out of view */}
      <AnimatePresence>
        {!inlineBarVisible && (packed.length > 0 || addedCount > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-3 inset-x-3 md:inset-x-10 z-40 mx-auto max-w-[1200px]"
          >
            {summaryBar}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
