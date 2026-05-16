"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

/* ═══════════════════════════════════════
   LENIS CONTEXT
   Exposes the Lenis instance so any child
   component can call lenis.scrollTo(target)
   for programmatic smooth scrolling
   (e.g. Navbar anchor links, "back to top").
   ═══════════════════════════════════════ */
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/* ═══════════════════════════════════════
   SMOOTH SCROLL PROVIDER
   ═══════════════════════════════════════ */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef   = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration:        1.2,
      easing:          (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      // Sync with CSS scroll-behavior: smooth so anchor links
      // don't fight each other
      smoothWheel:     true,
    });

    lenisRef.current = lenis;

    /* RAF loop ─────────────────────────── */
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    /* Pause when tab is hidden to save CPU */
    function onVisibilityChange() {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}