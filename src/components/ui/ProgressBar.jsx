import React from "react";

export default function ProgressBar({ value = 0, max = 100, label, showPercent = true, color = "primary", className = "" }) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    primary: "bg-primary-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between text-sm">
          {label && <span className="text-neutral-600">{label}</span>}
          {showPercent && <span className="font-medium text-neutral-700">{Math.round(percent)}%</span>}
        </div>
      )}
      <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colors[color] || colors.primary}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}