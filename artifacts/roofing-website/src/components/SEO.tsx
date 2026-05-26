import { useEffect } from "react";

type JsonLd = Record<string, any>;

interface SEOProps {
  title: string;
  description: string;
  jsonLd?: JsonLd | JsonLd[];
}

const JSON_LD_ATTR = "data-seo-jsonld";

export function SEO({ title, description, jsonLd }: SEOProps) {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    document
      .querySelectorAll(`script[type="application/ld+json"][${JSON_LD_ATTR}]`)
      .forEach((el) => el.remove());

    if (jsonLd) {
      const entries = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const entry of entries) {
        const script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute(JSON_LD_ATTR, "true");
        script.textContent = JSON.stringify(entry);
        document.head.appendChild(script);
      }
    }
  }, [title, description, jsonLd]);

  return null;
}
