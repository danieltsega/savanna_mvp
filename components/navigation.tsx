"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { motion, AnimatePresence } from "framer-motion"
import MobileDropdownItem from "@/components/mobile-dropdown-item"

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const services = [
    { href: "/services/self-assessment", label: "Self-Assessment Tax Returns" },
    { href: "/services/corporation-tax", label: "Corporation Tax & Limited Company" },
    { href: "/services/vat", label: "VAT Returns & Compliance" },
    { href: "/services/payroll", label: "Payroll Services" },
    { href: "/services/bookkeeping", label: "Bookkeeping & Financial Reporting" },
    { href: "/services/business-startup", label: "Business Start-Up & Advisory" },
  ]

  const blogCategories = [
    { href: "/blog/tax-updates", label: "Tax Updates" },
    { href: "/blog/accounting-tips", label: "Accounting Tips" },
    { href: "/blog/financial-insights", label: "Financial Insights" },
    { href: "/blog/business-advice", label: "Business Advice" },
  ]

  const navItems = [
    {
      href: "/services",
      label: "Services",
      hasDropdown: true,
      dropdownItems: services,
    },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    {
      href: "/blog",
      label: "Blog",
      hasDropdown: true,
      dropdownItems: blogCategories,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const toggleButton = document.querySelector('.menu-toggle');

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMenuOpen &&
        event.target !== toggleButton &&
        !toggleButton?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Close dropdown when route changes
  useEffect(() => {
    setActiveDropdown(null)
    setIsMenuOpen(false)
  }, [pathname])

  const handleMobileNavigation = () => {
    setIsMenuOpen(false)
  }

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <nav
      className={`bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image src="/GA-logo.svg" alt="Savanna Accountancy Logo" width={40} height={40} className="mr-2" />
            <span className="text-2xl font-bold text-primary-foreground dark:text-primary">Savanna Accountancy</span>
          </Link>
          <div className="hidden md:flex items-center space-x-1" ref={dropdownRef}>
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-primary-foreground dark:text-primary"
                    : "text-secondary hover:text-primary-foreground dark:text-gray-300 dark:hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>

                {item.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                      >
                        <div className="py-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <ThemeToggle />
            {isAuthenticated ? (
              <Button asChild variant="default" className="bg-primary text-white hover:bg-primary-dark">
                <Link href="/dashboard">Access Client Portal</Link>
              </Button>
            ) : (
              <Button asChild className="bg-primary text-white hover:bg-primary-dark">
                <Link href="/portal">Client Portal</Link>
              </Button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-toggle">
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" ref={mobileMenuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <MobileDropdownItem key={item.href} item={item} pathname={pathname} onNavigate={handleMobileNavigation} />
            ))}
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Access Client Portal
              </Link>
            ) : (
              <Link
                href="/signup"
                className="block px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Client Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

