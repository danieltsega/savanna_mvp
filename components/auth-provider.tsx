"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  phone_number: string
  user_type: "individual" | "business"
  business_name?: string
  address: string
  date_joined: string
  created_at: string
  updated_at: string
  is_active: boolean
  is_staff: boolean // Added is_staff field
}

type AuthTokens = {
  access: string
  refresh: string
}

type AuthContextType = {
  user: User | null
  tokens: AuthTokens | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean // Added helper property
  updateUser: (userData: Partial<User>) => Promise<void> // Add this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false) // Added state for admin status

  useEffect(() => {
    // Check for existing tokens in localStorage and cookies
    const storedTokens = localStorage.getItem("auth_tokens") || Cookies.get("auth_tokens")
    const storedUser = localStorage.getItem("auth_user") || Cookies.get("auth_user")

    if (storedTokens && storedUser) {
      try {
        const parsedTokens = JSON.parse(storedTokens) as AuthTokens
        const parsedUser = JSON.parse(storedUser) as User

        setTokens(parsedTokens)
        setUser(parsedUser)
        setIsAuthenticated(true)
        setIsAdmin(parsedUser.is_staff) // Set admin status based on is_staff
      } catch (error) {
        console.error("Error parsing stored auth data:", error)
        localStorage.removeItem("auth_tokens")
        localStorage.removeItem("auth_user")
        Cookies.remove("auth_tokens")
        Cookies.remove("auth_user")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Login failed")
      }

      const data = await response.json()

      // Store tokens and user data
      const tokenData = {
        access: data.access,
        refresh: data.refresh,
      }

      setTokens(tokenData)
      setUser(data.user)
      setIsAuthenticated(true)
      setIsAdmin(data.user.is_staff) // Set admin status based on is_staff

      // Save to localStorage for persistence
      const tokenString = JSON.stringify(tokenData)
      const userString = JSON.stringify(data.user)

      localStorage.setItem("auth_tokens", tokenString)
      localStorage.setItem("auth_user", userString)

      // Also save to cookies for cross-tab persistence
      Cookies.set("auth_tokens", tokenString, { expires: 7 }) // 7 days expiry
      Cookies.set("auth_user", userString, { expires: 7 })
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
      throw error
    }
  }

  const logout = () => {
    // Clear auth state
    setUser(null)
    setTokens(null)
    setIsAuthenticated(false)
    setIsAdmin(false)

    // Remove from localStorage
    localStorage.removeItem("auth_tokens")
    localStorage.removeItem("auth_user")

    // Remove from cookies
    Cookies.remove("auth_tokens")
    Cookies.remove("auth_user")
  }

  const updateUser = async (userData: Partial<User>) => {
    if (!user || !tokens) {
      throw new Error("User not authenticated")
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to update user")
      }

      const updatedUser = await response.json()

      // Update user in state and storage
      setUser(updatedUser)

      // Update localStorage
      localStorage.setItem("auth_user", JSON.stringify(updatedUser))

      // Update cookies
      Cookies.set("auth_user", JSON.stringify(updatedUser), 7)

      return updatedUser
    } catch (error) {
      console.error("Update user error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout, isAuthenticated, isAdmin, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

