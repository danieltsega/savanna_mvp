"use client"

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Mail, ArrowRight } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

// Inner component to use useSearchParams
function SignupSuccessContent() {
  const searchParams = useSearchParams()
  const verificationNeeded = searchParams.get("verification") === "true"

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
      <div className="flex justify-center">
        {verificationNeeded ? (
          <Mail className="h-16 w-16 text-blue-500" />
        ) : (
          <CheckCircle className="h-16 w-16 text-green-500" />
        )}
      </div>

      <h1 className="text-2xl font-bold">
        {verificationNeeded ? "Verification Email Sent!" : "Account Created Successfully!"}
      </h1>

      <div
        className={`${verificationNeeded ? "bg-blue-50 dark:bg-blue-900/20" : "bg-green-50 dark:bg-green-900/20"} p-4 rounded-md`}
      >
        {verificationNeeded ? (
          <>
            <p className="text-blue-800 dark:text-blue-300 mb-2">We've sent a verification email to your inbox.</p>
            <p className="text-blue-700 dark:text-blue-400">
              Please check your email and click the verification link to activate your account.
            </p>
          </>
        ) : (
          <>
            <p className="text-green-800 dark:text-green-300 mb-2">Your account has been created successfully.</p>
            <p className="text-green-700 dark:text-green-400">
              You can now log in to access your account and services.
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        {verificationNeeded ? (
          <>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild className="flex-1 group">
              <Link href="/login" className="flex items-center justify-center">
                Check Later
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild className="flex-1 group">
              <Link href="/login" className="flex items-center justify-center">
                Log In Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Back to Home</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default function SignupSuccessPage() {
  return (
    <div>
      <Navigation />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Suspense fallback={<div>Loading...</div>}>
          <SignupSuccessContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}