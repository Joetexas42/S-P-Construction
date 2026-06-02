import type { CityData } from "@/pages/CityPage";

export const cities: CityData[] = [
  {
    slug: "dallas",
    name: "Dallas",
    county: "Dallas County",
    seoTitle: "Commercial Roofing Dallas TX | TPO, PVC & Flat Roof Contractor",
    seoDescription:
      "Dallas commercial flat roof specialists. TPO, PVC, and single-ply membrane installation, repair, and 24/7 storm response across Dallas County. Authorized Firestone, Mule-Hide & Duro-Last installer.",
    intro:
      "From the Design District warehouses to high-rises in the CBD and distribution centers along I-30 and I-20, we install, repair, and replace commercial flat roofs across every Dallas submarket. Same-day emergency response, written reports on every inspection.",
    landmarks: [
      "Dallas Design District",
      "Deep Ellum mixed-use buildings",
      "Stemmons Corridor warehouses",
      "Medical District facilities",
    ],
    industries: [
      "Logistics & distribution along I-30 / I-20",
      "Healthcare campuses and medical office",
      "Restaurant, retail, and hospitality",
      "Multi-tenant office and flex space",
    ],
    neighborhoods: [
      "Downtown / CBD",
      "Oak Cliff",
      "Bishop Arts",
      "Lake Highlands",
      "Pleasant Grove",
      "Love Field area",
    ],
    weatherNote:
      "Dallas sees some of the most punishing hail and UV exposure in Texas. Our TPO and PVC systems are spec'd with hail-rated cover boards and reflective membranes to extend service life and keep your cooling bills predictable through the long DFW summer.",
    heroImage: {
      base: "/images/cities/dallas",
      alt: "Dallas, Texas downtown skyline with commercial high-rise buildings",
    },
    testimonials: [
      {
        quote:
          "The communication is what sets them apart. Daily field reports, drone photos of every section, and zero surprises on the final invoice. Our new standing seam metal roof was delivered exactly on the day they committed to twelve weeks earlier.",
        name: "David Chen",
        businessType: "Medical Office Owner",
      },
      {
        quote:
          "We run a refrigerated food distribution floor that can't be open to outside air for more than 90 minutes at a stretch. S&P Construction re-engineered our drainage, eliminated 17 ponding spots, and installed 120,000 sq ft of Sika PVC in dry-in stages without ever breaking our cold chain.",
        name: "Antonio Reyes",
        businessType: "Cold Storage Facilities Director",
      },
      {
        quote:
          "Our Design District warehouse had three roofers tell us we needed a full tear-off. S&P Construction's infrared survey proved otherwise, recovered the dry sections, and saved us almost $200k. Two summers in, not a single leak callback.",
        name: "Priya Nair",
        businessType: "Industrial Property Manager",
      },
    ],
    recentProjects: [
      {
        title: "120,000 Sq Ft PVC Replacement — Warehouse District",
        buildingType: "Cold Storage / Food Distribution Warehouse",
        sqFt: 120000,
        system: "60-mil Sika Sarnafil PVC",
        image: "/images/projects/dallas-pvc-warehouse.webp",
        completed: "July 2025",
      },
      {
        title: "Standing Seam Metal Reroof — Preston Medical Plaza",
        buildingType: "Multi-Tenant Medical Office",
        sqFt: 34000,
        system: "24-Gauge Standing Seam Metal",
        image: "/images/projects/dallas-metal-medical.webp",
        completed: "February 2026",
      },
    ],
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    county: "Tarrant County",
    seoTitle: "Commercial Roofing Fort Worth TX | TPO & Flat Roof Specialists",
    seoDescription:
      "Fort Worth commercial roofing contractor. Flat roof, TPO, and PVC installation, repair, and storm response across Tarrant County — Alliance, Stockyards, downtown, and West 7th.",
    intro:
      "Tarrant County's industrial backbone — from AllianceTexas to the rail yards and Stockyards district — keeps our Fort Worth crews busy year-round. We re-roof, retrofit, and maintain low-slope systems on warehouses, manufacturing plants, and historic commercial buildings.",
    landmarks: [
      "AllianceTexas industrial corridor",
      "Fort Worth Stockyards",
      "Cultural District museums",
      "Sundance Square buildings",
    ],
    industries: [
      "Aerospace and defense manufacturing",
      "Rail and logistics at Alliance",
      "Energy services and oilfield support",
      "Hospitality and tourism downtown",
    ],
    neighborhoods: [
      "Downtown / Sundance Square",
      "Near Southside",
      "West 7th",
      "Alliance",
      "TCU / West Side",
      "East Fort Worth",
    ],
    weatherNote:
      "Fort Worth sits squarely in hail alley. We build roof assemblies with high-density cover boards, reinforced membranes, and properly fastened perimeter details to ride out the spring hail and straight-line winds the metroplex throws at every commercial building.",
    heroImage: {
      base: "/images/cities/fort-worth",
      alt: "Fort Worth, Texas downtown commercial district skyline",
    },
    testimonials: [
      {
        quote:
          "Three other roofers told us we'd have to shut down our 24/7 logistics floor for a metal roof replacement. S&P Construction roll-formed 85,000 sq ft of standing seam on site and never paused a shift. The 25-year weathertight warranty was the easy part — the operational discipline was the impressive part.",
        name: "Sarah Jiménez",
        businessType: "Logistics Operations Director",
      },
      {
        quote:
          "Our Stockyards-area restaurant has a 90-year-old parapet wall that every contractor was afraid to touch. S&P Construction detailed the flashings, tied in a new TPO field, and made it watertight without changing the historic look. Outstanding craftsmanship.",
        name: "Bradley Houston",
        businessType: "Hospitality Owner",
      },
      {
        quote:
          "The Alliance facility re-roof was scoped, bid, and finished while we were still getting quotes from two national contractors. Daily safety briefings, clean staging, and no FOD issues anywhere near our hangars.",
        name: "Dana Whitmore",
        businessType: "Aerospace Facilities Manager",
      },
    ],
    recentProjects: [
      {
        title: "85,000 Sq Ft Standing Seam Metal — Alliance Distribution",
        buildingType: "Distribution Warehouse",
        sqFt: 85000,
        system: "24-Gauge Standing Seam Metal",
        image: "/images/projects/fortworth-metal-alliance.webp",
        completed: "November 2025",
      },
      {
        title: "Historic Stockyards TPO Recover & Flashing Restoration",
        buildingType: "Restaurant & Retail Building",
        sqFt: 9500,
        system: "60-mil GAF EverGuard TPO",
        image: "/images/projects/fortworth-tpo-stockyards.webp",
        completed: "September 2025",
      },
    ],
  },
  {
    slug: "frisco",
    name: "Frisco",
    county: "Collin & Denton Counties",
    seoTitle: "Commercial Roofing Frisco TX | TPO, PVC & Flat Roof Contractor",
    seoDescription:
      "Frisco commercial roofing contractor specializing in TPO, PVC, and flat roof systems for retail, office, and mixed-use developments along the Dallas North Tollway and 121 corridor.",
    intro:
      "Frisco's explosive growth along the Dallas North Tollway and Sam Rayburn means thousands of new retail centers, corporate HQs, and mixed-use roofs need expert care. We install and service single-ply systems sized for everything from a single-tenant pad site to a 200,000 sq ft anchor.",
    landmarks: [
      "The Star (Cowboys HQ)",
      "Stonebriar Centre",
      "Frisco Square",
      "PGA Frisco / Fields development",
    ],
    industries: [
      "Corporate headquarters and Class A office",
      "Big-box and lifestyle retail",
      "Healthcare and medical office",
      "Mixed-use and hospitality",
    ],
    neighborhoods: [
      "Frisco Square",
      "Stonebriar",
      "Phillips Creek Ranch",
      "Starwood",
      "Fields / PGA",
      "Hollyhock",
    ],
    weatherNote:
      "Collin County hailstorms regularly produce baseball-sized stones. Frisco property owners benefit from our hail-rated TPO and PVC assemblies, plus thorough post-storm inspections with documentation built for insurance claims.",
    heroImage: {
      base: "/images/cities/frisco",
      alt: "Modern commercial development in Frisco, Texas",
    },
    testimonials: [
      {
        quote:
          "After the spring hail event in Frisco, S&P Construction was on site within hours. They phased a full 40,000 sq ft TPO replacement across eight occupied storefronts without ever closing a tenant, and dealt directly with our insurance adjuster. Utterly professional.",
        name: "Marcus Thompson",
        businessType: "Retail Center Property Manager",
      },
      {
        quote:
          "We brought S&P Construction in for a second opinion on a leaking new-construction roof at one of our Fields-area pad sites. They isolated the issue to an improperly detailed scupper in under 30 minutes and had it permanently sealed the same week.",
        name: "Anika Patel",
        businessType: "Mixed-Use Developer",
      },
      {
        quote:
          "Our corporate HQ near the Tollway had a 60,000 sq ft TPO replacement that absolutely could not interrupt office hours. They worked nights, posted daily progress photos, and we never received a single tenant complaint.",
        name: "Greg Halverson",
        businessType: "Corporate Facilities Manager",
      },
    ],
    recentProjects: [
      {
        title: "40,000 Sq Ft TPO Replacement — Eldorado Crossing",
        buildingType: "Multi-Tenant Retail Center",
        sqFt: 40000,
        system: "60-mil Carlisle TPO",
        image: "/images/projects/frisco-tpo-retail.webp",
        completed: "March 2026",
      },
      {
        title: "Class-A Office HQ Night Phasing TPO Reroof",
        buildingType: "Corporate Office Headquarters",
        sqFt: 60000,
        system: "60-mil GAF EverGuard TPO",
        image: "/images/projects/frisco-tpo-office.webp",
        completed: "December 2025",
      },
    ],
  },
  {
    slug: "plano",
    name: "Plano",
    county: "Collin County",
    seoTitle: "Commercial Roofing Plano TX | TPO & PVC Flat Roof Contractor",
    seoDescription:
      "Plano commercial roofing specialists. TPO and PVC flat roof installation, repair, and emergency leak response for Legacy West, Granite Park, and Plano corporate campuses.",
    intro:
      "Plano's Legacy West and Granite Park corporate campuses, Shops at Legacy, and the medical buildings along Coit and Independence all live or die by their flat roofs. We keep them watertight, energy-efficient, and warranty-backed.",
    landmarks: [
      "Legacy West",
      "Granite Park",
      "Shops at Legacy",
      "The Boardwalk at Granite Park",
    ],
    industries: [
      "Corporate HQs (Toyota, Liberty Mutual, JPMorgan Chase region)",
      "Class A office and flex space",
      "Healthcare and medical office",
      "Upscale retail and dining",
    ],
    neighborhoods: [
      "Legacy / West Plano",
      "Downtown Plano",
      "Willow Bend",
      "Preston Meadow",
      "Russell Creek",
      "East Plano",
    ],
    weatherNote:
      "Plano's corporate roofs face the same hail and heat cycles as the rest of Collin County, but with tenants who can't afford downtime. We schedule re-roofs in phases, work nights and weekends, and use low-odor adhesives so occupied buildings keep running.",
    heroImage: {
      base: "/images/cities/plano",
      alt: "Legacy West corporate campus in Plano, Texas",
    },
    testimonials: [
      {
        quote:
          "Golf-ball hail in April put 400+ punctures through our built-up roof across three office buildings. S&P Construction tarped within four hours, documented the entire scope for our carrier, and got us a 100% replacement-cost approval. We're back to watertight with a 15-year GAF warranty.",
        name: "Rachel Okafor",
        businessType: "Class-A Office Property Manager",
      },
      {
        quote:
          "Our Legacy West tenants include three of the most demanding F500 names in the metroplex. S&P Construction phased a 90,000 sq ft TPO reroof over six weekends, low-odor adhesives only, and we never got a single elevated indoor air-quality complaint.",
        name: "Christopher Dalton",
        businessType: "Corporate Campus Asset Manager",
      },
      {
        quote:
          "I've used four roofers across our medical portfolio. S&P Construction is the only one that consistently shows up on time, sends written daily updates, and bills exactly what they quoted. They handle our Plano and Frisco medical buildings now.",
        name: "Yolanda Briggs",
        businessType: "Medical Real Estate Director",
      },
    ],
    recentProjects: [
      {
        title: "Hail Storm Restoration — Preston Ridge Office Campus",
        buildingType: "Class-A Office Campus (3 buildings)",
        sqFt: 62000,
        system: "GAF Modified Bitumen",
        image: "/images/projects/plano-storm-office.webp",
        completed: "August 2025",
      },
      {
        title: "Legacy West Weekend-Phased TPO Reroof",
        buildingType: "Multi-Tenant Corporate Office",
        sqFt: 90000,
        system: "60-mil Carlisle TPO",
        image: "/images/projects/plano-tpo-legacy.webp",
        completed: "January 2026",
      },
    ],
  },
  {
    slug: "mckinney",
    name: "McKinney",
    county: "Collin County",
    seoTitle: "Commercial Roofing McKinney TX | TPO & Flat Roof Contractor",
    seoDescription:
      "McKinney commercial roofing contractor. Flat roof, TPO, and PVC installation, repair, and 24/7 storm response for historic downtown, Craig Ranch, and Highway 380 corridor.",
    intro:
      "McKinney's historic downtown, the Craig Ranch corporate campuses, and the booming retail along US-380 all rely on durable low-slope roofing. We deliver tear-offs, recovers, and routine maintenance with the documentation building owners and property managers need.",
    landmarks: [
      "Historic Downtown McKinney",
      "Craig Ranch",
      "TPC Craig Ranch",
      "McKinney National Airport",
    ],
    industries: [
      "Light manufacturing and aviation",
      "Medical and dental campuses",
      "Boutique retail and restaurants",
      "Multi-tenant office",
    ],
    neighborhoods: [
      "Historic Downtown",
      "Craig Ranch",
      "Stonebridge Ranch",
      "Adriatica Village",
      "Tucker Hill",
      "East McKinney",
    ],
    weatherNote:
      "McKinney's mix of historic brick buildings and modern flex space demands two very different roofing playbooks — and we run both. From flashing repairs on 100-year-old parapets to full TPO systems on new construction, we match the assembly to the building.",
    heroImage: {
      base: "/images/cities/mckinney",
      alt: "Historic downtown commercial buildings in McKinney, Texas",
    },
    testimonials: [
      {
        quote:
          "Active operating rooms below an aging built-up roof is every facility manager's nightmare. They recovered the existing BUR with GAF TPO at night and on weekends, saved us roughly $180k versus a full tear-off, and didn't disrupt a single surgery.",
        name: "Linda Patel",
        businessType: "Medical Group Facilities Director",
      },
      {
        quote:
          "Our 1920s downtown building had been patched a dozen times. S&P Construction pulled it back to deck, rebuilt the parapets properly, and detailed every penetration. Two storms later it's still bone dry — first time in fifteen years.",
        name: "Walter Kemp",
        businessType: "Historic Building Owner",
      },
      {
        quote:
          "Hangar roofs at McKinney National can't have a single fastener loose. Their crew was meticulous about FOD, finished a week early, and the post-job clean was honestly cleaner than how they found it.",
        name: "Erika Sandoval",
        businessType: "Aviation Hangar Operator",
      },
    ],
    recentProjects: [
      {
        title: "28,000 Sq Ft TPO Recover — Stonebridge Medical Office",
        buildingType: "Medical Office Building",
        sqFt: 28000,
        system: "60-mil GAF EverGuard TPO",
        image: "/images/projects/mckinney-tpo-medical.webp",
        completed: "May 2025",
      },
      {
        title: "Historic Downtown Tear-Off & Parapet Rebuild",
        buildingType: "Mixed-Use Historic Storefront",
        sqFt: 7200,
        system: "Modified Bitumen + Custom Flashing",
        image: "/images/projects/mckinney-historic-parapet.webp",
        completed: "October 2025",
      },
    ],
  },
  {
    slug: "arlington",
    name: "Arlington",
    county: "Tarrant County",
    seoTitle: "Commercial Roofing Arlington TX | TPO & Flat Roof Specialists",
    seoDescription:
      "Arlington commercial roofing contractor. TPO, PVC, and flat roof installation, repair, and storm damage response for the Entertainment District, GM plant area, and Great Southwest Industrial District.",
    intro:
      "Between the Entertainment District, the GM Assembly plant, and the massive Great Southwest Industrial District straddling Arlington and Grand Prairie, we cover one of the densest commercial roof footprints in the metroplex.",
    landmarks: [
      "AT&T Stadium",
      "Globe Life Field",
      "Six Flags Over Texas",
      "UT Arlington campus",
    ],
    industries: [
      "Automotive manufacturing (GM Assembly)",
      "Logistics & distribution (Great Southwest)",
      "Entertainment, hospitality, and stadium-area retail",
      "Higher education and research",
    ],
    neighborhoods: [
      "Entertainment District",
      "Downtown Arlington",
      "Great Southwest",
      "Pantego-adjacent",
      "South Arlington",
      "Dalworthington Gardens area",
    ],
    weatherNote:
      "Arlington's industrial roofs are big — often a half-million square feet or more — which means small leaks turn into massive interior damage fast. Our drone surveys and infrared scans catch wet insulation before the next storm turns it into a tenant call.",
    heroImage: {
      base: "/images/cities/arlington",
      alt: "Commercial buildings in Arlington, Texas",
    },
    testimonials: [
      {
        quote:
          "Nine weeks from last bell to teacher in-service, plus an asbestos abatement before we could even start. S&P Construction finished four days early, on budget, and our gymnasium and cafeteria opened on time with a 20-year manufacturer warranty.",
        name: "James Whitfield",
        businessType: "School District Operations Director",
      },
      {
        quote:
          "Our Great Southwest distribution roof was leaking in 40+ spots after a spring storm. Their infrared survey mapped every wet area in a single afternoon, and they replaced only the saturated sections. Saved us six figures versus a full reroof.",
        name: "Dwayne McAllister",
        businessType: "Industrial Distribution Manager",
      },
      {
        quote:
          "We manage hospitality near the Entertainment District — game days mean we can't have crews on the roof. S&P Construction built a phased schedule around the home calendar and finished a 55,000 sq ft PVC install without a single conflict.",
        name: "Tatiana Brooks",
        businessType: "Hotel General Manager",
      },
    ],
    recentProjects: [
      {
        title: "55,000 Sq Ft PVC Replacement — South Campus K-8",
        buildingType: "School Campus (Gym, Cafeteria, Classrooms)",
        sqFt: 55000,
        system: "50-mil Johns Manville PVC",
        image: "/images/projects/arlington-pvc-school.webp",
        completed: "August 2024",
      },
      {
        title: "Great Southwest Storm Repair & Insulation Replacement",
        buildingType: "Distribution Warehouse",
        sqFt: 220000,
        system: "TPO Spot Repairs + Insulation Swap",
        image: "/images/projects/arlington-storm-warehouse.webp",
        completed: "June 2025",
      },
    ],
  },
];

export const cityBySlug = Object.fromEntries(cities.map((c) => [c.slug, c]));
