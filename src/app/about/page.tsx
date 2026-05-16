import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "About | Prajwal MP Photography",
  description:
    "Learn about Prajwal MP — 7+ years of cinematic photography experience, 500+ weddings covered, and 20+ awards won.",
};

/**
 * About Page
 * Dedicated about page with extended biography.
 * CMS INTEGRATION: Pull bio content from Sanity CMS.
 */
export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
