import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DemoBadge from '../components/layout/DemoBadge';
import { LayoutDashboard, ListOrdered, Award, Scale, Bell, MapPin } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function AdminLayout() {
  const { t } = useLanguage();
  const location = useLocation();

  const adminNav = [
    { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/queue', label: 'Live Queue', icon: ListOrdered },
    { to: '/admin/inspection', label: 'Quality Testing', icon: Award },
    { to: '/admin/weighing', label: 'Weighing Station', icon: Scale },
    { to: '/notifications', label: 'Broadcast Alerts', icon: Bell },
    { to: '/centres', label: 'Centre Network', icon: MapPin },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 font-body text-neutral-800">
      <Navbar />
      <DemoBadge />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Admin Left Sidebar */}
        <aside className="hidden md:flex flex-col w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-neutral-200 p-3 space-y-1 shadow-sm sticky top-24">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Mandi Operations
            </div>
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Admin Main Body */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}