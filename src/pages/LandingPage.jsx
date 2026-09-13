import React from 'react';
import Hero from '../components/landing/Hero';
import ProblemSolution from '../components/landing/ProblemSolution';
import HowItWorks from '../components/landing/HowItWorks';
import FlowDiagram from '../components/landing/FlowDiagram';
import Benefits from '../components/landing/Benefits';
import SupportedStates from '../components/landing/SupportedStates';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DemoBadge from '../components/layout/DemoBadge';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <DemoBadge />
      <main className="flex-1">
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <FlowDiagram />
        <Benefits />
        <SupportedStates />
      </main>
      <Footer />
    </div>
  );
}