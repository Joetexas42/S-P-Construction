import { useEffect } from "react";

type JsonLd = Record<string, any>;

interface SEOProps {
  title: string;
  description: string;
  jsonLd?: JsonLd | JsonLd[];
}

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

    const existing = document.querySelectorAll(
      'script[type="application/ld+json"][data-seo="true"]',
    );
    existing.forEach((el) => el.remove());

    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const item of items) {
        const scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "application/ld+json");
        scriptTag.setAttribute("data-seo", "true");
        scriptTag.textContent = JSON.stringify(item);
        document.head.appendChild(scriptTag);
      }
    }

    return () => {
      // Optional: cleanup, but usually we just overwrite
    };
  }, [title, description, jsonLd]);

  return null;
}
