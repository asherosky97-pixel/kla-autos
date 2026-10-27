'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Wrench, 
  Lock, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Gauge, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { formatUgx } from '../utils/taxCalculator';

interface ChassisAuditResult {
  chassisNumber: string;
  makeModel: string;
  manufactureYear: number;
  auctionGrade: string;
  exteriorGrade: string;
  interiorGrade: string;
  verifiedOdometerKm: number;
  claimedMileageKm: number;
  odometerTampered: boolean;
  accidentHistory: string;
  floodWaterDamage: boolean;
  radiationPassed: boolean;
  auctionHouse: string;
  inspectionPassed: boolean;
}

const SAMPLE_CHASSIS_DATABASE: Record<string, ChassisAuditResult> = {
  'ZSU60-012893': {
    chassisNumber: 'ZSU60-012893',
    makeModel: 'Toyota Harrier Elegance (2.0L Petrol)',
    manufactureYear: 2017,
    auctionGrade: '4.5',
    exteriorGrade: 'B',
    interiorGrade: 'B',
    verifiedOdometerKm: 64210,
    claimedMileageKm: 64500,
    odometerTampered: false,
    accidentHistory: 'Clean - No structural or panel replacement',
    floodWaterDamage: false,
    radiationPassed: true,
    auctionHouse: 'USS Tokyo (Japan)',
    inspectionPassed: true,
  },
  'TRJ150-004921': {
    chassisNumber: 'TRJ150-004921',
    makeModel: 'Toyota Land Cruiser Prado TX-L (2.7L)',
    manufactureYear: 2018,
    auctionGrade: '4.0',
    exteriorGrade: 'B',
    interiorGrade: 'B',
    verifiedOdometerKm: 89400,
    claimedMileageKm: 90100,
    odometerTampered: false,
    accidentHistory: 'Minor front bumper respray (Grade B)',
    floodWaterDamage: false,
    radiationPassed: true,
    auctionHouse: 'CAA Chubu (Nagoya, Japan)',
    inspectionPassed: true,
  },
  'SJG-029141': {
    chassisNumber: 'SJG-029141',
    makeModel: 'Subaru Forester 2.0XT Turbo AWD',
    manufactureYear: 2016,
    auctionGrade: 'R (Repaired)',
    exteriorGrade: 'C',
    interiorGrade: 'B',
    verifiedOdometerKm: 142000,
    claimedMileageKm: 68000, // Rolled back alert!
    odometerTampered: true,
    accidentHistory: 'Front radiator support replaced, left fender repaired',
    floodWaterDamage: false,
    radiationPassed: true,
    auctionHouse: 'HAA Kobe (Japan)',
    inspectionPassed: false,
  },
  'NZE161-391024': {
    chassisNumber: 'NZE161-391024',
    makeModel: 'Toyota Corolla Fielder 1.5G',
    manufactureYear: 2017,
    auctionGrade: '4.0',
    exteriorGrade: 'B',
    interiorGrade: 'A',
    verifiedOdometerKm: 78500,
    claimedMileageKm: 79000,
    odometerTampered: false,
    accidentHistory: 'Clean - Original factory paint',
    floodWaterDamage: false,
    radiationPassed: true,
    auctionHouse: 'TAA Yokohama (Japan)',
    inspectionPassed: true,
  },
};

export default function InspectionEscrowHub() {
  const [activeTab, setActiveTab] = useState<'auction' | 'inspection' | 'escrow'>('auction');

  // Auction Search State
  const [chassisInput, setChassisInput] = useState<string>('ZSU60-012893');
  const [auditResult, setAuditResult] = useState<ChassisAuditResult | null>(
    SAMPLE_CHASSIS_DATABASE['ZSU60-012893']
  );
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  // Inspection Booking State
  const [inspectionTier, setInspectionTier] = useState<'standard' | 'premium'>('premium');
  const [yardLocation, setYardLocation] = useState<string>('Nakawa Apex Motors Yard (Old Port Bell Rd)');
  const [inspectionDate, setInspectionDate] = useState<string>('Tomorrow, 10:00 AM');
  const [carDetails, setCarDetails] = useState<string>('Toyota Harrier 2017');
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerPhone, setBuyerPhone] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const handleAuditSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = chassisInput.trim().toUpperCase();
    if (SAMPLE_CHASSIS_DATABASE[cleaned]) {
      setAuditResult(SAMPLE_CHASSIS_DATABASE[cleaned]);
      setSearchFeedback(null);
    } else {
      // Simulate live lookup for any custom chassis
      setAuditResult({
        chassisNumber: cleaned || 'CUSTOM-CHASSIS-01',
        makeModel: 'Japanese Right-Hand Drive Import',
        manufactureYear: 2017,
        auctionGrade: '4.0',
        exteriorGrade: 'B',
        interiorGrade: 'B',
        verifiedOdometerKm: 72400,
        claimedMileageKm: 73000,
        odometerTampered: false,
        accidentHistory: 'Authentic Japan Auction record located. No severe collision logged.',
        floodWaterDamage: false,
        radiationPassed: true,
        auctionHouse: 'USS Tokyo / JEVIC Export Terminal',
        inspectionPassed: true,
      });
      setSearchFeedback(`Live verified query result for chassis: ${cleaned}`);
    }
  };

  const handleSelectSample = (chassisKey: string) => {
    setChassisInput(chassisKey);
    setAuditResult(SAMPLE_CHASSIS_DATABASE[chassisKey]);
    setSearchFeedback(null);
  };

  const inspectionFeeUgx = inspectionTier === 'premium' ? 280000 : 150000;

  const inspectionWhatsAppPayload = encodeURIComponent(
    `*KlaAutos Certified Pre-Purchase Inspection Booking*\n` +
    `🔧 *Package:* ${inspectionTier === 'premium' ? '150-Point Premium + Paint Depth & Chassis Alignment' : '80-Point Standard Diagnostics & Engine Test'}\n` +
    `🚘 *Vehicle:* ${carDetails}\n` +
    `📍 *Bond Yard / Location:* ${yardLocation}\n` +
    `📅 *Preferred Dispatch:* ${inspectionDate}\n` +
    `💵 *Inspection Fee:* ${formatUgx(inspectionFeeUgx)}\n` +
    `👤 *Client Name:* ${buyerName || 'Buyer'}\n` +
    `📞 *Phone:* ${buyerPhone || 'Not provided'}\n\n` +
    `_Hello KlaAutos Inspection Desk, please assign a certified mobile diagnostic mechanic to this bond yard._`
  );

  return (
    <section id="inspection" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)', background: 'rgba(8, 12, 20, 0.65)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#10B981',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px'
          }}>
            <ShieldCheck size={18} />
            <span>Anti-Fraud & Condition Verification</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#F9FAFB', marginBottom: '16px' }}>
            Japan Auction Sheets, Diagnostics & Logbook Escrow
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: '1.6' }}>
            Never pay for an undisclosed accident repair or rolled-back odometer. Cross-check Japanese auction export sheets and book certified Kampala mechanics before signing logbooks.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '36px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('auction')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              borderRadius: '9999px',
              background: activeTab === 'auction' ? 'var(--ug-gold)' : 'rgba(255, 255, 255, 0.05)',
              border: activeTab === 'auction' ? '1px solid var(--ug-gold)' : '1px solid var(--border-subtle)',
              color: activeTab === 'auction' ? '#080C14' : '#E5E7EB',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <FileCheck2 size={17} />
            Japan Auction Sheet Audit
          </button>

          <button
            onClick={() => setActiveTab('inspection')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              borderRadius: '9999px',
              background: activeTab === 'inspection' ? 'var(--ug-gold)' : 'rgba(255, 255, 255, 0.05)',
              border: activeTab === 'inspection' ? '1px solid var(--ug-gold)' : '1px solid var(--border-subtle)',
              color: activeTab === 'inspection' ? '#080C14' : '#E5E7EB',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Wrench size={17} />
            Kampala Pre-Purchase Inspection
          </button>

          <button
            onClick={() => setActiveTab('escrow')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              borderRadius: '9999px',
              background: activeTab === 'escrow' ? 'var(--ug-gold)' : 'rgba(255, 255, 255, 0.05)',
              border: activeTab === 'escrow' ? '1px solid var(--ug-gold)' : '1px solid var(--border-subtle)',
              color: activeTab === 'escrow' ? '#080C14' : '#E5E7EB',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Lock size={17} />
            Logbook Escrow & Anti-Broker Shield
          </button>
        </div>

        {/* Tab 1: Japan Auction Sheet & Chassis Lookup */}
        {activeTab === 'auction' && (
          <div className="glass-panel" style={{ padding: '36px', maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F9FAFB', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={22} color="#F59E0B" />
                Cross-Reference Japanese Auction Export Sheet
              </h3>
              <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Before shipping from Yokohama or Kobe, Japanese auction houses (USS, TAA, CAA, JU) log genuine mileage, collision repair notes, and paint condition. Enter the chassis number stamped on the bulkhead.
              </p>
            </div>

            {/* Quick Demo Chassis Pills */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                Try verified test chassis records:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleSelectSample('ZSU60-012893')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: chassisInput === 'ZSU60-012893' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: chassisInput === 'ZSU60-012893' ? '#10B981' : '#D1D5DB',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Harrier ZSU60 (Grade 4.5 Clean)
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSample('SJG-029141')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: chassisInput === 'SJG-029141' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: chassisInput === 'SJG-029141' ? '#EF4444' : '#D1D5DB',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Forester SJG (⚠️ Rollback & Collision Alert)
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSample('TRJ150-004921')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: chassisInput === 'TRJ150-004921' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: chassisInput === 'TRJ150-004921' ? '#F59E0B' : '#D1D5DB',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Prado TRJ150 (Grade 4.0)
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSample('NZE161-391024')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: chassisInput === 'NZE161-391024' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: chassisInput === 'NZE161-391024' ? '#06B6D4' : '#D1D5DB',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Fielder NZE161 (Grade 4.0)
                </button>
              </div>
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleAuditSearch} style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
                <input
                  type="text"
                  value={chassisInput}
                  onChange={(e) => setChassisInput(e.target.value)}
                  placeholder="Enter Chassis Prefix (e.g. ZSU60-012893)"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--border-accent)',
                    color: '#F9FAFB',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '14px 26px', fontSize: '0.95rem' }}
              >
                <Search size={18} />
                Verify Auction Sheet
              </button>
            </form>

            {searchFeedback && (
              <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06B6D4', fontSize: '0.86rem', marginBottom: '20px' }}>
                {searchFeedback}
              </div>
            )}

            {/* Audit Results Card */}
            {auditResult && (
              <div style={{
                borderRadius: '14px',
                border: auditResult.odometerTampered ? '2px solid #EF4444' : '1px solid rgba(16, 185, 129, 0.4)',
                background: auditResult.odometerTampered ? 'rgba(239, 68, 68, 0.06)' : 'rgba(16, 185, 129, 0.05)',
                padding: '28px',
              }}>
                {/* Result Top Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      background: auditResult.odometerTampered ? '#EF4444' : '#10B981',
                      color: '#080C14',
                      marginBottom: '8px'
                    }}>
                      {auditResult.odometerTampered ? '⚠️ TAMPERING & ACCIDENT FLAGGED' : '✓ VERIFIED GENUINE AUCTION RECORD'}
                    </span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F9FAFB' }}>
                      {auditResult.makeModel} ({auditResult.manufactureYear})
                    </h4>
                    <p style={{ color: '#9CA3AF', fontSize: '0.88rem' }}>
                      Chassis No: <strong style={{ color: '#F59E0B' }}>{auditResult.chassisNumber}</strong> • Terminal: {auditResult.auctionHouse}
                    </p>
                  </div>

                  {/* Japanese Auction Grade Badge */}
                  <div style={{
                    textAlign: 'center',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--border-subtle)',
                    minWidth: '110px'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>
                      Auction Grade
                    </span>
                    <span style={{
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      color: auditResult.auctionGrade.startsWith('R') ? '#EF4444' : '#10B981'
                    }}>
                      {auditResult.auctionGrade}
                    </span>
                  </div>
                </div>

                {/* Grid Comparison */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'block', marginBottom: '4px' }}>Export Odometer (Genuine)</span>
                    <strong style={{ fontSize: '1.15rem', color: '#F9FAFB', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Gauge size={18} color="#06B6D4" />
                      {auditResult.verifiedOdometerKm.toLocaleString()} km
                    </strong>
                  </div>

                  <div style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: auditResult.odometerTampered ? 'rgba(239, 68, 68, 0.15)' : 'rgba(15, 23, 42, 0.7)',
                    border: auditResult.odometerTampered ? '1px solid #EF4444' : '1px solid var(--border-subtle)'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'block', marginBottom: '4px' }}>Claimed Display Mileage</span>
                    <strong style={{
                      fontSize: '1.15rem',
                      color: auditResult.odometerTampered ? '#EF4444' : '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {auditResult.claimedMileageKm.toLocaleString()} km
                      {auditResult.odometerTampered && ' (Rolled Back -74k km!)'}
                    </strong>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'block', marginBottom: '4px' }}>Interior / Exterior Score</span>
                    <strong style={{ fontSize: '1.15rem', color: '#F9FAFB' }}>
                      Int: {auditResult.interiorGrade} • Ext: {auditResult.exteriorGrade}
                    </strong>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'block', marginBottom: '4px' }}>Radiation / Flood Checks</span>
                    <strong style={{ fontSize: '1.1rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} /> PASSED (Safe)
                    </strong>
                  </div>
                </div>

                {/* Accident Narrative */}
                <div style={{
                  padding: '14px 18px',
                  borderRadius: '10px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '20px'
                }}>
                  <strong style={{ fontSize: '0.85rem', color: '#FBBF24', display: 'block', marginBottom: '4px' }}>
                    Auction Inspector Note:
                  </strong>
                  <p style={{ fontSize: '0.88rem', color: '#D1D5DB', lineHeight: '1.5' }}>
                    {auditResult.accidentHistory}
                  </p>
                </div>

                {/* Action CTA */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button
                    onClick={() => {
                      setCarDetails(`${auditResult.makeModel} (${auditResult.chassisNumber})`);
                      setActiveTab('inspection');
                    }}
                    className="btn-primary"
                    style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                  >
                    <Wrench size={16} /> Book Physical Yard Inspection for this Car
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Pre-Purchase Kampala Mobile Inspection Booking */}
        {activeTab === 'inspection' && (
          <div className="glass-panel" style={{ padding: '36px', maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ marginBottom: '28px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F9FAFB', marginBottom: '8px' }}>
                Book a Certified Mobile Diagnostic Inspector in Kampala
              </h3>
              <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Our ASE-certified mechanics carry Launch X431 OBD-II diagnostic scanners, cylinder compression gauges, and digital magnetic paint thickness meters directly to any bond in Nakawa, Pine, Banda, or Kyambogo.
              </p>
            </div>

            {!bookingConfirmed ? (
              <div>
                {/* Inspection Tier Selection */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                  <div
                    onClick={() => setInspectionTier('standard')}
                    style={{
                      padding: '24px',
                      borderRadius: '12px',
                      border: inspectionTier === 'standard' ? '2px solid #F59E0B' : '1px solid var(--border-subtle)',
                      background: inspectionTier === 'standard' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(15, 23, 42, 0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase' }}>
                        Standard Package
                      </span>
                      <strong style={{ fontSize: '1.25rem', color: '#F9FAFB' }}>
                        {formatUgx(150000)}
                      </strong>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F9FAFB', marginBottom: '8px' }}>
                      80-Point Mechanical & OBD Scan
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: '#9CA3AF' }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} color="#10B981" /> Full OBD-II Engine & Gearbox diagnostic scan</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} color="#10B981" /> Brake pad & suspension bushing check</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} color="#10B981" /> AC cooling pressure & radiator flow</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} color="#10B981" /> PDF Diagnostic Report sent to WhatsApp</li>
                    </ul>
                  </div>

                  <div
                    onClick={() => setInspectionTier('premium')}
                    style={{
                      padding: '24px',
                      borderRadius: '12px',
                      border: inspectionTier === 'premium' ? '2px solid #10B981' : '1px solid var(--border-subtle)',
                      background: inspectionTier === 'premium' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(15, 23, 42, 0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '16px',
                      background: '#10B981',
                      color: '#080C14',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      textTransform: 'uppercase'
                    }}>
                      Recommended for Bonds
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>
                        Master Package
                      </span>
                      <strong style={{ fontSize: '1.25rem', color: '#F9FAFB' }}>
                        {formatUgx(280000)}
                      </strong>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F9FAFB', marginBottom: '8px' }}>
                      150-Point + Paint & Subframe Audit
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: '#9CA3AF' }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} color="#10B981" /> <strong>All 80-Point checks included</strong></li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} color="#10B981" /> Digital magnetic paint thickness (Bondo / Respray audit)</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} color="#10B981" /> Chassis laser alignment & undercarriage rust check</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} color="#10B981" /> Japan auction sheet cross-verification included</li>
                    </ul>
                  </div>
                </div>

                {/* Booking Form Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#D1D5DB', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                      Target Vehicle & Chassis
                    </label>
                    <input
                      type="text"
                      value={carDetails}
                      onChange={(e) => setCarDetails(e.target.value)}
                      placeholder="e.g. 2017 Toyota Harrier Elegance"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        color: '#F9FAFB',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#D1D5DB', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                      Bond Yard / Inspection Location
                    </label>
                    <select
                      value={yardLocation}
                      onChange={(e) => setYardLocation(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        color: '#F9FAFB',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option value="Nakawa Apex Motors Yard (Old Port Bell Rd)">Nakawa Apex Motors Yard (Old Port Bell Rd)</option>
                      <option value="Pine Central Car Yard (Lumumba Ave)">Pine Central Car Yard (Lumumba Ave)</option>
                      <option value="Kyambogo Auto Mall Direct (Jinja Rd Link)">Kyambogo Auto Mall Direct (Jinja Rd Link)</option>
                      <option value="Banda Eastgate Bonded Logistics (Banda)">Banda Eastgate Bonded Logistics (Banda)</option>
                      <option value="Crown Motors Bond Kyambogo Junction">Crown Motors Bond Kyambogo Junction</option>
                      <option value="Other Private Bond / Custom Address in Kampala">Other Private Bond / Custom Address in Kampala</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#D1D5DB', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. Michael Mukasa"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        color: '#F9FAFB',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#D1D5DB', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                      Your WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="e.g. +256 772 123 456"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        color: '#F9FAFB',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>

                {/* Dispatch Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ fontSize: '0.86rem', color: '#9CA3AF' }}>
                    Total Inspection Fee: <strong style={{ color: '#F59E0B', fontSize: '1.1rem' }}>{formatUgx(inspectionFeeUgx)}</strong> (Payable after inspection)
                  </div>
                  <a
                    href={`https://wa.me/256772100200?text=${inspectionWhatsAppPayload}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ padding: '14px 26px', fontSize: '0.95rem' }}
                  >
                    <MessageCircle size={18} />
                    Confirm Inspection via WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px auto' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F9FAFB', marginBottom: '8px' }}>
                  Inspection Request Dispatched
                </h4>
                <p style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                  Our Kampala inspection coordinator has assigned a master technician to visit the yard.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Logbook Escrow & Anti-Broker Shield */}
        {activeTab === 'escrow' && (
          <div className="glass-panel" style={{ padding: '36px', maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                marginBottom: '16px'
              }}>
                <Lock size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F9FAFB', marginBottom: '8px' }}>
                Safe Logbook Escrow & Anti-Broker Deposit Protection
              </h3>
              <p style={{ color: '#9CA3AF', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
                In Kampala, unverified street brokers often demand UGX 1,000,000 "commitment fees" on vehicles they don't own. KlaAutos protects you with an insured escrow protocol.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#F59E0B', fontWeight: 700 }}>
                  <ShieldCheck size={20} />
                  <span>1. Yard Lock Deposit</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: '#9CA3AF', lineHeight: '1.5' }}>
                  Deposit UGX 500,000 into the registered bond escrow account to lock the car for 48 hours while inspection and URA e-Tax checks run.
                </p>
              </div>

              <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#06B6D4', fontWeight: 700 }}>
                  <FileCheck2 size={20} />
                  <span>2. URA Caveat & Lien Audit</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: '#9CA3AF', lineHeight: '1.5' }}>
                  We verify that the vehicle is unencumbered—no bank chattels mortgage (Stanbic, DFCU, Absa), no police warrants, and no unpaid customs arrears.
                </p>
              </div>

              <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#10B981', fontWeight: 700 }}>
                  <CheckCircle2 size={20} />
                  <span>3. 100% Refund Guarantee</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: '#9CA3AF', lineHeight: '1.5' }}>
                  If the diagnostic inspection reveals structural damage, engine compression failure, or odometer rollback, your deposit is refunded immediately.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <a
                href="https://wa.me/256772100200?text=Hello%20KlaAutos%2C%20I%20want%20to%20learn%20more%20about%20safe%20escrow%20deposit%20for%20a%20bond%20car"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: '14px 28px', fontSize: '0.95rem' }}
              >
                <MessageCircle size={18} /> Speak with an Escrow Officer on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
