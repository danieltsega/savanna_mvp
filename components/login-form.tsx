"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)

      // Get the updated user data from localStorage to check is_staff
      const storedUser = localStorage.getItem("auth_user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)

        toast({
          title: "Login Successful",
          description: "You have been successfully logged in.",
        })

        // Add a small delay to ensure state is updated
        setTimeout(() => {
          // Redirect based on is_staff status
          if (userData.is_staff) {
            router.push("/admin")
          } else {
            router.push("/dashboard")
          }
        }, 100)
      }
    } catch (error) {
      console.error("Login failed", error)
      // Error handling is done in the auth provider
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <Label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900 dark:text-gray-300">
            Remember me
          </Label>
        </div>
        <div className="text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
      <div className="mt-4 text-center">
        <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
        <Link href="/signup" className="text-primary hover:underline">
          Sign Up
        </Link>
      </div>
    </form>
  )
}

