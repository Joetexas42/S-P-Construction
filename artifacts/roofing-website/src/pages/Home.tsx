import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Wrench, Search, Zap, Droplets, Droplet, Layers, Maximize, Activity, LayoutGrid } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
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
    "areaServed": ["Dallas", "Fort Worth", "Frisco", "Plano", "McKinney", "Allen", "Garland", "Irving", "Arlington", "Denton", "Lewisville"]
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
        title="Lone Star Commercial Roofing | North Texas & DFW Contractors"
        description="Battle-hardened commercial roofing contractors serving North Texas since 2003. We protect the businesses that keep the DFW metroplex running. Call (972) 555-0100."
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
              We Protect the Businesses <br className="hidden md:block"/>That Keep <span className="text-secondary">DFW Running.</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium mb-10 max-w-2xl leading-relaxed">
              Battle-hardened commercial roofing that weathers every hailstorm, tornado season, and scorching summer the Metroplex throws at it.
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

      {/* Testimonials */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-4 text-white">Trusted by DFW Property Managers</h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">Don't just take our word for it. Here's what the people managing millions of square feet have to say.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="flex gap-1 text-secondary mb-6">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-white/90 italic mb-6 leading-relaxed">"After the massive hail storm in Frisco, Lone Star was on site within hours. They handled the entire 40,000 sq ft TPO replacement and dealt with the insurance adjusters directly. Utterly professional."</p>
              <div>
                <p className="font-bold text-white font-heading uppercase tracking-wide">Marcus T.</p>
                <p className="text-sm text-white/60">Property Manager, Frisco Retail Center</p>
              </div>
            </div>
            
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="flex gap-1 text-secondary mb-6">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-white/90 italic mb-6 leading-relaxed">"We had a persistent leak over our manufacturing floor that three other companies failed to fix. Lone Star found the source in 20 minutes and sealed it permanently. They are our go-to contractor now."</p>
              <div>
                <p className="font-bold text-white font-heading uppercase tracking-wide">Sarah J.</p>
                <p className="text-sm text-white/60">Operations Director, Fort Worth Industrial</p>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="flex gap-1 text-secondary mb-6">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-white/90 italic mb-6 leading-relaxed">"The communication is what sets them apart. Daily updates, drone photos of the progress, and zero surprises on the final invoice for our standing seam metal roof installation. Outstanding work."</p>
              <div>
                <p className="font-bold text-white font-heading uppercase tracking-wide">David C.</p>
                <p className="text-sm text-white/60">Owner, Dallas Medical Plaza</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
