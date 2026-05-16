"use client";

import { ThemeProvider } from "@/lib/ThemeProvider";
import SmoothScrollProvider from "@/lib/smoothScroll";
import ScrollProgress from "@/components/ScrollProgress";


/**
 * ClientProviders
 * Client-side wrapper for theme, smooth scroll, scroll progress,
 * cursor glow, and film grain overlay.
 */
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <div>
          <ScrollProgress />
          {children}
        </div>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
