import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/useSEO";

const FAQS = [
  {
    q: "How are the formulas disclosed?",
    a: "Every product lists its full ingredient breakdown with exact dosages — no proprietary blends. Supplement facts are printed on each product page and on the packaging.",
  },
  {
    q: "What currency are prices shown in?",
    a: "All prices are in New Zealand Dollars (NZD). We currently ship within New Zealand.",
  },
  {
    q: "What is the Complete Performance Stack?",
    a: "It's all five supplements — EXPLOVEX, ANDROZAR, CREATINE, GROW and GLYCOLOAD — bundled as a single one-time purchase at a discounted price of $259.99 (individual value $323.95).",
  },
  {
    q: "How should I use EXPLOVEX?",
    a: "Mix 1 scoop (15 g) with water 20–30 minutes before training. Do not exceed one serving per day.",
  },
];

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-av-teal/40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left"
      >
        <span className="flex items-center gap-4">
          <span className="font-mono text-av-gold/50 text-sm">0{index + 1}</span>
          <span className="font-display text-lg md:text-xl font-semibold text-av-alloy">{item.q}</span>
        </span>
        <span className="shrink-0 text-av-gold">
          {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-10 text-av-alloy/70 leading-relaxed max-w-3xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  useSEO({
    title: "About Us & FAQ",
    description: "Korzavo is a performance nutrition and supplement brand built on fully disclosed formulas — no proprietary blends. Learn our story and get answers to common questions.",
    path: "/about",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  });

  return (
    <div className="bg-av-deep pt-28 md:pt-36 pb-24">
      <section className="mx-auto max-w-[1400px] px-5 md:px-10">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">About Korzavo</p>
          <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-av-alloy max-w-4xl">
            Performance, engineered with intent.
          </h1>
        </ScrollReveal>

        <div className="mt-12 grid md:grid-cols-3 gap-px bg-av-teal/30 border border-av-teal/30">
          {[
            { t: "Purpose-built", d: "Products engineered around real training demands — not generic wellness trends." },
            { t: "Fully disclosed", d: "Every ingredient and dose printed clearly. No proprietary blends, no hidden filler." },
            { t: "Effective dosages", d: "Clinical, functional amounts that move the needle session after session." },
          ].map((c, i) => (
            <ScrollReveal key={i} delay={i * 0.08} className="bg-av-deep p-8 md:p-10">
              <div className="font-mono text-av-gold/50 text-sm mb-4">0{i + 1}</div>
              <h3 className="font-display text-2xl font-bold text-av-alloy mb-3">{c.t}</h3>
              <p className="text-av-alloy/60 leading-relaxed">{c.d}</p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16 max-w-3xl">
          <p className="text-lg text-av-alloy/80 leading-relaxed">
            KORZAVO is a premium performance brand combining sports supplements and performance nutrition. We exist for people who train with purpose and demand more from every session — combining the cold science of performance nutrition with the raw grit of athletic pursuit.
          </p>
        </ScrollReveal>
      </section>

      <section id="faq" className="mx-auto max-w-[1400px] px-5 md:px-10 mt-24 md:mt-32 scroll-mt-28">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">FAQ</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-av-alloy mb-10">
            Frequently asked questions
          </h2>
        </ScrollReveal>
        <div className="border-t border-av-teal/40">
          {FAQS.map((f, i) => (
            <FaqItem key={i} item={f} index={i} />
          ))}
        </div>
        <ScrollReveal className="mt-12">
          <p className="text-av-alloy/60">
            Still have questions?{" "}
            <Link to="/contact" className="text-av-gold underline underline-offset-4 hover:text-av-alloy">
              Contact our team
            </Link>
            .
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
