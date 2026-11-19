"use client";

import React, { useState, useEffect } from "react";
import {
  GlyphCalendar,
  GlyphCpu,
  GlyphGlobe,
  GlyphLayers,
  GlyphShield,
} from "@/components/ui/TechnicalGlyphs";

interface FloatingBottomDockProps {
  onOpenCommand: () => void;
  onOpenConsultation: () => void;
}

export const FloatingBottomDock: React.FC<FloatingBottomDockProps> = ({
  onOpenCommand,
  onOpenConsultation,
}) => {
  const [activeSection, setActiveSection] = useState("beranda");

  const scrollTo = (id: string, name: string) => {
    setActiveSection(name);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Section Observer to update active indicator on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "beranda") setActiveSection("beranda");
            if (entry.target.id === "layanan") setActiveSection("layanan");
            if (entry.target.id === "transformasi-section") setActiveSection("transformasi");
            if (entry.target.id === "tim") setActiveSection("tim");
          }
        });
      },
      { threshold: 0.3 }
    );

    const ids = ["beranda", "layanan", "transformasi-section", "tim"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] select-none">
      <div className="relative flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-white/15 bg-[#0a0a0e]/90 px-3 py-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-2xl">
        {/* Section Navigation Items */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => scrollTo("beranda", "beranda")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeSection === "beranda"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <GlyphGlobe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-sans">Beranda</span>
          </button>

          <button
            onClick={() => scrollTo("layanan", "layanan")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeSection === "layanan"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <GlyphLayers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-sans">Layanan</span>
          </button>

          <button
            onClick={() => scrollTo("transformasi-section", "transformasi")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeSection === "transformasi"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <GlyphCpu className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-sans">Sebelum / Sesudah</span>
          </button>

          <button
            onClick={() => scrollTo("tim", "tim")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeSection === "tim"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <GlyphShield className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-sans">Tim</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-4 w-[1px] bg-white/15 mx-0.5" />

        {/* Command Menu Trigger (Ctrl + K) */}
        <button
          onClick={onOpenCommand}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400 hover:border-white/30 hover:text-white transition-all"
          title="Buka Menu Pencarian (Ctrl + K)"
        >
          <span className="font-semibold text-zinc-300">⌘</span>
          <span className="hidden md:inline font-mono text-[10px] text-zinc-500">Ctrl K</span>
        </button>

        {/* Consultation Action CTA */}
        <button
          onClick={onOpenConsultation}
          className="rounded-full bg-white px-3.5 py-1.5 font-sans text-xs font-semibold text-black hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
        >
          <GlyphCalendar className="h-3.5 w-3.5" />
          <span>Konsultasi</span>
        </button>
      </div>
    </div>
  );
};
