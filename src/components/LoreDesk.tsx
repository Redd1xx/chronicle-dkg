"use client";

import React from "react";
import { Database, Terminal, Shield, CheckCircle2, ChevronRight, Layers, Sparkles, Copy, Check } from "lucide-react";
import { DkgKnowledgeGraph, DkgEntityNode } from "../lib/types";
import { SAMPLE_TOPICS } from "../lib/dkg-client";
import { cinematicAudio } from "../lib/cinematic-audio";

interface LoreDeskProps {
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  graph: DkgKnowledgeGraph;
  selectedNode: DkgEntityNode | null;
  onGroundAndDirect: () => void;
  isDirecting: boolean;
}

export function LoreDesk({
  selectedTopicId,
  onSelectTopic,
  graph,
  selectedNode,
  onGroundAndDirect,
  isDirecting,
}: LoreDeskProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 h-full overflow-y-auto">
      {/* 1. DKG Entity Ingestion Matrix */}
      <div className="bg-[#090d16] border border-white/10 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#34d399]/15 border border-[#34d399]/30 flex items-center justify-center text-[#34d399]">
              <Database className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-heading font-bold uppercase tracking-tight text-white">
              DKG Entity Ingestion
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded border border-[#34d399]/20">
            UAL: {graph.ualRoot.slice(0, 16)}...
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {SAMPLE_TOPICS.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  onSelectTopic(topic.id);
                  cinematicAudio.play("click");
                }}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? "bg-[#34d399]/10 border-[#34d399]/70 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-semibold">
                    {topic.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#34d399] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Truth
                  </span>
                </div>
                <h4 className="text-xs font-heading font-bold text-white truncate">
                  {topic.title}
                </h4>
                <p className="text-[11px] font-sans text-zinc-400 mt-0.5 line-clamp-1">
                  {topic.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Live NeuroWeb SPARQL Terminal (IDE-Grade Aesthetics) */}
      <div className="bg-[#07090e] border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col gap-2">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#22d3ee]" />
            <span className="text-xs font-heading font-bold uppercase text-white">
              NeuroWeb SPARQL Query Terminal
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">OTP-2043 · v6.1 JSON-LD</span>
        </div>

        <div className="p-3 rounded-xl bg-black/80 border border-white/5 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
          <pre className="text-[#22d3ee] font-mono">{graph.sparqlQuery}</pre>
        </div>

        <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-zinc-400">
          <span>Execution Time: <span className="text-[#34d399]">1.8ms</span></span>
          <span className="text-zinc-500">Deterministic SPARQL 1.1</span>
        </div>
      </div>

      {/* 3. Verified Entity Triples & Constraints */}
      <div className="bg-[#090d16] border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col gap-3 flex-1 min-h-[160px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span className="text-xs font-heading font-bold uppercase text-white">
              Verified Fact Constraints (All Nodes)
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#34d399] font-bold">
            {graph.factAdherenceScore}% Confidence
          </span>
        </div>

        <div className="space-y-2 overflow-y-auto flex-1 max-h-[220px]">
          {graph.nodes.flatMap((node) =>
            node.triples.map((t, idx) => (
              <div
                key={`${node.id}-${idx}`}
                className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px] flex items-center justify-between hover:border-white/15 transition-colors"
              >
                <div className="truncate pr-2">
                  <span className="text-[#fbbf24]">{t.subject}</span>
                  <span className="text-zinc-500"> :: </span>
                  <span className="text-[#22d3ee]">{t.predicate}</span>
                  <span className="text-zinc-500"> -&gt; </span>
                  <span className="text-white">{t.object}</span>
                </div>
                <span className="text-[10px] text-[#34d399] font-semibold shrink-0">
                  {Math.round(t.confidence * 100)}%
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
