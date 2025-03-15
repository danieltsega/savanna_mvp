import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of public routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup", "/forgot-password", "/verify-account"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith("/verify-account/"))

  // Get auth tokens from cookies
  const authTokens = request.cookies.get("auth_tokens")?.value
  const authUser = request.cookies.get("auth_user")?.value

  // If user is authenticated and trying to access a public route
  if (authTokens && authUser) {
    try {
      const userData = JSON.parse(authUser)

      // If user is authenticated and trying to access a public route, redirect to appropriate dashboard
      if (isPublicRoute) {
        if (userData.is_staff) {
          return NextResponse.redirect(new URL("/admin", request.url))
        } else {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        }
      }

      // If user is authenticated and trying to access dashboard but is an admin
      if (pathname === "/dashboard") {
        if (userData.is_staff) {
          return NextResponse.redirect(new URL("/admin", request.url))
        }
      }

      // Similarly, if a non-admin tries to access /admin, redirect to dashboard
      if (pathname === "/admin") {
        if (!userData.is_staff) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        }
      }
    } catch (error) {
      console.error("Error parsing auth data:", error)

      // Clear invalid cookies
      const response = NextResponse.next()
      response.cookies.delete("auth_tokens")
      response.cookies.delete("auth_user")
      return response
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
}

