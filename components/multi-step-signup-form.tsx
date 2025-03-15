"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { PersonalInfoForm } from "./signup/personal-info-form"
import { ServicesForm } from "./signup/services-form"
import { CredentialsForm } from "./signup/credentials-form"

export function MultiStepSignupForm() {
    const [step, setStep] = useState(1)
    const [stepsCompleted, setStepsCompleted] = useState<Record<number, boolean>>({
        1: false,
        2: false,
        3: false,
    })
    const [formData, setFormData] = useState({
        // Personal Information
        first_name: "",
        last_name: "",
        sex: "Male", // Default to Male
        dob: "",
        current_address_line1: "",
        current_address_line2: "",
        current_city: "",
        current_zip: "",
        current_country: "United Kingdom", // Default to UK
        same_as_current: false,
        previous_address_line1: "",
        previous_address_line2: "",
        previous_city: "",
        previous_zip: "",
        previous_country: "United Kingdom", // Default to UK
        nino: "",
        utr: "",
        phone_number: "",
        email: "",
        whatsapp_number: "",
        same_as_phone: false,

        // Services
        service_type: "Self-Assessment Tax Returns", // Default service
        selected_tax_year: "", // Single tax year selection
        incomeSources: [] as any[],
        documents: [] as File[],
        other_service_details: "",

        // Credentials
        password: "",
        confirm_password: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const router = useRouter()
    const [passwordMatch, setPasswordMatch] = useState(true)

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirm_password || formData.confirm_password === "")
    }, [formData.password, formData.confirm_password])

    useEffect(() => {
        if (formData.same_as_current) {
            setFormData((prev) => ({
                ...prev,
                previous_address_line1: prev.current_address_line1,
                previous_address_line2: prev.current_address_line2,
                previous_city: prev.current_city,
                previous_zip: prev.current_zip,
                previous_country: prev.current_country,
            }))
        }
    }, [formData.same_as_current])

    useEffect(() => {
        if (formData.same_as_phone) {
            setFormData((prev) => ({
                ...prev,
                whatsapp_number: prev.phone_number,
            }))
        }
    }, [formData.same_as_phone, formData.phone_number])

    const clearErrorOnChange = (field: string, value: any) => {
        if (errors[field] && value) {
            // Clear the error if the field now has a value
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const updateFormData = (data: Partial<typeof formData>) => {
        // Clear errors for fields that now have values
        Object.entries(data).forEach(([key, value]) => {
            if (errors[key] && value) {
                clearErrorOnChange(key, value)
            }
        })

        setFormData((prev) => ({ ...prev, ...data }))
    }

    const validateStep = (currentStep: number) => {
        let isValid = true
        const newErrors: Record<string, string> = {}

        if (currentStep === 1) {
            // Validate Personal Information
            if (!formData.first_name) {
                newErrors.first_name = "First name is required"
                isValid = false
            }
            if (!formData.last_name) {
                newErrors.last_name = "Last name is required"
                isValid = false
            }
            if (!formData.dob) {
                newErrors.dob = "Date of birth is required"
                isValid = false
            }
            if (!formData.current_address_line1) {
                newErrors.current_address_line1 = "Address line 1 is required"
                isValid = false
            }
            if (!formData.current_city) {
                newErrors.current_city = "City is required"
                isValid = false
            }
            if (!formData.current_zip) {
                newErrors.current_zip = "Postcode is required"
                isValid = false
            }

            // Basic validation - just ensure fields are not empty
            if (!formData.nino) {
                newErrors.nino = "NINO is required"
                isValid = false
            }

            if (!formData.utr) {
                newErrors.utr = "UTR is required"
                isValid = false
            }

            if (!formData.phone_number) {
                newErrors.phone_number = "Phone number is required"
                isValid = false
            }

            // Email validation - keep this one as is since email format is universal
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!formData.email) {
                newErrors.email = "Email is required"
                isValid = false
            } else if (!emailRegex.test(formData.email)) {
                newErrors.email = "Invalid email format"
                isValid = false
            }

            // WhatsApp validation (if not same as phone)
            if (!formData.same_as_phone && !formData.whatsapp_number) {
                newErrors.whatsapp_number = "WhatsApp number is required"
                isValid = false
            }

            // Previous address validation (if not same as current)
            if (!formData.same_as_current) {
                if (!formData.previous_address_line1) {
                    newErrors.previous_address_line1 = "Previous address line 1 is required"
                    isValid = false
                }
                if (!formData.previous_city) {
                    newErrors.previous_city = "Previous city is required"
                    isValid = false
                }
                if (!formData.previous_zip) {
                    newErrors.previous_zip = "Previous postcode is required"
                    isValid = false
                }
            }
        } else if (currentStep === 2) {
            // Validate Services
            if (formData.service_type === "Self-Assessment Tax Returns" && !formData.selected_tax_year) {
                newErrors.selected_tax_year = "Please select a tax year"
                isValid = false
            }

            if (formData.service_type === "Other" && !formData.other_service_details) {
                newErrors.other_service_details = "Please provide details about the service you need"
                isValid = false
            }
        }

        setErrors(newErrors)

        // Update completed steps
        if (isValid) {
            setStepsCompleted((prev) => ({
                ...prev,
                [currentStep]: true,
            }))
        }

        return isValid
    }

    const goToStep = (stepNumber: number) => {
        // Check if we can go to this step
        if (stepNumber === 1) {
            // Always allow going to step 1
            setStep(1)
        } else if (stepNumber === 2 && stepsCompleted[1]) {
            // Can go to step 2 if step 1 is completed
            setStep(2)
        } else if (stepNumber === 3 && stepsCompleted[1] && stepsCompleted[2]) {
            // Can go to step 3 if steps 1 and 2 are completed
            setStep(3)
        } else {
            // Otherwise, validate the current step first
            if (validateStep(step)) {
                // If current step is valid, try to go to the requested step
                if (stepNumber === 2 && step === 1) {
                    setStep(2)
                } else if (stepNumber === 3 && step === 2) {
                    setStep(3)
                } else {
                    toast({
                        title: "Navigation Error",
                        description: "Please complete the previous steps first.",
                        variant: "destructive",
                    })
                }
            } else {
                toast({
                    title: "Validation Error",
                    description: "Please correct the errors before proceeding.",
                    variant: "destructive",
                })
            }
        }

        window.scrollTo(0, 0)
    }

    const nextStep = () => {
        if (validateStep(step)) {
            setStep((prev) => prev + 1)
            window.scrollTo(0, 0)
        } else {
            toast({
                title: "Validation Error",
                description: "Please correct the errors before proceeding.",
                variant: "destructive",
            })
        }
    }

    const prevStep = () => {
        setStep((prev) => prev - 1)
        window.scrollTo(0, 0)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Basic password validation - just check length and match
        if (formData.password.length < 8) {
            toast({
                title: "Password Error",
                description: "Password must be at least 8 characters long.",
                variant: "destructive",
            })
            return
        }

        if (!passwordMatch) {
            toast({
                title: "Error",
                description: "Passwords do not match.",
                variant: "destructive",
            })
            return
        }

        try {
            // Create FormData object for file uploads
            const submitData = new FormData()

            // Add all form fields to FormData
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "documents") {
                    // Skip documents here, we'll add them individually
                } else if (key === "incomeSources") {
                    submitData.append(key, JSON.stringify(value))
                } else {
                    submitData.append(key, value.toString())
                }
            })

            // Add each document file
            formData.documents.forEach((file) => {
                submitData.append("documents", file)
            })

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registration/`, {
                method: "POST",
                body: submitData,
            })

            if (response.ok) {
                router.push("/signup-success")
            } else {
                const errorData = await response.json()
                toast({
                    title: "Error",
                    description: errorData.detail || "An error occurred during signup.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("Signup error:", error)
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                    {[1, 2, 3].map((stepNumber) => (
                        <div key={stepNumber} className="flex flex-col items-center" onClick={() => goToStep(stepNumber)}>
                            <div
                                className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-3 cursor-pointer transition-colors",
                                    step === stepNumber
                                        ? "bg-primary"
                                        : step > stepNumber || stepsCompleted[stepNumber]
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500",
                                )}
                            >
                                {stepNumber}
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {stepNumber === 1 ? "Personal Info" : stepNumber === 2 ? "Services" : "Credentials"}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((step - 1) / 2) * 100}%` }}
                    ></div>
                </div>
            </div>

            <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()} className="space-y-8">
                {step === 1 && (
                    <PersonalInfoForm formData={formData} updateFormData={updateFormData} errors={errors} setErrors={setErrors} />
                )}

                {step === 2 && (
                    <ServicesForm formData={formData} updateFormData={updateFormData} errors={errors} setErrors={setErrors} />
                )}

                {step === 3 && (
                    <CredentialsForm
                        formData={formData}
                        updateFormData={updateFormData}
                        passwordMatch={passwordMatch}
                        errors={errors}
                        setErrors={setErrors}
                    />
                )}

                <div className="flex justify-between mt-10 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {step > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep} size="lg">
                            Previous
                        </Button>
                    )}

                    {step < 3 ? (
                        <Button type="button" className="ml-auto" onClick={nextStep} size="lg">
                            Next
                        </Button>
                    ) : (
                        <Button type="submit" className="ml-auto" size="lg">
                            Submit
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

