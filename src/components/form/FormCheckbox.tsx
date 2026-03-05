import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import type { BaseFieldProps } from "@/types"

export interface FormCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "disabled">,
    Pick<BaseFieldProps, "error" | "helpText" | "disabled"> {
  label: string
}

/**
 * Checkbox com label, erro e texto de ajuda.
 * Compatível com react-hook-form via spread de register().
 *
 * @example
 * <FormCheckbox
 *   label="Aceito os termos de uso"
 *   error={errors.terms?.message}
 *   {...register("terms")}
 * />
 */
export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, helpText, disabled, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-")
    const hasError = Boolean(error)

    return (
      <div className={cn("flex flex-col gap-1", disabled && "opacity-60")}>
        <div className="flex items-start gap-2.5">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            className={cn(
              "mt-0.5 size-4 rounded border-input text-primary accent-primary",
              "focus:ring-2 focus:ring-ring/20 focus:outline-none",
              "disabled:cursor-not-allowed",
              hasError && "border-danger accent-danger",
              className
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className="text-sm text-foreground leading-snug cursor-pointer"
          >
            {label}
          </label>
        </div>

        {error ? (
          <p className="text-xs text-danger pl-6.5" role="alert">
            {error}
          </p>
        ) : helpText ? (
          <p className="text-xs text-muted-foreground pl-6.5">{helpText}</p>
        ) : null}
      </div>
    )
  }
)

FormCheckbox.displayName = "FormCheckbox"
