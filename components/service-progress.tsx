"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ServiceStatus = "On Review" | "In Process" | "Completed"

export function ServiceProgress() {
  const [status, setStatus] = useState<ServiceStatus>("On Review")

  const handleStatusChange = (newStatus: ServiceStatus) => {
    setStatus(newStatus)
    // TODO: Implement status update logic
    console.log("Updating service status", { newStatus })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Service Progress</h2>
      <div>
        <p>Current Status: {status}</p>
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Update Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="On Review">On Review</SelectItem>
            <SelectItem value="In Process">In Process</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

