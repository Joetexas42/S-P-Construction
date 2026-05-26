import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Building2, MapPin, Ruler, Calendar, CheckCircle2, ArrowRight, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

type CaseStudy = {
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

const caseStudies: CaseStudy[] = [
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

function formatSqFt(n: number) {
  return n.toLocaleString("en-US");
}

export default function Projects() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = useMemo(
    () => caseStudies.find((c) => c.slug === activeSlug) ?? null,
    [activeSlug],
  );

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Commercial Roofing Case Studies — DFW Metroplex",
    itemListElement: caseStudies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      description: `${formatSqFt(c.sizeSqFt)} sq ft ${c.system} in ${c.city}.`,
    })),
  };

  return (
    <>
      <SEO
        title="Commercial Roofing Case Studies — DFW Projects | Lone Star Commercial Roofing"
        description="Real DFW commercial roofing case studies: TPO, PVC, and standing-seam metal replacements in Frisco, Fort Worth, Dallas, Plano, McKinney, and Arlington."
        jsonLd={itemListJsonLd}
      />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 inline-block">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">
              Real DFW Commercial Roofing Projects
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Detailed scope, system, and outcome on recent TPO, PVC, and
              standing-seam metal replacements across the Dallas–Fort Worth
              metroplex.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-muted border-b border-border py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                {formatSqFt(
                  caseStudies.reduce((sum, c) => sum + c.sizeSqFt, 0),
                )}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                Sq Ft on This Page
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                {caseStudies.length}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                Featured DFW Projects
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                6
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                DFW Cities Served
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                20+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                Year Warranties
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case studies grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((c) => (
              <CaseStudyCard
                key={c.slug}
                study={c}
                onOpen={() => setActiveSlug(c.slug)}
              />
            ))}
          </div>

          <div className="mt-16 text-center bg-muted p-12 rounded-lg border border-border">
            <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">
              Your facility could be our next case study
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Free on-site assessment, infrared moisture survey, and a written
              scope-of-work — typically within 48 hours of your call.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white"
              >
                Request Free Inspection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {active && (
        <CaseStudyDetail study={active} onClose={() => setActiveSlug(null)} />
      )}
    </>
  );
}

function CaseStudyCard({
  study,
  onOpen,
}: {
  study: CaseStudy;
  onOpen: () => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-lg transition-shadow">
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        <img
          src={study.image}
          alt={study.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider text-white bg-secondary px-3 py-1.5 rounded shadow">
          {study.system}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 text-secondary" />
          <span>{study.city}</span>
          <span className="text-border">|</span>
          <Calendar className="h-3.5 w-3.5 text-secondary" />
          <span>{study.completed}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-heading font-bold uppercase tracking-tight text-foreground mb-3 leading-tight">
          {study.title}
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="flex items-start gap-2">
            <Building2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Building
              </div>
              <div className="text-foreground">{study.buildingType}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Ruler className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Size
              </div>
              <div className="text-foreground">
                {formatSqFt(study.sizeSqFt)} sq ft
              </div>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
          {study.scope}
        </p>
        <button
          onClick={onOpen}
          className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-wide text-sm hover:gap-3 transition-all self-start"
        >
          Read full case study <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function CaseStudyDetail({
  study,
  onClose,
}: {
  study: CaseStudy;
  onClose: () => void;
}) {
  const detailJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.seoDescription,
    about: study.system,
    locationCreated: {
      "@type": "Place",
      name: study.city,
    },
  };

  return (
    <>
      <SEO
        title={study.seoTitle}
        description={study.seoDescription}
        jsonLd={detailJsonLd}
      />
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start md:items-center justify-center p-0 md:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="bg-background w-full max-w-4xl my-0 md:my-12 rounded-none md:rounded-lg shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Close case study"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="aspect-[16/9] overflow-hidden bg-muted rounded-t-none md:rounded-t-lg">
            <img
              src={study.image}
              alt={study.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              <span className="text-secondary bg-secondary/10 px-2 py-1 rounded">
                {study.system}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-secondary" /> {study.city}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-secondary" />{" "}
                {study.completed}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground mb-6 leading-tight">
              {study.title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-muted rounded-lg border border-border">
              <DetailStat label="Building" value={study.buildingType} />
              <DetailStat label="System" value={study.brand} />
              <DetailStat
                label="Size"
                value={`${formatSqFt(study.sizeSqFt)} sq ft`}
              />
              <DetailStat label="Completed" value={study.completed} />
            </div>

            <DetailSection title="Scope of Work">{study.scope}</DetailSection>
            <DetailSection title="The Challenge">{study.challenge}</DetailSection>
            <DetailSection title="The Outcome">{study.outcome}</DetailSection>

            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-3">
                Project Highlights
              </h3>
              <ul className="space-y-2">
                {study.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <p className="text-muted-foreground text-sm">
                Have a similar project in {study.city.split(",")[0]} or the DFW
                area?
              </p>
              <Link href="/contact" onClick={onClose}>
                <Button className="font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white">
                  Get a Free Inspection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1">
        {label}
      </div>
      <div className="text-sm font-semibold text-foreground leading-snug">
        {value}
      </div>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-2">
        {title}
      </h3>
      <p className="text-foreground leading-relaxed">{children}</p>
    </div>
  );
}
