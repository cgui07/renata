import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { FormField } from "./FormField"
import type { BaseFieldProps, SelectOption } from "@/types"

export interface FormRadioGroupProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled">,
    Pick<BaseFieldProps, "label" | "error" | "helpText" | "required" | "disabled"> {
  options: SelectOption[]
  /** Direção do grupo. Padrão: vertical */
  direction?: "vertical" | "horizontal"
  name: string
}

/**
 * Grupo de radio buttons com label de grupo, erro e texto de ajuda.
 * Compatível com react-hook-form via spread de register().
 *
 * @example
 * <FormRadioGroup
 *   label="Status do imóvel"
 *   name="status"
 *   options={PROPERTY_STATUS}
 *   direction="horizontal"
 *   error={errors.status?.message}
 *   {...register("status")}
 * />
 */
export const FormRadioGroup = forwardRef<HTMLInputElement, FormRadioGroupProps>(
  (
    {
      label,
      error,
      helpText,
      required,
      disabled,
      options,
      direction = "vertical",
      name,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        label={label}
        error={error}
        helpText={helpText}
        required={required}
        disabled={disabled}
      >
        <div
          className={cn(
            "flex gap-3",
            direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
            className
          )}
          role="radiogroup"
          aria-required={required}
        >
          {options.map((option, index) => {
            const optionId = `${name}-${option.value}`
            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={cn(
                  "flex items-center gap-2 text-sm cursor-pointer",
                  (disabled || option.disabled) && "cursor-not-allowed opacity-60"
                )}
              >
                <input
                  ref={index === 0 ? ref : undefined}
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  disabled={disabled || option.disabled}
                  className="size-4 border-input text-primary accent-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
                  {...props}
                />
                {option.label}
              </label>
            )
          })}
        </div>
      </FormField>
    )
  }
)

FormRadioGroup.displayName = "FormRadioGroup"
