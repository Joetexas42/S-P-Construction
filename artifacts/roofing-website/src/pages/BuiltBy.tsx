import { SEO } from "@/components/SEO";
import { ScrollRevealWrapper } from "@/components/ScrollRevealWrapper";
import {
  Satellite,
  MapPin,
  Images,
  FileText,
  Star,
  Map,
  Shield,
  Smartphone,
  Globe,
  Bot,
  Languages,
  Wrench,
  Mail,
  ExternalLink,
} from "lucide-react";

const builtFeatures = [
  {
    icon: Satellite,
    title: "Satellite Roof Estimator",
    description:
      "Instant area estimates pulled from satellite imagery so prospects get a ballpark number before they ever pick up the phone.",
  },
  {
    icon: MapPin,
    title: "Service × City SEO Pages",
    description:
      "Hundreds of geo-targeted landing pages pairing every service with every city in the DFW service area — built to rank and built to convert.",
  },
  {
    icon: Images,
    title: "Before / After Project Gallery",
    description:
      "A full project portfolio with side-by-side before/after comparisons, filterable by service type and city.",
  },
  {
    icon: FileText,
    title: "Inline Quote Forms",
    description:
      "Contextual quote request forms embedded directly on service and city pages — no dead-end calls-to-action.",
  },
  {
    icon: Star,
    title: "Google Rich Results & Schema",
    description:
      "Structured data (LocalBusiness, RoofingContractor, FAQPage, BreadcrumbList) wired throughout for enhanced search listings.",
  },
  {
    icon: Map,
    title: "Auto-Updating Sitemap",
    description:
      "XML sitemap with accurate <lastmod> timestamps that updates automatically when content changes are published.",
  },
  {
    icon: Shield,
    title: "Cookie Consent & Privacy Policy",
    description:
      "GDPR-aligned cookie consent banner and a full privacy policy that actually reflects how the site works.",
  },
  {
    icon: Smartphone,
    title: "Responsive Mobile Design",
    description:
      "Pixel-perfect on every screen size — from a 320 px phone to a wide-format desktop monitor.",
  },
];

const capabilities = [
  { icon: Globe, label: "Custom websites & landing pages" },
  { icon: Bot, label: "AI-powered tools & automations" },
  { icon: Languages, label: "Multilingual & localization support" },
  { icon: Wrench, label: "Ongoing maintenance & performance" },
];

const builtBySchema = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Paper Street Software Co.",
    url: "https://www.paperstreet.online",
    email: "paperstreetsoftware@gmail.com",
    description:
      "Paper Street Software Co. designs, builds, and maintains custom websites, AI tools, and digital solutions — purpose-built for local businesses.",
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Scott Commercial Roofing Website",
    url: "https://www.scottcommercialroofing.com",
    description:
      "A full-featured commercial roofing website built by Paper Street Software Co. for Scott Commercial Roofing — including a satellite roof estimator, geo-targeted service × city SEO pages, a before/after project gallery, inline quote forms, and Google rich-result structured data.",
    creator: {
      "@type": "ProfessionalService",
      name: "Paper Street Software Co.",
      url: "https://www.paperstreet.online",
      email: "paperstreetsoftware@gmail.com",
    },
  },
];

export default function BuiltBy() {
  return (
    <>
      <SEO
        title="Built by Paper Street Software Co."
        description="Paper Street Software Co. built the Scott Commercial Roofing website — custom sites, AI tools, and digital solutions for local businesses."
        jsonLd={builtBySchema}
      />

      {/* Hero */}
      <section
        data-dark-hero
        className="bg-primary text-primary-foreground pt-24 pb-20"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <ScrollRevealWrapper>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">
              Paper Street Software Co.
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight text-white mb-6 leading-tight">
              We Build the Web<br className="hidden md:block" />{" "}
              <span className="text-secondary">for Local Business.</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-2xl mb-8">
              Paper Street Software Co. designs, builds, and maintains custom websites, AI tools, and digital solutions — purpose-built for the local businesses that keep communities running.
            </p>
            <a
              href="https://www.paperstreet.online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-heading font-bold uppercase tracking-wide text-sm px-6 py-3 rounded hover:bg-secondary/90 transition-colors"
            >
              Visit paperstreet.online
              <ExternalLink className="h-4 w-4" />
            </a>
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* What We Built for Scott Commercial Roofing */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollRevealWrapper>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                Case Study
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground mb-4">
                What We Built for Scott Commercial Roofing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                S&P Construction needed more than a brochure site — they needed a digital presence that generates leads, ranks in every city they serve, and earns the trust of commercial property managers before the first call. Here's what we built.
              </p>
            </div>
          </ScrollRevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {builtFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <ScrollRevealWrapper key={feature.title} delay={i * 50}>
                  <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col gap-4 hover:border-secondary/40 transition-colors">
                    <div className="w-11 h-11 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-heading font-bold uppercase tracking-tight text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </ScrollRevealWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <ScrollRevealWrapper>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                Our Work
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
                What We Build
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From a single landing page to a full-stack AI-powered platform — we scope the work honestly, build it well, and hand it off with no surprises on the invoice.
              </p>
              <ul className="space-y-4">
                {capabilities.map((cap, i) => {
                  const Icon = cap.icon;
                  return (
                    <ScrollRevealWrapper key={cap.label} delay={i * 60}>
                      <li className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-secondary" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {cap.label}
                        </span>
                      </li>
                    </ScrollRevealWrapper>
                  );
                })}
              </ul>
            </ScrollRevealWrapper>

            {/* Get In Touch card */}
            <ScrollRevealWrapper delay={100}>
              <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                  Get In Touch
                </p>
                <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
                  Let's Talk About Your Project
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 text-secondary shrink-0" />
                    <a
                      href="https://www.paperstreet.online"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      paperstreet.online
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-secondary shrink-0" />
                    <a
                      href="mailto:paperstreetsoftware@gmail.com"
                      className="hover:text-foreground transition-colors"
                    >
                      paperstreetsoftware@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </ScrollRevealWrapper>
          </div>
        </div>
      </section>
    </>
  );
}
