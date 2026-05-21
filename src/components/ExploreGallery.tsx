"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Play, Moon, Sun } from "lucide-react";

/* ─── DATA ─────────────────────────────────────────── */
const photoCategories = ["All", "Weddings", "Pre-Wedding", "Portraits", "Fashion", "Events"];

interface Photo {
  id: number;
  src: string;
  category: string;
  title: string;
}

const photos: Photo[] = [
  { id: 1,  src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80", category: "Weddings",    title: "Golden Hour Ceremony"  },
  { id: 2,  src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=80", category: "Weddings",    title: "Eternal Vows"          },
  { id: 3,  src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=80", category: "Pre-Wedding", title: "Sunset Romance"        },
  { id: 4,  src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80", category: "Portraits",   title: "Elegant Portrait"      },
  { id: 5,  src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80", category: "Fashion",     title: "Haute Couture"         },
  { id: 6,  src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80", category: "Weddings",    title: "First Dance"           },
  { id: 7,  src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&q=80", category: "Pre-Wedding", title: "Mountain Embrace"      },
  { id: 8,  src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80", category: "Portraits",   title: "Timeless Gaze"         },
  { id: 9,  src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=80", category: "Fashion",     title: "Editorial Beauty"      },
  { id: 10, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80", category: "Events",      title: "Grand Celebration"     },
  { id: 11, src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=900&q=80", category: "Weddings",    title: "Bridal Grace"          },
  { id: 12, src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=900&q=80", category: "Events",      title: "Luxury Gala"           },
  { id: 13, src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=80", category: "Weddings",    title: "Floral Moments"        },
  { id: 14, src: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=900&q=80", category: "Portraits",   title: "Soul Captured"         },
  { id: 15, src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&q=80", category: "Fashion",     title: "Urban Chic"            },
  { id: 16, src: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=900&q=80", category: "Pre-Wedding", title: "Golden Fields"         },
  { id: 17, src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80", category: "Events",      title: "Corporate Elegance"    },
  { id: 18, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80", category: "Weddings",    title: "Candid Joy"            },
  { id: 19, src: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&q=80", category: "Fashion",     title: "Monochrome Mood"       },
  { id: 20, src: "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=900&q=80", category: "Portraits",   title: "Window Light"          },
];

interface Video {
  id: number;
  thumb: string;
  coupleName: string;
  location: string;
  duration: string;
  tag: string;
  videoUrl: string;
}

const videos: Video[] = [
  {
    id: 1,
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=85",
    coupleName: "TAMANNA & DAN",
    location: "House on the Clouds",
    duration: "4:32",
    tag: "Wedding",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
  },
  {
    id: 2,
    thumb: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1400&q=85",
    coupleName: "ALISHA & RAHUL",
    location: "Amalfi Coast, Italy",
    duration: "3:47",
    tag: "Pre-Wedding",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
  },
  {
    id: 3,
    thumb: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&q=85",
    coupleName: "SALONI & SID",
    location: "Bangkok",
    duration: "2:55",
    tag: "Wedding",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
  },
  {
    id: 4,
    thumb: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1400&q=85",
    coupleName: "ZINA & ZAIN",
    location: "Kashmir",
    duration: "5:12",
    tag: "Wedding",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
  },
];

/* ─── COMPONENT ─────────────────────────────────────── */
export default function ExploreGallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModal, setVideoModal] = useState<Video | null>(null);
  const [tab, setTab] = useState<"photos" | "videos">("photos");
  const [isDark, setIsDark] = useState(false);

  /* ── Sync theme with homepage on mount ── */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark =
      saved === "dark" ||
      (!saved && document.documentElement.classList.contains("dark"));
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const filtered =
    activeFilter === "All" ? photos : photos.filter((p) => p.category === activeFilter);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      if (lightboxIndex === null) return;
      setLightboxIndex(
        dir === "next"
          ? (lightboxIndex + 1) % filtered.length
          : (lightboxIndex - 1 + filtered.length) % filtered.length
      );
    },
    [lightboxIndex, filtered.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, navigate]);

  useEffect(() => {
    if (!videoModal) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [videoModal]);

  return (
    <section style={{ minHeight: "100vh" }}>

      {/* ══════════════ HEADER ══════════════ */}
      <div className="w-full px-6 md:px-14">

        {/* ── Row 1: Back link + Theme toggle ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between pt-8 pb-10"
        >
          {/* Back to home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 hover:text-[var(--gold)]"
            style={{ color: "var(--muted)" }}
          >
            <ArrowLeft size={12} />
            Back to Home
          </Link>

          {/* Theme toggle — matches navbar button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: "transparent",
              border: "1px solid rgba(212,175,55,0.25)",
              color: "var(--muted)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex" }}
                >
                  <Sun size={15} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90,  opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex" }}
                >
                  <Moon size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* ── Row 2: Label + Heading + Description ── */}
        <motion.div
          className="flex flex-col items-center text-center mb-14"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p
            className="text-[10px] tracking-[0.36em] uppercase mb-6"
            style={{ color: "var(--gold)" }}
          >
            Full Collection
          </p>
          <h1
            className="font-bold mb-7 w-full"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontFamily: "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              color: "var(--foreground)",
              textAlign: "center",
            }}
          >
            Explore Our Work
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: "1.7",
              color: "var(--muted)",
              maxWidth: "480px",
              textAlign: "center",
            }}
          >
            Every frame tells a story. Browse our complete photography and videography collection.
          </p>
        </motion.div>

        {/* ── Row 3: Tab Toggle ── */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          {(["photos", "videos"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-10 py-3 text-[11px] tracking-[0.24em] uppercase transition-all duration-300"
              style={{
                background: tab === t ? "var(--gold)" : "transparent",
                color: tab === t ? "#000" : "var(--muted)",
                border: "1px solid",
                borderColor: tab === t ? "var(--gold)" : "rgba(212,175,55,0.25)",
              }}
            >
              {t === "photos" ? "Photography" : "Videography"}
            </button>
          ))}
        </motion.div>

        {/* ── Row 4: Category Filters (photos only) ── */}
        <AnimatePresence initial={false}>
          {tab === "photos" && (
            <motion.div
              key="filters"
              className="flex flex-wrap justify-center gap-8 md:gap-12 pb-14"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              {photoCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="pb-1.5 text-[11px] md:text-[12px] tracking-[0.2em] uppercase transition-all duration-300 border-b-[1.5px]"
                  style={{
                    borderColor: activeFilter === cat ? "var(--gold)" : "transparent",
                    color: activeFilter === cat ? "var(--gold)" : "var(--muted)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ══════════════ PHOTOS GRID ══════════════ */}
      {tab === "photos" && (
        <div className="w-full mb-16">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            style={{ gap: "2px" }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.025 }}
                  className="relative group cursor-pointer overflow-hidden"
                  style={{ aspectRatio: "1 / 1" }}   /* ← uniform square: eliminates ALL gaps */
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 60%)" }}
                  >
                    <span
                      className="text-[9px] tracking-[0.22em] uppercase mb-0.5"
                      style={{ color: "var(--gold)" }}
                    >
                      {img.category}
                    </span>
                    <p className="text-white text-xs font-medium tracking-wide">
                      {img.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* ══════════════ VIDEO GRID ══════════════ */}
      {tab === "videos" && (
        <motion.div
          className="w-full mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "3px" }}
          >
            {videos.map((vid, i) => (
              <motion.div
                key={vid.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group cursor-pointer overflow-hidden"
                style={{ aspectRatio: "16 / 9" }}
                onClick={() => setVideoModal(vid)}
              >
                {/* Thumbnail */}
                <Image
                  src={vid.thumb}
                  alt={vid.coupleName}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Cinematic gradient — dark at bottom, slight top */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.25) 100%)",
                  }}
                />

                {/* Studio label — top centre */}
                <div
                  className="absolute top-5 left-0 right-0 flex justify-center"
                >
                  <span
                    className="text-[9px] tracking-[0.32em] uppercase"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    House on the Clouds
                  </span>
                </div>

                {/* Couple name — large serif, bottom-left */}
                <div className="absolute bottom-0 left-0 p-6 pb-7">
                  <h2
                    className="text-white leading-none mb-1.5 font-bold"
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 3.6rem)",
                      fontFamily:
                        "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
                      letterSpacing: "-0.015em",
                      textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                    }}
                  >
                    {vid.coupleName}
                  </h2>
                  <p
                    className="text-[11px] tracking-[0.18em] italic"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {vid.location}
                  </p>
                </div>

                {/* Play button — centred */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex items-center justify-center rounded-full transition-all duration-400 group-hover:scale-110"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      border: "1.5px solid rgba(255,255,255,0.45)",
                    }}
                  >
                    <Play
                      size={18}
                      fill="white"
                      className="text-white ml-0.5"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ══════════════ PHOTO LIGHTBOX ══════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0,0,0,0.94)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white z-10 transition-colors"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X size={26} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
              {lightboxIndex + 1} &nbsp;/&nbsp; {filtered.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 text-white/40 hover:text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); navigate("prev"); }}
              aria-label="Previous"
            >
              <ChevronLeft size={34} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="relative max-w-[88vw] max-h-[86vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                width={1200}
                height={800}
                className="object-contain max-h-[86vh] w-auto"
                priority
              />
              <p className="text-center text-white/45 text-xs mt-4 tracking-[0.2em] uppercase">
                {filtered[lightboxIndex].title}
              </p>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 text-white/40 hover:text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); navigate("next"); }}
              aria-label="Next"
            >
              <ChevronRight size={34} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════ VIDEO MODAL ══════════════ */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setVideoModal(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0,0,0,0.96)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white z-10 transition-colors"
              onClick={() => setVideoModal(null)}
              aria-label="Close video"
            >
              <X size={26} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.32 }}
              className="w-full max-w-5xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={`${videoModal.videoUrl}?autoplay=1&rel=0`}
                  title={videoModal.coupleName}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: "none" }}
                />
              </div>
              <div className="mt-5 text-center">
                <p
                  className="text-white/80 tracking-[0.08em] uppercase"
                  style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    fontFamily:
                      "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
                  }}
                >
                  {videoModal.coupleName}
                </p>
                <p className="text-white/35 text-[11px] tracking-[0.18em] italic mt-1">
                  {videoModal.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}