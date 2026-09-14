"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GlyphGlobe,
  GlyphSmartphone,
  GlyphLayers,
  GlyphServer,
  GlyphArrowUpRight,
} from "@/components/ui/TechnicalGlyphs";
import { servicesData } from "@/data/services";
import { cn } from "@/lib/utils";

const glyphMap: Record<string, React.FC<{ className?: string }>> = {
  Globe: GlyphGlobe,
  Smartphone: GlyphSmartphone,
  Layers: GlyphLayers,
  Server: GlyphServer,
};

export const ServicesMatrix: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(servicesData[0].id);

  const activeService =
    servicesData.find((s) => s.id === activeServiceId) || servicesData[0];
  const ActiveGlyph = glyphMap[activeService.iconName] || GlyphServer;

  return (
    <section id="layanan" className="relative min-h-screen py-20 sm:py-28 bg-[#040406] border-t border-white/10 flex flex-col justify-center select-none">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 w-full">

        {/* Structured Capabilities Row Selector (Sharp Bento Boxes) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {servicesData.map((service, index) => {
            const isActive = service.id === activeServiceId;
            const GlyphComp = glyphMap[service.iconName] || GlyphServer;

            return (
              <button
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={cn(
                  "relative flex flex-col justify-between text-left p-6 transition-colors duration-150 border",
                  isActive
                    ? "bg-white text-black font-semibold border-white"
                    : "bg-[#08080a] border-white/15 text-zinc-400 hover:border-white/30 hover:text-white"
                )}
              >
                <span className={cn("corner-tl !w-1.5 !h-1.5", isActive ? "!border-black" : "")} />
                <span className={cn("corner-tr !w-1.5 !h-1.5", isActive ? "!border-black" : "")} />
                <span className={cn("corner-bl !w-1.5 !h-1.5", isActive ? "!border-black" : "")} />
                <span className={cn("corner-br !w-1.5 !h-1.5", isActive ? "!border-black" : "")} />

                <div className="flex items-center justify-between">
                  <span className={cn("text-xs font-mono font-bold", isActive ? "text-zinc-700" : "text-zinc-500")}>
                    0{index + 1}
                  </span>
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center border",
                      isActive
                        ? "border-black/30 text-black bg-black/5"
                        : "border-white/15 text-zinc-400 bg-black"
                    )}
                  >
                    <GlyphComp className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="mt-8">
                  <span className={cn("text-[10px] font-mono uppercase tracking-widest block", isActive ? "text-zinc-700" : "text-zinc-500")}>
                    {service.category}
                  </span>
                  <h3 className={cn("mt-1 font-display text-base sm:text-lg font-extrabold uppercase tracking-tight leading-snug", isActive ? "text-black" : "text-white")}>
                    {service.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspection Panel of Active Service (Sharp Box with Corner Brackets) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-6 border border-white/20 bg-[#070709] p-8 sm:p-12"
          >
            <span className="corner-tl" />
            <span className="corner-tr" />
            <span className="corner-bl" />
            <span className="corner-br" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Overview */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center border border-white/20 bg-black text-white">
                      <ActiveGlyph className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                        {activeService.category}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                        {activeService.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-6 font-sans text-sm sm:text-base leading-relaxed text-zinc-300">
                    {activeService.description}
                  </p>

                  {/* Technical Feature Points */}
                  <div className="mt-8 space-y-3.5 border-t border-white/10 pt-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block">
                      Spesifikasi Operasional Produksi
                    </span>
                    {activeService.features.map((feature, idx) => (
                      <div key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <span className="font-mono text-xs text-zinc-500 font-bold shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips (Sharp Boxes) */}
                <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
                  <span className="font-mono text-xs text-zinc-400 mr-2">Teknologi Terkelola:</span>
                  {activeService.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-white/15 bg-black px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Panel: Performance SLA & Direct Initiation */}
              <div className="lg:col-span-5 flex flex-col justify-between border border-white/15 bg-[#0a0a0d] p-6 sm:p-8 relative">
                <span className="corner-tl !w-1.5 !h-1.5" />
                <span className="corner-tr !w-1.5 !h-1.5" />
                <span className="corner-bl !w-1.5 !h-1.5" />
                <span className="corner-br !w-1.5 !h-1.5" />

                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block">
                    Tolok Ukur Target Kinerja
                  </span>
                  
                  <div className="mt-4 p-5 border border-white/15 bg-black relative">
                    <span className="corner-tl !w-1 !h-1" />
                    <span className="corner-tr !w-1 !h-1" />
                    <span className="corner-bl !w-1 !h-1" />
                    <span className="corner-br !w-1 !h-1" />

                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                      Target Terverifikasi
                    </span>
                    <p className="mt-2 font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                      {activeService.metrics}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3.5 font-mono text-xs text-zinc-400">
                    <div className="flex justify-between border-b border-white/10 pb-2.5">
                      <span>STANDAR KEANDALAN</span>
                      <span className="text-white font-bold">99.99% UPTIME</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2.5">
                      <span>PROTOKOL KEAMANAN</span>
                      <span className="text-white font-bold">ZERO TRUST / AES-256</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2.5">
                      <span>AUDIT KEPATUHAN</span>
                      <span className="text-white font-bold">ISO 27001 & UU PDP</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      const el = document.getElementById("kontak");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex w-full items-center justify-center gap-2 bg-white px-6 py-3 font-mono text-xs uppercase tracking-wider font-bold text-black transition-colors hover:bg-zinc-200 border border-white"
                  >
                    <span>Inisiasi Solusi Ini</span>
                    <GlyphArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
