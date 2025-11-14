import * as React from "react"
import { useId } from "react"

const FormFieldContext = React.createContext({})

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  if (fieldContext === undefined) {
    throw new Error("useFormField should be used within <FormField>")
  }

  return fieldContext
}

interface FormFieldProps {
  children: React.ReactNode
  id?: string
  label?: string
  description?: string
  error?: string
}

export function FormField({ children, id: propId, label, description, error }: FormFieldProps) {
  const generatedId = useId()
  const fieldId = propId || generatedId
  const descriptionId = `${fieldId}-description`
  const errorId = `${fieldId}-error`

  return (
    <FormFieldContext.Provider value={{ id: fieldId, descriptionId, errorId, error }}>
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={propId || fieldId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {children}
        {description && !error && (
          <p
            id={descriptionId}
            className="text-sm text-muted-foreground"
          >
            {description}
          </p>
        )}
        {error && (
          <p
            id={errorId}
            className="text-sm font-medium text-destructive"
          >
            {error}
          </p>
        )}
      </div>
    </FormFieldContext.Provider>
  )
}