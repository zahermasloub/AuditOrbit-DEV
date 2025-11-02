// Design Tokens - CSS Custom Properties mapping
// This file provides a bridge between the design system and CSS variables

export const designTokens = {
  // Color tokens
  color: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    card: "var(--card)",
    cardForeground: "var(--card-foreground)",
    popover: "var(--popover)",
    popoverForeground: "var(--popover-foreground)",
    primary: "var(--primary)",
    primaryForeground: "var(--primary-foreground)",
    secondary: "var(--secondary)",
    secondaryForeground: "var(--secondary-foreground)",
    muted: "var(--muted)",
    mutedForeground: "var(--muted-foreground)",
    accent: "var(--accent)",
    accentForeground: "var(--accent-foreground)",
    destructive: "var(--destructive)",
    destructiveForeground: "var(--destructive-foreground)",
    border: "var(--border)",
    input: "var(--input)",
    ring: "var(--ring)",
  },

  // Radius tokens
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
  },

  // Chart tokens
  chart: {
    1: "var(--chart-1)",
    2: "var(--chart-2)",
    3: "var(--chart-3)",
    4: "var(--chart-4)",
    5: "var(--chart-5)",
  },
} as const

// Helper function to get design token
export const getToken = (path: string): string => {
  const keys = path.split(".")
  let value: any = designTokens

  for (const key of keys) {
    value = value[key]
    if (value === undefined) {
      console.warn(`Design token not found: ${path}`)
      return ""
    }
  }

  return value
}
