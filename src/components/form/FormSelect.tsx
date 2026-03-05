import { forwardRef } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { FormField } from "./FormField"
import type { BaseFieldProps, SelectOption } from "@/types"

export interface FormSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "disabled">,
    BaseFieldProps {
  options: SelectOption[]
  placeholder?: string
}

/**
 * Campo de seleção (dropdown) reutilizável.
 * Compatível com react-hook-form via spread de register().
 *
 * @example
 * <FormSelect
 *   label="Tipo de imóvel"
 *   placeholder="Selecione..."
 *   options={PROPERTY_TYPES}
 *   error={errors.type?.message}
 *   {...register("type")}
 * />
 */
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      helpText,
      required,
      disabled,
      loading,
      options,
      placeholder,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)
    const hasError = Boolean(error)

    return (
      <FormField
        label={label}
        error={error}
        helpText={helpText}
        required={required}
        disabled={disabled}
        htmlFor={inputId}
      >
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={inputId}
            disabled={disabled || loading}
            aria-invalid={hasError}
            className={cn(
              "flex h-10 w-full appearance-none rounded-md border border-input bg-surface px-3 py-2 pr-10 text-sm",
              "text-foreground",
              "transition-colors outline-none",
              "focus:border-ring focus:ring-2 focus:ring-ring/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              hasError && "border-danger focus:border-danger focus:ring-danger/20",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 size-4 text-muted-foreground" />
        </div>
      </FormField>
    )
  }
)

FormSelect.displayName = "FormSelect"
