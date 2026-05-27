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

export default function ConceptF() {
  return (
    <HeroFrame style={{ background: "#F4F1EC" }}>
      {/* subtle paper texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(61, 72, 84, 0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="hero-f"
        style={{
          position: "relative",
          zIndex: 5,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 32px 96px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
          gap: 64,
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ color: BRAND.primaryDarker }}>
          <Eyebrow tone="light" />
          <h1
            style={{
              fontFamily: fontHeading,
              fontWeight: 900,
              fontSize: "clamp(42px, 5.6vw, 76px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              color: BRAND.primaryDarker,
              marginBottom: 28,
            }}
          >
            {HERO_COPY.headlineLine1}
            <br />
            <span style={{ color: BRAND.secondaryDark }}>
              {HERO_COPY.headlineLine2}
            </span>
          </h1>
          <p
            style={{
              fontFamily: fontBody,
              fontSize: "clamp(16px, 1.25vw, 19px)",
              lineHeight: 1.6,
              color: "hsl(215, 25%, 22%)",
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            {HERO_COPY.sub}
          </p>
          <CTARow tone="outlineLight" />
          <QuickLinks color={BRAND.primaryDarker} />
        </div>

        <div style={{ position: "relative" }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-20px -20px 20px 20px",
              border: `2px solid ${BRAND.secondaryDark}`,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 30px 60px -25px rgba(11,18,28,0.35)",
            }}
          >
            <img
              src={HERO_IMAGE}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 22,
              padding: "14px 18px",
              background: "#fff",
              borderLeft: `4px solid ${BRAND.secondaryDark}`,
              boxShadow: "0 10px 30px -20px rgba(11,18,28,0.25)",
            }}
          >
            <div
              style={{
                fontFamily: fontBody,
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: BRAND.muted,
                marginBottom: 2,
              }}
            >
              Authorized Contractor
            </div>
            <div
              style={{
                fontFamily: fontHeading,
                fontWeight: 800,
                fontSize: 18,
                color: BRAND.primaryDarker,
                letterSpacing: "-0.01em",
              }}
            >
              Firestone · Mule-Hide · Duro-Last
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-f { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-f > div:last-child { max-width: 420px; }
        }
      `}</style>
    </HeroFrame>
  );
}
