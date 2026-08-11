"use client";
import { useState, useEffect } from 'react'

const skills = ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Git', 'SQL', 'Docker']
const missingSkills = ['Kubernetes', 'System Design', 'AWS', 'GraphQL']
const roadmapItems = [
  { label: 'Advanced TypeScript', done: true },
  { label: 'Docker & Containerization', done: true },
  { label: 'AWS Cloud Fundamentals', done: false },
  { label: 'System Design Patterns', done: false },
  { label: 'GraphQL API Design', done: false },
]

export default function DashboardMockup() {
  const [score, setScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0
      const interval = setInterval(() => {
        current += 2
        if (current >= 78) { clearInterval(interval); setScore(78) }
        else setScore(current)
      }, 20)
      return () => clearInterval(interval)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const circumference = 2 * Math.PI * 40
  const dash = (score / 100) * circumference

  return (
    <div style={{
      width: '100%',
      maxWidth: 420,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(226,232,240,0.9)',
      borderRadius: 20,
      boxShadow: '0 24px 64px rgba(15,23,42,0.1), 0 4px 16px rgba(37,99,235,0.08)',
      overflow: 'hidden',
    }}>
      {/* Header bar */}
      <div style={{
        padding: '14px 18px',
        background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
          ResumeXpert AI Analysis
        </span>
        <div style={{ width: 56 }} />
      </div>

      <div style={{ padding: 20 }}>
        {/* Resume Score */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
          borderRadius: 14, padding: '20px 22px',
          display: 'flex', alignItems: 'center', gap: 20,
          marginBottom: 14,
        }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7"/>
              <circle cx="48" cy="48" r="40" fill="none"
                stroke="url(#scoreGrad)" strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                strokeDashoffset={circumference * 0.25}
                style={{ transition: 'stroke-dasharray 0.05s linear' }}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60a5fa"/>
                  <stop offset="100%" stopColor="#818cf8"/>
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: 10, color: '#93c5fd', fontWeight: 600 }}>/ 100</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, margin: '0 0 4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Resume Score
            </p>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>Good Match</p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: 100,
              background: 'rgba(34,197,94,0.2)',
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 8V2M2 5l3-3 3 3" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: 11, color: '#4ade80', fontWeight: 600 }}>+12 pts this week</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <StatCard icon="check" label="Skills Found" value="7" color="#22c55e" bg="rgba(34,197,94,0.06)" border="rgba(34,197,94,0.2)" />
          <StatCard icon="alert" label="Missing Skills" value="4" color="#f59e0b" bg="rgba(245,158,11,0.06)" border="rgba(245,158,11,0.2)" />
        </div>

        {/* Skills Found */}
        <div style={{
          background: '#f8fafc', borderRadius: 12, padding: '14px 16px', marginBottom: 10,
          border: '1px solid #e2e8f0',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#64748b', margin: '0 0 10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Detected Skills
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map(s => (
              <span key={s} style={{
                padding: '3px 10px', borderRadius: 100,
                background: '#dbeafe', color: '#1d4ed8',
                fontSize: 12, fontWeight: 600,
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div style={{
          background: '#fff7ed', borderRadius: 12, padding: '14px 16px', marginBottom: 10,
          border: '1px solid #fed7aa',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#92400e', margin: '0 0 10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Skill Gaps
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {missingSkills.map(s => (
              <span key={s} style={{
                padding: '3px 10px', borderRadius: 100,
                background: '#fef3c7', color: '#92400e',
                fontSize: 12, fontWeight: 600, border: '1px dashed #fcd34d',
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Learning Roadmap */}
        <div style={{
          background: '#f8fafc', borderRadius: 12, padding: '14px 16px',
          border: '1px solid #e2e8f0',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#64748b', margin: '0 0 10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Learning Roadmap
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {roadmapItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  background: item.done ? '#2563eb' : '#e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {item.done
                    ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8' }} />
                  }
                </div>
                <span style={{ fontSize: 12, color: item.done ? '#1e293b' : '#94a3b8', fontWeight: item.done ? 600 : 500 }}>
                  {item.label}
                </span>
                {i === 2 && (
                  <span style={{
                    marginLeft: 'auto', padding: '2px 8px', borderRadius: 100,
                    background: '#dbeafe', color: '#1d4ed8', fontSize: 10, fontWeight: 700,
                  }}>Next</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color, bg, border }: {
  icon: string, label: string, value: string, color: string, bg: string, border: string
}) {
  return (
    <div style={{ background: bg, borderRadius: 12, padding: '14px 16px', border: `1px solid ${border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#64748b', margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</p>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon === 'check'
            ? <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5l2.5 2.5 5.5-5.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            : <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 4v3.5M6.5 9.5v.5" stroke={color} strokeWidth="1.6" strokeLinecap="round"/><circle cx="6.5" cy="6.5" r="5.5" stroke={color} strokeWidth="1.4"/></svg>
          }
        </div>
      </div>
      <p style={{ fontSize: 26, fontWeight: 800, color, margin: 0, lineHeight: 1 }}>{value}</p>
    </div>
  )
}
