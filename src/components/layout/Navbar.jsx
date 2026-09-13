import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sprout, Home, LayoutDashboard, CalendarPlus, ListOrdered, Bell,
  MapPin, Phone, LogIn, LogOut, Menu, X, Globe, Shield
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { useDemoMode } from "../../hooks/useDemoMode";
import farmerService from "../../services/farmerService";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { viewMode, switchView } = useDemoMode();
  const location = useLocation();
  const navigate = useNavigate();
  const farmer = farmerService.getCurrentFarmer();

  const handleLogout = () => {
    farmerService.logout();
    navigate("/");
    setMobileOpen(false);
  };

  const farmerLinks = [
    { to: "/", label: t.nav.home, icon: Home },
    { to: "/farmer/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { to: "/farmer/book-slot", label: t.nav.bookSlot, icon: CalendarPlus },
    { to: "/notifications", label: t.nav.notifications, icon: Bell },
    { to: "/centres", label: t.nav.centres, icon: MapPin },
    { to: "/ivr-demo", label: t.nav.ivrDemo, icon: Phone },
  ];

  const adminLinks = [
    { to: "/", label: t.nav.home, icon: Home },
    { to: "/admin/dashboard", label: t.nav.admin, icon: Shield },
    { to: "/notifications", label: t.nav.notifications, icon: Bell },
    { to: "/centres", label: t.nav.centres, icon: MapPin },
  ];

  const links = viewMode === "admin" ? adminLinks : farmerLinks;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-neutral-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
              <Sprout size={20} className="text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-neutral-800">{t.appName}</span>
              <span className="hidden sm:block text-[10px] text-neutral-400 -mt-1">à¤•à¤¿à¤¸à¤¾à¤¨ à¤¸à¥‡à¤¤à¥</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* View Switch */}
            <button
              onClick={() => switchView(viewMode === "farmer" ? "admin" : "farmer")}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
            >
              <Shield size={14} />
              {viewMode === "farmer" ? "Admin" : "Farmer"}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
            >
              <Globe size={14} />
              {language === "en" ? "à¤¹à¤¿à¤‚à¤¦à¥€" : "EN"}
            </button>

            {/* Auth Button */}
            {farmer ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">{t.nav.logout}</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                <LogIn size={14} />
                {t.nav.login}
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}