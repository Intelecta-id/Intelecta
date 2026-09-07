"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const hasLoaded = sessionStorage.getItem("intelecta_preloaded");
      if (hasLoaded) {
        setLoading(false);
        return;
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }

    // Quick, non-blocking initial progress reveal
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            try {
              sessionStorage.setItem("intelecta_preloaded", "true");
            } catch {}
          }, 150);
          return 100;
        }
        return prev + 25;
      });
    }, 25);

    // Hard fallback timeout to guarantee page reveals
    const fallbackTimeout = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030303] text-white pointer-events-none"
        >
          {/* Logo Animation */}
          <div className="relative mb-8 h-28 w-28">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <Image
                src="/images/logo-icon.svg"
                alt="Intelecta Logo"
                fill
                priority
                className="object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]"
              />
            </motion.div>
          </div>

          {/* Typography - Changed to span for SEO single H1 standard */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-8 text-center"
          >
            <span className="block font-display text-lg tracking-[0.3em] font-bold text-white">
              INTELECTA
            </span>
            <p className="mt-1 font-mono text-xs tracking-widest text-zinc-500">
              NEXT-GEN ENTERPRISE ARCHITECTURE
            </p>
          </motion.div>

          {/* Progress Bar & Counter */}
          <div className="w-56">
            <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-zinc-900">
              <motion.div
                className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <div className="mt-3 flex justify-between font-mono text-[11px] text-zinc-400">
              <span>INITIALIZING</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
