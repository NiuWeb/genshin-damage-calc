import { ReactNode } from "react"

export interface AccordionConfig {
  initial?: number
  multiple?: boolean
}

export interface AccordionProps extends AccordionConfig {
  children?: ReactNode
}

export interface AccordionContext {
  readonly values: number[]
  Toggle(value: number): void
  Has(value: number): boolean
  Add(value: number): void
  Remove(value: number): void
}

export interface AccordionItemProps {
  children?: ReactNode
  value: number
  title: ReactNode
}