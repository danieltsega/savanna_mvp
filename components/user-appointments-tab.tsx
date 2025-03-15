"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Appointment = {
  id: number
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled"
  type: string
}

export function UserAppointmentsTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Fetch appointments from API
    const fetchAppointments = async () => {
      // Replace with actual API call
      const mockAppointments = [
        { id: 1, date: "2023-03-15", time: "10:00 AM", status: "pending", type: "Tax Consultation" },
        { id: 2, date: "2023-03-16", time: "2:00 PM", status: "confirmed", type: "Financial Planning" },
        { id: 3, date: "2023-03-17", time: "11:30 AM", status: "pending", type: "Bookkeeping" },
        { id: 4, date: "2023-03-18", time: "3:00 PM", status: "cancelled", type: "Tax Return" },
      ]
      setAppointments(mockAppointments)
    }
    fetchAppointments()
  }, [])

  const filteredAppointments = activeTab === "all" ? appointments : appointments.filter((a) => a.status === activeTab)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">My Appointments</h2>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
            All
          </TabsTrigger>
          <TabsTrigger value="pending" onClick={() => setActiveTab("pending")}>
            Pending
          </TabsTrigger>
          <TabsTrigger value="confirmed" onClick={() => setActiveTab("confirmed")}>
            Confirmed
          </TabsTrigger>
          <TabsTrigger value="cancelled" onClick={() => setActiveTab("cancelled")}>
            Cancelled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-900 dark:text-gray-100">Date</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Time</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Type</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="text-gray-800 dark:text-gray-200">{appointment.date}</TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">{appointment.time}</TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">{appointment.type}</TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">{appointment.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {appointment.status === "pending" && (
                      <Button variant="outline" size="sm" className="ml-2">
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}

