export default function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = { sm: "w-4 h-4 border-2", md: "w-7 h-7 border-2", lg: "w-10 h-10 border-[3px]" }[size];
  return (
    <div className="flex items-center justify-center">
      <div className={`${s} border-brand-200 border-t-brand-600 rounded-full animate-spin`} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[360px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-brand-100 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-[13px] text-ink-tertiary font-medium">Loading…</p>
      </div>
    </div>
  );
}
