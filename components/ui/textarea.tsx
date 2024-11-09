import * as React from "react"

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref) => {
    return <textarea ref={ref} {...props} className="w-full px-3 py-2 border rounded-md" />
  }
)
Textarea.displayName = "Textarea"