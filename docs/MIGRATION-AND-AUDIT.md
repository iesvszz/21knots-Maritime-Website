# 21 Knots website redesign: page audit and URL migration

Prepared 2026-10-30. Source: crawl of every link on https://21-knots.com (header, dropdowns, body, footer). The redesign has **56 pages**: all **27 original pages** keep their exact URL, and **29 pages are new**.

## 1. Original URL → new URL

| # | Old URL | Page | Linked from | New URL | Change |
|---|---|---|---|---|---|
| 1 | `/` | Home | Main menu | `/` | Same URL, redesigned |
| 2 | `/about-21knots/` | About Us | Main menu | `/about-21knots/` | Same URL, redesigned |
| 3 | `/marine-services/` | Design & Engineering Services (Marine) | Services menu, footer "Marine" | `/marine-services/` | Same URL, redesigned |
| 4 | `/design-services/` | Ship Design Services | Services menu, home card "Naval Architecture" | `/design-services/` | Same URL, redesigned |
| 5 | `/green-services/` | Green Services (menu label: Offshore Engineering Design) | Services menu, home cards, hero slide 3 | `/green-services/` | Same URL, redesigned |
| 6 | `/on-site-services/` | On-Site Services (menu label: Oil & Gas Engineering) | Services menu, home card | `/on-site-services/` | Same URL, redesigned |
| 7 | `/software-solutions/` | Software Solutions | Services menu | `/software-solutions/` | Same URL, redesigned |
| 8 | `/advance-engineering-solutions/` | Advance Engineering Solutions | Services menu | `/advance-engineering-solutions/` | Same URL, redesigned |
| 9 | `/offshore/` | Offshore | Services menu, footer | `/offshore/` | Same URL, redesigned |
| 10 | `/fixed-platform-floaters/` | Fixed Platform & Floaters | Services menu, home card, hero slide 1 | `/fixed-platform-floaters/` | Same URL, redesigned |
| 11 | `/transportation-installation/` | Transportation & Installation | Services menu, home card | `/transportation-installation/` | Same URL, redesigned |
| 12 | `/subsea-engineering/` | SubSea Engineering | Services menu | `/subsea-engineering/` | Same URL, redesigned |
| 13 | `/decommissioning/` | Decommissioning | Services menu | `/decommissioning/` | Same URL, redesigned |
| 14 | `/renewable/` | Renewable | Services menu | `/renewable/` | Same URL, redesigned |
| 15 | `/inspections-and-surveys/` | Inspection & Surveys | Services menu | `/inspections-and-surveys/` | Same URL, redesigned |
| 16 | `/power-industrial/` | Power & Industrial | Services menu, footer | `/power-industrial/` | Same URL, redesigned |
| 17 | `/power/` | Power | Services menu | `/power/` | Same URL, redesigned |
| 18 | `/port-and-harbour/` | Ports & Harbour | Services menu | `/port-and-harbour/` | Same URL, redesigned |
| 19 | `/shipyards/` | Shipyards | Services menu | `/shipyards/` | Same URL, redesigned |
| 20 | `/projects/` | Projects | Main menu, footer | `/projects/` | Same URL, redesigned |
| 21 | `/exhaust-gas-scrubber-retrofit/` | Project: Exhaust Gas Scrubber Retrofit | Projects page | `/exhaust-gas-scrubber-retrofit/` | Same URL, redesigned |
| 22 | `/modular-catamaran-design/` | Project: Modular Catamaran Design | Projects page | `/modular-catamaran-design/` | Same URL, redesigned |
| 23 | `/cargo-hold-modification/` | Project: Cargo Hold Modification | Projects page | `/cargo-hold-modification/` | Same URL, redesigned |
| 24 | `/contact-us/` | Contact Us | Main menu | `/contact-us/` | Same URL, redesigned |
| 25 | `/careers/` | Careers | Main menu | `/careers/` | Same URL, redesigned |
| 26 | `/privacy-policy/` | Privacy Policy | Policy menu | `/privacy-policy/` | Same URL, redesigned |
| 27 | `/undertaking/` | Undertaking | Policy menu | `/undertaking/` | Same URL, redesigned |

## 2. Redirects (301)

Only old links that never had a page of their own need redirects. Rules ship in `vercel.json`, `.htaccess` and `redirects.csv`.

| From | To | Why |
|---|---|---|
| `/about/` | `/about-21knots/` | Footer "About us" on the old site pointed here |
| `/about-us/` | `/about-21knots/` | Common guess / old backlinks |
| `/contact/` | `/contact-us/` | Common guess / old backlinks |
| `/policy/` | `/privacy-policy/` | Old "Policy" menu parent had a broken href (https://policy) |
| `/marine/` | `/marine-services/` | Footer label was "Marine" |
| `//any-path/` | `/any-path/` | Old internal links used double slashes |
| `https://bornopedia.com` link | removed | Agency credit in the old footer |

## 3. New pages

**Hubs and menu items**

- `/services/` Services
- `/offshore-engineering-design/` Offshore Engineering Design
- `/oil-gas-engineering/` Oil & Gas Engineering

**Service sub-pages**

- `/concept-design/` Concept design
- `/basic-design/` Basic design
- `/production-design/` Production design
- `/conversion-design/` Conversion design
- `/naval-architecture/` Naval architecture
- `/structural-design/` Structural design
- `/machinery-piping-outfitting/` Machinery, piping and outfitting
- `/electrical-design/` Electrical design
- `/fluid-dynamics/` Fluid dynamics
- `/conversions-retrofits/` Conversions & retrofits
- `/eexi-cii/` EEXI & CII
- `/green-ship-recycling/` Green ship recycling
- `/marine-construction/` Marine construction
- `/installation-supervision/` Installation supervision
- `/dry-docking-assistance/` Dry docking assistance
- `/surveys-inspections/` Surveys & inspections
- `/computational-fluid-dynamics/` Computational fluid dynamics
- `/finite-element-analysis/` Finite element analysis
- `/platform-structural-design/` Structural design
- `/platform-machinery-piping-outfitting/` Machinery, piping and outfitting
- `/platform-electrical-design/` Electrical design
- `/platform-fluid-dynamics/` Fluid dynamics
- `/transportation-engineering/` Transportation engineering
- `/installation-engineering/` Installation engineering
- `/loadout-engineering/` Loadout engineering

**Projects**

- `/ballast-water-treatment-system-retrofit/` Ballast Water Treatment System Retrofit

## 4. Page-by-page checklist

Checked automatically on the built site: every route renders with an H1, a title and a meta description; every internal link on every page, in the header, mega menu, mobile menu and footer resolves to a page. Layouts were checked at 390, 820 and 1440 px.

Link check result: **56 pages, 0 broken internal links, 0 empty links, 0 runtime errors.**

| Page | URL | Title tag | Renders | Links OK | Mobile / tablet / desktop |
|---|---|---|---|---|---|
| Home | `/` | 21 Knots &#124; Design, engineering and consulting | ✅ | ✅ | ✅ ✅ ✅ |
| About Us | `/about-21knots/` | About Us - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Services | `/services/` | Services - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Projects | `/projects/` | Projects - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Careers | `/careers/` | Careers - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Contact Us | `/contact-us/` | Contact Us - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Privacy Policy | `/privacy-policy/` | Privacy Policy - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Undertaking | `/undertaking/` | Undertaking - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Design & Engineering Services | `/marine-services/` | Design & Engineering Services - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Offshore | `/offshore/` | Offshore - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Power & Industrial | `/power-industrial/` | Power & Industrial - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Ship Design Services | `/design-services/` | Ship Design Services - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Green Services | `/green-services/` | Green Services - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| On-Site Services | `/on-site-services/` | On-Site Services - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Offshore Engineering Design | `/offshore-engineering-design/` | Offshore Engineering Design - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Oil & Gas Engineering | `/oil-gas-engineering/` | Oil & Gas Engineering - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Software Solutions | `/software-solutions/` | Software Solutions - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Advanced Engineering Solutions | `/advance-engineering-solutions/` | Advanced Engineering Solutions - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Fixed Platforms & Floaters | `/fixed-platform-floaters/` | Fixed Platforms & Floaters - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Transportation & Installation | `/transportation-installation/` | Transportation & Installation - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Subsea Engineering | `/subsea-engineering/` | Subsea Engineering - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Decommissioning | `/decommissioning/` | Decommissioning - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Renewable | `/renewable/` | Renewable - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Inspection & Surveys | `/inspections-and-surveys/` | Inspection & Surveys - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Power | `/power/` | Power - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Ports & Harbour | `/port-and-harbour/` | Ports & Harbour - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Shipyards | `/shipyards/` | Shipyards - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Concept design | `/concept-design/` | Concept design - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Basic design | `/basic-design/` | Basic design - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Production design | `/production-design/` | Production design - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Conversion design | `/conversion-design/` | Conversion design - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Naval architecture | `/naval-architecture/` | Naval architecture - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Structural design | `/structural-design/` | Structural design - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Machinery, piping and outfitting | `/machinery-piping-outfitting/` | Machinery, piping and outfitting - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Electrical design | `/electrical-design/` | Electrical design - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Fluid dynamics | `/fluid-dynamics/` | Fluid dynamics - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Conversions & retrofits | `/conversions-retrofits/` | Conversions & retrofits - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| EEXI & CII | `/eexi-cii/` | EEXI & CII - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Green ship recycling | `/green-ship-recycling/` | Green ship recycling - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Marine construction | `/marine-construction/` | Marine construction - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Installation supervision | `/installation-supervision/` | Installation supervision - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Dry docking assistance | `/dry-docking-assistance/` | Dry docking assistance - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Surveys & inspections | `/surveys-inspections/` | Surveys & inspections - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Computational fluid dynamics | `/computational-fluid-dynamics/` | Computational fluid dynamics - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Finite element analysis | `/finite-element-analysis/` | Finite element analysis - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Structural design | `/platform-structural-design/` | Structural design - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Machinery, piping and outfitting | `/platform-machinery-piping-outfitting/` | Machinery, piping and outfitting - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Electrical design | `/platform-electrical-design/` | Electrical design - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Fluid dynamics | `/platform-fluid-dynamics/` | Fluid dynamics - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Transportation engineering | `/transportation-engineering/` | Transportation engineering - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Installation engineering | `/installation-engineering/` | Installation engineering - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Loadout engineering | `/loadout-engineering/` | Loadout engineering - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Exhaust Gas Scrubber Retrofit | `/exhaust-gas-scrubber-retrofit/` | Exhaust Gas Scrubber Retrofit - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Ballast Water Treatment System Retrofit | `/ballast-water-treatment-system-retrofit/` | Ballast Water Treatment System Retrofit - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Modular Catamaran Design | `/modular-catamaran-design/` | Modular Catamaran Design - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |
| Cargo Hold Modification | `/cargo-hold-modification/` | Cargo Hold Modification - 21 Knots | ✅ | ✅ | ✅ ✅ ✅ |

## 5. Navigation coverage

- **Main menu:** Home, About Us, Services (mega menu), Projects, Careers, Contact Us (button). All work on desktop and in the mobile menu.
- **Services dropdown:** all 3 area hubs and all 16 services from the original menu, including Offshore Engineering Design and Oil & Gas Engineering, which now have their own pages instead of pointing to Green and On-Site Services.
- **Policy dropdown:** Privacy Policy and Undertaking, in the footer bar and mobile menu. The old broken `https://policy` link is gone.
- **Footer:** About us, Projects, Careers, Contact us, Marine, Offshore, Power & Industrial, Green services, All services, three offices with phone numbers, email, LinkedIn, X, Facebook, Privacy policy, Undertaking, Back to top.
- **External links:** LinkedIn, X, Facebook, zeroqu.com and Google Maps for each office. `mailto:` and `tel:` links for every address and number.

## 6. Open items that need content from 21 Knots

These could not be pulled from the live site and are the only gaps:

1. **Project case studies.** The four project detail pages (`/exhaust-gas-scrubber-retrofit/` etc.) could not be read. Each new project page shows the verified title, client and category plus linked services. Paste the case-study text into `CONTENT.projects[].body` and it renders automatically.
2. **Exact legal wording.** The Privacy Policy keeps every original section and heading, but the sentence text is a faithful restatement, not a verbatim copy. Paste the original wording into `CONTENT.privacy` before launch.
3. **Undertaking images.** The page holds two documents (`Undertaking-On-Type-A-Status`, `OC-for-Audit`). Add the image paths to `CONTENT.undertaking[].img`.
4. **Photography and logo.** Images on the old site could not be downloaded. Every hero and project card accepts an `img` path and falls back to a technical line drawing.
5. **Ballast Water Treatment System Retrofit** had no page on the old site (its link pointed to the scrubber project). It now has `/ballast-water-treatment-system-retrofit/`.
6. **To confirm:** careers email (masked on the old site, assumed `careers@21-knots.com`), the India office unit number in the address (1109 vs 1101 vs map pin 216A), the exact brand blue, and the wording for Software Solutions and Advanced Engineering Solutions, which were empty pages and were filled from Zeroqu and the CFD/FEA lists on other pages.
7. **Contact form backend.** Validation, sending, success and error states are built. Set `window.SITE_FORM_ENDPOINT` to your form service URL to send for real; without it the form prepares an email for the visitor.
8. **About page (added 2026-11-04).** Growth journey, team growth (8, 25, 50+), five values, team story and leadership were rebuilt from a screenshot of the live About page. To confirm or supply: the milestone years (read as 2013, 2016, 2017, 2018, 2019, 2024 for Zeroqu and 2025 for Future), the five leadership names (not legible in the screenshot; roles are shown until names are added in `CONTENT.leadership`), five portraits and the team photo (`CONTENT.teamPhoto`).
9. **Brand colour.** Now taken from the logo: `#259BB5`, deepened to `#1A7F99` wherever white text sits on it so it passes WCAG AA.
10. **Careers.** The vacancies section and roles list were removed at the client's request; the page keeps the team culture and how to apply by email.

## 7. Deploying on your own host

- Add `<script>window.SITE_ROUTER = "path"</script>` before the site scripts. URLs become `/design-services/` instead of `#design-services`.
- Serve `index.html` for every route (rules included in `vercel.json` and `.htaccess`), and upload `sitemap.xml` and `robots.txt` to the web root.
- Keep `/wp-content/uploads/` reachable until images are moved, so old image backlinks keep working.
- For full SEO, prerender each route to static HTML (a Next.js port with static generation does this). Titles, descriptions and canonical URLs are already set per page.
