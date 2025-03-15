"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { MultiStepSignupForm } from "@/components/multi-step-signup-form"
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
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <MultiStepSignupForm />
                </div>
            </div>
            <Footer />
        </div>
    )
}

