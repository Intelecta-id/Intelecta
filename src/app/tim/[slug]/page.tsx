import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, Briefcase, CheckCircle2, Github, Linkedin, Mail, Sparkles, ExternalLink } from "lucide-react";
import { teamData } from "@/data/team";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return teamData.map((member) => ({
    slug: member.slug,
  }));
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = teamData.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#030303] pt-28 pb-24 grid-pattern">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/tim"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-zinc-400 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>KEMBALI KE DEWAN PAKAR</span>
        </Link>

        {/* Profile Hero Header */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#121217] to-[#0D0D11] p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-gradient-to-br from-zinc-700 to-black font-display text-3xl font-black text-white shadow-2xl">
                {member.avatarPlaceholder}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-zinc-400 border border-white/5">
                  <Sparkles className="h-3 w-3 text-white" />
                  <span>{member.department}</span>
                </div>

                <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                  {member.name}
                </h1>

                <p className="mt-1 font-mono text-sm text-zinc-400">
                  {member.role}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {member.socials.linkedin && (
                <Link
                  href={member.socials.linkedin}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              )}
              {member.socials.github && (
                <Link
                  href={member.socials.github}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Github className="h-4 w-4" />
                </Link>
              )}
              {member.socials.email && (
                <Link
                  href={`mailto:${member.socials.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Mail className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="font-display text-lg text-zinc-200 italic leading-relaxed">
              &ldquo;{member.tagline}&rdquo;
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 sm:grid-cols-3">
            <div>
              <span className="font-display text-2xl font-extrabold text-white">
                {member.yearsOfExp}+ Tahun
              </span>
              <p className="mt-0.5 font-mono text-xs text-zinc-500">
                Pengalaman Industri
              </p>
            </div>
            <div>
              <span className="font-display text-2xl font-extrabold text-white">
                {member.featuredProjectsCount} Proyek
              </span>
              <p className="mt-0.5 font-mono text-xs text-zinc-500">
                Enterprise Selesai
              </p>
            </div>
            <div>
              <span className="font-display text-2xl font-extrabold text-white">
                {member.certifications.length} Akreditasi
              </span>
              <p className="mt-0.5 font-mono text-xs text-zinc-500">
                Sertifikasi Internasional
              </p>
            </div>
          </div>
        </div>

        {/* Biografi & Background */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0D0D11]/80 p-8 sm:p-10 backdrop-blur-xl">
          <h2 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            PROFIL & REKAM JEJAK
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            {member.bio}
          </p>
        </div>

        {/* Keahlian & Spesialisasi Teknis */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0D0D11]/80 p-8 sm:p-10 backdrop-blur-xl">
          <h2 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            KEAHLIAN & MATRIKS SPESIALISASI
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {member.skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="rounded-2xl border border-white/5 bg-black/40 p-6"
              >
                <h3 className="font-display text-sm font-bold text-white">
                  {skillGroup.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sertifikasi & Lisensi */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0D0D11]/80 p-8 sm:p-10 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-white" />
            <h2 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              SERTIFIKASI & LISENSI INTERNASIONAL
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {member.certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm text-zinc-300"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proyek Unggulan Terkait */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0D0D11]/80 p-8 sm:p-10 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-white" />
            <h2 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              PROYEK ENTERPRISE UNGGULAN
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {member.projects.map((proj) => (
              <div
                key={proj.name}
                className="rounded-2xl border border-white/5 bg-black/40 p-6"
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="font-display text-lg font-bold text-white">
                    {proj.name}
                  </h3>
                  <span className="font-mono text-xs text-zinc-400">
                    Peran: {proj.role}
                  </span>
                </div>

                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  <span className="font-semibold text-emerald-400">Dampak:</span> {proj.impact}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/15 bg-gradient-to-r from-zinc-900 to-black p-8 sm:flex-row sm:p-10">
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Ingin Berkolaborasi dengan {member.name.split(",")[0]}?
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Jadwalkan sesi konsultasi arsitektur atau inisiasi proyek teknologi Anda sekarang.
            </p>
          </div>

          <Link href="/#kontak">
            <MagneticButton variant="primary">
              <span>Mulai Diskusi Proyek</span>
              <ExternalLink className="h-4 w-4" />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
