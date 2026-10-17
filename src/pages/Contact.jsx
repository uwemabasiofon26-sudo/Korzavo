import { useState } from "react";
import { Mail, LifeBuoy, MapPin, MessageSquare } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { CURRENCY, EMAIL_GENERAL, EMAIL_SUPPORT } from "@/lib/brand";
import { useSEO } from "@/hooks/useSEO";

export default function Contact() {
  useSEO({
    title: "Contact Us",
    description: "Get in touch with Korzavo for questions about our performance nutrition and supplement products or your order.",
    path: "/contact",
  });

  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-av-deep pt-28 md:pt-36 pb-20 md:pb-24">
      <section className="mx-auto max-w-[1400px] px-5 md:px-10">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">Contact</p>
          <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-av-alloy max-w-3xl leading-[1.05]">
            Talk to the performance team.
          </h1>
          <p className="mt-4 md:mt-5 text-sm md:text-base text-av-alloy/70 max-w-xl">
            Questions about products or your order? We're here to help. Use {EMAIL_GENERAL} for general enquiries and {EMAIL_SUPPORT} for customer service.
          </p>
        </ScrollReveal>

        {/* Info cards */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-av-teal/30 border border-av-teal/30">
          {[
            { icon: Mail, label: "General Enquiries", value: EMAIL_GENERAL, href: `mailto:${EMAIL_GENERAL}` },
            { icon: LifeBuoy, label: "Customer Service", value: EMAIL_SUPPORT, href: `mailto:${EMAIL_SUPPORT}` },
            { icon: MapPin, label: "Location", value: "Auckland, New Zealand" },
            { icon: MessageSquare, label: "Hours", value: "Mon–Fri · 9am–5pm NZST" },
          ].map((c, i) => (
            <ScrollReveal key={i} delay={i * 0.08} className="bg-av-deep p-6 md:p-8">
              <c.icon className="h-6 w-6 text-av-gold mb-4" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-av-alloy/50">{c.label}</p>
              {c.href ? (
                <a href={c.href} className="block text-av-alloy mt-1 text-sm break-words hover:text-av-gold transition-colors">{c.value}</a>
              ) : (
                <p className="text-av-alloy mt-1 text-sm break-words">{c.value}</p>
              )}
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-10 md:gap-12">
          {/* Form */}
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-av-alloy mb-5">Send a message</h2>
            {sent ? (
              <div className="border border-av-gold/40 bg-av-gold/10 p-6 md:p-8 rounded">
                <p className="text-av-gold font-semibold">Message received.</p>
                <p className="text-av-alloy/70 mt-2 text-sm">We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4 md:space-y-5">
                <Field label="Name" value={form.name} onChange={update("name")} required />
                <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
                <Field label="Subject" value={form.subject} onChange={update("subject")} required />
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-av-alloy/50 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    className="w-full bg-transparent border border-av-teal rounded px-4 py-3 text-sm text-av-alloy placeholder:text-av-alloy/40 focus:border-av-gold outline-none transition resize-none"
                  />
                </div>
                <button type="submit" className="w-full sm:w-auto bg-av-gold text-av-deep px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition">
                  Send Message
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Status */}
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-av-alloy mb-5">System status</h2>
            <div className="border border-av-teal/40 rounded-lg divide-y divide-av-teal/30">
              {[
                { label: "Currency", value: CURRENCY },
                { label: "Shipping", value: "Operational", valueClass: "text-emerald-400" },
                { label: "Support", value: "Online", valueClass: "text-emerald-400" },
                { label: "Region", value: "New Zealand" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-5 py-4">
                  <span className="text-sm text-av-alloy/50">{row.label}</span>
                  <span className={`text-sm font-medium ${row.valueClass || "text-av-alloy"}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
                  </div>
      </section>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.2em] text-av-alloy/50 mb-2">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border border-av-teal rounded px-4 py-3 text-sm text-av-alloy focus:border-av-gold outline-none transition"
      />
    </div>
  );
}