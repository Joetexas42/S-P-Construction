import { Link } from "wouter";
import { MapPin, Building2, Zap, HelpCircle, ArrowRight, Phone, CloudLightning, ChevronRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { type ServiceDetail } from "@/data/services";
import { type CityData } from "@/pages/CityPage";
import { type ServiceCityEntry, SERVICE_CITY_SERVICE_LABELS, SERVICE_CITY_SERVICE_SHORT, SERVICE_CITY_SLUGS } from "@/data/serviceCityData";
import { cities } from "@/data/cities";
import { services } from "@/data/services";

const SITE_ORIGIN = "https://scottcommercialroofing.com";

interface ServiceCityPageProps {
  city: CityData;
  service: ServiceDetail;
  entry: ServiceCityEntry;
}

function getSiblingCombos(
  citySlug: string,
  serviceSlug: string,
): { citySlug: string; serviceSlug: string; label: string }[] {
  const siblings: { citySlug: string; serviceSlug: string; label: string }[] = [];
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return siblings;

  for (const svcSlug of SERVICE_CITY_SLUGS) {
    if (svcSlug !== serviceSlug) {
      siblings.push({
        citySlug,
        serviceSlug: svcSlug,
        label: `${SERVICE_CITY_SERVICE_SHORT[svcSlug]} in ${city.name}`,
      });
    }
  }

  const otherCities = cities.filter((c) => c.slug !== citySlug).slice(0, 2);
  for (const otherCity of otherCities) {
    siblings.push({
      citySlug: otherCity.slug,
      serviceSlug,
      label: `${SERVICE_CITY_SERVICE_SHORT[serviceSlug]} in ${otherCity.name}`,
    });
  }

  return siblings.slice(0, 4);
}

export default function ServiceCityPage({ city, service, entry }: ServiceCityPageProps) {
  const canonical = `${SITE_ORIGIN}/service-areas/${city.slug}/${service.slug}`;

  const serviceLabel = SERVICE_CITY_SERVICE_LABELS[service.slug] ?? service.shortTitle;

  const seoTitle = `${serviceLabel} in ${city.name}, TX | Scott Commercial Roofing`;
  const seoDescription = `Scott Commercial Roofing provides ${serviceLabel.toLowerCase()} in ${city.name}, TX. Local expertise, 24/7 emergency response, manufacturer-backed warranties. Serving ${city.county}.`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_ORIGIN}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${SITE_ORIGIN}/service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${city.name}, TX`,
        item: `${SITE_ORIGIN}/service-areas/${city.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: serviceLabel,
        item: canonical,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entry.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const contractorLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: `Scott Commercial Roofing — ${city.name}`,
    url: "https://scottcommercialroofing.com",
    telephone: "(972) 555-0100",
    email: "info@scottcommercialroofing.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "City",
        name: city.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: city.county,
          addressRegion: "TX",
          addressCountry: "US",
        },
      },
      {
        "@type": "AdministrativeArea",
        name: city.county,
        addressRegion: "TX",
        addressCountry: "US",
      },
      ...city.neighborhoods.map((n) => ({
        "@type": "Place",
        name: n,
        containedInPlace: {
          "@type": "City",
          name: city.name,
          addressRegion: "TX",
          addressCountry: "US",
        },
      })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: serviceLabel,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceLabel,
            url: canonical,
            areaServed: {
              "@type": "City",
              name: city.name,
              addressRegion: "TX",
              addressCountry: "US",
            },
          },
        },
      ],
    },
  };

  const siblings = getSiblingCombos(city.slug, service.slug);

  const relatedServices = services
    .filter((s) => SERVICE_CITY_SLUGS.includes(s.slug as typeof SERVICE_CITY_SLUGS[number]) && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        jsonLd={[contractorLd, faqLd, breadcrumbLd]}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              {/* Breadcrumb */}
              <nav className="flex flex-wrap items-center gap-1 text-sm text-primary-foreground/60 mb-6" aria-label="Breadcrumb">
                <Link href="/service-areas" className="hover:text-white transition-colors flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Service Areas
                </Link>
                <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                <Link href={`/service-areas/${city.slug}`} className="hover:text-white transition-colors">
                  {city.name}, TX
                </Link>
                <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                <span className="text-white">{SERVICE_CITY_SERVICE_SHORT[service.slug] ?? service.shortTitle}</span>
              </nav>

              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                {city.county} · Commercial Roofing
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-6 text-white">
                {serviceLabel} in{" "}
                <span className="text-secondary">{city.name}, TX</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8">
                {entry.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white w-full sm:w-auto"
                  >
                    Get a Free Estimate
                  </Button>
                </Link>
                <a href="tel:972-555-0100">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-white/10 text-white border-white/20 hover:bg-white/20 w-full sm:w-auto gap-2"
                  >
                    <Phone className="h-5 w-5" /> (972) 555-0100
                  </Button>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/20 aspect-[4/3]">
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
                  className="w-full h-full object-cover"
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
            {/* Districts */}
            <div className="bg-card border border-border p-8 rounded-lg">
              <Building2 className="h-8 w-8 text-secondary mb-4" />
              <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">
                {city.name} Districts We Serve
              </h3>
              <ul className="space-y-2">
                {entry.localDistricts.map((d) => (
                  <li key={d} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Building context */}
            <div className="bg-card border border-border p-8 rounded-lg lg:col-span-2">
              <Building2 className="h-8 w-8 text-secondary mb-4" />
              <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">
                {city.name} Building Types We Work On
              </h3>
              <p className="text-muted-foreground leading-relaxed">{entry.buildingContext}</p>
            </div>
          </div>

          {/* Weather urgency */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-8 mb-16">
            <div className="flex items-start gap-4">
              <CloudLightning className="h-8 w-8 text-secondary shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">
                  {city.name} Weather & {SERVICE_CITY_SERVICE_SHORT[service.slug] ?? service.shortTitle}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{entry.weatherUrgency}</p>
              </div>
            </div>
          </div>

          {/* Service overview from the parent service */}
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Service Overview</p>
            <h2 className="text-3xl font-heading font-bold uppercase tracking-tight mb-6 text-foreground">
              {service.title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{service.problem}</p>
                <div className="bg-muted border border-border rounded-xl p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Why Scott Commercial</p>
                  <p className="text-foreground leading-relaxed">{service.why}</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">What's Included</p>
                <ul className="space-y-3">
                  {service.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground">
                      <span className="h-5 w-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* City-specific FAQs */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Local Questions Answered</p>
              <h2 className="text-3xl font-heading font-black uppercase tracking-tight text-foreground">
                {serviceLabel} FAQs for {city.name}
              </h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {entry.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-card border border-border rounded-xl p-6 shadow-sm open:border-secondary transition-colors"
                >
                  <summary className="flex items-start gap-4 cursor-pointer list-none">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-open:bg-secondary/20 transition-colors">
                      <HelpCircle className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className="flex-1 text-lg font-heading font-bold text-foreground leading-snug">
                      {faq.question}
                    </h3>
                    <span className="shrink-0 text-secondary font-heading font-black text-2xl leading-none mt-1 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="mt-4 pl-14">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Related pages grid */}
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Explore More</p>
            <h2 className="text-3xl font-heading font-bold uppercase tracking-tight mb-8 text-foreground">
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Parent city page */}
              <Link
                href={`/service-areas/${city.slug}`}
                className="group bg-card border border-border rounded-xl p-5 hover:border-secondary hover:shadow-md transition-all flex flex-col"
              >
                <MapPin className="h-6 w-6 text-secondary mb-3" />
                <h3 className="font-heading font-bold text-base uppercase tracking-tight text-foreground mb-1 leading-snug group-hover:text-secondary transition-colors">
                  Commercial Roofing in {city.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">All services for {city.name} properties</p>
                <span className="mt-auto text-sm font-bold uppercase tracking-wide text-secondary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  View City Page <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              {/* Parent service page */}
              <Link
                href={`/services/${service.slug}`}
                className="group bg-card border border-border rounded-xl p-5 hover:border-secondary hover:shadow-md transition-all flex flex-col"
              >
                <Zap className="h-6 w-6 text-secondary mb-3" />
                <h3 className="font-heading font-bold text-base uppercase tracking-tight text-foreground mb-1 leading-snug group-hover:text-secondary transition-colors">
                  {service.shortTitle}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">Full service overview for DFW</p>
                <span className="mt-auto text-sm font-bold uppercase tracking-wide text-secondary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  View Service Page <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              {/* Sibling service×city combos */}
              {siblings.slice(0, 2).map((s) => (
                <Link
                  key={`${s.citySlug}--${s.serviceSlug}`}
                  href={`/service-areas/${s.citySlug}/${s.serviceSlug}`}
                  className="group bg-card border border-border rounded-xl p-5 hover:border-secondary hover:shadow-md transition-all flex flex-col"
                >
                  <ArrowRight className="h-6 w-6 text-secondary mb-3" />
                  <h3 className="font-heading font-bold text-base uppercase tracking-tight text-foreground mb-1 leading-snug group-hover:text-secondary transition-colors">
                    {s.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">Local expertise, same quality</p>
                  <span className="mt-auto text-sm font-bold uppercase tracking-wide text-secondary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related services strip */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-muted border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 text-center">Also Available in {city.name}</p>
            <h2 className="text-2xl font-heading font-bold uppercase tracking-tight mb-8 text-foreground text-center">
              Other Services for {city.name} Properties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((rel) => {
                const RelIcon = rel.icon;
                return (
                  <Link
                    key={rel.slug}
                    href={`/service-areas/${city.slug}/${rel.slug}`}
                    className="group bg-card border border-border rounded-xl p-6 hover:border-secondary hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                      <RelIcon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-heading font-bold uppercase tracking-tight text-foreground mb-2 leading-snug">
                      {SERVICE_CITY_SERVICE_SHORT[rel.slug] ?? rel.shortTitle} in {city.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{rel.tagline}</p>
                    <span className="mt-auto text-sm font-bold uppercase tracking-wide text-secondary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-6 text-white">
            Ready for {serviceLabel} in {city.name}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Free inspection, transparent pricing, and an honest recommendation — delivered by a senior inspector, not a salesperson.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-white text-secondary hover:bg-white/90 border-transparent"
              >
                Get a Free Estimate
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
    </>
  );
}
