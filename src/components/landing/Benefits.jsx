import React from "react";
import { Clock, Shield, Smartphone, BarChart3, Globe, Zap } from "lucide-react";
import Card from "../ui/Card";
import { useLanguage } from "../../hooks/useLanguage";

const benefits = [
  { icon: Clock, title: "Reduced Wait Time", titleHi: "कम प्रतीक्षा समय", desc: "Pre-booked slots eliminate hours of waiting at procurement centres.", color: "text-blue-600", bg: "bg-blue-100" },
  { icon: Shield, title: "Full Transparency", titleHi: "पूर्ण पारदर्शिता", desc: "Real-time tracking of every step from registration to completion.", color: "text-green-600", bg: "bg-green-100" },
  { icon: Smartphone, title: "Mobile First", titleHi: "मोबाइल फर्स्ट", desc: "Book slots, track queues, and get notifications on your phone.", color: "text-purple-600", bg: "bg-purple-100" },
  { icon: BarChart3, title: "Data-Driven", titleHi: "डेटा-संचालित", desc: "Analytics help centres optimize capacity and reduce bottlenecks.", color: "text-orange-600", bg: "bg-orange-100" },
  { icon: Globe, title: "Multilingual", titleHi: "बहुभाषी", desc: "Available in English and Hindi with IVR support for all farmers.", color: "text-cyan-600", bg: "bg-cyan-100" },
  { icon: Zap, title: "Smart Automation", titleHi: "स्मार्ट ऑटोमेशन", desc: "AI-powered slot recommendations based on centre load and patterns.", color: "text-yellow-600", bg: "bg-yellow-100" },
];

export default function Benefits() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-neutral-800 mb-3">{t.landing.benefitsTitle}</h2>
          <p className="text-neutral-500 max-w-xl mx-auto">Empowering farmers with technology for a smoother procurement experience</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <Card key={b.title} elevation="sm" hover className="p-6">
                <div className={`w-12 h-12 ${b.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={24} className={b.color} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-2">
                  {language === "hi" ? b.titleHi : b.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{b.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}