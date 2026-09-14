"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  showCorners?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  variant = "primary",
  onClick,
  showCorners = true,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary:
      "bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 border border-white",
    secondary:
      "bg-[#07070a] text-white font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-black border border-white/20 hover:border-white transition-colors",
    ghost:
      "bg-transparent text-zinc-400 font-mono text-xs uppercase tracking-wider hover:text-white border border-transparent hover:border-white/20",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.1 }}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-none px-6 py-3 transition-colors duration-150 active:scale-95 disabled:pointer-events-none disabled:opacity-50 select-none",
        variants[variant],
        className
      )}
      {...(props as any)}
    >
      {showCorners && (
        <>
          <span className="corner-tl !w-1 !h-1" />
          <span className="corner-tr !w-1 !h-1" />
          <span className="corner-bl !w-1 !h-1" />
          <span className="corner-br !w-1 !h-1" />
        </>
      )}
      {children}
    </motion.button>
  );
};
