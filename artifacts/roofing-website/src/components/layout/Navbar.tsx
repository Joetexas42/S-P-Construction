import { Link, useLocation } from "wouter";
import { Phone, Menu, X, HardHat, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { services, coreSystemSlugs, specialtyServiceSlugs } from "@/data/services";

interface NavLink {
  name: string;
  path: string;
  children?: { name: string; path: string; icon?: React.ComponentType<{ className?: string }> }[];
}

const cityGroups = [
  {
    label: "DFW Core",
    items: [{ name: "Dallas", path: "/service-areas/dallas" }],
  },
  {
    label: "Tarrant County",
    items: [
      { name: "Fort Worth", path: "/service-areas/fort-worth" },
      { name: "Arlington", path: "/service-areas/arlington" },
    ],
  },
  {
    label: "Collin County",
    items: [
      { name: "Plano", path: "/service-areas/plano" },
      { name: "Frisco", path: "/service-areas/frisco" },
      { name: "McKinney", path: "/service-areas/mckinney" },
    ],
  },
];

const allCityLinks = cityGroups.flatMap((g) => g.items);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [location] = useLocation();
  const closeServicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeCitiesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.touches[0].clientX;
    if (dx > 0) {
      setSwipeOffset(dx);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = Math.min(window.innerWidth * 0.3, 100);
    if (swipeOffset >= threshold) {
      setSwipeOffset(0);
      setMobileMenuOpen(false);
    } else {
      setSwipeOffset(0);
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setCitiesOpen(false);
    setMobileServicesOpen(false);
    setMobileCitiesOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      focusable?.[0]?.focus();
    } else {
      hamburgerRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !menuRef.current) return;
    const focusable = Array.from(
      menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  const systemServices = services.filter((s) => s.category === "System");

  const coreServices = systemServices
    .filter((s) => (coreSystemSlugs as readonly string[]).includes(s.slug))
    .map((s) => ({ name: s.shortTitle, path: `/services/${s.slug}`, icon: s.icon }));

  const specialtyServices = systemServices
    .filter((s) => (specialtyServiceSlugs as readonly string[]).includes(s.slug))
    .map((s) => ({ name: s.shortTitle, path: `/services/${s.slug}`, icon: s.icon }));

  const serviceLinks = [...coreServices, ...specialtyServices];

  const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services", children: serviceLinks },
    { name: "Projects", path: "/projects" },
    { name: "Service Areas", path: "/service-areas", children: allCityLinks },
    { name: "Instant Estimate", path: "/estimate" },
    { name: "Contact", path: "/contact" },
  ];

  const openServices = () => {
    if (closeServicesTimer.current) clearTimeout(closeServicesTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeServicesTimer.current) clearTimeout(closeServicesTimer.current);
    closeServicesTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const openCities = () => {
    if (closeCitiesTimer.current) clearTimeout(closeCitiesTimer.current);
    setCitiesOpen(true);
  };
  const scheduleCloseCities = () => {
    if (closeCitiesTimer.current) clearTimeout(closeCitiesTimer.current);
    closeCitiesTimer.current = setTimeout(() => setCitiesOpen(false), 150);
  };

  const darkHeroPages = ["/", "/contact"];
  const darkHeroPrefixes = ["/services", "/service-areas"];
  const isDarkHero =
    darkHeroPages.includes(location) ||
    darkHeroPrefixes.some((prefix) => location.startsWith(prefix));
  const isTransparent = isDarkHero && !isScrolled;

  const isServiceActive = location.startsWith("/services");
  const isCitiesActive = location.startsWith("/service-areas");

  const isCoreGroupActive = coreServices.some((s) => location === s.path);
  const isSpecialtyGroupActive = specialtyServices.some((s) => location === s.path);

  const cityGroupsWithActive = cityGroups.map((g) => ({
    ...g,
    isActive: g.items.some((item) => location === item.path),
  }));

  return (
    <>
      <div className="bg-destructive text-destructive-foreground px-4 py-2 text-center text-sm font-semibold flex justify-center items-center gap-2 z-50 relative">
        <span className="animate-pulse w-2 h-2 rounded-full bg-white block"></span>
        24/7 Emergency Leak Response — Call Now (972) 555-0100
      </div>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md border-border"
            : isTransparent
            ? "bg-black/40 backdrop-blur-sm border-white/10"
            : "bg-background border-border shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 z-50">
              <HardHat className="h-8 w-8 text-secondary" />
              <div className="flex flex-col">
                <span className={`font-heading font-bold text-xl leading-none uppercase tracking-tight transition-colors duration-300 ${isTransparent ? "text-white" : "text-foreground"}`}>Scott</span>
                <span className={`text-xs uppercase font-semibold tracking-wider transition-colors duration-300 ${isTransparent ? "text-white/70" : "text-muted-foreground"}`}>Commercial Roofing</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                if (link.path === "/services" && link.children) {
                  return (
                    <div
                      key={link.path}
                      className="relative"
                      onMouseEnter={openServices}
                      onMouseLeave={scheduleCloseServices}
                    >
                      <Link
                        href={link.path}
                        className={`flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-secondary ${
                          isServiceActive ? "text-secondary" : isTransparent ? "text-white/90" : "text-foreground/80"
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
                          <div className="w-[680px] rounded-lg border border-border bg-background shadow-xl p-4">
                            <Link
                              href="/services"
                              className="group flex items-center justify-between px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-secondary hover:bg-muted mb-3 transition-colors"
                            >
                              <span className="transition-colors group-hover:text-secondary/80">All Services Overview</span>
                              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                            </Link>
                            <div className="grid grid-cols-2 gap-x-6">
                              {[
                                { label: "Core Systems", items: coreServices, isActive: isCoreGroupActive },
                                { label: "Specialty Services", items: specialtyServices, isActive: isSpecialtyGroupActive },
                              ].map((group) => (
                                <div key={group.label} className="group/section">
                                  <p className={`px-3 pb-1 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 group-hover/section:text-secondary ${
                                    group.isActive ? "text-secondary" : "text-muted-foreground"
                                  }`}>
                                    {group.label}
                                    {group.isActive && (
                                      <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-secondary align-middle" />
                                    )}
                                  </p>
                                  <div className="flex flex-col gap-0.5">
                                    {group.items.map((child) => {
                                      const Icon = child.icon;
                                      const active = location === child.path;
                                      return (
                                        <Link
                                          key={child.path}
                                          href={child.path}
                                          className={`group flex items-start gap-3 px-3 py-2 rounded-md transition-all hover:bg-muted border-l-2 ${
                                            active
                                              ? "bg-secondary/5 border-secondary"
                                              : "border-transparent hover:border-secondary/30"
                                          }`}
                                        >
                                          {Icon ? (
                                            <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-all duration-200 group-hover:scale-110 ${
                                              active
                                                ? "bg-secondary text-white"
                                                : "bg-secondary/10 text-secondary"
                                            }`}>
                                              <Icon className="h-4 w-4" />
                                            </span>
                                          ) : null}
                                          <span
                                            className={`text-sm leading-tight pt-1.5 transition-colors duration-200 ${
                                              active
                                                ? "font-bold text-secondary"
                                                : "font-semibold text-foreground group-hover:text-secondary"
                                            }`}
                                          >
                                            {child.name}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (link.path === "/service-areas" && link.children) {
                  return (
                    <div
                      key={link.path}
                      className="relative"
                      onMouseEnter={openCities}
                      onMouseLeave={scheduleCloseCities}
                    >
                      <Link
                        href={link.path}
                        className={`flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-secondary ${
                          isCitiesActive ? "text-secondary" : isTransparent ? "text-white/90" : "text-foreground/80"
                        }`}
                        aria-haspopup="true"
                        aria-expanded={citiesOpen}
                        onClick={() => setCitiesOpen(false)}
                      >
                        {link.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${citiesOpen ? "rotate-180" : ""}`}
                        />
                      </Link>
                      {citiesOpen && (
                        <div
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                          onMouseEnter={openCities}
                          onMouseLeave={scheduleCloseCities}
                        >
                          <div className="w-[520px] rounded-lg border border-border bg-background shadow-xl p-4">
                            <Link
                              href="/service-areas"
                              className="group flex items-center justify-between px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-secondary hover:bg-muted mb-3 transition-colors"
                            >
                              <span className="transition-colors group-hover:text-secondary/80">All Service Areas</span>
                              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                            </Link>
                            <div className="grid grid-cols-3 gap-x-4">
                              {cityGroupsWithActive.map((group) => (
                                <div key={group.label} className="group/section">
                                  <p className={`px-3 pb-1 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 group-hover/section:text-secondary ${
                                    group.isActive ? "text-secondary" : "text-muted-foreground"
                                  }`}>
                                    {group.label}
                                    {group.isActive && (
                                      <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-secondary align-middle" />
                                    )}
                                  </p>
                                  <div className="flex flex-col gap-0.5">
                                    {group.items.map((child) => {
                                      const active = location === child.path;
                                      return (
                                        <Link
                                          key={child.path}
                                          href={child.path}
                                          className={`group flex items-center gap-2 px-3 py-2 rounded-md transition-all hover:bg-muted border-l-2 ${
                                            active
                                              ? "bg-secondary/5 border-secondary"
                                              : "border-transparent hover:border-secondary/30"
                                          }`}
                                        >
                                          <span
                                            className={`text-sm transition-colors duration-200 ${
                                              active
                                                ? "font-bold text-secondary"
                                                : "font-semibold text-foreground group-hover:text-secondary"
                                            }`}
                                          >
                                            {child.name}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-secondary ${
                      location === link.path ? "text-secondary" : isTransparent ? "text-white/90" : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-6">
              <a href="tel:972-555-0100" className={`flex items-center gap-2 font-bold hover:text-secondary transition-colors duration-300 ${isTransparent ? "text-white" : "text-foreground"}`}>
                <Phone className="h-5 w-5 text-secondary" />
                <span>(972) 555-0100</span>
              </a>
              <Link href="/contact" className="inline-block">
                <Button className="font-bold uppercase tracking-wide">
                  Get Free Inspection
                </Button>
              </Link>
            </div>

            {/* Only opens the menu; close is handled by the X inside the overlay (which is above the header's stacking context) */}
            <button
              ref={hamburgerRef}
              className={`md:hidden p-2 transition-colors duration-300 ${isTransparent && !mobileMenuOpen ? "text-white" : "text-foreground"}`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

      </header>

      {/* Mobile Menu — rendered outside <header> so it is not clipped by the header's stacking context */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onKeyDown={handleMenuKeyDown}
        className={`fixed inset-0 bg-background z-50 pt-28 px-6 pb-12 overflow-y-auto md:hidden ${
            isDragging
              ? ""
              : "transition-[transform,opacity] duration-300 ease-in-out"
          } ${mobileMenuOpen ? "opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
          style={
            isDragging
              ? { transform: `translateX(-${swipeOffset}px)` }
              : mobileMenuOpen && swipeOffset === 0
              ? { transform: "translateX(0)" }
              : undefined
          }
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button lives inside the overlay so it is always above the overlay's z-level */}
          <button
            className="absolute top-5 right-4 p-2 text-foreground"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link, index) => {
              if (link.path === "/services" && link.children) {
                return (
                  <div
                    key={link.path}
                    className="flex flex-col gap-3"
                    style={
                      mobileMenuOpen
                        ? {
                            animation: `mobile-nav-item-in 0.35s ease both`,
                            animationDelay: `${index * 60 + 60}ms`,
                          }
                        : { opacity: 0 }
                    }
                  >
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
                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.div
                          key="mobile-services-submenu"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="pl-4 border-l-2 border-secondary/40 flex flex-col gap-4 pt-1">
                            {[
                              { label: "Core Systems", items: coreServices, isActive: isCoreGroupActive },
                              { label: "Specialty Services", items: specialtyServices, isActive: isSpecialtyGroupActive },
                            ].map((group) => (
                              <div key={group.label} className="flex flex-col gap-1">
                                <p className={`text-[10px] font-bold uppercase tracking-widest pb-1 ${
                                  group.isActive ? "text-secondary" : "text-muted-foreground"
                                }`}>
                                  {group.label}
                                  {group.isActive && (
                                    <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-secondary align-middle" />
                                  )}
                                </p>
                                {group.items.map((child) => {
                                  const Icon = child.icon;
                                  const active = location === child.path;
                                  return (
                                    <Link
                                      key={child.path}
                                      href={child.path}
                                      className={`group flex items-center gap-3 text-base rounded-md px-2 py-1.5 -mx-2 border-l-2 transition-all duration-200 hover:bg-muted active:scale-[0.97] ${
                                        active
                                          ? "font-bold text-secondary bg-secondary/5 border-secondary"
                                          : "font-semibold text-foreground/80 border-transparent hover:text-secondary hover:border-secondary/30 active:text-secondary"
                                      }`}
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {Icon ? (
                                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-all duration-200 group-hover:scale-110 ${
                                          active
                                            ? "bg-secondary text-white"
                                            : "bg-secondary/10 text-secondary"
                                        }`}>
                                          <Icon className="h-4 w-4" />
                                        </span>
                                      ) : null}
                                      <span>{child.name}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (link.path === "/service-areas" && link.children) {
                return (
                  <div
                    key={link.path}
                    className="flex flex-col gap-3"
                    style={
                      mobileMenuOpen
                        ? {
                            animation: `mobile-nav-item-in 0.35s ease both`,
                            animationDelay: `${index * 60 + 60}ms`,
                          }
                        : { opacity: 0 }
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={link.path}
                        className={`text-2xl font-heading font-bold uppercase tracking-tight ${
                          isCitiesActive ? "text-secondary" : "text-foreground"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      <button
                        type="button"
                        aria-label={mobileCitiesOpen ? "Collapse cities" : "Expand cities"}
                        aria-expanded={mobileCitiesOpen}
                        onClick={() => setMobileCitiesOpen((v) => !v)}
                        className="p-2 -mr-2 text-foreground"
                      >
                        <ChevronDown
                          className={`h-6 w-6 transition-transform ${
                            mobileCitiesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {mobileCitiesOpen && (
                        <motion.div
                          key="mobile-cities-submenu"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="pl-4 border-l-2 border-secondary/40 flex flex-col gap-4 pt-1">
                            {cityGroupsWithActive.map((group) => (
                              <div key={group.label} className="flex flex-col gap-1">
                                <p className={`text-[10px] font-bold uppercase tracking-widest pb-1 ${
                                  group.isActive ? "text-secondary" : "text-muted-foreground"
                                }`}>
                                  {group.label}
                                  {group.isActive && (
                                    <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-secondary align-middle" />
                                  )}
                                </p>
                                {group.items.map((child) => {
                                  const active = location === child.path;
                                  return (
                                    <Link
                                      key={child.path}
                                      href={child.path}
                                      className={`text-base rounded-md px-2 py-1.5 -mx-2 border-l-2 transition-all duration-200 hover:bg-muted active:scale-[0.97] ${
                                        active
                                          ? "font-bold text-secondary bg-secondary/5 border-secondary"
                                          : "font-semibold text-foreground/80 border-transparent hover:text-secondary hover:border-secondary/30 active:text-secondary"
                                      }`}
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {child.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`rounded-md px-2 py-1 -mx-2 text-2xl font-heading font-bold uppercase tracking-tight transition-all duration-200 hover:bg-muted active:scale-[0.97] ${
                    location === link.path
                      ? "text-secondary"
                      : "text-foreground hover:text-secondary active:text-secondary"
                  }`}
                  style={
                    mobileMenuOpen
                      ? {
                          animation: `mobile-nav-item-in 0.35s ease both`,
                          animationDelay: `${index * 60 + 60}ms`,
                        }
                      : { opacity: 0 }
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div
              className="mt-8 pt-8 border-t border-border flex flex-col gap-4"
              style={
                mobileMenuOpen
                  ? {
                      animation: `mobile-nav-item-in 0.35s ease both`,
                      animationDelay: `${navLinks.length * 60 + 60}ms`,
                    }
                  : { opacity: 0 }
              }
            >
              <a href="tel:972-555-0100" className="flex items-center gap-3 text-2xl font-bold transition-all duration-200 hover:text-secondary active:scale-[0.97] active:text-secondary">
                <Phone className="h-6 w-6 text-secondary" />
                (972) 555-0100
              </a>
              <Link href="/contact" className="active:scale-[0.97] transition-transform duration-200 block" onClick={() => setMobileMenuOpen(false)}>
                <Button size="lg" className="w-full font-bold uppercase tracking-wide text-lg mt-4">
                  Get Free Inspection
                </Button>
              </Link>
            </div>
          </nav>
        </div>
    </>
  );
}
