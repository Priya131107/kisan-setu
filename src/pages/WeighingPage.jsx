import React, { useState } from 'react';
import WeighingForm from '../components/procurement/WeighingForm';
import Card from '../components/ui/Card';
import { useLanguage } from '../hooks/useLanguage';

export default function WeighingPage() {
  const { t } = useLanguage();
  const [tokenId, setTokenId] = useState('token-demo-1');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
          {t.weighing.title}
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Automated weighbridge integration for gross tare calculation and instant digital receipts
        </p>
      </div>

      <WeighingForm tokenId={tokenId} />
    </div>
  );
}