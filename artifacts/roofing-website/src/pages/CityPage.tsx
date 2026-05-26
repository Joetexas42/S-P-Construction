import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Building2, Factory, ShieldCheck, Wrench, Search, Zap, Layers } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export interface CityData {
  slug: string;
  name: string;
  county: string;
  intro: string;
  landmarks: string[];
  industries: string[];
  neighborhoods: string[];
  weatherNote: string;
  seoTitle: string;
  seoDescription: string;
}

interface CityPageProps {
  city: CityData;
}

export default function CityPage({ city }: CityPageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": `Lone Star Commercial Roofing — ${city.name}`,
    "telephone": "(972) 555-0100",
    "email": "info@lonestarroofing.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": "TX",
      "addressCountry": "US",
    },
    "areaServed": {
      "@type": "City",
      "name": city.name,
    },
  };

  const services = [
    { name: "TPO & PVC Membrane", icon: Layers, desc: `Single-ply systems engineered for ${city.name}'s heat and hail exposure.` },
    { name: "Commercial Roof Repair", icon: Wrench, desc: `Permanent leak repairs for ${city.name} warehouses, retail, and offices.` },
    { name: "Storm & Hail Response", icon: Zap, desc: `24/7 emergency dispatch to ${city.name} after severe North Texas weather.` },
    { name: "Free Roof Inspections", icon: Search, desc: `Drone and thermal-imaging assessments anywhere in ${city.name}.` },
  ];

  return (
    <>
      <SEO
        title={city.seoTitle}
        description={city.seoDescription}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <Link href="/service-areas" className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 text-sm font-bold uppercase tracking-wider mb-6">
              <MapPin className="h-4 w-4" /> All Service Areas
            </Link>
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">
              Commercial Roofing in <span className="text-secondary">{city.name}, TX</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8">
              {city.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white w-full sm:w-auto">
                  Free {city.name} Roof Inspection
                </Button>
              </Link>
              <a href="tel:972-555-0100">
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-white/10 text-white border-white/20 hover:bg-white/20 w-full sm:w-auto">
                  Call (972) 555-0100
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border border-border p-8 rounded-lg">
              <Building2 className="h-8 w-8 text-secondary mb-4" />
              <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">Landmarks We Serve</h3>
              <ul className="space-y-2">
                {city.landmarks.map((l) => (
                  <li key={l} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span><span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border p-8 rounded-lg">
              <Factory className="h-8 w-8 text-secondary mb-4" />
              <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">Local Industries</h3>
              <ul className="space-y-2">
                {city.industries.map((i) => (
                  <li key={i} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span><span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border p-8 rounded-lg">
              <ShieldCheck className="h-8 w-8 text-secondary mb-4" />
              <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">Neighborhoods Covered</h3>
              <ul className="space-y-2">
                {city.neighborhoods.map((n) => (
                  <li key={n} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span><span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weather/climate note */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">
              Built for {city.name} Weather
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {city.weatherNote}
            </p>
          </div>

          {/* Services */}
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight mb-8 text-foreground">
            Commercial Roofing Services in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {services.map((s) => (
              <div key={s.name} className="bg-card border border-border p-6 rounded-lg flex gap-4">
                <s.icon className="h-8 w-8 text-secondary shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2 text-foreground">{s.name}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-heading font-bold uppercase tracking-tight mb-6 text-foreground">
                Request a Free {city.name} Roof Inspection
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Tell us about your {city.name} property — warehouse, retail center, office, school, or church. We'll schedule a no-cost inspection, deliver a written report with photos and thermal imaging, and walk you through every repair or replacement option.
              </p>
              <div className="space-y-3 text-foreground">
                <p className="flex items-center gap-3"><span className="font-bold">24/7 Emergency:</span> <a href="tel:972-555-0100" className="text-secondary font-bold">(972) 555-0100</a></p>
                <p className="flex items-center gap-3"><span className="font-bold">County:</span> {city.county}</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
