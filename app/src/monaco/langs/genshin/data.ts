import { genshin } from "@src/genshin/core"

export const characters = genshin.characters.GetList().map(char => char.Name)
export const weapons = genshin.weapons.GetList().map(wp => wp.Name)
export const sets = genshin.sets.GetList().map(s => s.Name)
export const effects = genshin.effects.GetList().map(s => s.Name)
export const foods = genshin.foods.GetList().map(s => s.Name)

export const stats = genshin.stats.stat.Values()
    .map(v => genshin.stats.stat.Name(v))
    .filter(s => s !== "LEVEL")
export const auras = genshin.stats.aura.Values()
    .map(v => genshin.stats.aura.Name(v))
    .filter(s => s !== "LEVEL")

/**
 * Gets the groups of tokens for the language
 * @param commands The program to get the commands from
 */
export function getGroups(program: genshin.cmd.Program<unknown>) {
    const commands = Object.keys(program.commands)
    const groups: { [x: string]: string[] } = {
        characters,
        stats,
        effects,
        commands,
        weapons,
        sets,
        auras,
        foods
    }

    const suggestions = Object
        .values(groups)
        .reduce((a, b) => {
            b.forEach(b => a.push(b))
            return a
        }, [])

    function findGroup(word: string): string | undefined {
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

    return { groups, suggestions, findGroup }
}

export const groupLabels: { [x: string]: string } = {
    characters: "LABEL.CHARACTER",
    stats: "LABEL.STAT",
    effects: "LABEL.EFFECT",
    commands: "LABEL.COMMAND",
    weapons: "LABEL.WEAPON",
    sets: "LABEL.SET",
    auras: "LABEL.AURA",
    foods: "LABEL.EFFECTS_FOOD",
}