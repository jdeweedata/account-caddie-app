'use client'

import { useState, useEffect } from 'react'

type ToastProps = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

type State = {
  toasts: ToastProps[]
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000

let count = 0

function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toastTimeouts = new Map()

export function useToast() {
  const [state, setState] = useState<State>({ toasts: [] })

  const toast = ({ ...props }: ToastProps) => {
    const id = generateId()

    setState((state) => {
      const newToasts = [...state.toasts, { ...props }]
      if (newToasts.length > TOAST_LIMIT) {
        newToasts.shift()
      }
      return { ...state, toasts: newToasts }
    })

    setTimeout(() => {
      setState((state) => ({
        ...state,
        toasts: state.toasts.filter((t) => t !== props),
      }))
    }, TOAST_REMOVE_DELAY)
  }

  return {
    toast,
    toasts: state.toasts,
  }
}