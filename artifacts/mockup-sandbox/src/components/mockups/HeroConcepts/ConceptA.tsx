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

export default function ConceptA() {
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
            filter: "brightness(0.62) saturate(1.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(11,18,28,0.88) 0%, rgba(11,18,28,0.7) 38%, rgba(11,18,28,0.25) 70%, rgba(11,18,28,0) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,18,28,0.45) 0%, transparent 30%, transparent 70%, rgba(11,18,28,0.6) 100%)",
          }}
        />
      </div>

      <HeroContainer>
        <Eyebrow tone="dark" />
        <Headline shadow="0 2px 14px rgba(0,0,0,0.55)" />
        <SubHead shadow="0 1px 6px rgba(0,0,0,0.55)" />
        <CTARow tone="onDark" />
        <QuickLinks shadow="0 1px 4px rgba(0,0,0,0.6)" color="#fff" />
      </HeroContainer>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: BRAND.secondary,
          zIndex: 4,
        }}
      />
    </HeroFrame>
  );
}
