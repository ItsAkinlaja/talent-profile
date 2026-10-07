"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserById } from "@/store/slices/usersSlice";
import UserWizard from "@/components/wizard/UserWizard";
import { PageLoader } from "@/components/ui/LoadingSpinner";

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedUser, loading } = useAppSelector((s) => s.users);

  useEffect(() => { if (id) dispatch(fetchUserById(id)); }, [dispatch, id]);

  if (loading) return <PageLoader />;
  if (!selectedUser) return null;

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-ink tracking-[-0.4px]">Edit Profile</h1>
        <p className="text-[13px] text-ink-tertiary mt-0.5">
          Editing {selectedUser.userInfo.firstName} {selectedUser.userInfo.lastName}
        </p>
      </div>
      <UserWizard existingUser={selectedUser} userId={id} />
    </div>
  );
}
