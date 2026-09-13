// Леки inline SVG икони — без външна icon библиотека (по-малко зависимости, по-бърз build).

export const IconBug = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 7.5V4M12 20v-3.5M7.5 12H4M20 12h-3.5M8.5 8.5 6 6M18 6l-2.5 2.5M8.5 15.5 6 18M18 18l-2.5-2.5" strokeLinecap="round" />
  </svg>
)

export const IconRat = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M4 15c0-4 3-7 7-7 3 0 4.5 1.5 6 1.5 1 0 1.5-.7 1.5-1.5" strokeLinecap="round" />
    <circle cx="8.2" cy="12.2" r=".6" fill="currentColor" stroke="none" />
    <path d="M18.5 8c1 0 2 .8 2 2s-1 2-2 1.5M11 15.5c0 2-1.5 3.5-4 3.5-2 0-3-1-3-1" strokeLinecap="round" />
  </svg>
)

export const IconSpray = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M9 21V10a2 2 0 0 1 2-2h1V5a2 2 0 1 1 4 0v3M9 13h7a2 2 0 0 1 2 2v6H9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 8h2M3.5 5.5 5 7M3.5 10.5 5 9" strokeLinecap="round" />
  </svg>
)

export const IconShield = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconLeaf = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14Z" strokeLinejoin="round" />
    <path d="M5 19c0-5 3-9 8-11" strokeLinecap="round" />
  </svg>
)

export const IconClock = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconPhone = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconMail = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 6.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconPin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

export const IconCheck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" {...props}>
    <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconStar = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.5 15 9l7 .8-5.2 4.9 1.4 6.9L12 18l-6.2 3.6 1.4-6.9L2 9.8 9 9l3-6.5Z" />
  </svg>
)

export const IconAnt = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="7" cy="12" r="2.1" />
    <circle cx="12" cy="12.3" r="2.7" />
    <circle cx="17.3" cy="12" r="1.9" />
    <path d="M5 8.5 3.5 7M5 15.5 3.5 17M9.8 8l-1-3M9.8 16.5l-1 3M19 9.3 21 8M19 14.7 21 16" strokeLinecap="round" />
  </svg>
)

export const IconMosquito = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <ellipse cx="12" cy="13" rx="2.2" ry="3.3" />
    <path d="M12 10 8 3" strokeLinecap="round" />
    <path d="M9.6 11 4 9M9.6 14.6 4 16M14.4 11l5.6-2M14.4 14.6l5.6 1.4" strokeLinecap="round" />
    <path d="M11 16.5 9 21M13 16.5l2 4.5" strokeLinecap="round" />
  </svg>
)

export const IconWasp = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <ellipse cx="12" cy="13.2" rx="3.4" ry="5" />
    <path d="M8.7 10.8h6.6M8.7 13.2h6.6M8.7 15.6h6.6" strokeLinecap="round" />
    <circle cx="12" cy="7" r="1.8" />
    <path d="M9.5 9 5 6M14.5 9l4.5-3" strokeLinecap="round" />
  </svg>
)

export const IconFlea = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="10" cy="11" r="3" />
    <path d="M9 8.5 7.5 5M12.8 9l3-2.5" strokeLinecap="round" />
    <path d="M12.5 13c3 0 5.2 2 5.7 6" strokeLinecap="round" />
    <path d="M7.5 13.5 5 17.5" strokeLinecap="round" />
  </svg>
)

export const IconBedbug = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <ellipse cx="12" cy="13.3" rx="5.5" ry="4.3" />
    <circle cx="12" cy="7.6" r="1.6" />
    <path d="M6.8 11 3.3 9.5M6.8 16 3.3 17.5M17.2 11l3.5-1.5M17.2 16l3.5 1.5" strokeLinecap="round" />
  </svg>
)

export const IconMoth = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M12 8.5v10" strokeLinecap="round" />
    <path d="M12 10.5C9 6.5 4 6.5 3 9.5c-1 3 2 6 9 3" strokeLinejoin="round" />
    <path d="M12 10.5c3-4 8-4 9-1 1 3-2 6-9 3" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="1.3" />
  </svg>
)

export const IconTick = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="12" cy="13" r="4" />
    <path d="M12 9V6M9 10 6.5 8M15 10l2.5-2M8.3 13H5M15.7 13h3.3M9 16l-2.5 2M15 16l2.5 2" strokeLinecap="round" />
  </svg>
)

export const IconCertificate = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m9.2 9 1.8 1.8L15 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 13.8 7.5 21l4.5-2.5 4.5 2.5-1.5-7.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconUsers = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6" strokeLinecap="round" />
    <circle cx="17" cy="8.5" r="2.3" />
    <path d="M15.5 14.2c2.5.4 4.5 2.6 4.5 5.8" strokeLinecap="round" />
  </svg>
)

export const IconBuilding = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="4" y="4" width="10" height="17" rx="1" />
    <rect x="14" y="9" width="6" height="12" rx="1" />
    <path d="M7 8h1M10.5 8h1M7 12h1M10.5 12h1M7 16h1M10.5 16h1" strokeLinecap="round" />
  </svg>
)

export const IconRepeat = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M4 12a8 8 0 0 1 13.5-5.8M20 12a8 8 0 0 1-13.5 5.8" strokeLinecap="round" />
    <path d="M17.5 3v3.5H14M6.5 21v-3.5H10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconChevronDown = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...props}>
    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconArrowLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...props}>
    <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconClipboard = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="5" y="4.5" width="14" height="17" rx="2" />
    <rect x="9" y="3" width="6" height="3" rx="1" fill="currentColor" stroke="none" />
    <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4.5" strokeLinecap="round" />
  </svg>
)

export const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.6-4.6" strokeLinecap="round" />
  </svg>
)

export const IconX = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...props}>
    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
)

export const IconQuote = (props) => (
  <svg viewBox="0 0 32 24" fill="currentColor" {...props}>
    <path d="M4 24V15.2C4 8.6 7.9 3.6 14 0l2.2 3.4C12 6 9.9 8.7 9.6 12.4c.5-.2 1.1-.3 1.8-.3 3 0 5.4 2.3 5.4 5.6 0 3.4-2.6 6.3-6 6.3-3.8 0-6.8-2.7-6.8-8zm17.8 0V15.2c0-6.6 3.9-11.6 10-15.2l2.2 3.4c-4.2 2.6-6.3 5.3-6.6 9 .5-.2 1.1-.3 1.8-.3 3 0 5.4 2.3 5.4 5.6 0 3.4-2.6 6.3-6 6.3-3.8 0-6.8-2.7-6.8-8z" />
  </svg>
)
