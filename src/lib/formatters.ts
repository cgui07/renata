/**
 * Formata um valor numérico como moeda brasileira.
 * @example formatCurrency(450000) → "R$ 450.000,00"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Formata metros quadrados.
 * @example formatArea(120) → "120 m²"
 */
export function formatArea(value: number): string {
  return `${new Intl.NumberFormat("pt-BR").format(value)} m²`
}

/**
 * Formata uma data para o padrão brasileiro.
 * @example formatDate(new Date()) → "04/03/2026"
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date))
}

/**
 * Formata um número de telefone brasileiro.
 * @example formatPhone("11999998888") → "(11) 99999-8888"
 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return value
}
