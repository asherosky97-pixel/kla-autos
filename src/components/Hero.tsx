'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Calculator, ArrowRightLeft, CheckCircle2, TrendingDown } from 'lucide-react';

interface Props {
  onOpenShieldModal: () => void;
}

export default function Hero({ onOpenShieldModal }: Props) {
  return (
    <section style={{
      position: 'relative',
      padding: '70px 0 60px 0',
      overflow: 'hidden',
      background: 'radial-gradient(circle at 50% 10%, rgba(245, 158, 11, 0.12) 0%, rgba(8, 12, 20, 0) 65%)',
    }}>
      {/* Background grid accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Top pill badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div 
            onClick={onOpenShieldModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            className="pulse-glow"
          >
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
            }} />
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FDE68A' }}>
              Uganda's 1st Reverse-Bidding Automotive Network
            </span>
            <ShieldCheck size={16} color="#F59E0B" />
          </div>
        </div>

        {/* Main headline */}
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '22px',
          }}>
            Stop Paying Street Broker Markups.{' '}
            <span className="gradient-text-gold">
              Let Kampala's Car Bonds Bid For You.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.22rem)',
            color: '#9CA3AF',
            lineHeight: 1.6,
            marginBottom: '36px',
            maxWidth: '720px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            No more unverified middlemen taking photos of cars in Nakawa or Pine they don't own. Tell us what car you want—vetted bonds compete to submit their best landed cash and trade-in quotes directly to your WhatsApp.
          </p>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center',
            marginBottom: '48px',
          }}>
            <a href="#reverse-bid" className="btn-primary" style={{ padding: '15px 30px', fontSize: '1.05rem' }}>
              <Zap size={20} />
              <span>Post What You Want (Get Bids)</span>
              <ArrowRight size={18} />
            </a>

            <a href="#calculator" className="btn-secondary" style={{ padding: '15px 26px', fontSize: '1.05rem' }}>
              <Calculator size={20} color="#06B6D4" />
              <span>Calculate URA Taxes</span>
            </a>

            <a href="#swap" className="btn-secondary" style={{ padding: '15px 26px', fontSize: '1.05rem' }}>
              <ArrowRightLeft size={20} color="#10B981" />
              <span>Trade-In Swap & Top-Up</span>
            </a>
          </div>

          {/* Social Proof & Metrics Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            maxWidth: '960px',
            margin: '0 auto',
          }}>
            <div className="glass-panel" style={{ padding: '18px 20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', marginBottom: '6px' }}>
                <TrendingDown size={20} />
                <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  UGX 4.8M
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#9CA3AF' }}>
                Average buyer savings cutting out street middlemen
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '18px 20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', marginBottom: '6px' }}>
                <CheckCircle2 size={20} />
                <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  48+ Bonds
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#9CA3AF' }}>
                Vetted physical yards in Nakawa, Kyambogo, Banda & Pine
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '18px 20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#06B6D4', marginBottom: '6px' }}>
                <ShieldCheck size={20} />
                <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  100% Verified
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#9CA3AF' }}>
                Japan auction sheets & URA e-Tax logbooks checked
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
