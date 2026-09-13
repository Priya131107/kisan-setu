import React, { useState, useEffect } from 'react';
import StatusTimeline from '../components/procurement/StatusTimeline';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import slotService from '../services/slotService';
import farmerService from '../services/farmerService';
import { useLanguage } from '../hooks/useLanguage';

export default function ProcurementStatusPage() {
  const { t } = useLanguage();
  const [activeSlot, setActiveSlot] = useState(null);

  useEffect(() => {
    let f = farmerService.getCurrentFarmer();
    if (!f) {
      farmerService.login('9876543210', '1234');
      f = farmerService.getCurrentFarmer();
    }
    const slot = slotService.getUpcomingSlot(f?.id);
    setActiveSlot(slot);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
          {t.procurement.title}
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Complete transparent tracking of every stage from registration to digital J-form payment advice
        </p>
      </div>

      <StatusTimeline currentStatus={activeSlot?.status || 'reached_centre'} />
    </div>
  );
}