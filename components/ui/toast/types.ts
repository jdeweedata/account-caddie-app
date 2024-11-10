import { ReactNode } from "react"

export type ToastProps = {
  variant?: "default" | "destructive" | "success"
  title?: string
  description?: string
  action?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement<{
  onClick: () => void
}> 