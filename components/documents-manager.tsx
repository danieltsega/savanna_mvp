"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Document = {
  id: number
  name: string
  type: string
  uploadDate: string
  size: string
}

export function DocumentsManager() {
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    // Fetch documents from API
    const fetchDocuments = async () => {
      // Replace with actual API call
      const mockDocuments = [
        { id: 1, name: "Tax Return 2022.pdf", type: "PDF", uploadDate: "2023-03-01", size: "2.5 MB" },
        { id: 2, name: "Invoice March 2023.docx", type: "Word", uploadDate: "2023-03-15", size: "1.2 MB" },
        { id: 3, name: "Financial Statement Q1.xlsx", type: "Excel", uploadDate: "2023-04-01", size: "3.7 MB" },
      ]
      setDocuments(mockDocuments)
    }
    fetchDocuments()
  }, [])

  const handleUpload = () => {
    // Implement document upload logic
    console.log("Uploading new document")
  }

  const handleDelete = (id: number) => {
    // Implement document deletion logic
    console.log(`Deleting document with id ${id}`)
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  return (
    <div>
      <Button onClick={handleUpload} className="mb-4">
        Upload New Document
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-900 dark:text-gray-100">Name</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Type</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Upload Date</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Size</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="text-gray-800 dark:text-gray-200">{doc.name}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{doc.type}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{doc.uploadDate}</TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{doc.size}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Document Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" value={doc.name} className="col-span-3" readOnly />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                          Type
                        </Label>
                        <Input id="type" value={doc.type} className="col-span-3" readOnly />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="uploadDate" className="text-right">
                          Upload Date
                        </Label>
                        <Input id="uploadDate" value={doc.uploadDate} className="col-span-3" readOnly />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="size" className="text-right">
                          Size
                        </Label>
                        <Input id="size" value={doc.size} className="col-span-3" readOnly />
                      </div>
                    </div>
                    <Button onClick={() => console.log(`Downloading document ${doc.id}`)}>Download</Button>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" className="ml-2" onClick={() => handleDelete(doc.id)}>
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

