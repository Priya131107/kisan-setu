import React, { useState } from "react";
import { Search, AlertCircle, Cpu } from "lucide-react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { useLanguage } from "../../hooks/useLanguage";
import inspectionService from "../../services/inspectionService";
import slotService from "../../services/slotService";

export default function QualityInspection({ tokenId, onComplete }) {
  const { t } = useLanguage();
  const [moisture, setMoisture] = useState("12.5");
  const [foreignMaterial, setForeignMaterial] = useState("1.2");
  const [damagedGrains, setDamagedGrains] = useState("2.0");
  const [grade, setGrade] = useState("A");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (result) => {
    setLoading(true);
    
    // Update token status to quality_inspection first
    slotService.updateTokenStatus(tokenId, "quality_inspection");
    
    setTimeout(() => {
      const inspection = inspectionService.submitInspection(tokenId, {
        moisture, foreignMaterial, damagedGrains, grade, remarks, result,
      });
      setLoading(false);
      if (onComplete) onComplete(inspection);
    }, 800);
  };

  const existingInspection = inspectionService.getInspection(tokenId);
  if (existingInspection) {
    return (
      <Card elevation="md" className="p-6">
        <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-4">{t.inspection.title}</h3>
        <Badge variant={existingInspection.result === "pass" ? "success" : existingInspection.result === "reject" ? "danger" : "warning"}>
          {existingInspection.result?.toUpperCase()}
        </Badge>
        <div className="mt-4 space-y-2 text-sm text-neutral-600">
          <p>Moisture: {existingInspection.moisture}%</p>
          <p>Foreign Material: {existingInspection.foreignMaterial}%</p>
          <p>Damaged Grains: {existingInspection.damagedGrains}%</p>
          <p>Grade: {existingInspection.grade}</p>
          {existingInspection.remarks && <p>Remarks: {existingInspection.remarks}</p>}
        </div>
      </Card>
    );
  }

  return (
    <Card elevation="md" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <Search size={20} className="text-orange-600" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-neutral-800">{t.inspection.title}</h3>
        </div>
      </div>

      {/* AI Note */}
      <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg mb-6">
        <Cpu size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700">{t.inspection.aiNote}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Input label={t.inspection.moisture} id="moisture" type="number" value={moisture} onChange={(e) => setMoisture(e.target.value)} step="0.1" min="0" max="100" />
        <Input label={t.inspection.foreignMaterial} id="foreign" type="number" value={foreignMaterial} onChange={(e) => setForeignMaterial(e.target.value)} step="0.1" min="0" max="100" />
        <Input label={t.inspection.damagedGrains} id="damaged" type="number" value={damagedGrains} onChange={(e) => setDamagedGrains(e.target.value)} step="0.1" min="0" max="100" />
        <Select
          label={t.inspection.grade}
          id="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          options={[
            { value: "A", label: "Grade A - Premium" },
            { value: "B", label: "Grade B - Standard" },
            { value: "C", label: "Grade C - Below Standard" },
          ]}
        />
      </div>

      <Input label={t.inspection.remarks} id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Optional remarks..." className="mb-6" />

      <div className="grid grid-cols-3 gap-3">
        <Button variant="success" onClick={() => handleSubmit("pass")} loading={loading}>{t.inspection.pass}</Button>
        <Button variant="warning" onClick={() => handleSubmit("needs_review")} loading={loading}>{t.inspection.needsReview}</Button>
        <Button variant="danger" onClick={() => handleSubmit("reject")} loading={loading}>{t.inspection.reject}</Button>
      </div>
    </Card>
  );
}