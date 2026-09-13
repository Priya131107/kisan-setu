import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, CheckCircle, ArrowRight, Play, Scale, Award } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import storageService from '../../services/storageService';
import { STORAGE_KEYS } from '../../utils/constants';

export default function QueueTable({ tokens, onUpdate }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = (tokens || []).filter((t) => {
    const matchSearch =
      (t.tokenNumber || '').toLowerCase().includes(search.toLowerCase()) ||
      (t.farmerName || '').toLowerCase().includes(search.toLowerCase()) ||
      (t.crop || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const advanceToken = (tokenId, nextStatus) => {
    const allTokens = storageService.get(STORAGE_KEYS.TOKENS) || [];
    const updated = allTokens.map((t) => {
      if (t.id === tokenId) {
        return { ...t, status: nextStatus };
      }
      return t;
    });
    storageService.set(STORAGE_KEYS.TOKENS, updated);
    if (onUpdate) onUpdate();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'token_generated':
        return <Badge variant="warning">In Queue</Badge>;
      case 'reached_centre':
        return <Badge variant="info">At Gate</Badge>;
      case 'quality_inspection':
        return <Badge variant="secondary">In Testing</Badge>;
      case 'weighing':
        return <Badge variant="info">At Scale</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search token, farmer or crop..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary-500 w-64"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs py-1.5 px-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-700"
          >
            <option value="all">All Statuses</option>
            <option value="token_generated">In Queue</option>
            <option value="reached_centre">At Gate</option>
            <option value="quality_inspection">In Testing</option>
            <option value="weighing">At Scale</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="text-xs text-neutral-500">
          Showing <b>{filtered.length}</b> tokens
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-200">
            <tr>
              <th className="py-3 px-4">Token #</th>
              <th className="py-3 px-4">Farmer</th>
              <th className="py-3 px-4">Crop & Qty</th>
              <th className="py-3 px-4">Time Slot</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Wait Time</th>
              <th className="py-3 px-4 text-right">Officer Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-neutral-400">
                  No active tokens matching criteria
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-primary-700">
                    {t.tokenNumber}
                  </td>
                  <td className="py-3 px-4 font-medium text-neutral-800">
                    {t.farmerName || 'Ramesh Kumar'}
                  </td>
                  <td className="py-3 px-4 text-neutral-600">
                    <span className="capitalize">{t.crop || 'Wheat'}</span> • {t.quantity || 10} Qtl
                  </td>
                  <td className="py-3 px-4 text-neutral-500">
                    {t.timeSlot || '10:00 AM - 11:00 AM'}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(t.status)}
                  </td>
                  <td className="py-3 px-4 text-neutral-500">
                    {t.estimatedWait > 0 ? `~${t.estimatedWait} min` : 'Ready'}
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    {t.status === 'token_generated' && (
                      <button
                        onClick={() => advanceToken(t.id, 'reached_centre')}
                        className="px-2 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-[11px] font-medium"
                      >
                        Gate In
                      </button>
                    )}
                    {t.status === 'reached_centre' && (
                      <Link to="/admin/inspection">
                        <button className="px-2 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded text-[11px] font-medium inline-flex items-center gap-1">
                          <Award size={12} /> Inspect
                        </button>
                      </Link>
                    )}
                    {t.status === 'quality_inspection' && (
                      <Link to="/admin/weighing">
                        <button className="px-2 py-1 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 rounded text-[11px] font-medium inline-flex items-center gap-1">
                          <Scale size={12} /> Weigh
                        </button>
                      </Link>
                    )}
                    {t.status === 'weighing' && (
                      <button
                        onClick={() => advanceToken(t.id, 'completed')}
                        className="px-2 py-1 bg-green-50 text-green-700 hover:bg-green-100 rounded text-[11px] font-medium inline-flex items-center gap-1"
                      >
                        <CheckCircle size={12} /> Complete
                      </button>
                    )}
                    {t.status === 'completed' && (
                      <span className="text-[11px] text-green-600 font-medium">Receipt Ready</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}