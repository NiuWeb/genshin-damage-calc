import { createContext, useState } from "react"
import { AccordionConfig, AccordionContext as Context } from "./type"

export const AccordionContext = createContext({} as Context)

export function useAccordionProvider(config: AccordionConfig): Context {
    const [values, setValues] = useState<number[]>(Number.isFinite(config.initial) ? [config.initial || 0] : [])

    return {
        values,
        Has(value) {
            return values.includes(value)
        },
        Add(value) {
            if (config.multiple) {
                setValues(v => [...v, value])
            } else {
                setValues([value])
            }
        },
        Remove(value) {
            setValues(v => v.filter(v => v !== value))
        },
        Toggle(value) {
            if (this.Has(value)) {
                this.Remove(value)
            } else {
                this.Add(value)
            }
        },
    }
}