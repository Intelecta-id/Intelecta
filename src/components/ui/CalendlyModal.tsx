"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GlyphClose,
  GlyphCalendar,
  GlyphClock,
  GlyphVideo,
  GlyphCheck,
} from "@/components/ui/TechnicalGlyphs";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", topic: "AI & Cloud Architecture" });

  const availableSlots = [
    { date: "Besok, 10:00 WIB", id: "slot-1" },
    { date: "Besok, 14:00 WIB", id: "slot-2" },
    { date: "Lusa, 11:30 WIB", id: "slot-3" },
    { date: "Lusa, 16:00 WIB", id: "slot-4" },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setIsBooked(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 select-none">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container (Sharp Box with Corner Brackets) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden border border-white/20 bg-[#08080a] p-6 sm:p-8 shadow-2xl"
          >
            <span className="corner-tl" />
            <span className="corner-tr" />
            <span className="corner-bl" />
            <span className="corner-br" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Tutup modal"
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center border border-white/15 bg-black text-zinc-400 hover:border-white hover:text-white transition-colors"
            >
              <GlyphClose className="h-4 w-4" />
            </button>

            {isBooked ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <GlyphCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase text-white">
                  Sesi Konsultasi Terjadwal
                </h3>
                <p className="mt-2 font-sans text-sm text-zinc-300">
                  Undangan Google Meet telah dikirimkan ke email <span className="text-white font-mono">{formData.email}</span>.
                </p>
                <div className="mt-6 border border-white/15 bg-black p-4 text-xs text-zinc-400 font-mono text-left">
                  <p className="font-semibold text-white">WAKTU SESI:</p>
                  <p className="mt-1 text-zinc-300">
                    {availableSlots.find((s) => s.id === selectedSlot)?.date} (30 Menit)
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsBooked(false);
                    setSelectedSlot(null);
                    onClose();
                  }}
                  className="mt-8 bg-white px-6 py-2.5 font-mono text-xs font-bold uppercase text-black hover:bg-zinc-200 border border-white"
                >
                  Selesai
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <GlyphCalendar className="h-4 w-4 text-white" />
                  <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                    Jadwalkan Konsultasi Solusi
                  </h3>
                </div>
                <p className="mt-1 font-mono text-xs text-zinc-400">
                  Sesi 30 menit bersama Solutions Architect Intelecta via Google Meet.
                </p>

                <form onSubmit={handleBooking} className="mt-6 space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-zinc-400 uppercase">
                      PILIH JADWAL TERSEDIA *
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {availableSlots.map((slot) => {
                        const isSelected = selectedSlot === slot.id;
                        return (
                          <button
                            type="button"
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot.id)}
                            className={cn(
                              "flex items-center gap-2 border p-3 text-left text-xs font-mono transition-colors",
                              isSelected
                                ? "border-white bg-white text-black font-bold"
                                : "border-white/15 bg-black text-zinc-400 hover:border-white/30 hover:text-white"
                            )}
                          >
                            <GlyphClock className="h-3.5 w-3.5 shrink-0" />
                            <span>{slot.date}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-zinc-400 uppercase">
                      NAMA LENGKAP *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nama Anda"
                      className="mt-1 w-full border border-white/15 bg-black px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-zinc-400 uppercase">
                      EMAIL BISNIS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@perusahaan.com"
                      className="mt-1 w-full border border-white/15 bg-black px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none font-mono"
                    />
                  </div>

                  <div className="pt-2">
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      disabled={!selectedSlot}
                      className="w-full justify-center"
                    >
                      <GlyphVideo className="h-4 w-4" />
                      <span>Konfirmasi Jadwal Meeting</span>
                    </MagneticButton>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
