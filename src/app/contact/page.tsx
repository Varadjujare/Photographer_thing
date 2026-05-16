import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Booking from "@/components/Booking";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Contact | Prajwal MP Photography",
  description:
    "Book a photography session with Prajwal MP. Get in touch for weddings, portraits, fashion shoots, and events. Typically responds within 2 hours.",
};

/**
 * Contact Page
 * Dedicated contact page with booking form and FAQ.
 * FORMSUBMIT: Replace email address in Booking component.
 */
export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <Booking />
        <FAQ />
      </div>
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
