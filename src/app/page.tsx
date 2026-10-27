'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import UraTaxCalculator from '../components/UraTaxCalculator';
import ReverseBiddingWizard from '../components/ReverseBiddingWizard';
import SwapTopUpMatcher from '../components/SwapTopUpMatcher';
import VehicleDirectory from '../components/VehicleDirectory';
import AssetFinanceCalculator from '../components/AssetFinanceCalculator';
import InspectionEscrowHub from '../components/InspectionEscrowHub';
import AntiBrokerBadgeModal from '../components/AntiBrokerBadgeModal';
import AntiBrokerShieldProvider from '../components/AntiBrokerShieldProvider';
import Footer from '../components/Footer';
import { Vehicle } from '../types';

export default function Home() {
  const [shieldModalOpen, setShieldModalOpen] = useState(false);
  const [prefilledCar, setPrefilledCar] = useState<{
    make: string;
    model: string;
    year: number;
    budgetUgx: number;
  }>({
    make: 'Toyota',
    model: 'Harrier (XU60)',
    year: 2017,
    budgetUgx: 88000000,
  });

  const handleSelectFromCalculator = (make: string, model: string, year: number, budgetUgx: number) => {
    setPrefilledCar({ make, model, year, budgetUgx });
  };

  const handleSelectFromInventory = (car: Vehicle) => {
    setPrefilledCar({
      make: car.make,
      model: car.model,
      year: car.year,
      budgetUgx: car.priceUgx,
    });
    const element = document.getElementById('reverse-bid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AntiBrokerShieldProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation */}
        <Navbar onOpenShieldModal={() => setShieldModalOpen(true)} />

        {/* Hero Section */}
        <main style={{ flex: 1 }}>
          <Hero onOpenShieldModal={() => setShieldModalOpen(true)} />

          {/* Reverse Bidding Feature */}
          <ReverseBiddingWizard prefilledCar={prefilledCar} />

          {/* URA Tax & Landed Cost Calculator */}
          <UraTaxCalculator onSelectCarForBidding={handleSelectFromCalculator} />

          {/* Swap + Top-Up Matcher */}
          <SwapTopUpMatcher />

          {/* Verified Bond Stock Directory */}
          <VehicleDirectory onSelectCar={handleSelectFromInventory} />

          {/* Bank Asset Finance Calculator */}
          <AssetFinanceCalculator />

          {/* Japan Auction Sheet & Pre-Purchase Mobile Inspection Hub */}
          <InspectionEscrowHub />
        </main>

        {/* Footer */}
        <Footer />

        {/* Anti-Broker Verification Shield Modal */}
        <AntiBrokerBadgeModal
          isOpen={shieldModalOpen}
          onClose={() => setShieldModalOpen(false)}
        />
      </div>
    </AntiBrokerShieldProvider>
  );
}
