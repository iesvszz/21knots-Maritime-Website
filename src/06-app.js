<script>
/* ==========================================================================
   APP — router, motion and interaction layer. No dependencies.
   ========================================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(pointer: fine)").matches;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  document.documentElement.classList.add("js");
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  /* ---------------- frame loop ---------------- */
  const frameFns = new Set();
  const onFrame = fn => { frameFns.add(fn); return () => frameFns.delete(fn); };
  (function loop(t) { frameFns.forEach(fn => fn(t)); requestAnimationFrame(loop); })(0);

  /* ---------------- smooth scroll (wheel inertia, native everywhere else) ---------------- */
  const Smooth = {
    target: 0, current: 0, running: false, enabled: !RM && FINE,
    max: () => document.documentElement.scrollHeight - innerHeight,
    init() {
      this.target = this.current = scrollY;
      if (!this.enabled) return;
      addEventListener("wheel", e => {
        if (e.ctrlKey || e.defaultPrevented) return;
        if (e.target.closest && e.target.closest(".mmenu, .mega, textarea, .table-wrap, [data-native-scroll]")) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        e.preventDefault();
        const d = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
        if (!this.running) this.current = scrollY;
        this.target = clamp(this.target + d, 0, this.max());
        this.start();
      }, { passive: false });
      addEventListener("scroll", () => { if (!this.running) this.target = this.current = scrollY; }, { passive: true });
    },
    start() {
      if (this.running) return;
      this.running = true;
      const step = () => {
        this.current = lerp(this.current, this.target, 0.095);
        if (Math.abs(this.target - this.current) < 0.4) { this.current = this.target; scrollTo(0, this.current); this.running = false; return; }
        scrollTo(0, this.current);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    to(y) {
      y = clamp(y, 0, this.max());
      if (!this.enabled) { scrollTo({ top: y, behavior: RM ? "auto" : "smooth" }); return; }
      this.current = scrollY; this.target = y; this.start();
    },
    reset(y = 0) { this.running = false; this.target = this.current = y; scrollTo(0, y); }
  };

  /* ---------------- cursor ---------------- */
  const Cursor = (() => {
    const el = $("#cursor"), label = $("#cursor-label");
    if (!FINE || RM) { el.style.display = "none"; return { refresh() {} }; }
    const pos = { x: -100, y: -100 }, dot = { x: -100, y: -100 }, ring = { x: -100, y: -100 };
    const d = el.children[0], r = el.children[1];
    addEventListener("pointermove", e => { pos.x = e.clientX; pos.y = e.clientY; }, { passive: true });
    onFrame(() => {
      dot.x = lerp(dot.x, pos.x, .5); dot.y = lerp(dot.y, pos.y, .5);
      ring.x = lerp(ring.x, pos.x, .16); ring.y = lerp(ring.y, pos.y, .16);
      d.style.translate = `${dot.x}px ${dot.y}px`; r.style.translate = `${ring.x}px ${ring.y}px`;
    });
    document.addEventListener("pointerover", e => {
      const lab = e.target.closest("[data-cursor]");
      if (lab) { label.textContent = lab.dataset.cursor; el.classList.add("is-label"); el.classList.remove("is-hover"); return; }
      el.classList.remove("is-label");
      el.classList.toggle("is-hover", !!e.target.closest("a, button, label, input, textarea"));
    });
    document.addEventListener("pointerleave", () => el.classList.remove("is-label", "is-hover"));
    return { refresh() { el.classList.remove("is-label", "is-hover"); } };
  })();

  /* ---------------- nav ---------------- */
  const nav = $("#nav"), mega = $("#mega"), burger = $("#burger");
  let megaTimer;
  const setMega = open => {
    clearTimeout(megaTimer);
    mega.classList.toggle("is-open", open);
    const b = $("#mega-btn"); if (b) b.setAttribute("aria-expanded", open);
    if (open) nav.classList.add("is-scrolled");
  };
  const setMenu = open => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.documentElement.style.overflow = open ? "hidden" : "";
  };
  function initNav() {
    const b = $("#mega-btn");
    b.addEventListener("click", () => setMega(!mega.classList.contains("is-open")));
    if (FINE) {
      b.addEventListener("pointerenter", () => setMega(true));
      [b, mega].forEach(x => {
        x.addEventListener("pointerleave", () => { megaTimer = setTimeout(() => setMega(false), 180); });
        x.addEventListener("pointerenter", () => clearTimeout(megaTimer));
      });
    }
    burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    $("#mm-svc").addEventListener("click", e => {
      const open = !$("#mm-sub").classList.contains("is-open");
      $("#mm-sub").classList.toggle("is-open", open); e.currentTarget.setAttribute("aria-expanded", open);
    });
    addEventListener("keydown", e => { if (e.key === "Escape") { setMega(false); setMenu(false); } });
    let lastY = 0;
    onFrame(() => {
      const y = scrollY;
      if (Math.abs(y - lastY) < 2) return;
      const menuOpen = mega.classList.contains("is-open") || document.body.classList.contains("menu-open");
      nav.classList.toggle("is-scrolled", y > 20 || menuOpen);
      if (!menuOpen) nav.classList.toggle("is-hidden", y > 160 && y > lastY);
      lastY = y;
    });
  }

  /* ---------------- per-page components ---------------- */
  let disposers = [];
  const keep = fn => disposers.push(fn);
  let io;

  function splitText(root) {
    $$(".split", root).forEach(el => {
      if (el.dataset.done) return; el.dataset.done = 1;
      const base = el.hasAttribute("data-hero") ? .25 : 0;
      const words = el.textContent.trim().split(/\s+/);
      el.setAttribute("aria-label", el.textContent.trim());
      el.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true"><span class="wi" style="--d:${(base + i * .045).toFixed(3)}">${esc(w)}</span></span>`).join(" ");
      el._splitEnd = (base + words.length * .045 + 1.25) * 1000;
    });
  }

  function observe(root) {
    io && io.disconnect();
    io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      const t = en.target; t.classList.add("is-in"); io.unobserve(t);
      if (t._splitEnd) setTimeout(() => t.classList.add("is-done"), t._splitEnd);
      if (t.matches("[data-count]")) countUp(t);
      if (t.matches("[data-draw]")) drawIn(t);
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    $$(".split, [data-reveal], [data-draw], [data-count]", root).forEach(el => io.observe(el));
  }

  function drawIn(el) {
    if (RM || !el.animate) { el.classList.add("is-drawn"); return; }
    $$("[pathLength]", el).forEach((pa, i) => {
      const a = pa.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1900, delay: i * 45, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
      a.onfinish = () => { pa.style.strokeDashoffset = "0"; a.cancel(); };
    });
  }

  function countUp(el) {
    const n = +el.dataset.count, t0 = performance.now(), dur = 1600;
    if (RM) { el.textContent = n; return; }
    const tick = t => {
      const p = clamp((t - t0) / dur), e = 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(n * (p === 1 ? 1 : e));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function scrubStatements(root) {
    $$("[data-scrub]", root).forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.setAttribute("aria-label", el.textContent.trim());
      el.innerHTML = words.map(w => `<span class="sw" aria-hidden="true">${esc(w)}</span>`).join(" ");
      const spans = $$(".sw", el);
      if (RM) { spans.forEach(s => s.style.setProperty("--o", 1)); return; }
      keep(onFrame(() => {
        const r = el.getBoundingClientRect(), vh = innerHeight;
        if (r.bottom < -100 || r.top > vh + 100) return;
        const p = clamp((vh * .82 - r.top) / (r.height + vh * .25));
        const f = p * (spans.length + 4);
        spans.forEach((s, i) => { const o = clamp(f - i, 0, 1); const v = (.16 + o * .84).toFixed(3); if (s._o !== v) { s._o = v; s.style.setProperty("--o", v); } });
      }));
    });
  }

  /* home: expanding service panels. Hover or focus opens a panel on desktop; tap on touch. */
  function servicePanels(root) {
    const wrap = $("#spanels", root); if (!wrap) return;
    const panels = $$(".spanel", wrap);
    const open = p => panels.forEach(x => { const on = x === p; x.classList.toggle("is-active", on); $(".spanel-tab", x).setAttribute("aria-expanded", on); });
    panels.forEach(p => {
      $(".spanel-tab", p).addEventListener("click", () => open(p));
      if (FINE) p.addEventListener("pointerenter", () => open(p));
      p.addEventListener("focusin", () => open(p));
    });
  }

  function accordions(root) {
    $$(".srow", root).forEach(row => {
      $(".srow-head", row).addEventListener("click", () => {
        const open = !row.classList.contains("is-open");
        $$(".srow", root).forEach(r => { r.classList.remove("is-open"); $(".srow-head", r).setAttribute("aria-expanded", "false"); });
        if (open) { row.classList.add("is-open"); $(".srow-head", row).setAttribute("aria-expanded", "true"); }
      });
    });
  }

  /* hover preview that follows the cursor */
  const preview = document.createElement("div");
  preview.className = "preview"; preview.setAttribute("aria-hidden", "true");
  document.body.appendChild(preview);
  const pv = { x: 0, y: 0, tx: 0, ty: 0, rot: 0 };
  if (FINE && !RM) onFrame(() => {
    const nx = lerp(pv.x, pv.tx, .14), ny = lerp(pv.y, pv.ty, .14);
    pv.rot = lerp(pv.rot, clamp((pv.tx - pv.x) * .06, -8, 8), .12);
    pv.x = nx; pv.y = ny;
    preview.style.left = nx + "px"; preview.style.top = ny + "px"; preview.style.rotate = pv.rot + "deg";
  });
  function previews(root) {
    if (!FINE || RM || innerWidth < 900) return;
    $$("[data-preview]", root).forEach(el => {
      const hit = $(".srow-head", el) || el;
      hit.addEventListener("pointerenter", e => {
        preview.innerHTML = Art(el.dataset.preview) + `<span class="preview-label">${esc(el.dataset.previewLabel || "")}</span>`;
        pv.x = pv.tx = e.clientX; pv.y = pv.ty = e.clientY;
        preview.classList.add("is-on");
      });
      hit.addEventListener("pointermove", e => { pv.tx = e.clientX + 40; pv.ty = e.clientY; });
      hit.addEventListener("pointerleave", () => preview.classList.remove("is-on"));
    });
    keep(() => preview.classList.remove("is-on"));
  }

  function hscroll(root) {
    const sec = $(".hs", root); if (!sec) return;
    const track = $(".hs-track", sec), bar = $(".hs-progress", sec);
    let dist = 0;
    const measure = () => {
      if (innerWidth <= 900) { sec.style.height = ""; track.style.transform = ""; dist = 0; return; }
      dist = Math.max(0, track.scrollWidth - innerWidth);
      sec.style.height = (innerHeight + dist) + "px";
    };
    measure(); addEventListener("resize", measure); keep(() => removeEventListener("resize", measure));
    let last = -1;
    keep(onFrame(() => {
      if (!dist) return;
      const r = sec.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - innerHeight));
      if (p === last) return; last = p;
      track.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
      bar.style.setProperty("--p", p.toFixed(4));
    }));
  }

  function processLine(root) {
    const el = $("#process", root); if (!el) return;
    const line = $(".process-line", el);
    keep(onFrame(() => {
      const r = el.getBoundingClientRect();
      line.style.setProperty("--p", clamp((innerHeight * .8 - r.top) / (r.height * .9)).toFixed(3));
    }));
  }

  function clocks(root) {
    const els = $$("[data-tz]", root); if (!els.length) return;
    const fmts = new Map();
    const tick = () => els.forEach(el => {
      const tz = el.dataset.tz;
      if (!fmts.has(tz)) fmts.set(tz, new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }));
      const [h, m] = fmts.get(tz).format(new Date()).split(":");
      el.innerHTML = `${h}<span>:</span>${m}`;
    });
    tick(); const id = setInterval(tick, 10000); keep(() => clearInterval(id));
  }

  function ticker(root) {
    const t = $("#ticker", root); if (!t) return;
    const items = $$(".ticker-item", t); let i = 0;
    const id = setInterval(() => {
      const cur = items[i]; i = (i + 1) % items.length; const nx = items[i];
      cur.classList.remove("is-active"); cur.classList.add("is-leaving");
      nx.classList.remove("is-leaving"); nx.classList.add("is-active");
      setTimeout(() => cur.classList.remove("is-leaving"), 900);
    }, 5200);
    keep(() => clearInterval(id));
  }

  function magnetic(root) {
    if (!FINE || RM) return;
    $$(".magnetic", root).forEach(m => {
      const c = m.firstElementChild; if (!c || m.dataset.mag) return; m.dataset.mag = 1;
      m.addEventListener("pointermove", e => {
        const r = m.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .22, y = (e.clientY - r.top - r.height / 2) * .32;
        c.style.transition = "transform .25s cubic-bezier(.16,1,.3,1), color .45s cubic-bezier(.16,1,.3,1)";
        c.style.transform = `translate(${x}px, ${y}px)`;
      });
      m.addEventListener("pointerleave", () => { c.style.transition = "transform .8s cubic-bezier(.16,1,.3,1), color .45s cubic-bezier(.16,1,.3,1)"; c.style.transform = ""; });
    });
  }

  function jumps(root) {
    $$("[data-jump]", root).forEach(a => a.addEventListener("click", e => {
      e.preventDefault();
      const t = document.getElementById(a.dataset.jump); if (!t) return;
      Smooth.to(t.getBoundingClientRect().top + scrollY - 110);
    }));
    const links = $$(".side-nav a[data-jump]", root); if (!links.length) return;
    const blocks = links.map(a => document.getElementById(a.dataset.jump));
    keep(onFrame(() => {
      let idx = 0; blocks.forEach((b, i) => { if (b && b.getBoundingClientRect().top < innerHeight * .4) idx = i; });
      links.forEach((a, i) => a.classList.toggle("is-active", i === idx));
    }));
  }

  /* contact form ---------------------------------------------------------
     Integration point: replace sendEnquiry() with a call to your form
     endpoint (Formspree, a Next.js route, HubSpot ...). Resolve on success. */
  async function sendEnquiry(data) {
    const ep = window.SITE_FORM_ENDPOINT;
    if (ep) {
      // only send to an https endpoint, never with cookies, and give up after 15 s
      let url; try { url = new URL(ep, location.href); } catch { throw new Error("The form endpoint is not a valid URL."); }
      if (url.protocol !== "https:") throw new Error("The form endpoint must use https.");
      const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 15000);
      try {
        const res = await fetch(url.href, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), credentials: "omit", referrerPolicy: "strict-origin-when-cross-origin", signal: ctl.signal });
        if (!res.ok) throw new Error("The server did not accept the message (" + res.status + ").");
      } catch (e) { throw new Error(e.name === "AbortError" ? "The server took too long to answer." : e.message); }
      finally { clearTimeout(timer); }
      return { sent: true };
    }
    return { sent: false };
  }
  const clean = (v, max) => String(v || "").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
  let lastSend = 0;
  function contactForm(root) {
    const f = $("#enquiry", root); if (!f) return;
    const openedAt = performance.now();
    const msg = $("#f-msg", f), count = $("#f-count", f);
    msg.addEventListener("input", () => count.textContent = `${msg.value.length}/180`);
    const setErr = (name, text) => {
      const e = $(`[data-err="${name}"]`, f); if (e) e.textContent = text || "";
      const field = f.elements[name].closest(".field"); field.classList.toggle("is-error", !!text);
    };
    f.addEventListener("submit", async e => {
      e.preventDefault();
      const raw = Object.fromEntries(new FormData(f));
      // spam guards: hidden honeypot field, minimum time on page, one message per 30 s
      if (raw.website) return;
      if (performance.now() - openedAt < 2500 || Date.now() - lastSend < 30000) { const al = $("#f-alert", f); al.textContent = "Please wait a moment before sending."; al.hidden = false; return; }
      const d = { topic: clean(raw.topic, 40), name: clean(raw.name, 80), email: clean(raw.email, 120), phone: clean(raw.phone, 20), subject: clean(raw.subject, 120), message: String(raw.message || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, 180) };
      let ok = true;
      setErr("name"); setErr("email"); setErr("message"); setErr("phone");
      if (!d.name.trim()) { setErr("name", "Enter your name."); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { setErr("email", "Enter an email address like name@company.com."); ok = false; }
      if (!d.message.trim()) { setErr("message", "Write a short message so we know how to help."); ok = false; }
      if (d.phone && !/^[+()\d\s-]{6,20}$/.test(d.phone)) { setErr("phone", "Use digits, spaces and + only, for example +91 22 4606 0604."); ok = false; }
      if (!ok) { const first = $(".is-error input, .is-error textarea", f); first && first.focus(); return; }
      const body = `Topic: ${d.topic}\nName: ${d.name}\nEmail: ${d.email}${d.phone ? `\nPhone: ${d.phone}` : ""}\n\n${d.message}`;
      const subject = d.subject || `Enquiry: ${d.topic}`;
      let res;
      const sb = $("#f-submit", f), alert = $("#f-alert", f);
      alert.hidden = true; sb.setAttribute("aria-busy", "true"); sb.firstChild.textContent = "Sending";
      lastSend = Date.now();
      try { res = await sendEnquiry({ ...d, subject }); }
      catch (err) {
        sb.removeAttribute("aria-busy"); sb.firstChild.textContent = "Send message";
        alert.textContent = `Your message wasn't sent. ${err.message} Try again, or email ${CONTENT.company.email}.`; alert.hidden = false; return;
      }
      const mail = `mailto:${CONTENT.company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      f.outerHTML = res.sent
        ? `<div class="form-done" role="status"><h3 class="h3">Message sent.</h3><p class="muted">Thanks, ${esc(d.name.trim().split(" ")[0])}. An engineer will reply to ${esc(d.email)}.</p></div>`
        : `<div class="form-done" role="status"><h3 class="h3">Your message is ready.</h3>
           <p class="muted">Send it to ${CONTENT.company.email} from your email app, or copy it below.</p>
           <pre id="done-body">${body.replace(/[&<]/g, c => c === "&" ? "&amp;" : "&lt;")}</pre>
           <div style="display:flex;flex-wrap:wrap;gap:12px"><a class="btn" href="${mail}">Open email app<span class="btn-ic">${Icon.arrow}${Icon.arrow}</span></a><button class="btn btn--ghost" type="button" id="copy-msg">Copy message<span class="btn-ic">${Icon.arrow}${Icon.arrow}</span></button></div></div>`;
      const cp = $("#copy-msg");
      cp && cp.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(`To: ${CONTENT.company.email}\nSubject: ${subject}\n\n${body}`); cp.firstChild.textContent = "Copied"; }
        catch { cp.firstChild.textContent = "Select the text to copy"; }
      });
    });
  }

  function projectFilter(root) {
    const f = $("#pfilter", root); if (!f) return;
    f.addEventListener("change", () => {
      const v = f.querySelector("input:checked").value;
      $$(".pcard", root).forEach(c => { c.hidden = !(v === "all" || c.dataset.cat === v); if (!c.hidden) c.classList.add("is-in"); });
    });
  }

  function footerWord() {
    const w = $("#footer-word"); if (!w || RM) return;
    const img = $("img", w);
    onFrame(() => {
      const r = w.getBoundingClientRect();
      if (r.top > innerHeight) return;
      const p = clamp((innerHeight - r.top) / (r.height + 160));
      img.style.setProperty("--y", ((1 - p) * 40).toFixed(1) + "%");
    });
  }

  /* about: timeline line grows with scroll (start 10% → end 50%), items light up as the line passes */
  function journeyLine(root) {
    const el = $("#timeline", root); if (!el) return;
    const fill = $(".tl-line i", el), items = $$(".tl-item", el);
    keep(onFrame(() => {
      const r = el.getBoundingClientRect(), vh = innerHeight; if (r.bottom < -200 || r.top > vh + 200) return;
      const p = clamp((vh * .1 - r.top) / Math.max(1, r.height - vh * .4));
      const h = p * r.height;
      fill.style.setProperty("--h", h.toFixed(1) + "px");
      fill.style.setProperty("--o", clamp(p / .1).toFixed(3));
      items.forEach(it => it.classList.toggle("is-on", it.offsetTop + 40 <= h + 2 || p >= .999));
    }));
  }

  /* ---------------- hero ocean (WebGL) ----------------
     A heightfield sea: directional crested waves, Fresnel sky reflection,
     sun glint and distance fog. The camera drifts forward; the cursor drops
     ripples into the water that spread into a wake. No libraries. */
  function ocean(root) {
    const canvas = $("#ocean", root); if (!canvas) return;
    const card = $("#hero-card", root), title = $("#hero-title", root), ship = $("#hero-ship", root);
    const hs = $("#hud-speed", root), hh = $("#hud-head", root);
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "high-performance" });
    if (!gl) return;
    const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const FS = `precision highp float;
uniform vec2 uRes;uniform float uTime;uniform float uH;uniform float uCamZ;uniform vec4 uTrail[16];
const float CAMH=1.65;
const vec3 SUN=vec3(0.42,0.5,-0.76);
float wave(vec2 p,float t,int n){
  p+=vec2(sin(p.y*.23+t*.11),cos(p.x*.19-t*.07))*.9;
  float h=0.,a=.15,f=.5;vec2 d=normalize(vec2(.3,1.));
  mat2 m=mat2(.74,-.67,.67,.74);
  for(int i=0;i<8;i++){ if(i>=n)break;
    float x=dot(d,p)*f+t*sqrt(f)*1.5;
    float c=1.-abs(sin(x));c*=c;
    h+=a*mix(sin(x)*.5+.5,c,.32);
    d=m*d;a*=.5;f*=1.92;
  }
  return h;
}
float ripples(vec2 p){
  float h=0.;
  for(int i=0;i<16;i++){ vec4 q=uTrail[i]; if(q.w<=0.)continue;
    float age=uTime-q.z; float d=distance(p,q.xy); float k=d-age*2.6;
    h+=q.w*.085*exp(-age*.75)*exp(-k*k*2.2)*sin(k*7.5);
  }
  return h;
}
float H(vec2 p,int n){return wave(p,uTime,n)+ripples(p);}
vec3 sky(vec3 rd){
  float y=max(rd.y,0.);
  vec3 c=mix(vec3(.95,.97,.975),vec3(.83,.9,.92),pow(y,.5));
  
  return c;
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y;
  vec3 ro=vec3(0.,CAMH,uCamZ);
  vec3 rd=normalize(vec3(uv.x*1.15,(uv.y-uH)*1.15,1.));
  vec3 col;
  if(rd.y>-.0008){ col=sky(rd); }
  else{
    float t=(ro.y-.12)/(-rd.y);
    for(int i=0;i<5;i++){ vec3 q=ro+rd*t; t+=(q.y-H(q.xz,3))/(-rd.y)*.92; }
    vec3 p=ro+rd*t;
    float e=.015+t*.0025;
    int oc=t<12.?7:t<30.?5:3;
    float hc=H(p.xz,oc);
    vec3 n=normalize(vec3(hc-H(p.xz+vec2(e,0.),oc),e,hc-H(p.xz+vec2(0.,e),oc)));
    float fr=.03+.97*pow(1.-max(dot(n,-rd),0.),5.);
    vec3 deep=vec3(.01,.11,.16), body=vec3(.04,.30,.42), crest=vec3(.16,.55,.66);
    vec3 w=mix(deep,body,smoothstep(.0,.26,hc));
    w=mix(w,crest,smoothstep(.2,.42,hc)*.55);
    vec3 r=reflect(rd,n);
    col=mix(w,sky(r),fr*.9);
    col+=vec3(.9,.95,1.)*pow(max(dot(r,normalize(vec3(.55,.32,.77))),0.),300.)*.35*smoothstep(.0,.2,uv.x);
    col+=vec3(1.)*smoothstep(.36,.5,hc)*.07;
    float fog=1.-exp(-t*.021);
    col=mix(col,sky(vec3(rd.x,.0,1.)),fog);
  }
  // soft vignette toward the card edges
  vec2 q=gl_FragCoord.xy/uRes; col*=.94+.06*smoothstep(0.,.5,q.y);
  gl_FragColor=vec4(col,1.);
}`;
    const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(o)); return null; } return o; };
    const v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, FS); if (!v || !f) return;
    const prog = gl.createProgram(); gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(prog, n);
    const uRes = U("uRes"), uTime = U("uTime"), uH = U("uH"), uCamZ = U("uCamZ"), uTrail = U("uTrail");
    const trail = new Float32Array(64); let ti = 0;
    let W = 0, Hh = 0, scale = 1, hFrac = .55, visible = true, t0 = performance.now(), lastDrop = 0, mx = -1, my = -1, pmx = 0, pmy = 0, hudT = 0;
    const CAMH = 1.65, SPEED = 0.9;
    const resize = () => {
      const r = card.getBoundingClientRect(); W = r.width; Hh = r.height;
      scale = Math.min(devicePixelRatio || 1, 1.5) * (W < 700 ? .55 : .7);
      canvas.width = Math.round(W * scale); canvas.height = Math.round(Hh * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      // horizon sits just below the headline
      const tb = title ? title.getBoundingClientRect().bottom - r.top : Hh * .5;
      const shH = ship ? (ship.offsetHeight || ship.offsetWidth * .333) : 0;
      const hb = $(".hero-bottom", root); if (hb) hb.style.marginTop = W <= 900 ? Math.round(shH * .95 + 24) + "px" : "";
      hFrac = clamp((tb + (W <= 900 ? shH * .8 + 12 : 56)) / Hh, .42, .7);
      if (ship) { const sh = ship.offsetHeight || ship.offsetWidth * .333; ship.style.top = (hFrac * Hh - sh * .9) + "px"; }
    };
    const toWorld = (px, py, camZ) => { // screen point on the card → point on the mean sea plane
      const ux = (px - W / 2) / Hh, uy = ((Hh - py) - Hh / 2) / Hh, uh = .5 - hFrac;
      const dx = ux * 1.15, dy = (uy - uh) * 1.15, dz = 1, len = Math.hypot(dx, dy, dz);
      const ry = dy / len; if (ry > -.012) return null;
      const t = CAMH / -ry; return [dx / len * t, camZ + dz / len * t];
    };
    const onMove = e => { const r = card.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; if (mx < 0 || my < 0 || mx > r.width || my > r.height) mx = -1; };
    const vis = new IntersectionObserver(([en]) => visible = en.isIntersecting); vis.observe(card);
    addEventListener("resize", resize); addEventListener("pointermove", onMove, { passive: true });
    keep(() => { removeEventListener("resize", resize); removeEventListener("pointermove", onMove); vis.disconnect(); const ext = gl.getExtension("WEBGL_lose_context"); ext && ext.loseContext(); });
    resize(); document.fonts && document.fonts.ready.then(resize); setTimeout(resize, 400); ship && ship.addEventListener("load", resize);

    const render = time => {
      const camZ = time * SPEED;
      gl.uniform2f(uRes, canvas.width, canvas.height); gl.uniform1f(uTime, time); gl.uniform1f(uH, .5 - hFrac); gl.uniform1f(uCamZ, camZ);
      gl.uniform4fv(uTrail, trail); gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    canvas.style.opacity = "1";
    if (RM) { render(4); return; }
    // idle drops so the water reacts even without a cursor
    let idle = 0;
    keep(onFrame(() => {
      if (!visible || document.hidden) return;
      const time = (performance.now() - t0) / 1000, camZ = time * SPEED;
      // hero card eases back as you scroll away
      const p = clamp(scrollY / (innerHeight * .9));
      card.style.transform = `scale(${(1 - p * .05).toFixed(4)})`;
      card.style.borderRadius = (28 + p * 12).toFixed(1) + "px";
      let px = mx, py = my;
      if (mx < 0 && time - idle > 2.6) { idle = time; px = W * (.55 + Math.random() * .35); py = Hh * (hFrac + .12 + Math.random() * .3); }
      if (px >= 0 && time - lastDrop > .07) {
        const moved = Math.hypot(px - pmx, py - pmy);
        if (moved > 6 || mx < 0) {
          const w = toWorld(px, py, camZ);
          if (w) { trail.set([w[0], w[1], time, mx < 0 ? .6 : clamp(moved / 40, .45, 1.2)], (ti % 16) * 4); ti++; lastDrop = time; }
          if (mx >= 0 && hs && time - hudT > .15) { hudT = time; hs.textContent = clamp(moved / 3, 0, 32).toFixed(1) + " kn"; hh.textContent = String(Math.round((Math.atan2(px - pmx, -(py - pmy)) * 180 / Math.PI + 360) % 360)).padStart(3, "0") + "°"; }
          pmx = px; pmy = py;
        }
      }
      render(time);
    }));
  }

  /* ---------------- office globe ----------------
     A cobe-style globe: a softly shaded white sphere with land sampled into
     dots (from LAND), drag with inertia, slow auto-rotation, and an HTML pin
     per office. Selecting a pin turns the globe to that office and shows its
     address card. */
  let GLOBE_PTS = null;
  function landPoints(N) {
    if (GLOBE_PTS && GLOBE_PTS.n === N) return GLOBE_PTS.pts;
    const rings = LAND.map(r => { let a = 180, b = -180, c = 90, d = -90; r.forEach(([x, y]) => { a = Math.min(a, x); b = Math.max(b, x); c = Math.min(c, y); d = Math.max(d, y); }); return { r, a, b, c, d }; });
    const inside = (x, y, r) => { let ins = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) ins = !ins; } return ins; };
    const pts = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i + .5) / N * 2, rr = Math.sqrt(1 - y * y), th = i * 2.399963229728653;
      const x = Math.cos(th) * rr, z = Math.sin(th) * rr;
      const lat = Math.asin(y) * 180 / Math.PI, lon = Math.atan2(x, z) * 180 / Math.PI;
      if (rings.some(g => lon >= g.a && lon <= g.b && lat >= g.c && lat <= g.d && inside(lon, lat, g.r))) pts.push(x, y, z);
    }
    GLOBE_PTS = { n: N, pts: new Float32Array(pts) };
    return GLOBE_PTS.pts;
  }

  function globe(root) {
    const wrap = $("#globe-wrap", root); if (!wrap) return;
    const c = $("#globe", wrap), ctx = c.getContext("2d"), pins = $$(".globe-pin", wrap);
    const card = $("#globe-card", root), cardBody = $("#globe-card-body", root);
    const offices = CONTENT.offices.map(o => ({ ...o, lat: o.geo[0], lon: o.geo[1] }));
    const D2R = Math.PI / 180;
    let S = 0, dpr = 1, visible = true;
    let phi = 62 * D2R, theta = 20 * D2R, vphi = 0, vtheta = 0;
    let drag = null, moved = 0, target = null, active = -1, idleSpin = true;
    const pts = landPoints(innerWidth < 700 ? 14000 : 22000);

    const resize = () => { S = wrap.clientWidth; dpr = Math.min(devicePixelRatio || 1, 2); c.width = S * dpr; c.height = S * dpr; c.style.height = S + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize(); addEventListener("resize", resize);
    const vis = new IntersectionObserver(([en]) => visible = en.isIntersecting); vis.observe(wrap);
    keep(() => { removeEventListener("resize", resize); vis.disconnect(); });

    const project = (x, y, z) => {
      const cp = Math.cos(phi), sp = Math.sin(phi), ct = Math.cos(theta), st = Math.sin(theta);
      const x1 = x * cp - z * sp, z1 = x * sp + z * cp;
      const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;
      return [x1, y2, z2];
    };
    const ll = (lat, lon) => [Math.cos(lat * D2R) * Math.sin(lon * D2R), Math.sin(lat * D2R), Math.cos(lat * D2R) * Math.cos(lon * D2R)];
    const offXYZ = offices.map(o => ll(o.lat, o.lon));
    const BUCKETS = 6;

    function draw() {
      const R = S * .44, cx = S / 2, cy = S / 2;
      ctx.clearRect(0, 0, S, S);
      // sphere
      const s = ctx.createRadialGradient(cx - R * .38, cy - R * .42, R * .1, cx, cy, R * 1.05);
      s.addColorStop(0, "#FFFFFF"); s.addColorStop(.55, "#F4F9FA"); s.addColorStop(1, "#D6E5EA");
      ctx.fillStyle = s; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      // land dots, batched by brightness
      const paths = Array.from({ length: BUCKETS }, () => []);
      for (let i = 0; i < pts.length; i += 3) {
        const [x, y, z] = project(pts[i], pts[i + 1], pts[i + 2]);
        if (z <= .02) continue;
        const b = Math.min(BUCKETS - 1, (z * BUCKETS) | 0);
        paths[b].push(cx + x * R, cy - y * R);
      }
      for (let b = 0; b < BUCKETS; b++) {
        const t = (b + .5) / BUCKETS, sz = .8 + t * 1.15, a = .2 + t * .62;
        ctx.fillStyle = `rgba(11,52,66,${a.toFixed(3)})`;
        ctx.beginPath(); const arr = paths[b];
        for (let k = 0; k < arr.length; k += 2) ctx.rect(arr[k] - sz / 2, arr[k + 1] - sz / 2, sz, sz);
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(11,52,66,.08)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      // pins
      offXYZ.forEach((v, i) => {
        const [x, y, z] = project(v[0], v[1], v[2]);
        const pin = pins[i], vis2 = clamp((z - .05) * 5);
        pin.style.transform = `translate(${(cx + x * R).toFixed(1)}px, ${(cy - y * R).toFixed(1)}px)`;
        pin.style.opacity = vis2.toFixed(2);
        pin.style.pointerEvents = vis2 > .4 ? "auto" : "none";
        pin.tabIndex = vis2 > .4 ? 0 : -1;
      });
    }

    const shortest = (from, to) => { let d = (to - from) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return from + d; };
    function select(i) {
      active = i; const o = offices[i];
      target = { phi: shortest(phi, o.lon * D2R), theta: clamp(o.lat * D2R, -.2, .85) };
      vphi = vtheta = 0; idleSpin = false;
      pins.forEach((p, k) => { p.classList.toggle("is-active", k === i); p.setAttribute("aria-pressed", k === i); });
      cardBody.innerHTML = `<span class="globe-card-role">${esc(o.role)}</span>
        <h4>${esc(o.label)}</h4>
        <address>${esc(o.address)}</address>
        <p>${o.phones.map(ph => `<a href="${telHref(ph)}">${esc(ph)}</a><br>`).join("")}<a href="mailto:${o.email}">${esc(o.email)}</a></p>
        <a class="link link--under" href="${mapHref(o.address)}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>`;
      card.hidden = false; requestAnimationFrame(() => card.classList.add("is-open"));
    }
    function close() {
      active = -1; target = null; idleSpin = !RM;
      pins.forEach(p => { p.classList.remove("is-active"); p.setAttribute("aria-pressed", "false"); });
      card.classList.remove("is-open"); setTimeout(() => { if (active < 0) card.hidden = true; }, 400);
    }
    pins.forEach((p, i) => p.addEventListener("click", e => { e.stopPropagation(); active === i ? close() : select(i); }));
    $("#globe-close", root).addEventListener("click", close);

    c.addEventListener("pointerdown", e => { drag = { x: e.clientX, y: e.clientY, t: performance.now() }; moved = 0; target = null; c.setPointerCapture(e.pointerId); c.style.cursor = "grabbing"; });
    c.addEventListener("pointermove", e => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now(), dt = Math.max(1, now - drag.t);
      moved += Math.abs(dx) + Math.abs(dy);
      phi -= dx * .006; theta = clamp(theta + dy * .004, -.25, .9);
      vphi = clamp(-dx * .006 / dt * 16, -.12, .12); vtheta = clamp(dy * .004 / dt * 16, -.05, .05);
      drag = { x: e.clientX, y: e.clientY, t: now };
    });
    const up = () => { if (!drag) return; drag = null; c.style.cursor = "grab"; };
    c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
    c.addEventListener("click", () => {
      if (moved > 5) return;
      // tap near a pin also selects it
      const r = c.getBoundingClientRect();
      let best = -1, bd = 26;
      pins.forEach((p, i) => { if (+p.style.opacity < .4) return; const m = p.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/); if (!m) return; const d = Math.hypot(+m[1] - (lastX - r.left), +m[2] - (lastY - r.top)); if (d < bd) { bd = d; best = i; } });
      if (best >= 0) select(best);
    });
    let lastX = 0, lastY = 0;
    c.addEventListener("pointerdown", e => { lastX = e.clientX; lastY = e.clientY; });

    if (RM) idleSpin = false;
    keep(onFrame(() => {
      if (!visible || document.hidden) return;
      if (!drag) {
        if (target) { phi = lerp(phi, target.phi, .08); theta = lerp(theta, target.theta, .08); }
        else {
          phi += vphi; theta = clamp(theta + vtheta, -.25, .9); vphi *= .94; vtheta *= .94;
          if (idleSpin && Math.abs(vphi) < .0005) phi -= .0016;
        }
      }
      draw();
    }));
    draw();
  }

  /* spotlight: cards light up under the cursor */
  function spotlight(root) {
    if (!FINE) return;
    $$(".spot, .pager a, .pcard-media, .cap", root).forEach(el => {
      el.classList.add("spot");
      el.addEventListener("pointermove", e => { const r = el.getBoundingClientRect(); el.style.setProperty("--mx", (e.clientX - r.left) + "px"); el.style.setProperty("--my", (e.clientY - r.top) + "px"); });
    });
  }

  /* page-hero drawing panel opens, then drifts with scroll */
  function heroPanel(root) {
    const el = $("[data-clip]", root); if (!el) return;
    requestAnimationFrame(() => setTimeout(() => el.classList.add("is-open"), 120));
    const art = $("svg", el); if (!art || RM) return;
    keep(onFrame(() => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; art.style.transform = `translateY(${(-r.top * .06).toFixed(1)}px)`; }));
  }

  function initPage(root) {
    splitText(root); scrubStatements(root); accordions(root); servicePanels(root); previews(root); hscroll(root);
    processLine(root); clocks(root); ticker(root); magnetic(root); jumps(root); contactForm(root); projectFilter(root); ocean(root); globe(root); spotlight(root); heroPanel(root); journeyLine(root);
    observe(root); magnetic(document.body);
  }
  function teardown() { disposers.forEach(fn => fn()); disposers = []; }

  /* ---------------- router ---------------- */
  const main = $("#main"), curtain = $("#curtain"), clabel = $("#curtain-label");
  let current = null, busy = false, queued = null;
  const slugFrom = () => ROUTER === "path"
    ? location.pathname.replace(/^\/+|\/+$/g, "").split("/").pop() || "home"
    : (() => { try { return decodeURIComponent(location.hash.slice(1)); } catch { return "not-found"; } })() || "home";
  const resolve = slug => ROUTES[slug] ? slug : ALIASES[slug] && ROUTES[ALIASES[slug]] ? ALIASES[slug] : "not-found";

  const setMeta = (name, attr, val) => {
    let m = document.head.querySelector(`${name}[${attr[0]}="${attr[1]}"]`);
    if (!m) { m = document.createElement(name); m.setAttribute(attr[0], attr[1]); document.head.appendChild(m); }
    m.setAttribute(name === "link" ? "href" : "content", val);
  };
  function mount(name) {
    teardown();
    const r = ROUTES[name];
    main.innerHTML = r.view();
    document.title = name === "home" ? "21 Knots | Design, engineering and consulting" : `${r.label} - 21 Knots`;
    if (r.desc) setMeta("meta", ["name", "description"], r.desc);
    setMeta("meta", ["property", "og:title"], document.title);
    setMeta("link", ["rel", "canonical"], SITE_URL + (name === "home" ? "/" : `/${name}/`));
    $$("[data-route]").forEach(a => {
      const on = a.dataset.route === name || a.dataset.route === r.parent;
      on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
    current = name;
  }
  function settle() { Smooth.reset(0); initPage(main); main.focus({ preventScroll: true }); }

  async function go(name) {
    if (busy) { queued = name; return; }
    setMega(false); setMenu(false); Cursor.refresh();
    if (name === current) { Smooth.to(0); return; }
    busy = true;
    if (!RM) {
      clabel.textContent = ROUTES[name].label;
      curtain.classList.remove("is-out"); void curtain.offsetWidth; curtain.classList.add("is-in");
      await wait(720);
    }
    mount(name); settle();
    if (!RM) {
      curtain.classList.remove("is-in"); curtain.classList.add("is-out");
      await wait(820); curtain.classList.remove("is-out");
    }
    busy = false;
    if (queued) { const q = queued; queued = null; if (q !== current) go(q); }
  }

  document.addEventListener("click", e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a[href]"); if (!a || a.target === "_blank") return;
    if (a.hasAttribute("data-skip")) { e.preventDefault(); main.focus(); return; }
    if (a.hasAttribute("data-jump")) return;
    if (a.hasAttribute("data-top")) { e.preventDefault(); Smooth.to(0); return; }
    const href = a.getAttribute("href");
    if (ROUTER === "path") {
      if (!href.startsWith("/") || href.startsWith("//")) return;
      e.preventDefault();
      const slug = href.replace(/^\/+|\/+$/g, "") || "home";
      if (location.pathname !== href) history.pushState({}, "", href);
      go(resolve(slug));
    } else {
      if (!href.startsWith("#")) return;
      const slug = href.slice(1) || "home";
      if (slug === (location.hash.slice(1) || "home")) { e.preventDefault(); go(resolve(slug)); }
    }
  });
  addEventListener(ROUTER === "path" ? "popstate" : "hashchange", () => go(resolve(slugFrom())));

  /* ---------------- boot ---------------- */
  async function boot() {
    renderChrome(); initNav(); Smooth.init(); footerWord();
    const first = resolve(slugFrom());
    mount(first);
    const loader = $("#loader");
    let seen = false; try { seen = sessionStorage.getItem("21k-seen") === "1"; sessionStorage.setItem("21k-seen", "1"); } catch {}
    if (RM || seen) { loader.remove(); settle(); return; }
    const n = $("#loader-n"), bar = $("#loader-bar"), t0 = performance.now(), dur = 1300;
    await new Promise(res => {
      const tick = t => {
        const p = clamp((t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        n.textContent = String(Math.round(21 * e)).padStart(2, "0"); bar.style.transform = `scaleX(${e})`;
        p < 1 ? requestAnimationFrame(tick) : res();
      };
      requestAnimationFrame(tick);
    });
    await wait(180);
    loader.classList.add("is-done");
    await wait(380); settle();
    setTimeout(() => loader.remove(), 900);
  }
  boot();
})();
</script>
</body>
</html>
