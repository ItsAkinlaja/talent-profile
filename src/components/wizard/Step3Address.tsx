"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { WizardFormData } from "@/lib/types";
import { Input } from "@/components/ui/FormField";

interface Props {
  register: UseFormRegister<WizardFormData>;
  errors: FieldErrors<WizardFormData>;
}

export default function Step3Address({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[18px] font-bold text-ink tracking-[-0.3px]">Address</h2>
        <p className="text-[13px] text-ink-tertiary mt-0.5">Where are you based?</p>
      </div>

      <Input
        label="Street Address *"
        {...register("address")}
        placeholder="14 Adeola Odeku Street, Victoria Island"
        error={errors.address?.message}
        icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="City *"           {...register("city")}    placeholder="Lagos"   error={errors.city?.message} />
        <Input label="State / Province *" {...register("state")} placeholder="Lagos"   error={errors.state?.message} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Country *"         {...register("country")}  placeholder="Nigeria" error={errors.country?.message} />
        <Input label="Zip / Postal Code *" {...register("zipCode")} placeholder="101001" error={errors.zipCode?.message} />
      </div>
    </div>
  );
}
