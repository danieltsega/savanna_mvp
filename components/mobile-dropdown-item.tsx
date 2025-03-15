"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const MobileDropdownItem = ({ item, pathname, onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const toggleDropdown = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="py-1" ref={dropdownRef}>
            <div className="flex items-center justify-between">
                <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.href || pathname.startsWith(`${item.href}/`)
                            ? "text-primary-foreground dark:text-primary"
                            : "text-secondary hover:text-primary-foreground dark:text-gray-300 dark:hover:text-white"
                        }`}
                    onClick={onNavigate}
                >
                    {item.label}
                </Link>
                {item.hasDropdown && (
                    <Button variant="ghost" size="sm" className="mr-2" onClick={toggleDropdown}>
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                )}
            </div>

            {item.hasDropdown && isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 mt-1 space-y-1"
                >
                    {item.dropdownItems.map((dropdownItem) => (
                        <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={onNavigate}
                        >
                            {dropdownItem.label}
                        </Link>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

export default MobileDropdownItem

