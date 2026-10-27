'use client';

import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, Menu, X, Calculator, ArrowRightLeft, Car, Percent, Wrench } from 'lucide-react';

interface Props {
  onOpenShieldModal: () => void;
}

export default function Navbar({ onOpenShieldModal }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(8, 12, 20, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
      }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#080C14',
            fontWeight: 900,
            fontSize: '1.25rem',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
          }}>
            K
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.02em' }}>
                klaautos
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F59E0B' }}>
                .ug
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#9CA3AF', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block' }}>
              Kampala Verified Auto Hub
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '26px' }} className="desktop-nav">
          <a href="#reverse-bid" style={{ color: '#E5E7EB', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Car size={16} color="#F59E0B" />
            Reverse Bidding
          </a>
          <a href="#calculator" style={{ color: '#E5E7EB', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calculator size={16} color="#06B6D4" />
            URA Tax Calculator
          </a>
          <a href="#swap" style={{ color: '#E5E7EB', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowRightLeft size={16} color="#10B981" />
            Swap & Top-Up
          </a>
          <a href="#inventory" style={{ color: '#E5E7EB', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600 }}>
            Bond Stock
          </a>
          <a href="#finance" style={{ color: '#E5E7EB', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Percent size={15} color="#FBBF24" />
            Bank Finance
          </a>
          <a href="#inspection" style={{ color: '#E5E7EB', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wrench size={15} color="#10B981" />
            Inspection & Escrow
          </a>
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onOpenShieldModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '9999px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#FBBF24',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <ShieldCheck size={16} />
            <span className="shield-label">Anti-Broker Shield</span>
          </button>

          <a
            href="https://wa.me/256700000000?text=Hello%20KlaAutos%2C%20I%20am%20looking%20for%20a%20verified%20vehicle%20in%20Kampala"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ display: 'none' }}
            id="desktop-whatsapp-btn"
          >
            <MessageCircle size={18} />
            <span>WhatsApp Lead</span>
          </a>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              color: '#F9FAFB',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#0F172A',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <a
            href="#reverse-bid"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#F9FAFB', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Car size={18} color="#F59E0B" /> Reverse Bidding (Dealers Bid)
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#F9FAFB', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Calculator size={18} color="#06B6D4" /> URA Car Tax & Landed Cost
          </a>
          <a
            href="#swap"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#F9FAFB', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <ArrowRightLeft size={18} color="#10B981" /> Swap + Cash Top-Up
          </a>
          <a
            href="#inventory"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#F9FAFB', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}
          >
            Browse Verified Bond Stock
          </a>
          <a
            href="#finance"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#F9FAFB', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Percent size={18} color="#FBBF24" /> Bank Asset Finance
          </a>
          <a
            href="#inspection"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#F9FAFB', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Wrench size={18} color="#10B981" /> Inspection & Safe Escrow
          </a>
          <a
            href="https://wa.me/256700000000"
            className="btn-whatsapp"
            style={{ marginTop: '8px', justifyContent: 'center' }}
          >
            <MessageCircle size={18} /> Chat with Yard Reps on WhatsApp
          </a>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          #desktop-whatsapp-btn {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 500px) {
          .shield-label {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
