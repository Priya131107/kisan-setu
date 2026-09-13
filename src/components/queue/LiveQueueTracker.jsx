import React, { useState } from "react";
import { RefreshCw, Users, Clock, Ticket, Zap } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import ProgressBar from "../ui/ProgressBar";
import { useLanguage } from "../../hooks/useLanguage";
import queueService from "../../services/queueService";

export default function LiveQueueTracker({ tokenId }) {
  const { t } = useLanguage();
  const [queueData, setQueueData] = useState(() => queueService.getQueuePosition(tokenId));
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const updated = queueService.refreshQueue(tokenId);
      if (updated) setQueueData(updated);
      setRefreshing(false);
    }, 800);
  };

  if (!queueData) {
    return (
      <Card elevation="md" className="p-8 text-center">
        <p className="text-neutral-500">Token not found</p>
      </Card>
    );
  }

  const progress = Math.max(0, 100 - (queueData.position * 10));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Token Header */}
      <Card elevation="lg" className="p-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-primary-200">{t.queue.yourToken}</p>
            <p className="font-heading text-3xl font-bold tracking-wider">{queueData.tokenNumber}</p>
          </div>
          <Badge variant="success" className="text-sm">Active</Badge>
        </div>
        <ProgressBar value={progress} max={100} color="success" showPercent={false} className="[&_div]:bg-white/30 [&_div>div]:bg-white" />
      </Card>

      {/* Queue Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card elevation="md" className="p-5 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users size={24} className="text-blue-600" />
          </div>
          <p className="text-3xl font-heading font-bold text-neutral-800">{queueData.position}</p>
          <p className="text-sm text-neutral-500">{t.queue.farmersAhead}</p>
        </Card>

        <Card elevation="md" className="p-5 text-center">
          <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Clock size={24} className="text-secondary-600" />
          </div>
          <p className="text-3xl font-heading font-bold text-neutral-800">{queueData.estimatedWait}</p>
          <p className="text-sm text-neutral-500">{t.queue.estWait} ({t.queue.minutes})</p>
        </Card>
      </div>

      {/* Status Message */}
      {queueData.position === 0 && (
        <Card elevation="glow" className="p-4 bg-green-50 border-green-200 text-center">
          <div className="flex items-center justify-center gap-2">
            <Zap size={20} className="text-green-600" />
            <p className="font-semibold text-green-800">{t.queue.noFarmersAhead}</p>
          </div>
        </Card>
      )}

      {/* Refresh Button */}
      <Button onClick={handleRefresh} loading={refreshing} icon={RefreshCw} className="w-full" size="lg">
        {t.queue.refreshQueue}
      </Button>
    </div>
  );
}