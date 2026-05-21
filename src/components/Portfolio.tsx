"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

/* ═══════════════════════════════════════
   PORTFOLIO DATA
   Replace with Sanity CMS or Cloudinary URLs in production.
   ═══════════════════════════════════════ */
const categories = ["All", "Weddings", "Pre-Wedding", "Portraits", "Fashion", "Events"];

interface PortfolioImage {
  id: number;
  src: string;
  category: string;
  title: string;
  aspect: "portrait" | "landscape" | "square";
}

const portfolioImages: PortfolioImage[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", category: "Weddings", title: "Golden Hour Ceremony", aspect: "landscape" },
  { id: 2, src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80", category: "Weddings", title: "Eternal Vows", aspect: "portrait" },
  { id: 3, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", category: "Pre-Wedding", title: "Sunset Romance", aspect: "landscape" },
  { id: 4, src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", category: "Portraits", title: "Elegant Portrait", aspect: "portrait" },
  { id: 5, src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", category: "Fashion", title: "Haute Couture", aspect: "portrait" },
  { id: 6, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", category: "Weddings", title: "First Dance", aspect: "landscape" },
  { id: 7, src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80", category: "Pre-Wedding", title: "Mountain Embrace", aspect: "portrait" },
  { id: 8, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", category: "Portraits", title: "Timeless Gaze", aspect: "square" },
  { id: 9, src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80", category: "Fashion", title: "Editorial Beauty", aspect: "landscape" },
  { id: 10, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", category: "Events", title: "Grand Celebration", aspect: "landscape" },
  { id: 11, src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80", category: "Weddings", title: "Bridal Grace", aspect: "portrait" },
  { id: 12, src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80", category: "Events", title: "Luxury Gala", aspect: "landscape" },
];

/**
 * Portfolio Section
 * Featured work with category filters, masonry grid, grayscale-to-color hover,
 * and full-screen lightbox with keyboard navigation.
 */
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeFilter === "All"
      ? portfolioImages
      : portfolioImages.filter((img) => img.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return;
      if (direction === "next") {
        setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
      } else {
        setLightboxIndex(
          (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
        );
      }
    },
    [lightboxIndex, filteredImages.length]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, navigateLightbox]);

  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-label mb-4">Portfolio</p>
          <h2 className="heading-section mb-4">Featured Work</h2>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            A glimpse into the stories we&apos;ve told
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`pb-2 text-xs md:text-sm tracking-[0.15em] uppercase transition-all duration-300 border-b ${
                activeFilter === cat
                  ? "border-[var(--gold)] text-[var(--gold)]"
                  : "border-transparent text-[var(--muted)] hover:border-[var(--muted)] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Masonry Grid (Full Width) — CSS-only hover, no layout recalc */}
      <style>{`
        .portfolio-img {
          object-fit: cover;
          transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
          will-change: transform;
          transform: translateZ(0);
        }
        .portfolio-card:hover .portfolio-img { transform: scale(1.05) translateZ(0); }
        .portfolio-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.28s ease;
          display: flex; align-items: flex-end; padding: 16px;
        }
        .portfolio-card:hover .portfolio-overlay { background: rgba(0,0,0,0.42); }
        .portfolio-overlay-inner {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.28s ease, transform 0.28s ease;
          display: flex; align-items: center; justify-content: space-between; width: 100%;
        }
        .portfolio-card:hover .portfolio-overlay-inner { opacity: 1; transform: translateY(0); }
        .portfolio-grid-enter { animation: pgFadeIn 0.3s ease both; }
        @keyframes pgFadeIn { from { opacity:0; } to { opacity:1; } }
      `}</style>
      <div className="w-full px-4 md:px-6 mb-16">
        <div key={activeFilter} className="masonry-grid portfolio-grid-enter">
          {filteredImages.map((img, index) => (
            <div
              key={img.id}
              className="portfolio-card relative cursor-pointer overflow-hidden"
              onClick={() => openLightbox(index)}
              style={{
                aspectRatio:
                  img.aspect === "portrait" ? "3/4"
                  : img.aspect === "square" ? "1/1"
                  : "4/3",
                contain: "layout style paint",
              }}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="portfolio-img"
                loading="lazy"
                decoding="async"
              />
              <div className="portfolio-overlay">
                <div className="portfolio-overlay-inner">
                  <div>
                    <span className="text-xs tracking-wider uppercase" style={{ color: "var(--gold)" }}>
                      {img.category}
                    </span>
                    <p className="text-white text-sm mt-1 font-medium">{img.title}</p>
                  </div>
                  <ArrowUpRight size={20} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Buttons Row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="/portfolio"
            className="inline-block px-8 py-3.5 text-sm tracking-wider uppercase border transition-all duration-300 hover:bg-[var(--gold)] hover:text-black"
            style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
          >
            View Full Portfolio
          </a>

          {/* ── Explore More Button ── */}
          <a
            href="/explore"
            className="group relative inline-flex items-center gap-3 px-9 py-4 text-sm tracking-wider uppercase overflow-hidden transition-all duration-500"
            style={{
              background: "var(--gold)",
              color: "#000",
              fontWeight: 600,
            }}
          >
            {/* Shimmer sweep */}
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.28) 50%,transparent 100%)",
              }}
            />
            <span className="relative z-10">Explore More Work</span>
            <svg
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════
          LIGHTBOX
          ═══════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white z-10 transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/50 text-sm tracking-wider">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>

            {/* Previous */}
            <button
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh] w-auto"
                priority
              />
              <p className="text-center text-white/60 text-sm mt-4 tracking-wider">
                {filteredImages[lightboxIndex].title}
              </p>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
