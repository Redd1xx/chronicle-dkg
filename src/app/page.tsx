"use client";

import React, { useState } from "react";
import { KnowledgeMeshBackground } from "@/components/KnowledgeMeshBackground";
import { LandingHeader } from "@/components/LandingHeader";
import { ProofInspectorModal } from "@/components/ProofInspectorModal";
import { UalMintModal } from "@/components/UalMintModal";
import { ChronicleHeroSection } from "@/components/landing/ChronicleHeroSection";
import { KnowledgeReelMarquee, KnowledgeAssertionCard } from "@/components/landing/KnowledgeReelMarquee";
import { InteractiveMerkleSandbox } from "@/components/landing/InteractiveMerkleSandbox";
import { EpistemicPipelineSection } from "@/components/landing/EpistemicPipelineSection";
import { SovereignCertificateSection } from "@/components/landing/SovereignCertificateSection";
import { ChronicleFooter } from "@/components/landing/ChronicleFooter";
import { ChronicleShot, DkgKnowledgeGraph } from "@/lib/types";
import { getDkgKnowledgeGraph } from "@/lib/dkg-client";

const DEFAULT_LANDING_SHOT: ChronicleShot = {
  id: "shot-florence-1426",
  sceneNumber: 1,
  title: "Brunelleschi Dome Vault Herringbone Masons",
  framing: "2.39:1 Anamorphic Scope",
  action: "Masons laying herringbone brickwork without wooden centering",
  cameraMotion: "Monumental ascending crane arc through Tuscan twilight",
  prompt: "Authentic 35mm celluloid frame, Filippo Brunelleschi inspecting the herringbone brick vault of Florence Cathedral in 1426, self-supporting spina di pesce masonry.",
  groundingFacts: [
    "<Brunelleschi_Cupola> <masonryPattern> 'Spina di pesce (Herringbone)'",
    "<internalSpan> '45.5m' ; <hoistDesign> 'Castagnaccio Double-Reversible'"
  ],
  voiceoverScript: "In 1426, four million bricks rose into the Florentine sky without wooden centering.",
  durationSec: 6,
  status: "settled",
  videoUrl: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=1200&auto=format&fit=crop&q=80",
  posterUrl: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=1200&auto=format&fit=crop&q=80",
  c2paHash: "0x44921b7e90c10e39a25b17cf08819aa4",
  ual: "did:dkg:otp:2043/0x5cae0019b88219cb4400e31988af021c/1426",
  orchestratorNode: "agent.livepeer.org/api/mcp/creative (RTX 4090 Swarm)"
};

const DEFAULT_LANDING_GRAPH: DkgKnowledgeGraph = getDkgKnowledgeGraph("Florence Brunelleschi Dome 1426, authentic herringbone brickwork");

export default function ChronicleLandingPage() {
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [activeShot, setActiveShot] = useState<ChronicleShot>(DEFAULT_LANDING_SHOT);

  const handleOpenInspector = () => {
    setIsInspectorOpen(true);
  };

  const handleOpenMintModal = () => {
    setIsMintModalOpen(true);
  };

  const handleSelectAssertionFromMarquee = (item: KnowledgeAssertionCard) => {
    setActiveShot({
      ...DEFAULT_LANDING_SHOT,
      id: item.id,
      title: item.title,
      groundingFacts: [item.sparqlTriple],
      ual: item.ual,
      c2paHash: item.merkleLeaf,
      posterUrl: item.image,
      videoUrl: item.image
    });
    setIsInspectorOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#05070a] text-zinc-100 overflow-x-hidden selection:bg-[#fbbf24]/30 selection:text-white">
      {/* 60fps Living Cryptographic Astrolabe Canvas Background */}
      <KnowledgeMeshBackground />

      {/* Global Landing Navigation Header */}
      <LandingHeader onOpenInspector={handleOpenInspector} />

      {/* Main Page Flow */}
      <main className="relative z-10">
        {/* 1. Cinematic Archival Hero & Screening Viewport */}
        <ChronicleHeroSection onOpenInspector={handleOpenInspector} />

        {/* 2. Living Knowledge Marquee Stream */}
        <KnowledgeReelMarquee
          onSelectAssertion={handleSelectAssertionFromMarquee}
          onOpenProofInspector={handleOpenInspector}
        />

        {/* 3. Interactive RFC-6962 Merkle Proof Sandbox */}
        <InteractiveMerkleSandbox onOpenProofInspector={handleOpenInspector} />

        {/* 4. Epistemic Architecture & Pipeline Console (Zero Slop / No Repeating Card Grids) */}
        <EpistemicPipelineSection />

        {/* 5. Sovereign Knowledge Asset Certificate & Master CTA */}
        <SovereignCertificateSection
          onOpenMintModal={handleOpenMintModal}
          onOpenProofInspector={handleOpenInspector}
        />
      </main>

      {/* 6. Clean Typographic Protocol Footer */}
      <ChronicleFooter />

      {/* Interactive Cryptographic Inspection Modal */}
      <ProofInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        shot={activeShot}
      />

      {/* Interactive Sovereign UAL Minting Modal */}
      <UalMintModal
        isOpen={isMintModalOpen}
        onClose={() => setIsMintModalOpen(false)}
        activeShot={activeShot}
        graph={DEFAULT_LANDING_GRAPH}
      />
    </div>
  );
}
