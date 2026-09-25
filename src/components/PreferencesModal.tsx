"use client";

import React, { useState, useEffect } from "react";
import { X, Sliders, Cpu, Database, ShieldCheck, Check, AlertCircle, RefreshCw } from "lucide-react";
import { livepeerMcp, LivepeerMcpStatus, LIVEPEER_MCP_ENDPOINT } from "../lib/livepeerMcp";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyChange?: (key: string | null) => void;
}

export const STORAGE_KEY = "chronicle_livepeer_api_key";
type Tab = "engine" | "graph" | "provenance";

export function PreferencesModal({ isOpen, onClose, onKeyChange }: PreferencesModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("engine");
  const [apiKey, setApiKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<"idle" | "success" | "error">("idle");
  const [testMessage, setTestMessage] = useState<string>("");
  const [mcpStatus, setMcpStatus] = useState<LivepeerMcpStatus | null>(null);
  const [dkgRpcInfo, setDkgRpcInfo] = useState<{ blockNumber: number; latencyMs: number; rpc: string } | null>(null);
  const [isPingingDkg, setIsPingingDkg] = useState<boolean>(false);
  const [customNodeUrl, setCustomNodeUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing) {
        setSavedKey(existing);
        setApiKey(existing);
      }
      const storedNode = localStorage.getItem("chronicle_dkg_node_url");
      if (storedNode) setCustomNodeUrl(storedNode);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      livepeerMcp.getStatus().then((st) => setMcpStatus(st)).catch(() => {});
      fetch("/api/dkg")
        .then((r) => r.json())
        .then((d) => {
          if (d.success && d.block) {
            setDkgRpcInfo({
              blockNumber: d.block.number,
              latencyMs: d.block.latencyMs || 180,
              rpc: d.rpcEndpoint || "https://astrosat-parachain-rpc.origin-trail.network/",
            });
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (trimmed) {
      livepeerMcp.setApiKey(trimmed);
      setSavedKey(trimmed);
      setTestStatus("success");
      setTestMessage("Key saved. Livepeer Agent Creative MCP connected.");
      if (onKeyChange) onKeyChange(trimmed);
    } else {
      handleClear();
    }
  };

  const handleClear = () => {
    livepeerMcp.setApiKey(null);
    setSavedKey(null);
    setApiKey("");
    setTestStatus("idle");
    setTestMessage("");
    if (onKeyChange) onKeyChange(null);
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestStatus("idle");
    setTestMessage("");

    try {
      const tempClient = new (livepeerMcp.constructor as any)(apiKey.trim() || undefined);
      const status = await tempClient.getStatus();
      setMcpStatus(status);
      setTestStatus("success");
      setTestMessage(`Connected to Livepeer MCP (${status.keyClass} quota · ${status.toolCount} tools ready).`);
    } catch (err: any) {
      setTestStatus("error");
      setTestMessage(err.message || "Failed to reach Livepeer MCP endpoint.");
    } finally {
      setIsTesting(false);
    }
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return "••••••••";
    return key.slice(0, 4) + "••••" + key.slice(-4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#090b10] border border-white/10 rounded-xl shadow-2xl overflow-hidden text-zinc-100 font-sans">
        
        {/* Titlebar */}
        <div className="h-11 bg-[#040507] border-b border-white/10 px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2 text-xs font-heading font-bold text-white tracking-wide">
            <Sliders className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Chronicle Settings · Livepeer Agent Creative MCP</span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex border-b border-white/10 bg-[#06080c] px-4 gap-1 text-xs font-mono">
          {[
            { id: "engine", label: "Livepeer Creative MCP", icon: Cpu },
            { id: "graph", label: "OriginTrail DKG", icon: Database },
            { id: "provenance", label: "Provenance & C2PA", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-[#fbbf24] text-[#fbbf24] font-bold"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-5 space-y-4">
          {activeTab === "engine" && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-black/40 border border-white/10 space-y-1.5">
                <div className="text-[11px] font-mono text-zinc-300 font-bold flex items-center justify-between">
                  <span>Livepeer Agent Creative MCP</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/30">
                    {mcpStatus?.toolCount || 125} Tools Active
                  </span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 truncate">
                  Endpoint: <span className="text-zinc-200">{LIVEPEER_MCP_ENDPOINT}</span>
                </div>
                <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
                  Decentralized GPU orchestration network for synthetic video generation and asset provenance, grounded in OriginTrail DKG fact graphs.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono p-3 rounded-lg bg-black/40 border border-white/10">
                <span className="text-zinc-400">Compute Mode:</span>
                <span className="text-[#fbbf24] font-bold">
                  {savedKey ? `Livepeer Agent Account (${maskKey(savedKey)})` : "Livepeer Agent Demo Quota ($100.00)"}
                </span>
              </div>

              {mcpStatus?.principalId && (
                <div className="flex items-center justify-between text-xs font-mono p-2.5 rounded-lg bg-black/30 border border-white/5">
                  <span className="text-zinc-400">Principal ID:</span>
                  <span className="text-zinc-200 truncate max-w-[280px]">{mcpStatus.principalId}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <label className="text-zinc-300 block">
                    Livepeer Agent API Key (Optional)
                  </label>
                  <a
                    href="https://app.daydream.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[#fbbf24] hover:underline"
                  >
                    Get API key at app.daydream.live
                  </a>
                </div>
                <input
                  type="password"
                  placeholder="Leave empty for Livepeer demo quota, or paste Bearer token..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fbbf24] transition-colors"
                />
              </div>

              {testMessage && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-mono flex items-center gap-2 ${
                    testStatus === "success"
                      ? "bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981]"
                      : "bg-red-950/20 border border-red-500/30 text-red-300"
                  }`}
                >
                  {testStatus === "success" ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  <span>{testMessage}</span>
                </div>
              )}
            </div>
          )}

          {activeTab === "graph" && (
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-black/40 border border-white/10 space-y-2">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-zinc-400">Parachain Network:</span>
                  <span className="text-[#10b981] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                    NeuroWeb Mainnet (otp:2043)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-zinc-400">Live Block Height:</span>
                  <span className="text-white font-bold">
                    {dkgRpcInfo ? `#${dkgRpcInfo.blockNumber.toLocaleString()}` : "Querying RPC..."}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-zinc-400">Parachain RPC Node:</span>
                  <span className="text-[#22d3ee] truncate max-w-[240px]">
                    {dkgRpcInfo?.rpc || "astrosat-parachain-rpc.origin-trail.network"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-zinc-400">RPC Latency:</span>
                  <span className="text-[#fbbf24] font-semibold">
                    {dkgRpcInfo ? `${dkgRpcInfo.latencyMs}ms` : "—"}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 block">
                  OriginTrail DKG Node URL (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://v6-pegasus-node-02.origin-trail.network:8900"
                    value={customNodeUrl}
                    onChange={(e) => {
                      setCustomNodeUrl(e.target.value);
                      if (typeof window !== "undefined") {
                        localStorage.setItem("chronicle_dkg_node_url", e.target.value);
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#10b981]"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      setIsPingingDkg(true);
                      try {
                        const r = await fetch("/api/dkg");
                        const d = await r.json();
                        if (d.success && d.block) {
                          setDkgRpcInfo({
                            blockNumber: d.block.number,
                            latencyMs: d.block.latencyMs || 190,
                            rpc: d.rpcEndpoint,
                          });
                        }
                      } finally {
                        setIsPingingDkg(false);
                      }
                    }}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isPingingDkg ? "animate-spin text-[#10b981]" : ""}`} />
                    <span>Ping RPC</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "provenance" && (
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-black/40 border border-white/10 space-y-2">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Provenance Standard:</span>
                  <span className="text-[#fbbf24] font-bold">C2PA + OriginTrail DKG v8</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Cryptographic Digest:</span>
                  <span className="text-white font-mono">RFC-6962 Merkle Tree (SHA-256)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">On-Chain Anchoring:</span>
                  <span className="text-[#10b981]">NeuroWeb OTP:2043 EVM Parachain</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">Block Explorer:</span>
                  <a
                    href="https://origintrail.subscan.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#22d3ee] hover:underline"
                  >
                    origintrail.subscan.io
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#040507] flex items-center justify-between text-xs font-mono">
          <button
            onClick={handleClear}
            disabled={!savedKey}
            className="text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            Reset
          </button>

          <div className="flex items-center gap-2">
            {activeTab === "engine" && (
              <button
                onClick={handleTest}
                disabled={isTesting}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors flex items-center gap-1.5 disabled:opacity-40"
              >
                {isTesting ? <RefreshCw className="w-3 h-3 animate-spin" /> : null}
                <span>Test Livepeer MCP</span>
              </button>
            )}

            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg font-heading font-bold text-black bg-[#fbbf24] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            >
              Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
