"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/hero/HeroSection";
import { ServicesMatrix } from "@/components/services/ServicesMatrix";
import { CurtainSection } from "@/components/transitions/CurtainSection";
import { FloatingBottomDock } from "@/components/layout/FloatingBottomDock";
import { CommandMenuModal } from "@/components/ui/CommandMenuModal";

// Code splitting for Below-The-Fold complex components
const BeforeAfterCompare = dynamic(
  () => import("@/components/compare/BeforeAfterCompare").then((mod) => mod.BeforeAfterCompare),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#020204] flex items-center justify-center font-mono text-xs text-zinc-600">
        MEMUAT MATRIKS TRANSFORMASI SEBELUM / SESUDAH...
      </div>
    ),
  }
);

const TeamSection = dynamic(
  () => import("@/components/team/TeamSection").then((mod) => mod.TeamSection),
  { ssr: false }
);

const CalendlyModal = dynamic(
  () => import("@/components/ui/CalendlyModal").then((mod) => mod.CalendlyModal),
  { ssr: false }
);

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Global shortcut Ctrl+K / Cmd+K listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main ref={mainRef} className="relative min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      {/* 1. LANDING PAGE & 3D PROCEDURAL CENTERPIECE */}
      <CurtainSection id="beranda-curtain">
        <HeroSection onOpenConsultation={() => setIsConsultationOpen(true)} />
      </CurtainSection>

      {/* 2. SERVICES / LAYANAN */}
      <CurtainSection id="layanan-curtain">
        <ServicesMatrix />
      </CurtainSection>

      {/* 3. BEFORE / AFTER TRANSFORMATION MATRIX */}
      <section id="transformasi-section" className="relative w-full">
        <BeforeAfterCompare />
      </section>

      {/* 4. TIM INTELECTA */}
      <CurtainSection id="tim-curtain">
        <TeamSection />
      </CurtainSection>

      {/* 5. BOTTOM BAR (FLOATING DOCK & COMMAND MATRIX) */}
      <FloatingBottomDock
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Command Menu Modal (Ctrl + K) */}
      <CommandMenuModal
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Calendly Consultation Modal */}
      <CalendlyModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}
