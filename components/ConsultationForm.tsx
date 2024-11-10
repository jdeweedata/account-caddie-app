'use client'

import { useState } from 'react'
import { useConsultation } from '@/lib/hooks/useConsultation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

export function ConsultationForm() {
  const { scheduleConsultation, isLoading } = useConsultation()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consultationDateTime: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await scheduleConsultation(formData)
      // On success, redirect to confirmation page or reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        consultationDateTime: ''
      })
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule a Consultation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            name="consultationDateTime"
            type="datetime-local"
            value={formData.consultationDateTime}
            onChange={handleChange}
            required
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-chelsea-cucumber hover:bg-te-papa-green text-white"
          >
            {isLoading ? 'Scheduling...' : 'Schedule Consultation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 