"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-[12.5px] font-semibold text-ink mb-1.5 tracking-[-0.1px]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-disabled pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full h-11 text-[16px] text-ink bg-white border rounded-xl outline-none transition-all duration-150 placeholder:text-ink-disabled",
            icon ? "pl-10 pr-4" : "px-4",
            error
              ? "border-danger/60 focus:border-danger focus:ring-2 focus:ring-danger/10 bg-danger/[0.02]"
              : "border-surface-border focus:border-brand-400 focus:ring-2 focus:ring-brand-50 hover:border-ink-disabled",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-[11.5px] text-danger font-medium flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1 text-[11.5px] text-ink-disabled">{hint}</p>
      )}
    </div>
  )
);
Input.displayName = "Input";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-[12.5px] font-semibold text-ink mb-1.5 tracking-[-0.1px]">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={clsx(
          "w-full h-11 px-4 text-[16px] text-ink bg-white border rounded-xl outline-none transition-all duration-150 appearance-none cursor-pointer",
          error
            ? "border-danger/60 focus:border-danger focus:ring-2 focus:ring-danger/10"
            : "border-surface-border focus:border-brand-400 focus:ring-2 focus:ring-brand-50 hover:border-ink-disabled",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1.5 text-[11.5px] text-danger font-medium flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
);
Select.displayName = "Select";
