'use client';

import React from 'react';
import { ShieldCheck, X, CheckCircle, AlertTriangle, Building2, FileCheck, Search } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AntiBrokerBadgeModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(10px)',
    }}>
      <div 
        className="glass-panel"
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          position: 'relative',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#9CA3AF',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{
            background: 'rgba(245, 158, 11, 0.15)',
            padding: '12px',
            borderRadius: '12px',
            color: '#F59E0B',
            display: 'flex',
          }}>
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F9FAFB' }}>
              The KlaAutos Anti-Broker Shield
            </h2>
            <p style={{ color: '#F59E0B', fontSize: '0.9rem', fontWeight: 600 }}>
              Say Goodbye to "Bakayungirizi" Markups in Kampala
            </p>
          </div>
        </div>

        <p style={{ color: '#D1D5DB', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
          In Kampala, unverified street brokers routinely walk into bonded yards in Nakawa or Pine, take photos of parked vehicles they do not own, post them online, and inflate prices by <strong>UGX 3M to UGX 7M</strong>.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          <div style={{
            display: 'flex',
            gap: '14px',
            padding: '16px',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <Building2 size={24} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontWeight: 700, color: '#F9FAFB', marginBottom: '4px' }}>
                1. Physical Yard & URA Bond License Verification
              </h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.88rem', lineHeight: '1.5' }}>
                Only licensed bonded warehouses with verified physical premises in Nakawa, Kyambogo, Banda, or Pine can submit bids on KlaAutos. No freelance photo brokers allowed.
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '14px',
            padding: '16px',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <FileCheck size={24} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontWeight: 700, color: '#F9FAFB', marginBottom: '4px' }}>
                2. Japan Auction Sheet & Genuine Chassis Matching
              </h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.88rem', lineHeight: '1.5' }}>
                Every import unit is cross-checked against original Japanese auction records (USS, CAA, TAA) to verify true mileage and ensure no hidden flood or major structural collision damage.
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '14px',
            padding: '16px',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <Search size={24} color="#06B6D4" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontWeight: 700, color: '#F9FAFB', marginBottom: '4px' }}>
                3. URA e-Tax Digital Logbook Check
              </h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.88rem', lineHeight: '1.5' }}>
                For locally numbered units (UBH, UBJ, UBL, etc.), logbooks are authenticated on the URA e-Tax portal to confirm zero bank caveats, active road licenses, and true registered ownership.
              </p>
            </div>
          </div>
        </div>

        <div style={{
          padding: '16px',
          background: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <AlertTriangle size={24} color="#EF4444" style={{ flexShrink: 0 }} />
          <p style={{ color: '#FCA5A5', fontSize: '0.86rem', lineHeight: '1.4' }}>
            <strong>Safety Rule:</strong> Never send deposit money via Mobile Money to private numbers. KlaAutos transactions are completed at the verified bond yard or via verified bank escrow.
          </p>
        </div>

        <button 
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', padding: '14px' }}
        >
          Got It, Browse Verified Cars
        </button>
      </div>
    </div>
  );
}
