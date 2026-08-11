const tipSections = [
  {
    title: 'Resume Writing Tips',
    description: 'Make the document easy to scan and clearly tied to the role.',
    color: '#2563eb',
    bg: '#dbeafe',
    border: '#bfdbfe',
    icon: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
        <path d="M10 1.5H4A1.5 1.5 0 002.5 3v11A1.5 1.5 0 004 15.5h9A1.5 1.5 0 0014.5 14V6L10 1.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M10 1.5V6h4.5M5.5 9h6M5.5 11.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      'Start bullets with strong action verbs and keep them outcome-focused.',
      'Use numbers where possible: revenue, time saved, users supported, or performance improved.',
      'Keep the most relevant projects and experience in the top half of the page.',
      'Use consistent tense, punctuation, spacing, and section naming.',
    ],
  },
  {
    title: 'ATS Tips',
    description: 'Improve parsing quality without making the resume feel mechanical.',
    color: '#7c3aed',
    bg: '#ede9fe',
    border: '#c4b5fd',
    icon: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 8.5l2.2 2.2L12 5.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      'Use standard headings such as Experience, Education, Skills, and Projects.',
      'Mirror important job-description keywords only when they accurately match your background.',
      'Avoid tables, text boxes, complex columns, and images for core resume content.',
      'Export as a readable PDF unless the employer specifically asks for another format.',
    ],
  },
  {
    title: 'Common Mistakes',
    description: 'Small issues that can reduce recruiter confidence quickly.',
    color: '#d97706',
    bg: '#fef3c7',
    border: '#fcd34d',
    icon: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.5 5v4M8.5 11.5v.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    items: [
      'Listing responsibilities without explaining impact.',
      'Using one generic resume for every role.',
      'Overloading the skills section with tools you cannot discuss confidently.',
      'Letting typos, date inconsistencies, or broken links slip through.',
    ],
  },
  {
    title: 'Pro Tips',
    description: 'Polish moves that help strong candidates stand out.',
    color: '#059669',
    bg: '#d1fae5',
    border: '#6ee7b7',
    icon: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
        <path d="M2.5 10.5l3 3 9-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.5 3.5h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      'Create a master resume, then tailor a focused copy for each application.',
      'Name projects with the business or user problem they solved.',
      'Add links to a portfolio, GitHub, or case study only when they are polished and relevant.',
      'Review your resume against the job description before every submission.',
    ],
  },
]

export default function ResumeTipsPage() {
  return (
    <main className="min-h-screen bg-[var(--app-bg)] px-5 py-8 font-['Inter',system-ui,sans-serif] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#bfdbfe] bg-[#dbeafe] px-3 py-1.5 text-xs font-bold text-[#1d4ed8]">
            <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
            Resume Tips
          </div>
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[30px] font-extrabold leading-tight tracking-[-0.7px] text-[var(--app-text)]">
            Build a Cleaner, Stronger Resume
          </h1>
          <p className="mt-3 max-w-3xl text-[14.5px] leading-7 text-[var(--app-text-muted)]">
            Practical guidance for writing, formatting, and tailoring a resume that performs well with recruiters and applicant tracking systems.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          {tipSections.map(section => (
            <article
              key={section.title}
              className="rounded-[14px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)] sm:p-6"
            >
              <div className="mb-5 flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border"
                  style={{ background: section.bg, borderColor: section.border, color: section.color }}
                >
                  {section.icon}
                </div>
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-extrabold text-[var(--app-text)]">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-[13px] leading-6 text-[var(--app-text-muted)]">
                    {section.description}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {section.items.map(item => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--app-text-muted)]">
                    <span className="mt-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: section.bg, color: section.color }}>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                        <path d="M2 4.7l1.6 1.6L7 2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
