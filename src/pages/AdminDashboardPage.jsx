import React, { useState, useEffect } from 'react';
import StatCards from '../components/admin/StatCards';
import Charts from '../components/admin/Charts';
import QueueTable from '../components/admin/QueueTable';
import Card from '../components/ui/Card';
import storageService from '../services/storageService';
import { STORAGE_KEYS } from '../utils/constants';
import { useLanguage } from '../hooks/useLanguage';

export default function AdminDashboardPage() {
  const { t } = useLanguage();
  const [tokens, setTokens] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState('jaipur-centre-1');

  const loadTokens = () => {
    const all = storageService.get(STORAGE_KEYS.TOKENS) || [];
    setTokens(all);
  };

  useEffect(() => {
    loadTokens();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900">
            {t.admin.title}
          </h1>
          <p className="text-xs text-neutral-500">
            Real-time mandi control, smart queue dispatcher, and procurement telemetry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCentre}
            onChange={(e) => setSelectedCentre(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-neutral-300 bg-white text-neutral-800 shadow-sm"
          >
            <option value="jaipur-centre-1">Kota Central APMC (Rajasthan)</option>
            <option value="karnal-centre-1">Karnal Grain Mandi (Haryana)</option>
            <option value="khanna-centre-1">Khanna Asia's Largest Mandi (Punjab)</option>
          </select>
        </div>
      </div>

      {/* Metric Cards */}
      <StatCards />

      {/* Analytics Charts */}
      <Charts />

      {/* Queue Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-lg font-bold text-neutral-900">
            {t.admin.queueTable}
          </h2>
          <span className="text-xs text-neutral-500">Auto-refreshed every 15s</span>
        </div>
        <QueueTable tokens={tokens} onUpdate={loadTokens} />
      </div>
    </div>
  );
}