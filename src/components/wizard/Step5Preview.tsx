"use client";

import { WizardFormData } from "@/lib/types";
import ResumeView from "@/components/resume/ResumeView";
import { FullUser } from "@/lib/types";

interface Props {
  data: WizardFormData;
}

export default function Step5Preview({ data }: Props) {
  // Build a FullUser object from wizard data for preview
  const previewUser: FullUser = {
    userInfo: {
      id: "preview",
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      occupation: data.occupation,
      gender: data.gender,
      profilePhoto: data.profilePhoto || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    userContact: {
      id: "preview",
      userId: "preview",
      email: data.email,
      phoneNumber: data.phoneNumber,
      fax: data.fax || null,
      linkedInUrl: data.linkedInUrl || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    userAddress: {
      id: "preview",
      userId: "preview",
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      zipCode: data.zipCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    userAcademics: (data.academics || []).map((a, i) => ({
      id: `preview-${i}`,
      userId: "preview",
      schoolName: a.schoolName,
      degree: a.degree || null,
      fieldOfStudy: a.fieldOfStudy || null,
      startYear: a.startYear || null,
      endYear: a.endYear || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Preview Your Profile</h2>
        <p className="text-gray-500 text-sm mt-1">
          This is how your profile will look. Click &quot;Submit&quot; to save it.
        </p>
      </div>
      <ResumeView user={previewUser} />
    </div>
  );
}
