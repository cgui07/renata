import type { ReactNode } from "react"

/** Props base compartilhadas por todos os componentes de form field */
export interface BaseFieldProps {
  label?: string
  error?: string
  helpText?: string
  required?: boolean
  disabled?: boolean
  loading?: boolean
}

/** Props para campos com suporte a ícones laterais */
export interface IconFieldProps {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

/** Par genérico de opção para selects, radios e checkboxes */
export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}
