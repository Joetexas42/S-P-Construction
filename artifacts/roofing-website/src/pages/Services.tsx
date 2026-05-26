import { SEO } from "@/components/SEO";
import { Wrench, LayoutGrid, Search, Zap, Activity, Droplets, ArrowUpToLine, AlignHorizontalJustifyCenter, Layers, Box, CheckCircle2, Thermometer, DollarSign, Shield, Droplet, Wind, Settings, Award, Zap as ZapIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Services() {
  const servicesList = [
    {
      id: "repair",
      title: "Commercial Roof Repair",
      icon: Wrench,
      description: "Fast, permanent repairs for leaks, punctures, and weathering. We diagnose the root cause, not just the symptom.",
      features: ["Leak detection & sealing", "Puncture repair", "Flashing replacement", "Ponding water solutions"]
    },
    {
      id: "replacement",
      title: "Full Roof Replacement",
      icon: LayoutGrid,
      description: "Complete tear-offs and replacements engineered for longevity and minimal disruption to your daily operations.",
      features: ["Complete tear-offs", "Deck replacement", "System upgrades", "Warranty-backed installation"]
    },
    {
      id: "inspection",
      title: "Roof Inspections",
      icon: Search,
      description: "Comprehensive structural assessments utilizing drone technology and thermal imaging to catch issues early.",
      features: ["Thermal imaging", "Drone surveys", "Core sampling", "Detailed reporting"]
    },
    {
      id: "maintenance",
      title: "Maintenance Programs",
      icon: Activity,
      description: "Proactive care that extends the life of your roof and prevents catastrophic failures before they happen.",
      features: ["Bi-annual inspections", "Debris removal", "Drain clearing", "Preventative sealing"]
    },
    {
      id: "storm-damage",
      title: "Storm Damage & Hail Repair",
      icon: Zap,
      description: "Emergency weather recovery and complete insurance claims assistance to get your business back online.",
      features: ["Emergency tarping", "Hail damage assessment", "Wind uplift repair", "Claims advocacy"]
    },
    {
      id: "emergency",
      title: "Emergency Leak Repair",
      icon: Droplets,
      description: "24/7 rapid response teams ready to deploy across the DFW Metroplex to mitigate water intrusion.",
      features: ["24/7 dispatch", "Immediate mitigation", "Water extraction", "Temporary sealing"]
    },
    {
      id: "coatings",
      title: "Roof Coatings & Restoration",
      icon: ArrowUpToLine,
      description: "Cost-effective fluid-applied systems that restore your roof's performance and improve energy efficiency.",
      features: ["Silicone coatings", "Acrylic systems", "Rust inhibition", "Energy star rated"]
    },
    {
      id: "flat-roofing",
      title: "Flat / Low-Slope Roofing",
      icon: AlignHorizontalJustifyCenter,
      description: "Specialized solutions for industrial and commercial flat roofs designed to handle heavy rooftop equipment. We work with Firestone, Mule-Hide, and Duro-Last PVC systems engineered for North Texas heat loads.",
      features: ["Built-up roofing (BUR)", "Modified bitumen", "Duro-Last PVC systems", "Drainage optimization"]
    },
    {
      id: "metal-roofing",
      title: "Metal Roofing Systems",
      icon: Layers,
      description: "Extremely durable standing seam and corrugated metal systems built to outlast traditional materials — backed by manufacturer warranties from leading brands.",
      features: ["Standing seam", "R-panel", "Retrofit framing", "Custom fabrication"]
    },
    {
      id: "tpo-epdm",
      title: "TPO, EPDM & PVC Membrane Systems",
      icon: Box,
      description: "High-performance, energy-efficient single-ply membrane installation using Firestone, Mule-Hide, and Duro-Last PVC systems. We service, install, and maintain all major membrane brands to keep your manufacturer warranty intact.",
      features: ["Firestone TPO & EPDM", "Mule-Hide membrane systems", "Duro-Last PVC roofing", "Heat-welded seams", "Fully adhered & mechanically attached", "High-reflectivity roofing"]
    }
  ];

  const tpoBenefits = [
    {
      icon: Thermometer,
      title: "Energy Efficiency & UV Reflectivity",
      body: "TPO's white reflective surface bounces solar radiation back into the atmosphere instead of absorbing it — a critical advantage on North Texas rooftops that endure 100°F+ summers. Less heat absorbed means lower HVAC demand across your entire building."
    },
    {
      icon: DollarSign,
      title: "Lower Cooling Costs",
      body: "By reducing heat transfer through the roof membrane, TPO can meaningfully cut your building's cooling load. For large commercial facilities in the DFW Metroplex, that translates to real, measurable savings on monthly energy bills."
    },
    {
      icon: DollarSign,
      title: "Cost-Effective Installation",
      body: "Compared to traditional built-up roofing or premium PVC systems, TPO delivers outstanding performance at a lower installed cost per square foot — making it the go-to choice for budget-conscious property managers who refuse to sacrifice quality."
    },
    {
      icon: Shield,
      title: "Puncture Resistance",
      body: "Modern TPO membranes are engineered to resist punctures from foot traffic, rooftop equipment, and hail impacts. For commercial properties with HVAC units, solar arrays, or regular maintenance personnel on the roof, this toughness matters."
    },
    {
      icon: Droplet,
      title: "Heat-Welded Seams for Superior Leak Protection",
      body: "Unlike adhesive-bonded systems, TPO seams are hot-air welded, fusing the membrane into a single continuous piece. Properly installed, these seams are actually stronger than the membrane itself — eliminating the most common failure point on commercial roofs."
    },
    {
      icon: AlignHorizontalJustifyCenter,
      title: "Ideal for Low-Slope & Flat Roofs",
      body: "TPO is purpose-built for the low-slope and flat roof geometry common across North Texas warehouses, retail centers, medical offices, and industrial facilities. It handles ponding water and thermal movement without compromising the membrane."
    },
    {
      icon: Wind,
      title: "Weather & Storm Performance",
      body: "Texas weather is unforgiving — hailstorms, high winds, and temperature swings are facts of life in the Metroplex. TPO membranes are rated for high wind uplift and remain flexible across extreme temperature ranges, from February ice storms to August heat waves."
    },
    {
      icon: Settings,
      title: "Reduced Maintenance Requirements",
      body: "TPO is highly resistant to algae, dirt accumulation, and chemical exposure. It holds up well with minimal upkeep, which is especially valuable for large facilities where ongoing maintenance costs add up quickly year over year."
    },
    {
      icon: CheckCircle2,
      title: "Compatible with Coatings & Repair Systems",
      body: "When a TPO roof approaches the end of its service life, it doesn't necessarily need a full tear-off. Compatible restoration coatings can extend the membrane's performance and push replacement costs years into the future — protecting your capital budget."
    },
    {
      icon: Award,
      title: "Strong Warranty & Manufacturer Support",
      body: "Leading manufacturers like Firestone (Elevate) and Mule-Hide back their TPO systems with robust warranties covering both material and labor. As authorized installers, we ensure your system is installed to spec so every warranty clause remains fully intact."
    }
  ];

  return (
    <>
      <SEO
        title="Commercial Roofing Services | Lone Star Roofing North Texas"
        description="Comprehensive commercial roofing services in DFW: Roof repair, replacement, TPO, PVC, metal roofing, coatings, and 24/7 emergency leak repair. Authorized Firestone, Mule-Hide, and Duro-Last installer."
      />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">Commercial Roofing Solutions</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              We engineer, install, and maintain high-performance roofing systems designed to withstand the brutal North Texas climate. Authorized installer and service partner for Firestone, Mule-Hide, Duro-Last PVC, and leading TPO membrane systems. No compromises.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {servicesList.map((service) => (
              <div key={service.id} id={service.id} className="bg-card border border-border p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <service.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold uppercase tracking-tight text-foreground mb-2">{service.title}</h2>
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

      {/* Single-Ply Roofing Systems */}
      <section id="single-ply" className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Single-Ply Roofing Systems</p>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              TPO & PVC — The Modern Standard for Commercial Flat Roofs
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Single-ply membranes have become the dominant choice for low-slope and flat commercial roofing across North Texas — and for good reason. These systems deliver proven performance, manufacturer-backed warranties, and long-term value that older roofing methods simply cannot match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* TPO */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Thermometer className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-foreground mb-3">TPO Roofing</h3>
              <p className="text-base font-semibold text-secondary mb-3">Affordable, energy-efficient, and durable.</p>
              <p className="text-muted-foreground leading-relaxed">
                Thermoplastic Polyolefin (TPO) is the most widely installed single-ply system in commercial roofing today. Its white reflective surface combats the North Texas heat by deflecting solar radiation, reducing cooling loads and energy costs. Heat-welded seams create a watertight bond stronger than the membrane itself, and TPO's flexibility handles temperature swings from DFW's coldest winters to its brutal summers without cracking or splitting.
              </p>
            </div>

            {/* PVC */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-foreground mb-3">PVC Roofing</h3>
              <p className="text-base font-semibold text-secondary mb-3">Chemically resistant, fire-rated, and perfect for specialized commercial facilities.</p>
              <p className="text-muted-foreground leading-relaxed">
                Polyvinyl Chloride (PVC) membranes are the premium choice when chemical resistance, fire performance, or grease exposure are factors — common in restaurant groups, food processing plants, and industrial facilities across the Metroplex. PVC offers exceptional durability and is the foundation of Duro-Last's industry-leading custom-fabricated systems.
              </p>
            </div>
          </div>

          {/* Brands */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Brands We Trust</p>
            <h3 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-foreground">
              Premium Manufacturers. Proven in North Texas.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-secondary transition-colors">
              <p className="font-heading font-black text-xl uppercase tracking-tight text-foreground mb-1">Firestone (Elevate)</p>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">& Mule-Hide</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                For industry-leading TPO reliability and robust manufacturer warranties. Firestone's Elevate product line and Mule-Hide's membrane systems set the benchmark for performance and installer support across the commercial roofing industry.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-secondary transition-colors">
              <p className="font-heading font-black text-xl uppercase tracking-tight text-foreground mb-1">Mule-Hide</p>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">Products Co.</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A trusted name in commercial single-ply roofing with a comprehensive line of TPO, EPDM, and coating systems backed by strong warranties and excellent contractor support programs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-secondary transition-colors">
              <p className="font-heading font-black text-xl uppercase tracking-tight text-foreground mb-1">Duro-Last</p>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">PVC Roofing Systems</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                For custom pre-fabricated PVC systems that offer unmatched leak protection. Duro-Last's factory-fabricated approach eliminates field seams at corners and penetrations — the most leak-prone areas on any commercial roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Benefits of TPO */}
      <section id="tpo-benefits" className="py-24 bg-background">
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
              <div key={i} className="flex gap-6 bg-card border border-border rounded-xl p-7 hover:border-secondary transition-colors group" data-testid={`benefit-card-${i}`}>
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
            <Link href="/contact">
              <Button size="lg" className="text-lg h-14 px-10 font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white" data-testid="button-tpo-cta">
                Request Free Roof Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-6 text-white">Not Sure What You Need?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let our experts assess your roof. We provide comprehensive inspections and transparent, honest recommendations.
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
