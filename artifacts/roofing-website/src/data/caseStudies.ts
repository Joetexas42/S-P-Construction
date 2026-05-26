export type CaseStudy = {
  slug: string;
  title: string;
  city: string;
  buildingType: string;
  system: string;
  brand: string;
  sizeSqFt: number;
  completed: string;
  scope: string;
  challenge: string;
  outcome: string;
  highlights: string[];
  image: string;
  seoTitle: string;
  seoDescription: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "frisco-retail-tpo-replacement",
    title: "40,000 Sq Ft TPO Replacement — Frisco Retail Center",
    city: "Frisco, TX",
    buildingType: "Multi-tenant Retail Center",
    system: "Mechanically-Attached TPO",
    brand: "Carlisle SynTec 60-mil TPO",
    sizeSqFt: 40000,
    completed: "March 2026",
    scope:
      "Full tear-off of failed ballasted EPDM, new R-30 polyiso insulation, 60-mil reinforced TPO membrane, and re-flashing of 32 HVAC curbs and 14 skylights.",
    challenge:
      "The 20-year-old ballasted EPDM was failing at seams and saturating insulation across 60% of the deck. Eight occupied retail tenants required uninterrupted business hours during the entire installation.",
    outcome:
      "Completed phased replacement in 6 weeks with zero tenant closures and zero leak callbacks through two spring hail seasons. Manufacturer 20-year NDL warranty issued.",
    highlights: [
      "20-year Carlisle no-dollar-limit warranty",
      "R-30 continuous insulation (energy code upgrade)",
      "Zero tenant disruption during business hours",
      "Phased work across 8 occupied storefronts",
    ],
    image: "/images/gallery-tpo.png",
    seoTitle:
      "Frisco Commercial Roof Replacement — 40,000 Sq Ft TPO Case Study | Lone Star",
    seoDescription:
      "How Lone Star replaced 40,000 sq ft of failing EPDM with 60-mil Carlisle TPO on a Frisco retail center — phased, zero tenant disruption, 20-year NDL warranty.",
  },
  {
    slug: "fort-worth-industrial-standing-seam",
    title: "85,000 Sq Ft Standing Seam Metal Roof — Fort Worth Industrial Park",
    city: "Fort Worth, TX",
    buildingType: "Distribution Warehouse",
    system: "24-Gauge Standing Seam Metal",
    brand: "MBCI Ultra-Dek (Galvalume)",
    sizeSqFt: 85000,
    completed: "November 2025",
    scope:
      "Custom on-site roll-forming of 24-gauge Galvalume panels in 22-ft runs, mechanically-seamed clips, new ridge and eave trim, and integrated snow/lightning protection.",
    challenge:
      "Existing 30-year-old R-panel roof had widespread fastener back-out and oil-canning. Owner needed a 40-year solution that could be installed while warehouse operations continued underneath.",
    outcome:
      "Roll-formed and installed in 9 weeks with no shutdown of the 24/7 logistics floor. Roof carries a 40-year finish warranty and a 25-year weathertight warranty.",
    highlights: [
      "On-site roll-forming eliminated panel seams",
      "40-year Kynar 500 finish warranty",
      "25-year MBCI weathertight warranty",
      "24/7 warehouse operations never paused",
    ],
    image: "/images/gallery-metal.png",
    seoTitle:
      "Fort Worth Standing Seam Metal Roof — 85,000 Sq Ft Warehouse Case Study | Lone Star",
    seoDescription:
      "Lone Star roll-formed and installed 85,000 sq ft of 24-gauge MBCI standing seam metal on a Fort Worth distribution warehouse with zero operational downtime.",
  },
  {
    slug: "plano-office-hail-restoration",
    title: "Hail Storm Restoration — Plano Office Complex",
    city: "Plano, TX",
    buildingType: "Class-A Office Campus (3 buildings)",
    system: "Modified Bitumen Cap-Sheet Overlay",
    brand: "GAF Ruberoid Mop Smooth",
    sizeSqFt: 62000,
    completed: "August 2025",
    scope:
      "Emergency tarping within 4 hours of the storm, full insurance scope documentation, replacement of 220 saturated insulation boards, and new SBS modified bitumen cap sheet across all three buildings.",
    challenge:
      "Golf-ball-sized hail from the April 2025 supercell punctured the existing built-up roof in 400+ locations. The owner's carrier required full photo and core-sample documentation within 10 days.",
    outcome:
      "Insurance claim approved at 100% replacement cost. All three buildings restored to a watertight condition in 11 weeks with a 15-year GAF Diamond Pledge warranty.",
    highlights: [
      "4-hour emergency tarp response",
      "Full insurance scope & photo documentation",
      "15-year GAF Diamond Pledge NDL warranty",
      "100% replacement-cost claim approval",
    ],
    image: "/images/gallery-storm.png",
    seoTitle:
      "Plano Hail Damage Roof Restoration — Office Campus Case Study | Lone Star",
    seoDescription:
      "How Lone Star documented and restored 62,000 sq ft of hail-damaged modified bitumen across a Plano office campus — full insurance approval, 15-year warranty.",
  },
  {
    slug: "dallas-warehouse-pvc-replacement",
    title: "120,000 Sq Ft PVC Replacement — Dallas Warehouse District",
    city: "Dallas, TX",
    buildingType: "Cold Storage / Food Distribution Warehouse",
    system: "Adhered 60-mil PVC Single-Ply",
    brand: "Sika Sarnafil G410",
    sizeSqFt: 120000,
    completed: "July 2025",
    scope:
      "Tear-off of saturated 4-ply BUR, new tapered polyiso for positive drainage, 60-mil fully-adhered Sika Sarnafil PVC over fleece-back, and 1,800 LF of new perimeter edge metal.",
    challenge:
      "Refrigerated food storage operation could not be exposed to outside air for more than 90 minutes at a time. The tapered insulation re-design also had to solve 17 chronic ponding-water locations.",
    outcome:
      "Installed in dry-in stages of less than 60 minutes each, with zero loss of cold-chain integrity. All 17 ponding areas eliminated. 25-year Sika system warranty issued.",
    highlights: [
      "Chemical & grease-resistant PVC for food distribution",
      "Tapered insulation eliminated 17 ponding spots",
      "Cold-chain integrity preserved during install",
      "25-year Sika Sarnafil system warranty",
    ],
    image: "/images/hero-bg.png",
    seoTitle:
      "Dallas PVC Roof Replacement — 120,000 Sq Ft Cold Storage Case Study | Lone Star",
    seoDescription:
      "Lone Star installed 120,000 sq ft of Sika Sarnafil PVC on a Dallas cold-storage warehouse — tapered drainage, zero cold-chain loss, 25-year warranty.",
  },
  {
    slug: "mckinney-medical-tpo-recover",
    title: "28,000 Sq Ft TPO Recover System — McKinney Medical Office",
    city: "McKinney, TX",
    buildingType: "Medical Office Building",
    system: "TPO Recover (over existing BUR)",
    brand: "GAF EverGuard TPO 60-mil",
    sizeSqFt: 28000,
    completed: "May 2025",
    scope:
      "Moisture survey, removal of wet insulation pockets, installation of cover board, mechanically-attached 60-mil GAF EverGuard TPO, and re-detailing of 40 plumbing penetrations.",
    challenge:
      "Active medical practice with operating rooms below — no odor, no vibration, and no debris infiltration could be tolerated during business hours.",
    outcome:
      "Recovered the existing BUR (avoiding $180k in tear-off and landfill costs), worked nights and weekends only, and delivered a 20-year GAF Golden Pledge warranty.",
    highlights: [
      "Saved ~$180k vs. full tear-off",
      "Night & weekend phasing for active OR suite",
      "20-year GAF Golden Pledge warranty",
      "Energy Star reflective white membrane",
    ],
    image: "/images/gallery-tpo.png",
    seoTitle:
      "McKinney Medical Office TPO Recover Roof — Case Study | Lone Star",
    seoDescription:
      "Lone Star installed a 28,000 sq ft GAF EverGuard TPO recover system on a McKinney medical office — night phasing, no OR disruption, 20-year warranty.",
  },
  {
    slug: "arlington-school-pvc-replacement",
    title: "55,000 Sq Ft PVC Replacement — Arlington School District",
    city: "Arlington, TX",
    buildingType: "K-8 School Campus",
    system: "Mechanically-Attached 50-mil PVC",
    brand: "Johns Manville JM PVC",
    sizeSqFt: 55000,
    completed: "August 2024",
    scope:
      "Summer-break tear-off and replacement of 30-year-old gravel BUR, new R-25 polyiso, gypsum cover board, and 50-mil JM PVC across the gymnasium, cafeteria, and two classroom wings.",
    challenge:
      "Hard deadline of 9 weeks between last day of school and teacher in-service. Asbestos-containing flashing required licensed abatement before any new work could begin.",
    outcome:
      "Abatement and full replacement finished 4 days ahead of schedule. Campus opened on time with a 20-year manufacturer warranty and a Class A fire rating.",
    highlights: [
      "Completed in 9-week summer window",
      "Certified asbestos abatement included",
      "Class A fire rating, code-compliant insulation",
      "20-year Johns Manville system warranty",
    ],
    image: "/images/gallery-metal.png",
    seoTitle:
      "Arlington School District PVC Roof Replacement — Case Study | Lone Star",
    seoDescription:
      "Lone Star replaced 55,000 sq ft of gravel BUR with Johns Manville PVC across an Arlington school campus — abated, finished early, 20-year warranty.",
  },
];

export const caseStudyBySlug: Record<string, CaseStudy> = Object.fromEntries(
  caseStudies.map((c) => [c.slug, c]),
);

export function formatSqFt(n: number) {
  return n.toLocaleString("en-US");
}
