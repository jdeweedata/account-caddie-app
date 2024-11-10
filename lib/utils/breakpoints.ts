// Breakpoint values in pixels based on common device sizes
export const breakpoints = {
  xs: 320,    // Small phones
  sm: 375,    // Modern phones
  md: 768,    // Tablets
  lg: 1024,   // Small laptops/tablets
  xl: 1280,   // Laptops/desktops
  xxl: 1536   // Large screens
} as const

// Tailwind-style media query helpers
export const screens = {
  xs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  xxl: `(min-width: ${breakpoints.xxl}px)`,
  // Special cases
  mobile: `(max-width: ${breakpoints.md - 1}px)`,
  tablet: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  desktop: `(min-width: ${breakpoints.lg}px)`,
  // Orientation
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  // Device-specific
  touch: '(hover: none) and (pointer: coarse)',
  mouse: '(hover: hover) and (pointer: fine)',
  // Dark mode
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
} as const

// Container max-widths
export const containerWidths = {
  xs: '100%',
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  xxl: '1320px',
} as const

// Responsive spacing system
export const spacing = {
  xs: {
    page: '1rem',
    section: '1.5rem',
    component: '0.75rem',
    element: '0.5rem'
  },
  sm: {
    page: '1.5rem',
    section: '2rem',
    component: '1rem',
    element: '0.75rem'
  },
  md: {
    page: '2rem',
    section: '3rem',
    component: '1.5rem',
    element: '1rem'
  },
  lg: {
    page: '2.5rem',
    section: '4rem',
    component: '2rem',
    element: '1.25rem'
  },
  xl: {
    page: '3rem',
    section: '5rem',
    component: '2.5rem',
    element: '1.5rem'
  }
} as const

// Responsive typography scale
export const typography = {
  xs: {
    h1: '1.75rem',
    h2: '1.5rem',
    h3: '1.25rem',
    h4: '1.125rem',
    body: '0.875rem',
    small: '0.75rem'
  },
  sm: {
    h1: '2rem',
    h2: '1.75rem',
    h3: '1.5rem',
    h4: '1.25rem',
    body: '1rem',
    small: '0.875rem'
  },
  md: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    body: '1rem',
    small: '0.875rem'
  },
  lg: {
    h1: '3rem',
    h2: '2.5rem',
    h3: '2rem',
    h4: '1.75rem',
    body: '1.125rem',
    small: '1rem'
  },
  xl: {
    h1: '3.5rem',
    h2: '3rem',
    h3: '2.5rem',
    h4: '2rem',
    body: '1.25rem',
    small: '1.125rem'
  }
} as const

// Grid system
export const grid = {
  columns: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 12
  },
  gaps: {
    xs: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem'
  }
} as const

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070
} as const 