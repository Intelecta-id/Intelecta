"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface CurtainSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const CurtainSection: React.FC<CurtainSectionProps> = ({
  id,
  className,
  children,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    // Skip animations on mobile for performance
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // -----------------------------------------------------------------
      // ENTER ANIMATION: Content fades in + translates up as section
      // scrolls into view from the bottom of the viewport
      // -----------------------------------------------------------------
      gsap.fromTo(
        content,
        {
          y: isMobile ? 30 : 80,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 25%",
            scrub: 0.8,
          },
        }
      );

      // -----------------------------------------------------------------
      // EXIT ANIMATION: Subtle upward translation as section leaves viewport
      // without fading out completely inside the visible viewport
      // -----------------------------------------------------------------
      if (!isMobile) {
        gsap.fromTo(
          content,
          {
            y: 0,
          },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "bottom 90%",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      // -----------------------------------------------------------------
      // SUBTLE PARALLAX: Children move slightly slower than scroll
      // for depth perception (desktop only)
      // -----------------------------------------------------------------
      if (!isMobile) {
        const innerElements = content.querySelectorAll(":scope > *");
        innerElements.forEach((child, i) => {
          gsap.fromTo(
            child,
            { y: 0 },
            {
              y: -(10 + i * 5),
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "relative w-full min-h-screen bg-[#000000] overflow-hidden",
        className
      )}
    >
      {/* Section Content Container */}
      <div ref={contentRef} className="relative w-full h-full will-change-transform">
        {children}
      </div>
    </section>
  );
};
