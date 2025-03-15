"use client"

import { useState } from "react"
import { UserSidebar } from "./user-sidebar"
import { ServiceRequestsTab } from "./service-requests-tab"
import { UserAppointmentsTab } from "./user-appointments-tab"
import { PaymentHistoryTab } from "./payment-history-tab"
import { UserOverviewTab } from "./user-overview-tab"
import { DashboardNavigation } from "./dashboard-navigation"
import { DashboardFooter } from "./dashboard-footer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings, LogOut, Menu } from "lucide-react"
import Link from "next/link"

type TabType = "overview" | "service-requests" | "appointments" | "payment-history"

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <UserOverviewTab />
      case "service-requests":
        return <ServiceRequestsTab />
      case "appointments":
        return <UserAppointmentsTab />
      case "payment-history":
        return <PaymentHistoryTab />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Dropdown */}
      <DashboardNavigation />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-700 dark:text-gray-200 text-3xl font-medium">User Dashboard</h3>
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

