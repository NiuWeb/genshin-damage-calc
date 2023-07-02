import { genshin } from "@bygdle/genshin-calculator-core"
import { createContext, useState } from "react"


export interface EnkaModalContext {
    readonly visible: boolean
    readonly UID: string
    readonly raw: string
    show(): void
    hide(): void
    setUID(UID: string): void
    setRaw(raw: string): void
    onLoad?(characters?: genshin.charbox.Charbox[]): void
}
/**
 * controls whether the Enka modal is open or not
 */
export const EnkaModalContext = createContext<EnkaModalContext>({} as EnkaModalContext)

/**
 * Creates a context for the Enka modal
 */
export function useEnkaModalContext(onLoad: EnkaModalContext["onLoad"]): EnkaModalContext {
    const [visible, setVisible] = useState(false)
    const [UID, setUID] = useState("")
    const [raw, setRaw] = useState("")
    function show() { setVisible(true) }
    function hide() { setVisible(false) }
    return { visible, show, hide, UID, setUID, raw, setRaw, onLoad }
}