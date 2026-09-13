import React from "react";
import { MapPin } from "lucide-react";
import Card from "../ui/Card";
import { useLanguage } from "../../hooks/useLanguage";
import { STATES, DISTRICTS } from "../../data/centres";

export default function SupportedStates() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-neutral-800 mb-3">{t.landing.statesTitle}</h2>
          <p className="text-neutral-500">Currently operational in these states with plans to expand nationwide</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {STATES.map((state) => (
            <Card key={state.id} elevation="md" hover className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} className="text-primary-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-neutral-800 mb-1">
                {language === "hi" ? state.nameHi : state.name}
              </h3>
              <div className="space-y-1 mt-3">
                {DISTRICTS[state.id]?.map((d) => (
                  <p key={d.id} className="text-sm text-neutral-500">
                    {language === "hi" ? d.nameHi : d.name}
                  </p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}