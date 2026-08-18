"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle, TrendingUp, Sparkles, Building } from "lucide-react";
import { caseStudiesData, CaseStudyItem } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

export const CaseStudies: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState<string>(caseStudiesData[0].id);

  const activeCase = caseStudiesData.find((c) => c.id === activeCaseId) || caseStudiesData[0];

  return (
    <section id="studi-kasus" className="relative py-28 bg-[#08080A] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                STUDI KASUS & SHOWCASE
              </span>
            </div>

            <h2 className="mt-6 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Dampak Terukur pada Industri Strategis
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-400">
            Kisah sukses bagaimana Intelecta membantu institusi perbankan, logistik nasional,
            dan telekomunikasi mencapai lompatan efisiensi dan keamanan.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {caseStudiesData.map((item) => {
            const isActive = item.id === activeCaseId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveCaseId(item.id)}
                className={cn(
                  "relative rounded-xl px-5 py-3 text-left transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
              >
                <div className="flex items-center gap-2">
                  <Building className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="text-xs font-mono uppercase tracking-wider">
                    {item.clientIndustry}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold truncate max-w-[240px]">
                  {item.title}
                </p>

                {isActive && (
                  <motion.div
                    layoutId="activeCaseTab"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-white shadow-[0_0_10px_#fff]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Case Study Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-8 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#121217] to-[#0D0D11] p-8 sm:p-12 backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Story */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white">
                    {activeCase.year}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    {activeCase.clientIndustry}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                  {activeCase.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  {activeCase.summary}
                </p>

                <div className="mt-8 space-y-4 rounded-2xl border border-white/5 bg-black/40 p-6">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-red-400">
                      Tantangan
                    </h4>
                    <p className="mt-1 text-sm text-zinc-400">
                      {activeCase.challenge}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                      Solusi Intelecta
                    </h4>
                    <p className="mt-1 text-sm text-zinc-400">
                      {activeCase.solution}
                    </p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-zinc-500 font-mono">Stack:</span>
                  {activeCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Key Impact Results */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-8 lg:col-span-5">
                <div>
                  <div className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                    <h4 className="font-display text-lg font-bold">
                      Metrik Keberhasilan
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    Hasil nyata yang diverifikasi pasca implementasi produksi
                  </p>

                  <div className="mt-8 space-y-6">
                    {activeCase.results.map((res) => (
                      <div key={res.label} className="border-b border-white/5 pb-4 last:border-0">
                        <span className="font-display text-3xl font-extrabold text-white">
                          {res.value}
                        </span>
                        <p className="mt-1 text-xs font-mono text-zinc-400">
                          {res.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Status Implementasi</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <CheckCircle className="h-3.5 w-3.5" /> Produksi Aktif
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
