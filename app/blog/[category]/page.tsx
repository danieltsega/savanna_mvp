import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, Clock, Tag, ArrowLeft } from "lucide-react"

// Mock data for blog posts
const allBlogPosts = [
  {
    id: 1,
    title: "Understanding Self-Assessment Tax Returns",
    excerpt: "A comprehensive guide to completing your self-assessment tax return correctly and on time.",
    category: "tax-updates",
    categoryName: "Tax Updates",
    date: "March 1, 2025",
    readTime: "5 min read",
    image: "/blog-tax-return.jpg",
    slug: "understanding-self-assessment-tax-returns",
  },
  {
    id: 2,
    title: "Essential Bookkeeping Tips for Small Businesses",
    excerpt: "Learn how proper bookkeeping can save you time, money, and stress as a small business owner.",
    category: "accounting-tips",
    categoryName: "Accounting Tips",
    date: "February 15, 2025",
    readTime: "4 min read",
    image: "/blog-bookkeeping.jpg",
    slug: "essential-bookkeeping-tips-small-businesses",
  },
  {
    id: 3,
    title: "How to Prepare for the New Tax Year",
    excerpt: "Key strategies and important dates to help you prepare for the upcoming tax year.",
    category: "financial-insights",
    categoryName: "Financial Insights",
    date: "February 1, 2025",
    readTime: "6 min read",
    image: "/blog-tax-year.jpg",
    slug: "how-to-prepare-for-new-tax-year",
  },
  {
    id: 4,
    title: "VAT Registration: When and How to Register",
    excerpt: "Understanding when your business needs to register for VAT and the steps to complete the process.",
    category: "business-advice",
    categoryName: "Business Advice",
    date: "January 20, 2025",
    readTime: "7 min read",
    image: "/blog-vat.jpg",
    slug: "vat-registration-when-how-register",
  },
  {
    id: 5,
    title: "Latest Tax Changes for the 2025/26 Tax Year",
    excerpt:
      "A summary of the most important tax changes that will affect individuals and businesses in the upcoming tax year.",
    category: "tax-updates",
    categoryName: "Tax Updates",
    date: "January 15, 2025",
    readTime: "5 min read",
    image: "/blog-tax-changes.jpg",
    slug: "latest-tax-changes-2025-26",
  },
  {
    id: 6,
    title: "Digital Record Keeping for Small Businesses",
    excerpt: "How to implement effective digital record keeping systems to streamline your business operations.",
    category: "accounting-tips",
    categoryName: "Accounting Tips",
    date: "January 10, 2025",
    readTime: "4 min read",
    image: "/blog-digital-records.jpg",
    slug: "digital-record-keeping-small-businesses",
  },
  {
    id: 7,
    title: "Investment Strategies for Business Owners",
    excerpt: "Smart investment approaches to help business owners grow their wealth and secure their financial future.",
    category: "financial-insights",
    categoryName: "Financial Insights",
    date: "January 5, 2025",
    readTime: "6 min read",
    image: "/blog-investment.jpg",
    slug: "investment-strategies-business-owners",
  },
  {
    id: 8,
    title: "Scaling Your Business: Financial Considerations",
    excerpt: "Key financial factors to consider when planning to scale your business operations.",
    category: "business-advice",
    categoryName: "Business Advice",
    date: "December 20, 2024",
    readTime: "7 min read",
    image: "/blog-scaling.jpg",
    slug: "scaling-business-financial-considerations",
  },
]

// Map of category slugs to display names
const categoryNames = {
  "tax-updates": "Tax Updates",
  "accounting-tips": "Accounting Tips",
  "financial-insights": "Financial Insights",
  "business-advice": "Business Advice",
}

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  // Filter posts by category
  const categoryPosts = allBlogPosts.filter((post) => post.category === category)

  // Get category display name
  const categoryDisplayName = categoryNames[category as keyof typeof categoryNames] || "Blog"

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary-dark mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Posts
          </Link>

          <h1 className="text-4xl font-bold text-center mb-4 text-primary-foreground dark:text-primary">
            {categoryDisplayName}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Browse our latest articles and insights on {categoryDisplayName.toLowerCase()}.
          </p>

          {categoryPosts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
              <p className="text-gray-600 dark:text-gray-400">
                There are currently no posts in this category. Please check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map((post) => (
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
                      <span>{post.categoryName}</span>
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
          )}

          <div className="mt-12">
            <Newsletter />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

