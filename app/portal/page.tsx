"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { MultiStepSignupForm } from "@/components/multi-step-signup-form"
import { useAuth } from "@/components/auth-provider"

export default function PortalPage() {
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
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-primary">Client Portal Registration</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Complete your registration to access our full range of accounting services
                        </p>
                    </div>
                    <MultiStepSignupForm />
                </div>
            </div>
            <Footer />
        </div>
    )
}

