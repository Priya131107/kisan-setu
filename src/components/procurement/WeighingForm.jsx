import React, { useState, useMemo } from "react";
import { Scale, CheckCircle } from "lucide-react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { useLanguage } from "../../hooks/useLanguage";
import weighingService from "../../services/weighingService";
import { formatWeight } from "../../utils/formatters";

export default function WeighingForm({ tokenId, onComplete }) {
  const { t } = useLanguage();
  const [grossWeight, setGrossWeight] = useState("1050");
  const [tareWeight, setTareWeight] = useState("50");
  const [loading, setLoading] = useState(false);

  const netWeight = useMemo(() => {
    const net = Number(grossWeight) - Number(tareWeight);
    return net > 0 ? net : 0;
  }, [grossWeight, tareWeight]);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const weighing = weighingService.submitWeighing(tokenId, grossWeight, tareWeight);
      setLoading(false);
      if (onComplete) onComplete(weighing);
    }, 800);
  };

  const existingWeighing = weighingService.getWeighing(tokenId);
  if (existingWeighing) {
    return (
      <Card elevation="md" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle size={24} className="text-green-600" />
          <h3 className="font-heading text-lg font-semibold text-neutral-800">{t.weighing.title}</h3>
          <Badge variant="success">Completed</Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-neutral-50 rounded-lg">
            <p className="text-xs text-neutral-500">{t.weighing.grossWeight}</p>
            <p className="font-semibold">{formatWeight(existingWeighing.grossWeight)}</p>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg">
            <p className="text-xs text-neutral-500">{t.weighing.tareWeight}</p>
            <p className="font-semibold">{formatWeight(existingWeighing.tareWeight)}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-600">{t.weighing.netWeight}</p>
            <p className="font-bold text-green-800">{formatWeight(existingWeighing.netWeight)}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card elevation="md" className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
          <Scale size={20} className="text-cyan-600" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-neutral-800">{t.weighing.title}</h3>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Input label={t.weighing.grossWeight} id="gross" type="number" value={grossWeight} onChange={(e) => setGrossWeight(e.target.value)} min="0" />
        <Input label={t.weighing.tareWeight} id="tare" type="number" value={tareWeight} onChange={(e) => setTareWeight(e.target.value)} min="0" />
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-700">{t.weighing.netWeight}</label>
          <div className="w-full rounded-lg border border-green-300 bg-green-50 px-4 py-2.5 text-sm font-bold text-green-800">
            {formatWeight(netWeight)}
          </div>
        </div>
      </div>

      <Button onClick={handleSubmit} loading={loading} icon={CheckCircle} className="w-full" size="lg">
        {t.weighing.confirm}
      </Button>
    </Card>
  );
}