"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Phone, Mail, MapPin, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [callbackData, setCallbackData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    reason: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCallbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCallbackData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCallbackData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual form submission logic
    console.log("Form submitted:", formData)
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    })
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual callback booking logic
    console.log("Callback requested:", callbackData)
    toast({
      title: "Callback Requested",
      description: "We've received your callback request and will contact you at the scheduled time.",
    })
    setCallbackData({ name: "", phone: "", email: "", date: "", time: "", reason: "" })
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Have questions or need assistance? We're here to help. Reach out to us using any of the methods below.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-primary-foreground dark:text-primary">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-dark">
                  Send Message
                </Button>
              </form>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-primary-foreground dark:text-primary">
                  Request a Callback
                </h2>
                <form onSubmit={handleCallbackSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="callback-name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Your Name
                      </label>
                      <Input
                        id="callback-name"
                        name="name"
                        value={callbackData.name}
                        onChange={handleCallbackChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="callback-phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="callback-phone"
                        name="phone"
                        value={callbackData.phone}
                        onChange={handleCallbackChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="callback-email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email Address
                      </label>
                      <Input
                        id="callback-email"
                        name="email"
                        type="email"
                        value={callbackData.email}
                        onChange={handleCallbackChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="callback-reason"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Reason for Call
                      </label>
                      <Select onValueChange={(value) => handleSelectChange("reason", value)}>
                        <SelectTrigger id="callback-reason">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tax-return">Tax Return</SelectItem>
                          <SelectItem value="bookkeeping">Bookkeeping</SelectItem>
                          <SelectItem value="vat">VAT</SelectItem>
                          <SelectItem value="payroll">Payroll</SelectItem>
                          <SelectItem value="business-advice">Business Advice</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="callback-date"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Preferred Date
                      </label>
                      <Input
                        id="callback-date"
                        name="date"
                        type="date"
                        value={callbackData.date}
                        onChange={handleCallbackChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="callback-time"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Preferred Time
                      </label>
                      <Input
                        id="callback-time"
                        name="time"
                        type="time"
                        value={callbackData.time}
                        onChange={handleCallbackChange}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-dark">
                    Request Callback
                  </Button>
                </form>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary-foreground dark:text-primary">Contact Information</h2>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-start mb-6">
                  <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-primary-foreground dark:text-primary">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+44 7393 180103</p>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-primary-foreground dark:text-primary">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">gedaats@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-primary-foreground dark:text-primary">Wigan Office</h3>
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
                    <h3 className="font-medium text-primary-foreground dark:text-primary">Manchester Office</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      125 Deansgate, First Floor
                      <br />
                      Manchester, M3 2LH
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <h3 className="font-medium text-primary-foreground dark:text-primary mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" /> Business Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                    <span className="text-gray-600 dark:text-gray-400">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                    <span className="text-gray-600 dark:text-gray-400">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                    <span className="text-gray-600 dark:text-gray-400">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-medium text-primary-foreground dark:text-primary mb-4">Find Us</h3>
                <div className="aspect-video relative rounded-md overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2376.7123607872!2d-2.6362!3d53.5465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b0f3c7b5e6a6d%3A0x6a7dc4c2a7a2a8a0!2sWigan%2C%20UK!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

