// نظام الألوان الموحد لـ AuditOrbit
// Unified Color System for AuditOrbit

// لوحة الألوان الأساسية - Primary Color Palette
export const colorPalette = {
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  secondary: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  success: {
    50: "#f0fdf4",
    500: "#22c55e",
    700: "#15803d",
  },
  warning: {
    50: "#fffbeb",
    500: "#f59e0b",
    700: "#b45309",
  },
  error: {
    50: "#fef2f2",
    500: "#ef4444",
    700: "#b91c1c",
  },
  info: {
    50: "#eff6ff",
    500: "#3b82f6",
    700: "#1d4ed8",
  },
}

// الألوان الدلالية - Semantic Colors
export const semanticColors = {
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
    dark: "#0f172a",
    darkSecondary: "#1e293b",
  },
  text: {
    primary: "#0f172a",
    secondary: "#64748b",
    tertiary: "#94a3b8",
    inverse: "#ffffff",
    disabled: "#cbd5e1",
  },
  border: {
    light: "#e2e8f0",
    medium: "#cbd5e1",
    dark: "#94a3b8",
  },
  status: {
    success: colorPalette.success[500],
    warning: colorPalette.warning[500],
    error: colorPalette.error[500],
    info: colorPalette.info[500],
  },
}

// ألوان التطبيق المخصصة - Application Specific Colors
export const appColors = {
  audit: {
    primary: colorPalette.primary[600],
    secondary: colorPalette.secondary[500],
    accent: colorPalette.primary[400],
  },
  dashboard: {
    cardBg: semanticColors.background.primary,
    cardBorder: semanticColors.border.light,
    statPositive: colorPalette.success[500],
    statNegative: colorPalette.error[500],
  },
}
