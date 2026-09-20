import { ServiceItem, PortfolioProject, WhyChooseUsPillar, TrustMetric } from "../types";

const IMG = {
  hero: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ce8c9e50-f2dd-49d0-be0f-4c05fcfb933d/hero-tech-workstation-4989e633-1789893446459.webp",
  hardware: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ce8c9e50-f2dd-49d0-be0f-4c05fcfb933d/service-hardware-repair-a4ce0bd5-1789893447936.webp",
  networking: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ce8c9e50-f2dd-49d0-be0f-4c05fcfb933d/service-networking-1cb6e939-1789893447842.webp",
  workstation: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ce8c9e50-f2dd-49d0-be0f-4c05fcfb933d/portfolio-workstation-build-851dd7c3-1789893447760.webp",
  office: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ce8c9e50-f2dd-49d0-be0f-4c05fcfb933d/portfolio-office-network-c3f8f6ea-1789893448008.webp",
  workbench: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ce8c9e50-f2dd-49d0-be0f-4c05fcfb933d/about-workbench-bc23342f-1789893450311.webp",
};

export const HERO_IMAGE = IMG.hero;
export const ABOUT_IMAGE = IMG.workbench;

export const trustMetrics: TrustMetric[] = [
  { value: "2,500+", label: "Repairs Completed" },
  { value: "99.4%", label: "First-Time Fix Rate" },
  { value: "<2hr", label: "Diagnostic SLA" },
  { value: "15+", label: "Certified Engineers" },
];

export const services: ServiceItem[] = [
  {
    id: "repairs",
    title: "Computer Repairs & Maintenance",
    category: "Hardware",
    description: "Full-spectrum hardware diagnostics, component-level repair, and scheduled preventive maintenance for desktops and laptops of all brands.",
    features: ["Motherboard micro-soldering", "Power supply replacement", "Fan & thermal paste service", "BIOS/UEFI recovery", "Preventive maintenance plans"],
    turnaroundTime: "Same day - 48hrs",
    iconName: "Wrench",
    image: IMG.hardware,
  },
  {
    id: "troubleshooting",
    title: "Laptop & Desktop Troubleshooting",
    category: "Hardware",
    description: "Systematic fault isolation using thermal imaging, multimeter testing, and POST diagnostics to pinpoint intermittent hardware failures.",
    features: ["Thermal imaging analysis", "RAM & storage stress testing", "POST code interpretation", "Intermittent fault capture", "Component swap validation"],
    turnaroundTime: "2-6 hours",
    iconName: "Monitor",
    image: IMG.hardware,
  },
  {
    id: "os-install",
    title: "Operating System Installation",
    category: "Software",
    description: "Clean OS deployments including Windows 11, Ubuntu, Fedora, and dual-boot configurations with full driver validation and security hardening.",
    features: ["Windows 10/11 Pro", "Ubuntu / Fedora Linux", "Dual-boot configuration", "Driver pack installation", "Security baseline hardening"],
    turnaroundTime: "2-4 hours",
    iconName: "Code",
    image: IMG.workstation,
  },
  {
    id: "software-config",
    title: "Software Installation & Configuration",
    category: "Software",
    description: "Enterprise application deployment, license management, development environment setup, and productivity suite configuration.",
    features: ["MS Office / 365 setup", "Adobe Creative Suite", "Dev environment (Docker, IDEs)", "License activation & management", "Custom software deployment"],
    turnaroundTime: "1-3 hours",
    iconName: "Terminal",
    image: IMG.workstation,
  },
  {
    id: "formatting",
    title: "Computer Formatting & System Setup",
    category: "Software",
    description: "Complete data-wipe, partition restructuring, fresh OS install, and post-format optimization for peak performance out of the box.",
    features: ["Secure data erasure (DoD 5220.22-M)", "Partition & filesystem setup", "Factory-reset alternative", "Post-install optimization", "Backup & restore service"],
    turnaroundTime: "3-6 hours",
    iconName: "HardDrive",
    image: IMG.hardware,
  },
  {
    id: "upgrades",
    title: "Hardware Upgrades & Replacement",
    category: "Hardware",
    description: "Performance-boosting component upgrades: NVMe SSD swaps, GPU installations, RAM expansion, and CPU thermal solutions.",
    features: ["NVMe / SATA SSD upgrade", "GPU installation & driver setup", "RAM capacity expansion", "Aftermarket cooling", "PSU wattage upgrade"],
    turnaroundTime: "1-4 hours",
    iconName: "Cpu",
    image: IMG.workstation,
  },
  {
    id: "networking",
    title: "Networking & Internet Setup",
    category: "Networking",
    description: "Structured cabling, router/switch configuration, Wi-Fi mesh deployment, VLAN segmentation, and network security setup for homes and offices.",
    features: ["Cat6/Cat6a structured cabling", "Mesh Wi-Fi deployment", "Router & switch config", "VLAN & firewall setup", "Signal strength optimization"],
    turnaroundTime: "4-24 hours",
    iconName: "WifiHigh",
    image: IMG.networking,
  },
  {
    id: "accessories",
    title: "Computer Accessories & Tech Support",
    category: "Networking",
    description: "Peripheral supply, docking stations, UPS installation, ongoing remote support contracts, and helpdesk services for businesses.",
    features: ["Monitor & peripheral supply", "Docking station setup", "UPS / power protection", "Remote support contracts", "Priority helpdesk SLA"],
    turnaroundTime: "Same day",
    iconName: "Plugs",
    image: IMG.networking,
  },
];

export const serviceCategories = ["All", "Hardware", "Software", "Networking"];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "cad-workstation",
    title: "High-Performance CAD Workstation Build",
    category: "Hardware",
    clientType: "Engineering Firm",
    description: "Custom dual-Xeon workstation build for SolidWorks and AutoCAD with 128GB ECC RAM, RTX 4090 GPU, and NVMe RAID-0 storage array.",
    outcome: "Render times reduced by 74%, zero thermal throttling under sustained 8-hour CAD sessions.",
    specs: ["Dual Intel Xeon W7-2495X", "128GB DDR5 ECC", "RTX 4090 24GB", "4x NVMe RAID-0", "Custom water loop"],
    image: IMG.workstation,
    metrics: [
      { label: "Render Speed", value: "+74%" },
      { label: "Thermal Delta", value: "-38C" },
    ],
  },
  {
    id: "data-recovery",
    title: "Multi-Drive Data Recovery & OS Deployment",
    category: "Software",
    clientType: "Law Firm",
    description: "Recovered 4.2TB of critical case files from a failed 4-disk NAS RAID-5 array, then deployed clean Windows Server with full ACL restoration.",
    outcome: "100% data recovery achieved with zero file corruption. Client returned to full operations within 36 hours.",
    specs: ["RAID-5 reconstruction", "4.2TB recovered", "Windows Server 2022", "NTFS ACL restore", "Backup strategy design"],
    image: IMG.hardware,
    metrics: [
      { label: "Data Recovered", value: "4.2TB" },
      { label: "Downtime", value: "<36hr" },
    ],
  },
  {
    id: "office-network",
    title: "Corporate Cat6 Cabling & Mesh Wi-Fi",
    category: "Networking",
    clientType: "Co-working Space",
    description: "Structured cabling for 3 floors (48 drops), Ubiquiti UniFi mesh deployment with 12 access points, VLAN segmentation for tenants.",
    outcome: "Full coverage with <1ms latency on wired, -45dBm minimum signal on Wi-Fi. Zero tenant complaints in 6 months.",
    specs: ["48x Cat6 drops", "12x UniFi APs", "VLAN segmentation", "PoE+ switching", "Cable certification"],
    image: IMG.office,
    metrics: [
      { label: "Network Drops", value: "48" },
      { label: "Coverage", value: "100%" },
    ],
  },
  {
    id: "thermal-repair",
    title: "Thermal Throttling & Micro-Soldering Repair",
    category: "Hardware",
    clientType: "Game Studio",
    description: "Diagnosed and repaired VRM failure on 6 gaming laptops causing thermal shutdown. Component-level micro-soldering replaced failed MOSFETs.",
    outcome: "All 6 units returned to full 240W sustained performance. Zero failures in 12-month follow-up period.",
    specs: ["VRM MOSFET replacement", "Thermal paste re-application", "BIOS power limit reset", "Stress validation 24hr", "ESD-safe rework station"],
    image: IMG.hardware,
    metrics: [
      { label: "Units Repaired", value: "6/6" },
      { label: "Performance", value: "240W" },
    ],
  },
  {
    id: "dual-boot",
    title: "Dual-Boot Linux/Windows Enterprise Config",
    category: "Software",
    clientType: "Research Lab",
    description: "Configured 15 workstations with secure dual-boot Ubuntu 22.04 / Windows 11 environments, full disk encryption, and centralized management.",
    outcome: "Researchers switch OS in <10s. IT manages all machines via Ansible playbooks with zero manual intervention.",
    specs: ["LUKS full disk encryption", "BitLocker + TPM 2.0", "Ansible fleet management", "Secure Boot chain", "GRUB customization"],
    image: IMG.workstation,
    metrics: [
      { label: "Machines", value: "15" },
      { label: "Switch Time", value: "<10s" },
    ],
  },
  {
    id: "pos-fleet",
    title: "Retail POS Terminal Fleet Overhaul",
    category: "Networking",
    clientType: "Retail Chain",
    description: "Full refresh of 22 POS terminals: SSD upgrades, Windows 11 migration, receipt printer calibration, and network hardening across 3 store locations.",
    outcome: "Boot times reduced from 90s to 12s. Transaction processing errors eliminated. 6-month preventive plan in place.",
    specs: ["22x SSD upgrades", "Windows 11 migration", "Printer recalibration", "Network isolation", "Preventive schedule"],
    image: IMG.office,
    metrics: [
      { label: "Terminals", value: "22" },
      { label: "Boot Time", value: "12s" },
    ],
  },
];

export const whyChooseUsPillars: WhyChooseUsPillar[] = [
  {
    id: "reliable",
    title: "Reliable Technical Support",
    description: "24/7 emergency dispatch, <2hr diagnostic SLA, and proactive follow-up on every ticket until full resolution is confirmed.",
    badge: "<2hr SLA",
    iconName: "Headset",
  },
  {
    id: "quality",
    title: "Quality Workmanship",
    description: "Master-certified technicians using precision ESD tooling, genuine OEM components, and documented repair protocols.",
    badge: "OEM Parts",
    iconName: "SealCheck",
  },
  {
    id: "satisfaction",
    title: "Customer Satisfaction",
    description: "100% service guarantee with transparent diagnostic reports including photo logs of every finding and recommendation.",
    badge: "100% Guarantee",
    iconName: "Star",
  },
  {
    id: "affordable",
    title: "Affordable Service Options",
    description: "Upfront flat-rate pricing with no hidden fees. Free preliminary evaluation for all hardware diagnostics.",
    badge: "Free Eval",
    iconName: "Lightning",
  },
  {
    id: "professional",
    title: "Professional Approach",
    description: "Secure customer data handling with NDA options, clean documentation, corporate invoicing, and audit-ready service logs.",
    badge: "NDA Available",
    iconName: "ShieldCheck",
  },
];

export const contactInfo = {
  phone: "+1 (555) 389-8324",
  phoneRaw: "+15553898324",
  whatsapp: "15553898324",
  email: "support@ssatech-solutions.com",
  address: "Suite 402, Silicon Heights Tech Park",
  hours: "Mon - Sat: 8:00 AM - 7:00 PM",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];
