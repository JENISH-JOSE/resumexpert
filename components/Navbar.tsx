"use client"
import { useState, useEffect } from 'react'
import { signInWithGoogle } from '../lib/auth'
import BrandLogo from './BrandLogo'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Domains', href: '#domains' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.2s ease',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} className="nav-shell">
        <div style={{ display: 'flex', alignItems: 'center', minHeight: 68, gap: 40 }} className="nav-row">
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <BrandLogo size={34} theme="light" />
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }} className="hidden-mobile">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: '#475569', textDecoration: 'none', transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#0f172a'
                ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#f1f5f9'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#475569'
                ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
              }}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '9px 18px', borderRadius: 10,
              border: '1.5px solid #e2e8f0', background: '#fff',
              fontSize: 14, fontWeight: 600, color: '#0f172a',
              cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}
            onClick={signInWithGoogle}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#93c5fd'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px rgba(37,99,235,0.1)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none' }}>
              <GoogleIcon />
              Continue with Google
            </button>
            {/* Hamburger */}
            <button
              style={{ display: 'none', padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}
              className="show-mobile"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ padding: '12px 0 20px', borderTop: '1px solid #e2e8f0' }}>
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '10px 4px', fontSize: 15, fontWeight: 500, color: '#374151', textDecoration: 'none' }}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-shell { padding: 0 18px !important; }
          .nav-row { gap: 16px !important; minHeight: 64px !important; }
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.42v2h2.59c1.52-1.4 2.39-3.46 2.39-5.88z" fill="#4285F4"/>
      <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2c-.72.48-1.63.77-2.71.77-2.08 0-3.85-1.41-4.48-3.3H.85v2.07A8 8 0 008 16z" fill="#34A853"/>
      <path d="M3.52 9.53A4.8 4.8 0 013.27 8c0-.53.09-1.04.25-1.53V4.4H.85A8 8 0 000 8c0 1.29.31 2.51.85 3.6l2.67-2.07z" fill="#FBBC05"/>
      <path d="M8 3.18c1.17 0 2.22.4 3.05 1.2l2.28-2.28C11.97.72 10.16 0 8 0A8 8 0 00.85 4.4l2.67 2.07C4.15 4.58 5.92 3.18 8 3.18z" fill="#EA4335"/>
    </svg>
  )
}
