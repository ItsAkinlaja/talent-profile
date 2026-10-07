"use client";

import { clsx } from "clsx";

const STEPS = [
  { label: "Personal" },
  { label: "Contact" },
  { label: "Address" },
  { label: "Education" },
  { label: "Preview" },
  { label: "Done" },
];

export default function StepProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      {/* Mobile: pill progress */}
      <div className="flex sm:hidden items-center gap-3 mb-4">
        <div className="flex-1 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
        <span className="text-[12px] font-semibold text-ink-tertiary whitespace-nowrap">
          {currentStep < 6 ? `Step ${currentStep} of 5` : "Complete"}
        </span>
      </div>

      {/* Desktop: full indicator */}
      <div className="hidden sm:flex items-center">
        {STEPS.map((step, i) => {
          const n      = i + 1;
          const done   = n < currentStep;
          const active = n === currentStep;
          return (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={clsx(
                  "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
                  done   ? "bg-brand-600 text-white shadow-brand"
                  : active ? "bg-brand-600 text-white shadow-brand ring-4 ring-brand-100"
                           : "bg-white border-2 border-surface-border text-ink-disabled"
                )}>
                  {done ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-[11px] font-bold">{n}</span>
                  )}
                </div>
                <span className={clsx(
                  "text-[10px] font-semibold tracking-[0.3px]",
                  active ? "text-brand-600" : done ? "text-brand-500" : "text-ink-disabled"
                )}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={clsx(
                  "flex-1 h-0.5 mx-1.5 mb-4 rounded-full transition-all duration-500",
                  done ? "bg-brand-400" : "bg-surface-border"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
