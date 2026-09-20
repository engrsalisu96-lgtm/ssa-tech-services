import {
  X,
  Check,
  ArrowCounterClockwise,
  Copy,
  DownloadSimple,
  PencilSimple,
  SlidersHorizontal,
  GearSix,
  Sparkle,
  Eye,
  SquaresFour,
  ListChecks,
  Users,
  type Icon,
} from "@phosphor-icons/react";
import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useSiteContent } from "../context/SiteContentContext";
import type { SiteContent } from "../types";
import GeneralTab from "./editor/GeneralTab";
import ServicesTab from "./editor/ServicesTab";
import PortfolioTab from "./editor/PortfolioTab";
import AboutTab from "./editor/AboutTab";

type TabDef = {
  id: string;
  label: string;
  icon: Icon;
};

const TABS: TabDef[] = [
  { id: "general", label: "Branding & Contact", icon: SlidersHorizontal },
  { id: "services", label: "Services", icon: ListChecks },
  { id: "portfolio", label: "Portfolio", icon: SquaresFour },
  { id: "about", label: "About & Why Us", icon: Sparkle },
];

export default function SiteEditorModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { content, updateContent, resetContent } = useSiteContent();
  const [tab, setTab] = useState<string>("general");
  const [draft, setDraft] = useState<SiteContent>(content);

  const dirty = JSON.stringify(draft) !== JSON.stringify(content);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0a1220] border border-cyan-500/20 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-800/70 bg-[#0d1522]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <PencilSimple size={18} weight="bold" className="text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-white tracking-tight truncate">
                    Customize Site
                  </h2>
                  <p className="text-xs text-slate-500 truncate">
                    Live edits, saved to this browser
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors shrink-0"
                aria-label="Close editor"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto gap-1 px-4 pt-3 pb-2 border-b border-slate-800/70 bg-[#0d1522]">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={
                      "flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] " +
                      (active
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                        : "text-slate-400 hover:text-cyan-400 hover:bg-white/5")
                    }
                  >
                    <Icon size={14} weight={active ? "fill" : "regular"} />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  {tab === "general" && <GeneralTab draft={draft} setDraft={setDraft} />}
                  {tab === "services" && <ServicesTab draft={draft} setDraft={setDraft} />}
                  {tab === "portfolio" && <PortfolioTab draft={draft} setDraft={setDraft} />}
                  {tab === "about" && <AboutTab draft={draft} setDraft={setDraft} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer actions */}
            <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-t border-slate-800/70 bg-[#0d1522]">
              <button
                onClick={() => {
                  resetContent();
                  setDraft(content);
                  toast.success("Reset to default content");
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-700/60 text-slate-300 text-sm font-semibold rounded-lg hover:border-red-500/40 hover:text-red-400 transition-all active:scale-[0.98]"
              >
                <ArrowCounterClockwise size={16} weight="bold" /> Reset
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(draft, null, 2));
                  toast.success("Config copied to clipboard");
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-700/60 text-slate-300 text-sm font-semibold rounded-lg hover:border-cyan-500/40 hover:text-cyan-400 transition-all active:scale-[0.98]"
              >
                <Copy size={16} /> Copy JSON
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(draft, null, 2)], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "ssa-tech-config.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-700/60 text-slate-300 text-sm font-semibold rounded-lg hover:border-cyan-500/40 hover:text-cyan-400 transition-all active:scale-[0.98]"
              >
                <DownloadSimple size={16} /> Export JSON
              </button>
              <div className="flex-1" />
              <button
                onClick={() => {
                  updateContent(draft);
                  toast.success("Changes saved to this browser");
                  onClose();
                }}
                disabled={!dirty}
                className={
                  "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all active:scale-[0.98] " +
                  (dirty
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed")
                }
              >
                <Check size={16} weight="bold" /> Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function EditPill({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group fixed bottom-5 right-5 z-[70] flex items-center gap-2.5 pl-4 pr-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-full shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all active:scale-[0.97]"
    >
      <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping opacity-30 group-hover:opacity-50 pointer-events-none" />
      <Eye size={18} weight="fill" />
      <span>Customize Site</span>
    </button>
  );
}

export function EditorLauncher({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/15 transition-all active:scale-[0.97]"
    >
      <GearSix size={16} weight="bold" />
      <Users size={16} weight="bold" />
      <span className="sr-only">Open Site Editor</span>
      <span className="hidden sm:inline">Edit Site</span>
    </button>
  );
}