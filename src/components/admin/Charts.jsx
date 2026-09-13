import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import Card from '../ui/Card';
import { useLanguage } from '../../hooks/useLanguage';

const hourlyData = [
  { time: '08 AM', arrivals: 4, processed: 2 },
  { time: '09 AM', arrivals: 8, processed: 6 },
  { time: '10 AM', arrivals: 12, processed: 10 },
  { time: '11 AM', arrivals: 9, processed: 11 },
  { time: '12 PM', arrivals: 5, processed: 6 },
  { time: '01 PM', arrivals: 3, processed: 4 },
  { time: '02 PM', arrivals: 7, processed: 6 },
  { time: '03 PM', arrivals: 6, processed: 7 },
  { time: '04 PM', arrivals: 4, processed: 5 },
];

const cropDistribution = [
  { name: 'Wheat (गेहूं)', value: 58, color: '#16a34a' },
  { name: 'Mustard (सरसों)', value: 24, color: '#f59e0b' },
  { name: 'Gram (चना)', value: 12, color: '#0ea5e9' },
  { name: 'Barley (जौ)', value: 6, color: '#8b5cf6' },
];

const waitTrend = [
  { day: 'Mon', traditional: 180, kisanSetu: 28 },
  { day: 'Tue', traditional: 210, kisanSetu: 24 },
  { day: 'Wed', traditional: 195, kisanSetu: 22 },
  { day: 'Thu', traditional: 240, kisanSetu: 25 },
  { day: 'Fri', traditional: 190, kisanSetu: 20 },
  { day: 'Today', traditional: 165, kisanSetu: 18 },
];

export default function Charts() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Hourly Flow Chart */}
      <Card className="p-5 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading font-semibold text-neutral-800 text-base">
              Hourly Arrivals vs Processed
            </h3>
            <p className="text-xs text-neutral-500">Mandi gate entry vs procurement completion</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-primary-50 text-primary-700 rounded-full">
            Real-time Load
          </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="arrivals" name="Arrivals" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="processed" name="Processed" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Crop Share Donut */}
      <Card className="p-5">
        <div className="mb-4">
          <h3 className="font-heading font-semibold text-neutral-800 text-base">
            Crop Share (%)
          </h3>
          <p className="text-xs text-neutral-500">Procurement volume breakdown</p>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cropDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {cropDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {cropDistribution.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-neutral-600 truncate">{c.name}: <b>{c.value}%</b></span>
            </div>
          ))}
        </div>
      </Card>

      {/* Wait Time Reduction Comparison Line */}
      <Card className="p-5 lg:col-span-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-heading font-semibold text-neutral-800 text-base">
              Wait Time Comparison: Traditional Mandi vs Kisan Setu
            </h3>
            <p className="text-xs text-neutral-500">Average farmer waiting time (minutes)</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              ~87% Time Saved
            </span>
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={waitTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} unit="m" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                type="monotone"
                dataKey="traditional"
                name="Traditional Mandi (mins)"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="4 4"
              />
              <Line
                type="monotone"
                dataKey="kisanSetu"
                name="Kisan Setu Smart Queue (mins)"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}