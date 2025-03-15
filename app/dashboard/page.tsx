"use client"

import { useEffect } from "react"
import { UserDashboard } from "@/components/user-dashboard"
import { RouteGuard } from "@/components/route-guard"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If user is authenticated and is an admin, redirect to admin dashboard
    if (isAuthenticated && isAdmin) {
      router.push("/admin")
    }
  }, [isAuthenticated, isAdmin, router])

  return (
    <RouteGuard requireAuth={true}>
      <UserDashboard />
    </RouteGuard>
  )
}

