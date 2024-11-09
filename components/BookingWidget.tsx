'use client'

import React from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface BookingWidgetProps {
  isOpen?: boolean
  onClose?: () => void
}

export function BookingWidget({ isOpen = true, onClose }: BookingWidgetProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <iframe 
          width='100%' 
          height='750px' 
          src='https://jeffreyd-accountcaddie.zohobookings.com/portal-embed#/jeffrey' 
          frameBorder='0' 
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  )
}