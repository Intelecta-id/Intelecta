"use client";

import React, { useRef, useEffect, useId } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface CurtainSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  zIndex?: number;
  enablePin?: boolean;
  hasSvgMorph?: boolean;
}

export const CurtainSection: React.FC<CurtainSectionProps> = ({
  id,
  className,
  children,
  zIndex = 10,
  enablePin = false,
  hasSvgMorph = true,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const primaryPathRef = useRef<SVGPathElement>(null);
  const primaryStrokeRef = useRef<SVGPathElement>(null);
  const secondaryPathRef = useRef<SVGPathElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const gradId = `morph-grad-${id || rawId.replace(/:/g, "")}`;

  // Only apply morph for sections below Hero (i.e. zIndex > 10)
  const shouldMorph = hasSvgMorph && zIndex > 10;

  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    const ctx = gsap.context(() => {
      // ---------------------------------------------------------------------
      // 1. GSAP SVG Multi-Segment Morphing ScrollTrigger
      // ---------------------------------------------------------------------
      if (shouldMorph && primaryPathRef.current) {
        const morphObj = { progress: 0 };

        gsap.to(morphObj, {
          progress: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 10%",
            scrub: 0.8,
            onUpdate: () => {
              const p = morphObj.progress; // 0 (start below) to 1 (at top)
              // Sine envelope: 0 at entry, 1 at peak morph (middle), 0 at settle
              const factor = Math.sin(p * Math.PI);

              // 4-segment bezier crests and troughs (Height 200)
              const y1 = 200 - factor * 160; // Left peak
              const y2 = 200 - factor * 70;  // Trough
              const y3 = 200 - factor * 130; // Mid dip
              const y4 = 200 - factor * 195; // Towering center peak
              const y5 = 200 - factor * 85;  // Right trough
              const y6 = 200 - factor * 155; // Right peak
              const y7 = 200 - factor * 175; // Right taper

              const pathData = `M 0 200 C 180 ${y1}, 360 ${y2}, 540 ${y3} C 720 ${y4}, 900 ${y5}, 1080 ${y6} C 1260 ${y7}, 1380 ${y7}, 1440 200 L 1440 200 L 0 200 Z`;
              const strokeData = `M 0 200 C 180 ${y1}, 360 ${y2}, 540 ${y3} C 720 ${y4}, 900 ${y5}, 1080 ${y6} C 1260 ${y7}, 1380 ${y7}, 1440 200`;

              if (primaryPathRef.current) {
                primaryPathRef.current.setAttribute("d", pathData);
              }
              if (primaryStrokeRef.current) {
                primaryStrokeRef.current.setAttribute("d", strokeData);
              }

              // Secondary Echo Wave (Multi-segment fluid offset)
              if (secondaryPathRef.current) {
                const ey1 = 200 - factor * 110;
                const ey2 = 200 - factor * 150;
                const ey3 = 200 - factor * 90;
                const ey4 = 200 - factor * 160;
                const ey5 = 200 - factor * 120;
                const ey6 = 200 - factor * 105;
                const ey7 = 200 - factor * 135;

                secondaryPathRef.current.setAttribute(
                  "d",
                  `M 0 200 C 180 ${ey1}, 360 ${ey2}, 540 ${ey3} C 720 ${ey4}, 900 ${ey5}, 1080 ${ey6} C 1260 ${ey7}, 1380 ${ey7}, 1440 200 L 1440 200 L 0 200 Z`
                );
              }

              // Center floating diamond indicator
              if (diamondRef.current) {
                const peakY = (y4 / 200) * 160 - 160;
                gsap.set(diamondRef.current, {
                  y: peakY,
                  opacity: factor > 0.1 ? 1 : 0,
                  scale: 0.6 + factor * 0.4,
                });
              }
            },
          },
        });
      }

      // ---------------------------------------------------------------------
      // 2. Optional Section Pinning & Content Stagger
      // ---------------------------------------------------------------------
      if (enablePin && typeof window !== "undefined" && window.innerWidth >= 768) {
        const pinTrigger = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });

        return () => {
          pinTrigger.kill();
        };
      }

      // Content reveal synchronization
      gsap.fromTo(
        content,
        { y: 50, opacity: 0.8 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 30%",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldMorph, enablePin]);

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{ zIndex }}
      className={cn("relative w-full min-h-screen bg-[#000000] overflow-visible", className)}
    >
      {/* ===================================================================== */}
      {/* DYNAMIC GSAP SVG MULTI-SEGMENT MORPHING BOUNDARY                      */}
      {/* ===================================================================== */}
      {shouldMorph && (
        <div className="pointer-events-none absolute -top-[120px] sm:-top-[160px] left-0 right-0 w-full h-[120px] sm:h-[160px] overflow-visible z-40 select-none">
          <svg
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            className="w-full h-full filter drop-shadow-[0_-20px_40px_rgba(255,255,255,0.08)]"
          >
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
                <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Layer 1: Translucent Secondary Fluid Echo Path */}
            <path
              ref={secondaryPathRef}
              d="M 0 200 Q 720 200 1440 200 L 1440 200 L 0 200 Z"
              fill="rgba(255, 255, 255, 0.03)"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />

            {/* Layer 2: Primary Solid Black Morphing Segment Wave */}
            <path
              ref={primaryPathRef}
              d="M 0 200 Q 720 200 1440 200 L 1440 200 L 0 200 Z"
              fill="#000000"
            />

            {/* Layer 3: Glowing Luminous Multi-Segment SVG Stroke */}
            <path
              ref={primaryStrokeRef}
              d="M 0 200 Q 720 200 1440 200"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="2.5"
            />
          </svg>

          {/* Floating Diamond Accent on Center Wave Peak */}
          <div
            ref={diamondRef}
            className="absolute left-1/2 -translate-x-1/2 top-[160px] h-3 w-3 rotate-45 border border-white bg-white shadow-[0_0_12px_#ffffff] transition-opacity duration-150 pointer-events-none"
          />
        </div>
      )}

      {/* Section Content Container */}
      <div ref={contentRef} className="relative w-full h-full will-change-transform">
        {children}
      </div>
    </section>
  );
};
