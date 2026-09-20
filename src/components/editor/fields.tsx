import { Trash as TrashIcon, Plus as PlusIcon } from "@phosphor-icons/react";
import type { SiteContent } from "../../types";

export const inputCls =
  "w-full px-3 py-2 bg-[#0a1220] border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all";

export const labelCls = "block text-xs font-medium text-slate-400 mb-1.5";

const NL = String.fromCharCode(10);

export function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls + " resize-none"}
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      )}
    </div>
  );
}

export function KeysEditor({
  label,
  values,
  onChange,
  rows = 3,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className={labelCls}>{label} (one per line)</label>
      <textarea
        rows={rows}
        value={values.join(NL)}
        onChange={(e) => onChange(e.target.value.split(NL).filter(Boolean))}
        className={inputCls + " resize-none font-mono text-xs"}
      />
    </div>
  );
}

export function AddButton({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <button
      onClick={onAdd}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-cyan-500/40 text-cyan-400 text-sm font-semibold rounded-xl hover:bg-cyan-500/5 transition-all active:scale-[0.98]"
    >
      <PlusIcon size={16} weight="bold" /> {label}
    </button>
  );
}

export function mapServices(
  draft: SiteContent,
  id: string,
  patch: Partial<SiteContent["services"][number]>
): SiteContent {
  return { ...draft, services: draft.services.map((s) => (s.id === id ? { ...s, ...patch } : s)) };
}

export function mapPortfolio(
  draft: SiteContent,
  id: string,
  patch: Partial<SiteContent["portfolio"][number]>
): SiteContent {
  return { ...draft, portfolio: draft.portfolio.map((p) => (p.id === id ? { ...p, ...patch } : p)) };
}

export function mapPillars(
  draft: SiteContent,
  id: string,
  patch: Partial<SiteContent["pillars"][number]>
): SiteContent {
  return { ...draft, pillars: draft.pillars.map((p) => (p.id === id ? { ...p, ...patch } : p)) };
}

export function DeleteButton({ label, onDelete }: { label: string; onDelete: () => void }) {
  return (
    <button
      onClick={onDelete}
      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
      aria-label={`Delete ${label}`}
    >
      <TrashIcon size={16} />
    </button>
  );
}