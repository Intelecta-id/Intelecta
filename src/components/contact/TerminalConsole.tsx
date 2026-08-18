"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, Sparkles } from "lucide-react";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalConsole: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "initial",
      command: "welcome",
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-white font-bold">Selamat datang di Intelecta Interactive Shell [v2.5.0-prod]</p>
          <p className="text-zinc-400">
            Ketik <span className="text-white font-semibold underline">help</span> untuk melihat daftar perintah yang tersedia.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode;

    switch (trimmed) {
      case "help":
        output = (
          <div className="space-y-1.5 text-zinc-300">
            <p className="text-zinc-400">Daftar perintah yang dapat Anda jalankan:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] pt-1 font-mono">
              <div><span className="text-white font-bold">layanan</span> - 4 solusi utama Intelecta</div>
              <div><span className="text-white font-bold">tim</span> - Pakar arsitektur teknologi</div>
              <div><span className="text-white font-bold">kontak</span> - Info komunikasi & kantor</div>
              <div><span className="text-white font-bold">tentang</span> - Profil & kapabilitas perusahaan</div>
              <div><span className="text-white font-bold">clear / cls</span> - Bersihkan layar konsol</div>
              <div><span className="text-white font-bold">uptime</span> - Status operasional sistem</div>
            </div>
          </div>
        );
        break;

      case "layanan":
      case "services":
        output = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-white font-bold">[1] AI & Machine Learning Engineering</p>
            <p className="text-zinc-400 text-xs">Model LLM enterprise privat, RAG, agentic automation.</p>
            <p className="text-white font-bold">[2] Cloud Infrastructure & Modern DevOps</p>
            <p className="text-zinc-400 text-xs">Kubernetes multi-region, GitOps, 99.99% SLA uptime.</p>
            <p className="text-white font-bold">[3] Cybersecurity Zero Trust</p>
            <p className="text-zinc-400 text-xs">Audit ISO 27001, automated threat hunting, ZTNA.</p>
            <p className="text-white font-bold">[4] Enterprise Custom Software</p>
            <p className="text-zinc-400 text-xs">Distributed microservices, ultra low latency APIs.</p>
          </div>
        );
        break;

      case "tim":
      case "team":
        output = (
          <div className="space-y-1.5 text-zinc-300">
            <p className="text-white font-semibold">Dewan Pakar Arsitektur Intelecta:</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300">
              <li><span className="text-white font-medium">Dr. Reza Mahendra</span> - Chief Technology Officer & AI Architect</li>
              <li><span className="text-white font-medium">Anita Wiratama</span> - Head of Cloud Infrastructure & DevOps</li>
              <li><span className="text-white font-medium">Fauzan Pratama</span> - Head of Cybersecurity (CISSP)</li>
              <li><span className="text-white font-medium">Dimas Adityawarman</span> - Principal Creative Technologist</li>
            </ul>
            <p className="text-zinc-500 text-[11px] pt-1">Buka menu /tim untuk melihat portofolio lengkap.</p>
          </div>
        );
        break;

      case "kontak":
      case "contact":
        output = (
          <div className="space-y-1 text-zinc-300">
            <p><span className="text-zinc-400">Email:</span> contact@intelecta.id</p>
            <p><span className="text-zinc-400">WhatsApp:</span> +62 812-8900-1926</p>
            <p><span className="text-zinc-400">Kantor:</span> SCBD Tower One, Level 28, Jakarta Selatan 12190</p>
          </div>
        );
        break;

      case "tentang":
      case "about":
        output = (
          <p className="text-zinc-300 leading-relaxed text-xs">
            Intelecta adalah firma konsultan rekayasa teknologi informasi premium di Indonesia.
            Kami memadukan kecerdasan buatan, komputasi awan berdaya tahan tinggi, dan benteng pertahanan
            siber modern untuk mentransformasi institusi skala enterprise.
          </p>
        );
        break;

      case "uptime":
        output = (
          <div className="text-emerald-400 text-xs font-mono">
            ALL SYSTEMS NOMINAL. Current Uptime: 99.995%. 0 Active Incidents.
          </div>
        );
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      default:
        output = (
          <p className="text-red-400 text-xs">
            Perintah &apos;{trimmed}&apos; tidak dikenali. Ketik &apos;help&apos; untuk melihat perintah yang didukung.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmd,
        output,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex h-full min-h-[460px] flex-col rounded-3xl border border-white/10 bg-[#08080A] p-6 font-mono text-xs shadow-2xl backdrop-blur-2xl cursor-text"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-zinc-400">
            visitor@intelecta-cli: ~
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
          <Terminal className="h-3.5 w-3.5" />
          <span>BASH</span>
        </div>
      </div>

      {/* Output Stream */}
      <div className="flex-1 space-y-4 overflow-y-auto py-4 text-xs">
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-emerald-400 font-bold">visitor@intelecta:~$</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Line */}
      <div className="flex items-center gap-2 border-t border-white/10 pt-4">
        <span className="text-emerald-400 font-bold shrink-0">visitor@intelecta:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ketik 'help' lalu tekan Enter..."
          className="flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-none"
        />
        <button
          onClick={() => handleCommand(inputVal)}
          aria-label="Kirim perintah"
          className="flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
        >
          <CornerDownLeft className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
