"use client";

import React, { useRef, useState } from "react";
import { GlyphArrowRight, GlyphCalendar, GlyphShield, GlyphCpu, GlyphLayers } from "@/components/ui/TechnicalGlyphs";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { LayeredHeroLogo, LayeredHeroLogoRef, LogoInteractionMode } from "./LayeredHeroLogo";
import { LogoLayerControls } from "./LogoLayerControls";

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  const logoRef = useRef<LayeredHeroLogoRef>(null);
  const [logoMode, setLogoMode] = useState<LogoInteractionMode>("float");

  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 pb-20 grid-pattern"
    >
      {/* Radial Top Glow Spotlight */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[550px] w-[800px] -translate-y-1/3 rounded-full bg-radial from-white/10 via-white/2 to-transparent blur-3xl" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Narrative Headline & Actions (7 cols) */}
          <div className="text-center lg:col-span-7 lg:text-left flex flex-col items-center lg:items-start">
            {/* Top Architectural Signal Pill with ScrambleText Decoding */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/60 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.06)]">
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
              <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">
                <ScrambleText text="REKAYASA DIGITAL & ARSITEKTUR ENTERPRISE" speed={28} delay={300} />
              </span>
            </div>

            {/* Grand Headline - Bold Syne Display with Chrome Wordmark Metallic Gradients */}
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.08] select-none">
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
            <p className="mt-6 font-sans text-base sm:text-lg leading-relaxed text-zinc-300 max-w-2xl font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Partner rekayasa teknologi terpercaya untuk pengembangan produk digital skala besar dengan keandalan tinggi dan performa sub-milidetik.
            </p>

            {/* Repeating Linear Gradient Dotted Divider Line */}
            <div
              className="w-full max-w-md h-[1px] my-6 opacity-30 select-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 3px, transparent 3px, transparent 8px)",
              }}
            />

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
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
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 border-t border-white/10 pt-6 text-xs font-sans text-zinc-400 w-full">
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

          {/* Right Column: Monumental Interactive Intelecta Logo (5 cols) */}
          <div className="flex flex-col items-center justify-center lg:col-span-5 w-full">
            <LayeredHeroLogo
              ref={logoRef}
              initialMode={logoMode}
              onModeChange={(mode) => setLogoMode(mode)}
              className="w-full"
            />

            {/* Interactive Control Console for Logo Dimensions */}
            <LogoLayerControls
              currentMode={logoMode}
              onSelectMode={(mode) => {
                setLogoMode(mode);
                logoRef.current?.setMode(mode);
              }}
              onTriggerSurge={() => logoRef.current?.pulseSurge()}
              onTriggerMaterialize={() => logoRef.current?.materialize()}
              className="mt-6 w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
