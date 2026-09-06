"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { GlyphArrowRight, GlyphCalendar, GlyphShield, GlyphCpu, GlyphLayers } from "@/components/ui/TechnicalGlyphs";
import { MagneticButton } from "@/components/ui/MagneticButton";

import { ScrambleText } from "@/components/ui/ScrambleText";

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
      {/* 3D Monolith Trio WebGL Canvas Background (Z-Index 10 for physical depth) */}
      <div className="absolute inset-0 z-10 pointer-events-none sm:pointer-events-auto">
        <Hero3DBackground showControls={true} />
      </div>

      {/* Main Header Content Container (Layered at Z-Index 20 in front of 3D Scene) */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center">
        {/* Top Architectural Signal Pill with ScrambleText Decoding */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/60 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.06)]">
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
          <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">
            <ScrambleText text="REKAYASA DIGITAL & ARSITEKTUR ENTERPRISE" speed={28} delay={300} />
          </span>
        </div>

        {/* Grand Headline - Bold Syne Display with Chrome Wordmark Metallic Gradients */}
        <h1 className="mt-8 font-display text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-extrabold uppercase tracking-tight text-white leading-[1.08] select-none">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Membangun Solusi
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400 drop-shadow-[0_0_35px_rgba(255,255,255,0.35)]">
            Web, App & SaaS
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-600 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Kelas Dunia.
          </span>
        </h1>

        {/* Sub-headline Narrative */}
        <p className="mt-6 font-sans text-base sm:text-lg md:text-xl leading-relaxed text-zinc-300 max-w-2xl mx-auto font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Partner rekayasa teknologi terpercaya untuk pengembangan produk digital skala besar dengan keandalan tinggi dan performa sub-milidetik.
        </p>

        {/* Repeating Linear Gradient Dotted Divider Line (Sharp at any width) */}
        <div
          className="w-full max-w-md h-[1px] my-6 opacity-30 select-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 3px, transparent 3px, transparent 8px)",
          }}
        />

        {/* Primary & Secondary Action CTAs (Z-Index 30) */}
        <div className="relative z-30 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            variant="primary"
            className="rounded-full px-7 py-3"
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
            className="rounded-full px-7 py-3"
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
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-white/10 pt-6 text-xs font-sans text-zinc-400">
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
