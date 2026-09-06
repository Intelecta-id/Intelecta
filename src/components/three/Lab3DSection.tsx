"use client";

import React from "react";
import { motion } from "framer-motion";
import { Logo3DStage } from "./Logo3DStage";
import {
  GlyphLayers,
  GlyphGlobe,
  GlyphSmartphone,
  GlyphTerminal,
  GlyphRotate,
} from "@/components/ui/TechnicalGlyphs";

export const Lab3DSection: React.FC = () => {
  const pillars = [
    {
      code: "01",
      title: "Web Development",
      desc: "Web performa tinggi, company profile modern, dan landing page konversi tinggi.",
      glyph: GlyphGlobe,
    },
    {
      code: "02",
      title: "Mobile App Development",
      desc: "Aplikasi mobile iOS & Android yang tangguh, responsif, dan intuitif.",
      glyph: GlyphSmartphone,
    },
    {
      code: "03",
      title: "Web App & SaaS",
      desc: "Platform SaaS kustom, dashboard realtime, dan sistem operasional enterprise.",
      glyph: GlyphLayers,
    },
  ];

  return (
    <div
      id="3d-showcase"
      className="relative w-full bg-[#000000] min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-white/10 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header: Pengenalan Intelecta & Visi Rekayasa */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1 font-mono text-[11px] text-zinc-300 border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-ping" />
              <span>02 // PENGENALAN & IDENTITAS INTELECTA</span>
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Rekayasa Digital & Solusi Modern
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
              Intelecta adalah studio rekayasa teknologi digital terdepan. Kami berfokus merancang Website modern, Aplikasi Mobile iOS & Android, serta Web App & SaaS kustom untuk mengakselerasi pertumbuhan dan efisiensi bisnis Anda.
            </p>
          </div>

          {/* 3 Core Highlight Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 w-full lg:w-80">
            {pillars.map((pillar) => {
              const PillarIcon = pillar.glyph;
              return (
                <div
                  key={pillar.code}
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-zinc-950/80 backdrop-blur-md"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white/5 text-zinc-300 border border-white/5">
                    <PillarIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-zinc-400 font-semibold">{pillar.code}</span>
                      <span className="font-sans text-xs font-semibold text-white tracking-wide">
                        {pillar.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated 3D Canvas Stage Container (Intelecta 3D Logo Trio) */}
        <div className="mt-8 relative rounded-2xl border border-white/15 bg-black overflow-hidden shadow-[0_0_90px_rgba(0,0,0,0.95)] h-[620px] sm:h-[700px]">
          {/* 3D WebGL Canvas */}
          <div className="absolute inset-0 w-full h-full">
            <Logo3DStage />
          </div>

          {/* Bottom Left Floating Descriptive Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-6 left-6 z-20 max-w-sm rounded-xl border border-white/15 bg-black/85 p-4 backdrop-blur-xl shadow-2xl hidden md:block"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                EXTRUDED DIAMOND TRIO
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-300 font-sans">
              Monolit berlapis konsentris merefleksikan integritas, ketelitian kode, 
              dan konstelasi sistem modular yang menjadi pondasi teknologi Intelecta.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <GlyphRotate className="h-3 w-3 text-zinc-400" />
                DRAG MOUSE UNTUK ROTASI 3D
              </span>
              <span className="text-zinc-300">60 FPS WEBGL</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

