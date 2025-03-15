"use client"

import { format } from "date-fns"
import { FileText, User, Briefcase, Key } from "lucide-react"

interface ReviewFormProps {
    formData: any
}

export function ReviewForm({ formData }: ReviewFormProps) {
    // Format date if it exists
    const formatDate = (dateString: string) => {
        if (!dateString) return "Not provided"
        try {
            return format(new Date(dateString), "dd MMMM yyyy")
        } catch (error) {
            return dateString
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-primary-foreground dark:text-primary">Review Your Information</h2>
            <p className="text-sm text-gray-500">
                Please review all the information you've provided before submitting your application.
            </p>

            {/* Personal Information Section */}
            <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Personal Information</h3>
                </div>
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Full Name</p>
                            <p>
                                {formData.first_name} {formData.last_name}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Sex</p>
                            <p>{formData.sex}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                            <p>{formatDate(formData.dob)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p>{formData.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Phone Number</p>
                            <p>{formData.phone_number}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">WhatsApp Number</p>
                            <p>{formData.same_as_phone ? "Same as phone number" : formData.whatsapp_number}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <p className="text-sm font-medium text-gray-500 mb-2">Current Address</p>
                        <p>{formData.current_address_line1}</p>
                        {formData.current_address_line2 && <p>{formData.current_address_line2}</p>}
                        <p>
                            {formData.current_city}, {formData.current_zip}
                        </p>
                        <p>{formData.current_country}</p>
                    </div>

                    <div className="pt-4 border-t">
                        <p className="text-sm font-medium text-gray-500 mb-2">Previous Address</p>
                        {formData.same_as_current ? (
                            <p>Same as current address</p>
                        ) : (
                            <>
                                <p>{formData.previous_address_line1}</p>
                                {formData.previous_address_line2 && <p>{formData.previous_address_line2}</p>}
                                <p>
                                    {formData.previous_city}, {formData.previous_zip}
                                </p>
                                <p>{formData.previous_country}</p>
                            </>
                        )}
                    </div>

                    <div className="pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">NINO</p>
                            <p>{formData.nino}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">UTR</p>
                            <p>{formData.utr}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Services</h3>
                </div>
                <div className="p-4 space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Service Type</p>
                        <p>{formData.service_type}</p>
                    </div>

                    {formData.service_type === "Self-Assessment Tax Returns" && (
                        <div>
                            <p className="text-sm font-medium text-gray-500">Tax Year</p>
                            <p>{formData.selected_tax_year || "Not selected"}</p>
                        </div>
                    )}

                    {formData.service_type === "Other" && (
                        <div>
                            <p className="text-sm font-medium text-gray-500">Service Details</p>
                            <p>{formData.other_service_details || "Not provided"}</p>
                        </div>
                    )}

                    {/* Income Sources */}
                    {formData.incomeSources && formData.incomeSources.length > 0 && (
                        <div className="pt-4 border-t">
                            <p className="text-sm font-medium text-gray-500 mb-2">Income Sources</p>
                            <div className="space-y-3">
                                {formData.incomeSources.map((source: any, index: number) => (
                                    <div key={source.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                                        <div className="flex justify-between">
                                            <p className="font-medium">{source.companyName || "Unnamed Source"}</p>
                                            <p className="text-sm text-gray-500">Source #{index + 1}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                            <div>
                                                <span className="text-gray-500">Job Title:</span> {source.jobTitle || "Not provided"}
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Income Type:</span> {source.incomeType || "Not specified"}
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Start Date:</span>{" "}
                                                {source.startDate ? formatDate(source.startDate) : "Not provided"}
                                            </div>
                                            <div>
                                                <span className="text-gray-500">End Date:</span>{" "}
                                                {source.endDate ? formatDate(source.endDate) : "Not provided"}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Documents */}
                    {formData.documents && formData.documents.length > 0 && (
                        <div className="pt-4 border-t">
                            <p className="text-sm font-medium text-gray-500 mb-2">Uploaded Documents</p>
                            <div className="space-y-2">
                                {formData.documents.map((file: File, index: number) => (
                                    <div key={index} className="flex items-center">
                                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                        <p className="text-sm">{file.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Credentials Section */}
            <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex items-center">
                    <Key className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Account Credentials</h3>
                </div>
                <div className="p-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Email (Username)</p>
                        <p>{formData.email}</p>
                    </div>
                    <div className="mt-2">
                        <p className="text-sm font-medium text-gray-500">Password</p>
                        <p>••••••••••••</p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                    Please review all information carefully. Once submitted, you'll need to contact support to make changes.
                </p>
            </div>
        </div>
    )
}

