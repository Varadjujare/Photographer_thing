"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VIDEO_ID = "JNKZN8uq1H8";
const PLAYER_DIV_ID = "sc-yt-player";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function SoulCinema() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const playerRef = useRef<any>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    function createPlayer() {
      // Target by plain DOM id — never a React ref — avoids removeChild conflict
      const el = document.getElementById(PLAYER_DIV_ID);
      if (!el) return;

      playerRef.current = new window.YT.Player(PLAYER_DIV_ID, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          start: 17,
          vq: "hd1080",
        },
        events: {
          onReady(e: any) {
            e.target.mute();
            e.target.setPlaybackQuality("hd1080");
            e.target.playVideo();
            setVideoLoaded(true);
          },
        },
      });
    }

    if (window.YT?.Player) {
      createPlayer();
    } else {
      // Only inject the script once
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      window.__yt_callbacks = window.__yt_callbacks || [];
      window.__yt_callbacks.push(createPlayer);

      if (!window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = () => {
          window.__yt_callbacks.forEach((cb: any) => cb());
        };
      }
    }

    return () => {
      try { playerRef.current?.destroy(); } catch (_) {}
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');

        .sc-section {
          position: relative;
          width: 100%;
          background: var(--background);
          overflow: hidden;
        }

        /* Full-width video layer — sits behind beige triangles */
        .sc-video-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          background: #000;
          pointer-events: none;
        }

        /* Oversized 16:9 to always cover */
        .sc-iframe-sizer {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: max(100%, 177.78vh);
          height: max(56.25vw, 100%);
          pointer-events: none;
        }

        /* YT injects into this — plain DOM, no React children */
        #sc-yt-player {
          width: 100%;
          height: 100%;
          display: block;
          pointer-events: none;
        }

        /* Hides YouTube error text — fades when video plays */
        .sc-shield {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: #000;
          pointer-events: none;
          transition: opacity 1.8s ease;
        }

        .sc-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: rgba(0,0,0,0.36);
          pointer-events: none;
        }

        .sc-vignette {
          position: absolute;
          inset: 0;
          z-index: 4;
          background: radial-gradient(ellipse 90% 85% at 50% 50%,
            transparent 25%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.82) 100%);
          pointer-events: none;
        }

        /*
          Beige diagonal triangles — z-index above video.
          These create the angled cut illusion matching the reference.
          Top-left triangle + bottom-right triangle.
        */
        .sc-tri-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 130px;
          z-index: 8;
          background: var(--background);
          clip-path: polygon(0 0, 100% 0, 100% 15%, 0 100%);
          pointer-events: none;
        }

        .sc-tri-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 130px;
          z-index: 8;
          background: var(--background);
          clip-path: polygon(0 85%, 100% 0, 100% 100%, 0 100%);
          pointer-events: none;
        }

        /* Content */
        .sc-content {
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 9rem 2rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .sc-eyebrow {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(9px, 0.85vw, 11px);
          letter-spacing: 0.44em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          font-weight: 300;
          margin-bottom: 20px;
        }

        .sc-vline {
          width: 1px;
          height: 38px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.28), transparent);
          margin: 0 auto 24px;
        }

        .sc-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 7.5vw, 6rem);
          letter-spacing: 0.2em;
          color: #fff;
          text-transform: uppercase;
          font-weight: 400;
          line-height: 1.05;
          text-shadow: 0 4px 40px rgba(0,0,0,0.5);
          margin: 0;
        }

        .sc-plus {
          font-weight: 200;
          font-size: 0.5em;
          opacity: 0.4;
          margin: 0 0.3em;
          vertical-align: middle;
          font-style: italic;
        }

        .sc-hline {
          width: 44px;
          height: 1px;
          background: rgba(255,255,255,0.2);
          margin: 28px auto;
        }

        .sc-body {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(13px, 1.4vw, 16px);
          color: rgba(255,255,255,0.68);
          line-height: 1.95;
          font-weight: 300;
          letter-spacing: 0.03em;
          max-width: 480px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.8);
        }

        .sc-stats {
          margin-top: 28px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(9px, 0.85vw, 11px);
          letter-spacing: 0.4em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          font-weight: 300;
        }
      `}</style>

      <section className="sc-section">

        {/* Video — full width, behind everything */}
        <div className="sc-video-wrap">
          <div className="sc-iframe-sizer">
            {/* Plain div with id — YouTube replaces this with an iframe.
                No React children inside so no removeChild conflict. */}
            <div id={PLAYER_DIV_ID} />
          </div>
          <div className="sc-shield" style={{ opacity: videoLoaded ? 0 : 1 }} />
          <div className="sc-overlay" />
          <div className="sc-vignette" />
        </div>

        {/* Beige triangles on top of video — create diagonal cut effect */}
        <div className="sc-tri-top" />
        <div className="sc-tri-bottom" />

        {/* Text */}
        <div className="sc-content">
          <motion.p
            className="sc-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            Wedding Films &nbsp;&middot;&nbsp; 25 Countries
          </motion.p>

          <motion.div
            className="sc-vline"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          />

          <motion.h2
            className="sc-title"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            viewport={{ once: true }}
          >
            Soul <span className="sc-plus">+</span> Cinema
          </motion.h2>

          <motion.div
            className="sc-hline"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "center" }}
          />

          <motion.p
            className="sc-body"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Every wedding is unique — and so are our films. For the past 8&nbsp;years,
            HOTC has set new benchmarks of storytelling within the wedding realm and
            beyond. We are fortunate to have experienced such unique cultures and
            traditions across 25&nbsp;countries, and to document stories that
            continuously overwhelm us.
          </motion.p>

          <motion.p
            className="sc-stats"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            viewport={{ once: true }}
          >
            8 Years &nbsp;&middot;&nbsp; Infinite Stories
          </motion.p>
        </div>

      </section>
    </>
  );
}