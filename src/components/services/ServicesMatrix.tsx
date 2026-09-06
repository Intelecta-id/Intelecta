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
    <section id="layanan" className="relative py-24 sm:py-32 bg-[#040406] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end border-b border-white/10 pb-8">
          <div>
            <span className="font-sans text-xs tracking-widest text-zinc-400 uppercase">
              Kapabilitas Layanan
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
              Solusi Arsitektur Skala Enterprise
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm leading-relaxed text-zinc-400">
            Tiga pilar layanan utama Intelecta direkayasa dengan standar industri modern untuk stabilitas operasional tinggi, efisiensi eksekusi, dan kepuasan pengguna terbaik.
          </p>
        </div>

        {/* Structured Capabilities Row Selector */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
          {servicesData.map((service, index) => {
            const isActive = service.id === activeServiceId;
            const GlyphComp = glyphMap[service.iconName] || GlyphServer;

            return (
              <button
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={cn(
                  "relative flex flex-col justify-between text-left p-6 rounded-xl border transition-all duration-300",
                  isActive
                    ? "bg-white text-black font-semibold border-white shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                    : "bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-xs font-mono", isActive ? "text-zinc-600" : "text-zinc-500")}>
                    0{index + 1}
                  </span>
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                      isActive
                        ? "bg-black/10 text-black"
                        : "bg-white/5 text-zinc-400"
                    )}
                  >
                    <GlyphComp className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="mt-8">
                  <span className={cn("text-[11px] uppercase tracking-wider block", isActive ? "text-zinc-700" : "text-zinc-500")}>
                    {service.category}
                  </span>
                  <h3 className={cn("mt-1 font-serif text-lg sm:text-xl font-normal leading-snug", isActive ? "text-black" : "text-white")}>
                    {service.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspection Panel of Active Service */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
            className="mt-8 rounded-2xl border border-white/10 bg-[#08080C]/90 p-8 sm:p-12 backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Overview */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white">
                      <ActiveGlyph className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-sans text-xs text-zinc-400 uppercase tracking-wider block">
                        {activeService.category}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                        {activeService.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-6 font-sans text-sm sm:text-base leading-relaxed text-zinc-300">
                    {activeService.description}
                  </p>

                  {/* Technical Feature Points */}
                  <div className="mt-8 space-y-3.5 border-t border-white/10 pt-6">
                    <span className="font-sans text-xs uppercase tracking-wider text-zinc-400 block">
                      Spesifikasi Operasional Produksi
                    </span>
                    {activeService.features.map((feature, idx) => (
                      <div key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <span className="font-mono text-xs text-zinc-400 font-bold shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
                  <span className="font-sans text-xs text-zinc-400 mr-2">Teknologi Terkelola:</span>
                  {activeService.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-sans text-xs text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Panel: Performance SLA & Direct Initiation */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <div>
                  <span className="font-sans text-xs uppercase tracking-wider text-zinc-400 block">
                    Tolok Ukur Target Kinerja
                  </span>
                  
                  <div className="mt-4 p-5 rounded-lg border border-white/10 bg-black/40">
                    <span className="font-sans text-xs text-zinc-400 font-medium block">
                      Target Terverifikasi
                    </span>
                    <p className="mt-2 font-serif text-2xl sm:text-3xl text-white font-normal">
                      {activeService.metrics}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3.5 font-sans text-xs text-zinc-400">
                    <div className="flex justify-between border-b border-white/5 pb-2.5">
                      <span>Standar Keandalan</span>
                      <span className="text-white font-medium">99.99% SLA Uptime</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2.5">
                      <span>Protokol Keamanan</span>
                      <span className="text-white font-medium">Zero Trust / AES-256</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2.5">
                      <span>Audit Kepatuhan</span>
                      <span className="text-white font-medium">ISO 27001 & UU PDP</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      const el = document.getElementById("kontak");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold text-black transition-all hover:bg-zinc-200"
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
