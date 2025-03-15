"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Payment = {
  id: number
  date: string
  amount: number
  status: "pending" | "completed" | "failed"
}

export function PaymentHistoryTab() {
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    // Fetch payments from API
    const fetchPayments = async () => {
      // Replace with actual API call
      const mockPayments = [
        { id: 1, date: "2023-03-01", amount: 100, status: "completed" },
        { id: 2, date: "2023-03-05", amount: 50, status: "completed" },
        { id: 3, date: "2023-03-10", amount: 200, status: "pending" },
      ]
      setPayments(mockPayments)
    }
    fetchPayments()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Payment History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-900 dark:text-gray-100">Date</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Amount</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="text-gray-800 dark:text-gray-200">{payment.date}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">£{payment.amount}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{payment.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

