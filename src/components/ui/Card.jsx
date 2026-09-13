import React from "react";

const elevations = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  glow: "shadow-glow",
  none: "",
};

export default function Card({
  children,
  elevation = "md",
  className = "",
  hover = false,
  gradient = false,
  ...props
}) {
  return (
    <div
      className={`
        bg-white rounded-xl border border-neutral-100
        ${elevations[elevation] || elevations.md}
        ${hover ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300" : ""}
        ${gradient ? "bg-gradient-to-br from-white to-primary-50" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}