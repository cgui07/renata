import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { FormField } from "./FormField"
import type { BaseFieldProps } from "@/types"

export interface FormTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "disabled">,
    BaseFieldProps {
  
  showCount?: boolean
}















export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label,
      error,
      helpText,
      required,
      disabled,
      loading,
      showCount,
      maxLength,
      className,
      id,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)
    const hasError = Boolean(error)
    const currentLength = typeof value === "string" ? value.length : 0

    return (
      <FormField
        label={label}
        error={error}
        helpText={helpText}
        required={required}
        disabled={disabled}
        htmlFor={inputId}
      >
        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled || loading}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={hasError}
          className={cn(
            "flex min-h-[100px] w-full rounded-md border border-input bg-surface px-3 py-2 text-sm",
            "text-foreground placeholder:text-muted-foreground",
            "resize-y transition-colors outline-none",
            "focus:border-ring focus:ring-2 focus:ring-ring/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasError && "border-danger focus:border-danger focus:ring-danger/20",
            className
          )}
          {...props}
        />

        {showCount && maxLength && (
          <p className="self-end text-xs text-muted-foreground">
            {currentLength}/{maxLength}
          </p>
        )}
      </FormField>
    )
  }
)

FormTextarea.displayName = "FormTextarea"
