"use client";

import React, { useRef, useState } from "react";
import { GlyphArrowRight, GlyphCalendar, GlyphShield, GlyphCpu, GlyphLayers } from "@/components/ui/TechnicalGlyphs";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Hero3DCanvas, Hero3DCanvasRef, Hero3DMode } from "./Hero3DCanvas";

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  const canvas3DRef = useRef<Hero3DCanvasRef>(null);
  const [active3DMode, setActive3DMode] = useState<Hero3DMode>("float");

  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 pb-20 grid-pattern bg-black"
    >
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Narrative Headline & Actions (7 cols) */}
          <div className="text-center lg:col-span-7 lg:text-left flex flex-col items-center lg:items-start">
            {/* Top Architectural Signal Badge (Harsh Dayal Minimal Style) */}
            <div className="relative inline-flex items-center gap-2.5 border border-white/20 bg-[#08080b] px-3.5 py-1.5 font-mono text-[11px] tracking-widest text-zinc-300 uppercase">
              <span className="corner-tl !w-1 !h-1" />
              <span className="corner-tr !w-1 !h-1" />
              <span className="corner-bl !w-1 !h-1" />
              <span className="corner-br !w-1 !h-1" />
              <span className="h-1.5 w-1.5 rounded-none bg-white animate-pulse" />
              <ScrambleText text="REKAYASA DIGITAL & ARSITEKTUR ENTERPRISE" speed={28} delay={300} />
            </div>

            {/* Grand Headline - Solid White High-Contrast Typography (Zero Gradients) */}
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.08] select-none">
              <span className="block text-white">
                Membangun Solusi
              </span>
              <span className="block text-white">
                Web, App & SaaS
              </span>
              <span className="block text-zinc-400">
                Kelas Dunia.
              </span>
            </h1>

            {/* Sub-headline Narrative */}
            <p className="mt-6 font-sans text-base sm:text-lg leading-relaxed text-zinc-400 max-w-2xl font-normal">
              Partner rekayasa teknologi terpercaya untuk pengembangan produk digital skala besar dengan keandalan tinggi dan performa sub-milidetik.
            </p>

            {/* Solid Hairline Divider */}
            <div className="w-full max-w-md h-[1px] my-6 bg-white/15" />

            {/* Primary & Secondary Action CTAs (Sharp Rectangular Buttons) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <MagneticButton
                variant="primary"
                onClick={() => {
                  const el = document.getElementById("layanan");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Jelajahi Kapabilitas</span>
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
                <span>Jadwalkan Konsultasi</span>
              </MagneticButton>
            </div>

            {/* Trust Metrics / Specs Grid (Sharp Boxes with Corner Crosshairs) */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
              <div className="relative flex items-center gap-2 border border-white/10 bg-[#070709] px-3.5 py-2 text-xs font-mono text-zinc-400">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <GlyphShield className="h-3.5 w-3.5 text-white shrink-0" />
                <span>Zero-Trust Security</span>
              </div>

              <div className="relative flex items-center gap-2 border border-white/10 bg-[#070709] px-3.5 py-2 text-xs font-mono text-zinc-400">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <GlyphCpu className="h-3.5 w-3.5 text-white shrink-0" />
                <span>99.99% Cloud SLA</span>
              </div>

              <div className="relative flex items-center gap-2 border border-white/10 bg-[#070709] px-3.5 py-2 text-xs font-mono text-zinc-400">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <GlyphLayers className="h-3.5 w-3.5 text-white shrink-0" />
                <span>Distributed Mesh</span>
              </div>
            </div>
          </div>

          {/* Right Column: Three.js Interactive 3D Canvas (5 cols) */}
          <div className="flex flex-col items-center justify-center lg:col-span-5 w-full">
            <Hero3DCanvas
              ref={canvas3DRef}
              initialMode={active3DMode}
              onModeChange={(mode) => setActive3DMode(mode)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
