"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/hero/HeroSection";
import { ServicesMatrix } from "@/components/services/ServicesMatrix";
import { CurtainSection } from "@/components/transitions/CurtainSection";
import { gsap } from "@/lib/gsap-config";

// Code splitting: Dynamically import heavy WebGL & complex below-the-fold components
const Lab3DSection = dynamic(
  () => import("@/components/three/Lab3DSection").then((mod) => mod.Lab3DSection),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[650px] bg-black flex items-center justify-center font-mono text-xs text-zinc-600">
        MEMUAT MODUL 3D...
      </div>
    ),
  }
);

const BeforeAfterCompare = dynamic(
  () => import("@/components/compare/BeforeAfterCompare").then((mod) => mod.BeforeAfterCompare),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#020204] flex items-center justify-center font-mono text-xs text-zinc-600">
        MEMUAT MATRIKS TRANSFORMASI...
      </div>
    ),
  }
);

const WhyIntelecta = dynamic(
  () => import("@/components/why-intelecta/WhyIntelecta").then((mod) => mod.WhyIntelecta),
  { ssr: false }
);

const TeamSection = dynamic(
  () => import("@/components/team/TeamSection").then((mod) => mod.TeamSection),
  { ssr: false }
);

const ContactSection = dynamic(
  () => import("@/components/contact/ContactSection").then((mod) => mod.ContactSection),
  { ssr: false }
);

const CalendlyModal = dynamic(
  () => import("@/components/ui/CalendlyModal").then((mod) => mod.CalendlyModal),
  { ssr: false }
);

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Continuous Axis Line Tracker animation across main page
    const ctx = gsap.context(() => {
      const axisLine = document.querySelector(".global-axis-line");
      if (axisLine) {
        gsap.fromTo(
          axisLine,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: mainRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      {/* Global Vertical Axis Tracker Line */}
      <div className="pointer-events-none fixed left-8 sm:left-12 top-0 bottom-0 z-10 w-[1px] bg-white/10 hidden xl:block">
        <div className="global-axis-line w-full h-full bg-white/40" />
      </div>

      <CurtainSection id="beranda-curtain">
        <HeroSection onOpenConsultation={() => setIsConsultationOpen(true)} />
      </CurtainSection>

      <CurtainSection id="showcase-3d-curtain">
        <Lab3DSection />
      </CurtainSection>

      <CurtainSection id="layanan-curtain">
        <ServicesMatrix />
      </CurtainSection>

      <section id="transformasi-section" className="relative w-full">
        <BeforeAfterCompare />
      </section>

      <CurtainSection id="keunggulan-curtain">
        <WhyIntelecta />
      </CurtainSection>

      <CurtainSection id="tim-curtain">
        <TeamSection />
      </CurtainSection>

      <CurtainSection id="kontak-curtain">
        <ContactSection />
      </CurtainSection>

      {/* Calendly Consultation Modal */}
      <CalendlyModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}
