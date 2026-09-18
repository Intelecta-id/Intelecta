"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  GlyphMenu,
  GlyphClose,
  GlyphArrowUpRight,
} from "@/components/ui/TechnicalGlyphs";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks: { label: string; href: string; is3D?: boolean }[] = [
    { label: "Beranda", href: "/#beranda" },
    { label: "Identitas", href: "/#3d-showcase" },
    { label: "Layanan", href: "/#layanan" },
    { label: "Transformasi", href: "/#transformasi" },
    { label: "Pondasi", href: "/#keunggulan" },
    { label: "Tim Intelecta", href: "/#tim" },
    { label: "Kontak", href: "/#kontak" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 sm:px-6 select-none"
      >
        <nav
          className={cn(
            "relative flex items-center justify-between gap-4 rounded-none px-4 py-2 sm:px-6 sm:py-2.5 transition-colors border",
            isScrolled
              ? "bg-black border-white/25 shadow-2xl"
              : "bg-black/90 border-white/15 backdrop-blur-md"
          )}
        >
          {/* Corner Crosshairs */}
          <span className="corner-tl !w-1 !h-1" />
          <span className="corner-tr !w-1 !h-1" />
          <span className="corner-bl !w-1 !h-1" />
          <span className="corner-br !w-1 !h-1" />

          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="relative h-6 w-6 transition-transform duration-200 group-hover:scale-105"
              style={{ position: "relative", width: "24px", height: "24px", minWidth: "24px", minHeight: "24px" }}
            >
              <Image
                src="/images/logo-icon.svg"
                alt="Intelecta"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-display text-sm font-extrabold tracking-widest text-white transition-colors duration-200 group-hover:text-zinc-300 uppercase">
              INTELECTA
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isCurrent = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5 border",
                    isCurrent
                      ? "bg-white text-black font-bold border-white"
                      : "text-zinc-400 border-transparent hover:text-white hover:border-white/20"
                  )}
                >
                  {link.is3D && (
                    <span className="h-1.5 w-1.5 rounded-none bg-white" />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  window.location.href = "/#kontak";
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 bg-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black border border-white hover:bg-zinc-200 transition-colors"
            >
              <span>Konsultasi</span>
              <GlyphArrowUpRight className="h-3.5 w-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka menu navigasi"
              className="flex h-8 w-8 items-center justify-center border border-white/20 bg-black text-white hover:border-white md:hidden transition-colors"
            >
              {mobileMenuOpen ? <GlyphClose className="h-4 w-4" /> : <GlyphMenu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer Overlay (Sharp Box) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-4 top-20 z-40 relative border border-white/20 bg-black p-6 shadow-2xl md:hidden"
          >
            <span className="corner-tl" />
            <span className="corner-tr" />
            <span className="corner-bl" />
            <span className="corner-br" />

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:bg-white hover:text-black transition-colors"
                >
                  <span>{link.label}</span>
                  {link.is3D && (
                    <span className="font-mono text-[10px] border border-white/20 px-1.5 py-0.5 text-zinc-400">
                      3D
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/10 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenConsultation) {
                      onOpenConsultation();
                    } else {
                      window.location.href = "/#kontak";
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-200 border border-white"
                >
                  <span>Jadwalkan Konsultasi</span>
                  <GlyphArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
