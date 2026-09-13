import React from "react";
import Timeline from "../ui/Timeline";
import Card from "../ui/Card";
import { useLanguage } from "../../hooks/useLanguage";
import { PROCUREMENT_STAGES } from "../../utils/constants";

export default function StatusTimeline({ currentStatus }) {
  const { t, language } = useLanguage();

  const currentIdx = PROCUREMENT_STAGES.findIndex((s) => s.id === currentStatus);

  const steps = PROCUREMENT_STAGES.map((stage, idx) => ({
    id: stage.id,
    label: language === "hi" ? stage.labelHi : stage.label,
    sublabel: idx <= currentIdx ? (idx === currentIdx ? "In Progress" : "Completed") : "Pending",
  }));

  return (
    <Card elevation="md" className="p-6">
      <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-6">{t.procurement.timeline}</h3>
      <Timeline steps={steps} currentStep={currentIdx} />
    </Card>
  );
}