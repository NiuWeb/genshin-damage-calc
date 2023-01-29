import { Calc } from "@src/genshin/calc"
import { genshin } from "@src/genshin/core"

export const characters = genshin.characters.GetList().map(char => char.Name)
export const weapons = genshin.weapons.GetList().map(wp => wp.Name)
export const sets = genshin.sets.GetList().map(s => s.Name)
export const effects = genshin.effects.GetList().map(s => s.Name)

export const stats = genshin.stats.stat.Values()
    .map(v => genshin.stats.stat.Name(v))
    .filter(s => s !== "LEVEL")
export const auras = genshin.stats.aura.Values()
    .map(v => genshin.stats.aura.Name(v))
    .filter(s => s !== "LEVEL")

export const cmd = Calc.Get().Program
export const commands = Object.keys(cmd.Get())
export const fullCommands = cmd.GetCommands()

export const groups: { [x: string]: string[] } = {
    characters,
    stats,
    effects,
    commands,
    weapons,
    sets,
    auras,
}
export const groupLabels: { [x: string]: string } = {
    characters: "LABEL.CHARACTER",
    stats: "LABEL.STAT",
    effects: "LABEL.EFFECT",
    commands: "LABEL.COMMAND",
    weapons: "LABEL.WEAPON",
    sets: "LABEL.SET",
    auras: "LABEL.AURA",
}
export const suggestions = Object
    .values(groups)
    .reduce((a, b) => {
        b.forEach(b => a.push(b))
        return a
    }, [])

export function FindGroup(word: string): string | undefined {
    word = word.toLowerCase().trim()
    for (const group in groups) {
        for (let key of groups[group]) {
            key = key.toLowerCase().trim()
            if (key === word) {
                return group
            }
        }
    }
    return undefined
}
