'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AcquisitionType } from '../types';
import { formatUgx, formatShortUgx } from '../utils/taxCalculator';
import { Car, Zap, CheckCircle2, ShieldCheck, MessageCircle, Clock, Building2, Phone, MapPin, Sparkles } from 'lucide-react';

interface Props {
  prefilledCar?: {
    make: string;
    model: string;
    year: number;
    budgetUgx: number;
  };
}

export default function ReverseBiddingWizard({ prefilledCar }: Props) {
  const [step, setStep] = useState<number>(1);
  const [make, setMake] = useState<string>(prefilledCar?.make || 'Toyota');
  const [model, setModel] = useState<string>(prefilledCar?.model || 'Harrier');
  const [yearMin, setYearMin] = useState<number>(prefilledCar?.year ? prefilledCar.year - 1 : 2016);
  const [yearMax, setYearMax] = useState<number>(prefilledCar?.year || 2018);
  const [acquisitionType, setAcquisitionType] = useState<AcquisitionType>('bond_stock');
  const [fuelType, setFuelType] = useState<string>('Petrol');
  const [budgetUgx, setBudgetUgx] = useState<number>(prefilledCar?.budgetUgx || 75000000);
  const [timeline, setTimeline] = useState<string>('immediate');
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerPhone, setBuyerPhone] = useState<string>('');
  const [buyerDistrict, setBuyerDistrict] = useState<string>('Kampala (Nakawa / Ntinda / Central)');
  
  // Submission & Simulated Bids state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      alert('Please fill in your name and WhatsApp number to receive quotes.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#06B6D4', '#FFFFFF'],
      });
    }, 1200);
  };

  const simulatedWhatsAppPayload = encodeURIComponent(
    `*KlaAutos Reverse-Bid Lead Alert*\n` +
    `🚘 *Vehicle:* ${make} ${model} (${yearMin}-${yearMax})\n` +
    `📦 *Type:* ${acquisitionType.replace('_', ' ').toUpperCase()}\n` +
    `💰 *Buyer Budget:* ${formatUgx(budgetUgx)}\n` +
    `⏱️ *Timeline:* ${timeline.toUpperCase()}\n` +
    `📍 *Buyer Location:* ${buyerDistrict}\n` +
    `👤 *Buyer Name:* ${buyerName}\n` +
    `📞 *WhatsApp:* ${buyerPhone}\n\n` +
    `_Reply directly to this buyer with your best landed bond quote._`
  );

  return (
    <section id="reverse-bid" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#F59E0B',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px'
          }}>
            <Zap size={18} />
            <span>The Carwow Reverse-Bidding Hook for Uganda</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#F9FAFB', marginBottom: '16px' }}>
            Post What You Want. Let Kampala Bonds Compete.
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: '1.6' }}>
            Don't waste days driving across Jinja Road in traffic. Specify your car, set your budget, and verified car bonds in Nakawa, Pine, and Kyambogo will send you their best discounted cash offers.
          </p>
        </div>

        {/* Wizard Container */}
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          {!submitted ? (
            <div className="glass-panel" style={{ padding: '36px', position: 'relative' }}>
              {/* Stepper progress indicator */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '32px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10%',
                  right: '10%',
                  height: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  zIndex: 1,
                  transform: 'translateY(-50%)'
                }} />

                {[
                  { num: 1, label: 'Vehicle' },
                  { num: 2, label: 'Acquisition' },
                  { num: 3, label: 'Budget' },
                  { num: 4, label: 'Contact' },
                ].map((s) => (
                  <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: step >= s.num ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#1E293B',
                      color: step >= s.num ? '#080C14' : '#9CA3AF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      boxShadow: step >= s.num ? '0 0 12px rgba(245, 158, 11, 0.4)' : 'none',
                      transition: 'all 0.3s ease'
                    }}>
                      {s.num}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: step >= s.num ? '#F59E0B' : '#6B7280', marginTop: '6px', fontWeight: 600 }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Target Car */}
              {step === 1 && (
                <div className="animate-slide-up">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F9FAFB', marginBottom: '18px' }}>
                    Step 1: What car are you looking for?
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '22px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: '#D1D5DB', marginBottom: '8px', fontWeight: 600 }}>
                        Make:
                      </label>
                      <select
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                          fontSize: '0.95rem',
                        }}
                      >
                        <option value="Toyota">Toyota</option>
                        <option value="Subaru">Subaru</option>
                        <option value="Mazda">Mazda</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Mitsubishi">Mitsubishi</option>
                        <option value="Land Rover">Land Rover</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Honda">Honda</option>
                        <option value="Suzuki">Suzuki</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: '#D1D5DB', marginBottom: '8px', fontWeight: 600 }}>
                        Model:
                      </label>
                      <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="e.g. Harrier, Forester, Premio, Prado..."
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '18px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: '#D1D5DB', marginBottom: '8px', fontWeight: 600 }}>
                        Min Year:
                      </label>
                      <input
                        type="number"
                        value={yearMin}
                        onChange={(e) => setYearMin(Number(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                          fontSize: '0.95rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: '#D1D5DB', marginBottom: '8px', fontWeight: 600 }}>
                        Max Year:
                      </label>
                      <input
                        type="number"
                        value={yearMax}
                        onChange={(e) => setYearMax(Number(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                          fontSize: '0.95rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: '#D1D5DB', marginBottom: '8px', fontWeight: 600 }}>
                        Fuel Type:
                      </label>
                      <select
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                          fontSize: '0.95rem',
                        }}
                      >
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-primary"
                    >
                      Next: Choose Inventory Tier →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Acquisition Tier */}
              {step === 2 && (
                <div className="animate-slide-up">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F9FAFB', marginBottom: '18px' }}>
                    Step 2: Which vehicle tier do you prefer?
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                    {[
                      {
                        type: 'bond_stock' as AcquisitionType,
                        title: '1. Unregistered Kampala Bond Stock (Recommended)',
                        badge: 'Immediate Drive-Out',
                        desc: 'Already parked in a bonded warehouse in Nakawa, Kyambogo, Banda or Pine. Ready for URA number plate registration in your name within 24 hours.',
                      },
                      {
                        type: 'direct_import' as AcquisitionType,
                        title: '2. Direct Japan / Dubai Import Order',
                        badge: 'Lowest CIF Price',
                        desc: 'Direct container/RORO shipping from Yokohama/Nagoya or Dubai to Mombasa port. Takes 3–4 weeks to arrive in Kampala. Saves 15–20% on landed cost.',
                      },
                      {
                        type: 'numbered_used' as AcquisitionType,
                        title: '3. Verified Local Ugandan Used ("Numbered" Cars)',
                        badge: 'UBH / UBJ / UBL / UBN / UBP',
                        desc: 'Already registered on Ugandan roads. Strictly inspected for clean URA digital logbook, zero bank caveats, and genuine mileage.',
                      },
                    ].map((opt) => (
                      <div
                        key={opt.type}
                        onClick={() => setAcquisitionType(opt.type)}
                        style={{
                          padding: '18px',
                          borderRadius: '12px',
                          background: acquisitionType === opt.type ? 'rgba(245, 158, 11, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                          border: acquisitionType === opt.type ? '2px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <strong style={{ color: acquisitionType === opt.type ? '#FBBF24' : '#F9FAFB', fontSize: '1rem' }}>
                            {opt.title}
                          </strong>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: acquisitionType === opt.type ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)',
                            color: acquisitionType === opt.type ? '#080C14' : '#9CA3AF'
                          }}>
                            {opt.badge}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.86rem', color: '#9CA3AF', lineHeight: '1.4' }}>
                          {opt.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn-primary"
                    >
                      Next: Set Budget & Timeline →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Budget & Timeline */}
              {step === 3 && (
                <div className="animate-slide-up">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F9FAFB', marginBottom: '18px' }}>
                    Step 3: What is your budget & timeline?
                  </h3>

                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#D1D5DB' }}>
                        Your Maximum Target Budget (UGX):
                      </label>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FBBF24', fontFamily: 'var(--font-mono)' }}>
                        {formatUgx(budgetUgx)}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={20000000}
                      max={350000000}
                      step={1000000}
                      value={budgetUgx}
                      onChange={(e) => setBudgetUgx(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#F59E0B', cursor: 'pointer', marginBottom: '12px' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6B7280' }}>
                      <span>UGX 20M</span>
                      <span>UGX 100M</span>
                      <span>UGX 200M</span>
                      <span>UGX 350M+</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '28px' }}>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '10px' }}>
                      When are you ready to buy or trade in?
                    </label>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      {[
                        { id: 'immediate', label: 'Ready This Week', note: 'Ready cash / instant top-up' },
                        { id: 'within_14_days', label: 'Within 2 Weeks', note: 'Finalizing bank/funds' },
                        { id: 'within_30_days', label: 'Within 30 Days', note: 'Comparing market prices' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTimeline(t.id)}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            background: timeline === t.id ? 'rgba(245, 158, 11, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                            border: timeline === t.id ? '1.5px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                            color: timeline === t.id ? '#FBBF24' : '#9CA3AF',
                            textAlign: 'left',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: timeline === t.id ? '#FBBF24' : '#F9FAFB' }}>
                            {t.label}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>{t.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-secondary"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="btn-primary"
                    >
                      Next: Enter WhatsApp & Receive Quotes →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & WhatsApp */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="animate-slide-up">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F9FAFB', marginBottom: '18px' }}>
                    Step 4: Where should verified bonds send your quotes?
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: '#D1D5DB', marginBottom: '8px', fontWeight: 600 }}>
                        Your Full Name:
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="e.g. David Mukasa"
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: '#D1D5DB', marginBottom: '8px', fontWeight: 600 }}>
                        WhatsApp Mobile Number (+256):
                      </label>
                      <input
                        type="tel"
                        required
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="e.g. 0772 123456 or 0701 987654"
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '0.88rem', color: '#D1D5DB', marginBottom: '8px', fontWeight: 600 }}>
                      Your District / Neighborhood:
                    </label>
                    <input
                      type="text"
                      value={buyerDistrict}
                      onChange={(e) => setBuyerDistrict(e.target.value)}
                      placeholder="e.g. Ntinda, Kololo, Muyenga, Entebbe, Mukono..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '0.95rem',
                      }}
                    />
                  </div>

                  <div style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '26px'
                  }}>
                    <ShieldCheck size={24} color="#10B981" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.84rem', color: '#A7F3D0' }}>
                      <strong>Strict Privacy:</strong> Your number is only shared with verified, licensed bond yards in Kampala. Street brokers cannot access this request.
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn-secondary"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{ padding: '14px 28px', fontSize: '1rem' }}
                    >
                      {isSubmitting ? 'Transmitting to Kampala Bonds...' : 'Submit Request & Get Bond Bids 🚀'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Live Simulated Reverse Bids State */
            <div className="glass-panel-accent animate-slide-up" style={{ padding: '36px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#10B981',
                  marginBottom: '16px'
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F9FAFB', marginBottom: '8px' }}>
                  Lead Transmitted to Verified Kampala Bonds!
                </h3>
                <p style={{ color: '#9CA3AF', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
                  Your request for a <strong>{yearMin}–{yearMax} {make} {model}</strong> with budget <strong>{formatUgx(budgetUgx)}</strong> was dispatched to vetted yards in Nakawa, Pine, and Kyambogo.
                </p>
              </div>

              {/* Live Incoming Quotes Ticker */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#FBBF24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} /> Live Matching Bond Offers:
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>
                    ● 3 Yards Responding Now
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Bid 1 */}
                  <div style={{
                    padding: '18px',
                    borderRadius: '12px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1.5px solid rgba(245, 158, 11, 0.4)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <Building2 size={16} color="#F59E0B" />
                        <strong style={{ color: '#F9FAFB', fontSize: '1rem' }}>Nakawa Apex Motors & Bond</strong>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', fontSize: '0.72rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          VERIFIED YARD
                        </span>
                      </div>
                      <p style={{ color: '#D1D5DB', fontSize: '0.88rem' }}>
                        Unit in stock: <strong>2017 {make} {model} Elegance</strong> (Pearl White, Grade 4.5, 58k km)
                      </p>
                      <span style={{ color: '#9CA3AF', fontSize: '0.78rem' }}>
                        Plot 14 Old Port Bell Rd, Nakawa • Chassis ZSU60-0082***
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FBBF24', fontFamily: 'var(--font-mono)' }}>
                        {formatUgx(Math.round(budgetUgx * 0.96))}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#10B981', display: 'block', marginBottom: '8px' }}>
                        Save UGX {(budgetUgx * 0.04 / 1000000).toFixed(1)}M vs. Street Asking
                      </span>
                      <a
                        href={`https://wa.me/256772100200?text=${simulatedWhatsAppPayload}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp"
                        style={{ padding: '8px 14px', fontSize: '0.84rem' }}
                      >
                        <MessageCircle size={16} /> Chat Nakawa Yard Manager
                      </a>
                    </div>
                  </div>

                  {/* Bid 2 */}
                  <div style={{
                    padding: '18px',
                    borderRadius: '12px',
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <Building2 size={16} color="#06B6D4" />
                        <strong style={{ color: '#F9FAFB', fontSize: '1rem' }}>Pine Central Car Yard & Bond</strong>
                        <span style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#67E8F9', fontSize: '0.72rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          LUMUMBA AVE
                        </span>
                      </div>
                      <p style={{ color: '#D1D5DB', fontSize: '0.88rem' }}>
                        Unit in stock: <strong>2017 {make} {model} Premium</strong> (Black, Leather, Sunroof)
                      </p>
                      <span style={{ color: '#9CA3AF', fontSize: '0.78rem' }}>
                        Opp. Rwenzori Courts, Kampala Central • Clean Logbook
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F9FAFB', fontFamily: 'var(--font-mono)' }}>
                        {formatUgx(Math.round(budgetUgx * 0.98))}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#10B981', display: 'block', marginBottom: '8px' }}>
                        Complimentary 1st Full Service & URA Plates
                      </span>
                      <a
                        href={`https://wa.me/256701334455?text=${simulatedWhatsAppPayload}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp"
                        style={{ padding: '8px 14px', fontSize: '0.84rem' }}
                      >
                        <MessageCircle size={16} /> Chat Pine Yard Manager
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.88rem' }}
                >
                  Post Another Vehicle Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
