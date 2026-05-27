import { SEO } from "@/components/SEO";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Scott Commercial Roofing"
        description="Privacy policy for Scott Commercial Roofing. Learn how we collect, use, and protect your information."
      />

      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm mb-10">Effective Date: January 1, 2024</p>

          <div className="prose prose-neutral max-w-none space-y-8 text-foreground/80 leading-relaxed">

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">1. Who We Are</h2>
              <p>
                Scott Commercial Roofing ("we," "us," or "our") is a commercial roofing contractor based in Dallas, Texas, serving the DFW Metroplex. This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our website or contact us for roofing services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Contact Information:</strong> Name, phone number, email address, and business or property address when you submit an estimate request, contact form, or call us directly.</li>
                <li><strong>Project Details:</strong> Information about your roof, building type, and roofing needs that you provide when requesting a quote or inspection.</li>
                <li><strong>Usage Data:</strong> Standard web server logs including your IP address, browser type, pages visited, and referring URLs. This data is collected automatically when you visit our site.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">3. Cookies &amp; Tracking</h2>
              <p>
                This website does not use tracking cookies, analytics cookies, or any third-party tracking technologies. We do not collect behavioral data about your browsing session, and no cookie consent is required to use this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">4. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Respond to your estimate requests, questions, and service inquiries</li>
                <li>Schedule inspections and communicate about your roofing project</li>
                <li>Provide quotes, invoices, and project documentation</li>
                <li>Send follow-up communications related to your inquiry or project (we do not send unsolicited marketing emails)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">5. How We Share Your Information</h2>
              <p>
                We do not sell, rent, or trade your personal information. We may share your information only in these limited circumstances:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website or conducting our business (e.g., website hosting, email platforms), bound by confidentiality obligations.</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate notice to you.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">6. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to fulfill the purposes outlined in this policy, provide ongoing services, and comply with applicable legal requirements. Project records may be retained for up to seven years for warranty and legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">7. Your Choices</h2>
              <p>
                You may contact us at any time to access, correct, or request deletion of personal information we hold about you. To opt out of follow-up communications, simply reply to any email or call us and we will remove you from our contact list promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">8. Security</h2>
              <p>
                We take reasonable technical and organizational measures to protect your information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites and encourage you to review their privacy policies independently.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">10. Children's Privacy</h2>
              <p>
                Our website is not directed at children under 13. We do not knowingly collect personal information from minors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the effective date at the top of this page. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-3">12. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us:
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
