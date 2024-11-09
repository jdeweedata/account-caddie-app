import * as React from "react"

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return <input ref={ref} {...props} className="w-full px-3 py-2 border rounded-md" />
  }
)
Input.displayName = "Input"