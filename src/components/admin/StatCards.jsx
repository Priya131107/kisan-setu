import React from 'react';
import { Users, Clock, CheckCircle2, AlertCircle, Scale, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import { useLanguage } from '../../hooks/useLanguage';

export default function StatCards({ stats }) {
  const { t } = useLanguage();

  const cards = [
    {
      title: t.admin.farmersToday || "Farmers Today",
      value: stats?.totalFarmers || 28,
      change: "+12% vs yesterday",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: t.admin.waiting || "In Queue",
      value: stats?.waiting || 6,
      change: "Active in line",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: t.admin.inInspection || "In Inspection",
      value: stats?.inInspection || 3,
      change: "Testing bays active",
      icon: AlertCircle,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      title: t.admin.completed || "Completed",
      value: stats?.completed || 19,
      change: "Receipts issued",
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      title: t.admin.avgWait || "Avg Wait Time",
      value: stats?.avgWait || "22 min",
      change: "-18 min reduction",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Procurement (Qtl)",
      value: stats?.totalWeight || "1,420",
      change: "MSP: ₹32.3L Value",
      icon: Scale,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <Card key={i} className="p-4 relative overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-neutral-500 line-clamp-1">{c.title}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.bg} ${c.color}`}>
                <Icon size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold font-heading text-neutral-900">{c.value}</div>
            <div className="text-[11px] text-neutral-500 mt-1 flex items-center gap-1">
              <span>{c.change}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}