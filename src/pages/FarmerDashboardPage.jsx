import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarPlus, ListOrdered, ClipboardList, MapPin, Phone, ArrowRight,
  Clock, CheckCircle, AlertTriangle, Scale, Sprout, Bell, RefreshCw
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import farmerService from '../services/farmerService';
import slotService from '../services/slotService';
import queueService from '../services/queueService';
import { useLanguage } from '../hooks/useLanguage';

export default function FarmerDashboardPage() {
  const { t } = useLanguage();
  const [farmer, setFarmer] = useState(null);
  const [upcomingSlot, setUpcomingSlot] = useState(null);
  const [queueInfo, setQueueInfo] = useState(null);
  const [allSlots, setAllSlots] = useState([]);

  const loadData = () => {
    let f = farmerService.getCurrentFarmer();
    if (!f) {
      farmerService.login('9876543210', '1234');
      f = farmerService.getCurrentFarmer();
    }
    setFarmer(f);

    const slot = slotService.getUpcomingSlot(f?.id);
    setUpcomingSlot(slot);

    if (slot && slot.tokenId) {
      const q = queueService.getQueuePosition(slot.tokenId);
      setQueueInfo(q);
    }

    const history = slotService.getSlotsByFarmer(f?.id);
    setAllSlots(history || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    if (upcomingSlot?.tokenId) {
      queueService.refreshQueue(upcomingSlot.tokenId);
    }
    loadData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-primary-100 text-xs font-semibold mb-3 border border-white/20">
              <Sprout size={14} />
              <span>Farmer ID: {farmer?.farmerId || 'F-RJ-10001'}</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold">
              {t.farmer.welcome}, {farmer?.name || 'Ramesh Kumar'} ji!
            </h1>
            <p className="text-sm text-primary-100/90 mt-1 max-w-xl">
              Procurement mandi: <b>Kota Central APMC (Rajasthan)</b> • Active crop: <b>Wheat (गेहूं)</b>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/farmer/book-slot">
              <Button size="lg" className="bg-white text-primary-800 hover:bg-primary-50 shadow-md">
                <CalendarPlus size={18} />
                <span>{t.farmer.bookNow}</span>
              </Button>
            </Link>
            <Link to="/farmer/queue">
              <Button size="lg" variant="secondary" className="border-white/40 text-white hover:bg-white/10">
                <ListOrdered size={18} />
                <span>{t.nav.liveQueue}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Active Upcoming Slot Card */}
      {upcomingSlot ? (
        <Card className="p-6 sm:p-8 border-2 border-primary-200 bg-gradient-to-b from-white to-primary-50/20 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                {t.farmer.upcomingSlot}
              </span>
              <h2 className="font-heading text-xl font-bold text-neutral-900 mt-0.5">
                Token: <span className="text-primary-600 font-mono">{queueInfo?.tokenNumber || 'RJ-2026-00124'}</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-300 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw size={13} />
                <span>Simulate Queue Move</span>
              </button>
              <Badge variant="warning">
                {queueInfo?.status === 'token_generated' ? 'In Queue' : queueInfo?.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-6">
            <div>
              <span className="text-xs text-neutral-500 block">Allocated Date</span>
              <span className="text-base font-bold text-neutral-800">{upcomingSlot.date}</span>
            </div>
            <div>
              <span className="text-xs text-neutral-500 block">Time Slot</span>
              <span className="text-base font-bold text-neutral-800">{upcomingSlot.timeSlot || '10:00 AM - 11:00 AM'}</span>
            </div>
            <div>
              <span className="text-xs text-neutral-500 block">Farmers Ahead</span>
              <span className="text-2xl font-bold text-amber-600 font-heading">
                {queueInfo?.position !== undefined ? queueInfo.position : 3}
              </span>
            </div>
            <div>
              <span className="text-xs text-neutral-500 block">Estimated Wait</span>
              <span className="text-2xl font-bold text-green-600 font-heading">
                {queueInfo?.estimatedWait !== undefined ? queueInfo.estimatedWait : 15} min
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/farmer/queue">
              <Button size="md" icon={ListOrdered}>
                Open Live Queue Tracker
              </Button>
            </Link>
            <Link to="/farmer/status">
              <Button size="md" variant="secondary" icon={ClipboardList}>
                View 7-Step Status Timeline
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="p-8 text-center border-dashed border-2 border-neutral-300">
          <CalendarPlus size={40} className="mx-auto text-neutral-400 mb-3" />
          <h3 className="font-heading text-lg font-semibold text-neutral-800">
            {t.farmer.noBooking}
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1 mb-5">
            Book a guaranteed procurement slot at your nearby mandi to avoid waiting in long queues.
          </p>
          <Link to="/farmer/book-slot">
            <Button size="lg" icon={CalendarPlus}>
              {t.farmer.bookNow}
            </Button>
          </Link>
        </Card>
      )}

      {/* Quick Action Grid */}
      <div>
        <h3 className="font-heading text-lg font-bold text-neutral-900 mb-4">
          {t.farmer.quickActions}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/farmer/book-slot">
            <Card className="p-5 hover:shadow-md transition-shadow group cursor-pointer border border-neutral-200">
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <CalendarPlus size={20} />
              </div>
              <h4 className="font-heading font-semibold text-neutral-900 text-sm">Book New Slot</h4>
              <p className="text-xs text-neutral-500 mt-1">Select crop, mandi & time slot</p>
            </Card>
          </Link>

          <Link to="/farmer/queue">
            <Card className="p-5 hover:shadow-md transition-shadow group cursor-pointer border border-neutral-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ListOrdered size={20} />
              </div>
              <h4 className="font-heading font-semibold text-neutral-900 text-sm">Live Queue</h4>
              <p className="text-xs text-neutral-500 mt-1">Real-time gate & bay tracker</p>
            </Card>
          </Link>

          <Link to="/centres">
            <Card className="p-5 hover:shadow-md transition-shadow group cursor-pointer border border-neutral-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <h4 className="font-heading font-semibold text-neutral-900 text-sm">Centre Locator</h4>
              <p className="text-xs text-neutral-500 mt-1">Find open mandis & contact</p>
            </Card>
          </Link>

          <Link to="/ivr-demo">
            <Card className="p-5 hover:shadow-md transition-shadow group cursor-pointer border border-neutral-200">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Phone size={20} />
              </div>
              <h4 className="font-heading font-semibold text-neutral-900 text-sm">IVR Phone Demo</h4>
              <p className="text-xs text-neutral-500 mt-1">Non-smartphone voice portal</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <Card className="p-6">
        <h3 className="font-heading text-lg font-bold text-neutral-900 mb-4">
          {t.farmer.myBookings}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-200">
              <tr>
                <th className="py-3 px-4">Token #</th>
                <th className="py-3 px-4">Crop</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Date & Slot</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {allSlots.map((s) => (
                <tr key={s.id} className="hover:bg-neutral-50/60">
                  <td className="py-3 px-4 font-mono font-bold text-primary-700">
                    {s.tokenId || 'RJ-2026-00124'}
                  </td>
                  <td className="py-3 px-4 capitalize font-medium text-neutral-800">
                    {s.crop || 'Wheat'}
                  </td>
                  <td className="py-3 px-4">{s.quantity || 10} Quintals</td>
                  <td className="py-3 px-4 text-neutral-600">
                    {s.date} • {s.timeSlot || 'Morning 10-11 AM'}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={s.status === 'completed' ? 'success' : 'warning'}>
                      {s.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to="/farmer/status"
                      className="text-primary-700 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Track <ArrowRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}