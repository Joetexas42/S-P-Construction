export interface ServiceCityFAQ {
  question: string;
  answer: string;
}

export interface ServiceCityEntry {
  citySlug: string;
  serviceSlug: string;
  intro: string;
  localDistricts: string[];
  buildingContext: string;
  weatherUrgency: string;
  faqs: ServiceCityFAQ[];
}

export const SERVICE_CITY_SLUGS = [
  "repair",
  "replacement",
  "tpo-epdm-pvc",
  "emergency-leak-repair",
  "maintenance",
  "coatings-restoration",
  "flat-roofing",
  "metal-roofing",
] as const;

export type ServiceCityServiceSlug = (typeof SERVICE_CITY_SLUGS)[number];

export const CITY_SLUGS = [
  "dallas",
  "fort-worth",
  "frisco",
  "plano",
  "mckinney",
  "arlington",
] as const;

export type ServiceCityCitySlug = (typeof CITY_SLUGS)[number];

export const serviceCityData: ServiceCityEntry[] = [
  {
    citySlug: "dallas",
    serviceSlug: "repair",
    intro:
      "From cracked flashing on a Deep Ellum mixed-use building to a failed seam on a Stemmons Corridor warehouse, our Dallas commercial roof repair crews diagnose and fix the actual leak source — not just the water stain on the ceiling. We serve every Dallas submarket, from the Medical District to Pleasant Grove, with 24/7 dispatch and root-cause repairs that stick.",
    localDistricts: [
      "Design District warehouses & showrooms",
      "Stemmons Corridor logistics & distribution",
      "Medical District hospital & MOB campuses",
    ],
    buildingContext:
      "Dallas roofs span a huge range: cold-storage distribution centers along I-30 and I-20, high-bay warehouses in the Design District, multi-tenant medical office buildings near Parkland, and retail strip centers across Oak Cliff and Lake Highlands. Each building type demands a different repair approach — we match the fix to the assembly, not the other way around.",
    weatherUrgency:
      "Dallas County averages more than 50 hail days per year. Spring supercells regularly produce golf-ball and baseball-sized stones that fracture TPO membranes and bruise insulation. Fast repair response after a storm event is the difference between a $2,000 fix and a $200,000 interior damage claim.",
    faqs: [
      {
        question: "How quickly can you respond to a commercial roof leak in Dallas?",
        answer:
          "We dispatch within hours anywhere in Dallas County — including the CBD, Deep Ellum, Oak Cliff, and the Design District. Emergency crews are available 24/7, including weekends and holidays.",
      },
      {
        question: "My Dallas warehouse has had the same leak repaired three times. Why does it keep coming back?",
        answer:
          "Recurring leaks mean the root cause was never properly diagnosed. Water travels across flat roofs, sometimes 50+ feet, before showing up inside. We use thermal imaging to trace moisture back to the actual entry point — failed flashing, split seam, or clogged drain — and fix that, not the stain.",
      },
      {
        question: "Will a repair affect my Firestone or Duro-Last warranty on my Dallas property?",
        answer:
          "Not if it's done by an authorized contractor. We're authorized for Firestone (Elevate), Mule-Hide, and Duro-Last, so every repair uses approved materials and methods that keep your warranty fully intact.",
      },
    ],
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "repair",
    intro:
      "Fort Worth's commercial roof inventory is one of the most varied in the Metroplex — 90-year-old Stockyards-district parapets, massive AllianceTexas logistics buildings, aerospace manufacturing facilities, and downtown hospitality buildings all need very different repair approaches. Our Fort Worth crews carry the materials and expertise to get the right fix done the first time.",
    localDistricts: [
      "AllianceTexas logistics & manufacturing corridor",
      "Fort Worth Stockyards historic commercial district",
      "Sundance Square & downtown Fort Worth office buildings",
    ],
    buildingContext:
      "Tarrant County commercial roofs skew heavily industrial — aerospace hangars near Alliance, rail yard warehouses, energy-sector fabrication shops, and large logistics facilities. Older Sundance Square and Stockyards buildings have historic parapet walls and modified bitumen assemblies that require specialized detailing. Both ends of the spectrum are in our wheelhouse.",
    weatherUrgency:
      "Fort Worth sits squarely in Tornado Alley's hail corridor. Straight-line winds from spring derechos regularly exceed 70 mph, lifting perimeter flashings and splitting seams on even well-installed systems. A repair completed within days of a storm event prevents the next rain from compounding interior damage.",
    faqs: [
      {
        question: "Can you repair the roof on a 24/7 logistics facility in Alliance without shutting us down?",
        answer:
          "Yes. We phase repair work around operational requirements and follow strict FOD (foreign object debris) protocols for industrial and aerospace-adjacent facilities. Emergency tarping goes up immediately; permanent repairs are scheduled around your operations.",
      },
      {
        question: "Our historic Stockyards building has an unusual parapet assembly. Do you work on older roofs?",
        answer:
          "Regularly. Modified bitumen, built-up, and older single-ply assemblies on historic Fort Worth buildings are part of our routine work. We match repair materials and methods to what's already there so the assembly stays consistent.",
      },
    ],
  },
  {
    citySlug: "frisco",
    serviceSlug: "repair",
    intro:
      "Frisco's explosive growth along the Dallas North Tollway and Sam Rayburn Tollway means thousands of roofs that are 10–15 years old and hitting their first major repair cycle. From Preston Road retail strips to corporate campuses near The Star and PGA Frisco, our repair crews understand what goes wrong on the single-ply systems installed during the city's build-out boom.",
    localDistricts: [
      "Dallas North Tollway corporate & retail corridor",
      "Preston Road commercial strip centers",
      "Frisco ISD campus & sports venue district",
    ],
    buildingContext:
      "Frisco skews toward newer construction — Class A office, lifestyle retail centers, sports and entertainment facilities, and mixed-use developments. Even 'new' roofs in the 8–15 year range need attention: seam welds can fatigue, penetration flashings work loose, and drains clog in the debris storms that sweep through Collin County each spring.",
    weatherUrgency:
      "Collin County hailstorms regularly produce baseball-sized stones. The spring 2023 and 2024 events both produced widespread membrane damage across the Frisco retail corridor. Prompt documented repair is critical for insurance claim approval and for protecting manufacturer warranties from lapsing on unresolved damage.",
    faqs: [
      {
        question: "Can you repair my Frisco retail center roof without closing any storefronts?",
        answer:
          "Absolutely. We phase repair work section by section and sequence around tenant hours. Emergency tarping goes up immediately so no interior damage compounds while repairs are scheduled.",
      },
      {
        question: "My Frisco corporate campus has a manufacturer warranty. Can you repair it without voiding coverage?",
        answer:
          "Yes, as long as repairs are performed by an authorized contractor using approved materials. We're authorized for Firestone (Elevate), Mule-Hide, and Duro-Last, and we document every repair for your warranty file.",
      },
    ],
  },
  {
    citySlug: "plano",
    serviceSlug: "repair",
    intro:
      "Plano's Legacy West, Granite Park, and Preston Ridge office campuses manage some of the most demanding tenants in the Metroplex — Fortune 500 headquarters that absolutely cannot tolerate interior water events. Our Plano commercial roof repair crews respond fast, diagnose accurately, and document every repair for both warranty files and insurance carriers.",
    localDistricts: [
      "Legacy West & Granite Park corporate campuses",
      "Preston Road & Independence medical office corridor",
      "Shops at Legacy & upscale mixed-use retail",
    ],
    buildingContext:
      "Plano's commercial roof mix is dominated by Class A office, medical office buildings with sensitive HVAC and clean-room requirements, upscale retail centers, and mid-rise corporate towers. Tenants include Toyota, JPMorgan Chase, Liberty Mutual, and hundreds of regional headquarters — all requiring proactive repair response and meticulous documentation.",
    weatherUrgency:
      "Collin County averages more hail events per year than nearly any county in Texas. Golf-ball hail in April 2025 put hundreds of punctures through multiple Plano office buildings in a single afternoon. Post-storm response speed determines whether the damage stops at the membrane or reaches tenant floors.",
    faqs: [
      {
        question: "How fast can you respond to a leak at a Plano office building after hours?",
        answer:
          "We dispatch 24/7 — our crews serve Legacy West and the entire Plano office corridor, typically arriving within hours of a call. We tarp and mitigate immediately so interior damage doesn't compound overnight.",
      },
      {
        question: "Our Plano office building has multiple tenants including a major financial firm. How do you handle access and discretion?",
        answer:
          "We work with your property management team on access protocols, crew credentialing, and scheduling around tenant operations. All work areas are cordoned and cleaned daily.",
      },
    ],
  },
  {
    citySlug: "mckinney",
    serviceSlug: "repair",
    intro:
      "McKinney's commercial landscape ranges from century-old brick storefronts on the historic downtown square to modern flex-industrial buildings along US-380 and Craig Ranch medical offices that demand minimal operational disruption. Our repair crews are comfortable working on both — and we bring the right materials for each building type.",
    localDistricts: [
      "Historic Downtown McKinney square & adjacent commercial",
      "Craig Ranch medical & corporate campus",
      "US-380 commercial and retail corridor",
    ],
    buildingContext:
      "McKinney's commercial roof stock is genuinely mixed: 1900s–1930s masonry commercial buildings with historic parapet walls, 1990s flex-industrial in the US-75 corridor, and brand-new corporate office and medical buildings in Craig Ranch. No two repairs look the same, and we carry materials and expertise for every assembly.",
    weatherUrgency:
      "McKinney and northern Collin County sit at the leading edge of DFW's hail corridor. The city's historic buildings are especially vulnerable — aged modified bitumen and built-up assemblies don't absorb hail impact as well as modern single-ply, and parapet flashings fail faster after freeze-thaw cycles.",
    faqs: [
      {
        question: "Can you repair the roof on our 1920s McKinney downtown building?",
        answer:
          "Yes — we work on historic assemblies regularly. We match repair materials to the existing system (modified bitumen, built-up, or hybrid) and detail the flashings correctly for the historic parapet wall so the repair doesn't change the building's character.",
      },
      {
        question: "We have operating rooms below our medical office roof in McKinney. How do you handle sensitive occupancy repairs?",
        answer:
          "We schedule around your procedure calendar, use low-VOC materials, and never open the deck during business hours. Emergency tarping happens immediately; the permanent repair is planned for a window that doesn't disrupt patient care.",
      },
    ],
  },
  {
    citySlug: "arlington",
    serviceSlug: "repair",
    intro:
      "Arlington's commercial roof stock includes some of the largest industrial footprints in the Metroplex — Great Southwest distribution centers, the GM Assembly plant supply chain, and stadium-adjacent entertainment buildings near AT&T Stadium and Globe Life Field. Small leaks on big roofs cost big money fast. We dispatch quickly, scan with drones and infrared to map every problem area, and repair what actually needs repairing.",
    localDistricts: [
      "Great Southwest Industrial District",
      "Entertainment District near AT&T Stadium & Globe Life Field",
      "UT Arlington campus and medical office corridor",
    ],
    buildingContext:
      "Arlington's industrial roofs are enormous — distribution centers exceeding 500,000 sq ft are common in the Great Southwest district. On buildings this size, thermal imaging is the only way to find wet insulation before the next storm turns it into a full-section loss. We combine drone surveys and infrared scans with targeted repair scopes so you fix only what needs it.",
    weatherUrgency:
      "Arlington sits on the Tarrant/Dallas county line, exposed to both the western and eastern tracks of DFW's spring storm systems. Game-day scheduling at AT&T Stadium and Globe Life Field creates additional repair-timing complexity — we build repair schedules around the home calendar so crews aren't working game days.",
    faqs: [
      {
        question: "Our Great Southwest warehouse has over 300,000 sq ft of roof. How do you identify what actually needs to be repaired?",
        answer:
          "Drone aerial imagery combined with infrared thermal scanning — done in the evening after the roof has had a chance to cool — reveals every pocket of wet insulation. We map the problem areas, give you a prioritized repair scope, and fix only what's compromised.",
      },
      {
        question: "We manage hospitality near AT&T Stadium. Can repairs be scheduled around game days?",
        answer:
          "Absolutely. We check the Cowboys and Rangers home schedule at the start of every project and build the work plan around it. No crews during game days, and we never leave open roof sections the night before an event.",
      },
    ],
  },

  {
    citySlug: "dallas",
    serviceSlug: "replacement",
    intro:
      "A full Dallas commercial roof replacement is a six- or seven-figure capital decision. From high-bay warehouses in the Design District to multi-building medical campuses near Parkland, we engineer replacements that match the building's actual use, traffic, and drainage conditions — then deliver them on schedule with full manufacturer NDL warranties.",
    localDistricts: [
      "Design District warehouse & showroom buildings",
      "Medical District hospital systems & MOB campuses",
      "I-30 / I-20 logistics & distribution parks",
    ],
    buildingContext:
      "Dallas replacements run the gamut from 10,000 sq ft neighborhood retail pad sites to 400,000 sq ft cold-storage distribution centers in the southern logistics corridor. Each requires a different attachment method, insulation R-value target, and drainage strategy. We core the existing assembly, assess substrate moisture, and engineer the replacement from the deck up.",
    weatherUrgency:
      "Dallas County roofs absorb some of the most punishing UV and hail exposure in Texas. An end-of-life roof that's already seen multiple failed repairs is a liability every storm season. A properly engineered replacement eliminates that exposure and can meaningfully reduce insurance premiums for property carriers that recognize Class 4 impact-rated assemblies.",
    faqs: [
      {
        question: "How long does a commercial roof replacement take in Dallas?",
        answer:
          "A 30,000–60,000 sq ft single-ply project typically runs 3–5 weeks in DFW weather conditions, including tear-off, deck inspection, insulation, membrane, and flashings. We build weather buffers into the schedule and follow daily dry-in protocols so an overnight storm never floods an open deck.",
      },
      {
        question: "Can you replace the roof on an occupied Dallas office building without shutting down tenants?",
        answer:
          "Yes. We phase replacements section by section, working nights and weekends where tenant operations require it, using low-odor adhesives and daily dry-in to keep every section watertight through the project.",
      },
      {
        question: "What manufacturer warranties are available on a Dallas commercial roof replacement?",
        answer:
          "We offer manufacturer NDL (No Dollar Limit) warranties of 15, 20, 25, or 30 years from Firestone (Elevate), Mule-Hide, and Duro-Last depending on the system and substrate. We also provide a separate labor warranty.",
      },
    ],
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "replacement",
    intro:
      "Fort Worth's industrial and logistics buildings demand tear-offs done right — full deck inspection, fastener replacement where pull-out is compromised, and a new assembly engineered for the building's actual wind uplift exposure. From AllianceTexas warehouses to historic Sundance Square buildings, we've replaced roofs across every Fort Worth submarket without shutting down a single operation.",
    localDistricts: [
      "AllianceTexas industrial & logistics corridor",
      "Near Southside manufacturing & mixed-use",
      "Downtown Fort Worth / Sundance Square commercial buildings",
    ],
    buildingContext:
      "Fort Worth's replacement market is driven by its heavy industrial base — aerospace hangars, logistics facilities, manufacturing plants, and rail-adjacent warehouses that have been in service for 20–40 years and are hitting end-of-life on original assemblies. These buildings need full tear-offs with deck repair; recover is rarely the right call when the substrate has absorbed decades of Tarrant County weather.",
    weatherUrgency:
      "Tarrant County sees some of the highest straight-line wind events in North Texas. Perimeter fastener pull-out is the failure mode we see most on aging Fort Worth industrial roofs — especially buildings with original base-sheet attachment from the 1980s and 1990s. A replacement is the moment to bring attachment up to current code uplift requirements.",
    faqs: [
      {
        question: "Can you replace the roof on our Fort Worth distribution center while our logistics floor stays operational?",
        answer:
          "Yes. We phase tear-offs section by section with daily dry-in. Our Fort Worth industrial crews have completed replacements on occupied 24/7 facilities — including Alliance-area logistics buildings — without pausing a shift.",
      },
      {
        question: "Our Fort Worth building has an older assembly with asbestos-containing materials. Do you handle abatement coordination?",
        answer:
          "We work with licensed abatement contractors and sequence our tear-off around their completion. We can recommend abatement partners we've worked with successfully across Tarrant County if you need a referral.",
      },
    ],
  },
  {
    citySlug: "frisco",
    serviceSlug: "replacement",
    intro:
      "Frisco's first wave of commercial construction — retail centers, office parks, and mixed-use buildings built in the early 2000s along the Tollway and US-121 — is now 20+ years old and reaching end of serviceable life. We specialize in full replacements for Frisco's Class A commercial inventory, delivering minimal tenant disruption and manufacturer NDL warranties that protect the asset for the next ownership cycle.",
    localDistricts: [
      "Dallas North Tollway Class A office corridor",
      "Sam Rayburn Tollway (SRT / 121) retail & mixed-use",
      "Frisco Square & downtown Frisco civic and retail buildings",
    ],
    buildingContext:
      "Frisco replacements are predominantly retail centers and Class A office buildings from the 2000–2010 build-out era — single-ply systems that have cycled through their original warranty terms and are seeing widespread seam and flashing failure. These buildings typically have many rooftop penetrations for HVAC equipment, and a replacement is the right moment to re-flash every curb and drain properly.",
    weatherUrgency:
      "Collin County hail events have accelerated the end-of-life clock on many Frisco commercial roofs. Post-storm insurance settlements often cover a full replacement where deferred maintenance would have required a cash capital project. We document damage thoroughly and work with your carrier to maximize approved scope.",
    faqs: [
      {
        question: "Our Frisco retail center has multiple tenants open during business hours. How do you handle replacement phasing?",
        answer:
          "We map the roof into sections, replace one section at a time, and seal each section watertight before moving to the next. No tenant is ever under an open deck, and emergency dry-in protocols are followed daily.",
      },
      {
        question: "Will a full replacement in Frisco affect my insurance premiums?",
        answer:
          "A Class 4 impact-rated assembly — which we specify as the default on Frisco replacements given Collin County's hail frequency — can qualify for meaningful property insurance discounts with most Texas commercial carriers. We can provide the impact rating documentation your agent needs.",
      },
    ],
  },
  {
    citySlug: "plano",
    serviceSlug: "replacement",
    intro:
      "Plano's Legacy West and Granite Park corporate campuses set the bar for tenant expectations in the DFW office market. A full roof replacement on these assets has to be executed with zero interior events, minimal disruption to Class A tenants, and a manufacturer warranty that stands up to institutional investors and property auditors. That's exactly what we deliver.",
    localDistricts: [
      "Legacy West & Granite Park Class A office towers",
      "Plano's corporate campus corridor along US-75",
      "Medical & MOB buildings along Coit and Independence",
    ],
    buildingContext:
      "Plano replacement projects are dominated by Class A multi-tenant office buildings with demanding tenants and institutional ownership. Low-odor adhesives, night and weekend phasing, daily air-quality monitoring, and meticulous staging logistics are standard operating procedure — not special requests. We've completed replacements on buildings with Fortune 500 tenants without a single air-quality complaint.",
    weatherUrgency:
      "Collin County hail cycles have put Plano's office roof inventory on an accelerated replacement clock. A well-timed replacement before a major storm event — proactively, rather than reactively — is the most cost-effective capital play. We help property teams make the case to ownership with inspection reports, lifecycle cost models, and insurance premium impact estimates.",
    faqs: [
      {
        question: "How do you handle a roof replacement at a Plano office building with sensitive corporate tenants?",
        answer:
          "Nights and weekends only for tear-off above occupied floors, low-odor adhesives throughout, daily staging cleanup, and written progress reports. We've replaced roofs above Toyota, JPMorgan, and similar corporate tenants without a complaint.",
      },
      {
        question: "What's the typical cost of a full roof replacement in Plano?",
        answer:
          "Single-ply replacements in Plano run $7–$14 per sq ft installed depending on system, substrate condition, and complexity. We provide transparent line-item quotes with no contingency padding — the quote we give is what you pay.",
      },
    ],
  },
  {
    citySlug: "mckinney",
    serviceSlug: "replacement",
    intro:
      "McKinney is growing fast — new medical office and corporate buildings in Craig Ranch, older flex-industrial in the US-75 corridor, and historic downtown commercial buildings that need specialist care at tear-off. We've replaced roofs on all three building types across McKinney and northern Collin County, with the documentation and warranty coverage that property owners need.",
    localDistricts: [
      "Craig Ranch medical & corporate campus",
      "US-75 flex-industrial & office corridor",
      "Historic Downtown McKinney commercial buildings",
    ],
    buildingContext:
      "McKinney replacements split between new-construction medical and corporate buildings in Craig Ranch that need premium single-ply assemblies, and older flex-industrial or historic properties in the US-75 and downtown corridors where full tear-off to the deck is required to address decades of compromised substrate. We assess what's actually needed before recommending recover vs. full tear-off.",
    weatherUrgency:
      "Northern Collin County averages more hail events than the southern DFW metro — McKinney properties see baseball-sized hail in some years. An end-of-life roof that's been patched multiple times is a major liability heading into each spring storm season. A full replacement with an impact-rated assembly eliminates that exposure.",
    faqs: [
      {
        question: "We have an active aviation facility near McKinney National. Do you have experience with hangar roof replacements?",
        answer:
          "Yes. Hangar replacements require strict FOD discipline and often involve working around aircraft movements. We run daily tool and fastener counts, stage materials away from flight paths, and coordinate access with your operations team.",
      },
      {
        question: "Our McKinney historic building is on the local landmark register. Can you replace the roof without affecting its designation?",
        answer:
          "We work within historic preservation guidelines on the parapet detailing and visible flashing elements. The structural deck and membrane beneath are replaced to current standards, while the visible character-defining elements match historic materials and profiles.",
      },
    ],
  },
  {
    citySlug: "arlington",
    serviceSlug: "replacement",
    intro:
      "Arlington's replacement market is driven by its massive industrial base — Great Southwest distribution centers, manufacturing facilities, school campuses, and stadium-adjacent hospitality buildings. Large-format replacements require systematic phasing, precision logistics, and daily dry-in discipline. We've completed replacements on Arlington buildings exceeding 200,000 sq ft without pausing a single operation.",
    localDistricts: [
      "Great Southwest Industrial District distribution & manufacturing",
      "Entertainment District hospitality & retail near stadiums",
      "UT Arlington & school district campuses",
    ],
    buildingContext:
      "Arlington's industrial and educational roofs are among the largest replacement projects in the Metroplex. A 220,000 sq ft Great Southwest distribution center or a multi-building school campus requires a fundamentally different project management approach than a retail strip center. Phase planning, sequenced tear-off, and daily dry-in are what protect operations and interior assets through a major replacement.",
    weatherUrgency:
      "Arlington sits on the storm track between DFW's two most active hail regions. Industrial buildings here tend to stay in service well past their roof's optimal replacement window — and large flat roofs accumulate interior damage fast once seam failures start spreading. Proactive replacement before the next storm season is always the better economic decision.",
    faqs: [
      {
        question: "We need to replace 400,000 sq ft of roof on an Arlington distribution center. Can you handle that scale?",
        answer:
          "Yes. Large-scale industrial replacements are a core part of our work in Arlington and the Great Southwest district. We have the crew capacity, material logistics, and project management infrastructure to complete phased replacements on buildings of any size.",
      },
      {
        question: "Our Arlington school campus needs a summer replacement with a fixed back-to-school deadline. Can you guarantee that timeline?",
        answer:
          "We've met school district summer deadlines on multiple Arlington campuses, including a 55,000 sq ft K-8 replacement that finished four days early. We build the schedule with weather buffers and communicate progress daily so you always know where you stand.",
      },
    ],
  },

  {
    citySlug: "dallas",
    serviceSlug: "tpo-epdm-pvc",
    intro:
      "Dallas commercial property owners have a clear choice of single-ply membrane systems — and the right one depends on your building's use, rooftop equipment load, and drainage geometry. As an authorized installer of Firestone (Elevate), Mule-Hide, and Duro-Last, we install TPO, EPDM, and PVC systems across every Dallas submarket with factory-backed NDL warranties.",
    localDistricts: [
      "Design District mixed-use & warehouse buildings",
      "Cold storage & food distribution corridor along I-30",
      "Medical District hospital systems & outpatient campuses",
    ],
    buildingContext:
      "Dallas's single-ply membrane demand is driven by its diverse commercial base. Cold-storage distribution centers along I-30 and I-20 demand PVC membranes for chemical and temperature-cycle resistance. Medical District hospital campuses specify high-mil TPO or PVC with reinforced detailing around dense HVAC penetrations. Design District showrooms and loft offices often choose TPO for its white reflectivity and low cooling-load impact.",
    weatherUrgency:
      "TPO and PVC systems in Dallas must handle prolonged UV exposure — summer rooftop temperatures exceeding 175°F are common — plus hail impacts that can fracture thin membranes. We specify 60-mil or 80-mil membranes with hail-rated cover boards on all Dallas projects, not the minimum required to win the bid.",
    faqs: [
      {
        question: "Which membrane system is right for my Dallas warehouse — TPO, EPDM, or PVC?",
        answer:
          "For a standard DFW warehouse, TPO is the default: cost-effective, reflective, and excellent in heat and hail conditions. PVC is the right call for food processing, chemical exposure, or restaurant buildings. EPDM performs well in cold-cycle flexibility applications. We model all three and recommend based on your building.",
      },
      {
        question: "What warranty comes with a new TPO roof in Dallas?",
        answer:
          "Firestone, Mule-Hide, and Duro-Last all offer NDL (No Dollar Limit) manufacturer warranties of 15, 20, 25, or 30 years depending on system thickness and attachment method. We register every warranty with the manufacturer and maintain documentation in your file.",
      },
      {
        question: "My Dallas cold-storage facility needs chemical-resistant roofing near a loading dock. What do you recommend?",
        answer:
          "PVC membrane — specifically Duro-Last custom-prefabricated PVC — is the industry standard for chemical and grease exposure. The factory-prefabricated seams eliminate the most common leak points, and PVC's chlorine-based chemistry resists oils, fats, and many industrial solvents that attack TPO over time.",
      },
    ],
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "tpo-epdm-pvc",
    intro:
      "Fort Worth's industrial and manufacturing base demands single-ply membrane systems that can handle chemical exposure, heavy rooftop equipment loads, and Tarrant County's severe hail and straight-line wind events. We're authorized for Firestone (Elevate), Mule-Hide, and Duro-Last — and we install the system that's actually engineered for your Fort Worth building, not the one that's easiest to bid.",
    localDistricts: [
      "AllianceTexas aerospace & logistics facilities",
      "Near Southside energy-sector manufacturing",
      "Historic Stockyards restaurant & retail buildings",
    ],
    buildingContext:
      "Fort Worth's membrane roofing market reflects its industrial character. Aerospace and defense manufacturing at Alliance demands high-performance, chemical-resistant assemblies — typically 60-mil or 80-mil TPO or PVC with mechanically attached perimeter systems rated for the facility's wind uplift exposure. Stockyards-area restaurants and historic retail buildings need PVC for grease resistance at kitchen exhaust penetrations.",
    weatherUrgency:
      "Tarrant County's severe thunderstorm frequency means every membrane system installed in Fort Worth needs robust perimeter attachment. Building-corner uplift is the failure point we see most on improperly attached Fort Worth industrial roofs — a properly engineered mechanically attached or fully adhered perimeter detail eliminates that risk entirely.",
    faqs: [
      {
        question: "We have a Fort Worth facility near AllianceTexas with strict aerospace cleanliness standards. What membrane options meet those requirements?",
        answer:
          "Fully adhered 60-mil or 80-mil TPO or PVC systems with factory-fabricated seams minimize the number of field welds and loose fasteners. Duro-Last's prefabricated PVC eliminates field seaming at penetrations entirely — a significant advantage in FOD-sensitive aerospace environments.",
      },
      {
        question: "Our Fort Worth restaurant has a failing roof around the kitchen exhaust area. Which membrane handles grease exposure?",
        answer:
          "PVC is the correct choice around kitchen exhaust penetrations. TPO and EPDM membranes deteriorate when exposed to cooking grease — PVC's chemistry resists oils and fats that would attack other single-ply systems within a few years.",
      },
    ],
  },
  {
    citySlug: "frisco",
    serviceSlug: "tpo-epdm-pvc",
    intro:
      "Frisco's new construction boom has made TPO the dominant commercial membrane in Collin County — and for good reason. But as that first generation of Frisco roofs ages into its first replacement cycle, the right membrane choice matters more than ever. We install TPO, EPDM, and PVC across Frisco's corporate campuses, retail centers, and mixed-use developments with NDL warranties backed by the manufacturers we're authorized to install.",
    localDistricts: [
      "The Star / Cowboys HQ corporate & entertainment campus",
      "PGA Frisco & Fields development mixed-use",
      "Stonebriar Centre retail & lifestyle anchors",
    ],
    buildingContext:
      "Frisco's membrane roofing is dominated by Class A office buildings and lifestyle retail centers with high tenant expectations. Reflective white TPO systems are the default choice for their cooling-load reduction — a meaningful operating cost benefit on large Frisco office campuses during the 100°F+ summer months. PGA Frisco and Fields-area hospitality buildings have specified PVC for its superior warranty terms and resistance to cleaning chemicals.",
    weatherUrgency:
      "Collin County hailstorms produce some of the largest stone sizes recorded in the DFW Metroplex. We specify 60-mil minimum membrane thickness with Class 4 impact-rated cover boards on all Frisco projects — insurance carriers recognize these ratings and will often reduce premiums on newly installed qualifying assemblies.",
    faqs: [
      {
        question: "What's the difference between the TPO brands — Firestone, Carlisle, GAF, Mule-Hide?",
        answer:
          "All are quality systems when installed correctly. We're authorized for Firestone (Elevate), Mule-Hide, and Duro-Last. Brand selection comes down to system thickness, warranty terms, and specific project requirements — we recommend based on your building, not brand preference.",
      },
      {
        question: "Is PVC worth the extra cost for a Frisco corporate campus?",
        answer:
          "For Frisco Class A office with demanding tenants and institutional ownership, PVC's longer service life, superior fire rating, and best-in-class NDL warranty from Duro-Last often justifies the premium. We model the TPO vs. PVC lifecycle cost so you can make the decision with real numbers.",
      },
    ],
  },
  {
    citySlug: "plano",
    serviceSlug: "tpo-epdm-pvc",
    intro:
      "Plano's corporate campus and medical office buildings demand single-ply membrane systems installed to manufacturer spec with zero shortcuts — because the tenants below don't tolerate water events, and the institutional owners expect warranty documentation that survives an asset audit. We install Firestone (Elevate), Mule-Hide, and Duro-Last membrane systems across the entire Plano market.",
    localDistricts: [
      "Legacy West & Granite Park corporate towers",
      "Medical corridor along Coit Road and Independence Parkway",
      "Willow Bend & Preston upscale retail centers",
    ],
    buildingContext:
      "Plano's membrane roofing market is defined by Class A commercial standards. Low-odor fully adhered systems are frequently specified for occupied office buildings where membrane adhesive odor can affect indoor air quality. Duro-Last PVC is a frequent choice for Plano medical office buildings because its factory-prefabricated seams reduce field weld failure risk in complex, penetration-heavy roof configurations.",
    weatherUrgency:
      "Collin County hail events put Plano office roofs at significant risk each spring. Class 4 impact-rated assemblies — specified as our standard for all new Plano installations — qualify for insurance premium reductions with most Texas commercial carriers, providing a measurable ROI on the upgrade.",
    faqs: [
      {
        question: "Our Plano medical office building has over 40 HVAC penetrations. Which membrane handles that complexity best?",
        answer:
          "Duro-Last PVC's factory-prefabricated system is ideal for high-penetration roofs. Penetration flashings are fabricated in the factory to exact dimensions, eliminating field weld failure at every curb and pipe boot — the most common leak point on complex medical-office roofs.",
      },
      {
        question: "Can we specify a low-odor adhesive system for our occupied Plano office campus?",
        answer:
          "Yes. We use low-VOC, low-odor adhesive systems on all occupied Plano office projects as standard practice. We also conduct air monitoring during installation if required by building management.",
      },
    ],
  },
  {
    citySlug: "mckinney",
    serviceSlug: "tpo-epdm-pvc",
    intro:
      "McKinney's commercial membrane roofing market spans historic downtown buildings needing EPDM's cold-weather flexibility to new Craig Ranch medical campuses specifying premium PVC assemblies. As an authorized Firestone, Mule-Hide, and Duro-Last installer, we match the right single-ply system to McKinney's diverse commercial building stock — and back every installation with a manufacturer NDL warranty.",
    localDistricts: [
      "Craig Ranch medical & corporate campus",
      "Historic Downtown McKinney commercial buildings",
      "McKinney National Airport hangars & FBO facilities",
    ],
    buildingContext:
      "McKinney's membrane roofing needs split across its building types. Historic downtown masonry buildings benefit from EPDM's flexibility in freeze-thaw cycles and its compatibility with older substrates. Craig Ranch medical and corporate buildings specify premium 60-mil TPO or PVC with high-reflectivity ratings for energy compliance. Aviation facilities at McKinney National require chemical-resistant assemblies near fuel systems.",
    weatherUrgency:
      "Northern Collin County sees some of the highest hail frequency in the DFW Metroplex. McKinney properties benefit from Class 4 impact-rated membrane assemblies — particularly on buildings where a large-stone hail event could result in hundreds of punctures requiring full replacement rather than repair.",
    faqs: [
      {
        question: "What membrane system works best on McKinney's historic downtown buildings?",
        answer:
          "EPDM (rubber membrane) is the best choice for older masonry buildings in McKinney's historic district. Its cold-weather flexibility handles freeze-thaw cycles well, and it's compatible with the variety of older substrates these buildings present. Fully adhered installation eliminates wind-uplift risk at the historic parapets.",
      },
      {
        question: "Is PVC suitable near aircraft fuel systems at McKinney National?",
        answer:
          "PVC is the preferred membrane in proximity to aviation fuels and lubricants because it resists hydrocarbon exposure that degrades TPO and EPDM. We coordinate material specifications with facility management to ensure compatibility with your specific operations.",
      },
    ],
  },
  {
    citySlug: "arlington",
    serviceSlug: "tpo-epdm-pvc",
    intro:
      "Arlington's massive commercial roof footprint — industrial distribution, automotive manufacturing support, hospitality, and education — demands single-ply membrane systems selected for the specific building use rather than the lowest cost-per-square-foot. We install Firestone (Elevate), Mule-Hide, and Duro-Last TPO, EPDM, and PVC systems across the Great Southwest district, the Entertainment District, and every Arlington commercial submarket.",
    localDistricts: [
      "Great Southwest Industrial District warehouses & manufacturing",
      "Entertainment District hotels & stadium-adjacent retail",
      "UT Arlington & school district campus buildings",
    ],
    buildingContext:
      "Arlington's membrane roofing market is one of the most diverse in the Metroplex. Great Southwest distribution warehouses typically specify 60-mil or 80-mil mechanically attached TPO for speed and cost at large scale. Hospitality buildings near AT&T Stadium frequently use PVC for its fire rating and grease resistance near kitchen areas. School campuses specified by Arlington ISD require 20-year NDL warranties on all membrane systems.",
    weatherUrgency:
      "Arlington's position between two major storm tracks means membrane systems must perform across a wide range of weather events — from summer UV and heat to spring hail and winter freeze-thaw. We size cover boards, membrane thickness, and attachment density for the worst-case event, not the average weather year.",
    faqs: [
      {
        question: "What's the most cost-effective membrane system for a large Arlington warehouse?",
        answer:
          "For Great Southwest distribution warehouses in the 100,000+ sq ft range, mechanically attached 60-mil TPO is typically the most cost-effective choice that still meets all warranty and code requirements. We provide transparent sq ft pricing so you can compare systems on an apples-to-apples basis.",
      },
      {
        question: "Our Arlington school district requires a 20-year NDL manufacturer warranty. Which systems qualify?",
        answer:
          "Firestone, Mule-Hide, and Duro-Last all offer 20-year NDL warranties on qualifying assemblies. Duro-Last PVC's 20-year warranty is among the most comprehensive in the industry and is frequently specified for school campuses. We handle all manufacturer warranty registration and documentation.",
      },
    ],
  },

  {
    citySlug: "dallas",
    serviceSlug: "emergency-leak-repair",
    intro:
      "A roof leak at 2 a.m. above a Dallas cold-storage facility or a midday storm breach over a Medical District surgery suite doesn't wait for business hours. Our Dallas emergency leak repair crews are dispatched 24/7, answer phones directly (no answering machine), and arrive with the materials needed to mitigate immediately — not just to assess and schedule.",
    localDistricts: [
      "Medical District hospital & surgical center campuses",
      "Design District warehouses & temperature-controlled showrooms",
      "I-30 / I-20 cold-storage & food distribution facilities",
    ],
    buildingContext:
      "Dallas emergency calls come from the widest range of building types in the Metroplex — refrigerated food distribution centers where every hour of open roof costs thousands in cold-chain damage, hospital campuses where a ceiling drip above an OR triggers an immediate facility response, and high-bay warehouses in the Design District where a slow leak can ruin hundreds of thousands in finished inventory before anyone notices.",
    weatherUrgency:
      "Dallas County severe weather comes fast and hard. Afternoon supercells in April, May, and June can drop two inches of rain in under 30 minutes on a roof that's been functioning fine all year. Post-storm emergency calls are our highest-volume situation — and we staff for it, with multiple simultaneous dispatch crews during major weather events.",
    faqs: [
      {
        question: "How fast can you respond to an emergency roof leak in Dallas?",
        answer:
          "Typically within hours for any Dallas location — Design District, Medical District, Oak Cliff, Pleasant Grove, or the CBD. We answer calls directly 24/7 and dispatch the nearest available crew immediately.",
      },
      {
        question: "Our Dallas food distribution facility has an active leak over the refrigerated floor. What happens first?",
        answer:
          "Immediate water mitigation to stop the spread — tarping over the leak source, extracting any standing water on the roof, and sealing the active entry point with a temporary engineered patch. We then schedule the permanent repair with a full root-cause diagnosis.",
      },
      {
        question: "Will my emergency call be documented for our insurance claim?",
        answer:
          "Every emergency response includes photo documentation of the damage, the temporary repair performed, and the root-cause assessment. You receive a written incident summary within 24 hours that your carrier and warranty file can use directly.",
      },
    ],
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "emergency-leak-repair",
    intro:
      "Fort Worth emergencies don't wait for office hours — a burst seam on an Alliance logistics facility or a storm-breach above a Stockyards-district restaurant requires immediate dispatch. Our Fort Worth emergency crews are available 24/7 across Tarrant County, arriving with tarps, heat-welding equipment, and the materials to seal the leak and protect your operations.",
    localDistricts: [
      "AllianceTexas logistics & aerospace manufacturing facilities",
      "Fort Worth Stockyards hospitality & restaurant row",
      "Sundance Square & downtown Fort Worth office buildings",
    ],
    buildingContext:
      "Fort Worth emergency calls reflect the city's industrial character. Alliance logistics facilities operate 24/7 — a mid-shift roof breach above a shipping floor can halt an entire sort operation. Aerospace-adjacent facilities near the airport have strict foreign object debris protocols that even emergency crews must follow. Stockyards-area restaurants face roof breaches that contaminate kitchen areas and trigger health code shutdowns if not resolved immediately.",
    weatherUrgency:
      "Tarrant County's severe storm season runs from March through June and produces the highest concentration of emergency roof calls in the Metroplex. Straight-line wind events from derechos can peel perimeter flashings on large Fort Worth industrial roofs in minutes, turning a functioning system into an active leak. We staff emergency crews specifically for these weather windows.",
    faqs: [
      {
        question: "Can you respond to an emergency at an Alliance logistics facility that operates around the clock?",
        answer:
          "Yes. Our emergency crews carry FOD-compliant gear and follow the safety protocols required for aerospace-adjacent and active logistics facilities. We coordinate with your operations team on crew access and staging before arriving.",
      },
      {
        question: "Our Fort Worth restaurant had a storm breach above the kitchen. What's the protocol?",
        answer:
          "Immediate tarping and sealing of the entry point above the kitchen area, followed by kitchen inspection and documentation for health code compliance. We can provide written verification of the temporary repair for your health inspector if needed.",
      },
    ],
  },
  {
    citySlug: "frisco",
    serviceSlug: "emergency-leak-repair",
    intro:
      "Frisco property managers face a specific emergency challenge: corporate tenants who expect any roof event resolved before they arrive in the morning. Our Frisco emergency dispatch operates 24/7, with crews positioned to respond quickly across the Dallas North Tollway corridor, Preston Road, and the US-121 commercial belt.",
    localDistricts: [
      "Dallas North Tollway corporate & Class A office corridor",
      "Eldorado Parkway & Preston Road retail centers",
      "The Star & Fields-area mixed-use development",
    ],
    buildingContext:
      "Frisco emergency calls most commonly come from retail center property managers during post-storm tenant walk-throughs, and from corporate campus facilities teams dealing with leaks above occupied office floors. Speed of response is critical in both cases — a confirmed interior event in a Frisco Class A office building often triggers an incident report to the corporate tenant's risk management team.",
    weatherUrgency:
      "Collin County spring storms can produce hail and heavy rain simultaneously, overwhelming drainage systems on retail centers and producing multiple simultaneous leak entry points. Post-major-storm nights in Frisco frequently generate multiple concurrent emergency calls — we maintain capacity to dispatch to multiple sites during major weather events.",
    faqs: [
      {
        question: "Can you respond to a Frisco roof emergency in the middle of the night and have it resolved before tenants arrive?",
        answer:
          "That's the goal of every after-hours Frisco dispatch. We confirm the emergency, dispatch immediately, complete mitigation, and send you a written update with photos before 7 a.m. — so you can brief your tenants on exactly what happened and what's been done.",
      },
      {
        question: "Our Frisco retail center had storm damage to multiple storefronts. Can you handle multiple simultaneous leaks?",
        answer:
          "Yes. During major hail and storm events in Collin County, we deploy multiple crews simultaneously. We triage by severity — active interior leaks first, then documented but contained damage — and work through the site systematically.",
      },
    ],
  },
  {
    citySlug: "plano",
    serviceSlug: "emergency-leak-repair",
    intro:
      "A roof leak above a Plano Class A office building occupied by a Fortune 500 tenant is a facilities management emergency on multiple levels — property damage, tenant risk, and potential lease clause triggers. Our Plano emergency leak response operates 24/7, with rapid dispatch and same-night written incident documentation so you have the record you need before your tenant's facility manager calls in the morning.",
    localDistricts: [
      "Legacy West & Granite Park Class A corporate towers",
      "Preston Road & Independence medical office buildings",
      "Willow Bend upscale retail & dining centers",
    ],
    buildingContext:
      "Plano emergency calls come with elevated stakes — tenants include Toyota, JPMorgan Chase, Liberty Mutual, and other corporate names that have formal incident response protocols. A confirmed interior water event at one of these addresses often triggers corporate risk management, insurance notification, and tenant escalation within hours. Fast response with good documentation is not optional.",
    weatherUrgency:
      "Plano's corporate campuses see the same Collin County hail exposure as the rest of the area, but with a significantly higher cost profile per interior event. A ceiling tile replacement in a Class A Plano office building costs multiples of what the same repair costs in a warehouse — which makes fast emergency response an economic imperative, not just a service nicety.",
    faqs: [
      {
        question: "How quickly can you get to our Legacy West property after hours?",
        answer:
          "Emergency dispatch reaches Legacy West and the Plano corporate corridor within hours any time of day. We answer calls directly — no answering service — and confirm ETA immediately.",
      },
      {
        question: "Do you provide written incident documentation for our tenant and insurance carrier the same night?",
        answer:
          "Every emergency response includes a same-night photo documentation set and a written incident summary that identifies the leak source, the temporary repair performed, and recommended next steps. It's ready to hand to your carrier and your tenant before morning.",
      },
    ],
  },
  {
    citySlug: "mckinney",
    serviceSlug: "emergency-leak-repair",
    intro:
      "McKinney's commercial property base — from Craig Ranch medical offices to historic downtown storefronts to industrial flex space along US-380 — requires emergency leak response that can adapt to every building type. Our McKinney and northern Collin County emergency crews are available 24/7, with the materials and expertise to handle everything from a downtown parapet breach to a mid-storm drain failure at a medical campus.",
    localDistricts: [
      "Craig Ranch medical & corporate campus",
      "Historic Downtown McKinney commercial square",
      "US-380 commercial & industrial corridor",
    ],
    buildingContext:
      "McKinney emergency calls often involve older assemblies on historic downtown buildings where temporary repairs require matching legacy materials, and medical office buildings in Craig Ranch where active patient areas must be protected immediately. The mix of old and new building stock means emergency crews need to be familiar with both modified bitumen and built-up systems as well as modern single-ply assemblies.",
    weatherUrgency:
      "Northern Collin County sits at the leading edge of DFW's primary hail corridor. McKinney regularly sees the largest hail stone sizes reported in the metro area — and those events produce the most urgent emergency calls, often with multiple active leaks per building from hail penetrations spread across the entire roof field.",
    faqs: [
      {
        question: "Can you respond to a medical office emergency in McKinney when patients are in the building?",
        answer:
          "Yes. We tarp and seal the active leak entry point immediately, working around patient areas with minimum noise and disruption. We coordinate access with your facility manager and keep our footprint on the occupied areas of the building to a minimum.",
      },
      {
        question: "Our McKinney historic building has an unusual modified bitumen roof. Can you make emergency repairs on it?",
        answer:
          "Yes. We carry emergency materials compatible with modified bitumen and built-up assemblies. The temporary repair is engineered to hold through subsequent storms, not just to stop the current drip.",
      },
    ],
  },
  {
    citySlug: "arlington",
    serviceSlug: "emergency-leak-repair",
    intro:
      "Arlington's 24/7 logistics operations, game-day hospitality facilities, and school campuses all have one thing in common: a roof leak at the wrong time costs far more than the repair. Our Arlington emergency crews are dispatched around the clock across Tarrant County, carrying the materials and equipment to mitigate immediately — whether it's a Great Southwest warehouse at 3 a.m. or a hotel near AT&T Stadium on game night.",
    localDistricts: [
      "Great Southwest Industrial District 24/7 distribution facilities",
      "Entertainment District hotels & restaurants near AT&T Stadium",
      "Arlington ISD school campuses",
    ],
    buildingContext:
      "Arlington's emergency calls span the full commercial spectrum. Great Southwest distribution centers with active logistics floors need immediate tarping and mitigation to protect inventory — a one-hour delay can mean six figures in damaged goods. Stadium-adjacent hospitality buildings need emergency response that respects the tight game-day and event schedule. School campuses need rapid response before students arrive.",
    weatherUrgency:
      "Arlington's position between Fort Worth's western storm track and Dallas's eastern track means it catches both. The city's large industrial roof footprint means any storm that passes through generates multiple simultaneous emergency calls across the Great Southwest district. We maintain capacity for concurrent dispatch during storm events.",
    faqs: [
      {
        question: "Our Arlington warehouse runs 24/7 operations. Can you work around an active logistics floor?",
        answer:
          "Yes. We coordinate with your operations manager on access, staging, and safety protocols before we start. Emergency tarping and temporary sealing can be completed above an active floor without interrupting the operation below.",
      },
      {
        question: "A storm hit our hotel near AT&T Stadium during an event. Can you respond even during game days?",
        answer:
          "Absolutely. Game-day emergencies are something we specifically prepare for in Arlington. We route our crews around stadium traffic and coordinate with your hotel team on guest-area access protocols.",
      },
    ],
  },

  // ── MAINTENANCE ──────────────────────────────────────────────────────────
  {
    citySlug: "dallas",
    serviceSlug: "maintenance",
    intro:
      "A proactive roof maintenance program is the single highest-ROI investment a Dallas commercial property owner can make. From Design District showrooms to Medical District hospital campuses, our Dallas maintenance teams perform bi-annual inspections, drain cleaning, flashing reseal, and minor repairs on a fixed-fee schedule — catching failures worth thousands before they become disasters worth hundreds of thousands.",
    localDistricts: [
      "Medical District hospital & MOB campuses",
      "Design District showrooms & mixed-use buildings",
      "Stemmons Corridor logistics & distribution parks",
    ],
    buildingContext:
      "Dallas commercial roofs face some of the harshest UV exposure in Texas combined with heavy hail seasons. A maintenance contract typically includes spring and fall inspections, post-storm assessments, drain and scupper cleaning, flashing and caulk inspection, and minor repairs — all documented with photos for warranty and insurance files. Buildings with maintenance records qualify for better insurance rates and see 30–50% longer roof life.",
    weatherUrgency:
      "Dallas County averages 50+ hail days annually. Without a maintenance program that catches post-storm membrane bruising early, those impacts turn into full-section moisture saturation within 12–18 months. Regular maintenance is the only way to catch developing failures before a Dallas storm season converts them into emergency calls.",
    faqs: [
      {
        question: "What does a Dallas commercial roof maintenance program include?",
        answer:
          "Bi-annual inspections with photo documentation, drain and scupper cleaning, flashing and caulk inspection and resealing, minor repairs up to a defined sq ft threshold, post-storm assessments after any significant hail or wind event, and a written maintenance log that satisfies manufacturer warranty requirements.",
      },
      {
        question: "Can a maintenance contract extend the life of our aging Dallas roof?",
        answer:
          "Yes — documented maintenance programs regularly extend roof life by 30–50% beyond their actuarial end-of-life date. We've kept Dallas roofs in service for 5–8 extra years on maintenance contracts that deferred a full replacement until the capital budget was ready.",
      },
      {
        question: "Does our Dallas manufacturer warranty require a maintenance program?",
        answer:
          "Most NDL warranties from Firestone, Mule-Hide, and Duro-Last require documented annual or bi-annual maintenance to remain valid. We maintain the documentation trail and submit to the manufacturer on your behalf.",
      },
    ],
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "maintenance",
    intro:
      "Fort Worth's industrial and logistics building stock — from AllianceTexas warehouses to Near Southside manufacturing facilities — accumulates roof wear faster than Class A office. Our Fort Worth maintenance programs are calibrated for industrial exposure: heavy foot traffic from HVAC technicians, standing water in low-slope drains, and the straight-line wind stress that degrades perimeter flashings on Tarrant County buildings year after year.",
    localDistricts: [
      "AllianceTexas industrial & logistics corridor",
      "Near Southside manufacturing & warehouse district",
      "West 7th & Cultural District mixed-use and hospitality",
    ],
    buildingContext:
      "Fort Worth maintenance contracts cover the full range: aerospace-adjacent facilities at Alliance that require FOD-compliant inspection protocols, historic Stockyards-area buildings with modified bitumen and built-up assemblies that need specialized maintenance attention, and downtown hospitality buildings where any roof event impacts guest experience. We tailor the maintenance scope to the building type rather than applying a one-size program.",
    weatherUrgency:
      "Tarrant County derechos produce the highest straight-line wind speeds in the Metroplex. Perimeter fasteners on aging Fort Worth industrial buildings loosen progressively under these events — maintenance inspections catch pull-out early, before the next storm converts loose perimeter into a full-section blow-off.",
    faqs: [
      {
        question: "Can you maintain the roof on our Alliance aerospace facility under FOD protocols?",
        answer:
          "Yes. Our Fort Worth maintenance crews carry FOD-compliant toolkits and follow debris-containment protocols on every inspection. We provide pre- and post-inspection FOD documentation that meets aerospace facility requirements.",
      },
      {
        question: "What's the cost of a commercial roof maintenance program in Fort Worth?",
        answer:
          "Maintenance contracts are priced per square foot with a minimum annual fee. For most Fort Worth industrial buildings in the 50,000–200,000 sq ft range, the program cost is less than 5% of what a single emergency response and interior damage remediation would run. We provide fixed-fee quotes with no surprise add-ons.",
      },
    ],
  },
  {
    citySlug: "frisco",
    serviceSlug: "maintenance",
    intro:
      "Frisco's Class A retail centers, corporate campuses, and sports and entertainment venues along the Tollway corridor represent major real estate assets whose value depends heavily on building envelope integrity. Our Frisco maintenance programs protect those assets with bi-annual inspections, post-storm assessments, and a documented maintenance history that satisfies institutional investors, insurance carriers, and manufacturer warranty requirements.",
    localDistricts: [
      "Dallas North Tollway Class A corporate & retail corridor",
      "The Star at Frisco & Fields development district",
      "Frisco ISD and sports venue campuses",
    ],
    buildingContext:
      "Frisco's commercial roof stock is dominated by systems installed in the early-to-mid 2000s — single-ply membranes that have completed their original warranty terms and are entering their highest-risk years. A maintenance program at this stage of building life catches seam fatigue, flashing separation, and drain deterioration before they escalate — and preserves the option of a cost-effective restoration rather than a full replacement.",
    weatherUrgency:
      "Collin County hail frequency makes post-storm assessments a critical maintenance component for Frisco properties. Many insurance claims are denied because the storm damage was not documented promptly. Our maintenance agreements include post-storm inspection with written and photographic documentation within 48 hours of any significant weather event.",
    faqs: [
      {
        question: "Our Frisco retail center has an institutional owner. What documentation does a maintenance program produce?",
        answer:
          "Every inspection produces a written report with photo documentation of each observation, a repair log, and a building health summary. The file is formatted to satisfy institutional lender requirements and serves as evidence of good-faith maintenance for warranty and insurance purposes.",
      },
      {
        question: "Can we add a Frisco maintenance contract mid-warranty to an existing roof?",
        answer:
          "Yes. We perform an initial condition assessment, document the current state, and begin the maintenance program from that baseline. Most manufacturers accept maintenance programs that begin mid-warranty as long as the roof is in serviceable condition at the time of enrollment.",
      },
    ],
  },
  {
    citySlug: "plano",
    serviceSlug: "maintenance",
    intro:
      "Plano's Fortune 500 corporate campuses and Class A medical office buildings have zero tolerance for unplanned roof events. Our Plano maintenance programs provide the structured, documented, proactive care these assets require — fixed-fee bi-annual inspections, post-storm assessments within 48 hours, and a maintenance record that your institutional lender, insurance carrier, and manufacturer warranty all demand.",
    localDistricts: [
      "Legacy West & Granite Park corporate towers",
      "Medical corridor along Coit, Independence, and Preston",
      "Plano's US-75 office campus corridor",
    ],
    buildingContext:
      "Class A office buildings in Plano carry some of the highest interior damage cost profiles in the DFW market — a ceiling tile event above a corporate trading floor or a clean-room drip in a medical facility creates disruption that far exceeds the roof repair cost itself. Maintenance programs for these buildings prioritize drain capacity, penetration integrity, and post-storm assessment so the roof never becomes the weak link in the tenant experience.",
    weatherUrgency:
      "Plano's exposure to Collin County hail is well-documented — and so is the cost of failing to document storm damage promptly. Our maintenance agreements include a 48-hour post-storm response commitment that produces the written record your carrier needs to approve the claim before the deadline window closes.",
    faqs: [
      {
        question: "Can our Plano building's maintenance program be coordinated with our property management team?",
        answer:
          "Absolutely. We assign a dedicated project manager for each Plano maintenance account who coordinates scheduling, access, and reporting directly with your property management team. You receive inspection summaries within 24 hours of each visit.",
      },
      {
        question: "How does a maintenance program affect our building's insurance premiums in Plano?",
        answer:
          "Documented maintenance programs are increasingly recognized by Texas commercial carriers as a premium reduction factor — particularly for buildings with Class 4 impact-rated systems and a history of proactive post-storm assessments. We can provide the documentation format most carriers require.",
      },
    ],
  },
  {
    citySlug: "mckinney",
    serviceSlug: "maintenance",
    intro:
      "McKinney's mixed building stock — century-old downtown masonry, 1990s flex-industrial, and brand-new Craig Ranch medical campuses — all benefit from maintenance programs tailored to each assembly type. Our McKinney teams inspect and maintain built-up, modified bitumen, and single-ply systems with equal fluency, providing the documentation that Collin County building owners need for warranty compliance and post-storm insurance claims.",
    localDistricts: [
      "Historic Downtown McKinney commercial square",
      "Craig Ranch medical & corporate campus",
      "US-380 flex-industrial & retail corridor",
    ],
    buildingContext:
      "McKinney's historic downtown buildings require maintenance approaches that respect the existing assembly — modified bitumen patching, parapet flashing resealing, and built-up repairs using compatible materials. Newer Craig Ranch buildings need warranty-compliant single-ply maintenance with manufacturer-approved materials. We differentiate our approach for every building in the portfolio.",
    weatherUrgency:
      "Northern Collin County sees the largest hail stones in the DFW metro. McKinney buildings take the first and often hardest hit in major storm tracks, and without a post-storm inspection on file, insurance claims for those events can be denied weeks later. Our maintenance agreements guarantee a documented post-storm assessment within 48 hours of any significant weather.",
    faqs: [
      {
        question: "Can you maintain our 1910s McKinney downtown building under a fixed-fee contract?",
        answer:
          "Yes. We assess historic assemblies during the initial condition survey, set a maintenance scope appropriate for the building type, and price the program on a fixed annual fee. Older assemblies typically require more frequent drain cleaning and flashing attention — we factor that into the program design rather than charging for it as extras.",
      },
      {
        question: "Our McKinney medical campus has multiple buildings. Can one contract cover all of them?",
        answer:
          "Absolutely. Portfolio maintenance contracts for multi-building campuses receive a volume discount and a single coordinated inspection schedule that minimizes disruption across the campus.",
      },
    ],
  },
  {
    citySlug: "arlington",
    serviceSlug: "maintenance",
    intro:
      "Arlington's massive industrial roof footprint — Great Southwest distribution centers, manufacturing plants, and stadium-adjacent hospitality buildings — generates more deferred maintenance exposure than almost any other DFW submarket. Our Arlington maintenance programs bring drone surveys, thermal imaging, and trained crews to systematically inspect and maintain these large, complex roofs on a fixed-fee schedule before small problems become expensive surprises.",
    localDistricts: [
      "Great Southwest Industrial District distribution & manufacturing",
      "Entertainment District hotels & event venues",
      "Arlington ISD school and athletic campuses",
    ],
    buildingContext:
      "Large Arlington industrial roofs — common at 100,000–500,000 sq ft — cannot be manually walked in their entirety on a routine basis. Our maintenance programs include drone aerial surveys that cover every square foot efficiently, supplemented by infrared scans to detect moisture before it migrates through the insulation. This technology-first approach makes maintenance cost-effective at large scale.",
    weatherUrgency:
      "Arlington's large industrial roofs accumulate storm damage across enormous surface areas. A single hail event can produce dozens of membrane punctures across a 300,000 sq ft distribution center — and without a systematic post-storm inspection, each unrepaired puncture saturates insulation through the next 12 months of normal rainfall. Our post-storm inspection scope for Arlington industrial buildings uses drone imagery to map every impact point.",
    faqs: [
      {
        question: "How do you inspect a 400,000 sq ft Arlington warehouse roof efficiently?",
        answer:
          "Drone aerial photography combined with evening infrared thermal scans — the same pass that takes hours to walk manually takes 45 minutes with our drone program. We generate a full-coverage inspection report with GPS-tagged findings so the repair scope is precise.",
      },
      {
        question: "Our Arlington school district requires documented maintenance on all campus buildings. Can you manage the entire portfolio?",
        answer:
          "Yes. We manage portfolio maintenance contracts for AISD and other Tarrant County school districts, providing inspection reports in the format required for public building documentation and capital planning.",
      },
    ],
  },

  // ── COATINGS & RESTORATION ───────────────────────────────────────────────
  {
    citySlug: "dallas",
    serviceSlug: "coatings-restoration",
    intro:
      "A silicone or acrylic roof coating can add 10–15 years to a Dallas commercial roof at a fraction of full replacement cost — but only when applied to a structurally sound substrate. Our Dallas coatings and restoration teams begin every project with moisture scanning and a full condition assessment, so you know before the first gallon is sprayed whether restoration is the right call or whether the substrate requires tear-off first.",
    localDistricts: [
      "Design District warehouses & mixed-use buildings",
      "Stemmons Corridor distribution & logistics facilities",
      "Oak Cliff & South Dallas commercial strip centers",
    ],
    buildingContext:
      "Dallas flat roofs suitable for coatings span a huge range: metal buildings in the industrial parks south of I-30, 20-year-old modified bitumen systems on neighborhood retail centers in Oak Cliff, and aging single-ply on the Stemmons Corridor warehouse buildings. Each substrate requires a different coating system — silicone for roofs with ponding-water exposure, acrylic where UV is the primary stressor, and polyurethane foam where additional R-value and slope correction are needed.",
    weatherUrgency:
      "Dallas's UV intensity is among the highest in Texas — reflective coatings can reduce rooftop surface temperatures by 50–80°F and cut cooling loads meaningfully for buildings with HVAC systems working against a black-rooftop heat island. Energy savings alone often pay for a Dallas coating restoration within 3–5 years before the extended roof life is even factored in.",
    faqs: [
      {
        question: "Is my Dallas commercial roof a candidate for coating restoration?",
        answer:
          "The key factors are substrate condition and moisture content. We perform a moisture scan (infrared and nuclear if needed) to confirm there is no wet insulation. If the substrate is dry and structurally sound, restoration is typically cost-effective. If moisture is present in more than 25% of the roof area, tear-off and replacement is the more responsible recommendation.",
      },
      {
        question: "What coating systems do you install on Dallas commercial roofs?",
        answer:
          "Silicone (best for ponding-water exposure), acrylic (cost-effective for low-ponding roofs with strong slope), and spray polyurethane foam with a silicone topcoat (for roofs needing slope correction and added R-value). We specify the right system for the substrate and the building's drainage profile.",
      },
      {
        question: "Does a coating restoration qualify for an extended manufacturer warranty in Dallas?",
        answer:
          "Yes — restoration systems from Firestone, Mule-Hide, and several other manufacturers offer 10–15 year system warranties when applied over a properly prepared substrate. We handle the manufacturer inspection and warranty registration as part of every coatings project.",
      },
    ],
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "coatings-restoration",
    intro:
      "Fort Worth's large industrial and manufacturing building inventory — steel-framed buildings with metal panel roofs, older modified bitumen warehouse systems, and mid-century built-up assemblies — is a strong candidate for coatings restoration. We have restored hundreds of thousands of square feet of Fort Worth commercial roofs with silicone and acrylic systems that add years of life at well under replacement cost.",
    localDistricts: [
      "AllianceTexas industrial park warehouses & manufacturing facilities",
      "Near Southside commercial & manufacturing corridor",
      "West Fort Worth / Benbrook industrial and retail properties",
    ],
    buildingContext:
      "Metal roofing is common throughout Fort Worth's industrial market — and metal panel roofs are among the best candidates for spray polyurethane foam restoration, which seals lap seams, re-flashes penetrations, and adds insulation value in a single application. Older built-up and modified bitumen systems on Tarrant County commercial buildings can often be restored with acrylic or silicone coatings applied over a properly cleaned and primed surface.",
    weatherUrgency:
      "Fort Worth's UV load and temperature swings — from 105°F summer rooftop temperatures to sub-freezing winter nights — stress coating films more than in coastal climates. We specify coating systems with the flexibility and UV resistance to cycle through these extremes without chalking, cracking, or delaminating in Fort Worth's specific exposure profile.",
    faqs: [
      {
        question: "Can you coat a metal panel roof on our Alliance industrial building?",
        answer:
          "Metal panel roofs are excellent coating candidates — particularly with spray polyurethane foam over the substrate followed by a silicone topcoat. The foam seals every lap seam and penetration and adds meaningful R-value, while the silicone topcoat provides a fully seamless, waterproof surface. Projects typically deliver 15–20 year system warranties.",
      },
      {
        question: "How long does a coatings restoration take on a large Fort Worth warehouse?",
        answer:
          "A 100,000 sq ft warehouse typically takes 5–8 working days — significantly faster than a full replacement — and the building stays operational throughout. We seal sections in stages and never leave an open substrate overnight.",
      },
    ],
  },
  {
    citySlug: "frisco",
    serviceSlug: "coatings-restoration",
    intro:
      "Frisco's aging first-wave commercial roofs — retail centers and office parks built along the Tollway in the early 2000s — are prime candidates for coatings restoration. A properly executed silicone or acrylic restoration on a sound substrate delivers 10–15 additional years at 30–50% of full replacement cost, protects the asset through the next ownership cycle, and qualifies for a new manufacturer system warranty.",
    localDistricts: [
      "Dallas North Tollway Frisco office and retail corridor",
      "Preston Road commercial centers",
      "Frisco Square mixed-use and civic buildings",
    ],
    buildingContext:
      "Frisco's retail and office roofs from the early 2000s are predominantly TPO and EPDM single-ply systems that are approaching or past their original warranty terms. Many are still structurally sound — dry insulation, intact fasteners — but the membrane surface has oxidized and the flashings are beginning to fail. This is the ideal window for restoration: the substrate is salvageable and the restoration delivers maximum value before the roof deteriorates into replacement territory.",
    weatherUrgency:
      "Collin County hail accelerates membrane surface degradation. Oxidized and chalked membranes absorb hail impact differently than fresh single-ply — they crack rather than deflect. A coating applied over a sound membrane before hail season provides an additional impact-absorbing layer and significantly reduces the probability of penetrations from moderate hail events.",
    faqs: [
      {
        question: "Our Frisco retail center roof is 18 years old. Is restoration still an option?",
        answer:
          "Age alone doesn't disqualify a roof from restoration — condition and moisture content do. We'll perform a moisture scan and condition survey. If the insulation is dry and the membrane is intact (no open seams or exposed felt), restoration is likely the most cost-effective path.",
      },
      {
        question: "Does a Frisco coating restoration reset the insurance inspection clock?",
        answer:
          "A documented restoration with a new manufacturer system warranty typically satisfies carriers as evidence of a renewed roof envelope. Some Collin County carriers treat a restoration as equivalent to a new roof for underwriting purposes — we recommend asking your broker to verify before the project begins.",
      },
    ],
  },
  {
    citySlug: "plano",
    serviceSlug: "coatings-restoration",
    intro:
      "Plano's Class A office campuses and medical office buildings represent high-value real estate where a coatings restoration can defer a major capital expenditure by a decade or more. We apply silicone and acrylic restoration systems over properly prepared substrates, extending roof life with a new manufacturer warranty and a fully documented condition history that satisfies institutional lenders and property auditors.",
    localDistricts: [
      "Legacy West & Granite Park corporate towers",
      "Coit Road & Independence medical office corridor",
      "Shops at Legacy & upscale retail centers",
    ],
    buildingContext:
      "Plano's high-end commercial buildings have demanding coatings restoration requirements: the substrate must be confirmed completely dry, the application must not disrupt Class A tenants or medical operations, and the finished system must carry a manufacturer warranty acceptable to institutional property owners. We manage all three — moisture scanning before contract execution, phased application around tenant schedules, and full manufacturer warranty registration at project close.",
    weatherUrgency:
      "Plano's UV load — combined with the rooftop heat island effect on Class A office buildings with large HVAC arrays — degrades membranes faster than UV data alone would suggest. A white silicone coating reduces rooftop temperatures by 60–80°F, meaningfully extending HVAC system life on the buildings below in addition to protecting the membrane.",
    faqs: [
      {
        question: "Can a coatings restoration be applied without disrupting our Plano Class A tenants?",
        answer:
          "Yes. We stage the application in sections, working sections above unoccupied floors or during after-hours windows where tenants are sensitive. Silicone coatings applied correctly produce minimal odor and no VOC exposure inside the building.",
      },
      {
        question: "What warranty does a coating restoration carry on a Plano Class A office building?",
        answer:
          "10–15 year manufacturer system warranties are available from Firestone, Mule-Hide, and other approved restoration manufacturers, depending on the substrate condition and coating thickness applied. We specify and register the warranty as part of the project deliverables.",
      },
    ],
  },
  {
    citySlug: "mckinney",
    serviceSlug: "coatings-restoration",
    intro:
      "McKinney's commercial roof stock includes some of the best coatings restoration candidates in Collin County — older modified bitumen systems on downtown commercial buildings, aging single-ply on retail centers along US-380, and metal buildings in the industrial corridor that are ideal for spray polyurethane foam restoration. We assess every candidate with moisture scanning before recommending restoration so the investment is protected from day one.",
    localDistricts: [
      "Historic Downtown McKinney commercial and retail square",
      "US-380 commercial corridor retail and flex-industrial",
      "Craig Ranch medical campus adjacent commercial buildings",
    ],
    buildingContext:
      "McKinney's historic downtown buildings present a specialized restoration opportunity: older modified bitumen and built-up systems with sound substrates that have never been properly maintained. An acrylic or silicone coating applied over a cleaned and primed surface can add 10+ years at a fraction of the cost of a full replacement on a historic building where tear-off and re-decking would be significantly more complex and expensive.",
    weatherUrgency:
      "Collin County hail frequency makes impact resistance a key specification criterion for McKinney coating projects. We evaluate silicone systems with published hail impact ratings when specifying for McKinney properties, providing documentation that can support insurance premium reductions on properties that achieve FM or UL impact ratings with the restored assembly.",
    faqs: [
      {
        question: "Can you restore the roof on our historic McKinney downtown building with a coating?",
        answer:
          "Yes, provided the substrate passes moisture scanning. We apply coatings compatible with modified bitumen and built-up assemblies — including base and finish coats appropriate for the existing surface — and detail the historic parapet flashings so the restoration is comprehensive, not just a surface coat.",
      },
      {
        question: "What's the ROI on a coatings restoration versus replacement on a McKinney commercial building?",
        answer:
          "For a sound substrate, restoration typically costs 40–60% of replacement and extends life by 10–15 years. The break-even on that investment versus the deferred replacement capital is typically 2–4 years when energy savings are included.",
      },
    ],
  },
  {
    citySlug: "arlington",
    serviceSlug: "coatings-restoration",
    intro:
      "Arlington's enormous industrial roof footprint — hundreds of buildings in the Great Southwest district with metal panels, modified bitumen, and aging single-ply — makes it one of the best coatings restoration markets in the DFW Metroplex. At scale, restoration versus replacement on a 200,000 sq ft warehouse can save $500,000 or more in capital expenditure while delivering 10–15 additional years of service life with a new manufacturer warranty.",
    localDistricts: [
      "Great Southwest Industrial District warehouses & distribution centers",
      "North Arlington commercial and retail corridor",
      "Entertainment District hotels and stadium-adjacent buildings",
    ],
    buildingContext:
      "Arlington's industrial metal buildings are the most common and most cost-effective coatings restoration candidates in the market. Metal panel roofs with leaking lap seams are frequently misquoted for full replacement when a spray polyurethane foam restoration with a silicone topcoat would solve the problem at half the cost and provide better thermal performance. We provide honest condition assessments that recommend the right scope — not the largest scope.",
    weatherUrgency:
      "Arlington's position between two storm tracks means its large industrial roofs accumulate UV, hail, and thermal cycle stress at an accelerated rate. A fresh silicone coating on a sound substrate reflects 85%+ of solar radiation, reducing rooftop temperatures dramatically and slowing the thermal fatigue that degrades coating films and lap seam adhesion on uncoated metal roofs.",
    faqs: [
      {
        question: "Our Great Southwest warehouse has a leaking metal panel roof. Is restoration the right answer?",
        answer:
          "Often yes — we'll start with a moisture scan and lap seam inspection. If the substrate is dry and the panel profiles are structurally sound, spray polyurethane foam restoration seals every seam and penetration more reliably than re-caulking, and the silicone topcoat provides a 15–20 year NDL warranty. The project cost is typically half of a standing seam re-roof.",
      },
      {
        question: "Can you restore multiple Arlington warehouse roofs under a single project contract?",
        answer:
          "Yes — portfolio restoration projects across multiple Arlington buildings receive competitive pricing due to mobilization efficiency. We sequence projects to maintain production momentum and minimize crew transition time between buildings.",
      },
    ],
  },

  // ── FLAT ROOFING ─────────────────────────────────────────────────────────
  {
    citySlug: "dallas",
    serviceSlug: "flat-roofing",
    intro:
      "Virtually every large commercial building in Dallas — from high-bay warehouses in the Design District to multi-story medical office buildings near Parkland — has a flat or low-slope roof. We design and install flat roofing systems engineered for Dallas's specific combination of UV intensity, hail exposure, and ponding-water risk, backed by manufacturer NDL warranties from Firestone, Mule-Hide, and Duro-Last.",
    localDistricts: [
      "Design District warehouse & showroom buildings",
      "Medical District hospital systems & MOB campuses",
      "I-30 / I-20 distribution & logistics parks",
    ],
    buildingContext:
      "Dallas flat roofing projects range from 5,000 sq ft neighborhood retail pad sites to 400,000+ sq ft cold-storage distribution centers. Each requires a tailored approach: proper slope design for ponding prevention, correct insulation R-value for the occupancy type, and the right membrane system for the building's UV, traffic, and chemical exposure. We core-drill every Dallas flat roofing project to assess the existing assembly before specifying the new one.",
    weatherUrgency:
      "Dallas flat roofs collect more water per storm than any other roof geometry — and Dallas averages more than 40 inches of rain annually with a significant portion falling in high-intensity events. Proper drainage design is the most important flat roofing decision a Dallas building owner makes. We size primary and secondary drainage for 100-year storm events, not average annual rainfall.",
    faqs: [
      {
        question: "What flat roofing systems do you install in Dallas?",
        answer:
          "TPO, EPDM, and PVC single-ply (mechanically attached, fully adhered, or ballasted), built-up roofing (BUR), modified bitumen (torch-applied and cold-process), and spray polyurethane foam (SPF). System selection is driven by the building's use, drainage profile, traffic pattern, and owner's warranty preference.",
      },
      {
        question: "How do you address ponding water on Dallas flat roofs?",
        answer:
          "We assess the existing slope during our core-drill and drain survey. Where primary drains are inadequate, we add drains, install tapered insulation to direct water to existing drains, or specify a coating-grade membrane that tolerates intermittent ponding. The goal is zero standing water 48 hours after any storm event.",
      },
      {
        question: "What warranties are available on a Dallas flat roofing installation?",
        answer:
          "Manufacturer NDL (No Dollar Limit) warranties of 15, 20, 25, or 30 years from Firestone, Mule-Hide, and Duro-Last depending on the system and substrate. We also provide a separate craftsmanship warranty on our labor.",
      },
    ],
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "flat-roofing",
    intro:
      "Fort Worth's industrial and logistics sector has one of the highest concentrations of large flat roofs in the Metroplex. From AllianceTexas mega-distribution facilities to Near Southside manufacturing plants, we design and install flat roofing systems that handle the wind uplift requirements, drainage challenges, and occupancy-specific needs of Tarrant County's diverse commercial building inventory.",
    localDistricts: [
      "AllianceTexas industrial & logistics mega-facilities",
      "Near Southside manufacturing & warehouse district",
      "Sundance Square & downtown Fort Worth office and hospitality buildings",
    ],
    buildingContext:
      "Fort Worth flat roofing is dominated by large-scale industrial applications. Warehouses and distribution centers at Alliance can exceed 1,000,000 sq ft under a single roof — these projects require sophisticated phasing plans, advanced logistics for material delivery, and attachment designs engineered for Tarrant County's extreme wind uplift requirements. We have the experience and equipment to execute at this scale without interrupting operations.",
    weatherUrgency:
      "Tarrant County's wind uplift requirements are among the most demanding in Texas. Fort Worth's position in the open plains west of the Metroplex exposes large flat roofs to derechos and severe thunderstorm wind events that regularly exceed design speed. We specify attachment densities above code minimum on Fort Worth flat roofing projects to build in safety factor for the real wind environment.",
    faqs: [
      {
        question: "Can you install a flat roof on a Fort Worth distribution center that operates 24/7?",
        answer:
          "Yes — phased flat roofing installation on occupied industrial facilities is a Fort Worth specialty. We sequence tear-off and installation section by section with daily dry-in, so no part of the building is ever left with an open deck and operations never stop.",
      },
      {
        question: "What flat roofing system performs best on Fort Worth's large industrial buildings?",
        answer:
          "For large Tarrant County industrial buildings, mechanically attached 60-mil or 80-mil TPO is the most cost-effective system that meets all wind uplift and warranty requirements. Heavy-duty mechanically attached assemblies can be designed to exceed FM 1-90 and 1-120 uplift requirements for the most exposed Alliance-area facilities.",
      },
    ],
  },
  {
    citySlug: "frisco",
    serviceSlug: "flat-roofing",
    intro:
      "Frisco's booming commercial construction market — new Class A office towers, lifestyle retail centers, mixed-use developments, and sports and entertainment facilities along the Tollway — demands flat roofing systems specified for the long term, not just the lowest initial cost. We work with Frisco developers, general contractors, and building owners to engineer and install flat roofing systems that deliver 20–30 year service life with manufacturer NDL warranty backing.",
    localDistricts: [
      "Dallas North Tollway Frisco new construction corridor",
      "The Star & Fields development zone",
      "Frisco Square mixed-use civic and retail buildings",
    ],
    buildingContext:
      "Frisco's new construction flat roofing market requires tight coordination with general contractors and MEP trades — rooftop HVAC equipment placement, solar-ready substrate requirements, and green roof assemblies are increasingly common on Frisco's Class A projects. We bring design-assist capability to the table early in the project so the flat roofing system integrates correctly with the building systems above and below.",
    weatherUrgency:
      "New flat roofing in Collin County must be specified for Class 4 hail impact resistance — the insurance market increasingly requires it, and Frisco's hail exposure makes it the right call regardless. We specify Class 4 impact-rated assemblies as the default on Frisco flat roofing installations and provide the documentation package your insurance broker needs.",
    faqs: [
      {
        question: "Do you work with Frisco general contractors on new commercial construction flat roofing?",
        answer:
          "Yes — we provide design-assist services during pre-construction, work under the GC's coordination schedule, and deliver manufacturer warranty documentation at substantial completion. We're comfortable with Procore, Bluebeam, and the typical GC documentation requirements for Frisco commercial projects.",
      },
      {
        question: "Can you install a green roof or solar-ready assembly on a new Frisco commercial building?",
        answer:
          "Yes. We install protected membrane assemblies (IRMA) for green roof applications and can coordinate the waterproofing layer with the landscape or solar contractor's requirements. We also provide ballast-free, penetration-free solar-ready substrates for standing seam solar mount systems.",
      },
    ],
  },
  {
    citySlug: "plano",
    serviceSlug: "flat-roofing",
    intro:
      "Plano's Class A office campuses and medical office buildings set a high bar for flat roofing performance — no interior events, minimal tenant disruption during installation, and long-term warranty documentation that satisfies institutional investors. We engineer and install flat roofing systems for Plano's most demanding properties with that standard as our baseline, not our stretch goal.",
    localDistricts: [
      "Legacy West & Granite Park corporate office towers",
      "Medical corridor buildings along Coit and Independence",
      "Plano US-75 office campus corridor",
    ],
    buildingContext:
      "Plano flat roofing installations on occupied Class A properties require a level of coordination that goes beyond standard commercial roofing. Tenant notifications, access control for crews working above leased floors, low-odor adhesive specifications near sensitive medical areas, and daily close-out protocols are part of every Plano flat roofing project we execute. We bring that operational discipline as standard practice.",
    weatherUrgency:
      "Plano's Collin County location subjects flat roofs to the highest hail frequency in the DFW metro. We specify Class 4 impact-rated assemblies on every Plano flat roofing installation — the combination of FM-approved cover board and 60-mil or heavier single-ply provides demonstrated resistance to the golf-ball and baseball-sized hail that Collin County produces every spring season.",
    faqs: [
      {
        question: "How do you coordinate a flat roof installation above occupied Plano Class A office floors?",
        answer:
          "Pre-project: written tenant notification, crew access protocol review, and a daily schedule shared with the property manager. During project: section-by-section installation with same-day close-out, no open deck overnight, low-odor materials above sensitive areas, and a daily summary to the property management team.",
      },
      {
        question: "What flat roofing warranty is appropriate for a Plano institutional office building?",
        answer:
          "For institutional-grade assets, we recommend a 25 or 30-year manufacturer NDL warranty from Firestone or Duro-Last, combined with a 5-year labor warranty. This warranty package meets most institutional lender requirements and is acceptable to the major commercial property carriers active in the Collin County market.",
      },
    ],
  },
  {
    citySlug: "mckinney",
    serviceSlug: "flat-roofing",
    intro:
      "McKinney's fast-growing commercial market spans a wide range of flat roofing needs — historic downtown buildings that need careful tear-off and assembly-matched replacement, new Craig Ranch medical campuses requiring precision installation, and US-380 corridor industrial buildings where cost-per-square-foot and operational uptime both matter. We serve the full spectrum with the right approach for each building type.",
    localDistricts: [
      "Historic Downtown McKinney commercial district",
      "Craig Ranch medical and corporate campus",
      "US-380 commercial and industrial corridor",
    ],
    buildingContext:
      "McKinney's historic downtown buildings require flat roofing approaches that respect existing parapet heights and architectural details — tear-off must be carefully managed to avoid disturbing the masonry, and flashing details must match the historic character. Craig Ranch medical buildings demand precision installation around dense rooftop mechanical equipment. US-380 industrial buildings need cost-effective systems with strong wind uplift performance for northern Collin County's exposure profile.",
    weatherUrgency:
      "Northern Collin County is at the leading edge of the DFW hail corridor — McKinney flat roofs absorb some of the highest annual hail impact loads in the metro area. We specify impact-rated assemblies on all McKinney flat roofing projects and provide the FM impact classification documentation that qualifies buildings for insurance premium reductions.",
    faqs: [
      {
        question: "We're replacing the flat roof on our 1920s McKinney downtown building. What system do you recommend?",
        answer:
          "Fully adhered EPDM or TPO over a cover board, with custom-fabricated metal flashings that match the historic parapet height and profile. Fully adhered systems require no fasteners through the historic deck and provide excellent performance on the irregular substrates common in older McKinney downtown buildings.",
      },
      {
        question: "How do flat roofing costs compare between new construction and replacement in McKinney?",
        answer:
          "New construction flat roofing is typically 15–25% less expensive per square foot than replacement because there's no tear-off cost. Replacement projects also add deck repair labor and materials if the substrate is compromised. We provide transparent line-item quotes so you can see every component.",
      },
    ],
  },
  {
    citySlug: "arlington",
    serviceSlug: "flat-roofing",
    intro:
      "Arlington has more flat roofing square footage than almost any other DFW city — the Great Southwest Industrial District alone contains millions of square feet of low-slope commercial roof across distribution centers, manufacturing plants, and warehouses. We install and replace flat roofing systems at this scale with phased execution plans that keep operations running throughout the project.",
    localDistricts: [
      "Great Southwest Industrial District mega-warehouses & distribution centers",
      "Entertainment District hotels, arenas & retail",
      "UT Arlington campus & surrounding commercial buildings",
    ],
    buildingContext:
      "Arlington flat roofing at industrial scale demands a different approach than a typical commercial project. Material delivery logistics, crane placement for large HVAC equipment, sequenced tear-off and installation across active logistics floors, and FOD protocols on facilities adjacent to heavy equipment operations are all standard considerations for Great Southwest district projects. We have the equipment and planning capacity to manage them.",
    weatherUrgency:
      "Arlington's large flat roofs are the most exposure-intensive in the Metroplex — massive surface areas catching UV, hail, and thermal cycling with no topographic protection. We size every Arlington flat roofing installation for the worst-case storm event rather than average annual conditions, specifying attachment densities and membrane weights that provide meaningful margin above code minimum requirements.",
    faqs: [
      {
        question: "Can you re-roof a 250,000 sq ft Arlington warehouse while it stays open?",
        answer:
          "Yes — we have completed multiple projects at this scale in the Great Southwest district without halting a shift. The project is divided into daily installation sections, each dried in completely before the crew leaves that evening. Operations continue below throughout the project.",
      },
      {
        question: "What are the wind uplift requirements for flat roofing in Arlington?",
        answer:
          "Arlington falls in the ASCE 7 wind zone that requires designs meeting FM 1-60 minimum and typically 1-90 for most commercial roof configurations. We calculate uplift requirements based on building height, roof zone, and exposure category and specify attachment to exceed those requirements.",
      },
    ],
  },

  // ── METAL ROOFING ────────────────────────────────────────────────────────
  {
    citySlug: "dallas",
    serviceSlug: "metal-roofing",
    intro:
      "Standing seam metal roofing is the highest-durability, longest-service-life option available for Dallas commercial buildings — 40-to-60-year lifespans, Class 4 hail resistance, and excellent energy performance. From Design District adaptive reuse buildings to new corporate campuses in the northern suburbs, we install and restore commercial metal roofing systems designed for Dallas's hail exposure and UV intensity.",
    localDistricts: [
      "Design District adaptive reuse & creative office buildings",
      "Medical District and hospital campus facilities",
      "North Dallas & Park Cities corporate and institutional buildings",
    ],
    buildingContext:
      "Dallas metal roofing spans new construction standing seam on corporate campuses to retrofit standing seam over existing low-slope assemblies. We also restore aging Dallas metal panel roofs — lap seam re-caulking, panel replacement, and spray polyurethane foam restoration — as cost-effective alternatives to full re-roofing when the panel structure is still sound.",
    weatherUrgency:
      "Dallas's hail environment makes Class 4 impact rating a strong argument for metal roofing — a standing seam metal roof rated Class 4 can qualify for significant property insurance discounts in Dallas County, where hail claims drive the highest commercial roofing insurance losses in Texas. We provide the Class 4 impact certification documentation your carrier needs.",
    faqs: [
      {
        question: "What types of commercial metal roofing do you install in Dallas?",
        answer:
          "Standing seam (snap-lock and mechanically seamed), exposed-fastener metal panels, metal shingle systems, and retrofit standing seam over existing low-slope roofs. System selection depends on the building's architectural requirements, budget, and long-term ownership horizon.",
      },
      {
        question: "Can metal roofing be installed over our existing Dallas flat roof assembly?",
        answer:
          "Often yes — a retrofit standing seam system installed over a structurally sound existing roof eliminates tear-off cost, adds slope for drainage, and provides a 40-year service life. We assess the existing assembly's load capacity and attachment points before recommending this approach.",
      },
      {
        question: "Does Dallas commercial metal roofing qualify for energy tax credits?",
        answer:
          "Reflective metal roofing with Energy Star or Cool Roof Rating Council certification qualifies for federal energy efficiency incentives under current IRS guidance for commercial properties. We can provide the product certification documentation your CPA needs.",
      },
    ],
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "metal-roofing",
    intro:
      "Metal roofing has dominated Fort Worth's industrial and manufacturing building stock for decades — and it remains the preferred system for new industrial construction in the AllianceTexas corridor. We install, repair, and restore commercial metal roofing across all of Tarrant County, from standing seam on new manufacturing facilities to spray polyurethane foam restoration on aging exposed-fastener panels.",
    localDistricts: [
      "AllianceTexas industrial & aerospace manufacturing corridor",
      "Near Southside manufacturing and warehouse district",
      "West Fort Worth industrial and commercial properties",
    ],
    buildingContext:
      "Tarrant County's industrial metal roofing market is one of the largest in Texas. Exposed-fastener metal panels on aging Fort Worth warehouses are the most common restoration project — failing lap seam caulk and backed-out fasteners create widespread small leaks that traditional re-caulking fails to solve permanently. We offer spray polyurethane foam restoration as a definitive fix: foam seals every seam and penetration, and a silicone topcoat provides a 15–20 year system warranty.",
    weatherUrgency:
      "Fort Worth's straight-line wind events — particularly the derechos that roll in from the west during spring and fall — create the highest fastener pull-out and panel uplift risk in the Metroplex. We design Fort Worth metal roofing attachment for the ASCE 7 wind exposure appropriate to each building's location and height, not just code minimum.",
    faqs: [
      {
        question: "Our Fort Worth warehouse has an exposed-fastener metal panel roof that leaks at every lap seam. What's the best fix?",
        answer:
          "Spray polyurethane foam restoration is the most durable solution for lap seam leaks on Fort Worth metal buildings. Foam adheres to the panel and fills the seam completely — there's nothing to back out or crack over time the way re-caulked fasteners do. A silicone topcoat finishes the system with a 15–20 year manufacturer warranty.",
      },
      {
        question: "Can you install new standing seam metal roofing on an Alliance industrial facility?",
        answer:
          "Yes. We install Berridge, MBCI, and other commercial-grade standing seam systems on new Fort Worth industrial construction and on retrofit applications over existing low-slope assemblies. Alliance-area projects receive our full FOD-compliant protocol for aerospace-adjacent facilities.",
      },
    ],
  },
  {
    citySlug: "frisco",
    serviceSlug: "metal-roofing",
    intro:
      "Frisco's upscale commercial and mixed-use development along the Tollway corridor increasingly specifies standing seam metal roofing for its architectural character, longevity, and Class 4 hail rating. We install commercial metal roofing systems on Frisco's new construction projects and restore aging metal panel systems on earlier Frisco commercial buildings, delivering manufacturer-warranted systems designed for Collin County's hail environment.",
    localDistricts: [
      "Dallas North Tollway Frisco mixed-use & corporate campuses",
      "The Star development and Fields district",
      "Frisco Square civic and retail buildings",
    ],
    buildingContext:
      "Frisco commercial metal roofing spans standing seam architectural systems on Class A mixed-use buildings to exposed-fastener panels on retail and light commercial structures. New Frisco construction increasingly specifies metal for its 40–60 year service life and Class 4 impact rating — ownership groups and institutional investors recognize that the higher upfront cost is justified by the dramatically lower life-cycle cost compared to single-ply systems on a 30-year hold.",
    weatherUrgency:
      "Collin County's hail frequency makes Class 4 impact-rated metal roofing the most logical long-term choice for Frisco commercial property owners. A standing seam metal roof with Class 4 rating can reduce annual property insurance premiums by 20–30% with Collin County carriers — a discount that starts reducing the premium cost differential between metal and single-ply from year one.",
    faqs: [
      {
        question: "How does the long-term cost of metal roofing compare to TPO on a Frisco commercial building?",
        answer:
          "Over a 40-year ownership horizon, standing seam metal typically costs less per year than TPO when the TPO's two replacement cycles are included. The higher upfront cost of metal is offset by zero replacement cycles and lower maintenance costs — and the Class 4 insurance premium discount adds to the economic case.",
      },
      {
        question: "What metal roofing systems are suitable for Frisco's Class A mixed-use buildings?",
        answer:
          "Mechanically seamed standing seam in Galvalume, painted steel, or aluminum for architectural applications. For energy performance, we specify high-reflectivity Kynar 500 coatings that achieve Energy Star certification and the Cool Roof Rating Council values that qualify for commercial energy incentives.",
      },
    ],
  },
  {
    citySlug: "plano",
    serviceSlug: "metal-roofing",
    intro:
      "Plano's high-end commercial real estate market — Fortune 500 corporate campuses, medical office buildings, and upscale retail centers — is increasingly specifying standing seam metal roofing for its combination of architectural quality, 40–60 year service life, and Class 4 hail resistance. We install and restore commercial metal roofing systems across Plano with the operational precision that Class A occupied buildings require.",
    localDistricts: [
      "Legacy West & Granite Park corporate campuses",
      "Shops at Legacy & upscale retail and dining",
      "Medical office corridor along Coit and Independence",
    ],
    buildingContext:
      "Plano metal roofing installations on high-end corporate properties carry strict aesthetic and operational requirements. Panel profiles, coating colors, and seam detailing must satisfy architectural review and corporate brand standards. Crew access, noise management, and daily close-out protocols must satisfy property management requirements for Class A occupied buildings. We deliver on both the technical and operational requirements.",
    weatherUrgency:
      "Collin County hail is the top property insurance risk for Plano commercial building owners. A Class 4 impact-rated standing seam metal roof is one of the most effective risk-management tools available — providing documented impact resistance that qualifies for meaningful insurance premium reductions while delivering a roof that demonstrably outlasts the hail events that trigger single-ply replacement cycles.",
    faqs: [
      {
        question: "Can you match the panel profile and color of existing metal roofing on our Plano corporate campus expansion?",
        answer:
          "Yes. We source panels from the same manufacturers as common original installations on Plano corporate campuses and can match Kynar 500 color formulations to existing panels with high precision. For expansions adjacent to existing metal roofing, color and profile matching is part of our standard pre-construction process.",
      },
      {
        question: "How long does a commercial metal roofing installation take on a Plano Class A building?",
        answer:
          "A 20,000–40,000 sq ft standing seam installation typically takes 3–4 weeks from first crew on-site. We sequence around occupied floors and provide daily progress summaries to property management so tenant communications are coordinated throughout.",
      },
    ],
  },
  {
    citySlug: "mckinney",
    serviceSlug: "metal-roofing",
    intro:
      "McKinney's mix of historic commercial buildings, modern medical campuses, and growing industrial corridor creates a diverse metal roofing market. We install new standing seam systems on McKinney's new construction, restore aging exposed-fastener metal panels on industrial buildings along US-380, and carefully detail metal flashings on historic downtown buildings where the roofing is an integral part of the building's architectural character.",
    localDistricts: [
      "Historic Downtown McKinney commercial district",
      "US-380 commercial and light-industrial corridor",
      "Craig Ranch medical campus and adjacent development",
    ],
    buildingContext:
      "McKinney's historic downtown buildings present the most technically demanding metal roofing work in the market — copper or painted steel coping caps on historic parapets, custom-fabricated gravel stops on aging built-up assemblies, and standing seam sections on dormers and canopies that must match the building's architectural period. We fabricate custom metal roofing components in-house for McKinney's historic projects.",
    weatherUrgency:
      "Northern Collin County's position at the leading edge of the DFW hail corridor makes impact-rated metal roofing especially valuable for McKinney property owners. Class 4 standing seam metal roofing on a McKinney commercial building can produce the highest insurance premium discounts available to a Collin County property owner — we document the impact classification for every McKinney metal roofing installation.",
    faqs: [
      {
        question: "Can you install custom metal roofing details on our historic McKinney downtown building?",
        answer:
          "Yes — we fabricate custom coping caps, gravel stops, and standing seam sections to match historical profiles and dimensions. Our McKinney historic building work includes copper and pre-patinated metal details that respect the building's original architectural character.",
      },
      {
        question: "Our US-380 industrial building has an old exposed-fastener metal roof. What are my options?",
        answer:
          "Three paths: re-caulk and re-fastener (shortest-term fix, rarely holds more than 5 years), spray polyurethane foam restoration with silicone topcoat (15–20 year warranted solution at half the cost of re-roofing), or full standing seam re-roof (40–60 year solution). We'll assess the panel condition and give you a straight comparison of all three.",
      },
    ],
  },
  {
    citySlug: "arlington",
    serviceSlug: "metal-roofing",
    intro:
      "Arlington's massive industrial roof footprint includes more exposed-fastener metal panel square footage than almost any other DFW city. Leaking lap seams and backed-out fasteners are the most common roofing complaint in the Great Southwest district — and we offer three levels of metal roofing response, from targeted restoration to full standing seam re-roof, scaled to your building's condition and ownership horizon.",
    localDistricts: [
      "Great Southwest Industrial District warehouses & manufacturing plants",
      "Entertainment District hotels & stadium venues",
      "North Arlington commercial retail and office corridor",
    ],
    buildingContext:
      "Arlington metal roofing at industrial scale involves buildings with 100,000–500,000 sq ft of exposed-fastener panels installed during the Great Southwest district's build-out in the 1980s and 1990s. These roofs are 25–40 years old and increasingly at or past their design life — but many still have structurally sound panels that are restoration candidates rather than replacement requirements. We provide honest condition assessments that tell you which path is right for your building.",
    weatherUrgency:
      "Arlington's wind exposure and thermal cycling create accelerated fastener pull-out on aging metal panel roofs. Backed-out fasteners create hundreds of small penetrations that allow water entry at every fastener location — and re-caulking is not a durable fix in Arlington's thermal environment. Spray polyurethane foam restoration encapsulates every fastener head and seam in a monolithic waterproof layer that doesn't fail from thermal movement.",
    faqs: [
      {
        question: "How do I know if my Arlington metal roof needs restoration or full replacement?",
        answer:
          "The key factors are panel structural integrity and moisture content in the insulation below. We perform a panel condition inspection and moisture scan. If the panels are flat, fastener pull-out is moderate, and the insulation is dry, restoration is the right call. If panels are significantly oil-canned, the deck below has moisture, or more than 20% of fasteners are backed out, re-roofing is the more cost-effective long-term choice.",
      },
      {
        question: "Can you restore a 300,000 sq ft Arlington metal roof while the distribution center operates?",
        answer:
          "Yes — spray polyurethane foam and silicone restoration is applied from above with no interior disruption. The facility continues operating normally throughout. We section the roof and maintain a buffer zone around any active exhaust or fresh-air intake equipment during application.",
      },
    ],
  },
];

export const serviceCityByKey = Object.fromEntries(
  serviceCityData.map((entry) => [`${entry.citySlug}--${entry.serviceSlug}`, entry]),
);

export function getServiceCityEntry(
  citySlug: string,
  serviceSlug: string,
): ServiceCityEntry | undefined {
  return serviceCityByKey[`${citySlug}--${serviceSlug}`];
}

export function getCityServiceEntries(citySlug: string): ServiceCityEntry[] {
  return serviceCityData.filter((e) => e.citySlug === citySlug);
}

export function getServiceCityEntries(serviceSlug: string): ServiceCityEntry[] {
  return serviceCityData.filter((e) => e.serviceSlug === serviceSlug);
}

export const SERVICE_CITY_SERVICE_LABELS: Record<string, string> = {
  repair: "Commercial Roof Repair",
  replacement: "Full Roof Replacement",
  "tpo-epdm-pvc": "TPO / EPDM / PVC Membranes",
  "emergency-leak-repair": "Emergency Leak Repair",
  maintenance: "Roof Maintenance Programs",
  "coatings-restoration": "Coatings & Restoration",
  "flat-roofing": "Flat & Low-Slope Roofing",
  "metal-roofing": "Commercial Metal Roofing",
};

export const SERVICE_CITY_SERVICE_SHORT: Record<string, string> = {
  repair: "Roof Repair",
  replacement: "Roof Replacement",
  "tpo-epdm-pvc": "Membrane Systems",
  "emergency-leak-repair": "Emergency Leak Repair",
  maintenance: "Roof Maintenance",
  "coatings-restoration": "Roof Coatings",
  "flat-roofing": "Flat Roofing",
  "metal-roofing": "Metal Roofing",
};
