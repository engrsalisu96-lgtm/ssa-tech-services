import { motion } from "framer-motion";
import { SealCheck, Headset, Star, Lightning, ShieldCheck } from "@phosphor-icons/react";
import { ABOUT_IMAGE } from "../data/contentData";
import { useSiteContent } from "../context/SiteContentContext";

const pillarIcons: Record<string, React.ReactNode> = {
  Headset: <Headset size={28} weight="duotone" className="text-cyan-400" />,
  SealCheck: <SealCheck size={28} weight="duotone" className="text-cyan-400" />,
  Star: <Star size={28} weight="duotone" className="text-cyan-400" />,
  Lightning: <Lightning size={28} weight="duotone" className="text-cyan-400" />,
  ShieldCheck: <ShieldCheck size={28} weight="duotone" className="text-cyan-400" />,
};

export default function AboutAndWhySection() {
  const { content } = useSiteContent();
  const { about, pillars, whyHeading, whySubheading } = content;
  return (
    <>
      {/* About Section */}
      <section id="about" className="relative py-24 lg:py-32 bg-[#080e1a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-cyan-500/15 glow-cyan">
                <img
                  src={ABOUT_IMAGE}
                  alt="S. S. A TECH Engineering Workbench"
                  className="w-full h-[360px] lg:h-[440px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 px-5 py-3 bg-[#111c30] border border-cyan-500/20 rounded-xl shadow-xl">
                <div className="text-sm font-semibold text-white">ESD-Safe Certified</div>
                <div className="text-xs text-slate-400">Workstations</div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                {about.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {about.heading}{" "}
                <span className="text-cyan-400">{about.headingAccent}</span>
              </h2>
              {about.paragraphs.map((para) => (
                <p key={para.slice(0, 24)} className="text-slate-400 leading-relaxed">
                  {para}
                </p>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {about.highlights.map((item) => (
                  <div key={item.title} className="p-4 bg-[#111c30]/50 border border-slate-700/30 rounded-xl">
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="relative py-24 lg:py-32 bg-[#0a1220]">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {whyHeading}{" "}<span className="text-cyan-400">Choose Us</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
              {whySubheading}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group relative p-6 bg-[#111c30] border border-slate-700/40 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 ${
                  idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    {pillarIcons[pillar.iconName]}
                  </div>
                  <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-xs font-semibold text-cyan-400">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}