import { SiteContent } from "../../types";
import { Field, labelCls, inputCls } from "./fields";

const NL = String.fromCharCode(10);

export default function AboutTab({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (d: SiteContent) => void;
}) {
  const setAbout = (patch: Partial<SiteContent["about"]>) =>
    setDraft({ ...draft, about: { ...draft.about, ...patch } });

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Eyebrow Label" value={draft.about.eyebrow}
          onChange={(v) => setAbout({ eyebrow: v })} />
        <Field label="Heading" value={draft.about.heading}
          onChange={(v) => setAbout({ heading: v })} />
        <Field label="Heading Accent" value={draft.about.headingAccent}
          onChange={(v) => setAbout({ headingAccent: v })} />
      </div>

      <div>
        <label className={labelCls}>Story Paragraphs (one per line)</label>
        <textarea
          rows={4}
          value={draft.about.paragraphs.join(NL)}
          onChange={(e) => setAbout({ paragraphs: e.target.value.split(NL).filter(Boolean) })}
          className={inputCls + " resize-none"}
        />
      </div>

      <div>
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
          Quick Highlights
        </h3>
        {draft.about.highlights.map((h, idx) => (
          <div key={idx} className="grid sm:grid-cols-2 gap-3 mb-3">
            <Field label={"Highlight " + (idx + 1) + " Title"} value={h.title}
              onChange={(v) => setAbout({
                highlights: draft.about.highlights.map((x, i) => (i === idx ? { ...x, title: v } : x)),
              })} />
            <Field label={"Highlight " + (idx + 1) + " Description"} value={h.desc}
              onChange={(v) => setAbout({
                highlights: draft.about.highlights.map((x, i) => (i === idx ? { ...x, desc: v } : x)),
              })} />
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Why Us Heading" value={draft.whyHeading}
          onChange={(v) => setDraft({ ...draft, whyHeading: v })} />
        <Field label="Why Us Subheading" value={draft.whySubheading}
          onChange={(v) => setDraft({ ...draft, whySubheading: v })} />
      </div>

      {draft.pillars.map((pillar, idx) => (
        <div key={pillar.id} className="p-4 bg-[#111c30] border border-slate-700/40 rounded-xl space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Pillar {idx + 1}
            </div>
            <button
              onClick={() => setDraft({ ...draft, pillars: draft.pillars.filter((p) => p.id !== pillar.id) })}
              className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              aria-label="Delete pillar"
            >
              <span>{"✕"}</span>
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Title" value={pillar.title}
              onChange={(v) => setDraft({
                ...draft,
                pillars: draft.pillars.map((p) => (p.id === pillar.id ? { ...p, title: v } : p)),
              })} />
            <Field label="Badge" value={pillar.badge}
              onChange={(v) => setDraft({
                ...draft,
                pillars: draft.pillars.map((p) => (p.id === pillar.id ? { ...p, badge: v } : p)),
              })} />
            <div className="sm:col-span-2">
              <Field label="Description" textarea value={pillar.description}
                onChange={(v) => setDraft({
                  ...draft,
                  pillars: draft.pillars.map((p) => (p.id === pillar.id ? { ...p, description: v } : p)),
                })} />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setDraft({
            ...draft,
            pillars: [
              ...draft.pillars,
              {
                id: "pillar-" + Date.now(),
                title: "New Pillar",
                description: "Describe this pillar...",
                badge: "Badge",
                iconName: "Star",
              },
            ],
          })
        }
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-cyan-500/40 text-cyan-400 text-sm font-semibold rounded-xl hover:bg-cyan-500/5 transition-all active:scale-[0.98]"
      >
        <span>{"+"}</span> Add Pillar
      </button>
    </div>
  );
}