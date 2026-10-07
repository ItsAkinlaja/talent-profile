"use client";

import { UseFormRegister, FieldErrors, useFieldArray, Control } from "react-hook-form";
import { WizardFormData } from "@/lib/types";
import { Input } from "@/components/ui/FormField";

interface Props {
  register: UseFormRegister<WizardFormData>;
  errors: FieldErrors<WizardFormData>;
  control: Control<WizardFormData>;
}

export default function Step4Academics({ register, errors, control }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: "academics" });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-bold text-ink tracking-[-0.3px]">Academic Background</h2>
          <p className="text-[13px] text-ink-tertiary mt-0.5">Add your educational history — most recent first.</p>
        </div>
        <button type="button"
          onClick={() => append({ schoolName: "", degree: "", fieldOfStudy: "", startYear: undefined, endYear: undefined })}
          className="flex-shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 bg-brand-600 hover:bg-brand-700 text-white text-[13px] font-semibold rounded-xl shadow-brand hover:shadow-none transition-all">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>

      {fields.length === 0 ? (
        <button type="button"
          onClick={() => append({ schoolName: "", degree: "", fieldOfStudy: "", startYear: undefined, endYear: undefined })}
          className="w-full py-12 rounded-2xl border-2 border-dashed border-surface-border hover:border-brand-300 hover:bg-brand-50/30 transition-all text-center group">
          <div className="w-12 h-12 rounded-2xl bg-surface-tertiary flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-[14px] font-semibold text-ink-secondary group-hover:text-brand-600 transition-colors">Add your first school</p>
          <p className="text-[12.5px] text-ink-disabled mt-1">Click to add your academic history</p>
        </button>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id}
              className="relative bg-surface-secondary/60 border border-surface-border rounded-2xl p-5 hover:border-brand-200 transition-colors group/card">
              {/* Index badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-brand-100 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-brand-700">{index + 1}</span>
                  </div>
                  <span className="text-[12.5px] font-semibold text-ink-tertiary">
                    {fields[index].schoolName || `School #${index + 1}`}
                  </span>
                </div>
                <button type="button" onClick={() => remove(index)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-disabled hover:text-danger hover:bg-danger/8 transition-colors opacity-0 group-hover/card:opacity-100">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <Input
                  label="School / University *"
                  {...register(`academics.${index}.schoolName`)}
                  placeholder="University of Lagos"
                  error={errors.academics?.[index]?.schoolName?.message}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="Degree"       {...register(`academics.${index}.degree`)}      placeholder="B.Sc. Computer Science" />
                  <Input label="Field of Study" {...register(`academics.${index}.fieldOfStudy`)} placeholder="Computer Science" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Start Year" type="number" {...register(`academics.${index}.startYear`, { valueAsNumber: true })} placeholder="2018" min={1950} max={2030} />
                  <Input label="End Year"   type="number" {...register(`academics.${index}.endYear`,   { valueAsNumber: true })} placeholder="2022" min={1950} max={2030} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
