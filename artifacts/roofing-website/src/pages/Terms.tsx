import { SEO } from "@/components/SEO";
import { Link } from "wouter";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service | Scott Commercial Roofing"
        description="Terms of service for Scott Commercial Roofing. Read our terms before using our website or engaging our roofing services."
      />

      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-2">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm mb-10">Effective Date: January 1, 2024</p>

          <div className="prose prose-neutral max-w-none space-y-8 text-foreground/80 leading-relaxed">

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Scott Commercial Roofing website ("Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, please do not use our Site. These Terms apply to all visitors and users of the Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">2. About Our Services</h2>
              <p>
                Scott Commercial Roofing provides commercial roofing installation, repair, replacement, and inspection services in the Dallas–Fort Worth Metroplex and surrounding North Texas areas. Our website is provided for informational purposes and to facilitate contact with prospective and existing clients.
              </p>
              <p className="mt-3">
                Use of this Site does not constitute a binding service contract. All roofing projects require a separate written agreement, signed proposal, or contract between Scott Commercial Roofing and the client prior to commencement of work.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">3. Estimates and Quotes</h2>
              <p>
                Any estimate or price range provided on this Site is for general informational purposes only and does not constitute a formal bid or binding quote. Actual project costs depend on site conditions, scope of work, material selections, and other factors assessed during an in-person inspection. A formal written proposal will be provided after an inspection is completed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">4. Acceptable Use</h2>
              <p>You agree not to use this Site to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Violate any applicable local, state, or federal laws or regulations</li>
                <li>Transmit any harmful, fraudulent, or misleading content</li>
                <li>Attempt to gain unauthorized access to any portion of the Site or its related systems</li>
                <li>Scrape, crawl, or harvest data from the Site without our prior written consent</li>
                <li>Impersonate Scott Commercial Roofing or any of its employees or representatives</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">5. Intellectual Property</h2>
              <p>
                All content on this Site — including text, photos, graphics, logos, and project images — is the property of Scott Commercial Roofing or its content suppliers and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works from any content on this Site without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">6. Disclaimers</h2>
              <p>
                This Site and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Scott Commercial Roofing makes no warranties regarding the accuracy, completeness, or reliability of any information on the Site.
              </p>
              <p className="mt-3">
                We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Scott Commercial Roofing shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this Site or its content. Our total liability for any claim related to the Site shall not exceed one hundred dollars ($100).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">8. Third-Party Links</h2>
              <p>
                Our Site may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">9. Privacy</h2>
              <p>
                Your use of the Site is also governed by our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Dallas County, Texas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">11. Changes to These Terms</h2>
              <p>
                We reserve the right to update or modify these Terms at any time without prior notice. Changes are effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">12. Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us:
              </p>
              <address className="not-italic mt-3 space-y-1">
                <p className="font-semibold text-foreground">Scott Commercial Roofing</p>
                <p>Dallas, TX — Serving the DFW Metroplex</p>
                <p>Phone: <a href="tel:972-555-0100" className="text-primary hover:underline">(972) 555-0100</a></p>
                <p>Email: <a href="mailto:info@scottcommercialroofing.com" className="text-primary hover:underline">info@scottcommercialroofing.com</a></p>
              </address>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
