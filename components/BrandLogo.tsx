/**
 * BrandLogo — Single source-of-truth for the ResumeXpert logo.
 *
 * When the approved logo file is ready, replace the SVG mark inside
 * <LogoMark> with an <Image> tag pointing to /brand/logo.svg (or
 * .png), and adjust `size` defaults accordingly.
 *
 * Usage:
 *   <BrandLogo />                        — default (icon + wordmark, 32px icon)
 *   <BrandLogo size={24} />              — smaller icon
 *   <BrandLogo iconOnly />               — icon without text (e.g. favicon-sized)
 *   <BrandLogo theme="dark" />           — forces dark-background colours
 *   <BrandLogo theme="light" />          — forces light-background colours
 *   <BrandLogo theme="auto" />           — follows CSS variable (default)
 */

import React from 'react'
import Image from 'next/image'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BrandTheme = 'auto' | 'light' | 'dark'

export interface BrandLogoProps {
  /** Base text scale reference in px. Wordmark font-size scales proportionally. */
  size?: number
  /** Optional explicit override for icon diameter in px. */
  iconSize?: number
  /** Render only the icon square, no wordmark. */
  iconOnly?: boolean
  /** Force a colour theme regardless of CSS variables. */
  theme?: BrandTheme
  /** Additional inline style for the outermost wrapper. */
  style?: React.CSSProperties
  className?: string
}

// ---------------------------------------------------------------------------
// Colour helpers
// ---------------------------------------------------------------------------

function resolveColors(theme: BrandTheme) {
  if (theme === 'dark') {
    return { wordmark: '#ffffff', accent: '#60a5fa' }
  }
  if (theme === 'light') {
    return { wordmark: '#0f172a', accent: '#2563eb' }
  }
  // 'auto' — falls back to CSS variables set by the theme system
  return { wordmark: 'var(--app-text, #0f172a)', accent: '#2563eb' }
}

// ---------------------------------------------------------------------------
// Logo icon mark
// ---------------------------------------------------------------------------

function LogoMark({ iconSize }: { iconSize: number }) {
  return (
    <div
      style={{
        width: iconSize,
        height: iconSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Image
        src="/brand/logo.jpeg"
        alt="ResumeXpert Logo"
        width={iconSize}
        height={iconSize}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function BrandLogo({
  size = 32,
  iconSize: customIconSize,
  iconOnly = false,
  theme = 'auto',
  style,
  className,
}: BrandLogoProps) {
  const { wordmark, accent } = resolveColors(theme)
  const fontSize = Math.round(size * 0.5)
  // Increase icon size by ~45% to provide strong visual presence alongside wordmark
  const iconSize = customIconSize ?? Math.round(size * 1.45)

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(size * 0.4),
        flexShrink: 0,
        ...style,
      }}
      className={className}
    >
      <LogoMark iconSize={iconSize} />

      {!iconOnly && (
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize,
            color: wordmark,
            letterSpacing: '-0.3px',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          Resume
          <span style={{ color: accent }}>Xpert</span>
        </span>
      )}
    </div>
  )
}
