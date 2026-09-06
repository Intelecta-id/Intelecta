"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: "inView" | "hover" | "always";
  speed?: number; // ms per tick
  scrambleGlyphs?: string;
  delay?: number; // delay before start in ms
}

const DEFAULT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#$[]{}/*+~=";

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className,
  trigger = "inView",
  speed = 35,
  scrambleGlyphs = DEFAULT_GLYPHS,
  delay = 0,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startScramble = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const length = text.length;
    let iteration = 0;
    const totalSteps = length * 3; // 3 ticks per letter resolution
    let lastTick = performance.now();

    const tick = (now: number) => {
      if (now - lastTick >= speed) {
        lastTick = now;

        const lockedIndex = Math.floor(iteration / 3);

        const current = text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < lockedIndex) {
              return text[index];
            }
            return scrambleGlyphs[
              Math.floor(Math.random() * scrambleGlyphs.length)
            ];
          })
          .join("");

        setDisplayText(current);
        iteration++;
      }

      if (iteration <= totalSteps) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
        setHasAnimated(true);
      }
    };

    const timer = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (trigger === "always") {
      const cancel = startScramble();
      return () => {
        if (cancel) cancel();
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }

    if (trigger === "inView") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              startScramble();
            }
          });
        },
        { threshold: 0.2 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => {
        observer.disconnect();
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }
  }, [text, trigger, hasAnimated]);

  return (
    <span
      ref={elementRef}
      onMouseEnter={() => {
        if (trigger === "hover") startScramble();
      }}
      className={cn("inline-block font-mono tracking-normal select-none", className)}
    >
      {displayText}
    </span>
  );
};
