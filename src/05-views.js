<script>
/* ==========================================================================
   VIEWS — each page is a function that returns markup from CONTENT.
   They map 1:1 to React/Next components if you port the site:
   <Hero/>, <ServicesIndex/>, <ServicePage/>, <SubServicePage/>, <ProjectPage/> ...
   ========================================================================== */
const C = CONTENT;

/* ---------- routing mode ----------
   "hash"  → #design-services   (used for the hosted preview)
   "path"  → /design-services/  (production: same slugs as the current WordPress site)
   Set window.SITE_ROUTER = "path" before this script on your own host. */
const ROUTER = window.SITE_ROUTER === "path" ? "path" : "hash";
const SITE_URL = "https://21-knots.com";
const L = slug => ROUTER === "path" ? (slug === "home" ? "/" : `/${slug}/`) : `#${slug}`;

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const svc = slug => C.services[slug];
const areaOf = id => C.areas.find(a => a.id === id);
const telHref = n => "tel:" + n.replace(/[^\d+]/g, "");
const mapHref = addr => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr);
const firstSentence = t => { const m = String(t).match(/^.*?[.!?](\s|$)/); return m ? m[0].trim() : t; };

/* sub-service index: every block with an id becomes its own page */
const SUB = {};
Object.entries(C.services).forEach(([slug, s]) => s.blocks.forEach(b => { if (b.id) SUB[b.id] = { block: b, parent: slug }; }));
const countItems = b => (b.items ? b.items.length : 0) + (b.groups ? b.groups.reduce((m, g) => m + g.items.length, 0) : 0) + (b.defs ? b.defs.length : 0);
const titleOf = id => areaOf(id) ? areaOf(id).menuTitle : svc(id) ? svc(id).title : SUB[id] ? SUB[id].block.title.replace(/^./, c => c.toUpperCase()) : id;
const blurbOf = id => areaOf(id) ? areaOf(id).text : svc(id) ? firstSentence(svc(id).intro) : SUB[id] ? SUB[id].block.text : "";
const artOf = id => areaOf(id) ? areaOf(id).art : svc(id) ? svc(id).art : SUB[id] ? svc(SUB[id].parent).art : "hull";
const projectsFor = ids => C.projects.filter(p => p.services.some(s => ids.includes(s)));

const btn = (label, href, v = "", ext = false) =>
  `<span class="magnetic"><a href="${href}" class="btn ${v}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(label)}<span class="btn-ic">${Icon.arrow}${Icon.arrow}</span></a></span>`;

const crumbs = (...items) => `<nav class="crumbs" aria-label="Breadcrumb"><a href="${L("home")}">Home</a>${items.map(([l, h]) => `<span>${h ? `<a href="${L(h)}">${esc(l)}</a>` : esc(l)}</span>`).join("")}</nav>`;

const media = (art, img, alt, coords) => img
  ? `<img src="${img}" alt="${esc(alt)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`
  : `${Art(art)}${coords ? `<span class="coord" style="left:20px;top:16px">Fr. 0</span><span class="coord" style="right:20px;top:16px">Fr. 120</span><span class="coord" style="left:20px;bottom:14px">BL</span><span class="coord" style="right:20px;bottom:14px">Scale 1:200</span>` : ""}`;

const pageHero = ({ crumbs: cr, title, aside, art, img, coords = true, sheet = "Company", drawing }) => `
  <section class="phero"><div class="wrap">
    ${cr}
    <div class="phero-grid">
      <h1 class="h1 split">${esc(title)}</h1>
      ${aside ? `<p class="phero-aside" data-reveal style="--delay:.3s">${esc(aside)}</p>` : ""}
    </div>
    ${art || img ? `<div class="phero-art${img ? "" : " bp draw"}" data-clip${img ? "" : " data-draw"}>${media(art, img, title, coords)}${img ? "" : `<div class="titleblock" aria-hidden="true"><span>Drawing</span><span><b>${esc(drawing || title)}</b></span><span>Sheet</span><span>${esc(sheet)}</span><span>Scale</span><span>1:200</span><span>Rev.</span><span>${new Date().getFullYear()}</span></div>`}</div>` : ""}
  </div></section>`;

const ctaSection = (title = "Let's talk.", text = "Tell us about the vessel, the platform or the problem. An engineer, not a sales desk, will reply.") => `
  <section class="section cta"><div class="wrap">
    <h2 class="cta-title split"${title.length > 14 ? ' style="font-size:clamp(2.8rem,7.5vw,7.5rem)"' : ""}>${esc(title)}</h2>
    <div class="cta-row">
      <p>${esc(text)}</p>
      <div style="display:flex;flex-wrap:wrap;gap:12px">${btn("Contact us today", L("contact-us"))}${btn("Email us", "mailto:" + C.company.email, "btn--ghost")}</div>
    </div>
    <p style="margin-top:28px"><a class="cta-mail link link--under" href="mailto:${C.company.email}">${C.company.email}</a></p>
  </div></section>`;

const cardList = ids => `<div class="related">${ids.map(r => `<a class="rcard spot" href="${L(r)}"><div class="rcard-art bp">${Art(artOf(r))}</div><div><h3>${esc(titleOf(r))}</h3><p class="small" style="margin-top:8px">${esc(blurbOf(r))}</p></div></a>`).join("")}</div>`;

const projectCards = (list, reveal = true) => `<div class="pgrid">${list.map((pj, i) => `
  <a class="pcard" href="${L(pj.slug)}" data-cat="${esc(pj.category)}" data-cursor="Read"${reveal ? ` data-reveal style="--delay:${(i % 2) * .1}s"` : ""}>
    <div class="pcard-media${pj.img ? "" : " bp draw"}"${pj.img ? "" : " data-draw"}>${media(pj.art, pj.img, pj.title)}<span class="pcard-tag">${esc(pj.category)}</span><span class="pcard-open">${Icon.arrow}</span></div>
    <div class="pcard-meta"><h3>${esc(pj.title)}</h3></div>
    <p class="muted">${esc(pj.client)}</p>
  </a>`).join("")}</div>`;

const projectRows = list => `<div class="plist">${list.map(pj => `<a class="prow" href="${L(pj.slug)}" data-preview="${pj.art}" data-preview-label="${esc(pj.category)}">
    <h3>${esc(pj.title)}</h3><span class="muted">${esc(pj.client)}</span><span class="muted">${esc(pj.category)}</span><span class="prow-go">${Icon.arrow}</span></a>`).join("")}</div>`;

const relatedProjects = (ids, heading = "Related projects") => {
  const list = projectsFor(ids); if (!list.length) return "";
  return `<section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">Projects</span><h2 class="h2 split">${esc(heading)}</h2></div><p><a class="link link--under" href="${L("projects")}">All projects</a></p></div>
    ${projectRows(list)}</div></section>`;
};

const blockBody = b => `
  ${b.items ? `<ul class="checks">${b.items.map(it => `<li>${esc(it)}</li>`).join("")}</ul>` : ""}
  ${b.groups ? b.groups.map(g => `<h3 class="sub-h">${esc(g.h)}</h3><ul class="checks">${g.items.map(it => `<li>${esc(it)}</li>`).join("")}</ul>`).join("") : ""}
  ${b.defs ? `<dl class="defs">${b.defs.map(([dt, dd]) => `<div><dt>${esc(dt)}</dt><dd>${esc(dd)}</dd></div>`).join("")}</dl>` : ""}
  ${b.href ? `<div style="margin-top:28px">${btn(b.hrefLabel, b.href, "btn--ghost", true)}</div>` : ""}`;


const credentialsBlock = () => `
  <div class="creds">
    ${C.credentials.map((c, k) => `<div class="cred" data-reveal style="--delay:${k * .06}s"><span>${esc(c.k)}</span><p>${esc(c.v)}</p></div>`).join("")}
  </div>
  <div class="classbar" data-reveal><span class="classbar-l">Experienced with leading classification societies</span><ul>${C.classSocieties.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>`;

const portfoliosBlock = () => `
  <div class="portfolios" data-reveal>
    <div class="pf-link" aria-hidden="true"><i></i><b></b><b></b><b></b></div>
    ${C.portfolios.map((p, k) => `<article class="pf${k === 1 ? " pf--blue" : ""} spot">
      <div class="pf-art${k === 1 ? "" : " bp"}" aria-hidden="true">${Art(p.art)}</div>
      <div class="pf-head">${p.logo ? `<img class="pf-logo" src="${p.logo}" alt="${esc(p.title)}">` : `<h3>${esc(p.title)}</h3>`}<p>${esc(p.text)}</p></div>
      <ul>${p.items.map(([t, h]) => `<li><a href="${L(h)}">${esc(t)}${Icon.arrow}</a></li>`).join("")}</ul>
    </article>`).join("")}
  </div>`;

const clientsBlock = (head = "") => {
  const it = C.clientSegments, n = Math.ceil(10 / it.length) * it.length;
  return `
  <div class="arc" data-arc data-n="${it.length}" role="region" aria-roledescription="carousel" aria-label="Vessel types we work on">
    <div class="arc-stage">
      ${Array.from({ length: n }, (_, i) => { const c = it[i % it.length]; return `<div class="arc-card bp"${i < it.length ? ` tabindex="0" role="button" aria-label="${esc(c.t)}, ${i + 1} of ${it.length}"` : ' aria-hidden="true"'} data-i="${i}"><div class="arc-art">${Art(c.art)}</div><span class="arc-tag">${esc(c.t)}</span></div>`; }).join("")}
      <div class="arc-cap">
        ${head ? `<div class="arc-head"><span class="tag">Our clients</span><h2 class="arc-h">${esc(head)}</h2><p class="arc-sub">${esc(C.reach)}</p></div>` : ""}
        <div class="arc-now" aria-live="polite">
        <p class="arc-num"><b>01</b> / ${String(it.length).padStart(2, "0")}</p>
        <h3 class="arc-title">${esc(it[0].t)}</h3>
        <p class="arc-meta">${esc(it[0].m)}</p>
        <div class="arc-dots">${it.map((c, k) => `<button aria-label="Show ${esc(c.t)}" data-go="${k}"${k === 0 ? ' class="is-on"' : ""}></button>`).join("")}</div>
        </div>
      </div>
      <span class="arc-hint" aria-hidden="true">Scroll to turn</span>
    </div>
  </div>`;
};

/* ---------------- HOME ---------------- */
function viewHome() {
  const s = C.hero.slides;
  return `
  <section class="hero" id="hero">
    <div class="hero-card" id="hero-card">
      <canvas class="hero-canvas" id="ocean" aria-hidden="true"></canvas>
      <img class="hero-ship" id="hero-ship" src="%%SHIP%%" alt="" aria-hidden="true">
      <div class="wrap hero-inner">
        <h1 class="display hero-title split" data-hero id="hero-title">${esc(C.hero.title)}</h1>
        <div class="hero-bottom">
          <p class="hero-sub" data-reveal style="--delay:.55s">${esc(C.hero.sub)}</p>
          <div class="hero-cta" data-reveal style="--delay:.7s">${btn("Explore services", L("services"), "btn--white")}${btn("Start a project", L("contact-us"), "btn--glass")}</div>
        </div>
        <div class="hero-foot" data-reveal style="--delay:.9s">
          <div class="ticker" id="ticker" aria-live="polite">
            ${s.map((x, i) => `<div class="ticker-item${i === 0 ? " is-active" : ""}"><span class="ticker-count">${i + 1}/${s.length}</span><span>${esc(x.text)} <a class="link link--under" href="${L(x.link)}">${esc(x.label)}</a></span></div>`).join("")}
          </div>
          <span class="hero-scroll"><i></i>Scroll to explore</span>
        </div>
      </div>
    </div>
  </section>

  <div class="marquee" aria-label="Disciplines"><div class="marquee-track">
    ${[0, 1].map(n => C.disciplines.map(d => `<span${n ? ' aria-hidden="true"' : ""}>${esc(d)}</span>`).join("")).join("")}
  </div></div>

  <section class="section intro-wrap"><div class="wrap">
    <span class="tag" data-reveal>About 21 Knots</span>
    <p class="statement" data-scrub style="margin-top:28px">${esc(C.intro)}</p>
    <div class="bento">
      <div class="tile tile-globe" data-reveal>
        <div class="globe-head"><h3>Our offices</h3><p>${esc(C.reach)} Select an office on the globe.</p></div>
        <div class="globe-wrap" id="globe-wrap">
          <canvas id="globe" aria-label="Globe showing 21 Knots offices" role="img"></canvas>
          ${C.offices.map((o, k) => `<button class="globe-pin${o.labelLeft ? " globe-pin--left" : ""}" data-i="${k}" aria-pressed="false" aria-label="${esc(o.city)}: show office location"><i></i><span>${esc(o.label)}</span></button>`).join("")}
        </div>
        <div class="globe-card" id="globe-card" hidden><button class="globe-close" id="globe-close" aria-label="Close office details">${Icon.close}</button><div id="globe-card-body"></div></div>
      </div>
      <div class="tile tile-team spot" data-reveal style="--delay:.08s">
        <div class="big-n"><span data-count="200">200</span><sup>+</sup></div>
        <div><h3>People across the group</h3><div class="chips-s" style="margin-top:14px">${C.team.map(t => `<span>${esc(t.title)}</span>`).join("")}</div></div>
      </div>
      <div class="tile tile-iso" data-reveal style="--delay:.16s">
        <div class="seal">
          <svg viewBox="0 0 200 200" aria-hidden="true"><defs><path id="sealpath" d="M100 100 m-82 0 a82 82 0 1 1 164 0 a82 82 0 1 1 -164 0"/></defs>
            <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,.35)"/><circle cx="100" cy="100" r="66" fill="none" stroke="rgba(255,255,255,.35)"/>
            <text font-size="12" letter-spacing="2" fill="#fff"><textPath href="#sealpath" textLength="508" lengthAdjust="spacing">CERTIFIED QUALITY MANAGEMENT SYSTEM • ISO 9001:2015 • CERTIFIED •</textPath></text></svg>
          <b>ISO<small>9001:2015</small></b>
        </div>
      </div>
      <div class="tile tile-group spot" data-reveal style="--delay:.1s">
        <div><h3>One group, five locations</h3><p style="margin-top:10px">Design, operations, offshore consulting and software, under one quality system.</p></div>
        <div class="glist">${C.group.map(g => `<div><code>${g.code}</code><b>${esc(g.name)}</b><span>${esc(g.city)}</span></div>`).join("")}</div>
      </div>
    </div>
    <p style="margin-top:40px"><a class="link link--under" href="${L("about-21knots")}">About 21 Knots</a></p>
  </div></section>

  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead">
      <div><span class="tag">Service portfolio</span><h2 class="h2 split">Three industries, one engineering team.</h2></div>
      <p>Choose an area to see every service in it.</p>
    </div>
    <div class="spanels" id="spanels">
      ${C.areas.map((a, i) => `
      <article class="spanel${i === 0 ? " is-active" : ""}" data-i="${i}">
        <div class="spanel-art" aria-hidden="true">${Art(a.art)}</div>
        <button class="spanel-tab" aria-expanded="${i === 0}" aria-controls="sp-${a.id}">
          <span class="spanel-count">${String(a.services.length).padStart(2, "0")} services</span>
          <span class="spanel-name">${esc(a.title)}</span>
          <span class="spanel-plus" aria-hidden="true">${Icon.plus}</span>
        </button>
        <div class="spanel-body" id="sp-${a.id}">
          <h3 class="spanel-title">${esc(a.title)}</h3>
          <p class="spanel-text">${esc(a.text)}</p>
          <ul class="spanel-list">${a.services.map((sl, k) => `<li style="--k:${k}"><a href="${L(sl)}"><span>${esc(svc(sl).title)}</span>${Icon.arrow}</a></li>`).join("")}</ul>
          <a class="spanel-all" href="${L(a.id)}">All ${esc(a.title)} services ${Icon.right}</a>
        </div>
      </article>`).join("")}
    </div>
  </div></section>

  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">What 21 Knots does</span><h2 class="h2 split">Three connected portfolios. One maritime perspective.</h2></div><p>Fleet support in the yard and on board, engineering in the office, and software that keeps fleets efficient and compliant.</p></div>
    ${portfoliosBlock()}
  </div></section>

  <section class="section" style="padding-top:0"><div class="wrap">
    ${clientsBlock("Owners, operators and yards across every major vessel type.")}
    ${credentialsBlock()}
  </div></section>

  <section class="hs" id="caps">
    <div class="hs-sticky">
      <div class="wrap hs-top">
        <h2 class="h2 split" style="max-width:14ch">What we do on a project.</h2>
        <div class="hs-progress" aria-hidden="true"><i></i></div>
      </div>
      <div class="hs-track">
        ${C.capabilities.map(c => `
        <a class="cap" href="${L(c.link)}" data-cursor="Open">
          <div class="cap-top"><h3>${esc(c.title)}</h3><span class="cap-go">${Icon.arrow}</span></div>
          <div class="cap-art bp draw" data-draw>${Art(c.art)}</div>
          <p>${esc(c.text)}</p>
        </a>`).join("")}
        <a class="cap cap-end" href="${L("services")}">
          <h3>Every service, in one place.</h3>
          <span class="link link--under">View all services</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section"><div class="wrap">
    <div class="shead">
      <div><span class="tag">Ship design</span><h2 class="h2 split">From first sketch to cutting files.</h2></div>
      <p>The same team carries a vessel through every stage, so nothing is lost between concept and the yard floor.</p>
    </div>
    <div class="process" id="process">
      <div class="process-line"><i></i></div>
      ${C.process.map((st, i) => `<div class="step" data-reveal style="--delay:${i * .12}s">
        <span class="step-n">Stage ${i + 1} of ${C.process.length}</span>
        <h3 class="h3"><a href="${L(["concept-design", "basic-design", "production-design"][i])}">${esc(st.title)}</a></h3>
        <p>${esc(st.text)}</p>
        <ul>${st.items.map(it => `<li>${esc(it)}</li>`).join("")}</ul>
      </div>`).join("")}
    </div>
    <p style="margin-top:48px"><a class="link link--under" href="${L("design-services")}">See the full ship design scope</a></p>
  </div></section>

  <section class="band"><div class="wrap section">
    <div class="band-grid">
      <div style="grid-column:1/span 7">
        <span class="tag">Green services</span>
        <div class="band-big" style="margin-top:28px"><span class="split" data-split>IMO 2050</span><small>${esc(C.green.title)}</small></div>
      </div>
      <div class="band-list">
        <p style="color:rgba(255,255,255,.85);margin-bottom:28px;max-width:46ch">${esc(C.green.text)}</p>
        <ul>${C.green.items.map(it => `<li><b>${esc(it.k)}</b><span>${esc(it.v)}</span></li>`).join("")}</ul>
        <div style="margin-top:32px;display:flex;flex-wrap:wrap;gap:12px">${btn("Green services", L("green-services"), "btn--white")}${btn("EEXI & CII", L("eexi-cii"), "btn--white")}</div>
      </div>
    </div>
  </div>
  <svg class="band-waves" viewBox="0 0 1200 300" preserveAspectRatio="none" fill="none" stroke="#fff" stroke-width="1" aria-hidden="true">
    ${Array.from({ length: 9 }, (_, i) => `<path d="M0 ${60 + i * 28} C 200 ${40 + i * 28}, 400 ${90 + i * 28}, 600 ${60 + i * 28} S 1000 ${30 + i * 28}, 1200 ${60 + i * 28}"/>`).join("")}
  </svg>
  </section>

  <section class="section"><div class="wrap">
    <div class="shead">
      <div><span class="tag">Projects</span><h2 class="h2 split">Recent work.</h2></div>
      <p><a class="link link--under" href="${L("projects")}">All projects</a></p>
    </div>
    ${projectCards(C.projects)}
  </div></section>

  ${ctaSection()}`;
}

function officesBlock() {
  return `<div class="offices">${C.offices.map(o => `
    <div class="office" data-reveal>
      <div class="office-time" data-tz="${o.tz}">--<span>:</span>--</div>
      <span class="office-zone">${esc(o.zone)}</span>
      <h3>${esc(o.city)} <span class="muted small" style="font-weight:400">${esc(o.role)}</span></h3>
      <address>${esc(o.address)}</address>
      <div class="contact-lines">
        ${o.phones.map(ph => `<a href="${telHref(ph)}">${esc(ph)}</a>`).join("")}
        <a href="mailto:${o.email}">${o.email}</a>${o.web ? `<a href="${o.web}" target="_blank" rel="noopener noreferrer">zeroqu.com</a>` : ""}
        <a class="link" href="${mapHref(o.address)}" target="_blank" rel="noopener noreferrer" style="margin-top:6px;width:max-content">Open in Google Maps</a>
      </div>
    </div>`).join("")}</div>`;
}

/* ---------------- ABOUT ---------------- */
function viewAbout() {
  const J = C.journey;
  return `
  ${pageHero({ crumbs: crumbs(["About us"]), title: "Naval architects and engineers for the maritime and energy industries.", aside: C.company.blurb, art: "bodyplan", sheet: "Company", drawing: "About 21 Knots" })}
  <section class="section" style="padding-top:clamp(40px,5vw,80px)"><div class="wrap">
    <span class="tag">Company introduction</span>
    <p class="statement" data-scrub style="margin-top:28px">${esc(C.intro)}</p>
    <div class="pillars">${C.pillars.map((p, k) => `<div data-reveal style="--delay:${k * .06}s"><span>${String(k + 1).padStart(2, "0")}</span><b>${esc(p)}</b></div>`).join("")}</div>
  </div></section>

  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">Credentials</span><h2 class="h2 split">Trusted by owners and classification societies since 2014.</h2></div></div>
    ${credentialsBlock()}
  </div></section>

  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">What we do</span><h2 class="h2 split">Three connected portfolios.</h2></div></div>
    ${portfoliosBlock()}
  </div></section>

  <section class="section" style="padding-top:0"><div class="wrap">
    ${clientsBlock("Who we work with.")}
  </div></section>

  <section class="section journey-sec" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">${esc(J.title)}</span><h2 class="h2 split">Since 2014: from a small team to 200+ people.</h2></div><p>${esc(J.sub)} Scroll through the milestones that shaped 21 Knots.</p></div>
    <div class="tl" id="timeline">
      ${J.milestones.map((m, k) => `<div class="tl-item${k === J.milestones.length - 1 ? " tl-item--future" : ""}">
        <div class="tl-side"><span class="tl-dot" aria-hidden="true"><i></i></span><h3 class="tl-year">${esc(m.year)}</h3></div>
        <div class="tl-body">
          <span class="tl-year tl-year--m" aria-hidden="true">${esc(m.year)}</span>
          <h4 class="tl-title">${m.logo ? `<img class="tl-logo" src="${m.logo}" alt="${esc(m.title)}">` : esc(m.title)}</h4>
          <p class="tl-text">${esc(m.text)}</p>
          ${m.people || (m.where && m.where.length) ? `<div class="tl-chips">${m.people ? `<span class="tl-chip tl-chip--strong">${Icon.user}${esc(m.people)}</span>` : ""}${(m.where || []).map(w => `<span class="tl-chip">${esc(w)}</span>`).join("")}</div>` : ""}
          <div class="tl-art tl-art--${m.art.length}">${m.art.map(a => `<div class="tl-art-tile bp draw" data-draw>${Art(a)}</div>`).join("")}</div>
          <div class="tl-links">${m.links.map(([t, h]) => `<a class="link link--under" href="${L(h)}">${esc(t)}</a>`).join("")}${m.ext ? `<a class="link link--under" href="${m.ext[1]}" target="_blank" rel="noopener noreferrer">${esc(m.ext[0])}</a>` : ""}</div>
        </div>
      </div>`).join("")}
      <div class="tl-line" aria-hidden="true"><i></i></div>
    </div>
  </div></section>

  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">Our values</span><h2 class="h2 split">What we stand for.</h2></div><p>Five commitments that shape every project and every client relationship.</p></div>
    <div class="values">
      ${C.values.map((v, k) => `<article class="value value--${k + 1} spot" data-reveal style="--delay:${k * .06}s">
        <div class="value-top"><span class="value-ic">${Icon[v.icon]}</span><span class="value-n">${String(k + 1).padStart(2, "0")}</span></div>
        <div><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></div>
      </article>`).join("")}
    </div>
  </div></section>

  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">Our team</span><h2 class="h2 split">200+ people, one team.</h2></div><p>Every discipline a vessel or platform needs, working on the same model.</p></div>
    <div class="team-story">
      <p class="lead">${esc(C.teamStory)}</p>
      <div class="team">${C.team.map((t, i) => `<div data-reveal style="--delay:${i * .08}s"><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div>`).join("")}</div>
    </div>
    ${C.teamPhoto ? `<figure class="team-photo" data-reveal><img src="${C.teamPhoto}" alt="The 21 Knots team" loading="lazy"><figcaption><b>The 21 Knots team</b><span>200+ naval architects and engineers</span></figcaption></figure>` : ""}
  </div></section>

  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">Leadership team</span><h2 class="h2 split">The people steering the group.</h2></div></div>
    <div class="leaders">
      ${C.leadership.map((l, k) => `<article class="leader spot" data-reveal style="--delay:${k * .06}s">
        <div class="leader-photo">${l.photo ? `<img src="${l.photo}" alt="${esc(l.name || l.role)}" loading="lazy">` : `<span class="leader-ph">${Icon.user}</span>`}</div>
        <div class="leader-meta">${l.name ? `<h3>${esc(l.name)}</h3><p>${esc(l.role)}</p>${l.bio ? `<p class="leader-bio">${esc(l.bio)}</p>` : ""}<span class="leader-org">${esc(l.org)}</span>` : `<h3>${esc(l.role)}</h3><span class="leader-org">${esc(l.org)}</span>`}</div>
      </article>`).join("")}
    </div>
  </div></section>

  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">Group of companies</span><h2 class="h2 split">One group, five locations.</h2></div><p>${esc(C.company.iso)} certified.</p></div>
    <div class="table-wrap"><table class="table">
      <thead><tr><th scope="col">Company</th><th scope="col">Registered at</th></tr></thead>
      <tbody>${C.group.map(g => `<tr><td>${esc(g.name)}</td><td>${esc(g.place)}${g.href ? `<br><a href="${g.href}" target="_blank" rel="noopener noreferrer">zeroqu.com</a>` : ""}</td></tr>`).join("")}</tbody>
    </table></div>
  </div></section>
  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">Our services</span><h2 class="h2 split">What we do.</h2></div><p><a class="link link--under" href="${L("services")}">All services</a></p></div>
    ${cardList(C.areas.map(a => a.id))}
  </div></section>
  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">Company locations</span><h2 class="h2 split">Where to find us.</h2></div></div>
    ${officesBlock()}
  </div></section>
  ${ctaSection()}`;
}

/* ---------------- SERVICES LANDING ---------------- */
function viewServices() {
  return `
  ${pageHero({ crumbs: crumbs(["Services"]), title: "Services", aside: "Design, engineering and on-site work across ships, offshore assets, power plants, ports and shipyards." })}
  <section class="section" style="padding-top:0"><div class="wrap areas">
    ${C.areas.map(a => `
    <div class="area" id="area-${a.id}">
      <div class="area-l">
        <span class="tag">${a.services.length} services</span>
        <h2 class="h2 split" style="margin-top:20px"><a href="${L(a.id)}">${esc(a.title)}</a></h2>
        <p class="body-l" style="margin-top:20px">${esc(a.text)}</p>
        <p style="margin-top:20px"><a class="link link--under" href="${L(a.id)}">${esc(a.menuTitle)} overview</a></p>
        <div class="area-art bp draw" data-draw>${Art(a.art)}</div>
      </div>
      <div class="area-r area-list">
        ${a.services.map(sl => serviceRow(sl)).join("")}
      </div>
    </div>`).join("")}
  </div></section>
  ${ctaSection("Need something not listed?")}`;
}
function serviceRow(sl) {
  const s = svc(sl), subs = s.blocks.filter(b => b.id);
  return `<div class="svc-row">
    <a href="${L(sl)}"><div><b>${esc(s.title)}</b><span>${esc(firstSentence(s.intro))}</span></div>${Icon.arrow}</a>
    ${subs.length ? `<div class="subchips">${subs.map(b => `<a class="pill pill--link" href="${L(b.id)}">${esc(titleOf(b.id))}</a>`).join("")}</div>` : ""}
  </div>`;
}

/* ---------------- AREA HUB (Marine / Offshore / Power & Industrial) ---------------- */
function viewArea(id) {
  const a = areaOf(id);
  return `
  ${pageHero({ crumbs: crumbs(["Services", "services"], [a.menuTitle]), title: a.menuTitle, aside: a.text, art: a.art, sheet: "Services" })}
  <section class="section" style="padding-top:clamp(24px,3vw,48px)"><div class="wrap split2">
    <div class="s-l"><div class="sticky-l">
      <span class="tag">${a.services.length} services</span>
      <h2 class="h3" style="margin-top:18px;max-width:18ch">${esc(a.h2)}</h2>
      <div style="margin-top:28px">${btn("Contact us today", L("contact-us"), "btn--sm")}</div>
    </div></div>
    <div class="s-r area-list">${a.services.map(sl => serviceRow(sl)).join("")}</div>
  </div></section>
  ${relatedProjects(a.services)}
  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">Other areas</span><h2 class="h2 split">Explore more services</h2></div></div>
    ${cardList(C.areas.filter(x => x.id !== id).map(x => x.id))}
  </div></section>
  ${ctaSection()}`;
}

/* ---------------- SERVICE PAGE ---------------- */
function viewService(slug) {
  const s = svc(slug), a = areaOf(s.area);
  const ids = s.aggregate || [];
  const total = s.blocks.reduce((n, b) => n + countItems(b), 0);
  const related = a.services.filter(x => x !== slug).slice(0, 3);
  const navItems = s.blocks.length ? s.blocks.map((b, i) => [b.title, `blk-${i}`]) : ids.map((x, i) => [titleOf(x), `agg-${i}`]);
  return `
  ${pageHero({ crumbs: crumbs(["Services", "services"], [a.menuTitle, a.id], [s.title]), title: s.title, aside: s.intro, art: s.art, img: s.img, sheet: a.title })}
  <section class="section" style="padding-top:clamp(24px,3vw,48px)"><div class="wrap split2">
    <aside class="s-l"><div class="sticky-l">
      <span class="tag">${s.blocks.length ? `${total} line items` : `${ids.length} related services`}</span>
      <nav class="side-nav" aria-label="On this page">${navItems.map(([t, id]) => `<a href="${L(slug)}" data-jump="${id}">${esc(t)}</a>`).join("")}</nav>
      <div style="margin-top:36px">${btn("Discuss this service", L("contact-us"), "btn--sm")}</div>
    </div></aside>
    <div class="s-r">
      ${s.blocks.map((b, i) => `
      <div class="block" id="blk-${i}">
        <div class="block-head"><h2 class="h3">${b.id ? `<a href="${L(b.id)}">${esc(b.title)}</a>` : esc(b.title)}</h2><span class="small">${countItems(b)} ${countItems(b) === 1 ? "item" : "items"}</span></div>
        <p>${esc(b.text)}</p>
        ${blockBody(b)}
        ${b.id ? `<p style="margin-top:22px"><a class="link link--under" href="${L(b.id)}">${esc(titleOf(b.id))} page</a></p>` : ""}
      </div>`).join("")}
      ${ids.map((x, i) => `
      <div class="block" id="agg-${i}">
        <div class="block-head"><h2 class="h3"><a href="${L(x)}">${esc(titleOf(x))}</a></h2><span class="small">${svc(x) ? esc(areaOf(svc(x).area).title) : esc(svc(SUB[x].parent).title)}</span></div>
        <p>${esc(svc(x) ? svc(x).intro : SUB[x].block.text)}</p>
        <p><a class="link link--under" href="${L(x)}">Open ${esc(titleOf(x))}</a></p>
      </div>`).join("")}
    </div>
  </div></section>
  ${relatedProjects([slug, ...s.blocks.filter(b => b.id).map(b => b.id), ...ids])}
  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">${esc(a.title)}</span><h2 class="h2 split">Related services</h2></div></div>
    ${cardList(related)}
  </div></section>
  ${ctaSection("We provide custom made solutions.", "Tell us what you need from " + s.title.toLowerCase() + " and an engineer will reply.")}`;
}

/* ---------------- SUB-SERVICE PAGE ---------------- */
function viewSub(id) {
  const { block: b, parent } = SUB[id], p = svc(parent), a = areaOf(p.area);
  const sibs = p.blocks.filter(x => x.id);
  const idx = sibs.findIndex(x => x.id === id), prev = sibs[idx - 1], next = sibs[idx + 1];
  const title = titleOf(id);
  return `
  ${pageHero({ crumbs: crumbs(["Services", "services"], [a.menuTitle, a.id], [p.title, parent], [title]), title, aside: b.text, art: p.art, sheet: p.title })}
  <section class="section" style="padding-top:clamp(24px,3vw,48px)"><div class="wrap split2">
    <aside class="s-l"><div class="sticky-l">
      <span class="tag">Part of ${esc(p.title)}</span>
      <nav class="side-nav" aria-label="${esc(p.title)}">${sibs.map(x => `<a href="${L(x.id)}"${x.id === id ? ' class="is-active" aria-current="page"' : ""}>${esc(titleOf(x.id))}</a>`).join("")}</nav>
      <div style="margin-top:36px">${btn("Discuss this service", L("contact-us"), "btn--sm")}</div>
    </div></aside>
    <div class="s-r">
      <div class="block">
        <div class="block-head"><h2 class="h3">Scope</h2><span class="small">${countItems(b)} ${countItems(b) === 1 ? "item" : "items"}</span></div>
        ${blockBody(b)}
      </div>
      <div class="block">
        <div class="block-head"><h2 class="h3">${esc(p.title)}</h2><span class="small">Parent service</span></div>
        <p>${esc(p.intro)}</p>
        <p><a class="link link--under" href="${L(parent)}">Full ${esc(p.title)} scope</a></p>
      </div>
      <nav class="pager spotwrap" aria-label="More in ${esc(p.title)}">
        ${prev ? `<a href="${L(prev.id)}"><span class="small muted">Previous</span><b>${esc(titleOf(prev.id))}</b></a>` : `<span></span>`}
        ${next ? `<a href="${L(next.id)}" style="text-align:right"><span class="small muted">Next</span><b>${esc(titleOf(next.id))}</b></a>` : `<span></span>`}
      </nav>
    </div>
  </div></section>
  ${relatedProjects([id, parent])}
  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="shead"><div><span class="tag">${esc(a.title)}</span><h2 class="h2 split">Related services</h2></div></div>
    ${cardList([parent, ...a.services.filter(x => x !== parent)].slice(0, 3))}
  </div></section>
  ${ctaSection("We provide custom made solutions.", "Tell us what you need from " + title.toLowerCase() + " and an engineer will reply.")}`;
}

/* ---------------- PROJECTS ---------------- */
function viewProjects() {
  const cats = [...new Set(C.projects.map(p => p.category))];
  return `
  ${pageHero({ crumbs: crumbs(["Projects"]), title: "Projects", aside: "Retrofits, conversions and new designs for owners, equipment makers and operators in Europe and the US." })}
  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="chips filters" role="group" aria-label="Filter projects by category" id="pfilter">
      <label class="chip"><input type="radio" name="pcat" value="all" checked><span>All projects <span class="muted">${C.projects.length}</span></span></label>
      ${cats.map(c => `<label class="chip"><input type="radio" name="pcat" value="${esc(c)}"><span>${esc(c)} <span class="muted">${C.projects.filter(p => p.category === c).length}</span></span></label>`).join("")}
    </div>
    <div style="margin-top:36px">${projectCards(C.projects)}</div>
  </div></section>
  ${ctaSection("Your project next.")}`;
}

function viewProject(slug) {
  const i = C.projects.findIndex(p => p.slug === slug), pj = C.projects[i];
  const prev = C.projects[(i - 1 + C.projects.length) % C.projects.length], next = C.projects[(i + 1) % C.projects.length];
  return `
  ${pageHero({ crumbs: crumbs(["Projects", "projects"], [pj.title]), title: pj.title, aside: `Client: ${pj.client}.`, art: pj.art, img: pj.img, coords: false, sheet: pj.category })}
  <section class="section" style="padding-top:clamp(24px,3vw,48px)"><div class="wrap split2">
    <aside class="s-l"><div class="sticky-l">
      <dl class="defs facts-list">
        <div><dt>Client</dt><dd>${esc(pj.client)}</dd></div>
        <div><dt>Category</dt><dd>${esc(pj.category)}</dd></div>
        <div><dt>Services</dt><dd>${pj.services.map(s => `<a class="link link--under" href="${L(s)}">${esc(titleOf(s))}</a>`).join("<br>")}</dd></div>
      </dl>
      <div style="margin-top:32px">${btn("Discuss a similar project", L("contact-us"), "btn--sm")}</div>
    </div></aside>
    <div class="s-r">
      ${pj.body.length ? pj.body.map(sec => `<div class="block"><h2 class="h3">${esc(sec.h)}</h2>${sec.p ? `<p style="margin-top:14px">${esc(sec.p)}</p>` : ""}${sec.list ? `<ul class="checks" style="margin-top:18px">${sec.list.map(l => `<li>${esc(l)}</li>`).join("")}</ul>` : ""}</div>`).join("") : `
      <div class="block">
        <h2 class="h3">About this project</h2>
        <p style="margin-top:14px">${esc(pj.title)} for a ${esc(pj.client.charAt(0).toLowerCase() + pj.client.slice(1))}, delivered by our ${esc(titleOf(pj.services[0]).toLowerCase())} team.</p>
      </div>`}
      ${pj.services.map(s => `<div class="block"><div class="block-head"><h2 class="h3">${esc(titleOf(s))}</h2><span class="small">Service</span></div><p>${esc(blurbOf(s))}</p><p><a class="link link--under" href="${L(s)}">Open ${esc(titleOf(s))}</a></p></div>`).join("")}
      <nav class="pager spotwrap" aria-label="More projects">
        <a href="${L(prev.slug)}"><span class="small muted">Previous project</span><b>${esc(prev.title)}</b></a>
        <a href="${L(next.slug)}" style="text-align:right"><span class="small muted">Next project</span><b>${esc(next.title)}</b></a>
      </nav>
    </div>
  </div></section>
  ${ctaSection("Your project next.")}`;
}

/* ---------------- CAREERS ---------------- */
function viewCareers() {
  const c = C.careers;
  return `
  ${pageHero({ crumbs: crumbs(["Careers"]), title: c.title, aside: c.text })}
  <section class="section" style="padding-top:0"><div class="wrap split2">
    <div class="s-l"><span class="tag">Life at 21 Knots</span></div>
    <div class="s-r"><p class="lead">${esc(c.culture)}</p>
      <div class="team team--2" style="margin-top:48px">${C.team.map(t => `<div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div>`).join("")}</div>
    </div>
  </div></section>
  <section class="section" style="padding-top:0"><div class="wrap split2">
    <div class="s-l"><span class="tag">How to apply</span></div>
    <div class="s-r">
      <p class="lead">Email your CV and a short note about the work you want to do to <a class="link link--under" href="mailto:${C.company.careersEmail}?subject=${encodeURIComponent("Application")}">${esc(C.company.careersEmail)}</a>. Follow us on LinkedIn for news from the team.</p>
      <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:48px">
        ${btn("Email your CV", "mailto:" + C.company.careersEmail)}
        ${btn("Follow us on LinkedIn", c.linkedin, "btn--ghost", true)}
      </div>
    </div>
  </div></section>`;
}

/* ---------------- CONTACT ---------------- */
function viewContact() {
  const topics = ["Ship design", "Green retrofit", "Offshore", "On-site / survey", "Power & industrial", "Careers", "Something else"];
  const hq = C.offices[0];
  return `
  <section class="ct-top"><div class="wrap ct-grid">
    <div class="ct-intro">
      ${crumbs(["Contact us"])}
      <h1 class="h1 split">Let's talk.</h1>
      <p class="ct-lead" data-reveal style="--delay:.25s">Tell us about the vessel, the platform or the problem. An engineer, not a sales desk, will reply.</p>
      <div class="ct-quick" data-reveal style="--delay:.35s">
        <a href="mailto:${C.company.email}"><span>Email</span><b>${esc(C.company.email)}</b></a>
        <a href="${telHref(hq.phones[0])}"><span>Call headquarters</span><b>${esc(hq.phones[0])}</b></a>
      </div>
      <div class="socials" aria-label="Follow us" data-reveal style="--delay:.45s">${C.company.socials.map(s => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)}">${Icon[s.icon]}</a>`).join("")}</div>
    </div>
    <div class="ct-card" data-reveal style="--delay:.15s">
      <h2 class="h3">Send us a message</h2>
      <form class="form" id="enquiry" novalidate autocomplete="on">
        <div class="hp" aria-hidden="true"><label for="f-website">Leave this field empty</label><input id="f-website" name="website" tabindex="-1" autocomplete="off"></div>
        <div class="field field--full"><span class="ct-label" id="topic-l">What is it about?</span>
          <div class="chips" role="group" aria-labelledby="topic-l">${topics.map((t, i) => `<label class="chip"><input type="radio" name="topic" value="${esc(t)}"${i === 0 ? " checked" : ""}><span>${esc(t)}</span></label>`).join("")}</div>
        </div>
        <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" autocomplete="name" maxlength="80" required><span class="field-err" data-err="name"></span></div>
        <div class="field"><label for="f-email">Email address</label><input id="f-email" name="email" type="email" autocomplete="email" maxlength="120" required><span class="field-err" data-err="email"></span></div>
        <div class="field"><label for="f-phone">Phone number <em>optional</em></label><input id="f-phone" name="phone" type="tel" autocomplete="tel" maxlength="20"><span class="field-err" data-err="phone"></span></div>
        <div class="field"><label for="f-subject">Subject <em>optional</em></label><input id="f-subject" name="subject" maxlength="120"></div>
        <div class="field field--full"><label for="f-msg">Message</label><span class="field-count" id="f-count">0/180</span><textarea id="f-msg" name="message" maxlength="180" required></textarea><span class="field-err" data-err="message"></span></div>
        <div class="field--full form-foot"><button class="btn" type="submit" id="f-submit">Send message<span class="btn-ic">${Icon.arrow}${Icon.arrow}</span></button><p class="small muted">We use your details only to reply. <a class="link link--under" href="${L("privacy-policy")}">Privacy policy</a></p></div>
        <div class="field--full form-alert" id="f-alert" role="alert" hidden></div>
      </form>
    </div>
  </div></section>

  <section class="section ct-offices"><div class="wrap">
    <div class="shead"><div><span class="tag">Our offices</span><h2 class="h2 split">Five locations, one team.</h2></div><p>Visit, call or write to the office nearest you.</p></div>
    <div class="ct-office-grid">
      ${C.offices.map((o, k) => `<article class="ct-office${k === 0 ? " ct-office--hq" : ""} spot" data-reveal style="--delay:${k * .06}s">
        <div class="ct-office-top"><h3>${esc(o.label)}</h3><span class="ct-role">${esc(o.role)}</span></div>
        <address>${esc(o.address)}</address>
        <div class="ct-lines">
          ${o.phones.map(ph => `<a href="${telHref(ph)}">${esc(ph)}</a>`).join("")}
          <a href="mailto:${o.email}">${esc(o.email)}</a>
        </div>
        <a class="ct-map" href="${mapHref(o.address)}" target="_blank" rel="noopener noreferrer">Open in Google Maps ${Icon.arrow}</a>
      </article>`).join("")}
    </div>
  </div></section>`;
}

/* ---------------- POLICY ---------------- */
function viewPrivacy() {
  return `
  ${pageHero({ crumbs: crumbs(["Policy"], ["Privacy policy"]), title: "Privacy policy" })}
  <section class="section" style="padding-top:0"><div class="wrap split2">
    <div class="s-l"><div class="sticky-l"><span class="tag">21 Knots Design &amp; Consulting Pvt Ltd</span>
      <nav class="side-nav" aria-label="Sections">${C.privacy.map((s, i) => `<a href="${L("privacy-policy")}" data-jump="pp-${i}">${esc(s.h)}</a>`).join("")}</nav>
      <p class="small muted" style="margin-top:28px"><a class="link link--under" href="${L("undertaking")}">Undertaking</a></p>
    </div></div>
    <article class="s-r prose">${C.privacy.map((s, i) => `<section id="pp-${i}"><h2>${esc(s.h)}</h2>${s.p ? `<p>${esc(s.p)}</p>` : ""}${s.list ? `<ul>${s.list.map(l => `<li>${esc(l)}</li>`).join("")}</ul>` : ""}</section>`).join("")}</article>
  </div></section>`;
}
function viewUndertaking() {
  const docs = C.undertaking;
  return `
  ${pageHero({ crumbs: crumbs(["Policy"], ["Undertaking"]), title: "Undertaking" })}
  <section class="section" style="padding-top:0"><div class="wrap split2">
    <div class="s-l"><div class="sticky-l"><span class="tag">Documents</span>
      <nav class="side-nav" aria-label="Documents">${docs.map((d, i) => `<a href="${L("undertaking")}" data-jump="ud-${i}">${esc(d.h)}</a>`).join("")}</nav>
      <p class="small muted" style="margin-top:28px"><a class="link link--under" href="${L("privacy-policy")}">Privacy policy</a></p>
    </div></div>
    <article class="s-r prose">${docs.map((d, i) => `<section id="ud-${i}"><h2>${esc(d.h)}</h2>${d.img ? `<img src="${d.img}" alt="${esc(d.h)}" style="margin-top:20px;border-radius:14px;border:1px solid var(--line)">` : `<div class="doc-slot" style="margin-top:20px">${esc(d.h)}: document image (${esc(d.file)})</div>`}</section>`).join("")}</article>
  </div></section>`;
}

function viewNotFound() {
  return `
  ${pageHero({ crumbs: crumbs(["Page not found"]), title: "This page moved or never existed.", aside: "Use the links below, or go back to the home page." })}
  <section class="section" style="padding-top:0"><div class="wrap">
    ${cardList(C.areas.map(a => a.id))}
    <div style="margin-top:40px;display:flex;gap:12px;flex-wrap:wrap">${btn("Home", L("home"))}${btn("Contact us", L("contact-us"), "btn--ghost")}</div>
  </div></section>`;
}

/* ---------------- NAV + FOOTER ---------------- */
const NAV = [
  { label: "About Us", href: "about-21knots" },
  { label: "Services", mega: true, href: "services" },
  { label: "Projects", href: "projects" },
  { label: "Careers", href: "careers" }
];

function renderChrome() {
  document.querySelector(".nav .logo").setAttribute("href", L("home"));
  document.querySelector(".nav-right .btn").setAttribute("href", L("contact-us"));
  document.getElementById("nav-links").innerHTML = NAV.map(n => n.mega
    ? `<button class="nav-link" id="mega-btn" aria-expanded="false" aria-controls="mega" data-route="${n.href}">${n.label}${Icon.chev}</button>`
    : `<a class="nav-link" href="${L(n.href)}" data-route="${n.href}">${n.label}</a>`).join("");

  document.getElementById("mega").innerHTML = `<div class="wrap mega-inner">
    <div class="mega-intro"><h3 class="h3">Services</h3><p>Design, engineering and on-site work for ships, offshore assets and industry.</p><p style="margin-top:20px"><a class="link link--under" href="${L("services")}">All services</a></p></div>
    ${C.areas.map(a => `<div class="mega-col"><h3><a href="${L(a.id)}">${esc(a.menuTitle)}</a></h3><ul>${a.services.map((s, i) => `<li style="--i:${i}"><a href="${L(s)}">${esc(svc(s).title)}</a></li>`).join("")}</ul></div>`).join("")}
  </div>`;

  document.getElementById("mmenu").innerHTML = `
    <ul class="mmenu-list">
      <li style="--i:0"><a href="${L("home")}">Home</a></li>
      <li style="--i:1"><a href="${L("about-21knots")}">About Us</a></li>
      <li style="--i:2"><button id="mm-svc" aria-expanded="false" aria-controls="mm-sub">Services ${Icon.plus.replace("<svg", '<svg style="width:18px;height:18px"')}</button>
        <div class="mmenu-sub" id="mm-sub"><div><div><a href="${L("services")}"><b>All services</b></a>${C.areas.map(a => `<h4><a href="${L(a.id)}">${esc(a.menuTitle)}</a></h4>${a.services.map(s => `<a href="${L(s)}">${esc(svc(s).title)}</a>`).join("")}`).join("")}</div></div></div></li>
      <li style="--i:3"><a href="${L("projects")}">Projects</a></li>
      <li style="--i:4"><a href="${L("careers")}">Careers</a></li>
      <li style="--i:5"><a href="${L("contact-us")}">Contact Us</a></li>
    </ul>
    <div class="mmenu-foot"><a href="mailto:${C.company.email}">${C.company.email}</a><a href="${telHref(C.offices[0].phones[0])}">${C.offices[0].phones[0]}</a><span><a href="${L("privacy-policy")}">Privacy policy</a> &nbsp; <a href="${L("undertaking")}">Undertaking</a></span></div>`;

  document.getElementById("footer").innerHTML = `<div class="wrap">
    <div class="footer-grid">
      <div>
        <a href="${L("home")}" class="logo" aria-label="21 Knots, home"><img src="${LOGO}" alt="21 Knots" width="168" height="38"></a>
        <p class="footer-blurb">${esc(C.company.blurb)} ${esc(C.company.iso)} certified.</p>
        <div class="socials">${C.company.socials.map(s => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)}">${Icon[s.icon]}</a>`).join("")}</div>
      </div>
      <div><h4>Our company</h4><ul><li><a href="${L("about-21knots")}">About us</a></li><li><a href="${L("projects")}">Projects</a></li><li><a href="${L("careers")}">Careers</a></li><li><a href="${L("contact-us")}">Contact us</a></li></ul></div>
      <div><h4>Our services</h4><ul>${C.areas.map(a => `<li><a href="${L(a.id)}">${esc(a.footerTitle)}</a></li>`).join("")}<li><a href="${L("green-services")}">Green services</a></li><li><a href="${L("services")}">All services</a></li></ul></div>
      <div><h4>Contact details</h4><ul>${C.offices.map(o => `<li class="addr"><b style="color:var(--ink);font-weight:500">${esc(o.label)}</b><br>${o.phones.length ? `<a href="${telHref(o.phones[0])}">${esc(o.phones[0])}</a>` : `<a href="mailto:${o.email}">${o.email}</a>`}</li>`).join("")}<li><a href="mailto:${C.company.email}">${C.company.email}</a></li></ul></div>
    </div>
    <div class="footer-word" id="footer-word" aria-hidden="true"><img src="${LOGO}" alt=""></div>
    <div class="footer-bar">
      <span>© ${new Date().getFullYear()} 21 Knots. All rights reserved.</span>
      <nav aria-label="Policy"><a href="${L("privacy-policy")}">Privacy policy</a><a href="${L("undertaking")}">Undertaking</a><a href="${L("home")}" data-top>Back to top</a></nav>
    </div>
  </div>`;
}

/* ---------------- ROUTES ----------------
   Keys are the slugs of the current WordPress site, so /design-services/
   stays /design-services/. ALIASES catch old or broken internal links. */
const ROUTES = {
  home: { view: viewHome, label: "Home", desc: C.company.blurb },
  "about-21knots": { view: viewAbout, label: "About Us", desc: C.company.blurb },
  services: { view: viewServices, label: "Services", desc: "Design, engineering and on-site services for ships, offshore assets, power plants, ports and shipyards." },
  projects: { view: viewProjects, label: "Projects", desc: "Retrofits, conversions and new designs by 21 Knots." },
  careers: { view: viewCareers, label: "Careers", desc: C.careers.text },
  "contact-us": { view: viewContact, label: "Contact Us", desc: "Contact 21 Knots in Thane, Singapore and Ajman." },
  "privacy-policy": { view: viewPrivacy, label: "Privacy Policy", desc: "How 21 Knots collects, uses and protects personal information." },
  undertaking: { view: viewUndertaking, label: "Undertaking", desc: "Undertaking on Type A status and organisation chart." }
};
C.areas.forEach(a => ROUTES[a.id] = { view: () => viewArea(a.id), label: a.menuTitle, parent: "services", desc: a.text });
Object.keys(C.services).forEach(sl => ROUTES[sl] = { view: () => viewService(sl), label: C.services[sl].title, parent: "services", desc: firstSentence(C.services[sl].intro) });
Object.keys(SUB).forEach(id => ROUTES[id] = { view: () => viewSub(id), label: titleOf(id), parent: "services", desc: SUB[id].block.text });
C.projects.forEach(p => ROUTES[p.slug] = { view: () => viewProject(p.slug), label: p.title, parent: "projects", desc: `${p.title} for a ${p.client}.` });
ROUTES["not-found"] = { view: viewNotFound, label: "Page not found", desc: "" };

const ALIASES = { about: "about-21knots", "about-us": "about-21knots", contact: "contact-us", policy: "privacy-policy", "marine": "marine-services" };
</script>
