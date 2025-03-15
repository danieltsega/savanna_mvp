"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { X, Upload, FileText, Loader2 } from "lucide-react"

interface CreateRequestFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

type FileWithPreview = {
  file: File
  description: string
  id: string
}

export function CreateRequestForm({ onSuccess, onCancel }: CreateRequestFormProps) {
  const { user, tokens } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    service_type: "",
    national_insurance_number: "",
    utr_number: "",
    reference_number: "",
  })

  const [files, setFiles] = useState<FileWithPreview[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        description: "",
        id: crypto.randomUUID(),
      }))

      setFiles((prev) => [...prev, ...newFiles])
    }

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleFileDescriptionChange = (id: string, description: string) => {
    setFiles((prev) => prev.map((fileItem) => (fileItem.id === id ? { ...fileItem, description } : fileItem)))
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((fileItem) => fileItem.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.service_type) {
      toast({
        title: "Missing Information",
        description: "Please select a service type.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Step 1: Create the service request
      const requestResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/requests/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens?.access}`,
        },
        body: JSON.stringify({
          ...formData,
          status: "draft", // Default status for new requests
        }),
      })

      if (!requestResponse.ok) {
        throw new Error("Failed to create service request")
      }

      const requestData = await requestResponse.json()

      // Step 2: Upload files if any
      if (files.length > 0) {
        const uploadPromises = files.map(async (fileItem) => {
          const formData = new FormData()
          formData.append("file", fileItem.file)
          formData.append("description", fileItem.description)
          formData.append("service", requestData.id.toString())

          const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/documents/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokens?.access}`,
            },
            body: formData,
          })

          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload file: ${fileItem.file.name}`)
          }

          return uploadResponse.json()
        })

        await Promise.all(uploadPromises)
      }

      toast({
        title: "Request Created",
        description: "Your service request has been created successfully.",
      })

      // Reset form
      setFormData({
        service_type: "",
        national_insurance_number: "",
        utr_number: "",
        reference_number: "",
      })
      setFiles([])

      // Call success callback
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error creating request:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create request",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="service_type">Service Type</Label>
          <Select value={formData.service_type} onValueChange={(value) => handleSelectChange("service_type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tax_return">Tax Return</SelectItem>
              <SelectItem value="bookkeeping">Bookkeeping</SelectItem>
              <SelectItem value="payroll">Payroll</SelectItem>
              <SelectItem value="vat">VAT</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="national_insurance_number">National Insurance Number</Label>
          <Input
            id="national_insurance_number"
            name="national_insurance_number"
            value={formData.national_insurance_number}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="utr_number">UTR Number</Label>
          <Input id="utr_number" name="utr_number" value={formData.utr_number} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="reference_number">Reference Number (Optional)</Label>
          <Input
            id="reference_number"
            name="reference_number"
            value={formData.reference_number}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Upload Documents</Label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="mx-auto flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Select Files
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Supported formats: PDF, Word, Excel, JPG, PNG</p>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <Label>Selected Files</Label>
            <div className="space-y-3">
              {files.map((fileItem) => (
                <div
                  key={fileItem.id}
                  className="flex flex-col gap-2 p-3 border rounded-md bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium truncate max-w-[200px]">{fileItem.file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(fileItem.file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(fileItem.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Add a description for this file"
                    value={fileItem.description}
                    onChange={(e) => handleFileDescriptionChange(fileItem.id, e.target.value)}
                    className="text-sm"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Request"
          )}
        </Button>
      </div>
    </form>
  )
}

