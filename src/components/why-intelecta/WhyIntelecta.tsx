"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap, Server, Maximize2, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pillars = [
  {
    id: "keandalan",
    num: "01",
    title: "Keandalan Ekstrem (High Reliability)",
    short: "Uptime 99.99%",
    icon: Server,
    description:
      "Arsitektur zero single-point-of-failure dengan auto-failover antar zona dan region. Sistem dirancang untuk terus berjalan tanpa henti meski terjadi gangguan jaringan pada skala nasional.",
    points: [
      "Multi-Region Active-Active Topology",
      "Automated Health Probes & Chaos Engineering",
      "Disaster Recovery RPO < 1 menit & RTO < 5 menit",
    ],
    visualCode: `// Multi-Region Failover Controller
const cluster = new DistributedCluster({
  regions: ["ap-southeast-1", "ap-southeast-3"],
  replication: "synchronous-quorum",
  failoverLatency: "< 850ms",
  healthState: "OPTIMAL_ACTIVE"
});`,
  },
  {
    id: "kecepatan",
    num: "02",
    title: "Kecepatan & Performa Sub-Milidetik",
    short: "Sub-10ms P99",
    icon: Zap,
    description:
      "Pengoptimalan algoritma pada tingkat kernel dan edge network. Setiap baris kode ditulis dengan efisiensi memori tingkat tinggi untuk menangani lonjakan jutaan data secara instan.",
    points: [
      "High-Performance Go & Rust Microservices",
      "Global Edge Caching & Kernel-Bypass Networking",
      "Query Optimization & Non-Blocking Async IO",
    ],
    visualCode: `// High-Throughput Event Ingestion
func HandleEventStream(ctx context.Context, stream <-chan Event) {
  workerPool := runtime.NumCPU() * 4
  parallelDispatch(stream, workerPool, func(e Event) {
    p99Latency := recordMetric(e) // 4.2ms avg
  })
}`,
  },
  {
    id: "keamanan",
    num: "03",
    title: "Keamanan Tanpa Kepercayaan (Zero Trust)",
    short: "Zero Trust Architecture",
    icon: ShieldCheck,
    description:
      "Pendekatan 'Never Trust, Always Verify' di setiap layer transmisi data. Enkripsi AES-256 dan protokol identitas terpusat memastikan integritas data dari ancaman internal maupun eksternal.",
    points: [
      "Mutual TLS (mTLS) pada Seluruh Komunikasi Internal",
      "Identity-Aware Access Proxy & Dynamic Secrets Vault",
      "Kepatuhan Penuh ISO 27001 & Regulasi UU PDP",
    ],
    visualCode: `// Zero Trust Policy Enforcement
policy := SecurityPolicy{
  mTLSRequired: true,
  cipherSuite: "TLS_AES_256_GCM_SHA384",
  accessEvaluation: ContinuousIdentityVerification,
  auditLogging: "Immutable-Signed-Ledger"
}`,
  },
  {
    id: "skalabilitas",
    num: "04",
    title: "Skalabilitas Elastis & Tanpa Batas",
    short: "Elastic Scalability",
    icon: Maximize2,
    description:
      "Infrastruktur modern yang secara otonom beradaptasi dengan fluktuasi beban pengguna. Tidak ada batasan kapasitas ketika bisnis Anda tumbuh 10x hingga 100x lipat.",
    points: [
      "Horizontal Pod Autoscaling berbasis Metrik Custom",
      "Distributed Partitioning & Sharding Database",
      "Serverless Burst Capacity Handling",
    ],
    visualCode: `// Elastic Auto-Scaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: intelecta-core-engine
spec:
  minReplicas: 10
  maxReplicas: 1000
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          averageUtilization: 60`,
  },
];

export const WhyIntelecta: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section id="keunggulan" className="relative py-28 bg-[#030303]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              MENGAPA MEMILIH INTELECTA
            </span>
          </div>

          <h2 className="mt-6 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            4 Pilar Fundamental Arsitektur Intelecta
          </h2>

          <p className="mt-4 text-base text-zinc-400">
            Filosofi rekayasa yang kami terapkan untuk memastikan setiap sistem yang kami bangun
            siap menghadapi tuntutan operasional paling berat.
          </p>
        </div>

        {/* Pillars Navigation & Content */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Vertical Step List */}
          <div className="space-y-3 lg:col-span-5">
            {pillars.map((pillar, idx) => {
              const isActive = activePillar === idx;
              const Icon = pillar.icon;

              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={cn(
                    "w-full text-left rounded-2xl p-6 transition-all duration-300 border",
                    isActive
                      ? "bg-surface border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.06)]"
                      : "bg-surface/30 border-white/5 hover:border-white/10 hover:bg-surface/60"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-zinc-500">
                        {pillar.num}
                      </span>
                      <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-zinc-500")} />
                      <h3 className={cn("text-base font-bold", isActive ? "text-white" : "text-zinc-400")}>
                        {pillar.title}
                      </h3>
                    </div>

                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
                      {pillar.short}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Pillar Detailed Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={pillars[activePillar].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col justify-between rounded-3xl border border-white/15 bg-surface/90 p-8 sm:p-10 backdrop-blur-xl h-full"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                      <span className="font-mono text-xs text-zinc-400">
                        PILAR ARSITEKTUR {pillars[activePillar].num}
                      </span>
                      <h3 className="mt-1 font-display text-2xl font-bold text-white">
                        {pillars[activePillar].title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-relaxed text-zinc-300">
                    {pillars[activePillar].description}
                  </p>

                  <div className="mt-6 space-y-3">
                    {pillars[activePillar].points.map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm text-zinc-300">
                        <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Terminal Snippet */}
                <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/60 font-mono text-xs text-zinc-300 shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2 text-[11px] text-zinc-500">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-zinc-600" />
                      architecture-spec.ts
                    </span>
                    <span>ACTIVE CONFIG</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed text-zinc-300">
                    <code>{pillars[activePillar].visualCode}</code>
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
