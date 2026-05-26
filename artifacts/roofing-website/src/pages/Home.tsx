import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Wrench, Search, Zap, Droplets, Droplet, Layers, Maximize, Activity, LayoutGrid } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { CertificationsStrip } from "@/components/CertificationsStrip";
import { Testimonials } from "@/components/Testimonials";
import {
  testimonials,
  testimonialReviewsJsonLd,
  testimonialAggregateRatingJsonLd,
} from "@/data/testimonials";
import { cities } from "@/data/cities";

export default function Home() {
  const countySet = new Set<string>();
  for (const c of cities) {
    for (const part of c.county.split(/\s*&\s*/)) {
      countySet.add(part.trim());
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "Lone Star Commercial Roofing",
    "image": "https://lonestarroofing.com/images/hero-bg.png",
    "telephone": "(972) 555-0100",
    "email": "info@lonestarroofing.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dallas",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "areaServed": [
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
    ],
    "aggregateRating": testimonialAggregateRatingJsonLd,
    "review": testimonialReviewsJsonLd,
  };

  const services = [
    { name: "Commercial Roof Repair", icon: Wrench, desc: "Fast, permanent repairs for leaks, punctures, and weathering." },
    { name: "Full Roof Replacement", icon: LayoutGrid, desc: "Complete tear-offs and replacements with minimal business disruption." },
    { name: "Free Roof Inspections", icon: Search, desc: "Comprehensive structural assessments and thermal imaging." },
    { name: "Storm & Hail Damage", icon: Zap, desc: "Insurance claims assistance and emergency weather recovery." },
    { name: "TPO & EPDM Systems", icon: Layers, desc: "Durable, energy-efficient single-ply membrane installation." },
    { name: "Metal Roofing Systems", icon: Shield, desc: "Standing seam and corrugated systems built to outlast." }
  ];

  return (
    <>
      <SEO 
        title="North Texas Commercial Roofing | TPO, PVC & Flat Roof Specialists | DFW"
        description="Commercial flat roof specialists serving Dallas, Fort Worth, Frisco, Plano & all of North Texas. TPO, PVC, and single-ply membrane installation, repair, and 24/7 emergency leak response. Authorized Firestone (Elevate), Mule-Hide & Duro-Last installer since 2003. Call (972) 555-0100."
        jsonLd={jsonLd}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-20" />
          <img 
            src="/images/hero-bg.png" 
            alt="Massive commercial flat roof on a warehouse in North Texas during sunset"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-30 mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider text-white">Serving North Texas Since 2003</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight mb-6 uppercase tracking-tight">
              North Texas Commercial <br className="hidden md:block"/><span className="text-secondary">Flat Roof Specialists.</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium mb-10 max-w-2xl leading-relaxed">
              TPO, PVC, and single-ply membrane systems engineered for the DFW Metroplex — installed and serviced by an authorized Firestone (Elevate), Mule-Hide, and Duro-Last contractor. Hail-tough, energy-efficient, warranty-backed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white w-full sm:w-auto">
                  Request Free Inspection
                </Button>
              </Link>
              <a href="tel:972-555-0100">
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-white/10 text-white border-white/20 hover:bg-white/20 w-full sm:w-auto backdrop-blur-sm">
                  Call (972) 555-0100
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80 font-semibold">
              <Link href="/services#tpo-vs-pvc" className="hover:text-secondary transition-colors">TPO vs. PVC →</Link>
              <Link href="/services#tpo-benefits" className="hover:text-secondary transition-colors">10 Benefits of TPO →</Link>
              <Link href="/services#manufacturers" className="hover:text-secondary transition-colors">Firestone · Mule-Hide · Duro-Last →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="bg-card border-y border-border py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-center">
            <div className="space-y-1">
              <p className="font-heading font-bold text-2xl text-foreground">20+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Years Experience</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading font-bold text-2xl text-foreground">Licensed</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">& Insured in TX</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading font-bold text-2xl text-foreground">24/7</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Emergency Response</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading font-bold text-2xl text-foreground">Claims</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Specialists</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading font-bold text-2xl text-foreground">Financing</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturer Partners */}
      <section className="py-14 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
            Authorized Installer &amp; Service Partner — Leading Roofing Manufacturers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {[
              { name: "Firestone", sub: "Elevate (Building Products)", logo: "/images/manufacturers/firestone-elevate.svg" },
              { name: "Mule-Hide", sub: "Products Co.", logo: "/images/manufacturers/mule-hide.svg" },
              { name: "Duro-Last", sub: "PVC Roofing Systems", logo: "/images/manufacturers/duro-last.svg" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center border border-border rounded-lg px-6 py-4 min-w-[180px] h-[88px] bg-card hover:border-secondary transition-colors"
                data-testid={`partner-logo-${brand.name.toLowerCase()}`}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} — ${brand.sub}`}
                  width={180}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    const parent = img.parentElement;
                    if (!parent) return;
                    img.style.display = "none";
                    if (!parent.querySelector("[data-fallback]")) {
                      const fb = document.createElement("div");
                      fb.setAttribute("data-fallback", "true");
                      fb.className = "flex flex-col items-center justify-center text-center";
                      fb.innerHTML = `<span class="font-heading font-black text-lg uppercase tracking-tight text-foreground">${brand.name}</span><span class="text-xs text-muted-foreground font-semibold tracking-wide">${brand.sub}</span>`;
                      parent.appendChild(fb);
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
            We install, repair, and maintain roofing systems from the industry's most trusted manufacturers — so your warranty stays intact and your building stays protected.
          </p>
        </div>
      </section>

      {/* Certifications & Credentials */}
      <CertificationsStrip />

      {/* Key Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground uppercase tracking-tight mb-4">Urgently Capable. <br/>Proven Systems.</h2>
            <p className="text-lg text-muted-foreground">From massive warehouses to retail centers, we engineer roofing systems that withstand the brutal Texas climate. No shortcuts, no compromises.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="group bg-card border border-border p-8 rounded-lg hover:border-secondary transition-all hover:shadow-lg hover:-translate-y-1">
                <service.icon className="h-12 w-12 text-secondary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-3 text-foreground">{service.name}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
                <Link href="/services" className="text-sm font-bold text-secondary uppercase tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <span>&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="outline" size="lg" className="font-bold uppercase tracking-wide border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials + Google reviews */}
      <Testimonials
        variant="dark"
        heading="Trusted by DFW Property Managers"
        subheading="Don't just take our word for it. Here's what the people managing millions of square feet across the metroplex have to say."
        items={testimonials.slice(0, 6)}
        showGoogleSummary
      />

      {/* CTA / Contact Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-6 text-foreground">Stop Leaks Before They Stop Your Business.</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Water damage waits for no one. Whether you need an emergency repair right now or want to schedule a comprehensive structural inspection, our teams are ready to deploy across the DFW Metroplex.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Search className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold text-foreground">1. Free Inspection</h4>
                    <p className="text-muted-foreground">Comprehensive drone and physical assessment.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Activity className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold text-foreground">2. Detailed Action Plan</h4>
                    <p className="text-muted-foreground">Clear scope of work with transparent pricing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Shield className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold text-foreground">3. Flawless Execution</h4>
                    <p className="text-muted-foreground">Professional installation backed by strong warranties.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full max-w-lg mx-auto lg:mr-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
