"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import Image from "next/image";

const LOGO = "https://ik.imagekit.io/scmchurch/Talent%20Profile%20Monogram%20Logo.png";

const NAV = [
  {
    group: "WORKSPACE",
    items: [
      { href: "/users",
        label: "Profiles",
        icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
      { href: "/users/new",
        label: "New Profile",
        icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg> },
    ],
  },
  {
    group: "ADMIN",
    items: [
      { href: "/admin",
        label: "Dashboard",
        icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  return (
    <aside className="w-[220px] flex-shrink-0 h-screen sticky top-0 flex flex-col bg-white border-r border-surface-border">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-surface-border flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <Image src={LOGO} alt="Talent Profile" width={30} height={30} className="object-contain flex-shrink-0" />
          <div className="flex items-baseline gap-1 leading-none">
            <span className="text-[13.5px] font-extrabold tracking-[-0.2px]" style={{ color: "#1a3a6b" }}>Talent</span>
            <span className="text-[13.5px] font-extrabold tracking-[-0.2px]" style={{ color: "#16a34a" }}>Profile</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
        {NAV.map((section) => (
          <div key={section.group} className="mb-5">
            <p className="px-2.5 mb-1.5 text-[10px] font-bold text-ink-disabled tracking-[0.9px] uppercase">
              {section.group}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = item.href === "/users"
                  ? pathname === "/users"
                  : pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href}
                    className={clsx(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-100 group",
                      active
                        ? "bg-[#f0fdf4] text-[#15803d]"
                        : "text-ink-secondary hover:bg-surface-hover hover:text-ink"
                    )}>
                    <span className={clsx("transition-colors flex-shrink-0",
                      active ? "text-[#22C55E]" : "text-ink-tertiary group-hover:text-ink-secondary")}>
                      {item.icon}
                    </span>
                    {item.label}
                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#22C55E]" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="p-3 border-t border-surface-border flex-shrink-0">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-surface-hover cursor-pointer transition-colors group">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs"
            style={{ background: "linear-gradient(135deg, #1A3FD0 0%, #22C55E 100%)" }}>
            <span className="text-[10px] font-bold text-white">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-ink truncate leading-tight">Admin</p>
            <p className="text-[10.5px] text-ink-disabled truncate">admin@talentprofile.com</p>
          </div>
          <button onClick={() => router.push("/login")} title="Sign out"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-ink-disabled hover:text-danger p-1 rounded">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
