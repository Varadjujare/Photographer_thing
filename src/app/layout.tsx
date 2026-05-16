import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientProviders from "./ClientProviders";

/* ═══════════════════════════════════════
   VIEWPORT
   Separated from Metadata per Next.js 14+
   best practice (avoids the deprecation
   warning for putting viewport inside metadata).
   ═══════════════════════════════════════ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#F5F1EB" },
  ],
};

/* ═══════════════════════════════════════
   METADATA
   ═══════════════════════════════════════ */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prajwalmp.photography";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Prajwal MP Photography | Cinematic Wedding & Portrait Photographer",
    template: "%s | Prajwal MP Photography",
  },

  description:
    "Award-winning cinematic photographer capturing timeless wedding stories, intimate portraits, editorial fashion, and live events. Based in Mumbai — available worldwide. Book your session today.",

  keywords: [
    "wedding photographer Mumbai",
    "cinematic wedding photography",
    "luxury wedding photographer India",
    "portrait photographer Mumbai",
    "fashion photographer Mumbai",
    "destination wedding photographer",
    "pre-wedding shoot Mumbai",
    "editorial photographer India",
  ],

  authors: [{ name: "Prajwal MP", url: siteUrl }],
  creator: "Prajwal MP",
  publisher: "Prajwal MP Photography",

  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:          siteUrl,
    siteName:    "Prajwal MP Photography",
    title:       "Prajwal MP Photography | Cinematic Wedding & Portrait Photographer",
    description: "Award-winning cinematic photographer capturing timeless wedding stories, intimate portraits, and editorial fashion. Based in Mumbai.",
    images: [
      {
        url:    "/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    "Prajwal MP Photography — Cinematic Wedding & Portrait Photographer",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Prajwal MP Photography | Cinematic Wedding & Portrait Photographer",
    description: "Award-winning cinematic photographer based in Mumbai. Weddings, portraits, fashion, and events.",
    images:      ["/og-image.jpg"],
    creator:     "@mbphotography011",
  },

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon:        [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple:       "/apple-touch-icon.png",
    shortcut:    "/favicon-16x16.png",
  },

  manifest: "/site.webmanifest",

  verification: {
    // Add once you have these:
    // google:  "YOUR_GOOGLE_SITE_VERIFICATION",
    // yandex:  "YOUR_YANDEX_VERIFICATION",
  },
};

/* ═══════════════════════════════════════
   JSON-LD STRUCTURED DATA
   Helps Google show rich results for the
   photographer's name, location, and service.
   ═══════════════════════════════════════ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type":    "ProfessionalService",
  name:       "Prajwal MP Photography",
  url:         siteUrl,
  logo:       `${siteUrl}/logo.png`,
  image:      `${siteUrl}/og-image.jpg`,
  description:
    "Award-winning cinematic photography studio in Mumbai specialising in weddings, portraits, fashion, and events.",
  founder: {
    "@type": "Person",
    name:    "Prajwal MP",
    jobTitle: "Photographer",
    sameAs: [
      "https://www.instagram.com/mbphotography011?igsh=MWk3MW1lcXZwanN0cg==",
      "https://twitter.com/prajwalmpphoto",
    ],
  },
  address: {
    "@type":           "PostalAddress",
    addressLocality:   "Mumbai",
    addressRegion:     "Maharashtra",
    addressCountry:    "IN",
  },
  geo: {
    "@type":     "GeoCoordinates",
    latitude:    19.076,
    longitude:   72.8777,
  },
  openingHours:   "Mo-Sa 09:00-19:00",
  priceRange:     "₹₹₹",
  telephone:      "+91 7676517177",
  email:          "mbvideo7676@gmail.com",
  areaServed:     ["Mumbai", "India", "Worldwide"],
  serviceType:    ["Wedding Photography", "Portrait Photography", "Fashion Photography", "Event Photography"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Photography Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Portrait Sessions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fashion & Editorial" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Coverage" } },
    ],
  },
};

/* ═══════════════════════════════════════
   ROOT LAYOUT
   ═══════════════════════════════════════ */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        suppressHydrationWarning on <html> prevents the
        mismatch warning caused by ThemeProvider toggling
        data-theme on the client after SSR.
      */}
      <body className="min-h-screen antialiased film-grain">
        {/* JSON-LD injected as a script tag in <body> — valid per spec */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}