"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LOGO     = "https://ik.imagekit.io/scmchurch/Talent%20Profile%20Monogram%20Logo.png";
const HERO_IMG = "https://ik.imagekit.io/scmchurch/WhatsApp%20Image%202026-10-06%20at%2020.03.17.jpeg";

export default function LoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    if (email === "admin@talentprofile.com" && password === "admin123") {
      router.push("/users");
    } else {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <>
      {/* ════════════════════════════════════════════════
          MOBILE  — image bg, form sits directly on it
      ════════════════════════════════════════════════ */}
      <div className="lg:hidden min-h-screen relative flex flex-col justify-end overflow-hidden">
        {/* Background image — fills full screen */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMG} alt="" fill
            className="object-cover object-center" priority unoptimized
          />
          {/* Bottom-heavy overlay so text is readable over image */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(10,20,70,0.55) 40%, rgba(5,10,40,0.92) 100%)" }} />
        </div>

        {/* Content — anchored to bottom, part of the image */}
        <div className="relative z-10 px-7 pb-12 pt-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-7">
            <Image src={LOGO} alt="Talent Profile" width={80} height={80}
              className="object-contain drop-shadow-lg" priority unoptimized />
            <div className="mt-2.5 flex items-baseline gap-1">
              <span className="text-[20px] font-extrabold text-white tracking-tight">Talent</span>
              <span className="text-[20px] font-extrabold tracking-tight" style={{ color: "#22C55E" }}>Profile</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-[23px] font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="text-[13px] text-white/70 mt-1">Log in to your Talent Profile account</p>
          </div>

          <FormBody
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            remember={remember} setRemember={setRemember}
            showPw={showPw} setShowPw={setShowPw}
            loading={loading} error={error}
            onSubmit={handleSubmit}
            glass
          />

          <p className="text-center text-[11px] text-white/25 font-medium mt-6">
            © 2026 TalentProfile · Capture. Manage. Showcase.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          DESKTOP  — left form panel + right image panel
      ════════════════════════════════════════════════ */}
      <div className="hidden lg:flex min-h-screen bg-white">
        {/* Left — white form panel */}
        <div className="w-[480px] xl:w-[520px] flex-shrink-0 flex flex-col justify-center px-12 xl:px-16 py-12 bg-white">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Image src={LOGO} alt="Talent Profile" width={80} height={80}
              className="object-contain" priority unoptimized />
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-[19px] font-extrabold tracking-tight" style={{ color: "#1A3FD0" }}>Talent</span>
              <span className="text-[19px] font-extrabold tracking-tight" style={{ color: "#22C55E" }}>Profile</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[26px] font-extrabold text-gray-900 tracking-tight mb-1.5">
              Welcome Back
            </h1>
            <p className="text-[14px] text-gray-500">Log in to your Talent Profile account</p>
          </div>

          <FormBody
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            remember={remember} setRemember={setRemember}
            showPw={showPw} setShowPw={setShowPw}
            loading={loading} error={error}
            onSubmit={handleSubmit}
            glass={false}
          />
        </div>

        {/* Right — full-bleed image */}
        <div className="flex-1 relative overflow-hidden">
          <Image
            src={HERO_IMG} alt="" fill
            className="object-cover object-center"
            priority unoptimized
          />
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────
   Shared form — renders in both glass (mobile) and
   white (desktop) contexts via the `glass` prop
───────────────────────────────────────────────────── */
function FormBody({
  email, setEmail, password, setPassword,
  remember, setRemember, showPw, setShowPw,
  loading, error, onSubmit, glass,
}: {
  email: string;        setEmail: (v: string) => void;
  password: string;     setPassword: (v: string) => void;
  remember: boolean;    setRemember: (v: boolean) => void;
  showPw: boolean;      setShowPw: (v: boolean) => void;
  loading: boolean;     error: string;
  onSubmit: (e: React.FormEvent) => void;
  glass: boolean;
}) {
  const label   = glass
    ? "block text-[12px] font-bold text-white mb-1.5 tracking-widest uppercase"
    : "block text-[13px] font-semibold text-gray-700 mb-1.5";

  const inputCls = glass
    ? "w-full h-12 pl-10 pr-4 text-[16px] text-white bg-white/25 border border-white/40 rounded-xl outline-none placeholder:text-white/60 focus:border-[#22C55E] focus:bg-white/30 transition-all duration-200"
    : "w-full h-12 pl-10 pr-4 text-[16px] text-gray-800 border border-gray-200 rounded-xl outline-none bg-white transition-all placeholder:text-gray-400 focus:border-[#1A3FD0] focus:ring-3 focus:ring-blue-50";

  const iconCls  = glass ? "text-white/70" : "text-gray-400";
  const subTextCls = glass ? "text-white/90" : "text-gray-600";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label className={label}>Email Address</label>
        <div className="relative">
          <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${iconCls}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" autoComplete="email" className={inputCls} />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={label.replace("mb-1.5", "")}>Password</label>
          <button type="button" className="text-[12px] font-semibold hover:underline transition-colors"
            style={{ color: "#22C55E" }}>
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${iconCls}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <input type={showPw ? "text" : "password"} value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" autoComplete="current-password"
            className={inputCls.replace("pr-4", "pr-11")} />
          <button type="button" onClick={() => setShowPw(!showPw)} tabIndex={-1}
            className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${iconCls} hover:opacity-80`}>
            {showPw ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-2.5">
        <div onClick={() => setRemember(!remember)}
          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
            remember ? "bg-[#22C55E] border-[#22C55E]" : glass ? "border-white/50 bg-white/20" : "border-gray-300 bg-white"
          }`}>
          {remember && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          )}
        </div>
        <span className={`text-[13px] select-none cursor-pointer ${subTextCls}`}
          onClick={() => setRemember(!remember)}>
          Remember me
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className={`flex items-center gap-2 p-3 rounded-xl text-[13px] ${
          glass
            ? "bg-red-500/20 border border-red-400/30 text-red-300"
            : "bg-red-50 border border-red-200 text-red-600"
        }`}>
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          {error}
        </div>
      )}

      {/* Submit */}
      <button type="submit" disabled={loading}
        className="w-full h-12 rounded-xl text-white text-[15px] font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
        style={{
          background: "linear-gradient(135deg, #1A3FD0 0%, #22C55E 100%)",
          boxShadow: "0 4px 18px rgba(34,197,94,0.25)",
        }}>
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Signing in…
          </>
        ) : (
          <>
            Log In
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
