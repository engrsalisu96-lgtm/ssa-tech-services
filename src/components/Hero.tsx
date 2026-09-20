import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { HERO_IMAGE } from "../data/contentData";
import { useSiteContent } from "../context/SiteContentContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
  const { content } = useSiteContent();
  const { branding, trustMetrics } = content;

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080e1a] via-[#0b192c] to-[#0f172a]" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:space-y-8"
          >
            {/* Status pill */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
                {branding.statusBadge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight text-white"
            >
              {branding.heroHeading}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {branding.heroHeadingAccent}
              </span>{" "}
              {branding.tagline.replace("Computer Engineering & Technical Solutions", "& Technical Solutions")}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-[55ch]"
            >
              {branding.heroSubheading}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.98]"
              >
                {branding.ctaPrimary}
                <ArrowRight size={18} weight="bold" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-600/50 text-slate-200 font-semibold rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all active:scale-[0.98]"
              >
                {branding.ctaSecondary}
              </a>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
            >
              {trustMetrics.map((metric) => (
                <div key={metric.label} className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-cyan-400">{metric.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/15 glow-cyan">
              <img
                src={HERO_IMAGE}
                alt="S. S. A TECH Engineering Workstation"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080e1a]/60 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 px-4 py-3 bg-[#111c30] border border-cyan-500/20 rounded-xl shadow-xl"
            >
              <div className="flex items-center gap-2">
                <CheckCircle size={20} weight="fill" className="text-green-400" />
                <span className="text-sm font-medium text-white">{branding.badgeLabel}</span>
              </div>
            </motion.div>
            {/* Floating badge 2 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute -top-4 -right-4 px-4 py-3 bg-[#111c30] border border-cyan-500/20 rounded-xl shadow-xl"
            >
              <div className="text-sm font-medium text-cyan-400">{trustMetrics[0]?.value}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}