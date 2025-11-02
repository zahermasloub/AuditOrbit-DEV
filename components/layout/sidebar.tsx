"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  AlertCircle,
  TrendingUp,
  Calendar,
  FolderOpen,
  Settings,
  Users,
  Shield,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/contexts/auth-context"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigation = [
    {
      title: "لوحة التحكم",
      items: [
        { name: "الرئيسية", href: "/dashboard", icon: LayoutDashboard },
        { name: "التقارير", href: "/dashboard/reports", icon: FileText },
      ],
    },
    {
      title: "التدقيق",
      items: [
        { name: "الخطط السنوية", href: "/dashboard/annual-plans", icon: Calendar },
        { name: "المهام", href: "/dashboard/engagements", icon: FolderOpen },
        { name: "قوائم المراجعة", href: "/dashboard/checklists", icon: CheckSquare },
        { name: "النتائج", href: "/dashboard/findings", icon: AlertCircle },
        { name: "الأدلة", href: "/dashboard/evidence", icon: FileText },
        { name: "المتابعة", href: "/dashboard/followup", icon: TrendingUp },
      ],
    },
    {
      title: "الإعدادات",
      items: [
        { name: "الإعدادات العامة", href: "/dashboard/settings", icon: Settings },
        ...(user?.role === "admin"
          ? [
              { name: "المستخدمون", href: "/dashboard/users", icon: Users },
              { name: "الصلاحيات", href: "/dashboard/permissions", icon: Shield },
            ]
          : []),
      ],
    },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 h-screen border-l bg-background transition-all duration-300 md:sticky",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
              <Shield className="h-6 w-6 text-primary" />
              <span>AuditOrbit</span>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:flex">
            <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-4">
          <nav className="space-y-6">
            {navigation.map((section) => (
              <div key={section.title}>
                {!isCollapsed && (
                  <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">{section.title}</h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn("w-full justify-start gap-3", isCollapsed && "justify-center px-2")}
                          onClick={() => onClose()}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {!isCollapsed && <span>{item.name}</span>}
                        </Button>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  )
}
