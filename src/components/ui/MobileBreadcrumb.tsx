"use client";

import { useRouter } from "next/navigation";

interface Props {
  back?: string;        // href to go back to
  backLabel?: string;   // label for the back link
  title: string;        // current page title
}

export default function MobileBreadcrumb({ back, backLabel = "Back", title }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 mb-5 md:hidden">
      {back && (
        <button
          onClick={() => router.push(back)}
          className="flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-surface-border text-ink-secondary hover:bg-surface-hover active:scale-95 transition-all flex-shrink-0 shadow-xs"
          aria-label={backLabel}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div className="flex items-center gap-1.5 text-[13px] min-w-0">
        {back && (
          <>
            <button
              onClick={() => router.push(back)}
              className="text-ink-disabled hover:text-ink transition-colors font-medium truncate"
            >
              {backLabel}
            </button>
            <svg className="w-3 h-3 text-ink-disabled flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
        <span className="font-semibold text-ink truncate">{title}</span>
      </div>
    </div>
  );
}
