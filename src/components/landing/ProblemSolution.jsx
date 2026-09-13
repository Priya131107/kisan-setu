import React from "react";
import { AlertTriangle, Lightbulb, Clock, Eye, Smartphone, TrendingUp } from "lucide-react";
import Card from "../ui/Card";
import { useLanguage } from "../../hooks/useLanguage";

export default function ProblemSolution() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Problem */}
          <Card elevation="lg" className="p-8 border-l-4 border-l-red-500 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-neutral-800">{t.landing.problemTitle}</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed mb-6">{t.landing.problemDesc}</p>
            <div className="space-y-3">
              {[
                { icon: Clock, text: "Average 6-8 hours waiting at mandis" },
                { icon: Eye, text: "Zero visibility into queue status" },
                { icon: AlertTriangle, text: "No digital records of transactions" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-neutral-600">
                  <item.icon size={16} className="text-red-500 flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Solution */}
          <Card elevation="lg" className="p-8 border-l-4 border-l-primary-500 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Lightbulb size={24} className="text-primary-600" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-neutral-800">{t.landing.solutionTitle}</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed mb-6">{t.landing.solutionDesc}</p>
            <div className="space-y-3">
              {[
                { icon: Smartphone, text: "Digital slot booking via mobile" },
                { icon: Eye, text: "Real-time queue tracking" },
                { icon: TrendingUp, text: "Complete digital audit trail" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-neutral-600">
                  <item.icon size={16} className="text-primary-500 flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}