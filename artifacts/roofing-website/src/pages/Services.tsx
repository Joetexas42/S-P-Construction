import { SEO } from "@/components/SEO";
import { Wrench, LayoutGrid, Search, Zap, Activity, Droplets, ArrowUpToLine, AlignHorizontalJustifyCenter, Layers, Box } from "lucide-react";
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
      description: "Specialized solutions for industrial and commercial flat roofs designed to handle heavy rooftop equipment.",
      features: ["Built-up roofing (BUR)", "Modified bitumen", "Proper slope engineering", "Drainage optimization"]
    },
    {
      id: "metal-roofing",
      title: "Metal Roofing Systems",
      icon: Layers,
      description: "Extremely durable standing seam and corrugated metal systems built to outlast traditional materials.",
      features: ["Standing seam", "R-panel", "Retrofit framing", "Custom fabrication"]
    },
    {
      id: "tpo-epdm",
      title: "TPO & EPDM Membrane Systems",
      icon: Box,
      description: "High-performance, energy-efficient single-ply membrane installation for maximum weather resistance.",
      features: ["Heat-welded seams", "Fully adhered systems", "Mechanically attached", "High reflectivity"]
    }
  ];

  return (
    <>
      <SEO 
        title="Commercial Roofing Services | Lone Star Roofing North Texas"
        description="Comprehensive commercial roofing services in DFW: Roof repair, replacement, TPO, metal roofing, coatings, and 24/7 emergency leak repair."
      />
      
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">Commercial Roofing Solutions</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              We engineer, install, and maintain high-performance roofing systems designed to withstand the brutal North Texas climate. No compromises.
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

      {/* CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-6 text-white">Not Sure What You Need?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let our experts assess your roof. We provide comprehensive inspections and transparent, honest recommendations.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-white text-secondary hover:bg-white/90 hover:text-secondary border-transparent">
              Schedule Free Inspection
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
