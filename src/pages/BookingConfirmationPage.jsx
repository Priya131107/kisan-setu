import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function BookingConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking || {
    tokenNumber: 'RJ-2026-00124',
    centre: 'Kota Central APMC (Bay 3)',
    crop: 'Wheat (गेहूं)',
    quantity: 10,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM - 11:00 AM',
    estimatedWait: 15,
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <BookingConfirmation booking={booking} />
    </div>
  );
}