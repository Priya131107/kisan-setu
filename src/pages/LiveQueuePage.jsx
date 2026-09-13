import React, { useState, useEffect } from 'react';
import LiveQueueTracker from '../components/queue/LiveQueueTracker';
import QueueProgressBar from '../components/queue/QueueProgressBar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import slotService from '../services/slotService';
import farmerService from '../services/farmerService';
import { useLanguage } from '../hooks/useLanguage';

export default function LiveQueuePage() {
  const { t } = useLanguage();
  const [activeToken, setActiveToken] = useState(null);

  useEffect(() => {
    let f = farmerService.getCurrentFarmer();
    if (!f) {
      farmerService.login('9876543210', '1234');
      f = farmerService.getCurrentFarmer();
    }
    const slot = slotService.getUpcomingSlot(f?.id);
    if (slot && slot.tokenId) {
      setActiveToken(slot.tokenId);
    } else {
      setActiveToken('token-demo-1');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
          {t.queue.title}
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Monitor your position in line, estimated wait times, and gate announcements
        </p>
      </div>

      <LiveQueueTracker tokenId={activeToken} />
    </div>
  );
}