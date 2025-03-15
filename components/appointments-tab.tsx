"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Appointment = {
  id: number
  customer: string
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled"
}

export function AppointmentsTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    // Fetch appointments from API
    const fetchAppointments = async () => {
      // Replace with actual API call
      const mockAppointments = [
        { id: 1, customer: "John Doe", date: "2023-03-15", time: "10:00 AM", status: "pending" },
        { id: 2, customer: "Jane Smith", date: "2023-03-16", time: "2:00 PM", status: "confirmed" },
        { id: 3, customer: "Bob Johnson", date: "2023-03-17", time: "11:30 AM", status: "pending" },
      ]
      setAppointments(mockAppointments)
    }
    fetchAppointments()
  }, [])

  const handleStatusChange = async (appointmentId: number, newStatus: "confirmed" | "cancelled") => {
    // Implement API call to update appointment status
    console.log(`Updating appointment ${appointmentId} to ${newStatus}`)
    // Update local state after successful API call
    setAppointments(appointments.map((app) => (app.id === appointmentId ? { ...app, status: newStatus } : app)))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Appointments</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-900 dark:text-gray-100">Customer</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Date</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Time</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="text-gray-800 dark:text-gray-200">{appointment.customer}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{appointment.date}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{appointment.time}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{appointment.status}</TableCell>
              <TableCell>
                {appointment.status === "pending" && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(appointment.id, "confirmed")}>
                      Confirm
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      onClick={() => handleStatusChange(appointment.id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

