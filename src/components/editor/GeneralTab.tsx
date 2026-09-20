import { SiteContent } from "../../types";
import { Field, KeysEditor } from "./fields";

export default function GeneralTab({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (d: SiteContent) => void;
}) {
  const setBrand = (patch: Partial<SiteContent["branding"]>) =>
    setDraft({ ...draft, branding: { ...draft.branding, ...patch } });

  const setContact = (patch: Partial<SiteContent["contact"]>) =>
    setDraft({ ...draft, contact: { ...draft.contact, ...patch } });

  const setMetric = (idx: number, patch: Partial<SiteContent["trustMetrics"][number]>) =>
    setDraft({
      ...draft,
      trustMetrics: draft.trustMetrics.map((m, i) => (i === idx ? { ...m, ...patch } : m)),
    });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Branding</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Business Name" value={draft.branding.businessName}
            onChange={(v) => setBrand({ businessName: v })} />
          <Field label="Footer Tagline" value={draft.branding.tagline}
            onChange={(v) => setBrand({ tagline: v })} />
          <Field label="Hero Heading" value={draft.branding.heroHeading}
            onChange={(v) => setBrand({ heroHeading: v })} />
          <Field label="Hero Heading Accent" value={draft.branding.heroHeadingAccent}
            onChange={(v) => setBrand({ heroHeadingAccent: v })} />
          <div className="sm:col-span-2">
            <Field label="Hero Subheading" textarea value={draft.branding.heroSubheading}
              onChange={(v) => setBrand({ heroSubheading: v })} />
          </div>
          <Field label="Primary CTA Label" value={draft.branding.ctaPrimary}
            onChange={(v) => setBrand({ ctaPrimary: v })} />
          <Field label="Secondary CTA Label" value={draft.branding.ctaSecondary}
            onChange={(v) => setBrand({ ctaSecondary: v })} />
          <Field label="Status Badge" value={draft.branding.statusBadge}
            onChange={(v) => setBrand({ statusBadge: v })} />
          <Field label="Hero Floating Badge" value={draft.branding.badgeLabel}
            onChange={(v) => setBrand({ badgeLabel: v })} />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Trust Metrics</h3>
        {draft.trustMetrics.map((metric, idx) => (
          <div key={idx} className="grid sm:grid-cols-2 gap-4 mb-3">
            <Field label={`Metric ${idx + 1} Value`} value={metric.value}
              onChange={(v) => setMetric(idx, { value: v })} />
            <Field label={`Metric ${idx + 1} Label`} value={metric.label}
              onChange={(v) => setMetric(idx, { label: v })} />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Contact Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Phone (display)" value={draft.contact.phone}
            onChange={(v) => setContact({ phone: v })} />
          <Field label="Phone (raw, for tel: links)" value={draft.contact.phoneRaw}
            onChange={(v) => setContact({ phoneRaw: v })} />
          <Field label="WhatsApp (digits only)" value={draft.contact.whatsapp}
            onChange={(v) => setContact({ whatsapp: v })} />
          <Field label="Email" value={draft.contact.email}
            onChange={(v) => setContact({ email: v })} />
          <Field label="Address" value={draft.contact.address}
            onChange={(v) => setContact({ address: v })} />
          <Field label="Operating Hours" value={draft.contact.hours}
            onChange={(v) => setContact({ hours: v })} />
        </div>
      </div>
    </div>
  );
}