"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { toast } from "@/components/ui/use-toast"
import { Loader2, FileText, Download } from "lucide-react"

type Request = {
  id: number
  user: {
    id: number
    email: string
    first_name: string
    last_name: string
  }
  service_type: string
  status: string
  created_at: string
  updated_at: string
  documents?: {
    id: number
    file: string
    description: string
    uploaded_at: string
  }[]
}

export function RequestsTab() {
  const { tokens } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [priceDialogOpen, setPriceDialogOpen] = useState(false)
  const [price, setPrice] = useState("")
  const [submittingPrice, setSubmittingPrice] = useState(false)

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

  const filteredRequests =
    activeTab === "all" ? requests : requests.filter((r) => r.status.toLowerCase() === activeTab.toLowerCase())

  const handleAddPrice = async (request: Request) => {
    setSelectedRequest(request)
    setPriceDialogOpen(true)
  }

  const handleSubmitPrice = async () => {
    if (!selectedRequest) return

    setSubmittingPrice(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/requests/${selectedRequest.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens?.access}`,
        },
        body: JSON.stringify({
          price: Number.parseFloat(price),
          status: "pending_payment",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update request price")
      }

      toast({
        title: "Price Added",
        description: "The price has been added to the request successfully.",
      })

      setPriceDialogOpen(false)
      setPrice("")
      fetchRequests()
    } catch (error) {
      console.error("Error adding price:", error)
      toast({
        title: "Error",
        description: "Failed to add price to the request",
        variant: "destructive",
      })
    } finally {
      setSubmittingPrice(false)
    }
  }

  const handleUpdateStatus = async (requestId: number, newStatus: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/requests/${requestId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens?.access}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update request status")
      }

      toast({
        title: "Status Updated",
        description: "The request status has been updated successfully.",
      })

      fetchRequests()
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "Failed to update request status",
        variant: "destructive",
      })
    }
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
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
          All
        </TabsTrigger>
        <TabsTrigger value="draft" onClick={() => setActiveTab("draft")}>
          New
        </TabsTrigger>
        <TabsTrigger value="pending_payment" onClick={() => setActiveTab("pending_payment")}>
          Pending Payment
        </TabsTrigger>
        <TabsTrigger value="in_progress" onClick={() => setActiveTab("in_progress")}>
          In Progress
        </TabsTrigger>
        <TabsTrigger value="completed" onClick={() => setActiveTab("completed")}>
          Completed
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No requests found</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              There are no service requests in this category.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-900 dark:text-gray-100">ID</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Customer</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Type</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Date</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="text-gray-800 dark:text-gray-200">{request.id}</TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {request.user.first_name} {request.user.last_name}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {formatServiceType(request.service_type)}
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Request Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="customer" className="text-right">
                              Customer
                            </Label>
                            <Input
                              id="customer"
                              value={`${request.user.first_name} ${request.user.last_name}`}
                              className="col-span-3"
                              readOnly
                            />
                          </div>
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

                          {request.documents && request.documents.length > 0 && (
                            <div className="col-span-4 mt-4">
                              <Label>Documents</Label>
                              <div className="mt-2 space-y-2">
                                {request.documents.map((doc) => (
                                  <div
                                    key={doc.id}
                                    className="flex items-center justify-between p-3 border rounded-md bg-gray-50 dark:bg-gray-800"
                                  >
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-blue-500" />
                                      <div>
                                        <p className="text-sm font-medium">{doc.file.split("/").pop()}</p>
                                        {doc.description && <p className="text-xs text-gray-500">{doc.description}</p>}
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-4 w-4 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          {request.status === "draft" && (
                            <>
                              <Button variant="outline" onClick={() => handleAddPrice(request)}>
                                Add Price
                              </Button>
                              <Button onClick={() => handleUpdateStatus(request.id, "in_progress")}>
                                Start Processing
                              </Button>
                            </>
                          )}

                          {request.status === "pending_payment" && (
                            <Button onClick={() => handleUpdateStatus(request.id, "in_progress")}>Mark as Paid</Button>
                          )}

                          {request.status === "in_progress" && (
                            <Button onClick={() => handleUpdateStatus(request.id, "completed")}>
                              Mark as Completed
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {request.status === "draft" && (
                      <Button variant="outline" size="sm" className="ml-2" onClick={() => handleAddPrice(request)}>
                        Add Price
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TabsContent>

      {/* Price Dialog */}
      <Dialog open={priceDialogOpen} onOpenChange={setPriceDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Price</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (£)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPriceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitPrice} disabled={submittingPrice || !price}>
              {submittingPrice ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Tabs>
  )
}

