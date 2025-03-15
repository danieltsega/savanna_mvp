"use client"

import { useEffect } from "react"
import { AdminDashboard } from "@/components/admin-dashboard"
import { RouteGuard } from "@/components/route-guard"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If user is authenticated but not an admin, redirect to dashboard
    if (isAuthenticated && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  return (
    <RouteGuard requireAuth={true} requireAdmin={true}>
      <AdminDashboard />
    </RouteGuard>
  )
}

