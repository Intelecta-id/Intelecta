"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon, Cpu, Cloud, ShieldCheck, Layers, CheckCircle2, ArrowUpRight } from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Cloud,
  ShieldCheck,
  Layers,
};

function BentoCard({ service, index }: { service: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const IconComponent = iconMap[service.iconName] || Layers;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D11]/80 p-8 transition-all duration-300 backdrop-blur-xl hover:border-white/25",
        index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5"
      )}
    >
      {/* Radial Spotlight Follower */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`,
        }}
      />

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white transition-transform duration-300 group-hover:scale-110 group-hover:border-white/40 group-hover:bg-white/10">
            <IconComponent className="h-6 w-6" />
          </div>

          <span className="font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            {service.category}
          </span>
        </div>

        <h3 className="mt-6 font-display text-2xl font-bold text-white transition-colors duration-200 group-hover:text-zinc-100">
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {service.description}
        </p>

        {/* Feature List */}
        <div className="mt-6 space-y-2.5">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2.5 text-xs text-zinc-300">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: Tech Stack & Metric */}
      <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5">
          {service.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Impact Badge */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
          <span>{service.metrics}</span>
        </div>
      </div>
    </motion.div>
  );
}

export const ServicesBento: React.FC = () => {
  return (
    <section id="layanan" className="relative py-28 bg-[#030303]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              KAPABILITAS UTAMA
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
          >
            Solusi Rekayasa Komprehensif untuk Skala Enterprise
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-zinc-400"
          >
            Setiap pilar layanan dibangun dengan standar arsitektur kelas dunia,
            memberikan keunggulan kompetitif dan skalabilitas tanpa batas bagi organisasi Anda.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {servicesData.map((service, index) => (
            <BentoCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
