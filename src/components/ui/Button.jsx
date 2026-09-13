import React from "react";

const variants = {
  primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg",
  secondary: "bg-white border-2 border-primary-600 text-primary-700 hover:bg-primary-50",
  ghost: "text-primary-600 hover:bg-primary-50",
  danger: "bg-red-600 hover:bg-red-700 text-white shadow-md",
  warning: "bg-secondary-500 hover:bg-secondary-600 text-white shadow-md",
  success: "bg-green-600 hover:bg-green-700 text-white shadow-md",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  icon: Icon,
  onClick,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-lg
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98]
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon size={size === "sm" ? 16 : 18} />
      ) : null}
      {children}
    </button>
  );
}