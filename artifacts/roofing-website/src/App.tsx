import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import { serviceBySlug } from "@/data/services";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import ServiceAreas from "@/pages/ServiceAreas";
import CityPage from "@/pages/CityPage";
import { cityBySlug } from "@/data/cities";
import ServiceCityPage from "@/pages/ServiceCityPage";
import { getServiceCityEntry, SERVICE_CITY_SLUGS } from "@/data/serviceCityData";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import BuiltBy from "@/pages/BuiltBy";
import NotFound from "@/pages/not-found";

// Lazy-loaded so the Google Maps loader (`@googlemaps/js-api-loader`) and the
// estimator's map code only ship when a visitor actually opens /estimate —
// keeping every other page's first load lighter.
const Estimate = lazy(() => import("@/pages/Estimate"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));

function CityRoute({ params }: { params: { slug: string } }) {
  const city = cityBySlug[params.slug];
  if (!city) return <NotFound />;
  return <CityPage city={city} />;
}

function ServiceRoute({ params }: { params: { slug: string } }) {
  const service = serviceBySlug[params.slug];
  if (!service) return <NotFound />;
  return <ServiceDetail service={service} />;
}

function ServiceCityRoute({
  params,
}: {
  params: { citySlug: string; serviceSlug: string };
}) {
  const city = cityBySlug[params.citySlug];
  const service = serviceBySlug[params.serviceSlug];
  if (
    !city ||
    !service ||
    !SERVICE_CITY_SLUGS.includes(params.serviceSlug as (typeof SERVICE_CITY_SLUGS)[number])
  )
    return <NotFound />;
  const entry = getServiceCityEntry(params.citySlug, params.serviceSlug);
  if (!entry) return <NotFound />;
  return <ServiceCityPage city={city} service={service} entry={entry} />;
}

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/admin">
        <Suspense fallback={null}>
          <AdminDashboard />
        </Suspense>
      </Route>
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/services/:slug" component={ServiceRoute} />
            <Route path="/projects" component={Projects} />
            <Route path="/projects/:slug" component={ProjectDetail} />
            <Route path="/case-studies" component={Projects} />
            <Route path="/case-studies/:slug" component={ProjectDetail} />
            <Route path="/service-areas" component={ServiceAreas} />
            <Route path="/service-areas/:slug" component={CityRoute} />
            <Route path="/service-areas/:citySlug/:serviceSlug" component={ServiceCityRoute} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/estimate">
              <Suspense fallback={null}>
                <Estimate />
              </Suspense>
            </Route>
            <Route path="/faq" component={FAQ} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms" component={Terms} />
            <Route path="/built-by" component={BuiltBy} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
