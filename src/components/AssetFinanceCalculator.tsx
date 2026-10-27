'use client';

import React, { useState } from 'react';
import { formatUgx } from '../utils/taxCalculator';
import { Percent, Building2, CheckCircle2, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';

export default function AssetFinanceCalculator() {
  const [vehiclePriceUgx, setVehiclePriceUgx] = useState<number>(75000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [interestRateAnnual, setInterestRateAnnual] = useState<number>(19); // 19% standard bank lending in Uganda
  const [selectedBank, setSelectedBank] = useState<string>('Stanbic Bank Uganda');
  const [loanMode, setLoanMode] = useState<'asset_finance' | 'ura_tax_finance'>('asset_finance');

  // Math
  const downPaymentAmountUgx = Math.round((vehiclePriceUgx * downPaymentPercent) / 100);
  const loanPrincipalUgx = vehiclePriceUgx - downPaymentAmountUgx;

  // Monthly amortized loan formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const monthlyRate = interestRateAnnual / 100 / 12;
  const monthlyInstallmentUgx = Math.round(
    (loanPrincipalUgx * (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths))) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  const totalRepaymentUgx = monthlyInstallmentUgx * tenureMonths;
  const totalInterestUgx = totalRepaymentUgx - loanPrincipalUgx;

  const ugandanBanks = [
    { name: 'Stanbic Bank Uganda', rate: 18.5, maxTenure: 60, minDeposit: 20 },
    { name: 'DFCU Bank Vehicle Loan', rate: 19.0, maxTenure: 48, minDeposit: 20 },
    { name: 'Equity Bank Asset Finance', rate: 19.5, maxTenure: 48, minDeposit: 25 },
    { name: 'NCBA Bank Auto Loan', rate: 18.0, maxTenure: 60, minDeposit: 20 },
    { name: 'I&M Bank Uganda', rate: 19.0, maxTenure: 48, minDeposit: 25 },
  ];

  return (
    <section id="finance" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)', background: 'rgba(15, 23, 42, 0.6)' }}>
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
            <Percent size={18} />
            <span>Bank Financing & Import Tax Loans</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#F9FAFB', marginBottom: '16px' }}>
            Calculate Monthly Bank Installments
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: '1.6' }}>
            Partnered with Uganda's leading commercial asset lenders. Finance your bond purchase with 20% down or fund the 40% URA clearing tax when your car arrives in Mombasa.
          </p>
        </div>

        {/* Mode Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
          <button
            onClick={() => {
              setLoanMode('asset_finance');
              setVehiclePriceUgx(75000000);
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: loanMode === 'asset_finance' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(255, 255, 255, 0.05)',
              color: loanMode === 'asset_finance' ? '#080C14' : '#D1D5DB',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            🚗 Complete Vehicle Asset Loan
          </button>

          <button
            onClick={() => {
              setLoanMode('ura_tax_finance');
              setVehiclePriceUgx(28000000); // Typical URA clearing gap
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: loanMode === 'ura_tax_finance' ? 'linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)' : 'rgba(255, 255, 255, 0.05)',
              color: loanMode === 'ura_tax_finance' ? '#080C14' : '#D1D5DB',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            🚢 URA Import Duty & Clearing Gap Loan
          </button>
        </div>

        {/* Main Calculator Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          alignItems: 'start',
          maxWidth: '1080px',
          margin: '0 auto',
        }}>
          {/* Controls */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F9FAFB', marginBottom: '20px' }}>
              Loan Parameters
            </h3>

            {/* Vehicle Value */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: 600, color: '#E5E7EB' }}>
                  {loanMode === 'asset_finance' ? 'Vehicle Purchase Price (UGX):' : 'URA Taxes & Port Clearance Gap (UGX):'}
                </label>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#FBBF24', fontFamily: 'var(--font-mono)' }}>
                  {formatUgx(vehiclePriceUgx)}
                </span>
              </div>
              <input
                type="range"
                min={15000000}
                max={300000000}
                step={1000000}
                value={vehiclePriceUgx}
                onChange={(e) => setVehiclePriceUgx(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F59E0B', cursor: 'pointer' }}
              />
            </div>

            {/* Down Payment Slider */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: 600, color: '#E5E7EB' }}>
                  Down Payment / Equity ({downPaymentPercent}%):
                </label>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                  {formatUgx(downPaymentAmountUgx)}
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
              />
            </div>

            {/* Loan Tenure */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: 600, color: '#E5E7EB' }}>
                  Repayment Period:
                </label>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F9FAFB', fontFamily: 'var(--font-mono)' }}>
                  {tenureMonths} Months ({(tenureMonths / 12).toFixed(1)} Years)
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[12, 24, 36, 48, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTenureMonths(m)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      background: tenureMonths === m ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                      border: tenureMonths === m ? '1.5px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: tenureMonths === m ? '#FBBF24' : '#9CA3AF',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {/* Partner Bank Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: '#E5E7EB', marginBottom: '8px' }}>
                Select Preferred Lending Institution:
              </label>
              <select
                value={selectedBank}
                onChange={(e) => {
                  setSelectedBank(e.target.value);
                  const bank = ugandanBanks.find(b => b.name === e.target.value);
                  if (bank) setInterestRateAnnual(bank.rate);
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                }}
              >
                {ugandanBanks.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name} (~{b.rate}% p.a.)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="glass-panel-accent" style={{ padding: '28px' }}>
            <span style={{ fontSize: '0.85rem', color: '#FBBF24', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Estimated Monthly Commitment
            </span>

            {/* Monthly Installment Spotlight */}
            <div style={{
              margin: '18px 0',
              padding: '24px',
              background: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '12px',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#9CA3AF', display: 'block', marginBottom: '4px' }}>
                Monthly Repayment ({selectedBank})
              </span>
              <div style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
                fontWeight: 900,
                color: '#FBBF24',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '-0.02em'
              }}>
                {formatUgx(monthlyInstallmentUgx)}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
                per month for {tenureMonths} months @ {interestRateAnnual}% p.a.
              </span>
            </div>

            {/* Financial Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#D1D5DB' }}>
                <span>Amount Financed (Principal):</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{formatUgx(loanPrincipalUgx)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#D1D5DB' }}>
                <span>Required Customer Deposit:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#34D399' }}>{formatUgx(downPaymentAmountUgx)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#9CA3AF' }}>
                <span>Total Expected Interest:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{formatUgx(totalInterestUgx)}</span>
              </div>
            </div>

            <div style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <ShieldCheck size={20} color="#3B82F6" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem', color: '#93C5FD' }}>
                Requires 6 months Ugandan bank statements, National ID / Passport, and active URA TIN.
              </span>
            </div>

            <a
              href={`https://wa.me/256700000000?text=${encodeURIComponent(
                `Hello KlaAutos Finance Desk, I would like loan pre-approval for a vehicle of ${formatUgx(vehiclePriceUgx)} with ${selectedBank} (approx ${formatUgx(monthlyInstallmentUgx)}/mo). Please guide me.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
            >
              <span>Apply for Bank Pre-Approval</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
