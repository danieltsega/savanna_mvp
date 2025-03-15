"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export function BookConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual form submission logic
    console.log("Form submitted:", formData)
    toast({
      title: "Consultation Booked",
      description: "We've received your request and will contact you soon to confirm.",
    })
    setFormData({ name: "", email: "", phone: "", date: "", time: "", service: "", message: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
      <Input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="tel"
        name="phone"
        placeholder="Your Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <Input type="time" name="time" value={formData.time} onChange={handleChange} required />
      <Select onValueChange={(value) => handleSelectChange("service", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a service" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tax-return">Tax Return</SelectItem>
          <SelectItem value="financial-planning">Financial Planning</SelectItem>
          <SelectItem value="bookkeeping">Bookkeeping</SelectItem>
          <SelectItem value="business-advisory">Business Advisory</SelectItem>
        </SelectContent>
      </Select>
      <Textarea name="message" placeholder="Additional Information" value={formData.message} onChange={handleChange} />
      <Button type="submit" className="w-full">
        Book Consultation
      </Button>
    </form>
  )
}

