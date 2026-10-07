"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserById, deleteUser } from "@/store/slices/usersSlice";
import ResumeView from "@/components/resume/ResumeView";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import { exportUserAsPdf } from "@/lib/exportPdf";

export default function UserViewPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedUser, loading, error } = useAppSelector((s) => s.users);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { if (id) dispatch(fetchUserById(id)); }, [dispatch, id]);

  const handleDelete = async () => {
    if (!selectedUser) return;
    setDeleting(true);
    try {
      await dispatch(deleteUser(selectedUser.userInfo.id)).unwrap();
      router.push("/users");
    } finally { setDeleting(false); }
  };

  if (loading) return <PageLoader />;
  if (error || !selectedUser) return (
    <div className="text-center py-20">
      <p className="text-ink-secondary text-[14px] mb-4">{error || "User not found"}</p>
      <Link href="/users" className="text-[13px] text-brand-600 hover:underline">← Back to Profiles</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Actions bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-[13px] text-ink-tertiary">
          {selectedUser.userInfo.firstName} {selectedUser.userInfo.lastName}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportUserAsPdf(selectedUser)}
            className="inline-flex items-center gap-1.5 h-8 px-3.5 border border-surface-border bg-white hover:bg-surface-hover text-[12.5px] font-semibold text-ink rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-ink-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Export PDF
          </button>
          <Link
            href={`/users/${id}/edit`}
            className="inline-flex items-center gap-1.5 h-8 px-3.5 border border-surface-border bg-white hover:bg-surface-hover text-[12.5px] font-semibold text-ink rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-ink-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            Edit
          </Link>
          <button
            onClick={() => setShowDelete(true)}
            className="inline-flex items-center gap-1.5 h-8 px-3.5 border border-danger/20 bg-danger/5 hover:bg-danger/10 text-[12.5px] font-semibold text-danger rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <ResumeView user={selectedUser} />

      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDelete(false)} />
          <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-sm p-6 animate-slide-up">
            <h3 className="text-[15px] font-bold text-ink mb-1">Delete profile</h3>
            <p className="text-[13px] text-ink-secondary mb-6">
              Permanently delete <strong className="text-ink">{selectedUser.userInfo.firstName} {selectedUser.userInfo.lastName}</strong>?
            </p>
            <div className="flex gap-2.5">
              <button onClick={() => setShowDelete(false)} className="flex-1 h-9 rounded-lg border border-surface-border text-[13px] font-semibold text-ink hover:bg-surface-hover">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 h-9 rounded-lg bg-danger text-white text-[13px] font-semibold disabled:opacity-60">
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
