import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { CertificationsStrip } from "@/components/CertificationsStrip";
import { ScrollRevealWrapper } from "@/components/ScrollRevealWrapper";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { Award, ShieldCheck, Users, Wrench, Clock, HardHat } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    description:
      "No surprise line items. Every quote is itemized, explained in plain language, and backed by a written scope before a single fastener is set.",
  },
  {
    icon: HardHat,
    title: "OSHA 30 Trained Crews",
    description:
      "Every crew member holds current OSHA 30 Construction certification. Safe crews finish on time — and your liability exposure stays zero.",
  },
  {
    icon: Wrench,
    title: "System-Matched Work",
    description:
      "We recommend the roof system that fits your building, budget, and local climate — not the one with the highest margin.",
  },
  {
    icon: Clock,
    title: "On-Schedule Delivery",
    description:
      "Weather-adjusted project schedules, daily progress updates, and a superintendent on site every day so your tenants and operations stay undisturbed.",
  },
  {
    icon: Users,
    title: "Long-Term Relationships",
    description:
      "More than half our revenue comes from repeat clients. We write that into how we treat every first project — because we're planning for the next twenty years, not the next invoice.",
  },
  {
    icon: Award,
    title: "Manufacturer Warranties",
    description:
      "Factory-authorized installer status with GAF, Firestone, and Carlisle lets us issue NDL warranties that protect you when it counts.",
  },
];

const milestones = [
  { year: "2003", label: "Founded in Dallas, TX by Robert Scott with a two-man crew and a focus on TPO reroofing." },
  { year: "2008", label: "Expanded to the full DFW Metroplex. First $1M+ project — a 180,000 sq ft distribution center in Irving." },
  { year: "2013", label: "Achieved GAF Master Elite® and Firestone Platinum certification status. RCAT membership established." },
  { year: "2018", label: "Opened dedicated estimating and project-management department. Launched 24/7 emergency leak response." },
  { year: "2024", label: "50+ crew members, $2M commercial GL coverage, and more than 400 completed commercial projects across North Texas." },
];

const leadership = [
  {
    name: "Robert Scott",
    role: "Founder & President",
    bio: "Started the company after 12 years as a commercial roofing foreman. Robert still walks every completed project before final sign-off.",
  },
  {
    name: "Angela Torres",
    role: "VP of Operations",
    bio: "Angela joined in 2009 and built the estimating and project-management systems that let us hit schedule on 96% of projects.",
  },
  {
    name: "Marcus Webb",
    role: "Senior Inspector & QA Lead",
    bio: "Marcus is a certified roofing inspector with 18 years of field experience and a reputation for finding problems before they become emergencies.",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Scott Commercial Roofing | DFW's Trusted Flat Roof Specialists"
        description="Learn who we are — family-owned since 2003, OSHA 30 trained crews, manufacturer-certified, and serving North Texas commercial property owners with transparent pricing and long-term relationships."
      />

      {/* Hero */}
      <section
        data-dark-hero
        className="relative min-h-[55vh] flex items-center justify-center pt-20 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            base="/images/hero-bg"
            fallbackWidth={1280}
            sizes="100vw"
            alt="S&P Construction crew on a large commercial flat roof in North Texas"
            width={1280}
            height={720}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background z-20" />
        </div>
        <div className="container relative z-30 mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="section-heading-animate inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-secondary/60 mb-6 backdrop-blur-sm shadow-lg">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                Family-Owned · Founded 2003 · Dallas, TX
              </span>
            </div>
            <h1 className="section-heading-animate text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.65)] [animation-delay:120ms]">
              Built on Roofs.<br className="hidden md:block" />{" "}
              <span className="text-secondary">Built on Trust.</span>
            </h1>
            <p className="section-heading-animate [animation-delay:240ms] text-xl text-white font-medium leading-relaxed [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
              Twenty-plus years of commercial flat roofing across the DFW Metroplex — one roof, one client, one honest assessment at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollRevealWrapper>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Our Story</p>
                <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-6 text-foreground">
                  A Roofer Who Got Tired of Excuses
                </h2>
              </ScrollRevealWrapper>
              <ScrollRevealWrapper delay={80}>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  Robert Scott spent twelve years as a commercial roofing foreman watching building owners get handed vague quotes, blown schedules, and callbacks that dragged on for months. In 2003 he founded S&P Construction with a single conviction: property owners deserve the same straight talk they'd get from a trusted contractor friend.
                </p>
              </ScrollRevealWrapper>
              <ScrollRevealWrapper delay={160}>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  We started with a two-man crew and a used pickup in Dallas. Today we run 50+ field personnel across the full DFW Metroplex, with manufacturer certifications from GAF, Firestone, and Carlisle — but the same rule still applies on every job: no surprises on the invoice, no hand-waving on the scope, and no signing off until the roof is right.
                </p>
              </ScrollRevealWrapper>
              <ScrollRevealWrapper delay={240}>
                <p className="text-muted-foreground leading-relaxed">
                  More than half our revenue comes from clients we've roofed before. That number keeps us honest. We don't win repeat business by being cheap; we win it by being the contractor a building owner calls first, every time.
                </p>
              </ScrollRevealWrapper>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              <ScrollRevealWrapper>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Milestones</p>
              </ScrollRevealWrapper>
              <div className="relative border-l-2 border-secondary/30 pl-8 space-y-8">
                {milestones.map((m, i) => (
                  <ScrollRevealWrapper key={m.year} delay={i * 80}>
                    <div className="relative">
                      <span className="absolute -left-[2.35rem] top-1 w-4 h-4 rounded-full bg-secondary border-2 border-background shadow" />
                      <p className="text-sm font-black uppercase tracking-widest text-secondary mb-1">{m.year}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{m.label}</p>
                    </div>
                  </ScrollRevealWrapper>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Values */}
      <section className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollRevealWrapper>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">How We Work</p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground">
                The Six Things That Don't Change
              </h2>
            </div>
          </ScrollRevealWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollRevealWrapper key={v.title} delay={i * 60}>
                  <div className="bg-card border border-border rounded-lg p-7 h-full flex flex-col gap-4 hover:border-secondary/40 transition-colors">
                    <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-base font-heading font-bold uppercase tracking-tight text-foreground mb-2">
                        {v.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                </ScrollRevealWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollRevealWrapper>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">The Team</p>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground">
                The People Behind Every Project
              </h2>
            </div>
          </ScrollRevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {leadership.map((person, i) => (
              <ScrollRevealWrapper key={person.name} delay={i * 100}>
                <div className="bg-card border border-border rounded-lg p-8 text-center flex flex-col items-center gap-4 hover:border-secondary/40 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <p className="font-heading font-black text-lg uppercase tracking-tight text-foreground">{person.name}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary mt-1">{person.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{person.bio}</p>
                </div>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <CertificationsStrip />

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <ScrollRevealWrapper>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Ready to Talk?</p>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              Meet Us on Your Roof
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              A free, no-pressure inspection is the fastest way to see how we work. Our senior inspector will walk your roof, document what they find, and hand you a clear report — with no sales pressure attached.
            </p>
          </ScrollRevealWrapper>
          <ScrollRevealWrapper delay={100}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="font-bold uppercase tracking-wide w-full sm:w-auto">
                  Request Free Inspection
                </Button>
              </Link>
              <Link href="/estimate">
                <Button size="lg" variant="outline" className="font-bold uppercase tracking-wide w-full sm:w-auto">
                  Get Instant Estimate
                </Button>
              </Link>
            </div>
          </ScrollRevealWrapper>
        </div>
      </section>
    </>
  );
}
