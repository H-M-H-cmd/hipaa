import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const SITE_URL = "https://hipaa-woad.vercel.app";
const TITLE = "PatientLight — HIPAA-Compliant Patient Booking for Healthcare Providers";
const DESCRIPTION =
  "HIPAA-compliant patient appointment booking with smart intake questionnaires. AES-256 encryption, signed BAA, SOC 2-aligned. Built for independent healthcare practices.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · PatientLight",
  },
  description: DESCRIPTION,
  applicationName: "PatientLight",
  authors: [{ name: "PatientLight" }],
  creator: "PatientLight",
  publisher: "PatientLight",
  keywords: [
    "HIPAA compliant patient booking",
    "HIPAA appointment scheduling",
    "healthcare SaaS",
    "patient intake software",
    "chiropractor booking software",
    "SOC 2 patient scheduling",
    "BAA appointment platform",
    "medical practice software",
    "patient questionnaire platform",
    "clinic booking system",
  ],
  category: "Healthcare Software",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "PatientLight",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@patientlight",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FEFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B3D3A" },
  ],
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PatientLight",
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  sameAs: [] as string[],
  description: DESCRIPTION,
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PatientLight",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description: DESCRIPTION,
  offers: [
    {
      "@type": "Offer",
      name: "Solo",
      price: "49",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "49", priceCurrency: "USD", unitText: "MONTH" },
    },
    {
      "@type": "Offer",
      name: "Practice",
      price: "129",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "129", priceCurrency: "USD", unitText: "MONTH" },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
  },
  featureList: [
    "HIPAA-compliant infrastructure",
    "Signed Business Associate Agreement",
    "AES-256 encryption at rest",
    "TLS 1.3 in transit",
    "Smart intake questionnaires",
    "Google Calendar sync",
    "Role-based access controls",
    "Automated patient reminders",
    "Actionable analytics",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
