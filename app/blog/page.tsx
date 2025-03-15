import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, Clock, Tag } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Understanding Self-Assessment Tax Returns",
    excerpt: "A comprehensive guide to completing your self-assessment tax return correctly and on time.",
    category: "Tax Updates",
    date: "March 1, 2025",
    readTime: "5 min read",
    image: "/blog-tax-return.jpg",
    slug: "understanding-self-assessment-tax-returns",
  },
  {
    id: 2,
    title: "Essential Bookkeeping Tips for Small Businesses",
    excerpt: "Learn how proper bookkeeping can save you time, money, and stress as a small business owner.",
    category: "Accounting Tips",
    date: "February 15, 2025",
    readTime: "4 min read",
    image: "/blog-bookkeeping.jpg",
    slug: "essential-bookkeeping-tips-small-businesses",
  },
  {
    id: 3,
    title: "How to Prepare for the New Tax Year",
    excerpt: "Key strategies and important dates to help you prepare for the upcoming tax year.",
    category: "Financial Insights",
    date: "February 1, 2025",
    readTime: "6 min read",
    image: "/blog-tax-year.jpg",
    slug: "how-to-prepare-for-new-tax-year",
  },
  {
    id: 4,
    title: "VAT Registration: When and How to Register",
    excerpt: "Understanding when your business needs to register for VAT and the steps to complete the process.",
    category: "Business Advice",
    date: "January 20, 2025",
    readTime: "7 min read",
    image: "/blog-vat.jpg",
    slug: "vat-registration-when-how-register",
  },
]

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-primary-foreground dark:text-primary">
            Blog & Resources
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Stay updated with the latest tax news, accounting tips, and financial insights to help you make informed
            decisions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={post.image || "/placeholder.svg?height=200&width=400"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Tag className="h-4 w-4 mr-1" />
                        <span>{post.category}</span>
                        <span className="mx-2">•</span>
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 text-primary-foreground dark:text-primary">
                        <Link
                          href={`/blog/posts/${post.slug}`}
                          className="hover:text-primary dark:hover:text-primary-light"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                      <Link
                        href={`/blog/posts/${post.slug}`}
                        className="text-primary hover:text-primary-dark dark:text-primary dark:hover:text-primary-light font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary-foreground dark:text-primary">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/blog/tax-updates"
                      className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                    >
                      Tax Updates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/accounting-tips"
                      className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                    >
                      Accounting Tips
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/financial-insights"
                      className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                    >
                      Financial Insights
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/business-advice"
                      className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                    >
                      Business Advice
                    </Link>
                  </li>
                </ul>
              </div>

              <Newsletter />

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary-foreground dark:text-primary">Recent Posts</h3>
                <ul className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <li
                      key={post.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                    >
                      <Link
                        href={`/blog/posts/${post.slug}`}
                        className="hover:text-primary dark:hover:text-primary-light"
                      >
                        <h4 className="font-medium text-primary-foreground dark:text-primary">{post.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

