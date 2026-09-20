import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Check, WhatsappLogo, Phone, Envelope, MapPin,
  Clock, Copy, CheckCircle, X, CaretDown, GithubLogo,
  LinkedinLogo, TwitterLogo, FacebookLogo, Globe,
} from "@phosphor-icons/react";
import { portfolioProjects, services, contactInfo } from "../data/contentData";
import { InquiryFormState } from "../types";

const portfolioCategories = ["All", ...Array.from(new Set(portfolioProjects.map((p) => p.category)))];

function WhatsAppIcon() { return <WhatsappLogo size={20} weight="fill" />; }

export default function PortfolioAndContactSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [form, setForm] = useState<InquiryFormState>({
    name: "", phone: "", email: "", service: "", message: "", urgency: "Normal",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      setForm((prev) => ({ ...prev, service: detail }));
    };
    window.addEventListener("select-service", handler);
    return () => window.removeEventListener("select-service", handler);
  }, []);

  const filtered = activeFilter === "All"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeFilter);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.service) e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    try {
      const stored = JSON.parse(localStorage.getItem("ssa_inquiries") || "[]");
      stored.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem("ssa_inquiries", JSON.stringify(stored));
    } catch { /* silent */ }
  };

  const buildWhatsAppUrl = (): string => {
    const text = encodeURIComponent(
      `New Service Request

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Service: ${form.service}
Urgency: ${form.urgency}

Details: ${form.message}`
    );
    return `https://wa.me/${contactInfo.whatsapp}?text=${text}`;
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const resetForm = () => {
    setForm({ name: "", phone: "", email: "", service: "", message: "", urgency: "Normal" });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <>
      {/* PORTFOLIO SECTION */}
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
              Our <span className="text-cyan-400">Portfolio</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Real projects, measurable outcomes. Explore recent engineering work across hardware, software, and networking.
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

      {/* CONTACT SECTION */}
      <section id="contact" className="relative py-24 lg:py-32 bg-[#0a1220]">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(56,189,248,0.4) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Contact <span className="text-cyan-400">Us</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Request a quote, book a service, or reach out for immediate technical support.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#111c30] border border-green-500/20 rounded-2xl p-8 text-center space-y-4"
                  >
                    <CheckCircle size={48} weight="fill" className="text-green-400 mx-auto" />
                    <h3 className="text-xl font-bold text-white">Request Submitted!</h3>
                    <p className="text-slate-400 text-sm">We'll get back to you within 2 hours. For urgent matters, use WhatsApp below.</p>
                    <div className="flex flex-wrap gap-3 justify-center pt-2">
                      <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors">
                        <WhatsAppIcon /> Send via WhatsApp
                      </a>
                      <button onClick={resetForm}
                        className="px-5 py-2.5 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
                        New Request
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="bg-[#111c30] border border-slate-700/40 rounded-2xl p-6 sm:p-8 space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name *</label>
                        <input type="text" value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={`w-full px-4 py-2.5 bg-[#0a1220] border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${errors.name ? "border-red-500/50" : "border-slate-700/50"}`}
                          placeholder="John Smith" />
                        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone *</label>
                        <input type="tel" value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={`w-full px-4 py-2.5 bg-[#0a1220] border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${errors.phone ? "border-red-500/50" : "border-slate-700/50"}`}
                          placeholder="+1 (555) 000-0000" />
                        {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email *</label>
                        <input type="email" value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={`w-full px-4 py-2.5 bg-[#0a1220] border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${errors.email ? "border-red-500/50" : "border-slate-700/50"}`}
                          placeholder="john@company.com" />
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                      </div>
                      {/* Service */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Service *</label>
                        <div className="relative">
                          <select value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                            className={`w-full px-4 py-2.5 bg-[#0a1220] border rounded-lg text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${errors.service ? "border-red-500/50" : "border-slate-700/50"} ${!form.service ? "text-slate-500" : ""}`}>
                            <option value="">Select a service...</option>
                            {services.map((s) => (
                              <option key={s.id} value={s.title}>{s.title}</option>
                            ))}
                            <option value="General Technical Inquiry">General Technical Inquiry</option>
                          </select>
                          <CaretDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                        {errors.service && <p className="text-xs text-red-400 mt-1">{errors.service}</p>}
                      </div>
                    </div>

                    {/* Urgency */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Urgency Level</label>
                      <div className="flex gap-2">
                        {(["Normal", "Urgent", "Emergency"] as const).map((u) => (
                          <button key={u} type="button" onClick={() => setForm({ ...form, urgency: u })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.97] ${
                              form.urgency === u
                                ? u === "Emergency" ? "bg-red-500/20 border border-red-500/40 text-red-400"
                                : u === "Urgent" ? "bg-amber-500/20 border border-amber-500/40 text-amber-400"
                                : "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400"
                                : "bg-[#0a1220] border border-slate-700/50 text-slate-400 hover:border-slate-600"
                            }`}>
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Message *</label>
                      <textarea value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className={`w-full px-4 py-3 bg-[#0a1220] border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none ${errors.message ? "border-red-500/50" : "border-slate-700/50"}`}
                        placeholder="Describe your issue or request..." />
                      {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button type="submit"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.98]">
                        Submit Request <ArrowRight size={18} weight="bold" />
                      </button>
                      <button type="button" onClick={() => window.open(buildWhatsAppUrl(), "_blank")}
                        className="flex items-center gap-2 px-5 py-3 bg-green-600/20 border border-green-500/30 text-green-400 font-semibold rounded-xl hover:bg-green-600/30 transition-colors active:scale-[0.98]">
                        <WhatsAppIcon /> Send via WhatsApp
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* WhatsApp Card */}
              <div className="p-6 bg-[#111c30] border border-green-500/20 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/15 flex items-center justify-center">
                    <WhatsappLogo size={22} weight="fill" className="text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">WhatsApp Direct</div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
                      Online - Avg reply 5 mins
                    </div>
                  </div>
                </div>
                <a href={`https://wa.me/${contactInfo.whatsapp}?text=Hi%20S.%20S.%20A%20TECH`} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-500 transition-colors active:scale-[0.98]">
                  Chat Now
                </a>
              </div>

              {/* Contact Info */}
              <div className="p-6 bg-[#111c30] border border-slate-700/40 rounded-2xl space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact Details</h3>
                <a href={`tel:${contactInfo.phoneRaw}`} className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Phone size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Phone</div>
                    <div className="text-sm">{contactInfo.phone}</div>
                  </div>
                </a>
                <button onClick={copyEmail} className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors w-full text-left group">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Envelope size={16} className="text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500">Email</div>
                    <div className="text-sm truncate">{contactInfo.email}</div>
                  </div>
                  {copiedEmail ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-slate-500" />}
                </button>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <MapPin size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Address</div>
                    <div className="text-sm">{contactInfo.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Clock size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Hours</div>
                    <div className="text-sm">{contactInfo.hours}</div>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-6 bg-[#111c30] border border-slate-700/40 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={20} className="text-cyan-400" />
                  <h3 className="text-sm font-semibold text-white">Our Location</h3>
                </div>
                <div className="h-36 bg-[#0a1220] rounded-lg border border-slate-700/30 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={24} className="text-cyan-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060b14] border-t border-slate-800/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Globe size={16} weight="bold" className="text-white" />
                </div>
                <span className="text-lg font-bold text-white">S. S. A <span className="text-cyan-400">TECH</span></span>
              </div>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                Professional computer engineering and technical solutions. Reliable repairs, network deployments, and IT support for businesses and individuals.
              </p>
              <div className="flex gap-3 pt-2">
                {[
                  { icon: <LinkedinLogo size={18} />, label: "LinkedIn" },
                  { icon: <TwitterLogo size={18} />, label: "Twitter" },
                  { icon: <GithubLogo size={18} />, label: "GitHub" },
                  { icon: <FacebookLogo size={18} />, label: "Facebook" },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-[#111c30] border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Services</h4>
              <ul className="space-y-2">
                {services.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <a href="#services" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>{contactInfo.phone}</li>
                <li className="break-all">{contactInfo.email}</li>
                <li>{contactInfo.address}</li>
                <li>{contactInfo.hours}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} S. S. A TECH. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
