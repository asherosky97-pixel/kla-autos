'use client';

import React from 'react';
import { ShieldCheck, MessageCircle, Phone, MapPin, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#05080F',
      borderTop: '1px solid var(--border-subtle)',
      padding: '70px 0 30px 0',
      color: '#9CA3AF',
      fontSize: '0.9rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '50px',
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#080C14',
                fontWeight: 900,
                fontSize: '1.2rem',
              }}>
                K
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F9FAFB' }}>
                klaautos<span style={{ color: '#F59E0B' }}>.ug</span>
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: '#9CA3AF', marginBottom: '18px' }}>
              Uganda's reverse-bidding automotive marketplace connecting direct car buyers with vetted bonded warehouses in Kampala. Eliminating phantom street brokers with verified landed pricing.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '0.82rem', fontWeight: 600 }}>
              <ShieldCheck size={16} /> 100% Verified Yard & Auction Sheet Policy
            </div>
          </div>

          {/* Bonded Warehouse Hubs */}
          <div>
            <h4 style={{ color: '#F9FAFB', fontWeight: 700, marginBottom: '16px', fontSize: '1rem' }}>
              Kampala Bond Yards
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li>📍 Nakawa Spear Motors Corridor</li>
              <li>📍 Pine Yard (Lumumba Avenue, Central)</li>
              <li>📍 Kyambogo Auto Hub & Banda</li>
              <li>📍 Jinja Road Crown Yard</li>
              <li>📍 Bweyogerere Freight & Bond Center</li>
            </ul>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 style={{ color: '#F9FAFB', fontWeight: 700, marginBottom: '16px', fontSize: '1rem' }}>
              Marketplace Tools
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li><a href="#reverse-bid" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Reverse Bidding (Dealers Bid)</a></li>
              <li><a href="#calculator" style={{ color: '#9CA3AF', textDecoration: 'none' }}>URA Car Tax & Landed Cost</a></li>
              <li><a href="#swap" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Swap + Top-Up Matcher</a></li>
              <li><a href="#inventory" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Browse Unregistered Bond Stock</a></li>
              <li><a href="#finance" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Bank Asset Finance Calculator</a></li>
              <li><a href="#inspection" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Japan Auction Sheet & Inspection Hub</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 style={{ color: '#F9FAFB', fontWeight: 700, marginBottom: '16px', fontSize: '1rem' }}>
              Kampala Desk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#F59E0B" />
                <span>Lugogo Bypass & Jinja Road, Kampala</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#F59E0B" />
                <span>+256 700 552 200</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={16} color="#10B981" />
                <span>WhatsApp: +256 772 100 200</span>
              </div>
              <a
                href="https://wa.me/256772100200?text=Hello%20KlaAutos%20Support"
                className="btn-whatsapp"
                style={{ marginTop: '8px', padding: '8px 14px', fontSize: '0.82rem', justifyContent: 'center' }}
              >
                <MessageCircle size={16} /> Contact Support Desk
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.78rem',
          color: '#6B7280',
        }}>
          <p>
            © {new Date().getFullYear()} KlaAutos Uganda (klaautos.ug). All rights reserved. Taxes and customs levies are computed per current Uganda Revenue Authority (URA) tariffs.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Bond Participation</span>
            <span>URA e-Tax Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
