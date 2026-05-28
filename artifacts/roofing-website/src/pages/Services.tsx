import { useState } from "react";
import { Link } from "wouter";
import {
  CheckCircle2,
  Thermometer,
  Shield,
  Phone,
  HardHat,
  HelpCircle,
  ArrowRight,
  Wrench,
  Layers,
  Maximize,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { cities } from "@/data/cities";
import { services, coreSystemSlugs, specialtyServiceSlugs } from "@/data/services";

const SITE_ORIGIN = "https://scottcommercialroofing.com";
const PROVIDER_ID = `${SITE_ORIGIN}/#organization`;

type ServiceFilter = "all" | "core" | "specialty";

export default function Services() {
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>("all");
  const coreServices = services.filter((s) => s.category === "Core");
  const systemServices = services.filter((s) => s.category === "System");

  const tpoBenefits = [
    {
      title: "Energy Efficiency & UV Reflectivity",
      body: "TPO's white reflective surface bounces solar radiation back into the atmosphere instead of absorbing it — a critical advantage on North Texas rooftops that endure 100°F+ summers. Less heat absorbed means lower HVAC demand across your entire building.",
    },
    {
      title: "Lower Cooling Costs",
      body: "By reducing heat transfer through the roof membrane, TPO can meaningfully cut your building's cooling load. For large commercial facilities in the DFW Metroplex, that translates to real, measurable savings on monthly energy bills.",
    },
    {
      title: "Cost-Effective Installation",
      body: "Compared to traditional built-up roofing or premium PVC systems, TPO delivers outstanding performance at a lower installed cost per square foot — making it the go-to choice for budget-conscious property managers who refuse to sacrifice quality.",
    },
    {
      title: "Puncture Resistance",
      body: "Modern TPO membranes are engineered to resist punctures from foot traffic, rooftop equipment, and hail impacts. For commercial properties with HVAC units, solar arrays, or regular maintenance personnel on the roof, this toughness matters.",
    },
    {
      title: "Heat-Welded Seams for Superior Leak Protection",
      body: "Unlike adhesive-bonded systems, TPO seams are hot-air welded, fusing the membrane into a single continuous piece. Properly installed, these seams are actually stronger than the membrane itself — eliminating the most common failure point on commercial roofs.",
    },
    {
      title: "Ideal for Low-Slope & Flat Roofs",
      body: "TPO is purpose-built for the low-slope and flat roof geometry common across North Texas warehouses, retail centers, medical offices, and industrial facilities. It handles ponding water and thermal movement without compromising the membrane.",
    },
    {
      title: "Weather & Storm Performance",
      body: "Texas weather is unforgiving — hailstorms, high winds, and temperature swings are facts of life in the Metroplex. TPO membranes are rated for high wind uplift and remain flexible across extreme temperature ranges, from February ice storms to August heat waves.",
    },
    {
      title: "Reduced Maintenance Requirements",
      body: "TPO is highly resistant to algae, dirt accumulation, and chemical exposure. It holds up well with minimal upkeep, which is especially valuable for large facilities where ongoing maintenance costs add up quickly year over year.",
    },
    {
      title: "Compatible with Coatings & Repair Systems",
      body: "When a TPO roof approaches the end of its service life, it doesn't necessarily need a full tear-off. Compatible restoration coatings can extend the membrane's performance and push replacement costs years into the future — protecting your capital budget.",
    },
    {
      title: "Strong Warranty & Manufacturer Support",
      body: "Leading manufacturers like Firestone (Elevate) and Mule-Hide back their TPO systems with robust warranties covering both material and labor. As authorized installers, we ensure your system is installed to spec so every warranty clause remains fully intact.",
    },
  ];

  const comparisonRows: { label: string; tpo: string; pvc: string }[] = [
    { label: "Installed Cost", tpo: "Lower cost per sq ft — the most affordable major single-ply system", pvc: "Premium pricing, typically 20–40% higher than TPO" },
    { label: "Chemical & Grease Resistance", tpo: "Good — handles typical rooftop exposure", pvc: "Excellent — resists oils, animal fats, and harsh chemicals (restaurants, food processing)" },
    { label: "Seam Strength (Weldability)", tpo: "Heat-welded seams; strong, but quality depends on installer skill and weld temperature", pvc: "Heat-welded seams that re-weld easily for decades — easiest membrane to repair and modify" },
    { label: "Typical Lifespan", tpo: "20–25 years with quality install and maintenance", pvc: "25–30+ years; long history of proven field performance" },
    { label: "Manufacturer Warranty", tpo: "Strong — up to 20–30 year NDL warranties from Firestone (Elevate) and Mule-Hide", pvc: "Industry-leading — Duro-Last offers a full-system, no-dollar-limit warranty including consequential damages" },
    { label: "Fire Performance", tpo: "Good — Class A ratings available in most assemblies", pvc: "Excellent — inherently fire-resistant, self-extinguishing" },
    { label: "Best-Fit Buildings", tpo: "Warehouses, distribution centers, retail, office, schools, churches — large flat roofs where energy efficiency and budget matter most", pvc: "Restaurants, food processing, manufacturing with chemical exposure, hospitals, complex roofs with many penetrations" },
  ];

  const manufacturers = [
    {
      name: "Firestone (Elevate)",
      tag: "TPO & EPDM Systems",
      logo: "/images/manufacturers/firestone-elevate.svg",
      lede: "The benchmark for single-ply performance in North America. Now branded Elevate, Firestone's UltraPly TPO and RubberGard EPDM lines are engineered for high wind uplift, hail resistance, and decades of reliable service.",
      highlights: [
        "UltraPly TPO membranes available up to 80 mil for maximum puncture resistance",
        "Red Shield NDL (No Dollar Limit) warranties up to 30 years",
        "Full-system warranties covering membrane, insulation, fasteners, and accessories",
        "Strong factory tech support — we can pull engineering on complex assemblies",
      ],
      bestFor: "Mid- to large-format flat roofs where long warranty terms and a globally trusted brand matter.",
    },
    {
      name: "Mule-Hide",
      tag: "TPO, EPDM & Coatings",
      logo: "/images/manufacturers/mule-hide.svg",
      lede: "A contractor-favorite brand owned by ABC Supply. Mule-Hide's TPO and EPDM systems pair excellent membrane quality with strong dealer support, fast material availability across North Texas, and competitive warranty terms.",
      highlights: [
        "Full line of TPO (45, 60, 80 mil) and EPDM membranes",
        "Total System warranties up to 30 years",
        "Complementary coating systems for restoration of aging roofs",
        "Excellent regional availability — material lead times stay short",
      ],
      bestFor: "Building owners who want a top-tier system with fast turnaround on both new installs and warranty repairs.",
    },
    {
      name: "Duro-Last",
      tag: "Custom Prefabricated PVC",
      logo: "/images/manufacturers/duro-last.svg",
      lede: '"The World\'s Best Roof" tagline isn\'t marketing fluff — Duro-Last\'s factory-fabricated PVC membranes are custom-built to your roof\'s exact dimensions, including all penetrations and corners. That eliminates 80–85% of field seams, which is where commercial roofs almost always fail.',
      highlights: [
        "Factory-fabricated to your roof's exact specs — corners and curbs prewelded",
        "Highly resistant to chemicals, grease, and ponding water",
        "Class A fire rating and excellent wind uplift performance",
        "Industry-leading 15- and 20-year edge-to-edge NDL warranties including consequential damages",
      ],
      bestFor: "Restaurants, food processing, manufacturing, and any building with heavy chemical/grease exposure or many roof penetrations.",
    },
  ];

  const faqs: { question: string; answer: string }[] = [
    {
      question: "What's the difference between TPO and PVC roofing, and which lasts longer?",
      answer:
        "TPO and PVC are both heat-welded single-ply membranes, but PVC typically lasts 25–30+ years while TPO lasts 20–25 years with quality installation and maintenance. PVC offers superior chemical, grease, and fire resistance — making it the right choice for restaurants, food processing plants, and buildings with heavy rooftop chemical exposure. TPO is more cost-effective per square foot and is the better fit for large warehouses, retail centers, and offices where energy efficiency and budget are the priorities.",
    },
    {
      question: "What's included in a free commercial roof inspection?",
      answer:
        "Our free commercial roof inspections include an on-site walkthrough by a senior inspector (never a salesperson), drone imagery and high-resolution photo documentation, thermal imaging to locate trapped moisture, core sampling on aging systems where appropriate, and a written report with prioritized findings, photos, and transparent pricing. There is no obligation and no pressure — you receive an honest report on what's actually wrong and what can safely wait.",
    },
    {
      question: "How long does a commercial hail damage insurance claim take in North Texas?",
      answer:
        "Most DFW commercial hail claims take 30 to 90 days from initial inspection to roof completion, depending on carrier responsiveness, adjuster availability, and the scope of approved work. We document hail damage with drone imagery and thermal scans, prepare detailed Xactimate-aligned scopes, meet your adjuster on the roof, and advocate through supplements until your scope reflects the actual damage. Emergency tarping happens immediately so secondary water damage doesn't compound the claim.",
    },
    {
      question: "How much does a commercial roof replacement cost per square foot?",
      answer:
        "Commercial reroof pricing in North Texas generally ranges from about $7 to $14 per square foot installed, depending on the membrane system (TPO, PVC, EPDM, or metal), insulation R-value, tear-off complexity, deck condition, roof penetrations, and warranty term. We provide line-item pricing in every proposal so you can see exactly what drives the number.",
    },
    {
      question: "Do you offer 24/7 emergency leak repair across the DFW Metroplex?",
      answer:
        "Yes. We dispatch emergency leak response crews 24/7 across the entire DFW Metroplex, including Dallas, Fort Worth, Plano, Frisco, Arlington, Irving, McKinney, and surrounding cities. Initial response includes water mitigation, emergency tarping or temporary sealing, root-cause leak diagnosis, and documentation for your insurance carrier and warranty file.",
    },
    {
      question: "Are you an authorized installer for Firestone, Mule-Hide, and Duro-Last?",
      answer:
        "Yes. We are an authorized installer and service partner for Firestone (Elevate) TPO and EPDM, Mule-Hide TPO/EPDM and coating systems, and Duro-Last custom-prefabricated PVC. Authorized status means we can issue full manufacturer NDL (No Dollar Limit) warranties.",
    },
  ];

  const canonical = `${SITE_ORIGIN}/services`;

  const countySet = new Set<string>();
  for (const c of cities) {
    for (const part of c.county.split(/\s*&\s*/)) {
      countySet.add(part.trim());
    }
  }
  const areaServed = [
    ...cities.map((c) => ({
      "@type": "City",
      "name": c.name,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": c.county,
        "addressRegion": "TX",
        "addressCountry": "US",
      },
    })),
    ...Array.from(countySet).map((county) => ({
      "@type": "AdministrativeArea",
      "name": county,
      "addressRegion": "TX",
      "addressCountry": "US",
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RoofingContractor",
        "@id": PROVIDER_ID,
        "name": "Scott Commercial Roofing",
        "url": SITE_ORIGIN,
        "image": `${SITE_ORIGIN}/images/hero-bg.webp`,
        "telephone": "(972) 555-0100",
        "email": "info@scottcommercialroofing.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dallas",
          "addressRegion": "TX",
          "addressCountry": "US",
        },
        "areaServed": areaServed,
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#service-list`,
        "name": "Commercial Roofing Services",
        "itemListElement": services.map((s, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "url": `${SITE_ORIGIN}/services/${s.slug}`,
          "name": s.title,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <SEO
        title="Commercial Roofing Services | TPO, PVC & Metal | North Texas"
        description="Commercial flat roof specialists serving the DFW Metroplex: TPO, PVC, and EPDM single-ply membranes, metal roofing, inspections, repairs, and 24/7 emergency leak response. Authorized Firestone (Elevate), Mule-Hide, and Duro-Last installer."
        canonical={canonical}
        jsonLd={jsonLd}
      />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">
              Commercial Roofing Services
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Scott Commercial Roofing — DFW's flat-roof specialists. We engineer, install, and maintain high-performance TPO, PVC, EPDM, and metal roofing systems built for the DFW climate. Authorized installer and service partner for Firestone (Elevate), Mule-Hide, and Duro-Last PVC.
            </p>
            <div className="mt-6">
              <Link href="/estimate">
                <Button size="lg" className="font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white" data-testid="services-cta-estimate">
                  Get Instant Satellite Estimate
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a href="#core-services" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold uppercase tracking-wider transition-colors">Inspections · Repairs · Installs</a>
              <a href="#all-services" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold uppercase tracking-wider transition-colors">All Services</a>
              <a href="#tpo-vs-pvc" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold uppercase tracking-wider transition-colors">TPO vs. PVC</a>
              <a href="#manufacturers" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold uppercase tracking-wider transition-colors">Firestone · Mule-Hide · Duro-Last</a>
            </div>
          </div>
        </div>
      </section>

      {/* Core services */}
      <section id="core-services" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Core Commercial Services</p>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              Inspections, Repairs &amp; Installations
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Three core services — one standard of work. Every job starts with an honest diagnosis and ends with a documented, warranty-backed result.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreServices.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="service-card-animate group bg-card border border-border rounded-xl p-8 shadow-sm hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex flex-col"
                  style={{ animationDelay: `${idx * 40}ms` }}
                  data-testid={`core-service-${svc.slug}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110">
                    <Icon className="h-7 w-7 text-secondary transition-transform duration-200 group-hover:scale-110" />
                  </div>
                  <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-foreground mb-3">
                    {svc.shortTitle}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">{svc.tagline}</p>
                  <ul className="space-y-2 mb-6">
                    {svc.included.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto text-sm font-bold text-secondary uppercase tracking-wide inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore service <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All services grid */}
      <section id="all-services" className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Full Service Capability</p>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground">
              Every Commercial Roofing System We Support
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-5">
              Each service has its own dedicated page with deeper detail, FAQs, and how we approach it.
            </p>
          </div>

          {/* Category highlight strip */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
            {[
              { label: "Maintenance Programs", desc: "Scheduled inspections & proactive repairs", slug: "maintenance", Icon: Wrench },
              { label: "Coatings & Restoration", desc: "Extend membrane life without tear-off", slug: "coatings-restoration", Icon: Layers },
              { label: "Flat Roofing", desc: "Low-slope systems built for Texas weather", slug: "flat-roofing", Icon: Maximize },
              { label: "Metal Roofing", desc: "Standing-seam & retrofit solutions", slug: "metal-roofing", Icon: Shield },
            ].map(({ label, desc, slug, Icon }) => (
              <Link
                key={label}
                href={`/services/${slug}`}
                className="group flex flex-col items-center text-center bg-card border border-secondary/30 rounded-xl px-5 py-4 min-w-[160px] hover:border-secondary hover:shadow-md hover:scale-[1.04] transition-all cursor-pointer"
              >
                <Icon className="w-5 h-5 text-secondary mb-2 transition-transform duration-200 group-hover:scale-125 group-hover:text-secondary/80" />
                <span className="text-sm font-heading font-bold uppercase tracking-tight text-foreground leading-snug">{label}</span>
                <span className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</span>
              </Link>
            ))}
          </div>

          {(() => {
            const coreSystems = systemServices.filter((s) => (coreSystemSlugs as readonly string[]).includes(s.slug));
            const specialtyServices = systemServices.filter((s) => (specialtyServiceSlugs as readonly string[]).includes(s.slug));

            const renderCard = (svc: (typeof systemServices)[number], cardIndex: number) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="service-card-animate group bg-card border border-border p-7 rounded-xl shadow-sm hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex flex-col"
                  style={{ animationDelay: `${cardIndex * 40}ms` }}
                  data-testid={`service-card-${svc.slug}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-secondary transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-heading font-bold uppercase tracking-tight text-foreground leading-snug">
                      {svc.shortTitle}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-5">{svc.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {svc.features.slice(0, 3).map((f) => (
                      <span key={f} className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                        {f}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto text-sm font-bold text-secondary uppercase tracking-wide inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            };

            const filterTabs: { id: ServiceFilter; label: string }[] = [
              { id: "all", label: "All Services" },
              { id: "core", label: "Core Systems" },
              { id: "specialty", label: "Specialty Services" },
            ];

            return (
              <div className="max-w-7xl mx-auto">
                {/* Filter tabs */}
                <div className="flex justify-center gap-2 mb-10 flex-wrap">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all border ${
                        activeFilter === tab.id
                          ? "bg-secondary text-secondary-foreground border-secondary shadow-sm"
                          : "bg-transparent text-muted-foreground border-border hover:border-secondary hover:text-foreground"
                      }`}
                      data-testid={`filter-tab-${tab.id}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(activeFilter === "all" || activeFilter === "core") && (
                    <>
                      <div className="col-span-full flex items-center gap-4">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary px-4 py-1.5 rounded-full bg-secondary/10 whitespace-nowrap">
                          Core Systems
                        </span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      {coreSystems.map((svc, i) => renderCard(svc, i))}
                    </>
                  )}

                  {(activeFilter === "all" || activeFilter === "specialty") && (
                    <>
                      <div className={`col-span-full flex items-center gap-4 ${activeFilter === "all" ? "mt-4" : ""}`}>
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary px-4 py-1.5 rounded-full bg-secondary/10 whitespace-nowrap">
                          Specialty Services
                        </span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      {specialtyServices.map((svc, i) => renderCard(svc, activeFilter === "all" ? coreSystems.length + i : i))}
                    </>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Single-Ply intro */}
      <section id="single-ply" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Single-Ply Roofing Systems</p>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              TPO &amp; PVC — The Modern Standard for Commercial Flat Roofs
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Single-ply membranes have become the dominant choice for low-slope and flat commercial roofing across North Texas — and for good reason. These systems deliver proven performance, manufacturer-backed warranties, and long-term value that older roofing methods simply cannot match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-card border border-border rounded-xl p-8 hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110">
                <Thermometer className="h-7 w-7 text-secondary transition-transform duration-200 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-foreground mb-3">TPO Roofing</h3>
              <p className="text-base font-semibold text-secondary mb-3">Affordable, energy-efficient, and durable.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Thermoplastic Polyolefin (TPO) is the most widely installed single-ply system in commercial roofing today. Its white reflective surface combats the North Texas heat by deflecting solar radiation, reducing cooling loads and energy costs.
              </p>
              <a href="#tpo-benefits" className="text-sm font-bold text-secondary uppercase tracking-wide inline-flex items-center gap-2 hover:gap-3 transition-all">
                See 10 Benefits of TPO <span>&rarr;</span>
              </a>
            </div>

            <div className="group bg-card border border-border rounded-xl p-8 hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110">
                <Shield className="h-7 w-7 text-secondary transition-transform duration-200 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-foreground mb-3">PVC Roofing</h3>
              <p className="text-base font-semibold text-secondary mb-3">Chemically resistant, fire-rated, premium performance.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Polyvinyl Chloride (PVC) membranes are the premium choice when chemical resistance, fire performance, or grease exposure are factors — common in restaurant groups, food processing plants, hospitals, and industrial facilities across the Metroplex.
              </p>
              <a href="#tpo-vs-pvc" className="text-sm font-bold text-secondary uppercase tracking-wide inline-flex items-center gap-2 hover:gap-3 transition-all">
                Compare TPO vs. PVC <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TPO vs PVC comparison */}
      <section id="tpo-vs-pvc" className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Side-by-Side Comparison</p>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              TPO vs. PVC — Which Single-Ply System Is Right for Your Building?
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm" data-testid="tpo-vs-pvc-table">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="p-5 text-xs font-bold uppercase tracking-widest w-1/4">Factor</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-widest">TPO</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-widest">PVC</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={`border-t border-border align-top ${i % 2 === 0 ? "bg-background" : "bg-card"}`}>
                    <td className="p-5 font-heading font-bold uppercase text-sm tracking-tight text-foreground">{row.label}</td>
                    <td className="p-5 text-sm text-muted-foreground leading-relaxed">{row.tpo}</td>
                    <td className="p-5 text-sm text-muted-foreground leading-relaxed">{row.pvc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 bg-card border border-border rounded-xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Still Not Sure?</p>
              <p className="text-lg text-foreground font-semibold">Tell us about your building. We'll recommend the right system — honestly.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <Button size="lg" className="font-bold uppercase tracking-wide w-full sm:w-auto" data-testid="cta-compare-contact">
                  Get a System Recommendation
                </Button>
              </Link>
              <a href="tel:972-555-0100">
                <Button size="lg" variant="outline" className="font-bold uppercase tracking-wide w-full sm:w-auto gap-2">
                  <Phone className="h-4 w-4" /> (972) 555-0100
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturers */}
      <section id="manufacturers" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Authorized Manufacturer Partners</p>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              Firestone (Elevate), Mule-Hide &amp; Duro-Last
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We install the systems we trust. Each of these manufacturers brings something different to a commercial roof — and as authorized installers, we can match the system to your building, not the other way around.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {manufacturers.map((mfr) => (
              <div
                key={mfr.name}
                className="group bg-card border border-border rounded-xl p-8 flex flex-col hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                data-testid={`mfr-card-${mfr.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
              >
                <div className="mb-5 bg-white border border-border rounded-lg h-20 flex items-center justify-center px-4">
                  <img
                    src={mfr.logo}
                    alt={`${mfr.name} logo`}
                    width={220}
                    height={56}
                    className="max-h-14 w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const img = e.currentTarget;
                      const parent = img.parentElement;
                      if (!parent) return;
                      img.style.display = "none";
                      if (!parent.querySelector("[data-fallback]")) {
                        const fb = document.createElement("span");
                        fb.setAttribute("data-fallback", "true");
                        fb.className = "font-heading font-black text-xl uppercase tracking-tight text-foreground";
                        fb.textContent = mfr.name;
                        parent.appendChild(fb);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <HardHat className="h-6 w-6 text-secondary transition-transform duration-200 group-hover:scale-110" />
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary">{mfr.tag}</p>
                </div>
                <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-foreground mb-3">{mfr.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{mfr.lede}</p>

                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">System Highlights</p>
                <ul className="space-y-2 mb-6">
                  {mfr.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5 border-t border-border">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Best Fit</p>
                  <p className="text-sm text-foreground leading-relaxed">{mfr.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Benefits of TPO */}
      <section id="tpo-benefits" className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Educational Resource</p>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              10 Benefits of TPO Roofing for DFW Commercial Buildings
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If your DFW commercial building has a flat or low-slope roof, TPO is likely the most cost-effective and climate-appropriate system available today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tpoBenefits.map((benefit, i) => (
              <div
                key={i}
                className="flex gap-6 bg-card border border-border rounded-xl p-7 hover:border-secondary hover:scale-[1.02] hover:shadow-lg transition-all duration-200 group"
                data-testid={`benefit-card-${i}`}
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-200">
                    <span className="font-heading font-black text-secondary text-lg">{i + 1}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold uppercase tracking-tight text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-background border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Frequently Asked Questions</p>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              Commercial Roofing Questions, Answered
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-5">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-xl p-6 md:p-7 shadow-sm open:border-secondary transition-colors"
                data-testid={`faq-item-${i}`}
              >
                <summary className="flex items-start gap-4 cursor-pointer list-none">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-open:bg-secondary/20 transition-colors">
                    <HelpCircle className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="flex-1 text-lg md:text-xl font-heading font-bold text-foreground leading-snug">
                    {faq.question}
                  </h3>
                  <span className="shrink-0 text-secondary font-heading font-black text-2xl leading-none mt-1 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-5 pl-14">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-6 text-white">
            Not Sure What You Need?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let our experts assess your roof. We provide comprehensive inspections and transparent, honest recommendations across the entire DFW Metroplex.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-white text-secondary hover:bg-white/90 hover:text-secondary border-transparent" data-testid="button-schedule-inspection">
              Schedule Free Inspection
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
