"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface AppLayoutProps {
  children: React.ReactNode
  user: {
    name: string
    email: string
    role: "admin" | "manager" | "auditor"
  }
  onLogout: () => void
}

export function AppLayout({ children, user, onLogout }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={user.role}
      />

      <main className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "mr-20" : "mr-[280px]"}`}>
        <Header user={user} onLogout={onLogout} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  )
}
