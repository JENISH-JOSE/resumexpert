"use client"
import BrandLogo from './BrandLogo'

type SidebarProps = {
  activeNav: string
  setActiveNav: (label: string) => void
  handleLogout: () => void
  isLoggingOut: boolean
  isMobileOpen?: boolean
  onClose?: () => void
}

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

type SidebarContentProps = {
  activeNav: string
  setActiveNav: (label: string) => void
  handleLogout: () => void
  isLoggingOut: boolean
  onClose?: () => void
}

function SidebarContent({ activeNav, setActiveNav, handleLogout, isLoggingOut, onClose }: SidebarContentProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto border-r border-[var(--app-border)] bg-[var(--app-surface)]">
      <div className="flex h-[60px] shrink-0 items-center border-b border-[var(--app-border)] px-5">
        <BrandLogo size={32} theme="auto" />
      </div>

      <nav className="flex-1 px-3 py-4">
        <p className="mb-2 px-2.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[var(--app-text-subtle)]">
          Menu
        </p>
        {NAV_ITEMS.map((item) => {
          const active = activeNav === item.label
          return (
            <button
              key={item.label}
              onClick={() => {
                setActiveNav(item.label)
                onClose?.()
              }}
              className={`mb-1 flex min-h-10 w-full items-center gap-2.5 rounded-xl border-none px-3 py-2.5 text-left font-['Inter',sans-serif] transition ${
                active
                  ? 'bg-[rgba(37,99,235,0.12)] text-[#2563eb]'
                  : 'bg-transparent text-[var(--app-text-muted)] hover:bg-[var(--app-surface-muted)] hover:text-[var(--app-text)]'
              }`}
            >
              <span className={`flex shrink-0 items-center ${active ? 'text-[#2563eb]' : 'text-inherit'}`}>
                {item.icon}
              </span>
              <span className={`text-[13.5px] ${active ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
              {active ? <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#2563eb]" /> : null}
            </button>
          )
        })}
      </nav>

      <div className="px-3 pb-5">
        <div className="mb-3 h-px bg-[var(--app-border-muted)]" />
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`flex w-full items-center gap-2.5 rounded-xl border border-[#fecdd3] bg-[#fff1f2] px-3 py-3 text-left text-[#dc2626] shadow-[0_4px_14px_rgba(239,68,68,0.12)] transition ${
            isLoggingOut ? 'cursor-wait opacity-80' : 'cursor-pointer hover:border-[#fda4af] hover:bg-[#fee2e2]'
          }`}
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M6.5 14.5H3A1.5 1.5 0 011.5 13V4A1.5 1.5 0 013 2.5h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M11.5 12l4-3.5-4-3.5M15.5 8.5H6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[13.5px] font-semibold">{isLoggingOut ? 'Signing out...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  )
}

export default function Sidebar({ activeNav, setActiveNav, handleLogout, isLoggingOut, isMobileOpen, onClose }: SidebarProps) {
  return (
    <>
    <aside className="hidden w-[236px] shrink-0 lg:fixed lg:left-0 lg:top-0 lg:z-40 lg:flex lg:h-screen">
        <SidebarContent
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          handleLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          onClose={onClose}
        />
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-slate-950/60"
            onClick={onClose}
          />
          <div className="relative h-full w-[88vw] max-w-[286px]">
            <SidebarContent
              activeNav={activeNav}
              setActiveNav={setActiveNav}
              handleLogout={handleLogout}
              isLoggingOut={isLoggingOut}
              onClose={onClose}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
