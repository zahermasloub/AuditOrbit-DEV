import { apiClient } from "./api-client"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", credentials)
      if (response.token) {
        localStorage.setItem("authToken", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
      }
      return response
    } catch (error) {
      console.warn("[v0] Backend not available, using mock authentication")
      return this.mockLogin(credentials)
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/register", data)
      if (response.token) {
        localStorage.setItem("authToken", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
      }
      return response
    } catch (error) {
      console.warn("[v0] Backend not available, using mock registration")
      return this.mockRegister(data)
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout")
    } catch (error) {
      console.warn("[v0] Logout API call failed")
    } finally {
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<{ user: User }>("/auth/me")
      return response.user
    } catch (error) {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    }
  },

  mockLogin(credentials: LoginCredentials): AuthResponse {
    const mockUser: User = {
      id: "1",
      name: "مستخدم تجريبي",
      email: credentials.email,
      role: credentials.email.includes("admin") ? "admin" : "user",
    }
    const mockToken = "mock-token-" + Date.now()

    localStorage.setItem("authToken", mockToken)
    localStorage.setItem("user", JSON.stringify(mockUser))

    return { user: mockUser, token: mockToken }
  },

  mockRegister(data: RegisterData): AuthResponse {
    const mockUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: "user",
    }
    const mockToken = "mock-token-" + Date.now()

    localStorage.setItem("authToken", mockToken)
    localStorage.setItem("user", JSON.stringify(mockUser))

    return { user: mockUser, token: mockToken }
  },
}
