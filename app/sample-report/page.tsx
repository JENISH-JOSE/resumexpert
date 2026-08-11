const scoreCards = [
  {
    label: 'Resume Score',
    value: '86',
    suffix: '/100',
    color: '#2563eb',
    bg: '#dbeafe',
    border: '#bfdbfe',
    sub: 'Strong match',
  },
  {
    label: 'ATS Score',
    value: '91',
    suffix: '/100',
    color: '#7c3aed',
    bg: '#ede9fe',
    border: '#c4b5fd',
    sub: 'ATS ready',
  },
  {
    label: 'Skills Found',
    value: '18',
    suffix: '',
    color: '#059669',
    bg: '#d1fae5',
    border: '#6ee7b7',
    sub: 'Detected',
  },
  {
    label: 'Missing Skills',
    value: '5',
    suffix: '',
    color: '#d97706',
    bg: '#fef3c7',
    border: '#fcd34d',
    sub: 'Priority gaps',
  },
]

const skillsFound = ['React', 'TypeScript', 'Node.js', 'REST APIs', 'SQL', 'Git', 'Docker', 'Tailwind CSS']
const missingSkills = ['System Design', 'AWS', 'Kubernetes', 'Testing Strategy', 'GraphQL']
const strengths = [
  'Clear project impact with measurable outcomes.',
  'Strong frontend engineering skill coverage.',
  'Readable experience summary with relevant keywords.',
]
const improvements = [
  'Add more quantified business results for recent projects.',
  'Group technical skills by category for faster scanning.',
  'Include cloud deployment experience where applicable.',
]
const suggestions = [
  'Move the strongest role-specific project into the top half of the resume.',
  'Add metrics such as latency improved, users served, or conversion lift.',
  'Mirror target job descriptions with matching terminology where truthful.',
]
const roadmap = [
  'System Design: Practice component design, caching, queues, and tradeoff analysis.',
  'AWS Fundamentals: Learn IAM, EC2, S3, Lambda, and deployment workflows.',
  'Testing: Add unit, integration, and accessibility testing examples.',
]
const interviewQuestions = [
  'Walk me through a frontend performance issue you diagnosed and fixed.',
  'How would you design a resume analysis workflow for thousands of users?',
  'Tell me about a technical tradeoff you made in a recent project.',
]

function CheckIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M2.5 8l3 3L12.5 4" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AlertIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="6" stroke={color} strokeWidth="1.5" />
      <path d="M7.5 5v3.5M7.5 10.5v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SectionCard({
  title,
  description,
  children,
  accent,
  icon,
}: {
  title: string
  description: string
  children: React.ReactNode
  accent: { bg: string; border: string; color: string }
  icon: React.ReactNode
}) {
  return (
    <section className="rounded-[14px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)] sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] border"
          style={{ background: accent.bg, borderColor: accent.border, color: accent.color }}
        >
          {icon}
        </div>
        <div>
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] font-extrabold text-[var(--app-text)]">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-[var(--app-text-muted)]">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map(item => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--app-text-muted)]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function SampleReportPage() {
  return (
    <main className="min-h-screen bg-[var(--app-bg)] px-5 py-8 font-['Inter',system-ui,sans-serif] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#bfdbfe] bg-[#dbeafe] px-3 py-1.5 text-xs font-bold text-[#1d4ed8]">
            <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
            Sample Report
          </div>
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[30px] font-extrabold leading-tight tracking-[-0.7px] text-[var(--app-text)]">
            ResumeXpert Analysis Preview
          </h1>
          <p className="mt-3 max-w-3xl text-[14.5px] leading-7 text-[var(--app-text-muted)]">
            A static demonstration of the insights ResumeXpert can generate after analyzing a resume.
          </p>
        </div>

        <div className="mb-6 rounded-[14px] border border-[#bfdbfe] bg-[#f0f7ff] p-4 text-sm font-semibold leading-6 text-[#1d4ed8]">
          This is only a demonstration report. Scores, skills, suggestions, roadmap items, and interview questions are sample data.
        </div>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {scoreCards.map(card => (
            <article key={card.label} className="rounded-[14px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[12.5px] font-semibold text-[var(--app-text-muted)]">{card.label}</span>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-[9px] border"
                  style={{ background: card.bg, borderColor: card.border, color: card.color }}
                >
                  {card.label === 'Missing Skills' ? <AlertIcon /> : <CheckIcon />}
                </div>
              </div>
              <div className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold leading-none tracking-[-0.8px] text-[var(--app-text)]">
                {card.value}<span className="text-sm font-semibold text-[var(--app-text-subtle)]">{card.suffix}</span>
              </div>
              <div className="mb-3 h-1 overflow-hidden rounded-full bg-[var(--app-surface-subtle)]">
                <div className="h-full rounded-full" style={{ width: `${Math.min(Number(card.value), 100)}%`, background: `linear-gradient(90deg, ${card.color}, ${card.color}88)` }} />
              </div>
              <span className="rounded-full border px-2.5 py-1 text-[11.5px] font-bold" style={{ color: card.color, background: card.bg, borderColor: card.border }}>
                {card.sub}
              </span>
            </article>
          ))}
        </section>

        <section className="mb-6 grid gap-4 lg:grid-cols-2">
          <SectionCard title="Skills Found" description="Keywords detected in the sample resume" accent={{ bg: '#d1fae5', border: '#6ee7b7', color: '#059669' }} icon={<CheckIcon />}>
            <div className="flex flex-wrap gap-2">
              {skillsFound.map(skill => (
                <span key={skill} className="rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-1.5 text-[12.5px] font-semibold text-[#15803d]">
                  {skill}
                </span>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Missing Skills" description="Sample opportunities to strengthen the resume" accent={{ bg: '#fef3c7', border: '#fcd34d', color: '#d97706' }} icon={<AlertIcon />}>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map(skill => (
                <span key={skill} className="rounded-full border border-dashed border-[#fcd34d] bg-[#fff7ed] px-3 py-1.5 text-[12.5px] font-semibold text-[#92400e]">
                  {skill}
                </span>
              ))}
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <SectionCard title="Strengths" description="What is already working well" accent={{ bg: '#d1fae5', border: '#6ee7b7', color: '#059669' }} icon={<CheckIcon />}>
            <List items={strengths} />
          </SectionCard>

          <SectionCard title="Areas to Improve" description="High-impact refinements for the next version" accent={{ bg: '#fef3c7', border: '#fcd34d', color: '#d97706' }} icon={<AlertIcon />}>
            <List items={improvements} />
          </SectionCard>

          <SectionCard title="AI Suggestions" description="Sample recommendations generated by ResumeXpert" accent={{ bg: '#ede9fe', border: '#c4b5fd', color: '#7c3aed' }} icon={<CheckIcon />}>
            <List items={suggestions} />
          </SectionCard>

          <SectionCard title="Learning Roadmap" description="Suggested topics to close skill gaps" accent={{ bg: '#dbeafe', border: '#bfdbfe', color: '#2563eb' }} icon={<CheckIcon />}>
            <List items={roadmap} />
          </SectionCard>

          <div className="lg:col-span-2">
            <SectionCard title="Interview Questions" description="Practice prompts based on the sample profile" accent={{ bg: '#e0f2fe', border: '#bae6fd', color: '#0284c7' }} icon={<CheckIcon />}>
              <List items={interviewQuestions} />
            </SectionCard>
          </div>
        </section>
      </div>
    </main>
  )
}
