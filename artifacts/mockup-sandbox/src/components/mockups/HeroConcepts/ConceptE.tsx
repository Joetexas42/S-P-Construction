import {
  BRAND,
  CTARow,
  Eyebrow,
  Headline,
  HERO_IMAGE,
  HeroContainer,
  HeroFrame,
  QuickLinks,
  SubHead,
} from "./_shared";

export default function ConceptE() {
  return (
    <HeroFrame style={{ background: BRAND.primaryDarker }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Duotone: dark slate base + rust highlights, applied via mix-blend */}
        <img
          src={HERO_IMAGE}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(1) contrast(1.15) brightness(0.78)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: BRAND.primaryDarker,
            mixBlendMode: "multiply",
            opacity: 0.78,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: BRAND.secondary,
            mixBlendMode: "screen",
            opacity: 0.22,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(11,18,28,0.6) 0%, rgba(11,18,28,0.1) 100%)",
          }}
        />
      </div>

      <HeroContainer>
        <Eyebrow tone="dark" />
        <Headline accentColor="#FFB089" shadow="0 2px 12px rgba(0,0,0,0.55)" />
        <SubHead shadow="0 1px 6px rgba(0,0,0,0.55)" />
        <CTARow tone="onDark" />
        <QuickLinks color="#fff" shadow="0 1px 4px rgba(0,0,0,0.6)" />
      </HeroContainer>
    </HeroFrame>
  );
}
