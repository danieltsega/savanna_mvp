"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface CredentialsFormProps {
    formData: any
    updateFormData: (data: any) => void
    passwordMatch: boolean
    errors: Record<string, string>
    setErrors: (errors: Record<string, string>) => void
}

export function CredentialsForm({ formData, updateFormData, passwordMatch, errors, setErrors }: CredentialsFormProps) {
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        uppercase: false,
        number: false,
        special: false,
    })

    useEffect(() => {
        const password = formData.password
        setPasswordValidation({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password),
        })
    }, [formData.password])

    const validatePassword = () => {
        const isValid = Object.values(passwordValidation).every(Boolean)
        if (!isValid) {
            setErrors({
                ...errors,
                password: "Password does not meet all requirements",
            })
        } else {
            setErrors({
                ...errors,
                password: "",
            })
        }
        return isValid
    }

    const validateConfirmPassword = () => {
        if (formData.password !== formData.confirm_password) {
            setErrors({
                ...errors,
                confirm_password: "Passwords do not match",
            })
            return false
        }
        setErrors({
            ...errors,
            confirm_password: "",
        })
        return true
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-foreground dark:text-primary">
                Authentication credentials to access your client portal
            </h2>
            <p className="text-sm text-gray-500">Create credentials for later access of your portal</p>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} disabled className="bg-gray-100 dark:bg-gray-700" />
                <p className="text-xs text-gray-500 mt-1">This email will be used as your username to access your portal</p>
            </div>

            <div>
                <Label htmlFor="password">Password*</Label>
                <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => {
                        const value = e.target.value
                        updateFormData({ password: value })

                        // Clear error if password meets requirements
                        const passwordValidation = {
                            length: value.length >= 8,
                            uppercase: /[A-Z]/.test(value),
                            number: /[0-9]/.test(value),
                            special: /[^A-Za-z0-9]/.test(value),
                        }

                        const isValid = Object.values(passwordValidation).every(Boolean)
                        if (isValid && errors.password) {
                            setErrors({
                                ...errors,
                                password: "",
                            })
                        }
                    }}
                    onBlur={validatePassword}
                    required
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> {errors.password}
                    </p>
                )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Password Requirements</h3>
                <ul className="space-y-1">
                    <li className="flex items-center text-xs">
                        {passwordValidation.length ? (
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                            <AlertCircle className="h-4 w-4 mr-2 text-gray-400" />
                        )}
                        <span
                            className={
                                passwordValidation.length ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                            }
                        >
                            At least 8 characters long
                        </span>
                    </li>
                    <li className="flex items-center text-xs">
                        {passwordValidation.uppercase ? (
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                            <AlertCircle className="h-4 w-4 mr-2 text-gray-400" />
                        )}
                        <span
                            className={
                                passwordValidation.uppercase ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                            }
                        >
                            Include at least one uppercase letter
                        </span>
                    </li>
                    <li className="flex items-center text-xs">
                        {passwordValidation.number ? (
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                            <AlertCircle className="h-4 w-4 mr-2 text-gray-400" />
                        )}
                        <span
                            className={
                                passwordValidation.number ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                            }
                        >
                            Include at least one number
                        </span>
                    </li>
                    <li className="flex items-center text-xs">
                        {passwordValidation.special ? (
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                            <AlertCircle className="h-4 w-4 mr-2 text-gray-400" />
                        )}
                        <span
                            className={
                                passwordValidation.special ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                            }
                        >
                            Include at least one special character
                        </span>
                    </li>
                </ul>
            </div>

            <div>
                <Label htmlFor="confirm_password">Confirm Password*</Label>
                <Input
                    id="confirm_password"
                    type="password"
                    value={formData.confirm_password}
                    onChange={(e) => {
                        const value = e.target.value
                        updateFormData({ confirm_password: value })

                        // Clear error if passwords match
                        if (value === formData.password && errors.confirm_password) {
                            setErrors({
                                ...errors,
                                confirm_password: "",
                            })
                        }
                    }}
                    onBlur={validateConfirmPassword}
                    required
                />
                {!passwordMatch && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> Passwords do not match
                    </p>
                )}
            </div>
        </div>
    )
}

