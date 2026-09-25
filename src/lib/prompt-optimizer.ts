/**
 * Autonomous Cinematographic Prompt Optimizer for Livepeer Diffusion Inference & OriginTrail DKG Grounding
 * Calibrates natural language drafts with professional camera, optics, archival lighting, and verified triple constraints.
 */

export type CinemaStyle = "archival_35mm" | "macro_blueprint" | "cosmic_vista" | "documentary_prime";

export interface OptimizationResult {
  optimizedPrompt: string;
  cameraSpecs: {
    lens: string;
    motion: string;
    lighting: string;
    filmStock: string;
    framing: string;
  };
}

const CINEMA_PROFILES: Record<CinemaStyle, {
  lens: string;
  motion: string;
  lighting: string;
  filmStock: string;
  composition: string;
}> = {
  archival_35mm: {
    lens: "authentic 35mm spherical vintage prime lens",
    motion: "measured historical dolly track with authentic mechanical inertia",
    lighting: "dramatic archival chiaroscuro, natural candle or daylight window rays, subtle volumetric particles",
    filmStock: "Kodak 5219 Vision3 color negative stock, authentic physical 35mm grain structure, Arri 65 large format",
    composition: "monumental 2.39:1 anamorphic cinema framing, museum-grade archival fidelity",
  },
  macro_blueprint: {
    lens: "100mm surgical macro cine lens T2.1",
    motion: "slow axial rack focus highlighting precision scientific contours",
    lighting: "clean technical telemetry backlighting, high-contrast rim illumination",
    filmStock: "crystal-clear 8K digital master, zero chromatic distortion",
    composition: "technical schematics perspective, geometric alignment",
  },
  cosmic_vista: {
    lens: "14mm ultra-wide anamorphic cinema prime",
    motion: "grand orbital drift through vacuum, majestic stellar parallax",
    lighting: "pinprick starlight, radiant planetary crescent reflection, deep velvet shadow contrast",
    filmStock: "high-dynamic-range astronomical cinema profile, luminous spectral accuracy",
    composition: "epic cosmic expanse with vast scale isolation",
  },
  documentary_prime: {
    lens: "40mm cinema prime lens T1.3",
    motion: "handheld observational pan with fluid dampening",
    lighting: "naturalistic ambient lighting, soft directional bounce",
    filmStock: "tactile photographic emulsion, balanced neutral palette",
    composition: "grounded eye-level documentary perspective",
  },
};

/**
 * Enriches a basic historical/scientific draft with authentic cinema parameters and DKG fact grounding.
 */
export function optimizeCinemaPrompt(
  rawPrompt: string,
  style: CinemaStyle = "archival_35mm",
  dkgFacts?: { subject?: string; predicate?: string; object?: string }
): OptimizationResult {
  const cleanRaw = rawPrompt.trim().replace(/^cinematic\s+/i, "");
  const profile = CINEMA_PROFILES[style] || CINEMA_PROFILES.archival_35mm;

  let factualGrounding = "";
  if (dkgFacts && dkgFacts.subject && dkgFacts.object) {
    factualGrounding = ` [DKG Canon: ${dkgFacts.subject} ${dkgFacts.predicate || "asserts"} ${dkgFacts.object}]`;
  }

  const optimizedPrompt = `${cleanRaw}, shot on ${profile.lens}, ${profile.motion}, ${profile.lighting}, ${profile.filmStock}, ${profile.composition}${factualGrounding}`;

  return {
    optimizedPrompt,
    cameraSpecs: {
      lens: profile.lens,
      motion: profile.motion,
      lighting: profile.lighting,
      filmStock: profile.filmStock,
      framing: "2.39:1 anamorphic",
    },
  };
}
