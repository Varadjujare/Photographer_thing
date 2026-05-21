"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const YT_VIDEO_ID = "tyBJioe8gOs";

export default function Hero() {
  const sectionRef = useRef(null);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Parallax removed — JS-driven scroll transforms block the main thread.

  // Load YouTube IFrame API and autoplay muted
  useEffect(() => {
    const initPlayer = () => {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: YT_VIDEO_ID,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          start: 30,
          vq: "hd1080",
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.setPlaybackQuality("hd1080");
            e.target.seekTo(30, true);
            e.target.playVideo();
            setLoaded(true);
          },
          onPlaybackQualityChange: (e) => {
            const q = e.target.getPlaybackQuality();
            if (q !== "hd1080" && q !== "hd720") {
              e.target.setPlaybackQuality("hd1080");
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.__yt_callbacks = window.__yt_callbacks || [];
      window.__yt_callbacks.push(initPlayer);

      if (!window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = () => {
          window.__yt_callbacks.forEach((cb: any) => cb());
        };
      }

      const existing = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch (_) {}
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        .hero-section {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 680px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
        }

        .hero-video-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .yt-sizer {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: max(100vw, 177.78vh);
          height: max(56.25vw, 100vh);
          pointer-events: none;
        }

        .yt-sizer iframe {
          width: 100%;
          height: 100%;
          border: none;
          pointer-events: none;
        }

        /* Base dark tint */
        .hero-overlay-base {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: rgba(4, 3, 2, 0.28);
        }

        /* Top gradient — keeps navbar always readable */
        .hero-overlay-top {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            to bottom,
            rgba(4, 3, 2, 0.58) 0%,
            rgba(4, 3, 2, 0.22) 18%,
            transparent 36%
          );
        }

        /* Bottom gradient — keeps stats & scroll readable */
        .hero-overlay-bottom {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            to top,
            rgba(4, 3, 2, 0.62) 0%,
            rgba(4, 3, 2, 0.2) 20%,
            transparent 38%
          );
        }

        /* Cinematic vignette — darkens all four edges */
        .hero-overlay-vignette {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: radial-gradient(
            ellipse at center,
            transparent 35%,
            rgba(4, 3, 2, 0.28) 70%,
            rgba(4, 3, 2, 0.6) 100%
          );
        }

        /* Left edge */
        .hero-overlay-left {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: linear-gradient(to right, rgba(4,3,2,0.35) 0%, transparent 28%);
        }

        /* Right edge */
        .hero-overlay-right {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: linear-gradient(to left, rgba(4,3,2,0.35) 0%, transparent 28%);
        }

        .hero-grain {
          position: absolute;
          inset: 0;
          z-index: 4;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          width: 100%;
          max-width: 860px;
          padding: 0 2rem;
        }

        .hero-eyebrow {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: clamp(9px, 1.1vw, 11px);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c9a96e;
          margin: 0 0 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .hero-eyebrow::before,
        .hero-eyebrow::after {
          content: '';
          display: block;
          width: 40px;
          height: 0.5px;
          background: #c9a96e;
          opacity: 0.6;
        }

        .hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(48px, 7.5vw, 96px);
          line-height: 1.0;
          color: #f0ece4;
          letter-spacing: -0.01em;
          margin: 0 0 1.6rem;
        }

        .hero-headline em {
          font-style: italic;
          font-weight: 300;
          color: #c9a96e;
        }

        .hero-sub {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: clamp(11px, 1.3vw, 13px);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(240,236,228,0.5);
          margin: 0 0 3.2rem;
        }

        .hero-sub span {
          margin: 0 12px;
          opacity: 0.35;
          font-weight: 100;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn-primary {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #0a0a0a;
          background: #c9a96e;
          border: none;
          padding: 14px 36px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
          outline: none;
        }

        .btn-primary:hover {
          background: #d4b87e;
          transform: translateY(-1px);
        }

        .btn-secondary {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(240,236,228,0.75);
          background: transparent;
          border: 0.5px solid rgba(240,236,228,0.25);
          padding: 14px 36px;
          cursor: pointer;
          transition: border-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
          outline: none;
        }

        .btn-secondary:hover {
          border-color: rgba(240,236,228,0.55);
          color: #f0ece4;
          transform: translateY(-1px);
        }

        .hero-corner-top {
          position: absolute;
          top: 28px;
          left: 36px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .hero-corner-bottom {
          position: absolute;
          bottom: 36px;
          left: 0;
          right: 0;
          z-index: 12;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 10px;
        }

        .scroll-label {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 9px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(240,236,228,0.35);
        }

        .scroll-track {
          width: 0.5px;
          height: 48px;
          background: rgba(201,169,110,0.25);
          position: relative;
          overflow: hidden;
        }

        .scroll-fill {
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: #c9a96e;
          animation: scroll-tick 2.2s ease-in-out infinite;
        }

        @keyframes scroll-tick {
          0% { top: -100%; }
          50% { top: 0%; }
          100% { top: 100%; }
        }

        .hero-frame-tl,
        .hero-frame-tr,
        .hero-frame-bl,
        .hero-frame-br {
          position: absolute;
          width: 22px;
          height: 22px;
          z-index: 12;
        }

        .hero-frame-tl { top: 20px; left: 24px; border-top: 0.5px solid rgba(201,169,110,0.45); border-left: 0.5px solid rgba(201,169,110,0.45); }
        .hero-frame-tr { top: 20px; right: 24px; border-top: 0.5px solid rgba(201,169,110,0.45); border-right: 0.5px solid rgba(201,169,110,0.45); }
        .hero-frame-bl { bottom: 20px; left: 24px; border-bottom: 0.5px solid rgba(201,169,110,0.45); border-left: 0.5px solid rgba(201,169,110,0.45); }
        .hero-frame-br { bottom: 20px; right: 24px; border-bottom: 0.5px solid rgba(201,169,110,0.45); border-right: 0.5px solid rgba(201,169,110,0.45); }

        .hero-stat-row {
          position: absolute;
          bottom: 44px;
          right: 44px;
          z-index: 12;
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: flex-end;
        }

        .hero-stat {
          text-align: right;
        }

        .hero-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 28px;
          color: #c9a96e;
          line-height: 1;
          margin-bottom: 2px;
        }

        .hero-stat-label {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 8.5px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(240,236,228,0.35);
        }

        .hero-stat-divider {
          width: 24px;
          height: 0.5px;
          background: rgba(201,169,110,0.2);
          margin-left: auto;
        }
      `}</style>

      <section ref={sectionRef} className="hero-section" id="home">
        {/* YouTube Background */}
        <div className="hero-video-wrap">
          <div className="yt-sizer">
            <div ref={iframeRef} />
          </div>
        </div>

        {/* Multi-layer cinematic overlay */}
        <div className="hero-overlay-base" />
        <div className="hero-overlay-top" />
        <div className="hero-overlay-bottom" />
        <div className="hero-overlay-vignette" />
        <div className="hero-overlay-left" />
        <div className="hero-overlay-right" />

        {/* Film grain */}
        <div className="hero-grain" />

        {/* Corner Brackets */}
        <motion.div
          className="hero-frame-tl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
        <motion.div
          className="hero-frame-tr"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
        <motion.div
          className="hero-frame-bl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        />
        <motion.div
          className="hero-frame-br"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
        />

        {/* Main Content */}
        <motion.div className="hero-content" style={{ transform: "translateZ(0)", willChange: "auto" }}>
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Award Winning Photographer
          </motion.p>

          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Capturing <em>Timeless</em>
            <br />
            Stories
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Weddings <span>—</span> Portraits <span>—</span> Fashion <span>—</span> Events
          </motion.p>

          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <button className="btn-primary" onClick={() => scrollToSection("#portfolio")}>
              View Portfolio
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection("#contact")}>
              Book a Session
            </button>
          </motion.div>
        </motion.div>

        {/* Stats — right side */}
        <motion.div
          className="hero-stat-row"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <div className="hero-stat">
            <div className="hero-stat-num">500+</div>
            <div className="hero-stat-label">Weddings</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">12</div>
            <div className="hero-stat-label">Years</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">34</div>
            <div className="hero-stat-label">Awards</div>
          </div>
        </motion.div>

        {/* Scroll indicator — bottom center */}
        <motion.div
          className="hero-corner-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <span className="scroll-label">Scroll</span>
          <div className="scroll-track">
            <div className="scroll-fill" />
          </div>
        </motion.div>
      </section>
    </>
  );
}