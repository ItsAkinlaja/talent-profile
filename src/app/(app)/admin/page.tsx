"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers, deleteUser } from "@/store/slices/usersSlice";
import { FullUser } from "@/lib/types";
import { exportUserAsPdf }  from "@/lib/exportPdf";
import { exportUserAsDocx } from "@/lib/exportDocx";
import Link from "next/link";
import Image from "next/image";
import MobileBreadcrumb from "@/components/ui/MobileBreadcrumb";

const GRAD = [
  "from-violet-500 to-indigo-600", "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-600",  "from-rose-500 to-pink-600",
  "from-amber-400 to-orange-500",  "from-fuchsia-500 to-purple-600",
];
function grad(name: string) {
  const i = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % GRAD.length;
  return GRAD[i];
}

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((s) => s.users);
  const [dlId,      setDlId]    = useState<string | null>(null);
  const [delTarget, setDel]     = useState<FullUser | null>(null);
  const [deleting,  setDeleting]= useState(false);

  useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

  const dl = async (type: "pdf" | "docx", u: FullUser) => {
    const key = u.userInfo.id + type;
    setDlId(key);
    try { type === "pdf" ? await exportUserAsPdf(u) : await exportUserAsDocx(u); }
    finally { setDlId(null); }
  };

  const handleDelete = async () => {
    if (!delTarget) return;
    setDeleting(true);
    try { await dispatch(deleteUser(delTarget.userInfo.id)).unwrap(); setDel(null); }
    finally { setDeleting(false); }
  };

  const cities = [...new Set(users.map(u => u.userAddress?.city).filter(Boolean))].length;
  const roles  = [...new Set(users.map(u => u.userInfo.occupation))].length;
  const withEd = users.filter(u => u.userAcademics?.length > 0).length;

  return (
    <>
      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <MobileBreadcrumb title="Dashboard" />
          <h1 className="text-[22px] font-bold text-ink tracking-[-0.4px]">Dashboard</h1>
          <p className="text-[13px] text-ink-tertiary mt-0.5">All submitted talent profiles</p>
        </div>
        <Link href="/users/new"
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-white text-[13px] font-semibold shadow-sm hover:opacity-90 transition-all flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#1A3FD0 0%,#22C55E 100%)" }}>
          + New
        </Link>
      </div>

      {/* ── Stats — 2 cols mobile, 4 cols desktop ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard value={users.length} label="Total Profiles" colorClass="text-[#1A3FD0]" bgClass="bg-blue-50"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>} />
        <StatCard value={cities} label="Cities" colorClass="text-[#22C55E]" bgClass="bg-green-50"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>} />
        <StatCard value={roles} label="Unique Roles" colorClass="text-amber-600" bgClass="bg-amber-50"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>} />
        <StatCard value={withEd} label="With Education" colorClass="text-purple-600" bgClass="bg-purple-50"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>} />
      </div>

      {/* ── Profiles list ── */}
      <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <h2 className="text-[14px] font-bold text-ink">All Profiles</h2>
            <span className="h-5 px-2 bg-surface-tertiary rounded-full text-[11px] font-bold text-ink-tertiary flex items-center">{users.length}</span>
          </div>
          <p className="text-[11.5px] text-ink-tertiary hidden sm:block">Download as PDF or DOCX</p>
        </div>

        {loading && users.length === 0 ? (
          <SkeletonList />
        ) : users.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* ── MOBILE: stacked cards (hidden on md+) ── */}
            <div className="md:hidden divide-y divide-surface-border">
              {users.map((u) => {
                const name = `${u.userInfo.firstName} ${u.userInfo.lastName}`;
                const g    = grad(name);
                return (
                  <div key={u.userInfo.id} className="p-4">
                    {/* Top row: avatar + name + role */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                        {u.userInfo.profilePhoto ? (
                          <Image src={u.userInfo.profilePhoto} alt="" width={40} height={40}
                            className="w-full h-full object-cover"
                            unoptimized={u.userInfo.profilePhoto.includes("dicebear")} />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${g} flex items-center justify-center text-white text-[13px] font-bold`}>
                            {u.userInfo.firstName[0]}{u.userInfo.lastName[0]}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/users/${u.userInfo.id}`}
                          className="text-[14px] font-bold text-ink hover:text-[#1A3FD0] transition-colors truncate block">
                          {name}
                        </Link>
                        <p className="text-[12px] text-ink-tertiary truncate">{u.userInfo.occupation}</p>
                      </div>
                    </div>

                    {/* Details row */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {u.userContact?.email && (
                        <span className="text-[11.5px] text-ink-secondary truncate max-w-[180px]">
                          {u.userContact.email}
                        </span>
                      )}
                      {u.userAddress && (
                        <span className="text-[11px] text-ink-disabled">
                          · {u.userAddress.city}
                        </span>
                      )}
                    </div>

                    {/* Action row */}
                    <div className="flex items-center gap-2">
                      <DlBtn label="PDF"  loading={dlId === u.userInfo.id + "pdf"}  onClick={() => dl("pdf",  u)} red />
                      <DlBtn label="DOCX" loading={dlId === u.userInfo.id + "docx"} onClick={() => dl("docx", u)} />
                      <button
                        onClick={() => setDel(u)}
                        className="ml-auto h-8 w-8 rounded-xl flex items-center justify-center text-ink-disabled hover:text-danger hover:bg-danger/8 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── DESKTOP: full table (hidden on mobile) ── */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-border bg-surface-secondary/50">
                    {["Profile", "Email", "Role", "Location", "Date", "Export", ""].map(h => (
                      <th key={h} className="text-left px-5 py-2.5 text-[11px] font-semibold text-ink-disabled uppercase tracking-[0.5px] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {users.map(u => {
                    const name = `${u.userInfo.firstName} ${u.userInfo.lastName}`;
                    const g    = grad(name);
                    return (
                      <tr key={u.userInfo.id} className="hover:bg-surface-hover/40 transition-colors group">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                              {u.userInfo.profilePhoto ? (
                                <Image src={u.userInfo.profilePhoto} alt="" width={32} height={32}
                                  className="w-full h-full object-cover"
                                  unoptimized={u.userInfo.profilePhoto.includes("dicebear")} />
                              ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${g} flex items-center justify-center text-white text-[11px] font-bold`}>
                                  {u.userInfo.firstName[0]}{u.userInfo.lastName[0]}
                                </div>
                              )}
                            </div>
                            <Link href={`/users/${u.userInfo.id}`}
                              className="text-[13.5px] font-semibold text-ink hover:text-[#1A3FD0] transition-colors">
                              {name}
                            </Link>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-[13px] text-ink-secondary">{u.userContact?.email ?? "—"}</td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center h-5 px-2.5 bg-blue-50 text-[#1A3FD0] text-[11px] font-semibold rounded-full whitespace-nowrap">
                            {u.userInfo.occupation}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[13px] text-ink-tertiary whitespace-nowrap">
                          {u.userAddress ? `${u.userAddress.city}, ${u.userAddress.country}` : "—"}
                        </td>
                        <td className="px-5 py-3.5 text-[12.5px] text-ink-disabled whitespace-nowrap">
                          {new Date(u.userInfo.createdAt).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <DlBtn label="PDF"  loading={dlId === u.userInfo.id + "pdf"}  onClick={() => dl("pdf",  u)} red />
                            <DlBtn label="DOCX" loading={dlId === u.userInfo.id + "docx"} onClick={() => dl("docx", u)} />
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <button onClick={() => setDel(u)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-disabled hover:text-danger hover:bg-danger/8 transition-colors opacity-0 group-hover:opacity-100">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* ── Delete modal ── */}
      {delTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDel(null)} />
          <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-sm p-6 animate-slide-up">
            <h3 className="text-[16px] font-bold text-ink mb-1">Delete profile</h3>
            <p className="text-[13.5px] text-ink-secondary mb-6">
              Permanently delete <strong className="text-ink">{delTarget.userInfo.firstName} {delTarget.userInfo.lastName}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-2.5">
              <button onClick={() => setDel(null)}
                className="flex-1 h-10 rounded-xl border border-surface-border text-[13.5px] font-semibold text-ink hover:bg-surface-hover transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 h-10 rounded-xl bg-danger hover:bg-red-600 text-white text-[13.5px] font-semibold transition-colors disabled:opacity-60">
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Sub-components ── */

function StatCard({ value, label, icon, colorClass, bgClass }: {
  value: number; label: string; icon: React.ReactNode; colorClass: string; bgClass: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-surface-border shadow-card p-4 sm:p-5">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${bgClass} ${colorClass}`}>
        {icon}
      </div>
      <p className="text-[24px] sm:text-[28px] font-bold text-ink tracking-[-0.5px] leading-none mb-0.5">{value}</p>
      <p className="text-[12px] font-semibold text-ink-secondary leading-tight">{label}</p>
    </div>
  );
}

function DlBtn({ label, loading, onClick, red }: {
  label: string; loading: boolean; onClick(): void; red?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={loading}
      className={`inline-flex items-center gap-1.5 h-8 px-3 text-[12px] font-semibold rounded-xl border transition-colors disabled:opacity-50 ${
        red
          ? "bg-red-50 text-red-600 hover:bg-red-100 border-red-100"
          : "bg-blue-50 text-[#1A3FD0] hover:bg-blue-100 border-blue-100"
      }`}>
      {loading ? (
        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
      )}
      {label}
    </button>
  );
}

function SkeletonList() {
  return (
    <div className="divide-y divide-surface-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-4">
          <div className="w-10 h-10 rounded-xl bg-surface-tertiary animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 bg-surface-tertiary rounded animate-pulse w-32" />
            <div className="h-3 bg-surface-tertiary rounded animate-pulse w-48" />
          </div>
          <div className="h-8 w-16 bg-surface-tertiary rounded-xl animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center py-16 text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-surface-tertiary flex items-center justify-center mb-3">
        <svg className="w-7 h-7 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <p className="text-[14px] font-semibold text-ink mb-1">No profiles yet</p>
      <p className="text-[13px] text-ink-tertiary mb-4">Create profiles from the Profiles section.</p>
      <Link href="/users/new"
        className="inline-flex items-center gap-1.5 h-9 px-4 text-white text-[13px] font-semibold rounded-xl shadow-sm hover:opacity-90 transition-all"
        style={{ background: "linear-gradient(135deg,#1A3FD0 0%,#22C55E 100%)" }}>
        Create First Profile
      </Link>
    </div>
  );
}
