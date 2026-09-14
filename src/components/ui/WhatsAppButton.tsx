"use client";

import React from "react";
import { GlyphWhatsApp } from "@/components/ui/TechnicalGlyphs";

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = "6281289001926";
  const message = encodeURIComponent(
    "Halo Intelecta, saya tertarik untuk mendiskusikan kebutuhan solusi teknologi IT & AI untuk perusahaan kami."
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="group fixed bottom-6 right-6 z-40 relative flex h-11 w-11 items-center justify-center rounded-none border border-emerald-500/40 bg-black text-emerald-400 transition-colors duration-150 hover:bg-emerald-500 hover:text-black"
    >
      <span className="corner-tl !w-1 !h-1 !border-emerald-500" />
      <span className="corner-tr !w-1 !h-1 !border-emerald-500" />
      <span className="corner-bl !w-1 !h-1 !border-emerald-500" />
      <span className="corner-br !w-1 !h-1 !border-emerald-500" />

      <GlyphWhatsApp className="h-5 w-5 fill-current" />

      {/* Tooltip on Hover (Sharp Box) */}
      <span className="pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-none border border-white/20 bg-black px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 sm:block">
        Chat WhatsApp
      </span>
    </a>
  );
};
