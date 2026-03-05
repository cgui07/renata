import { forwardRef } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { FormField } from "./FormField"
import type { BaseFieldProps, IconFieldProps } from "@/types"

export interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled">,
    BaseFieldProps,
    IconFieldProps {}

/**
 * Campo de input genérico e reutilizável.
 * Suporta todos os tipos de input HTML, ícones laterais, estados de loading,
 * erro e validação. Compatível com react-hook-form via spread de register().
 *
 * @example
 * // Uso básico
 * <FormInput label="E-mail" type="email" placeholder="seu@email.com" />
 *
 * // Com react-hook-form
 * <FormInput label="Nome" error={errors.name?.message} {...register("name")} />
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      helpText,
      required,
      disabled,
      loading,
      leftIcon,
      rightIcon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)
    const hasError = Boolean(error)
    const effectiveRightIcon = loading ? <Loader2 className="size-4 animate-spin text-muted-foreground" /> : rightIcon

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
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 text-muted-foreground">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled || loading}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm",
              "text-foreground placeholder:text-muted-foreground",
              "transition-colors outline-none",
              "focus:border-ring focus:ring-2 focus:ring-ring/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              hasError && "border-danger focus:border-danger focus:ring-danger/20",
              leftIcon && "pl-10",
              effectiveRightIcon && "pr-10",
              className
            )}
            {...props}
          />

          {effectiveRightIcon && (
            <span className="pointer-events-none absolute right-3 text-muted-foreground">
              {effectiveRightIcon}
            </span>
          )}
        </div>
      </FormField>
    )
  }
)

FormInput.displayName = "FormInput"
