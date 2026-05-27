import { SEO } from "@/components/SEO";
import { ContactForm } from "@/components/ContactForm";
import { CertificationsStrip } from "@/components/CertificationsStrip";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { GoogleReviewsSummary } from "@/components/Testimonials";

export default function Contact() {
  return (
    <>
      <SEO 
        title="Contact Us | Request Free Inspection | Scott Commercial Roofing"
        description="Contact Scott Commercial Roofing for a free inspection or emergency leak repair in North Texas. Call (972) 555-0100."
      />
      
      {/* Page Header - Photo Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/contact-hero.webp"
            srcSet="/images/contact-hero-480w.webp 480w, /images/contact-hero-800w.webp 800w, /images/contact-hero-1280w.webp 1280w"
            sizes="100vw"
            alt="Scott Commercial Roofing foreman reviewing a roof inspection report with a North Texas property manager on a commercial rooftop"
            width={1280}
            height={720}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background z-20" />
        </div>
        <div className="container relative z-30 mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-secondary/60 mb-6 backdrop-blur-sm shadow-lg">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">Free Inspection · No Obligation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">Honest Answers.<br className="hidden md:block" /> On Your Roof.</h1>
            <p className="text-xl text-white font-medium leading-relaxed [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
              Request your free, comprehensive roof inspection. Our senior inspectors provide transparent assessments and clear pricing — on your roof, in one visit.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl font-heading font-bold uppercase tracking-tight mb-6 text-foreground">Direct Contact</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">Phone</p>
                      <a href="tel:972-555-0100" className="text-xl font-bold text-foreground hover:text-secondary transition-colors">(972) 555-0100</a>
                      <p className="text-sm text-muted-foreground mt-1">Available 24/7 for emergencies</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">Email</p>
                      <a href="mailto:info@scottcommercialroofing.com" className="text-xl font-bold text-foreground hover:text-secondary transition-colors">info@scottcommercialroofing.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">Main Office</p>
                      <p className="text-xl font-bold text-foreground">Dallas, TX</p>
                      <p className="text-sm text-muted-foreground mt-1">Serving the entire DFW Metroplex</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">Hours</p>
                      <p className="text-foreground font-medium">Mon-Fri: 7:00 AM - 6:00 PM</p>
                      <p className="text-foreground font-medium text-destructive mt-1 font-bold">24/7 Emergency Dispatch</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Reviewed by DFW Building Owners</h3>
                <GoogleReviewsSummary variant="light" />
              </div>

              <div className="bg-muted p-8 rounded-lg border border-border">
                <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-4 text-foreground">What happens next?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="font-bold text-secondary">1.</span>
                    <span className="text-muted-foreground">We review your request and call to confirm details within 2 hours.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-secondary">2.</span>
                    <span className="text-muted-foreground">A senior inspector visits your property (usually within 48 hrs).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-secondary">3.</span>
                    <span className="text-muted-foreground">You receive a detailed assessment report and transparent quote.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            
          </div>
        </div>
      </section>

      <CertificationsStrip />
    </>
  );
}
