"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { GlyphArrowRight, GlyphCalendar, GlyphShield, GlyphCpu, GlyphLayers } from "@/components/ui/TechnicalGlyphs";
import { MagneticButton } from "@/components/ui/MagneticButton";

const Hero3DBackground = dynamic(
  () => import("./Hero3DBackground").then((mod) => mod.Hero3DBackground),
  {
    ssr: false,
    loading: () => null,
  }
);

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-32 pb-24 grid-pattern"
    >
      {/* 3D Monolith Trio WebGL Canvas Background (Loaded asynchronously) */}
      <Hero3DBackground showControls={true} />

      {/* Main Header Content Container (Centered in Front of 3D Scene) */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center">
        {/* Top Architectural Signal Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="font-sans text-xs tracking-wider text-zinc-300 uppercase">
            Rekayasa Digital & Arsitektur Enterprise
          </span>
        </div>

        {/* Grand Headline - Editorial High-Contrast Display */}
        <h1 className="mt-8 font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-white font-normal leading-[1.06] tracking-tight select-none">
          <span>Membangun Solusi</span>
          <span className="block italic font-normal text-zinc-300">
            Web, App & SaaS
          </span>
          <span>Kelas Dunia.</span>
        </h1>

        {/* Sub-headline Narrative */}
        <p className="mt-6 font-sans text-base sm:text-lg md:text-xl leading-relaxed text-zinc-300 max-w-2xl mx-auto font-normal">
          Partner rekayasa teknologi terpercaya untuk pengembangan produk digital skala besar dengan keandalan tinggi dan performa sub-milidetik.
        </p>

        {/* Primary & Secondary Action CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            variant="primary"
            onClick={() => {
              const el = document.getElementById("layanan");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="font-semibold text-xs tracking-wider uppercase">Jelajahi Kapabilitas</span>
            <GlyphArrowRight className="h-3.5 w-3.5" />
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            onClick={() => {
              if (onOpenConsultation) {
                onOpenConsultation();
              } else {
                const el = document.getElementById("kontak");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <GlyphCalendar className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-xs tracking-wider uppercase">Jadwalkan Konsultasi</span>
          </MagneticButton>
        </div>

        {/* Trust Badges / Quick Metrics Row Under Header */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-white/10 pt-6 text-xs font-sans text-zinc-400">
          <div className="flex items-center gap-2">
            <GlyphShield className="h-3.5 w-3.5 text-zinc-400" />
            <span>Keamanan Zero-Trust</span>
          </div>
          <div className="hidden sm:block h-3 w-[1px] bg-white/15" />
          <div className="flex items-center gap-2">
            <GlyphCpu className="h-3.5 w-3.5 text-zinc-400" />
            <span>99.99% Cloud SLA</span>
          </div>
          <div className="hidden sm:block h-3 w-[1px] bg-white/15" />
          <div className="flex items-center gap-2">
            <GlyphLayers className="h-3.5 w-3.5 text-zinc-400" />
            <span>Infrastruktur Terdistribusi</span>
          </div>
        </div>
      </div>
    </section>
  );
};
