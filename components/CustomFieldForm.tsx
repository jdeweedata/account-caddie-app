'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

const customFieldSchema = z.object({
  fieldLabel: z.string().min(1, 'Field label is required'),
  apiName: z.string().min(1, 'API name is required')
    .regex(/^[A-Za-z][A-Za-z0-9_]*$/, 'API name must start with a letter and contain only letters, numbers, and underscores'),
  dataType: z.enum(['text', 'textarea', 'date', 'datetime', 'number', 'picklist', 'email', 'phone', 'url']),
  length: z.number().optional(),
  required: z.boolean().default(false),
  picklistValues: z.array(z.string()).optional()
})

type CustomFieldData = z.infer<typeof customFieldSchema>

interface CustomFieldFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function CustomFieldForm({ onSuccess, onError }: CustomFieldFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<CustomFieldData>({
    resolver: zodResolver(customFieldSchema),
    defaultValues: {
      dataType: 'text',
      required: false
    }
  })

  const onSubmit = async (data: CustomFieldData) => {
    try {
      setIsSubmitting(true)

      const response = await fetch('/api/zoho/create-fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to create custom field')
      }

      const result = await response.json()

      toast({
        title: "Success",
        description: "Custom field created successfully.",
      })

      form.reset()
      onSuccess?.()

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create custom field'
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
      onError?.(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const dataTypeOptions = [
    { value: 'text', label: 'Text' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'date', label: 'Date' },
    { value: 'datetime', label: 'Date Time' },
    { value: 'number', label: 'Number' },
    { value: 'picklist', label: 'Picklist' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'url', label: 'URL' }
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fieldLabel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Label</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Consultation Date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apiName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Consultation_Date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dataType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  {dataTypeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Field...
            </>
          ) : (
            'Create Custom Field'
          )}
        </Button>
      </form>
    </Form>
  )
} 