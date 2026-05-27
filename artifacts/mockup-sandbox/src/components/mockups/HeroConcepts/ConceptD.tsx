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

export default function ConceptD() {
  return (
    <HeroFrame style={{ background: BRAND.primaryDark }}>
      {/* Decorative geometry */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 75% 30%, #000 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -120,
          top: -120,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,90,31,0.35) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div
        className="hero-d"
        style={{
          position: "relative",
          zIndex: 5,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 32px 96px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
          gap: 56,
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ color: "#fff" }}>
          <Eyebrow tone="solid" />
          <h1
            style={{
              fontFamily: fontHeading,
              fontWeight: 900,
              fontSize: "clamp(40px, 5.4vw, 72px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              color: "#fff",
              marginBottom: 24,
            }}
          >
            {HERO_COPY.headlineLine1}
            <br />
            <span
              style={{
                color: BRAND.secondary,
                display: "inline-block",
                paddingBottom: 4,
                borderBottom: `4px solid ${BRAND.secondary}`,
              }}
            >
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
            aspectRatio: "4 / 5",
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6)",
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
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              right: 0,
              padding: "20px 24px",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(11,18,28,0.85) 100%)",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontFamily: fontBody,
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: BRAND.secondary,
                marginBottom: 4,
              }}
            >
              Active Project · Plano, TX
            </div>
            <div
              style={{
                fontFamily: fontHeading,
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-0.01em",
              }}
            >
              68,000 sq ft TPO retrofit
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-d { grid-template-columns: 1fr !important; gap: 36px !important; }
          .hero-d > div:last-child { max-width: 420px; }
        }
      `}</style>
    </HeroFrame>
  );
}
