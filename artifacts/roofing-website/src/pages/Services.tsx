import { SEO } from "@/components/SEO";
import { cities } from "@/data/cities";
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
  CheckCircle2,
  Thermometer,
  DollarSign,
  Shield,
  Droplet,
  Wind,
  Settings,
  Award,
  Phone,
  FileCheck,
  HardHat,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Services() {
  const leadServices = [
    {
      id: "inspection",
      title: "Free Commercial Roof Inspections",
      icon: Search,
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
    },
    {
      id: "repair",
      title: "Commercial Roof Repair & Emergency Leak Response",
      icon: Wrench,
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
    },
    {
      id: "installation",
      title: "New Roof Installation & Full Replacement",
      icon: LayoutGrid,
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
    },
  ];

  const servicesList = [
    {
      id: "replacement",
      title: "Full Roof Replacement",
      icon: LayoutGrid,
      description:
        "Complete tear-offs and replacements engineered for longevity and minimal disruption to your daily operations.",
      features: [
        "Complete tear-offs",
        "Deck replacement",
        "System upgrades",
        "Warranty-backed installation",
      ],
    },
    {
      id: "maintenance",
      title: "Maintenance Programs",
      icon: Activity,
      description:
        "Proactive care that extends the life of your roof and prevents catastrophic failures before they happen.",
      features: [
        "Bi-annual inspections",
        "Debris removal",
        "Drain clearing",
        "Preventative sealing",
      ],
    },
    {
      id: "storm-damage",
      title: "Storm Damage & Hail Repair",
      icon: Zap,
      description:
        "Emergency weather recovery and complete insurance claims assistance to get your business back online.",
      features: [
        "Emergency tarping",
        "Hail damage assessment",
        "Wind uplift repair",
        "Claims advocacy",
      ],
    },
    {
      id: "emergency",
      title: "Emergency Leak Repair",
      icon: Droplets,
      description:
        "24/7 rapid response teams ready to deploy across the DFW Metroplex to mitigate water intrusion.",
      features: [
        "24/7 dispatch",
        "Immediate mitigation",
        "Water extraction",
        "Temporary sealing",
      ],
    },
    {
      id: "coatings",
      title: "Roof Coatings & Restoration",
      icon: ArrowUpToLine,
      description:
        "Cost-effective fluid-applied systems that restore your roof's performance and improve energy efficiency.",
      features: [
        "Silicone coatings",
        "Acrylic systems",
        "Rust inhibition",
        "Energy star rated",
      ],
    },
    {
      id: "flat-roofing",
      title: "Flat / Low-Slope Roofing",
      icon: AlignHorizontalJustifyCenter,
      description:
        "Specialized solutions for industrial and commercial flat roofs designed to handle heavy rooftop equipment. We work with Firestone, Mule-Hide, and Duro-Last PVC systems engineered for North Texas heat loads.",
      features: [
        "Built-up roofing (BUR)",
        "Modified bitumen",
        "Duro-Last PVC systems",
        "Drainage optimization",
      ],
    },
    {
      id: "metal-roofing",
      title: "Metal Roofing Systems",
      icon: Layers,
      description:
        "Extremely durable standing seam and corrugated metal systems built to outlast traditional materials — backed by manufacturer warranties from leading brands.",
      features: [
        "Standing seam",
        "R-panel",
        "Retrofit framing",
        "Custom fabrication",
      ],
    },
    {
      id: "tpo-epdm",
      title: "TPO, EPDM & PVC Membrane Systems",
      icon: Box,
      description:
        "High-performance single-ply membrane installation using Firestone, Mule-Hide, and Duro-Last PVC systems. We service, install, and maintain all major membrane brands to keep your manufacturer warranty intact.",
      features: [
        "Firestone TPO & EPDM",
        "Mule-Hide membrane systems",
        "Duro-Last PVC roofing",
        "Heat-welded seams",
        "Fully adhered & mechanically attached",
        "High-reflectivity roofing",
      ],
    },
  ];

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
    {
      label: "Installed Cost",
      tpo: "Lower cost per sq ft — the most affordable major single-ply system",
      pvc: "Premium pricing, typically 20–40% higher than TPO",
    },
    {
      label: "Chemical & Grease Resistance",
      tpo: "Good — handles typical rooftop exposure",
      pvc: "Excellent — resists oils, animal fats, and harsh chemicals (restaurants, food processing)",
    },
    {
      label: "Seam Strength (Weldability)",
      tpo: "Heat-welded seams; strong, but quality depends on installer skill and weld temperature",
      pvc: "Heat-welded seams that re-weld easily for decades — easiest membrane to repair and modify",
    },
    {
      label: "Typical Lifespan",
      tpo: "20–25 years with quality install and maintenance",
      pvc: "25–30+ years; long history of proven field performance",
    },
    {
      label: "Manufacturer Warranty",
      tpo: "Strong — up to 20–30 year NDL warranties from Firestone (Elevate) and Mule-Hide",
      pvc: "Industry-leading — Duro-Last offers a full-system, no-dollar-limit warranty including consequential damages",
    },
    {
      label: "Fire Performance",
      tpo: "Good — Class A ratings available in most assemblies",
      pvc: "Excellent — inherently fire-resistant, self-extinguishing",
    },
    {
      label: "Best-Fit Buildings",
      tpo: "Warehouses, distribution centers, retail, office, schools, churches — large flat roofs where energy efficiency and budget matter most",
      pvc: "Restaurants, food processing, manufacturing with chemical exposure, hospitals, complex roofs with many penetrations",
    },
  ];

  const manufacturers = [
    {
      name: "Firestone (Elevate)",
      tag: "TPO & EPDM Systems",
      logo: "/images/manufacturers/firestone-elevate.svg",
      lede:
        "The benchmark for single-ply performance in North America. Now branded Elevate, Firestone's UltraPly TPO and RubberGard EPDM lines are engineered for high wind uplift, hail resistance, and decades of reliable service.",
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
      lede:
        "A contractor-favorite brand owned by ABC Supply. Mule-Hide's TPO and EPDM systems pair excellent membrane quality with strong dealer support, fast material availability across North Texas, and competitive warranty terms.",
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
      lede:
        '"The World\'s Best Roof" tagline isn\'t marketing fluff — Duro-Last\'s factory-fabricated PVC membranes are custom-built to your roof\'s exact dimensions, including all penetrations and corners. That eliminates 80–85% of field seams, which is where commercial roofs almost always fail.',
      highlights: [
        "Factory-fabricated to your roof's exact specs — corners and curbs prewelded",
        "Highly resistant to chemicals, grease, and ponding water",
        "Class A fire rating and excellent wind uplift performance",
        "Industry-leading 15- and 20-year edge-to-edge NDL warranties including consequential damages",
      ],
      bestFor: "Restaurants, food processing, manufacturing, and any building with heavy chemical/grease exposure or many roof penetrations.",
    },
  ];

  const providerId = "https://lonestarroofing.com/#organization";
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

  const serviceEntries: {
    id: string;
    name: string;
    serviceType: string;
    description: string;
  }[] = [
    ...leadServices.map((s) => ({
      id: s.id,
      name: s.title,
      serviceType: s.title,
      description: s.problem,
    })),
    ...servicesList.map((s) => ({
      id: s.id,
      name: s.title,
      serviceType: s.title,
      description: s.description,
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RoofingContractor",
        "@id": providerId,
        "name": "Lone Star Commercial Roofing",
        "image": "https://lonestarroofing.com/images/hero-bg.png",
        "telephone": "(972) 555-0100",
        "email": "info@lonestarroofing.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dallas",
          "addressRegion": "TX",
          "addressCountry": "US",
        },
        "areaServed": areaServed,
      },
      ...serviceEntries.map((s) => ({
        "@type": "Service",
        "@id": `https://lonestarroofing.com/services#${s.id}`,
        "name": s.name,
        "serviceType": s.serviceType,
        "description": s.description,
        "category": "Commercial Roofing",
        "provider": { "@id": providerId },
        "areaServed": areaServed,
      })),
    ],
  };

  return (
    <>
      <SEO
        title="Commercial Roofing Services | TPO, PVC & Metal | North Texas"
        description="Commercial flat roof specialists serving the DFW Metroplex: TPO, PVC, and EPDM single-ply membranes, metal roofing, inspections, repairs, and 24/7 emergency leak response. Authorized Firestone (Elevate), Mule-Hide, and Duro-Last installer."
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
              North Texas commercial flat-roof specialists. We engineer, install, and maintain high-performance TPO, PVC, EPDM, and metal roofing systems built for the DFW climate. Authorized installer and service partner for Firestone (Elevate), Mule-Hide, and Duro-Last PVC.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <a href="#lead-services" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold uppercase tracking-wider transition-colors">Inspections · Repairs · Installs</a>
              <a href="#tpo-vs-pvc" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold uppercase tracking-wider transition-colors">TPO vs. PVC</a>
              <a href="#manufacturers" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold uppercase tracking-wider transition-colors">Firestone · Mule-Hide · Duro-Last</a>
              <a href="#tpo-benefits" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold uppercase tracking-wider transition-colors">10 Benefits of TPO</a>
            </div>
          </div>
        </div>
      </section>

      {/* Lead-focused: Inspections / Repairs / Installs */}
      <section id="lead-services" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Core Commercial Services</p>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              Inspections, Repairs &amp; Installations
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Three core services — one standard of work. Every job starts with an honest diagnosis and ends with a documented, warranty-backed result.
            </p>
          </div>

          <div className="space-y-10">
            {leadServices.map((svc) => (
              <div
                key={svc.id}
                id={svc.id}
                className="bg-card border border-border rounded-xl p-8 md:p-10 shadow-sm"
                data-testid={`lead-service-${svc.id}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                      <svc.icon className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-foreground mb-4">
                      {svc.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{svc.problem}</p>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">What's Included</p>
                    <ul className="space-y-3">
                      {svc.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-foreground">
                          <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-3 flex flex-col">
                    <div className="bg-muted rounded-lg p-5 border border-border mb-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Why Lone Star</p>
                      <p className="text-sm text-foreground leading-relaxed">{svc.why}</p>
                    </div>
                    <div className="mt-auto flex flex-col gap-3">
                      <Link href="/contact">
                        <Button className="w-full font-bold uppercase tracking-wide" data-testid={`cta-${svc.id}-contact`}>
                          Request {svc.id === "inspection" ? "Free Inspection" : svc.id === "repair" ? "Repair Quote" : "Install Quote"}
                        </Button>
                      </Link>
                      <a href="tel:972-555-0100">
                        <Button variant="outline" className="w-full font-bold uppercase tracking-wide gap-2" data-testid={`cta-${svc.id}-phone`}>
                          <Phone className="h-4 w-4" />
                          (972) 555-0100
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Grid */}
      <section className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Full Service Capability</p>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground">
              Every Commercial Roofing System We Support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {servicesList.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-card border border-border p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <service.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold uppercase tracking-tight text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-border">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
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
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Thermometer className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-foreground mb-3">TPO Roofing</h3>
              <p className="text-base font-semibold text-secondary mb-3">Affordable, energy-efficient, and durable.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Thermoplastic Polyolefin (TPO) is the most widely installed single-ply system in commercial roofing today. Its white reflective surface combats the North Texas heat by deflecting solar radiation, reducing cooling loads and energy costs. Heat-welded seams create a watertight bond stronger than the membrane itself, and TPO's flexibility handles temperature swings from DFW's coldest winters to its brutal summers without cracking or splitting.
              </p>
              <a href="#tpo-benefits" className="text-sm font-bold text-secondary uppercase tracking-wide inline-flex items-center gap-2 hover:gap-3 transition-all">
                See 10 Benefits of TPO <span>&rarr;</span>
              </a>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-foreground mb-3">PVC Roofing</h3>
              <p className="text-base font-semibold text-secondary mb-3">Chemically resistant, fire-rated, premium performance.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Polyvinyl Chloride (PVC) membranes are the premium choice when chemical resistance, fire performance, or grease exposure are factors — common in restaurant groups, food processing plants, hospitals, and industrial facilities across the Metroplex. PVC offers exceptional durability and is the foundation of Duro-Last's industry-leading custom-fabricated systems.
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
            <p className="text-lg text-muted-foreground leading-relaxed">
              Both TPO and PVC are excellent single-ply membranes — but they shine in different scenarios. Here's how they stack up on the factors that actually drive a North Texas commercial roof decision.
            </p>
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
                  <tr
                    key={row.label}
                    className={`border-t border-border align-top ${i % 2 === 0 ? "bg-background" : "bg-card"}`}
                  >
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
                className="bg-card border border-border rounded-xl p-8 flex flex-col hover:border-secondary transition-colors"
                data-testid={`mfr-card-${mfr.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
              >
                <div className="mb-5 bg-white border border-border rounded-lg h-20 flex items-center justify-center px-4">
                  <img
                    src={mfr.logo}
                    alt={`${mfr.name} logo`}
                    className="max-h-14 w-auto object-contain"
                    loading="lazy"
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
                  <HardHat className="h-6 w-6 text-secondary" />
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
              10 Benefits of TPO Roofing for North Texas Commercial Buildings
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If your North Texas commercial building has a flat or low-slope roof, TPO is likely the most cost-effective and climate-appropriate system available today. Here's why property managers and building owners across DFW are choosing it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tpoBenefits.map((benefit, i) => (
              <div
                key={i}
                className="flex gap-6 bg-card border border-border rounded-xl p-7 hover:border-secondary transition-colors group"
                data-testid={`benefit-card-${i}`}
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
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

          <div className="mt-16 bg-primary rounded-2xl p-10 md:p-14 text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-white mb-4">
              Ready to See If TPO Is Right for Your Building?
            </h3>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Our inspectors assess your current roof system, drainage, and load requirements — then give you an honest recommendation. Free of charge, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" className="text-lg h-14 px-10 font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white" data-testid="button-tpo-cta">
                  Request Free Roof Assessment
                </Button>
              </Link>
              <a href="tel:972-555-0100">
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-white/10 text-white border-white/20 hover:bg-white/20 gap-2">
                  <Phone className="h-5 w-5" /> (972) 555-0100
                </Button>
              </a>
            </div>
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
