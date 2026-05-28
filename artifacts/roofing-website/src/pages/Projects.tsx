import { useMemo, useEffect, useRef, useState } from "react";
import { Link, useSearch, useLocation } from "wouter";
import {
  Building2,
  MapPin,
  Ruler,
  Calendar,
  ArrowRight,
  Quote,
  Star,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Testimonials } from "@/components/Testimonials";
import {
  testimonials,
  getTestimonialBySlug,
  testimonialReviewsJsonLd,
} from "@/data/testimonials";
import {
  caseStudies,
  formatSqFt,
  getSystemFamily,
  getCitySlug,
  getCityLabel,
  SYSTEM_FAMILY_LABELS,
  type CaseStudy,
} from "@/data/caseStudies";
import { cn } from "@/lib/utils";
import {
  buildImageSrcSet,
  SIZES_HALF_COLUMN_GRID,
} from "@/lib/responsiveImage";

type FilterOption = { value: string; label: string; count: number };

function useFilterState() {
  const search = useSearch();
  const [location, setLocation] = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const city = (params.get("city") ?? "all").toLowerCase();
  const system = (params.get("system") ?? "all").toLowerCase();

  const setFilters = (updates: Partial<Record<"city" | "system", string>>) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === "all") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }
    const qs = next.toString();
    setLocation(qs ? `${location}?${qs}` : location);
  };

  const setFilter = (key: "city" | "system", value: string) =>
    setFilters({ [key]: value });

  const clearFilters = () => setFilters({ city: "all", system: "all" });

  return { city, system, setFilter, clearFilters };
}

function FilterChip({
  active,
  onClick,
  children,
  testId,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      data-active={active}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
        active
          ? "bg-secondary text-white border-secondary shadow-sm"
          : "bg-card text-muted-foreground border-border hover:border-secondary hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export default function Projects() {
  const { city, system, setFilter, clearFilters } = useFilterState();

  const cityOptions = useMemo<FilterOption[]>(() => {
    const counts = new Map<string, { label: string; count: number }>();
    for (const c of caseStudies) {
      const slug = getCitySlug(c.city);
      const existing = counts.get(slug);
      counts.set(slug, {
        label: getCityLabel(c.city),
        count: (existing?.count ?? 0) + 1,
      });
    }
    return [...counts.entries()]
      .map(([value, { label, count }]) => ({ value, label, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const systemOptions = useMemo<FilterOption[]>(() => {
    const counts = new Map<string, number>();
    for (const c of caseStudies) {
      const fam = getSystemFamily(c.system);
      counts.set(fam, (counts.get(fam) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([value, count]) => ({
        value,
        label: SYSTEM_FAMILY_LABELS[value] ?? value.toUpperCase(),
        count,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const filtered = useMemo(() => {
    return caseStudies.filter((c) => {
      const cityMatch = city === "all" || getCitySlug(c.city) === city;
      const systemMatch =
        system === "all" || getSystemFamily(c.system) === system;
      return cityMatch && systemMatch;
    });
  }, [city, system]);

  const activeCityLabel =
    city === "all"
      ? null
      : cityOptions.find((o) => o.value === city)?.label ?? city;
  const activeSystemLabel =
    system === "all"
      ? null
      : systemOptions.find((o) => o.value === system)?.label ?? system;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Commercial Roofing Case Studies — DFW Metroplex",
    itemListElement: filtered.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      description: `${formatSqFt(c.sizeSqFt)} sq ft ${c.system} in ${c.city}.`,
      url: `/projects/${c.slug}`,
    })),
  };

  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@graph": testimonialReviewsJsonLd.map((r) => ({
      "@context": "https://schema.org",
      ...r,
    })),
  };

  const seoJsonLd = [itemListJsonLd, reviewsJsonLd];

  return (
    <>
      <SEO
        title="Commercial Roofing Case Studies — DFW Projects | Scott Commercial Roofing"
        description="Real DFW commercial roofing case studies: TPO, PVC, and standing-seam metal replacements in Frisco, Fort Worth, Dallas, Plano, McKinney, and Arlington."
        jsonLd={seoJsonLd}
      />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 inline-block">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">
              Real DFW Commercial Roofing Projects
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Detailed scope, system, and outcome on recent TPO, PVC, and
              standing-seam metal replacements across the Dallas–Fort Worth
              metroplex.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-muted border-b border-border py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                {formatSqFt(
                  caseStudies.reduce((sum, c) => sum + c.sizeSqFt, 0),
                )}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                Sq Ft on This Page
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                {caseStudies.length}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                Featured DFW Projects
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                6
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                DFW Cities Served
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                20+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                Year Warranties
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Case studies grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="mb-10 rounded-lg border border-border bg-muted/40 p-5 md:p-6"
            data-testid="projects-filters"
          >
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Filter by city
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    active={city === "all"}
                    onClick={() => setFilter("city", "all")}
                    testId="filter-city-all"
                  >
                    All cities
                    <span className="opacity-70">({caseStudies.length})</span>
                  </FilterChip>
                  {cityOptions.map((opt) => (
                    <FilterChip
                      key={opt.value}
                      active={city === opt.value}
                      onClick={() => setFilter("city", opt.value)}
                      testId={`filter-city-${opt.value}`}
                    >
                      {opt.label}
                      <span className="opacity-70">({opt.count})</span>
                    </FilterChip>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-4 w-4 text-secondary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Filter by roof system
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    active={system === "all"}
                    onClick={() => setFilter("system", "all")}
                    testId="filter-system-all"
                  >
                    All systems
                    <span className="opacity-70">({caseStudies.length})</span>
                  </FilterChip>
                  {systemOptions.map((opt) => (
                    <FilterChip
                      key={opt.value}
                      active={system === opt.value}
                      onClick={() => setFilter("system", opt.value)}
                      testId={`filter-system-${opt.value}`}
                    >
                      {opt.label}
                      <span className="opacity-70">({opt.count})</span>
                    </FilterChip>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center justify-between gap-3 mb-6"
            data-testid="projects-filter-summary"
          >
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-bold text-foreground">
                {filtered.length}
              </span>{" "}
              of {caseStudies.length} projects
              {activeCityLabel && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-bold text-foreground">
                    {activeCityLabel}
                  </span>
                </>
              )}
              {activeSystemLabel && (
                <>
                  {" "}
                  ·{" "}
                  <span className="font-bold text-foreground">
                    {activeSystemLabel}
                  </span>{" "}
                  system
                </>
              )}
            </p>
            {(city !== "all" || system !== "all") && (
              <button
                type="button"
                onClick={clearFilters}
                data-testid="filter-clear"
                className="text-xs font-bold uppercase tracking-wider text-secondary hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div key={`${city}-${system}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filtered.map((c, i) => (
                <CaseStudyCard key={c.slug} study={c} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 rounded-lg border border-dashed border-border bg-muted/40"
              data-testid="filter-empty-state"
            >
              <p className="text-foreground font-semibold mb-2">
                No projects match these filters yet.
              </p>
              <p className="text-sm text-muted-foreground mb-5">
                Try a different city or roof system, or clear the filters to
                see every project.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-wide text-sm hover:underline"
              >
                Clear filters <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* What clients say */}
      <Testimonials
        variant="light"
        heading="In Their Own Words"
        subheading="Named feedback from the owners, operators, and asset managers behind the projects above."
        items={testimonials}
        showGoogleSummary
        className="border-t border-border"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center bg-muted p-12 rounded-lg border border-border">
            <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">
              Your facility could be our next case study
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Free on-site assessment, infrared moisture survey, and a written
              scope-of-work — typically within 48 hours of your call.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white"
              >
                Request Free Inspection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const testimonial = getTestimonialBySlug(study.slug);
  return (
    <article
      ref={cardRef}
      id={study.slug}
      className={cn(
        "scroll-reveal group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:border-secondary hover:shadow-lg hover:scale-[1.02] transition-all duration-200 scroll-mt-24",
        isVisible && "is-visible",
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <Link
        href={`/projects/${study.slug}`}
        className="aspect-[16/10] overflow-hidden bg-muted relative block"
      >
        <img
          src={study.image}
          srcSet={buildImageSrcSet(study.image)}
          sizes={SIZES_HALF_COLUMN_GRID}
          alt={study.title}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider text-white bg-secondary px-3 py-1.5 rounded shadow">
          {study.system}
        </span>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 text-secondary" />
          <span>{study.city}</span>
          <span className="text-border">|</span>
          <Calendar className="h-3.5 w-3.5 text-secondary" />
          <span>{study.completed}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-heading font-bold uppercase tracking-tight text-foreground mb-3 leading-tight">
          <Link
            href={`/projects/${study.slug}`}
            className="hover:text-secondary transition-colors"
          >
            {study.title}
          </Link>
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="flex items-start gap-2">
            <Building2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Building
              </div>
              <div className="text-foreground">{study.buildingType}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Ruler className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Size
              </div>
              <div className="text-foreground">
                {formatSqFt(study.sizeSqFt)} sq ft
              </div>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          {study.scope}
        </p>
        {testimonial && (
          <figure
            data-testid={`case-study-testimonial-${study.slug}`}
            className="mb-5 rounded-md border-l-4 border-secondary bg-muted/60 px-4 py-3"
          >
            <div className="flex gap-0.5 text-secondary mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <blockquote className="text-sm italic text-foreground/90 leading-snug line-clamp-3">
              <Quote className="h-3.5 w-3.5 inline -mt-1 mr-1 text-secondary" />
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {testimonial.name} — {testimonial.role}, {testimonial.company}
            </figcaption>
          </figure>
        )}
        <Link
          href={`/projects/${study.slug}`}
          className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-wide text-sm hover:gap-3 transition-all self-start"
        >
          Read full case study <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
