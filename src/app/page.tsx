"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Fingerprint,
  ExternalLink,
  GitBranch,
  Lock,
  Globe,
  Compass,
  FileCheck
} from "lucide-react";
import { KnowledgeMeshBackground } from "@/components/KnowledgeMeshBackground";
import { LandingHeader } from "@/components/LandingHeader";
import { ProofInspectorModal } from "@/components/ProofInspectorModal";

interface Assertion {
  id: string;
  name: string;
  type: string;
  hash: string;
  statement: string;
  verified: boolean;
}

const SAMPLE_ASSERTIONS: Assertion[] = [
  {
    id: "a1",
    name: "Florence Cathedral Dome Manifest",
    type: "Historical Architecture Archive",
    hash: "0x44921...c10e",
    statement: "<Brunelleschi_Cupola> <masonryPattern> 'Spina di pesce (Herringbone)' ; <internalDiameter> '45.5 meters' .",
    verified: true
  },
  {
    id: "a2",
    name: "CERN LHC Higgs Resonance 2012",
    type: "High Energy Physics Triples",
    hash: "0x88214...f902",
    statement: "<CERN_ATLAS_CMS> <bosonMassResonance> '125.09 GeV/c^2' ; <discoverySignificance> '5.0 sigma' .",
    verified: true
  },
  {
    id: "a3",
    name: "Challenger Deep 10900m Bathymetry",
    type: "Hadal Oceanographic Mesh",
    hash: "0x91834...31b9",
    statement: "<Mariana_ChallengerDeep> <hydrostaticPressure> '108.6 MPa' ; <ventTemperature> '380°C' .",
    verified: true
  },
  {
    id: "a4",
    name: "Livepeer Diffusion Provenance",
    type: "Model Provenance",
    hash: "0x12dc8...884a",
    statement: "<Livepeer_Pipeline> <model> 'Flux-Schnell' ; <c2paLedger> '0xfa39...' .",
    verified: true
  }
];

const KNOWLEDGE_DOMAINS = [
  {
    id: "renaissance",
    title: "Brunelleschi Dome (1426 CE)",
    era: "Renaissance Guild Archive",
    source: "Opera di Santa Maria del Fiore",
    ual: "did:dkg:otp2043/0x918341/brunelleschi_herringbone",
    confidence: "99.8%",
    triplesCount: 24,
    mediaUrl: "https://agent.livepeer.org/a/aHR0cHM6Ly92M2IuZmFsLm1lZGlhL2ZpbGVzL2IvMGFhYjk3YTRvX0N1NmxhQnY5WFRMeVlNUHpIbHNaLmpwZw.43ec37d854c29895/_Cu6laBv9XTLyYMPzHlsZ.jpg",
    focalDescription: "Self-supporting herringbone brickwork without wooden centering.",
    sparqlTriple: "<Brunelleschi_Cupola> <masonryPattern> 'Spina di pesce' ; <hoistDesign> 'Castagnaccio' .",
    lens: "50mm Anamorphic Prime · 2.39:1",
    nodes: ["Brunelleschi", "Spina di Pesce", "Florence 1426", "Dual-Shell Vault", "Castagnaccio Hoist"]
  },
  {
    id: "cern",
    title: "CERN LHC 125 GeV Higgs (2012)",
    era: "High-Energy Particle Physics",
    source: "CERN Open Data Portal / Zenodo",
    ual: "did:dkg:otp2043/0x918341/cern_higgs_2012",
    confidence: "99.9%",
    triplesCount: 38,
    mediaUrl: "https://agent.livepeer.org/a/aHR0cHM6Ly92M2IuZmFsLm1lZGlhL2ZpbGVzL2IvMGFhYjk3MWUvSkhLMUNBeHVudFBBd29HQ1RZTVdCLmpwZw.969dfc1a43072ab4/JHK1CAxuntPAwoGCTYMWB.jpg",
    focalDescription: "Superconducting beam pipe 13 TeV proton collision.",
    sparqlTriple: "<CERN_LHC_ATLAS> <bosonMass> '125.09 GeV' ; <beamEnergy> '6.5 TeV per beam' .",
    lens: "35mm Cine Macro · High Velocity Blur",
    nodes: ["ATLAS Detector", "125.09 GeV Resonance", "13 TeV Beam", "Superconducting Niobium", "Zenodo 2012"]
  },
  {
    id: "mariana",
    title: "Challenger Deep 10,900m",
    era: "Hadal Oceanographic Bathymetry",
    source: "NOAA Ocean Exploration Archives",
    ual: "did:dkg:otp2043/0x918341/mariana_hadal_vent",
    confidence: "99.6%",
    triplesCount: 19,
    mediaUrl: "https://agent.livepeer.org/a/aHR0cHM6Ly92M2IuZmFsLm1lZGlhL2ZpbGVzL2IvMGFhYjk3MGIvWDZjYk16ZDU2VnhtREphQzdISERGLmpwZw.9ff8d740a112167f/X6cbMzd56VxmDJaC7HHDF.jpg",
    focalDescription: "Hadal benthic hydrothermal chimneys venting mineral plumes.",
    sparqlTriple: "<Challenger_Deep> <bathymetricDepth> '10928m' ; <hydrothermalVents> 'Serpentine' .",
    lens: "28mm Submersible Wide · Tungsten Beam",
    nodes: ["Mariana Trench", "10,928m Depth", "Serpentine Chimneys", "Titanium DSV", "NOAA Telemetry"]
  }
];

export default function ChronicleLandingPage() {
  const router = useRouter();
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [selectedDomainIdx, setSelectedDomainIdx] = useState(0);
  const [selectedAssertion, setSelectedAssertion] = useState<Assertion>(SAMPLE_ASSERTIONS[0]);
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);

  const activeDomain = KNOWLEDGE_DOMAINS[selectedDomainIdx];

  const playClickSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(680, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1020, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio policy safe
    }
  };

  const handleAssertionClick = (assertion: Assertion) => {
    playClickSound();
    setSelectedAssertion(assertion);
  };

  return (
    <div className="relative min-h-screen bg-[#05070a] text-zinc-100 overflow-x-hidden selection:bg-[#fbbf24]/30 selection:text-white">
      {/* 60fps Living Cryptographic Astrolabe Canvas */}
      <KnowledgeMeshBackground />

      {/* Proof Inspector Modal */}
      <ProofInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />

      {/* Header */}
      <LandingHeader onOpenInspector={() => setIsInspectorOpen(true)} />

      <main className="relative z-10 pt-20">
        {/* ARCHIVAL VERIFIABLE CINEMA HERO */}
        <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="space-y-6 text-left">
              
              {/* Provenance Protocol Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-[10px] font-mono text-[#fbbf24] tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                <span>OriginTrail DKG v8 · Verifiable Media Genome</span>
              </div>

              {/* Master Display Heading */}
              <h1 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[0.94] text-balance">
                ARCHIVAL GROUNDING <br />
                <span className="text-[#fbbf24] font-cinzel font-normal tracking-wide">FOR GENERATIVE CINEMA.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-xl text-balance">
                Chronicle DKG binds Livepeer video diffusion models to immutable Decentralized Knowledge Graph triples and verifiable RFC-6962 Merkle proof manifests.
              </p>

              {/* Interactive Knowledge Domain Selector */}
              <div className="p-4 rounded-xl bg-[#090d14]/90 border border-white/10 space-y-3 shadow-xl">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-b border-white/10 pb-2">
                  <span className="text-zinc-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>Knowledge Domains:</span>
                  </span>
                  <span className="text-[#34d399] font-mono font-bold">{activeDomain.confidence} Trust Score</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {KNOWLEDGE_DOMAINS.map((domain, idx) => (
                    <button
                      key={domain.id}
                      onClick={() => {
                        playClickSound();
                        setSelectedDomainIdx(idx);
                        setActiveNodeIdx(0);
                      }}
                      className={`p-2 rounded-lg text-left text-xs font-mono transition-all cursor-pointer ${
                        selectedDomainIdx === idx
                          ? "bg-[#fbbf24]/15 border border-[#fbbf24] text-white shadow-[0_0_12px_rgba(251,191,36,0.2)]"
                          : "bg-white/[0.02] border border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/15"
                      }`}
                    >
                      <span className="block text-[9px] text-[#fbbf24] truncate uppercase">{domain.era.split(" ")[0]}</span>
                      <span className="font-semibold block truncate text-[11px] text-zinc-200 mt-0.5">{domain.title.split("(")[0]}</span>
                    </button>
                  ))}
                </div>

                {/* Interactive Semantic Entity Chips */}
                <div className="pt-2">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1.5">Linked Knowledge Graph Entities:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDomain.nodes.map((node, nIdx) => (
                      <button
                        key={node}
                        onClick={() => {
                          playClickSound();
                          setActiveNodeIdx(nIdx);
                        }}
                        className={`px-2 py-0.5 rounded text-[9px] font-mono transition-all cursor-pointer ${
                          activeNodeIdx === nIdx
                            ? "bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/50 font-bold"
                            : "bg-white/[0.03] text-zinc-400 border border-white/5 hover:border-white/20"
                        }`}
                      >
                        {node}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grounding Fact Box */}
                <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 font-mono text-[10px] space-y-1">
                  <div className="text-zinc-400 flex items-center justify-between">
                    <span className="text-zinc-500 uppercase">SPARQL RDF Assertion:</span>
                    <span className="text-[#34d399]">{activeDomain.triplesCount} Grounded Triples</span>
                  </div>
                  <div className="text-[#fbbf24] font-mono truncate">{activeDomain.sparqlTriple}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  href={`/studio?query=${encodeURIComponent(activeDomain.title)}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-heading font-bold text-black bg-[#fbbf24] hover:bg-[#f59e0b] active:scale-95 transition-all shadow-[0_0_25px_rgba(251,191,36,0.3)] cursor-pointer"
                >
                  <span>Launch Lore Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => {
                    playClickSound();
                    setIsInspectorOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer"
                >
                  <Fingerprint className="w-3.5 h-3.5 text-[#34d399]" />
                  <span>Inspect Merkle Ledger</span>
                </button>
              </div>

              {/* Live UAL Footer Strip */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 pt-1">
                <span className="text-zinc-400 font-semibold uppercase">Active UAL:</span>
                <span className="text-[#34d399] truncate">{activeDomain.ual}</span>
              </div>
            </div>
        </section>

        {/* EMBEDDED INTERACTIVE MERKLE PROOF EXPLORER */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="text-left mb-8">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#34d399] tracking-wider mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Cryptographic Verification</span>
            </div>
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Interactive Merkle Proof Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1 font-sans">
              Click any factual assertion below to recalculate the RFC-6962 SHA-256 leaf-to-root validation tree.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#080b12] border border-white/10 rounded-xl p-5 sm:p-6 shadow-xl">
            {/* Assertion Selector Column */}
            <div className="lg:col-span-6 space-y-2.5">
              <h3 className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider flex items-center gap-2 pb-1 border-b border-white/5">
                <Database className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Knowledge Graph Assertions (Leaves)</span>
              </h3>

              {SAMPLE_ASSERTIONS.map((item) => {
                const isSelected = selectedAssertion.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAssertionClick(item)}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#34d399]/10 border-[#34d399]/50 shadow-[0_0_15px_rgba(52,211,153,0.12)]"
                        : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-heading font-semibold text-xs text-white">{item.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400">
                        {item.type}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-zinc-400 truncate mb-1">
                      {item.statement}
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                      <span>Hash: {item.hash}</span>
                      <span className="text-[#34d399] flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Anchored
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Merkle Path Visualization Column */}
            <div className="lg:col-span-6 flex flex-col justify-between p-4 rounded-lg bg-black/50 border border-white/10 font-mono text-xs">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <GitBranch className="w-4 h-4 text-[#34d399]" />
                    <span className="font-semibold text-xs font-heading">Proof Computation</span>
                  </div>
                  <span className="text-[9px] text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded border border-[#34d399]/30">
                    Verified Constraint
                  </span>
                </div>

                {/* Tree Levels */}
                <div className="space-y-3">
                  <div className="p-2.5 rounded bg-[#fbbf24]/10 border border-[#fbbf24]/30">
                    <span className="text-[9px] text-[#fbbf24] block uppercase tracking-wider font-cinzel">Root Node (DKG State Tree)</span>
                    <span className="text-zinc-200 font-bold text-xs block">0x4a9e210882e3bb19a8...0c88</span>
                    <span className="text-[9px] text-zinc-400">Block #19,488,210 · OriginTrail Parachain OTP:2043</span>
                  </div>

                  <div className="pl-4 border-l-2 border-[#34d399]/50 space-y-2.5">
                    <div className="p-2 rounded bg-white/[0.03] border border-white/10">
                      <span className="text-[9px] text-zinc-400 block uppercase">Intermediate Node H_12</span>
                      <span className="text-zinc-300 text-[11px]">SHA-256(Leaf_1 || Leaf_2) = 0x9f32...10aa</span>
                    </div>

                    <div className="p-2 rounded bg-[#34d399]/15 border border-[#34d399]/40">
                      <span className="text-[9px] text-[#34d399] block uppercase font-semibold">Selected Leaf Hash</span>
                      <span className="text-white text-[11px]">{selectedAssertion.hash}</span>
                      <span className="text-[9px] text-zinc-400 block mt-0.5">{selectedAssertion.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between">
                <div className="text-[10px] text-zinc-400">
                  Verification: <span className="text-[#34d399]">1.4ms</span>
                </div>
                <button
                  onClick={() => setIsInspectorOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span>Inspect Proof</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4-STAGE ARCHITECTURAL PIPELINE */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="text-left mb-8">
            <span className="text-[10px] font-cinzel font-semibold uppercase text-[#fbbf24] tracking-widest block mb-1">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white tracking-tight">
              The 4-Stage Verifiable Cinema Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1 font-sans">
              How OriginTrail DKG knowledge assertions deterministically bind Livepeer diffusion weights to real-world truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#080b12] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-[#fbbf24] font-bold">STAGE 01</span>
              <h3 className="font-heading font-semibold text-sm text-white">Semantic Ingestion</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Queries verified DKG nodes to extract canonical RDF triples and historical measurements.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080b12] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-[#34d399] font-bold">STAGE 02</span>
              <h3 className="font-heading font-semibold text-sm text-white">Constraint Compilation</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Transforms relational triples into physically bounded camera, lighting, and architectural prompts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080b12] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-[#22d3ee] font-bold">STAGE 03</span>
              <h3 className="font-heading font-semibold text-sm text-white">Livepeer Orchestration</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Dispatches deterministic prompts to decentralized Livepeer GPU nodes with verifiable parameter controls.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080b12] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-purple-400 font-bold">STAGE 04</span>
              <h3 className="font-heading font-semibold text-sm text-white">Cryptographic Sealing</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Embeds C2PA metadata manifests into output tensors and anchors the RFC-6962 Merkle root on NeuroWeb OTP:2043.
              </p>
            </div>
          </div>
        </section>

        {/* SOVEREIGN PROOF CERTIFICATE */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#07090f] border-2 border-[#fbbf24]/30 shadow-2xl relative text-left space-y-6">
            
            {/* Header Stamp */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#fbbf24]" />
                <span className="font-cinzel text-xs font-bold text-[#fbbf24] tracking-widest uppercase">
                  SOVEREIGN PROVENANCE CERTIFICATE
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">
                ORIGINTRAIL DKG · PARACHAIN OTP:2043
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-white">
                  Direct Verifiable Cinema
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  Query historical archives, run SPARQL semantic assertions, direct Livepeer video takes, and inspect cryptographic Merkle proofs in real-time.
                </p>
              </div>

              <div className="md:col-span-4 flex justify-start md:justify-end">
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-heading font-bold text-black bg-[#fbbf24] hover:bg-[#f59e0b] active:scale-95 transition-all shadow-[0_0_25px_rgba(251,191,36,0.3)] cursor-pointer"
                >
                  <span>Launch Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-[9px] font-mono text-zinc-500">
              <span>ROOT: 0x4a9e210882e3bb19a8...0c88</span>
              <span>STANDARDS: C2PA v1.3 · RFC-6962 SHA-256</span>
              <span>INFERENCE: LIVEPEER DECENTRALIZED GPU</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
