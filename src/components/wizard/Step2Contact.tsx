"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { WizardFormData } from "@/lib/types";
import { Input } from "@/components/ui/FormField";

interface Props {
  register: UseFormRegister<WizardFormData>;
  errors: FieldErrors<WizardFormData>;
}

export default function Step2Contact({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[18px] font-bold text-ink tracking-[-0.3px]">Contact Information</h2>
        <p className="text-[13px] text-ink-tertiary mt-0.5">How can people reach you?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address *"
          type="email"
          {...register("email")}
          placeholder="john@example.com"
          error={errors.email?.message}
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
        />
        <Input
          label="Phone Number *"
          type="tel"
          {...register("phoneNumber")}
          placeholder="+234 801 234 5678"
          error={errors.phoneNumber?.message}
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Fax"
          type="tel"
          {...register("fax")}
          placeholder="+234 1 234 5678"
          hint="Optional"
        />
        <Input
          label="LinkedIn URL"
          type="url"
          {...register("linkedInUrl")}
          placeholder="https://linkedin.com/in/yourname"
          error={errors.linkedInUrl?.message}
          hint="Optional"
          icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
        />
      </div>
    </div>
  );
}
