"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { SignupForm } from "@/components/signup-form"
import { useAuth } from "@/components/auth-provider"

export default function SignupPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If already authenticated, redirect to appropriate dashboard
    if (isAuthenticated) {
      if (isAdmin) {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, isAdmin, router])

  return (
    <div>
      <Navigation />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <SignupForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}

