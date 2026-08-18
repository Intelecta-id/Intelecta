import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intelecta — Arsitektur Kecerdasan & Solusi IT Enterprise",
  description:
    "Konsultan dan penyedia solusi teknologi informasi kelas dunia di Indonesia. Spesialisasi dalam AI Engineering, Cloud Infrastructure berkeandalan 99.99%, dan Cybersecurity Zero Trust.",
  keywords: [
    "Intelecta",
    "IT Consulting Indonesia",
    "AI Engineering Enterprise",
    "Cloud Infrastructure",
    "Kubernetes Specialist",
    "Cybersecurity Zero Trust",
    "Next.js Enterprise Developer",
  ],
  authors: [{ name: "Intelecta Teknologi Nusantara" }],
  icons: {
    icon: "/images/logo-icon.svg",
    shortcut: "/images/logo-icon.svg",
    apple: "/images/logo-icon.svg",
  },
  openGraph: {
    title: "Intelecta — Arsitektur Kecerdasan & Solusi IT Enterprise",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#030303] text-white antialiased selection:bg-white selection:text-black">
        <SmoothScroll>
          <Preloader />
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
