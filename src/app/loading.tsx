import React from "react";

export default function Loading() {
  return (
    <aside
      aria-label="Loading page content"
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-[#020203] text-white select-none pointer-events-auto"
    >
      {/* Background Subtle Grid Scanline Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Central Interactive Loading Box */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 border border-white/10 bg-black/80 max-w-sm w-full mx-4">
        {/* Corner Crosshairs */}
        <span className="corner-tl !w-2 !h-2" />
        <span className="corner-tr !w-2 !h-2" />
        <span className="corner-bl !w-2 !h-2" />
        <span className="corner-br !w-2 !h-2" />

        {/* Animated Diamond Spinner */}
        <div className="relative w-16 h-16 flex items-center justify-center mb-6">
          {/* Outer Rotating Diamond */}
          <div className="absolute inset-0 border border-white/30 rotate-45 animate-[spin_4s_linear_infinite]" />
          {/* Inner Counter-Rotating Diamond */}
          <div className="absolute w-8 h-8 border border-white rotate-45 animate-[spin_3s_linear_infinite_reverse]" />
          {/* Center Pulsing Core */}
          <div className="w-2.5 h-2.5 bg-white rotate-45 animate-pulse" />
        </div>

        {/* Monospace Loading Label */}
        <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-zinc-300 uppercase">
          <span className="h-1.5 w-1.5 rounded-none bg-emerald-400 animate-ping" />
          <span>MEMUAT MODUL ARSITEKTUR</span>
        </div>

        {/* Thin Animated Scanning Bar */}
        <div className="mt-4 w-full h-[1.5px] bg-white/10 overflow-hidden relative">
          <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>

        <span className="mt-3 font-mono text-[10px] text-zinc-600">
          INTELECTA OS // TELEMETRY SYNC
        </span>
      </div>
    </aside>
  );
}
