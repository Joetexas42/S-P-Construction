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
};

export const SERVICE_CITY_SERVICE_SHORT: Record<string, string> = {
  repair: "Roof Repair",
  replacement: "Roof Replacement",
  "tpo-epdm-pvc": "Membrane Systems",
  "emergency-leak-repair": "Emergency Leak Repair",
};
