"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface CurtainSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  zIndex?: number;
  enablePin?: boolean;
  sectionIndex?: string; // e.g. "02"
  sectionLabel?: string; // e.g. "SHOWCASE & LAB"
}

export const CurtainSection: React.FC<CurtainSectionProps> = ({
  id,
  className,
  children,
  zIndex = 10,
  enablePin = false,
  sectionIndex,
  sectionLabel,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  // Sections below Hero (zIndex > 10) have the architectural top axis divider
  const hasAxisDivider = zIndex > 10;

  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    const ctx = gsap.context(() => {
      // ---------------------------------------------------------------------
      // 1. Specia1ne Architectural Axis Hairline & Node Reveal
      // ---------------------------------------------------------------------
      if (hasAxisDivider && hairlineRef.current && nodeRef.current) {
        gsap.fromTo(
          hairlineRef.current,
          { scaleX: 0.4, opacity: 0.2 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 30%",
              scrub: 0.6,
            },
          }
        );

        gsap.fromTo(
          nodeRef.current,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 40%",
              scrub: 0.6,
            },
          }
        );
      }

      // ---------------------------------------------------------------------
      // 2. Fullscreen Pinning Stacking (Specia1ne Sticky Layer Architecture)
      // ---------------------------------------------------------------------
      if (enablePin && typeof window !== "undefined" && window.innerWidth >= 768) {
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      }

      // ---------------------------------------------------------------------
      // 3. Content Precision Reveal
      // ---------------------------------------------------------------------
      gsap.fromTo(
        content,
        { y: 40, opacity: 0.85 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [hasAxisDivider, enablePin]);

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{ zIndex }}
      className={cn(
        "relative w-full min-h-screen bg-[#000000] overflow-visible",
        className
      )}
    >
      {/* ===================================================================== */}
      {/* SPECIA1NE ARCHITECTURAL AXIS DIVIDER & BRACKET NODE                   */}
      {/* ===================================================================== */}
      {hasAxisDivider && (
        <div className="absolute top-0 left-0 right-0 w-full z-40 pointer-events-none select-none">
          {/* Razor-sharp horizontal hairline border */}
          <div
            ref={hairlineRef}
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_12px_rgba(255,255,255,0.15)] origin-center will-change-transform"
          />

          {/* Specia1ne-style Precision Axis Line Node [ • XX / LABEL ] */}
          <div
            ref={nodeRef}
            className="absolute -top-[13px] left-6 sm:left-12 lg:left-24 flex items-center gap-2 will-change-transform"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none bg-black/95 border border-white/20 backdrop-blur-md font-mono text-[10px] tracking-wider uppercase text-zinc-300 shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              <span className="text-zinc-500 font-sans">[</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-pulse" />
              <span className="text-white font-bold">{sectionIndex || "02"}</span>
              {sectionLabel && (
                <>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-400 font-sans tracking-normal lowercase">{sectionLabel}</span>
                </>
              )}
              <span className="text-zinc-500 font-sans">]</span>
            </div>
          </div>
        </div>
      )}

      {/* Section Content Container */}
      <div ref={contentRef} className="relative w-full h-full will-change-transform">
        {children}
      </div>
    </section>
  );
};
