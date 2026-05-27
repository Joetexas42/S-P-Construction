import {
  BRAND,
  CTARow,
  Eyebrow,
  fontBody,
  fontHeading,
  HERO_COPY,
  HERO_IMAGE,
  HeroFrame,
  QuickLinks,
} from "./_shared";

export default function ConceptC() {
  return (
    <HeroFrame>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src={HERO_IMAGE}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(14px) brightness(0.7) saturate(1.1)",
            transform: "scale(1.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(11,18,28,0.45) 0%, rgba(11,18,28,0.7) 80%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 5,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 32px 96px",
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            padding: "48px 48px 44px",
            background: "rgba(20, 28, 42, 0.72)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderLeft: `4px solid ${BRAND.secondary}`,
            borderRadius: 6,
            backdropFilter: "blur(18px) saturate(140%)",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
            color: "#fff",
          }}
        >
          <Eyebrow tone="solid" />
          <h1
            style={{
              fontFamily: fontHeading,
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#fff",
              marginBottom: 24,
            }}
          >
            {HERO_COPY.headlineLine1}{" "}
            <span style={{ color: BRAND.secondary }}>
              {HERO_COPY.headlineLine2}
            </span>
          </h1>
          <p
            style={{
              fontFamily: fontBody,
              fontSize: "clamp(15px, 1.2vw, 18px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.95)",
              marginBottom: 32,
            }}
          >
            {HERO_COPY.sub}
          </p>
          <CTARow tone="onDark" />
          <QuickLinks color="rgba(255,255,255,0.95)" />
        </div>
      </div>
    </HeroFrame>
  );
}
