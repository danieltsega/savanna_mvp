"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileText, Calculator, BookOpen, TrendingUp, FileCheck, PoundSterling } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    title: "Self-Assessment Tax Returns",
    description:
      "Comprehensive tax return preparation for individuals and businesses, ensuring compliance and maximizing deductions.",
    icon: FileText,
    link: "/services/self-assessment",
  },
  {
    title: "Corporation Tax & Limited Company",
    description:
      "Expert assistance with corporation tax returns, company accounts, and strategic tax planning for limited companies.",
    icon: Calculator,
    link: "/services/corporation-tax",
  },
  {
    title: "Bookkeeping & Financial Reporting",
    description:
      "Accurate and timely bookkeeping services to keep your finances organized and compliant with all regulations.",
    icon: BookOpen,
    link: "/services/bookkeeping",
  },
  {
    title: "Business Start-Up & Advisory",
    description:
      "Strategic guidance for new businesses and entrepreneurs to optimize operations and drive growth from day one.",
    icon: TrendingUp,
    link: "/services/business-startup",
  },
  {
    title: "VAT Returns & Compliance",
    description:
      "Navigate complex VAT regulations and ensure full compliance with HMRC requirements with our specialized VAT services.",
    icon: FileCheck,
    link: "/services/vat",
  },
  {
    title: "Payroll Management",
    description:
      "Efficient payroll processing and management, ensuring timely and accurate payments for your employees.",
    icon: PoundSterling,
    link: "/services/payroll",
  },
]

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-primary-foreground dark:text-primary"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Card className="h-full transition-shadow duration-300 hover:shadow-lg border-t-4 border-t-primary">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <service.icon className="w-8 h-8 mr-4 text-primary" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <CardDescription className="flex-grow mb-4">{service.description}</CardDescription>
                  <Button asChild variant="outline" className="mt-auto w-full hover:bg-primary hover:text-white">
                    <Link href={service.link}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-24">
          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary-dark">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

