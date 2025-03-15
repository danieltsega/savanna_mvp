"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

export default function LoginPage() {
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
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="w-full max-w-md mx-auto">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Or{" "}
                <Link href="/signup" className="font-medium text-primary hover:text-primary-dark">
                  create a new account
                </Link>
              </p>
            </div>
            <div className="mt-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

