"use client";

import React from "react";
import { Database, ShieldCheck, Cpu, ExternalLink, Sparkles } from "lucide-react";

import Link from "next/link";

interface HeaderProps {
  onOpenMintModal: () => void;
  adherenceScore: number;
}

export function Header({ onOpenMintModal, adherenceScore }: HeaderProps) {
  return (
    <header className="h-14 border-b border-white/10 bg-[#080b12]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-8 h-8 rounded-lg bg-[#e5a93b]/10 border border-[#e5a93b]/30 flex items-center justify-center text-[#e5a93b] group-hover:border-[#e5a93b] transition-colors">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-sm tracking-tight text-white group-hover:text-[#e5a93b] transition-colors">
              CHRONICLE DKG
            </h1>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-[#e5a93b]/15 text-[#e5a93b] border border-[#e5a93b]/30">
              Track 1 · Studio
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono block">
            Verifiable Media Genome Studio
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* DKG Node Status */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
          <span>NeuroWeb DKG v8</span>
          <span className="text-zinc-500 font-mono">(otp:2043)</span>
        </div>

        {/* Livepeer Creative MCP */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-zinc-300">
          <Cpu className="w-3 h-3 text-[#22d3ee]" />
          <span>Livepeer Creative MCP</span>
          <span className="text-[#22d3ee]">125 Tools</span>
        </div>

        {/* Fact Adherence Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-[10px] font-mono text-[#34d399]">
          <ShieldCheck className="w-3 h-3" />
          <span>{adherenceScore}% Grounded</span>
        </div>

        {/* Mint Button */}
        <button
          onClick={onOpenMintModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-black bg-gradient-to-r from-[#34d399] to-[#22d3ee] hover:opacity-90 transition-opacity"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Publish DKG Asset</span>
          <span className="sm:hidden">Publish</span>
        </button>
      </div>
    </header>
  );
}
