"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Dictionary, Locale } from "@/content/types";
import { track } from "@/lib/analytics";
import {
  COMPUTE_INQUIRY_OPTIONS,
  getComputeOfferDefaults,
  type ComputeInquiryOptionKey,
} from "@/lib/contact/compute-inquiry";
import { localePath } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  locale: Locale;
  resourceId?: string;
  defaultFrom?: string;
};

type SubmitState = "idle" | "sending" | "success" | "error";

function getAll(data: FormData, name: string) {
  return data.getAll(name).map(String).filter(Boolean);
}

function Field({
  id,
  label,
  required,
  requiredLabel,
  optionalLabel,
  children,
}: {
  id?: string;
  label: string;
  required?: boolean;
  requiredLabel: string;
  optionalLabel: string;
  children: ReactNode;
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        <span className="ml-2 text-xs font-medium text-[var(--ink-muted)]">
          {required ? requiredLabel : optionalLabel}
        </span>
      </label>
      {children}
    </div>
  );
}

function ChoiceGroup({
  name,
  label,
  required,
  requiredLabel,
  optionalLabel,
  options,
  multiple,
  locale,
  disabled,
  defaultValues,
}: {
  name: ComputeInquiryOptionKey | "contactRole" | string;
  label: string;
  required?: boolean;
  requiredLabel: string;
  optionalLabel: string;
  options: readonly { value: string; zh: string; en: string }[];
  multiple: boolean;
  locale: Locale;
  disabled?: boolean;
  defaultValues?: string[];
}) {
  const type = multiple ? "checkbox" : "radio";
  const selected = new Set(defaultValues ?? []);
  return (
    <fieldset className="form-field">
      <legend>
        {label}
        <span className="ml-2 text-xs font-medium text-[var(--ink-muted)]">
          {required ? requiredLabel : optionalLabel}
        </span>
      </legend>
      <div className="choice-grid">
        {options.map((option) => (
          <label key={option.value} className="choice-item">
            <input
              type={type}
              name={name}
              value={option.value}
              required={required && !multiple}
              disabled={disabled}
              defaultChecked={selected.has(option.value)}
            />
            <span>{locale === "en" ? option.en : option.zh}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ComputeInquiryForm({ dict, locale, resourceId, defaultFrom }: Props) {
  const copy = dict.computeInquiry;
  const labels = copy.labels;
  const offer = dict.compute.offers.items.find((item) => item.id === resourceId);
  const defaults = getComputeOfferDefaults(resourceId);
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const sending = state === "sending";

  const mark = useMemo(
    () => ({
      required: copy.required,
      optional: copy.optional,
    }),
    [copy.optional, copy.required],
  );

  return (
    <form
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        if (sending) return;
        const form = e.currentTarget;
        const data = new FormData(form);
        const extraNotes = String(data.get("extraNotes") || "");
        const inquiry = {
          company: String(data.get("company") || ""),
          creditCode: String(data.get("creditCode") || ""),
          registeredCapital: String(data.get("registeredCapital") || ""),
          revenueRange: String(data.get("revenueRange") || ""),
          companyType: getAll(data, "companyType"),
          companyTypeOther: String(data.get("companyTypeOther") || ""),
          businessDesc: String(data.get("businessDesc") || ""),
          contactTitle: String(data.get("contactTitle") || ""),
          contactPhone: String(data.get("contactPhone") || ""),
          decisionMaker: String(data.get("decisionMaker") || ""),
          contactRole: getAll(data, "contactRole"),
          acquireMode: getAll(data, "acquireMode"),
          gpuModels: getAll(data, "gpuModels"),
          machineCount: String(data.get("machineCount") || ""),
          gpusPerMachine: String(data.get("gpusPerMachine") || ""),
          network: getAll(data, "network"),
          storage: getAll(data, "storage"),
          software: getAll(data, "software"),
          softwareOther: String(data.get("softwareOther") || ""),
          batchDelivery: getAll(data, "batchDelivery"),
          location: getAll(data, "location"),
          usages: getAll(data, "usages"),
          usageOther: String(data.get("usageOther") || ""),
          loadPattern: getAll(data, "loadPattern"),
          existingPlatform: getAll(data, "existingPlatform"),
          projectBackground: String(data.get("projectBackground") || ""),
          contractTerm: getAll(data, "contractTerm"),
          paymentStructure: getAll(data, "paymentStructure"),
          budgetRange: getAll(data, "budgetRange"),
          contractingEntity: String(data.get("contractingEntity") || ""),
          fundingSource: getAll(data, "fundingSource"),
          invoice: getAll(data, "invoice"),
          invoiceNote: String(data.get("invoiceNote") || ""),
          earliestDate: String(data.get("earliestDate") || ""),
          latestDate: String(data.get("latestDate") || ""),
          urgency: getAll(data, "urgency"),
          acceptForward: getAll(data, "acceptForward"),
          hardDeadline: getAll(data, "hardDeadline"),
          hardDeadlineDate: String(data.get("hardDeadlineDate") || ""),
          phasedDelivery: getAll(data, "phasedDelivery"),
          compliance: getAll(data, "compliance"),
          supplierQual: getAll(data, "supplierQual"),
          extraNotes,
        };

        const missingGroups = [
          [inquiry.companyType, labels.companyType],
          [inquiry.gpuModels, labels.gpuModels],
          [inquiry.usages, labels.usages],
        ] as const;
        const missing = missingGroups.find(([vals]) => vals.length < 1);
        if (missing) {
          setError(`${missing[1]} · ${copy.required}`);
          setState("error");
          return;
        }
        if (!confirmed) {
          setError(copy.confirm);
          setState("error");
          return;
        }

        setState("sending");
        setError(null);

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              intent: "compute",
              name: String(data.get("name") || ""),
              email: String(data.get("email") || ""),
              company: inquiry.company,
              message: extraNotes,
              website: String(data.get("website") || ""),
              locale,
              pagePath: window.location.pathname,
              from: defaultFrom || (resourceId ? `offer-${resourceId}` : "compute-inquiry"),
              computeInquiry: inquiry,
            }),
          });
          const json = (await res.json().catch(() => null)) as
            | { ok?: boolean; error?: string }
            | null;
          if (!res.ok || !json?.ok) {
            const code = json?.error || `http_${res.status}`;
          track("contact_submit_error", {
            code,
            intent: "compute",
            from: defaultFrom || resourceId || "compute-inquiry",
          });
            setError(
              code === "not_configured"
                ? dict.contact.form.notConfigured
                : copy.error,
            );
            setState("error");
            return;
          }
          track("contact_submit_success", {
            intent: "compute",
            from: defaultFrom || (resourceId ? `offer-${resourceId}` : "compute-inquiry"),
          });
          setState("success");
          form.reset();
          setConfirmed(false);
        } catch {
          track("contact_submit_error", { code: "network", intent: "compute" });
          setError(copy.error);
          setState("error");
        }
      }}
    >
      {state === "success" ? (
        <div className="panel p-6 sm:p-8">
          <p className="text-[var(--teal)]">{copy.success}</p>
        </div>
      ) : (
        <>
          {offer ? (
            <div className="panel p-5 sm:p-6">
              <p className="text-xs font-semibold tracking-wide text-[var(--orange)]">
                {offer.badge}
              </p>
              <h2 className="serif mt-2 text-xl font-semibold">{offer.title}</h2>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{copy.selectedOffer}</p>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">{offer.availability}</p>
              <a
                href={localePath(locale, `/compute#${offer.id}`)}
                className="mt-3 inline-flex text-sm font-semibold text-[var(--teal)]"
              >
                {copy.changeOffer} →
              </a>
            </div>
          ) : null}

          <section className="panel space-y-5 p-6 sm:p-8">
            <div>
              <p className="eyebrow">{copy.sections.basic.title}</p>
              <h2 className="serif mt-2 text-2xl font-semibold">{copy.sections.basic.lead}</h2>
            </div>
            <Field
              id="company"
              label={labels.company}
              required
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <input id="company" name="company" required disabled={sending} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="creditCode"
                label={labels.creditCode}
                requiredLabel={mark.required}
                optionalLabel={mark.optional}
              >
                <input id="creditCode" name="creditCode" disabled={sending} />
              </Field>
              <Field
                id="registeredCapital"
                label={labels.registeredCapital}
                requiredLabel={mark.required}
                optionalLabel={mark.optional}
              >
                <input id="registeredCapital" name="registeredCapital" disabled={sending} />
              </Field>
            </div>
            <Field
              id="revenueRange"
              label={labels.revenueRange}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <input id="revenueRange" name="revenueRange" disabled={sending} />
            </Field>
            <ChoiceGroup
              name="companyType"
              label={labels.companyType}
              required
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.companyType}
              multiple
              locale={locale}
              disabled={sending}
            />
            <Field
              id="companyTypeOther"
              label={labels.companyTypeOther}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <input id="companyTypeOther" name="companyTypeOther" disabled={sending} />
            </Field>
            <Field
              id="businessDesc"
              label={labels.businessDesc}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <textarea id="businessDesc" name="businessDesc" rows={3} disabled={sending} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label={labels.contactName}
                required
                requiredLabel={mark.required}
                optionalLabel={mark.optional}
              >
                <input id="name" name="name" required autoComplete="name" disabled={sending} />
              </Field>
              <Field
                id="contactTitle"
                label={labels.contactTitle}
                requiredLabel={mark.required}
                optionalLabel={mark.optional}
              >
                <input id="contactTitle" name="contactTitle" disabled={sending} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="contactPhone"
                label={labels.contactPhone}
                required
                requiredLabel={mark.required}
                optionalLabel={mark.optional}
              >
                <input id="contactPhone" name="contactPhone" required autoComplete="tel" disabled={sending} />
              </Field>
              <Field
                id="email"
                label={labels.email}
                required
                requiredLabel={mark.required}
                optionalLabel={mark.optional}
              >
                <input id="email" name="email" type="email" required autoComplete="email" disabled={sending} />
              </Field>
            </div>
            <Field
              id="decisionMaker"
              label={labels.decisionMaker}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <input id="decisionMaker" name="decisionMaker" disabled={sending} />
            </Field>
            <ChoiceGroup
              name="contactRole"
              label={labels.contactRole}
              required
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.contactRole}
              multiple={false}
              locale={locale}
              disabled={sending}
            />
          </section>

          <section className="panel space-y-5 p-6 sm:p-8">
            <div>
              <p className="eyebrow">{copy.sections.specs.title}</p>
              <h2 className="serif mt-2 text-2xl font-semibold">{copy.sections.specs.lead}</h2>
            </div>
            <ChoiceGroup
              name="acquireMode"
              label={labels.acquireMode}
              required
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.acquireMode}
              multiple={false}
              locale={locale}
              disabled={sending}
              defaultValues={defaults?.acquireMode}
            />
            <ChoiceGroup
              name="gpuModels"
              label={labels.gpuModels}
              required
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.gpuModels}
              multiple
              locale={locale}
              disabled={sending}
              defaultValues={defaults?.gpuModels}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="machineCount"
                label={labels.machineCount}
                required
                requiredLabel={mark.required}
                optionalLabel={mark.optional}
              >
                <input id="machineCount" name="machineCount" required disabled={sending} />
              </Field>
              <Field
                id="gpusPerMachine"
                label={labels.gpusPerMachine}
                requiredLabel={mark.required}
                optionalLabel={mark.optional}
              >
                <input id="gpusPerMachine" name="gpusPerMachine" disabled={sending} />
              </Field>
            </div>
            <ChoiceGroup
              name="network"
              label={labels.network}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.network}
              multiple
              locale={locale}
              disabled={sending}
            />
            <ChoiceGroup
              name="storage"
              label={labels.storage}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.storage}
              multiple
              locale={locale}
              disabled={sending}
            />
            <ChoiceGroup
              name="software"
              label={labels.software}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.software}
              multiple
              locale={locale}
              disabled={sending}
            />
            <Field
              id="softwareOther"
              label={labels.softwareOther}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <input id="softwareOther" name="softwareOther" disabled={sending} />
            </Field>
            <ChoiceGroup
              name="batchDelivery"
              label={labels.batchDelivery}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.batchDelivery}
              multiple={false}
              locale={locale}
              disabled={sending}
            />
            <ChoiceGroup
              name="location"
              label={labels.location}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.location}
              multiple
              locale={locale}
              disabled={sending}
              defaultValues={defaults?.location}
            />
          </section>

          <section className="panel space-y-5 p-6 sm:p-8">
            <div>
              <p className="eyebrow">{copy.sections.scenario.title}</p>
              <h2 className="serif mt-2 text-2xl font-semibold">{copy.sections.scenario.lead}</h2>
            </div>
            <ChoiceGroup
              name="usages"
              label={labels.usages}
              required
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.usages}
              multiple
              locale={locale}
              disabled={sending}
            />
            <Field
              id="usageOther"
              label={labels.usageOther}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <input id="usageOther" name="usageOther" disabled={sending} />
            </Field>
            <ChoiceGroup
              name="loadPattern"
              label={labels.loadPattern}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.loadPattern}
              multiple={false}
              locale={locale}
              disabled={sending}
            />
            <ChoiceGroup
              name="existingPlatform"
              label={labels.existingPlatform}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.existingPlatform}
              multiple={false}
              locale={locale}
              disabled={sending}
            />
            <Field
              id="projectBackground"
              label={labels.projectBackground}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <textarea id="projectBackground" name="projectBackground" rows={4} disabled={sending} />
            </Field>
          </section>

          <section className="panel space-y-5 p-6 sm:p-8">
            <div>
              <p className="eyebrow">{copy.sections.commercial.title}</p>
              <h2 className="serif mt-2 text-2xl font-semibold">{copy.sections.commercial.lead}</h2>
            </div>
            <ChoiceGroup
              name="contractTerm"
              label={labels.contractTerm}
              required
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.contractTerm}
              multiple={false}
              locale={locale}
              disabled={sending}
              defaultValues={defaults?.contractTerm}
            />
            <ChoiceGroup
              name="paymentStructure"
              label={labels.paymentStructure}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.paymentStructure}
              multiple
              locale={locale}
              disabled={sending}
              defaultValues={defaults?.paymentStructure}
            />
            <ChoiceGroup
              name="budgetRange"
              label={labels.budgetRange}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.budgetRange}
              multiple={false}
              locale={locale}
              disabled={sending}
            />
            <Field
              id="contractingEntity"
              label={labels.contractingEntity}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <input id="contractingEntity" name="contractingEntity" disabled={sending} />
            </Field>
            <ChoiceGroup
              name="fundingSource"
              label={labels.fundingSource}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.fundingSource}
              multiple
              locale={locale}
              disabled={sending}
            />
            <ChoiceGroup
              name="invoice"
              label={labels.invoice}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.invoice}
              multiple
              locale={locale}
              disabled={sending}
            />
            <Field
              id="invoiceNote"
              label={labels.invoiceNote}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <input id="invoiceNote" name="invoiceNote" disabled={sending} />
            </Field>
          </section>

          <section className="panel space-y-5 p-6 sm:p-8">
            <div>
              <p className="eyebrow">{copy.sections.timeline.title}</p>
              <h2 className="serif mt-2 text-2xl font-semibold">{copy.sections.timeline.lead}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="earliestDate"
                label={labels.earliestDate}
                required
                requiredLabel={mark.required}
                optionalLabel={mark.optional}
              >
                <input id="earliestDate" name="earliestDate" type="date" required disabled={sending} />
              </Field>
              <Field
                id="latestDate"
                label={labels.latestDate}
                requiredLabel={mark.required}
                optionalLabel={mark.optional}
              >
                <input id="latestDate" name="latestDate" type="date" disabled={sending} />
              </Field>
            </div>
            <ChoiceGroup
              name="urgency"
              label={labels.urgency}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.urgency}
              multiple={false}
              locale={locale}
              disabled={sending}
            />
            <ChoiceGroup
              name="acceptForward"
              label={labels.acceptForward}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.acceptForward}
              multiple={false}
              locale={locale}
              disabled={sending}
              defaultValues={defaults?.acceptForward}
            />
            <ChoiceGroup
              name="hardDeadline"
              label={labels.hardDeadline}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.hardDeadline}
              multiple={false}
              locale={locale}
              disabled={sending}
            />
            <Field
              id="hardDeadlineDate"
              label={labels.hardDeadlineDate}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <input id="hardDeadlineDate" name="hardDeadlineDate" type="date" disabled={sending} />
            </Field>
            <ChoiceGroup
              name="phasedDelivery"
              label={labels.phasedDelivery}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.phasedDelivery}
              multiple={false}
              locale={locale}
              disabled={sending}
            />
          </section>

          <section className="panel space-y-5 p-6 sm:p-8">
            <div>
              <p className="eyebrow">{copy.sections.other.title}</p>
              <h2 className="serif mt-2 text-2xl font-semibold">{copy.sections.other.lead}</h2>
            </div>
            <ChoiceGroup
              name="compliance"
              label={labels.compliance}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.compliance}
              multiple
              locale={locale}
              disabled={sending}
            />
            <ChoiceGroup
              name="supplierQual"
              label={labels.supplierQual}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
              options={COMPUTE_INQUIRY_OPTIONS.supplierQual}
              multiple
              locale={locale}
              disabled={sending}
            />
            <Field
              id="extraNotes"
              label={labels.extraNotes}
              requiredLabel={mark.required}
              optionalLabel={mark.optional}
            >
              <textarea id="extraNotes" name="extraNotes" rows={5} disabled={sending} />
            </Field>
          </section>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-10000px",
              top: "auto",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <section className="panel space-y-4 p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{copy.disclaimer}</p>
            <label className="choice-item">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                required
                disabled={sending}
              />
              <span>{copy.confirm}</span>
            </label>
            {error ? <p className="text-sm text-[var(--orange-deep)]">{error}</p> : null}
            <p className="text-xs leading-relaxed text-[var(--ink-muted)]">
              {dict.contact.form.privacyNote}
            </p>
            <button type="submit" className="btn btn-primary w-fit" disabled={sending}>
              {sending ? copy.sending : copy.submit}
            </button>
          </section>
        </>
      )}
    </form>
  );
}
