import React, { useState } from 'react';
import QualityInspection from '../components/procurement/QualityInspection';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useLanguage } from '../hooks/useLanguage';

export default function QualityInspectionPage() {
  const { t } = useLanguage();
  const [tokenId, setTokenId] = useState('token-demo-1');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
          {t.inspection.title}
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Certified grain testing bay: Moisture analysis, foreign matter, and automated Grade A certification
        </p>
      </div>

      <QualityInspection tokenId={tokenId} />
    </div>
  );
}