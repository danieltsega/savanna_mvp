"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ServicesSection } from "@/components/services-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { ClientsSection } from "@/components/clients-section"
import { FAQSection } from "@/components/faq-section"
import { motion } from "framer-motion"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/components/auth-provider"
import { AccreditationBadges } from "@/components/accreditation-badges"

export default function Home() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If already authenticated, redirect to appropriate dashboard
    if (isAuthenticated) {
      if (isAdmin) {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, isAdmin, router])

  return (
    <>
      <Navigation />
      <main className="flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Expert Financial Solutions for Your Success
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl mb-8"
              >
                Tailored accounting services for small businesses, freelancers, and individuals. Let us handle your
                finances while you focus on growth.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary-foreground hover:bg-gray-100 hover:text-primary-foreground dark:bg-primary dark:text-white dark:hover:bg-primary-dark transition-colors"
                >
                  <Link href="/contact">Book an Appointment</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-primary-foreground dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary-foreground transition-colors"
                >
                  <Link href="/portal">Start Your Tax Filing</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="md:w-1/2 flex justify-center"
            >
              <Image
                src="/accountant-working.jpg"
                alt="Savanna Accountancy Expert"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Accreditation Badges Section */}
        <AccreditationBadges />

        {/* Clients Section */}
        <ClientsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

