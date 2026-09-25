/**
 * Shared Cinema Stage Canvas Utilities for Chronicle DKG
 * Renders 60fps hardware-composited cinematic loading states, reticles, and CRT/35mm effects
 */

export function drawCinemaLoadingState(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frame: number,
  shotTitle?: string,
  orchestratorNode?: string
): void {
  const cx = width / 2;
  const cy = height / 2 - 12;

  // 1. Dark Atmospheric Cinematic Base
  ctx.fillStyle = "#04060c";
  ctx.fillRect(0, 0, width, height);

  // 2. Anamorphic Lens Flare Sweep
  const sweepX = ((frame * 2.2) % (width * 2.4)) - width * 0.4;
  const flareGrad = ctx.createLinearGradient(sweepX - 90, 0, sweepX + 90, 0);
  flareGrad.addColorStop(0, "rgba(34, 211, 238, 0)");
  flareGrad.addColorStop(0.5, "rgba(52, 211, 153, 0.12)");
  flareGrad.addColorStop(1, "rgba(34, 211, 238, 0)");
  ctx.fillStyle = flareGrad;
  ctx.fillRect(0, 0, width, height);

  // 3. Subtle Authentic 35mm Grain
  ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
  for (let i = 0; i < 40; i++) {
    ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
  }

  // 4. Central Rotating Cryptographic Reticle
  // Outer dashed ring
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((frame * 0.02) % (Math.PI * 2));
  ctx.strokeStyle = "rgba(52, 211, 153, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, 44, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Inner dashed counter-rotating ring
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((-frame * 0.035) % (Math.PI * 2));
  ctx.strokeStyle = "rgba(34, 211, 238, 0.45)";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Core pulse
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.08);
  ctx.fillStyle = `rgba(52, 211, 153, ${0.12 + pulse * 0.2})`;
  ctx.beginPath();
  ctx.arc(cx, cy, 14 + pulse * 4, 0, Math.PI * 2);
  ctx.fill();

  // Radar sweep line
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((frame * 0.045) % (Math.PI * 2));
  ctx.strokeStyle = "rgba(34, 211, 238, 0.75)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(32, 0);
  ctx.stroke();
  ctx.restore();

  // 5. Monospaced Loading Readout
  const dots = ".".repeat((Math.floor(frame / 18) % 3) + 1);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Micro header badge
  ctx.font = "bold 9px monospace";
  ctx.fillStyle = "rgba(52, 211, 153, 0.85)";
  ctx.fillText("DKG PROVENANCE ENGINE · LIVEPEER AGENT", cx, cy + 62);

  // Main Loading Status
  ctx.font = "bold 13px monospace";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("SYNTHESIZING VERIFIABLE SHOT" + dots, cx, cy + 80);

  // Subtitle / Node status
  ctx.font = "10px monospace";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  const nodeText = orchestratorNode || "agent.livepeer.org/api/mcp/creative";
  ctx.fillText(`Grounding via Livepeer Creative MCP · ${nodeText}`, cx, cy + 98);

  // Segmented progress bar
  const barW = Math.min(260, width * 0.45);
  const barH = 3;
  const barX = cx - barW / 2;
  const barY = cy + 114;
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(barX, barY, barW, barH);

  const scanPos = (frame * 3) % barW;
  const scanGrad = ctx.createLinearGradient(barX + scanPos - 30, 0, barX + scanPos + 30, 0);
  scanGrad.addColorStop(0, "rgba(34, 211, 238, 0)");
  scanGrad.addColorStop(0.5, "rgba(52, 211, 153, 0.9)");
  scanGrad.addColorStop(1, "rgba(34, 211, 238, 0)");
  ctx.fillStyle = scanGrad;
  ctx.fillRect(Math.max(barX, barX + scanPos - 30), barY, 60, barH);
}
