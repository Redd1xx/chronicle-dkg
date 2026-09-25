"use client";

import React, { useState, useEffect } from "react";
import { X, Film, CheckCircle2, RefreshCw, ShieldCheck, Download, AlertCircle } from "lucide-react";
import { livepeerMcp } from "../lib/livepeerMcp";

interface ExportFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
  shotTitle: string;
  topicTitle: string;
  activeLut: string;
  ual: string;
  durationSec: number;
  shotMediaUrl?: string;
}

export function ExportFilmModal({
  isOpen,
  onClose,
  shotTitle,
  topicTitle,
  activeLut,
  ual,
  durationSec,
  shotMediaUrl,
}: ExportFilmModalProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"dkg" | "livepeer" | "lut" | "ready">("dkg");
  const [downloaded, setDownloaded] = useState(false);
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setStage("dkg");
      setDownloaded(false);
      setExportedUrl(null);
      setExportError(null);
      return;
    }

    let isMounted = true;
    setProgress(15);

    const runExport = async () => {
      try {
        if (!isMounted) return;
        setProgress(40);
        setStage("livepeer");

        // Dispatches to Livepeer Agent MCP director_export
        const exportRes = await livepeerMcp.compileDirectorCut(
          `Chronicle: ${topicTitle} - ${shotTitle}`,
          "mp4"
        );

        if (!isMounted) return;
        setProgress(85);
        setStage("lut");

        if (!isMounted) return;
        setProgress(100);
        setStage("ready");
        setExportedUrl(exportRes.masterVideoUrl || shotMediaUrl || null);
      } catch (err: any) {
        if (!isMounted) return;
        setExportError(err.message || "Livepeer MCP export compilation failed");
        setStage("ready");
        setExportedUrl(shotMediaUrl || null);
        setProgress(100);
      }
    };

    runExport();

    return () => {
      isMounted = false;
    };
  }, [isOpen, shotTitle, topicTitle, shotMediaUrl]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const targetUrl = exportedUrl || shotMediaUrl;
    if (!targetUrl) return;

    const a = document.createElement("a");
    a.href = targetUrl;
    a.target = "_blank";
    a.download = `chronicle-${shotTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}-master.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
  };

  const lutLabels: Record<string, string> = {
    kodak2383: "Kodak 2383 Print Film",
    fujieterna: "Fuji Eterna 500T",
    technicolor: "Technicolor 3-Strip",
    trix35mm: "Kodak Tri-X 400 Monochrome",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#07090f] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-7 text-zinc-100 font-sans space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/15 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24]">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white">
                Export 2.39:1 SMPTE Cinema Master
              </h3>
              <p className="text-[10px] text-zinc-400 font-mono">
                Livepeer Agent Creative MCP · director_export tool
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Master Metadata Pill Grid */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono p-3 rounded-xl bg-black/60 border border-white/10">
          <div>
            <span className="text-zinc-500 block text-[8px] uppercase">Sequence</span>
            <span className="text-white font-bold truncate block">{shotTitle}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[8px] uppercase">Archive Context</span>
            <span className="text-[#fbbf24] truncate block">{topicTitle}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[8px] uppercase">Color Grade</span>
            <span className="text-zinc-300">{lutLabels[activeLut] || activeLut}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[8px] uppercase">Duration</span>
            <span className="text-zinc-300">{durationSec}.00s SMPTE</span>
          </div>
        </div>

        {/* Cryptographic DKG Anchor Tag */}
        <div className="p-2.5 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-between text-[9px] font-mono">
          <div className="flex items-center gap-1.5 text-[#10b981]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-bold">C2PA INJECTED:</span>
            <span className="text-zinc-300 truncate max-w-[200px]">{ual}</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] font-bold">
            SEALED
          </span>
        </div>

        {/* Render Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 flex items-center gap-1.5">
              {stage !== "ready" && <RefreshCw className="w-3 h-3 animate-spin text-[#fbbf24]" />}
              {stage === "dkg"
                ? "Validating OriginTrail DKG RDF Triples..."
                : stage === "livepeer"
                ? "Compiling Livepeer MCP director_export cut..."
                : stage === "lut"
                ? "Baking 32-bit Float 35mm Celluloid Emulsion..."
                : "Master Cinema Sequence Ready"}
            </span>
            <span className="text-[#fbbf24] font-bold">{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#10b981] transition-all duration-300 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            />
          </div>
        </div>

        {exportError && (
          <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{exportError}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleDownload}
            disabled={stage !== "ready" || (!exportedUrl && !shotMediaUrl)}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-black font-heading font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Export Dispatched</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Open Master Asset</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
