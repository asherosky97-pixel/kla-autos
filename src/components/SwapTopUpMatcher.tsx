'use client';

import React, { useState } from 'react';
import { formatUgx } from '../utils/taxCalculator';
import { MOCK_VEHICLES } from '../data/mockVehicles';
import { ArrowRightLeft, CheckCircle2, ShieldCheck, MessageCircle, Sparkles, Building2 } from 'lucide-react';

export default function SwapTopUpMatcher() {
  // Current Car state
  const [currentMake, setCurrentMake] = useState<string>('Toyota');
  const [currentModel, setCurrentModel] = useState<string>('Premio');
  const [currentYear, setCurrentYear] = useState<number>(2009);
  const [currentPlate, setCurrentPlate] = useState<string>('UBH 492C');
  const [currentCondition, setCurrentCondition] = useState<'excellent' | 'good' | 'fair'>('good');
  const [currentMileage, setCurrentMileage] = useState<number>(115000);

  // Target Upgrade Car state
  const [selectedTargetId, setSelectedTargetId] = useState<string>(MOCK_VEHICLES[0].id);

  // Approximate baseline trade-in valuation formula in Uganda
  const calculateTradeInValuation = () => {
    let base = 28000000;
    if (currentModel.toLowerCase().includes('premio')) base = 27000000;
    else if (currentModel.toLowerCase().includes('harrier')) base = 48000000;
    else if (currentModel.toLowerCase().includes('fielder')) base = 24000000;
    else if (currentModel.toLowerCase().includes('prado')) base = 85000000;
    else if (currentModel.toLowerCase().includes('forester')) base = 32000000;
    else if (currentModel.toLowerCase().includes('spacio') || currentModel.toLowerCase().includes('rumion')) base = 21000000;

    const ageDiscount = Math.max(0, (2024 - currentYear) * 1200000);
    const condMultiplier = currentCondition === 'excellent' ? 1.08 : currentCondition === 'good' ? 1.0 : 0.88;
    
    return Math.max(12000000, Math.round((base - ageDiscount) * condMultiplier));
  };

  const tradeInEstimatedUgx = calculateTradeInValuation();
  const targetCar = MOCK_VEHICLES.find((v) => v.id === selectedTargetId) || MOCK_VEHICLES[0];
  const cashTopUpUgx = Math.max(0, targetCar.priceUgx - tradeInEstimatedUgx);

  const swapWhatsAppPayload = encodeURIComponent(
    `*KlaAutos Instant Swap + Top-Up Request*\n` +
    `🔄 *Current Car to Trade In:* ${currentYear} ${currentMake} ${currentModel} (Plate: ${currentPlate})\n` +
    `📊 *Mileage / Condition:* ${currentMileage.toLocaleString()} km, Condition: ${currentCondition.toUpperCase()}\n` +
    `💵 *Estimated Trade-in Value:* ${formatUgx(tradeInEstimatedUgx)}\n` +
    `🎯 *Desired Upgrade:* ${targetCar.year} ${targetCar.make} ${targetCar.model} (${formatUgx(targetCar.priceUgx)})\n` +
    `🤝 *Calculated Top-Up Difference:* ~${formatUgx(cashTopUpUgx)}\n\n` +
    `_Hello, I want to trade in my car at your bond yard and pay the cash difference. Can you inspect and confirm your best top-up offer?_`
  );

  return (
    <section id="swap" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)', background: 'rgba(15, 23, 42, 0.4)' }}>
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
            <ArrowRightLeft size={18} />
            <span>Kampala Trade-In & Liquidity Engine</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#F9FAFB', marginBottom: '16px' }}>
            Instant "Swap + Top-Up" Matcher
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: '1.6' }}>
            Upgrading from a Premio to a Harrier, or a Fielder to a Prado? Value your current numbered Ugandan car and calculate your exact cash difference to drive out of a verified bond yard.
          </p>
        </div>

        {/* 2-Column Split: Current Car vs Upgrade */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          alignItems: 'start',
          maxWidth: '1080px',
          margin: '0 auto 40px auto',
        }}>
          {/* Step 1: Your Current Car */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                padding: '8px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                STEP 1
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F9FAFB' }}>
                Your Current Car to Trade In
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 600 }}>
                  Make:
                </label>
                <input
                  type="text"
                  value={currentMake}
                  onChange={(e) => setCurrentMake(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 600 }}>
                  Model:
                </label>
                <input
                  type="text"
                  value={currentModel}
                  onChange={(e) => setCurrentModel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 600 }}>
                  Manufacture Year:
                </label>
                <input
                  type="number"
                  value={currentYear}
                  onChange={(e) => setCurrentYear(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 600 }}>
                  Ugandan Plate (e.g. UBH...):
                </label>
                <input
                  type="text"
                  value={currentPlate}
                  onChange={(e) => setCurrentPlate(e.target.value.toUpperCase())}
                  placeholder="UBH 123X"
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#FBBF24',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', color: '#D1D5DB', marginBottom: '8px', fontWeight: 600 }}>
                Mechanical & Body Condition:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['excellent', 'good', 'fair'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrentCondition(c)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      background: currentCondition === c ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: currentCondition === c ? '1.5px solid #10B981' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: currentCondition === c ? '#34D399' : '#9CA3AF',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      textTransform: 'capitalize',
                      cursor: 'pointer'
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Current Valuation Result */}
            <div style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#9CA3AF', display: 'block', marginBottom: '4px' }}>
                Estimated Trade-in Valuation
              </span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                {formatUgx(tradeInEstimatedUgx)}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'block', marginTop: '4px' }}>
                Subject to physical yard inspection in Nakawa or Pine
              </span>
            </div>
          </div>

          {/* Step 2: Target Car from Bond Stock */}
          <div className="glass-panel-accent" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#F59E0B',
                padding: '8px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                STEP 2
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F9FAFB' }}>
                Choose Your Desired Upgrade Car
              </h3>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', color: '#D1D5DB', marginBottom: '8px', fontWeight: 600 }}>
                Select Available Bond Stock Unit:
              </label>
              <select
                value={selectedTargetId}
                onChange={(e) => setSelectedTargetId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {MOCK_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.year} {v.make} {v.model} — {formatUgx(v.priceUgx)} ({v.bondLocation})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Target Vehicle Preview Card */}
            <div style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h4 style={{ color: '#F9FAFB', fontWeight: 700, fontSize: '1rem' }}>
                    {targetCar.year} {targetCar.make} {targetCar.model}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9CA3AF', fontSize: '0.8rem', marginTop: '2px' }}>
                    <Building2 size={13} color="#F59E0B" />
                    <span>{targetCar.bondName}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FBBF24', fontFamily: 'var(--font-mono)' }}>
                    {formatUgx(targetCar.priceUgx)}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: '4px', color: '#D1D5DB' }}>
                  {targetCar.engineCc} CC
                </span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: '4px', color: '#D1D5DB' }}>
                  {targetCar.fuelType}
                </span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: '4px', color: '#D1D5DB' }}>
                  {targetCar.driveType}
                </span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  {targetCar.auctionGrade}
                </span>
              </div>
            </div>

            {/* TOP-UP SUMMARY CALCULATION */}
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)',
              border: '1.5px solid #F59E0B',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#FDE68A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Required Cash Top-Up Difference
              </span>
              <div style={{
                fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
                fontWeight: 900,
                color: '#FBBF24',
                fontFamily: 'var(--font-mono)',
                margin: '6px 0'
              }}>
                {formatUgx(cashTopUpUgx)}
              </div>
              <p style={{ fontSize: '0.82rem', color: '#D1D5DB' }}>
                ({formatUgx(targetCar.priceUgx)} Target - {formatUgx(tradeInEstimatedUgx)} Trade-in)
              </p>
            </div>

            {/* WhatsApp Direct Action */}
            <a
              href={`https://wa.me/256772100200?text=${swapWhatsAppPayload}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ width: '100%', padding: '14px', fontSize: '0.98rem' }}
            >
              <MessageCircle size={20} />
              <span>Invite Bond Managers to Bid on This Top-Up</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
