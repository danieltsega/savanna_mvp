"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
    user_type: "individual",
    business_name: "",
    address: "",
    phone_number: "",
  })
  const [passwordMatch, setPasswordMatch] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setPasswordMatch(formData.password1 === formData.password2 || formData.password2 === "")
  }, [formData.password1, formData.password2])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordMatch) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/signup-success")
      } else {
        const errorData = await response.json()
        toast({
          title: "Error",
          description: errorData.detail || "An error occurred during signup.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Signup error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-primary-foreground dark:text-primary">Create Your Account</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="first_name">First Name</Label>
          <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
        </div>
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      
      <div>
        <Label>User Type</Label>
        <RadioGroup
          defaultValue="individual"
          onValueChange={(value) => setFormData((prev) => ({ ...prev, user_type: value }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual">Individual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business">Business</Label>
          </div>
        </RadioGroup>
      </div>
      
      {formData.user_type === "business" && (
        <div>
          <Label htmlFor="business_name">Business Name</Label>
          <Input id="business_name" name="business_name" value={formData.business_name} onChange={handleChange} />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="password1">Password</Label>
          <Input
            id="password1"
            name="password1"
            type="password"
            value={formData.password1}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password2">Confirm Password</Label>
          <Input
            id="password2"
            name="password2"
            type="password"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          {!passwordMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match</p>}
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-dark">
        Create Account
      </Button>
      
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:text-primary-dark">
          Sign in
        </Link>
      </p>
    </form>
  )
}

