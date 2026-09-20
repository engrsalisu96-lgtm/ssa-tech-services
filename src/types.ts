export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  turnaroundTime: string;
  iconName: string;
  image: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  clientType: string;
  description: string;
  outcome: string;
  specs: string[];
  image: string;
  metrics: { label: string; value: string }[];
}

export interface WhyChooseUsPillar {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface InquiryFormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  urgency: "Normal" | "Urgent" | "Emergency";
}

export interface TrustMetric {
  value: string;
  label: string;
}

export interface SiteBranding {
  businessName: string;
  tagline: string;
  heroHeading: string;
  heroHeadingAccent: string;
  heroSubheading: string;
  ctaPrimary: string;
  ctaSecondary: string;
  statusBadge: string;
  badgeLabel: string;
}

export interface EditorContactInfo {
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
}

export interface EditorAbout {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  paragraphs: string[];
  highlights: { title: string; desc: string }[];
}

export interface SiteContent {
  branding: SiteBranding;
  contact: EditorContactInfo;
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  pillars: WhyChooseUsPillar[];
  trustMetrics: TrustMetric[];
  about: EditorAbout;
  servicesHeading: string;
  servicesSubheading: string;
  portfolioHeading: string;
  portfolioSubheading: string;
  whyHeading: string;
  whySubheading: string;
  contactHeading: string;
  contactSubheading: string;
}