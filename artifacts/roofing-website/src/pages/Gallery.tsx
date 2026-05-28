import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  buildImageSrcSet,
  SIZES_HALF_COLUMN_GRID,
} from "@/lib/responsiveImage";

export default function Gallery() {
  const projects = [
    {
      src: "/images/gallery-tpo.webp",
      title: "TPO Membrane Installation",
      location: "Frisco Retail Center",
      desc: "40,000 sq ft single-ply TPO membrane system over rigid insulation."
    },
    {
      src: "/images/gallery-metal.webp",
      title: "Standing Seam Metal Roof",
      location: "Fort Worth Industrial Park",
      desc: "Architectural standing seam panels custom-fabricated on site."
    },
    {
      src: "/images/hero-bg.webp",
      title: "Flat Roof Restoration",
      location: "Dallas Warehouse District",
      desc: "Massive commercial flat roof assessment and total system replacement."
    },
    {
      src: "/images/gallery-storm.webp",
      title: "Storm Damage Repair",
      location: "Plano Office Complex",
      desc: "Emergency recovery and repair following severe spring hail storms."
    }
  ];

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
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">Project Gallery</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              We let our work speak for itself. Browse our recent installations, replacements, and repairs across North Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <div key={i} className="service-card-animate group overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:border-secondary hover:shadow-md hover:scale-[1.02] transition-all duration-200" style={{ animationDelay: `${i * 40}ms` }}>
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
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-heading font-bold uppercase tracking-tight text-foreground">{project.title}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-1 rounded">
                      {project.location}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center bg-muted p-12 rounded-lg border border-border">
            <h3 className="text-2xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">Ready for your project to be next?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our teams are standing by to evaluate your facility and provide a comprehensive roofing solution tailored to your specific needs.
            </p>
            <Link href="/contact">
              <Button size="lg" className="text-lg h-14 px-8 font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white">
                Request Free Inspection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
