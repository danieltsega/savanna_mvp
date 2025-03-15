"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, parse, isValid } from "date-fns"
import { CalendarIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface PersonalInfoFormProps {
    formData: any
    updateFormData: (data: any) => void
    errors: Record<string, string>
    setErrors: (errors: Record<string, string>) => void
}

const countries = [
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Japan",
    "China",
    "India",
    "Brazil",
    "South Africa",
    "Nigeria",
    "Kenya",
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Armenia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "Gabon",
    "Gambia",
    "Georgia",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Ivory Coast",
    "Jamaica",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Korea",
    "South Sudan",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
]

export function PersonalInfoForm({ formData, updateFormData, errors, setErrors }: PersonalInfoFormProps) {
    const [date, setDate] = useState<Date | undefined>(formData.dob ? new Date(formData.dob) : undefined)
    const [dateInputValue, setDateInputValue] = useState(formData.dob ? format(new Date(formData.dob), "dd/MM/yyyy") : "")
    const [currentCountrySearch, setCurrentCountrySearch] = useState("")
    const [previousCountrySearch, setPreviousCountrySearch] = useState("")
    const currentSearchRef = useRef<HTMLInputElement>(null)
    const previousSearchRef = useRef<HTMLInputElement>(null)

    // Set default values on initial render
    useEffect(() => {
        if (!formData.sex) {
            updateFormData({ sex: "Male" })
        }
        if (!formData.current_country) {
            updateFormData({ current_country: "United Kingdom" })
        }
        if (!formData.previous_country) {
            updateFormData({ previous_country: "United Kingdom" })
        }
    }, [])

    const handleDateSelect = (date: Date | undefined) => {
        setDate(date)
        if (date) {
            const formattedDate = format(date, "dd/MM/yyyy")
            setDateInputValue(formattedDate)
            updateFormData({ dob: format(date, "yyyy-MM-dd") })
        }
    }

    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setDateInputValue(value)

        // Try to parse the date
        try {
            const formats = ["dd/MM/yyyy", "d/M/yyyy", "dd-MM-yyyy", "d-M-yyyy", "yyyy-MM-dd", "MM/dd/yyyy"]

            for (const formatStr of formats) {
                const parsedDate = parse(value, formatStr, new Date())
                if (isValid(parsedDate)) {
                    setDate(parsedDate)
                    updateFormData({ dob: format(parsedDate, "yyyy-MM-dd") })
                    return
                }
            }

            // If we get here, no valid date was parsed
            if (value === "") {
                setDate(undefined)
                updateFormData({ dob: "" })
            }
        } catch (error) {
            // Just update the input value but don't set the date
        }
    }

    const validateNINO = (value: string) => {
        if (!value) {
            setErrors({ ...errors, nino: "NINO is required" })
            return false
        }

        // Less strict validation - just ensure it's not empty
        setErrors({ ...errors, nino: "" })
        return true
    }

    const validateUTR = (value: string) => {
        if (!value) {
            setErrors({ ...errors, utr: "UTR is required" })
            return false
        }

        // Less strict validation - just ensure it's not empty
        setErrors({ ...errors, utr: "" })
        return true
    }

    const validatePhoneNumber = (value: string) => {
        if (!value) {
            setErrors({ ...errors, phone_number: "Phone number is required" })
            return false
        }

        // Less strict validation - just ensure it's not empty
        setErrors({ ...errors, phone_number: "" })
        return true
    }

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!value) {
            setErrors({ ...errors, email: "Email is required" })
            return false
        }

        if (!emailRegex.test(value)) {
            setErrors({ ...errors, email: "Invalid email format" })
            return false
        }

        setErrors({ ...errors, email: "" })
        return true
    }

    const filteredCurrentCountries = countries.filter((country) =>
        country.toLowerCase().includes(currentCountrySearch.toLowerCase()),
    )

    const filteredPreviousCountries = countries.filter((country) =>
        country.toLowerCase().includes(previousCountrySearch.toLowerCase()),
    )

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-foreground dark:text-primary">Personal Information</h2>

            {/* Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="first_name">First Name*</Label>
                    <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => {
                            const value = e.target.value
                            updateFormData({ first_name: value })
                            if (value && errors.first_name) {
                                setErrors({ ...errors, first_name: "" })
                            }
                        }}
                        placeholder="John"
                        required
                    />
                    {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" /> {errors.first_name}
                        </p>
                    )}
                </div>
                <div>
                    <Label htmlFor="last_name">Last Name*</Label>
                    <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => {
                            const value = e.target.value
                            updateFormData({ last_name: value })
                            if (value && errors.last_name) {
                                setErrors({ ...errors, last_name: "" })
                            }
                        }}
                        placeholder="Smith"
                        required
                    />
                    {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" /> {errors.last_name}
                        </p>
                    )}
                </div>
            </div>

            {/* Sex */}
            <div>
                <Label>Sex*</Label>
                <RadioGroup
                    value={formData.sex}
                    onValueChange={(value) => updateFormData({ sex: value })}
                    className="flex space-x-4"
                    required
                    defaultValue="Male"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                    </div>
                </RadioGroup>
            </div>

            {/* Date of Birth */}
            <div>
                <Label>Date of Birth*</Label>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={dateInputValue}
                        onChange={(e) => {
                            const value = e.target.value
                            setDateInputValue(value)

                            // Try to parse the date
                            try {
                                const formats = ["dd/MM/yyyy", "d/M/yyyy", "dd-MM-yyyy", "d-M-yyyy", "yyyy-MM-dd", "MM/dd/yyyy"]

                                for (const formatStr of formats) {
                                    const parsedDate = parse(value, formatStr, new Date())
                                    if (isValid(parsedDate)) {
                                        setDate(parsedDate)
                                        updateFormData({ dob: format(parsedDate, "yyyy-MM-dd") })
                                        if (errors.dob) {
                                            setErrors({ ...errors, dob: "" })
                                        }
                                        return
                                    }
                                }

                                // If we get here, no valid date was parsed
                                if (value === "") {
                                    setDate(undefined)
                                    updateFormData({ dob: "" })
                                }
                            } catch (error) {
                                // Just update the input value but don't set the date
                            }
                        }}
                        className="pr-10"
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
                                selected={date}
                                onSelect={handleDateSelect}
                                initialFocus
                                captionLayout="dropdown-buttons"
                                fromYear={1940}
                                toYear={2023}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                {errors.dob && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> {errors.dob}
                    </p>
                )}
            </div>

            {/* Current Address */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Address*</h3>
                <div>
                    <Label htmlFor="current_address_line1">Address Line 1</Label>
                    <Input
                        id="current_address_line1"
                        value={formData.current_address_line1}
                        onChange={(e) => {
                            const value = e.target.value
                            updateFormData({ current_address_line1: value })
                            if (value && errors.current_address_line1) {
                                setErrors({ ...errors, current_address_line1: "" })
                            }
                        }}
                        placeholder="123 High Street"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="current_address_line2">Address Line 2</Label>
                    <Input
                        id="current_address_line2"
                        value={formData.current_address_line2}
                        onChange={(e) => updateFormData({ current_address_line2: e.target.value })}
                        placeholder="Flat 4B (optional)"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="current_city">City</Label>
                        <Input
                            id="current_city"
                            value={formData.current_city}
                            onChange={(e) => {
                                const value = e.target.value
                                updateFormData({ current_city: value })
                                if (value && errors.current_city) {
                                    setErrors({ ...errors, current_city: "" })
                                }
                            }}
                            placeholder="London"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="current_zip">Postcode</Label>
                        <Input
                            id="current_zip"
                            value={formData.current_zip}
                            onChange={(e) => {
                                const value = e.target.value
                                updateFormData({ current_zip: value })
                                if (value && errors.current_zip) {
                                    setErrors({ ...errors, current_zip: "" })
                                }
                            }}
                            placeholder="SW1A 1AA"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="current_country">Country</Label>
                        <Select
                            value={formData.current_country}
                            onValueChange={(value) => updateFormData({ current_country: value })}
                            defaultValue="United Kingdom"
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                <div className="mb-2 px-2">
                                    <Input
                                        placeholder="Search countries..."
                                        className="h-8"
                                        value={currentCountrySearch}
                                        onChange={(e) => setCurrentCountrySearch(e.target.value)}
                                        ref={currentSearchRef}
                                    />
                                </div>
                                <div className="max-h-[200px] overflow-y-auto">
                                    {filteredCurrentCountries.map((country) => (
                                        <SelectItem key={country} value={country}>
                                            {country}
                                        </SelectItem>
                                    ))}
                                </div>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Previous Address */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Previous Address*</h3>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="same_as_current"
                            checked={formData.same_as_current}
                            onCheckedChange={(checked) => {
                                updateFormData({ same_as_current: checked })
                            }}
                            className="bg-gray-300 dark:bg-gray-600 data-[state=checked]:bg-primary"
                        />
                        <Label htmlFor="same_as_current" className="font-medium text-gray-700 dark:text-gray-300">
                            Same as current address
                        </Label>
                    </div>
                </div>

                {/* Always show the fields, but disable them if same_as_current is checked */}
                <div>
                    <Label htmlFor="previous_address_line1">Address Line 1</Label>
                    <Input
                        id="previous_address_line1"
                        value={formData.previous_address_line1}
                        onChange={(e) => {
                            const value = e.target.value
                            updateFormData({ previous_address_line1: value })
                            if (value && errors.previous_address_line1) {
                                setErrors({ ...errors, previous_address_line1: "" })
                            }
                        }}
                        disabled={formData.same_as_current}
                        className={formData.same_as_current ? "bg-gray-100 dark:bg-gray-700" : ""}
                        placeholder="456 Main Road"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="previous_address_line2">Address Line 2</Label>
                    <Input
                        id="previous_address_line2"
                        value={formData.previous_address_line2}
                        onChange={(e) => updateFormData({ previous_address_line2: e.target.value })}
                        disabled={formData.same_as_current}
                        className={formData.same_as_current ? "bg-gray-100 dark:bg-gray-700" : ""}
                        placeholder="Apartment 2C (optional)"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="previous_city">City</Label>
                        <Input
                            id="previous_city"
                            value={formData.previous_city}
                            onChange={(e) => {
                                const value = e.target.value
                                updateFormData({ previous_city: value })
                                if (value && errors.previous_city) {
                                    setErrors({ ...errors, previous_city: "" })
                                }
                            }}
                            disabled={formData.same_as_current}
                            className={formData.same_as_current ? "bg-gray-100 dark:bg-gray-700" : ""}
                            placeholder="Manchester"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="previous_zip">Postcode</Label>
                        <Input
                            id="previous_zip"
                            value={formData.previous_zip}
                            onChange={(e) => {
                                const value = e.target.value
                                updateFormData({ previous_zip: value })
                                if (value && errors.previous_zip) {
                                    setErrors({ ...errors, previous_zip: "" })
                                }
                            }}
                            disabled={formData.same_as_current}
                            className={formData.same_as_current ? "bg-gray-100 dark:bg-gray-700" : ""}
                            placeholder="M1 1AA"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="previous_country">Country</Label>
                        <Select
                            value={formData.previous_country}
                            onValueChange={(value) => updateFormData({ previous_country: value })}
                            disabled={formData.same_as_current}
                            defaultValue="United Kingdom"
                        >
                            <SelectTrigger className={formData.same_as_current ? "bg-gray-100 dark:bg-gray-700" : ""}>
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                <div className="mb-2 px-2">
                                    <Input
                                        placeholder="Search countries..."
                                        className="h-8"
                                        value={previousCountrySearch}
                                        onChange={(e) => setPreviousCountrySearch(e.target.value)}
                                        ref={previousSearchRef}
                                        disabled={formData.same_as_current}
                                    />
                                </div>
                                <div className="max-h-[200px] overflow-y-auto">
                                    {filteredPreviousCountries.map((country) => (
                                        <SelectItem key={country} value={country}>
                                            {country}
                                        </SelectItem>
                                    ))}
                                </div>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* NINO and UTR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="nino">NINO (National Insurance Number)*</Label>
                    <Input
                        id="nino"
                        value={formData.nino}
                        onChange={(e) => {
                            const value = e.target.value.toUpperCase()
                            updateFormData({ nino: value })
                            if (value && errors.nino) {
                                setErrors({ ...errors, nino: "" })
                            }
                        }}
                        placeholder="AB123456C"
                        required
                    />
                    {errors.nino && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" /> {errors.nino}
                        </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Format: 2 letters, 6 numbers, 1 letter (e.g., AB123456C)</p>
                </div>
                <div>
                    <Label htmlFor="utr">
                        UTR (Unique Tax Reference)*
                        <span className="block text-xs text-gray-500 mt-1">
                            Your UTR is the 10 digits long number that HMRC have generated for you when you registered for
                            self-assessment. If you do not have an UTR number, please type in 'N/A'
                        </span>
                    </Label>
                    <Input
                        id="utr"
                        value={formData.utr}
                        onChange={(e) => {
                            const value = e.target.value
                            updateFormData({ utr: value })
                            if (value && errors.utr) {
                                setErrors({ ...errors, utr: "" })
                            }
                        }}
                        placeholder="1234567890 or N/A"
                        required
                    />
                    {errors.utr && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" /> {errors.utr}
                        </p>
                    )}
                </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="phone_number">Phone Number*</Label>
                    <Input
                        id="phone_number"
                        value={formData.phone_number}
                        onChange={(e) => {
                            const value = e.target.value
                            updateFormData({ phone_number: value })
                            if (value && errors.phone_number) {
                                setErrors({ ...errors, phone_number: "" })
                            }
                            if (formData.same_as_phone) {
                                updateFormData({ whatsapp_number: value })
                                if (errors.whatsapp_number) {
                                    setErrors({ ...errors, whatsapp_number: "" })
                                }
                            }
                        }}
                        placeholder="+44 7700 900123"
                        required
                    />
                    {errors.phone_number && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" /> {errors.phone_number}
                        </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">UK format: +44 or 0 followed by 10-11 digits</p>
                </div>
                <div>
                    <Label htmlFor="email">Email*</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                            const value = e.target.value
                            updateFormData({ email: value })

                            // Basic email validation
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            if (value && emailRegex.test(value) && errors.email) {
                                setErrors({ ...errors, email: "" })
                            }
                        }}
                        placeholder="john.smith@example.co.uk"
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
                        </p>
                    )}
                </div>
            </div>

            {/* WhatsApp */}
            <div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="whatsapp_number" className="font-medium">
                        WhatsApp Number*
                    </Label>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="same_as_phone"
                            checked={formData.same_as_phone}
                            onCheckedChange={(checked) => {
                                const isSame = checked
                                updateFormData({
                                    same_as_phone: isSame,
                                    whatsapp_number: isSame ? formData.phone_number : formData.whatsapp_number,
                                })
                            }}
                            className="bg-gray-300 dark:bg-gray-600 data-[state=checked]:bg-primary"
                        />
                        <Label htmlFor="same_as_phone" className="font-medium text-gray-700 dark:text-gray-300">
                            Same as phone number
                        </Label>
                    </div>
                </div>
                {/* Always show the field, but disable it if same_as_phone is checked */}
                <Input
                    id="whatsapp_number"
                    value={formData.whatsapp_number}
                    onChange={(e) => {
                        const value = e.target.value
                        updateFormData({ whatsapp_number: value })
                        if (value && errors.whatsapp_number) {
                            setErrors({ ...errors, whatsapp_number: "" })
                        }
                    }}
                    disabled={formData.same_as_phone}
                    className={`mt-2 ${formData.same_as_phone ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                    placeholder="+44 7700 900123"
                    required
                />
                {errors.whatsapp_number && !formData.same_as_phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> {errors.whatsapp_number}
                    </p>
                )}
            </div>
        </div>
    )
}

