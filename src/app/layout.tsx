import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SplashScreen } from "@/components/ui/SplashScreen";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://intelecta.id"),
  title: "Intelecta: Arsitektur Kecerdasan & Solusi IT Enterprise",
  description:
    "Konsultan dan penyedia solusi teknologi informasi kelas dunia di Indonesia. Spesialisasi dalam AI Engineering, Cloud Infrastructure berkeandalan 99.99%, dan Cybersecurity Zero Trust.",
  keywords: [
    "Intelecta",
    "IT Consulting Indonesia",
    "AI Engineering Enterprise",
    "Cloud Infrastructure",
    "Kubernetes Specialist",
    "Cybersecurity Zero Trust",
    "Enterprise Solutions",
  ],
  authors: [{ name: "Intelecta Teknologi Nusantara" }],
  creator: "Intelecta Teknologi Nusantara",
  publisher: "Intelecta Teknologi Nusantara",
  alternates: {
    canonical: "https://intelecta.id",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo-icon.svg",
    shortcut: "/images/logo-icon.svg",
    apple: "/images/logo-icon.svg",
  },
  openGraph: {
    title: "Intelecta: Arsitektur Kecerdasan & Solusi IT Enterprise",
    description:
      "Platform showcase solusi teknologi informasi mutakhir: AI, Cloud High-Availability, & Cybersecurity Zero Trust.",
    url: "https://intelecta.id",
    siteName: "Intelecta",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      dir="ltr"
      suppressHydrationWarning
      className={`${syne.variable} ${plusJakarta.variable} ${ibmPlexMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#030303] text-white font-sans antialiased selection:bg-white selection:text-black"
      >
        <SplashScreen />
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
