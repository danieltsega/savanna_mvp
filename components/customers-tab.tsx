"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Customer = {
  id: number
  name: string
  email: string
  phone: string
  type: "individual" | "business"
}

export function CustomersTab() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    // Fetch customers from API
    const fetchCustomers = async () => {
      // Replace with actual API call
      const mockCustomers = [
        { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", type: "individual" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321", type: "business" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "555-555-5555", type: "individual" },
      ]
      setCustomers(mockCustomers)
    }
    fetchCustomers()
  }, [])

  const handleDeleteCustomer = async (customerId: number) => {
    // Implement API call to delete customer
    console.log(`Deleting customer ${customerId}`)
    // Update local state after successful API call
    setCustomers(customers.filter((customer) => customer.id !== customerId))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Customers</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-900 dark:text-gray-100">Name</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Email</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Phone</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Type</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="text-gray-800 dark:text-gray-200">{customer.name}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{customer.email}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{customer.phone}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{customer.type}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="ml-2" onClick={() => handleDeleteCustomer(customer.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

