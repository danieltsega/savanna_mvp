"use client"

import { useAuth } from "@/components/auth-provider"

export function AuthDebug() {
  const { user, isAuthenticated, isAdmin } = useAuth()

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-0 right-0 bg-black/80 text-white p-4 text-xs font-mono z-50 max-w-xs overflow-auto">
      <div>isAuthenticated: {String(isAuthenticated)}</div>
      <div>isAdmin: {String(isAdmin)}</div>
      <div>user: {user ? JSON.stringify(user, null, 2) : "null"}</div>
    </div>
  )
}

