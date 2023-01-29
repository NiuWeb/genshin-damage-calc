import { createContext, useContext, useReducer } from "react"
import { Calc } from "./calc"


export type CalcExecContext = (exec?: (instance: typeof Calc) => void) => void
export type CalcGetContext = typeof Calc
export type CalcContext = [CalcGetContext, CalcExecContext, number]

export const CalcContext = createContext(undefined as unknown as CalcContext)

/** 
 * Access the calculator instance through the context. It will
 * update the entire app after any call
 */
export function useCalc(): CalcContext {
    return useContext(CalcContext)
}

/** Creates the value for the calc context provider */
export function useCalcProvider(): CalcContext {
    const [counter, update] = useReducer(x => (x + 1) % 7, 0)
    return [Calc, function execute(exec) {
        exec?.(Calc)
        update()
    }, counter]
}