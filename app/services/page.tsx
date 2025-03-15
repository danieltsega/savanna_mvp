import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Self-Assessment Tax Returns",
    description:
      "Comprehensive tax return preparation for individuals and businesses, ensuring compliance and maximizing deductions.",
    image: "/services/self-assessment.jpg",
    slug: "self-assessment",
  },
  {
    id: 2,
    title: "Corporation Tax & Limited Company Services",
    description:
      "Expert assistance with corporation tax returns, company accounts, and strategic tax planning for limited companies.",
    image: "/services/corporation-tax.jpg",
    slug: "corporation-tax",
  },
  {
    id: 3,
    title: "VAT Returns & Compliance",
    description:
      "Navigate complex VAT regulations and ensure full compliance with HMRC requirements with our specialized VAT services.",
    image: "/services/vat.jpg",
    slug: "vat",
  },
  {
    id: 4,
    title: "Payroll Services",
    description:
      "Efficient payroll processing and management, ensuring timely and accurate payments for your employees.",
    image: "/services/payroll.jpg",
    slug: "payroll",
  },
  {
    id: 5,
    title: "Bookkeeping & Financial Reporting",
    description:
      "Accurate and timely bookkeeping services to keep your finances organized and compliant with all regulations.",
    image: "/services/bookkeeping.jpg",
    slug: "bookkeeping",
  },
  {
    id: 6,
    title: "Business Start-Up & Advisory Services",
    description:
      "Strategic guidance for new businesses and entrepreneurs to optimize operations and drive growth from day one.",
    image: "/services/business-startup.jpg",
    slug: "business-startup",
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Comprehensive accounting and tax services tailored to meet your specific needs. We help individuals and
              businesses achieve financial success.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={service.image || `/placeholder.svg?height=200&width=400&text=${service.title}`}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-primary-foreground dark:text-primary">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                  <Link href={`/services/${service.slug}`}>
                    <Button className="w-full bg-primary text-white hover:bg-primary-dark">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-primary-foreground dark:text-primary">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Book a consultation with our expert team to discuss your specific needs and how we can help you achieve
              your financial goals.
            </p>
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary-dark">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

