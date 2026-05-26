import { SEO } from "@/components/SEO";
import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <>
      <SEO 
        title="Contact Us | Request Free Inspection | Lone Star Roofing"
        description="Contact Lone Star Commercial Roofing for a free inspection or emergency leak repair in North Texas. Call (972) 555-0100."
      />
      
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground pt-24 pb-16 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6 text-white">Get a Quote</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Request your free, comprehensive roof inspection. Our experts provide honest assessments and transparent pricing.
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
                      <a href="mailto:info@lonestarroofing.com" className="text-xl font-bold text-foreground hover:text-secondary transition-colors">info@lonestarroofing.com</a>
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
    </>
  );
}
