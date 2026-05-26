import { Link, useLocation } from "wouter";
import { Phone, Menu, X, HardHat, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

interface NavLink {
  name: string;
  path: string;
  children?: { name: string; path: string; icon?: React.ComponentType<{ className?: string }> }[];
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [location] = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  const serviceLinks = services.map((s) => ({
    name: s.shortTitle,
    path: `/services/${s.slug}`,
    icon: s.icon,
  }));

  const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services", children: serviceLinks },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Service Areas", path: "/service-areas" },
    { name: "Instant Estimate", path: "/estimate" },
    { name: "Contact", path: "/contact" },
  ];

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const isServiceActive = location.startsWith("/services");

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
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                  >
                    <Link
                      href={link.path}
                      className={`flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-secondary ${
                        isServiceActive ? "text-secondary" : "text-foreground/80"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen(false)}
                    >
                      {link.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </Link>
                    {servicesOpen && (
                      <div
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                        onMouseEnter={openServices}
                        onMouseLeave={scheduleCloseServices}
                      >
                        <div className="w-[640px] rounded-lg border border-border bg-background shadow-xl p-4 grid grid-cols-2 gap-1">
                          <Link
                            href="/services"
                            className="col-span-2 flex items-center justify-between px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-secondary hover:bg-muted"
                          >
                            <span>All Services Overview</span>
                            <span aria-hidden>→</span>
                          </Link>
                          {link.children.map((child) => {
                            const Icon = child.icon;
                            const active = location === child.path;
                            return (
                              <Link
                                key={child.path}
                                href={child.path}
                                className={`flex items-start gap-3 px-3 py-2 rounded-md transition-colors hover:bg-muted ${
                                  active ? "bg-muted" : ""
                                }`}
                              >
                                {Icon ? (
                                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary/10 text-secondary">
                                    <Icon className="h-4 w-4" />
                                  </span>
                                ) : null}
                                <span
                                  className={`text-sm font-semibold leading-tight pt-1.5 ${
                                    active ? "text-secondary" : "text-foreground"
                                  }`}
                                >
                                  {child.name}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-secondary ${
                      location === link.path ? "text-secondary" : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                ),
              )}
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
          className={`fixed inset-0 bg-background z-40 pt-28 px-6 pb-12 overflow-y-auto transition-transform duration-300 ease-in-out md:hidden ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.path} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={link.path}
                      className={`text-2xl font-heading font-bold uppercase tracking-tight ${
                        isServiceActive ? "text-secondary" : "text-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    <button
                      type="button"
                      aria-label={mobileServicesOpen ? "Collapse services" : "Expand services"}
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="p-2 -mr-2 text-foreground"
                    >
                      <ChevronDown
                        className={`h-6 w-6 transition-transform ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {mobileServicesOpen && (
                    <div className="pl-4 border-l-2 border-secondary/40 flex flex-col gap-3">
                      {link.children.map((child) => {
                        const Icon = child.icon;
                        const active = location === child.path;
                        return (
                          <Link
                            key={child.path}
                            href={child.path}
                            className={`flex items-center gap-3 text-base font-semibold ${
                              active ? "text-secondary" : "text-foreground/80"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {Icon ? <Icon className="h-5 w-5 text-secondary" /> : null}
                            <span>{child.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
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
              ),
            )}
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
