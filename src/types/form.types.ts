import type { ReactNode } from "react"


export interface BaseFieldProps {
  label?: string
  error?: string
  helpText?: string
  required?: boolean
  disabled?: boolean
  loading?: boolean
}


export interface IconFieldProps {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}


export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}
