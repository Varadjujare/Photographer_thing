"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * LoadingScreen
 * Full-screen cinematic reveal with photographer name fade-in and elegant loading bar.
 * Disappears after ~2.5s with a smooth upward slide transition.
 */
export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    // Dismiss loading screen after 2.5s
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Photographer Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1
              className="text-4xl md:text-5xl font-bold tracking-wider text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Prajwal MP
            </h1>
            <p
              className="text-xs tracking-[0.3em] mt-3 uppercase"
              style={{ color: "#D4AF37" }}
            >
              Photography & Cinematography
            </p>
          </motion.div>

          {/* Loading Bar */}
          <motion.div
            className="loading-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="loading-bar-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Progress Percentage */}
          <motion.p
            className="text-xs tracking-[0.2em] mt-4"
            style={{ color: "#A1A1AA" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
