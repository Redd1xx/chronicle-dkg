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
    <header className="fixed top-0 inset-x-0 h-16 border-b border-white/10 bg-[#05070a]/90 backdrop-blur-xl z-50 px-3 sm:px-8 flex items-center justify-between pt-safe">
      {/* Archival Brand Lockup */}
      <Link href="/" onClick={handleNavClick} className="flex items-center gap-2 sm:gap-3 group shrink-0">
        <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-[#fbbf24]/10 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.15)] group-hover:border-[#fbbf24] transition-colors shrink-0">
          <Database className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-heading font-black text-xs sm:text-sm tracking-tight text-white group-hover:text-[#fbbf24] transition-colors whitespace-nowrap">
              CHRONICLE DKG
            </span>
            <span className="px-1.5 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono uppercase bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/25 shrink-0">
              OTP:2043
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-zinc-400 font-cinzel tracking-wider hidden xs:block sm:block truncate max-w-[140px] sm:max-w-none">
            Verifiable Media Studio
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
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={() => {
            cinematicAudio.play("node");
            onOpenInspector();
          }}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer shrink-0"
        >
          <Fingerprint className="w-3.5 h-3.5 text-[#34d399]" />
          <span className="hidden sm:inline">Inspect Proof Tree</span>
          <span className="sm:hidden">Proof</span>
        </button>

        <Link
          href="/studio"
          onClick={handleNavClick}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-heading font-bold text-black bg-[#fbbf24] hover:bg-[#f59e0b] active:scale-95 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] cursor-pointer shrink-0"
        >
          <span className="hidden sm:inline">Open Lore Desk</span>
          <span className="sm:hidden">Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
