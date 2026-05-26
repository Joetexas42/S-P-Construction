import { Link, useLocation } from "wouter";
import { Phone, Menu, X, HardHat } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Service Areas", path: "/service-areas" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <div className="bg-destructive text-destructive-foreground px-4 py-2 text-center text-sm font-semibold flex justify-center items-center gap-2 z-50 relative">
        <span className="animate-pulse w-2 h-2 rounded-full bg-white block"></span>
        24/7 Emergency Leak Response — Call Now (972) 555-0100
      </div>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-border"
            : "bg-background border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 z-50">
              <HardHat className="h-8 w-8 text-secondary" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-none text-foreground uppercase tracking-tight">Lone Star</span>
                <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Commercial Roofing</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-secondary ${
                    location === link.path ? "text-secondary" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-6">
              <a href="tel:972-555-0100" className="flex items-center gap-2 text-foreground font-bold hover:text-secondary transition-colors">
                <Phone className="h-5 w-5 text-secondary" />
                <span>(972) 555-0100</span>
              </a>
              <Link href="/contact" className="inline-block">
                <Button className="font-bold uppercase tracking-wide">
                  Get Free Inspection
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-foreground z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-background z-40 pt-28 px-6 transition-transform duration-300 ease-in-out md:hidden ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-2xl font-heading font-bold uppercase tracking-tight ${
                  location === link.path ? "text-secondary" : "text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
              <a href="tel:972-555-0100" className="flex items-center gap-3 text-2xl font-bold">
                <Phone className="h-6 w-6 text-secondary" />
                (972) 555-0100
              </a>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button size="lg" className="w-full font-bold uppercase tracking-wide text-lg mt-4">
                  Get Free Inspection
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
