import React, { useState, useEffect } from "react";
import { MapPin, Wheat, Calendar, Clock, Cpu } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Input from "../ui/Input";
import SmartRecommendation from "./SmartRecommendation";
import { useLanguage } from "../../hooks/useLanguage";
import { STATES, DISTRICTS, CENTRES } from "../../data/centres";
import { CROPS } from "../../data/crops";
import { SLOT_TIMES } from "../../utils/constants";
import slotService from "../../services/slotService";
import farmerService from "../../services/farmerService";

export default function SlotBookingForm({ onBookingComplete }) {
  const { t, language } = useLanguage();
  const farmer = farmerService.getCurrentFarmer();

  const [state, setState] = useState(farmer?.state || "");
  const [district, setDistrict] = useState(farmer?.district || "");
  const [centre, setCentre] = useState(farmer?.centre || "");
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const districts = DISTRICTS[state] || [];
  const centres = CENTRES.filter((c) => c.district === district);
  const availableSlots = centre && date ? slotService.getAvailableSlots(centre, date) : [];

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    if (centre && date) {
      const rec = slotService.getSmartRecommendation(centre, date);
      setRecommendation(rec);
    }
  }, [centre, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!farmer) return;

    setLoading(true);
    setTimeout(() => {
      const result = slotService.bookSlot(
        farmer.id, centre, crop, quantity, date, timeSlot, state
      );
      setLoading(false);
      if (onBookingComplete) onBookingComplete(result);
    }, 1000);
  };

  const canProceedToStep2 = state && district && centre;
  const canProceedToStep3 = crop && quantity;
  const canSubmit = date && timeSlot;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      {/* Step 1: Location */}
      <Card elevation="md" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <MapPin size={18} className="text-primary-600" />
          </div>
          <h3 className="font-heading font-semibold text-neutral-800">Step 1: Location</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Select
            label={t.booking.selectState}
            id="state"
            value={state}
            onChange={(e) => { setState(e.target.value); setDistrict(""); setCentre(""); }}
            options={STATES.map((s) => ({ value: s.id, label: language === "hi" ? s.nameHi : s.name }))}
            required
          />
          <Select
            label={t.booking.selectDistrict}
            id="district"
            value={district}
            onChange={(e) => { setDistrict(e.target.value); setCentre(""); }}
            options={districts.map((d) => ({ value: d.id, label: language === "hi" ? d.nameHi : d.name }))}
            required
            disabled={!state}
          />
          <Select
            label={t.booking.selectCentre}
            id="centre"
            value={centre}
            onChange={(e) => setCentre(e.target.value)}
            options={centres.map((c) => ({ value: c.id, label: language === "hi" ? c.nameHi : c.name }))}
            required
            disabled={!district}
          />
        </div>
      </Card>

      {/* Step 2: Crop */}
      {canProceedToStep2 && (
        <Card elevation="md" className="p-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Wheat size={18} className="text-secondary-600" />
            </div>
            <h3 className="font-heading font-semibold text-neutral-800">Step 2: Crop Details</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label={t.booking.selectCrop}
              id="crop"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              options={CROPS.map((c) => ({ value: c.id, label: `${language === "hi" ? c.nameHi : c.name} (MSP: â‚¹${c.msp}/q)` }))}
              required
            />
            <Input
              label={t.booking.quantity}
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 10"
              min="1"
              max="500"
              required
            />
          </div>
        </Card>
      )}

      {/* Step 3: Schedule */}
      {canProceedToStep2 && canProceedToStep3 && (
        <Card elevation="md" className="p-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar size={18} className="text-blue-600" />
            </div>
            <h3 className="font-heading font-semibold text-neutral-800">Step 3: Schedule</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Input
              label={t.booking.selectDate}
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              required
            />
            <Select
              label={t.booking.selectTime}
              id="timeSlot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              options={availableSlots.map((s) => ({
                value: s.id,
                label: `${language === "hi" ? s.labelHi : s.label} (${s.bookedCount}/15 booked)`,
              }))}
              required
              disabled={!date}
            />
          </div>

          {/* Smart Recommendation */}
          {recommendation && <SmartRecommendation recommendation={recommendation} />}
        </Card>
      )}

      {/* Submit */}
      {canProceedToStep2 && canProceedToStep3 && canSubmit && (
        <div className="animate-slide-up">
          <Button type="submit" size="lg" className="w-full" loading={loading} icon={Cpu}>
            {t.booking.bookSlot}
          </Button>
        </div>
      )}
    </form>
  );
}