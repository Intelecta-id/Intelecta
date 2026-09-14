"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

export const BeforeAfterCompare: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const afterPanelRef = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(0); // 0 (100% Before) to 100 (100% After)
  const isDraggingRef = useRef(false);

  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const afterPanel = afterPanelRef.current;
    const dividerLine = dividerLineRef.current;
    if (!container || !afterPanel || !dividerLine) return;

    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger to pin and scrub the Before vs After transition on scroll
      const st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (isDraggingRef.current) return;
          const p = self.progress; // 0 to 1
          const pct = Math.min(100, Math.max(0, p * 100));
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

      scrollTriggerRef.current = st;

      return () => {
        st.kill();
      };
    }, container);

    return () => ctx.revert();
  }, []);

  // Programmatic snap for the quick toggle
  const handleSnapTo = (targetState: "before" | "after") => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    const targetScrollY = targetState === "before" ? st.start : st.end;

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
      className="relative w-full h-screen bg-black select-none overflow-hidden flex flex-col justify-between text-white"
    >
      {/* Full-Screen Viewport Container */}
      <div
        ref={stickyRef}
        className="relative h-full w-full overflow-hidden flex flex-col justify-between bg-black text-white"
      >
        {/* ========================================================================= */}
        {/* TOP HEADER: Title & Tactile Before/After Switcher                         */}
        {/* ========================================================================= */}
        <header className="relative z-40 w-full px-6 sm:px-12 lg:px-16 pt-20 sm:pt-24 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 bg-black">
          <div></div>

          {/* Minimalist 2-State Sharp Box Switcher */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center p-1 border border-white/20 bg-black">
              <button
                onClick={() => handleSnapTo("before")}
                className={cn(
                  "px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors border",
                  splitPercent < 50
                    ? "bg-white text-black font-bold border-white"
                    : "bg-transparent text-zinc-400 border-transparent hover:text-white"
                )}
              >
                01 BEFORE (LEGACY)
              </button>
              <button
                onClick={() => handleSnapTo("after")}
                className={cn(
                  "px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors border",
                  splitPercent >= 50
                    ? "bg-white text-black font-bold border-white"
                    : "bg-transparent text-zinc-400 border-transparent hover:text-white"
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
              <div className="relative inline-flex items-center gap-2 border border-red-500/40 bg-black px-3 py-1 text-[11px] font-mono text-red-400">
                <span className="corner-tl !w-1 !h-1 !border-red-500" />
                <span className="corner-tr !w-1 !h-1 !border-red-500" />
                <span className="corner-bl !w-1 !h-1 !border-red-500" />
                <span className="corner-br !w-1 !h-1 !border-red-500" />
                <span>STATUS: AUDIT SISTEM LAMA // BOTTLENECK KRITIS</span>
              </div>
              <h3 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                Arsitektur Monolit Statis
              </h3>
              <p className="mt-3 font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
                Ketergantungan infrastruktur lama membatasi pertumbuhan bisnis. Saturasi beban tak terkendali saat lonjakan transaksi, memicu downtime berkala dan pemborosan komputasi.
              </p>
            </div>

            {/* 4 Problem Metrics Grid (Sharp Boxes with Corner Crosshairs) */}
            <div className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative border border-white/10 bg-[#0a0a0d] p-5">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <span className="font-mono text-xs text-zinc-500 uppercase block">01 Latensi P99</span>
                <p className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-red-400 mt-2">
                  1,200 <span className="text-xs font-mono text-zinc-500">ms</span>
                </p>
                <p className="text-xs font-sans text-zinc-500 mt-2">Antrean request menumpuk di gateway monolit.</p>
              </div>

              <div className="relative border border-white/10 bg-[#0a0a0d] p-5">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <span className="font-mono text-xs text-zinc-500 uppercase block">02 Batas Transaksi</span>
                <p className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-amber-400 mt-2">
                  2,400 <span className="text-xs font-mono text-zinc-500">req/s</span>
                </p>
                <p className="text-xs font-sans text-zinc-500 mt-2">Kapasitas server statis saturasi saat flash sale.</p>
              </div>

              <div className="relative border border-white/10 bg-[#0a0a0d] p-5">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <span className="font-mono text-xs text-zinc-500 uppercase block">03 Tingkat Kegagalan</span>
                <p className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-red-400 mt-2">
                  4.82%
                </p>
                <p className="text-xs font-sans text-zinc-500 mt-2">Single availability zone tanpa failover otomatis.</p>
              </div>

              <div className="relative border border-white/10 bg-[#0a0a0d] p-5">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <span className="font-mono text-xs text-zinc-500 uppercase block">04 Rilis / Deployment</span>
                <p className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-zinc-400 mt-2">
                  4 Jam <span className="text-xs font-mono text-zinc-500">Downtime</span>
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
            className="absolute inset-0 w-full h-full bg-[#020203] px-6 sm:px-12 lg:px-16 py-8 sm:py-12 flex flex-col justify-between border-l border-white/20"
          >
            {/* Top Narrative Row */}
            <div className="max-w-4xl">
              <div className="relative inline-flex items-center gap-2 border border-emerald-500/40 bg-black px-3 py-1 text-[11px] font-mono text-emerald-400">
                <span className="corner-tl !w-1 !h-1 !border-emerald-500" />
                <span className="corner-tr !w-1 !h-1 !border-emerald-500" />
                <span className="corner-bl !w-1 !h-1 !border-emerald-500" />
                <span className="corner-br !w-1 !h-1 !border-emerald-500" />
                <span className="h-1.5 w-1.5 rounded-none bg-emerald-400 animate-pulse" />
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
            <div className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative border border-white/20 bg-[#08080c] p-5">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <span className="font-mono text-xs text-zinc-400 uppercase block">01 Latensi P99</span>
                <p className="font-display text-3xl sm:text-4xl font-black uppercase text-white mt-2">
                  &lt; 12 <span className="text-xs font-mono text-zinc-400">ms</span>
                </p>
                <p className="text-xs font-mono text-emerald-400 mt-2 font-medium">99% Reduksi latensi sub-milidetik.</p>
              </div>

              <div className="relative border border-white/20 bg-[#08080c] p-5">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <span className="font-mono text-xs text-zinc-400 uppercase block">02 Batas Transaksi</span>
                <p className="font-display text-3xl sm:text-4xl font-black uppercase text-white mt-2">
                  120K <span className="text-xs font-mono text-zinc-400">req/s</span>
                </p>
                <p className="text-xs font-mono text-emerald-400 mt-2 font-medium">50x Peningkatan kapasitas transaksi.</p>
              </div>

              <div className="relative border border-white/20 bg-[#08080c] p-5">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <span className="font-mono text-xs text-zinc-400 uppercase block">03 Tingkat Kegagalan</span>
                <p className="font-display text-3xl sm:text-4xl font-black uppercase text-white mt-2">
                  0.001%
                </p>
                <p className="text-xs font-mono text-emerald-400 mt-2 font-medium">99.99% SLA Uptime terjamin.</p>
              </div>

              <div className="relative border border-white/20 bg-[#08080c] p-5">
                <span className="corner-tl !w-1 !h-1" />
                <span className="corner-tr !w-1 !h-1" />
                <span className="corner-bl !w-1 !h-1" />
                <span className="corner-br !w-1 !h-1" />
                <span className="font-mono text-xs text-zinc-400 uppercase block">04 Rilis / Deployment</span>
                <p className="font-display text-3xl sm:text-4xl font-black uppercase text-white mt-2">
                  0 ms <span className="text-xs font-mono text-zinc-400">Downtime</span>
                </p>
                <p className="text-xs font-mono text-emerald-400 mt-2 font-medium">Blue-green & canary rollout instan.</p>
              </div>
            </div>

            {/* Bottom Status Callout */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="text-white font-bold">ARSITEKTUR INTELECTA AKTIF</span>
              <span>TERVERIFIKASI TELEMETRI KERNEL EBPF</span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* SCRUBBED ON-SCROLL DIVIDER LINE & TACTILE DRAG HANDLE (Solid Hairline) */}
          {/* ===================================================================== */}
          <div
            ref={dividerLineRef}
            style={{ left: "0%" }}
            className="absolute top-0 bottom-0 w-[1.5px] bg-white z-30 pointer-events-none"
          >
            {/* Center Rectangular Drag Handle with Corner Crosshairs */}
            <div
              onMouseDown={handleMouseDown}
              className="pointer-events-auto absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-2 border border-white bg-black px-3 py-1.5 cursor-ew-resize select-none"
            >
              <span className="corner-tl !w-1 !h-1" />
              <span className="corner-tr !w-1 !h-1" />
              <span className="corner-bl !w-1 !h-1" />
              <span className="corner-br !w-1 !h-1" />

              <span className="font-mono text-[10px] text-zinc-400 font-bold tracking-wider">
                BEFORE
              </span>
              <div className="h-1.5 w-1.5 bg-white" />
              <span className="font-mono text-[10px] text-white font-bold tracking-wider">
                AFTER
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM PROGRESS TRACKER BAR (Sharp Solid Hairline Bar)                    */}
        {/* ========================================================================= */}
        <footer className="relative z-40 w-full px-6 sm:px-12 lg:px-16 py-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-black">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-none bg-white animate-pulse" />
            <span>TRANSISI ON-SCROLL: {Math.round(splitPercent)}% SELESAI</span>
          </span>
          <div className="w-48 sm:w-64 h-1.5 bg-white/10 overflow-hidden">
            <div
              style={{ width: `${splitPercent}%` }}
              className="h-full bg-white transition-all duration-75"
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
