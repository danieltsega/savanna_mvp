import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"

// Mock data for services
const servicesData = {
  "self-assessment": {
    title: "Self-Assessment Tax Returns",
    description:
      "Comprehensive tax return preparation for individuals and businesses, ensuring compliance and maximizing deductions.",
    image: "/services/self-assessment.jpg",
    benefits: [
      "Accurate and timely submission of your tax return",
      "Identification of all applicable tax deductions and reliefs",
      "Advice on tax planning strategies to minimize future tax liabilities",
      "Support with HMRC correspondence and inquiries",
      "Year-round tax advice and support",
    ],
    process: [
      "Initial consultation to understand your financial situation",
      "Collection and organization of all necessary financial documents",
      "Preparation and review of your tax return",
      "Submission to HMRC and confirmation of receipt",
      "Advice on tax payment deadlines and amounts due",
    ],
  },
  "corporation-tax": {
    title: "Corporation Tax & Limited Company Services",
    description:
      "Expert assistance with corporation tax returns, company accounts, and strategic tax planning for limited companies.",
    image: "/services/corporation-tax.jpg",
    benefits: [
      "Accurate preparation and filing of corporation tax returns",
      "Strategic tax planning to minimize corporate tax liabilities",
      "Compliance with all HMRC regulations and deadlines",
      "Preparation of statutory accounts",
      "Ongoing support and advice throughout the financial year",
    ],
    process: [
      "Review of company financial records and transactions",
      "Identification of allowable expenses and capital allowances",
      "Preparation of corporation tax computation and return",
      "Filing with HMRC and Companies House",
      "Advice on tax payment schedules and planning for future periods",
    ],
  },
  vat: {
    title: "VAT Returns & Compliance",
    description:
      "Navigate complex VAT regulations and ensure full compliance with HMRC requirements with our specialized VAT services.",
    image: "/services/vat.jpg",
    benefits: [
      "Accurate and timely VAT return preparation and submission",
      "Advice on VAT registration and deregistration",
      "Guidance on VAT schemes (Flat Rate, Cash Accounting, etc.)",
      "Support with VAT inspections and inquiries",
      "Strategic advice to optimize VAT position",
    ],
    process: [
      "Review of VAT records and transactions",
      "Calculation of VAT due or refundable",
      "Preparation and submission of VAT returns",
      "Advice on VAT payment deadlines",
      "Regular reviews to ensure ongoing compliance",
    ],
  },
  payroll: {
    title: "Payroll Services",
    description:
      "Efficient payroll processing and management, ensuring timely and accurate payments for your employees.",
    image: "/services/payroll.jpg",
    benefits: [
      "Accurate calculation of employee salaries, taxes, and deductions",
      "Timely processing of payroll and distribution of payslips",
      "Compliance with PAYE, National Insurance, and pension regulations",
      "Management of statutory payments (sick pay, maternity pay, etc.)",
      "Year-end reporting and P60 preparation",
    ],
    process: [
      "Set up of payroll system for your business",
      "Collection of employee information and tax codes",
      "Monthly/weekly processing of payroll",
      "Submission of Real Time Information (RTI) to HMRC",
      "Distribution of payslips and reports to management",
    ],
  },
  bookkeeping: {
    title: "Bookkeeping & Financial Reporting",
    description:
      "Accurate and timely bookkeeping services to keep your finances organized and compliant with all regulations.",
    image: "/services/bookkeeping.jpg",
    benefits: [
      "Accurate recording of all financial transactions",
      "Regular financial reports to monitor business performance",
      "Improved financial visibility for better decision-making",
      "Reduced risk of errors and compliance issues",
      "Time savings allowing you to focus on your core business",
    ],
    process: [
      "Set up or review of bookkeeping systems",
      "Regular recording of sales, purchases, and expenses",
      "Bank reconciliations and credit card reconciliations",
      "Preparation of management accounts and financial reports",
      "Year-end preparation for tax returns and accounts",
    ],
  },
  "business-startup": {
    title: "Business Start-Up & Advisory Services",
    description:
      "Strategic guidance for new businesses and entrepreneurs to optimize operations and drive growth from day one.",
    image: "/services/business-startup.jpg",
    benefits: [
      "Expert guidance on business structure selection",
      "Assistance with company formation and registration",
      "Set up of accounting systems and processes",
      "Strategic tax planning from the outset",
      "Ongoing business and financial advice",
    ],
    process: [
      "Initial consultation to understand your business vision and goals",
      "Advice on business structure (sole trader, partnership, limited company)",
      "Registration with HMRC and Companies House",
      "Implementation of accounting and bookkeeping systems",
      "Development of financial forecasts and business plans",
    ],
  },
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const service = servicesData[slug as keyof typeof servicesData]

  // If service not found, show a simple message
  if (!service) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
            <p className="mb-8">The service you're looking for doesn't exist or has been moved.</p>
            <Button asChild>
              <Link href="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <Link href="/services" className="inline-flex items-center text-white hover:underline mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
            <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
            <p className="max-w-3xl text-lg">{service.description}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src={service.image || `/placeholder.svg?height=400&width=600&text=${service.title}`}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6 text-primary-foreground dark:text-primary">Key Benefits</h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-400">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-primary-foreground dark:text-primary">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {service.process.map((step, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold mb-4 mx-auto">
                    {index + 1}
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-400">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-primary-foreground dark:text-primary">Ready to Get Started?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Contact us today to discuss how our {service.title} service can benefit you or your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary-dark">
                <Link href="/contact">Book an Appointment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

