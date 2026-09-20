import { Globe, LinkedinLogo, TwitterLogo, GithubLogo, FacebookLogo } from "@phosphor-icons/react";
import { useSiteContent } from "../context/SiteContentContext";

export default function Footer() {
  const { content } = useSiteContent();
  const { services, contact, branding } = content;
  return (
    <footer className="bg-[#060b14] border-t border-slate-800/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Globe size={16} weight="bold" className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">{branding.businessName}</span>
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
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>{contact.phone}</li>
              <li className="break-all">{contact.email}</li>
              <li>{contact.address}</li>
              <li>{contact.hours}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {branding.businessName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}