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
import { Badge } from "@/components/ui/badge";
import { Testimonials } from "@/components/Testimonials";
import { ScrollRevealWrapper } from "@/components/ScrollRevealWrapper";
import { rowDelay } from "@/hooks/useRevealGrid";
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
import { CARD_EXIT_STAGGER_MS, CARD_EXIT_BASE_MS, FILTER_DEBOUNCE_MS } from "@/lib/animation";
import { useListProjects } from "@workspace/api-client-react";
import type { Project } from "@workspace/api-client-react";

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
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] sm:min-h-0",
        active
          ? "bg-secondary text-white border-secondary shadow-sm"
          : "bg-card text-muted-foreground border-border hover:border-secondary hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="gallery-skeleton-card flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="aspect-[16/10] skeleton-shimmer" />
      <div className="p-6 flex flex-col flex-1 gap-3">
        <div className="skeleton-shimmer h-3 w-2/5 rounded" />
        <div className="space-y-2">
          <div className="skeleton-shimmer h-6 w-4/5 rounded" />
          <div className="skeleton-shimmer h-6 w-3/5 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="skeleton-shimmer h-10 rounded" />
          <div className="skeleton-shimmer h-10 rounded" />
        </div>
        <div className="space-y-2 mt-1">
          <div className="skeleton-shimmer h-3 w-full rounded" />
          <div className="skeleton-shimmer h-3 w-full rounded" />
          <div className="skeleton-shimmer h-3 w-4/5 rounded" />
        </div>
        <div className="skeleton-shimmer h-4 w-1/3 rounded mt-auto pt-2" />
      </div>
    </div>
  );
}

function GalleryProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:border-secondary hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider text-white bg-secondary px-3 py-1.5 rounded shadow">
          {project.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-heading font-bold uppercase tracking-tight text-foreground mb-1 leading-tight">
          {project.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <MapPin className="h-3 w-3 text-secondary" />
          <span>{project.location}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
      </div>
    </article>
  );
}

export default function Projects() {
  const { city, system, setFilter, clearFilters } = useFilterState();
  const { data: galleryProjects } = useListProjects();

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

  // Two-phase transition: exit old cards → enter new cards
  const [renderedSet, setRenderedSet] = useState<CaseStudy[]>(filtered);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const renderedSetRef = useRef<CaseStudy[]>(filtered);
  const filteredRef = useRef<CaseStudy[]>(filtered);
  const isFirstRender = useRef(true);

  filteredRef.current = filtered;

  useEffect(() => {
    renderedSetRef.current = renderedSet;
  }, [renderedSet]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Cancel any in-flight debounce or exit timer so rapid taps don't stack.
    clearTimeout(timerRef.current);
    // Debounce: wait for the user to stop tapping before starting the exit
    // animation. If another filter change arrives within FILTER_DEBOUNCE_MS,
    // this timeout is cancelled and reset, preventing duplicate skeleton flashes.
    timerRef.current = setTimeout(() => {
      const exitCount = renderedSetRef.current.length;
      const exitDuration = CARD_EXIT_BASE_MS + exitCount * CARD_EXIT_STAGGER_MS;
      setIsExiting(true);
      timerRef.current = setTimeout(() => {
        setIsExiting(false);
        setRenderedSet(filteredRef.current);
      }, exitDuration);
    }, FILTER_DEBOUNCE_MS);
    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <section data-dark-hero className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="section-heading-animate inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 mb-5 backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">Case Studies</span>
            </div>
            <h1 className="section-heading-animate text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white [animation-delay:120ms]">
              Real DFW Commercial Roofing Projects
            </h1>
            <p className="section-heading-animate [animation-delay:240ms] text-xl text-primary-foreground/80 leading-relaxed">
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
            <ScrollRevealWrapper delay={0}>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                {formatSqFt(
                  caseStudies.reduce((sum, c) => sum + c.sizeSqFt, 0),
                )}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                Sq Ft on This Page
              </div>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper delay={80}>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                {caseStudies.length}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                Featured DFW Projects
              </div>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper delay={160}>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                6
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                DFW Cities Served
              </div>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper delay={240}>
              <div className="text-3xl md:text-4xl font-heading font-black text-secondary">
                20+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                Year Warranties
              </div>
            </ScrollRevealWrapper>
          </div>
        </div>
      </section>

      {/* DB-backed gallery projects — shown when team has added projects via admin */}
      {galleryProjects && galleryProjects.length > 0 && (
        <section className="py-14 md:py-20 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollRevealWrapper className="flex items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30">
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">Portfolio</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-foreground">
                Recent Projects
              </h2>
              <Badge variant="secondary" className="ml-auto">
                {galleryProjects.length}
              </Badge>
            </ScrollRevealWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryProjects.map((project, i) => (
                <ScrollRevealWrapper key={project.id} delay={i * 80}>
                  <GalleryProjectCard project={project} />
                </ScrollRevealWrapper>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters + Case studies grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollRevealWrapper className="mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground">
              Browse Projects
            </h2>
          </ScrollRevealWrapper>

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
                <div className="flex flex-wrap gap-2.5">
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
                <div className="flex flex-wrap gap-2.5">
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

          {isExiting ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.from({ length: Math.max(filtered.length, 2) }).map(
                (_, i) => (
                  <SkeletonCard key={i} />
                ),
              )}
            </div>
          ) : renderedSet.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {renderedSet.map((c, i) => (
                <ScrollRevealWrapper
                  key={c.slug}
                  delay={rowDelay(i, 2, 80, 160)}
                  revealKey={`${city}-${system}`}
                >
                  <CaseStudyCard study={c} index={i} />
                </ScrollRevealWrapper>
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
          <ScrollRevealWrapper>
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
          </ScrollRevealWrapper>
        </div>
      </section>
    </>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const testimonial = getTestimonialBySlug(study.slug);
  return (
    <article
      id={study.slug}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:border-secondary hover:shadow-lg hover:scale-[1.02] transition-all duration-200 scroll-mt-24"
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
