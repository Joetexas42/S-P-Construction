import {
  Wrench,
  LayoutGrid,
  Search,
  Zap,
  Activity,
  Droplets,
  ArrowUpToLine,
  AlignHorizontalJustifyCenter,
  Layers,
  Box,
  type LucideIcon,
} from "lucide-react";

export interface ServiceSection {
  heading: string;
  body: string;
}

export interface ServiceSupportingImage {
  base: string;
  alt: string;
  caption: string;
  sectionHeading: string;
}

export interface ServiceBeforeAfterImage {
  base: string;
  alt: string;
}

export interface ServiceBeforeAfterPair {
  sectionHeading: string;
  caption: string;
  before: ServiceBeforeAfterImage;
  after: ServiceBeforeAfterImage;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServicePricing {
  display: string;
  starting: number;
  min: number;
  max: number;
  unit?: "sqft";
}

export interface ServiceHeroImage {
  base: string;
  alt: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  category: "Core" | "System";
  seoTitle: string;
  seoDescription: string;
  tagline: string;
  problem: string;
  included: string[];
  why: string;
  features: string[];
  pricing: ServicePricing;
  sections: ServiceSection[];
  faqs: ServiceFAQ[];
  ctaPrimary: string;
  heroImage: ServiceHeroImage;
  supportingImages: ServiceSupportingImage[];
  beforeAfterPairs?: ServiceBeforeAfterPair[];
}

export const services: ServiceDetail[] = [
  {
    slug: "inspection",
    title: "Free Commercial Roof Inspections",
    shortTitle: "Roof Inspections",
    icon: Search,
    category: "Core",
    seoTitle: "Free Commercial Roof Inspection in DFW | Drone & Thermal | Lone Star",
    seoDescription:
      "Free North Texas commercial roof inspections with drone imagery, thermal moisture scans, and written reports. Senior inspectors, no salespeople, no pressure.",
    tagline: "Senior inspector, drone imagery, thermal scan — no salespeople, no pressure.",
    problem:
      "Most commercial roof failures in North Texas start as small, invisible issues — hail bruising, loose flashing, clogged drains, or hairline membrane splits. By the time water reaches the ceiling tiles, damage is already widespread.",
    included: [
      "On-site walkthrough by a senior inspector (no salespeople)",
      "Drone imagery & high-resolution photo documentation",
      "Thermal imaging to locate trapped moisture",
      "Core sampling on aging systems where appropriate",
      "Written report with prioritized findings, photos, and transparent pricing",
    ],
    why:
      "Inspections are 100% free, no pressure, no obligation. We tell you what's actually wrong — and what can wait.",
    pricing: {
      display: "Free — $0 inspection, written report included",
      starting: 0,
      min: 0,
      max: 0,
    },
    features: [
      "Drone aerial imagery",
      "Thermal moisture scan",
      "Core sampling",
      "Written report in 3–5 days",
    ],
    sections: [
      {
        heading: "When to schedule an inspection",
        body: "Schedule an inspection after every major DFW hail or windstorm, before buying or selling a commercial property, when a leak appears (no matter how small), at the 5, 10, and 15-year marks on any flat roof, and any time you renew property insurance. Catching damage early is the difference between a $4,000 repair and a $400,000 replacement.",
      },
      {
        heading: "What our written report includes",
        body: "Every report contains annotated drone imagery of the full roof, thermal overlays of any wet insulation, close-up photos of each defect, a prioritized action list (urgent vs. monitor), recommended repair scopes with transparent line-item pricing, and an estimate of remaining useful life. You can take this report to any contractor for a competitive bid — we don't lock you in.",
      },
      {
        heading: "Drone, thermal, and core sampling — why all three",
        body: "Drone imagery shows surface condition and ponding patterns. Thermal scans reveal moisture trapped under the membrane that's invisible to the eye. Core samples confirm what's actually happening inside the insulation and deck. Skipping any one of the three is how contractors miss the failure that costs you a ceiling six months later.",
      },
    ],
    faqs: [
      {
        question: "Is the inspection really free, even if I don't hire you?",
        answer:
          "Yes. There is no charge, no obligation, and no pressure to hire us. Many property managers use our reports to plan capital budgets or get competitive bids — that's exactly what they're for.",
      },
      {
        question: "How soon can you inspect my roof?",
        answer:
          "Typical scheduling is 3–5 business days. For active leaks or post-storm assessments we dispatch same-week, and often same-day for emergencies across the DFW Metroplex.",
      },
      {
        question: "Do you inspect every type of commercial roof?",
        answer:
          "Yes — TPO, PVC, EPDM, modified bitumen, built-up, metal, and hybrid assemblies. Our inspectors are trained on every major commercial membrane system installed across North Texas.",
      },
    ],
    ctaPrimary: "Request Free Inspection",
    heroImage: {
      base: "/images/services/inspection",
      alt: "Senior roof inspector documenting a North Texas commercial rooftop with a drone",
    },
    supportingImages: [
      {
        base: "/images/services/inspection-detail-1",
        alt: "Inspector reviewing a thermal-imaging scan of a commercial roof on a rugged tablet",
        caption: "Thermal scans reveal moisture trapped under the membrane during the on-site walkthrough.",
        sectionHeading: "What our written report includes",
      },
      {
        base: "/images/services/inspection-detail-2",
        alt: "Roofer piloting an inspection drone low over a white commercial flat roof in North Texas daylight",
        caption: "Drone imagery captures surface condition and ponding patterns across the entire roof field in a single pass.",
        sectionHeading: "Drone, thermal, and core sampling — why all three",
      },
    ],
  },
  {
    slug: "repair",
    title: "Commercial Roof Repair & Emergency Leak Response",
    shortTitle: "Roof Repair & Leak Response",
    icon: Wrench,
    category: "Core",
    seoTitle: "Commercial Roof Repair & 24/7 Leak Response | DFW | Lone Star",
    seoDescription:
      "24/7 commercial roof repair and emergency leak response across the DFW Metroplex. Root-cause leak diagnosis, manufacturer-approved repairs, warranty preserved.",
    tagline: "24/7 dispatch. Root-cause diagnosis. Warranty-preserving repairs.",
    problem:
      "A persistent leak doesn't just damage the roof — it ruins inventory, shuts down operations, and creates liability for slip-and-fall claims. Patch jobs from the wrong contractor often make the problem worse and void your warranty.",
    included: [
      "24/7 emergency dispatch across the DFW Metroplex",
      "Root-cause leak diagnosis (not just sealing the symptom)",
      "Manufacturer-approved repair materials for TPO, PVC, EPDM, and metal",
      "Heat-welded membrane patches and proper flashing replacement",
      "Documentation for your insurance carrier and warranty file",
    ],
    why:
      "We diagnose what three other companies missed. Repairs are completed to manufacturer spec so your existing warranty stays intact.",
    pricing: {
      display: "Starting at $750 · Typical range $750 – $15,000",
      starting: 750,
      min: 750,
      max: 15000,
    },
    features: [
      "24/7 emergency dispatch",
      "Same-day mitigation",
      "Heat-welded membrane patches",
      "Warranty preserved",
    ],
    sections: [
      {
        heading: "Root-cause leak diagnosis, not symptom chasing",
        body: "Water can travel 50+ feet across a flat roof before showing up inside. We trace leaks back to their actual entry point — usually a failed flashing, split seam, clogged drain, or compromised penetration — instead of caulking the ceiling stain. That's why our repairs stick.",
      },
      {
        heading: "Emergency tarping and water mitigation",
        body: "When the call comes in, we dispatch crews 24/7 across Dallas, Fort Worth, and every city in the Metroplex. Initial response includes emergency tarping or temporary sealing, water extraction if needed, and a written incident summary you can hand directly to your insurance carrier.",
      },
      {
        heading: "Manufacturer-approved materials only",
        body: "Every commercial warranty from Firestone (Elevate), Mule-Hide, and Duro-Last requires repairs to use approved materials and methods. As an authorized installer for all three, we keep your warranty fully intact — repairs are documented and reported to the manufacturer when required.",
      },
    ],
    faqs: [
      {
        question: "How fast can you respond to an emergency leak?",
        answer:
          "Initial emergency response is typically within hours across the DFW Metroplex. Mitigation (tarping, temporary sealing, water extraction) happens immediately so secondary damage doesn't compound.",
      },
      {
        question: "Will a repair void my existing manufacturer warranty?",
        answer:
          "Not when it's done correctly. We are authorized for Firestone (Elevate), Mule-Hide, and Duro-Last, so we use approved materials and methods that keep every warranty clause intact and document the repair for your file.",
      },
    ],
    ctaPrimary: "Request Repair Quote",
    heroImage: {
      base: "/images/services/repair",
      alt: "Roofer heat-welding a membrane patch on a commercial flat roof repair",
    },
    supportingImages: [
      {
        base: "/images/services/repair-detail-1",
        alt: "Close-up of a hot-air welder sealing a TPO membrane patch on a commercial flat roof",
        caption: "Heat-welded patches installed to manufacturer spec keep your existing warranty intact.",
        sectionHeading: "Manufacturer-approved materials only",
      },
      {
        base: "/images/services/repair-detail-2",
        alt: "Two roofers battening down a heavy-duty blue emergency tarp across a damaged section of commercial flat roof",
        caption: "Emergency tarping and battens go down first so secondary water damage stops compounding inside the building.",
        sectionHeading: "Emergency tarping and water mitigation",
      },
    ],
    beforeAfterPairs: [
      {
        sectionHeading: "Root-cause leak diagnosis, not symptom chasing",
        caption: "Same failed edge-metal flashing before and after a root-cause repair — rusted, split, and leaking on the left; cleanly re-flashed and heat-welded to manufacturer spec on the right.",
        before: {
          base: "/images/services/repair-before-1",
          alt: "Rusted commercial roof edge metal with a split seam and dark water staining streaking across weathered grey TPO membrane",
        },
        after: {
          base: "/images/services/repair-after-1",
          alt: "Same commercial roof corner after repair with new galvanized edge metal and a clean heat-welded white TPO patch sealing the previous failure point",
        },
      },
    ],
  },
  {
    slug: "installation",
    title: "New Commercial Roof Installation & Full Replacement",
    shortTitle: "New Installation & Replacement",
    icon: LayoutGrid,
    category: "Core",
    seoTitle: "Commercial Roof Installation & Replacement | DFW | Lone Star",
    seoDescription:
      "Authorized commercial roof installation and full replacement in North Texas. Firestone, Mule-Hide, and Duro-Last systems with full NDL manufacturer warranties.",
    tagline: "System engineering, full tear-off, NDL manufacturer warranty.",
    problem:
      "A commercial reroof is a six- and seven-figure capital decision. The wrong system, wrong installer, or wrong attachment method can cost you decades of performance — and the failure usually doesn't show up until the warranty has lapsed.",
    included: [
      "System engineering matched to your building, code requirements, and budget",
      "Full tear-off, deck inspection, and substrate repair as needed",
      "Authorized installation of Firestone (Elevate), Mule-Hide, and Duro-Last systems",
      "Heat-welded seams, mechanically attached or fully adhered per spec",
      "Manufacturer NDL (No Dollar Limit) and labor warranties",
    ],
    why:
      "We are an authorized installer for the brands we recommend. That means full manufacturer warranties, factory tech support, and a roof that performs as engineered.",
    pricing: {
      display: "Starting at $7 / sq ft · Typical range $7 – $14 / sq ft installed",
      starting: 7,
      min: 7,
      max: 14,
      unit: "sqft",
    },
    features: [
      "Authorized Firestone / Mule-Hide / Duro-Last",
      "Full tear-off & deck repair",
      "Mechanically attached or fully adhered",
      "Up to 30-year NDL warranty",
    ],
    sections: [
      {
        heading: "How we engineer the right system for your building",
        body: "We start with your building use, roof traffic, rooftop equipment, insulation R-value targets, energy goals, and budget. From there we model TPO, PVC, EPDM, and metal options, compare installed cost vs. lifecycle cost, and recommend the system that actually fits — not the one that pads our margin.",
      },
      {
        heading: "Tear-off, recover, or hybrid",
        body: "Sometimes a recover (installing a new membrane over the existing one) is the right move. Often it isn't. We core the existing assembly, assess substrate moisture, and recommend tear-off when the underlying insulation is compromised — because a recover over wet insulation is a guaranteed callback.",
      },
      {
        heading: "Minimizing operational disruption",
        body: "For occupied buildings, we phase the work to keep production lines, retail floors, and restaurant operations running. Crews follow strict daily dry-in protocols so an overnight storm never turns into an interior flood mid-project.",
      },
    ],
    faqs: [
      {
        question: "How long does a commercial reroof take?",
        answer:
          "A 30,000–50,000 sq ft single-ply project typically runs 3–6 weeks weather permitting, including tear-off, insulation, membrane install, flashings, and inspections. Larger or phased projects scale from there.",
      },
      {
        question: "What warranty do I get?",
        answer:
          "Manufacturer NDL (No Dollar Limit) warranties of 15, 20, 25, or 30 years are available depending on the system. We also stand behind our workmanship with a separate labor warranty.",
      },
    ],
    ctaPrimary: "Request Install Quote",
    heroImage: {
      base: "/images/services/installation",
      alt: "Crew installing a new TPO single-ply membrane on a large commercial building roof",
    },
    supportingImages: [
      {
        base: "/images/services/installation-detail-1",
        alt: "Roof core sample showing layers of TPO membrane, polyiso insulation, and metal deck",
        caption: "Core samples confirm what's inside the existing assembly before we recommend tear-off or recover.",
        sectionHeading: "Tear-off, recover, or hybrid",
      },
      {
        base: "/images/services/installation-detail-2",
        alt: "Roofing foreman in hi-vis vest reviewing technical roof drawings on a rugged tablet atop a commercial rooftop with rolls of TPO and polyiso stacked behind",
        caption: "System engineering starts on the roof — building use, equipment loads, drainage, and energy targets all drive the spec.",
        sectionHeading: "How we engineer the right system for your building",
      },
    ],
  },
  {
    slug: "replacement",
    title: "Full Roof Replacement",
    shortTitle: "Full Roof Replacement",
    icon: LayoutGrid,
    category: "System",
    seoTitle: "Commercial Full Roof Replacement | DFW Tear-Off | Lone Star",
    seoDescription:
      "Complete commercial roof tear-offs and replacements across North Texas. Deck repair, system upgrades, warranty-backed installation with minimal operational disruption.",
    tagline: "Complete tear-offs engineered for longevity and minimal disruption.",
    problem:
      "An end-of-life commercial roof can't be patched indefinitely. Once insulation is saturated, seams have failed, and ponding water is permanent, repair dollars stop earning a return — and every storm becomes an interior-damage event.",
    included: [
      "Full membrane and insulation tear-off",
      "Deck inspection, fastener replacement, and substrate repair",
      "System upgrades to current code and energy standards",
      "Re-flashing of all penetrations, curbs, and edge metal",
      "Manufacturer NDL warranty and workmanship warranty",
    ],
    why:
      "Replacements are the moment to fix what the original install got wrong — insulation R-value, drainage, attachment, and detailing. We treat it as an engineering project, not a tear-and-cover.",
    pricing: {
      display: "Starting at $7 / sq ft · Typical range $7 – $14 / sq ft installed",
      starting: 7,
      min: 7,
      max: 14,
      unit: "sqft",
    },
    features: [
      "Complete tear-offs",
      "Deck replacement",
      "System upgrades",
      "Warranty-backed installation",
    ],
    sections: [
      {
        heading: "Tear-off vs. recover — how we decide",
        body: "We core the existing assembly, scan for trapped moisture, and assess fastener pull-out. If the underlying insulation is saturated or the deck is compromised, recover is off the table — anything less than full tear-off would trap the problem under your new warranty. When the substrate is sound, recover can save 20–30% on cost.",
      },
      {
        heading: "Insulation R-value and code upgrades",
        body: "Texas energy code has tightened over the past decade. A replacement is the right time to bring your assembly up to current R-value targets, fix slope-to-drain deficiencies with tapered insulation, and add cover board for puncture resistance. These upgrades pay back through HVAC savings and avoided repair calls.",
      },
      {
        heading: "Phased work for occupied buildings",
        body: "For warehouses, retail, restaurants, and offices that cannot shut down, we phase the project section by section with daily dry-in protocols. Crews follow weather forecasts hourly and never leave an open deck at end of day.",
      },
    ],
    faqs: [
      {
        question: "When does it stop making sense to keep repairing?",
        answer:
          "Generally, when annual repair spend exceeds 20% of replacement cost, when more than 25% of the insulation is wet, or when seam and flashing failures are spreading faster than they can be addressed. Our inspection report gives you a clear repair-vs-replace recommendation.",
      },
    ],
    ctaPrimary: "Get a Replacement Quote",
    heroImage: {
      base: "/images/services/replacement",
      alt: "Commercial roof tear-off in progress with workers removing old insulation",
    },
    supportingImages: [
      {
        base: "/images/services/replacement-detail-1",
        alt: "Tapered polyiso insulation boards installed across a commercial roof deck sloping toward a drain",
        caption: "Tapered insulation corrects slope-to-drain deficiencies and raises R-value during a replacement.",
        sectionHeading: "Insulation R-value and code upgrades",
      },
      {
        base: "/images/services/replacement-detail-2",
        alt: "Aerial view of a phased warehouse reroof with one section finished in bright white TPO membrane and the adjacent section actively being torn off to the deck",
        caption: "Phased work with daily dry-in keeps occupied buildings running through a full tear-off and replacement.",
        sectionHeading: "Phased work for occupied buildings",
      },
    ],
    beforeAfterPairs: [
      {
        sectionHeading: "Tear-off vs. recover — how we decide",
        caption: "Same commercial warehouse roof before and after a full tear-off and replacement — cracked, ponding, end-of-life membrane on the left; new white TPO with clean drainage and re-flashed HVAC curbs on the right.",
        before: {
          base: "/images/services/replacement-before-1",
          alt: "Aerial view of an aging commercial flat roof with cracked dark grey membrane, ponding water, and rust-stained drains around rooftop HVAC units",
        },
        after: {
          base: "/images/services/replacement-after-1",
          alt: "Aerial view of the same commercial warehouse roof after full replacement with bright white TPO single-ply membrane in clean parallel rows and freshly re-flashed HVAC curbs",
        },
      },
    ],
  },
  {
    slug: "maintenance",
    title: "Commercial Roof Maintenance Programs",
    shortTitle: "Maintenance Programs",
    icon: Activity,
    category: "System",
    seoTitle: "Commercial Roof Maintenance Programs | DFW | Lone Star Roofing",
    seoDescription:
      "Proactive bi-annual commercial roof maintenance across North Texas. Inspections, drain clearing, debris removal, and preventative repairs that extend roof life 5–10 years.",
    tagline: "Bi-annual care that adds 5–10 years to a commercial roof.",
    problem:
      "Unmaintained commercial roofs fail 5–10 years early. Clogged drains, accumulated debris, broken seals at penetrations, and small membrane punctures compound silently until a single storm causes catastrophic damage.",
    included: [
      "Bi-annual scheduled inspections (spring + fall)",
      "Drain and scupper clearing",
      "Debris removal from roof field and gutters",
      "Preventative sealing at penetrations and flashings",
      "Annual written condition report with trend tracking",
    ],
    why:
      "Maintenance customers cut emergency repair calls by more than half and routinely reach or exceed manufacturer warranty terms. It's the cheapest dollar you'll spend on the roof.",
    pricing: {
      display: "Starting at $0.08 / sq ft annually · Typical range $0.08 – $0.25 / sq ft per year",
      starting: 0.08,
      min: 0.08,
      max: 0.25,
      unit: "sqft",
    },
    features: [
      "Bi-annual inspections",
      "Debris removal",
      "Drain clearing",
      "Preventative sealing",
    ],
    sections: [
      {
        heading: "What a maintenance visit actually does",
        body: "Each scheduled visit covers a full walk of the roof, clearing of drains and scuppers, debris removal, inspection of all flashings and penetrations, resealing of any compromised mastic or termination bars, and photo documentation. You receive a visit report with anything noted for follow-up.",
      },
      {
        heading: "Why bi-annual (not annual)",
        body: "North Texas weather hits roofs hard twice a year — winter freeze-thaw and summer hail/wind season. A spring visit catches winter damage before summer storms compound it. A fall visit clears debris and seals up before freeze-thaw. Annual-only programs consistently miss one season's damage.",
      },
      {
        heading: "Warranty compliance",
        body: "Most manufacturer warranties from Firestone (Elevate), Mule-Hide, and Duro-Last require documented maintenance to remain in force. Our program produces the exact records manufacturers ask for when a claim is filed.",
      },
    ],
    faqs: [
      {
        question: "Will maintenance really extend my roof's life?",
        answer:
          "Yes. Industry studies and our own portfolio data consistently show maintained commercial roofs reach 5–10 years beyond the lifespan of identical unmaintained systems — often paying for the program many times over.",
      },
    ],
    ctaPrimary: "Start a Maintenance Plan",
    heroImage: {
      base: "/images/services/maintenance",
      alt: "Maintenance technician clearing a roof drain on a commercial flat roof",
    },
    supportingImages: [
      {
        base: "/images/services/maintenance-detail-1",
        alt: "Technician resealing a pipe penetration with fresh sealant on a commercial flat roof",
        caption: "Preventative resealing at flashings and penetrations is the bread and butter of a maintenance visit.",
        sectionHeading: "What a maintenance visit actually does",
      },
    ],
  },
  {
    slug: "storm-damage",
    title: "Storm Damage & Hail Repair",
    shortTitle: "Storm Damage & Hail Repair",
    icon: Zap,
    category: "System",
    seoTitle: "Commercial Hail & Storm Damage Repair | DFW Insurance Claims | Lone Star",
    seoDescription:
      "Commercial hail damage repair and insurance claim advocacy across North Texas. Drone documentation, Xactimate scopes, adjuster meetings, and supplement work until your scope reflects actual damage.",
    tagline: "Hail documentation, claim advocacy, supplements until the scope is right.",
    problem:
      "After a major North Texas hailstorm, the difference between a $30k payout and a $300k payout often comes down to documentation and adjuster advocacy. Most commercial owners leave money — and a properly approved scope — on the table.",
    included: [
      "Immediate emergency tarping to prevent secondary damage",
      "Drone and thermal documentation of hail/wind damage",
      "Xactimate-aligned scope of work for your adjuster",
      "On-roof meeting with your insurance adjuster",
      "Supplement filings until the approved scope matches actual damage",
    ],
    why:
      "We don't work for the insurance company — we work for you. We've recovered approved scopes 3x larger than initial adjuster offers by meeting on the roof with data, not arguments.",
    pricing: {
      display: "Starting at $1,500 · Typical range $1,500 – $50,000+ (most insurance-covered)",
      starting: 1500,
      min: 1500,
      max: 50000,
    },
    features: [
      "Emergency tarping",
      "Hail damage assessment",
      "Wind uplift repair",
      "Claims advocacy",
    ],
    sections: [
      {
        heading: "Documentation that holds up with the carrier",
        body: "We map every hail impact across the roof field with drone imagery, mark fractured membrane and bruised insulation with thermal scans, and produce a chalk-test photo log of impacts per square. This is the evidence package adjusters can't dismiss.",
      },
      {
        heading: "Meeting your adjuster on the roof",
        body: "Adjusters move fast across hundreds of claims after a storm event. We meet them on the roof with our documentation, walk every damaged area, and make sure the scope captures real damage instead of a quick visual estimate from the parapet.",
      },
      {
        heading: "Supplement work until the scope is right",
        body: "Initial adjuster scopes routinely miss flashings, edge metal, cover board, and code-required upgrades. We file supplements with photo evidence and Xactimate line items until the approved scope reflects the actual repair required — not a number that closes the file fastest.",
      },
    ],
    faqs: [
      {
        question: "How long does a commercial hail claim take in North Texas?",
        answer:
          "Most DFW commercial hail claims run 30–90 days from initial inspection to roof completion, depending on carrier responsiveness, adjuster availability, and scope complexity. Emergency tarping happens immediately so secondary water damage doesn't compound the claim.",
      },
      {
        question: "Do I have to use the contractor my insurance recommends?",
        answer:
          "No. You have the right to choose your own contractor on any commercial claim in Texas. Carrier-preferred contractor lists exist to manage carrier costs — not necessarily to maximize your settlement or quality of work.",
      },
    ],
    ctaPrimary: "Start Storm Claim Help",
    heroImage: {
      base: "/images/services/storm-damage",
      alt: "Hail damage on a commercial roof membrane after a North Texas storm",
    },
    supportingImages: [
      {
        base: "/images/services/storm-damage-detail-1",
        alt: "Hail impacts circled in blue chalk on a white TPO commercial roof with a measuring square for scale",
        caption: "Chalk-test photo logs of impacts per square are the evidence package adjusters can't dismiss.",
        sectionHeading: "Documentation that holds up with the carrier",
      },
      {
        base: "/images/services/storm-damage-detail-2",
        alt: "Roofing contractor showing drone hail-impact documentation on an iPad to an insurance adjuster standing on a damaged commercial roof",
        caption: "We meet the adjuster on the roof with documentation in hand so the approved scope reflects real damage.",
        sectionHeading: "Meeting your adjuster on the roof",
      },
    ],
    beforeAfterPairs: [
      {
        sectionHeading: "Supplement work until the scope is right",
        caption: "Same section of commercial roof before and after a fully scoped hail claim — fractured impacts and granule loss across the membrane on the left; brand new TPO with fresh seam and pipe boot on the right.",
        before: {
          base: "/images/services/storm-damage-before-1",
          alt: "Close-up of white TPO commercial roof membrane covered in dark circular hail impact bruises and granule loss with a measuring square set on the surface for scale",
        },
        after: {
          base: "/images/services/storm-damage-after-1",
          alt: "Close-up of the same commercial roof section after hail claim restoration with brand new bright white TPO membrane, a fresh heat-welded seam, and a new pipe boot flashing",
        },
      },
    ],
  },
  {
    slug: "emergency-leak-repair",
    title: "24/7 Emergency Leak Repair",
    shortTitle: "Emergency Leak Repair",
    icon: Droplets,
    category: "System",
    seoTitle: "24/7 Emergency Commercial Roof Leak Repair | DFW | Lone Star",
    seoDescription:
      "24/7 emergency commercial roof leak repair across the DFW Metroplex. Rapid dispatch, water mitigation, temporary sealing, and root-cause repair to protect inventory and operations.",
    tagline: "Rapid dispatch across the DFW Metroplex — day or night.",
    problem:
      "When a commercial roof leaks, every hour costs you — damaged inventory, shut-down operations, ruined finished goods, and a real slip-and-fall liability. Waiting until morning isn't an option.",
    included: [
      "24/7 emergency dispatch — nights, weekends, holidays",
      "Immediate water mitigation and tarping",
      "Indoor water extraction coordination if needed",
      "Temporary sealing engineered to last weeks, not hours",
      "Root-cause diagnosis and permanent-repair scope",
    ],
    why:
      "We pick up the phone at 2 a.m. Our temporary repairs are engineered to hold through the next storm — not just to make the drip stop until morning.",
    pricing: {
      display: "Starting at $750 · Typical range $750 – $5,000 per dispatch",
      starting: 750,
      min: 750,
      max: 5000,
    },
    features: [
      "24/7 dispatch",
      "Immediate mitigation",
      "Water extraction",
      "Temporary sealing",
    ],
    sections: [
      {
        heading: "What happens when you call after hours",
        body: "Your call is answered by a dispatcher, not an answering machine. We confirm your address, ask about the active leak location and what's underneath, and dispatch the nearest emergency crew. ETA is typically within hours anywhere in the DFW Metroplex.",
      },
      {
        heading: "Mitigation first, permanent fix second",
        body: "The first visit stops the bleeding — tarping, temporary heat-welded patches, drain clearing, or whatever the situation calls for. We then schedule the permanent repair separately so it can be done in daylight with the right materials and full root-cause diagnosis.",
      },
      {
        heading: "Insurance and warranty documentation",
        body: "Every emergency response includes photo documentation of the damage, the temporary repair performed, and the leak source. You receive a written incident summary you can hand to your insurance carrier and warranty file.",
      },
    ],
    faqs: [
      {
        question: "How fast can you actually get on-site?",
        answer:
          "Typically within hours across Dallas, Fort Worth, Plano, Frisco, Arlington, Irving, McKinney, and surrounding cities — day or night, weekend or holiday.",
      },
    ],
    ctaPrimary: "Call Emergency Line",
    heroImage: {
      base: "/images/services/emergency-leak-repair",
      alt: "Emergency tarping and leak mitigation on a commercial roof at night",
    },
    supportingImages: [
      {
        base: "/images/services/emergency-leak-repair-detail-1",
        alt: "Heavy-duty blue emergency tarp battened down across a damaged section of commercial flat roof at dusk",
        caption: "First-visit mitigation: tarping engineered to hold through the next storm, not just to make the drip stop.",
        sectionHeading: "Mitigation first, permanent fix second",
      },
    ],
  },
  {
    slug: "coatings-restoration",
    title: "Roof Coatings & Restoration",
    shortTitle: "Coatings & Restoration",
    icon: ArrowUpToLine,
    category: "System",
    seoTitle: "Commercial Roof Coatings & Restoration | DFW Silicone & Acrylic | Lone Star",
    seoDescription:
      "Fluid-applied silicone and acrylic roof coatings for DFW commercial buildings. Restore performance, improve reflectivity, and defer full replacement at a fraction of the cost.",
    tagline: "Defer full replacement and restore performance for a fraction of the cost.",
    problem:
      "An aging but structurally sound commercial roof doesn't always need a tear-off. Property managers regularly spend six figures on replacement when a properly applied coating system would have delivered another 10–15 years of service.",
    included: [
      "Roof condition assessment to confirm coating suitability",
      "Power wash and primer application as required",
      "Silicone, acrylic, or hybrid fluid-applied membrane",
      "Reinforced detailing at seams, penetrations, and flashings",
      "Manufacturer-backed coating warranty",
    ],
    why:
      "We only recommend a coating when it genuinely fits the roof. If the substrate is too far gone, we'll tell you — instead of selling you a coating that fails inside two years.",
    pricing: {
      display: "Starting at $2.50 / sq ft · Typical range $2.50 – $5.50 / sq ft installed",
      starting: 2.5,
      min: 2.5,
      max: 5.5,
      unit: "sqft",
    },
    features: [
      "Silicone coatings",
      "Acrylic systems",
      "Rust inhibition",
      "Energy star rated",
    ],
    sections: [
      {
        heading: "When a coating is the right move",
        body: "Coatings work best on roofs that are watertight or nearly so, with dry insulation, sound seams, and 5+ years of remaining service life on the substrate. Applied at the right moment, a coating can extend roof life 10–15 years at roughly a third of replacement cost.",
      },
      {
        heading: "Silicone vs. acrylic vs. hybrid",
        body: "Silicone excels at ponding water resistance and UV stability — the right call for low-slope DFW roofs with drainage issues. Acrylic delivers excellent reflectivity at lower cost on roofs with good drainage. Hybrid systems blend the strengths when conditions demand both.",
      },
      {
        heading: "Energy savings and cool-roof rating",
        body: "Reflective coating systems can drop rooftop surface temperatures by 50–80°F in DFW summers, meaningfully reducing HVAC load on the floor below. Many qualify for ENERGY STAR ratings and utility rebates.",
      },
    ],
    faqs: [
      {
        question: "How long does a coating last?",
        answer:
          "A quality silicone or hybrid coating typically lasts 10–15 years with manufacturer warranties of 10, 15, or 20 years depending on system thickness and substrate condition.",
      },
    ],
    ctaPrimary: "Assess My Roof for Coating",
    heroImage: {
      base: "/images/services/coatings-restoration",
      alt: "Applying a white reflective fluid-applied coating on a commercial flat roof",
    },
    supportingImages: [
      {
        base: "/images/services/coatings-restoration-detail-1",
        alt: "Roller applying bright white silicone coating over a weathered grey commercial roof, with a clear line between coated and uncoated areas",
        caption: "A fluid-applied silicone restoration over a sound substrate can deliver another 10–15 years of service.",
        sectionHeading: "Silicone vs. acrylic vs. hybrid",
      },
    ],
    beforeAfterPairs: [
      {
        sectionHeading: "When a coating is the right move",
        caption: "Same commercial flat roof before and after a fluid-applied silicone restoration — sun-faded, chalky, oxidized membrane on the left; uniform reflective white coating with reinforced curb detailing on the right.",
        before: {
          base: "/images/services/coatings-restoration-before-1",
          alt: "Weathered commercial flat roof with sun-faded oxidized grey single-ply membrane, chalky surface, and minor cracking before coating restoration",
        },
        after: {
          base: "/images/services/coatings-restoration-after-1",
          alt: "Same commercial flat roof after fluid-applied silicone coating with a uniform bright reflective white surface and reinforced detailing around the HVAC curb",
        },
      },
    ],
  },
  {
    slug: "flat-roofing",
    title: "Flat & Low-Slope Roofing",
    shortTitle: "Flat / Low-Slope Roofing",
    icon: AlignHorizontalJustifyCenter,
    category: "System",
    seoTitle: "Commercial Flat & Low-Slope Roofing | DFW | TPO, PVC, BUR | Lone Star",
    seoDescription:
      "DFW commercial flat and low-slope roofing specialists. TPO, PVC, modified bitumen, and built-up systems engineered for North Texas heat, hail, and ponding water.",
    tagline: "Purpose-built systems for North Texas heat, hail, and rooftop equipment loads.",
    problem:
      "Flat and low-slope roofs are the dominant assembly across North Texas warehouses, retail, offices, and industrial buildings — and they fail the fastest when the wrong system is installed for the building's actual conditions.",
    included: [
      "Built-up roofing (BUR) installation and repair",
      "Modified bitumen systems",
      "TPO, PVC, and EPDM single-ply membranes",
      "Tapered insulation for drainage optimization",
      "Re-flashing of curbs, penetrations, and edge metal",
    ],
    why:
      "Flat roofs live or die on details — drainage, attachment, flashings, and termination. Our installers obsess over the details that warranty claims always come back to.",
    pricing: {
      display: "Starting at $6 / sq ft · Typical range $6 – $12 / sq ft installed",
      starting: 6,
      min: 6,
      max: 12,
      unit: "sqft",
    },
    features: [
      "Built-up roofing (BUR)",
      "Modified bitumen",
      "Duro-Last PVC systems",
      "Drainage optimization",
    ],
    sections: [
      {
        heading: "Drainage is the failure point",
        body: "Most flat roof failures across DFW trace back to ponding water — water sitting on the membrane for more than 48 hours after a storm. We design every project with tapered insulation, additional drains where needed, and crickets around equipment so water moves where it should.",
      },
      {
        heading: "Handling rooftop equipment loads",
        body: "Warehouses and offices load flat roofs with HVAC units, solar arrays, satellite dishes, and maintenance traffic. We specify cover board, walkway pads, and high-mil membranes (80 mil where appropriate) to handle the real-world traffic the roof actually sees.",
      },
      {
        heading: "Choosing BUR, modified bitumen, or single-ply",
        body: "Built-up and modified bitumen still earn their place on certain industrial roofs and where heavy chemical exposure or specific code conditions demand them. Single-ply (TPO/PVC) is the default for most modern DFW commercial work. We match system to building, not the other way around.",
      },
    ],
    faqs: [
      {
        question: "How long does a flat commercial roof last in DFW?",
        answer:
          "Properly installed and maintained single-ply systems typically last 20–30 years in the North Texas climate. Built-up and modified bitumen systems range from 15–25 years depending on assembly and maintenance.",
      },
    ],
    ctaPrimary: "Get a Flat Roof Assessment",
    heroImage: {
      base: "/images/services/flat-roofing",
      alt: "Aerial view of a large commercial flat warehouse roof in North Texas",
    },
    supportingImages: [
      {
        base: "/images/services/flat-roofing-detail-1",
        alt: "Roof drain with clamping ring set into a white TPO membrane with water flowing toward it",
        caption: "Positive slope to drain — engineered with tapered insulation — is what keeps a flat roof out of trouble.",
        sectionHeading: "Drainage is the failure point",
      },
    ],
  },
  {
    slug: "metal-roofing",
    title: "Metal Roofing Systems",
    shortTitle: "Metal Roofing",
    icon: Layers,
    category: "System",
    seoTitle: "Commercial Metal Roofing | DFW Standing Seam & R-Panel | Lone Star",
    seoDescription:
      "Commercial standing seam and R-panel metal roofing across North Texas. Custom fabrication, retrofit framing, and decades-long manufacturer warranties.",
    tagline: "Standing seam and R-panel systems built to outlast traditional materials.",
    problem:
      "Metal roofs deliver decades of performance — but only when the panel system, fastening, and detailing are right. The wrong gauge, wrong fastener pattern, or sloppy flashings turn a 50-year roof into a 15-year roof.",
    included: [
      "Standing seam metal panel systems",
      "R-panel exposed-fastener systems",
      "Custom on-site or shop fabrication",
      "Retrofit framing over existing low-slope assemblies",
      "Manufacturer warranties on panel finish and substrate",
    ],
    why:
      "Metal is one of the longest-lived commercial roofing options when it's specified and installed correctly. We've been doing it across North Texas for over two decades.",
    pricing: {
      display: "Starting at $9 / sq ft · Typical range $9 – $18 / sq ft installed",
      starting: 9,
      min: 9,
      max: 18,
      unit: "sqft",
    },
    features: [
      "Standing seam",
      "R-panel",
      "Retrofit framing",
      "Custom fabrication",
    ],
    sections: [
      {
        heading: "Standing seam vs. R-panel",
        body: "Standing seam systems hide their fasteners under raised seams, eliminating the most common metal-roof leak point and delivering 40–50+ year service life. R-panel uses exposed fasteners with neoprene washers — faster and cheaper to install, with 20–30 year service life under typical maintenance.",
      },
      {
        heading: "Retrofit framing over a failing flat roof",
        body: "On certain buildings, framing a sloped metal system over an existing low-slope assembly delivers permanent drainage, dramatic energy savings, and a fresh long-warranty roof without a full tear-off. We evaluate structural capacity and run the cost comparison before recommending it.",
      },
      {
        heading: "Hail and wind performance",
        body: "Properly gauged metal panels (24 ga and heavier) handle DFW hail well and carry strong wind uplift ratings. Most carriers offer meaningful insurance discounts on metal commercial roofs — worth pricing into the lifecycle math.",
      },
    ],
    faqs: [
      {
        question: "How long does a commercial metal roof last in DFW?",
        answer:
          "Standing seam systems with quality finishes routinely deliver 40–50+ years of service life in the North Texas climate. R-panel systems typically last 20–30 years with normal maintenance.",
      },
    ],
    ctaPrimary: "Get a Metal Roof Quote",
    heroImage: {
      base: "/images/services/metal-roofing",
      alt: "Standing seam metal roofing system on a commercial building",
    },
    supportingImages: [
      {
        base: "/images/services/metal-roofing-detail-1",
        alt: "Close-up of a standing seam detail between two charcoal grey metal roof panels with concealed clip fastening",
        caption: "Standing seams hide their fasteners — eliminating the most common metal-roof leak point.",
        sectionHeading: "Standing seam vs. R-panel",
      },
    ],
  },
  {
    slug: "tpo-epdm-pvc",
    title: "TPO, EPDM & PVC Membrane Systems",
    shortTitle: "TPO / EPDM / PVC Membranes",
    icon: Box,
    category: "System",
    seoTitle: "Commercial TPO, EPDM & PVC Membrane Roofing | DFW | Lone Star",
    seoDescription:
      "Authorized installer of Firestone (Elevate), Mule-Hide, and Duro-Last TPO, EPDM, and PVC single-ply membrane systems across the DFW Metroplex.",
    tagline: "Authorized installer for Firestone (Elevate), Mule-Hide, and Duro-Last.",
    problem:
      "Single-ply membranes dominate commercial roofing because they work — when installed by an authorized contractor with the right attachment method for the building. Unauthorized installs void warranties and rarely match factory performance.",
    included: [
      "Firestone (Elevate) UltraPly TPO and RubberGard EPDM",
      "Mule-Hide TPO, EPDM, and coating systems",
      "Duro-Last custom-prefabricated PVC",
      "Heat-welded seams, fully adhered or mechanically attached",
      "High-reflectivity / cool-roof rated assemblies",
      "Manufacturer NDL warranties up to 30 years",
    ],
    why:
      "We're authorized for all three. That means we can match the right manufacturer and system to your building — and back it with a full factory warranty.",
    pricing: {
      display: "Starting at $6 / sq ft · Typical range $6 – $12 / sq ft installed",
      starting: 6,
      min: 6,
      max: 12,
      unit: "sqft",
    },
    features: [
      "Firestone TPO & EPDM",
      "Mule-Hide membrane systems",
      "Duro-Last PVC roofing",
      "Heat-welded seams",
      "Fully adhered & mechanically attached",
      "High-reflectivity roofing",
    ],
    sections: [
      {
        heading: "TPO — the modern default",
        body: "Thermoplastic Polyolefin is the most widely installed single-ply system in commercial roofing. Heat-welded seams stronger than the membrane itself, white reflective surface that cuts cooling load, and excellent installed cost-per-square-foot. The right call for most DFW warehouses, retail, office, and industrial buildings.",
      },
      {
        heading: "PVC — premium for chemical, grease, and fire exposure",
        body: "Polyvinyl Chloride membranes — and especially Duro-Last's factory-fabricated systems — are the right answer for restaurants, food processing, manufacturing with chemical exposure, hospitals, and buildings with many roof penetrations. Longer typical service life, superior fire and chemical resistance, and the industry's best NDL warranty.",
      },
      {
        heading: "EPDM — proven rubber single-ply",
        body: "Ethylene Propylene Diene Monomer (rubber) membranes have a 50-year track record in commercial roofing. EPDM excels in cold-cycle flexibility and chemical resistance, with strong cost-per-square-foot economics. Best installed fully adhered on the right substrate.",
      },
      {
        heading: "Heat-welded seams done right",
        body: "Single-ply seams live and die on weld quality — temperature, speed, roller pressure, and probe testing. We probe-test every seam, document the welds, and keep the records in your warranty file. It's not glamorous work; it's the difference between a 25-year roof and a 7-year roof.",
      },
    ],
    faqs: [
      {
        question: "Which is better — TPO or PVC?",
        answer:
          "Neither is universally better — they're optimized for different buildings. TPO is the cost-effective default for warehouses, retail, and offices. PVC is the right call for restaurants, food processing, chemical exposure, and complex roofs with many penetrations.",
      },
      {
        question: "How long do TPO and PVC roofs last in DFW?",
        answer:
          "A properly installed 60- or 80-mil TPO typically lasts 20–25 years in the North Texas climate. A PVC system like Duro-Last typically lasts 25–30+ years. Both require bi-annual maintenance to hit the upper end.",
      },
    ],
    ctaPrimary: "Get a Membrane System Quote",
    heroImage: {
      base: "/images/services/tpo-epdm-pvc",
      alt: "Heat-welded seam on a white TPO single-ply membrane commercial roof",
    },
    supportingImages: [
      {
        base: "/images/services/tpo-epdm-pvc-detail-1",
        alt: "Roofer probe-testing a heat-welded seam on a white TPO single-ply membrane",
        caption: "Every seam gets probe-tested and documented in your warranty file. Not glamorous — but decisive.",
        sectionHeading: "Heat-welded seams done right",
      },
      {
        base: "/images/services/tpo-epdm-pvc-detail-2",
        alt: "Aerial view of a freshly installed bright white reflective TPO membrane covering a large flat warehouse roof with parallel heat-welded seams and tidy rooftop HVAC units",
        caption: "Bright white TPO reflects North Texas heat and cuts cooling load — the modern default for warehouses, retail, and offices.",
        sectionHeading: "TPO — the modern default",
      },
    ],
  },
];

export const serviceBySlug: Record<string, ServiceDetail> = Object.fromEntries(
  services.map((s) => [s.slug, s]),
);
