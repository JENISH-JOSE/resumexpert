"use client";
import BrandLogo from './BrandLogo'
const footerLinks = {
  Product: ['Features', 'How It Works'],
  Domains: ['Software Engineering', 'Web Development', 'Data Science', 'Cyber Security', 'Cloud Computing'],
  Company: ['About', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service'],
}

function getFooterLinkHref(heading: string, link: string) {
  if (link === 'Features') {
    return '#features'
  }

  if (link === 'How It Works') {
    return '#how-it-works'
  }

  if (heading === 'Domains') {
    return '#domains'
  }

  if (link === 'About') {
    return '#about'
  }

  if (link === 'Contact') {
    return 'mailto:jenishjosegideon@gmail.com'
  }

  return '#about'
}

export default function Footer() {
  return (
    <footer id="about" style={{ background: '#0f172a', padding: '64px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, marginBottom: 56 }} className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <BrandLogo size={34} theme="dark" />
            </div>
            <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7, marginBottom: 24, maxWidth: 240 }}>
              AI-powered career intelligence that helps professionals land the roles they deserve.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }} className="footer-social">
              {[
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/just_jenish_jg?igsh=bHZpYWp2M3VvMjdr',
                  path: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5h.01'
                },
                {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/jenish-jose-gideon-556bba31a',
                path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/JENISH-JOSE',
                path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22'
              },
              
              ].map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.15s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="footer-links">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12, fontWeight: 700, color: '#fff',
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  margin: '0 0 16px',
                }}>{heading}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {links.map(link => (
                    <li key={link}>
                      <a href={getFooterLinkHref(heading, link)} style={{
                        fontSize: 14, color: '#64748b', textDecoration: 'none',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#64748b' }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }} className="footer-bottom">
          <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>
            &copy; {new Date().getFullYear()} ResumeXpert. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 0 3px rgba(74,222,128,0.15)' }} />
            <span style={{ fontSize: 13, color: '#475569' }}>AI-Powered Resume Analysis</span>
          </div>
          <p style={{ fontSize: 13, color: '#334155', margin: 0 }}>
            Developed by Jenish Jose Gideon
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr !important; gap: 40px !important; }
          .footer-links { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .footer-brand {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .footer-brand p {
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 100% !important;
          }
          .footer-social {
            justify-content: center !important;
          }
          .footer-links {
            grid-template-columns: 1fr !important;
            gap: 22px !important;
          }
          .footer-links > div {
            text-align: center !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
        @media (max-width: 640px) {
          .footer-top { gap: 28px !important; }
        }
      `}</style>
    </footer>
  )
}
