import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  jsonLd?: Record<string, any>;
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

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional: cleanup, but usually we just overwrite
    };
  }, [title, description, jsonLd]);

  return null;
}
