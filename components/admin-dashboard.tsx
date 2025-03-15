"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "./admin-sidebar"
import { RequestsTab } from "./requests-tab"
import { AppointmentsTab } from "./appointments-tab"
import { CustomersTab } from "./customers-tab"
import { AdminOverviewTab } from "./admin-overview-tab"
import { DashboardNavigation } from "./dashboard-navigation"
import { DashboardFooter } from "./dashboard-footer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings, Menu } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

type TabType = "overview" | "requests" | "appointments" | "customers"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    // Fetch initial data here
    const fetchData = async () => {
      try {
        // Implement API calls to fetch necessary data
        setLoading(false)
      } catch (err) {
        setError("Failed to load dashboard data")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverviewTab />
      case "requests":
        return <RequestsTab />
      case "appointments":
        return <AppointmentsTab />
      case "customers":
        return <CustomersTab />
      default:
        return null
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Dropdown */}
      <DashboardNavigation />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-700 dark:text-gray-200 text-3xl font-medium">Admin Dashboard</h3>
            </div>
            {renderTabContent()}
          </div>
        </main>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  )
}

