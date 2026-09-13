import React from "react";
import { User, Cpu, Ticket, ListOrdered, Search, Scale, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

const steps = [
  { icon: User, label: "Farmer", labelHi: "किसान", color: "bg-blue-500" },
  { icon: Cpu, label: "Smart Slot", labelHi: "स्मार्ट स्लॉट", color: "bg-indigo-500" },
  { icon: Ticket, label: "Token", labelHi: "टोकन", color: "bg-purple-500" },
  { icon: ListOrdered, label: "Live Queue", labelHi: "लाइव कतार", color: "bg-yellow-500" },
  { icon: Search, label: "Inspection", labelHi: "निरीक्षण", color: "bg-orange-500" },
  { icon: Scale, label: "Weighing", labelHi: "तौल", color: "bg-cyan-500" },
  { icon: CheckCircle, label: "Completed", labelHi: "पूर्ण", color: "bg-green-500" },
];

export default function FlowDiagram() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-neutral-800 mb-3">{t.landing.flowTitle}</h2>
          <p className="text-neutral-500">End-to-end digital procurement journey</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center gap-3 group" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} />
                  </div>
                  <span className="text-xs font-semibold text-neutral-700 text-center max-w-[80px]">
                    {language === "hi" ? step.labelHi : step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <ArrowRight size={20} className="text-neutral-300 mx-1 hidden md:block flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}