import { SEO } from "@/components/SEO";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollRevealWrapper } from "@/components/ScrollRevealWrapper";
import { rowDelay } from "@/hooks/useRevealGrid";
import { cities } from "@/data/cities";

export default function ServiceAreas() {
  const featuredSlugs = new Set(cities.map((c) => c.slug));
  const otherAreas = [
    "Allen", "Garland", "Irving", "Denton", "Lewisville",
    "Richardson", "Mesquite", "Carrollton", "Grand Prairie",
  ];

  const siteUrl = "https://scottcommercialroofing.com";
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Service Areas",
        "item": `${siteUrl}/service-areas`,
      },
    ],
  };

  return (
    <>
      <SEO 
        title="DFW Service Areas | Scott Commercial Roofing Contractor"
        description="Commercial flat roof, TPO, and PVC roofing services across the entire Dallas-Fort Worth Metroplex: Dallas, Fort Worth, Frisco, Plano, McKinney, Allen, Arlington, Denton, Lewisville, and all of North Texas."
        jsonLd={breadcrumbLd}
      />
      
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <nav className="mb-6 text-sm text-primary-foreground/70 flex flex-wrap items-center min-w-0" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors hidden sm:inline shrink-0">Home</Link>
              <span className="mx-2 hidden sm:inline shrink-0">/</span>
              <span className="text-white shrink-0">Service Areas</span>
            </nav>
            <div className="section-heading-animate inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 mb-5 backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">DFW Metroplex Coverage</span>
            </div>
            <h1 className="section-heading-animate [animation-delay:120ms] text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">Service Areas</h1>
            <p className="section-heading-animate [animation-delay:240ms] text-xl text-primary-foreground/80 leading-relaxed">
              Based in Dallas, we deploy our commercial roofing crews across the entire DFW Metroplex and surrounding North Texas communities.
            </p>
          </div>
        </div>
      </section>

      {/* Areas Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl font-heading font-bold uppercase tracking-tight mb-6 text-foreground">Covering North Texas</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                When a severe storm hits or an emergency leak threatens your inventory, response time is critical. We strategically position our crews to ensure rapid deployment across the entire Dallas-Fort Worth region.
              </p>

              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Featured Cities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {cities.map((city, i) => (
                  <ScrollRevealWrapper key={city.slug} delay={rowDelay(i, 2)}>
                    <Link
                      href={`/service-areas/${city.slug}`}
                      className="group flex items-center justify-between gap-2 p-4 bg-card hover:bg-muted hover:border-secondary hover:scale-[1.02] rounded-md border border-border transition-all duration-200"
                    >
                      <span className="flex items-center gap-2 text-foreground font-bold">
                        <MapPin className="h-4 w-4 text-secondary shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        {city.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </ScrollRevealWrapper>
                ))}
              </div>

              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Also Serving</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {otherAreas.filter((a) => !featuredSlugs.has(a.toLowerCase().replace(/\s+/g, "-"))).map((area) => (
                  <div key={area} className="flex items-center gap-2 text-foreground font-medium p-3 bg-muted rounded-md border border-border">
                    <MapPin className="h-4 w-4 text-secondary shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-secondary/5 border border-secondary/20 rounded-lg">
                <p className="text-sm text-foreground font-medium italic">
                  * Don't see your city listed? If you have a commercial property in North Texas, chances are we cover it. Contact us to confirm.
                </p>
              </div>
            </div>
            
            <div className="bg-card border border-border p-8 rounded-lg shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-4 -mt-4" />
              <h3 className="text-2xl font-heading font-bold uppercase tracking-tight mb-6 text-foreground">Need Immediate Dispatch?</h3>
              <p className="text-muted-foreground mb-8">
                Our emergency response teams are available 24/7 for catastrophic leaks and severe storm damage across DFW.
              </p>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">24/7 Emergency Line</p>
                  <a href="tel:972-555-0100" className="text-4xl font-heading font-black text-secondary hover:text-secondary/80 transition-colors">
                    (972) 555-0100
                  </a>
                </div>
                
                <hr className="border-border" />
                
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Non-Emergency Inquiries</p>
                  <Link href="/contact">
                    <Button size="lg" className="w-full text-lg h-14 font-bold uppercase tracking-wide">
                      Schedule Inspection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
