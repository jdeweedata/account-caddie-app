import * as React from "react"

export const Dialog = ({ children, open, onOpenChange }: { children: React.ReactNode, open: boolean, onOpenChange: (open: boolean) => void }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {children}
        <button onClick={() => onOpenChange(false)} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</button>
      </div>
    </div>
  )
}

export const DialogContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const DialogHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-4">{children}</div>
export const DialogTitle = ({ children }: { children: React.ReactNode }) => <h2 className="text-xl font-bold">{children}</h2>