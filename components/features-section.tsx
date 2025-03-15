"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Calendar, CreditCard, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    title: "Secure Document Upload",
    description: "Easily upload and manage your financial documents through our encrypted portal.",
    icon: Upload,
  },
  {
    title: "Online Appointment Booking",
    description: "Schedule consultations with our experts at your convenience.",
    icon: Calendar,
  },
  {
    title: "Seamless Online Payments",
    description: "Make secure payments for our services using various payment methods.",
    icon: CreditCard,
  },
  {
    title: "Real-time Communication",
    description: "Stay updated with instant messaging and notifications about your services.",
    icon: MessageSquare,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

