import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ScrollRevealWrapper } from "@/components/ScrollRevealWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const SITE_ORIGIN = "https://scottcommercialroofing.com";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How much does a commercial roof replacement cost?",
    answer:
      "Commercial roofing costs vary based on roof size, system type, existing conditions, and access. In North Texas, most flat or low-slope commercial replacements run $6–$14 per square foot installed. A 10,000 sq ft warehouse roof might range from $60,000 to $140,000 depending on the membrane system chosen. We provide firm, itemized quotes after a free on-site inspection — no estimates over the phone, because every roof is different.",
  },
  {
    question: "How long does a commercial roof replacement take?",
    answer:
      "Most commercial replacements are completed in 3–10 business days for roofs under 20,000 sq ft. Larger facilities or complex phased work (where business operations must continue below) can take 2–4 weeks. We coordinate around your operating hours and can work nights or weekends when needed to minimize disruption.",
  },
  {
    question: "What roofing systems do you install?",
    answer:
      "We install TPO, EPDM, PVC, modified bitumen, and built-up roofing (BUR) systems, as well as standing-seam and exposed-fastener metal roofing for applicable structures. For most North Texas flat-roof applications we recommend TPO or EPDM for the best combination of energy performance, durability, and cost. During your inspection we'll recommend the system that fits your building, budget, and usage.",
  },
  {
    question: "What warranty do you provide on your work?",
    answer:
      "We offer a 2-year workmanship warranty on every installation, and manufacturer warranties of 15–30 years depending on the system and membrane thickness. Many TPO and PVC systems qualify for NDL (No-Dollar-Limit) manufacturer warranties when installed by a certified contractor — which we are. We'll outline all warranty terms in your written proposal.",
  },
  {
    question: "Does my property insurance cover commercial roof damage?",
    answer:
      "Most commercial property policies cover storm damage — hail, wind, and lightning — but not wear or maintenance-related failures. After a major hail or wind event, schedule a free inspection right away. We document damage with photos and measurements, prepare a scope of loss, and can work directly with your insurance adjuster throughout the claims process. You are never required to use the contractor your insurer recommends.",
  },
  {
    question: "Do you handle roofing permits?",
    answer:
      "Yes. Scott Commercial Roofing pulls all required city and county permits for every job. Permit requirements vary by municipality across the DFW Metroplex — we manage that process entirely so you don't have to. All work passes final inspection before we close out the project.",
  },
  {
    question: "Can you repair my roof instead of replacing it?",
    answer:
      "Absolutely. Repair is often the right call when the membrane is structurally sound and the damage is isolated. We perform a thorough inspection and give you an honest assessment: if repair extends your roof's useful life cost-effectively, we'll recommend repair. If the membrane is aged, saturated, or failing broadly, we'll explain why replacement is the better long-term value. We don't push replacements to inflate revenue.",
  },
  {
    question: "How do you handle emergency leaks?",
    answer:
      "We offer emergency leak response for active commercial leaks, including after-hours and weekend calls. When you call, a senior technician is dispatched to stabilize the leak with temporary waterproofing measures to protect your interior and inventory. A full diagnostic inspection and permanent repair proposal follows within 24–48 hours. Call us directly at (214) 600-0188.",
  },
  {
    question: "How much disruption will a replacement cause to my business?",
    answer:
      "Less than most property managers expect. Commercial roofing is performed from the exterior — your tenants or employees typically continue working normally below. We use dust barriers at roof penetrations, schedule noisy equipment for off-peak hours when requested, and remove debris daily. For sensitive operations (hospitals, data centers, food manufacturing), we develop a specific disruption-mitigation plan before work begins.",
  },
  {
    question: "Are you licensed and insured in Texas?",
    answer:
      "Yes. Scott Commercial Roofing carries full general liability insurance and workers' compensation coverage. We are licensed in Texas and maintain all applicable certifications for the manufacturer systems we install. Certificate of insurance is provided upon request before any work begins.",
  },
];

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 bg-card hover:bg-muted/50 transition-colors"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-base md:text-lg font-semibold text-foreground leading-snug pr-2">
          {item.question}
        </span>
        <ChevronDown
          className={`shrink-0 w-5 h-5 text-secondary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[600px]" : "max-h-0"}`}
      >
        <div className="px-6 py-5 bg-card border-t border-border text-muted-foreground leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <>
      <SEO
        title="Commercial Roofing FAQs | Scott Commercial Roofing"
        description="Answers to the most common questions about commercial roofing cost, timeline, materials, warranties, insurance claims, and permits in North Texas."
        canonical={`${SITE_ORIGIN}/faq`}
        jsonLd={faqJsonLd}
      />

      {/* Hero */}
      <section
        data-dark-hero
        className="relative min-h-[50vh] flex items-center justify-center pt-20 pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/images/contact-hero.webp"
            srcSet="/images/contact-hero-480w.webp 480w, /images/contact-hero-800w.webp 800w, /images/contact-hero-1280w.webp 1280w"
            sizes="100vw"
            alt="Commercial rooftop in North Texas with Scott Commercial Roofing crew at work"
            width={1280}
            height={720}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background z-20" />
        </div>
        <div className="container relative z-30 mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="section-heading-animate inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-secondary/60 mb-6 backdrop-blur-sm shadow-lg">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                Common Questions, Straight Answers
              </span>
            </div>
            <h1 className="section-heading-animate text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.65)] [animation-delay:120ms]">
              Frequently Asked
              <br className="hidden md:block" /> Questions
            </h1>
            <p className="section-heading-animate [animation-delay:240ms] text-xl text-white font-medium leading-relaxed [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
              Everything you need to know about commercial roofing — cost,
              timeline, materials, warranties, and more. Still have questions?
              We're a phone call away.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <ScrollRevealWrapper>
            <h2 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tight mb-3 text-foreground">
              Your Questions, Answered
            </h2>
            <p className="text-muted-foreground mb-12 text-lg">
              Click any question to expand the answer. If you don't see what you
              need, reach out directly — no scripts, no runaround.
            </p>
          </ScrollRevealWrapper>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollRevealWrapper key={i} delay={i * 40}>
                <FAQAccordion item={faq} index={i} />
              </ScrollRevealWrapper>
            ))}
          </div>

          {/* CTA */}
          <ScrollRevealWrapper>
            <div className="mt-20 rounded-2xl bg-card border border-border p-10 text-center">
              <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Talk to a senior estimator — not a call center. We'll answer
                your specific questions about your building, budget, and
                timeline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-bold uppercase tracking-wide">
                  <Link href="/estimate">Get a Free Estimate</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-bold uppercase tracking-wide"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </ScrollRevealWrapper>
        </div>
      </section>
    </>
  );
}
