import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Gallery from "@/pages/Gallery";
import Projects from "@/pages/Projects";
import ServiceAreas from "@/pages/ServiceAreas";
import CityPage from "@/pages/CityPage";
import { cityBySlug } from "@/data/cities";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function CityRoute({ params }: { params: { slug: string } }) {
  const city = cityBySlug[params.slug];
  if (!city) return <NotFound />;
  return <CityPage city={city} />;
}

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/projects" component={Projects} />
        <Route path="/case-studies" component={Projects} />
        <Route path="/service-areas" component={ServiceAreas} />
        <Route path="/service-areas/:slug" component={CityRoute} />
        <Route path="/contact" component={Contact} />
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
