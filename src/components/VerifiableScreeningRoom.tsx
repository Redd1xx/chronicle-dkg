"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  ShieldCheck, 
  Cpu, 
  Hash, 
  ExternalLink, 
  Layers, 
  Maximize2,
  RefreshCw,
  Camera,
  Compass,
  Radio
} from "lucide-react";
import { ChronicleShot, DkgKnowledgeGraph, DkgEntityNode } from "../lib/types";
import { GraphExplorerCanvas } from "./GraphExplorerCanvas";
import { cinematicAudio } from "../lib/cinematic-audio";
import { drawCinemaLoadingState } from "../lib/cinema-renderer";

interface VerifiableScreeningRoomProps {
  shots: ChronicleShot[];
  activeShotIndex: number;
  onSelectShot: (index: number) => void;
  graph: DkgKnowledgeGraph;
  onSelectNode: (node: DkgEntityNode) => void;
  selectedNodeId: string | null;
  onOpenMintModal: () => void;
}

export function VerifiableScreeningRoom({
  shots,
  activeShotIndex,
  onSelectShot,
  graph,
  onSelectNode,
  selectedNodeId,
  onOpenMintModal,
}: VerifiableScreeningRoomProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<"2.39:1" | "16:9" | "1.43:1">("2.39:1");
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeShot = shots[activeShotIndex] || shots[0];

  // 60 FPS Canvas Cinema Renderer (Eliminates Broken Mixkit Video URLs)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const imageCache = new Map<string, HTMLImageElement>();

    const getImage = (src: string) => {
      if (!src || src.includes("silicon_macro") || src.includes("unsplash") || src.includes("apollo") || src.includes("jwst")) return null;
      const safeSrc =
        typeof window !== "undefined" && src.startsWith("http") && !src.includes("/api/proxy-media")
          ? `/api/proxy-media?url=${encodeURIComponent(src)}`
          : src;

      if (imageCache.has(safeSrc)) return imageCache.get(safeSrc)!;
      if (imageCache.has(src)) return imageCache.get(src)!;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        imageCache.set(src, img);
        imageCache.set(safeSrc, img);
      };
      img.src = safeSrc;
      imageCache.set(src, img);
      imageCache.set(safeSrc, img);
      return img;
    };

    let frame = 0;
    const renderCinema = () => {
      frame++;
      if (isPlaying) {
        setElapsedSec((prev) => (prev >= activeShot.durationSec ? 0 : +(prev + 0.016).toFixed(3)));
      }

      const cx = width / 2;
      const cy = height / 2;

      // Base Void
      ctx.fillStyle = "#05070a";
      ctx.fillRect(0, 0, width, height);

      // Render Active Shot Media (Livepeer MCP generated frame or high-res poster)
      const mediaSrc = activeShot.posterUrl || activeShot.videoUrl;
      const isPending =
        !mediaSrc ||
        mediaSrc.includes("silicon_macro") ||
        mediaSrc.includes("unsplash") ||
        mediaSrc.includes("apollo") ||
        mediaSrc.includes("jwst") ||
        activeShot.status === "rendering";

      let mediaImg = !isPending ? getImage(mediaSrc) : null;
      if (isPending || !mediaImg || !mediaImg.complete || mediaImg.naturalWidth === 0) {
        drawCinemaLoadingState(
          ctx,
          width,
          height,
          frame,
          activeShot.title,
          activeShot.orchestratorNode
        );
      } else {
        ctx.save();
        const zoom = 1.02 + (frame % 350) * 0.0004;
        const panX = Math.sin(frame * 0.008) * 16;
        const panY = Math.cos(frame * 0.006) * 10;

        const imgAspect = mediaImg.naturalWidth / mediaImg.naturalHeight;
        const canvasAspect = width / height;
        let drawW = width, drawH = height;
        if (imgAspect > canvasAspect) {
          drawH = height * zoom;
          drawW = drawH * imgAspect;
        } else {
          drawW = width * zoom;
          drawH = drawW / imgAspect;
        }
        const drawX = (width - drawW) / 2 + panX;
        const drawY = (height - drawH) / 2 + panY;

        try {
          ctx.drawImage(mediaImg, drawX, drawY, drawW, drawH);
        } catch {
          // Ignore transient crossOrigin or decode frame ticks
        }

        // Volumetric anamorphic streak flare sweep
        const sweepX = ((frame * 2.0) % (width * 2.2)) - width * 0.4;
        const flareGrad = ctx.createLinearGradient(sweepX - 60, 0, sweepX + 60, 0);
        flareGrad.addColorStop(0, "rgba(34, 211, 238, 0)");
        flareGrad.addColorStop(0.5, "rgba(52, 211, 153, 0.16)");
        flareGrad.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = flareGrad;
        ctx.fillRect(0, 0, width, height);

        // Deep cinematic vignette
        const vignette = ctx.createRadialGradient(cx, cy, height * 0.35, cx, cy, height * 0.85);
        vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
        vignette.addColorStop(1, "rgba(0, 0, 0, 0.65)");
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);

        ctx.restore();
      }

      // Film Grain & CRT Scanline Simulation
      ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
      for (let i = 0; i < 60; i++) {
        const gx = Math.random() * width;
        const gy = Math.random() * height;
        ctx.fillRect(gx, gy, 1.5, 1.5);
      }

      // 2.39:1 Letterbox Matte
      const letterboxH = aspectRatio === "2.39:1" ? height * 0.12 : aspectRatio === "16:9" ? height * 0.04 : 0;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, letterboxH);
      ctx.fillRect(0, height - letterboxH, width, letterboxH);

      // Letterbox Border Rules
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, letterboxH);
      ctx.lineTo(width, letterboxH);
      ctx.moveTo(0, height - letterboxH);
      ctx.lineTo(width, height - letterboxH);
      ctx.stroke();

      animId = requestAnimationFrame(renderCinema);
    };

    animId = requestAnimationFrame(renderCinema);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeShot, graph, isPlaying, aspectRatio]);

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 sm:p-5 gap-4">
      {/* 1. Main Cinema Stage with C2PA Provenance HUD */}
      <div className="bg-[#090c14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
        {/* Top HUD Telemetry Strip */}
        <div className="h-10 px-4 bg-black/80 border-b border-white/10 flex items-center justify-between text-xs font-mono select-none">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            <span className="font-heading font-bold text-white text-xs">
              SHOT 0{activeShot.sceneNumber} · {activeShot.title}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px]">
            <div className="hidden sm:flex items-center gap-1 text-zinc-400">
              <Cpu className="w-3 h-3 text-[#22d3ee]" />
              <span>{activeShot.orchestratorNode}</span>
            </div>
            <div className="flex items-center gap-1 text-[#34d399] bg-[#34d399]/15 px-2 py-0.5 rounded border border-[#34d399]/40">
              <ShieldCheck className="w-3 h-3" />
              <span>C2PA: {activeShot.c2paHash}</span>
            </div>
          </div>
        </div>

        {/* Viewport Stage (HTML5 60 FPS Canvas) */}
        <div className="relative aspect-[2.39/1] w-full bg-black flex items-center justify-center overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Mission Telemetry HUD Overlay (Top-Left - only when settled media ready) */}
          {activeShot.status === "settled" && activeShot.posterUrl && (
            <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-300 space-y-1 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 pointer-events-none animate-in fade-in duration-200">
              <div className="text-[#fbbf24] flex items-center gap-1 font-bold">
                <Compass className="w-3 h-3" />
                <span>MET: 102:45:40.{Math.floor(elapsedSec * 24)}</span>
              </div>
              <div className="text-zinc-400">
                ALT: <span className="text-white">40.2 FT</span> | V_VEL: <span className="text-white">-1.8 FPS</span>
              </div>
              <div className="text-zinc-400">
                ATTITUDE: <span className="text-[#34d399]">+4.5° PITCH</span>
              </div>
            </div>
          )}

          {/* C2PA Watermark (Bottom-Left - only when settled media ready) */}
          {activeShot.status === "settled" && activeShot.posterUrl && (
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-2 text-[10px] font-mono text-zinc-300 pointer-events-none animate-in fade-in duration-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
              <span className="truncate max-w-[240px]">UAL: {activeShot.ual}</span>
            </div>
          )}

          {/* Play/Pause & Aspect Ratio Switcher (Bottom-Right) */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <div className="hidden sm:flex items-center rounded-lg bg-black/70 border border-white/10 p-0.5 text-[9px] font-mono text-zinc-400">
              {(["2.39:1", "16:9", "1.43:1"] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-2 py-1 rounded transition-colors ${
                    aspectRatio === ratio ? "bg-white/20 text-white font-bold" : "hover:text-white"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                cinematicAudio.play("toggle");
              }}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Grounding Fact Overlay Bar */}
        <div className="p-3 bg-[#0a0e18] border-t border-white/10 flex flex-col gap-2 text-xs font-mono">
          {activeShot.voiceoverScript && (
            <div className="flex items-start gap-2 text-[11px] leading-relaxed">
              <span className="text-[#22d3ee] uppercase text-[10px] font-bold shrink-0 pt-0.5">Voiceover:</span>
              <span className="text-zinc-200 italic">“{activeShot.voiceoverScript}”</span>
            </div>
          )}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-[#fbbf24] uppercase text-[10px] font-bold font-cinzel">GROUNDED FACTS:</span>
            {activeShot.groundingFacts.map((fact, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[10px] whitespace-nowrap"
              >
                {fact}
              </span>
            ))}
          </div>

          <button
            onClick={onOpenMintModal}
            className="text-[10px] font-mono text-[#22d3ee] hover:underline flex items-center gap-1 shrink-0 ml-auto"
          >
            <span>Inspect UAL Manifest</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Shot Reel Timeline Selector (Real Visual Thumbnails) */}
      <div className="grid grid-cols-3 gap-3">
        {shots.map((shot, idx) => {
          const isSelected = activeShotIndex === idx;
          return (
            <button
              key={shot.id}
              onClick={() => {
                onSelectShot(idx);
                cinematicAudio.play("click");
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-[#34d399]/15 border-[#34d399] shadow-[0_0_20px_rgba(52,211,153,0.15)]"
                  : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between mb-1 font-mono text-[10px]">
                <span className="text-[#34d399] font-bold">SHOT 0{shot.sceneNumber}</span>
                <span className="text-zinc-500">{shot.durationSec}s</span>
              </div>
              <h4 className="font-heading font-semibold text-xs text-white truncate mb-1">
                {shot.title}
              </h4>
              <div className="text-[9px] font-mono text-zinc-500 truncate">
                {shot.c2paHash}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. 3D Living Knowledge Astrolabe Canvas */}
      <div className="bg-[#090d16] border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#34d399]" />
            <span className="text-xs font-heading font-bold uppercase text-white">
              Live DKG Graph Topology (OriginTrail Edge Node)
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            Click nodes to isolate facts
          </span>
        </div>

        <GraphExplorerCanvas
          graph={graph}
          onSelectNode={onSelectNode}
          selectedNodeId={selectedNodeId}
        />
      </div>
    </div>
  );
}
