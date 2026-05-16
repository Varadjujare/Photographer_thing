"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock3 } from "lucide-react";
import { FaInstagram as Instagram, FaFacebook as Facebook, FaWhatsapp as Whatsapp } from "react-icons/fa";

/* =========================================================
   SOCIALS
========================================================= */
const socials = [
  { icon: Instagram, href: "https://www.instagram.com/mbphotography011?igsh=MWk3MW1lcXZwanN0cg==", label: "Instagram" },
  { icon: Facebook,  href: "https://facebook.com",  label: "Facebook"  },
  { icon: Whatsapp,  href: "https://wa.me/917676517177",   label: "WhatsApp"   },
];

/* =========================================================
   SHARED INPUT STYLE
========================================================= */
const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "14px",
  border: "1px solid var(--border-color, rgba(255,255,255,0.12))",
  background: "rgba(255,255,255,0.04)",
  color: "var(--foreground, #f5f0e8)",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.3s, background 0.3s",
  appearance: "none" as const,
  WebkitAppearance: "none" as const,
};

/* =========================================================
   COMPONENT
========================================================= */
export default function Booking() {
  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      {/* BG GLOW */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-10 pointer-events-none"
        style={{ width: 700, height: 700, background: "var(--gold, #D4AF37)" }}
      />

      <div className="w-full px-6 md:px-10 xl:px-16 relative z-10">

        {/* HEADER */}
        {/* HEADER — strictly centered, full-width row above the grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "4rem", width: "100%" }}
        >
          <p
            style={{
              color: "var(--gold, #D4AF37)",
              fontSize: "11px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Contact
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              lineHeight: 1.15,
              marginBottom: "1.1rem",
            }}
          >
            Let&apos;s Create Something Beautiful
          </h2>
          <p
            style={{
              color: "var(--muted, #8a8275)",
              fontSize: "15px",
              lineHeight: 1.75,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Whether it&apos;s an intimate wedding, a cinematic pre-wedding shoot, or a timeless
            portrait session — let&apos;s turn your story into art.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-[0.85fr_1.15fr] gap-10 xl:gap-14 items-stretch w-full">

          {/* ============================
              LEFT SIDE
          ============================ */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col h-full gap-6"
          >
            {/* INTRO CARD */}
            <div
              className="rounded-[28px] border p-8 xl:p-10"
              style={{
                borderColor: "var(--border-color, rgba(255,255,255,0.1))",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(14px)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Clock3 size={16} style={{ color: "var(--gold, #D4AF37)" }} />
                <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--gold, #D4AF37)" }}>
                  Quick Response
                </p>
              </div>
              <h3
                className="text-3xl leading-snug mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Let&apos;s Plan Your
                <br />
                Dream Shoot
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted, #8a8275)" }}>
                Share your event details and vision with us. We usually respond within 2 hours and
                love creating cinematic experiences for every client.
              </p>
            </div>

            {/* CONTACT CARDS */}
            <div className="grid sm:grid-cols-2 gap-4">
              <ContactCard icon={Phone}  title="Phone"    value="+91 98765 43210"       href="tel:+919876543210" />
              <ContactCard icon={Mail}   title="Email"    value="mbvideo7676@gmail.com" href="mailto:mbvideo7676@gmail.com" />
              <ContactCard icon={MapPin} title="Location" value="Mumbai, Maharashtra" />
            </div>

            {/* SOCIALS */}
            <div className="flex items-center gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  style={{
                    borderColor: "var(--border-color, rgba(255,255,255,0.12))",
                    background: "rgba(255,255,255,0.03)",
                    color: "var(--muted, #8a8275)",
                  }}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>

            {/* MAP */}
            <div
              className="flex-1 overflow-hidden rounded-[28px] border min-h-[300px]"
              style={{ borderColor: "var(--border-color, rgba(255,255,255,0.1))" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(1) invert(0.92) contrast(1.1)",
                  display: "block",
                  minHeight: 300,
                }}
                allowFullScreen
                loading="lazy"
                title="Location"
              />
            </div>
          </motion.div>

          {/* ============================
              RIGHT SIDE — FORM
          ============================ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-full flex"
          >
            <div
              className="rounded-[28px] border p-8 xl:p-10 w-full flex"
              style={{
                borderColor: "var(--border-color, rgba(255,255,255,0.1))",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(16px)",
              }}
            >
              <form
                action="https://formsubmit.co/mbvideo7676@gmail.com"
                method="POST"
                className="w-full flex flex-col gap-5"
              >
                {/* HIDDEN */}
                <input type="hidden" name="_subject" value="New Photography Inquiry" />
                <input type="hidden" name="_captcha" value="false" />

                {/* SECTION LABEL */}
                <div className="mb-2">
                  <p
                    className="text-xs tracking-[0.25em] uppercase mb-1"
                    style={{ color: "var(--gold, #D4AF37)" }}
                  >
                    Book a Session
                  </p>
                  <p className="text-sm" style={{ color: "var(--muted, #8a8275)" }}>
                    Fill in the details below and we&apos;ll get back to you shortly.
                  </p>
                </div>

                {/* NAME */}
                <Field label="Full Name">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    style={inputBase}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--gold, #D4AF37)")}
                    onBlur={e  => (e.currentTarget.style.borderColor = "var(--border-color, rgba(255,255,255,0.12))")}
                  />
                </Field>

                {/* EMAIL + PHONE */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Email Address">
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      style={inputBase}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--gold, #D4AF37)")}
                      onBlur={e  => (e.currentTarget.style.borderColor = "var(--border-color, rgba(255,255,255,0.12))")}
                    />
                  </Field>
                  <Field label="Phone Number">
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      style={inputBase}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--gold, #D4AF37)")}
                      onBlur={e  => (e.currentTarget.style.borderColor = "var(--border-color, rgba(255,255,255,0.12))")}
                    />
                  </Field>
                </div>

                {/* DATE + EVENT TYPE */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Event Date">
                    <input
                      type="date"
                      required
                      name="event_date"
                      style={{
                        ...inputBase,
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--gold, #D4AF37)")}
                      onBlur={e  => (e.currentTarget.style.borderColor = "var(--border-color, rgba(255,255,255,0.12))")}
                    />
                  </Field>
                  <Field label="Event Type">
                    <div className="relative">
                      <select
                        name="event_type"
                        style={{
                          ...inputBase,
                          paddingRight: 40,
                          cursor: "pointer",
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "var(--gold, #D4AF37)")}
                        onBlur={e  => (e.currentTarget.style.borderColor = "var(--border-color, rgba(255,255,255,0.12))")}
                      >
                        <option value="" style={{ background: "var(--background)" }}>Select event type</option>
                        <option value="Wedding"    style={{ background: "var(--background)" }}>Wedding</option>
                        <option value="Pre-Wedding" style={{ background: "var(--background)" }}>Pre-Wedding</option>
                        <option value="Portrait"   style={{ background: "var(--background)" }}>Portrait</option>
                        <option value="Fashion"    style={{ background: "var(--background)" }}>Fashion</option>
                        <option value="Event"      style={{ background: "var(--background)" }}>Event</option>
                      </select>
                      {/* chevron */}
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="var(--muted, #8a8275)" strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </Field>
                </div>

                {/* BUDGET */}
                <Field label="Budget Range">
                  <div className="relative">
                    <select
                      name="budget"
                      style={{
                        ...inputBase,
                        paddingRight: 40,
                        cursor: "pointer",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--gold, #D4AF37)")}
                      onBlur={e  => (e.currentTarget.style.borderColor = "var(--border-color, rgba(255,255,255,0.12))")}
                    >
                      <option value="" style={{ background: "#111" }}>Select budget range</option>
                      <option value="10k-25k"   style={{ background: "#111" }}>₹10,000 — ₹25,000</option>
                      <option value="25k-50k"   style={{ background: "#111" }}>₹25,000 — ₹50,000</option>
                      <option value="50k-1L"    style={{ background: "#111" }}>₹50,000 — ₹1,00,000</option>
                      <option value="1L-2L"     style={{ background: "#111" }}>₹1,00,000 — ₹2,00,000</option>
                      <option value="2L+"       style={{ background: "#111" }}>₹2,00,000+</option>
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="var(--muted, #8a8275)" strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </Field>

                {/* MESSAGE */}
                <Field label="Message">
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your event, vision, and any specific requirements…"
                    style={{
                      ...inputBase,
                      resize: "none",
                      minHeight: 140,
                      lineHeight: "1.6",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--gold, #D4AF37)")}
                    onBlur={e  => (e.currentTarget.style.borderColor = "var(--border-color, rgba(255,255,255,0.12))")}
                  />
                </Field>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="mt-2"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "16px 32px",
                    borderRadius: "999px",
                    border: "1.5px solid var(--gold, #D4AF37)",
                    background: "transparent",
                    color: "var(--gold, #D4AF37)",
                    fontSize: "12px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    const btn = e.currentTarget;
                    btn.style.background = "var(--gold, #D4AF37)";
                    btn.style.color = "#0B0B0C";
                    btn.style.boxShadow = "0 0 32px rgba(212,175,55,0.35), 0 4px 20px rgba(212,175,55,0.2)";
                    btn.style.transform = "scale(1.015)";
                  }}
                  onMouseLeave={e => {
                    const btn = e.currentTarget;
                    btn.style.background = "transparent";
                    btn.style.color = "var(--gold, #D4AF37)";
                    btn.style.boxShadow = "none";
                    btn.style.transform = "scale(1)";
                  }}
                >
                  <Send size={14} />
                  Send Inquiry
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FIELD WRAPPER
========================================================= */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-xs tracking-[0.18em] uppercase"
        style={{ color: "var(--muted, #8a8275)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/* =========================================================
   CONTACT CARD
========================================================= */
function ContactCard({
  icon: Icon, title, value, href,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div
      className="rounded-[22px] border p-5 transition-all duration-400 hover:-translate-y-1 h-full"
      style={{
        borderColor: "var(--border-color, rgba(255,255,255,0.1))",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
        style={{ background: "rgba(212,175,55,0.08)" }}
      >
        <Icon size={16} style={{ color: "var(--gold, #D4AF37)" }} />
      </div>
      <p className="text-xs uppercase tracking-[0.18em] mb-1" style={{ color: "var(--muted, #8a8275)" }}>
        {title}
      </p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : <div>{inner}</div>;
}