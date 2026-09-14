"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { PanelTransition } from "@/components/transitions/PanelTransition";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap-config";

interface PillarItem {
  id: string;
  num: string;
  title: string;
  metric: string;
  metricUnit?: string;
  metricLabel: string;
  lead: string;
  description: string;
  principles: { label: string; detail: string }[];
}

const pillars: PillarItem[] = [
  {
    id: "keandalan",
    num: "01",
    title: "Keandalan Tanpa Kompromi",
    metric: "99.99%",
    metricLabel: "Uptime SLA Bergaransi Kontraktual",
    lead: "Arsitektur otonom zero single-point-of-failure dengan toleransi kegagalan tingkat enterprise.",
    description:
      "Sistem dirancang untuk terus beroperasi tanpa degradasi layanan bahkan saat terjadi lonjakan trafik masif atau pemadaman total pada salah satu zona data center.",
    principles: [
      {
        label: "Multi-Region Active Quorum",
        detail: "Replikasi data sinkron otomatis lintas data center regional dengan konsensus Raft tanpa data loss.",
      },
      {
        label: "Disaster Recovery Sub-Detik",
        detail: "Automated failover tanpa campur tangan teknisi manual dengan RPO < 1 menit dan RTO < 5 detik.",
      },
      {
        label: "Chaos Engineering Rutin",
        detail: "Pengujian simulasi kegagalan berkala untuk memvalidasi ketahanan cluster produksi secara proaktif.",
      },
    ],
  },
  {
    id: "kecepatan",
    num: "02",
    title: "Performa Sub-Milidetik",
    metric: "< 8.4",
    metricUnit: "ms",
    metricLabel: "P99 Latency Response Teruji",
    lead: "Optimalisasi algoritma pada tingkat kernel dan edge network untuk respons instan.",
    description:
      "Setiap pipeline komputasi direkayasa dengan Go dan Rust untuk meminimalkan beban memori dan context switching pada jutaan transaksi simultan.",
    principles: [
      {
        label: "Kernel-Bypass Networking",
        detail: "Meniadakan overhead stack IO tradisional dengan memanfaatkan memory bypass dan eBPF telemetry.",
      },
      {
        label: "Global Edge Caching",
        detail: "Distribusi konten statis dan dinamis pada puluhan titik edge terdekat dari lokasi pengguna.",
      },
      {
        label: "Non-Blocking Async IO",
        detail: "Pemrosesan transaksi konkuren tanpa bottleneck locking database pada jam sibuk operasional.",
      },
    ],
  },
  {
    id: "keamanan",
    num: "03",
    title: "Keamanan Zero Trust",
    metric: "AES-256",
    metricLabel: "Enkripsi Lapis Ganda + Mutual TLS",
    lead: "Prinsip 'Never Trust, Always Verify' di setiap titik transmisi dan penyimpanan data.",
    description:
      "Standarisasi keamanan berstandar perbankan dengan audit trail yang terenkripsi dan verifikasi identitas berkelanjutan pada seluruh microservices.",
    principles: [
      {
        label: "End-to-End Mutual TLS",
        detail: "Enkripsi sertifikat otomatis pada setiap pertukaran paket antar service internal dalam cluster.",
      },
      {
        label: "Identity-Aware Dynamic Vault",
        detail: "Manajemen kredensial dan secret rotasi otomatis tanpa menyimpan kunci statis dalam kode program.",
      },
      {
        label: "Kepatuhan Regulasi Penuh",
        detail: "Audit berkala yang tersertifikasi sesuai standar ISO/IEC 27001 dan kepatuhan UU Perlindungan Data Pribadi.",
      },
    ],
  },
  {
    id: "skalabilitas",
    num: "04",
    title: "Skalabilitas Elastis",
    metric: "1,000+",
    metricUnit: "Pods",
    metricLabel: "Kapasitas Komputasi Otonom",
    lead: "Infrastruktur cloud yang beradaptasi secara otomatis mengikuti kurva volume bisnis.",
    description:
      "Kapasitas beban dapat berlipat ganda dalam hitungan detik tanpa perlu intervensi manual atau perencanaan kapasitas kaku di awal.",
    principles: [
      {
        label: "Predictive Horizontal Autoscaling",
        detail: "Penyesuaian jumlah pod secara presisi dalam < 15 detik sebelum antrean beban memuncak.",
      },
      {
        label: "Distributed Sharding & Partitioning",
        detail: "Pemisahan partisi database terdistribusi untuk menjamin kecepatan query tetap konstan pada dataset masif.",
      },
      {
        label: "Serverless Burst Capacity",
        detail: "Cadangan daya komputasi instan untuk mengamankan lonjakan trafik promosi tanpa batas.",
      },
    ],
  },
];

export const WhyIntelecta: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const logoSvgRef = useRef<SVGSVGElement>(null);
  const outerPathRef = useRef<SVGPolygonElement>(null);
  const midPathRef = useRef<SVGPolygonElement>(null);
  const corePathRef = useRef<SVGPolygonElement>(null);

  // GSAP Materialization Animation for Monumental Right Edge Logo
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !logoSvgRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        outerPathRef.current,
        {
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
          opacity: 0,
          scale: 0.85,
          transformOrigin: "center right",
        },
        {
          strokeDashoffset: 0,
          opacity: 0.6,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        }
      )
        .fromTo(
          midPathRef.current,
          {
            strokeDasharray: 1500,
            strokeDashoffset: 1500,
            opacity: 0,
            scale: 0.7,
            transformOrigin: "center right",
          },
          {
            strokeDashoffset: 0,
            opacity: 0.5,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=1.0"
        )
        .fromTo(
          corePathRef.current,
          {
            scale: 0,
            opacity: 0,
            transformOrigin: "center center",
          },
          {
            scale: 1,
            opacity: 0.8,
            duration: 0.9,
            ease: "elastic.out(1.2, 0.4)",
          },
          "-=0.7"
        );

      // Subtle breathing motion
      gsap.to(logoSvgRef.current, {
        y: -8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePillarChange = (idx: number) => {
    if (idx === activePillar) return;
    setDirection(idx > activePillar ? 1 : -1);
    setActivePillar(idx);
  };

  const currentPillar = pillars[activePillar];

  return (
    <section
      ref={sectionRef}
      id="keunggulan"
      className="relative min-h-screen py-24 sm:py-32 bg-black overflow-hidden border-t border-white/10 flex items-center select-none"
    >
      {/* Monumental Watermark Logo on Right Edge (Solid Strokes, No Gradients) */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 sm:translate-x-1/4 lg:translate-x-1/6 w-[500px] sm:w-[700px] md:w-[850px] lg:w-[1050px] h-[700px] sm:h-[900px] lg:h-[1100px] z-0 opacity-30 select-none">
        <svg
          ref={logoSvgRef}
          viewBox="0 0 1000 1000"
          className="w-full h-full"
          fill="none"
        >
          {/* Outer Rhombus (Solid stroke) */}
          <polygon
            ref={outerPathRef}
            points="500,50 950,500 500,950 50,500"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="22"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
          />

          {/* Hairline Contour */}
          <polygon
            points="500,18 982,500 500,982 18,500"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
            strokeDasharray="16 12"
          />

          {/* Mid Rhombus (Solid stroke) */}
          <polygon
            ref={midPathRef}
            points="500,200 800,500 500,800 200,500"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="14"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
          />

          {/* Core Rhombus */}
          <polygon
            ref={corePathRef}
            points="500,350 650,500 500,650 350,500"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="4"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 w-full relative z-10">

        {/* Minimalist Tactile Pillar Switcher Tabs (Sharp Boxes) */}
        <div className="mt-8 flex flex-wrap gap-2">
          {pillars.map((pillar, idx) => {
            const isActive = activePillar === idx;
            return (
              <button
                key={pillar.id}
                onClick={() => handlePillarChange(idx)}
                className={cn(
                  "relative px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors border flex items-center gap-2.5",
                  isActive
                    ? "bg-white text-black font-bold border-white"
                    : "bg-[#08080a] border-white/15 text-zinc-400 hover:border-white/30 hover:text-white"
                )}
              >
                <span className={cn("corner-tl !w-1 !h-1", isActive ? "!border-black" : "")} />
                <span className={cn("corner-tr !w-1 !h-1", isActive ? "!border-black" : "")} />
                <span className={cn("corner-bl !w-1 !h-1", isActive ? "!border-black" : "")} />
                <span className={cn("corner-br !w-1 !h-1", isActive ? "!border-black" : "")} />

                <span className={cn("text-[10px] font-mono", isActive ? "text-zinc-700" : "text-zinc-500")}>
                  {pillar.num}
                </span>
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* CENTER STAGE: STRIP REVEAL PANEL TRANSITION (Sharp Box Container)         */}
        {/* ========================================================================= */}
        <div className="relative mt-8 min-h-[440px] sm:min-h-[400px] w-full overflow-hidden border border-white/20 bg-[#070709] p-8 sm:p-12">
          <span className="corner-tl" />
          <span className="corner-tr" />
          <span className="corner-bl" />
          <span className="corner-br" />

          <AnimatePresence mode="popLayout" custom={direction}>
            <PanelTransition
              key={currentPillar.id}
              activeKey={currentPillar.id}
              variant="strip"
              direction={direction}
              className="p-0 relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start h-full">
                {/* Left Editorial Narrative (7 Columns) */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                      PILAR 0{activePillar + 1}
                    </span>
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white">
                      {currentPillar.title}
                    </h3>
                    <p className="mt-3 font-sans text-base text-zinc-300 font-medium leading-relaxed">
                      {currentPillar.lead}
                    </p>
                    <p className="mt-2 font-sans text-sm text-zinc-400 leading-relaxed">
                      {currentPillar.description}
                    </p>
                  </div>

                  {/* Core Architectural Principles List */}
                  <div className="mt-8 space-y-4 pt-6 border-t border-white/10">
                    {currentPillar.principles.map((pr, i) => (
                      <div key={pr.label} className="flex items-start gap-3">
                        <span className="font-mono text-xs text-zinc-500 font-bold shrink-0 mt-0.5">
                          0{i + 1}
                        </span>
                        <div>
                          <h4 className="font-sans text-xs sm:text-sm font-semibold text-white">
                            {pr.label}
                          </h4>
                          <p className="font-sans text-xs text-zinc-400 mt-0.5 leading-relaxed">
                            {pr.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Monumental KPI Display (5 Columns) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full lg:border-l lg:border-white/10 lg:pl-10">
                  <div className="relative p-6 bg-[#0a0a0d] border border-white/15">
                    <span className="corner-tl !w-1 !h-1" />
                    <span className="corner-tr !w-1 !h-1" />
                    <span className="corner-bl !w-1 !h-1" />
                    <span className="corner-br !w-1 !h-1" />

                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                      Tolok Ukur Kinerja Utama
                    </span>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight">
                        {currentPillar.metric}
                      </span>
                      {currentPillar.metricUnit && (
                        <span className="font-mono text-xl text-zinc-400 font-normal">
                          {currentPillar.metricUnit}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-mono text-xs text-zinc-300">
                      {currentPillar.metricLabel}
                    </p>
                  </div>

                  {/* Architectural Standards Footnote */}
                  <div className="mt-8 pt-6 border-t border-white/10 text-xs font-mono text-zinc-400 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>STANDAR IMPLEMENTASI</span>
                      <span className="text-white font-bold">ENTERPRISE GRADE</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-zinc-400 font-sans">
                      Setiap parameter diuji melalui automated benchmarking dan monitoring real-time sebelum deployment produksi.
                    </p>
                  </div>
                </div>
              </div>
            </PanelTransition>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
