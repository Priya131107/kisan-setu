import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Scale, ListOrdered, BarChart3 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

export default function Sidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  const links = [
    { to: "/admin/dashboard", label: t.admin.title, icon: LayoutDashboard },
    { to: "/admin/queue", label: t.admin.queueTable, icon: ListOrdered },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-100 min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary-50 text-primary-700 shadow-sm"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}