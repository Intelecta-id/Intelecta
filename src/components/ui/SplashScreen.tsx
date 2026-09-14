"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";

interface SplashScreenProps {
  onComplete?: () => void;
  minDisplayTime?: number; // minimum time in ms, e.g. 1800ms
}

const TELEMETRY_LOGS = [
  "SYS.BOOT // INITIALIZING RUNTIME",
  "NET.SEC // ESTABLISHING ZERO-TRUST QUORUM",
  "GPU.ACCEL // COMPILING 3D SHADER PIPELINE",
  "SYS.STATUS // ENTERPRISE ARCHITECTURE READY",
];

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDisplayTime = 1800,
}) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const outerDiamondRef = useRef<SVGPolygonElement>(null);
  const midDiamondRef = useRef<SVGPolygonElement>(null);
  const innerDiamondRef = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    let currentPct = 0;

    // SVG Drawing Animation
    if (outerDiamondRef.current && midDiamondRef.current && innerDiamondRef.current) {
      gsap.fromTo(
        outerDiamondRef.current,
        { strokeDasharray: 800, strokeDashoffset: 800 },
        { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }
      );
      gsap.fromTo(
        midDiamondRef.current,
        { strokeDasharray: 600, strokeDashoffset: 600 },
        { strokeDashoffset: 0, duration: 1.4, delay: 0.2, ease: "power2.inOut" }
      );
      gsap.fromTo(
        innerDiamondRef.current,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        { scale: 1, opacity: 1, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" }
      );
    }

    // Interval to simulate real telemetry loading
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const targetPct = Math.min(100, Math.floor((elapsed / minDisplayTime) * 100));

      if (currentPct < targetPct) {
        currentPct = targetPct;
        setProgress(currentPct);

        // Update log index based on percentage
        const nextLogIndex = Math.min(
          TELEMETRY_LOGS.length - 1,
          Math.floor((currentPct / 100) * TELEMETRY_LOGS.length)
        );
        setLogIndex(nextLogIndex);
      }

      if (currentPct >= 100) {
        clearInterval(interval);
        triggerExitAnimation();
      }
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearInterval(interval);
        triggerExitAnimation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [minDisplayTime, onComplete]);

  const triggerExitAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        onComplete?.();
      },
    });

    // 1. Fade out centered content slightly
    if (contentRef.current) {
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
      });
    }

    // 2. Split Curtain Wipe: Top half slides UP, Bottom half slides DOWN
    if (curtainTopRef.current && curtainBottomRef.current) {
      tl.to(
        curtainTopRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.1"
      );
      tl.to(
        curtainBottomRef.current,
        {
          yPercent: 100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "<"
      );
    }
  };

  if (isFinished) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Loading application"
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        backgroundColor: "#020203",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Top Split Shutter */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#020203] border-b border-white/10 z-10"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50%",
          backgroundColor: "#020203",
          zIndex: 10,
        }}
      />

      {/* Bottom Split Shutter */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#020203] border-t border-white/10 z-10"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50%",
          backgroundColor: "#020203",
          zIndex: 10,
        }}
      />

      {/* Central Interactive HUD Content */}
      <div
        ref={contentRef}
        className="relative z-20 w-full h-full flex flex-col items-center justify-between p-8 sm:p-14 text-white"
      >
        {/* Top Header Row */}
        <div className="w-full max-w-4xl flex items-center justify-between font-mono text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-white animate-pulse" />
            <span className="tracking-wider">INTELECTA // ARSITEKTUR KECERDASAN</span>
          </div>
          <button
            onClick={triggerExitAnimation}
            className="text-zinc-500 hover:text-white transition-colors uppercase tracking-widest text-[10px] border border-white/10 px-2 py-1 bg-black/40 hover:border-white/30"
          >
            [ ESC / LEWATI ]
          </button>
        </div>

        {/* Center Stage: Concentric Geometric Diamond Logo + Counter */}
        <div className="flex flex-col items-center justify-center my-auto">
          {/* Animated SVG Diamond Logo */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-8 flex items-center justify-center">
            {/* Ambient Pulse Glow */}
            <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl animate-pulse" />

            <svg
              viewBox="0 0 200 200"
              className="w-full h-full relative z-10 overflow-visible"
              fill="none"
            >
              {/* Outer Wireframe Rhombus */}
              <polygon
                ref={outerDiamondRef}
                points="100,10 190,100 100,190 10,100"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="2"
              />

              {/* Mid Concentric Rhombus */}
              <polygon
                ref={midDiamondRef}
                points="100,40 160,100 100,160 40,100"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />

              {/* Inner Solid Geometric Core */}
              <polygon
                ref={innerDiamondRef}
                points="100,75 125,100 100,125 75,100"
                fill="#FFFFFF"
              />
            </svg>

            {/* Corner Crosshairs around Logo */}
            <span className="corner-tl !w-2 !h-2" />
            <span className="corner-tr !w-2 !h-2" />
            <span className="corner-bl !w-2 !h-2" />
            <span className="corner-br !w-2 !h-2" />
          </div>

          {/* Digital Telemetry Percentage Counter */}
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="font-mono text-5xl sm:text-6xl font-medium tracking-tight text-white tabular-nums">
              {progress < 10 ? `0${progress}` : progress}
            </span>
            <span className="font-mono text-lg sm:text-xl font-normal text-zinc-500">%</span>
          </div>

          {/* Dynamic Status Log Line */}
          <div className="mt-4 px-4 py-1.5 border border-white/10 bg-black/60 font-mono text-xs text-zinc-300 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-none bg-emerald-400 animate-pulse" />
            <span>{TELEMETRY_LOGS[logIndex]}</span>
          </div>
        </div>

        {/* Bottom Progress Bar & Build Signature */}
        <div className="w-full max-w-4xl flex flex-col gap-3 font-mono text-xs">
          {/* Hairline Progress Track with Active Fill */}
          <div className="relative w-full h-[2px] bg-white/10 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-white transition-all duration-75 shadow-[0_0_8px_#ffffff]"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span>CORE V2.4.8 // NEXT.JS + GSAP + WEBGL</span>
            <span>MEMPERSIAPKAN LINGKUNGAN ENTERPRISE</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
