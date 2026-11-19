"use client";

import React, { useState, useEffect } from "react";
import {
  GlyphArrowRight,
  GlyphCalendar,
  GlyphShield,
  GlyphCpu,
  GlyphLayers,
  GlyphGlobe,
  GlyphSmartphone,
  GlyphServer,
} from "@/components/ui/TechnicalGlyphs";

interface CommandMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  icon: React.FC<{ className?: string }>;
  action: () => void;
}

export const CommandMenuModal: React.FC<CommandMenuModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = [
    {
      id: "nav-hero",
      title: "Navigasi: Beranda & 3D Architectural Core",
      category: "Navigasi",
      shortcut: "G then H",
      icon: GlyphGlobe,
      action: () => scrollTo("beranda"),
    },
    {
      id: "nav-services",
      title: "Navigasi: Layanan & Rekayasa Sistem (Web, App, SaaS)",
      category: "Navigasi",
      shortcut: "G then S",
      icon: GlyphLayers,
      action: () => scrollTo("layanan"),
    },
    {
      id: "nav-transformasi",
      title: "Navigasi: Matriks Transformasi Sebelum vs Sesudah",
      category: "Navigasi",
      shortcut: "G then B",
      icon: GlyphCpu,
      action: () => scrollTo("transformasi-section"),
    },
    {
      id: "nav-team",
      title: "Navigasi: Profil Tim Spesialis Intelecta",
      category: "Navigasi",
      shortcut: "G then T",
      icon: GlyphShield,
      action: () => scrollTo("tim"),
    },
    {
      id: "act-consultation",
      title: "Aksi: Jadwalkan Konsultasi Arsitektur Enterprise",
      category: "Aksi Cepat",
      shortcut: "C",
      icon: GlyphCalendar,
      action: () => {
        onClose();
        if (onOpenConsultation) onOpenConsultation();
      },
    },
    {
      id: "act-specs",
      title: "Aksi: Salin Spesifikasi Arsitektur Intelecta (JSON)",
      category: "Aksi Cepat",
      shortcut: "T",
      icon: GlyphServer,
      action: () => {
        const specs = {
          name: "Intelecta Enterprise Architecture",
          uptime: "99.99%",
          latency: "sub-millisecond",
          security: "Zero-Trust Architecture",
          distributed_mesh: true,
          webgl_engine: "Three.js & Custom GLSL",
        };
        navigator.clipboard.writeText(JSON.stringify(specs, null, 2));
        alert("Spesifikasi arsitektur Intelecta berhasil disalin ke clipboard!");
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Global Keyboard listener for Ctrl+K, Cmd+K, and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open if parent listener is mounted
        }
      }

      if (e.key === "Escape" && isOpen) {
        onClose();
      }

      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl animate-in fade-in duration-200 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-[#0f1013] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Search Header Input */}
        <div className="flex h-14 items-center gap-3 border-b border-white/10 px-4 bg-black/40">
          <span className="font-mono text-xs text-zinc-500">⌘</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari perintah, navigasi section, atau aksi..."
            autoFocus
            className="w-full bg-transparent font-sans text-sm text-white placeholder-zinc-500 outline-none"
          />
          <kbd className="rounded border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Command Items List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/[0.04]">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-zinc-500">
              Tidak ada perintah yang sesuai.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComp = cmd.icon;

              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs transition-colors ${
                    isSelected
                      ? "bg-white text-black font-semibold"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center border ${
                        isSelected
                          ? "border-black/30 bg-black/10 text-black"
                          : "border-white/15 bg-black text-zinc-400"
                      }`}
                    >
                      <IconComp className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="block leading-tight">{cmd.title}</span>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest ${
                          isSelected ? "text-zinc-700" : "text-zinc-500"
                        }`}
                      >
                        {cmd.category}
                      </span>
                    </div>
                  </div>

                  {cmd.shortcut && (
                    <kbd
                      className={`border px-1.5 py-0.5 font-mono text-[10px] ${
                        isSelected
                          ? "border-black/30 bg-black/10 text-black"
                          : "border-white/10 bg-white/5 text-zinc-400"
                      }`}
                    >
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer Meta bar */}
        <div className="flex h-10 items-center justify-between border-t border-white/10 bg-black/40 px-4 text-[11px] text-zinc-500 font-sans">
          <span>Intelecta Quick Actions</span>
          <span>Navigasi: ↑ ↓ | Pilih: Enter</span>
        </div>
      </div>
    </div>
  );
};
