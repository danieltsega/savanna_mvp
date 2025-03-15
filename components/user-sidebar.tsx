import Link from "next/link"
import { Home, FileText, Calendar, CreditCard } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

type TabType = "overview" | "service-requests" | "appointments" | "payment-history"

interface UserSidebarProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

export function UserSidebar({ activeTab, setActiveTab }: UserSidebarProps) {
  const { user } = useAuth()

  return (
    <div className="flex flex-col w-64 bg-gray-800 h-full">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl uppercase text-white">Welcome to GEDA</h1>
      </div>
      <ul className="flex flex-col py-4 flex-1">
        <li>
          <Link
            href="#"
            onClick={() => setActiveTab("overview")}
            className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
              activeTab === "overview" ? "text-white bg-gray-700" : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <Home />
            </span>
            <span className="text-sm font-medium">Overview</span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            onClick={() => setActiveTab("service-requests")}
            className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
              activeTab === "service-requests" ? "text-white bg-gray-700" : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <FileText />
            </span>
            <span className="text-sm font-medium">Service Requests</span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            onClick={() => setActiveTab("appointments")}
            className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
              activeTab === "appointments" ? "text-white bg-gray-700" : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <Calendar />
            </span>
            <span className="text-sm font-medium">Appointments</span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            onClick={() => setActiveTab("payment-history")}
            className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
              activeTab === "payment-history" ? "text-white bg-gray-700" : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <CreditCard />
            </span>
            <span className="text-sm font-medium">Payment History</span>
          </Link>
        </li>
      </ul>
      <div className="px-6 py-4 text-gray-400 text-sm">
        Logged in as{" "}
        <div
          className="text-white hover:text-gray-200 transition-colors"
        >
          {user?.email || "User"}
        </div>
      </div>
    </div>
  )
}

