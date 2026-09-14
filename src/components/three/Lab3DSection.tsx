"use client";

import React from "react";
import { motion } from "framer-motion";
import { Logo3DStage } from "./Logo3DStage";
import {
  GlyphLayers,
  GlyphGlobe,
  GlyphSmartphone,
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
      className="relative w-full bg-black min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-white/10 overflow-hidden flex flex-col justify-center select-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* 3 Core Highlight Pillars (Sharp Boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pb-8 border-b border-white/10">
            {pillars.map((pillar) => {
              const PillarIcon = pillar.glyph;
              return (
                <div
                  key={pillar.code}
                  className="relative flex items-center gap-3 p-3 border border-white/15 bg-[#08080a]"
                >
                  <span className="corner-tl !w-1 !h-1" />
                  <span className="corner-tr !w-1 !h-1" />
                  <span className="corner-bl !w-1 !h-1" />
                  <span className="corner-br !w-1 !h-1" />

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/20 bg-black text-white">
                    <PillarIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-zinc-400 font-bold">{pillar.code}</span>
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        {pillar.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-1 font-sans mt-0.5">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        {/* Dedicated 3D Canvas Stage Container (Intelecta 3D Logo Trio) */}
        <div className="mt-8 relative box-sharp bg-black overflow-hidden border border-white/20 h-[600px] sm:h-[680px]">
          <span className="corner-tl" />
          <span className="corner-tr" />
          <span className="corner-bl" />
          <span className="corner-br" />

          {/* 3D WebGL Canvas */}
          <div className="absolute inset-0 w-full h-full">
            <Logo3DStage />
          </div>

          {/* Bottom Left Floating Descriptive Card (Sharp Box) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute bottom-6 left-6 z-20 max-w-sm border border-white/20 bg-black/90 p-4 shadow-2xl hidden md:block"
          >
            <span className="corner-tl !w-1 !h-1" />
            <span className="corner-tr !w-1 !h-1" />
            <span className="corner-bl !w-1 !h-1" />
            <span className="corner-br !w-1 !h-1" />

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-none bg-white" />
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
              <span className="text-white font-bold">60 FPS WEBGL</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
