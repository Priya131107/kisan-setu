import React, { useState } from 'react';
import { Bell, MessageSquare, PhoneCall, CheckCircle, Send, Clock, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import storageService from '../../services/storageService';
import { STORAGE_KEYS } from '../../utils/constants';

export default function NotificationCentre() {
  const [tab, setTab] = useState('all');
  const [notifications, setNotifications] = useState(() => {
    return storageService.get(STORAGE_KEYS.NOTIFICATIONS) || [
      {
        id: 'notif-1',
        title: 'Slot Booking Confirmed',
        message: 'Your slot at Kota Mandi (Bay 3) is confirmed for tomorrow 10:00 AM. Token: RJ-2026-00124',
        channel: 'sms',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
      {
        id: 'notif-2',
        title: 'Queue Reminder',
        message: '4 farmers ahead in testing bay. Please ensure grain trolley is aligned at Gate 2.',
        channel: 'ivr',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: true,
      },
      {
        id: 'notif-3',
        title: 'Quality Parameters Verified',
        message: 'Grain moisture test passed (11.8%). Grade A approved by Inspector S. Sharma.',
        channel: 'in_app',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: true,
      },
    ];
  });

  const sendTestAlert = (type) => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: type === 'sms' ? 'SMS: Gate Call Notice' : type === 'ivr' ? 'IVR Automated Call' : 'Procurement App Alert',
      message: `[Simulated Alert] Token RJ-2026-00124 is now called to Weighbridge 1. Net weight calculation in progress.`,
      channel: type,
      timestamp: new Date().toISOString(),
      read: false,
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    storageService.set(STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    storageService.set(STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  const clearAll = () => {
    setNotifications([]);
    storageService.set(STORAGE_KEYS.NOTIFICATIONS, []);
  };

  const filtered = notifications.filter((n) => {
    if (tab === 'all') return true;
    return n.channel === tab;
  });

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'all' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setTab('sms')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 ${
              tab === 'sms' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <MessageSquare size={13} /> SMS
          </button>
          <button
            onClick={() => setTab('ivr')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 ${
              tab === 'ivr' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <PhoneCall size={13} /> IVR Calls
          </button>
          <button
            onClick={() => setTab('in_app')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 ${
              tab === 'in_app' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <Bell size={13} /> In-App
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => sendTestAlert('sms')}
            className="px-2.5 py-1.5 text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-lg flex items-center gap-1"
          >
            <Send size={12} /> Test SMS
          </button>
          <button
            onClick={() => sendTestAlert('ivr')}
            className="px-2.5 py-1.5 text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-lg flex items-center gap-1"
          >
            <PhoneCall size={12} /> Test IVR
          </button>
          <button
            onClick={markAllRead}
            className="px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50 rounded-lg"
          >
            Mark all read
          </button>
          <button
            onClick={clearAll}
            className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg"
            title="Clear all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card className="p-12 text-center text-neutral-400">
            <Bell size={36} className="mx-auto mb-2 opacity-40" />
            <p>No alerts in this category</p>
          </Card>
        ) : (
          filtered.map((n) => (
            <Card
              key={n.id}
              className={`p-4 flex items-start gap-4 transition-all hover:shadow-sm ${
                !n.read ? 'border-l-4 border-l-primary-500 bg-primary-50/20' : ''
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.channel === 'sms'
                    ? 'bg-blue-100 text-blue-600'
                    : n.channel === 'ivr'
                    ? 'bg-amber-100 text-amber-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {n.channel === 'sms' ? (
                  <MessageSquare size={18} />
                ) : n.channel === 'ivr' ? (
                  <PhoneCall size={18} />
                ) : (
                  <Bell size={18} />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading font-semibold text-neutral-900 text-sm">
                    {n.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={n.channel === 'sms' ? 'info' : n.channel === 'ivr' ? 'warning' : 'success'}>
                      {n.channel.toUpperCase()}
                    </Badge>
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                      <Clock size={11} /> {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">{n.message}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}