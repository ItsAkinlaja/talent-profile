"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers, deleteUser } from "@/store/slices/usersSlice";
import { useRouter } from "next/navigation";
import { FullUser } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

/* Deterministic avatar colour per name */
const AVATAR_COLORS = [
  "from-violet-500 to-indigo-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-400 to-orange-500",
  "from-fuchsia-500 to-purple-600",
];
function avatarColor(name: string) {
  const i = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[i];
}

export default function UsersPage() {
  const dispatch  = useAppDispatch();
  const router    = useRouter();
  const { users, loading, error } = useAppSelector((s) => s.users);
  const [deleteTarget, setDeleteTarget] = useState<FullUser | null>(null);
  const [deleting, setDeleting]         = useState(false);
  const [search, setSearch] = useState("");
  // Grid view only makes sense on larger screens — default table
  const [view, setView] = useState<"table" | "grid">("table");

  useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return [u.userInfo.firstName, u.userInfo.lastName, u.userContact?.email ?? "", u.userInfo.occupation]
      .some((v) => v.toLowerCase().includes(q));
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try { await dispatch(deleteUser(deleteTarget.userInfo.id)).unwrap(); setDeleteTarget(null); }
    finally { setDeleting(false); }
  };

  return (
    <>
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-ink tracking-[-0.4px] leading-tight">Profiles</h1>
          <p className="text-[13px] text-ink-tertiary mt-0.5">
            {loading && users.length === 0 ? "Loading…" : `${users.length} talent profile${users.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link href="/users/new"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-[13px] font-semibold shadow-brand hover:shadow-none transition-all duration-150 flex-shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Profile
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3.5 bg-danger/8 border border-danger/20 rounded-xl text-[13px] text-danger font-medium flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          {error}
        </div>
      )}

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-disabled pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, role…"
            className="w-full h-9 pl-9 pr-3 text-[16px] bg-white border border-surface-border rounded-lg outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-50 transition-all placeholder:text-ink-disabled" />
        </div>

        {/* View toggle — desktop only */}
        <div className="hidden sm:flex items-center bg-white border border-surface-border rounded-lg p-0.5 gap-0.5">
          {(["table", "grid"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={`w-8 h-7 rounded flex items-center justify-center transition-colors ${view === v ? "bg-brand-600 text-white" : "text-ink-tertiary hover:text-ink"}`}>
              {v === "table" ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      {loading && users.length === 0 ? (
        <Skeleton view={view} />
      ) : filtered.length === 0 ? (
        <Empty hasSearch={!!search} />
      ) : (
        <>
          {/* Mobile always uses table list */}
          <div className="sm:hidden">
            <MobileList users={filtered}
              onView={(id) => router.push(`/users/${id}`)}
              onEdit={(id) => router.push(`/users/${id}/edit`)}
              onDelete={(u) => setDeleteTarget(u)} />
          </div>
          {/* Desktop respects toggle */}
          <div className="hidden sm:block">
            {view === "table" ? (
              <TableView users={filtered}
                onView={(id) => router.push(`/users/${id}`)}
                onEdit={(id) => router.push(`/users/${id}/edit`)}
                onDelete={(u) => setDeleteTarget(u)} />
            ) : (
              <GridView users={filtered}
                onView={(id) => router.push(`/users/${id}`)}
                onEdit={(id) => router.push(`/users/${id}/edit`)}
                onDelete={(u) => setDeleteTarget(u)} />
            )}
          </div>
        </>
      )}

      {/* ── Delete modal ── */}
      {deleteTarget && (
        <DeleteModal
          name={`${deleteTarget.userInfo.firstName} ${deleteTarget.userInfo.lastName}`}
          deleting={deleting} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </>
  );
}

/* ─── Mobile list view ─── */
function MobileList({ users, onView, onEdit, onDelete }: {
  users: FullUser[]; onView(id: string): void; onEdit(id: string): void; onDelete(u: FullUser): void;
}) {
  return (
    <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden animate-fade-in">
      <div className="divide-y divide-surface-border">
        {users.map((u) => {
          const name = `${u.userInfo.firstName} ${u.userInfo.lastName}`;
          const grad = avatarColor(name);
          return (
            <div key={u.userInfo.id} className="flex items-center gap-3 px-4 py-3.5 active:bg-surface-hover transition-colors">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                {u.userInfo.profilePhoto && !u.userInfo.profilePhoto.includes("dicebear") ? (
                  <Image src={u.userInfo.profilePhoto} alt="" width={40} height={40} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-[13px] font-bold`}>
                    {u.userInfo.firstName[0]}{u.userInfo.lastName[0]}
                  </div>
                )}
              </div>

              {/* Info — tappable to view */}
              <button onClick={() => onView(u.userInfo.id)} className="flex-1 text-left min-w-0">
                <p className="text-[14px] font-semibold text-ink truncate">{name}</p>
                <p className="text-[12px] text-ink-tertiary truncate">{u.userInfo.occupation}</p>
                {u.userAddress && (
                  <p className="text-[11.5px] text-ink-disabled truncate mt-0.5">
                    {u.userAddress.city}, {u.userAddress.country}
                  </p>
                )}
              </button>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => onEdit(u.userInfo.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-tertiary hover:text-ink hover:bg-surface-tertiary transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button onClick={() => onDelete(u)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-disabled hover:text-danger hover:bg-danger/8 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Table view ─── */
function TableView({ users, onView, onEdit, onDelete }: {
  users: FullUser[]; onView(id:string):void; onEdit(id:string):void; onDelete(u:FullUser):void;
}) {
  return (
    <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-surface-border bg-surface-secondary/60">
              {["Profile", "Email", "Role", "Location", "Added", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-ink-disabled uppercase tracking-[0.6px] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {users.map((u) => {
              const name = `${u.userInfo.firstName} ${u.userInfo.lastName}`;
              const grad = avatarColor(name);
              return (
                <tr key={u.userInfo.id} className="group hover:bg-surface-hover/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <button onClick={() => onView(u.userInfo.id)} className="flex items-center gap-3 text-left">
                      <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                        {u.userInfo.profilePhoto ? (
                          <Image src={u.userInfo.profilePhoto} alt="" width={36} height={36}
                            className="w-full h-full object-cover"
                            unoptimized={u.userInfo.profilePhoto.includes('dicebear')} />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-[12px] font-bold`}>
                            {u.userInfo.firstName[0]}{u.userInfo.lastName[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-[13.5px] font-semibold text-ink hover:text-brand-600 transition-colors leading-tight">{name}</p>
                        <p className="text-[11.5px] text-ink-disabled">{u.userInfo.gender}</p>
                      </div>
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-ink-secondary">{u.userContact?.email ?? "—"}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center h-5 px-2.5 bg-brand-50 text-brand-700 text-[11px] font-semibold rounded-full whitespace-nowrap">
                      {u.userInfo.occupation}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-ink-tertiary whitespace-nowrap">
                    {u.userAddress ? `${u.userAddress.city}, ${u.userAddress.country}` : "—"}
                  </td>
                  <td className="px-5 py-3.5 text-[12.5px] text-ink-disabled whitespace-nowrap">
                    {new Date(u.userInfo.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ActionBtn onClick={() => onView(u.userInfo.id)} title="View"   icon="eye" />
                      <ActionBtn onClick={() => onEdit(u.userInfo.id)} title="Edit"   icon="edit" />
                      <ActionBtn onClick={() => onDelete(u)}           title="Delete" icon="trash" danger />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Grid view ─── */
function GridView({ users, onView, onEdit, onDelete }: {
  users: FullUser[]; onView(id:string):void; onEdit(id:string):void; onDelete(u:FullUser):void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
      {users.map((u) => {
        const name = `${u.userInfo.firstName} ${u.userInfo.lastName}`;
        const grad = avatarColor(name);
        return (
          <div key={u.userInfo.id}
            className="bg-white rounded-xl border border-surface-border shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
            {/* Card header strip */}
            <div className={`h-16 bg-gradient-to-r ${grad} relative`}>
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            </div>
            {/* Avatar overlapping strip */}
            <div className="px-4 pb-4">
              <div className="-mt-8 mb-3">
                <div className="w-14 h-14 rounded-xl ring-4 ring-white overflow-hidden shadow-card">
                  {u.userInfo.profilePhoto ? (
                    <Image src={u.userInfo.profilePhoto} alt="" width={56} height={56}
                      className="w-full h-full object-cover"
                      unoptimized={u.userInfo.profilePhoto.includes('dicebear')} />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-[15px] font-bold`}>
                      {u.userInfo.firstName[0]}{u.userInfo.lastName[0]}
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => onView(u.userInfo.id)} className="text-left w-full">
                <p className="text-[14px] font-bold text-ink hover:text-brand-600 transition-colors leading-tight">{name}</p>
                <p className="text-[12px] text-ink-tertiary mt-0.5">{u.userInfo.occupation}</p>
              </button>
              <div className="flex items-center gap-1.5 mt-2.5 text-[11.5px] text-ink-disabled">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="truncate">{u.userAddress ? `${u.userAddress.city}, ${u.userAddress.country}` : "—"}</span>
              </div>
              {/* Actions */}
              <div className="flex gap-1.5 mt-3.5 pt-3.5 border-t border-surface-border">
                <button onClick={() => onView(u.userInfo.id)}
                  className="flex-1 h-7 rounded-lg text-[12px] font-semibold bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors">View</button>
                <button onClick={() => onEdit(u.userInfo.id)}
                  className="h-7 px-3 rounded-lg text-[12px] font-semibold bg-surface-tertiary text-ink-secondary hover:bg-surface-border transition-colors">Edit</button>
                <button onClick={() => onDelete(u)}
                  className="h-7 w-7 rounded-lg flex items-center justify-center text-ink-disabled hover:text-danger hover:bg-danger/8 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Helpers ─── */
function ActionBtn({ onClick, title, icon, danger }: { onClick():void; title:string; icon:string; danger?:boolean }) {
  const SVG: Record<string, React.ReactNode> = {
    eye:   <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
    edit:  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>,
    trash: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>,
  };
  return (
    <button onClick={onClick} title={title}
      className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${danger ? "text-ink-disabled hover:text-danger hover:bg-danger/8" : "text-ink-disabled hover:text-ink hover:bg-surface-tertiary"}`}>
      {SVG[icon]}
    </button>
  );
}

function Skeleton({ view }: { view: "table" | "grid" }) {
  if (view === "grid") return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-surface-border overflow-hidden">
          <div className="h-16 bg-surface-tertiary animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="w-14 h-14 rounded-xl bg-surface-tertiary animate-pulse -mt-8 mb-3" />
            <div className="h-3.5 bg-surface-tertiary rounded animate-pulse w-28" />
            <div className="h-3 bg-surface-tertiary rounded animate-pulse w-20" />
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-surface-border last:border-0">
          <div className="w-9 h-9 rounded-xl bg-surface-tertiary animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-surface-tertiary rounded animate-pulse w-36" />
            <div className="h-2.5 bg-surface-tertiary rounded animate-pulse w-24" />
          </div>
          <div className="h-3 bg-surface-tertiary rounded animate-pulse w-32" />
          <div className="h-5 bg-surface-tertiary rounded-full animate-pulse w-20" />
        </div>
      ))}
    </div>
  );
}

function Empty({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-surface-border text-center">
      <div className="w-14 h-14 rounded-2xl bg-surface-tertiary flex items-center justify-center mb-4">
        {hasSearch ? (
          <svg className="w-7 h-7 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </div>
      <p className="text-[15px] font-bold text-ink mb-1">{hasSearch ? "No results" : "No profiles yet"}</p>
      <p className="text-[13px] text-ink-tertiary mb-5">{hasSearch ? "Try a different search term." : "Create your first talent profile to get started."}</p>
      {!hasSearch && (
        <Link href="/users/new" className="inline-flex items-center gap-1.5 h-9 px-4 bg-brand-600 hover:bg-brand-700 text-white text-[13px] font-semibold rounded-lg shadow-brand transition-all">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          New Profile
        </Link>
      )}
    </div>
  );
}

function DeleteModal({ name, deleting, onConfirm, onCancel }: { name:string; deleting:boolean; onConfirm():void; onCancel():void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-sm p-6 animate-slide-up">
        <div className="w-12 h-12 rounded-2xl bg-danger/10 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-[16px] font-bold text-ink mb-1">Delete profile</h3>
        <p className="text-[13.5px] text-ink-secondary mb-6 leading-relaxed">
          Permanently delete <strong className="text-ink font-semibold">{name}</strong>? All associated data will be removed. This cannot be undone.
        </p>
        <div className="flex gap-2.5">
          <button onClick={onCancel} className="flex-1 h-10 rounded-xl border border-surface-border text-[13.5px] font-semibold text-ink hover:bg-surface-hover transition-colors">Cancel</button>
          <button onClick={onConfirm} disabled={deleting} className="flex-1 h-10 rounded-xl bg-danger hover:bg-red-600 text-white text-[13.5px] font-semibold transition-colors disabled:opacity-60">
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
