'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

interface OperationalScaleFormProps {
  initialData: {
    employeeCount: number;
    annualRevenue: number;
    businessAge: string;
    registrationType: string;
  };
  onSubmit: (data: OperationalScaleFormProps['initialData']) => void;
  onBack: () => void;
}

export default function OperationalScaleForm({ initialData, onSubmit, onBack }: OperationalScaleFormProps) {
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Add your form fields here */}
    </form>
  )
} 