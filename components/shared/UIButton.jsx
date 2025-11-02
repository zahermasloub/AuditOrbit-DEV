"use client"
import { colorPalette } from "@/lib/design-system/colors"

const UIButton = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}) => {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "6px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    fontWeight: "500",
    textDecoration: "none",
    outline: "none",
    gap: "8px",
  }

  const variants = {
    primary: {
      backgroundColor: colorPalette.primary[500],
      color: "#ffffff",
      border: `1px solid ${colorPalette.primary[500]}`,
    },
    secondary: {
      backgroundColor: "transparent",
      color: colorPalette.primary[500],
      border: `1px solid ${colorPalette.primary[500]}`,
    },
    ghost: {
      backgroundColor: "transparent",
      color: colorPalette.neutral[600],
      border: "1px solid transparent",
    },
    success: {
      backgroundColor: colorPalette.success[500],
      color: "#ffffff",
      border: `1px solid ${colorPalette.success[500]}`,
    },
    danger: {
      backgroundColor: colorPalette.error[500],
      color: "#ffffff",
      border: `1px solid ${colorPalette.error[500]}`,
    },
  }

  const sizes = {
    small: {
      padding: "6px 12px",
      fontSize: "0.875rem",
      height: "32px",
    },
    medium: {
      padding: "8px 16px",
      fontSize: "1rem",
      height: "40px",
    },
    large: {
      padding: "12px 24px",
      fontSize: "1.125rem",
      height: "48px",
    },
  }

  const buttonStyle = {
    ...baseStyle,
    ...variants[variant],
    ...sizes[size],
    opacity: disabled ? 0.6 : 1,
    ...(disabled && {
      pointerEvents: "none",
    }),
  }

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled || loading} className={className} {...props}>
      {loading && (
        <span
          style={{
            width: "16px",
            height: "16px",
            border: "2px solid transparent",
            borderTop: "2px solid currentColor",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
      {children}
    </button>
  )
}

export default UIButton
