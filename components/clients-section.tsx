"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const clients = [
  { name: "Small Businesses", icon: "/small-business-icon.jpg" },
  { name: "Freelancers", icon: "/freelancer-icon.jpg" },
  { name: "Entrepreneurs", icon: "/entrepreneur-icon.jpg" },
  { name: "Individuals", icon: "/individual-icon.jpg" },
]

export function ClientsSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Who We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <Image
                src={client.icon || "/placeholder.svg"}
                alt={client.name}
                width={80}
                height={80}
                className="mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold text-center">{client.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

