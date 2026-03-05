import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface FormFieldProps {
  label?: string
  error?: string
  helpText?: string
  required?: boolean
  disabled?: boolean
  htmlFor?: string
  className?: string
  children: ReactNode
}






export function FormField({
  label,
  error,
  helpText,
  required,
  disabled,
  htmlFor,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", disabled && "opacity-60", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground leading-none"
        >
          {label}
          {required && (
            <span className="ml-1 text-danger" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : helpText ? (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      ) : null}
    </div>
  )
}
