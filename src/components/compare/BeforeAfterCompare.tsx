"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { PanelTransition } from "@/components/transitions/PanelTransition";
import { GlyphArrowUpRight } from "@/components/ui/TechnicalGlyphs";
import { cn } from "@/lib/utils";

interface ComparisonPanelData {
  idx: number;
  tag: string;
  tabTitle: string;
}

const tabs: ComparisonPanelData[] = [
  { idx: 0, tag: "01", tabTitle: "Sistem Legacy" },
  { idx: 1, tag: "02", tabTitle: "Rekayasa Ulang" },
  { idx: 2, tag: "03", tabTitle: "Arsitektur Intelecta" },
  { idx: 3, tag: "04", tabTitle: "Matriks Dampak" },
];

export const BeforeAfterCompare: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isProgrammaticScroll = useRef(false);

  // Scroll tracking container (320vh height to give a luxurious pacing)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Synchronize scroll position with active panel index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isProgrammaticScroll.current) return;

      let nextIndex = 0;
      if (latest >= 0.75) nextIndex = 3;
      else if (latest >= 0.5) nextIndex = 2;
      else if (latest >= 0.25) nextIndex = 1;
      else nextIndex = 0;

      if (nextIndex !== activePanelIndex) {
        setDirection(nextIndex > activePanelIndex ? 1 : -1);
        setActivePanelIndex(nextIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activePanelIndex]);

  // Tab click transition with smooth scroll sync
  const handleTabClick = (targetIndex: number) => {
    if (targetIndex === activePanelIndex) return;

    setDirection(targetIndex > activePanelIndex ? 1 : -1);
    setActivePanelIndex(targetIndex);

    if (!containerRef.current) return;
    isProgrammaticScroll.current = true;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollDistance = rect.height - window.innerHeight;
    const targetFraction = targetIndex / 3;
    const targetScrollY = containerTop + scrollDistance * targetFraction;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  };

  return (
    <div
      ref={containerRef}
      id="transformasi"
      className="relative w-full h-[320vh] bg-[#030303] overflow-visible"
    >
      {/* Sticky Full-Screen Isolated Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-[#030303] text-white select-none">
        
        {/* Subtle Ambient Vignette & Canvas Grid */}
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 z-0" />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20 z-0" />

        {/* ========================================================================= */}
        {/* TOP HEADER: Editorial Title & Tab Switcher                                */}
        {/* ========================================================================= */}
        <header className="relative z-30 w-full px-6 sm:px-12 lg:px-16 pt-20 sm:pt-24 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 backdrop-blur-md bg-black/40">
          <div>
            <span className="font-sans text-xs tracking-widest text-zinc-400 uppercase">
              Transformasi Arsitektur
            </span>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal tracking-tight">
              Perbandingan Kinerja: <span className="italic font-normal text-zinc-400">Legacy vs Intelecta</span>
            </h2>
          </div>

          {/* Minimalist Tactile Tab Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0">
            {tabs.map((tab) => {
              const isActive = activePanelIndex === tab.idx;
              return (
                <button
                  key={tab.idx}
                  onClick={() => handleTabClick(tab.idx)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs transition-all duration-300 flex items-center gap-2 border",
                    isActive
                      ? "bg-white text-black font-semibold border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                      : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
                  )}
                >
                  <span className={cn("text-[10px] font-mono", isActive ? "text-zinc-600" : "text-zinc-500")}>
                    {tab.tag}
                  </span>
                  <span>{tab.tabTitle}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* ========================================================================= */}
        {/* CENTER STAGE: ZERO-BLEED ABSOLUTE STACKED PANELS                          */}
        {/* ========================================================================= */}
        <div className="relative z-10 w-full flex-1 overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction}>
            <PanelTransition
              key={activePanelIndex}
              activeKey={activePanelIndex}
              variant="diagonal"
              direction={direction}
              className="px-6 sm:px-12 lg:px-16 py-8 sm:py-12 flex flex-col justify-center"
            >
              {/* ----------------------------------------------------------------- */}
              {/* PANEL 01: SISTEM LEGACY KONVENSIONAL                              */}
              {/* ----------------------------------------------------------------- */}
              {activePanelIndex === 0 && (
                <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-between">
                  {/* Top Narrative Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-white/10 pb-8">
                    <div className="lg:col-span-7">
                      <span className="text-xs uppercase tracking-widest text-zinc-400">
                        Kondisi Awal Perusahaan
                      </span>
                      <h3 className="mt-2 font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                        Sistem Monolitik Konvensional
                      </h3>
                      <p className="mt-4 font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                        Ketergantungan pada single point of failure dan database lock contention yang menyebabkan antrean I/O blocking saat transaksi puncak.
                      </p>
                    </div>

                    {/* Single Big Visual Statement Number */}
                    <div className="lg:col-span-5 flex flex-col justify-end lg:items-end">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        Latency Respon P99
                      </span>
                      <p className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-zinc-100 mt-1 tracking-tight">
                        450 – 1,200 <span className="text-2xl text-zinc-400 font-sans">ms</span>
                      </p>
                      <p className="text-xs text-zinc-400 mt-2 text-left lg:text-right max-w-xs">
                        Tingkat penurunan transaksi mencapai 8.5% selama jam sibuk akibat bottleneck antrean.
                      </p>
                    </div>
                  </div>

                  {/* Specs Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto pt-6">
                    <div className="border-l border-white/15 pl-5">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        Pemulihan Bencana (DR)
                      </span>
                      <p className="font-serif text-3xl sm:text-4xl text-white mt-1">
                        4 – 8 Jam
                      </p>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Failover manual oleh tim IT dengan risiko RPO &gt; 60 menit dan kehilangan data historis.
                      </p>
                    </div>

                    <div className="border-l border-white/15 pl-5">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        Batas Kapasitas Transaksi
                      </span>
                      <p className="font-serif text-3xl sm:text-4xl text-white mt-1">
                        2,400 <span className="text-sm font-sans text-zinc-400">req/s</span>
                      </p>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Kapasitas server statis tak mampu mengimbangi lonjakan trafik saat periode promosi.
                      </p>
                    </div>

                    <div className="border-l border-white/15 pl-5">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        Tingkat Kegagalan (Error Rate)
                      </span>
                      <p className="font-serif text-3xl sm:text-4xl text-white mt-1">
                        4.82%
                      </p>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Single Availability Zone tanpa redundansi aktif antar kawasan data center.
                      </p>
                    </div>
                  </div>

                  {/* Editorial Footer Line */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-sans">
                    <span>STATUS: AUDIT SELESAI</span>
                    <span className="hidden sm:inline text-zinc-400">
                      Gunakan tab di atas atau scroll untuk meninjau proses rekayasa ulang
                    </span>
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* PANEL 02: PROSES RE-ENGINEERING & ENGINE MIGRASI                  */}
              {/* ----------------------------------------------------------------- */}
              {activePanelIndex === 1 && (
                <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-between">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-white/10 pb-8">
                    <div className="lg:col-span-7">
                      <span className="text-xs uppercase tracking-widest text-zinc-400">
                        Modernisasi Terstruktur
                      </span>
                      <h3 className="mt-2 font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                        Proses Rekayasa Ulang
                      </h3>
                      <p className="mt-4 font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                        Dekomposisi monolit menjadi microservices berbasis Go & Rust dengan optimasi memori tingkat kernel tanpa menghentikan layanan yang berjalan.
                      </p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-end lg:items-end">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        Reduksi Overhead CPU
                      </span>
                      <p className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-zinc-100 mt-1 tracking-tight">
                        -70%
                      </p>
                      <p className="text-xs text-zinc-400 mt-2 text-left lg:text-right max-w-xs">
                        Pengurangan konsumsi komputasi melalui kernel-bypass networking dan eBPF telemetry.
                      </p>
                    </div>
                  </div>

                  {/* 3 Pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto pt-6">
                    <div className="border-l border-white/15 pl-5">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        01 / Jaringan Berkecepatan Tinggi
                      </span>
                      <h4 className="font-sans text-lg font-semibold text-white mt-1">
                        Kernel-Bypass IO
                      </h4>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Menggantikan stack IO konvensional dengan pipeline komputasi tinggi tanpa context switching.
                      </p>
                    </div>

                    <div className="border-l border-white/15 pl-5">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        02 / Sinkronisasi Data
                      </span>
                      <h4 className="font-sans text-lg font-semibold text-white mt-1">
                        Active Quorum Multi-Region
                      </h4>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Replikasi konsisten lintas data center dengan konsensus Raft terdistribusi tanpa latensi tambahan.
                      </p>
                    </div>

                    <div className="border-l border-white/15 pl-5">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        03 / Skala Otomatis
                      </span>
                      <h4 className="font-sans text-lg font-semibold text-white mt-1">
                        Autonomous Autoscaling
                      </h4>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Horizontal Pod Autoscaler reaktif menyesuaikan kapasitas komputasi dalam kurun waktu &lt; 15 detik.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-sans">
                    <span>METODOLOGI: BLUE-GREEN ZERO DOWNTIME ROLLOUT</span>
                    <span className="hidden sm:inline text-zinc-400">
                      0 byte data hilang selama seluruh proses migrasi
                    </span>
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* PANEL 03: ARSITEKTUR ENTERPRISE INTELECTA                         */}
              {/* ----------------------------------------------------------------- */}
              {activePanelIndex === 2 && (
                <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-between">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-white/10 pb-8">
                    <div className="lg:col-span-7">
                      <span className="text-xs uppercase tracking-widest text-zinc-400">
                        Standar Intelecta
                      </span>
                      <h3 className="mt-2 font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                        Arsitektur Modern Kelas Dunia
                      </h3>
                      <p className="mt-4 font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                        Ketahanan multi-region aktif dengan SLA ketersediaan 99.99% dan latency sub-milidetik untuk jutaan pengguna simultan.
                      </p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-end lg:items-end">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        Latency Respon P99 Teruji
                      </span>
                      <p className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white mt-1 tracking-tight">
                        &lt; 8.4 <span className="text-2xl text-zinc-400 font-sans">ms</span>
                      </p>
                      <p className="text-xs text-zinc-400 mt-2 text-left lg:text-right max-w-xs">
                        Penurunan latensi sebesar 98.6% dibandingkan arsitektur lama secara konsisten.
                      </p>
                    </div>
                  </div>

                  {/* Superior Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto pt-6">
                    <div className="border-l border-white/25 pl-5">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        Failover Otomatis (DR)
                      </span>
                      <p className="font-serif text-3xl sm:text-4xl text-white mt-1">
                        &lt; 850 ms
                      </p>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Peralihan instan otonom antar zona tanpa campur tangan teknisi manual (RPO = 0).
                      </p>
                    </div>

                    <div className="border-l border-white/25 pl-5">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        Kapasitas Skala Beban
                      </span>
                      <p className="font-serif text-3xl sm:text-4xl text-white mt-1">
                        120,000+ <span className="text-sm font-sans text-zinc-400">req/s</span>
                      </p>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Skalabilitas elastis hingga 1,000+ pod tanpa penurunan stabilitas server.
                      </p>
                    </div>

                    <div className="border-l border-white/25 pl-5">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">
                        Keandalan Bergaransi
                      </span>
                      <p className="font-serif text-3xl sm:text-4xl text-white mt-1">
                        99.99%
                      </p>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Tingkat error produksi ditekan hingga 0.001% dengan kepatuhan penuh standar ISO 27001.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-sans">
                    <span>SLA: 99.99% CONTRACTUAL GUARANTEE</span>
                    <span className="hidden sm:inline text-zinc-400">
                      Terverifikasi pada sistem skala perbankan dan enterprise
                    </span>
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* PANEL 04: MATRIKS DAMPAK BISNIS LENGKAP                           */}
              {/* ----------------------------------------------------------------- */}
              {activePanelIndex === 3 && (
                <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-zinc-400">
                        Hasil Terukur
                      </span>
                      <h3 className="mt-2 font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                        Matriks Dampak Transformasi
                      </h3>
                      <p className="mt-2 font-sans text-sm text-zinc-400">
                        Perbandingan langsung indikator kunci sebelum dan sesudah implementasi arsitektur Intelecta
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const el = document.getElementById("kontak");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-black transition-all hover:bg-zinc-200 shrink-0"
                    >
                      <span>Konsultasi Arsitektur</span>
                      <GlyphArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Clean Editorial Comparison Table */}
                  <div className="my-auto divide-y divide-white/10">
                    {[
                      {
                        param: "Latency Respon (P99)",
                        before: "450 – 1,200 ms",
                        after: "< 8.4 ms",
                        delta: "98.6% Lebih Cepat",
                      },
                      {
                        param: "Disaster Recovery Failover",
                        before: "4 – 8 Jam (Manual)",
                        after: "< 850 ms (Otonom)",
                        delta: "99.9% Reduksi Waktu",
                      },
                      {
                        param: "Throughput Beban Puncak",
                        before: "2,400 req/sec",
                        after: "120,000 req/sec",
                        delta: "50x Lipat Kapasitas",
                      },
                      {
                        param: "Tingkat Error Produksi",
                        before: "4.82% (High Timeout)",
                        after: "0.001% (Sub-ppm)",
                        delta: "Stabilitas Sempurna",
                      },
                      {
                        param: "Siklus Deployment",
                        before: "Bulanan (High Risk)",
                        after: "Harian (Zero Downtime)",
                        delta: "100% CI/CD Otomatis",
                      },
                    ].map((row, idx) => (
                      <div
                        key={row.param}
                        className="py-3.5 grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4 font-sans text-xs sm:text-sm"
                      >
                        <div className="sm:col-span-5 font-medium text-white flex items-center gap-3">
                          <span className="text-zinc-400 font-mono text-xs">0{idx + 1}</span>
                          <span>{row.param}</span>
                        </div>
                        <div className="sm:col-span-3 text-zinc-400">
                          <span className="sm:hidden text-zinc-400 text-xs">Sebelum: </span>
                          {row.before}
                        </div>
                        <div className="sm:col-span-2 text-white font-medium">
                          <span className="sm:hidden text-zinc-400 text-xs">Sesudah: </span>
                          {row.after}
                        </div>
                        <div className="sm:col-span-2 text-right">
                          <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white">
                            {row.delta}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-sans">
                    <span>INTELECTA BENCHMARK STANDARD</span>
                    <span>STANDAR ARSITEKTUR KELAS DUNIA</span>
                  </div>
                </div>
              )}
            </PanelTransition>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM HUD BAR: Minimalist Step Counter & Subtle Progress Indicator       */}
        {/* ========================================================================= */}
        <footer className="relative z-30 w-full px-6 sm:px-12 lg:px-16 py-4 border-t border-white/10 backdrop-blur-md bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-3 font-sans text-xs text-zinc-400">
            <span>Scroll vertikal atau klik tab untuk beralih antar babak</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
              <span className="text-white font-bold">0{activePanelIndex + 1}</span>
              <span className="text-zinc-600">/</span>
              <span>04</span>
            </div>

            {/* Subtle Progress Bar */}
            <div className="w-24 sm:w-36 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${((activePanelIndex + 1) / 4) * 100}%` }}
              />
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};
