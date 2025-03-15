"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Mail } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      })

      setEmail("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-primary/10 dark:bg-primary/5 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Mail className="h-6 w-6 text-primary mr-2" />
        <h3 className="text-xl font-semibold text-primary-foreground dark:text-primary">Subscribe to Our Newsletter</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Stay updated with the latest tax news, accounting tips, and financial insights.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading} className="bg-primary text-white hover:bg-primary-dark">
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  )
}

