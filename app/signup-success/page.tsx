import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SignupSuccessPage() {
  return (
    <div>
      <Navigation />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold">Client Portal Registration Complete!</h1>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
            <p className="text-green-800 dark:text-green-300 mb-2">Thank you for registering with our client portal.</p>
            <p className="text-green-700 dark:text-green-400">
              We've sent a verification email to your inbox. Please verify your email to activate your account and
              access your client portal.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Once verified, you'll be able to:</p>
              <ul className="list-disc list-inside text-left mt-2">
                <li>Access your financial documents</li>
                <li>Track the progress of your services</li>
                <li>Communicate with your accountant</li>
                <li>Receive important updates and notifications</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button asChild variant="default">
                <Link href="/login">Go to Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Return to Homepage</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

