import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SlotBookingForm from '../components/booking/SlotBookingForm';
import SmartRecommendation from '../components/booking/SmartRecommendation';
import { useLanguage } from '../hooks/useLanguage';

export default function BookSlotPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [selectedSlot, setSelectedSlot] = useState('morning-2');

  const handleSuccess = (bookingData) => {
    navigate('/farmer/booking-confirmed', { state: { booking: bookingData } });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
          {t.booking.title}
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Reserve an assured mandi slot with automated token allocation and AI wait-time prediction
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SlotBookingForm
            onSuccess={handleSuccess}
            onCropChange={setSelectedCrop}
            onSlotChange={setSelectedSlot}
          />
        </div>
        <div className="lg:col-span-1">
          <SmartRecommendation crop={selectedCrop} />
        </div>
      </div>
    </div>
  );
}