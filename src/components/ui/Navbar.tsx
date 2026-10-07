"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navLinks = [
  { href: "/users", label: "Users" },
  { href: "/admin", label: "Admin Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#1e3a5f] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/users" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TP</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              TalentProfile
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  pathname.startsWith(link.href)
                    ? "bg-blue-600 text-white"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
