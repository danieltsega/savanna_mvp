import { DocumentsManager } from "@/components/documents-manager"

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Documents</h1>
      <DocumentsManager />
    </div>
  )
}

