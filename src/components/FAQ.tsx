"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How far in advance should I book for a wedding?",
    a: "Peak wedding season usually books 8–12 months in advance. For off-season dates, 4–6 months is generally sufficient. Early booking ensures availability and better planning.",
  },
  {
    q: "What is included in the wedding photography package?",
    a: "Packages include full-day coverage, professionally edited images, online gallery delivery, consultation sessions, and cinematic storytelling. Premium plans also include albums and teaser reels.",
  },
  {
    q: "How long does it take to receive the final photos?",
    a: "Preview images are delivered within 72 hours. Full wedding galleries are delivered within 7–10 business days depending on project size.",
  },
  {
    q: "Do you travel outside Mumbai for shoots?",
    a: "Absolutely. Destination weddings and shoots across India and internationally are available. Travel and accommodation costs are added separately.",
  },
  {
    q: "Can we share references or mood boards?",
    a: "Yes — and it's encouraged. Pinterest boards, movie stills, aesthetics, and visual references help create a personalized cinematic experience.",
  },
  {
    q: "Do you provide videography along with photography?",
    a: "Yes. Photography and cinematic videography can be bundled together for a consistent luxury storytelling experience.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding relative overflow-hidden">

      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[120px] opacity-[0.08] pointer-events-none"
        style={{ width: 600, height: 600, background: "var(--gold, #D4AF37)", borderRadius: "50%" }}
      />

      <div className="w-full px-6 md:px-10 xl:px-16 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="block h-px w-12" style={{ background: "var(--gold, #D4AF37)", opacity: 0.5 }} />
            <p className="text-xs tracking-[0.28em] uppercase" style={{ color: "var(--gold, #D4AF37)" }}>
              FAQ
            </p>
            <span className="block h-px w-12" style={{ background: "var(--gold, #D4AF37)", opacity: 0.5 }} />
          </div>

          <h2
            className="leading-tight mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              maxWidth: 700,
            }}
          >
            Frequently Asked{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold, #D4AF37)" }}>Questions</em>
          </h2>

          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--muted, #8a8275)", maxWidth: 540 }}
          >
            Everything you need to know before booking. Still have questions?
            Feel free to reach out anytime.
          </p>
        </motion.div>

        {/* ── ACCORDION CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          style={{
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: 28,
            overflow: "hidden",
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              total={faqs.length}
            />
          ))}
        </motion.div>

        {/* ── BOTTOM CTA CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            marginTop: 20,
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: 28,
            padding: "40px 48px",
            background: "rgba(212,175,55,0.03)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block h-px w-8" style={{ background: "var(--gold, #D4AF37)", opacity: 0.6 }} />
              <p className="text-xs tracking-[0.22em] uppercase" style={{ color: "var(--gold, #D4AF37)" }}>
                Still curious?
              </p>
            </div>

            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                marginBottom: 8,
                lineHeight: 1.25,
              }}
            >
              Still Have Questions?
            </p>

            <p className="text-sm leading-relaxed" style={{ color: "var(--muted, #8a8275)", maxWidth: 420 }}>
              Let&apos;s discuss your vision and create something truly unforgettable together.
            </p>
          </div>

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 36px",
              borderRadius: 999,
              border: "1.5px solid var(--gold, #D4AF37)",
              background: "transparent",
              color: "var(--gold, #D4AF37)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.35s ease",
              textDecoration: "none",
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = "var(--gold, #D4AF37)";
              el.style.color = "#0B0B0C";
              el.style.boxShadow = "0 6px 28px rgba(212,175,55,0.3)";
              el.style.transform = "scale(1.03)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.color = "var(--gold, #D4AF37)";
              el.style.boxShadow = "none";
              el.style.transform = "scale(1)";
            }}
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   ACCORDION ITEM
========================================================= */
function AccordionItem({
  faq, index, isOpen, onToggle, total,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  total: number;
}) {
  const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      viewport={{ once: true }}
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(212,175,55,0.12)",
        position: "relative",
      }}
    >
      {/* Gold left accent bar when open */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: "var(--gold, #D4AF37)",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* TRIGGER */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 20,
          textAlign: "left",
          padding: "28px 40px 28px 48px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        {/* Number */}
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            fontFamily: "'Playfair Display', serif",
            color: isOpen ? "var(--gold, #D4AF37)" : "var(--muted)",
            minWidth: 28,
            flexShrink: 0,
            transition: "color 0.3s",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span
          style={{
            flex: 1,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
            lineHeight: 1.4,
            color: isOpen ? "var(--foreground)" : "var(--muted)",
            transition: "color 0.3s",
          }}
        >
          {faq.q}
        </span>

        {/* Toggle icon */}
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: `1px solid ${isOpen ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.1)"}`,
            background: isOpen ? "rgba(212,175,55,0.1)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: isOpen ? "var(--gold, #D4AF37)" : "rgba(255,255,255,0.3)",
            transition: "all 0.3s",
          }}
        >
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </span>
      </button>

      {/* ANSWER */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 40px 32px 96px" }}>
              <div style={{ height: 1, background: "rgba(212,175,55,0.15)", marginBottom: 18 }} />
              <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--muted, #8a8275)", maxWidth: 680 }}>
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}