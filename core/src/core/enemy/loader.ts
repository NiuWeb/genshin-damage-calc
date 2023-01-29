import { DmgToRes, Elements } from "@core/stats"
import { Enemy } from "./enemy"

/** Exported enemy */
export interface Exported {
    level: number
    auras: readonly number[]
    modifiers: { stat: number, value: number }[]
}

/**
 * Exports enemy data
 */
export function Export(enemy: Enemy): Exported {
    const result: Exported = {
        level: enemy.GetLevel(),
        auras: enemy.GetAuras(),
        modifiers: []
    }
    for (const el of Elements) {
        const res = DmgToRes(el)
        const val = enemy.GetBaseRes(res)
        result.modifiers.push({ stat: res, value: val })
    }
    return result
}
/**
 * Imports enemy data
 */
export function Import(data: Exported, enemy: Enemy): void {
    enemy.SetLevel(data.level)
    enemy.SetAuras(...data.auras)
    for (const { stat, value } of data.modifiers) {
        enemy.SetBaseRes(stat, value)
    }
}