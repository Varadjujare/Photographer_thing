"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FaInstagram as InstagramIcon } from "react-icons/fa";

const instagramImages = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85", likes: "2.4k", tag: "weddings" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=85", likes: "1.8k", tag: "portraits" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=85", likes: "3.1k", tag: "moments" },
  { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85", likes: "2.7k", tag: "fashion" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=85", likes: "1.5k", tag: "love" },
  { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=85", likes: "4.2k", tag: "cinematic" },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=85", likes: "2.0k", tag: "portraits" },
  { src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=85", likes: "3.6k", tag: "events" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=85", likes: "2.2k", tag: "stories" },
];

export default function InstagramSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        .ig-section {
          background: var(--background);
          padding: 120px 0 0;
          overflow: hidden;
          position: relative;
        }

        /* Subtle top border line */
        .ig-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 1px; height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent);
        }

        .ig-header {
          text-align: center;
          padding: 0 2rem 72px;
          position: relative;
        }

        .ig-overline {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 9px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.65);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .ig-overline::before,
        .ig-overline::after {
          content: '';
          display: block;
          width: 48px;
          height: 0.5px;
          background: rgba(201,169,110,0.3);
        }

        .ig-handle {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(36px, 5vw, 58px);
          color: var(--foreground);
          letter-spacing: 0.02em;
          line-height: 1;
          margin-bottom: 16px;
        }

        .ig-handle em {
          font-style: italic;
          color: #c9a96e;
        }

        .ig-tagline {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* Stats row */
        .ig-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-top: 40px;
        }

        .ig-stat {
          text-align: center;
          padding: 0 40px;
          position: relative;
        }

        .ig-stat + .ig-stat::before {
          content: '';
          position: absolute;
          left: 0; top: 50%; transform: translateY(-50%);
          height: 28px; width: 0.5px;
          background: rgba(201,169,110,0.2);
        }

        .ig-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 28px;
          color: #c9a96e;
          line-height: 1;
          margin-bottom: 4px;
        }

        .ig-stat-label {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* Grid */
        .ig-grid {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 2px;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .ig-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .ig-cell {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          cursor: pointer;
          display: block;
        }

        .ig-cell-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .ig-cell:hover .ig-cell-img {
          transform: scale(1.1);
        }

        /* Hover overlay */
        .ig-cell-overlay {
          position: absolute;
          inset: 0;
          background: rgba(4,3,2,0);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background 0.35s ease;
        }

        .ig-cell:hover .ig-cell-overlay {
          background: rgba(4,3,2,0.62);
        }

        .ig-cell-icon {
          color: #c9a96e;
          opacity: 0;
          transform: scale(0.7) translateY(6px);
          transition: opacity 0.3s ease 0.05s, transform 0.35s cubic-bezier(0.16,1,0.3,1) 0.05s;
          font-size: 22px;
        }

        .ig-cell:hover .ig-cell-icon {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .ig-cell-likes {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.14em;
          color: var(--foreground);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.1s, transform 0.35s cubic-bezier(0.16,1,0.3,1) 0.1s;
        }

        .ig-cell:hover .ig-cell-likes {
          opacity: 1;
          transform: translateY(0);
        }

        .ig-cell-tag {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.8);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.14s, transform 0.35s cubic-bezier(0.16,1,0.3,1) 0.14s;
        }

        .ig-cell:hover .ig-cell-tag {
          opacity: 1;
          transform: translateY(0);
        }

        /* Bottom bar */
        .ig-footer {
          background: var(--background);
          padding: 60px 2rem 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ig-follow-btn {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 9.5px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #c9a96e;
          background: transparent;
          border: 0.5px solid rgba(201,169,110,0.35);
          padding: 16px 44px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.35s ease, border-color 0.35s ease;
        }

        .ig-follow-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c9a96e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }

        .ig-follow-btn:hover::before {
          transform: scaleX(1);
        }

        .ig-follow-btn:hover {
          color: var(--background);
          border-color: #c9a96e;
        }

        .ig-follow-btn span,
        .ig-follow-btn svg {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <section className="ig-section" ref={sectionRef}>
        {/* Header */}
        <motion.div className="ig-header" style={{ y: headerY }}>
          <motion.p
            className="ig-overline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Behind the Lens
          </motion.p>

          <motion.h2
            className="ig-handle"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <em>@</em>prajwalmp
          </motion.h2>

          <motion.p
            className="ig-tagline"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            viewport={{ once: true }}
          >
            Follow the journey on Instagram
          </motion.p>

          {/* Stats */}
          <motion.div
            className="ig-stats"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            viewport={{ once: true }}
          >
            {[
              { num: "48.2k", label: "Followers" },
              { num: "1,240", label: "Posts" },
              { num: "2.1M", label: "Impressions" },
            ].map((s) => (
              <div className="ig-stat" key={s.label}>
                <div className="ig-stat-num">{s.num}</div>
                <div className="ig-stat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <div className="ig-grid">
          {instagramImages.map((item, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/mbphotography011?igsh=MWk3MW1lcXZwanN0cg=="
              target="_blank"
              rel="noopener noreferrer"
              className="ig-cell"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              <Image
                src={item.src}
                alt={`#${item.tag}`}
                fill
                sizes="(max-width: 1024px) 33vw, 11vw"
                className="ig-cell-img"
              />
              <div className="ig-cell-overlay">
                <InstagramIcon className="ig-cell-icon" />
                <span className="ig-cell-likes">♥ {item.likes}</span>
                <span className="ig-cell-tag">#{item.tag}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow Button */}
        <motion.div
          className="ig-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.instagram.com/mbphotography011?igsh=MWk3MW1lcXZwanN0cg=="
            target="_blank"
            rel="noopener noreferrer"
            className="ig-follow-btn"
          >
            <InstagramIcon size={14} />
            <span>Follow on Instagram</span>
          </a>
        </motion.div>
      </section>
    </>
  );
}