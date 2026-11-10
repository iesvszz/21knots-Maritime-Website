<script>
/* ==========================================================================
   ART — technical line drawings, one per subject.
   Every stroke has pathLength="1" so .draw can animate it on reveal.
   Swap any of these for photography by replacing the art() call.
   ========================================================================== */
const Art = (() => {
  let k = 0;
  const p = (d, cls = "") => `<path d="${d}" pathLength="1" style="--k:${k++}"${cls ? ` class="${cls}"` : ""}/>`;
  const dash = (d) => `<path d="${d}" stroke-dasharray="3 5" opacity=".45"/>`;
  const dot = (x, y, r = 1.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor" stroke="none"/>`;
  const wave = (y, x0 = 20, x1 = 380, a = 4, l = 40) => {
    let d = `M${x0} ${y}`;
    for (let x = x0; x < x1; x += l / 2) d += ` q${l / 4} ${(((x - x0) / (l / 2)) % 2 ? a : -a)} ${l / 2} 0`;
    return d;
  };
  const svg = (inner, label) => {
    const out = `<svg viewBox="0 0 400 300" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${label}">${inner}</svg>`;
    k = 0; return out;
  };

  const lib = {
    hull: () => svg(
      dash("M20 186 H380") +
      p("M50 140 L360 140 C352 170 345 200 325 215 L95 215 C80 212 66 200 60 186 L50 150 Z") +
      p("M70 140 V100 H132 V140") + p("M78 100 V78 H124 V100") + p("M84 89 H118") +
      p("M100 78 L104 56 H118 L121 78") +
      p("M330 140 V128 H362") +
      p("M160 140 V128 H200 V140") + p("M214 140 V128 H254 V140") + p("M268 140 V128 H308 V140") +
      p("M62 190 V214 H72 V190") + p("M84 192 a8 8 0 1 0 0.1 0") +
      p("M50 238 H360") + [60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map(x => `<path d="M${x} 234 V242" opacity=".6"/>`).join(""),
      "Ship profile drawing"),

    bodyplan: () => {
      let s = p("M200 36 V262") + p("M50 250 H350") + [210, 170, 130, 90].map(y => dash(`M50 ${y} H350`)).join("");
      const fwd = [[128, .95], [120, .85], [106, .7], [86, .52], [60, .36], [30, .2]];
      const aft = [[128, .95], [124, .9], [114, .78], [96, .6], [70, .42], [40, .26]];
      fwd.forEach(([b, a]) => s += p(`M200 250 C${200 + b * a} 250 ${200 + b} ${250 - 70 * a} ${200 + b} 70`));
      aft.forEach(([b, a]) => s += p(`M200 250 C${200 - b * a} 250 ${200 - b} ${250 - 70 * a} ${200 - b} 70`));
      s += p("M60 70 H340");
      return svg(s, "Body plan of hull sections");
    },

    jacket: () => {
      const L = y => 140 + (270 - y) * (25 / 160), R = y => 260 - (270 - y) * (25 / 160);
      const lv = [270, 215, 165, 110];
      let s = p("M20 272 H380") + p(wave(132, 20, 380, 3, 36)) + p(`M140 270 L165 110`) + p(`M260 270 L235 110`);
      for (let i = 0; i < lv.length - 1; i++) {
        const a = lv[i], b = lv[i + 1];
        s += p(`M${L(a)} ${a} L${R(b)} ${b}`) + p(`M${R(a)} ${a} L${L(b)} ${b}`) + p(`M${L(b)} ${b} H${R(b)}`);
      }
      s += p("M128 110 H272 V94 H128 Z") + p("M146 94 V70 H254 V94") + p("M240 70 V48 L282 34") + p("M240 70 L282 34") + p("M150 70 L112 44") + p("M112 44 l-4 -8 m4 8 l6 -6");
      return svg(s, "Fixed offshore jacket platform");
    },

    barge: () => svg(
      p(wave(204, 20, 380, 3, 32)) +
      p("M50 192 H300 L288 216 H62 Z") +
      p("M140 192 L155 102") + p("M222 192 L207 102") + p("M144 168 L212 128") + p("M218 168 L150 128") + p("M147 150 H215") +
      p("M146 102 H216 V90 H146 Z") +
      p("M128 192 L148 152") + p("M234 192 L214 152") +
      p("M322 198 H372 L364 214 H330 Z") + p("M336 198 V184 H352 V198") +
      p("M322 196 Q311 206 300 196"),
      "Jacket on a transport barge with tug"),

    subsea: () => svg(
      p(wave(80, 20, 380, 3, 34)) +
      p("M110 80 H290 L280 102 H120 Z") + p("M140 80 V66 H190 V80") + p("M220 80 V60 H262 V80") +
      p("M122 100 Q88 222 30 264") + p("M278 100 Q312 222 370 264") +
      p("M200 102 C200 160 146 168 170 204 S236 250 262 264") +
      p("M20 268 Q120 260 200 268 T380 266") + p("M262 264 H380") +
      dot(30, 264, 3) + dot(370, 264, 3),
      "Floating production unit with moorings and riser"),

    scrubber: () => svg(
      p("M40 252 H360") +
      p("M118 252 L130 112 H230 L242 252") +
      p("M156 232 V92 Q156 80 168 80 H192 Q204 80 204 92 V232 Z") +
      p("M180 252 V232") + p("M180 80 V44") +
      p("M174 40 C168 28 186 22 176 8") + p("M186 40 C180 30 196 22 188 10") +
      p("M162 120 H198") + p("M162 142 H198") + p("M162 164 H198") +
      p("M204 204 H272 V252") + p("M156 176 H96 V252") + p("M272 222 a10 10 0 1 0 0.1 0"),
      "Exhaust gas scrubber in funnel casing"),

    bwts: () => svg(
      p("M30 150 H370") +
      p("M110 112 Q110 104 118 104 H146 Q154 104 154 112 V188 Q154 196 146 196 H118 Q110 196 110 188 Z") +
      p("M200 132 H292 Q302 132 302 150 Q302 168 292 168 H200 Q190 168 190 150 Q190 132 200 132 Z") +
      p("M206 150 H286") +
      p("M64 140 L80 160 V140 L64 160 Z") + p("M322 140 L338 160 V140 L322 160 Z") +
      p("M30 150 V232 H76") + p("M370 150 V232 H326") +
      p("M120 120 H144") + p("M120 136 H144") + p("M120 152 H144") +
      p("M246 132 V108 H270"),
      "Ballast water treatment system schematic"),

    catamaran: () => svg(
      p("M50 92 H292 Q350 92 364 108 Q350 124 292 124 H50 Z") +
      p("M50 176 H292 Q350 176 364 192 Q350 208 292 208 H50 Z") +
      p("M84 112 H300 V188 H84 Z") +
      p("M138 112 V188") + p("M192 112 V188") + p("M246 112 V188") +
      p("M111 150 a10 10 0 1 0 0.1 0") + p("M165 150 a10 10 0 1 0 0.1 0") + p("M219 150 a10 10 0 1 0 0.1 0") +
      p("M300 150 H336") + dash("M30 150 H380"),
      "Modular catamaran deck plan"),

    hold: () => svg(
      p("M80 70 V232 Q80 252 100 252 H300 Q320 252 320 232 V70") +
      p("M80 202 L130 232 H270 L320 202") + p("M80 238 H320") +
      p("M80 112 L122 70") + p("M320 112 L278 70") +
      p("M140 70 V52 H260 V70") + p("M80 70 H140") + p("M260 70 H320") +
      dash("M200 40 V262") +
      p("M150 150 H250") + p("M150 150 V120") + p("M250 150 V120"),
      "Cargo hold midship section"),

    scan: () => {
      let s = "";
      for (let r = 0; r < 7; r++) for (let i = 0; i <= 34; i++) {
        const a = Math.PI * (i / 34), R = 96 + r * 12;
        s += dot(200 - Math.cos(a) * R * 1.35, 230 - Math.sin(a) * R, 1.1);
      }
      s += p("M200 232 L184 280") + p("M200 232 L216 280") + p("M200 232 V280");
      s += p("M200 222 a10 10 0 1 0 0.1 0");
      s += p("M200 222 L70 142") + p("M200 222 L132 96") + p("M200 222 L268 96") + p("M200 222 L330 142");
      return svg(s, "3D laser scan point cloud");
    },

    grid: () => svg(
      p("M60 60 H340 V240 H60 Z") + p("M60 86 H340") + p("M120 86 V240") +
      p("M74 104 H106") + p("M74 120 H100") + p("M74 136 H104") +
      p("M140 214 L180 182 L214 192 L252 140 L290 150 L322 108") +
      dash("M140 214 H322") + dash("M140 160 H322") + dash("M140 108 H322") +
      dot(322, 108, 3),
      "Engineering software interface"),

    mesh: () => {
      let s = "";
      const cx = 200, cy = 150, r = 40, H = 118;
      const sq = a => { const c = Math.cos(a), sn = Math.sin(a), m = Math.max(Math.abs(c), Math.abs(sn)); return [cx + c / m * H, cy + sn / m * H * .9]; };
      for (let ring = 0; ring <= 5; ring++) {
        const t = ring / 5; let d = "";
        for (let i = 0; i <= 48; i++) {
          const a = i / 48 * Math.PI * 2, [qx, qy] = sq(a);
          const x = cx + Math.cos(a) * r + (qx - cx - Math.cos(a) * r) * t, y = cy + Math.sin(a) * r + (qy - cy - Math.sin(a) * r) * t;
          d += (i ? " L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
        }
        s += p(d);
      }
      for (let i = 0; i < 24; i++) {
        const a = i / 24 * Math.PI * 2, [qx, qy] = sq(a);
        s += p(`M${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)} L${qx.toFixed(1)} ${qy.toFixed(1)}`);
      }
      return svg(s, "Finite element mesh around an opening");
    },

    turbine: () => svg(
      p(wave(204, 20, 380, 3, 32)) +
      p("M176 204 V238 H224 V204") + p("M160 238 H240") +
      p("M195 204 L198 72") + p("M205 204 L202 72") +
      p("M188 72 H222 V60 H188 Z") + p("M188 66 a4 4 0 1 0 0.1 0") +
      p("M188 66 L184 0") + p("M188 66 L130 98") + p("M188 66 L246 100") +
      p("M162 238 Q120 260 40 272") + p("M238 238 Q280 260 360 272"),
      "Floating offshore wind turbine"),

    plant: () => svg(
      p("M50 70 H110 V232 H50 Z") + p("M70 70 V30 H90 V70") +
      p("M110 92 H150 V122") +
      p("M150 122 L230 102 V202 L150 182 Z") +
      p("M230 152 H260") + p("M290 122 a30 30 0 1 0 0.1 0") +
      p("M170 232 H244 V262 H170 Z") + p("M192 192 V232") +
      p("M170 248 H122 V232") + p("M110 210 H122") + p("M122 216 a6 6 0 1 0 0.1 0"),
      "Power plant process schematic"),

    port: () => svg(
      p("M20 180 H182 V280") + p(wave(194, 182, 390, 3, 30)) +
      p("M60 180 V58") + p("M108 180 V58") + p("M40 58 H300") + p("M40 70 H300") + p("M250 70 V112") + p("M240 112 H260") +
      p("M196 150 H372 C368 168 362 182 350 192 H206 Q196 186 196 170 Z") + p("M210 150 V124 H246 V150") +
      p("M200 158 Q170 168 140 176") + p("M366 156 Q300 170 160 176") +
      dot(140, 176, 3) + dot(160, 176, 3) +
      p("M182 186 h-6 v14 h6") + p("M182 214 h-6 v14 h6"),
      "Quay with crane and moored ship"),

    crane: () => svg(
      p("M40 262 H360") +
      p("M80 262 V70") + p("M96 262 V70") + p("M304 262 V70") + p("M320 262 V70") +
      p("M60 70 H340") + p("M60 88 H340") +
      p("M80 70 L100 88 L120 70 L140 88 L160 70 L180 88 L200 70 L220 88 L240 70 L260 88 L280 70 L300 88 L320 70") +
      p("M188 88 V94 H212 V88") + p("M200 94 V164") + p("M192 164 H208") +
      p("M164 172 H236 V212 H164 Z") + p("M200 164 L170 172") + p("M200 164 L230 172") +
      p("M140 262 L152 230 H248 L260 262"),
      "Shipyard gantry crane lifting a block")
  };

  return (name, label) => (lib[name] || lib.hull)();
})();

/* small UI icons */
const Icon = {
  arrow: `<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 12 L12 2 M4.5 2 H12 V9.5"/></svg>`,
  right: `<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M1 7 H13 M8 2 L13 7 L8 12"/></svg>`,
  plus: `<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 1 V13 M1 7 H13"/></svg>`,
  chev: `<svg class="chev" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 3.5 L5 6.5 L8 3.5"/></svg>`,
  in: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zM16.67 19.2h1.7L7.4 4.7H5.57z"/></svg>`,
  fb: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20 20 0 0 0 14.3 4.3c-2.2 0-3.7 1.34-3.7 3.8v2.4H8.1v3h2.5V21z"/></svg>`
};

const li = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
Object.assign(Icon, {
  ship: li('<path d="M3 15h18l-2.5 4.5h-13z"/><path d="M6 15V9h12v6"/><path d="M9 9V5h5v4"/><path d="M2 21c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1"/>'),
  recycle: li('<path d="M7 19H4.8a1.8 1.8 0 0 1-1.6-2.7L5.5 12"/><path d="M11 19h8.2a1.8 1.8 0 0 0 1.6-2.7l-1.2-2"/><path d="m14 16-3 3 3 3"/><path d="M8.3 6.8 10.4 3a1.8 1.8 0 0 1 3.2 0l3.9 7"/><path d="m13.4 9.2 4.1 1.1 1.1-4.1"/><path d="m4.4 10.7 1.1 4.1 4.1-1.1"/>'),
  dock: li('<path d="M3 20h18"/><path d="M5 20V9l7-5 7 5v11"/><path d="M8 16h8l-1.2 2.5H9.2z"/><path d="M10 13h4"/>'),
  growth: li('<path d="M3 20h18"/><path d="M6 16v4M11 12v8M16 8v12"/><path d="m4 10 5-4 4 3 7-6"/><path d="M16 3h4v4"/>'),
  scrubber: li('<path d="M9 21V7a3 3 0 0 1 6 0v14"/><path d="M7 21h10"/><path d="M11.5 4c-1-1 .5-2 0-3M13.5 4c-1-1 .5-2 0-3"/><path d="M10 11h4M10 14h4M10 17h4"/>'),
  zeroqu: li('<circle cx="11.5" cy="11.5" r="7.5"/><path d="m16.5 16.5 4 4"/><path d="M8.5 11.5h6"/>'),
  future: li('<path d="m6 6 6 6-6 6"/><path d="m13 6 6 6-6 6"/>'),
  handshake: li('<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2"/><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a5 5 0 0 1 6 -.8l.5.3a3 3 0 0 0 2 .4H21"/><path d="m21 15-1-1"/><path d="M3 7h3.5l4 4"/><path d="M3 15h2l3.5 3.5a1.4 1.4 0 0 0 2-2"/>'),
  shield: li('<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.4-4.4"/>'),
  chart: li('<path d="M3 21h18"/><path d="M6 17v-4M10 17V9M14 17v-6M18 17V5"/>'),
  bulb: li('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/>'),
  leaf: li('<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19c3-4 6-6 10-8"/>'),
  user: li('<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1-4 3.8-6 7-6s6 2 7 6"/>'),
  close: li('<path d="M6 6l12 12M18 6 6 18"/>')
});
</script>
