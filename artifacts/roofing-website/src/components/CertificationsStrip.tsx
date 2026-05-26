type Credential = {
  name: string;
  sub: string;
  logo: string;
  href?: string;
};

const credentials: Credential[] = [
  {
    name: "BBB Accredited",
    sub: "A+ Rated Business",
    logo: "/images/certifications/bbb-accredited.svg",
    href: "https://www.bbb.org/us/tx/dallas",
  },
  {
    name: "OSHA 30",
    sub: "Construction Safety Trained",
    logo: "/images/certifications/osha-30.svg",
    href: "https://www.osha.gov/training/outreach/construction",
  },
  {
    name: "RCAT Member",
    sub: "Roofing Contractors Assn. of Texas",
    logo: "/images/certifications/rcat-member.svg",
    href: "https://www.rcat.net/",
  },
  {
    name: "Licensed & Insured",
    sub: "$2M Commercial GL — Travelers",
    logo: "/images/certifications/licensed-insured-tx.svg",
  },
];

export function CertificationsStrip() {
  return (
    <section
      className="py-14 bg-muted border-b border-border"
      aria-label="Certifications and credentials"
      data-testid="certifications-strip"
    >
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
          Certifications &amp; Credentials — Vetted, Trained, Insured
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {credentials.map((c) => {
            const card = (
              <div
                className="flex items-center justify-center border border-border rounded-lg px-6 py-4 min-w-[200px] h-[96px] bg-card hover:border-secondary transition-colors"
                data-testid={`credential-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <img
                  src={c.logo}
                  alt={`${c.name} — ${c.sub}`}
                  className="max-h-16 w-auto object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    const parent = img.parentElement;
                    if (!parent) return;
                    img.style.display = "none";
                    if (!parent.querySelector("[data-fallback]")) {
                      const fb = document.createElement("div");
                      fb.setAttribute("data-fallback", "true");
                      fb.className = "flex flex-col items-center justify-center text-center";
                      fb.innerHTML = `<span class="font-heading font-black text-base uppercase tracking-tight text-foreground">${c.name}</span><span class="text-xs text-muted-foreground font-semibold tracking-wide mt-1">${c.sub}</span>`;
                      parent.appendChild(fb);
                    }
                  }}
                />
              </div>
            );
            return c.href ? (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${c.name} (${c.sub})`}
                className="block focus:outline-none focus:ring-2 focus:ring-secondary rounded-lg"
              >
                {card}
              </a>
            ) : (
              <div key={c.name}>{card}</div>
            );
          })}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          Every crew is OSHA 30 trained, every project is backed by $2M in commercial general liability coverage, and every customer gets the protection of working with a BBB-accredited, RCAT-member contractor.
        </p>
      </div>
    </section>
  );
}
