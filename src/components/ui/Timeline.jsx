import React from "react";
import { Check, Clock, Circle } from "lucide-react";

export default function Timeline({ steps = [], currentStep = 0, className = "" }) {
  return (
    <div className={`space-y-0 ${className}`}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        const isPending = idx > currentStep;

        return (
          <div key={step.id || idx} className="flex gap-4">
            {/* Line & Dot */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${isCompleted ? "bg-primary-600 border-primary-600 text-white" : ""}
                  ${isCurrent ? "bg-primary-100 border-primary-600 text-primary-700 ring-4 ring-primary-100" : ""}
                  ${isPending ? "bg-neutral-100 border-neutral-300 text-neutral-400" : ""}
                `}
              >
                {isCompleted ? <Check size={18} /> : isCurrent ? <Clock size={18} /> : <Circle size={14} />}
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-0.5 h-12 ${isCompleted ? "bg-primary-600" : "bg-neutral-200"}`} />
              )}
            </div>

            {/* Content */}
            <div className={`pb-8 pt-2 ${isPending ? "opacity-50" : ""}`}>
              <p className={`text-sm font-semibold ${isCurrent ? "text-primary-700" : isCompleted ? "text-neutral-800" : "text-neutral-500"}`}>
                {step.label}
              </p>
              {step.sublabel && (
                <p className="text-xs text-neutral-500 mt-0.5">{step.sublabel}</p>
              )}
              {step.time && (
                <p className="text-xs text-neutral-400 mt-0.5">{step.time}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}