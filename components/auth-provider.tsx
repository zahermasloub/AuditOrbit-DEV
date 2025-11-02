"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/api/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("access_token")

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("[v0] Failed to parse stored user:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
      }
    } else {
      const mockUser: User = {
        id: 1,
        email: "admin@auditOrbit.com",
        full_name: "مدير النظام",
        role: "admin",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      setUser(mockUser)
    }

    setIsLoading(false)
  }, [])

  const logout = async () => {
    try {
      const { authApi } = await import("@/lib/api")
      await authApi.logout()
    } catch (error) {
      console.error("[v0] Logout error:", error)
    } finally {
      // Clear local storage
      localStorage.removeItem("user")
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      setUser(null)
      router.push("/dashboard")
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
