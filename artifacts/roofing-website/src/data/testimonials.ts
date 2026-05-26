export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  city: string;
  system: string;
  caseStudySlug?: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "marcus-frisco-retail",
    quote:
      "After the spring hail event in Frisco, Lone Star was on site within hours. They phased a full 40,000 sq ft TPO replacement across eight occupied storefronts without ever closing a tenant, and dealt directly with our insurance adjuster. Utterly professional.",
    name: "Marcus Thompson",
    role: "Property Manager",
    company: "Eldorado Crossing Retail Center",
    city: "Frisco, TX",
    system: "60-mil Carlisle TPO",
    caseStudySlug: "frisco-retail-tpo-replacement",
    photo: "/images/testimonials/marcus-thompson.png",
  },
  {
    id: "sarah-fort-worth-industrial",
    quote:
      "Three other roofers told us we'd have to shut down our 24/7 logistics floor for a metal roof replacement. Lone Star roll-formed 85,000 sq ft of standing seam on site and never paused a shift. The 25-year weathertight warranty was the easy part — the operational discipline was the impressive part.",
    name: "Sarah Jiménez",
    role: "Director of Operations",
    company: "Trinity Logistics Partners",
    city: "Fort Worth, TX",
    system: "24-Gauge Standing Seam Metal",
    caseStudySlug: "fort-worth-industrial-standing-seam",
    photo: "/images/testimonials/sarah-jimenez.png",
  },
  {
    id: "david-dallas-medical",
    quote:
      "The communication is what sets them apart. Daily field reports, drone photos of every section, and zero surprises on the final invoice. Our new standing seam metal roof was delivered exactly on the day they committed to twelve weeks earlier.",
    name: "David Chen",
    role: "Managing Owner",
    company: "Preston Medical Plaza",
    city: "Dallas, TX",
    system: "Standing Seam Metal",
    photo: "/images/testimonials/david-chen.png",
  },
  {
    id: "rachel-plano-office",
    quote:
      "Golf-ball hail in April put 400+ punctures through our built-up roof across three office buildings. Lone Star tarped within four hours, documented the entire scope for our carrier, and got us a 100% replacement-cost approval. We are back to watertight with a 15-year GAF warranty.",
    name: "Rachel Okafor",
    role: "Senior Property Manager",
    company: "Preston Ridge Office Campus",
    city: "Plano, TX",
    system: "GAF Modified Bitumen",
    caseStudySlug: "plano-office-hail-restoration",
    photo: "/images/testimonials/rachel-okafor.png",
  },
  {
    id: "antonio-dallas-cold-storage",
    quote:
      "We run a refrigerated food distribution floor that cannot be open to outside air for more than 90 minutes at a stretch. Lone Star re-engineered our drainage, eliminated 17 ponding spots, and installed 120,000 sq ft of Sika PVC in dry-in stages without ever breaking our cold chain.",
    name: "Antonio Reyes",
    role: "Director of Facilities",
    company: "Lone Star Cold Logistics",
    city: "Dallas, TX",
    system: "60-mil Sika Sarnafil PVC",
    caseStudySlug: "dallas-warehouse-pvc-replacement",
    photo: "/images/testimonials/antonio-reyes.png",
  },
  {
    id: "linda-mckinney-medical",
    quote:
      "Active operating rooms below an aging built-up roof is every facility manager's nightmare. They recovered the existing BUR with GAF TPO at night and on weekends, saved us roughly $180k versus a full tear-off, and didn't disrupt a single surgery.",
    name: "Linda Patel",
    role: "Facilities Director",
    company: "Stonebridge Medical Group",
    city: "McKinney, TX",
    system: "GAF EverGuard TPO Recover",
    caseStudySlug: "mckinney-medical-tpo-recover",
    photo: "/images/testimonials/linda-patel.png",
  },
  {
    id: "james-arlington-school",
    quote:
      "Nine weeks from last bell to teacher in-service, plus an asbestos abatement before we could even start. Lone Star finished four days early, on budget, and our gymnasium and cafeteria opened on time with a 20-year manufacturer warranty.",
    name: "James Whitfield",
    role: "Director of Operations",
    company: "Arlington ISD — South Campus",
    city: "Arlington, TX",
    system: "Johns Manville 50-mil PVC",
    caseStudySlug: "arlington-school-pvc-replacement",
    photo: "/images/testimonials/james-whitfield.png",
  },
  {
    id: "monique-irving-hospitality",
    quote:
      "Our Las Colinas hotel had a chronic leak above two guest floors that two other contractors couldn't isolate. Lone Star's infrared survey found the source in under an hour and sealed it permanently the same week. They are now on our preferred vendor list for the entire portfolio.",
    name: "Monique Delacroix",
    role: "Regional Asset Manager",
    company: "Vantage Hospitality Group",
    city: "Irving, TX",
    system: "TPO Leak Repair & Re-Flashing",
    photo: "/images/testimonials/monique-delacroix.png",
  },
];

export function getTestimonialBySlug(slug: string): Testimonial | undefined {
  return testimonials.find((t) => t.caseStudySlug === slug);
}

const BUSINESS_NAME = "Lone Star Commercial Roofing";

export const testimonialReviewsJsonLd = testimonials.map((t) => ({
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": t.name,
    "jobTitle": t.role,
    "worksFor": {
      "@type": "Organization",
      "name": t.company,
    },
  },
  "reviewBody": t.quote,
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1",
  },
  "itemReviewed": {
    "@type": "RoofingContractor",
    "name": BUSINESS_NAME,
  },
}));

export const testimonialAggregateRatingJsonLd = {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": testimonials.length,
  "bestRating": "5",
  "worstRating": "1",
};

export const googleReviewsSummary = {
  rating: 4.9,
  reviewCount: 187,
  profileUrl:
    "https://www.google.com/search?q=Lone+Star+Commercial+Roofing+Dallas",
};
