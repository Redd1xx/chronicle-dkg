"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Database, CheckCircle2, Download, Copy, ExternalLink, Sparkles } from "lucide-react";
import { ChronicleShot, DkgKnowledgeGraph, UalMintReceipt } from "../lib/types";
import { mintUalKnowledgeAsset } from "../lib/dkg-client";
import { cinematicAudio } from "../lib/cinematic-audio";

interface UalMintModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeShot: ChronicleShot;
  graph: DkgKnowledgeGraph;
}

export function UalMintModal({
  isOpen,
  onClose,
  activeShot,
  graph,
}: UalMintModalProps) {
  const [receipt, setReceipt] = useState<UalMintReceipt | null>(null);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleMint = async () => {
    setIsMinting(true);
    try {
      const newReceipt = await mintUalKnowledgeAsset(activeShot, graph);
      setReceipt(newReceipt);
      cinematicAudio.play("mint");
    } finally {
      setIsMinting(false);
    }
  };

  const handleCopyUal = () => {
    const textToCopy = receipt ? receipt.ual : activeShot.ual;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadManifest = () => {
    const manifest = {
      "@context": "https://schema.org/",
      "@type": "VideoObject",
      "name": activeShot.title,
      "description": activeShot.action,
      "ual": receipt ? receipt.ual : activeShot.ual,
      "c2pa": {
        "hash": activeShot.c2paHash,
        "standard": "C2PA v1.4",
        "generator": "Livepeer Neural Video Engine",
        "groundingGraph": graph.ualRoot,
        "truthConfidence": graph.factAdherenceScore / 100,
      },
      "originTrailDkg": {
        "network": "NeuroWeb Testnet (otp:2043)",
        "assertionId": receipt?.assertionId || "0x94b1c8e...",
        "transactionHash": receipt?.transactionHash || "0x12a9e...",
        "triplesCount": receipt?.triplesCount || graph.nodes.length * 2,
      },
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dkg-knowledge-asset-${activeShot.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="max-w-2xl w-full rounded-2xl bg-[#090c14] border border-white/15 p-6 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#34d399]/10 border border-[#34d399]/30 flex items-center justify-center text-[#34d399]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white text-base tracking-tight">
                  OriginTrail DKG Knowledge Asset Publisher
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#34d399]/10 border border-[#34d399]/30 text-[#34d399]">
                  Track 1
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Verifiable C2PA Media Manifest on NeuroWeb Testnet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="my-4 space-y-4 overflow-y-auto flex-1 font-mono text-xs">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">TARGET SHOT:</span>
              <span className="text-white font-bold">
                0{activeShot.sceneNumber} · {activeShot.title}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">C2PA CONTENT HASH:</span>
              <span className="text-[#22d3ee]">{activeShot.c2paHash}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">LIVEPEER ORCHESTRATOR:</span>
              <span className="text-zinc-300">{activeShot.orchestratorNode}</span>
            </div>
          </div>

          {/* UAL Display */}
          <div className="p-3 rounded-xl bg-black/60 border border-[#34d399]/30">
            <span className="text-[10px] text-zinc-500 uppercase block mb-1 font-bold">
              Uniform Asset Locator (UAL)
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#34d399] font-bold truncate text-xs">
                {receipt ? receipt.ual : activeShot.ual}
              </span>
              <button
                onClick={handleCopyUal}
                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-zinc-300 transition-colors shrink-0"
                title="Copy UAL"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {receipt && (
            <div className="p-3.5 rounded-xl bg-[#34d399]/10 border border-[#34d399]/40 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-[#34d399] font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Knowledge Asset Minted Successfully to NeuroWeb</span>
              </div>
              <div className="text-zinc-300 flex justify-between">
                <span>Tx Hash:</span>
                <span className="text-zinc-400 font-mono">{receipt.transactionHash.slice(0, 22)}...</span>
              </div>
              <div className="text-zinc-300 flex justify-between">
                <span>Assertion ID:</span>
                <span className="text-zinc-400 font-mono">{receipt.assertionId.slice(0, 22)}...</span>
              </div>
              <div className="text-zinc-300 flex justify-between">
                <span>Block:</span>
                <span className="text-zinc-400">#{receipt.blockNumber}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 shrink-0">
          <button
            onClick={handleDownloadManifest}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download C2PA Manifest (.json)</span>
          </button>

          <div className="flex items-center gap-2">
            {!receipt ? (
              <button
                onClick={handleMint}
                disabled={isMinting}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold text-black bg-gradient-to-r from-[#34d399] to-[#22d3ee] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isMinting ? "Minting to DKG..." : "Mint Knowledge Asset"}</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-black bg-[#34d399] hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
