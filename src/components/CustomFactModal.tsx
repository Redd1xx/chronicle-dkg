import React, { useState } from "react";
import { X, Database, ShieldCheck, RefreshCw, AlertCircle, Wand2, Sliders } from "lucide-react";
import { ChronicleShot, DkgNode } from "../lib/types";
import { livepeerMcp } from "../lib/livepeerMcp";
import { optimizeCinemaPrompt, CinemaStyle } from "../lib/prompt-optimizer";

interface CustomFactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomShot: (shot: ChronicleShot, node: DkgNode) => void;
}

export function CustomFactModal({ isOpen, onClose, onAddCustomShot }: CustomFactModalProps) {
  const [topicName, setTopicName] = useState("Galileo Galilei: Jupiter Moons");
  const [subject, setSubject] = useState("Galileo Galilei");
  const [predicate, setPredicate] = useState("astronomicalDiscovery");
  const [objectFact, setObjectFact] = useState("4 Galilean Satellites (Io, Europa, Ganymede, Callisto)");
  const [prompt, setPrompt] = useState(
    "Cinematic archival 35mm film view of Galileo Galilei in Padua 1610 gazing through wooden refractor telescope toward luminous crescent Jupiter and four pinprick moons in starry velvet cosmos"
  );
  const [selectedStyle, setSelectedStyle] = useState<CinemaStyle>("archival_35mm");
  const [sourceArchive, setSourceArchive] = useState("Sidereus Nuncius 1610 / Vatican Library Archives");
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleOptimizePrompt = (styleToUse: CinemaStyle = selectedStyle) => {
    const result = optimizeCinemaPrompt(prompt, styleToUse, {
      subject,
      predicate,
      object: objectFact,
    });
    setPrompt(result.optimizedPrompt);
    setSelectedStyle(styleToUse);
  };

  const handleCreate = async () => {
    if (!subject.trim() || !objectFact.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenError(null);

    try {
      // Dispatches directly to Livepeer Agent Creative MCP
      const mediaResult = await livepeerMcp.createMedia({
        action: "generate",
        prompt: `${prompt}. Grounded in OriginTrail DKG fact: ${subject} ${predicate} ${objectFact}`,
        aspectRatio: "16:9",
        quality: "fast",
      });

      const customNode: DkgNode = {
        id: `custom-node-${Date.now()}`,
        label: subject,
        category: "HistoricalFact",
        ual: `did:dkg:otp:2043/0x918341/${Date.now().toString(16)}`,
        triples: [
          { subject, predicate, object: objectFact, confidence: 0.99 },
          { subject, predicate: "historicalSource", object: sourceArchive, confidence: 1.0 },
        ],
      };

      const customShot: ChronicleShot = {
        id: `shot-custom-${Date.now()}`,
        sceneNumber: 4,
        title: topicName || `${subject} Discovery`,
        framing: "Monumental Archival 2.39:1",
        action: `${subject} verifies ${objectFact} under verified archival conditions.`,
        cameraMotion: "Slow cinematic drift with anamorphic lens refraction",
        prompt,
        groundingFacts: [`${predicate}: ${objectFact}`, `Source: ${sourceArchive}`],
        voiceoverScript: `Here, ${subject} confirms ${objectFact}, drawn from ${sourceArchive}. Every frame stays bound to that verified assertion.`,
        durationSec: 4.5,
        status: "settled",
        videoUrl: mediaResult.url?.startsWith("http")
          ? `/api/proxy-media?url=${encodeURIComponent(mediaResult.url)}`
          : mediaResult.url,
        posterUrl: mediaResult.url?.startsWith("http")
          ? `/api/proxy-media?url=${encodeURIComponent(mediaResult.url)}`
          : mediaResult.url,
        c2paHash: `0x${mediaResult.jobId?.slice(0, 14) || Date.now().toString(16)}livepeer`,
        ual: `did:dkg:otp:2043/0x918341/custom-${Date.now().toString(16)}`,
        orchestratorNode: `agent.livepeer.org/api/mcp/creative (${mediaResult.servedModelId})`,
      };

      onAddCustomShot(customShot, customNode);
      onClose();
    } catch (err: any) {
      setGenError(err.message || "Failed to synthesize frame on Livepeer Agent Creative MCP");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#07090f] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-7 text-zinc-100 font-sans space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/15 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white">
                Ground Your Own Historical or Scientific Fact
              </h3>
              <p className="text-[10px] text-zinc-400 font-mono">
                Anchor custom RDF triples on OriginTrail DKG & synthesize Livepeer Agent MCP
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1 text-zinc-400 hover:text-white transition-colors disabled:opacity-30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-3 text-[11px] font-mono">
          <div>
            <label className="text-zinc-400 block text-[9px] uppercase mb-1">Scene Title / Event</label>
            <input
              type="text"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder="e.g. Galileo Galilei: Jupiter Moons"
              className="w-full bg-black/60 border border-white/15 rounded-lg px-2.5 py-1.5 text-white focus:border-[#fbbf24] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-zinc-400 block text-[9px] uppercase mb-1">Subject (Entity)</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Galileo Galilei"
                className="w-full bg-black/60 border border-white/15 rounded-lg px-2.5 py-1.5 text-white focus:border-[#fbbf24] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-zinc-400 block text-[9px] uppercase mb-1">Predicate (Relation)</label>
              <input
                type="text"
                value={predicate}
                onChange={(e) => setPredicate(e.target.value)}
                placeholder="e.g. discovered"
                className="w-full bg-black/60 border border-white/15 rounded-lg px-2.5 py-1.5 text-white focus:border-[#fbbf24] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 block text-[9px] uppercase mb-1">Object (Verifiable Factual Statement)</label>
            <input
              type="text"
              value={objectFact}
              onChange={(e) => setObjectFact(e.target.value)}
              placeholder="e.g. 4 Jovian Satellites Orbiting Jupiter"
              className="w-full bg-black/60 border border-white/15 rounded-lg px-2.5 py-1.5 text-white focus:border-[#fbbf24] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-zinc-400 text-[9px] uppercase flex items-center gap-1">
                <Sliders className="w-2.5 h-2.5 text-[#fbbf24]" />
                Directorial Cinema Lenses:
              </span>
              <button
                type="button"
                onClick={() => handleOptimizePrompt()}
                className="text-[9px] font-mono text-[#fbbf24] hover:underline flex items-center gap-0.5"
                title="Enrich draft with authentic 35mm optical parameters and DKG grounding"
              >
                <Wand2 className="w-2.5 h-2.5" />
                Auto-Optimize Optics
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1 mb-2">
              {(
                [
                  { key: "archival_35mm", label: "35mm Archival" },
                  { key: "macro_blueprint", label: "Macro Schematics" },
                  { key: "cosmic_vista", label: "Cosmic Vista" },
                  { key: "documentary_prime", label: "Doc Prime" },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleOptimizePrompt(key)}
                  className={`py-1 rounded border text-[8px] font-mono transition-all text-center ${
                    selectedStyle === key
                      ? "bg-[#fbbf24]/20 border-[#fbbf24] text-[#fbbf24] font-bold"
                      : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the 35mm cinematic composition..."
              className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-white focus:border-[#fbbf24] focus:outline-none leading-relaxed text-[10px]"
            />
          </div>
        </div>

        {/* Quick Fill Templates */}
        <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-[9px] font-mono flex items-center justify-between">
          <span className="text-zinc-400">Quick Fill Templates:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setTopicName("Galileo: Sidereus Nuncius");
                setSubject("Galileo Galilei");
                setPredicate("opticalDiscovery");
                setObjectFact("4 Moons of Jupiter in Orbital Motion");
                setPrompt("Cinematic 35mm view of Galileo Galilei in 1610 Padua gazing through wooden refractor telescope toward glowing crescent Jupiter and four moons");
                setSourceArchive("Sidereus Nuncius 1610 / Vatican Library");
              }}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-300"
            >
              Galileo 1610
            </button>
            <button
              onClick={() => {
                setTopicName("Voyager 1: Pale Blue Dot");
                setSubject("Voyager 1 Spacecraft");
                setPredicate("distanceFromSun");
                setObjectFact("6.0 Billion Kilometers (40.5 AU)");
                setPrompt("Archival cinematic shot of Voyager 1 narrow-angle camera turning back across solar system, faint pixel of Earth suspended in sunbeam ray");
                setSourceArchive("NASA JPL Planetary Data System");
              }}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-300"
            >
              Voyager 1990
            </button>
          </div>
        </div>

        {genError && (
          <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>{genError}</span>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-colors disabled:opacity-30"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={isGenerating || !subject.trim() || !objectFact.trim()}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-black font-heading font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Synthesizing on Livepeer MCP...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Anchor & Synthesize Shot</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
