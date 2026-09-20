import { SiteContent } from "../../types";
import { Field, KeysEditor } from "./fields";

export default function PortfolioTab({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (d: SiteContent) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Section Heading (before accent)" value={draft.portfolioHeading}
          onChange={(v) => setDraft({ ...draft, portfolioHeading: v })} />
        <Field label="Section Subheading" value={draft.portfolioSubheading}
          onChange={(v) => setDraft({ ...draft, portfolioSubheading: v })} />
      </div>

      {draft.portfolio.map((project, idx) => (
        <div key={project.id} className="p-4 bg-[#111c30] border border-slate-700/40 rounded-xl space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Project {idx + 1}
            </div>
            <button
              onClick={() => setDraft({ ...draft, portfolio: draft.portfolio.filter((p) => p.id !== project.id) })}
              className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              aria-label="Delete project"
            >
              <span className="text-xs">{"✕"}</span>
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Title" value={project.title}
              onChange={(v) => setDraft({
                ...draft,
                portfolio: draft.portfolio.map((p) => (p.id === project.id ? { ...p, title: v } : p)),
              })} />
            <Field label="Category" value={project.category}
              onChange={(v) => setDraft({
                ...draft,
                portfolio: draft.portfolio.map((p) => (p.id === project.id ? { ...p, category: v } : p)),
              })} />
            <Field label="Client Type" value={project.clientType}
              onChange={(v) => setDraft({
                ...draft,
                portfolio: draft.portfolio.map((p) => (p.id === project.id ? { ...p, clientType: v } : p)),
              })} />
            <Field label="Outcome" value={project.outcome}
              onChange={(v) => setDraft({
                ...draft,
                portfolio: draft.portfolio.map((p) => (p.id === project.id ? { ...p, outcome: v } : p)),
              })} />
            <div className="sm:col-span-2">
              <Field label="Description" textarea value={project.description}
                onChange={(v) => setDraft({
                  ...draft,
                  portfolio: draft.portfolio.map((p) => (p.id === project.id ? { ...p, description: v } : p)),
                })} />
            </div>
            <div className="sm:col-span-2">
              <KeysEditor label="Specs (one per line)" values={project.specs}
                onChange={(v) => setDraft({
                  ...draft,
                  portfolio: draft.portfolio.map((p) => (p.id === project.id ? { ...p, specs: v } : p)),
                })} rows={2} />
            </div>
            <div className="sm:col-span-2">
              <KeysEditor label="Metrics (label = value, one per line)" values={project.metrics.map((m) => `${m.label} = ${m.value}`)}
                onChange={(v) => setDraft({
                  ...draft,
                  portfolio: draft.portfolio.map((p) =>
                    p.id === project.id
                      ? {
                          ...p,
                          metrics: v.map((line) => {
                            const [label = "Metric", value = "0%"] = line.split("=").map((s) => s.trim());
                            return { label, value };
                          }),
                        }
                      : p
                  ),
                })} rows={2} />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setDraft({
            ...draft,
            portfolio: [
              ...draft.portfolio,
              {
                id: `proj-${Date.now()}`,
                title: "New Project",
                category: "Hardware",
                clientType: "Client",
                description: "Describe this project...",
                outcome: "Measurable outcome",
                specs: ["Spec 1"],
                image: "/gebeya.webp",
                metrics: [{ label: "Metric", value: "+0%" }],
              },
            ],
          })
        }
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-cyan-500/40 text-cyan-400 text-sm font-semibold rounded-xl hover:bg-cyan-500/5 transition-all active:scale-[0.98]"
      >
        <span className="text-sm">{"+"}</span> Add Project
      </button>
    </div>
  );
}