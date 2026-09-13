import React from "react";
import { Cpu, Clock, TrendingDown } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { useLanguage } from "../../hooks/useLanguage";

export default function SmartRecommendation({ recommendation }) {
  const { t, language } = useLanguage();

  if (!recommendation) return null;

  return (
    <Card elevation="md" className="p-5 border-l-4 border-l-secondary-400 bg-gradient-to-r from-secondary-50 to-white">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Cpu size={20} className="text-secondary-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-heading font-semibold text-neutral-800">{t.booking.smartRec}</h4>
            <Badge variant="warning">{t.booking.aiNote}</Badge>
          </div>
          <p className="text-sm text-neutral-600 mb-3">
            {language === "hi" ? recommendation.reasonHi : recommendation.reason}
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>Slot: {recommendation.recommendedSlot?.label}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown size={14} />
              <span>Confidence: {recommendation.confidence}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}