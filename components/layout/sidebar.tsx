"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Target, Users, Settings, ChevronRight, ChevronLeft } from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  userRole: "admin" | "manager" | "auditor"
}

interface NavItem {
  path: string
  title: string
  icon: React.ReactNode
}

const getNavigationByRole = (role: string): NavItem[] => {
  const baseNav: NavItem[] = [
    {
      path: "/dashboard",
      title: "لوحة التحكم",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      path: "/reports",
      title: "التقارير الموحدة",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      path: "/engagements",
      title: "المشاريع",
      icon: <Target className="h-5 w-5" />,
    },
  ]

  if (role === "admin") {
    return [
      ...baseNav,
      {
        path: "/users",
        title: "المستخدمين",
        icon: <Users className="h-5 w-5" />,
      },
      {
        path: "/settings",
        title: "الإعدادات",
        icon: <Settings className="h-5 w-5" />,
      },
    ]
  }

  return baseNav
}

export function Sidebar({ collapsed, onToggle, userRole }: SidebarProps) {
  const pathname = usePathname()
  const navigation = getNavigationByRole(userRole)

  return (
    <aside
      className={`fixed right-0 top-0 z-50 flex h-screen flex-col border-l border-border bg-card transition-all duration-300 ${
        collapsed ? "w-20" : "w-[280px]"
      }`}
    >
      {/* Header */}
      <div className={`flex items-center gap-3 border-b border-border p-6 ${collapsed ? "justify-center" : ""}`}>
        <div className="text-xl font-bold text-primary">AuditOrbit</div>
        {!collapsed && <span className="text-sm text-muted-foreground">نظام التدقيق الموحد</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-6 py-3 transition-all hover:bg-primary/10 hover:text-primary ${
                isActive ? "border-r-3 border-primary bg-primary/10 text-primary" : "text-muted-foreground"
              } ${collapsed ? "justify-center px-4 py-4" : ""}`}
            >
              {item.icon}
              {!collapsed && <span className="text-sm">{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Toggle Button */}
      <div className="p-4">
        <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={onToggle}>
          {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  )
}
