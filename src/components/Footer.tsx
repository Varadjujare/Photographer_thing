"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import {
  FaInstagram as Instagram,
  FaFacebook as Facebook,
  FaYoutube as Youtube,
  FaWhatsapp as Whatsapp,
} from "react-icons/fa";

const navLinks = [
  { name: "Home",         href: "#home" },
  { name: "Portfolio",    href: "#portfolio" },
  { name: "Services",     href: "#services" },
  { name: "About",        href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ",          href: "#faq" },
  { name: "Contact",      href: "#contact" },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/mbphotography011?igsh=MWk3MW1lcXZwanN0cg==", label: "Instagram" },
  { icon: Facebook,  href: "https://facebook.com",  label: "Facebook"  },
  { icon: Youtube,   href: "https://youtube.com",   label: "YouTube"   },
  { icon: Whatsapp,  href: "https://wa.me/917676517177", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--background)" }}>

      {/* ── Top gold gradient border ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 40%, rgba(212,175,55,0.7) 60%, transparent 100%)" }}
      />

      {/* ── Giant watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <p
          className="font-bold leading-none opacity-[0.025] whitespace-nowrap"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(80px, 16vw, 220px)" }}
        >
          Prajwal MP
        </p>
      </div>

      {/* ── Subtle radial glow ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 blur-[120px] opacity-[0.07] pointer-events-none"
        style={{ width: 800, height: 400, background: "var(--gold, #D4AF37)", borderRadius: "50%" }}
      />

      <div className="w-full px-6 md:px-10 xl:px-16 pt-40 pb-20 relative z-10">

        {/* ══════════════════════════════════════
            HERO BRAND ROW
        ══════════════════════════════════════ */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-20"
          style={{ borderBottom: "1px solid rgba(212,175,55,0.18)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          {/* Brand name + tagline */}
          <div>
            <h2
              className="leading-none mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                letterSpacing: "-0.01em",
              }}
            >
              PRAJWAL
              <span style={{ color: "var(--gold, #D4AF37)" }}>.</span>
            </h2>
            <p
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "var(--gold, #D4AF37)", opacity: 0.8 }}
            >
              Cinematic Wedding &amp; Lifestyle Photography
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300"
                style={{
                  borderColor: "rgba(212,175,55,0.25)",
                  color: "var(--muted, #8a8275)",
                  background: "rgba(255,255,255,0.02)",
                }}
                whileHover={{ y: -3, scale: 1.08, borderColor: "rgba(212,175,55,0.7)", color: "#D4AF37" }}
              >
                <s.icon size={17} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            MAIN 3-COL GRID
        ══════════════════════════════════════ */}
        <motion.div
          className="grid md:grid-cols-3 gap-14 xl:gap-20 py-24"
          style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          viewport={{ once: true }}
        >

          {/* ── Col 1: About ── */}
          <div>
            <ColLabel>About</ColLabel>
            <p className="text-sm leading-[1.9]" style={{ color: "var(--muted, #8a8275)" }}>
              Based in Mumbai, Prajwal MP crafts cinematic visual stories that transcend the
              ordinary — turning weddings, portraits, and editorials into timeless art.
            </p>

            {/* Decorative gold rule */}
            <div className="flex items-center gap-3 mt-8">
              <span className="block h-px flex-1" style={{ background: "rgba(212,175,55,0.25)" }} />
              <span style={{ color: "var(--gold, #D4AF37)", fontSize: 10, letterSpacing: "0.3em" }}>AK</span>
              <span className="block h-px flex-1" style={{ background: "rgba(212,175,55,0.25)" }} />
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div>
            <ColLabel>Navigation</ColLabel>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm transition-all duration-300"
                  style={{ color: "var(--muted, #8a8275)" }}
                >
                  <span
                    className="inline-block w-0 group-hover:w-3 h-px transition-all duration-300 overflow-hidden"
                    style={{ background: "var(--gold, #D4AF37)" }}
                  />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Contact + Newsletter ── */}
          <div>
            <ColLabel>Get in Touch</ColLabel>

            {/* Contact items */}
            <div className="space-y-4 mb-10">
              <FooterContact icon={Mail}   text="mbvideo7676@gmail.com" href="mailto:mbvideo7676@gmail.com" />
              <FooterContact icon={Phone}  text="+91 98765 43210"        href="tel:+919876543210" />
              <FooterContact icon={MapPin} text="Mumbai, Maharashtra" />
            </div>

            {/* Newsletter */}
            <div
              className="rounded-[20px] border p-5"
              style={{
                borderColor: "rgba(212,175,55,0.2)",
                background: "rgba(212,175,55,0.03)",
              }}
            >
              <p className="text-base mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Stay Inspired
              </p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted, #8a8275)" }}>
                Exclusive shoots, travel stories &amp; updates — straight to your inbox.
              </p>

              <form
                action="https://formsubmit.co/mbvideo7676@gmail.com"
                method="POST"
                className="flex items-center gap-2"
              >
                <input type="hidden" name="_subject" value="Newsletter Subscription" />
                <input type="hidden" name="_captcha" value="false" />

                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl text-xs outline-none border bg-transparent transition-all duration-300"
                  style={{ borderColor: "rgba(212,175,55,0.2)", color: "var(--foreground)" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--gold, #D4AF37)")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)")}
                />

                <button
                  type="submit"
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg flex-shrink-0"
                  style={{ background: "var(--gold, #D4AF37)", color: "#0B0B0C" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,175,55,0.4)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════ */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xs" style={{ color: "var(--muted, #8a8275)", opacity: 0.7 }}>
            © {new Date().getFullYear()} Prajwal MP Photography. All rights reserved.
          </p>

          {/* Centre tag */}
          <p
            className="text-[10px] tracking-[0.35em] uppercase hidden md:block"
            style={{ color: "var(--gold, #D4AF37)", opacity: 0.5 }}
          >
            Crafted with passion · Mumbai
          </p>

          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms", "Licensing"].map((item, i) => (
              <a
                key={i}
                href="#"
                className="text-[11px] transition-colors duration-300 hover:opacity-100"
                style={{ color: "var(--muted, #8a8275)", opacity: 0.6 }}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

/* ── Column label ── */
function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span className="block w-5 h-px" style={{ background: "var(--gold, #D4AF37)" }} />
      <p
        className="text-[10px] tracking-[0.28em] uppercase"
        style={{ color: "var(--gold, #D4AF37)" }}
      >
        {children}
      </p>
    </div>
  );
}

/* ── Contact row ── */
function FooterContact({ icon: Icon, text, href }: { icon: React.ElementType; text: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-3 group">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{ background: "rgba(212,175,55,0.08)" }}
      >
        <Icon size={13} style={{ color: "var(--gold, #D4AF37)" }} />
      </div>
      <p className="text-sm transition-opacity duration-300 group-hover:opacity-100" style={{ color: "var(--foreground)", opacity: 0.85 }}>
        {text}
      </p>
    </div>
  );
  return href
    ? <a href={href} className="block hover:opacity-80 transition-opacity">{inner}</a>
    : <div>{inner}</div>;
}