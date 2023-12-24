import { effect } from "@src/core"
import { CombinateArrays } from "@src/utils/combinations/arrays"
import { CombinateValues } from "@src/utils/combinations/values"

export type EffectCombination = {
    [effectName: string]: string[]
}

/**
 * 
 * @param effects Effects to combinate
 * @param cases Custom configuration code for the effects
 * @returns Array of combinations in the form `[effectName, [configs...]]`
 */
export function CombinateEffects(effects: readonly effect.Generator[], cases?: Map<string, string[]>): EffectCombination[] {
    // create configuration command strings for every effect
    const effectConfigs = effects.map(ef => {
        // custom config cmd
        const custom = cases?.get(ef.Name.toLowerCase())
        if (custom) { // return custom cmd if defined,
            return [custom] // all custom cmds goes in a single combination
        } else { // or create a default one
            const conditions = [...ef.Conditions || [""]]
            const stacks = new Set([0])
            stacks.add(ef.MaxStacks || 0)
            stacks.add(Math.floor((ef.MaxStacks || 0) / 2))

            const maxConditions = ef.MaxConditions || 1
            const conditionCombis = Array.from(CombinateValues(conditions, maxConditions))

            const combis = Array.from(CombinateArrays(conditionCombis, Array.from(stacks)))

            return combis.map(([conditions, stacks]) => [
                "effect condition " + conditions.join(" ") + "\n" +
                "effect stacks " + stacks
            ])
        }
    })
    if (effectConfigs.length === 0) {
        effectConfigs.push([])
    }
    const configCombinations = Array.from(CombinateArrays(...effectConfigs))
    const rows: EffectCombination[] = []
    for (const combi of configCombinations) {
        const row: EffectCombination = {}
        combi.forEach((cmd, i) => {
            row[effects[i].Name] = cmd
        })
        rows.push(row)
    }
    return rows
}