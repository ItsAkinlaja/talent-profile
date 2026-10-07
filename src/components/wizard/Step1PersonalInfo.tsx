"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { WizardFormData } from "@/lib/types";
import { useRef, useState } from "react";
import Image from "next/image";
import { Input, Select } from "@/components/ui/FormField";

interface Props {
  register: UseFormRegister<WizardFormData>;
  errors: FieldErrors<WizardFormData>;
  profilePhotoValue?: string;
  onPhotoUpload: (url: string) => void;
}

export default function Step1PersonalInfo({ register, errors, profilePhotoValue, onPhotoUpload }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setUploadError("Please select an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError("Image must be under 5MB"); return; }
    setUploadError(""); setUploading(true);
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      onPhotoUpload(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally { setUploading(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[18px] font-bold text-ink tracking-[-0.3px]">Personal Information</h2>
        <p className="text-[13px] text-ink-tertiary mt-0.5">Tell us about yourself — this will appear on your profile.</p>
      </div>

      {/* Photo upload */}
      <div className="flex items-center gap-5 p-4 bg-surface-secondary rounded-2xl border border-surface-border">
        <button type="button" onClick={() => fileRef.current?.click()}
          className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-dashed border-surface-border hover:border-brand-400 transition-colors bg-white flex-shrink-0 group">
          {profilePhotoValue ? (
            <>
              <Image src={profilePhotoValue} alt="Profile" width={80} height={80}
                className="w-full h-full object-cover"
                unoptimized={profilePhotoValue.includes('dicebear')} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-1 text-ink-disabled group-hover:text-brand-500 transition-colors">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          )}
        </button>
        <div>
          <p className="text-[13px] font-semibold text-ink mb-1">Profile Photo</p>
          <p className="text-[12px] text-ink-tertiary mb-2.5">JPG, PNG · max 5MB</p>
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
            className="inline-flex items-center gap-1.5 h-8 px-3.5 bg-white border border-surface-border hover:border-brand-300 text-[12.5px] font-semibold text-ink rounded-lg transition-all disabled:opacity-60">
            {uploading ? (
              <><svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Uploading…</>
            ) : profilePhotoValue ? "Change photo" : "Upload photo"}
          </button>
          {uploadError && <p className="text-[11.5px] text-danger mt-1.5">{uploadError}</p>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="First Name *" {...register("firstName")} placeholder="Chukwuemeka" error={errors.firstName?.message} />
        <Input label="Last Name *"  {...register("lastName")}  placeholder="Okafor"      error={errors.lastName?.message} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Date of Birth *" type="date" {...register("dob")} error={errors.dob?.message} />
        <Select label="Gender *" {...register("gender")} error={errors.gender?.message}>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </Select>
      </div>

      <Input label="Occupation *" {...register("occupation")} placeholder="Software Engineer" error={errors.occupation?.message} />
    </div>
  );
}
