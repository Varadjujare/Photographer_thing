"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Download, Award } from "lucide-react";

/* =========================================================
   COUNT-UP HOOK
========================================================= */
function useCountUp(end: number, inView: boolean, duration = 2200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let frame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, inView, duration]);

  return count;
}

/* =========================================================
   DATA
========================================================= */
const stats = [
  { value: 7,   suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Weddings Covered" },
  { value: 20,  suffix: "+", label: "Awards Won"       },
  { value: 15,  suffix: "",  label: "Cities Covered"   },
];

const highlights = [
  "Destination weddings across India & abroad",
  "RAW files delivered with every package",
  "7-day photo delivery guarantee",
];

/* =========================================================
   COMPONENT
========================================================= */
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section
      id="about"
      className="section-padding relative"
      ref={sectionRef}
    >
      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 blur-[120px] opacity-[0.09] pointer-events-none"
        style={{ width: 500, height: 500, background: "var(--gold, #D4AF37)", borderRadius: "50%" }}
      />

      <div className="w-full px-6 md:px-10 xl:px-16 relative z-10">

        {/* ── SECTION LABEL + HEADING — centered ── */}
        <motion.div
          className=""
          style={{ textAlign: "center", position: "relative", zIndex: 20, marginBottom: 80 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Label with flanking lines */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <span
              className="block h-px w-12"
              style={{ background: "var(--gold, #D4AF37)", opacity: 0.5 }}
            />
            <p
              className="text-xs tracking-[0.28em] uppercase"
              style={{ color: "var(--gold, #D4AF37)" }}
            >
              About the Photographer
            </p>
            <span
              className="block h-px w-12"
              style={{ background: "var(--gold, #D4AF37)", opacity: 0.5 }}
            />
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              lineHeight: 1.1,
              fontWeight: 500,
            }}
          >
            A Lens That{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold, #D4AF37)" }}>Feels</em>
          </h2>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-center" style={{ marginTop: 0 }}>

          {/* ════════════ IMAGE SIDE ════════════ */}
          <motion.div
            className="relative flex justify-center lg:justify-start"
            style={{ isolation: "isolate", paddingTop: 24 }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Decorative offset border */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: 8, left: 0, right: 16, bottom: -8,
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: 32,
              }}
            />

            {/* Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 440,
                aspectRatio: "3/4",
                overflow: "hidden",
                borderRadius: 28,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Prajwal MP — Professional Photographer"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.05)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }}
              />

              {/* Grain */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  opacity: 0.05,
                  mixBlendMode: "overlay",
                }}
              />
            </div>

            {/* Hexagon badge */}
            <motion.div
              className="absolute bottom-0 right-4 flex flex-col items-center justify-center text-center"
              style={{
                width: 100,
                height: 100,
                background: "var(--gold, #D4AF37)",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                transform: "translateY(40%)",
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Award size={16} color="#0B0B0C" />
              <p style={{ fontSize: 10, fontWeight: 700, color: "#0B0B0C", lineHeight: 1.3, marginTop: 4 }}>
                7+ Years<br />Excellence
              </p>
            </motion.div>
          </motion.div>

          {/* ════════════ TEXT SIDE ════════════ */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-xs tracking-[0.28em] uppercase mb-4" style={{ color: "var(--gold, #D4AF37)" }}>
              My Story
            </p>

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                lineHeight: 1.25,
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              Turning Emotions Into
              <br />
              <em style={{ fontStyle: "italic", color: "var(--gold, #D4AF37)" }}>
                Everlasting Memories
              </em>
            </h3>

            <div style={{ width: 56, height: 1, background: "var(--gold, #D4AF37)", opacity: 0.45, marginBottom: 28 }} />

            <p className="text-sm md:text-base leading-relaxed mb-5" style={{ color: "var(--muted, #8a8275)" }}>
              For the past 7 years, I&apos;ve had the privilege of capturing the most meaningful
              moments of people&apos;s lives. Every frame is designed to preserve emotion, intimacy,
              and timeless beauty.
            </p>

            <p className="text-sm md:text-base leading-relaxed mb-10" style={{ color: "var(--muted, #8a8275)" }}>
              From cinematic wedding celebrations to intimate portrait sessions, my photography
              blends storytelling with luxury aesthetics to create visuals that feel alive forever.
            </p>

            <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {highlights.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--muted, #8a8275)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold, #D4AF37)", flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>

            {/* Stats grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                border: "1px solid var(--border-color, rgba(255,255,255,0.1))",
                borderRadius: 18,
                overflow: "hidden",
                marginBottom: 40,
              }}
            >
              {stats.map((stat, i) => (
                <StatCell key={i} stat={stat} inView={isInView} delay={i * 0.1} isLast={i === stats.length - 1} />
              ))}
            </div>

            {/* CTA row */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.9rem",
                  fontStyle: "italic",
                  color: "var(--gold, #D4AF37)",
                  opacity: 0.8,
                  lineHeight: 1,
                }}
              >
                Prajwal MP
              </p>

              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 999,
                  border: "1.5px solid var(--gold, #D4AF37)",
                  background: "transparent",
                  color: "var(--gold, #D4AF37)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = "var(--gold, #D4AF37)";
                  el.style.color = "#0B0B0C";
                  el.style.boxShadow = "0 6px 24px rgba(212,175,55,0.3)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = "transparent";
                  el.style.color = "var(--gold, #D4AF37)";
                  el.style.boxShadow = "none";
                }}
              >
                <Download size={13} />
                Download Portfolio
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STAT CELL
========================================================= */
function StatCell({
  stat, inView, delay, isLast,
}: {
  stat: { value: number; suffix: string; label: string };
  inView: boolean;
  delay: number;
  isLast: boolean;
}) {
  const count = useCountUp(stat.value, inView);

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 12px",
        borderRight: isLast ? "none" : "1px solid var(--border-color, rgba(255,255,255,0.1))",
        transition: "background 0.3s",
        cursor: "default",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.05)")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
    >
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
          color: "var(--gold, #D4AF37)",
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        {count}{stat.suffix}
      </p>

      <p
        style={{
          fontSize: 9,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginTop: 8,
          textAlign: "center",
          lineHeight: 1.4,
          color: "var(--muted, #8a8275)",
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}