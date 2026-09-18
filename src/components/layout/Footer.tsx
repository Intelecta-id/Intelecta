"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GlyphArrowUp,
  GlyphGithub,
  GlyphLinkedin,
  GlyphTwitter,
  GlyphMail,
} from "@/components/ui/TechnicalGlyphs";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black pt-20 pb-12 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div
                className="relative h-7 w-7"
                style={{ position: "relative", width: "28px", height: "28px", minWidth: "28px", minHeight: "28px" }}
              >
                <Image
                  src="/images/logo-icon.svg"
                  alt="Intelecta"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display text-lg font-extrabold tracking-widest text-white uppercase">
                INTELECTA
              </span>
            </Link>

            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-zinc-400">
              Mitra arsitektur teknologi terpercaya untuk solusi Artificial Intelligence,
              Modern Cloud Infrastructure, Cybersecurity Zero Trust, dan Software Enterprise mission-critical di Indonesia.
            </p>

          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Solusi */}
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                Solusi & Layanan
              </h3>
              <ul className="mt-4 space-y-2.5 font-sans text-sm text-zinc-400">
                <li>
                  <Link href="/#layanan" className="hover:text-white transition-colors">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/#layanan" className="hover:text-white transition-colors">
                    Mobile App Development
                  </Link>
                </li>
                <li>
                  <Link href="/#layanan" className="hover:text-white transition-colors">
                    Web App & SaaS
                  </Link>
                </li>
              </ul>
            </div>

            {/* Perusahaan & Legal */}
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                Perusahaan & Legal
              </h3>
              <ul className="mt-4 space-y-2.5 font-sans text-sm text-zinc-400">
                <li>
                  <Link href="/#tim" className="hover:text-white transition-colors">
                    Tim Intelecta
                  </Link>
                </li>
                <li>
                  <Link href="/#transformasi" className="hover:text-white transition-colors">
                    Benchmark Transformasi
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kontak & Alamat */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                Hubungi Kami
              </h3>
              <ul className="mt-4 space-y-2.5 font-sans text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <GlyphMail className="h-4 w-4 text-zinc-500" />
                  <span className="font-mono text-xs text-white">advisory@intelecta.id</span>
                </li>
                <li className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Sudirman Central Business District (SCBD), Tower One Lt. 28, Jakarta Selatan 12190
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ASCII Architectural Divider Bar (Harsh Dayal style) */}
        <div className="mt-16 overflow-hidden whitespace-nowrap font-mono text-[10px] text-white/15 select-none pointer-events-none">
          +--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
        </div>

        {/* Large Decorative Faded Logo Wordmark (Solid Faded White, No Gradient) */}
        <div className="relative mt-8 flex justify-center overflow-hidden py-2 opacity-5 select-none pointer-events-none">
          <span className="font-display text-[14vw] font-black tracking-widest text-white leading-none">
            INTELECTA
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} PT Intelecta Teknologi Nusantara. All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <Link href="https://github.com" target="_blank" aria-label="GitHub Intelecta" className="border border-white/15 bg-[#08080a] p-2 text-zinc-400 hover:text-white hover:border-white transition-colors">
              <GlyphGithub className="h-3.5 w-3.5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn Intelecta" className="border border-white/15 bg-[#08080a] p-2 text-zinc-400 hover:text-white hover:border-white transition-colors">
              <GlyphLinkedin className="h-3.5 w-3.5" />
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="Twitter Intelecta" className="border border-white/15 bg-[#08080a] p-2 text-zinc-400 hover:text-white hover:border-white transition-colors">
              <GlyphTwitter className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="ml-2 flex h-8 w-8 items-center justify-center border border-white/20 bg-black text-zinc-400 hover:text-white hover:border-white transition-colors"
            >
              <GlyphArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
