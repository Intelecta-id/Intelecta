"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, Sparkles, Mail, MapPin, Phone } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TerminalConsole } from "./TerminalConsole";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "AI & Machine Learning",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending form
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger Confetti Effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFFFFF", "#E4E4E7", "#A1A1AA", "#71717A"],
      });
    }, 1000);
  };

  return (
    <section id="kontak" className="relative py-28 bg-[#030303]">
      {/* Decorative Anchor for terminal */}
      <div id="terminal" className="absolute -top-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              KONSULTASI & INISIASI
            </span>
          </div>

          <h2 className="mt-6 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Mari Rancang Masa Depan Bersama
          </h2>

          <p className="mt-4 text-base text-zinc-400">
            Diskusikan kebutuhan arsitektur digital, inisiatif AI enterprise, atau audit keamanan siber Anda
            bersama dewan pakar Intelecta.
          </p>
        </div>

        {/* 2-Column Layout: Form & Terminal */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="rounded-3xl border border-white/15 bg-[#0D0D11]/90 p-8 sm:p-10 backdrop-blur-xl lg:col-span-6">
            <h3 className="font-display text-2xl font-bold text-white">
              Kirim Pesan Langsung
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Tim engineering kami akan merespons dalam kurun waktu 1x24 jam kerja.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center"
              >
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                <h4 className="mt-4 font-display text-xl font-bold text-white">
                  Pesan Berhasil Terkirim!
                </h4>
                <p className="mt-2 text-sm text-zinc-300">
                  Terima kasih, {formData.name}. Konsultan Intelecta akan segera menghubungi Anda melalui email {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      service: "AI & Machine Learning",
                      message: "",
                    });
                  }}
                  className="mt-6 text-xs text-zinc-400 underline hover:text-white"
                >
                  Kirim pesan baru
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block font-mono text-xs text-zinc-400">
                      NAMA LENGKAP *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Budi Santoso"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white/40 focus:bg-white/10 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-zinc-400">
                      EMAIL BISNIS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="budi@perusahaan.co.id"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white/40 focus:bg-white/10 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block font-mono text-xs text-zinc-400">
                      PERUSAHAAN / ORGANISASI
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="PT Maju Digital"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white/40 focus:bg-white/10 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-zinc-400">
                      FOKUS LAYANAN
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#121217] px-4 py-3 text-sm text-white transition-colors focus:border-white/40 focus:outline-none"
                    >
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Cloud & DevOps">Cloud & Modern DevOps</option>
                      <option value="Cybersecurity">Cybersecurity Zero Trust</option>
                      <option value="Enterprise Custom Software">Enterprise Custom Software</option>
                      <option value="Konsultasi Komprehensif">Konsultasi Komprehensif</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400">
                    DESKRIPSI KEBUTUHAN / PESAN *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ceritakan gambaran sistem atau permasalahan teknologi yang ingin Anda selesaikan..."
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white/40 focus:bg-white/10 focus:outline-none"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="w-full"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? "Mengirim Pesan..." : "Kirim Permintaan Konsultasi"}</span>
                </MagneticButton>
              </form>
            )}
          </div>

          {/* Right Column: Interactive Terminal */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <TerminalConsole />

            {/* Quick Contact Badges */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
                <Mail className="mx-auto h-5 w-5 text-zinc-400" />
                <p className="mt-2 font-mono text-[11px] text-zinc-400">contact@intelecta.id</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
                <Phone className="mx-auto h-5 w-5 text-zinc-400" />
                <p className="mt-2 font-mono text-[11px] text-zinc-400">+62 812-8900-1926</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
                <MapPin className="mx-auto h-5 w-5 text-zinc-400" />
                <p className="mt-2 font-mono text-[11px] text-zinc-400">SCBD, Jakarta Selatan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
