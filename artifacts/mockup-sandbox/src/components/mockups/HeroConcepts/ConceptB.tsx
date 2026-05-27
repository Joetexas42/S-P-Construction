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

export default function ConceptB() {
  return (
    <HeroFrame style={{ background: BRAND.primaryDark }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
          minHeight: "100vh",
          width: "100%",
        }}
        className="hero-split"
      >
        <div
          style={{
            background: BRAND.primaryDarker,
            color: "#fff",
            padding: "112px 8vw 80px 8vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: -1,
              width: 6,
              background: BRAND.secondary,
            }}
          />
          <Eyebrow tone="solid" />
          <h1
            style={{
              fontFamily: fontHeading,
              fontWeight: 900,
              fontSize: "clamp(36px, 4.6vw, 64px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#fff",
              marginBottom: 24,
            }}
          >
            {HERO_COPY.headlineLine1}
            <br />
            <span style={{ color: BRAND.secondary }}>
              {HERO_COPY.headlineLine2}
            </span>
          </h1>
          <p
            style={{
              fontFamily: fontBody,
              fontSize: "clamp(15px, 1.2vw, 18px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.92)",
              maxWidth: 560,
              marginBottom: 36,
            }}
          >
            {HERO_COPY.sub}
          </p>
          <CTARow tone="onDark" />
          <QuickLinks color="rgba(255,255,255,0.92)" />
        </div>

        <div
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: 320,
          }}
        >
          <img
            src={HERO_IMAGE}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(270deg, rgba(0,0,0,0) 60%, rgba(11,18,28,0.55) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 32,
              bottom: 32,
              padding: "10px 16px",
              background: "rgba(11,18,28,0.7)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              fontFamily: fontBody,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderLeft: `3px solid ${BRAND.secondary}`,
            }}
          >
            DFW Metroplex · 20+ Years
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .hero-split { grid-template-columns: 1fr !important; }
          .hero-split > div:last-child { min-height: 280px !important; order: -1; }
        }
      `}</style>
    </HeroFrame>
  );
}
