"use client"

import type React from "react"

import { AppLayout } from "@/components/layout"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!user) {
    return null
  }

  return (
    <AppLayout user={user} onLogout={handleLogout}>
      {children}
    </AppLayout>
  )
}
