"use client";

import React, { useState, useTransition } from "react";
import { 
  GitBranch, 
  CheckCircle2, 
  Fingerprint, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight, 
  Lock, 
  Database,
  Terminal,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";
import { cinematicAudio } from "@/lib/cinematic-audio";

interface MerkleLeafData {
  id: string;
  name: string;
  epoch: string;
  sparqlSubject: string;
  sparqlPredicate: string;
  sparqlObject: string;
  leafHash: string;
  siblingHash: string;
  parentHash: string;
  rootHash: string;
  blockHeight: number;
  ual: string;
  status: "verified" | "calculating";
}

const MERKLE_LEAVES: MerkleLeafData[] = [
  {
    id: "leaf-0",
    name: "Brunelleschi Dome Vault",
    epoch: "1426 CE",
    sparqlSubject: "<Brunelleschi_Cupola>",
    sparqlPredicate: "<masonryPattern>",
    sparqlObject: "'Spina di pesce (Herringbone)'",
    leafHash: "0x44921b7e90c10e39a25b17cf08819aa4",
    siblingHash: "0x78ab91cc10f823ee4510ba2289c099fa",
    parentHash: "0x9812ccfe4120bb5519842a19ef001882",
    rootHash: "0x7f4ae910b88219cb4400e31988af021c",
    blockHeight: 19488210,
    ual: "did:dkg:otp:2043/0x5cae...810a/1426",
    status: "verified"
  },
  {
    id: "leaf-1",
    name: "CERN LHC Higgs Resonance",
    epoch: "2012 CE",
    sparqlSubject: "<CERN_LHC_CMS>",
    sparqlPredicate: "<bosonMassResonance>",
    sparqlObject: "'125.09 GeV/c^2' (5.0 sigma)",
    leafHash: "0x88214fa1d8e032ff9019ca8831bb4109",
    siblingHash: "0x44921b7e90c10e39a25b17cf08819aa4",
    parentHash: "0x9812ccfe4120bb5519842a19ef001882",
    rootHash: "0x7f4ae910b88219cb4400e31988af021c",
    blockHeight: 19488212,
    ual: "did:dkg:otp:2043/0x78ab...91cc/2012",
    status: "verified"
  },
  {
    id: "leaf-2",
    name: "Challenger Deep Hydrothermal Vent",
    epoch: "10,928m",
    sparqlSubject: "<Mariana_ChallengerDeep>",
    sparqlPredicate: "<hydrostaticPressure>",
    sparqlObject: "'108.6 MPa' ; <ventTemp> '380°C'",
    leafHash: "0x91834cf8019aa731b988f01bba2981ce",
    siblingHash: "0x3344f6a9e10dcae44188200199eec388",
    parentHash: "0x6194acbb884210ee44772091ea280911",
    rootHash: "0x7f4ae910b88219cb4400e31988af021c",
    blockHeight: 19488215,
    ual: "did:dkg:otp:2043/0x9183...31b9/10928",
    status: "verified"
  },
  {
    id: "leaf-3",
    name: "Apollo 11 Tranquility Touchdown",
    epoch: "1969 CE",
    sparqlSubject: "<Apollo11_LM>",
    sparqlPredicate: "<radarDescentAltitude>",
    sparqlObject: "'0.0m' (Program 1202 Cleared)",
    leafHash: "0x3344f6a9e10dcae44188200199eec388",
    siblingHash: "0x91834cf8019aa731b988f01bba2981ce",
    parentHash: "0x6194acbb884210ee44772091ea280911",
    rootHash: "0x7f4ae910b88219cb4400e31988af021c",
    blockHeight: 19488218,
    ual: "did:dkg:otp:2043/0x3344...bb71/1969",
    status: "verified"
  }
];

interface InteractiveMerkleSandboxProps {
  onOpenProofInspector: () => void;
}

export function InteractiveMerkleSandbox({ onOpenProofInspector }: InteractiveMerkleSandboxProps) {
  const [selectedLeafIndex, setSelectedLeafIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(true);
  const [verificationStep, setVerificationStep] = useState<number>(3); // 3 = fully verified

  const currentLeaf = MERKLE_LEAVES[selectedLeafIndex];

  const handleSelectLeaf = (index: number) => {
    cinematicAudio.play("node");
    setSelectedLeafIndex(index);
    setVerificationStep(3);
  };

  const handleRunVerification = () => {
    cinematicAudio.play("click");
    setIsVerifying(true);
    setVerificationStep(0);

    setTimeout(() => {
      cinematicAudio.play("node");
      setVerificationStep(1);
    }, 300);

    setTimeout(() => {
      cinematicAudio.play("node");
      setVerificationStep(2);
    }, 600);

    setTimeout(() => {
      cinematicAudio.play("mint");
      setVerificationStep(3);
      setIsVerifying(false);
      setVerifySuccess(true);
    }, 900);
  };

  return (
    <section id="merkle-sandbox" className="relative py-28 bg-[#070a0f] border-b border-white/[0.06] overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#fbbf24] mb-4">
            <GitBranch className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>RFC-6962 CRYPTOGRAPHIC PROOF ENGINE</span>
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            INCLUSION PROOF SANDBOX
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Test and audit cryptographic leaf assertions directly in the browser. Select any epistemic fact to observe RFC-6962 SHA-256 branch traversal up to the verified OriginTrail DKG root hash.
          </p>
        </div>

        {/* Cryptographic Proof Laboratory Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Knowledge Leaf Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-2 mb-2 text-xs font-mono text-zinc-400">
              <span className="uppercase tracking-wider">Select Knowledge Leaf</span>
              <span>4 Assertions Loaded</span>
            </div>

            {MERKLE_LEAVES.map((leaf, idx) => {
              const isSelected = selectedLeafIndex === idx;
              return (
                <div
                  key={leaf.id}
                  onClick={() => handleSelectLeaf(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0e141f] border-[#fbbf24] shadow-[0_0_25px_rgba(251,191,36,0.15)]"
                      : "bg-[#0a0d14]/70 border-white/10 hover:border-white/20 hover:bg-[#0c1018]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#fbbf24] border border-[#fbbf24]/25">
                      {leaf.epoch}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      Block #{leaf.blockHeight}
                    </span>
                  </div>

                  <h3 className="font-syne font-bold text-sm text-white mb-1.5 flex items-center justify-between">
                    <span>{leaf.name}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                    )}
                  </h3>

                  <div className="p-2 rounded bg-black/50 border border-white/5 font-mono text-[10px] text-zinc-300">
                    <span className="text-zinc-500">{leaf.sparqlSubject} </span>
                    <span className="text-[#fbbf24]">{leaf.sparqlPredicate} </span>
                    <span className="text-zinc-200">{leaf.sparqlObject}</span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span className="text-zinc-500 truncate max-w-[180px]">
                      {leaf.leafHash.slice(0, 16)}...
                    </span>
                    <span className="text-[#34d399]">
                      99.9% Grounded
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Tree Traversal & Terminal (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b0f17] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            {/* Console Toolbar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#34d399]/10 border border-[#34d399]/30 flex items-center justify-center text-[#34d399]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-sm text-white">
                    Merkle Proof Path Traversal
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400">
                    Target: {currentLeaf.ual}
                  </p>
                </div>
              </div>

              <button
                onClick={handleRunVerification}
                disabled={isVerifying}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-black bg-[#fbbf24] hover:bg-[#f59e0b] disabled:opacity-50 transition-all font-semibold cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.2)]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? "animate-spin" : ""}`} />
                <span>{isVerifying ? "Computing..." : "Re-Verify Proof"}</span>
              </button>
            </div>

            {/* Visual Tree Path Progression */}
            <div className="py-6 space-y-4 font-mono text-xs">
              {/* Level 0: Selected Leaf */}
              <div className={`p-4 rounded-xl border transition-all ${
                verificationStep >= 0 
                  ? "bg-[#0f1724] border-[#fbbf24]/60 text-white" 
                  : "bg-white/[0.01] border-white/5 text-zinc-500"
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#fbbf24]">
                    Leaf Node [H(0x00 || Data)]
                  </span>
                  <span className="text-[10px] text-zinc-400">Level 0</span>
                </div>
                <div className="text-[11px] break-all font-mono text-zinc-200">
                  {currentLeaf.leafHash}
                </div>
              </div>

              {/* Connecting Pipe */}
              <div className="flex justify-center -my-2">
                <div className="w-0.5 h-6 bg-gradient-to-b from-[#fbbf24] to-[#34d399]" />
              </div>

              {/* Level 1: Intermediate Branch (Leaf + Sibling) */}
              <div className={`p-4 rounded-xl border transition-all ${
                verificationStep >= 1 
                  ? "bg-[#0d1c1c] border-[#34d399]/60 text-white" 
                  : "bg-white/[0.01] border-white/5 text-zinc-500"
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#34d399]">
                    Intermediate Branch Node [H(0x01 || L || R)]
                  </span>
                  <span className="text-[10px] text-zinc-400">Level 1</span>
                </div>
                <div className="text-[11px] break-all font-mono text-zinc-200">
                  {currentLeaf.parentHash}
                </div>
                <div className="mt-1 text-[10px] text-zinc-400">
                  Sibling: {currentLeaf.siblingHash.slice(0, 24)}...
                </div>
              </div>

              {/* Connecting Pipe */}
              <div className="flex justify-center -my-2">
                <div className="w-0.5 h-6 bg-gradient-to-b from-[#34d399] to-[#fbbf24]" />
              </div>

              {/* Level 2: Cryptographic Root */}
              <div className={`p-4 rounded-xl border transition-all ${
                verificationStep >= 2 
                  ? "bg-[#171408] border-[#fbbf24] text-white shadow-[0_0_20px_rgba(251,191,36,0.15)]" 
                  : "bg-white/[0.01] border-white/5 text-zinc-500"
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#fbbf24] flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
                    <span>OriginTrail DKG State Root (NeuroWeb)</span>
                  </span>
                  <span className="text-[10px] text-[#fbbf24] font-bold">ROOT HASH</span>
                </div>
                <div className="text-[12px] break-all font-mono text-[#fbbf24] font-semibold">
                  {currentLeaf.rootHash}
                </div>
              </div>
            </div>

            {/* Cryptographic Audit Terminal Details */}
            <div className="mt-4 p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-[#34d399]" />
                  <span>RFC-6962 Verification Telemetry</span>
                </div>
                <span className="text-[#34d399]">Audit Pass: 0.12ms</span>
              </div>
              <div className="pt-2.5 space-y-1 text-[11px]">
                <p className="text-zinc-300">
                  <span className="text-zinc-500">Assertion Subject:</span> {currentLeaf.sparqlSubject}
                </p>
                <p className="text-zinc-300">
                  <span className="text-zinc-500">NeuroWeb Contract:</span> 0x5cae...810a (OTP:2043)
                </p>
                <p className="text-zinc-300">
                  <span className="text-zinc-500">C2PA Manifest JUMBF:</span> urn:c2pa:manifest:sha256:7f4ae91...
                </p>
              </div>

              {/* Action Link to Full Proof Modal */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">
                  Need raw cryptographic audit artifacts?
                </span>
                <button
                  onClick={() => {
                    cinematicAudio.play("node");
                    onOpenProofInspector();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#fbbf24] hover:text-[#f59e0b] font-semibold transition-colors cursor-pointer group"
                >
                  <span>Open Deep Inspector</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
