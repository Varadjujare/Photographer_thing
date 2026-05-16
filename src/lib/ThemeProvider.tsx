"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

/* ═══════════════════════════════════════
   TYPES
   ═══════════════════════════════════════ */
type Theme = "dark" | "light";

interface ThemeContextType {
  theme:       Theme;
  toggleTheme: () => void;
  isDark:      boolean;
}

/* ═══════════════════════════════════════
   CONTEXT
   ═══════════════════════════════════════ */
const ThemeContext = createContext<ThemeContextType>({
  theme:       "dark",
  toggleTheme: () => {},
  isDark:      true,
});

export function useTheme() {
  return useContext(ThemeContext);
}

/* ═══════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════ */
const STORAGE_KEY = "theme";

/** Read theme: stored value → system preference → "dark" */
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Write theme to DOM immediately (no re-render) */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  // Brief transition lock so colors cross-fade instead of snap
  root.style.setProperty("--theme-transition", "0.5s");
}

/* ═══════════════════════════════════════
   PROVIDER
   ═══════════════════════════════════════ */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme,   setTheme]   = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  /* Initialise on mount ──────────────── */
  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  /* Follow OS preference changes ─────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (e: MediaQueryListEvent) => {
      // Only follow system if the user has NOT manually set a preference
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const next: Theme = e.matches ? "dark" : "light";
        setTheme(next);
        applyTheme(next);
      }
    };
    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  }, []);

  /*
    Render children immediately even before mount — avoids the
    one-frame null flash the old `if (!mounted) return null` caused.
    Children that depend on the theme value will re-render once
    setMounted(true) fires (usually imperceptible).
  */
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {/*
        Invisible until hydration completes so server-rendered HTML
        (which always has theme="dark") doesn't visually mismatch
        the client before JS runs.
      */}
      <div
        style={{ visibility: mounted ? "visible" : "hidden" }}
        suppressHydrationWarning
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/* ═══════════════════════════════════════
   INLINE SCRIPT — paste into layout.tsx
   ═══════════════════════════════════════
   Add this <script> as the FIRST child of
   <body> (before ClientProviders) to prevent
   the flash-of-wrong-theme on initial load.

   <script
     dangerouslySetInnerHTML={{
       __html: `
         (function(){
           var s = localStorage.getItem('theme');
           var t = s || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
           document.documentElement.setAttribute('data-theme', t);
         })();
       `,
     }}
   />
   ═══════════════════════════════════════ */