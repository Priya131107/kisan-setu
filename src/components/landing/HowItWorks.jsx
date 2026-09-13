import React from "react";
import { Smartphone, CalendarCheck, Ticket, CheckCircle } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

const steps = [
  { icon: Smartphone, title: "Register & Login", titleHi: "à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¤° à¤•à¤°à¥‡à¤‚", desc: "Simple mobile number login with OTP verification.", num: "01" },
  { icon: CalendarCheck, title: "Book a Slot", titleHi: "à¤¸à¥à¤²à¥‰à¤Ÿ à¤¬à¥à¤• à¤•à¤°à¥‡à¤‚", desc: "Choose your centre, crop, date, and time slot with smart recommendations.", num: "02" },
  { icon: Ticket, title: "Get Token", titleHi: "à¤Ÿà¥‹à¤•à¤¨ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤•à¤°à¥‡à¤‚", desc: "Receive a unique token and track your queue position in real-time.", num: "03" },
  { icon: CheckCircle, title: "Complete Process", titleHi: "à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤ªà¥‚à¤°à¥à¤£ à¤•à¤°à¥‡à¤‚", desc: "Quality inspection, weighing, and payment â€” all tracked digitally.", num: "04" },
];

export default function HowItWorks() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-3">{t.landing.howItWorks}</h2>
          <p className="text-primary-200">Four simple steps to a hassle-free procurement experience</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                    <Icon size={32} className="text-primary-200" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-400 text-secondary-900 rounded-full flex items-center justify-center text-xs font-bold">{step.num}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {language === "hi" ? step.titleHi : step.title}
                </h3>
                <p className="text-sm text-primary-200/80 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}