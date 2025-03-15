"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PaymentForm() {
  const [amount, setAmount] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement payment logic (e.g., redirect to Stripe checkout)
    console.log("Processing payment", { amount })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Make a Payment</h2>
      <div>
        <Label htmlFor="amount">Amount (£)</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
        />
      </div>
      <Button type="submit">Proceed to Payment</Button>
    </form>
  )
}

