import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Clock } from "@phosphor-icons/react";
import { useSiteContent } from "../context/SiteContentContext";

const iconMap: Record<string, React.ReactNode> = {
  Wrench: <span className="text-2xl">🔧</span>,
  Monitor: <span className="text-2xl">🖥️</span>,
  Code: <span className="text-2xl">💻</span>,
  Terminal: <span className="text-2xl">⌨️</span>,
  HardDrive: <span className="text-2xl">💾</span>,
  Cpu: <span className="text-2xl">⚙️</span>,
  WifiHigh: <span className="text-2xl">📡</span>,
  Plugs: <span className="text-2xl">🔌</span>,
};

export default function ServicesSection() {
  const { content } = useSiteContent();
  const { services, servicesHeading, servicesSubheading } = content;
  const [activeCategory, setActiveCategory] = useState<string>(() =>
    services.length > 0 ? services[0].category : "All"
  );

  const serviceCategories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

  const filtered = activeCategory === "All"
    ? services
    : services.filter((s) => s.category === activeCategory);

  const handleRequestService = (serviceTitle: string) => {
    window.dispatchEvent(new CustomEvent("select-service", { detail: serviceTitle }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-[#0a1220]">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(56,189,248,0.4) 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {servicesHeading}{" "}<span className="text-cyan-400">Services</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            {servicesSubheading}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.97] ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-[#111c30] text-slate-400 border border-slate-700/50 hover:border-cyan-500/30 hover:text-cyan-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative bg-[#111c30] border border-slate-700/40 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111c30] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#080e1a]/80 backdrop-blur-sm rounded-md border border-cyan-500/20">
                    <span className="text-xs font-medium text-cyan-400">{service.category}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-[#080e1a]/80 backdrop-blur-sm rounded-md">
                    <Clock size={12} className="text-slate-400" />
                    <span className="text-xs text-slate-400">{service.turnaroundTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 pt-1">
                    {service.features.slice(0, 3).map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-slate-400">
                        <Check size={14} weight="bold" className="text-cyan-500 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => handleRequestService(service.title)}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold rounded-lg hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all active:scale-[0.98]"
                  >
                    Request This Service
                    <ArrowRight size={16} weight="bold" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}