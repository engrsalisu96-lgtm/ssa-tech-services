import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { useSiteContent } from "../context/SiteContentContext";

export default function PortfolioSection() {
  const { content } = useSiteContent();
  const { portfolio, portfolioHeading, portfolioSubheading } = content;
  const portfolioProjects = portfolio;

  const portfolioCategories = ["All", ...Array.from(new Set(portfolioProjects.map((p) => p.category)))];
  const [activeFilter, setActiveFilter] = useState<string>(() =>
    portfolioCategories.length > 1 ? portfolioCategories[0] : "All"
  );
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filtered = activeFilter === "All"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 bg-[#080e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {portfolioHeading}{" "}<span className="text-cyan-400">Portfolio</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            {portfolioSubheading}
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.97] ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-[#111c30] text-slate-400 border border-slate-700/50 hover:border-cyan-500/30 hover:text-cyan-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-[#111c30] border border-slate-700/40 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111c30] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="px-2 py-0.5 bg-[#080e1a]/80 backdrop-blur-sm rounded text-xs text-cyan-400 font-medium border border-cyan-500/20">
                      {project.category}
                    </span>
                    <span className="px-2 py-0.5 bg-[#080e1a]/80 backdrop-blur-sm rounded text-xs text-slate-400 font-medium">
                      {project.clientType}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
                  {/* Metrics */}
                  <div className="flex gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="flex-1 p-2 bg-[#0a1220] rounded-lg border border-slate-700/30 text-center">
                        <div className="text-sm font-bold text-cyan-400">{m.value}</div>
                        <div className="text-[10px] text-slate-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  {/* Expand */}
                  <button
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                    className="flex items-center gap-1 text-xs text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                  >
                    {expandedProject === project.id ? "Show Less" : "View Details"}
                    <CaretDown size={14} className={`transition-transform ${expandedProject === project.id ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 space-y-2 border-t border-slate-700/30">
                          <p className="text-xs text-green-400 font-medium">Outcome: {project.outcome}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.specs.map((s) => (
                              <span key={s} className="px-2 py-0.5 bg-[#0a1220] rounded text-[10px] text-slate-400 border border-slate-700/40">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}