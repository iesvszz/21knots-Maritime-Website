<script>
/* ==========================================================================
   CONTENT — every word on the site lives here.
   Edit this object (or replace it with a CMS fetch) and every page updates.
   ========================================================================== */
const CONTENT = {
  company: {
    name: "21 Knots",
    legal: "21 Knots Design and Consulting Pvt. Ltd",
    tagline: "Design, engineering and consulting for the global maritime and oil & gas industry.",
    blurb: "21 Knots is a global design, engineering and consulting firm for the maritime and oil & gas industries, delivering multidisciplinary engineering solutions since 2014.",
    email: "info@21-knots.com",
    careersEmail: "careers@21-knots.com",
    iso: "ISO 9001:2015",
    socials: [
      { name: "LinkedIn", href: "https://www.linkedin.com/company/3706553/", icon: "in" },
      { name: "X (Twitter)", href: "https://twitter.com/team21knots", icon: "x" },
      { name: "Facebook", href: "https://www.facebook.com/pages/category/Business-Consultant/21-Knots-Design-Consulting-Pvt-Ltd-1491819907712916/", icon: "fb" }
    ]
  },

  hero: {
    title: "Marine and offshore engineering, from concept to commissioning.",
    sub: "Ship design, offshore structures and green retrofits for ship owners, shipyards and energy operators. In-house naval architects and engineers, class-approved designs, delivered from India, Singapore and the UAE.",
    slides: [
      { text: "A global marine and offshore group, engineering fixed platforms and floaters.", link: "fixed-platform-floaters", label: "Fixed platforms & floaters" },
      { text: "A proven track record with ship owners and oil & gas clients worldwide.", link: "projects", label: "See projects" },
      { text: "Sustainable, greener solutions for fleets working toward IMO 2050.", link: "green-services", label: "Green services" }
    ]
  },

  intro: "We are a global design, engineering and consulting firm for the maritime and oil & gas industries. Our expertise spans design and engineering, inspections, supervision and surveys, while Zeroqu helps clients achieve sustainable operations and compliance.",

  facts: [
    { n: 200, suffix: "+", label: "People across the 21 Knots group" },
    { n: 4, suffix: "", label: "Group companies across India, Singapore, the UAE and the Netherlands" },
    { n: 3, suffix: "", label: "Engineering offices in Thane, Singapore and Ajman" },
    { text: "ISO", label: "9001:2015 certified quality management system" }
  ],

  disciplines: ["Naval architecture", "Structural design", "Offshore engineering", "Conversions & retrofits", "EEXI & CII", "Transportation & installation", "Subsea engineering", "3D laser scanning", "Production design", "Decommissioning", "Electrical design", "On-site supervision"],

  /* the six capabilities from the original home page */
  capabilities: [
    { title: "Naval Architecture", art: "bodyplan", link: "naval-architecture", text: "Hull form, stability, resistance and powering, seakeeping and DP capability, through to harbour and sea trials." },
    { title: "Green Services", art: "scrubber", link: "green-services", text: "EEXI and CII compliance, ballast water and scrubber retrofits, and green ship recycling for fleets working toward IMO 2050." },
    { title: "On-Site Services", art: "scan", link: "on-site-services", text: "Marine construction, installation supervision, dry docking assistance, surveys and inspections at yards and on sailing vessels." },
    { title: "Conversions & Retrofits", art: "hull", link: "conversions-retrofits", text: "3D laser scanning, feasibility, basic and detailed engineering, class and flag liaison, and project management." },
    { title: "Offshore Engineering", art: "jacket", link: "fixed-platform-floaters", text: "Fixed platforms and floaters from basic to detailed design, approved by the major classification societies." },
    { title: "Transportation & Installation", art: "barge", link: "transportation-installation", text: "Sea fastening, motion analysis, jacket launch, lifting, upending and loadout engineering for offshore EPC projects." }
  ],

  /* ship design sequence — a true process, so it is numbered */
  process: [
    { title: "Concept design", text: "Define the mission, operating profile and regulatory constraints, then shape a vessel that answers them.", items: ["Mission profile", "Main dimensions, speed, propulsion", "Initial hull form and GA", "Early stability and weights"] },
    { title: "Basic design", text: "Calculations and drawings that carry the design through class and flag approval.", items: ["Hull structure", "Stability and hydrodynamics", "Machinery, piping, electrical", "Class and flag approvals"] },
    { title: "Production design", text: "3D models, drawings and material lists the yard can cut, weld and assemble from.", items: ["3D model and build strategy", "Assembly and nesting drawings", "Spools, isometrics, MTOs", "Cable tray and HVAC layouts"] }
  ],

  green: {
    title: "Fleets have until 2050. The engineering starts now.",
    text: "Climate change keeps pushing operators to upgrade fleets for efficiency and emissions control. We engineer retrofits that install fast, with minimal change to existing arrangements, staged so a yard or the crew can fit them.",
    items: [
      { k: "EEXI technical files", v: "Attained and required" },
      { k: "Onboard Management Manual", v: "For OPL / shaft power limitation" },
      { k: "Ballast water treatment", v: "Retrofit engineering" },
      { k: "Exhaust gas scrubbers", v: "Retrofit engineering" },
      { k: "Inventory of Hazardous Materials", v: "Certified IHM surveyors" }
    ]
  },

  projects: [
    { slug: "exhaust-gas-scrubber-retrofit", title: "Exhaust Gas Scrubber Retrofit", client: "European equipment provider in the marine and energy markets", category: "Green retrofit", art: "scrubber", services: ["green-services", "conversions-retrofits"], oldUrl: "/exhaust-gas-scrubber-retrofit/", img: "", body: [] },
    { slug: "ballast-water-treatment-system-retrofit", title: "Ballast Water Treatment System Retrofit", client: "European shipping company", category: "Green retrofit", art: "bwts", services: ["green-services", "conversions-retrofits"], oldUrl: null, img: "", body: [] },
    { slug: "modular-catamaran-design", title: "Modular Catamaran Design", client: "Machinery and pumping solutions company", category: "Ship design", art: "catamaran", services: ["design-services"], oldUrl: "/modular-catamaran-design/", img: "", body: [] },
    { slug: "cargo-hold-modification", title: "Cargo Hold Modification", client: "US coastal logistics company", category: "Conversion", art: "hold", services: ["design-services", "conversion-design"], oldUrl: "/cargo-hold-modification/", img: "", body: [] }
  ],

  offices: [
    { city: "Thane, India", label: "India (HQ)", geo: [19.21, 72.98], role: "Headquarters", tz: "Asia/Kolkata", zone: "IST, UTC+5:30", address: "1109, Lodha Supremus, Lodha Business Park, Kolshet Road, Thane 400607", phones: ["+91 22 4606 0604", "+91 99676 13005"], email: "info@21-knots.com", entity: "21 Knots Design and Consulting Pvt. Ltd" },
    { city: "Singapore", label: "Singapore", geo: [1.44, 103.79], role: "Regional office", tz: "Asia/Singapore", zone: "SGT, UTC+8", address: "12 Woodlands Square, #12-85, Woods Square, Singapore 737715", phones: ["+65 9778 4324"], email: "singapore@21-knots.com", entity: "21 Knots Design and Operations Pte. Ltd" },
    { city: "Ajman, UAE", label: "UAE", geo: [25.41, 55.44], labelLeft: true, role: "Regional office", tz: "Asia/Dubai", zone: "GST, UTC+4", address: "A1-317D, AFZ A1, Ajman Free Zone, UAE", phones: ["+971 50 816 4632"], email: "info@21-knots.com", entity: "21 Knots Marine and Offshore Consultants FZE" },
    { city: "Rotterdam, Netherlands", label: "Netherlands", geo: [51.92, 4.48], role: "Zeroqu Solutions BV", tz: "Europe/Amsterdam", zone: "CET", address: "Wilhelminaplein 1-40, 3072 Rotterdam, Netherlands", phones: [], email: "hello@zeroqu.com", entity: "Zeroqu Solutions BV", web: "https://zeroqu.com" },
    { city: "New Jersey, USA", label: "New Jersey", geo: [40.59, -74.31], role: "Regional office", tz: "America/New_York", zone: "ET, UTC−5", address: "15 Prospect Lane, Suite 2AB, Colonia, New Jersey 07067, USA", phones: [], email: "info@21-knots.com", entity: "21 Knots, USA" }
  ],

  group: [
    { name: "21 Knots Design and Consulting Pvt. Ltd", code: "IN", city: "Thane", place: "1101, Lodha Supremus-B, Kolshet Road, Thane (W) 400604, India" },
    { name: "21 Knots Design and Operations Pte. Ltd", code: "SG", city: "Singapore", place: "05-24, AZ Building, 140 Paya Lebar Road, Singapore" },
    { name: "21 Knots Marine and Offshore Consultants FZE", code: "AE", city: "Ajman", place: "A1-317D, AFZ A1, Ajman Free Zone, UAE" },
    { name: "Zeroqu Solutions BV", code: "NL", city: "Rotterdam", place: "Wilhelminaplein 1-40, 3072 Rotterdam, Netherlands", href: "https://zeroqu.com" },
    { name: "21 Knots, USA", code: "US", city: "New Jersey", place: "15 Prospect Lane, Suite 2AB, Colonia, New Jersey 07067, USA" }
  ],

  team: [
    { title: "Naval architects", text: "Hull form, stability, hydrodynamics, seakeeping and trials." },
    { title: "Structural engineers", text: "Scantlings, FE analysis, fatigue and production-friendly structure." },
    { title: "Electrical engineers", text: "Load analysis, single-line diagrams, switchboards and cable design." },
    { title: "Marine engineers", text: "Machinery, piping, process and outfitting systems." }
  ],



  /* ---------- from the company presentation (2026) ---------- */
  since: 2014,
  pillars: ["Design & Engineering", "Testing & Inspection", "Consulting & Solutions"],
  credentials: [
    { k: "Operations", v: "Since 2014, delivering multidisciplinary engineering solutions globally." },
    { k: "Classification societies", v: "Experienced in working with ClassNK, RINA, DNV, IRS, ABS, LR and BV." },
    { k: "Security compliance", v: "Strict adherence to IT compliance standards with robust data security measures." },
    { k: "Certification", v: "ISO 9001:2015 certified quality management system." }
  ],
  classSocieties: ["ClassNK", "RINA", "DNV", "IRS", "ABS", "LR", "BV"],
  clientSegments: [
    { t: "Containers", art: "hull" }, { t: "Bulk carriers", art: "hold" }, { t: "Tankers", art: "bodyplan" },
    { t: "Offshore", art: "jacket" }, { t: "Cruise", art: "catamaran" }, { t: "Shipyards", art: "crane" }
  ],
  portfolios: [
    { title: "Fleet Technical Support", text: "Hands-on support for vessels in service, from dry dock to delivery.", art: "scan",
      items: [["Dry docking", "dry-docking-assistance"], ["UTM services", "surveys-inspections"], ["Ship inspections", "inspections-and-surveys"], ["Repairs & maintenance", "marine-construction"], ["Newbuild supervision", "installation-supervision"]] },
    { title: "Design & Engineering", text: "Naval architecture and engineering for ships, offshore and oil & gas assets.", art: "bodyplan",
      items: [["Ship design", "design-services"], ["Offshore engineering", "offshore-engineering-design"], ["Oil & gas engineering", "oil-gas-engineering"], ["Advanced engineering", "advance-engineering-solutions"], ["Design software solutions", "software-solutions"]] },
    { title: "Zeroqu Maritime Software", text: "Data and software for greener, more efficient fleet operations.", art: "grid", logo: "%%ZEROQU%%",
      items: [["Vessel performance", "software-solutions"], ["Emissions insights", "eexi-cii"], ["Hull & propeller analytics", "software-solutions"], ["Voyage optimisation", "software-solutions"], ["Compliance support", "green-services"]] }
  ],
  reach: "India-based core team with offices in Singapore, the UAE, Rotterdam and New Jersey. Projects across the USA, Europe, the Middle East and South East Asia.",

  /* ---------- About page: journey, values, team ---------- */
  journey: {
    title: "Growth journey",
    sub: "A journey of innovation and progress.",
    milestones: [
      { year: "2014", title: "Inception", text: "A modest beginning with a strong ambition to make an impact in the field of naval architecture.", where: ["Mumbai, India"], art: ["bodyplan", "hull"], links: [["Ship design services", "design-services"], ["Naval architecture", "naval-architecture"]] },
      { year: "2016", title: "Green shipping services", text: "Green ship recycling and sustainability consulting for owners, recycling facilities and shipyards, with a team certified for Inventory of Hazardous Materials surveys.", art: ["scan"], links: [["Green services", "green-services"], ["Green ship recycling", "green-ship-recycling"]] },
      { year: "2017", title: "Entry into dry docking services", text: "Support for owners and class surveyors through special surveys and dockings for all vessel types: pre-docking inspections, yard supervision, QC witnessing and class comment close-out.", art: ["crane"], links: [["Dry docking assistance", "dry-docking-assistance"]] },
      { year: "2019", title: "BWTS & scrubbers", text: "Retrofit engineering for ballast water treatment systems and exhaust gas scrubbers, from 3D laser scanning and feasibility to detailed design, class approval and installation support.", art: ["bwts", "scrubber"], links: [["Ballast water treatment retrofit", "ballast-water-treatment-system-retrofit"], ["Exhaust gas scrubber retrofit", "exhaust-gas-scrubber-retrofit"]] },
      { year: "2023", title: "UTM services", text: "Ultrasonic thickness measurement to class requirements, adding hull condition data to our survey and dry-docking work.", art: ["hold"], links: [["Surveys & inspections", "surveys-inspections"]] },
      { year: "2024", title: "Joint venture and Zeroqu", logo: "%%ZEROQU%%", text: "Entered into a joint venture with MDO Inc, USA to expand our geographic footprint, and focused on building new ventures and marine software services through Zeroqu.", people: "200+ people", where: ["India", "Singapore", "UAE", "Rotterdam, NL", "New Jersey, USA"], art: ["grid"], links: [["Software solutions", "software-solutions"]], ext: ["zeroqu.com", "https://zeroqu.com"] }
    ],
    headcount: [
      { n: 8, label: "Team at inception", where: "Mumbai, India", text: "A modest beginning with a strong ambition to make an impact in naval architecture." },
      { n: 25, label: "Team after the MDO Inc joint venture", where: "India, Singapore, New Jersey (USA)", text: "Entered into a joint venture with MDO Inc, USA to expand our geographic footprint." },
      { n: 50, label: "Team today", where: "India, Singapore, New Jersey (USA), Ajman (UAE)", text: "Focused on building new ventures and marine software services." }
    ]
  },

  values: [
    { title: "Trusted partner for clients", text: "We are a reliable partner, delivering tailored solutions with integrity and excellence, and fostering long-term relationships that support your success.", icon: "handshake" },
    { title: "Commitment towards quality & safety", text: "We ensure quality and safety through strict standards, continuous improvement and a focus on reliability and stakeholder wellbeing.", icon: "shield" },
    { title: "Foster entrepreneurship", text: "We nurture entrepreneurship by empowering creativity, supporting innovative ideas and driving impactful solutions for a sustainable future.", icon: "chart" },
    { title: "Continuous innovation", text: "We drive continuous innovation by adopting new technologies, refining our services and staying ahead of industry trends to deliver cutting-edge solutions in the maritime sector.", icon: "bulb" },
    { title: "Sustainable & greener futures", text: "We shape a sustainable future by embracing eco-friendly solutions and innovative technologies that create a positive impact on the maritime industry.", icon: "leaf" }
  ],

  teamStory: "Our strength lies in our people, which is how we invest in bringing the most relevant capabilities to serve our clients' needs. With 200+ people across the group, we are a tightly knit community of naval architects, structural engineers, electrical engineers and marine engineers. Through our broad spectrum of talent, our portfolio of services is continuously evolving by combining industry experience and knowledge with enthusiasm, creativity and dedication to develop customised solutions.",
  teamPhoto: "%%TEAM%%",   // path or data URI of the team photo

  leadership: [
    { name: "Nitesh Ranvah", role: "CEO", org: "21 Knots Group", bio: "Seasoned naval architect with nearly 18 years of experience.", photo: "%%P_NITESH%%" },
    { name: "Amit Kumar", role: "Co-founder and CTO", org: "Zeroqu", bio: "Former vessel performance lead at Maersk, with 23 years of experience.", photo: "%%P_AMIT%%" },
    { name: "Sojan Varkey", role: "General Manager, Technical Services", org: "21 Knots", bio: "40+ years in design, engineering and site supervision.", photo: "%%P_SOJAN%%" },
    { name: "Irshad Hussain", role: "General Manager, Design Services", org: "21 Knots", bio: "Naval architect with 18 years in design and marine vessel management.", photo: "%%P_IRSHAD%%" },
    { name: "Sivapriya", role: "COO", org: "Zeroqu", bio: "Former Deloitte, with 19 years in corporate strategy.", photo: "%%P_SIVAPRIYA%%" }
  ],

  /* ---------- service areas + every service page ---------- */
  areas: [
    { id: "marine-services", art2: "bodyplan", title: "Design & Engineering", menuTitle: "Design & Engineering Services", footerTitle: "Marine", art: "hull", text: "Ship design from concept to production, offshore and oil & gas engineering, green retrofits, on-site services and engineering software.", h2: "We provide custom made solutions for Industry", services: ["design-services", "offshore-engineering-design", "oil-gas-engineering", "software-solutions", "advance-engineering-solutions", "green-services", "on-site-services"] },
    { id: "offshore", art2: "subsea", title: "Offshore", menuTitle: "Offshore", footerTitle: "Offshore", h2: "We provide custom made solutions for Industry", art: "jacket", text: "Fixed and floating platforms, subsea, transport and installation, decommissioning and renewables.", services: ["fixed-platform-floaters", "transportation-installation", "subsea-engineering", "decommissioning", "renewable", "inspections-and-surveys"] },
    { id: "power-industrial", art2: "port", title: "Power & Industrial", menuTitle: "Power & Industrial", footerTitle: "Power & Industrial", h2: "We provide custom made solutions for Industry", art: "crane", text: "Power plant engineering, ports and harbours, and shipyard facilities.", services: ["power", "port-and-harbour", "shipyards"] }
  ],

  services: {
    "design-services": {
      title: "Ship Design Services", area: "marine-services", art: "hull",
      intro: "Ship design from concept to production. Our in-house naval architects and engineers cover hull form, stability, structure, machinery, process, electrical design and system integration. Designs are approved by the major classification societies, and we produce custom production designs for shipyards worldwide.",
      blocks: [
        { id: "concept-design", title: "Concept design", text: "We define the client's needs, operating profile and regulatory constraints, and develop vessel concepts that answer them.", items: ["Vessel purpose and mission profile", "Main dimensions, speed and propulsion", "Initial hull form and general arrangement", "Feasibility checks and regulatory compliance", "Early stability and weight analysis"] },
        { id: "basic-design", title: "Basic design", text: "Detailed calculations and drawings that ensure compliance with class and international regulations.", items: ["Hull structure and naval architectural design", "Stability and hydrodynamic analysis", "Machinery, piping and electrical system design", "Class and flag approvals"] },
        { id: "production-design", title: "Production design", text: "Fabrication and assembly drawings, 3D models and material specifications for efficient construction.", items: ["3D modelling", "Build strategy", "Assembly drawings", "Structural outfitting drawings", "Profile plot drawings", "Nesting drawings and MTOs", "Welding traceability drawings and lists", "Spool and isometric drawings", "Installation drawings", "Support fabrication drawings", "MTOs for valves, fittings and special items", "Electrical cable tray and support drawings", "Ventilation ducting layouts and MTOs"] },
        { id: "conversion-design", title: "Conversion design", text: "Modifying existing marine and oil & gas assets to meet new objectives, inside the conversion schedule.", items: ["Meeting conversion specifications", "Regulatory compliance", "Operational and functional objectives", "Asset integrity after conversion", "Engineering within the conversion schedule"] },
        { id: "naval-architecture", title: "Naval architecture", text: "Hull form design and analysis through design, construction and trials.", items: ["Hull form design, lines plans and offset tables", "CFD analysis of hulls, superstructures and appendages", "Resistance and powering, propeller design, model tests", "Intact and damage stability, deterministic and probabilistic", "Seakeeping analysis", "Dynamic positioning capability analysis", "Weight estimation, inclining experiments, lightship surveys", "Harbour and sea trials"] },
        { id: "structural-design", title: "Structural design", text: "Structure that balances strength and cost, tailored to the shipyard's infrastructure and build methods.", items: ["Global, local and fine-mesh FE analysis", "Conventional and spectral fatigue analysis", "Longitudinal strength calculations", "Global and local scantling calculations", "Structural classification drawings", "Welding schedules", "3D hull structure modelling", "Build strategy and assembly procedures", "Block and unit assembly drawings", "Bending drawings for press and line heating", "Profile cutting plans", "Plate cutting and nesting information", "Hull parts list with centres of gravity"] },
        { id: "machinery-piping-outfitting", title: "Machinery, piping and outfitting", text: "Efficient systems that are easy to operate and to build, compliant with class, with stage-wise installation drawings that shorten build time.", items: ["Equipment sizing and systems design", "Piping and instrumentation diagrams", "Pressure loss and pipe flow analysis", "Process engineering", "Machinery classification drawings", "Machinery and outfit arrangement drawings", "3D modelling of machinery, piping, HVAC and outfitting", "Pipe and duct spool and isometric drawings", "Pipe and duct support fabrication drawings", "Piping installation and layout drawings", "Outfitting fabrication and installation drawings", "Piping and outfitting material lists"] },
        { id: "electrical-design", title: "Electrical design", text: "Marine electrical design covering statutory and safety requirements, with fabrication, installation and termination drawings.", items: ["Electrical plant design", "Electrical load analysis and generator sizing", "Transformer and battery calculations", "Single-line diagrams for HV, 440V, 220V, 24V DC and control", "MCCB calculations and switchboard design", "Fault current and short-circuit analysis", "Selectivity analysis", "Electrical classification drawings", "Electrical systems arrangement drawings", "Block diagrams for electrical, navigation and communication", "Termination drawings for all systems", "3D modelling of electrical equipment and cable trays", "Cable tray, hanger and support fabrication drawings", "Cable tray arrangement drawings", "Cable schedule", "Electrical fittings material list"] },
        { id: "fluid-dynamics", title: "Fluid dynamics", text: "Computational and finite element analysis for marine structures, used to optimise and validate designs.", items: ["CFD analysis of hulls, superstructures and appendages", "Global FE analysis and direct strength analysis", "Local and fine-mesh structural analysis", "Conventional and spectral fatigue assessment", "Global and local vibration analysis", "Buckling analysis", "Strength evaluation to CSR and class codes", "Steady-state and transient thermal analysis"] }
      ]
    },
    "green-services": {
      title: "Green Services", area: "marine-services", art: "scrubber",
      intro: "Climate change pushes marine operators to keep upgrading fleets for efficiency and emissions control. We provide tailored solutions aimed at the IMO 2050 target, from retrofits on in-service ships to EEXI compliance and green ship recycling.",
      blocks: [
        { id: "conversions-retrofits", title: "Conversions & retrofits", text: "Engineering for conversions and retrofits, including on in-service ships. Designs deploy fast through a shipyard or the onboard crew, with minimal change to existing arrangements, staged installation and production-friendly drawings that meet class rules.", groups: [
          { h: "3D laser scanning", items: ["Scanning in low light, confined spaces and hazardous zones with explosion-proof scanners", "Registered point clouds aligned to the vessel's coordinates", "Engine room, pump room, engine casing, deck and accommodation", "Ship checks: ballast and exhaust line tracing, pump running tests, crew interviews", "Preliminary master conversion plan, P&IDs and load analysis", "Equipment placement and conceptual pipe routing"] },
          { h: "Basic design: mechanical", items: ["P&IDs for ballast, seawater, freshwater, control air, exhaust, steam, drain, air and sounding", "Pressure loss and back pressure calculations", "Equipment arrangement and detailed pipe routing"] },
          { h: "Basic design: electrical", items: ["Electrical load analysis", "Power and control wiring diagrams", "Short-circuit and selectivity studies", "Integration with GPS, AMS and PMS"] },
          { h: "Basic design: structural and general", items: ["Master conversion plan", "Tank and engine casing structural design", "Sea chest and overboard arrangements", "Equipment foundations, engine room platforms and outfitting", "Lightweight calculations", "Ballast Water Management Plan", "Hazardous zone plan"] },
          { h: "Typical project scope", items: ["3D laser scanning", "Feasibility studies", "Basic and detailed engineering", "Liaison with class, flag and statutory bodies", "Project management"] },
          { h: "Detailed design", items: ["Pipe spool and support drawings, piping layouts", "Cable ladder layouts, cable schedules and termination drawings", "Structural assembly, bending and nesting drawings", "Profile cutting plans, foundation and penetration drawings", "Material lists for pipes, valves, fittings, cables and outfitting", "Shipyard specifications and clash check reports"] }
        ] },
        { id: "eexi-cii", title: "EEXI & CII", text: "Naval architects and marine engineers delivering EEXI services in line with IMO requirements.", groups: [
          { h: "Compliance", items: ["Attained and required EEXI calculations", "Ship-specific EEXI Technical File", "Onboard Management Manual for ships using Overridable Power Limitation"] },
          { h: "Improvement and advisory for non-compliant vessels", items: ["Required reduction in engine or shaft power", "Estimated maximum speed after power reduction", "Minimum power assessment under MARPOL Annex VI Reg. 21", "OMM for engine or shaft power limitation", "Feasibility of energy-efficiency technologies: technical, commercial and ROI"] }
        ] },
        { id: "green-ship-recycling", title: "Green ship recycling", text: "Consulting on the construction, operation and recycling of ships, for owners, recycling facilities and shipyards. Our team is certified to carry out Inventory of Hazardous Materials surveys.", items: ["Inventory of Hazardous Materials surveys", "Advisory for owners, recyclers and yards", "Recycling-ready design and operation"] }
      ]
    },
    "on-site-services": {
      title: "On-Site Services", area: "marine-services", art: "scan",
      intro: "Inspection, survey and marine construction at shipyards and on floating or sailing vessels. Our teams have shipyard experience worldwide and have served as surveyors for leading classification societies.",
      blocks: [
        { id: "marine-construction", title: "Marine construction", text: "To cut off-hire time we can install and commission while the vessel sails: shore teams prefabricate, riding crews install and lay cable on passage, and terminations and commissioning finish during port or dock stays.", groups: [
          { h: "New construction", items: ["Block fabrication", "Pipe spool and outfit fabrication", "Block pre-outfitting", "Machinery and electrical installation", "Block pre-erection and erection", "Electrical cabling and system integration", "Commissioning"] },
          { h: "Repairs and retrofits", items: ["Pipe spool and outfit fabrication", "Machinery and electrical installation", "Electrical cabling", "Commissioning"] },
          { h: "Quality, materials and processes", items: ["QC inspections and NDT", "Ordinary and high-tensile steel, aluminium", "Carbon steel, stainless, copper, CuNi and GRE pipe", "SAW, FCAW and SMAW welding", "Health, safety and environment practice"] }
        ] },
        { id: "installation-supervision", title: "Installation supervision", text: "Supervision of marine equipment and system installation, drawing on shipyard and classification society experience.", items: ["Project plans, prepared and monitored", "Supervising hull, outfit and piping fabrication", "Witnessing QC tests", "Coordinating makers, local services and class surveyors", "Daily progress reports with quantified completion", "Verifying completed work and material lists"] },
        { id: "dry-docking-assistance", title: "Dry docking assistance", text: "Support for owners and class surveyors through special surveys and dockings, for all vessel types.", items: ["Pre-docking inspection of engine room, deck, holds and accommodation", "Quantified assessment of required work", "Project plans, prepared and monitored", "Supervising fabrication in yard workshops", "Witnessing QC tests", "Managing and closing class comments", "Daily progress reports", "Verifying completed work and material lists"] },
        { id: "surveys-inspections", title: "Surveys & inspections", text: "Marine surveys for docking, retrofits, condition assessment and thickness gauging.", items: ["Ultrasonic thickness gauging to class requirements", "Condition surveys of hull, outfit, machinery and fittings", "Pre-purchase surveys", "Bunker and cargo surveys"] }
      ]
    },
    "offshore-engineering-design": {
      title: "Offshore Engineering Design", area: "marine-services", art: "jacket",
      intro: "Design and engineering for offshore assets across their life: platforms and floaters, subsea systems, transport and installation, decommissioning and renewables.",
      aggregate: ["fixed-platform-floaters", "subsea-engineering", "transportation-installation", "decommissioning", "renewable", "inspections-and-surveys"],
      blocks: []
    },
    "oil-gas-engineering": {
      title: "Oil & Gas Engineering", area: "marine-services", art: "subsea",
      intro: "Engineering for oil & gas assets: fixed and floating production platforms, subsea pipelines and risers, conversions of existing assets, decommissioning and on-site inspection.",
      aggregate: ["fixed-platform-floaters", "subsea-engineering", "conversion-design", "decommissioning", "on-site-services", "inspections-and-surveys"],
      blocks: []
    },
    "software-solutions": {
      title: "Software Solutions", area: "marine-services", art: "grid",
      intro: "Maritime software from our group company Zeroqu: vessel performance, emissions insights, hull and propeller analytics, voyage optimisation and compliance support, alongside design software solutions.",
      blocks: [
        { title: "Zeroqu Maritime Software", text: "Zeroqu, our Rotterdam group company, helps clients achieve sustainable operations and compliance. Visit zeroqu.com for products and demos.", items: ["Vessel performance", "Emissions insights", "Hull & propeller analytics", "Voyage optimisation", "Compliance support", "Design software solutions"], href: "https://zeroqu.com", hrefLabel: "Visit zeroqu.com" }
      ]
    },
    "advance-engineering-solutions": {
      title: "Advanced Engineering Solutions", area: "marine-services", art: "mesh",
      intro: "Simulation-led engineering for hulls, structures and systems: computational fluid dynamics and finite element analysis that validate a design before steel is cut.",
      blocks: [
        { id: "computational-fluid-dynamics", title: "Computational fluid dynamics", text: "Fluid and multiphase CFD for hulls, superstructures and appendages.", items: ["Resistance and powering", "Propeller design support", "Seakeeping analysis", "Dynamic positioning capability analysis", "Appendage and superstructure flow"] },
        { id: "finite-element-analysis", title: "Finite element analysis", text: "Structural FEA for optimisation and design validation.", items: ["Global FE and direct strength analysis", "Local and fine-mesh analysis", "Conventional and spectral fatigue", "Global and local vibration", "Buckling analysis", "Steady-state and transient thermal analysis"] }
      ]
    },
    "fixed-platform-floaters": {
      title: "Fixed Platforms & Floaters", area: "offshore", art: "jacket",
      intro: "Engineering for fixed and floating offshore platforms, from basic through detailed design. Our designs are approved by the major classification societies worldwide.",
      blocks: [
        { title: "Services", text: "The full engineering scope for platforms and floaters.", items: ["Naval architecture and motion analysis", "Feasibility studies and gap analysis", "Basic and detailed design", "Structural engineering", "Process engineering", "Electrical and instrumentation design", "Retrofit and conversion engineering", "As-built engineering and 3D scanning", "On-site supervision and project management"] },
        { id: "platform-structural-design", title: "Structural design", text: "Structure that balances strength and cost, meets statutory rules and suits the yard's facilities, with production-friendly drawings.", items: ["Global, local and fine-mesh FE analysis", "Conventional and spectral fatigue analysis", "Longitudinal strength calculations", "Global and local scantlings", "Structural classification drawings", "Welding schedules", "3D hull structure modelling", "Build strategy and assembly procedures", "Block and unit assembly drawings", "Bending drawings for press and line heating", "Profile cutting plans", "Plate cutting and nesting data", "Hull parts list with centres of gravity"] },
        { id: "platform-machinery-piping-outfitting", title: "Machinery, piping and outfitting", text: "Systems that are easy to operate and build, with stage-wise installation drawings.", items: ["Equipment sizing and systems design", "Piping and instrumentation diagrams", "Pressure loss and pipe flow analysis", "Process engineering", "Machinery classification drawings", "3D modelling of machinery, piping, HVAC and outfitting", "Spool, isometric and support drawings", "Installation and layout drawings", "Piping and outfitting material lists"] },
        { id: "platform-electrical-design", title: "Electrical design", text: "Electrical systems from basic calculations to fabrication, installation and termination drawings, delivered with contractors and manufacturers internationally.", items: ["Electrical plant design", "Load analysis and generator sizing", "Transformer and battery calculations", "Single-line diagrams for HV, 440V, 220V, 24V DC and control", "MCCB calculations and switchboard design", "Fault current, short-circuit and selectivity analysis", "Classification and arrangement drawings", "Termination drawings, cable trays and cable schedules"] },
        { id: "platform-fluid-dynamics", title: "Fluid dynamics", text: "Finite element analysis to optimise and validate platform structure.", items: ["Global FE and direct strength analysis", "Local and fine-mesh analysis", "Conventional and spectral fatigue", "Global and local vibration", "Buckling analysis", "Strength to CSR and class codes", "Steady-state and transient thermal analysis"] }
      ]
    },
    "transportation-installation": {
      title: "Transportation & Installation", area: "offshore", art: "barge",
      intro: "Transportation and installation engineering is critical to every offshore EPC project. We provide complete T&I engineering support so campaigns run safely and on schedule.",
      blocks: [
        { id: "transportation-engineering", title: "Transportation engineering", text: "Getting the structure from yard to site.", items: ["Grillage and sea fastening design", "Stability and longitudinal strength checks", "Motion analysis", "Towing equipment design", "Bollard pull calculations", "Stowage plans"] },
        { id: "installation-engineering", title: "Installation engineering", text: "Putting it in place offshore.", items: ["Jacket launch analysis", "Lift point design and lifting analysis", "Floatation and upending analysis", "Jacket in-place analysis", "On-bottom stability and pile driving", "Mooring analysis and design verification"] },
        { id: "loadout-engineering", title: "Loadout engineering", text: "Moving the structure safely onto the barge.", items: ["Loadout analysis", "Ballast calculations", "Loadout beam design", "Rigging design and lift point analysis"] }
      ]
    },
    "subsea-engineering": {
      title: "Subsea Engineering", area: "offshore", art: "subsea-engineering",
      intro: "FEED and detailed design for subsea work, including pipelay, mooring, riser and umbilical systems.",
      blocks: [
        { title: "Analysis", text: "Engineering checks across the subsea scope.", defs: [
          ["Mooring and riser analysis", "How moored structures and their risers perform in service."],
          ["Motion analysis", "How vessels and structures respond to environmental loads."],
          ["Pipelay analysis", "Stresses and feasibility for laying pipelines."],
          ["Cable lay analysis", "The same questions, answered for cable installation."],
          ["On-bottom stability", "Confirming pipelines and structures stay put on the seabed."],
          ["Fatigue analysis", "How repeated loading wears components over their life."]
        ] }
      ]
    },
    "decommissioning": {
      title: "Decommissioning", area: "offshore", art: "jacket",
      intro: "Engineering for offshore decommissioning: removal design, structural assessment, transportation and load-in.",
      blocks: [
        { title: "Decommissioning engineering", text: "Planning removal, asset by asset.", defs: [
          ["Pre-decommissioning survey", "Inspecting the site before removal begins."],
          ["Fixed platforms", "Planning full or partial platform removal."],
          ["Floating structures", "Planning removal of moorings and risers."],
          ["Subsea pipelines and umbilicals", "Engineering their removal."],
          ["Marine spread and logistics", "Vessels, equipment and logistics for the campaign."]
        ] },
        { title: "Supporting analysis", text: "The engineering that keeps a removal campaign safe.", items: ["Station-keeping analysis", "Mooring and DP capability analysis of the decommissioning vessel", "Transportation engineering", "Load-in engineering"] }
      ]
    },
    "renewable": {
      title: "Renewable", area: "offshore", art: "turbine",
      intro: "Engineering support for renewable energy projects across solar, wind and hydro.",
      blocks: [
        { title: "Services", text: "Marine engineering applied to renewable generation.", items: ["Naval architecture", "Mooring and anchoring system design", "Floating solar plant design", "Offshore wind farm support engineering", "Structural engineering", "Electrical engineering"] }
      ]
    },
    "inspections-and-surveys": {
      title: "Inspection & Surveys", area: "offshore", art: "scan",
      intro: "Our surveyors inspect vessels and offshore assets to assess condition, safety standards and equipment.",
      blocks: [
        { title: "Services", text: "Independent eyes on the asset.", items: ["Condition assessment", "Engineering surveys", "Installation supervision", "3D scanning and as-built surveys", "Marine casualty investigation", "Pre-MWS surveys", "Third-party inspections"] }
      ]
    },
    "power": {
      title: "Power", area: "power-industrial", art: "plant",
      intro: "Engineering for power generation, from FEED through detailed plant engineering, upgrades and heavy lifts.",
      blocks: [
        { title: "Services", text: "From front-end design to as-built records.", items: ["FEED designs", "Detailed engineering", "Plant engineering", "3D scanning and as-built documentation", "Retrofits and upgrades", "Heavy-lift designs"] }
      ]
    },
    "port-and-harbour": {
      title: "Ports & Harbour", area: "power-industrial", art: "port",
      intro: "Operational studies and marine design for ports, terminals and harbours.",
      blocks: [
        { title: "Services", text: "How vessels arrive, berth and stay alongside.", items: ["Port operational study", "Mooring and fendering design", "Berthing analysis", "Manoeuvrability study", "Marine design", "Dock gates"] }
      ]
    },
    "shipyards": {
      title: "Shipyards", area: "power-industrial", art: "crane",
      intro: "Facility design, production support and capacity studies for shipyards.",
      blocks: [
        { title: "Services", text: "Engineering for the yard itself.", defs: [
          ["Shipyard facility design", "Designing yard facilities and infrastructure."],
          ["Production design support", "Design assistance for the yard's production work."],
          ["Capacity augmentation studies", "Studies on expanding the yard's capacity."],
          ["Risk assessment and warranty surveys", "Evaluating yard risk and carrying out warranty surveys."]
        ] }
      ]
    }
  },

  careers: {
    title: "Build ships and offshore assets with us.",
    text: "We're always looking for naval architects, structural, electrical and marine engineers who care about getting the details right. Send us your CV and a short note about the work you want to do.",
    culture: "Our team of 200+ naval architects, structural, electrical and marine engineers pairs industry experience with enthusiasm, creativity and dedication, and works across offices in Thane, Singapore and Ajman.",
    linkedin: "https://www.linkedin.com/company/3706553/"
  },

  undertaking: [
    { h: "Undertaking on Type A status", file: "Undertaking-On-Type-A-Status", img: "" },
    { h: "Organisation chart", file: "OC-for-Audit", img: "" }
  ],

  privacy: [
    { h: "Privacy policy", p: "This policy explains how 21 Knots Design & Consulting Pvt Ltd collects, uses and protects personal information from visitors to 21-knots.com." },
    { h: "Information we may collect", list: ["Cookies: small data files stored on your device to improve your browsing", "Third-party services: external services that may collect and process data on our behalf to provide and improve our services"] },
    { h: "How we use it", p: "Information we collect is used only to provide our services to you, including:", list: ["Improving your experience of the site", "Analysing site performance and usage"] },
    { h: "Data protection and security", p: "We use technical and organisational safeguards to protect data against unauthorised access, alteration, disclosure or destruction." },
    { h: "Sharing your information", p: "We share personal data with outside parties only where needed to deliver our services, for example with trusted partners who help run this website and our business." },
    { h: "Changes to this policy", p: "We may update this policy and will post changes on this page. Please review it from time to time." },
    { h: "Contact us", p: "For questions about privacy, email info@21-knots.com." }
  ]
};
</script>
