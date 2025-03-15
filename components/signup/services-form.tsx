"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, parse, isValid } from "date-fns"
import { CalendarIcon, Upload, X, Plus, Trash2, AlertCircle } from "lucide-react"

interface ServicesFormProps {
    formData: any
    updateFormData: (data: any) => void
    errors: Record<string, string>
    setErrors: (errors: Record<string, string>) => void
}

interface IncomeSource {
    id: string
    companyName: string
    jobTitle: string
    incomeType: string
    startDate: string
    startDateInput: string
    endDate: string
    endDateInput: string
}

const serviceOptions = [
    "Self-Assessment Tax Returns",
    "Corporation Tax & Limited Company Services",
    "VAT Returns & Compliance",
    "Payroll Services",
    "Bookkeeping & Financial Reporting",
    "Business Start-Up & Advisory Services",
    "Other",
]

const taxYears = ["2019/2020", "2020/2021", "2021/2022", "2022/2023", "2023/2024"]

const incomeTypes = ["Self-employed", "PAYE/Employed", "Dividends", "Property Income", "Not sure", "Other"]

export function ServicesForm({ formData, updateFormData, errors, setErrors }: ServicesFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [incomeSources, setIncomeSources] = useState<IncomeSource[]>(
        formData.incomeSources?.map((source: any) => ({
            ...source,
            startDateInput: source.startDate ? format(new Date(source.startDate), "dd/MM/yyyy") : "",
            endDateInput: source.endDate ? format(new Date(source.endDate), "dd/MM/yyyy") : "",
        })) || [],
    )

    const handleServiceChange = (value: string) => {
        updateFormData({ service_type: value })
    }

    const handleTaxYearChange = (year: string) => {
        updateFormData({ selected_tax_year: year })
        if (errors.selected_tax_year) {
            setErrors({ ...errors, selected_tax_year: "" })
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            updateFormData({
                documents: [...formData.documents, ...newFiles],
            })
        }
    }

    const removeFile = (index: number) => {
        const newFiles = [...formData.documents]
        newFiles.splice(index, 1)
        updateFormData({ documents: newFiles })
    }

    const addIncomeSource = () => {
        const newSource: IncomeSource = {
            id: Date.now().toString(),
            companyName: "",
            jobTitle: "",
            incomeType: "",
            startDate: "",
            startDateInput: "",
            endDate: "",
            endDateInput: "",
        }
        const updatedSources = [...incomeSources, newSource]
        setIncomeSources(updatedSources)
        updateFormData({ incomeSources: updatedSources })
    }

    const updateIncomeSource = (id: string, field: keyof IncomeSource, value: string) => {
        const updatedSources = incomeSources.map((source) => {
            if (source.id === id) {
                // Handle date input fields specially
                if (field === "startDateInput") {
                    try {
                        const formats = ["dd/MM/yyyy", "d/M/yyyy", "dd-MM-yyyy", "d-M-yyyy", "yyyy-MM-dd", "MM/dd/yyyy"]
                        let parsedDate = null

                        for (const formatStr of formats) {
                            const parsed = parse(value, formatStr, new Date())
                            if (isValid(parsed)) {
                                parsedDate = parsed
                                break
                            }
                        }

                        if (parsedDate) {
                            return {
                                ...source,
                                startDateInput: value,
                                startDate: format(parsedDate, "yyyy-MM-dd"),
                            }
                        } else {
                            return {
                                ...source,
                                startDateInput: value,
                                // Don't update startDate if we couldn't parse a valid date
                            }
                        }
                    } catch (error) {
                        return {
                            ...source,
                            startDateInput: value,
                        }
                    }
                } else if (field === "endDateInput") {
                    try {
                        const formats = ["dd/MM/yyyy", "d/M/yyyy", "dd-MM-yyyy", "d-M-yyyy", "yyyy-MM-dd", "MM/dd/yyyy"]
                        let parsedDate = null

                        for (const formatStr of formats) {
                            const parsed = parse(value, formatStr, new Date())
                            if (isValid(parsed)) {
                                parsedDate = parsed
                                break
                            }
                        }

                        if (parsedDate) {
                            return {
                                ...source,
                                endDateInput: value,
                                endDate: format(parsedDate, "yyyy-MM-dd"),
                            }
                        } else {
                            return {
                                ...source,
                                endDateInput: value,
                                // Don't update endDate if we couldn't parse a valid date
                            }
                        }
                    } catch (error) {
                        return {
                            ...source,
                            endDateInput: value,
                        }
                    }
                } else {
                    return { ...source, [field]: value }
                }
            }
            return source
        })

        setIncomeSources(updatedSources)
        updateFormData({ incomeSources: updatedSources })
    }

    const handleCalendarSelect = (id: string, field: "startDate" | "endDate", date: Date | undefined) => {
        if (!date) return

        const updatedSources = incomeSources.map((source) => {
            if (source.id === id) {
                if (field === "startDate") {
                    return {
                        ...source,
                        startDate: format(date, "yyyy-MM-dd"),
                        startDateInput: format(date, "dd/MM/yyyy"),
                    }
                } else {
                    return {
                        ...source,
                        endDate: format(date, "yyyy-MM-dd"),
                        endDateInput: format(date, "dd/MM/yyyy"),
                    }
                }
            }
            return source
        })

        setIncomeSources(updatedSources)
        updateFormData({ incomeSources: updatedSources })
    }

    const removeIncomeSource = (id: string) => {
        const updatedSources = incomeSources.filter((source) => source.id !== id)
        setIncomeSources(updatedSources)
        updateFormData({ incomeSources: updatedSources })
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-foreground dark:text-primary">Services</h2>

            {/* Service Selection */}
            <div>
                <Label>Select Service*</Label>
                <RadioGroup
                    value={formData.service_type}
                    onValueChange={handleServiceChange}
                    className="space-y-2 mt-2"
                    defaultValue="Self-Assessment Tax Returns"
                >
                    {serviceOptions.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                            <RadioGroupItem value={service} id={service.replace(/\s+/g, "-").toLowerCase()} />
                            <Label htmlFor={service.replace(/\s+/g, "-").toLowerCase()}>{service}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {/* Tax Years (only if Tax Returns is selected) */}
            {formData.service_type === "Self-Assessment Tax Returns" && (
                <div className="space-y-3">
                    <Label>Select Your Tax Year*</Label>
                    <RadioGroup
                        value={formData.selected_tax_year}
                        onValueChange={handleTaxYearChange}
                        className="grid grid-cols-2 md:grid-cols-3 gap-2"
                    >
                        {taxYears.map((year) => (
                            <div key={year} className="flex items-center space-x-2">
                                <RadioGroupItem value={year} id={`year-${year}`} />
                                <Label htmlFor={`year-${year}`}>{year}</Label>
                            </div>
                        ))}
                    </RadioGroup>

                    {errors.selected_tax_year && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" /> {errors.selected_tax_year}
                        </p>
                    )}

                    {/* Income Sources */}
                    {formData.selected_tax_year && (
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Your sources of income for {formData.selected_tax_year}</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addIncomeSource}
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="h-4 w-4" /> Add Item
                                </Button>
                            </div>

                            {incomeSources.length === 0 && (
                                <div className="text-center py-4 border border-dashed rounded-md">
                                    <p className="text-sm text-gray-500">
                                        No income sources added yet. Click "Add Item" to add your first income source.
                                    </p>
                                </div>
                            )}

                            {incomeSources.map((source, index) => (
                                <div key={source.id} className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-medium">Income Source #{index + 1}</h4>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeIncomeSource(source.id)}
                                            className="h-8 w-8 p-0"
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                        <div>
                                            <Label htmlFor={`company-${source.id}`} className="text-xs">
                                                Company Name
                                            </Label>
                                            <Input
                                                id={`company-${source.id}`}
                                                value={source.companyName}
                                                onChange={(e) => updateIncomeSource(source.id, "companyName", e.target.value)}
                                                placeholder="ABC Ltd"
                                                className="h-9"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`job-title-${source.id}`} className="text-xs">
                                                Job Title
                                            </Label>
                                            <Input
                                                id={`job-title-${source.id}`}
                                                value={source.jobTitle}
                                                onChange={(e) => updateIncomeSource(source.id, "jobTitle", e.target.value)}
                                                placeholder="Developer"
                                                className="h-9"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`income-type-${source.id}`} className="text-xs">
                                                Type of Income
                                            </Label>
                                            <Select
                                                value={source.incomeType}
                                                onValueChange={(value) => updateIncomeSource(source.id, "incomeType", value)}
                                            >
                                                <SelectTrigger id={`income-type-${source.id}`} className="h-9">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {incomeTypes.map((type) => (
                                                        <SelectItem key={`${source.id}-${type}`} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor={`start-date-${source.id}`} className="text-xs">
                                                Start Date
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id={`start-date-${source.id}`}
                                                    type="text"
                                                    placeholder="DD/MM/YYYY"
                                                    value={source.startDateInput}
                                                    onChange={(e) => updateIncomeSource(source.id, "startDateInput", e.target.value)}
                                                    className="h-9 pr-10"
                                                />
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-500"
                                                        >
                                                            <CalendarIcon className="h-4 w-4" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="end">
                                                        <Calendar
                                                            mode="single"
                                                            selected={source.startDate ? new Date(source.startDate) : undefined}
                                                            onSelect={(date) => handleCalendarSelect(source.id, "startDate", date)}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor={`end-date-${source.id}`} className="text-xs">
                                                End Date
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id={`end-date-${source.id}`}
                                                    type="text"
                                                    placeholder="DD/MM/YYYY"
                                                    value={source.endDateInput}
                                                    onChange={(e) => updateIncomeSource(source.id, "endDateInput", e.target.value)}
                                                    className="h-9 pr-10"
                                                />
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-500"
                                                        >
                                                            <CalendarIcon className="h-4 w-4" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="end">
                                                        <Calendar
                                                            mode="single"
                                                            selected={source.endDate ? new Date(source.endDate) : undefined}
                                                            onSelect={(date) => handleCalendarSelect(source.id, "endDate", date)}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Document Upload */}
            <div className="space-y-3">
                <Label>
                    {formData.service_type === "Self-Assessment Tax Returns"
                        ? formData.selected_tax_year
                            ? `Please attach documents for tax year ${formData.selected_tax_year}`
                            : "Please select a tax year first"
                        : "Please attach any relevant documents"}
                </Label>

                <div
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, XLS, XLSX, JPG, PNG</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    />
                </div>

                {/* File List */}
                {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <Label>
                            Uploaded Documents for{" "}
                            {formData.service_type === "Self-Assessment Tax Returns" ? formData.selected_tax_year : "this service"}
                        </Label>
                        <div className="space-y-2">
                            {formData.documents.map((file: File, index: number) => (
                                <div key={index} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <span className="text-sm truncate">{file.name}</span>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Other Service Information */}
            {formData.service_type === "Other" && (
                <div>
                    <Label htmlFor="other_service_details">Please provide details about the service you need</Label>
                    <Textarea
                        id="other_service_details"
                        value={formData.other_service_details || ""}
                        onChange={(e) => {
                            const value = e.target.value
                            updateFormData({ other_service_details: value })
                            if (value && errors.other_service_details) {
                                setErrors({ ...errors, other_service_details: "" })
                            }
                        }}
                        className="mt-2"
                        rows={4}
                        placeholder="Please describe the service you're looking for in detail..."
                    />
                    {errors.other_service_details && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" /> {errors.other_service_details}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

