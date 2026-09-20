import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { SiteContent } from "../types";
import {
  services,
  portfolioProjects,
  whyChooseUsPillars,
  trustMetrics,
  contactInfo,
} from "../data/contentData";

const STORAGE_KEY = "ssa-site-content-v1";

export const defaultContent: SiteContent = {
  branding: {
    businessName: "S. S. A TECH",
    tagline: "Computer Engineering & Technical Solutions",
    heroHeading: "Reliable Computer",
    heroHeadingAccent: "Engineering",
    heroSubheading:
      "Rapid hardware troubleshooting, OS deployment, network setup, and tailored maintenance for businesses and power users. Precision engineering, transparent pricing.",
    ctaPrimary: "Explore Services",
    ctaSecondary: "Get Immediate Quote",
    statusBadge: "Available for On-Site & Remote Diagnostics",
    badgeLabel: "Same-Day Diagnostics",
  },
  contact: { ...contactInfo },
  services,
  portfolio: portfolioProjects,
  pillars: whyChooseUsPillars,
  trustMetrics,
  about: {
    eyebrow: "About Us",
    heading: "Engineering-First",
    headingAccent: "Repair Facility",
    paragraphs: [
      "S. S. A TECH is a professional computer engineering and technical solutions provider equipped with thermal imaging, component-level testing rigs, ESD-safe workstations, and a genuine OEM parts supply chain.",
      "Our diagnostic protocol follows a structured 7-step process: visual inspection, thermal analysis, POST diagnostics, component isolation, stress validation, repair execution, and final QA certification. Every repair is documented with photo logs.",
    ],
    highlights: [
      { title: "Micro-Level Diagnosis", desc: "Component-level fault isolation" },
      { title: "Zero Data Loss", desc: "Recovery-first repair policy" },
      { title: "Transparent Estimates", desc: "No hidden fees, ever" },
    ],
  },
  servicesHeading: "Our",
  servicesSubheading:
    "Eight core service lines covering the full lifecycle of your computing infrastructure.",
  portfolioHeading: "Our",
  portfolioSubheading:
    "Real projects, measurable outcomes. Explore recent engineering work across hardware, software, and networking.",
  whyHeading: "Why",
  whySubheading: "Five operational pillars that set S. S. A TECH apart from generic repair shops.",
  contactHeading: "Contact",
  contactSubheading:
    "Request a quote, book a service, or reach out for immediate technical support.",
};

interface SiteContentContextValue {
  content: SiteContent;
  updateContent: (next: SiteContent) => void;
  resetContent: () => void;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...defaultContent, ...JSON.parse(stored) };
    } catch {
      /* ignore corrupted storage */
    }
    return defaultContent;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      /* storage full or unavailable */
    }
  }, [content]);

  const updateContent = useCallback((next: SiteContent) => setContent(next), []);
  const resetContent = useCallback(() => setContent(defaultContent), []);

  return (
    <SiteContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
}