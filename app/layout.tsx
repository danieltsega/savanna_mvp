import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthDebugWrapper } from "@/components/auth-debug-wrapper" // Import the missing component

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Savanna Accountancy",
  description: "Professional accounting services for individuals and businesses",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              {/* <Navigation /> */}
              <main className="flex-grow">{children}</main>
              {/* <Footer /> */}
            </div>
            {process.env.NODE_ENV === "development" && <AuthDebugWrapper />}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'