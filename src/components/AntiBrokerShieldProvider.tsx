'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, CameraOff, AlertOctagon, EyeOff, ShieldCheck, X } from 'lucide-react';

interface ToastAlert {
  id: number;
  title: string;
  message: string;
  type: 'blocked' | 'warning' | 'snipping';
}

export default function AntiBrokerShieldProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastAlert[]>([]);
  const [isWindowBlurred, setIsWindowBlurred] = useState<boolean>(false);
  const [snippingProtectionEnabled, setSnippingProtectionEnabled] = useState<boolean>(true);
  const [watermarkEnabled, setWatermarkEnabled] = useState<boolean>(true);

  const showToast = (title: string, message: string, type: 'blocked' | 'warning' | 'snipping' = 'blocked') => {
    const id = Date.now();
    setToasts((prev) => [...prev.slice(-2), { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  useEffect(() => {
    // 1. Right Click / Context Menu Interception
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If clicked on an image, vehicle card, or anywhere inside the app
      if (
        target.tagName === 'IMG' ||
        target.closest('.glass-panel') ||
        target.closest('#inventory') ||
        target.closest('#hero') ||
        target.closest('.anti-broker-overlay-shield')
      ) {
        e.preventDefault();
        showToast(
          'Photo Downloading Restricted',
          'Anti-Broker Shield Active: Direct image saving is blocked to prevent unauthorized street broker reposting in Kampala.',
          'blocked'
        );
      }
    };

    // 2. Drag & Drop Interception
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        showToast(
          'Drag-and-Drop Blocked',
          'Vehicle photos cannot be dragged into external folders or messaging apps.',
          'warning'
        );
      }
    };

    // 3. Keystroke Interception (PrintScreen, Snipping tool, Save, Print, Inspect)
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        // Override clipboard with anti-broker copyright disclaimer
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(
            '⚠️ KlaAutos Anti-Broker Notice: This bond vehicle record is protected under Uganda Revenue Authority Bonded Warehouse registry. Unauthorized broker re-listing is illegal.'
          ).catch(() => {});
        }

        setIsWindowBlurred(true);
        setTimeout(() => setIsWindowBlurred(false), 2500);

        showToast(
          'Screenshot Mask Triggered',
          'PrintScreen was intercepted. Screen capture is masked to safeguard verified bond stock.',
          'snipping'
        );
        return;
      }

      // Windows Snipping Tool (Win + Shift + S) or Mac (Cmd + Shift + 4/3/S)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        showToast(
          'Snipping Tool Keystroke Intercepted',
          'Snipping tool shortcut detected. Vehicle stock details are masked.',
          'snipping'
        );
        return;
      }

      // Ctrl + S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        showToast(
          'Page Saving Disabled',
          'Offline downloading of bond catalog is disabled by the anti-broker firewall.',
          'warning'
        );
        return;
      }

      // Ctrl + P (Print)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        showToast(
          'Printing Disabled',
          'Document printout is restricted to prevent broker quotation forgery.',
          'warning'
        );
        return;
      }

      // F12 or Ctrl + Shift + I (DevTools)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
        ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U'))
      ) {
        e.preventDefault();
        showToast(
          'Source Inspection Blocked',
          'Developer inspection shortcuts are locked to prevent asset extraction.',
          'blocked'
        );
        return;
      }
    };

    // 4. Window Blur / Defocus (Snipping Tool & Screen Recorder Detection)
    // When Windows Snipping Tool (Win+Shift+S) activates, the browser tab immediately loses focus!
    const handleWindowBlur = () => {
      if (snippingProtectionEnabled) {
        setIsWindowBlurred(true);
      }
    };

    const handleWindowFocus = () => {
      setIsWindowBlurred(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden && snippingProtectionEnabled) {
        setIsWindowBlurred(true);
      } else {
        setIsWindowBlurred(false);
      }
    };

    // Register listeners
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [snippingProtectionEnabled]);

  return (
    <>
      {/* Main Content with conditional Snipping Mask Blur */}
      <div className={isWindowBlurred && snippingProtectionEnabled ? 'snipping-shield-active' : ''}>
        {children}
      </div>

      {/* Snipping Tool Defocus Mask Overlay */}
      {isWindowBlurred && snippingProtectionEnabled && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: 'rgba(8, 12, 20, 0.94)',
          backdropFilter: 'blur(32px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          color: '#F9FAFB',
        }}>
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '2px solid #EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EF4444',
            marginBottom: '20px',
            boxShadow: '0 0 35px rgba(239, 68, 68, 0.4)',
          }}>
            <EyeOff size={42} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '12px', color: '#F9FAFB' }}>
            Anti-Broker Snipping Shield Engaged
          </h2>
          <p style={{ maxWidth: '560px', color: '#9CA3AF', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
            Screen capture, snipping tool, or window defocus was detected. Vehicle images and chassis numbers are temporarily masked to protect verified bond inventory against unauthorized broker re-listing.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '9999px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid #F59E0B',
            color: '#FBBF24',
            fontSize: '0.9rem',
            fontWeight: 700,
          }}>
            <ShieldCheck size={18} />
            <span>Click anywhere to resume viewing</span>
          </div>
        </div>
      )}

      {/* Floating Anti-Broker Shield Status Widget (Bottom Left) */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(8, 12, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(16, 185, 129, 0.4)',
        padding: '8px 14px',
        borderRadius: '9999px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#10B981',
          boxShadow: '0 0 10px #10B981',
        }} />
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#D1D5DB' }}>
          Anti-Broker Shield: <strong style={{ color: '#10B981' }}>Active</strong>
        </span>
        <button
          onClick={() => {
            setSnippingProtectionEnabled(!snippingProtectionEnabled);
            showToast(
              snippingProtectionEnabled ? 'Snipping Shield Paused' : 'Snipping Shield Activated',
              snippingProtectionEnabled
                ? 'Window defocus blur disabled for demonstration.'
                : 'Window defocus blur re-enabled.',
              'warning'
            );
          }}
          title="Toggle Snipping Tool Defocus Mask"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: snippingProtectionEnabled ? '#10B981' : '#9CA3AF',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginLeft: '4px',
          }}
        >
          {snippingProtectionEnabled ? 'Snipping Defended' : 'Paused'}
        </button>
      </div>

      {/* Toast Alert Notifications Container */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
      }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: '#0F172A',
              border: toast.type === 'blocked'
                ? '1px solid #EF4444'
                : toast.type === 'snipping'
                ? '1px solid #F59E0B'
                : '1px solid #3B82F6',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              animation: 'slideInUp 0.3s ease-out forwards',
            }}
          >
            <div style={{
              color: toast.type === 'blocked' ? '#EF4444' : toast.type === 'snipping' ? '#F59E0B' : '#3B82F6',
              marginTop: '2px',
            }}>
              {toast.type === 'blocked' ? (
                <Lock size={20} />
              ) : toast.type === 'snipping' ? (
                <CameraOff size={20} />
              ) : (
                <ShieldAlert size={20} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.88rem', color: '#F9FAFB' }}>
                  {toast.title}
                </strong>
                <button
                  onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                  style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', padding: 0 }}
                >
                  <X size={14} />
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#9CA3AF', lineHeight: '1.4' }}>
                {toast.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
