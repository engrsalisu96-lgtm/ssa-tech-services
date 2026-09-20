import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import AboutAndWhySection from "./components/AboutAndWhySection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import SiteEditorModal, { EditPill } from "./components/SiteEditorModal";
import { SiteContentProvider } from "./context/SiteContentContext";

function App() {
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <ServicesSection />
      <AboutAndWhySection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
      <EditPill onClick={() => setEditorOpen(true)} />
      <SiteEditorModal open={editorOpen} onClose={() => setEditorOpen(false)} />
    </div>
  );
}

export default function Root() {
  return (
    <SiteContentProvider>
      <App />
    </SiteContentProvider>
  );
}