"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { X } from "lucide-react"

interface AdminSettingsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminSettingsDrawer({ open, onOpenChange }: AdminSettingsDrawerProps) {
  const { user, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  })

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    darkMode: false,
    autoLogout: false,
  })

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setPreferences((prev) => ({ ...prev, [name]: checked }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (updateUser) {
        await updateUser(formData)
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        })
      }
    } catch (error) {
      console.error("Profile update error:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Implement password change API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
      })

      // Reset password fields
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      })
    } catch (error) {
      console.error("Password update error:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update your password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Implement preferences update API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Preferences Updated",
        description: "Your preferences have been successfully saved.",
      })
    } catch (error) {
      console.error("Preferences update error:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update your preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] overflow-auto">
        <DrawerHeader className="flex justify-between items-center">
          <div>
            <DrawerTitle>Admin Settings</DrawerTitle>
            <DrawerDescription>Update your profile and admin settings</DrawerDescription>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <form onSubmit={handleProfileSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="password">
              <form onSubmit={handlePasswordSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <Input
                    id="current_password"
                    name="current_password"
                    type="password"
                    value={passwordData.current_password}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    name="new_password"
                    type="password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    value={passwordData.confirm_password}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    required
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Updating..." : "Change Password"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="preferences">
              <form onSubmit={handlePreferencesSubmit} className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark theme by default</p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => handleSwitchChange("darkMode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-logout">Auto Logout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch
                    id="auto-logout"
                    checked={preferences.autoLogout}
                    onCheckedChange={(checked) => handleSwitchChange("autoLogout", checked)}
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full mt-6">
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

