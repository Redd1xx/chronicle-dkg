"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Fingerprint,
  ShieldCheck,
  Sparkles,
  Database,
  Network,
  Binary,
  Copy,
  Check,
  ExternalLink,
  Layers,
  ChevronRight,
} from "lucide-react";
import { cinematicAudio } from "@/lib/cinematic-audio";

export interface KnowledgeDomain {
  id: string;
  title: string;
  era: string;
  source: string;
  ual: string;
  confidence: string;
  triplesCount: number;
  mediaUrl: string;
  focalDescription: string;
  sparqlTriple: string;
  merkleLeaf: string;
  nodes: { id: string; label: string; type: string; triple: string }[];
}

export const KNOWLEDGE_DOMAINS: KnowledgeDomain[] = [
  {
    id: "renaissance",
    title: "Brunelleschi Dome (1426 CE)",
    era: "Renaissance Guild Archive",
    source: "Opera di Santa Maria del Fiore",
    ual: "did:dkg:otp2043/0x918341/brunelleschi_herringbone",
    confidence: "99.8%",
    triplesCount: 24,
    mediaUrl: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=1200&auto=format&fit=crop&q=80",
    focalDescription: "Self-supporting herringbone brickwork without wooden centering.",
    sparqlTriple: "<Brunelleschi_Cupola> <masonryPattern> 'Spina di pesce (Herringbone)' ; <hoistDesign> 'Castagnaccio' .",
    merkleLeaf: "0x44921b7e90c10e39a25b17cf08819aa4",
    nodes: [
      { id: "brunelleschi", label: "Brunelleschi", type: "Architect", triple: "<Brunelleschi> <designed> <Cupola_di_Firenze>" },
      { id: "spina", label: "Spina di Pesce", type: "Pattern", triple: "<Cupola> <masonryPattern> 'Herringbone'" },
      { id: "florence", label: "Florence 1426", type: "Archive", triple: "<Event> <guildRecord> 'Opera_del_Duomo'" },
      { id: "vault", label: "Dual-Shell Vault", type: "Structural", triple: "<Shell> <interiorDiameter> '45.5m'" },
      { id: "hoist", label: "Castagnaccio Hoist", type: "Machinery", triple: "<Hoist> <reversibleDrive> 'OxenGear'" },
    ],
  },
  {
    id: "cern",
    title: "CERN LHC 125 GeV Higgs (2012)",
    era: "High-Energy Particle Physics",
    source: "CERN Open Data Portal / Zenodo",
    ual: "did:dkg:otp2043/0x918341/cern_higgs_2012",
    confidence: "99.9%",
    triplesCount: 38,
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    focalDescription: "Superconducting beam pipe 13 TeV proton collision.",
    sparqlTriple: "<CERN_LHC_ATLAS> <bosonMass> '125.09 GeV' ; <beamEnergy> '6.5 TeV per beam' .",
    merkleLeaf: "0x89c71a39d8820c5412b18991aa4921b7",
    nodes: [
      { id: "atlas", label: "ATLAS Detector", type: "Instrument", triple: "<ATLAS> <toroidMagnet> '4Tesla'" },
      { id: "resonance", label: "125.09 GeV Resonance", type: "Particle", triple: "<HiggsBoson> <invariantMass> '125.09GeV'" },
      { id: "beam", label: "13 TeV Proton Beam", type: "Telemetry", triple: "<LHC_Ring> <collisionEnergy> '13TeV'" },
      { id: "niobium", label: "Superconducting Niobium", type: "Cryogenics", triple: "<Cavity> <liquidHeliumTemp> '1.9K'" },
      { id: "zenodo", label: "Zenodo 2012 DOI", type: "Provenance", triple: "<RunRecord> <zenodoOpenData> '10.5281'" },
    ],
  },
  {
    id: "mariana",
    title: "Challenger Deep 10,928m",
    era: "Hadal Oceanographic Bathymetry",
    source: "NOAA Ocean Exploration Archives",
    ual: "did:dkg:otp2043/0x918341/mariana_hadal_vent",
    confidence: "99.6%",
    triplesCount: 19,
    mediaUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80",
    focalDescription: "Hadal benthic hydrothermal chimneys venting mineral plumes.",
    sparqlTriple: "<Challenger_Deep> <bathymetricDepth> '10928m' ; <hydrothermalVents> 'Serpentine' .",
    merkleLeaf: "0x12c98d71239aa87b66512398401928bc",
    nodes: [
      { id: "trench", label: "Mariana Trench", type: "Geography", triple: "<Mariana> <hadalZone> 'BenthicAxis'" },
      { id: "depth", label: "10,928m Depth", type: "Telemetry", triple: "<ChallengerDeep> <pressureBar> '1086bar'" },
      { id: "serpentine", label: "Serpentine Chimneys", type: "Mineralogy", triple: "<Vents> <methaneConcentration> 'High'" },
      { id: "dsv", label: "Titanium DSV", type: "Vessel", triple: "<DSV_LimitingFactor> <hullMaterial> 'Ti-6Al-4V'" },
      { id: "noaa", label: "NOAA Telemetry", type: "Provenance", triple: "<SoundingLog> <multibeamSonar> 'EM122'" },
    ],
  },
  {
    id: "apollo",
    title: "Apollo 11 Tranquility (1969 CE)",
    era: "Lunar Astronautics Archive",
    source: "NASA Apollo Lunar Surface Journal",
    ual: "did:dkg:otp2043/0x918341/apollo11_tranquility_base",
    confidence: "99.9%",
    triplesCount: 42,
    mediaUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&auto=format&fit=crop&q=80",
    focalDescription: "Descent engine plume displacing regolith at Mare Tranquillitatis.",
    sparqlTriple: "<LM_Eagle> <touchdownSite> '0.67408° N, 23.47297° E' ; <fuelRemaining> '25 seconds' .",
    merkleLeaf: "0x551982bca88172635418293710293847",
    nodes: [
      { id: "mare", label: "Mare Tranquillitatis", type: "Coordinates", triple: "<Touchdown> <lunarCoords> '0.67408N_23.47297E'" },
      { id: "eagle", label: "LM Eagle", type: "Spacecraft", triple: "<GrummanLM> <descentStage> 'DPS_Engine'" },
      { id: "fuel", label: "25s Fuel Threshold", type: "Telemetry", triple: "<DPS_Propellant> <quantityRemaining> '5.6%'" },
      { id: "agc", label: "Apollo Guidance Computer", type: "Avionics", triple: "<AGC_BlockII> <alarmCode> '1202_ExecutiveOverflow'" },
      { id: "nasa", label: "NASA ALSJ 1969", type: "Provenance", triple: "<TelemetryLog> <voiceTape> 'Houston_Tranquility'" },
    ],
  },
  {
    id: "alexandria",
    title: "Library of Alexandria (48 BCE)",
    era: "Hellenistic Antiquity Archive",
    source: "Ptolemaic Royal Papyrus Catalogues",
    ual: "did:dkg:otp2043/0x918341/alexandria_serapeum_scrolls",
    confidence: "99.4%",
    triplesCount: 31,
    mediaUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop&q=80",
    focalDescription: "Cedar scroll armaria housing astronomical and geometric codices.",
    sparqlTriple: "<Bibliotheca_Alexandrina> <scrollCount> '400000' ; <cataloguer> 'Callimachus' .",
    merkleLeaf: "0x992019abf18273619283719283719283",
    nodes: [
      { id: "mouseion", label: "Royal Mouseion", type: "Institution", triple: "<Mouseion> <patronage> 'Ptolemy_II_Philadelphus'" },
      { id: "pinakes", label: "Callimachus Pinakes", type: "Catalogue", triple: "<Pinakes> <tableCount> '120_Scrolls'" },
      { id: "math", label: "Euclid Elements", type: "Manuscript", triple: "<Codex> <geometricTheorems> 'Stoicheia'" },
      { id: "armaria", label: "Cedar Armaria", type: "Preservation", triple: "<Storage> <woodType> 'Cedrus_Libani'" },
      { id: "ptolemaic", label: "Ptolemaic DKG", type: "Provenance", triple: "<ArchivalLedger> <scribeSeal> 'BCE_48'" },
    ],
  },
];

interface ChronicleHeroSectionProps {
  onOpenInspector: () => void;
}

export function ChronicleHeroSection({ onOpenInspector }: ChronicleHeroSectionProps) {
  const [activeDomainIdx, setActiveDomainIdx] = useState(0);
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const [isAttesting, setIsAttesting] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  const currentDomain = KNOWLEDGE_DOMAINS[activeDomainIdx];
  const currentNode = currentDomain.nodes[activeNodeIdx] || currentDomain.nodes[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 1800);
  };

  const handleAttest = () => {
    setIsAttesting(true);
    cinematicAudio.play("mint");
    setTimeout(() => {
      setIsAttesting(false);
    }, 1200);
  };

  // 60 FPS Interactive Epistemic Astrolabe & Knowledge Graph Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 560);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    let angle = 0;
    let animId: number;

    const render = () => {
      angle += 0.005;

      // Deep Obsidian Cryptographic Stage
      ctx.fillStyle = "#07090e";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 3D Orbital Astrolabe Geometry
      const rings = [0.22, 0.38, 0.46];
      rings.forEach((scale, rIdx) => {
        const rx = width * scale;
        const ry = rx * 0.52;

        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = rIdx === 1 ? "rgba(251, 191, 36, 0.16)" : "rgba(52, 211, 153, 0.1)";
        ctx.lineWidth = 1;
        ctx.setLineDash(rIdx % 2 === 0 ? [3, 9] : []);
        ctx.stroke();
        ctx.setLineDash([]);

        // Orbital Astrolabe Calibrations
        const ticks = 16;
        for (let t = 0; t < ticks; t++) {
          const tAngle = (t / ticks) * Math.PI * 2 + angle * (rIdx % 2 === 0 ? 0.3 : -0.2);
          const tx = cx + Math.cos(tAngle) * rx;
          const ty = cy + Math.sin(tAngle) * ry;
          ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
          ctx.fillRect(tx - 1, ty - 1, 2, 2);
        }
      });

      // OriginTrail Central Core
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#0d111c";
      ctx.fill();
      ctx.strokeStyle = "rgba(251, 191, 36, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#fbbf24";
      ctx.fill();

      // Draw Domain Entity Nodes along the 3D Elliptical Orbit
      const currentNodes = currentDomain.nodes;
      const count = currentNodes.length;
      const orbitRx = width * 0.38;
      const orbitRy = orbitRx * 0.52;

      currentNodes.forEach((node, idx) => {
        const nodeAngle = (idx / count) * Math.PI * 2 + angle;
        const nx = cx + Math.cos(nodeAngle) * orbitRx;
        const ny = cy + Math.sin(nodeAngle) * orbitRy;
        const isSelected = activeNodeIdx === idx;

        // Radiating Cryptographic Vector Edge to OriginTrail Core
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = isSelected
          ? "rgba(251, 191, 36, 0.65)"
          : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = isSelected ? 1.5 : 0.8;
        ctx.stroke();

        // Node Outer Halo
        ctx.beginPath();
        ctx.arc(nx, ny, isSelected ? 10 : 6, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "rgba(251, 191, 36, 0.2)" : "rgba(52, 211, 153, 0.1)";
        ctx.fill();

        // Node Core
        ctx.beginPath();
        ctx.arc(nx, ny, isSelected ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#fbbf24" : "#34d399";
        ctx.fill();

        // Node Label
        ctx.font = isSelected ? "bold 10px 'JetBrains Mono', monospace" : "9px 'JetBrains Mono', monospace";
        ctx.fillStyle = isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.55)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, nx, ny + (isSelected ? 18 : 15));
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentDomain, activeNodeIdx]);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#05070a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Eyebrow Status Pill */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-xs font-mono text-zinc-300 shadow-[0_0_20px_rgba(251,191,36,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
            <span className="text-[#fbbf24] font-semibold">ORIGINTRAIL DKG v8</span>
            <span className="text-zinc-600">·</span>
            <span>NEUROWEB OTP:2043</span>
            <span className="text-zinc-600">·</span>
            <span className="text-[#34d399] font-bold">RFC-6962 MERKLE PROOF</span>
          </div>
        </div>

        {/* Master Display Heading */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-syne font-extrabold tracking-tight text-white leading-[1.08] mb-5">
            THE DECENTRALIZED KNOWLEDGE GRAPH <br className="hidden sm:inline" />
            <span className="font-cinzel font-normal italic bg-gradient-to-r from-[#fbbf24] via-[#fcd34d] to-[#34d399] bg-clip-text text-transparent">
              for Verifiable Generative Truth
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-sans leading-relaxed px-2">
            Ground Livepeer neural diffusion in immutable OriginTrail Knowledge Graphs. Every scene mathematically attested to verified archival and scientific SPARQL triples with cryptographic Merkle proof passports.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link
            href={`/studio?query=${encodeURIComponent(currentDomain.title)}`}
            onClick={() => cinematicAudio.play("mint")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-heading font-bold text-black bg-gradient-to-r from-[#fbbf24] via-[#fcd34d] to-[#fbbf24] shadow-[0_16px_36px_-6px_rgba(251,191,36,0.4),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_20px_44px_-6px_rgba(251,191,36,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Enter Epistemic Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              cinematicAudio.play("click");
              onOpenInspector();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono text-zinc-200 bg-[#0e121a]/90 border border-white/15 shadow-[0_12px_24px_-6px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.14)] hover:bg-[#141a24] hover:border-white/25 hover:text-white hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Fingerprint className="w-4 h-4 text-[#34d399]" />
            <span>Inspect Merkle Ledger</span>
          </button>
        </div>

        {/* Knowledge Domain Category Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mb-8 max-w-4xl mx-auto px-2">
          {KNOWLEDGE_DOMAINS.map((domain, idx) => {
            const isSelected = activeDomainIdx === idx;
            return (
              <button
                key={domain.id}
                onClick={() => {
                  setActiveDomainIdx(idx);
                  setActiveNodeIdx(0);
                  cinematicAudio.play("node");
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[#141824] text-white border border-[#fbbf24]/60 shadow-[0_8px_20px_-4px_rgba(251,191,36,0.38)] scale-[1.02]"
                    : "bg-white/[0.03] text-zinc-400 border border-white/[0.08] hover:bg-white/[0.06] hover:text-zinc-200"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isSelected ? "#fbbf24" : "rgba(255,255,255,0.2)",
                    boxShadow: isSelected ? "0 0 8px #fbbf24" : "none",
                  }}
                />
                <span className="font-sans font-medium">{domain.title}</span>
                <span className="text-[10px] text-zinc-500 hidden md:inline">· {domain.era}</span>
              </button>
            );
          })}
        </div>

        {/* DUAL-PANEL EPISTEMIC OBSERVATORY (KNOWLEDGE GRAPH + VERIFIED ARTIFACT) */}
        <div className="relative mx-auto max-w-5xl rounded-2xl bg-[#090c14] border border-white/15 p-3 sm:p-5 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)]">
          
          {/* Top Bar Observatory Header */}
          <div className="flex items-center justify-between px-2 pb-3 mb-3 border-b border-white/10 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2.5">
              <Database className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span className="font-semibold text-zinc-200 uppercase tracking-wider">
                OriginTrail DKG v8 Knowledge Observatory
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                <span>{currentDomain.confidence} Epistemic Quorum</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <span className="text-zinc-500">Archive:</span>
              <span className="text-[#fbbf24] font-medium">{currentDomain.source}</span>
            </div>
          </div>

          {/* Master 2-Column Split: 3D Knowledge Graph Canvas + Verified Grounded Artifact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            
            {/* LEFT 7 COLUMNS: Interactive 3D Epistemic Knowledge Graph Canvas */}
            <div className="lg:col-span-7 flex flex-col rounded-xl bg-[#06080e] border border-white/10 overflow-hidden p-3 relative">
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                  <Network className="w-3.5 h-3.5 text-[#22d3ee]" />
                  <span className="text-xs font-mono font-bold text-zinc-200">
                    Epistemic Entity Constellation
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">
                  Click nodes to inspect SPARQL assertions
                </span>
              </div>

              {/* 3D Canvas */}
              <div className="relative h-64 sm:h-72 w-full rounded-lg overflow-hidden border border-white/5 bg-[#07090e]">
                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* In-Graph Overlaid Active Node Badge */}
                <div className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-md bg-black/80 border border-[#fbbf24]/30 backdrop-blur-sm text-[9.5px] font-mono">
                  <span className="text-[#fbbf24] font-bold">ACTIVE NODE: </span>
                  <span className="text-zinc-200">{currentNode.label}</span>
                  <span className="text-zinc-500 ml-1.5">({currentNode.type})</span>
                </div>
              </div>

              {/* Interactive Node Pills Row */}
              <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mr-1">
                  Nodes:
                </span>
                {currentDomain.nodes.map((node, nIdx) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      setActiveNodeIdx(nIdx);
                      cinematicAudio.play("click");
                    }}
                    className={`px-2.5 py-1 rounded text-[9.5px] font-mono transition-all active:translate-y-[0.5px] ${
                      activeNodeIdx === nIdx
                        ? "bg-[#fbbf24] text-black font-bold shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                        : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                    }`}
                  >
                    {node.label}
                  </button>
                ))}
              </div>

              {/* Active SPARQL Assertion Display */}
              <div className="mt-2.5 p-2 rounded-lg bg-black/60 border border-white/10 text-[9.5px] font-mono text-zinc-300 flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[#34d399] font-bold shrink-0">RDF:</span>
                  <span className="text-[#34d399] truncate">{currentNode.triple}</span>
                </div>
                <button
                  onClick={() => handleCopy(currentNode.triple, "triple")}
                  className="text-zinc-400 hover:text-white shrink-0 ml-2 p-1 transition-colors"
                  title="Copy SPARQL Triple"
                >
                  {copiedItem === "triple" ? <Check className="w-3 h-3 text-[#10b981]" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* RIGHT 5 COLUMNS: Verified Archival Media Still & Merkle Proof Passport */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-[#06080e] border border-white/10 p-3 space-y-3">
              
              {/* Media Still */}
              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-white/15 bg-black group">
                <img
                  src={currentDomain.mediaUrl}
                  alt={currentDomain.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Archival Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/75 border border-white/15 text-zinc-200 backdrop-blur-sm">
                    {currentDomain.era}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] font-semibold backdrop-blur-sm">
                    {currentDomain.confidence} DKG SEALED
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 text-[9px] font-mono text-zinc-300 line-clamp-2 bg-black/75 p-1.5 rounded border border-white/10 backdrop-blur-sm">
                  {currentDomain.focalDescription}
                </div>
              </div>

              {/* Cryptographic Passport Telemetry Card */}
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 space-y-1.5 text-[9.5px] font-mono">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-1.5 text-[#fbbf24] font-bold">
                    <Binary className="w-3 h-3" />
                    <span>RFC-6962 Merkle Leaf:</span>
                  </span>
                  <button
                    onClick={() => handleCopy(currentDomain.merkleLeaf, "leaf")}
                    className="hover:text-white flex items-center gap-1 text-[8.5px]"
                  >
                    {copiedItem === "leaf" ? <Check className="w-2.5 h-2.5 text-[#10b981]" /> : <Copy className="w-2.5 h-2.5" />}
                    <span>{copiedItem === "leaf" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="text-zinc-300 truncate bg-white/[0.03] p-1 rounded border border-white/5">
                  {currentDomain.merkleLeaf}
                </div>

                <div className="flex items-center justify-between pt-1 text-zinc-400">
                  <span className="text-zinc-500">Knowledge Asset UAL:</span>
                  <span className="text-[#34d399] font-bold truncate max-w-[160px]">{currentDomain.ual}</span>
                </div>
              </div>

              {/* Attestation Action & Link to Studio */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleAttest}
                  disabled={isAttesting}
                  className="py-2 px-3 rounded-lg bg-gradient-to-b from-[#fcd34d] to-[#d97706] text-black font-heading font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_6px_rgba(251,191,36,0.3)] hover:brightness-110 active:translate-y-[0.5px] transition-all disabled:opacity-50 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isAttesting ? "Attesting..." : "Attest Asset"}</span>
                </button>

                <Link
                  href={`/studio?query=${encodeURIComponent(currentDomain.title)}`}
                  onClick={() => cinematicAudio.play("click")}
                  className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Open in Studio</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

          {/* Quick SPARQL Ingestion Bar */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#fbbf24]" />
              <span>SPARQL Ingest:</span>
            </span>

            {[
              { label: "Verify Herringbone Geometry", domainIdx: 0 },
              { label: "Query 125 GeV ATLAS Resonance", domainIdx: 1 },
              { label: "Validate 10,928m Serpentine Vents", domainIdx: 2 },
              { label: "Attest Tranquillitatis Coordinates", domainIdx: 3 },
            ].map((cmd) => (
              <button
                key={cmd.label}
                onClick={() => {
                  setActiveDomainIdx(cmd.domainIdx);
                  setActiveNodeIdx(0);
                  cinematicAudio.play("click");
                }}
                className={`shrink-0 px-3 py-1 rounded-full border text-[10px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeDomainIdx === cmd.domainIdx
                    ? "bg-[#fbbf24]/15 border-[#fbbf24] text-[#fbbf24] font-bold"
                    : "bg-white/[0.03] border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                <span>{cmd.label}</span>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
