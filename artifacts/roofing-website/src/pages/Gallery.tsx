import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollRevealWrapper } from "@/components/ScrollRevealWrapper";
import { rowDelay } from "@/hooks/useRevealGrid";
import {
  buildImageSrcSet,
  SIZES_HALF_COLUMN_GRID,
} from "@/lib/responsiveImage";
import { useListProjects } from "@workspace/api-client-react";

const FILTERS = ["All", "TPO", "Metal", "Flat Roof", "Storm Repair"] as const;
type Filter = (typeof FILTERS)[number];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [displayFilter, setDisplayFilter] = useState<Filter>("All");
  const [animKey, setAnimKey] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const { data: projects = [], isLoading, isError } = useListProjects();

  const filtered =
    displayFilter === "All"
      ? projects
      : projects.filter((p) => p.category === displayFilter);

  function handleFilter(f: Filter) {
    if (f === activeFilter) return;
    setActiveFilter(f);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setDisplayFilter(f);
      setAnimKey((k) => k + 1);
      return;
    }

    setIsExiting(true);
    setTimeout(() => {
      setDisplayFilter(f);
      setAnimKey((k) => k + 1);
      setIsExiting(false);
    }, 180);
  }

  return (
    <>
      <SEO
        title="Project Gallery | Scott Commercial Roofing"
        description="View our portfolio of commercial roofing projects across the DFW Metroplex, including TPO, metal roofing, and flat roof restorations."
      />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">
              Project Gallery
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              We let our work speak for itself. Browse our recent installations,
              replacements, and repairs across North Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={[
                  "px-4 py-2 rounded text-sm font-bold uppercase tracking-wide border transition-colors duration-150",
                  activeFilter === f
                    ? "bg-secondary text-white border-secondary"
                    : "bg-background text-foreground border-border hover:border-secondary hover:text-secondary",
                ].join(" ")}
              >
                {f}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-card shadow-sm overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-muted animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <p className="text-destructive text-center py-24">
              Unable to load projects. Please try again later.
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-24">
              No projects match that filter yet.
            </p>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              style={{
                opacity: isExiting ? 0 : 1,
                transition: "opacity 0.18s ease",
              }}
            >
              {filtered.map((project, i) => (
                <ScrollRevealWrapper key={project.id} revealKey={animKey} delay={rowDelay(i, 2)}>
                  <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={project.imageUrl}
                        srcSet={buildImageSrcSet(project.imageUrl)}
                        sizes={SIZES_HALF_COLUMN_GRID}
                        alt={project.title}
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4 gap-2">
                        <h3 className="text-2xl font-heading font-bold uppercase tracking-tight text-foreground">
                          {project.title}
                        </h3>
                        <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-1 rounded">
                          {project.location}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                </ScrollRevealWrapper>
              ))}
            </div>
          )}

          <div className="mt-16 text-center bg-muted p-12 rounded-lg border border-border">
            <h3 className="text-2xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">
              Ready for your project to be next?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our teams are standing by to evaluate your facility and provide a
              comprehensive roofing solution tailored to your specific needs.
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
