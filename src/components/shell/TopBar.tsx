"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";

const LOGO = "https://ik.imagekit.io/scmchurch/Talent%20Profile%20Monogram%20Logo.png";

const NAV_ITEMS = [
  {
    href: "/users",
    label: "Profiles",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/users/new",
    label: "New Profile",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    href: "/admin",
    label: "Admin Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

const LABELS: Record<string, string> = {
  "/users":     "Profiles",
  "/users/new": "New Profile",
  "/admin":     "Dashboard",
};

function getPageTitle(pathname: string) {
  if (LABELS[pathname]) return LABELS[pathname];
  if (pathname.endsWith("/edit"))          return "Edit Profile";
  if (pathname.match(/^\/users\/[^/]+$/)) return "View Profile";
  return "";
}

export default function TopBar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen] = useState(false);
  const title = getPageTitle(pathname);

  return (
    <>
      {/* ── Top bar ── */}
      <header className="h-14 flex items-center px-4 bg-white border-b border-surface-border sticky top-0 z-20 flex-shrink-0">

        {/* Mobile: hamburger only — no logo, no page title */}
        <div className="flex md:hidden items-center flex-1">
          <button
            onClick={() => setOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-ink hover:bg-surface-hover transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop: breadcrumb */}
        <div className="hidden md:flex items-center gap-1.5 text-[13px]">
          {pathname !== "/users" && pathname !== "/admin" && (
            <>
              <Link
                href={pathname.startsWith("/admin") ? "/admin" : "/users"}
                className="text-ink-disabled hover:text-ink transition-colors font-medium"
              >
                {pathname.startsWith("/admin") ? "Dashboard" : "Profiles"}
              </Link>
              <svg className="w-3.5 h-3.5 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
          <span className="font-semibold text-ink">{title}</span>
        </div>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col animate-slide-in">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
              <div className="flex items-center gap-2.5">
                <Image src={LOGO} alt="" width={32} height={32} className="object-contain" unoptimized />
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[14px] font-extrabold" style={{ color: "#1A3FD0" }}>Talent</span>
                    <span className="text-[14px] font-extrabold" style={{ color: "#22C55E" }}>Profile</span>
                  </div>
                  <p className="text-[10px] text-ink-disabled font-medium tracking-wide">Capture. Manage. Showcase.</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-tertiary hover:bg-surface-hover transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              <p className="px-3 mb-2 text-[10px] font-bold text-ink-disabled uppercase tracking-[0.8px]">Navigation</p>
              {NAV_ITEMS.map((item) => {
                const active =
                  item.href === "/users"
                    ? pathname === "/users"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium transition-all",
                      active
                        ? "text-white"
                        : "text-ink-secondary hover:bg-surface-hover hover:text-ink"
                    )}
                    style={active ? { background: "linear-gradient(135deg,#1A3FD0 0%,#22C55E 100%)" } : {}}
                  >
                    <span className={active ? "text-white" : "text-ink-tertiary"}>
                      {item.icon}
                    </span>
                    {item.label}
                    {active && (
                      <svg className="w-4 h-4 ml-auto text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer footer — user */}
            <div className="p-4 border-t border-surface-border">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#1A3FD0 0%,#22C55E 100%)" }}
                >
                  <span className="text-[11px] font-bold text-white">AD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-ink">Admin</p>
                  <p className="text-[11px] text-ink-disabled truncate">admin@talentprofile.com</p>
                </div>
                <button
                  onClick={() => { setOpen(false); router.push("/login"); }}
                  className="text-ink-disabled hover:text-danger transition-colors p-1"
                  title="Sign out"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
