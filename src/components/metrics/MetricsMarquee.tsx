"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { metricsData, clientLogos } from "@/data/metrics";

function AnimatedCounter({ target, decimals = 0, suffix = "", prefix = "" }: { target: number; decimals?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = start + (target - start) * easeProgress;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display text-4xl font-extrabold text-white sm:text-5xl">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export const MetricsMarquee: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#08080A] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metricsData.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col border-l border-white/10 pl-6"
            >
              <AnimatedCounter
                target={item.number}
                decimals={item.decimals}
                suffix={item.suffix}
                prefix={item.prefix}
              />
              <span className="mt-2 text-sm font-semibold text-zinc-200">
                {item.label}
              </span>
              <span className="mt-1 text-xs text-zinc-500">
                {item.description}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Marquee Header */}
        <div className="mt-16 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            DIPERCAYA OLEH PERUSAHAAN TERKEMUKA DI BERBAGAI INDUSTRI
          </span>
        </div>
      </div>

      {/* Infinite Horizontal Logo Marquee */}
      <div className="relative mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-12 py-4">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-3.5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="h-2 w-2 rounded-full bg-zinc-600 group-hover:bg-white transition-colors" />
              <div>
                <p className="font-display text-sm font-bold tracking-wide text-zinc-400 group-hover:text-white transition-colors">
                  {client.name}
                </p>
                <p className="font-mono text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  {client.sector}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
