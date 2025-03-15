"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "John Smith",
    role: "Small Business Owner",
    content:
      "Savanna Accountancy has been instrumental in helping my business grow. Their expert advice and efficient services have saved me time and money. I highly recommend their services to any business owner looking for reliable accounting support.",
    avatar: "/john-smith-avatar.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    content:
      "As a freelancer, managing finances was always a challenge. Savanna Accountancy simplified everything for me. I can now focus on my work without worrying about taxes. Their team is responsive, professional, and truly cares about their clients.",
    avatar: "/sarah-johnson-avatar.jpg",
  },
  {
    name: "Michael Brown",
    role: "Tech Startup Founder",
    content:
      "The team at Savanna Accountancy understands the unique challenges of startups. Their strategic financial planning has been crucial to our success. They've helped us navigate complex tax situations and provided invaluable business advice.",
    avatar: "/michael-brown-avatar.jpg",
  },
  {
    name: "Emma Wilson",
    role: "E-commerce Entrepreneur",
    content:
      "I've been working with Savanna Accountancy for over two years now, and they've consistently exceeded my expectations. Their attention to detail and proactive approach to tax planning has saved my business thousands of pounds.",
    avatar: "/emma-wilson-avatar.jpg",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextTestimonial()
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary-foreground dark:text-primary">
          What Our Clients Say
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-primary hover:text-white"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>
          </div>

          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-primary hover:text-white"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          <div
            className="overflow-hidden h-[400px] md:h-[350px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <Card className="h-full border-none shadow-lg">
                  <CardContent className="flex flex-col md:flex-row items-center p-6 h-full">
                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                      <Avatar className="h-32 w-32 md:h-48 md:w-48 border-4 border-primary">
                        <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} />
                        <AvatarFallback className="text-4xl bg-primary text-white">
                          {testimonials[currentIndex].name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="md:w-2/3 md:pl-8">
                      <p className="text-lg italic mb-6 text-gray-700 dark:text-gray-300">
                        "{testimonials[currentIndex].content}"
                      </p>
                      <div>
                        <h3 className="text-xl font-bold text-primary-foreground dark:text-primary">
                          {testimonials[currentIndex].name}
                        </h3>
                        <p className="text-sm text-secondary dark:text-secondary-light">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 mx-1 rounded-full ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

