"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = "6281289001926"; // Representative WhatsApp number
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
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-110 hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]"
    >
      {/* Pulse Aura */}
      <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-40" />

      <MessageCircle className="h-6 w-6 fill-current transition-transform duration-300 group-hover:rotate-12" />

      {/* Tooltip on Hover */}
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-xl border border-white/10 bg-[#0D0D11]/90 px-3.5 py-1.5 font-mono text-xs text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:opacity-100 sm:block">
        Chat WhatsApp Langsung
      </span>
    </a>
  );
};
