"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, FileText } from "lucide-react"
import { CreateRequestForm } from "./create-request-form"
import { useAuth } from "@/components/auth-provider"
import { toast } from "@/components/ui/use-toast"

type ServiceRequest = {
  id: number
  service_type: string
  status: string
  created_at: string
  reference_number?: string
  price?: number
}

export function ServiceRequestsTab() {
  const { tokens } = useAuth()
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/requests/`, {
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch service requests")
      }

      const data = await response.json()
      setRequests(data)
      setError(null)
    } catch (error) {
      console.error("Error fetching requests:", error)
      setError("Failed to load service requests")
      toast({
        title: "Error",
        description: "Failed to load service requests",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (tokens?.access) {
      fetchRequests()
    }
  }, [tokens]) // Removed fetchRequests from dependencies

  const handlePayment = async (requestId: number) => {
    // Implement payment logic
    console.log(`Processing payment for request ${requestId}`)
  }

  const handleCreateSuccess = () => {
    setCreateDialogOpen(false)
    fetchRequests()
  }

  const formatServiceType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Service Requests</h2>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Service Request</DialogTitle>
            </DialogHeader>
            <CreateRequestForm onSuccess={handleCreateSuccess} onCancel={() => setCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No requests yet</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new service request.
          </p>
          <Button onClick={() => setCreateDialogOpen(true)} className="mt-4">
            Create Request
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-900 dark:text-gray-100">Type</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Reference</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Date</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="text-gray-800 dark:text-gray-200">
                  {formatServiceType(request.service_type)}
                </TableCell>
                <TableCell className="text-gray-800 dark:text-gray-200">
                  {request.reference_number || `REQ-${request.id}`}
                </TableCell>
                <TableCell className="text-gray-800 dark:text-gray-200">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : request.status === "in_progress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : request.status === "pending_payment"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {request.status
                      .split("_")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </span>
                </TableCell>
                <TableCell className="text-gray-800 dark:text-gray-200">{formatDate(request.created_at)}</TableCell>
                <TableCell>
                  {request.status === "pending_payment" && request.price && (
                    <Button variant="outline" size="sm" onClick={() => handlePayment(request.id)}>
                      Pay £{request.price}
                    </Button>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-2">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Service Request Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="type" className="text-right">
                            Type
                          </Label>
                          <Input
                            id="type"
                            value={formatServiceType(request.service_type)}
                            className="col-span-3"
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status" className="text-right">
                            Status
                          </Label>
                          <Input
                            id="status"
                            value={request.status
                              .split("_")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")}
                            className="col-span-3"
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date
                          </Label>
                          <Input id="date" value={formatDate(request.created_at)} className="col-span-3" readOnly />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

