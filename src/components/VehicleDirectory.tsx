'use client';

import React, { useState } from 'react';
import { Vehicle, AcquisitionType } from '../types';
import { MOCK_VEHICLES } from '../data/mockVehicles';
import { formatUgx } from '../utils/taxCalculator';
import { ShieldCheck, MapPin, Gauge, Fuel, Cog, MessageCircle, Zap, Search, Filter } from 'lucide-react';

interface Props {
  onSelectCar: (car: Vehicle) => void;
}

export default function VehicleDirectory({ onSelectCar }: Props) {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('all');

  const filteredVehicles = MOCK_VEHICLES.filter((v) => {
    const matchesType =
      filterType === 'all' || v.acquisitionType === filterType;
    const matchesSearch =
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.bondLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMake =
      selectedMake === 'all' || v.make.toLowerCase() === selectedMake.toLowerCase();

    return matchesType && matchesSearch && matchesMake;
  });

  return (
    <section id="inventory" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FBBF24',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px'
          }}>
            <ShieldCheck size={18} color="#10B981" />
            <span>Anti-Broker Verified Bond Directory</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#F9FAFB', marginBottom: '16px' }}>
            Verified Car Bond Inventory in Kampala
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: '1.6' }}>
            Physical vehicles parked in vetted bonded yards across Nakawa, Pine, Kyambogo, and Banda. Authentic chassis numbers, auction sheets, and direct bond yard pricing.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Inventory' },
                { id: 'bond_stock', label: 'Bond Stock (Unregistered U-Series)' },
                { id: 'direct_import', label: 'Direct Japan CIF' },
                { id: 'numbered_used', label: 'Numbered Ugandan (UBH...)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: filterType === tab.id ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(255, 255, 255, 0.05)',
                    color: filterType === tab.id ? '#080C14' : '#D1D5DB',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search inputs */}
            <div style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '260px', maxWidth: '420px' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="Search by model, bond yard, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {filteredVehicles.map((car) => {
            const isUnregistered = car.acquisitionType === 'bond_stock';
            const savingsUgx = car.originalPriceUgx ? car.originalPriceUgx - car.priceUgx : 4000000;

            const whatsAppDirectMessage = encodeURIComponent(
              `Hello ${car.bondName}, I found the ${car.year} ${car.make} ${car.model} listed on KlaAutos for ${formatUgx(car.priceUgx)}.\n` +
              `Chassis: ${car.chassisPrefix}. Can I schedule an inspection at your yard in ${car.bondLocation}?`
            );

            return (
              <div
                key={car.id}
                className="glass-panel"
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, border-color 0.2s',
                  position: 'relative',
                }}
              >
                {/* Image Container with Badges & Anti-Broker Shield */}
                <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                  <img
                    src={car.images[0]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="anti-broker-protected-img"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  {/* Anti-Broker Repeating Diagonal Watermark */}
                  <div className="anti-broker-watermark-pattern" />
                  <div className="anti-broker-watermark-text">
                    VERIFIED BOND STOCK • NO BROKER REPOST
                  </div>

                  {/* Transparent Protective Click Shield */}
                  <div
                    className="anti-broker-overlay-shield"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />

                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    background: 'linear-gradient(to top, rgba(8, 12, 20, 0.85) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Top Badges */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                    {isUnregistered ? (
                      <span className="ug-transit-plate">
                        {car.plateNumber}
                      </span>
                    ) : (
                      <span className="ug-plate-badge">
                        {car.plateNumber}
                      </span>
                    )}
                  </div>

                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: 'rgba(16, 185, 129, 0.9)',
                      color: '#052E16',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <ShieldCheck size={13} /> {car.auctionGrade}
                    </span>
                  </div>

                  {/* Bond yard location banner */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <span style={{
                      fontSize: '0.78rem',
                      color: '#FDE68A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 600
                    }}>
                      <MapPin size={13} color="#F59E0B" /> {car.bondLocation}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>
                      {car.chassisPrefix}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 600 }}>
                      {car.bondName}
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F9FAFB', marginTop: '2px' }}>
                      {car.year} {car.make} {car.model}
                    </h3>
                  </div>

                  {/* Specs Pill Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    marginBottom: '16px'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#9CA3AF', display: 'block' }}>Engine</span>
                      <strong style={{ fontSize: '0.82rem', color: '#F9FAFB' }}>{car.engineCc} CC</strong>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#9CA3AF', display: 'block' }}>Mileage</span>
                      <strong style={{ fontSize: '0.82rem', color: '#F9FAFB' }}>{(car.mileageKm / 1000).toFixed(0)}k km</strong>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#9CA3AF', display: 'block' }}>Drive</span>
                      <strong style={{ fontSize: '0.82rem', color: '#F9FAFB' }}>{car.driveType}</strong>
                    </div>
                  </div>

                  {/* Pricing strip */}
                  <div style={{ marginTop: 'auto', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'block' }}>Landed Bond Price</span>
                        <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FBBF24', fontFamily: 'var(--font-mono)' }}>
                          {formatUgx(car.priceUgx)}
                        </div>
                      </div>
                      {car.originalPriceUgx && (
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.82rem', color: '#EF4444', textDecoration: 'line-through' }}>
                            {formatUgx(car.originalPriceUgx)}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#10B981', display: 'block', fontWeight: 700 }}>
                            Save {formatUgx(savingsUgx)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => onSelectCar(car)}
                      className="btn-primary"
                      style={{ flex: 1, padding: '10px 12px', fontSize: '0.85rem' }}
                    >
                      <Zap size={15} />
                      <span>Request Bids</span>
                    </button>

                    <a
                      href={`https://wa.me/256772100200?text=${whatsAppDirectMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp"
                      style={{ padding: '10px 14px' }}
                      title="Chat directly with bond manager"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
