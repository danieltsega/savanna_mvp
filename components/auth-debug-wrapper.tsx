"use client"

import { AuthDebug } from "@/components/auth-debug"

export function AuthDebugWrapper() {
  return process.env.NODE_ENV === "development" ? <AuthDebug /> : null
}

