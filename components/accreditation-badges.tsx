"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AccreditationBadges() {
  const badges = [
    {
      name: "AAT Licensed Accountant",
      image: "/badges/aat-badge.png",
      description: "Association of Accounting Technicians Licensed Member",
    },
    {
      name: "QuickBooks Certified ProAdvisor",
      image: "/badges/quickbooks-badge.png",
      description: "Certified QuickBooks Online ProAdvisor",
    },
  ]

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-center mb-8 text-primary-foreground dark:text-primary"
        >
          Our Accreditations
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
        >
          We maintain the highest professional standards through our accreditations and certifications
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative h-24 w-24 md:h-32 md:w-32 mb-4">
                <Image
                  src={badge.image || `/placeholder.svg?height=120&width=120&text=${badge.name}`}
                  alt={badge.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-primary-foreground dark:text-primary mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

