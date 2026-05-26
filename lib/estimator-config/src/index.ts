// ============================================================================
// INSTANT ESTIMATE PRICING CONFIG
// ============================================================================
// Industry-standard placeholder per-square-foot prices for the satellite
// instant-estimate tool. Numbers are intentionally conservative midpoints for
// North Texas commercial work.
//
// >>> EDIT THESE NUMBERS HERE WHEN PRICING CHANGES. <<<
// This is the ONE place to edit pricing. Both the frontend (to show the
// ballpark) and the backend (to validate submitted leads) import from here.
// ============================================================================

export interface EstimatorService {
  /** Stable id, also stored on the lead in the database */
  id: string;
  /** Visitor-facing label */
  label: string;
  /** Short blurb shown under the label */
  blurb: string;
  /** Per-sqft installed cost in US dollars */
  pricePerSqft: number;
}

export const ESTIMATOR_SERVICES: EstimatorService[] = [
  {
    id: "tpo-epdm-pvc",
    label: "TPO / PVC Single-Ply Membrane",
    blurb: "Energy-efficient white membrane — most common commercial flat roof system.",
    pricePerSqft: 9.0,
  },
  {
    id: "metal-roofing",
    label: "Metal Roofing System",
    blurb: "Standing-seam or corrugated metal — longest service life.",
    pricePerSqft: 14.0,
  },
  {
    id: "modified-bitumen",
    label: "Modified Bitumen / Built-Up",
    blurb: "Multi-ply asphalt membrane — proven, repair-friendly.",
    pricePerSqft: 8.5,
  },
  {
    id: "coatings-restoration",
    label: "Roof Coatings & Restoration",
    blurb: "Silicone or acrylic restoration to extend an aging roof.",
    pricePerSqft: 3.5,
  },
  {
    id: "replacement",
    label: "Full Roof Replacement (Tear-Off)",
    blurb: "Full tear-off and new system install with new insulation.",
    pricePerSqft: 11.5,
  },
  {
    id: "repair",
    label: "Commercial Roof Repair",
    blurb: "Targeted repair work — minimum project sizes apply.",
    pricePerSqft: 6.0,
  },
];

export const ESTIMATOR_SERVICE_IDS = ESTIMATOR_SERVICES.map((s) => s.id);

export function getEstimatorServiceById(id: string): EstimatorService | undefined {
  return ESTIMATOR_SERVICES.find((s) => s.id === id);
}

/**
 * Compute the rounded ballpark dollar figure from sqft and a per-sqft price.
 * Rounded to the nearest $500 so it reads as a ballpark, not a quote.
 */
export function computeEstimateUsd(sqft: number, pricePerSqft: number): number {
  const raw = sqft * pricePerSqft;
  return Math.max(0, Math.round(raw / 500) * 500);
}
