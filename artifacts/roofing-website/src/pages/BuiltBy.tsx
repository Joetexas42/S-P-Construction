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
  Phone,
  Quote,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

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

const digitalCapabilities = [
  "Custom Websites",
  "Mobile Apps",
  "AI Receptionist",
  "AI Answering Service",
  "AI Customer Support",
  "Online Booking & Scheduling",
  "Review & Reputation Management",
  "Bilingual & Multilingual Sites",
  "Ongoing Maintenance & Support",
];

type FilterTab = "All" | "Web" | "App" | "AI";

const otherProjects = [
  {
    id: "sp-construction",
    name: "S&P Construction",
    description:
      "Full-featured commercial roofing website with a satellite roof estimator, geo-targeted SEO pages, before/after gallery, and inline quote forms — built to rank and convert across the DFW metroplex.",
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    accentColor: "#f59e0b",
    tags: ["Web", "AI"],
    featured: true,
    href: "/",
    external: false,
  },
  {
    id: "vv-auto",
    name: "V.V. Auto Repair & Service",
    description:
      "Appointment booking, service history tracking, and a review widget — all wrapped in a no-nonsense site that works as hard as the shop does.",
    gradient: "from-zinc-700 via-zinc-800 to-neutral-900",
    accentColor: "#a3e635",
    tags: ["Web", "App"],
    featured: false,
    href: null,
    external: false,
  },
  {
    id: "paper-street-software",
    name: "Paper Street Software Co.",
    description:
      "Our own home on the web — a portfolio and studio site showcasing what we build and why we build it, with a straight-talk approach to working with local businesses.",
    gradient: "from-indigo-800 via-violet-800 to-purple-900",
    accentColor: "#818cf8",
    tags: ["Web"],
    featured: false,
    href: "https://paperstreet.online/",
    external: true,
  },
  {
    id: "prompt-the-matrix",
    name: "Prompt the Matrix",
    description:
      "An AI prompt-engineering platform that helps creators and businesses get more out of language models — curated prompts, templates, and guides built for real-world use.",
    gradient: "from-emerald-800 via-teal-800 to-cyan-900",
    accentColor: "#34d399",
    tags: ["Web", "AI"],
    featured: false,
    href: null,
    external: false,
  },
  {
    id: "passport-bros-guide",
    name: "Passport Bros Guide",
    description:
      "A travel and lifestyle resource for the modern adventurer — destination guides, visa tips, and community content for men who travel internationally.",
    gradient: "from-orange-700 via-amber-700 to-yellow-600",
    accentColor: "#fbbf24",
    tags: ["Web"],
    featured: false,
    href: null,
    external: false,
  },
];

const allTags: FilterTab[] = ["All", "Web", "App", "AI"];

const builtBySchema = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Paper Street Software Co.",
    url: "https://paperstreet.online/",
    email: "paperstreetsoftware@gmail.com",
    description:
      "Paper Street Software Co. designs, builds, and maintains custom websites, AI tools, and digital solutions — purpose-built for local businesses.",
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "S&P Construction Website",
    description:
      "A full-featured commercial roofing website built by Paper Street Software Co. for S&P Construction — including a satellite roof estimator, geo-targeted service × city SEO pages, a before/after project gallery, inline quote forms, and Google rich-result structured data.",
    creator: {
      "@type": "ProfessionalService",
      name: "Paper Street Software Co.",
      url: "https://paperstreet.online/",
      email: "paperstreetsoftware@gmail.com",
    },
  },
];

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/paper-street-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { error?: string }).error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
          <CheckCircle2 className="h-7 w-7 text-secondary" />
        </div>
        <h3 className="text-xl font-heading font-black uppercase tracking-tight text-foreground">
          Message Received
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Thanks for reaching out. We'll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-foreground mb-1.5">
            Name <span className="text-secondary">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Jane Smith"
            className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-foreground mb-1.5">
            Email <span className="text-secondary">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="jane@yourbusiness.com"
            className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-foreground mb-1.5">
          Phone <span className="text-muted-foreground font-normal normal-case tracking-normal">(optional)</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="(555) 000-0000"
          className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-foreground mb-1.5">
          Message <span className="text-secondary">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Tell us about your business and what you're looking to build..."
          className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-colors resize-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-heading font-bold uppercase tracking-wide text-sm px-6 py-3 rounded hover:bg-secondary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
        {status !== "loading" && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}

export default function BuiltBy() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const visibleProjects = otherProjects.filter((p) => {
    if (p.featured) return true;
    return activeFilter === "All" || p.tags.includes(activeFilter);
  });

  return (
    <>
      <SEO
        title="Built by Paper Street Software Co."
        description="Paper Street Software Co. built the S&P Construction website — custom sites, AI tools, and digital solutions for local businesses."
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
              <a
                href="https://paperstreet.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Paper Street Software Co.
              </a>
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight text-white mb-6 leading-tight">
              We Build the Web<br className="hidden md:block" />{" "}
              <span className="text-secondary">for Local Business.</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-2xl mb-8">
              <a
                href="https://paperstreet.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Paper Street Software Co.
              </a>{" "}
              designs, builds, and maintains custom websites, AI tools, and digital solutions — purpose-built for the local businesses that keep communities running.
            </p>
            <a
              href="https://paperstreet.online/"
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

      {/* We Built This for a Friend */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <ScrollRevealWrapper>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
              The Story
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              We Built This for a Friend
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
              S&P Construction had the crew, the reputation, and twenty years of DFW roofing work behind them. What they didn't have was a website that showed any of it. We reached out because we believed a business that good deserved a digital presence to match — not just a brochure, but a real lead-generation engine.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              We scoped the project honestly, built every feature that would move the needle, and delivered it without surprises on the invoice. That's the Paper Street way.
            </p>
          </ScrollRevealWrapper>

          {/* Pull Quote */}
          <ScrollRevealWrapper delay={100}>
            <div className="mt-12 border-l-4 border-secondary bg-muted rounded-r-xl p-8 relative">
              <Quote className="h-8 w-8 text-secondary/30 absolute top-6 right-6" />
              <p className="text-lg md:text-xl font-heading font-bold text-foreground leading-snug mb-6 max-w-2xl">
                "They didn't just build us a website — they built us a system. The estimator alone has paid for itself three times over. These guys actually care whether it works."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <span className="text-secondary font-heading font-black text-sm">SC</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Scott C.</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Owner, Scott Commercial Roofing</p>
                </div>
              </div>
            </div>
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* What We Built for S&P Construction */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollRevealWrapper>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                Case Study
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground mb-4">
                What We Built for S&amp;P Construction
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

      {/* Digital Solutions — dark section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
            <ScrollRevealWrapper>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                What We Do
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-6">
                Digital solutions built for the real world.
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed mb-8">
                From a single landing page to a full-stack AI-powered platform — we scope the work honestly, build it well, and hand it off with no surprises on the invoice.
              </p>
              <a
                href="https://paperstreet.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-heading font-bold uppercase tracking-wide text-sm px-6 py-3 rounded hover:bg-secondary/90 transition-colors"
              >
                See our work
                <ArrowRight className="h-4 w-4" />
              </a>
            </ScrollRevealWrapper>

            <ScrollRevealWrapper delay={80}>
              <ul className="space-y-3">
                {digitalCapabilities.map((cap, i) => (
                  <li key={cap} className="flex items-center gap-3">
                    <span
                      className="inline-block w-2 h-2 rounded-full bg-secondary shrink-0"
                      style={{ opacity: 1 - i * 0.04 }}
                    />
                    <span className="text-sm font-semibold text-primary-foreground/90">
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollRevealWrapper>
          </div>
        </div>
      </section>

      {/* Other Work */}
      <section className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollRevealWrapper>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                  Portfolio
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground">
                  Other Work
                </h2>
              </div>
              {/* Filter pills */}
              <div className="flex gap-2 flex-wrap">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors ${
                      activeFilter === tag
                        ? "bg-secondary text-secondary-foreground border-secondary"
                        : "bg-background text-muted-foreground border-border hover:border-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </ScrollRevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleProjects.map((project, i) => (
              <ScrollRevealWrapper key={project.id} delay={i * 60}>
                <div
                  className={`rounded-xl overflow-hidden border border-border bg-card flex flex-col h-full ${
                    project.featured ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Gradient thumbnail */}
                  <div
                    className={`bg-gradient-to-br ${project.gradient} ${
                      project.featured ? "h-52 md:h-64" : "h-40"
                    } flex items-center justify-center relative`}
                  >
                    <span
                      className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter opacity-20 text-white select-none"
                    >
                      {project.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                    </span>
                    {project.featured && (
                      <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded border border-border text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-heading font-black uppercase tracking-tight text-foreground">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {project.description}
                    </p>
                    {project.href && (
                      <div className="pt-2">
                        {project.external ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-secondary hover:text-secondary/80 transition-colors"
                          >
                            Visit site <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <a
                            href={project.href}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-secondary hover:text-secondary/80 transition-colors"
                          >
                            View this site <ArrowRight className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollRevealWrapper>
            ))}
          </div>

          <ScrollRevealWrapper delay={150}>
            <p className="mt-8 text-center text-xs text-muted-foreground">
              Projects shown are illustrative examples of work we do — not confirmed client endorsements.
            </p>
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* Contact form section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">

            {/* Left — copy */}
            <ScrollRevealWrapper>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                Work With Us
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
                Have a business you're proud of?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We work with local business owners who care about what they've built. If that sounds like you, send us a message — no sales pitch, just a straight conversation about what you need and whether we're the right fit.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 text-secondary shrink-0" />
                  <a
                    href="https://paperstreet.online/"
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
            </ScrollRevealWrapper>

            {/* Right — form */}
            <ScrollRevealWrapper delay={80}>
              <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                  Get In Touch
                </p>
                <h3 className="text-xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
                  Let's Talk About Your Project
                </h3>
                <ContactForm />
              </div>
            </ScrollRevealWrapper>

          </div>
        </div>
      </section>
    </>
  );
}
