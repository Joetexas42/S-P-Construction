import { Link } from "wouter";
import { Phone, Mail, MapPin, HardHat } from "lucide-react";
import { ScrollRevealWrapper } from "@/components/ScrollRevealWrapper";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <ScrollRevealWrapper delay={0}>
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2">
                <HardHat className="h-8 w-8 text-secondary" />
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xl leading-none text-white uppercase tracking-tight">S&P</span>
                  <span className="text-xs text-primary-foreground/70 uppercase font-semibold tracking-wider">Construction</span>
                </div>
              </Link>
              <p className="text-primary-foreground/80 leading-relaxed text-sm">
                Battle-hardened commercial roofing contractors serving North Texas since 2003. We protect the businesses that keep the DFW metroplex running.
              </p>
            </div>
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={100}>
            <div className="space-y-6">
              <h4 className="font-heading font-bold text-lg uppercase tracking-wider text-white">Contact Us</h4>
              <ul className="space-y-4 text-sm text-primary-foreground/80">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span>Dallas, TX<br/>Serving the DFW Metroplex</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-secondary shrink-0" />
                  <a href="tel:972-555-0100" className="hover:text-white transition-colors">(972) 555-0100</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-secondary shrink-0" />
                  <a href="mailto:info@spconstructiondfw.com" className="hover:text-white transition-colors">info@spconstructiondfw.com</a>
                </li>
              </ul>
            </div>
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={200}>
            <div className="space-y-6">
              <h4 className="font-heading font-bold text-lg uppercase tracking-wider text-white">Services</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                <li><Link href="/services/repair" className="hover:text-white transition-colors">Commercial Roof Repair</Link></li>
                <li><Link href="/services/replacement" className="hover:text-white transition-colors">Full Roof Replacement</Link></li>
                <li><Link href="/services/storm-damage" className="hover:text-white transition-colors">Storm Damage &amp; Hail Repair</Link></li>
                <li><Link href="/services/tpo-epdm-pvc" className="hover:text-white transition-colors">TPO, EPDM &amp; PVC Systems</Link></li>
                <li><Link href="/services/metal-roofing" className="hover:text-white transition-colors">Metal Roofing Systems</Link></li>
                <li><Link href="/services/emergency-leak-repair" className="hover:text-white transition-colors">Emergency Leak Repair</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors font-semibold">All Services &rarr;</Link></li>
              </ul>
            </div>
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={300}>
            <div className="space-y-6">
              <h4 className="font-heading font-bold text-lg uppercase tracking-wider text-white">Service Areas</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/80 grid grid-cols-2">
                <li>Dallas</li>
                <li>Fort Worth</li>
                <li>Frisco</li>
                <li>Plano</li>
                <li>McKinney</li>
                <li>Allen</li>
                <li>Garland</li>
                <li>Irving</li>
                <li>Arlington</li>
                <li>Denton</li>
              </ul>
              <Link href="/service-areas" className="text-secondary text-sm font-bold uppercase tracking-wide hover:text-white transition-colors inline-block mt-2">
                View All Areas &rarr;
              </Link>
            </div>
          </ScrollRevealWrapper>

        </div>

        <ScrollRevealWrapper delay={150}>
          <div className="mt-12 pt-8 border-t border-primary-foreground/10">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {["Firestone Building Products", "Mule-Hide Products Co.", "Duro-Last PVC Systems", "TPO Membrane Systems"].map((brand) => (
                <span key={brand} className="inline-block px-3 py-1 rounded border border-primary-foreground/20 text-xs text-primary-foreground/60 font-semibold uppercase tracking-wide hover:border-primary-foreground/40 hover:scale-[1.02] transition-all duration-200">
                  {brand}
                </span>
              ))}
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
              <p>&copy; {new Date().getFullYear()} S&P Construction. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/about" className="hover:text-primary-foreground/90 transition-colors">About</Link>
                <Link href="/faq" className="hover:text-primary-foreground/90 transition-colors">FAQ</Link>
                <Link href="/privacy-policy" className="hover:text-primary-foreground/90 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-primary-foreground/90 transition-colors">Terms of Service</Link>
                <span className="flex items-center gap-1"><HardHat className="h-3 w-3" /> Licensed & Insured in Texas</span>
              </div>
            </div>
            <div className="mt-4 text-center text-xs text-primary-foreground/40">
              <Link href="/built-by" className="hover:text-primary-foreground/70 transition-colors">
                Built by
              </Link>{" "}
              <a
                href="https://www.paperstreet.online"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/70 transition-colors"
              >
                Paper Street Software Co.
              </a>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </footer>
  );
}
