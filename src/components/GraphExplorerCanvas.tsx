"use client";

import React, { useEffect, useRef } from "react";
import { DkgKnowledgeGraph, DkgEntityNode } from "../lib/types";

interface GraphExplorerCanvasProps {
  graph: DkgKnowledgeGraph;
  onSelectNode: (node: DkgEntityNode) => void;
  selectedNodeId: string | null;
}

export function GraphExplorerCanvas({
  graph,
  onSelectNode,
  selectedNodeId,
}: GraphExplorerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse interaction for 3D tilt
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouse.targetY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Node click handler
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      projectedNodes.forEach((p) => {
        const dist = Math.hypot(clickX - p.screenX, clickY - p.screenY);
        if (dist < 18) {
          onSelectNode(p.node);
        }
      });
    };
    canvas.addEventListener("click", handleClick);

    let projectedNodes: { node: DkgEntityNode; screenX: number; screenY: number }[] = [];
    let rotationAngle = 0;

    const render = () => {
      rotationAngle += 0.006;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Dark Obsidian Canvas Background
      ctx.fillStyle = "#07090e";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const tilt = 0.45 + mouse.y * 0.15; // 3D perspective tilt

      // Draw Concentric Cryptographic Orbital Rings
      [0.22, 0.38, 0.48].forEach((scale, ringIdx) => {
        const rx = width * scale;
        const ry = rx * tilt;

        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ringIdx === 1 ? "rgba(251, 191, 36, 0.12)" : "rgba(52, 211, 153, 0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash(ringIdx % 2 === 0 ? [3, 9] : []);
        ctx.stroke();
        ctx.setLineDash([]);

        // Orbital degree ticks
        const ticks = 12;
        for (let t = 0; t < ticks; t++) {
          const tickAngle = (t / ticks) * Math.PI * 2 + rotationAngle * (ringIdx % 2 === 0 ? 0.4 : -0.3);
          const tx = cx + Math.cos(tickAngle) * rx;
          const ty = cy + Math.sin(tickAngle) * ry;
          ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
          ctx.fillRect(tx - 1, ty - 1, 2, 2);
        }
      });

      // Draw Center Root Anchor (OriginTrail DKG Core)
      ctx.save();
      ctx.translate(cx, cy);

      // Outer Root Halo
      const rootPulse = 1 + Math.sin(rotationAngle * 3) * 0.15;
      ctx.beginPath();
      ctx.arc(0, 0, 16 * rootPulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(251, 191, 36, 0.08)";
      ctx.fill();

      // Root Core
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#fbbf24";
      ctx.shadowColor = "#fbbf24";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Root Label
      ctx.font = "9px 'Cinzel', serif";
      ctx.fillStyle = "#fbbf24";
      ctx.textAlign = "center";
      ctx.fillText("DKG:OTP-2043 ROOT", 0, 18);
      ctx.restore();

      // Project and Draw Entity Nodes
      projectedNodes = [];
      const orbitRx = width * 0.38;
      const orbitRy = orbitRx * tilt;

      graph.nodes.forEach((node, i) => {
        const nodeAngle = (i / graph.nodes.length) * Math.PI * 2 + rotationAngle + mouse.x * 0.2;
        const screenX = cx + Math.cos(nodeAngle) * orbitRx;
        const screenY = cy + Math.sin(nodeAngle) * orbitRy;
        const isSelected = selectedNodeId === node.id;
        const zFactor = 1 + Math.sin(nodeAngle) * 0.25; // 3D depth scale

        projectedNodes.push({ node, screenX, screenY });

        // Draw Merkle verification arc to Root
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(screenX, screenY);
        ctx.strokeStyle = isSelected 
          ? "rgba(52, 211, 153, 0.6)" 
          : "rgba(52, 211, 153, 0.15)";
        ctx.lineWidth = isSelected ? 1.5 : 1;
        ctx.setLineDash(isSelected ? [] : [2, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Node Glow Halo
        ctx.beginPath();
        ctx.arc(screenX, screenY, (isSelected ? 14 : 9) * zFactor, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "rgba(52, 211, 153, 0.2)" : "rgba(34, 211, 238, 0.08)";
        ctx.fill();

        // Node Solid Core
        ctx.beginPath();
        ctx.arc(screenX, screenY, (isSelected ? 6 : 4) * zFactor, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#34d399" : "#22d3ee";
        ctx.shadowColor = isSelected ? "#34d399" : "#22d3ee";
        ctx.shadowBlur = isSelected ? 15 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Monospace Chip
        ctx.font = `${Math.round(9 * zFactor)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.6)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, screenX, screenY - 10 * zFactor);

        // UAL leaf hash
        if (isSelected) {
          ctx.font = "8px 'JetBrains Mono', monospace";
          ctx.fillStyle = "#34d399";
          ctx.fillText("HASH: 0x8f2a...c4b1 [VERIFIED]", screenX, screenY + 16 * zFactor);
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [graph, selectedNodeId, onSelectNode]);

  return (
    <div className="relative w-full h-[230px] rounded-xl overflow-hidden bg-[#06080e] border border-white/10 cursor-crosshair">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 left-2.5 flex items-center gap-1.5 text-[9px] font-mono text-zinc-400 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
        <span>SPARQL 3D TOPOLOGY · CLICK TO ISOLATE ENTITY</span>
      </div>
      <div className="absolute bottom-2 right-2.5 text-[8px] font-mono text-zinc-500 pointer-events-none">
        RADIAN PROJECTION · DUAL-LAYER GRAPH
      </div>
    </div>
  );
}
