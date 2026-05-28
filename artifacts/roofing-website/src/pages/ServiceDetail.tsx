import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, Phone, HelpCircle, ArrowLeft, ArrowRight, DollarSign } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/ImageLightbox";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { services, type ServiceDetail as ServiceDetailType } from "@/data/services";
import { cities } from "@/data/cities";
import { SERVICE_CITY_SLUGS, SERVICE_CITY_SERVICE_SHORT } from "@/data/serviceCityData";

interface ActiveImage {
  base: string;
  alt: string;
  caption?: string;
}

interface ServiceDetailProps {
  service: ServiceDetailType;
}

const SITE_ORIGIN = "https://scottcommercialroofing.com";
const PROVIDER_ID = `${SITE_ORIGIN}/#organization`;

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const canonical = `${SITE_ORIGIN}/services/${service.slug}`;

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

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        "url": canonical,
        "name": service.title,
        "serviceType": service.title,
        "description": service.problem,
        "category": "Commercial Roofing",
        "provider": { "@id": PROVIDER_ID },
        "areaServed": areaServed,
        "mainEntityOfPage": canonical,
        "offers":
          service.pricing.starting === 0 && service.pricing.max === 0
            ? {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": 0,
                "description": service.pricing.display,
                "availability": "https://schema.org/InStock",
                "areaServed": areaServed,
              }
            : {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "price": service.pricing.starting,
                "lowPrice": service.pricing.min,
                "highPrice": service.pricing.max,
                "description": service.pricing.display,
                "availability": "https://schema.org/InStock",
                "areaServed": areaServed,
              },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_ORIGIN}/`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": `${SITE_ORIGIN}/services`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": service.title,
            "item": canonical,
          },
        ],
      },
      ...(service.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${canonical}#faq`,
              "mainEntity": service.faqs.map((f) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  const Icon = service.icon;

  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);

  return (
    <>
      <SEO
        title={service.seoTitle}
        description={service.seoDescription}
        canonical={canonical}
        jsonLd={serviceJsonLd}
      />

      {/* Header */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
            <nav className="mb-6 text-sm text-primary-foreground/70 flex flex-wrap items-center min-w-0" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors hidden sm:inline shrink-0">Home</Link>
              <span className="mx-2 hidden sm:inline shrink-0">/</span>
              <Link href="/services" className="hover:text-white transition-colors hidden sm:inline shrink-0">Services</Link>
              <span className="mx-2 hidden sm:inline shrink-0">/</span>
              <span className="sm:hidden text-primary-foreground/70 shrink-0">…</span>
              <span className="mx-2 sm:hidden shrink-0">/</span>
              <span className="text-white truncate">{service.shortTitle}</span>
            </nav>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <Icon className="h-7 w-7 text-secondary-foreground" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">
                {service.category === "Core" ? "Core Commercial Service" : "Commercial Roofing System"}
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">
              {service.title}
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed mb-6">
              {service.tagline}
            </p>
            <div
              className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 mb-8"
              data-testid={`pricing-${service.slug}`}
            >
              <DollarSign className="h-4 w-4 text-secondary shrink-0" />
              <span className="text-sm font-semibold text-white leading-snug">
                {service.pricing.display}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="font-bold uppercase tracking-wide w-full sm:w-auto"
                  data-testid={`button-${service.slug}-cta`}
                >
                  {service.ctaPrimary}
                </Button>
              </Link>
              <a href="tel:972-555-0100">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold uppercase tracking-wide gap-2 w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" /> (972) 555-0100
                </Button>
              </a>
            </div>
            </div>
            <div className="lg:col-span-5">
              <button
                type="button"
                onClick={() =>
                  setActiveImage({
                    base: service.heroImage.base,
                    alt: service.heroImage.alt,
                  })
                }
                aria-label={`View full-size image: ${service.heroImage.alt}`}
                className="group relative block w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/20 aspect-[4/3] cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
                data-testid={`service-hero-image-button-${service.slug}`}
              >
                <img
                  src={`${service.heroImage.base}-800w.webp`}
                  srcSet={`${service.heroImage.base}-480w.webp 480w, ${service.heroImage.base}-800w.webp 800w, ${service.heroImage.base}-1280w.webp 1280w`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt={service.heroImage.alt}
                  width={1280}
                  height={960}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  data-testid={`service-hero-image-${service.slug}`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">The Problem We Solve</p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
                Why this service matters
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{service.problem}</p>
              <div className="bg-muted border border-border rounded-xl p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Why Scott Commercial</p>
                <p className="text-foreground leading-relaxed">{service.why}</p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-card border border-border rounded-xl p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">What's Included</p>
                <ul className="space-y-3">
                  {service.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {service.features.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">At a glance</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-secondary/10 text-secondary"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep content sections */}
      {service.sections.length > 0 && (
        <section className="py-20 bg-muted border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {service.sections.map((sec) => {
                const supporting = service.supportingImages.find(
                  (img) => img.sectionHeading === sec.heading,
                );
                const pair = service.beforeAfterPairs?.find(
                  (p) => p.sectionHeading === sec.heading,
                );
                return (
                  <article
                    key={sec.heading}
                    className="bg-card border border-border rounded-xl p-7 md:p-9 shadow-sm"
                    data-testid={`service-section-${service.slug}`}
                  >
                    <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-foreground mb-4">
                      {sec.heading}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">{sec.body}</p>
                    {supporting && (
                      <figure className="mt-6">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImage({
                              base: supporting.base,
                              alt: supporting.alt,
                              caption: supporting.caption,
                            })
                          }
                          aria-label={`View full-size image: ${supporting.alt}`}
                          className="group relative block w-full rounded-xl overflow-hidden border border-border bg-muted aspect-[4/3] cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                          data-testid={`service-supporting-image-button-${service.slug}`}
                        >
                          <img
                            src={`${supporting.base}-800w.webp`}
                            srcSet={`${supporting.base}-480w.webp 480w, ${supporting.base}-800w.webp 800w, ${supporting.base}-1280w.webp 1280w`}
                            sizes="(min-width: 1024px) 768px, 100vw"
                            alt={supporting.alt}
                            width={1280}
                            height={960}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            data-testid={`service-supporting-image-${service.slug}`}
                          />
                        </button>
                        <figcaption className="mt-3 text-sm text-muted-foreground italic leading-relaxed">
                          {supporting.caption}
                        </figcaption>
                      </figure>
                    )}
                    {pair && (
                      <figure
                        className="mt-6"
                        data-testid={`service-before-after-pair-${service.slug}`}
                      >
                        <BeforeAfterSlider
                          before={pair.before}
                          after={pair.after}
                          sizes="(min-width: 1024px) 768px, 100vw"
                          testIdPrefix={`service-before-after-${service.slug}`}
                        />
                        <p className="mt-3 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                          Drag the handle, or use arrow keys, to compare
                        </p>
                        <figcaption className="mt-2 text-sm text-muted-foreground italic leading-relaxed">
                          {pair.caption}
                        </figcaption>
                      </figure>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="py-20 bg-background border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Frequently Asked</p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground">
                Questions about {service.shortTitle}
              </h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {service.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-card border border-border rounded-xl p-6 shadow-sm open:border-secondary transition-colors"
                  data-testid={`service-faq-${service.slug}-${i}`}
                >
                  <summary className="flex items-start gap-4 cursor-pointer list-none">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-open:bg-secondary/20 transition-colors">
                      <HelpCircle className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className="flex-1 text-lg font-heading font-bold text-foreground leading-snug">
                      {faq.question}
                    </h3>
                    <span className="shrink-0 text-secondary font-heading font-black text-2xl leading-none mt-1 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="mt-4 pl-14">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DFW Cities We Serve — only shown for the 4 service-city services */}
      {SERVICE_CITY_SLUGS.includes(service.slug as (typeof SERVICE_CITY_SLUGS)[number]) && (
        <section className="py-20 bg-background border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Local SEO Pages</p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground">
                DFW Cities We Serve
              </h2>
              <p className="text-muted-foreground mt-4">
                We provide {SERVICE_CITY_SERVICE_SHORT[service.slug] ?? service.shortTitle} across the entire DFW Metroplex. Select your city for local building context, weather information, and city-specific answers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/service-areas/${city.slug}/${service.slug}`}
                  className="group bg-card border border-border rounded-xl p-6 hover:border-secondary hover:shadow-md transition-all flex flex-col"
                  data-testid={`service-city-link-${service.slug}-${city.slug}`}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{city.county}</p>
                  <h3 className="text-lg font-heading font-bold uppercase tracking-tight text-foreground mb-2 leading-snug group-hover:text-secondary transition-colors">
                    {SERVICE_CITY_SERVICE_SHORT[service.slug] ?? service.shortTitle} in {city.name}, TX
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {city.intro.split(".")[0].trim()}.
                  </p>
                  <span className="mt-auto text-sm font-bold uppercase tracking-wide text-secondary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    <ArrowRight className="h-4 w-4" /> View {city.name} page
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      <section className="py-20 bg-muted border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Related Services</p>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground">
              Other commercial roofing services
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {related.map((rel) => {
              const RelIcon = rel.icon;
              return (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-card border border-border rounded-xl p-6 hover:border-secondary hover:shadow-md transition-all flex flex-col"
                  data-testid={`related-service-${rel.slug}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <RelIcon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold uppercase tracking-tight text-foreground mb-2 leading-snug">
                    {rel.shortTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{rel.tagline}</p>
                  <span className="mt-auto text-sm font-bold uppercase tracking-wide text-secondary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground hover:text-secondary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All services
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-6 text-white">
            Ready to talk through your roof?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Free inspections, transparent pricing, and an honest recommendation across the entire DFW Metroplex.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-white text-secondary hover:bg-white/90 border-transparent"
                data-testid={`button-${service.slug}-final-cta`}
              >
                {service.ctaPrimary}
              </Button>
            </Link>
            <a href="tel:972-555-0100">
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-white/10 text-white border-white/30 hover:bg-white/20 gap-2"
              >
                <Phone className="h-5 w-5" /> (972) 555-0100
              </Button>
            </a>
          </div>
        </div>
      </section>

      <ImageLightbox
        open={activeImage !== null}
        imageBase={activeImage?.base ?? null}
        alt={activeImage?.alt ?? ""}
        caption={activeImage?.caption}
        onClose={() => setActiveImage(null)}
      />
    </>
  );
}
