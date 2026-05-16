"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

/* ═══════════════════════════════════════
   STATIC IMPORTS
   Above-the-fold sections load immediately.
   ═══════════════════════════════════════ */
import LoadingScreen   from "@/components/LoadingScreen";
import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import ScrollProgress  from "@/components/ScrollProgress";
import WhatsAppFloat   from "@/components/WhatsAppFloat";

/* ═══════════════════════════════════════
   LAZY IMPORTS
   Below-the-fold sections are code-split
   and only fetched when the user scrolls.
   Each gets a lightweight skeleton fallback.
   ═══════════════════════════════════════ */
const Portfolio      = dynamic(() => import("@/components/Portfolio"),      { loading: () => <SectionSkeleton /> });
const SoulCinema     = dynamic(() => import("@/components/SoulCinema"),     { loading: () => <SectionSkeleton /> });
const About          = dynamic(() => import("@/components/About"),          { loading: () => <SectionSkeleton /> });
const Services       = dynamic(() => import("@/components/Services"),       { loading: () => <SectionSkeleton /> });
const Testimonials   = dynamic(() => import("@/components/Testimonials"),   { loading: () => <SectionSkeleton /> });
const InstagramSection = dynamic(() => import("@/components/Instagram"),    { loading: () => <SectionSkeleton /> });
const Booking        = dynamic(() => import("@/components/Booking"),        { loading: () => <SectionSkeleton /> });
const FAQ            = dynamic(() => import("@/components/FAQ"),            { loading: () => <SectionSkeleton /> });
const Footer         = dynamic(() => import("@/components/Footer"),         { loading: () => null });

/* ═══════════════════════════════════════
   SECTION SKELETON
   Prevents layout shift while lazy sections load.
   ═══════════════════════════════════════ */
function SectionSkeleton() {
  return (
    <div
      aria-hidden
      style={{
        minHeight:  "400px",
        background: "var(--surface)",
        animation:  "pulse 2s ease-in-out infinite",
      }}
    />
  );
}

/* ═══════════════════════════════════════
   SCROLL REVEAL HOOK
   Observes every element with [data-reveal]
   and adds .revealed once it enters viewport.
   ═══════════════════════════════════════ */
function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    targets.forEach((el) => {
      el.classList.add("reveal"); // ensures base opacity:0 style
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

/* ═══════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════ */
export default function Home() {
  useScrollReveal();

  return (
    <>
      {/* Accessibility: skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:rounded focus:bg-[var(--gold)] focus:text-black focus:font-medium focus:text-sm"
      >
        Skip to main content
      </a>

      {/* Animated gold scroll progress bar */}
      <ScrollProgress />

      {/* Full-screen loading splash */}
      <LoadingScreen />

      {/* Sticky navigation */}
      <Navbar />

      {/*
        Each section has:
          id       → for anchor navigation (Navbar links)
          data-reveal → picked up by useScrollReveal for fade-in
          aria-label  → screen reader landmark label
      */}
      <main id="main-content">

        <section id="home" aria-label="Hero">
          <Hero />
        </section>

        <section id="portfolio" aria-label="Portfolio" data-reveal>
          <Portfolio />
        </section>

        <section id="soul-cinema" aria-label="Soul Cinema" data-reveal>
          <SoulCinema />
        </section>

        <section id="about" aria-label="About" data-reveal>
          <About />
        </section>

        <section id="services" aria-label="Services" data-reveal>
          <Services />
        </section>

        <section id="testimonials" aria-label="Testimonials" data-reveal>
          <Testimonials />
        </section>

        <section id="instagram" aria-label="Instagram feed" data-reveal>
          <InstagramSection />
        </section>

        <section id="booking" aria-label="Book a session" data-reveal>
          <Booking />
        </section>

        <section id="faq" aria-label="FAQ" data-reveal>
          <FAQ />
        </section>

      </main>

      <Footer />

      {/* Floating WhatsApp CTA */}
      <WhatsAppFloat />
    </>
  );
}