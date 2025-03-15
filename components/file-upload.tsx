"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const handleUpload = async () => {
    // TODO: Implement file upload logic
    console.log("Uploading files", files)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">File Upload</h2>
      <div>
        <Label htmlFor="file-upload">Select Files</Label>
        <Input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.xls,.xlsx,.doc,.docx,.jpg,.png"
          multiple
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold">Selected Files:</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={handleUpload} disabled={files.length === 0}>
        Upload Files
      </Button>
    </div>
  )
}

