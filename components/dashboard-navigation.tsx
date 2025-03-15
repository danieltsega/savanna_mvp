"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings, LogOut, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-provider"
import Cookies from "js-cookie"
import { UserSettingsDrawer } from "./user-settings-drawer"
import { AdminSettingsDrawer } from "./admin-settings-drawer"

export function DashboardNavigation() {
  const { user, logout, isAdmin } = useAuth()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleLogout = () => {
    // Call the auth provider's logout function
    logout()

    // Explicitly remove cookies as well
    Cookies.remove("auth_tokens")
    Cookies.remove("auth_user")

    // Use window.location for a full page refresh to ensure all state is cleared
    window.location.href = "/login"
  }

  const userName = user ? `${user.first_name} ${user.last_name}` : "User"

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left side (empty for future use) */}
            <div></div>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem disabled>
                    <span>Logged in as {userName}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSettingsOpen(true)} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {isAdmin ? (
        <AdminSettingsDrawer open={settingsOpen} onOpenChange={setSettingsOpen} />
      ) : (
        <UserSettingsDrawer open={settingsOpen} onOpenChange={setSettingsOpen} />
      )}
    </>
  )
}

