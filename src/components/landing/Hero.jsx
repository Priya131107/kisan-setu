import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sprout, BarChart3, Shield } from "lucide-react";
import Button from "../ui/Button";
import { useLanguage } from "../../hooks/useLanguage";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden gradient-hero text-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          

          {/* Title */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-primary-300">{t.appName}</span>
            <br />
            <span className="text-white">{t.landing.heroTitle}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-primary-100/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.landing.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-500 text-white font-semibold border border-primary-400/40 shadow-xl min-w-[200px] hover:shadow-glow transition-all" icon={Sprout}>
                {t.landing.farmerPortal}
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="lg" className="text-white border-2 border-white/30 hover:bg-white/10 min-w-[200px]" icon={BarChart3}>
                {t.landing.centreDashboard}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
            {[
              { value: "3", label: "States" },
              { value: "9", label: "Centres" },
              { value: "10+", label: "Crops" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-heading font-bold text-white">{stat.value}</p>
                <p className="text-xs text-primary-200 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
}