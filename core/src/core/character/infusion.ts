import { stat } from "@core/stats"

/**
 * An infusion object
 */
export interface Infusion {
    Enabled: boolean
    Element: number
    Max: boolean
    Remove(): boolean
}

const priority = {
    [stat.PYRO_DMG]: 3,
    [stat.CRYO_DMG]: 2,
    [stat.ELECTRO_DMG]: 1,
}
/**
 * Gets the infusion with the highest priority from a list
 */
export function GetInfusion(list: readonly Infusion[]): Infusion {
    const copy = [...list]
        .sort((a, b) => {
            const pA = a.Max ? Infinity : (priority[a.Element] || 0)
            const pB = b.Max ? Infinity : (priority[b.Element] || 0)
            return pB - pA
        })
        .filter(a => a.Enabled)
    return copy[0]
}