import React from 'react';
import NotificationCentre from '../components/notifications/NotificationCentre';
import { useLanguage } from '../hooks/useLanguage';

export default function NotificationsPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
          {t.notifications.title}
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Omni-channel alerts via SMS, IVR automated voice calls, and in-app updates
        </p>
      </div>

      <NotificationCentre />
    </div>
  );
}