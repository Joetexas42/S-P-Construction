import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  buildImageSrcSet,
  SIZES_HALF_COLUMN_GRID,
} from "@/lib/responsiveImage";

const FILTERS = ["All", "TPO", "Metal", "Flat Roof", "Storm Repair"] as const;
type Filter = (typeof FILTERS)[number];

const projects = [
  {
    src: "/images/gallery-tpo.webp",
    title: "TPO Membrane Installation",
    location: "Frisco Retail Center",
    desc: "40,000 sq ft single-ply TPO membrane system over rigid insulation.",
    category: "TPO" as Filter,
  },
  {
    src: "/images/gallery-metal.webp",
    title: "Standing Seam Metal Roof",
    location: "Fort Worth Industrial Park",
    desc: "Architectural standing seam panels custom-fabricated on site.",
    category: "Metal" as Filter,
  },
  {
    src: "/images/hero-bg.webp",
    title: "Flat Roof Restoration",
    location: "Dallas Warehouse District",
    desc: "Massive commercial flat roof assessment and total system replacement.",
    category: "Flat Roof" as Filter,
  },
  {
    src: "/images/gallery-storm.webp",
    title: "Storm Damage Repair",
    location: "Plano Office Complex",
    desc: "Emergency recovery and repair following severe spring hail storms.",
    category: "Storm Repair" as Filter,
  },
  {
    src: "/images/gallery-tpo.webp",
    title: "TPO Re-Roof",
    location: "Allen Distribution Center",
    desc: "Full tear-off and TPO re-roof on a 60,000 sq ft logistics facility.",
    category: "TPO" as Filter,
  },
  {
    src: "/images/gallery-metal.webp",
    title: "Metal Panel Retrofit",
    location: "Garland Manufacturing Plant",
    desc: "Over-roofing with concealed-fastener metal panels to extend building life.",
    category: "Metal" as Filter,
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [animKey, setAnimKey] = useState(0);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  function handleFilter(f: Filter) {
    setActiveFilter(f);
    setAnimKey((k) => k + 1);
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

          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-24">
              No projects match that filter yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((project, i) => (
                <div
                  key={`${animKey}-${project.title}`}
                  className="service-card-animate group overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={project.src}
                      srcSet={buildImageSrcSet(project.src)}
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
                    <p className="text-muted-foreground">{project.desc}</p>
                  </div>
                </div>
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
