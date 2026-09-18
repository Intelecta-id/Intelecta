"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GlyphArrowUpRight,
  GlyphAward,
  GlyphBriefcase,
  GlyphShield,
} from "@/components/ui/TechnicalGlyphs";
import { teamData } from "@/data/team";
import { cn } from "@/lib/utils";

export const TeamSection: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const departments = [
    "All",
    "AI & Distributed Systems",
    "Cloud & Reliability Engineering",
    "Cybersecurity & Governance",
    "Experience Engineering",
  ];

  const filteredTeam =
    selectedDept === "All"
      ? teamData
      : teamData.filter((member) => member.department === selectedDept);

  return (
    <section
      id="tim"
      className="relative min-h-screen py-24 sm:py-32 bg-[#040407] border-t border-white/10 flex flex-col justify-center select-none"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 w-full">
        {/* Section Header */}
        <div className="relative border-b border-white/10 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-zinc-300">
                <span className="h-1.5 w-1.5 bg-white" />
                <span>TIM INTELECTA // REKAYASA SISTEM</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                Para Spesialis di Balik Intelecta
              </h2>
            </div>
            <div className="max-w-md">
              <p className="font-sans text-sm leading-relaxed text-zinc-400 sm:text-base">
                Insinyur sistem terdistribusi, peneliti AI, dan praktisi pertahanan siber berdedikasi untuk menciptakan keunggulan teknologi organisasi Anda.
              </p>
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-white/5">
            {departments.map((dept) => {
              const isActive = selectedDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={cn(
                    "relative px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-150 border",
                    isActive
                      ? "bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                      : "border-white/15 bg-[#08080b] text-zinc-400 hover:border-white/30 hover:text-white"
                  )}
                >
                  <span className={cn("corner-tl !w-1 !h-1", isActive ? "!border-black" : "")} />
                  <span className={cn("corner-tr !w-1 !h-1", isActive ? "!border-black" : "")} />
                  <span className={cn("corner-bl !w-1 !h-1", isActive ? "!border-black" : "")} />
                  <span className={cn("corner-br !w-1 !h-1", isActive ? "!border-black" : "")} />
                  <span>{dept === "All" ? "Semua Divisi" : dept}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredTeam.map((member) => (
              <motion.div
                key={member.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Link
                  href={`/tim/${member.slug}`}
                  className="group relative flex flex-col justify-between h-full border border-white/15 bg-[#08080c] p-7 sm:p-8 transition-all duration-200 hover:border-white/35 hover:bg-[#0c0c12] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
                >
                  {/* Technical Crosshairs */}
                  <span className="corner-tl" />
                  <span className="corner-tr" />
                  <span className="corner-bl" />
                  <span className="corner-br" />

                  <div>
                    {/* Top Bar: Avatar & Experience */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center border border-white/20 bg-[#121218] font-display text-base font-black text-white">
                        {member.avatarPlaceholder}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-400">
                          {member.yearsOfExp}+ TAHUN PENGALAMAN
                        </span>
                      </div>
                    </div>

                    {/* Member Name & Role */}
                    <div className="mt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                            {member.department}
                          </span>
                          <h3 className="mt-1 font-display text-lg sm:text-xl font-bold uppercase text-white transition-colors group-hover:text-zinc-200">
                            {member.name}
                          </h3>
                        </div>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/15 bg-black text-zinc-400 transition-all duration-200 group-hover:bg-white group-hover:text-black group-hover:border-white">
                          <GlyphArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>

                      <p className="mt-1 font-mono text-xs text-zinc-400">
                        {member.role}
                      </p>
                    </div>

                    {/* Tagline */}
                    <p className="mt-4 font-sans text-xs sm:text-sm leading-relaxed text-zinc-300 border-l-2 border-white/20 pl-3">
                      &ldquo;{member.tagline}&rdquo;
                    </p>

                    {/* Core Skills Snapshot */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {member.skills[0]?.items.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <GlyphBriefcase className="h-3.5 w-3.5 text-zinc-500" />
                      <span>{member.featuredProjectsCount} Proyek Selesai</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GlyphAward className="h-3.5 w-3.5 text-zinc-500" />
                      <span>{member.certifications.length} Sertifikasi</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
