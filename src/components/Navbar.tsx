"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X, Sun, Moon } from "lucide-react";
import { FaInstagram as Instagram } from "react-icons/fa";
import { useTheme } from "@/lib/ThemeProvider";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

/**
 * Navbar
 * Premium navigation bar with glassmorphism on scroll, mobile hamburger menu,
 * theme toggle, and social media links.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();

  // Glassmorphism effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled ? "glass py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="text-xl md:text-2xl font-bold tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}
          >
            PRAJWAL<span style={{ color: "var(--gold)" }}>.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[var(--gold)]"
                style={{
                  color:
                    activeSection === link.href.replace("#", "")
                      ? "var(--gold)"
                      : "var(--muted)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                }}
              >
                {link.name}
                {activeSection === link.href.replace("#", "") && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1px]"
                    style={{ background: "var(--gold)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://www.instagram.com/mbphotography011?igsh=MWk3MW1lcXZwanN0cg=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors duration-300 hover:text-[var(--gold)]"
              style={{ color: "var(--muted)" }}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors duration-300 hover:text-[var(--gold)]"
              style={{ color: "var(--muted)" }}
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 transition-colors duration-300 hover:text-[var(--gold)]"
              style={{ color: "var(--muted)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(true)}
            style={{ color: "var(--foreground)" }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[2000] flex flex-col items-center justify-center"
            style={{ background: "var(--background)" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 p-2"
              style={{ color: "var(--foreground)" }}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {/* Mobile Nav Links */}
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="text-2xl tracking-wider uppercase transition-colors duration-300"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color:
                      activeSection === link.href.replace("#", "")
                        ? "var(--gold)"
                        : "var(--foreground)",
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Social + Theme */}
            <div className="flex items-center gap-6 mt-12">
              <a
                href="https://www.instagram.com/mbphotography011?igsh=MWk3MW1lcXZwanN0cg=="
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--muted)" }}
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--muted)" }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={22} />
              </a>
              <button
                onClick={toggleTheme}
                style={{ color: "var(--muted)" }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
