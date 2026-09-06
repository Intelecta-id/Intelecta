"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";
import { GlyphArrowRight, GlyphShield, GlyphCpu, GlyphServer, GlyphActivity } from "@/components/ui/TechnicalGlyphs";

export const BeforeAfterCompare: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const afterPanelRef = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(0); // 0 (100% Before) to 100 (100% After)
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const afterPanel = afterPanelRef.current;
    const dividerLine = dividerLineRef.current;
    if (!container || !afterPanel || !dividerLine) return;

    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger to scrub the Before vs After transition on scroll
      const st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (isDraggingRef.current) return;
          const p = self.progress; // 0 to 1
          const pct = p * 100;
          setSplitPercent(pct);

          // Update clip path: reveal After panel from right to left
          gsap.set(afterPanel, {
            clipPath: `inset(0% 0% 0% ${100 - pct}%)`,
          });
          // Update divider position
          gsap.set(dividerLine, {
            left: `${pct}%`,
          });
        },
      });

      return () => {
        st.kill();
      };
    }, container);

    return () => ctx.revert();
  }, []);

  // Programmatic snap for the quick toggle pill
  const handleSnapTo = (targetState: "before" | "after") => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollDistance = rect.height - window.innerHeight;

    const targetScrollY =
      targetState === "before" ? containerTop : containerTop + scrollDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  // Drag interaction on divider handle
  const handleMouseDown = () => {
    isDraggingRef.current = true;
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !stickyRef.current) return;
      const rect = stickyRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clampedPct = Math.max(0, Math.min(100, (clientX / rect.width) * 100));
      setSplitPercent(clampedPct);

      if (afterPanelRef.current) {
        gsap.set(afterPanelRef.current, {
          clipPath: `inset(0% 0% 0% ${100 - clampedPct}%)`,
        });
      }
      if (dividerLineRef.current) {
        gsap.set(dividerLineRef.current, {
          left: `${clampedPct}%`,
        });
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={containerRef}
      id="transformasi"
      className="relative w-full h-[250vh] bg-[#030303] select-none"
    >
      {/* Sticky Full-Screen Viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-[#030303] text-white"
      >
        {/* ========================================================================= */}
        {/* TOP HEADER: Title & Tactile Before/After Switcher                         */}
        {/* ========================================================================= */}
        <header className="relative z-40 w-full px-6 sm:px-12 lg:px-16 pt-20 sm:pt-24 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 backdrop-blur-md bg-black/50">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                04 // BENCHMARK TRANSFORMASI TEKNOLOGI
              </span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-white">
              Perbandingan Kinerja: <span className="text-zinc-500">Before & After</span>
            </h2>
          </div>

          {/* Minimalist 2-State Pill Switcher */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center p-1 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl">
              <button
                onClick={() => handleSnapTo("before")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300",
                  splitPercent < 50
                    ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                01 BEFORE (LEGACY)
              </button>
              <button
                onClick={() => handleSnapTo("after")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300",
                  splitPercent >= 50
                    ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                02 AFTER (INTELECTA)
              </button>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* CENTER STAGE: ON-SCROLL SPLIT STACKED PANELS                              */}
        {/* ========================================================================= */}
        <div className="relative z-10 w-full flex-1 overflow-hidden">
          {/* --------------------------------------------------------------------- */}
          {/* PANEL A: BEFORE (SISTEM LEGACY / MONOLITH KONVENSIONAL)              */}
          {/* --------------------------------------------------------------------- */}
          <div className="absolute inset-0 w-full h-full bg-[#070709] px-6 sm:px-12 lg:px-16 py-8 sm:py-12 flex flex-col justify-between">
            {/* Top Narrative Row */}
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-mono text-red-400">
                <span>STATUS: AUDIT SISTEM LAMA // BOTTLENECK KRITIS</span>
              </div>
              <h3 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                Arsitektur Monolit Statis
              </h3>
              <p className="mt-3 font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
                Ketergantungan infrastruktur lama membatasi pertumbuhan bisnis. Saturasi beban tak terkendali saat lonjakan transaksi, memicu downtime berkala dan pemborosan komputasi.
              </p>
            </div>

            {/* 4 Stark Problem Metrics Grid */}
            <div className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <span className="font-mono text-xs text-zinc-500 uppercase block">01 Latensi P99</span>
                <p className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-red-400 mt-2">
                  1,200 <span className="text-xs font-sans text-zinc-500">ms</span>
                </p>
                <p className="text-xs font-sans text-zinc-500 mt-2">Antrean request menumpuk di gateway monolit.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <span className="font-mono text-xs text-zinc-500 uppercase block">02 Batas Transaksi</span>
                <p className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-amber-400 mt-2">
                  2,400 <span className="text-xs font-sans text-zinc-500">req/s</span>
                </p>
                <p className="text-xs font-sans text-zinc-500 mt-2">Kapasitas server statis saturasi saat flash sale.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <span className="font-mono text-xs text-zinc-500 uppercase block">03 Tingkat Kegagalan</span>
                <p className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-red-400 mt-2">
                  4.82%
                </p>
                <p className="text-xs font-sans text-zinc-500 mt-2">Single availability zone tanpa failover otomatis.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <span className="font-mono text-xs text-zinc-500 uppercase block">04 Rilis / Deployment</span>
                <p className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-zinc-400 mt-2">
                  4 Jam <span className="text-xs font-sans text-zinc-500">Downtime</span>
                </p>
                <p className="text-xs font-sans text-zinc-500 mt-2">Setiap pembaruan membutuhkan jendela henti layanan.</p>
              </div>
            </div>

            {/* Bottom Status Callout */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>◄ SISTEM SEBELUM TRANSFORMASI</span>
              <span className="hidden sm:inline">GULIR KE BAWAH UNTUK MELIHAT HASIL ARSITEKTUR INTELECTA ►</span>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* PANEL B: AFTER (ARSITEKTUR INTELECTA CLOUD-NATIVE HIGH AVAILABILITY) */}
          {/* --------------------------------------------------------------------- */}
          <div
            ref={afterPanelRef}
            style={{ clipPath: "inset(0% 0% 0% 100%)" }}
            className="absolute inset-0 w-full h-full bg-[#020203] px-6 sm:px-12 lg:px-16 py-8 sm:py-12 flex flex-col justify-between border-l border-white/20 shadow-[-20px_0_40px_rgba(0,0,0,0.8)]"
          >
            {/* Top Narrative Row */}
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>HASIL REKAYASA // STANDAR ENTERPRISE 99.99%</span>
              </div>
              <h3 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                Arsitektur Terdistribusi Cloud-Native
              </h3>
              <p className="mt-3 font-sans text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                Microservices berbasis Go & Rust dengan akselerasi I/O kernel bypass, replikasi konsensus multi-region aktif, dan skalabilitas pod otonom dalam &lt; 15 detik.
              </p>
            </div>

            {/* 4 Transformative Enterprise Metrics Grid */}
            <div className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="rounded-xl border border-white/20 bg-white/[0.04] p-5 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
                <span className="font-mono text-xs text-zinc-400 uppercase block">01 Latensi P99</span>
                <p className="font-display text-3xl sm:text-4xl font-black uppercase text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  &lt; 12 <span className="text-xs font-sans text-zinc-400">ms</span>
                </p>
                <p className="text-xs font-sans text-emerald-400 mt-2 font-medium">99% Reduksi latensi sub-milidetik.</p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/[0.04] p-5 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
                <span className="font-mono text-xs text-zinc-400 uppercase block">02 Batas Transaksi</span>
                <p className="font-display text-3xl sm:text-4xl font-black uppercase text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  120K <span className="text-xs font-sans text-zinc-400">req/s</span>
                </p>
                <p className="text-xs font-sans text-emerald-400 mt-2 font-medium">50x Peningkatan kapasitas transaksi.</p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/[0.04] p-5 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
                <span className="font-mono text-xs text-zinc-400 uppercase block">03 Tingkat Kegagalan</span>
                <p className="font-display text-3xl sm:text-4xl font-black uppercase text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  0.001%
                </p>
                <p className="text-xs font-sans text-emerald-400 mt-2 font-medium">99.99% SLA Uptime kontraktual terjamin.</p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/[0.04] p-5 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
                <span className="font-mono text-xs text-zinc-400 uppercase block">04 Rilis / Deployment</span>
                <p className="font-display text-3xl sm:text-4xl font-black uppercase text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  0 ms <span className="text-xs font-sans text-zinc-400">Downtime</span>
                </p>
                <p className="text-xs font-sans text-emerald-400 mt-2 font-medium">Blue-green & canary rollout instan.</p>
              </div>
            </div>

            {/* Bottom Status Callout */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="text-white font-bold">ARSITEKTUR INTELECTA AKTIF</span>
              <span>TERVERIFIKASI TELEMETRI KERNEL EBPF</span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* SCRUBBED ON-SCROLL DIVIDER LINE & TACTILE DRAG HANDLE                */}
          {/* ===================================================================== */}
          <div
            ref={dividerLineRef}
            style={{ left: "0%" }}
            className="absolute top-0 bottom-0 w-[2px] bg-white z-30 pointer-events-none shadow-[0_0_20px_#ffffff]"
          >
            {/* Center Diamond Pill Handle */}
            <div
              onMouseDown={handleMouseDown}
              className="pointer-events-auto absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/40 bg-black/90 px-3.5 py-1.5 backdrop-blur-xl shadow-[0_0_25px_rgba(255,255,255,0.4)] cursor-ew-resize hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="font-mono text-[10px] text-zinc-400 font-semibold tracking-wider">
                BEFORE
              </span>
              <div className="h-2 w-2 rotate-45 border border-white bg-white shadow-[0_0_8px_#ffffff]" />
              <span className="font-mono text-[10px] text-white font-bold tracking-wider">
                AFTER
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM PROGRESS TRACKER BAR                                               */}
        {/* ========================================================================= */}
        <footer className="relative z-40 w-full px-6 sm:px-12 lg:px-16 py-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-black/60 backdrop-blur-md">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white animate-ping" />
            <span>TRANSISI ON-SCROLL: {Math.round(splitPercent)}% SELESAI</span>
          </span>
          <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              style={{ width: `${splitPercent}%` }}
              className="h-full bg-white shadow-[0_0_10px_#ffffff] transition-all duration-75"
            />
          </div>
          <span className="hidden sm:inline text-zinc-500">
            GESER SLIDER ATAU GULIR UNTUK MEMBANDINGKAN
          </span>
        </footer>
      </div>
    </div>
  );
};
