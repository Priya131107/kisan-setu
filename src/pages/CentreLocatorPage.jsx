import React, { useState } from 'react';
import { MapPin, Search, Phone, Clock, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { CENTRES } from '../data/centres';
import { useLanguage } from '../hooks/useLanguage';

export default function CentreLocatorPage() {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  const centresList = [
    {
      id: 'c-1',
      name: 'Kota Central APMC Procurement Mandi',
      nameHi: 'कोटा केंद्रीय कृषि उपज मंडी',
      state: 'rajasthan',
      district: 'Kota',
      address: 'Near NH-52, Anaj Mandi Road, Kota, Rajasthan - 324005',
      officer: 'Shri Rajendra Singh (APMC Incharge)',
      phone: '+91 744 2458900',
      hours: '8:00 AM - 5:00 PM',
      status: 'open',
      capacity: '850 Qtl/Day',
      bays: 6,
      currentLoad: 'Low (15 min wait)',
    },
    {
      id: 'c-2',
      name: 'Jaipur Muhana Mandi Bay 4',
      nameHi: 'जयपुर मुहाना मंडी बे 4',
      state: 'rajasthan',
      district: 'Jaipur',
      address: 'Muhana Terminal Mandi, Sanganer, Jaipur - 302029',
      officer: 'Shri Ashok Meena',
      phone: '+91 141 2734120',
      hours: '8:00 AM - 6:00 PM',
      status: 'open',
      capacity: '1,200 Qtl/Day',
      bays: 10,
      currentLoad: 'Moderate (25 min wait)',
    },
    {
      id: 'c-3',
      name: 'Karnal Grain Market Complex',
      nameHi: 'करनाल नई अनाज मंडी परिसर',
      state: 'haryana',
      district: 'Karnal',
      address: 'GT Road, New Grain Market, Karnal, Haryana - 132001',
      officer: 'Smt. Sunita Sharma',
      phone: '+91 184 2254300',
      hours: '7:30 AM - 5:30 PM',
      status: 'open',
      capacity: '1,500 Qtl/Day',
      bays: 12,
      currentLoad: 'Optimal (10 min wait)',
    },
    {
      id: 'c-4',
      name: 'Khanna Asia Largest Grain Mandi',
      nameHi: 'खन्ना एशिया की सबसे बड़ी अनाज मंडी',
      state: 'punjab',
      district: 'Ludhiana',
      address: 'Samrala Road, Khanna, Punjab - 141401',
      officer: 'S. Harpreet Singh Dhillon',
      phone: '+91 1628 226100',
      hours: '8:00 AM - 6:00 PM',
      status: 'open',
      capacity: '2,800 Qtl/Day',
      bays: 18,
      currentLoad: 'Active (20 min wait)',
    },
    {
      id: 'c-5',
      name: 'Sirsa Sirsa Mandi Procurement Hub',
      nameHi: 'सिरसा कृषि मंडी खरीद केंद्र',
      state: 'haryana',
      district: 'Sirsa',
      address: 'Bhadra Bazar Road, Sirsa - 125055',
      officer: 'Shri Vikram Punia',
      phone: '+91 1666 230911',
      hours: '8:00 AM - 5:00 PM',
      status: 'open',
      capacity: '900 Qtl/Day',
      bays: 8,
      currentLoad: 'Low (12 min wait)',
    },
  ];

  const filtered = centresList.filter((c) => {
    const matchState = selectedState === 'all' || c.state === selectedState;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase());
    return matchState && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
            {t.centres.title}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Browse verified FCI and State APMC procurement yards with operational hours and active queue capacity
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search mandi, district or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary-500 w-64 bg-white"
            />
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-neutral-300 bg-white font-medium"
          >
            <option value="all">All States</option>
            <option value="rajasthan">Rajasthan</option>
            <option value="haryana">Haryana</option>
            <option value="punjab">Punjab</option>
          </select>
        </div>
      </div>

      {/* Centres Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((c) => (
          <Card key={c.id} className="p-6 flex flex-col justify-between border border-neutral-200 hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-heading font-bold text-base text-neutral-900">
                    {language === 'hi' ? c.nameHi : c.name}
                  </h3>
                  <span className="text-xs text-primary-700 font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin size={13} /> {c.district}, {c.state.toUpperCase()}
                  </span>
                </div>
                <Badge variant="success">Open Today</Badge>
              </div>

              <p className="text-xs text-neutral-600 mb-4">{c.address}</p>

              <div className="grid grid-cols-2 gap-3 p-3 bg-neutral-50 rounded-xl text-xs mb-4">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Operating Hours</span>
                  <span className="font-semibold text-neutral-800 flex items-center gap-1 mt-0.5">
                    <Clock size={12} /> {c.hours}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Current Load</span>
                  <span className="font-semibold text-green-700 mt-0.5 block">{c.currentLoad}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Capacity</span>
                  <span className="font-semibold text-neutral-800 mt-0.5 block">{c.capacity} ({c.bays} Bays)</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">In-Charge Officer</span>
                  <span className="font-semibold text-neutral-800 mt-0.5 block truncate">{c.officer}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs">
              <a
                href={`tel:${c.phone}`}
                className="text-neutral-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                <Phone size={13} /> {c.phone}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.name + ' ' + c.address)}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary-700 hover:text-primary-800 font-semibold flex items-center gap-1"
              >
                {t.centres.openInMaps} <ExternalLink size={12} />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}