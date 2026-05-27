import { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  MapPin,
  Ruler,
  DollarSign,
  Loader2,
  CheckCircle2,
  Pencil,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  useGetRoofArea,
  useSubmitEstimator,
} from "@workspace/api-client-react";
import {
  ESTIMATOR_SERVICES,
  computeEstimateUsd,
  getEstimatorServiceById,
} from "@workspace/estimator-config";
import {
  loadGoogleMaps,
  GOOGLE_MAPS_KEY_AVAILABLE,
} from "@/lib/google-maps";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number is required"),
  company: z.string().optional(),
  message: z.string().optional(),
});
type LeadValues = z.infer<typeof leadSchema>;

type SqftSource = "solar" | "manual";

interface SelectedLocation {
  address: string;
  lat: number;
  lng: number;
}

const SQM_TO_SQFT = 10.7639;

export default function EstimatePage() {
  const { toast } = useToast();
  const [mapsReady, setMapsReady] = useState(false);
  const [mapsError, setMapsError] = useState<string | null>(null);
  const [location, setLocation] = useState<SelectedLocation | null>(null);
  const [sqft, setSqft] = useState<number | null>(null);
  const [sqftSource, setSqftSource] = useState<SqftSource | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualPoints, setManualPoints] = useState<google.maps.LatLngLiteral[]>([]);
  const [serviceId, setServiceId] = useState<string>(ESTIMATOR_SERVICES[0].id);
  const [submitted, setSubmitted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const buildingPolygonsRef = useRef<google.maps.Polygon[]>([]);
  const manualPolygonRef = useRef<google.maps.Polygon | null>(null);
  const manualMarkersRef = useRef<google.maps.Marker[]>([]);
  const propertyMarkerRef = useRef<google.maps.Marker | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapClickListenerRef = useRef<google.maps.MapsEventListener | null>(null);

  const roofAreaQuery = useGetRoofArea(
    { lat: location?.lat ?? 0, lng: location?.lng ?? 0 },
    {
      query: {
        enabled: !!location,
        refetchOnWindowFocus: false,
        retry: false,
        queryKey: ["roof-area", location?.lat ?? 0, location?.lng ?? 0],
      },
    },
  );

  const submitMutation = useSubmitEstimator();

  // ---------------------------------------------------------------------------
  // Load Google Maps once
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!GOOGLE_MAPS_KEY_AVAILABLE) {
      setMapsError(
        "The map service isn't configured yet. Please call us at (972) 555-0100 for an estimate.",
      );
      return;
    }
    loadGoogleMaps()
      .then(() => setMapsReady(true))
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : "Failed to load Google Maps";
        setMapsError(msg);
      });
  }, []);

  // ---------------------------------------------------------------------------
  // Autocomplete wiring
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!mapsReady || !inputRef.current || autocompleteRef.current) return;
    const ac = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["formatted_address", "geometry", "name"],
    });
    autocompleteRef.current = ac;
    const listener = ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (!place.geometry?.location) {
        toast({
          variant: "destructive",
          title: "Address not found",
          description: "Please pick an address from the dropdown.",
        });
        return;
      }
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address ?? place.name ?? "";
      resetMeasurement();
      setLocation({ address, lat, lng });
    });
    return () => {
      listener.remove();
    };
  }, [mapsReady, toast]);

  // ---------------------------------------------------------------------------
  // Initialize / update map when location changes
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!mapsReady || !location || !mapContainerRef.current) return;

    const center = { lat: location.lat, lng: location.lng };
    if (!mapRef.current) {
      mapRef.current = new google.maps.Map(mapContainerRef.current, {
        center,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        tilt: 0,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "greedy",
      });
    } else {
      mapRef.current.setCenter(center);
      mapRef.current.setZoom(20);
    }

    propertyMarkerRef.current?.setMap(null);
    propertyMarkerRef.current = new google.maps.Marker({
      position: center,
      map: mapRef.current,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: "#f97316",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });
  }, [mapsReady, location]);

  // ---------------------------------------------------------------------------
  // Apply Solar API result (or kick into manual mode if not found)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!location || !roofAreaQuery.data || !mapRef.current) return;
    const data = roofAreaQuery.data;
    if (data.found && data.roofAreaSqft) {
      setSqft(Math.round(data.roofAreaSqft));
      setSqftSource("solar");
      setManualMode(false);
      clearBuildingPolygons();
      // Draw the real per-segment roof bounding boxes returned by the Solar
      // API — never a fabricated square. If the API didn't return any
      // segment geometry, we leave the satellite view un-outlined and the
      // visitor can still confirm or refine with manual outline mode.
      const segments = data.roofSegments ?? [];
      for (const seg of segments) {
        const poly = new google.maps.Polygon({
          paths: [
            { lat: seg.swLat, lng: seg.swLng },
            { lat: seg.neLat, lng: seg.swLng },
            { lat: seg.neLat, lng: seg.neLng },
            { lat: seg.swLat, lng: seg.neLng },
          ],
          strokeColor: "#f97316",
          strokeOpacity: 0.95,
          strokeWeight: 3,
          fillColor: "#f97316",
          fillOpacity: 0.18,
          map: mapRef.current,
          clickable: false,
        });
        buildingPolygonsRef.current.push(poly);
      }
    } else {
      setSqft(null);
      setSqftSource(null);
      enterManualMode();
    }
  }, [roofAreaQuery.data, location]);

  // ---------------------------------------------------------------------------
  // Manual outline mode
  // ---------------------------------------------------------------------------
  const enterManualMode = useCallback(() => {
    setManualMode(true);
    setManualPoints([]);
    clearManualPolygon();
    if (!mapRef.current) return;
    mapClickListenerRef.current?.remove();
    mapClickListenerRef.current = mapRef.current.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const pt = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setManualPoints((prev) => [...prev, pt]);
    });
  }, []);

  useEffect(() => {
    if (!manualMode || !mapRef.current) return;
    // Render manual polygon + vertex markers
    manualPolygonRef.current?.setMap(null);
    manualMarkersRef.current.forEach((m) => m.setMap(null));
    manualMarkersRef.current = [];

    manualMarkersRef.current = manualPoints.map(
      (p) =>
        new google.maps.Marker({
          position: p,
          map: mapRef.current!,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#ffffff",
            fillOpacity: 1,
            strokeColor: "#f97316",
            strokeWeight: 3,
          },
        }),
    );

    if (manualPoints.length >= 2) {
      manualPolygonRef.current = new google.maps.Polygon({
        paths: manualPoints,
        strokeColor: "#f97316",
        strokeOpacity: 0.95,
        strokeWeight: 3,
        fillColor: "#f97316",
        fillOpacity: 0.2,
        map: mapRef.current,
        clickable: false,
      });
    }

    if (manualPoints.length >= 3) {
      const areaM2 = google.maps.geometry.spherical.computeArea(
        manualPoints.map((p) => new google.maps.LatLng(p.lat, p.lng)),
      );
      const computedSqft = Math.round(areaM2 * SQM_TO_SQFT);
      setSqft(computedSqft);
      setSqftSource("manual");
    } else {
      setSqft(null);
      setSqftSource(null);
    }
  }, [manualPoints, manualMode]);

  const handleRedoManual = () => {
    setManualPoints([]);
    setSqft(null);
    setSqftSource(null);
  };

  const handleUseManualInsteadOfSolar = () => {
    clearBuildingPolygons();
    setSqft(null);
    setSqftSource(null);
    enterManualMode();
  };

  // ---------------------------------------------------------------------------
  // Cleanup helpers
  // ---------------------------------------------------------------------------
  function clearBuildingPolygons() {
    buildingPolygonsRef.current.forEach((p) => p.setMap(null));
    buildingPolygonsRef.current = [];
  }
  function clearManualPolygon() {
    manualPolygonRef.current?.setMap(null);
    manualPolygonRef.current = null;
    manualMarkersRef.current.forEach((m) => m.setMap(null));
    manualMarkersRef.current = [];
  }
  function resetMeasurement() {
    clearBuildingPolygons();
    clearManualPolygon();
    setManualPoints([]);
    setManualMode(false);
    setSqft(null);
    setSqftSource(null);
    mapClickListenerRef.current?.remove();
    mapClickListenerRef.current = null;
  }

  useEffect(() => {
    return () => {
      mapClickListenerRef.current?.remove();
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Pricing + form
  // ---------------------------------------------------------------------------
  const selectedService = getEstimatorServiceById(serviceId) ?? ESTIMATOR_SERVICES[0];
  const estimatedCost =
    sqft != null ? computeEstimateUsd(sqft, selectedService.pricePerSqft) : null;

  const form = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", message: "" },
  });

  const canSubmit =
    !!location && sqft != null && sqft > 0 && estimatedCost != null && !!sqftSource;

  function onSubmit(values: LeadValues) {
    if (!canSubmit || !location || sqft == null || estimatedCost == null || !sqftSource) {
      toast({
        variant: "destructive",
        title: "Missing details",
        description: "Please complete the address and roof outline first.",
      });
      return;
    }
    submitMutation.mutate(
      {
        data: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company || null,
          message: values.message || null,
          address: location.address,
          latitude: location.lat,
          longitude: location.lng,
          roofSqft: sqft,
          sqftSource,
          serviceType: selectedService.id,
        },
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast({
            title: "Request received",
            description: "We've got your information and will reach out shortly.",
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Submission failed",
            description: "Something went wrong. Please try again or call (972) 555-0100.",
          });
        },
      },
    );
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <>
      <SEO
        title="Instant Satellite Roof Estimate | Scott Commercial Roofing"
        description="Get an instant ballpark roofing estimate for your North Texas commercial property. Type your address, see your roof from satellite, and get a ballpark price in under a minute."
      />

      <section className="bg-primary text-primary-foreground pt-24 pb-12 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 mb-5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                New — Instant Satellite Estimate
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-5 text-white">
              Instant Roof Estimate
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
              Type your commercial property address, see your roof from above, and get a ballpark
              price for the system you're considering — in under a minute. Submit the form and a
              senior roofer will follow up with a real proposal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {mapsError && (
            <div className="mb-8 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>{mapsError}</div>
            </div>
          )}

          {/* Step 1: Address */}
          <Step number={1} icon={MapPin} title="Find your property">
            <label htmlFor="estimator-address" className="sr-only">
              Property address
            </label>
            <Input
              id="estimator-address"
              ref={inputRef}
              type="text"
              placeholder={
                mapsReady ? "Start typing a US commercial property address…" : "Loading map service…"
              }
              disabled={!mapsReady}
              className="h-14 text-base"
              autoComplete="off"
              data-testid="estimator-address-input"
            />
            {location && (
              <p className="mt-3 text-sm text-muted-foreground">
                <strong className="text-foreground">Selected:</strong> {location.address}
              </p>
            )}
          </Step>

          {/* Step 2: Satellite + measurement */}
          {location && (
            <Step number={2} icon={Ruler} title="Outline the roof">
              <div className="relative">
                <div
                  ref={mapContainerRef}
                  className="w-full rounded-lg overflow-hidden border border-border bg-muted"
                  style={{ height: "min(60vh, 480px)" }}
                  data-testid="estimator-map"
                />
                {roofAreaQuery.isFetching && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
                    <div className="flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2 shadow-md">
                      <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                      <span className="text-sm font-semibold">Checking satellite data…</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Status / controls */}
              <div className="mt-4">
                {sqftSource === "solar" && sqft != null && (
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-foreground">
                          ~{sqft.toLocaleString()} sq ft detected from satellite
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Sourced from Google's Solar API building data.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={handleUseManualInsteadOfSolar}
                      data-testid="estimator-manual-override"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Outline manually instead
                    </Button>
                  </div>
                )}

                {manualMode && (
                  <div className="rounded-lg border border-border bg-muted/40 p-4">
                    <p className="font-bold text-foreground mb-1">Tap to outline your roof</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {sqft == null
                        ? "Tap (or click) around the edges of your building on the satellite image. We'll close the shape and calculate the area once you have at least 3 points."
                        : `~${sqft.toLocaleString()} sq ft based on your outline. Keep tapping to refine, or redo if needed.`}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={handleRedoManual}
                        disabled={manualPoints.length === 0}
                        data-testid="estimator-manual-redo"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Start over
                      </Button>
                      <span className="text-xs text-muted-foreground self-center">
                        {manualPoints.length} {manualPoints.length === 1 ? "point" : "points"} placed
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Step>
          )}

          {/* Step 3: Service + estimate */}
          {location && sqft != null && (
            <Step number={3} icon={DollarSign} title="Pick a service & see your ballpark">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ESTIMATOR_SERVICES.map((svc) => {
                  const selected = svc.id === serviceId;
                  return (
                    <button
                      type="button"
                      key={svc.id}
                      onClick={() => setServiceId(svc.id)}
                      className={`text-left rounded-lg border p-4 transition-all ${
                        selected
                          ? "border-secondary bg-secondary/5 ring-2 ring-secondary/30"
                          : "border-border bg-card hover:border-secondary/60"
                      }`}
                      data-testid={`estimator-service-${svc.id}`}
                    >
                      <div className="font-heading font-bold uppercase tracking-tight text-sm text-foreground">
                        {svc.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{svc.blurb}</div>
                    </button>
                  );
                })}
              </div>

              {estimatedCost != null && (
                <div className="mt-6 rounded-xl border-2 border-secondary bg-secondary/5 p-6 md:p-8 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                    Estimated project cost
                  </p>
                  <p
                    className="text-4xl md:text-5xl font-heading font-black text-foreground tracking-tight"
                    data-testid="estimator-cost"
                  >
                    ~${estimatedCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
                    Based on ~{sqft.toLocaleString()} sq ft × ${selectedService.pricePerSqft.toFixed(2)}/sq ft for{" "}
                    <strong>{selectedService.label}</strong>. This is a rough ballpark from
                    industry-standard per-square-foot pricing — not a binding quote. A real proposal
                    needs an on-site inspection.
                  </p>
                </div>
              )}
            </Step>
          )}

          {/* Step 4: Lead capture */}
          {canSubmit && !submitted && (
            <Step number={4} icon={CheckCircle2} title="Request a real quote">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Corp" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(972) 555-0100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anything we should know?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Active leaks, age of current roof, ideal timing, etc."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitMutation.isPending}
                    className="w-full font-bold uppercase tracking-wide text-base"
                    data-testid="estimator-submit"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Request my real quote"
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    The ballpark figure above is an estimate, not a quote. We'll send a real proposal
                    after a free on-site inspection.
                  </p>
                </form>
              </Form>
            </Step>
          )}

          {submitted && (
            <div className="mt-12 rounded-xl border-2 border-secondary bg-secondary/5 p-8 text-center" data-testid="estimator-success">
              <CheckCircle2 className="mx-auto h-12 w-12 text-secondary mb-4" />
              <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-foreground mb-3">
                Request Received
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Thanks — we've got your information. A senior roofer will reach out shortly to
                schedule a free on-site inspection and follow up with a real proposal.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function Step({
  number,
  icon: Icon,
  title,
  children,
}: {
  number: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-heading font-black">
          {number}
        </div>
        <h2 className="text-xl md:text-2xl font-heading font-black uppercase tracking-tight text-foreground flex items-center gap-2">
          <Icon className="h-5 w-5 text-secondary" />
          {title}
        </h2>
      </div>
      <div className="pl-0 md:pl-13">{children}</div>
    </div>
  );
}

