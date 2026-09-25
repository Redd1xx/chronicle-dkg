"use client";

import React, { useEffect, useRef } from "react";

export function KnowledgeMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Planetary Epicycles (Orrery Primitives)
    const orbs = [
      { r: 120, speed: 0.006, size: 6, color: "#fbbf24", label: "SOL:ROOT", epicycleR: 24, epicycleSpeed: 0.03 },
      { r: 210, speed: -0.004, size: 4.5, color: "#34d399", label: "EARTH:LUNAR_MODULE", epicycleR: 35, epicycleSpeed: -0.02 },
      { r: 310, speed: 0.003, size: 4, color: "#22d3ee", label: "ORBIT:CSM_COLLINS", epicycleR: 42, epicycleSpeed: 0.015 },
      { r: 420, speed: -0.002, size: 5, color: "#a855f7", label: "TRANQUILITY:BASE", epicycleR: 50, epicycleSpeed: -0.01 },
      { r: 540, speed: 0.0015, size: 3.5, color: "#e2e8f0", label: "NEUROWEB:OTP-2043", epicycleR: 60, epicycleSpeed: 0.02 },
    ];

    let time = 0;

    const render = () => {
      time += 1;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Deep Obsidian Canvas
      ctx.fillStyle = "#05070a";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      ctx.save();
      // 3D Parallax tilt from cursor
      const tiltX = (mouse.x - cx) * 0.04;
      const tiltY = (mouse.y - cy) * 0.04;
      ctx.translate(cx + tiltX, cy + tiltY);

      // 1. Concentric Astrolabe Gear Rings with Degree Scales
      [120, 210, 310, 420, 540].forEach((radius, idx) => {
        // Main Ring
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0 ? "rgba(251, 191, 36, 0.09)" : "rgba(52, 211, 153, 0.07)";
        ctx.lineWidth = 1;
        ctx.setLineDash(idx % 2 === 0 ? [4, 12] : [8, 16]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Astrolabe Degree Ticks & Radian Markers
        const tickCount = 24;
        for (let i = 0; i < tickCount; i++) {
          const angle = (i / tickCount) * Math.PI * 2 + time * (idx % 2 === 0 ? 0.001 : -0.0015);
          const x1 = Math.cos(angle) * (radius - 3);
          const y1 = Math.sin(angle) * (radius - 3);
          const x2 = Math.cos(angle) * (radius + 3);
          const y2 = Math.sin(angle) * (radius + 3);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = i % 6 === 0 ? "rgba(251, 191, 36, 0.25)" : "rgba(255, 255, 255, 0.06)";
          ctx.stroke();

          // Azimuth Roman/Degree Labels every 90 deg
          if (i % 6 === 0 && radius === 310) {
            ctx.font = "8px 'Cinzel', serif";
            ctx.fillStyle = "rgba(251, 191, 36, 0.4)";
            ctx.textAlign = "center";
            ctx.fillText(`${(i / tickCount) * 360}°`, Math.cos(angle) * (radius + 14), Math.sin(angle) * (radius + 14));
          }
        }
      });

      // 2. Center Sun / Root Astrolabe Core
      const corePulse = Math.sin(time * 0.04) * 4;
      const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 30 + corePulse);
      coreGrad.addColorStop(0, "rgba(251, 191, 36, 0.8)");
      coreGrad.addColorStop(0.3, "rgba(52, 211, 153, 0.3)");
      coreGrad.addColorStop(1, "transparent");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 30 + corePulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#fbbf24";
      ctx.shadowColor = "#fbbf24";
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Render Planetary Epicycles & Merkle Vector Arcs
      orbs.forEach((orb, oIdx) => {
        const primaryAngle = time * orb.speed;
        const mainX = Math.cos(primaryAngle) * orb.r;
        const mainY = Math.sin(primaryAngle) * orb.r;

        // Epicycle small circle
        const epiAngle = time * orb.epicycleSpeed;
        const epiX = mainX + Math.cos(epiAngle) * orb.epicycleR;
        const epiY = mainY + Math.sin(epiAngle) * orb.epicycleR;

        // Epicycle orbit track
        ctx.beginPath();
        ctx.arc(mainX, mainY, orb.epicycleR, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.stroke();

        // Merkle verification arc connecting to central root
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(mainX * 0.5, mainY * 0.7, epiX, epiY);
        ctx.strokeStyle = oIdx % 2 === 0 ? "rgba(251, 191, 36, 0.12)" : "rgba(52, 211, 153, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Orbiting Celestial Body
        ctx.beginPath();
        ctx.arc(epiX, epiY, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.shadowColor = orb.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Monospace Entity Label
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.textAlign = "left";
        ctx.fillText(orb.label, epiX + 10, epiY + 3);
      });

      ctx.restore();

      // Atmospheric Star Dust Particles
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      for (let s = 0; s < 45; s++) {
        const sx = ((s * 41 + time * 0.2) % width);
        const sy = ((s * 73 + time * 0.15) % height);
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ contain: "strict" }}
    />
  );
}
