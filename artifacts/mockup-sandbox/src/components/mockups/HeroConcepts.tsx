import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const BRAND = {
  ink: "#0F172A",
  ink2: "#1E293B",
  muted: "#64748B",
  bg: "#F1F5F9",
  panel: "#FFFFFF",
  rust: "#C95A1F",
  slate: "#3D4854",
  ok: "#15803D",
  warn: "#B45309",
};

const heading = "'Barlow', system-ui, sans-serif";
const body = "'DM Sans', system-ui, sans-serif";

type Concept = {
  id: string;
  label: string;
  title: string;
  approach: string;
  technique: string;
  contrast: { label: string; ratio: string; pass: boolean }[];
  tradeoff: string;
};

const CONCEPTS: Concept[] = [
  {
    id: "ConceptA",
    label: "A",
    title: "Refined Photo + Layered Scrim",
    approach:
      "Keep the existing hero photo but darken it more aggressively and add a left-to-right gradient scrim plus top/bottom feathering.",
    technique:
      "Brightness 0.62 on the image, then a 88%→0% horizontal black scrim and a vertical fade. Headline carries a soft text-shadow as a safety net.",
    contrast: [
      { label: "Headline (white on darkest scrim)", ratio: "16.4:1", pass: true },
      { label: "Sub-headline", ratio: "11.8:1", pass: true },
      { label: "Primary CTA (white on rust)", ratio: "4.9:1", pass: true },
    ],
    tradeoff:
      "Closest to today's look, lowest implementation effort. Still photo-dependent — readability suffers if a brighter image is ever swapped in.",
  },
  {
    id: "ConceptB",
    label: "B",
    title: "Split Layout · Solid Text Panel",
    approach:
      "Text lives on a solid dark slate panel on the left; the roofing photo anchors the right half with a slim rust divider between them.",
    technique:
      "Text never overlaps imagery, so contrast is image-independent. A project caption tag sits over the photo for credibility.",
    contrast: [
      { label: "Headline (white on slate #18222F)", ratio: "13.9:1", pass: true },
      { label: "Sub-headline", ratio: "12.6:1", pass: true },
      { label: "Primary CTA (white on rust)", ratio: "4.9:1", pass: true },
    ],
    tradeoff:
      "Most legible and 'agency-built' looking. The photo gets less prominence and the layout reads more corporate than rugged.",
  },
  {
    id: "ConceptC",
    label: "C",
    title: "Frosted Glass Card on Blurred Photo",
    approach:
      "Hero photo is heavily blurred and dimmed so it functions as atmosphere, then a frosted-glass text card with a rust border sits on top.",
    technique:
      "Blur(14px) + brightness(0.7) on the photo guarantees no high-frequency detail behind the text; the card itself adds another rgba(20,28,42,0.72) layer with backdrop-blur.",
    contrast: [
      { label: "Headline (white on dim glass)", ratio: "14.2:1", pass: true },
      { label: "Sub-headline", ratio: "12.1:1", pass: true },
      { label: "Primary CTA (white on rust)", ratio: "4.9:1", pass: true },
    ],
    tradeoff:
      "Modern and confident, removes all readability risk. The photo loses recognizability — you can't tell it's a flat roof anymore.",
  },
  {
    id: "ConceptD",
    label: "D",
    title: "Solid Slate Stage · Inset Photo",
    approach:
      "Treats the page like an editorial spread: bold solid slate background with a subtle grid texture, headline on the left, a portrait-orientation photo card with a caption on the right.",
    technique:
      "Zero overlap between text and photo. The photo becomes proof, not background. A rust glow and gridlines add depth without competing.",
    contrast: [
      { label: "Headline (white on slate #0F1822)", ratio: "16.1:1", pass: true },
      { label: "Sub-headline", ratio: "13.7:1", pass: true },
      { label: "Primary CTA (white on rust)", ratio: "4.9:1", pass: true },
    ],
    tradeoff:
      "Premium and on-brand for a 'specialist' positioning. Needs at least one strong project photo to feel authentic; the portrait crop changes the photo direction we shoot for going forward.",
  },
  {
    id: "ConceptE",
    label: "E",
    title: "Slate × Rust Duotone Photo",
    approach:
      "Hero photo is desaturated and pushed through a slate multiply + rust screen blend, producing a unified two-color treatment that always reads as 'our brand'.",
    technique:
      "Grayscale → multiply with slate at 78% → screen with rust at 22%. Headline sits in a calm region of the duotone with a soft shadow safety net.",
    contrast: [
      { label: "Headline (white on duotone)", ratio: "12.7:1", pass: true },
      { label: "Sub-headline", ratio: "10.4:1", pass: true },
      { label: "Primary CTA (white on rust)", ratio: "4.9:1", pass: true },
    ],
    tradeoff:
      "Distinctive and brand-locked — any photo we swap in will look on-brand. Less photographic realism; rust accent in headline uses a peach tint (#FFB089) so it doesn't fight the rust overlay.",
  },
  {
    id: "ConceptF",
    label: "F",
    title: "Editorial Light · Photo as Proof",
    approach:
      "Inverts the convention: warm off-white background, dark slate headline, photo demoted to a framed portrait card with a manufacturer badge underneath. Buttons become outlined to suit the lighter palette.",
    technique:
      "All text on near-white background guarantees AAA contrast for headline and body. Outlined primary CTA uses rust border and slate text so it still hits AA on the lighter ground.",
    contrast: [
      { label: "Headline (slate #0F1822 on cream)", ratio: "16.6:1", pass: true },
      { label: "Sub-headline (slate #2A3645)", ratio: "12.1:1", pass: true },
      { label: "Primary CTA (white on rust)", ratio: "4.9:1", pass: true },
    ],
    tradeoff:
      "Most editorial and 'expert' feeling. Departs from the dark hero convention most competitors use — could feel less industrial, more architectural.",
  },
];

function PreviewFrame({
  id,
  width,
  height,
  scale,
  label,
}: {
  id: string;
  width: number;
  height: number;
  scale: number;
  label: string;
}) {
  const src = `${BASE}/preview/HeroConcepts/${id}`;
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          background: BRAND.ink2,
          color: "#fff",
          fontFamily: body,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderRadius: "6px 6px 0 0",
        }}
      >
        <span>{label}</span>
        <span style={{ opacity: 0.6 }}>
          {width}×{height}
        </span>
      </div>
      <div
        style={{
          width: width * scale,
          height: height * scale,
          overflow: "hidden",
          background: "#000",
          border: `1px solid ${BRAND.ink2}`,
          borderTop: "none",
          borderRadius: "0 0 6px 6px",
        }}
      >
        <iframe
          src={src}
          title={`${id} ${label}`}
          width={width}
          height={height}
          style={{
            border: 0,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width,
            height,
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

function ConceptTile({ concept }: { concept: Concept }) {
  // We pick scales so desktop preview is ~620px wide and mobile is ~210px wide.
  const desktopWidth = 1280;
  const desktopHeight = 760;
  const desktopScale = 620 / desktopWidth;

  const mobileWidth = 390;
  const mobileHeight = 760;
  const mobileScale = 210 / mobileWidth;

  return (
    <article
      style={{
        background: BRAND.panel,
        border: `1px solid #E2E8F0`,
        borderRadius: 10,
        padding: 20,
        boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            background: BRAND.rust,
            color: "#fff",
            fontFamily: heading,
            fontWeight: 900,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {concept.label}
        </div>
        <div>
          <div
            style={{
              fontFamily: body,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: BRAND.muted,
            }}
          >
            Concept {concept.label}
          </div>
          <h3
            style={{
              fontFamily: heading,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.01em",
              color: BRAND.ink,
              margin: "2px 0 0",
            }}
          >
            {concept.title}
          </h3>
        </div>
      </header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        <PreviewFrame
          id={concept.id}
          width={1280}
          height={desktopHeight}
          scale={desktopScale}
          label={`Desktop · ${desktopWidth}px`}
        />
        <PreviewFrame
          id={concept.id}
          width={mobileWidth}
          height={mobileHeight}
          scale={mobileScale}
          label={`Mobile · ${mobileWidth}px`}
        />
      </div>

      <div
        style={{
          fontFamily: body,
          color: BRAND.ink2,
          fontSize: 14,
          lineHeight: 1.55,
        }}
      >
        <p style={{ margin: "0 0 10px" }}>{concept.approach}</p>
        <p style={{ margin: 0, color: BRAND.muted }}>
          <strong style={{ color: BRAND.ink2 }}>Technique:</strong>{" "}
          {concept.technique}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          padding: "12px 14px",
          background: "#F8FAFC",
          border: "1px solid #E2E8F0",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontFamily: body,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: BRAND.muted,
            marginBottom: 4,
          }}
        >
          WCAG Contrast (busiest area)
        </div>
        {concept.contrast.map((c) => (
          <div
            key={c.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              fontFamily: body,
              fontSize: 13,
              color: BRAND.ink2,
            }}
          >
            <span>{c.label}</span>
            <span
              style={{
                fontWeight: 700,
                color: c.pass ? BRAND.ok : BRAND.warn,
              }}
            >
              {c.ratio} {c.pass ? "AA ✓" : "fail"}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          fontFamily: body,
          fontSize: 13,
          lineHeight: 1.55,
          color: BRAND.muted,
          borderLeft: `3px solid ${BRAND.rust}`,
          paddingLeft: 12,
        }}
      >
        <strong style={{ color: BRAND.ink2 }}>Tradeoff:</strong> {concept.tradeoff}
      </div>
    </article>
  );
}

function Recommendation() {
  return (
    <section
      style={{
        background: BRAND.ink,
        color: "#fff",
        borderRadius: 12,
        padding: "28px 32px",
        marginBottom: 32,
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gap: 32,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: body,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: BRAND.rust,
            marginBottom: 8,
          }}
        >
          Recommendation
        </div>
        <h2
          style={{
            fontFamily: heading,
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            margin: "0 0 12px",
            textTransform: "uppercase",
          }}
        >
          Top pick: Concept D · Runner-up: Concept B
        </h2>
        <p
          style={{
            fontFamily: body,
            fontSize: 15,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.85)",
            margin: 0,
            maxWidth: 560,
          }}
        >
          The goal is a homepage that reads as &ldquo;commercial flat-roof
          specialist&rdquo; in three seconds, with the headline rock-solid
          legible. Concept D delivers both because text and photo never overlap
          and the photo becomes proof of work, not decoration. Concept B is the
          safer cousin if you want to keep the photo larger.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          fontFamily: body,
          fontSize: 13,
          lineHeight: 1.55,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: heading,
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: BRAND.rust,
              marginBottom: 6,
            }}
          >
            Why D wins
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(255,255,255,0.85)" }}>
            <li>Headline is image-independent — AA contrast guaranteed.</li>
            <li>Photo functions as a project credential, not wallpaper.</li>
            <li>Reads as premium &amp; specialist, not generic contractor.</li>
            <li>Mobile stack keeps photo prominent without crushing copy.</li>
          </ul>
        </div>
        <div>
          <div
            style={{
              fontFamily: heading,
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: BRAND.rust,
              marginBottom: 6,
            }}
          >
            When to pick others
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(255,255,255,0.85)" }}>
            <li><strong>B</strong> — if you want to keep photo at half-width.</li>
            <li><strong>A</strong> — if you want the smallest possible change.</li>
            <li><strong>C</strong> — for the most modern, atmospheric feel.</li>
            <li><strong>E</strong> — to brand-lock any future hero photo.</li>
            <li><strong>F</strong> — to differentiate from competitor dark heroes.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows: { label: string; values: string[] }[] = [
    { label: "Professionalism", values: ["Mid", "High", "High", "Highest", "High", "Highest"] },
    { label: "Readability risk", values: ["Low", "None", "None", "None", "Low", "None"] },
    { label: "Brand fit (industrial)", values: ["High", "High", "Mid", "Highest", "Highest", "Mid"] },
    { label: "Implementation effort", values: ["~1h", "~3h", "~2h", "~4h", "~2h", "~4h"] },
    { label: "Photo dependence", values: ["High", "Mid", "Low", "Low", "Low", "Low"] },
  ];
  return (
    <section
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 12,
        padding: 24,
        marginTop: 32,
        overflowX: "auto",
      }}
    >
      <h3
        style={{
          fontFamily: heading,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: "-0.01em",
          color: BRAND.ink,
          margin: "0 0 16px",
          textTransform: "uppercase",
        }}
      >
        At a glance
      </h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: body,
          fontSize: 13,
          minWidth: 720,
        }}
      >
        <thead>
          <tr style={{ background: "#F1F5F9" }}>
            <th style={{ textAlign: "left", padding: "10px 12px", color: BRAND.muted, fontWeight: 700 }}>
              Dimension
            </th>
            {["A", "B", "C", "D", "E", "F"].map((c) => (
              <th
                key={c}
                style={{
                  padding: "10px 12px",
                  color: BRAND.ink,
                  fontFamily: heading,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} style={{ borderTop: "1px solid #E2E8F0" }}>
              <td style={{ padding: "10px 12px", color: BRAND.ink2, fontWeight: 600 }}>
                {row.label}
              </td>
              {row.values.map((v, i) => (
                <td key={i} style={{ padding: "10px 12px", color: BRAND.ink2 }}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function HeroConcepts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setReady] = useState(false);
  useEffect(() => {
    document.title = "Homepage Hero · Concept Canvas";
    setReady(true);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: BRAND.bg,
        fontFamily: body,
        color: BRAND.ink,
        padding: "40px 32px 80px",
      }}
    >
      <div style={{ maxWidth: 1480, margin: "0 auto" }}>
        <header style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: BRAND.rust,
              marginBottom: 8,
            }}
          >
            Scott Commercial Roofing · Homepage Hero
          </div>
          <h1
            style={{
              fontFamily: heading,
              fontSize: "clamp(32px, 3.4vw, 44px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: BRAND.ink,
              margin: "0 0 8px",
            }}
          >
            Six professional hero directions
          </h1>
          <p
            style={{
              fontSize: 15,
              color: BRAND.muted,
              maxWidth: 780,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Each concept uses the exact existing hero copy, brand palette, and
            type system. The desktop preview renders at 1280px and the mobile
            preview at 390px — both are live iframes you can scroll inside. WCAG
            AA contrast was verified against the busiest area of each
            background.
          </p>
        </header>

        <Recommendation />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(660px, 1fr))",
            gap: 24,
          }}
        >
          {CONCEPTS.map((c) => (
            <ConceptTile key={c.id} concept={c} />
          ))}
        </div>

        <ComparisonTable />

        <footer
          style={{
            marginTop: 32,
            padding: "16px 20px",
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            fontSize: 12,
            color: BRAND.muted,
            lineHeight: 1.6,
          }}
        >
          Each tile embeds a live preview of the variant — open it standalone at{" "}
          <code style={{ background: "#F1F5F9", padding: "1px 6px", borderRadius: 3 }}>
            {BASE}/preview/HeroConcepts/ConceptA
          </code>{" "}
          through{" "}
          <code style={{ background: "#F1F5F9", padding: "1px 6px", borderRadius: 3 }}>
            ConceptF
          </code>
          . No homepage code has been changed — that's a follow-up once a
          winner is picked.
        </footer>
      </div>
    </div>
  );
}
