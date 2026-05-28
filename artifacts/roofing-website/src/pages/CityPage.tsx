import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ScrollRevealWrapper } from "@/components/ScrollRevealWrapper";
import { rowDelay } from "@/hooks/useRevealGrid";
import { Building2, Factory, ShieldCheck, Wrench, Search, Zap, Layers, Quote, Star, Ruler, Calendar, Maximize2, ArrowRight } from "lucide-react";
import { SERVICE_CITY_SERVICE_LABELS, SERVICE_CITY_SERVICE_SHORT } from "@/data/serviceCityData";
import { ContactForm } from "@/components/ContactForm";
import { ProjectLightbox } from "@/components/ProjectLightbox";
import { caseStudies } from "@/data/caseStudies";
import {
  buildImageSrcSet as buildProjectImageSrcSet,
  SIZES_HALF_COLUMN_GRID as PROJECT_IMAGE_SIZES,
} from "@/lib/responsiveImage";

export interface CityTestimonial {
  quote: string;
  name: string;
  businessType: string;
}

export interface CityRecentProject {
  title: string;
  buildingType: string;
  sqFt: number;
  system: string;
  image: string;
  completed: string;
}

export interface CityHeroImage {
  base: string;
  alt: string;
}

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
  heroImage: CityHeroImage;
  testimonials: CityTestimonial[];
  recentProjects: CityRecentProject[];
}

function formatSqFt(n: number) {
  return n.toLocaleString("en-US");
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface CityPageProps {
  city: CityData;
}

export default function CityPage({ city }: CityPageProps) {
  const cityCaseStudies = caseStudies.filter(
    (cs) => cs.city.split(",")[0].trim().toLowerCase() === city.name.toLowerCase(),
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);


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
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${city.name}, TX`,
        "item": `${siteUrl}/service-areas/${city.slug}`,
      },
    ],
  };

  const contractorLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": `Scott Commercial Roofing — ${city.name}`,
    "url": "https://scottcommercialroofing.com",
    "telephone": "(972) 555-0100",
    "email": "info@scottcommercialroofing.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": "TX",
      "addressCountry": "US",
    },
    "areaServed": [
      {
        "@type": "City",
        "name": city.name,
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": city.county,
          "addressRegion": "TX",
          "addressCountry": "US",
        },
      },
      {
        "@type": "AdministrativeArea",
        "name": city.county,
        "addressRegion": "TX",
        "addressCountry": "US",
      },
      ...city.neighborhoods.map((n) => ({
        "@type": "Place",
        "name": n,
        "containedInPlace": {
          "@type": "City",
          "name": city.name,
          "addressRegion": "TX",
          "addressCountry": "US",
        },
      })),
    ],
    ...(city.testimonials.length > 0 && {
      "review": city.testimonials.map((t) => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
        },
        "author": {
          "@type": "Person",
          "name": t.name,
        },
        "reviewBody": t.quote,
      })),
    }),
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
        jsonLd={[contractorLd, breadcrumbLd]}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <nav className="mb-6 text-sm text-primary-foreground/70 flex flex-wrap items-center min-w-0" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors hidden sm:inline shrink-0">Home</Link>
                <span className="mx-2 hidden sm:inline shrink-0">/</span>
                <Link href="/service-areas" className="hover:text-white transition-colors hidden sm:inline shrink-0">Service Areas</Link>
                <span className="mx-2 hidden sm:inline shrink-0">/</span>
                <span className="sm:hidden text-primary-foreground/70 shrink-0">…</span>
                <span className="mx-2 sm:hidden shrink-0">/</span>
                <span className="text-white truncate">{city.name}, TX</span>
              </nav>
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
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/20 aspect-[4/3]">
                <img
                  src={`${city.heroImage.base}-800w.webp`}
                  srcSet={`${city.heroImage.base}-480w.webp 480w, ${city.heroImage.base}-800w.webp 800w, ${city.heroImage.base}-1280w.webp 1280w`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt={city.heroImage.alt}
                  width={1280}
                  height={960}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                  data-testid={`city-hero-image-${city.slug}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <ScrollRevealWrapper delay={0}>
              <div className="group bg-card border border-border p-8 rounded-lg hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200">
                <Building2 className="h-8 w-8 text-secondary mb-4 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">Landmarks We Serve</h3>
                <ul className="space-y-2">
                  {city.landmarks.map((l) => (
                    <li key={l} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span><span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper delay={60}>
              <div className="group bg-card border border-border p-8 rounded-lg hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200">
                <Factory className="h-8 w-8 text-secondary mb-4 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">Local Industries</h3>
                <ul className="space-y-2">
                  {city.industries.map((i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span><span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper delay={120}>
              <div className="group bg-card border border-border p-8 rounded-lg hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200">
                <ShieldCheck className="h-8 w-8 text-secondary mb-4 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">Neighborhoods Covered</h3>
                <ul className="space-y-2">
                  {city.neighborhoods.map((n) => (
                    <li key={n} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span><span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollRevealWrapper>
          </div>

          {/* Weather/climate note */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-8 mb-16">
            <h2 className="section-heading-animate text-2xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">
              Built for {city.name} Weather
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {city.weatherNote}
            </p>
          </div>

          {/* Featured Case Studies for this city */}
          {cityCaseStudies.length > 0 && (
            <div className="mb-16" data-testid={`city-case-studies-${city.slug}`}>
              <h2 className="section-heading-animate text-3xl font-heading font-bold uppercase tracking-tight mb-2 text-foreground">
                Recent Projects in {city.name}
              </h2>
              <p className="text-muted-foreground mb-8">
                In-depth case studies from commercial roofs we've completed in {city.name}.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cityCaseStudies.map((cs, csIdx) => (
                  <ScrollRevealWrapper key={cs.slug} delay={rowDelay(csIdx, 2)}>
                  <Link
                    href={`/projects/${cs.slug}`}
                    data-testid={`city-case-study-link-${cs.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                      <img
                        src={cs.image}
                        srcSet={buildProjectImageSrcSet(cs.image)}
                        sizes={PROJECT_IMAGE_SIZES}
                        alt={cs.title}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider text-white bg-secondary px-2.5 py-1 rounded shadow">
                        {cs.system}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-heading font-bold uppercase tracking-tight text-foreground mb-3 leading-tight group-hover:text-secondary transition-colors">
                        {cs.title}
                      </h3>
                      <div className="grid grid-cols-2 gap-3 text-sm mt-auto">
                        <div className="flex items-start gap-2">
                          <Building2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                              Building
                            </div>
                            <div className="text-foreground">{cs.buildingType}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Ruler className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                              Size
                            </div>
                            <div className="text-foreground">{formatSqFt(cs.sizeSqFt)} sq ft</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 col-span-2">
                          <Calendar className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                              Completed
                            </div>
                            <div className="text-foreground">{cs.completed}</div>
                          </div>
                        </div>
                      </div>
                      <span className="mt-4 text-sm font-bold uppercase tracking-wider text-secondary">
                        Read Case Study →
                      </span>
                    </div>
                  </Link>
                  </ScrollRevealWrapper>
                ))}
              </div>
            </div>
          )}

          {/* Recent Projects */}
          {city.recentProjects.length > 0 && (
            <div className="mb-16" data-testid={`city-recent-projects-${city.slug}`}>
              <h2 className="section-heading-animate text-3xl font-heading font-bold uppercase tracking-tight mb-2 text-foreground">
                Recent {city.name} Projects
              </h2>
              <p className="text-muted-foreground mb-8">
                A look at flat roof systems we've recently completed for {city.name} building owners.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {city.recentProjects.map((p, idx) => (
                  <ScrollRevealWrapper key={p.title} delay={rowDelay(idx, 2)}>
                  <article
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`View full-size photo and details for ${p.title}`}
                      data-testid={`recent-project-trigger-${idx}`}
                      className="group aspect-[16/10] overflow-hidden bg-muted relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 cursor-zoom-in"
                    >
                      <img
                        src={p.image}
                        srcSet={buildProjectImageSrcSet(p.image)}
                        sizes={PROJECT_IMAGE_SIZES}
                        alt={p.title}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider text-white bg-secondary px-2.5 py-1 rounded shadow">
                        {p.system}
                      </span>
                      <span className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                        <Maximize2 className="h-4 w-4" />
                      </span>
                    </button>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-heading font-bold uppercase tracking-tight text-foreground mb-3 leading-tight">
                        {p.title}
                      </h3>
                      <div className="grid grid-cols-2 gap-3 text-sm mt-auto">
                        <div className="flex items-start gap-2">
                          <Building2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                              Building
                            </div>
                            <div className="text-foreground">{p.buildingType}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Ruler className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                              Size
                            </div>
                            <div className="text-foreground">{formatSqFt(p.sqFt)} sq ft</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 col-span-2">
                          <Calendar className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                              Completed
                            </div>
                            <div className="text-foreground">{p.completed}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  </ScrollRevealWrapper>
                ))}
              </div>
              <ProjectLightbox
                projects={city.recentProjects}
                index={lightboxIndex}
                cityName={city.name}
                onClose={() => setLightboxIndex(null)}
                onNavigate={(next) => setLightboxIndex(next)}
              />
            </div>
          )}

          {/* Testimonials */}
          {city.testimonials.length > 0 && (
            <div className="mb-16" data-testid={`city-testimonials-${city.slug}`}>
              <h2 className="section-heading-animate text-3xl font-heading font-bold uppercase tracking-tight mb-2 text-foreground">
                What {city.name} Building Owners Say
              </h2>
              <p className="text-muted-foreground mb-8">
                Named feedback from local property managers, facility directors, and business owners.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {city.testimonials.map((t, tIdx) => (
                  <ScrollRevealWrapper key={t.name} delay={rowDelay(tIdx, 2)}>
                    <figure className="flex flex-col bg-card border border-border rounded-lg p-6 shadow-sm hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200">
                      <div className="flex gap-0.5 text-secondary mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-foreground/90 leading-relaxed italic mb-5 flex-1">
                        <Quote className="h-4 w-4 inline -mt-1 mr-1 text-secondary" />
                        {t.quote}
                      </blockquote>
                      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                        <div className="h-11 w-11 rounded-full bg-secondary/15 text-secondary font-bold flex items-center justify-center text-sm shrink-0">
                          {initialsOf(t.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-foreground text-sm">{t.name}</div>
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">
                            {t.businessType} — {city.name}, TX
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </ScrollRevealWrapper>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          <h2 className="section-heading-animate text-3xl font-heading font-bold uppercase tracking-tight mb-8 text-foreground">
            Commercial Roofing Services in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {services.map((s, sIdx) => (
              <ScrollRevealWrapper key={s.name} delay={rowDelay(sIdx, 2)}>
                <div className="group bg-card border border-border p-6 rounded-lg flex gap-4 hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200">
                  <s.icon className="h-8 w-8 text-secondary shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-2 text-foreground">{s.name}</h3>
                    <p className="text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </ScrollRevealWrapper>
            ))}
          </div>

          {/* Service-city landing page links */}
          <div className="mb-16">
            <div className="section-heading-animate">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Local Expertise</p>
              <h2 className="text-3xl font-heading font-bold uppercase tracking-tight mb-2 text-foreground">
                {city.name} Service Pages
              </h2>
              <p className="text-muted-foreground mb-8">
                Detailed information about each of our most-requested services in {city.name} — local building context, weather factors, and {city.name}-specific answers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(["repair", "replacement", "tpo-epdm-pvc", "emergency-leak-repair", "maintenance", "coatings-restoration", "flat-roofing", "metal-roofing"] as const).map((svcSlug, svcIdx) => (
                <ScrollRevealWrapper key={svcSlug} delay={rowDelay(svcIdx, 2, 60)}>
                  <Link
                    href={`/service-areas/${city.slug}/${svcSlug}`}
                    className="group bg-card border border-border rounded-xl p-5 hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex flex-col"
                    data-testid={`city-service-page-link-${city.slug}-${svcSlug}`}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{city.name}, TX</p>
                    <h3 className="font-heading font-bold text-base uppercase tracking-tight text-foreground mb-2 leading-snug group-hover:text-secondary transition-colors">
                      {SERVICE_CITY_SERVICE_LABELS[svcSlug]}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 flex-1">
                      {SERVICE_CITY_SERVICE_SHORT[svcSlug]} services specific to {city.name} properties and building types.
                    </p>
                    <span className="mt-auto text-sm font-bold uppercase tracking-wide text-secondary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </ScrollRevealWrapper>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="section-heading-animate text-3xl font-heading font-bold uppercase tracking-tight mb-6 text-foreground">
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
