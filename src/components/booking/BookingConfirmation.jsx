import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Ticket, Calendar, MapPin, Wheat, ArrowRight, Copy } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { useLanguage } from "../../hooks/useLanguage";
import { getCentreById } from "../../data/centres";
import { getCropById } from "../../data/crops";
import { SLOT_TIMES } from "../../utils/constants";
import { formatDate } from "../../utils/formatters";

export default function BookingConfirmation({ booking, token }) {
  const { t, language } = useLanguage();

  if (!booking || !token) return null;

  const centre = getCentreById(booking.centreId);
  const crop = getCropById(booking.crop);
  const timeSlot = SLOT_TIMES.find((s) => s.id === booking.timeSlot);
  const [copied, setCopied] = React.useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(token.tokenNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-lg mx-auto animate-slide-up">
      <Card elevation="xl" className="p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>

        <h2 className="font-heading text-2xl font-bold text-neutral-800 mb-2">{t.booking.confirmation}</h2>
        
        {/* Token Display */}
        <div className="bg-primary-50 rounded-2xl p-6 my-6">
          <p className="text-sm text-primary-600 mb-1">{t.booking.yourToken}</p>
          <div className="flex items-center justify-center gap-2">
            <p className="font-heading text-3xl font-bold text-primary-800 tracking-wider">{token.tokenNumber}</p>
            <button onClick={copyToken} className="p-2 hover:bg-primary-100 rounded-lg transition-colors">
              <Copy size={18} className="text-primary-600" />
            </button>
          </div>
          {copied && <p className="text-xs text-primary-600 mt-1">Copied!</p>}
        </div>

        {/* Booking Details */}
        <div className="space-y-3 text-left bg-neutral-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <MapPin size={16} className="text-neutral-400" />
            <span className="text-neutral-600">{language === "hi" ? centre?.nameHi : centre?.name}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Wheat size={16} className="text-neutral-400" />
            <span className="text-neutral-600">{language === "hi" ? crop?.nameHi : crop?.name} - {booking.quantity} quintals</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-neutral-400" />
            <span className="text-neutral-600">{formatDate(booking.date)} | {language === "hi" ? timeSlot?.labelHi : timeSlot?.label}</span>
          </div>
        </div>

        {/* Queue Info */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-800">#{token.queuePosition}</p>
            <p className="text-xs text-neutral-500">{t.farmer.queuePosition}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-800">{token.estimatedWait}m</p>
            <p className="text-xs text-neutral-500">{t.farmer.estWait}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link to={`/farmer/queue/${token.id}`} className="block">
            <Button className="w-full" icon={ArrowRight}>{t.queue.title}</Button>
          </Link>
          <Link to="/farmer/dashboard" className="block">
            <Button variant="secondary" className="w-full">{t.nav.dashboard}</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}