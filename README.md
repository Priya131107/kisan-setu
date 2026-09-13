# Kisan Setu (किसान सेतु)
### Smart Agricultural Procurement & Queue Management Platform
> **Smart India Hackathon (SIH 2026)** | **Problem Statement:** SIH26032 | **Theme:** Smart Automation | **Team:** Code Crafters

---

## 🌾 Overview

**Kisan Setu** is an intelligent agricultural procurement platform engineered to modernize mandi operations across India. By eliminating unorganized physical queues, introducing AI-assisted slot booking, accelerating certified quality inspections, and digitizing weighbridges, Kisan Setu reduces farmer waiting times from **4–8 hours down to under 25 minutes**.

---

## ✨ Key Features

- 🌐 **100% Bilingual Interface:** Instant one-click toggle between **English** and **हिन्दी (Hindi)** across all screens.
- 📱 **Farmer Portal:**
  - OTP-based mobile authentication with 1-click demo access (Ramesh Kumar - RJ).
  - Personalized dashboard showing live token status and queue countdowns.
  - Active upcoming slot tracking with real-time gate entry updates.
- 🤖 **Smart Slot Booking with AI Recommendation:**
  - Multi-step booking wizard for State, District, Mandi, Crop, and Quantity.
  - Predictive AI wait-time recommendation engine suggesting the least congested slots.
  - Instant token generation with digital gate passes.
- ⏱️ **Live Queue Tracking:**
  - Real-time progress bar with animated countdown.
  - Dynamic indicators for *"Now Serving"*, *"Your Position"*, and *"Farmers Ahead"*.
  - Interactive *"Simulate Queue Move"* mechanism to preview live mandi operations.
- 📊 **7-Stage Procurement Status:**
  - Transparent tracking: *Registration ➔ Slot Allocated ➔ Token Generated ➔ Gate Entry ➔ Quality Inspection ➔ Weighing ➔ Digital J-Form & Payment*.
- 🧪 **Certified Quality Inspection Station:**
  - Testing bay form for Moisture (%), Foreign Matter (%), and Damaged Grain (%).
  - Automated grading calculation (Grade A, Grade B, Reject) with tolerance checks.
- ⚖️ **Electronic Weighbridge Station:**
  - Gross & Tare vehicle weight capture with automatic Net Weight calculation.
  - Automated Minimum Support Price (MSP) payout summary.
  - Instant electronic J-Form procurement receipt generation.
- 📞 **IVR Voice Helpline Simulator:**
  - Dedicated inclusion portal for feature phone users without internet.
  - Interactive dialer keypad (`1–9`, `*`, `0`, `#`) with live speech transcript feed.
- 📍 **Procurement Centre Locator:**
  - Searchable directory of mandis across Rajasthan, Haryana, and Punjab.
  - Live operational hours, current wait load, in-charge contacts, and Google Maps directions.
- 🏢 **Centre Control Dashboard:**
  - Real-time KPI telemetry (Farmers Today, Waiting, In Inspection, Completed, Avg Wait, Volume).
  - Interactive Recharts analytics: Hourly Arrivals, Crop Volume Share, and Wait Time Reductions.
  - Live queue dispatcher with officer triage actions.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite 5, React Router v6
- **Styling:** Tailwind CSS v3, PostCSS, Lucide React Icons
- **Typography:** Google Fonts — Outfit (Headings) & Inter (Body)
- **Data Visualizations:** Recharts
- **State & Persistence:** LocalStorage service layer with pre-seeded demo dataset

---

## 📂 Project Structure

```
kisan-setu/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── admin/            # StatCards, Analytics Charts, Live Queue Table
│   │   ├── booking/          # Slot Booking Wizard & AI Recommendations
│   │   ├── ivr/              # Interactive Phone IVR Simulator
│   │   ├── landing/          # Hero, Problem/Solution, Journey Diagram, Benefits
│   │   ├── layout/           # Navbar, Sidebar, Footer, DemoBadge
│   │   ├── notifications/    # Multi-channel Notification Centre
│   │   ├── procurement/      # Status Timeline, Quality Testing, Weighbridge
│   │   ├── queue/            # Live Queue Progress & Position Tracker
│   │   └── ui/               # Reusable UI Design System (Button, Badge, Card, etc.)
│   ├── data/                 # Mandis, Crops, Demo Farmers, Translations (EN/HI)
│   ├── hooks/                # useLanguage, useDemoMode, useLocalStorage
│   ├── layouts/              # FarmerLayout, AdminLayout
│   ├── pages/                # All 14 Interactive Pages
│   ├── services/             # Storage, Farmer, Slot, Queue, Inspection Services
│   ├── utils/                # Constants, Formatters, Token Generator
│   ├── App.jsx               # Client Routing & Providers
│   ├── index.css             # Design Tokens & Tailwind Directives
│   └── main.jsx              # React Entry Point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# 1. Clone the repository
git clone <your-repo-url>
cd kisan-setu

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🏆 Smart India Hackathon 2026
Built with ❤️ by **Code Crafters** for SIH 2026.
