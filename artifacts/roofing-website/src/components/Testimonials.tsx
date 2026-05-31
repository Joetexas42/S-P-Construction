import { Link } from "wouter";
import { Quote, Star, MapPin, ExternalLink } from "lucide-react";
import {
  testimonials as allTestimonials,
  googleReviewsSummary,
  type Testimonial,
} from "@/data/testimonials";
import { ScrollRevealWrapper } from "@/components/ScrollRevealWrapper";
import { rowDelay } from "@/hooks/useRevealGrid";

type Variant = "dark" | "light";

type TestimonialsProps = {
  variant?: Variant;
  heading?: string;
  subheading?: string;
  items?: Testimonial[];
  limit?: number;
  showGoogleSummary?: boolean;
  className?: string;
};

export function Testimonials({
  variant = "dark",
  heading = "Trusted by DFW Property Managers",
  subheading = "Real voices from the building owners, operators, and asset managers who run the facilities we re-roof.",
  items,
  limit,
  showGoogleSummary = false,
  className = "",
}: TestimonialsProps) {
  const list = (items ?? allTestimonials).slice(
    0,
    limit ?? (items ?? allTestimonials).length,
  );

  const isDark = variant === "dark";
  const sectionBg = isDark
    ? "bg-primary text-primary-foreground"
    : "bg-background text-foreground";
  const cardBg = isDark
    ? "bg-white/10 border-white/10 backdrop-blur-sm"
    : "bg-card border-border";
  const headingColor = isDark ? "text-white" : "text-foreground";
  const subheadColor = isDark
    ? "text-primary-foreground/80"
    : "text-muted-foreground";
  const quoteColor = isDark ? "text-white/90" : "text-foreground/90";
  const nameColor = isDark ? "text-white" : "text-foreground";
  const metaColor = isDark ? "text-white/60" : "text-muted-foreground";
  const linkColor = isDark
    ? "text-secondary hover:text-secondary/80"
    : "text-secondary hover:text-secondary/80";

  return (
    <section className={`py-24 ${sectionBg} ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <ScrollRevealWrapper className="text-center mb-16 max-w-3xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-4 ${headingColor}`}
          >
            {heading}
          </h2>
          <p className={`text-lg ${subheadColor}`}>{subheading}</p>
        </ScrollRevealWrapper>

        {showGoogleSummary && (
          <ScrollRevealWrapper delay={60} className="mb-12 max-w-2xl mx-auto">
            <GoogleReviewsSummary variant={variant} />
          </ScrollRevealWrapper>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {list.map((t, i) => (
            <ScrollRevealWrapper key={t.id} delay={rowDelay(i, 3)}>
            <article
              data-testid={`testimonial-${t.id}`}
              className={`relative p-8 rounded-lg border ${cardBg} flex flex-col h-full`}
            >
              <Quote
                className={`h-8 w-8 mb-4 ${isDark ? "text-secondary" : "text-secondary"}`}
                aria-hidden="true"
              />
              <div className="flex gap-1 text-secondary mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className={`italic mb-6 leading-relaxed flex-1 ${quoteColor}`}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-white/10 dark:border-border pt-4 flex items-start gap-3">
                <TestimonialAvatar testimonial={t} isDark={isDark} />
                <div className="min-w-0 flex-1">
                <p
                  className={`font-bold font-heading uppercase tracking-wide ${nameColor}`}
                >
                  {t.name}
                </p>
                <p className={`text-sm ${metaColor}`}>
                  {t.role}, {t.company}
                </p>
                <div
                  className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider ${metaColor}`}
                >
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-secondary" />
                    {t.city}
                  </span>
                  <span className="opacity-50">|</span>
                  <span>{t.system}</span>
                </div>
                {t.caseStudySlug && (
                  <Link
                    href={`/projects#${t.caseStudySlug}`}
                    className={`mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${linkColor}`}
                    data-testid={`testimonial-case-study-link-${t.id}`}
                  >
                    See the case study <span aria-hidden>&rarr;</span>
                  </Link>
                )}
                </div>
              </div>
            </article>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function TestimonialAvatar({
  testimonial,
  isDark,
}: {
  testimonial: Testimonial;
  isDark: boolean;
}) {
  const ringClass = isDark ? "ring-white/20" : "ring-border";
  if (testimonial.photo) {
    const base = testimonial.photo;
    return (
      <img
        src={`${base}-96w.webp`}
        srcSet={`${base}-96w.webp 1x, ${base}-192w.webp 2x`}
        alt={`${testimonial.name} headshot`}
        loading="lazy"
        decoding="async"
        width={48}
        height={48}
        data-testid={`testimonial-avatar-${testimonial.id}`}
        className={`h-12 w-12 shrink-0 rounded-full object-cover ring-1 ${ringClass}`}
      />
    );
  }
  const fallbackBg = isDark
    ? "bg-white/15 text-white"
    : "bg-primary/10 text-primary";
  return (
    <div
      aria-hidden="true"
      data-testid={`testimonial-avatar-${testimonial.id}`}
      className={`h-12 w-12 shrink-0 rounded-full flex items-center justify-center font-heading font-bold text-sm ring-1 ${ringClass} ${fallbackBg}`}
    >
      {getInitials(testimonial.name)}
    </div>
  );
}

type GoogleReviewsSummaryProps = {
  variant?: Variant;
  className?: string;
};

export function GoogleReviewsSummary({
  variant = "light",
  className = "",
}: GoogleReviewsSummaryProps) {
  const isDark = variant === "dark";
  const wrapper = isDark
    ? "bg-white/10 border-white/15 backdrop-blur-sm"
    : "bg-card border-border shadow-sm";
  const labelColor = isDark
    ? "text-white/70"
    : "text-muted-foreground";
  const numberColor = isDark ? "text-white" : "text-foreground";
  const linkColor = "text-secondary hover:text-secondary/80";

  const { rating, reviewCount, profileUrl } = googleReviewsSummary;
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div
      data-testid="google-reviews-summary"
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border p-5 ${wrapper} ${className}`}
    >
      <div className="flex items-center gap-4">
        <GoogleGlyph />
        <div>
          <div className="flex items-baseline gap-2">
            <span
              className={`font-heading font-black text-3xl leading-none ${numberColor}`}
            >
              {rating.toFixed(1)}
            </span>
            <div className="flex gap-0.5 text-secondary" aria-hidden="true">
              {[...Array(5)].map((_, i) => {
                if (i < fullStars) {
                  return (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  );
                }
                if (i === fullStars && hasHalf) {
                  return (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current opacity-60"
                    />
                  );
                }
                return <Star key={i} className="w-4 h-4 opacity-30" />;
              })}
            </div>
          </div>
          <p
            className={`text-xs font-bold uppercase tracking-wider mt-1 ${labelColor}`}
          >
            Based on {reviewCount}+ Google reviews
          </p>
        </div>
      </div>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${linkColor}`}
        data-testid="link-google-reviews"
      >
        Read on Google <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <div className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center border border-border shadow-sm">
      <svg
        viewBox="0 0 48 48"
        className="w-7 h-7"
        aria-label="Google"
        role="img"
      >
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C40.9 35.5 44 30.2 44 24c0-1.3-.1-2.4-.4-3.5z"
        />
      </svg>
    </div>
  );
}
