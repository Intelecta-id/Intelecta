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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Initialize Web Audio Context on first user click
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      let ctx = audioCtx;
      if (!ctx) {
        ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        setAudioCtx(ctx);
      }
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Audio fallback safe
    }
  };

  const scrollTo = (id: string, name: string) => {
    playClickSound();
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
      <div className="relative flex items-center gap-1 sm:gap-2 border border-white/20 bg-[#07070a]/90 px-3 py-2 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.06)] backdrop-blur-2xl">
        {/* Technical Corner Brackets */}
        <span className="corner-tl !w-1 !h-1" />
        <span className="corner-tr !w-1 !h-1" />
        <span className="corner-bl !w-1 !h-1" />
        <span className="corner-br !w-1 !h-1" />

        {/* Section Navigation Items */}
        <div className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider">
          <button
            onClick={() => scrollTo("beranda", "beranda")}
            className={`px-2.5 py-1 transition-colors flex items-center gap-1.5 ${
              activeSection === "beranda"
                ? "bg-white text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <GlyphGlobe className="h-3 w-3" />
            <span className="hidden sm:inline">Beranda</span>
          </button>

          <button
            onClick={() => scrollTo("layanan", "layanan")}
            className={`px-2.5 py-1 transition-colors flex items-center gap-1.5 ${
              activeSection === "layanan"
                ? "bg-white text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <GlyphLayers className="h-3 w-3" />
            <span className="hidden sm:inline">Layanan</span>
          </button>

          <button
            onClick={() => scrollTo("transformasi-section", "transformasi")}
            className={`px-2.5 py-1 transition-colors flex items-center gap-1.5 ${
              activeSection === "transformasi"
                ? "bg-white text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <GlyphCpu className="h-3 w-3" />
            <span className="hidden sm:inline">Sebelum / Sesudah</span>
          </button>

          <button
            onClick={() => scrollTo("tim", "tim")}
            className={`px-2.5 py-1 transition-colors flex items-center gap-1.5 ${
              activeSection === "tim"
                ? "bg-white text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <GlyphShield className="h-3 w-3" />
            <span className="hidden sm:inline">Tim</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-4 w-[1px] bg-white/20 mx-1" />

        {/* Command Menu Trigger (Ctrl + K) */}
        <button
          onClick={() => {
            playClickSound();
            onOpenCommand();
          }}
          className="flex items-center gap-1.5 border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:border-white/35 hover:text-white transition-colors"
          title="Buka Command Menu (Ctrl + K)"
        >
          <span className="font-bold">⌘</span>
          <span className="hidden md:inline font-mono text-[10px] text-zinc-500">Ctrl K</span>
        </button>

        {/* Audio Click Toggle */}
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (!soundEnabled) playClickSound();
          }}
          className={`px-2 py-1 font-mono text-[10px] border transition-colors ${
            soundEnabled
              ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-400"
              : "border-white/10 text-zinc-500 hover:text-zinc-300"
          }`}
          title="Toggle Synthesizer Haptic Audio"
        >
          {soundEnabled ? "SFX: ON" : "SFX: OFF"}
        </button>

        {/* Consultation Action CTA */}
        <button
          onClick={() => {
            playClickSound();
            onOpenConsultation();
          }}
          className="border border-white bg-white px-3 py-1 font-mono text-[11px] font-bold text-black uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <GlyphCalendar className="h-3 w-3" />
          <span>Konsultasi</span>
        </button>
      </div>
    </div>
  );
};
