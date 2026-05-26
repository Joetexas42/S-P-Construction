import { Link } from "wouter";
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
import { testimonials, getTestimonialBySlug } from "@/data/testimonials";
import { caseStudies, formatSqFt, type CaseStudy } from "@/data/caseStudies";

export default function Projects() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Commercial Roofing Case Studies — DFW Metroplex",
    itemListElement: caseStudies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      description: `${formatSqFt(c.sizeSqFt)} sq ft ${c.system} in ${c.city}.`,
      url: `/projects/${c.slug}`,
    })),
  };

  return (
    <>
      <SEO
        title="Commercial Roofing Case Studies — DFW Projects | Lone Star Commercial Roofing"
        description="Real DFW commercial roofing case studies: TPO, PVC, and standing-seam metal replacements in Frisco, Fort Worth, Dallas, Plano, McKinney, and Arlington."
        jsonLd={itemListJsonLd}
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

      {/* Case studies grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>

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

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const testimonial = getTestimonialBySlug(study.slug);
  return (
    <article
      id={study.slug}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-lg transition-shadow scroll-mt-24"
    >
      <Link
        href={`/projects/${study.slug}`}
        className="aspect-[16/10] overflow-hidden bg-muted relative block"
      >
        <img
          src={study.image}
          alt={study.title}
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
