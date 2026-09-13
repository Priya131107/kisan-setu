import React from "react";

const variants = {
  default: "bg-neutral-100 text-neutral-700",
  primary: "bg-primary-100 text-primary-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  purple: "bg-purple-100 text-purple-800",
  demo: "bg-secondary-400 text-secondary-900 font-bold animate-pulse-slow",
};

export default function Badge({ children, variant = "default", className = "", ...props }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}