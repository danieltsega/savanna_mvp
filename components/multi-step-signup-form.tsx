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
import { ReviewForm } from "./signup/review-form"

export function MultiStepSignupForm() {
    const [step, setStep] = useState(1)
    const [stepsCompleted, setStepsCompleted] = useState<Record<number, boolean>>({
        1: false,
        2: false,
        3: false,
        4: false,
    })
    const [formData, setFormData] = useState({
        // Personal Information
        first_name: "",
        last_name: "",
        sex: "M", // Default to Male
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
    const [isSubmitting, setIsSubmitting] = useState(false)

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
        } else if (currentStep === 3) {
            // Validate Credentials
            if (!formData.password) {
                newErrors.password = "Password is required"
                isValid = false
            } else if (formData.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters long"
                isValid = false
            } else if (!/[A-Z]/.test(formData.password)) {
                newErrors.password = "Password must include at least one uppercase letter"
                isValid = false
            } else if (!/[0-9]/.test(formData.password)) {
                newErrors.password = "Password must include at least one number"
                isValid = false
            } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
                newErrors.password = "Password must include at least one special character"
                isValid = false
            }

            if (!formData.confirm_password) {
                newErrors.confirm_password = "Please confirm your password"
                isValid = false
            } else if (formData.password !== formData.confirm_password) {
                newErrors.confirm_password = "Passwords do not match"
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
        } else if (stepNumber === 4 && stepsCompleted[1] && stepsCompleted[2] && stepsCompleted[3]) {
            // Can go to step 4 if steps 1, 2, and 3 are completed
            setStep(4)
        } else {
            // Otherwise, validate the current step first
            if (validateStep(step)) {
                // If current step is valid, try to go to the requested step
                if (stepNumber === 2 && step === 1) {
                    setStep(2)
                } else if (stepNumber === 3 && step === 2) {
                    setStep(3)
                } else if (stepNumber === 4 && step === 3) {
                    setStep(4)
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

    // Modify the handleSubmit function to better handle errors and display them to the user
    // Modify the handleSubmit function to simulate a successful registration for client demo
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isSubmitting) return
        setIsSubmitting(true)

        try {
            // DEMO MODE: Simulate API processing time
            console.log("DEMO MODE: Simulating registration process...")
            console.log("Form data that would be submitted:", formData)

            // Simulate a delay to show loading state
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Store dummy tokens in localStorage for demo purposes
            localStorage.setItem("accessToken", "demo-access-token-12345")
            localStorage.setItem("userId", "demo-user-id-12345")

            // Redirect to success page with verification flag set to false
            router.push("/signup-success?verification=false")
        } catch (error: any) {
            console.error("Signup error:", error)
            toast({
                title: "Registration Error",
                description: error.message || "An unexpected error occurred. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    /* ORIGINAL IMPLEMENTATION - UNCOMMENT TO RESTORE
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
  
      if (isSubmitting) return
      setIsSubmitting(true)
  
      try {
        // Step 1: Register the user
        const registrationData = {
          email: formData.email,
          password1: formData.password,
          password2: formData.confirm_password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          sex: formData.sex === "Male" ? "M" : "F", // Only send M or F, no O option
          dob: formData.dob,
          current_address_line1: formData.current_address_line1,
          current_address_line2: formData.current_address_line2,
          current_city: formData.current_city,
          current_zip: formData.current_zip,
          current_country: formData.current_country,
          previous_address_line1: formData.previous_address_line1,
          previous_address_line2: formData.previous_address_line2,
          previous_city: formData.previous_city,
          previous_zip: formData.previous_zip,
          previous_country: formData.previous_country,
          same_as_current: formData.same_as_current,
          phone_number: formData.phone_number,
          whatsapp_number: formData.whatsapp_number,
          same_as_phone: formData.same_as_phone,
          nino: formData.nino,
          utr: formData.utr,
        }
  
        console.log("Registering user with data:", registrationData)
        const registrationResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registration/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        })
  
        const registrationResult = await registrationResponse.json()
        console.log("Registration response:", registrationResult)
  
        if (!registrationResponse.ok) {
          // Handle specific error messages from the backend
          if (registrationResult.sex) {
            throw new Error(`Sex field error: ${registrationResult.sex[0]}`)
          } else if (registrationResult.detail) {
            throw new Error(registrationResult.detail)
          } else {
            // Format other errors if they exist
            const errorMessages = Object.entries(registrationResult)
              .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
              .join("; ")
            throw new Error(errorMessages || "Registration failed")
          }
        }
  
        // Check if email verification is enabled
        if (
          registrationResult.detail &&
          typeof registrationResult.detail === "string" &&
          registrationResult.detail.includes("Verification email sent")
        ) {
          // Email verification is enabled, redirect to success page with verification flag
          router.push("/signup-success?verification=true")
          return
        }
  
        // Email verification is disabled, we have tokens and user data
        const { access, user } = registrationResult
  
        // Step 2: Login is not needed as registration already returns tokens when verification is disabled
  
        // Step 3: Create service if service type is selected
        if (formData.service_type) {
          const serviceData = {
            service_type: mapServiceTypeToAPI(formData.service_type),
            tax_year: formData.selected_tax_year || null,
            other_service_details: formData.other_service_details || null,
            documents: [], // We'll add document IDs after uploading
          }
  
          console.log("Creating service with data:", serviceData)
          const serviceResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/services/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify(serviceData),
          })
  
          if (!serviceResponse.ok) {
            console.error("Failed to create service:", await serviceResponse.text())
            throw new Error("Failed to create service")
          }
  
          const serviceResult = await serviceResponse.json()
          console.log("Service created:", serviceResult)
  
          // Upload documents if any
          const documentIds = []
  
          if (formData.documents && formData.documents.length > 0) {
            for (const file of formData.documents) {
              const documentFormData = new FormData()
              documentFormData.append("file", file)
              documentFormData.append("description", `Document for ${formData.service_type}`)
  
              console.log("Uploading document:", file.name)
              const documentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/documents/`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${access}`,
                },
                body: documentFormData,
              })
  
              if (!documentResponse.ok) {
                console.error("Failed to upload document:", await documentResponse.text())
                continue
              }
  
              const documentResult = await documentResponse.json()
              console.log("Document uploaded:", documentResult)
              documentIds.push(documentResult.id)
            }
  
            // Update service with document IDs if we have any
            if (documentIds.length > 0) {
              console.log("Updating service with document IDs:", documentIds)
              const updateResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/services/services/${serviceResult.id}/`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access}`,
                  },
                  body: JSON.stringify({ documents: documentIds }),
                },
              )
  
              if (!updateResponse.ok) {
                console.error("Failed to update service with documents:", await updateResponse.text())
              } else {
                console.log("Service updated with documents")
              }
            }
          }
  
          // Create income sources if any
          if (formData.incomeSources && formData.incomeSources.length > 0) {
            for (const source of formData.incomeSources) {
              // Skip if no company name or income type
              if (!source.companyName || !source.incomeType) {
                console.log("Skipping income source due to missing required fields:", source)
                continue
              }
  
              const incomeSourceData = {
                service: serviceResult.id,
                company_name: source.companyName,
                job_title: source.jobTitle || "",
                income_type: mapIncomeTypeToAPI(source.incomeType),
                start_date: source.startDate || null,
                end_date: source.endDate || null,
              }
  
              console.log("Creating income source:", incomeSourceData)
              const incomeSourceResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/services/income-sources/`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access}`,
                  },
                  body: JSON.stringify(incomeSourceData),
                },
              )
  
              if (!incomeSourceResponse.ok) {
                console.error("Failed to create income source:", await incomeSourceResponse.text())
              } else {
                console.log("Income source created")
              }
            }
          }
        }
  
        // Store tokens in localStorage for future use
        localStorage.setItem("accessToken", access)
        if (user && user.id) {
          localStorage.setItem("userId", user.id.toString())
        }
  
        // Redirect to success page with verification flag set to false
        router.push("/signup-success?verification=false")
      } catch (error: any) {
        console.error("Signup error:", error)
        toast({
          title: "Registration Error",
          description: error.message || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
        setIsSubmitting(false)
      }
    }
    */

    // Helper function to map service types to API values
    const mapServiceTypeToAPI = (serviceType: string): string => {
        const mapping: Record<string, string> = {
            "Self-Assessment Tax Returns": "self_assessment",
            "Corporation Tax & Limited Company Services": "corporation_tax",
            "VAT Returns & Compliance": "vat_returns",
            "Payroll Services": "payroll",
            "Bookkeeping & Financial Reporting": "bookkeeping",
            "Business Start-Up & Advisory Services": "business_advisory",
            Other: "other",
        }

        return mapping[serviceType] || "other"
    }

    // Helper function to map income types to API values
    const mapIncomeTypeToAPI = (incomeType: string): string => {
        const mapping: Record<string, string> = {
            "Self-employed": "self_employed",
            "PAYE/Employed": "employed",
            Dividends: "dividends",
            "Property Income": "property",
            "Not sure": "not_sure",
            Other: "other",
        }

        return mapping[incomeType] || "other"
    }

    return (
        <div className="w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                    {[1, 2, 3, 4].map((stepNumber) => (
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
                                {stepNumber === 1
                                    ? "Personal Info"
                                    : stepNumber === 2
                                        ? "Services"
                                        : stepNumber === 3
                                            ? "Credentials"
                                            : "Review"}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((step - 1) / 3) * 100}%` }}
                    ></div>
                </div>
            </div>

            <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()} className="space-y-8">
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

                {step === 4 && <ReviewForm formData={formData} />}

                <div className="flex justify-between mt-10 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {step > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep} size="lg">
                            Previous
                        </Button>
                    )}

                    {step < 4 ? (
                        <Button type="button" className="ml-auto" onClick={nextStep} size="lg">
                            Next
                        </Button>
                    ) : (
                        <Button type="submit" className="ml-auto" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    )}
                </div>

                {/* Add login link for existing users */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <a href="/login" className="text-primary hover:underline font-medium">
                            Log in here
                        </a>
                    </p>
                </div>

                {isSubmitting && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        <p className="text-blue-700 dark:text-blue-400">Processing your registration. Please wait...</p>
                    </div>
                )}
            </form>
        </div>
    )
}

