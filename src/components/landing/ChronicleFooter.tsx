"use client";

import React from "react";
import Link from "next/link";
import { Database, ShieldCheck, Terminal, ExternalLink, Cpu, GitBranch, Heart } from "lucide-react";
import { cinematicAudio } from "@/lib/cinematic-audio";

export function ChronicleFooter() {
  return (
    <footer className="relative bg-[#040608] border-t border-white/10 pt-16 pb-12 text-zinc-400 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/10 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24]">
                <Database className="w-4 h-4" />
              </div>
              <span className="font-syne font-extrabold text-base text-white tracking-tight">
                CHRONICLE DKG
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20">
                OTP:2043
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              The verifiable media genome studio. Anchoring generative cinema in decentralized RDF knowledge graphs and immutable RFC-6962 Merkle inclusion proofs.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[#34d399]">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                <span>NeuroWeb Subnet 104 Online</span>
              </div>
              <span className="text-zinc-700">·</span>
              <span className="text-zinc-500">Block #19,488,210</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
              Studio Architecture
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a 
                  href="#screening-room" 
                  onClick={() => cinematicAudio.play("click")}
                  className="hover:text-[#fbbf24] transition-colors"
                >
                  Screening Room
                </a>
              </li>
              <li>
                <a 
                  href="#knowledge-genome" 
                  onClick={() => cinematicAudio.play("click")}
                  className="hover:text-[#fbbf24] transition-colors"
                >
                  Knowledge Genome
                </a>
              </li>
              <li>
                <a 
                  href="#merkle-sandbox" 
                  onClick={() => cinematicAudio.play("click")}
                  className="hover:text-[#fbbf24] transition-colors"
                >
                  Merkle Proof Sandbox
                </a>
              </li>
              <li>
                <a 
                  href="#architecture" 
                  onClick={() => cinematicAudio.play("click")}
                  className="hover:text-[#fbbf24] transition-colors"
                >
                  Epistemic Pipeline
                </a>
              </li>
              <li>
                <a 
                  href="#sovereign-mint" 
                  onClick={() => cinematicAudio.play("click")}
                  className="hover:text-[#fbbf24] transition-colors"
                >
                  Sovereign Certificate
                </a>
              </li>
            </ul>
          </div>

          {/* Protocols & Standards */}
          <div className="space-y-3">
            <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
              Decentralized Standards
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li className="flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
                <span>OriginTrail DKG v8</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300">
                <Cpu className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Livepeer GPU Swarm</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300">
                <GitBranch className="w-3.5 h-3.5 text-blue-400" />
                <span>RFC-6962 Merkle Trees</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>C2PA Manifest v2.1</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} Chronicle DKG. Autonomous Verifiable Epistemics.</p>
          <div className="flex items-center gap-6">
            <Link 
              href="/studio" 
              onClick={() => cinematicAudio.play("click")}
              className="text-[#fbbf24] hover:underline"
            >
              Open Lore Desk
            </Link>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-400">Zero Hallucination Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
