import type { CSSProperties, ReactNode } from "react";

export const HERO_COPY = {
  eyebrow: "Serving North Texas Since 2003",
  headlineLine1: "Scott Commercial",
  headlineLine2: "Flat Roof Specialists.",
  sub: "TPO, PVC, and single-ply membrane systems engineered for the DFW Metroplex — installed and serviced by an authorized Firestone (Elevate), Mule-Hide, and Duro-Last contractor. Hail-tough, energy-efficient, warranty-backed.",
  ctas: {
    primary: "Get Instant Estimate",
    secondary: "Request Free Inspection",
    phone: "Call (972) 555-0100",
  },
  quickLinks: [
    "TPO vs. PVC →",
    "10 Benefits of TPO →",
    "Firestone · Mule-Hide · Duro-Last →",
  ],
} as const;

export const BRAND = {
  primary: "hsl(215, 20%, 30%)",
  primaryDark: "hsl(215, 28%, 18%)",
  primaryDarker: "hsl(215, 32%, 12%)",
  secondary: "hsl(15, 75%, 45%)",
  secondaryDark: "hsl(15, 80%, 38%)",
  background: "hsl(210, 20%, 98%)",
  foreground: "hsl(215, 25%, 15%)",
  muted: "hsl(215, 15%, 45%)",
  accent: "hsl(205, 60%, 45%)",
  white: "#ffffff",
} as const;

export const fontHeading = "'Barlow', system-ui, sans-serif";
export const fontBody = "'DM Sans', system-ui, sans-serif";

export const HERO_IMAGE = `${import.meta.env.BASE_URL}images/hero-bg.webp`;

export function HeroFrame({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        fontFamily: fontBody,
        color: BRAND.foreground,
        background: BRAND.background,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  tone = "dark",
  style,
}: {
  tone?: "dark" | "light" | "solid";
  style?: CSSProperties;
}) {
  const bg =
    tone === "dark"
      ? "rgba(0,0,0,0.45)"
      : tone === "light"
        ? "rgba(255,255,255,0.85)"
        : BRAND.primaryDark;
  const color =
    tone === "light" ? BRAND.primaryDark : "#fff";
  const border =
    tone === "light" ? `1px solid ${BRAND.secondary}` : `1px solid ${BRAND.secondary}`;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 14px",
        borderRadius: 999,
        background: bg,
        border,
        backdropFilter: "blur(6px)",
        marginBottom: 24,
        ...style,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: BRAND.secondary,
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color,
          fontFamily: fontBody,
        }}
      >
        {HERO_COPY.eyebrow}
      </span>
    </div>
  );
}

export function Headline({
  color = "#fff",
  accentColor = BRAND.secondary,
  shadow,
  size = "xl",
  style,
}: {
  color?: string;
  accentColor?: string;
  shadow?: string;
  size?: "lg" | "xl";
  style?: CSSProperties;
}) {
  const fontSize = size === "xl" ? "clamp(40px, 6.4vw, 76px)" : "clamp(36px, 5.4vw, 64px)";
  return (
    <h1
      style={{
        fontFamily: fontHeading,
        fontWeight: 900,
        fontSize,
        lineHeight: 1.02,
        letterSpacing: "-0.02em",
        textTransform: "uppercase",
        color,
        marginBottom: 24,
        textShadow: shadow,
        ...style,
      }}
    >
      {HERO_COPY.headlineLine1}
      <br />
      <span style={{ color: accentColor }}>{HERO_COPY.headlineLine2}</span>
    </h1>
  );
}

export function SubHead({
  color = "#fff",
  shadow,
  maxWidth = 640,
  style,
}: {
  color?: string;
  shadow?: string;
  maxWidth?: number;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        fontFamily: fontBody,
        fontSize: "clamp(16px, 1.4vw, 20px)",
        lineHeight: 1.55,
        fontWeight: 500,
        color,
        maxWidth,
        marginBottom: 36,
        textShadow: shadow,
        ...style,
      }}
    >
      {HERO_COPY.sub}
    </p>
  );
}

type CtaTone = "onDark" | "onLight" | "outlineDark" | "outlineLight";

function ctaStyle(tone: CtaTone, variant: "primary" | "secondary"): CSSProperties {
  const base: CSSProperties = {
    fontFamily: fontBody,
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "14px 26px",
    borderRadius: 4,
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "transform 120ms ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  };
  if (variant === "primary") {
    return {
      ...base,
      background: BRAND.secondary,
      color: "#fff",
      boxShadow: "0 10px 24px -10px rgba(0,0,0,0.45)",
    };
  }
  if (tone === "onDark" || tone === "outlineDark") {
    return {
      ...base,
      background: "rgba(0,0,0,0.32)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.45)",
      backdropFilter: "blur(6px)",
    };
  }
  return {
    ...base,
    background: "transparent",
    color: BRAND.primaryDark,
    border: `1.5px solid ${BRAND.primaryDark}`,
  };
}

export function CTARow({
  tone = "onDark",
  align = "start",
  style,
}: {
  tone?: CtaTone;
  align?: "start" | "center";
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 14,
        justifyContent: align === "center" ? "center" : "flex-start",
        ...style,
      }}
    >
      <button style={ctaStyle(tone, "primary")}>{HERO_COPY.ctas.primary}</button>
      <button style={ctaStyle(tone, "secondary")}>{HERO_COPY.ctas.secondary}</button>
      <button style={ctaStyle(tone, "secondary")}>{HERO_COPY.ctas.phone}</button>
    </div>
  );
}

export function QuickLinks({
  color = "#fff",
  shadow,
  align = "start",
  style,
}: {
  color?: string;
  shadow?: string;
  align?: "start" | "center";
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        marginTop: 32,
        display: "flex",
        flexWrap: "wrap",
        rowGap: 8,
        columnGap: 24,
        justifyContent: align === "center" ? "center" : "flex-start",
        ...style,
      }}
    >
      {HERO_COPY.quickLinks.map((l) => (
        <a
          key={l}
          href="#"
          style={{
            fontFamily: fontBody,
            fontWeight: 700,
            fontSize: 14,
            color,
            textDecoration: "none",
            textShadow: shadow,
          }}
        >
          {l}
        </a>
      ))}
    </div>
  );
}

export function HeroContainer({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 5,
        width: "100%",
        maxWidth: 1280,
        margin: "0 auto",
        padding: "120px 32px 96px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
