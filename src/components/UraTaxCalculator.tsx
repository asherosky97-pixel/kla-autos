'use client';

import React, { useState } from 'react';
import { calculateUraLandedCost, formatUgx, formatShortUgx, CURRENT_USD_UGX_RATE } from '../utils/taxCalculator';
import { POPULAR_CAR_PRESETS } from '../data/mockVehicles';
import { Calculator, AlertCircle, Info, ShieldCheck, ArrowRight, CheckCircle2, DollarSign } from 'lucide-react';

interface Props {
  onSelectCarForBidding?: (make: string, model: string, year: number, budgetUgx: number) => void;
}

export default function UraTaxCalculator({ onSelectCarForBidding }: Props) {
  const currentYear = new Date().getFullYear();

  // Inputs
  const [cifUsd, setCifUsd] = useState<number>(11200);
  const [manufactureYear, setManufactureYear] = useState<number>(2017);
  const [engineCc, setEngineCc] = useState<number>(1980);
  const [selectedPreset, setSelectedPreset] = useState<string>('Toyota Harrier (XU60)');

  // Calculation
  const result = calculateUraLandedCost(cifUsd, manufactureYear, engineCc, CURRENT_USD_UGX_RATE);
  const vehicleAge = currentYear - manufactureYear;

  const handlePresetSelect = (preset: typeof POPULAR_CAR_PRESETS[0]) => {
    setSelectedPreset(`${preset.make} ${preset.model}`);
    setCifUsd(preset.typicalCifUsd);
    setManufactureYear(preset.year);
    setEngineCc(preset.engineCc);
  };

  const handleSendToReverseBid = () => {
    if (onSelectCarForBidding) {
      const parts = selectedPreset.split(' ');
      const make = parts[0] || 'Toyota';
      const model = parts.slice(1).join(' ') || 'Harrier';
      onSelectCarForBidding(make, model, manufactureYear, result.grandTotalLandedUgx);
    }
    const element = document.getElementById('reverse-bid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#06B6D4',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px'
          }}>
            <Calculator size={18} />
            <span>Uganda Revenue Authority (URA) Tariff Engine</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#F9FAFB', marginBottom: '16px' }}>
            Official URA Car Tax & Landed Cost Calculator
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: '1.6' }}>
            Calculate the exact line-item URA taxes, Mombasa port handling, carrier trailer transit to Kampala, and registration plates. Know your real numbers before brokers mark up the price.
          </p>
        </div>

        {/* Popular Presets Quick Selector */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '0.86rem', color: '#9CA3AF', fontWeight: 600, marginBottom: '12px', textAlign: 'center' }}>
            Quick Select Common Kampala Japanese Imports:
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center'
          }}>
            {POPULAR_CAR_PRESETS.map((preset) => {
              const label = `${preset.make} ${preset.model}`;
              const isSelected = selectedPreset === label;
              return (
                <button
                  key={label}
                  onClick={() => handlePresetSelect(preset)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    background: isSelected ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? '1.5px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? '#FBBF24' : '#D1D5DB',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {preset.make} {preset.model} ({preset.year})
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Calculator Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          alignItems: 'start'
        }}>
          {/* Inputs Column */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F9FAFB', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Vehicle & CIF Details</span>
            </h3>

            {/* CIF Mombasa Input */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#E5E7EB' }}>
                  CIF Mombasa Value (USD):
                </label>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>
                  ${cifUsd.toLocaleString()} USD (~{formatShortUgx(result.customsValueUgx)})
                </span>
              </div>
              <input
                type="range"
                min={2500}
                max={60000}
                step={250}
                value={cifUsd}
                onChange={(e) => setCifUsd(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F59E0B', cursor: 'pointer', marginBottom: '8px' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                }}>
                  <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }}>$</span>
                  <input
                    type="number"
                    value={cifUsd}
                    onChange={(e) => setCifUsd(Math.max(1000, Number(e.target.value)))}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 28px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Manufacture Year & Environmental Alert */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#E5E7EB' }}>
                  Year of Manufacture:
                </label>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F9FAFB', fontFamily: 'var(--font-mono)' }}>
                  {manufactureYear} ({vehicleAge} years old)
                </span>
              </div>
              <input
                type="range"
                min={2005}
                max={currentYear}
                step={1}
                value={manufactureYear}
                onChange={(e) => setManufactureYear(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#06B6D4', cursor: 'pointer' }}
              />

              {/* Environmental Levy Warning Banner */}
              <div style={{
                marginTop: '12px',
                padding: '12px 14px',
                borderRadius: '8px',
                background: result.environmentalLevyRate > 0 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.1)',
                border: result.environmentalLevyRate > 0 ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Info size={18} color={result.environmentalLevyRate > 0 ? '#F59E0B' : '#10B981'} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.84rem', color: result.environmentalLevyRate > 0 ? '#FDE68A' : '#A7F3D0' }}>
                  {result.environmentalLevyRate === 0
                    ? 'Environmental Levy: 0% EXEMPT (Vehicle is under 9 years old).'
                    : `Environmental Levy Triggered: ${result.environmentalLevyRate * 100}% of Customs Value (${result.environmentalTierNote}).`}
                </span>
              </div>
            </div>

            {/* Engine CC */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#E5E7EB' }}>
                  Engine Displacement (CC):
                </label>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F9FAFB', fontFamily: 'var(--font-mono)' }}>
                  {engineCc} CC
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[1500, 1800, 2000, 2500, 2800, 3500].map((cc) => (
                  <button
                    key={cc}
                    onClick={() => setEngineCc(cc)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: engineCc === cc ? 'rgba(6, 182, 212, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                      border: engineCc === cc ? '1px solid #06B6D4' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: engineCc === cc ? '#67E8F9' : '#9CA3AF',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {cc} CC
                  </button>
                ))}
              </div>
            </div>

            {/* FX Exchange note */}
            <div style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              fontSize: '0.82rem',
              color: '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Base URA Exchange Rate:</span>
              <strong style={{ color: '#F9FAFB', fontFamily: 'var(--font-mono)' }}>
                1 USD = UGX {CURRENT_USD_UGX_RATE.toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Results Column */}
          <div className="glass-panel-accent" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <span style={{ fontSize: '0.85rem', color: '#FBBF24', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Estimated Landed Breakdown (Kampala Bond)
              </span>
              <span style={{
                fontSize: '0.75rem',
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34D399',
                padding: '4px 8px',
                borderRadius: '6px',
                fontWeight: 700
              }}>
                100% Transparent
              </span>
            </div>

            {/* Total Landed Cost Card */}
            <div style={{
              padding: '20px',
              background: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '12px',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#9CA3AF', display: 'block', marginBottom: '4px' }}>
                Total Landed & Cleared Cost (UGX)
              </span>
              <div style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 800,
                color: '#FBBF24',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '-0.02em'
              }}>
                {formatUgx(result.grandTotalLandedUgx)}
              </div>
              <span style={{ fontSize: '0.82rem', color: '#10B981', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                <CheckCircle2 size={14} /> Includes CIF + All URA Taxes + Freight + Plates
              </span>
            </div>

            {/* Line Items Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#D1D5DB' }}>
                <span>Customs Value (CIF in UGX):</span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{formatUgx(result.customsValueUgx)}</span>
              </div>

              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#9CA3AF' }}>
                <span>• Import Duty (25%):</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#F9FAFB' }}>{formatUgx(result.importDutyUgx)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#9CA3AF' }}>
                <span>• VAT (18% on Customs + Duty):</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#F9FAFB' }}>{formatUgx(result.vatUgx)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#9CA3AF' }}>
                <span>• Withholding Tax (6%):</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#F9FAFB' }}>{formatUgx(result.withholdingTaxUgx)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#9CA3AF' }}>
                <span>• Infrastructure Levy (1.5%):</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#F9FAFB' }}>{formatUgx(result.infrastructureLevyUgx)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: result.environmentalLevyRate > 0 ? '#F59E0B' : '#9CA3AF' }}>
                <span>• Environmental Levy ({result.environmentalLevyRate * 100}%):</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{formatUgx(result.environmentalLevyUgx)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#06B6D4', fontWeight: 700, paddingTop: '4px' }}>
                <span>Total URA Taxes:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{formatUgx(result.totalUraTaxesUgx)}</span>
              </div>

              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#9CA3AF' }}>
                <span>• Mombasa Port CFS & Handling (~$450):</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#F9FAFB' }}>{formatUgx(result.portClearanceUgx)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#9CA3AF' }}>
                <span>• Carrier Trailer Freight (Msa - Kla):</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#F9FAFB' }}>{formatUgx(result.carrierMombasaToKampalaUgx)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#9CA3AF' }}>
                <span>• Digital Number Plates & Logbook:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#F9FAFB' }}>{formatUgx(result.registrationPlatesUgx)}</span>
              </div>
            </div>

            {/* Broker Savings Highlight */}
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: '#A7F3D0', display: 'block' }}>Estimated Middleman Fee Saved:</span>
                <strong style={{ fontSize: '1.05rem', color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                  ~{formatUgx(result.savingsVsBrokerEstimateUgx)}
                </strong>
              </div>
              <ShieldCheck size={26} color="#10B981" />
            </div>

            {/* Send to Reverse Bidding Button */}
            <button
              onClick={handleSendToReverseBid}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.98rem' }}
            >
              <span>Request Verified Bond Bids for this Unit</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
