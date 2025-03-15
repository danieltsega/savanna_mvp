import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, Tag, ArrowLeft, Facebook, Twitter, Linkedin } from "lucide-react"

// Mock data for blog posts
const blogPostsData = {
  "understanding-self-assessment-tax-returns": {
    title: "Understanding Self-Assessment Tax Returns",
    content: `
      <p>Self-assessment tax returns are a crucial part of the UK tax system, requiring individuals to calculate and report their own income and tax obligations to HMRC. This comprehensive guide will help you understand the process, deadlines, and best practices for completing your self-assessment tax return correctly and on time.</p>
      
      <h2>Who Needs to File a Self-Assessment Tax Return?</h2>
      
      <p>You'll typically need to file a self-assessment tax return if:</p>
      
      <ul>
        <li>You're self-employed as a 'sole trader' and earned more than £1,000</li>
        <li>You're a partner in a business partnership</li>
        <li>You have untaxed income, such as rental income or foreign income</li>
        <li>You have capital gains from selling assets like property or shares</li>
        <li>You need to claim tax relief on pension contributions or charitable donations</li>
        <li>You have income from dividends and need to pay tax at a higher rate</li>
      </ul>
      
      <h2>Key Deadlines to Remember</h2>
      
      <p>Missing deadlines can result in penalties, so it's important to be aware of these key dates:</p>
      
      <ul>
        <li><strong>5 April:</strong> End of the tax year</li>
        <li><strong>31 October:</strong> Deadline for paper tax returns</li>
        <li><strong>31 January:</strong> Deadline for online tax returns and paying the tax you owe</li>
      </ul>
      
      <h2>Tips for Completing Your Self-Assessment</h2>
      
      <p>Here are some best practices to make the process smoother:</p>
      
      <ol>
        <li><strong>Keep accurate records throughout the year</strong> - Maintain organized records of all income, expenses, and relevant receipts.</li>
        <li><strong>Register early</strong> - If you're filing for the first time, register with HMRC well in advance as the process can take several weeks.</li>
        <li><strong>Don't leave it until the last minute</strong> - Start gathering your information and completing your return well before the deadline.</li>
        <li><strong>Double-check all figures</strong> - Simple errors can lead to incorrect tax calculations or trigger HMRC inquiries.</li>
        <li><strong>Claim all eligible expenses and reliefs</strong> - Ensure you're not paying more tax than necessary by claiming all allowable expenses and tax reliefs.</li>
      </ol>
      
      <h2>How a Professional Accountant Can Help</h2>
      
      <p>While it's possible to complete your self-assessment yourself, working with a professional accountant offers several advantages:</p>
      
      <ul>
        <li>Ensuring all income is correctly reported and all eligible expenses are claimed</li>
        <li>Reducing the risk of errors and potential penalties</li>
        <li>Providing advice on tax planning strategies to minimize future tax liabilities</li>
        <li>Saving you time and reducing stress</li>
        <li>Handling any HMRC correspondence or inquiries on your behalf</li>
      </ul>
      
      <p>At Savanna Accountancy, we specialize in self-assessment tax returns for individuals and businesses. Our experienced team can guide you through the process, ensure compliance, and help you maximize your tax efficiency.</p>
    `,
    excerpt: "A comprehensive guide to completing your self-assessment tax return correctly and on time.",
    category: "Tax Updates",
    date: "March 1, 2025",
    readTime: "5 min read",
    image: "/blog-tax-return.jpg",
    author: "Geda Gemechu",
    authorRole: "Director, Savanna Accountancy",
    authorImage: "/author-image.jpg",
    relatedPosts: [
      "essential-bookkeeping-tips-small-businesses",
      "how-to-prepare-for-new-tax-year",
      "vat-registration-when-how-register",
    ],
  },
  "essential-bookkeeping-tips-small-businesses": {
    title: "Essential Bookkeeping Tips for Small Businesses",
    content: `
      <p>Effective bookkeeping is the backbone of financial success for any small business. It provides the foundation for making informed business decisions, preparing accurate tax returns, and maintaining compliance with regulatory requirements. This guide offers essential bookkeeping tips to help small business owners establish and maintain organized financial records.</p>
      
      <h2>Why Bookkeeping Matters for Small Businesses</h2>
      
      <p>Proper bookkeeping offers numerous benefits for small businesses:</p>
      
      <ul>
        <li>Provides clear visibility into your business's financial health</li>
        <li>Simplifies tax preparation and helps maximize deductions</li>
        <li>Facilitates easier access to financing when needed</li>
        <li>Helps identify and address financial issues before they become serious</li>
        <li>Enables better cash flow management</li>
      </ul>
      
      <h2>Essential Bookkeeping Tips</h2>
      
      <h3>1. Separate Business and Personal Finances</h3>
      
      <p>One of the most important steps in establishing proper bookkeeping is to separate your business and personal finances. Open a dedicated business bank account and obtain a business credit card for all business-related transactions. This separation makes tracking business expenses much simpler and provides a clear audit trail if needed.</p>
      
      <h3>2. Choose the Right Bookkeeping System</h3>
      
      <p>Select a bookkeeping system that suits your business needs. Options range from simple spreadsheets to cloud-based accounting software like QuickBooks, Xero, or FreeAgent. Cloud-based solutions offer advantages such as automatic backups, accessibility from anywhere, and integration with other business tools.</p>
      
      <h3>3. Track All Income and Expenses</h3>
      
      <p>Record all business transactions, no matter how small. Develop a system for capturing receipts and invoices immediately, whether through digital apps or a physical filing system. Categorize expenses properly to make tax preparation easier and to gain insights into spending patterns.</p>
      
      <h3>4. Reconcile Accounts Regularly</h3>
      
      <p>Regularly reconcile your bank statements with your bookkeeping records to catch any discrepancies or errors. Monthly reconciliation is ideal for most small businesses, but more frequent checks may be necessary for businesses with high transaction volumes.</p>
      
      <h3>5. Establish a Consistent Invoicing System</h3>
      
      <p>Create a systematic approach to invoicing clients or customers. Use numbered invoices, set clear payment terms, and follow up promptly on overdue payments. Consistent invoicing practices improve cash flow and reduce the time spent managing accounts receivable.</p>
      
      <h2>When to Consider Professional Help</h2>
      
      <p>While many small business owners handle basic bookkeeping themselves, there are times when professional assistance is valuable:</p>
      
      <ul>
        <li>When your business is growing and transactions become more complex</li>
        <li>If you're struggling to keep up with regular bookkeeping tasks</li>
        <li>When preparing for tax season</li>
        <li>If you're seeking financing and need professionally prepared financial statements</li>
        <li>When facing an audit or complex financial situation</li>
      </ul>
      
      <p>At Savanna Accountancy, we offer tailored bookkeeping services for small businesses at various stages of growth. Our team can help establish efficient bookkeeping systems, provide regular maintenance, or offer training to help you manage your own books more effectively.</p>
    `,
    excerpt: "Learn how proper bookkeeping can save you time, money, and stress as a small business owner.",
    category: "Accounting Tips",
    date: "February 15, 2025",
    readTime: "4 min read",
    image: "/blog-bookkeeping.jpg",
    author: "Geda Gemechu",
    authorRole: "Director, Savanna Accountancy",
    authorImage: "/author-image.jpg",
    relatedPosts: [
      "understanding-self-assessment-tax-returns",
      "how-to-prepare-for-new-tax-year",
      "vat-registration-when-how-register",
    ],
  },
  "how-to-prepare-for-new-tax-year": {
    title: "How to Prepare for the New Tax Year",
    content: `
      <p>The start of a new tax year is an important time for individuals and businesses to review their financial situation and implement strategies to optimize their tax position. This guide outlines key steps to help you prepare effectively for the new tax year.</p>
      
      <h2>Understanding the UK Tax Year</h2>
      
      <p>The UK tax year runs from 6 April to 5 April the following year. This timing is different from the calendar year and from many businesses' financial years, which can sometimes cause confusion. Being aware of this unique schedule is the first step in proper tax planning.</p>
      
      <h2>Key Preparation Steps for Individuals</h2>
      
      <h3>1. Review Your Tax Code</h3>
      
      <p>Your tax code determines how much income tax is deducted from your salary. Check that your tax code is correct for the new tax year, as errors can lead to paying too much or too little tax. You can find your tax code on your payslip, P60, or Personal Tax Account.</p>
      
      <h3>2. Maximize ISA Contributions</h3>
      
      <p>Individual Savings Accounts (ISAs) offer tax-free savings and investment opportunities. Consider using your annual ISA allowance before the end of the tax year and plan for contributions in the new tax year. Remember that unused allowances cannot be carried forward.</p>
      
      <h3>3. Review Pension Contributions</h3>
      
      <p>Pension contributions receive tax relief, making them an effective way to save for retirement while reducing your tax bill. Review your pension arrangements and consider whether you can increase contributions to take advantage of available tax relief.</p>
      
      <h3>4. Gather Documentation for Self-Assessment</h3>
      
      <p>If you complete a self-assessment tax return, start gathering the necessary documentation for the previous tax year. This includes records of income, expenses, investment gains or losses, and charitable donations.</p>
      
      <h2>Key Preparation Steps for Businesses</h2>
      
      <h3>1. Update Financial Records</h3>
      
      <p>Ensure your financial records are up-to-date and accurate. Reconcile bank accounts, review outstanding invoices, and verify that all expenses have been properly recorded. This preparation makes tax return completion much smoother.</p>
      
      <h3>2. Review Business Structure</h3>
      
      <p>The new tax year is a good time to review whether your current business structure (sole trader, partnership, limited company) remains optimal for your circumstances. Different structures have different tax implications, and changes in your business might warrant a structural adjustment.</p>
      
      <h3>3. Plan for Capital Expenditure</h3>
      
      <p>Consider the timing of major purchases. The Annual Investment Allowance (AIA) allows businesses to deduct the full value of qualifying plant and equipment up to a certain limit. Planning purchases around the tax year can optimize tax relief.</p>
      
      <h3>4. Review Employee Benefits</h3>
      
      <p>If you have employees, review the benefits you provide and their tax implications. Some benefits are more tax-efficient than others, and the new tax year might bring changes to benefit-related tax rules.</p>
      
      <h2>New Tax Year Changes to Be Aware Of</h2>
      
      <p>Each new tax year typically brings changes to tax rates, thresholds, and allowances. Stay informed about:</p>
      
      <ul>
        <li>Income tax bands and rates</li>
        <li>National Insurance contribution thresholds</li>
        <li>Dividend tax rates</li>
        <li>Capital Gains Tax allowances</li>
        <li>Pension annual allowance and lifetime allowance</li>
        <li>Changes to business tax rates and reliefs</li>
      </ul>
      
      <p>At Savanna Accountancy, we help individuals and businesses navigate the complexities of tax planning. Our team stays up-to-date with the latest tax legislation to provide timely advice and ensure you're well-prepared for each new tax year.</p>
    `,
    excerpt: "Key strategies and important dates to help you prepare for the upcoming tax year.",
    category: "Financial Insights",
    date: "February 1, 2025",
    readTime: "6 min read",
    image: "/blog-tax-year.jpg",
    author: "Geda Gemechu",
    authorRole: "Director, Savanna Accountancy",
    authorImage: "/author-image.jpg",
    relatedPosts: [
      "understanding-self-assessment-tax-returns",
      "essential-bookkeeping-tips-small-businesses",
      "vat-registration-when-how-register",
    ],
  },
  "vat-registration-when-how-register": {
    title: "VAT Registration: When and How to Register",
    content: `
      <p>Value Added Tax (VAT) is a significant consideration for growing businesses in the UK. Understanding when and how to register for VAT is essential for compliance and can have important implications for your business operations and finances. This guide explains the key aspects of VAT registration to help business owners make informed decisions.</p>
      
      <h2>When to Register for VAT</h2>
      
      <h3>Mandatory Registration</h3>
      
      <p>You must register for VAT when:</p>
      
      <ul>
        <li>Your VAT taxable turnover exceeds the current threshold (£85,000 as of 2023/24) in a rolling 12-month period</li>
        <li>You expect your VAT taxable turnover to exceed the threshold in the next 30 days alone</li>
        <li>You take over a VAT-registered business as a going concern</li>
        <li>You receive goods in the UK from the EU worth more than the current distance selling threshold</li>
      </ul>
      
      <p>It's important to monitor your turnover closely as there are penalties for late registration.</p>
      
      <h3>Voluntary Registration</h3>
      
      <p>Even if your turnover is below the threshold, you can choose to register for VAT voluntarily. This might be beneficial if:</p>
      
      <ul>
        <li>You regularly receive VAT refunds because you sell zero-rated goods or services</li>
        <li>You primarily sell to VAT-registered businesses who can reclaim the VAT</li>
        <li>You want to appear larger or more established to customers and suppliers</li>
        <li>You anticipate exceeding the threshold soon and want to prepare in advance</li>
      </ul>
      
      <h2>Advantages and Disadvantages of VAT Registration</h2>
      
      <h3>Advantages</h3>
      
      <ul>
        <li>Ability to reclaim VAT on business purchases and expenses</li>
        <li>Potential for improved cash flow through the Flat Rate Scheme</li>
        <li>Enhanced business credibility with customers and suppliers</li>
        <li>Better financial record-keeping practices</li>
      </ul>
      
      <h3>Disadvantages</h3>
      
      <ul>
        <li>Additional administrative burden of VAT returns and record-keeping</li>
        <li>Potential cash flow impact if you need to pay VAT before collecting it from customers</li>
        <li>Possible competitive disadvantage if your customers cannot reclaim VAT</li>
        <li>Need to adjust pricing strategies to accommodate VAT</li>
      </ul>
      
      <h2>How to Register for VAT</h2>
      
      <p>The VAT registration process involves several steps:</p>
      
      <ol>
        <li><strong>Determine your effective date of registration</strong> - This is usually the date your turnover exceeded the threshold or the date you expect it to.</li>
        <li><strong>Gather necessary information</strong> - Including business details, bank account information, and turnover figures.</li>
        <li><strong>Register online through HMRC's website</strong> - Most businesses can register online through the Government Gateway.</li>
        <li><strong>Choose a VAT scheme</strong> - Options include the Standard VAT Accounting, Flat Rate, Cash Accounting, or Annual Accounting schemes.</li>
        <li><strong>Set up systems for VAT compliance</strong> - Ensure your accounting systems can handle VAT calculations and reporting.</li>
      </ol>
      
      <h2>After Registration</h2>
      
      <p>Once registered, you'll need to:</p>
      
      <ul>
        <li>Charge VAT on your taxable goods and services</li>
        <li>Issue VAT invoices to customers</li>
        <li>Submit VAT returns, usually quarterly</li>
        <li>Pay any VAT due to HMRC</li>
        <li>Keep VAT records and a VAT account</li>
        <li>Comply with Making Tax Digital requirements if applicable</li>
      </ul>
      
      <p>At Savanna Accountancy, we provide comprehensive VAT services, including advice on registration, scheme selection, return preparation, and ongoing compliance. Our team can help you navigate the complexities of VAT and ensure your business meets all obligations while optimizing your VAT position.</p>
    `,
    excerpt: "Understanding when your business needs to register for VAT and the steps to complete the process.",
    category: "Business Advice",
    date: "January 20, 2025",
    readTime: "7 min read",
    image: "/blog-vat.jpg",
    author: "Geda Gemechu",
    authorRole: "Director, Savanna Accountancy",
    authorImage: "/author-image.jpg",
    relatedPosts: [
      "understanding-self-assessment-tax-returns",
      "essential-bookkeeping-tips-small-businesses",
      "how-to-prepare-for-new-tax-year",
    ],
  },
}

// Function to get related posts data
const getRelatedPosts = (relatedSlugs: string[]) => {
  return relatedSlugs.map((slug) => {
    const post = blogPostsData[slug as keyof typeof blogPostsData]
    return {
      title: post.title,
      excerpt: post.excerpt,
      slug,
      image: post.image,
      date: post.date,
    }
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = blogPostsData[slug as keyof typeof blogPostsData]

  // If post not found, show a simple message
  if (!post) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const relatedPosts = getRelatedPosts(post.relatedPosts)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary-dark mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={post.image || `/placeholder.svg?height=400&width=800&text=${post.title}`}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4 gap-3">
                    <span className="inline-flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      {post.category}
                    </span>
                    <span className="inline-flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary-foreground dark:text-primary">
                    {post.title}
                  </h1>

                  <div className="flex items-center mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={post.authorImage || "/placeholder.svg?height=48&width=48"}
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-primary-foreground dark:text-primary">{post.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{post.authorRole}</p>
                    </div>
                  </div>

                  <div
                    className="prose prose-blue max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-primary-foreground dark:text-primary">Share this article:</p>
                      <div className="flex space-x-3">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Facebook className="h-5 w-5" />
                          <span className="sr-only">Share on Facebook</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Twitter className="h-5 w-5" />
                          <span className="sr-only">Share on Twitter</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">Share on LinkedIn</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
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
                <h3 className="text-xl font-semibold mb-4 text-primary-foreground dark:text-primary">Related Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost, index) => (
                    <div
                      key={index}
                      className="flex gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={relatedPost.image || "/placeholder.svg?height=64&width=64"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="font-medium text-primary-foreground hover:text-primary dark:text-primary dark:hover:text-primary-light line-clamp-2"
                        >
                          {relatedPost.title}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{relatedPost.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

