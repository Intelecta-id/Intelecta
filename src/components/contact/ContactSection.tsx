"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GlyphSend,
  GlyphCheck,
  GlyphMail,
  GlyphLocation,
  GlyphPhone,
} from "@/components/ui/TechnicalGlyphs";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Web Development",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="kontak" className="relative min-h-screen py-20 sm:py-28 bg-[#030303] border-t border-white/10 flex flex-col justify-center">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* Editorial Section Header */}
        <div className="max-w-3xl border-b border-white/10 pb-8">
          <span className="font-sans text-xs tracking-widest text-zinc-400 uppercase">
            Inisiasi Kerjasama
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Mari Rancang Masa Depan Bersama
          </h2>
          <p className="mt-4 font-sans text-base text-zinc-400 leading-relaxed max-w-2xl">
            Diskusikan kebutuhan arsitektur sistem, skalabilitas beban, dan produk digital Anda bersama tim rekayasa Intelecta.
          </p>
        </div>

        {/* 2-Column Editorial Layout */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="rounded-2xl border border-white/10 bg-[#08080C]/80 p-8 sm:p-10 backdrop-blur-xl lg:col-span-6">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
              Kirim Permintaan Konsultasi
            </h3>
            <p className="mt-1 font-sans text-xs text-zinc-400">
              Tim engineering kami akan merespons dalam kurun waktu 1x24 jam kerja.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-xl border border-white/15 bg-white/[0.02] p-8 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
                  <GlyphCheck className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
                  Permintaan Berhasil Terkirim
                </h4>
                <p className="mt-2 font-sans text-sm text-zinc-300">
                  Terima kasih, {formData.name}. Solutions Architect Intelecta akan segera menghubungi Anda melalui email <span className="text-white underline">{formData.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      service: "Web Development",
                      message: "",
                    });
                  }}
                  className="mt-6 font-sans text-xs text-zinc-400 underline hover:text-white"
                >
                  Kirim permohonan baru
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block font-sans text-xs text-zinc-400">
                      Nama Lengkap *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Budi Santoso"
                      className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:bg-white/5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block font-sans text-xs text-zinc-400">
                      Email Bisnis *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="budi@perusahaan.co.id"
                      className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:bg-white/5 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-company" className="block font-sans text-xs text-zinc-400">
                      Perusahaan / Organisasi
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="PT Bank Nusantara"
                      className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:bg-white/5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="block font-sans text-xs text-zinc-400">
                      Fokus Layanan
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-[#121217] px-4 py-3 text-sm text-white transition-colors focus:border-white focus:outline-none"
                    >
                      <option value="Web Development">Web Development (Enterprise & Portal)</option>
                      <option value="Mobile App Development">Mobile App Development (iOS & Android)</option>
                      <option value="Web App Development">Web App & SaaS Development</option>
                      <option value="Konsultasi Kustom">Konsultasi Arsitektur & Modernisasi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-sans text-xs text-zinc-400">
                    Spesifikasi Kebutuhan / Permasalahan Sistem *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Jelaskan kebutuhan arsitektur, kapasitas beban, atau target implementasi sistem Anda..."
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:bg-white/5 focus:outline-none font-sans"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="w-full"
                >
                  <GlyphSend className="h-3.5 w-3.5" />
                  <span className="text-xs tracking-wider uppercase font-semibold">
                    {isSubmitting ? "Mengirimkan Data..." : "Kirim Permintaan Konsultasi"}
                  </span>
                </MagneticButton>
              </form>
            )}
          </div>

          {/* Right Column: Editorial Statement & Corporate Presence */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
            
            {/* Statement Quote Card */}
            <div className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="font-sans text-xs tracking-widest text-zinc-400 uppercase">
                Prinsip Kerjasama
              </span>
              <blockquote className="mt-4 font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white leading-snug">
                &ldquo;Arsitektur teknologi terbaik tidak lahir dari kebetulan, melainkan dari presisi rekayasa dan dedikasi pada performa tertinggi.&rdquo;
              </blockquote>
              <p className="mt-6 font-sans text-sm text-zinc-400 leading-relaxed">
                Setiap permohonan konsultasi ditinjau langsung oleh Principal Solutions Architect kami. Kami menjamin analisis kesiapan awal dan SLA terukur sebelum sesi diskusi teknis dimulai.
              </p>

              {/* Assurances List */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-xs font-sans text-zinc-300">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Respon resmi tertulis dalam kurun waktu &lt; 24 jam kerja</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Seluruh data dilindungi Perjanjian Kerahasiaan (NDA) standar korporat</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Kepatuhan penuh standar ISO 27001 dan UU Perlindungan Data Pribadi</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center">
                <GlyphMail className="mx-auto h-4 w-4 text-zinc-400" />
                <span className="mt-2 font-sans text-xs text-zinc-400 block">Surel Resmi</span>
                <p className="mt-0.5 font-sans text-xs font-medium text-white">advisory@intelecta.id</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center">
                <GlyphPhone className="mx-auto h-4 w-4 text-zinc-400" />
                <span className="mt-2 font-sans text-xs text-zinc-400 block">Saluran Langsung</span>
                <p className="mt-0.5 font-sans text-xs font-medium text-white">+62 812-8900-1926</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center">
                <GlyphLocation className="mx-auto h-4 w-4 text-zinc-400" />
                <span className="mt-2 font-sans text-xs text-zinc-400 block">Kantor Pusat</span>
                <p className="mt-0.5 font-sans text-xs font-medium text-white">SCBD, Jakarta Selatan</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
