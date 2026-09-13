import React from 'react';
import IVRDemo from '../components/ivr/IVRDemo';
import { useLanguage } from '../hooks/useLanguage';

export default function IVRDemoPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
          {t.ivr.title}
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          {t.ivr.subtitle}
        </p>
      </div>

      <IVRDemo />
    </div>
  );
}