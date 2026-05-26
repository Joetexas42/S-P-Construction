import { useEffect } from "react";
import { Link } from "wouter";
import {
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  caseStudyBySlug,
  caseStudies,
  getRelatedCaseStudies,
  formatSqFt,
  type CaseStudy,
} from "@/data/caseStudies";
import { getTestimonialBySlug } from "@/data/testimonials";
import NotFound from "@/pages/not-found";

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const study = caseStudyBySlug[params.slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!study) return <NotFound />;

  const testimonial = getTestimonialBySlug(study.slug);

  const articleJsonLd = {
    "@type": "Article",
    headline: study.title,
    description: study.seoDescription,
    about: study.system,
    locationCreated: {
      "@type": "Place",
      name: study.city,
    },
    image: study.image,
  };

  const reviewJsonLd = testimonial
    ? {
        "@type": "Review",
        name: `Client review — ${study.title}`,
        author: {
          "@type": "Person",
          name: testimonial.name,
          jobTitle: testimonial.role,
          worksFor: {
            "@type": "Organization",
            name: testimonial.company,
          },
        },
        reviewBody: testimonial.quote,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        itemReviewed: {
          "@type": "RoofingContractor",
          name: "Lone Star Commercial Roofing",
          description: `${study.system} project in ${study.city}: ${study.title}`,
          areaServed: study.city,
        },
      }
    : null;

  const detailJsonLd = {
    "@context": "https://schema.org",
    "@graph": reviewJsonLd ? [articleJsonLd, reviewJsonLd] : [articleJsonLd],
  };

  const cityShort = study.city.split(",")[0];
  const idx = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const related = getRelatedCaseStudies(study, 3);

  return (
    <>
      <SEO
        title={study.seoTitle}
        description={study.seoDescription}
        jsonLd={detailJsonLd}
      />

      {/* Header */}
      <section className="bg-primary text-primary-foreground pt-24 pb-12 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary hover:text-secondary/80 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all case studies
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-foreground/80 mb-4">
            <span className="text-secondary bg-secondary/15 px-2 py-1 rounded">
              {study.system}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-secondary" /> {study.city}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-secondary" />{" "}
              {study.completed}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight max-w-4xl">
            {study.title}
          </h1>
        </div>
      </section>

      {/* Hero image */}
      <section className="bg-background">
        <div className="container mx-auto px-4 md:px-6 -mt-8">
          <div className="aspect-[16/9] overflow-hidden bg-muted rounded-lg border border-border shadow-lg">
            <img
              src={study.image}
              alt={study.title}
              width={1600}
              height={900}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 bg-muted rounded-lg border border-border">
              <DetailStat label="Building" value={study.buildingType} />
              <DetailStat label="System" value={study.brand} />
              <DetailStat
                label="Size"
                value={`${formatSqFt(study.sizeSqFt)} sq ft`}
              />
              <DetailStat label="Completed" value={study.completed} />
            </div>

            <DetailSection title="Scope of Work">{study.scope}</DetailSection>
            <DetailSection title="The Challenge">
              {study.challenge}
            </DetailSection>
            <DetailSection title="The Outcome">{study.outcome}</DetailSection>

            <div className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-secondary mb-3">
                Project Highlights
              </h2>
              <ul className="space-y-2">
                {study.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <p className="text-muted-foreground">
                Have a similar project in {cityShort} or the DFW area?
              </p>
              <Link href="/contact">
                <Button className="font-bold uppercase tracking-wide bg-secondary hover:bg-secondary/90 text-white">
                  Get a Free Inspection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related case studies */}
      {related.length > 0 && (
        <section className="py-16 bg-background border-t border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-foreground mb-2">
                Related Projects
              </h2>
              <p className="text-muted-foreground mb-8">
                Similar commercial roofing work across DFW.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((r) => (
                  <RelatedCard key={r.slug} study={r} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer nav */}
      <section className="py-12 bg-muted border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground hover:text-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              All Case Studies
            </Link>
            {next && next.slug !== study.slug && (
              <NextCaseLink study={next} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function RelatedCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/projects/${study.slug}`}
      className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-secondary hover:shadow-lg transition-all"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={study.image}
          alt={study.title}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground mb-3">
          <span className="text-secondary bg-secondary/15 px-2 py-0.5 rounded">
            {study.system}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-secondary" />
            {study.city.split(",")[0]}
          </span>
        </div>
        <h3 className="text-base font-heading font-bold uppercase tracking-tight text-foreground leading-snug group-hover:text-secondary mb-2">
          {study.title}
        </h3>
        <div className="text-xs text-muted-foreground font-semibold">
          {formatSqFt(study.sizeSqFt)} sq ft
        </div>
      </div>
    </Link>
  );
}

function NextCaseLink({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/projects/${study.slug}`}
      className="group inline-flex items-center gap-3 text-right"
    >
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Next case study
        </div>
        <div className="text-sm font-bold uppercase tracking-wide text-foreground group-hover:text-secondary">
          {study.title}
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-secondary" />
    </Link>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1">
        {label}
      </div>
      <div className="text-sm font-semibold text-foreground leading-snug">
        {value}
      </div>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold uppercase tracking-widest text-secondary mb-2">
        {title}
      </h2>
      <p className="text-foreground leading-relaxed">{children}</p>
    </div>
  );
}
