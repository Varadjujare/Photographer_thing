"use client";

import { motion } from "framer-motion";
import {
  Camera, Video, Heart, Sparkles, User, PartyPopper, ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Camera,
    number: "01",
    title: "Wedding Photography",
    description:
      "Capturing every emotion, every glance, and every unrepeatable moment of your special day with cinematic elegance.",
    price: "From ₹25,000",
    tag: "Most Booked",
  },
  {
    icon: Video,
    number: "02",
    title: "Cinematic Videography",
    description:
      "Film-quality wedding videos that tell your love story with dramatic pacing, colour grading, and stunning aerial visuals.",
    price: "From ₹35,000",
    tag: null,
  },
  {
    icon: Heart,
    number: "03",
    title: "Pre-Wedding Shoots",
    description:
      "Romantic sessions at breathtaking locations — mountains, lakes, heritage streets — to celebrate your journey together.",
    price: "From ₹15,000",
    tag: null,
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Fashion Photography",
    description:
      "High-end fashion shoots for portfolios, brands, and editorial features with full creative direction and styling support.",
    price: "From ₹20,000",
    tag: null,
  },
  {
    icon: User,
    number: "05",
    title: "Portrait Sessions",
    description:
      "Professional portraits that reveal your personality, confidence, and authentic self in a relaxed environment.",
    price: "From ₹10,000",
    tag: null,
  },
  {
    icon: PartyPopper,
    number: "06",
    title: "Event Coverage",
    description:
      "Complete multi-photographer coverage for corporate events, galas, anniversaries, and private celebrations.",
    price: "From ₹18,000",
    tag: null,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="section-padding"
      style={{ background: "var(--card-bg)" }}
    >
      {/* ── Header ── */}
      <div className="w-full px-6 md:px-10 xl:px-16">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-px w-8" style={{ background: "var(--gold)" }} />
              <p className="text-label">Services</p>
            </div>
            <h2 className="heading-section leading-tight">What I Offer</h2>
          </div>

          <p
            className="text-sm leading-relaxed max-w-xs md:text-right"
            style={{ color: "var(--muted)" }}
          >
            Crafted experiences for life&apos;s most important moments —
            tailored to your story.
          </p>
        </motion.div>
      </div>

      {/* ── Services grid — full bleed ── */}
      <div
        className="w-full border-t border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="w-full px-6 md:px-10 xl:px-16">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            All packages include post-processing &amp; online gallery delivery.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            style={{ background: "var(--gold)", color: "#0B0B0C" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(212,175,55,0.35)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
          >
            Get a Custom Quote
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SERVICE CARD
═══════════════════════════════════════ */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden transition-colors duration-300"
      style={{
        borderRight: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        padding: "48px 40px 40px",
        minHeight: 320,
        display: "flex",
        flexDirection: "column",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      viewport={{ once: true, margin: "-60px" }}
      onMouseEnter={e =>
        (e.currentTarget.style.background = "rgba(212,175,55,0.03)")
      }
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      {/* Gold top bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: "var(--gold, #D4AF37)" }}
      />

      {/* Number + Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "3.5rem",
            lineHeight: 1,
            fontWeight: 300,
            color: "var(--border-color)",
            userSelect: "none",
          }}
        >
          {service.number}
        </span>

        <div
          className="group-hover:border-[var(--gold)] group-hover:bg-[rgba(212,175,55,0.08)] transition-all duration-300"
          style={{
            width: 44,
            height: 44,
            border: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <service.icon
            size={18}
            style={{ color: "var(--gold, #D4AF37)" }}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 500,
          fontSize: "1.2rem",
          lineHeight: 1.3,
          marginBottom: service.tag ? 10 : 14,
        }}
      >
        {service.title}
      </h3>

      {/* Tag */}
      {service.tag && (
        <span
          style={{
            display: "inline-block",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "3px 8px",
            marginBottom: 14,
            background: "rgba(212,175,55,0.12)",
            color: "var(--gold, #D4AF37)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          {service.tag}
        </span>
      )}

      {/* Description — flex-grow pushes price to bottom */}
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.8,
          color: "var(--muted, #8a8275)",
          flexGrow: 1,
          marginBottom: 28,
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {service.description}
      </p>

      {/* Price + Enquire */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--gold, #D4AF37)",
          }}
        >
          {service.price}
        </p>

        <a
          href="#contact"
          className="flex items-center gap-1.5 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
          style={{ color: "var(--muted, #8a8275)" }}
          aria-label={`Enquire about ${service.title}`}
        >
          Enquire
          <ArrowUpRight size={12} />
        </a>
      </div>
    </motion.div>
  );
}