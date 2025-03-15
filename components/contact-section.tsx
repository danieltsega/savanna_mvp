"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Phone, Mail, MapPin } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual form submission logic
    console.log("Form submitted:", formData)
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    })
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary-foreground dark:text-primary">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary-foreground dark:text-primary">Get in Touch</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Have questions about our services? Need expert financial advice? We're here to help. Reach out to us using
              the contact form or through our contact details.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-primary-foreground dark:text-primary">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">+44 7393 180103</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-primary-foreground dark:text-primary">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">gedaats@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-primary-foreground dark:text-primary">Wigan Office</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    217 Westward House, King St
                    <br />
                    Wigan, WN1 1LP
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-primary-foreground dark:text-primary">Manchester Office</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    125 Deansgate, First Floor
                    <br />
                    Manchester, M3 2LH
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary-foreground dark:text-primary">
                Send Us a Message
              </h3>

              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-gray-800"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-gray-800"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[150px] bg-white dark:bg-gray-800"
                />
              </div>

              <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-dark">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

