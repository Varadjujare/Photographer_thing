import type { Metadata } from "next";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ExploreGallery from "@/components/ExploreGallery";

export const metadata: Metadata = {
  title: "Explore Work | Prajwal MP Photography",
  description:
    "Explore the full collection — cinematic photography and videography spanning weddings, portraits, fashion, pre-wedding stories, and live events by Prajwal MP.",
};

export default function ExplorePage() {
  return (
    <main>
      <ExploreGallery />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}