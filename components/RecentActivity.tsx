"use client"

const RECENT_ACTIVITY = [
  { label: 'Resume Uploaded', time: 'Just now', icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 10V3M4 5.5L7 3l3 2.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.5 10v1.5A1 1 0 002.5 12.5h9a1 1 0 001-1V10" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ), accent: '#dbeafe', dot: '#2563eb' },
  { label: 'AI Analysis Completed', time: '1 min ago', icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="#7c3aed" strokeWidth="1.5"/>
      <path d="M4.5 7l2 2 3.5-3.5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ), accent: '#ede9fe', dot: '#7c3aed' },
  { label: 'Report Generated', time: '1 min ago', icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8.5 1.5H4a1 1 0 00-1 1v9a1 1 0 001 1h6a1 1 0 001-1V4.5L8.5 1.5z" stroke="#059669" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8.5 1.5V4.5h3" stroke="#059669" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5 7.5h4M5 9.5h2.5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ), accent: '#d1fae5', dot: '#059669' },
  { label: 'Ready to improve your resume', time: 'Now', icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 10.5l3-3 2.5 2.5 4-5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ), accent: '#fef3c7', dot: '#d97706' },
]

export default function RecentActivity() {
  return (
    <>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: 'var(--app-text)', letterSpacing: '-0.1px', margin: '0 0 14px' }}>Recent Activity</p>
      <div style={{ background: 'var(--app-surface-muted)', borderRadius: 12, border: '1px solid var(--app-border)', padding: '6px 0', overflow: 'hidden' }}>
        {RECENT_ACTIVITY.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '12px 16px',
            borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid var(--app-border-muted)' : 'none',
            position: 'relative',
          }}>
            {/* Timeline dot + line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 2 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 9, flexShrink: 0,
                background: item.accent, border: `1px solid ${item.dot}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {item.icon}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--app-text)', margin: '0 0 3px', lineHeight: 1.35 }}>{item.label}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, color: 'var(--app-text-subtle)' }}>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
