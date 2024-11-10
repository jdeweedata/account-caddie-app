'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

interface ServiceRequirementsFormProps {
  initialData: {
    package: string;
    additionalServices: string[];
    consultationPreference: string;
    urgencyLevel: string;
  };
  onSubmit: (data: ServiceRequirementsFormProps['initialData']) => void;
  onBack: () => void;
}

export default function ServiceRequirementsForm({ initialData, onSubmit, onBack }: ServiceRequirementsFormProps) {
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