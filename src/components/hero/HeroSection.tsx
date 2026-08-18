"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles, Shield, Cpu } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";

const DynamicDiamondScene = dynamic(
  () => import("./DiamondScene").then((mod) => mod.DiamondScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] items-center justify-center">
        <div className="relative h-48 w-48 animate-pulse-slow">
          <Image
            src="/images/logo-icon.svg"
            alt="Intelecta 3D Loading"
            fill
            className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          />
        </div>
      </div>
    ),
  }
);

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 pb-20 grid-pattern"
    >
      {/* Radial Top Glow Spotlight */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[550px] w-[800px] -translate-y-1/3 rounded-full bg-radial from-white/10 via-white/2 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Text Content */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
              <span className="font-mono text-xs tracking-wider text-zinc-300">
                ARSITEKTUR IT & AI ENTERPRISE INDONESIA
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]"
            >
              Membangun Solusi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                Kecerdasan & Infrastruktur
              </span>{" "}
              Masa Depan.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg lg:max-w-xl"
            >
              Intelecta mengakselerasi transformasi digital enterprise melalui rekayasa
              Artificial Intelligence mutakhir, modernisasi Cloud berkeandalan 99.99%,
              dan sistem pertahanan siber Zero Trust tanpa kompromi.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <MagneticButton
                variant="primary"
                onClick={() => {
                  const el = document.getElementById("layanan");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Jelajahi Solusi</span>
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation();
                  } else {
                    const el = document.getElementById("kontak");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Calendar className="h-4 w-4 text-zinc-400" />
                <span>Jadwalkan Konsultasi</span>
              </MagneticButton>
            </motion.div>

            {/* Quick Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/5 pt-8 text-xs text-zinc-400 lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-white" />
                <span>AI Engineering Enterprise</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-white" />
                <span>Zero Trust ISO 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>SLA Uptime 99.99%</span>
              </div>
            </motion.div>
          </div>

          {/* 3D Visual Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center lg:col-span-5"
          >
            <DynamicDiamondScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
