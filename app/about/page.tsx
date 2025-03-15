import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About Savanna Accountancy</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Professional accounting services with a personal touch. We're committed to helping our clients achieve
              financial success.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary-foreground dark:text-primary">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                At Savanna Accountancy, our mission is to provide exceptional accounting services that empower
                individuals and businesses to achieve their financial goals. We believe in building long-term
                relationships with our clients based on trust, integrity, and personalized service.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We understand that every client has unique needs, which is why we take the time to understand your
                specific situation and tailor our services accordingly. Our team of experienced professionals is
                dedicated to delivering accurate, timely, and valuable financial guidance.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    AAT Licensed Accountant with years of industry experience
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    QuickBooks Certified ProAdvisor for efficient bookkeeping solutions
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Committed to staying updated with the latest tax regulations
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Dedicated to providing personalized service to each client
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/about-image.jpg" alt="Savanna Accountancy Office" fill className="object-cover" />
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary-foreground dark:text-primary">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-primary-foreground dark:text-primary">Expertise</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our team brings years of experience and specialized knowledge in accounting, taxation, and financial
                  planning to help you navigate complex financial matters with confidence.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-primary-foreground dark:text-primary">
                  Personalized Service
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We take the time to understand your unique needs and goals, providing tailored solutions that address
                  your specific financial challenges and opportunities.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-primary-foreground dark:text-primary">
                  Technology-Driven
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We leverage the latest accounting software and digital tools to streamline processes, enhance
                  accuracy, and provide you with real-time insights into your financial position.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-primary-foreground dark:text-primary">
              Ready to Work With Us?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Contact us today to schedule a consultation and discover how our accounting services can help you achieve
              your financial goals.
            </p>
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary-dark">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

