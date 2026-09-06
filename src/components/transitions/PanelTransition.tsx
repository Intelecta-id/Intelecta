"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type TransitionVariant =
  | "diagonal"
  | "circular"
  | "strip"
  | "curtain"
  | "mask";

interface PanelTransitionProps {
  children: React.ReactNode;
  activeKey: string | number;
  variant?: TransitionVariant;
  direction?: number; // 1 for next/forward, -1 for prev/backward
  className?: string;
}

// ---------------------------------------------------------------------------
// High-Performance GPU-Accelerated Variants (60fps guaranteed via clip-path)
// ---------------------------------------------------------------------------

// 1. DIAGONAL WIPE: Angled geometric cut slicing across the screen
const diagonalVariants: Variants = {
  initial: (dir: number) => ({
    clipPath:
      dir >= 0
        ? "polygon(125% -10%, 125% -10%, 105% 110%, 105% 110%)"
        : "polygon(-25% -10%, -25% -10%, -5% 110%, -5% 110%)",
    zIndex: 2,
    willChange: "clip-path, transform",
  }),
  animate: {
    clipPath: "polygon(-30% -10%, 130% -10%, 110% 110%, -50% 110%)",
    zIndex: 2,
    transition: {
      duration: 0.75,
      ease: [0.77, 0, 0.175, 1],
    },
  },
  exit: (dir: number) => ({
    zIndex: 1,
    opacity: 0.4,
    scale: 0.98,
    transition: {
      duration: 0.65,
      ease: [0.77, 0, 0.175, 1],
    },
  }),
};

// 2. CIRCULAR REVEAL: Expanding circle from interaction point / top corner
const circularVariants: Variants = {
  initial: (dir: number) => ({
    clipPath:
      dir >= 0
        ? "circle(0% at 85% 15%)"
        : "circle(0% at 15% 15%)",
    zIndex: 2,
    willChange: "clip-path, transform",
  }),
  animate: (dir: number) => ({
    clipPath:
      dir >= 0
        ? "circle(160% at 85% 15%)"
        : "circle(160% at 15% 15%)",
    zIndex: 2,
    transition: {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
  exit: {
    zIndex: 1,
    opacity: 0.5,
    scale: 0.97,
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// 3. CURTAIN PEEL: Top layer unpeels like fine paper revealing beneath
const curtainVariants: Variants = {
  initial: {
    opacity: 1,
    scale: 1,
    zIndex: 1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    zIndex: 1,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  exit: (dir: number) => ({
    y: dir >= 0 ? "-102%" : "102%",
    skewY: dir >= 0 ? "-2.5deg" : "2.5deg",
    opacity: 0.95,
    zIndex: 3,
    boxShadow: "0 25px 60px rgba(0,0,0,0.9)",
    willChange: "transform",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

// 4. STRIP / SLICED REVEAL: Stepped vertical unveil
const stripVariants: Variants = {
  initial: (dir: number) => ({
    clipPath:
      dir >= 0
        ? "inset(0% 0% 0% 100%)"
        : "inset(0% 100% 0% 0%)",
    zIndex: 2,
    willChange: "clip-path",
  }),
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    zIndex: 2,
    transition: {
      duration: 0.7,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  exit: {
    zIndex: 1,
    opacity: 0.4,
    transition: {
      duration: 0.55,
    },
  },
};

const variantMap: Record<TransitionVariant, Variants> = {
  diagonal: diagonalVariants,
  circular: circularVariants,
  curtain: curtainVariants,
  strip: stripVariants,
  mask: circularVariants,
};

export const PanelTransition: React.FC<PanelTransitionProps> = ({
  children,
  activeKey,
  variant = "diagonal",
  direction = 1,
  className,
}) => {
  const selectedVariants = variantMap[variant] || diagonalVariants;

  return (
    <motion.div
      key={activeKey}
      custom={direction}
      variants={selectedVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden flex flex-col",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
