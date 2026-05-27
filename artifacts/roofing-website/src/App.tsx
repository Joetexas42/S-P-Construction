import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import { serviceBySlug } from "@/data/services";
import Gallery from "@/pages/Gallery";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import ServiceAreas from "@/pages/ServiceAreas";
import CityPage from "@/pages/CityPage";
import { cityBySlug } from "@/data/cities";
import ServiceCityPage from "@/pages/ServiceCityPage";
import { getServiceCityEntry, SERVICE_CITY_SLUGS } from "@/data/serviceCityData";
import Contact from "@/pages/Contact";
import Estimate from "@/pages/Estimate";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

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
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/:slug" component={ServiceRoute} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:slug" component={ProjectDetail} />
        <Route path="/case-studies" component={Projects} />
        <Route path="/case-studies/:slug" component={ProjectDetail} />
        <Route path="/service-areas" component={ServiceAreas} />
        <Route path="/service-areas/:slug" component={CityRoute} />
        <Route path="/service-areas/:citySlug/:serviceSlug" component={ServiceCityRoute} />
        <Route path="/contact" component={Contact} />
        <Route path="/estimate" component={Estimate} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
