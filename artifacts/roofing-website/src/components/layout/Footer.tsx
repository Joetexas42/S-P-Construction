import { Link } from "wouter";
import { Phone, Mail, MapPin, HardHat } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <HardHat className="h-8 w-8 text-secondary" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-none text-white uppercase tracking-tight">Lone Star</span>
                <span className="text-xs text-primary-foreground/70 uppercase font-semibold tracking-wider">Commercial Roofing</span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed text-sm">
              Battle-hardened commercial roofing contractors serving North Texas since 2003. We protect the businesses that keep the DFW metroplex running.
            </p>
          </div>

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
                <a href="mailto:info@lonestarroofing.com" className="hover:text-white transition-colors">info@lonestarroofing.com</a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-bold text-lg uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/services" className="hover:text-white transition-colors">Commercial Roof Repair</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Full Roof Replacement</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Storm Damage & Hail Repair</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">TPO & EPDM Systems</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Metal Roofing Systems</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Emergency Leak Repair</Link></li>
            </ul>
          </div>

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

        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {["Firestone Building Products", "Mule-Hide Products Co.", "Duro-Last PVC Systems", "TPO Membrane Systems"].map((brand) => (
              <span key={brand} className="px-3 py-1 rounded border border-primary-foreground/20 text-xs text-primary-foreground/60 font-semibold uppercase tracking-wide">
                {brand}
              </span>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} Lone Star Commercial Roofing. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><HardHat className="h-3 w-3" /> Licensed & Insured in Texas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
