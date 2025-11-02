"use client"
import { typography } from "@/lib/design-system/typography"

const UITypography = ({ variant = "body1", children, className = "", style = {}, component, ...props }) => {
  const textStyle = {
    ...typography[variant],
    ...style,
  }

  // تحديد العنصر HTML بناءً على variant أو component prop
  const Component = component || (variant.startsWith("h") ? variant : "span")

  return (
    <Component className={className} style={textStyle} {...props}>
      {children}
    </Component>
  )
}

export default UITypography
