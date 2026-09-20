import { SiteContent } from "../../types";
import { Field, KeysEditor } from "./fields";

export default function ServicesTab({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (d: SiteContent) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Section Heading (before accent)" value={draft.servicesHeading}
          onChange={(v) => setDraft({ ...draft, servicesHeading: v })} />
        <Field label="Section Subheading" value={draft.servicesSubheading}
          onChange={(v) => setDraft({ ...draft, servicesSubheading: v })} />
      </div>

      {draft.services.map((service, idx) => (
        <div key={service.id} className="p-4 bg-[#111c30] border border-slate-700/40 rounded-xl space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Service {idx + 1}
            </div>
            <button
              onClick={() => setDraft({ ...draft, services: draft.services.filter((s) => s.id !== service.id) })}
              className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              aria-label="Delete service"
            >
              <span className="text-xs">{"✕"}</span>
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Title" value={service.title}
              onChange={(v) => setDraft({
                ...draft,
                services: draft.services.map((s) => (s.id === service.id ? { ...s, title: v } : s)),
              })} />
            <Field label="Category" value={service.category}
              onChange={(v) => setDraft({
                ...draft,
                services: draft.services.map((s) => (s.id === service.id ? { ...s, category: v } : s)),
              })} />
            <Field label="Turnaround Time" value={service.turnaroundTime}
              onChange={(v) => setDraft({
                ...draft,
                services: draft.services.map((s) => (s.id === service.id ? { ...s, turnaroundTime: v } : s)),
              })} />
            <div className="sm:col-span-2">
              <Field label="Description" textarea value={service.description}
                onChange={(v) => setDraft({
                  ...draft,
                  services: draft.services.map((s) => (s.id === service.id ? { ...s, description: v } : s)),
                })} />
            </div>
            <div className="sm:col-span-2">
              <KeysEditor label="Features (one per line)" values={service.features}
                onChange={(v) => setDraft({
                  ...draft,
                  services: draft.services.map((s) => (s.id === service.id ? { ...s, features: v } : s)),
                })} />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setDraft({
            ...draft,
            services: [
              ...draft.services,
              {
                id: `svc-${Date.now()}`,
                title: "New Service",
                category: "Hardware",
                description: "Describe this service...",
                features: ["Feature 1"],
                turnaroundTime: "Same Day",
                iconName: "Wrench",
                image: "/gebeya.webp",
              },
            ],
          })
        }
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-cyan-500/40 text-cyan-400 text-sm font-semibold rounded-xl hover:bg-cyan-500/5 transition-all active:scale-[0.98]"
      >
        <span className="text-sm">{"+"}</span> Add Service
      </button>
    </div>
  );
}