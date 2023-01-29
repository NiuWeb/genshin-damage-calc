import { CSSProperties } from "react"

export interface FormulaProps {
    /** The formula to display */
    expr: string
    /** text values to replace in the formula, like variables */
    replace?: {
        [key: string]: {
            /** value to replace with */
            value?: string | number
            /** css classes */
            className?: string
            /** react css styles */
            style?: CSSProperties
            /** legend to display on hover and at the bottom of the formula */
            legend?: string
        }
    }
}