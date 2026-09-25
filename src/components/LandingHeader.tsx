"use client";

import React from "react";
import Link from "next/link";
import { Database, Fingerprint, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { cinematicAudio } from "@/lib/cinematic-audio";

interface LandingHeaderProps {
  onOpenInspector: () => void;
}

export function LandingHeader({ onOpenInspector }: LandingHeaderProps) {
  const handleNavClick = () => {
    cinematicAudio.play("click");
  };

  return (
    <header className="fixed top-0 inset-x-0 h-16 border-b border-white/10 bg-[#05070a]/90 backdrop-blur-xl z-50 px-4 sm:px-8 flex items-center justify-between">
      {/* Archival Brand Lockup */}
      <Link href="/" onClick={handleNavClick} className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-lg bg-[#fbbf24]/10 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.15)] group-hover:border-[#fbbf24] transition-colors">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-sm tracking-tight text-white group-hover:text-[#fbbf24] transition-colors">
              CHRONICLE DKG
            </span>
            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/25">
              OTP:2043
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 font-cinzel tracking-wider block">
            Verifiable Media Genome Studio
          </span>
        </div>
      </Link>

      {/* Navigation Anchor Links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
        <a 
          href="#screening-room" 
          onClick={handleNavClick} 
          className="hover:text-white transition-colors"
        >
          Screening Room
        </a>
        <a 
          href="#knowledge-genome" 
          onClick={handleNavClick} 
          className="hover:text-white transition-colors"
        >
          Knowledge Genome
        </a>
        <a 
          href="#merkle-sandbox" 
          onClick={handleNavClick} 
          className="hover:text-white transition-colors"
        >
          Merkle Sandbox
        </a>
        <a 
          href="#architecture" 
          onClick={handleNavClick} 
          className="hover:text-white transition-colors"
        >
          Pipeline
        </a>
        <a 
          href="#sovereign-mint" 
          onClick={handleNavClick} 
          className="hover:text-white transition-colors"
        >
          Certificate
        </a>
      </nav>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            cinematicAudio.play("node");
            onOpenInspector();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer"
        >
          <Fingerprint className="w-3.5 h-3.5 text-[#34d399]" />
          <span className="hidden sm:inline">Inspect Proof Tree</span>
          <span className="sm:hidden">Proof</span>
        </button>

        <Link
          href="/studio"
          onClick={handleNavClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-heading font-bold text-black bg-[#fbbf24] hover:bg-[#f59e0b] active:scale-95 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] cursor-pointer"
        >
          <span>Open Lore Desk</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
