import UserWizard from "@/components/wizard/UserWizard";

export default function NewUserPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-ink tracking-[-0.4px]">Create Profile</h1>
        <p className="text-[13px] text-ink-tertiary mt-0.5">Fill in the details below step by step.</p>
      </div>
      <UserWizard />
    </div>
  );
}
