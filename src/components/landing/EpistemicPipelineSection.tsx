"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Database, 
  Cpu, 
  Sparkles, 
  FileCheck, 
  Terminal, 
  ArrowRight, 
  Lock, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Code2,
  Workflow
} from "lucide-react";
import { cinematicAudio } from "@/lib/cinematic-audio";

interface PipelineStage {
  id: string;
  stepNumber: string;
  name: string;
  tagline: string;
  subsystem: string;
  description: string;
  terminalHeader: string;
  codeSnippet: string;
  metrics: { label: string; value: string }[];
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "stage-sparql",
    stepNumber: "01",
    name: "SPARQL Knowledge Graph Ingestion",
    tagline: "OriginTrail DKG v8 Semantic Resolver",
    subsystem: "OTP:2043 Decentralized Triplestore",
    description: "Queries multi-billion triple scientific and historical knowledge graphs across OriginTrail DKG subnets. Resolves canonical entity URIs and extracts verifiable factual constraints before any generative synthesis begins.",
    terminalHeader: "dkg-sparql-agent@client:~$ query --endpoint dkg.v8.ot --subnet 104",
    codeSnippet: `PREFIX dkg: <https://origintrail.io/ontology/v8#>
PREFIX hist: <https://chronicle.dkg/archival#>

SELECT ?subject ?predicate ?factValue ?confidence WHERE {
  ?subject dkg:entityId hist:Brunelleschi_Dome_1426 ;
           dkg:hasArchitecturalPattern ?pattern ;
           dkg:internalDiameter ?span ;
           dkg:groundingScore ?confidence .
  FILTER (?confidence > 0.995)
} LIMIT 1 ;`,
    metrics: [
      { label: "Subnet Latency", value: "48ms" },
      { label: "Triplestore Depth", value: "3.2B Triples" },
      { label: "Consensus", value: "100% Grounded" }
    ]
  },
  {
    id: "stage-compiler",
    stepNumber: "02",
    name: "Deterministic Constraint Compiler",
    tagline: "RDF-to-Optics Translation Engine",
    subsystem: "Chronicle Optical Compiler v2.4",
    description: "Transforms abstract RDF triples into strict cinematographic and physical parameters: 35mm anamorphic focal lengths, historical lighting temperatures, architectural scale constraints, and negative token boundaries to prevent AI hallucination.",
    terminalHeader: "chronicle-optics@compiler:~$ compile --strict-assertions --enforce-scale",
    codeSnippet: `const opticalParameters = {
  focalLength: "40mm Anamorphic T1.9",
  colorTemperature: "2400K (Candlelight/Tuscan Terracotta)",
  aspectRatio: "2.39:1 Cinematic Scope",
  masonryPattern: "Herringbone Spina di pesce without wooden centering",
  negativeEnforcement: ["modern scaffolding", "concrete joints", "steel girders"],
  lensFlareType: "Vintage 1960s Anamorphic Horizontal Blue Streak"
};`,
    metrics: [
      { label: "Optics Accuracy", value: "Sub-pixel" },
      { label: "Hallucination Margin", value: "< 0.01%" },
      { label: "Shader Bounds", value: "Enforced" }
    ]
  },
  {
    id: "stage-livepeer",
    stepNumber: "03",
    name: "Livepeer GPU Swarm Orchestration",
    tagline: "Decentralized Neural Diffusion",
    subsystem: "Livepeer AI Subnet RTX 4090 / A100 Swarm",
    description: "Dispatches the constrained cinematographic prompt to Livepeer's decentralized network of GPU orchestrators. High-throughput FP16 diffusion produces 60fps cinema-grade frames with reproducible seed determinism.",
    terminalHeader: "livepeer-swarm@orchestrator:~$ dispatch --model sdxl-cinematic-v2 --gpu-pool",
    codeSnippet: `POST https://agent.livepeer.org/api/mcp/creative
Headers: { "Authorization": "Bearer lpt_livepeer_swarm_v8" }
Body: {
  "model_id": "stabilityai/sdxl-cinematic-archival",
  "prompt": "Authentic 35mm celluloid frame, Florence 1426 Brunelleschi herringbone vault...",
  "guidance_scale": 7.5,
  "inference_steps": 30,
  "seed": 4492188210
} // Dispatched to Orchestrator Node 0x78ab...`,
    metrics: [
      { label: "Inference Time", value: "1.4s" },
      { label: "Active Nodes", value: "142 GPUs" },
      { label: "Stream Format", value: "HLS / ProRes" }
    ]
  },
  {
    id: "stage-c2pa",
    stepNumber: "04",
    name: "Cryptographic C2PA & UAL Minting",
    tagline: "Permanent Sovereign Provenance",
    subsystem: "NeuroWeb OTP:2043 + C2PA v2.1 Manifest",
    description: "Every generated frame is cryptographically bound into an RFC-6962 Merkle proof tree. The root hash is permanently minted to NeuroWeb (OTP:2043) as a Sovereign Knowledge Asset with an immutable Universal Asset Locator (UAL).",
    terminalHeader: "c2pa-provenance@signer:~$ mint-ual --chain neuroweb --anchor-merkle",
    codeSnippet: `const knowledgeAsset = await chronicle.mintKnowledgeAsset({
  ual: "did:dkg:otp:2043/0x5cae0019b882/1426",
  merkleRoot: "0x7f4ae910b88219cb4400e31988af021c",
  c2paManifestUri: "ipfs://bafybeic2pa_manifest_brunelleschi_1426",
  livepeerVideoHash: "0x44921b7e90c10e39a25b17cf08819aa4",
  assertionCount: 14
}); // Confirmed on NeuroWeb Block #19,488,210`,
    metrics: [
      { label: "Immutability", value: "Permanent" },
      { label: "Gasless Mint", value: "OTP:2043" },
      { label: "C2PA Spec", value: "v2.1 Compliant" }
    ]
  }
];

export function EpistemicPipelineSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = PIPELINE_STAGES[activeStageIndex];

  const handleSelectStage = (index: number) => {
    cinematicAudio.play("node");
    setActiveStageIndex(index);
  };

  return (
    <section id="architecture" className="relative py-28 bg-[#05070a] border-b border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#fbbf24] mb-4">
            <Workflow className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>ARCHITECTURAL DEEP-DIVE</span>
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            THE EPISTEMIC PIPELINE
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Generative cinema without truth is digital noise. Explore how Chronicle combines OriginTrail DKG knowledge graphs, deterministic optical compilers, and Livepeer GPU orchestration into verifiable cinema.
          </p>
        </div>

        {/* Asymmetric Interactive Console (Bans 4-card repeating grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Stage Stepper Navigation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <div
                  key={stage.id}
                  onClick={() => handleSelectStage(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer group ${
                    isActive
                      ? "bg-[#0b1019] border-[#fbbf24] shadow-[0_0_30px_rgba(251,191,36,0.12)] ring-1 ring-[#fbbf24]/50"
                      : "bg-[#070a0e] border-white/10 hover:border-white/20 hover:bg-[#0a0d14]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isActive 
                        ? "bg-[#fbbf24] text-black" 
                        : "bg-white/[0.04] text-zinc-400 group-hover:text-white"
                    }`}>
                      STAGE {stage.stepNumber}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {stage.subsystem}
                    </span>
                  </div>

                  <h3 className={`font-syne font-bold text-base transition-colors ${
                    isActive ? "text-white" : "text-zinc-300 group-hover:text-white"
                  }`}>
                    {stage.name}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="mt-3 flex items-center gap-3 pt-3 border-t border-white/5">
                    {stage.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="text-[10px] font-mono">
                        <span className="text-zinc-500">{m.label}: </span>
                        <span className="text-[#34d399] font-medium">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Terminal & Telemetry Console (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#090d14] border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Ambient Backlight Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#fbbf24]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Terminal Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-zinc-400 truncate max-w-[280px] sm:max-w-md">
                    {activeStage.terminalHeader}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/20 hidden sm:inline">
                  LIVE COMPILER
                </span>
              </div>

              {/* Stage Overview Description */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-[#fbbf24] uppercase tracking-widest">
                    {activeStage.tagline}
                  </span>
                </div>
                <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-white">
                  {activeStage.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-300 font-sans leading-relaxed">
                  {activeStage.description}
                </p>
              </div>

              {/* Code Snippet Box */}
              <div className="rounded-xl bg-black/80 border border-white/10 p-4 font-mono text-xs overflow-x-auto text-zinc-300">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[10px] text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>Active Protocol Payload</span>
                  </span>
                  <span>UTF-8 · RFC Compliant</span>
                </div>
                <pre className="text-[11px] leading-relaxed text-[#34d399] font-mono">
                  {activeStage.codeSnippet}
                </pre>
              </div>
            </div>

            {/* Bottom Telemetry & Navigation */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                  <span>Consensus: Subnet 104</span>
                </div>
                <span className="text-zinc-600">|</span>
                <span>NeuroWeb OTP:2043</span>
              </div>

              <Link
                href="/studio"
                onClick={() => cinematicAudio.play("click")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold text-black bg-[#fbbf24] hover:bg-[#f59e0b] transition-all cursor-pointer shadow-md group"
              >
                <span>Launch in Lore Desk</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
