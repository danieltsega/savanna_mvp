"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How do I upload my documents securely?",
    answer:
      'You can easily upload your documents through our secure client portal. After logging in, navigate to the "Document Upload" section and follow the simple instructions to upload your files.',
  },
  {
    question: "What types of files can I upload?",
    answer:
      "We accept PDF, Excel, Word documents, and image files (JPG, PNG) for financial records, invoices, and receipts. The maximum file size is 10MB per file.",
  },
  {
    question: "How do I book an appointment with an expert?",
    answer:
      'To book an appointment, log into your account and go to the "Appointments" section. Choose your preferred date and time from the available slots, and confirm your booking.',
  },
  {
    question: "How will I receive cost estimates for services?",
    answer:
      "After reviewing your uploaded documents, we will send you a cost estimate via WhatsApp. You can also view and discuss the estimate within your secure client portal.",
  },
]

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{ backgroundColor: activeIndex === index ? "var(--accent)" : "transparent" }}
              className="mb-4 rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="p-4 bg-gray-50 dark:bg-gray-700">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

