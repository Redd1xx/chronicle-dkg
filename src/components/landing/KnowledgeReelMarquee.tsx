"use client";

import React, { memo } from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  ExternalLink, 
  Database, 
  Cpu, 
  Clock, 
  Flame, 
  Sparkles,
  Fingerprint
} from "lucide-react";
import { cinematicAudio } from "@/lib/cinematic-audio";

export interface KnowledgeAssertionCard {
  id: string;
  domain: string;
  epoch: string;
  title: string;
  image: string;
  sparqlTriple: string;
  ual: string;
  merkleLeaf: string;
  confidence: string;
  publisher: string;
  tags: string[];
}

const KNOWLEDGE_REEL_DATA: KnowledgeAssertionCard[] = [
  {
    id: "reel-1",
    domain: "Renaissance Engineering",
    epoch: "1426 CE",
    title: "Brunelleschi Dome Vault Geometry",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=1200&auto=format&fit=crop&q=80",
    sparqlTriple: "<Brunelleschi_Cupola> <masonryPattern> 'Spina di pesce (Herringbone)' ; <internalSpan> '45.5m' .",
    ual: "did:dkg:otp:2043/0x5cae...810a/1426",
    merkleLeaf: "0x44921b7e90c10e39a2",
    confidence: "99.94%",
    publisher: "Florence Archival State Repository",
    tags: ["Masonry", "Archival 35mm", "C2PA Verified"]
  },
  {
    id: "reel-2",
    domain: "Quantum Physics",
    epoch: "2012 CE",
    title: "CERN LHC Higgs Boson Diphoton",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    sparqlTriple: "<CERN_LHC_CMS> <bosonMassResonance> '125.09 GeV/c^2' ; <discoverySignificance> '5.0 sigma' .",
    ual: "did:dkg:otp:2043/0x78ab...91cc/2012",
    merkleLeaf: "0x88214fa1d8e032ff90",
    confidence: "99.99%",
    publisher: "CERN Open Data Portal",
    tags: ["High Energy", "Diphoton Peak", "OriginTrail DKG"]
  },
  {
    id: "reel-3",
    domain: "Oceanographic Extremes",
    epoch: "Hadal Bathymetry",
    title: "Challenger Deep Hydrothermal Chimney",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80",
    sparqlTriple: "<Mariana_ChallengerDeep> <hydrostaticPressure> '108.6 MPa' ; <ventFluidTemp> '380°C' .",
    ual: "did:dkg:otp:2043/0x9183...31b9/10928",
    merkleLeaf: "0x91834cf8019aa731b9",
    confidence: "99.87%",
    publisher: "NOAA Ocean Exploration Archive",
    tags: ["Abyssal 10928m", "Chemosynthesis", "Verifiable Seed"]
  },
  {
    id: "reel-4",
    domain: "Lunar Exploration",
    epoch: "1969 CE",
    title: "Apollo 11 Tranquility Descent Radar",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&auto=format&fit=crop&q=80",
    sparqlTriple: "<Apollo11_LM> <radarAltitudeAtTouchdown> '0.0m' ; <agcProgramStatus> '1202 Alarm Resolved' .",
    ual: "did:dkg:otp:2043/0x3344...bb71/1969",
    merkleLeaf: "0x3344f6a9e10dcae441",
    confidence: "99.98%",
    publisher: "NASA Historical Data Archival",
    tags: ["AGC Guidance", "Lunar Descent", "Cryptographic Provenance"]
  },
  {
    id: "reel-5",
    domain: "Antiquity & Cartography",
    epoch: "48 BCE",
    title: "Library of Alexandria Astrolabe Catalog",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop&q=80",
    sparqlTriple: "<Alexandria_Mouseion> <scrollCatalogCount> '490000 papyri' ; <eratosthenesMeasurement> 'Circumference Earth' .",
    ual: "did:dkg:otp:2043/0x1122...ee99/0048",
    merkleLeaf: "0x1122cc77aa4488ef99",
    confidence: "99.91%",
    publisher: "Hellenistic Antiquities Institute",
    tags: ["Papyrus Scroll", "Ptolemaic Dynasty", "C2PA Manifest"]
  },
  {
    id: "reel-6",
    domain: "Deep Space Astronomy",
    epoch: "2022 CE",
    title: "JWST Carina Nebula Cosmic Cliffs",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    sparqlTriple: "<JWST_NIRCam> <targetFOV> 'NGC 3324 Cosmic Cliffs' ; <infraredBandpass> '0.6 to 5 microns' .",
    ual: "did:dkg:otp:2043/0xbb55...cc12/2022",
    merkleLeaf: "0xbb5542a19ef0018821",
    confidence: "99.96%",
    publisher: "Space Telescope Science Institute",
    tags: ["Infrared Astronomy", "Sub-arcsecond", "Livepeer Diffusion"]
  }
];

interface KnowledgeReelMarqueeProps {
  onSelectAssertion?: (assertion: KnowledgeAssertionCard) => void;
  onOpenProofInspector: () => void;
}

export const KnowledgeReelMarquee = memo(function KnowledgeReelMarquee({
  onSelectAssertion,
  onOpenProofInspector
}: KnowledgeReelMarqueeProps) {
  const handleCardClick = (item: KnowledgeAssertionCard) => {
    cinematicAudio.play("click");
    if (onSelectAssertion) {
      onSelectAssertion(item);
    }
  };

  return (
    <section id="knowledge-genome" className="relative py-24 bg-[#05070a] border-y border-white/[0.06] overflow-hidden select-none">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#fbbf24] shadow-[0_0_8px_#fbbf24]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#fbbf24]">
                Living Knowledge Marquee
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-[11px] font-mono text-zinc-500">
                OriginTrail DKG SPARQL Registry
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none">
              THE VERIFIABLE MEDIA GENOME
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans max-w-2xl leading-relaxed">
              Every frame generated by our decentralized Livepeer swarm is anchored to an immutable RDF knowledge graph leaf on NeuroWeb, backed by RFC-6962 cryptographic proof hashes.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                cinematicAudio.play("node");
                onOpenProofInspector();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#fbbf24]/50 transition-all cursor-pointer shadow-sm group"
            >
              <Fingerprint className="w-4 h-4 text-[#34d399] group-hover:scale-110 transition-transform" />
              <span>Launch Proof Inspector</span>
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Track 1: Leftward Stream */}
      <div className="relative w-full overflow-hidden group">
        {/* Hardware-accelerated infinite conveyor track */}
        <div 
          className="flex w-max gap-6 animate-carousel-left group-hover:[animation-play-state:paused]"
          style={{ willChange: "transform", contain: "paint layout" }}
        >
          {/* Double items for seamless infinite loop */}
          {[...KNOWLEDGE_REEL_DATA, ...KNOWLEDGE_REEL_DATA].map((item, idx) => (
            <div
              key={`${item.id}-l1-${idx}`}
              onClick={() => handleCardClick(item)}
              className="w-[360px] sm:w-[420px] flex-shrink-0 rounded-xl bg-[#0c1017] border border-white/10 hover:border-[#fbbf24]/60 p-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.12)] cursor-pointer group/card flex flex-col justify-between"
              style={{ contain: "paint" }}
            >
              {/* Media Preview Box */}
              <div className="relative h-48 w-full rounded-lg overflow-hidden bg-black/60 mb-3 border border-white/5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="420px"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-transparent to-black/30" />

                {/* Top Badge: Epoch & Confidence */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-black/80 text-[#fbbf24] border border-[#fbbf24]/30 backdrop-blur-sm">
                    {item.epoch}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 text-[#34d399] border border-[#34d399]/30 text-[10px] font-mono">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{item.confidence}</span>
                  </div>
                </div>

                {/* Domain Pill */}
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-300 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    {item.domain}
                  </span>
                </div>
              </div>

              {/* Title & Archival Metadata */}
              <div className="space-y-2">
                <h3 className="font-syne font-bold text-base text-white group-hover/card:text-[#fbbf24] transition-colors line-clamp-1">
                  {item.title}
                </h3>

                {/* SPARQL Triple Box */}
                <div className="p-2 rounded bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-300 leading-relaxed font-normal">
                  <div className="text-[9px] text-[#fbbf24]/80 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Database className="w-2.5 h-2.5" />
                    <span>RDF Assertion Triple</span>
                  </div>
                  <p className="line-clamp-2 text-zinc-300 font-mono text-[10px]">
                    {item.sparqlTriple}
                  </p>
                </div>

                {/* Cryptographic Leaf & UAL */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500">Leaf:</span>
                    <span className="text-zinc-300">{item.merkleLeaf}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#fbbf24] group-hover/card:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ambient Vignette Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#05070a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#05070a] to-transparent z-10" />
      </div>

      {/* Marquee Track 2: Reverse Rightward Stream */}
      <div className="relative w-full overflow-hidden mt-6 group">
        <div 
          className="flex w-max gap-6 animate-carousel-right group-hover:[animation-play-state:paused]"
          style={{ willChange: "transform", contain: "paint layout" }}
        >
          {[...KNOWLEDGE_REEL_DATA.slice().reverse(), ...KNOWLEDGE_REEL_DATA.slice().reverse()].map((item, idx) => (
            <div
              key={`${item.id}-r2-${idx}`}
              onClick={() => handleCardClick(item)}
              className="w-[340px] sm:w-[380px] flex-shrink-0 rounded-xl bg-[#0a0e14] border border-white/5 hover:border-[#34d399]/60 p-3.5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.1)] cursor-pointer group/card flex flex-col justify-between"
              style={{ contain: "paint" }}
            >
              <div className="flex items-center justify-between mb-2 text-[10px] font-mono">
                <span className="text-zinc-400 truncate max-w-[200px]">{item.publisher}</span>
                <span className="text-[#34d399] font-semibold">{item.confidence} Verified</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black/60 border border-white/10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="64px"
                    className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-syne font-bold text-xs text-white group-hover/card:text-[#34d399] transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="font-mono text-[10px] text-zinc-400 truncate mt-0.5">
                    {item.ual}
                  </p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ambient Vignette Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#05070a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#05070a] to-transparent z-10" />
      </div>
    </section>
  );
});
