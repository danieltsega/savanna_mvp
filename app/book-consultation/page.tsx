import { BookConsultationForm } from "@/components/book-consultation-form"

export default function BookConsultationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book a Consultation</h1>
      <BookConsultationForm />
    </div>
  )
}

