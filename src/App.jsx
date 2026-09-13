import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import { DemoProvider } from './hooks/useDemoMode';

// Layouts
import FarmerLayout from './layouts/FarmerLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import LandingPage from './pages/LandingPage';
import FarmerLoginPage from './pages/FarmerLoginPage';
import FarmerDashboardPage from './pages/FarmerDashboardPage';
import BookSlotPage from './pages/BookSlotPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import LiveQueuePage from './pages/LiveQueuePage';
import ProcurementStatusPage from './pages/ProcurementStatusPage';
import QualityInspectionPage from './pages/QualityInspectionPage';
import WeighingPage from './pages/WeighingPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotificationsPage from './pages/NotificationsPage';
import IVRDemoPage from './pages/IVRDemoPage';
import CentreLocatorPage from './pages/CentreLocatorPage';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <DemoProvider>
          <Routes>
            {/* Public Landing & Login */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<FarmerLoginPage />} />

            {/* Farmer Workspace Routes */}
            <Route element={<FarmerLayout />}>
              <Route path="/farmer/dashboard" element={<FarmerDashboardPage />} />
              <Route path="/farmer/book-slot" element={<BookSlotPage />} />
              <Route path="/farmer/booking-confirmed" element={<BookingConfirmationPage />} />
              <Route path="/farmer/queue" element={<LiveQueuePage />} />
              <Route path="/farmer/status" element={<ProcurementStatusPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/ivr-demo" element={<IVRDemoPage />} />
              <Route path="/centres" element={<CentreLocatorPage />} />
            </Route>

            {/* Admin Workspace Routes */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/queue" element={<LiveQueuePage />} />
              <Route path="/admin/inspection" element={<QualityInspectionPage />} />
              <Route path="/admin/weighing" element={<WeighingPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DemoProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}