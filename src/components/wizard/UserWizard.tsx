"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createUser, updateUser } from "@/store/slices/usersSlice";
import { WizardFormData, FullUser } from "@/lib/types";
import StepProgress from "./StepProgress";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2Contact from "./Step2Contact";
import Step3Address from "./Step3Address";
import Step4Academics from "./Step4Academics";
import Step5Preview from "./Step5Preview";
import Link from "next/link";

/* ── Validation schema ── */
const academicSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  startYear: z.number().optional().or(z.nan().transform(() => undefined)),
  endYear:   z.number().optional().or(z.nan().transform(() => undefined)),
});

const wizardSchema = z.object({
  firstName:    z.string().min(1, "First name is required"),
  lastName:     z.string().min(1, "Last name is required"),
  dob:          z.string().min(1, "Date of birth is required"),
  occupation:   z.string().min(1, "Occupation is required"),
  gender:       z.string().min(1, "Gender is required"),
  profilePhoto: z.string().optional(),
  email:        z.string().email("Invalid email address"),
  phoneNumber:  z.string().min(7, "Phone number is required"),
  fax:          z.string().optional(),
  linkedInUrl:  z.string().url("Invalid URL").optional().or(z.literal("")),
  address:      z.string().min(1, "Address is required"),
  city:         z.string().min(1, "City is required"),
  state:        z.string().min(1, "State is required"),
  country:      z.string().min(1, "Country is required"),
  zipCode:      z.string().min(1, "Zip code is required"),
  academics:    z.array(academicSchema).default([]),
});

const STEP_FIELDS: Record<number, (keyof WizardFormData)[]> = {
  1: ["firstName", "lastName", "dob", "occupation", "gender"],
  2: ["email", "phoneNumber"],
  3: ["address", "city", "state", "country", "zipCode"],
  4: ["academics"],
};

interface Props { existingUser?: FullUser; userId?: string; }

export default function UserWizard({ existingUser, userId }: Props) {
  const [step, setStep]         = useState(1);
  const [submitError, setError] = useState("");
  const dispatch   = useAppDispatch();
  const { loading} = useAppSelector((s) => s.users);
  const router     = useRouter();
  const isEdit     = !!userId;

  const defaults: WizardFormData = existingUser ? {
    firstName:    existingUser.userInfo.firstName,
    lastName:     existingUser.userInfo.lastName,
    dob:          existingUser.userInfo.dob,
    occupation:   existingUser.userInfo.occupation,
    gender:       existingUser.userInfo.gender,
    profilePhoto: existingUser.userInfo.profilePhoto || "",
    email:        existingUser.userContact?.email || "",
    phoneNumber:  existingUser.userContact?.phoneNumber || "",
    fax:          existingUser.userContact?.fax || "",
    linkedInUrl:  existingUser.userContact?.linkedInUrl || "",
    address:      existingUser.userAddress?.address || "",
    city:         existingUser.userAddress?.city || "",
    state:        existingUser.userAddress?.state || "",
    country:      existingUser.userAddress?.country || "",
    zipCode:      existingUser.userAddress?.zipCode || "",
    academics:    existingUser.userAcademics?.map((a) => ({
      schoolName: a.schoolName, degree: a.degree || "",
      fieldOfStudy: a.fieldOfStudy || "",
      startYear: a.startYear || undefined, endYear: a.endYear || undefined,
    })) || [],
  } : {
    firstName: "", lastName: "", dob: "", occupation: "", gender: "",
    profilePhoto: "", email: "", phoneNumber: "", fax: "", linkedInUrl: "",
    address: "", city: "", state: "", country: "", zipCode: "", academics: [],
  };

  const { register, handleSubmit, formState: { errors }, trigger,
          getValues, setValue, control, watch } = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });

  const profilePhotoValue = watch("profilePhoto");

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    if (fields && !(await trigger(fields))) return;
    setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => s - 1);

  const onSubmit = async (data: WizardFormData) => {
    setError("");
    try {
      const payload = {
        userInfo:    { firstName: data.firstName, lastName: data.lastName, dob: data.dob,
                       occupation: data.occupation, gender: data.gender,
                       profilePhoto: data.profilePhoto || undefined },
        userContact: { email: data.email, phoneNumber: data.phoneNumber,
                       fax: data.fax || undefined, linkedInUrl: data.linkedInUrl || undefined },
        userAddress: { address: data.address, city: data.city, state: data.state,
                       country: data.country, zipCode: data.zipCode },
        userAcademics: data.academics || [],
      };
      if (isEdit && userId) {
        await dispatch(updateUser({ id: userId, payload })).unwrap();
      } else {
        await dispatch(createUser(payload)).unwrap();
      }
      setStep(6);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const currentData  = getValues();
  const createdId    = useAppSelector((s) => s.users.selectedUser?.userInfo.id);

  /* ── Success screen ── */
  if (step === 6) {
    return (
      <div className="bg-white rounded-2xl border border-surface-border shadow-card p-8 text-center animate-slide-up">
        <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-[22px] font-bold text-ink tracking-[-0.3px] mb-2">
          {isEdit ? "Profile Updated" : "Profile Created"}
        </h2>
        <p className="text-[14px] text-ink-tertiary max-w-xs mx-auto mb-8">
          {isEdit
            ? "Your changes have been saved successfully."
            : "The talent profile has been created and saved to the database."}
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          {createdId && (
            <button onClick={() => router.push(`/users/${createdId}`)}
              className="inline-flex items-center gap-2 h-10 px-5 bg-brand-600 hover:bg-brand-700 text-white text-[13.5px] font-semibold rounded-xl shadow-brand hover:shadow-none transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              View Profile
            </button>
          )}
          <Link href="/users"
            className="inline-flex items-center gap-2 h-10 px-5 border border-surface-border bg-white hover:bg-surface-hover text-[13.5px] font-semibold text-ink rounded-xl transition-all">
            All Profiles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      <StepProgress currentStep={step} />

      <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden">
        {/* Step content */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <Step1PersonalInfo register={register} errors={errors}
                profilePhotoValue={profilePhotoValue}
                onPhotoUpload={(url) => setValue("profilePhoto", url)} />
            )}
            {step === 2 && <Step2Contact register={register} errors={errors} />}
            {step === 3 && <Step3Address register={register} errors={errors} />}
            {step === 4 && <Step4Academics register={register} errors={errors} control={control} />}
            {step === 5 && <Step5Preview data={currentData} />}

            {submitError && (
              <div className="mt-5 flex items-center gap-2 p-3.5 bg-danger/8 border border-danger/20 rounded-xl text-[13px] text-danger font-medium">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                {submitError}
              </div>
            )}

            {/* Footer nav */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-border">
              {step > 1 ? (
                <button type="button" onClick={goBack}
                  className="inline-flex items-center gap-2 h-10 px-4 border border-surface-border bg-white hover:bg-surface-hover text-[13.5px] font-semibold text-ink rounded-xl transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              ) : <div />}

              {step < 5 && (
                <button type="button" onClick={goNext}
                  className="inline-flex items-center gap-2 h-10 px-5 bg-brand-600 hover:bg-brand-700 text-white text-[13.5px] font-semibold rounded-xl shadow-brand hover:shadow-none transition-all">
                  Continue
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {step === 5 && (
                <button type="submit" disabled={loading}
                  className="inline-flex items-center gap-2 h-10 px-6 bg-brand-600 hover:bg-brand-700 text-white text-[13.5px] font-semibold rounded-xl shadow-brand hover:shadow-none transition-all disabled:opacity-60">
                  {loading ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Saving…</>
                  ) : (
                    <>{isEdit ? "Save Changes" : "Create Profile"}</>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
