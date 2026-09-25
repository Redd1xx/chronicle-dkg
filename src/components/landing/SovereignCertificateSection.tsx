"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Fingerprint, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Database,
  Lock,
  Copy,
  Check
} from "lucide-react";
import { cinematicAudio } from "@/lib/cinematic-audio";

interface SovereignCertificateSectionProps {
  onOpenMintModal: () => void;
  onOpenProofInspector: () => void;
}

export function SovereignCertificateSection({
  onOpenMintModal,
  onOpenProofInspector
}: SovereignCertificateSectionProps) {
  const [copied, setCopied] = useState(false);
  const sampleUal = "did:dkg:otp:2043/0x5cae0019b88219cb4400e31988af021c/1426";

  const handleCopyUal = () => {
    cinematicAudio.play("click");
    navigator.clipboard.writeText(sampleUal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sovereign-mint" className="relative py-28 bg-[#070a0f] border-b border-white/[0.06] overflow-hidden">
      {/* Background Volumetric Lighting Ray */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fbbf24]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Certificate Card Container */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0f141f] via-[#0a0e16] to-[#070a0f] border-2 border-[#fbbf24]/30 p-8 sm:p-12 shadow-[0_0_60px_rgba(251,191,36,0.1)] relative overflow-hidden">
          {/* Subtle Archival Watermark */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
            <span className="font-cinzel text-9xl font-black text-[#fbbf24] leading-none">
              DKG
            </span>
          </div>

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#fbbf24]/20 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/40 flex items-center justify-center text-[#fbbf24] shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#fbbf24]">
                  OriginTrail DKG Permanent Registry
                </span>
                <h3 className="font-cinzel font-bold text-xl sm:text-2xl text-white tracking-wide">
                  SOVEREIGN KNOWLEDGE ASSET
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-xs font-mono text-[#34d399] w-max">
              <ShieldCheck className="w-4 h-4" />
              <span>Cryptographically Sealed</span>
            </div>
          </div>

          {/* Certificate Body & Provenance Grid */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Canonical Knowledge Asset UAL
                </span>
                <div className="flex items-center justify-between gap-2 text-white">
                  <span className="truncate text-[11px] text-[#fbbf24]">{sampleUal}</span>
                  <button
                    onClick={handleCopyUal}
                    className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy UAL"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#34d399]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  RFC-6962 SHA-256 Merkle Root
                </span>
                <span className="text-[11px] text-zinc-200 block break-all">
                  0x7f4ae910b88219cb4400e31988af021c33842109ebbb01
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Parachain Settlement & Consensus
                </span>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-200">NeuroWeb (OTP:2043)</span>
                  <span className="text-[#34d399] font-medium">Subnet 104 · Block #19,488,210</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  C2PA Manifest JUMBF Container
                </span>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-200 truncate max-w-[200px]">urn:c2pa:manifest:sha256:7f4a...</span>
                  <span className="text-[#fbbf24]">v2.1 Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Actions & Call To Action */}
          <div className="pt-6 border-t border-[#fbbf24]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <button
                onClick={() => {
                  cinematicAudio.play("node");
                  onOpenProofInspector();
                }}
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <Fingerprint className="w-3.5 h-3.5 text-[#34d399]" />
                <span className="underline underline-offset-4 decoration-zinc-700">Audit Proof Tree</span>
              </button>
              <span className="text-zinc-600">·</span>
              <span>Zero Slop Guarantee</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  cinematicAudio.play("mint");
                  onOpenMintModal();
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#fbbf24]/50 transition-all cursor-pointer"
              >
                <Database className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Publish Knowledge Asset</span>
              </button>

              <Link
                href="/studio"
                onClick={() => cinematicAudio.play("click")}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-heading font-extrabold text-black bg-[#fbbf24] hover:bg-[#f59e0b] active:scale-95 transition-all shadow-[0_0_25px_rgba(251,191,36,0.35)] cursor-pointer"
              >
                <span>Enter Lore Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
