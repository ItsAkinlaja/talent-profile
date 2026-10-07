"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const NAV = [
  { href: "/users",     label: "Profiles",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  { href: "/users/new", label: "New",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg> },
  { href: "/admin",     label: "Dashboard",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-surface-border">
      <div className="flex items-center justify-around px-2 py-1 safe-area-pb">
        {NAV.map((item) => {
          const active = item.href === "/users"
            ? pathname === "/users"
            : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={clsx(
                "flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-all duration-150",
                active ? "text-brand-600" : "text-ink-disabled hover:text-ink"
              )}>
              <div className={clsx("transition-transform duration-150", active && "scale-110")}>
                {item.icon}
              </div>
              <span className={clsx("text-[10px] font-semibold", active && "text-brand-600")}>
                {item.label}
              </span>
              {active && <div className="w-1 h-1 rounded-full bg-brand-600 mt-0.5" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
