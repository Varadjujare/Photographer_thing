import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Portfolio | Prajwal MP Photography",
  description:
    "Browse the full photography portfolio — weddings, portraits, fashion, pre-wedding shoots, and events captured with cinematic elegance.",
};

/**
 * Portfolio Page
 * Dedicated full portfolio page with extended gallery.
 * CMS INTEGRATION: Pull images from Sanity CMS for dynamic gallery.
 */
export default function PortfolioPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <Portfolio />
      </div>
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
