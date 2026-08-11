import type { ReactNode } from 'react'
import BrandLogo from './BrandLogo'

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    icon: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="9.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="1.5" y="9.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="9.5" y="9.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    label: 'My Reports',
    icon: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M10 1.5H4a1.5 1.5 0 00-1.5 1.5v11A1.5 1.5 0 004 15.5h9A1.5 1.5 0 0014.5 14V6L10 1.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M10 1.5V6h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M5.5 9h6M5.5 11.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Learning Roadmap',
    icon: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M2 13l3.5-3.5 2.5 2.5 5-7 2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="2" cy="13" r="1.2" fill="currentColor"/>
        <circle cx="5.5" cy="9.5" r="1.2" fill="currentColor"/>
        <circle cx="8" cy="12" r="1.2" fill="currentColor"/>
        <circle cx="13" cy="5" r="1.2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Project Recommendations',
    icon: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M2 4.5A1.5 1.5 0 013.5 3h10A1.5 1.5 0 0115 4.5v8a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 012 12.5v-8z" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M5.5 7l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Interview Preparation',
    icon: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M14.5 3H2.5A1 1 0 001.5 4v8a1 1 0 001 1h5l1.5 2 1.5-2h4a1 1 0 001-1V4a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M5 7h7M5 9.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Settings',
    icon: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <circle cx="8.5" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8.5 1.5v1.8M8.5 13.7v1.8M1.5 8.5h1.8M13.7 8.5h1.8M3.4 3.4l1.3 1.3M12.3 12.3l1.3 1.3M12.3 4.7l-1.3 1.3M4.7 12.3l-1.3 1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
]

interface AppShellProps {
  activeNav: string
  onNavChange: (label: string) => void
  children: ReactNode
}

export default function AppShell({ activeNav, onNavChange, children }: AppShellProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: 236, flexShrink: 0, background: '#fff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex', flexDirection: 'column', padding: '0 0 24px',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        <div style={{ padding: '22px 20px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <BrandLogo size={32} theme="light" />
        </div>

        <nav style={{ padding: '12px 10px', flex: 1 }}>
          <p style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px 8px', margin: 0 }}>Menu</p>
          {NAV_ITEMS.map(item => {
            const active = activeNav === item.label
            return (
              <button key={item.label} onClick={() => onNavChange(item.label)} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '9px 10px', borderRadius: 9,
                border: 'none', cursor: 'pointer', textAlign: 'left',
                background: active ? '#eff6ff' : 'transparent',
                color: active ? '#1d4ed8' : '#64748b',
                marginBottom: 2, transition: 'all 0.13s',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#f8fafc'; el.style.color = '#0f172a' } }}
              onMouseLeave={e => { if (!active) { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = '#64748b' } }}>
                <span style={{ flexShrink: 0, color: active ? '#2563eb' : 'inherit', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                <span style={{ fontSize: 13.5, fontWeight: active ? 600 : 500 }}>{item.label}</span>
                {active && <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#2563eb' }} />}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '0 10px' }}>
          <div style={{ height: 1, background: '#f1f5f9', marginBottom: 10 }} />
          <button style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '9px 10px', borderRadius: 9,
            border: 'none', cursor: 'pointer', background: 'transparent', color: '#94a3b8',
            transition: 'all 0.13s', fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#fff1f2'; el.style.color = '#ef4444' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = '#94a3b8' }}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M6.5 14.5H3A1.5 1.5 0 011.5 13V4A1.5 1.5 0 013 2.5h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M11.5 12l4-3.5-4-3.5M15.5 8.5H6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 13.5, fontWeight: 500 }}>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* ── TOP NAV ── */}
        <header style={{
          height: 60, background: '#fff', borderBottom: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16,
          position: 'sticky', top: 0, zIndex: 20,
        }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 340 }}>
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="#94a3b8" strokeWidth="1.5"/>
                <path d="M10 10l3 3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <input type="text" placeholder="Search..." style={{
              width: '100%', padding: '8px 12px 8px 36px',
              borderRadius: 9, border: '1.5px solid #e2e8f0',
              fontSize: 13.5, color: '#0f172a', outline: 'none',
              background: '#f8fafc', fontFamily: "'Inter', sans-serif", transition: 'all 0.15s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#93c5fd'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08)' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.boxShadow = 'none' }}/>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{
              width: 36, height: 36, borderRadius: 9, border: '1.5px solid #e2e8f0', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', position: 'relative', transition: 'all 0.13s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = '#bfdbfe'; el.style.background = '#f0f7ff' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = '#e2e8f0'; el.style.background = '#fff' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5a4.5 4.5 0 00-4.5 4.5v2.5l-1 1.5h11l-1-1.5V6A4.5 4.5 0 008 1.5z" stroke="#64748b" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: '#ef4444', border: '1.5px solid #fff' }} />
            </button>
            <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 6px', borderRadius: 10, cursor: 'pointer', transition: 'background 0.13s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f8fafc' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                boxShadow: '0 1px 4px rgba(37,99,235,0.3)',
              }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: '#fff' }}>J</span>
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>Jen</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#2563eb', background: '#dbeafe', padding: '1px 7px', borderRadius: 100 }}>Student</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#94a3b8' }}>
                <path d="M3.5 5.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </header>

        {/* Page content */}
        {children}
      </div>
    </div>
  )
}
