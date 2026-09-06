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
}

export const CurtainSection: React.FC<CurtainSectionProps> = ({
  id,
  className,
  children,
  zIndex = 10,
  enablePin = true,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content || !enablePin) return;

    // Pinning curtain on desktop viewports
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      const ctx = gsap.context(() => {
        // Pin this section at viewport top so the next section with higher z-index sweeps over it
        const pinTrigger = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });

        // Cinematic receding effect when being covered by incoming curtain
        gsap.to(content, {
          scale: 0.94,
          opacity: 0.35,
          filter: "blur(6px)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        return () => {
          pinTrigger.kill();
        };
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [enablePin]);

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{ zIndex }}
      className={cn(
        "relative w-full min-h-screen bg-[#000000] overflow-hidden shadow-[0_-25px_60px_rgba(0,0,0,0.95)] border-t border-white/10",
        className
      )}
    >
      <div ref={contentRef} className="relative w-full h-full will-change-transform">
        {children}
      </div>
    </section>
  );
};
