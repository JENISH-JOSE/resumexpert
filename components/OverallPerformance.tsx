type OverallPerformanceProps = {
  analysis: {
    resumeScore?: number
    atsScore?: number
  } | null
}

export default function OverallPerformance({ analysis }: OverallPerformanceProps) {
  const scoreRows = [
    { label: 'Resume Score', value: analysis?.resumeScore ?? 82, color: '#60a5fa' },
    { label: 'ATS Score', value: analysis?.atsScore ?? 88, color: '#a78bfa' },
  ]

  return (
    <div style={{
      marginTop: 14, padding: '16px', borderRadius: 12,
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>
        Overall Performance
      </p>
      {scoreRows.map(s => (
        <div key={s.label} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{s.label}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{s.value}/100</span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 100, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${s.value}%`, borderRadius: 100, background: s.color }} />
          </div>
        </div>
      ))}
    </div>
  )
}
