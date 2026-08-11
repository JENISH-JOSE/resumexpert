const DETECTED_SKILLS = ['Python', 'Java', 'SQL', 'React', 'Node.js', 'Git', 'Communication', 'Problem Solving', 'Teamwork']
const MISSING_SKILLS  = ['Docker', 'AWS', 'Kubernetes', 'System Design', 'CI/CD', 'Redis', 'GraphQL', 'Microservices']

const QUICK_ACTIONS = [
  { label: 'View Sample Report', desc: 'See what your analysis will look like', accent: '#dbeafe', border: '#bfdbfe',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9.5 1.5H4A1.5 1.5 0 002.5 3v10A1.5 1.5 0 004 14.5h8a1.5 1.5 0 001.5-1.5V5.5L9.5 1.5z" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9.5 1.5V5.5h4" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 8.5h6M5 11h4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { label: 'Resume Tips', desc: 'Best practices for ATS-friendly resumes', accent: '#ede9fe', border: '#c4b5fd',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#7c3aed" strokeWidth="1.5"/><path d="M8 5v4M8 11v.5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { label: 'Learning Roadmap', desc: 'Explore paths for your career domain', accent: '#d1fae5', border: '#6ee7b7',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12l3-3 2.5 2.5 4.5-6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="2" cy="12" r="1.2" fill="#059669"/><circle cx="14" cy="3" r="1.2" fill="#059669"/></svg> },
  { label: 'Interview Practice', desc: 'Prepare with domain-specific questions', accent: '#fef3c7', border: '#fcd34d',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 2.5h-11a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h4.5l1.5 2 1.5-2h4a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5z" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 6.5h6M5 9h3.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/></svg> },
]

const RECENT_ACTIVITY = [
  { label: 'Resume Uploaded', time: 'Just now', icon: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 10V3M4 5.5L7 3l3 2.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.5 10v1.5A1 1 0 002.5 12.5h9a1 1 0 001-1V10" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/></svg>), accent: '#dbeafe', dot: '#2563eb' },
  { label: 'AI Analysis Completed', time: '1 min ago', icon: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#7c3aed" strokeWidth="1.5"/><path d="M4.5 7l2 2 3.5-3.5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>), accent: '#ede9fe', dot: '#7c3aed' },
  { label: 'Report Generated', time: '1 min ago', icon: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 1.5H4a1 1 0 00-1 1v9a1 1 0 001 1h6a1 1 0 001-1V4.5L8.5 1.5z" stroke="#059669" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8.5 1.5V4.5h3" stroke="#059669" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 7.5h4M5 9.5h2.5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/></svg>), accent: '#d1fae5', dot: '#059669' },
  { label: 'Ready to improve your resume', time: 'Now', icon: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10.5l3-3 2.5 2.5 4-5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>), accent: '#fef3c7', dot: '#d97706' },
]

const RECOMMENDATIONS = [
  { text: 'Add measurable achievements to each role — e.g., "Reduced API response time by 40%."' },
  { text: 'Improve ATS keyword matching by including terms from target job descriptions.' },
  { text: 'Include internship or academic project experience with clear outcomes and technologies used.' },
  { text: 'Add cloud technologies such as AWS or GCP to strengthen your backend profile.' },
  { text: 'Highlight leadership or mentoring experience, even in informal or project contexts.' },
]

export default function DashboardContent() {
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, padding: '28px 28px', minWidth: 0, overflowY: 'auto' }}>
        {/* Welcome */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
            <div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', margin: '0 0 7px' }}>Welcome back, Jen!</h1>
              <p style={{ fontSize: 14.5, color: '#64748b', margin: 0, lineHeight: 1.65 }}>Your AI analysis is complete. Review your results and start improving your resume.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, padding: '9px 16px', borderRadius: 10, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#15803d' }}>Analysis Complete</span>
            </div>
          </div>
        </div>

        {/* Resume card */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '18px 22px', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
          <div style={{ width: 46, height: 46, borderRadius: 11, flexShrink: 0, background: '#fff1f2', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M13 2H6a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z" stroke="#ef4444" strokeWidth="1.7" strokeLinejoin="round"/><path d="M13 2v5h5" stroke="#ef4444" strokeWidth="1.7" strokeLinejoin="round"/><path d="M8 13h6M8 10h3" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round"/></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>Resume.pdf</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: 12.5, color: '#64748b' }}>Uploaded just now</span>
              <span style={{ fontSize: 12.5, color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: 12.5, color: '#64748b' }}>Analysis ready</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 9, border: '1.5px solid #e2e8f0', background: '#fff', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = '#93c5fd'; el.style.background = '#f0f7ff' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = '#e2e8f0'; el.style.background = '#fff' }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 9V2M4 5.5L6.5 3 9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.5 9.5v1.5A1 1 0 002.5 12h8a1 1 0 001-1V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Upload New Resume
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 9, border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 2px 10px rgba(37,99,235,0.28)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.boxShadow = '0 4px 16px rgba(37,99,235,0.4)'; el.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.boxShadow = '0 2px 10px rgba(37,99,235,0.28)'; el.style.transform = 'translateY(0)' }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 4v5M4 7l2.5 2.5L9 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.5 9.5v1.5A1 1 0 002.5 12h8a1 1 0 001-1V9.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Download Report
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
          <StatCard label="Resume Score" value="82" suffix="/100" color="#2563eb" bg="#dbeafe" border="#bfdbfe" progress={82} icon={<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 4.5v3.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} sub="Strong match" subColor="#15803d" subBg="#f0fdf4" subBorder="#bbf7d0"/>
          <StatCard label="ATS Score" value="88" suffix="/100" color="#7c3aed" bg="#ede9fe" border="#c4b5fd" progress={88} icon={<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1.5" y="1.5" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M4.5 7.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} sub="ATS Optimized" subColor="#6d28d9" subBg="#ede9fe" subBorder="#c4b5fd"/>
          <StatCard label="Skills Found" value="24" suffix="" color="#059669" bg="#d1fae5" border="#6ee7b7" progress={70} icon={<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 10.5l3-3 2.5 2.5 4-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} sub="Skills detected" subColor="#065f46" subBg="#d1fae5" subBorder="#6ee7b7"/>
          <StatCard label="Missing Skills" value="8" suffix="" color="#d97706" bg="#fef3c7" border="#fcd34d" progress={25} icon={<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 5v3.5M7.5 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} sub="Gaps identified" subColor="#92400e" subBg="#fef3c7" subBorder="#fcd34d"/>
        </div>

        {/* Skills analysis */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '20px 22px', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: '#d1fae5', border: '1px solid #6ee7b7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 8l3 3L12.5 4" stroke="#059669" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <div><p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 800, color: '#0f172a', margin: 0 }}>Skills Detected</p><p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{DETECTED_SKILLS.length} skills found in your resume</p></div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {DETECTED_SKILLS.map(skill => (<span key={skill} style={{ padding: '5px 12px', borderRadius: 100, background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 12.5, fontWeight: 600, color: '#15803d', display: 'flex', alignItems: 'center', gap: 5 }}><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><circle cx="4.5" cy="4.5" r="4" fill="#22c55e"/><path d="M2.5 4.5l1.5 1.5 2.5-2.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{skill}</span>))}
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '20px 22px', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: '#fef3c7', border: '1px solid #fcd34d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="#d97706" strokeWidth="1.5"/><path d="M7.5 5v3.5M7.5 10.5v.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div><p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 800, color: '#0f172a', margin: 0 }}>Missing Skills</p><p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{MISSING_SKILLS.length} skill gaps identified</p></div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {MISSING_SKILLS.map(skill => (<span key={skill} style={{ padding: '5px 12px', borderRadius: 100, background: '#fff7ed', border: '1px dashed #fcd34d', fontSize: 12.5, fontWeight: 600, color: '#92400e', display: 'flex', alignItems: 'center', gap: 5 }}><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><circle cx="4.5" cy="4.5" r="4" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1"/><path d="M4.5 3v2.5M4.5 6.5v.5" stroke="#92400e" strokeWidth="1.2" strokeLinecap="round"/></svg>{skill}</span>))}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '22px 24px', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="8.5" cy="8.5" r="7" stroke="#2563eb" strokeWidth="1.5"/><path d="M6 8.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 .92-.5 1.72-1.25 2.16V12h-2.5v-1.34A2.5 2.5 0 016 8.5z" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7.75 14h1.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div><p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 800, color: '#0f172a', margin: 0 }}>AI Recommendations</p><p style={{ fontSize: 12.5, color: '#64748b', margin: 0 }}>Personalized suggestions to strengthen your resume</p></div>
            <div style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: 100, background: 'linear-gradient(135deg, #dbeafe, #ede9fe)', border: '1px solid #bfdbfe' }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: '#1d4ed8' }}>{RECOMMENDATIONS.length} suggestions</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {RECOMMENDATIONS.map((rec, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, padding: '13px 16px', borderRadius: 11, background: '#f8fafc', border: '1px solid #f1f5f9', transition: 'all 0.15s', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = '#f0f7ff'; el.style.borderColor = '#bfdbfe' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = '#f8fafc'; el.style.borderColor = '#f1f5f9' }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, marginTop: 1, background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: 800, color: '#fff' }}>{i + 1}</span>
                </div>
                <p style={{ fontSize: 13.5, color: '#374151', margin: 0, lineHeight: 1.6 }}>{rec.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── RIGHT SIDEBAR ── */}
      <aside style={{ width: 268, flexShrink: 0, borderLeft: '1px solid #e2e8f0', background: '#fff', padding: '28px 20px', overflowY: 'auto' }}>
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.1px', margin: '0 0 14px' }}>Quick Actions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {QUICK_ACTIONS.map(action => (
              <button key={action.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 11, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.14s', width: '100%' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = action.border; el.style.background = action.accent }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = '#e2e8f0'; el.style.background = '#fff' }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: action.accent, border: `1px solid ${action.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{action.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{action.label}</div>
                  <div style={{ fontSize: 11.5, color: '#94a3b8', lineHeight: 1.4 }}>{action.desc}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 'auto', flexShrink: 0, color: '#cbd5e1' }}><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.1px', margin: '0 0 14px' }}>Recent Activity</p>
          <div style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', padding: '6px 0', overflow: 'hidden' }}>
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: 9, flexShrink: 0, background: item.accent, border: `1px solid ${item.dot}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a', margin: '0 0 3px', lineHeight: 1.35 }}>{item.label}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 11.5, color: '#94a3b8' }}>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: '16px', borderRadius: 12, background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>Overall Performance</p>
            {[{ label: 'Resume Score', value: 82, color: '#60a5fa' }, { label: 'ATS Score', value: 88, color: '#a78bfa' }].map(s => (
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
        </div>
      </aside>
    </div>
  )
}

function StatCard({ label, value, suffix, color, bg, border, progress, icon, sub, subColor, subBg, subBorder }: {
  label: string, value: string, suffix: string, color: string, bg: string, border: string,
  progress: number, icon: React.ReactNode, sub: string, subColor: string, subBg: string, subBorder: string
}) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '18px 20px', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: '#64748b' }}>{label}</span>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
      </div>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 30, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.8px', lineHeight: 1, marginBottom: 10 }}>
        {value}<span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8', letterSpacing: 0 }}>{suffix}</span>
      </div>
      <div style={{ height: 4, background: '#f1f5f9', borderRadius: 100, overflow: 'hidden', marginBottom: 10 }}>
        <div style={{ height: '100%', width: `${progress}%`, borderRadius: 100, background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
      </div>
      <span style={{ fontSize: 11.5, fontWeight: 700, color: subColor, background: subBg, border: `1px solid ${subBorder}`, padding: '2px 9px', borderRadius: 100 }}>{sub}</span>
    </div>
  )
}
