import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DemoBadge from '../components/layout/DemoBadge';

export default function FarmerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 font-body text-neutral-800">
      <Navbar />
      <DemoBadge />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}