"use client";

import Image from "next/image";
import { FullUser } from "@/lib/types";

/* ─────────────────────────────────────────────────────────
   Colour palette derived from name (deterministic)
───────────────────────────────────────────────────────── */
const PALETTES = [
  { bg: "from-violet-600 to-indigo-700",   text: "#EEF2FF", accent: "#818CF8" },
  { bg: "from-blue-600 to-cyan-600",        text: "#EFF6FF", accent: "#93C5FD" },
  { bg: "from-emerald-600 to-teal-700",     text: "#ECFDF5", accent: "#6EE7B7" },
  { bg: "from-rose-600 to-pink-700",        text: "#FFF1F2", accent: "#FDA4AF" },
  { bg: "from-amber-500 to-orange-600",     text: "#FFFBEB", accent: "#FCD34D" },
  { bg: "from-slate-700 to-slate-900",      text: "#F8FAFC", accent: "#94A3B8" },
];

function getPalette(name: string) {
  const i = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTES.length;
  return PALETTES[i];
}

/* ─────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────── */
export default function ResumeView({ user }: { user: FullUser }) {
  const { userInfo, userContact, userAddress, userAcademics } = user;
  const fullName  = `${userInfo.firstName} ${userInfo.lastName}`;
  const initials  = `${userInfo.firstName[0]}${userInfo.lastName[0]}`;
  const palette   = getPalette(fullName);
  const dob       = new Date(userInfo.dob);
  const age       = new Date().getFullYear() - dob.getFullYear();

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-elevated border border-surface-border animate-scale-in">

      {/* ══════════════════════════════════════════
          HERO HEADER
      ══════════════════════════════════════════ */}
      <div className={`relative bg-gradient-to-br ${palette.bg} overflow-hidden`}>
        {/* Decorative rings */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/10" />
        <div className="absolute -top-8 -right-8  w-40 h-40 rounded-full border border-white/10" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-white/8" />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

        <div className="relative px-6 sm:px-8 pt-8 pb-10">
          {/* Avatar + name row */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-lg">
                {userInfo.profilePhoto ? (
                  <Image
                    src={userInfo.profilePhoto}
                    alt={fullName}
                    width={112} height={112}
                    className="w-full h-full object-cover"
                    unoptimized={userInfo.profilePhoto.includes('dicebear')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white"
                    style={{ background: 'rgba(0,0,0,0.25)' }}>
                    {initials}
                  </div>
                )}
              </div>
              {/* Online dot */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />
            </div>

            {/* Identity */}
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-flex items-center h-5 px-2.5 rounded-full text-[10.5px] font-semibold tracking-wide"
                  style={{ background: 'rgba(255,255,255,0.18)', color: palette.text }}>
                  {userInfo.gender}
                </span>
                {userAddress?.city && (
                  <span className="inline-flex items-center gap-1 h-5 text-[11px]" style={{ color: `${palette.text}99` }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {userAddress.city}, {userAddress.country}
                  </span>
                )}
              </div>
              <h1 className="text-[26px] sm:text-[32px] font-bold text-white leading-none tracking-[-0.5px] mb-2">
                {fullName}
              </h1>
              <p className="text-[15px] font-medium" style={{ color: `${palette.text}CC` }}>
                {userInfo.occupation}
              </p>
            </div>
          </div>

          {/* Contact pills row */}
          <div className="flex flex-wrap gap-2 mt-6">
            {userContact?.email && (
              <a href={`mailto:${userContact.email}`}
                className="inline-flex items-center gap-2 h-8 px-3.5 rounded-full text-[12px] font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.15)', color: palette.text, backdropFilter: 'blur(8px)' }}>
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="truncate max-w-[180px]">{userContact.email}</span>
              </a>
            )}
            {userContact?.phoneNumber && (
              <span className="inline-flex items-center gap-2 h-8 px-3.5 rounded-full text-[12px] font-medium"
                style={{ background: 'rgba(255,255,255,0.15)', color: palette.text }}>
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {userContact.phoneNumber}
              </span>
            )}
            {userContact?.linkedInUrl && (
              <a href={userContact.linkedInUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-8 px-3.5 rounded-full text-[12px] font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.15)', color: palette.text }}>
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white"
          style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0', transform: 'scaleX(1.05)' }} />
      </div>

      {/* ══════════════════════════════════════════
          BODY — two-column on md+
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">

        {/* ── LEFT SIDEBAR ── */}
        <div className="md:border-r border-surface-border p-6 space-y-7 bg-surface-secondary/40">

          {/* About */}
          <SideSection title="About" accent={palette.accent}>
            <div className="space-y-3">
              <InfoRow label="Date of Birth"
                value={dob.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} />
              <InfoRow label="Age" value={`${age} years`} />
              <InfoRow label="Occupation" value={userInfo.occupation} />
            </div>
          </SideSection>

          {/* Contact */}
          {userContact && (
            <SideSection title="Contact" accent={palette.accent}>
              <div className="space-y-3">
                <ContactRow icon="phone" value={userContact.phoneNumber} />
                <ContactRow icon="email" value={userContact.email} href={`mailto:${userContact.email}`} />
                {userContact.fax && <ContactRow icon="fax" value={userContact.fax} label="Fax" />}
              </div>
            </SideSection>
          )}

          {/* Address */}
          {userAddress && (
            <SideSection title="Location" accent={palette.accent}>
              <div className="flex gap-2.5">
                <div className="mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div className="text-[13px] text-ink-secondary leading-relaxed">
                  <p className="font-medium text-ink">{userAddress.address}</p>
                  <p>{userAddress.city}, {userAddress.state}</p>
                  <p>{userAddress.country} · {userAddress.zipCode}</p>
                </div>
              </div>
            </SideSection>
          )}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="p-6 sm:p-8 space-y-8">

          {/* Education timeline */}
          <MainSection title="Education">
            {userAcademics && userAcademics.length > 0 ? (
              <div className="space-y-0">
                {userAcademics.map((acad, i) => (
                  <div key={acad.id || i} className="flex gap-4 group">
                    {/* Timeline spine */}
                    <div className="flex flex-col items-center pt-1 flex-shrink-0 w-5">
                      <div className="w-3 h-3 rounded-full border-2 border-brand-500 bg-white group-first:bg-brand-500 transition-colors" />
                      {i < (userAcademics?.length ?? 0) - 1 && (
                        <div className="w-0.5 flex-1 bg-surface-border mt-1" style={{ minHeight: 32 }} />
                      )}
                    </div>

                    {/* Card */}
                    <div className={`flex-1 pb-6 ${i === (userAcademics?.length ?? 0) - 1 ? 'pb-0' : ''}`}>
                      <div className="bg-surface-secondary/60 hover:bg-white border border-surface-border hover:border-brand-200 rounded-xl p-4 transition-all duration-200 hover:shadow-card group-hover:translate-x-0.5">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <h4 className="text-[14px] font-bold text-ink">{acad.schoolName}</h4>
                            {acad.degree && (
                              <p className="text-[13px] text-brand-600 font-semibold mt-0.5">
                                {acad.degree}
                              </p>
                            )}
                            {acad.fieldOfStudy && (
                              <p className="text-[12.5px] text-ink-tertiary mt-0.5">{acad.fieldOfStudy}</p>
                            )}
                          </div>
                          {(acad.startYear || acad.endYear) && (
                            <span className="flex-shrink-0 inline-flex items-center h-6 px-2.5 bg-brand-50 text-brand-700 text-[11px] font-semibold rounded-full">
                              {acad.startYear ?? "?"} – {acad.endYear ?? "Present"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState label="No education records added" />
            )}
          </MainSection>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-3">
            <StatPill
              label="Schools"
              value={String(userAcademics?.length ?? 0)}
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>}
              color="bg-brand-50 text-brand-700"
            />
            <StatPill
              label="Years Exp."
              value={`${Math.max(0, new Date().getFullYear() - (userAcademics?.[0]?.endYear ?? new Date().getFullYear()))}+`}
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
              color="bg-emerald-50 text-emerald-700"
            />
            <StatPill
              label="City"
              value={userAddress?.city ?? "—"}
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
              color="bg-amber-50 text-amber-700"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */

function SideSection({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3.5">
        <div className="w-1 h-4 rounded-full" style={{ background: accent ?? '#6366F1' }} />
        <h3 className="text-[11px] font-bold text-ink-disabled uppercase tracking-[1px]">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-5 h-5 rounded-md bg-brand-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-3 h-3 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        </div>
        <h3 className="text-[16px] font-bold text-ink tracking-[-0.2px]">{title}</h3>
        <div className="flex-1 h-px bg-surface-border" />
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10.5px] font-semibold text-ink-disabled uppercase tracking-[0.6px] mb-0.5">{label}</p>
      <p className="text-[13px] font-medium text-ink-secondary">{value}</p>
    </div>
  );
}

function ContactRow({ icon, value, href, label }: { icon: string; value: string; href?: string; label?: string }) {
  const icons: Record<string, React.ReactNode> = {
    phone: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
    email: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    fax:   <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>,
  };

  const inner = (
    <div className="flex items-center gap-2.5 group/row">
      <div className="w-7 h-7 rounded-lg bg-surface-tertiary group-hover/row:bg-brand-50 flex items-center justify-center flex-shrink-0 text-ink-tertiary group-hover/row:text-brand-600 transition-colors">
        {icons[icon]}
      </div>
      <div className="min-w-0">
        {label && <p className="text-[10px] font-semibold text-ink-disabled uppercase tracking-[0.5px]">{label}</p>}
        <p className="text-[12.5px] text-ink-secondary font-medium truncate">{value}</p>
      </div>
    </div>
  );

  if (href) return <a href={href} className="block">{inner}</a>;
  return <div>{inner}</div>;
}

function StatPill({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className={`rounded-xl p-3.5 ${color}`}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-[0.5px] opacity-70">{label}</span>
      </div>
      <p className="text-[18px] font-bold tracking-[-0.5px] leading-none">{value}</p>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-6 px-4 bg-surface-secondary rounded-xl border border-dashed border-surface-border">
      <div className="w-8 h-8 rounded-lg bg-surface-tertiary flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
      </div>
      <p className="text-[13px] text-ink-disabled italic">{label}</p>
    </div>
  );
}
