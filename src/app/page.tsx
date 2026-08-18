"use client";

import React, { useState } from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { MetricsMarquee } from "@/components/metrics/MetricsMarquee";
import { ServicesBento } from "@/components/services/ServicesBento";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import { WhyIntelecta } from "@/components/why-intelecta/WhyIntelecta";
import { ContactSection } from "@/components/contact/ContactSection";
import { CalendlyModal } from "@/components/ui/CalendlyModal";

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section with 3D Diamond */}
      <HeroSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Stats Counter & Client Infinite Marquee */}
      <MetricsMarquee />

      {/* Core Services Bento Grid with Spotlight Follower */}
      <ServicesBento />

      {/* Case Studies / Showcase */}
      <CaseStudies />

      {/* 4 Architectural Pillars Scrollytelling */}
      <WhyIntelecta />

      {/* Contact Section & Interactive Linux Terminal */}
      <ContactSection />

      {/* Calendly Consultation Modal */}
      <CalendlyModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}
