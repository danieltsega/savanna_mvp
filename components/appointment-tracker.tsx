"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type AppointmentStatus = "Pending" | "Confirmed" | "Completed"

export function AppointmentTracker() {
  const [status, setStatus] = useState<AppointmentStatus>("Pending")

  const handleStatusChange = (newStatus: AppointmentStatus) => {
    setStatus(newStatus)
    // TODO: Implement status update logic
    console.log("Updating appointment status", { newStatus })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Appointment Status</h2>
      <div>
        <p>Current Status: {status}</p>
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Update Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

