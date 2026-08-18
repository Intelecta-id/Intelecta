"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, Briefcase, Sparkles, UserCheck } from "lucide-react";
import { teamData } from "@/data/team";
import { cn } from "@/lib/utils";

export default function TeamListPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const departments = ["All", "AI & Distributed Systems", "Cloud & Reliability Engineering", "Cybersecurity & Governance", "Experience Engineering"];

  const filteredTeam =
    selectedDept === "All"
      ? teamData
      : teamData.filter((member) => member.department === selectedDept);

  return (
    <div className="min-h-screen bg-[#030303] pt-32 pb-24 grid-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              DEWAN ARSITEK & PAKAR TEKNOLOGI
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Para Spesialis di Balik Intelecta
          </h1>

          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Tim insinyur kelas dunia, peneliti AI doktoral, dan arsitek infrastruktur
            berdedikasi untuk menciptakan keunggulan sistem digital enterprise Anda.
          </p>
        </div>

        {/* Department Filter Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-mono tracking-wide transition-all duration-200",
                selectedDept === dept
                  ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
              )}
            >
              {dept === "All" ? "Semua Divisi" : dept}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {filteredTeam.map((member, index) => (
            <motion.div
              key={member.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/tim/${member.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D11]/90 p-8 transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]"
              >
                <div>
                  {/* Top Bar: Avatar & Department */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-zinc-800 to-black font-display text-xl font-black text-white shadow-inner transition-transform duration-300 group-hover:scale-105">
                      {member.avatarPlaceholder}
                    </div>

                    <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-zinc-400 border border-white/5">
                      {member.yearsOfExp}+ Tahun Pengalaman
                    </span>
                  </div>

                  {/* Name & Role */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-zinc-200">
                        {member.name}
                      </h2>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all duration-200 group-hover:bg-white group-hover:text-black">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>

                    <p className="mt-1 font-mono text-xs text-zinc-400">
                      {member.role}
                    </p>
                  </div>

                  {/* Tagline */}
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    &ldquo;{member.tagline}&rdquo;
                  </p>

                  {/* Skills Snapshot */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {member.skills[0]?.items.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{member.featuredProjectsCount} Proyek Selesai</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{member.certifications.length} Sertifikasi Utama</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
