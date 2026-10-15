import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Plus, Star } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useProducts } from "@/hooks/useProducts";
import { formatNZD } from "@/lib/brand";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxText from "@/components/ParallaxText";
import ReviewCarousel from "@/components/ReviewCarousel";
import BundleShowcase from "@/components/BundleShowcase";
import { useSEO } from "@/hooks/useSEO";
import heroVideoMp4 from "@/assets/video/hero.mp4";
import heroVideoWebm from "@/assets/video/hero.webm";
import heroPoster from "@/assets/video/hero-poster.jpg";

const WHY = [
  { t: "Purpose-built performance products", d: "Engineered around real training demands — not generic wellness trends." },
  { t: "Fully disclosed formulas", d: "Every ingredient and dose printed clearly. No proprietary blends hiding under-dosed filler." },
  { t: "Effective, practical dosages", d: "Clinical, functional amounts that actually move the needle session after session." },
  { t: "Individual or complete stack", d: "Buy what you need, or grab the complete system and save." },
  { t: "Built for consistency", d: "Designed to support long-term progress, not a single hype cycle." },
];

function Rating({ value = 4.9, count = 128, className }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-[11px] text-av-alloy/80", className)}>
      <div className="flex text-av-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-av-gold text-av-gold" />
        ))}
      </div>
      <span>{value} ({count})</span>
    </div>
  );
}

export default function Home() {
  useSEO({
    title: "Performance Nutrition & Supplements",
    description: "Korzavo is a performance nutrition and supplement brand. Fully disclosed pre-workout, creatine, protein and recovery formulas — no proprietary blends, ever.",
    path: "/",
  });

  const heroVideoRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPref = (reduce) => {
      const el = heroVideoRef.current;
      if (!el) return;
      if (reduce) el.pause();
      else el.play().catch(() => {}); // autoplay can be rejected before user interaction on some browsers
    };
    applyMotionPref(mq.matches);
    const onChange = (e) => applyMotionPref(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { data: products } = useProducts();
  const all = products || [];
  const supplements = all.filter((p) => p.category === "supplement");
  const featured = supplements;
  const stack = all.find((p) => p.id === "complete-stack");
  const stackPrice = stack?.price || 259.99;
  // Kept in one place (also mirrored in Stack.jsx) rather than hardcoding
  // the line-through price and "Save $X" text separately, so they can't
  // drift out of sync again.
  const stackIndividualValue = 323.95;
  const stackSavings = stackIndividualValue - stackPrice;

  return (
    <div className="bg-av-deep">
      {/* HERO — video banner as its own block (guaranteed to start right at
          the top, under the transparent nav, since it's normal-flow content
          with a definite height rather than an absolutely-positioned layer
          inside a min-height flex parent). Text sits in its own block right
          after the video ends, not overlaid on top of it. */}
      <section className="relative">
        {/* Plain vh, not svh — svh silently collapses to zero height on
            mobile browsers that don't support it (rather than erroring),
            which is what caused the black gap at the top on some phones.
            bg-av-deep is a safety net so a failed/slow-loading video shows
            the brand background instead of pure black either way.
            The hero-poster background-image (matching the video's own
            object-position) is a second safety net: it paints instantly
            from the page's HTML/CSS, before the video file has downloaded
            or decoded a frame, so there's never a blank flash while the
            (much larger) video is still loading on a mobile connection. */}
        <div
          className="relative h-[55vh] md:h-[75vh] w-full overflow-hidden grain bg-av-deep bg-cover bg-top md:bg-center"
          style={{ backgroundImage: `url(${heroPoster})` }}
        >
          <video
            ref={heroVideoRef}
            className="absolute inset-0 h-full w-full object-cover object-top md:object-center"
            autoPlay
            muted
            loop
            playsInline
            poster={heroPoster}
            aria-hidden="true"
          >
            <source src={heroVideoWebm} type="video/webm" />
            <source src={heroVideoMp4} type="video/mp4" />
          </video>
          {/* Soft fade into the text block below, so the cut isn't abrupt */}
          <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-b from-transparent to-av-deep" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full px-5 md:px-10 py-10 md:py-14"
        >
          <div className="mx-auto max-w-[1400px] text-center">
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-av-alloy text-balance">
              Fuel Your Strength.<br />
              <span className="text-av-gold">Elevate Your Performance.</span>
            </h1>
            <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/shop" className="group inline-flex items-center gap-2 bg-av-gold text-av-deep px-6 md:px-7 py-3 md:py-3.5 rounded-full text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition">
                Shop The Range <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link to="/stack" className="inline-flex items-center gap-2 border-2 border-av-teal text-av-alloy px-6 md:px-7 py-3 md:py-3.5 rounded-full text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold hover:border-av-gold hover:text-av-gold transition">
                Build Your Stack
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* RANGE */}
      <section className="relative py-10 md:py-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">Our Performance Range</p>
              <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight text-av-alloy max-w-2xl">
                A complete system for people who train with purpose.
              </h2>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-av-alloy hover:text-av-gold transition">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14">
            {featured.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.08}>
                <Link to={`/product/${p.slug}`} className="group block frame-corner relative overflow-hidden">
                  <div className="aspect-[4/5] overflow-hidden bg-av-teal/20">
                    <Image src={p.image} alt={p.name} fittingType="fill" className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </Link>
                <div className="mt-3 md:mt-4">
                  <h3 className="font-display text-base md:text-xl font-bold text-av-alloy">{p.name}</h3>
                  <p className="text-xs md:text-sm text-av-alloy/80">{p.tagline}</p>
                  <p className="mt-2 text-av-gold font-semibold text-sm md:text-base">{formatNZD(p.price)}</p>
                  {p.inStock === false ? (
                    <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-av-alloy/50">Out of Stock</p>
                  ) : (
                    <Rating className="mt-1" />
                  )}
                </div>
              </ScrollReveal>
            ))}
            {/* Same card footprint as a product tile, sitting right beside
                the last product (Fuel) rather than buried elsewhere. */}
            <ScrollReveal delay={featured.length * 0.08}>
              <Link
                to="/shop"
                className="group flex flex-col items-center justify-center gap-3 text-center aspect-[4/5] frame-corner border border-av-teal/50 bg-av-teal/10 hover:bg-av-teal/20 transition-colors"
              >
                <ArrowUpRight className="h-7 w-7 text-av-gold transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span className="font-display text-base md:text-lg font-bold text-av-alloy px-4">View Full Range</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-av-gold">Shop Now</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="relative py-10 md:py-16 overflow-hidden">
        <ParallaxText className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <span className="font-display text-[20vw] font-black tracking-tighter text-av-teal/25">STACK</span>
        </ParallaxText>
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <ScrollReveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">The Korzavo Stack</p>
            <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight text-av-alloy">
              One system. Five products. Total performance.
            </h2>
            <p className="mt-5 md:mt-6 text-av-alloy/70 leading-relaxed max-w-lg text-sm md:text-base">
              EXPLOVEX, KORZIX, CREATINE, GROW and GLYCOLOAD together as a complete performance system — supporting preparation, training, nutrition and recovery.
            </p>
            <div className="mt-6 md:mt-8 flex items-baseline gap-4 flex-wrap">
              <span className="font-display text-4xl md:text-5xl font-bold text-av-gold">{formatNZD(stackPrice)}</span>
              <span className="text-av-alloy/50 line-through">{formatNZD(stackIndividualValue)}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">Save {formatNZD(stackSavings)}</span>
            </div>
            <Rating value={4.9} count={312} className="mt-4" />
            <Link to="/stack" className="mt-6 md:mt-8 inline-flex items-center gap-2 bg-av-gold text-av-deep px-6 md:px-7 py-3 md:py-3.5 rounded-full text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition">
              Shop The Stack <ArrowUpRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="frame-corner overflow-hidden bg-av-teal/20">
            {/* Plain <img> at its natural aspect ratio — the stack graphic
                is a designed collage, so forcing it into a fixed aspect box
                (as the featured-product photos do) squashed/stretched it. */}
            {stack && (
              <img
                src={stack.image}
                alt={stack.name}
                className="w-full h-auto block"
                loading="lazy"
              />
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* STACKS & BUNDLES SPOTLIGHT */}
      <BundleShowcase />

      {/* WHY */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <ScrollReveal className="mb-6 md:mb-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">Why Korzavo</p>
            <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight text-av-alloy max-w-3xl">
              No filler. No noise. Just performance.
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-av-teal/30 border border-av-teal/30">
            {WHY.map((w, i) => (
              <ScrollReveal key={i} delay={(i % 3) * 0.06} className="bg-av-deep p-6 md:p-10">
                <h3 className="font-display text-lg md:text-xl font-bold text-av-alloy mb-3">{w.t}</h3>
                <p className="text-sm text-av-alloy/60 leading-relaxed">{w.d}</p>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.18} className="bg-av-gold text-av-deep p-6 md:p-10 flex flex-col justify-between">
              <Plus className="h-8 w-8" />
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold mt-6">Build Your Performance System</h3>
                <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-bold">
                  Shop The Range <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-10 md:py-16 border-y border-av-teal/30">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <ScrollReveal className="text-center mb-6 md:mb-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">Trusted By Athletes</p>
            <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight text-av-alloy">What they say</h2>
          </ScrollReveal>
          <ReviewCarousel />
        </div>
      </section>

      {/* CTA */}
      <section className="pt-10 pb-6 md:pt-16 md:pb-8 text-center">
        <ScrollReveal className="mx-auto max-w-[1400px] px-5 md:px-10">
          <h2 className="font-display text-3xl md:text-6xl font-bold text-av-alloy">Ready to elevate?</h2>
          <p className="mt-4 text-av-alloy/60 max-w-xl mx-auto text-sm md:text-base">
            Build your performance system and fuel your training with purpose.
          </p>
          <Link to="/shop" className="mt-6 md:mt-8 inline-flex items-center gap-2 bg-av-gold text-av-deep px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition">
            Shop The Range <ArrowUpRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
