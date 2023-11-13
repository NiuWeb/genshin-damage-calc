import { stats } from "@src/core"
import { toNumber } from "@src/utils/conversions"
import { SplitString2D } from "@src/utils/strlist"
import { RunnerCmd } from "../cmd"

export const cmd_stat = RunnerCmd(() => ({
    "set": {
        name: "set",
        description: "Sets the value of a stat for a character or characters",
        arguments: "character stat value [exclude=]",
        docs: {
            character: "name of the character to set the stat for. Can be a comma-separated list of names." +
                ", or the keyword 'all' to set the stat for all characters",
            stat: "name of the stat to set",
            value: "value to set the stat to. Can be a percentage like 10% or 0.1",
            exclude: "name of the characters to exclude from the set. Can be a comma-separated list of names."
        },
        compile({ values: [_character, _stat, _value], named: { exclude: _exclude } }, { context, logger }) {
            const stat = stats.stat.Get(_stat.toUpperCase())
            const value = toNumber(_value)

            const all = _character === "all"
            const _characters = SplitString2D(_character, x => x)[0]

            if (_exclude === "all") {
                throw new Error("exclude cannot be 'all'")
            }

            const exclude = SplitString2D(_exclude || "", x => x)[0]

            console.log(_exclude, exclude)

            // exclude characters
            const characters = _characters.filter(x => !exclude.includes(x))

            return function stat_set() {
                const party = context.GetChar().GetParty()
                const allMembers = party ? party.GetMembers() : [context.GetChar()]

                const members = allMembers.filter(x => {
                    const lowerName = x.GetCharacter().Options.Name.toLowerCase()
                    if (all) {
                        return !exclude.includes(lowerName)
                    }
                    return characters.includes(lowerName)
                })

                const names = members.map(x => x.GetCharacter().Options.Name)

                for (const member of members) {
                    const char = member.GetCharacter()
                    if (stat === stats.stat.HP_CURRENT || stat === stats.stat.ENERGY_CURRENT) {
                        char.Set(stat, value)
                    } else {
                        const current = char.Get(stat)
                        member.AddModifier(char.CreateModifier(stat, value - current))
                    }
                }

                logger.logf("Set stat %s=%.2f for %s", stats.stat.Name(stat), value, names.join(", "))
            }
        }
    },

    "add": {
        name: "add",
        description: "Adds to the value of a stat for a character or characters",
        arguments: "character stat value [exclude=]",
        docs: {
            character: "name of the character to add the stat to. Can be a comma-separated list of names." +
                ", or the keyword 'all' to add the stat to all characters",
            stat: "name of the stat to add",
            value: "value to add to the stat. Can be a percentage like 10% or 0.1",
            exclude: "name of the characters to exclude from the add. Can be a comma-separated list of names."
        },
        compile({ values: [_character, _stat, _value], named: { exclude: _exclude } }, { context, logger }) {
            const stat = stats.stat.Get(_stat.toUpperCase())
            const value = toNumber(_value)

            const all = _character === "all"
            const _characters = SplitString2D(_character, x => x)[0]

            if (_exclude === "all") {
                throw new Error("exclude cannot be 'all'")
            }

            const exclude = SplitString2D(_exclude || "", x => x)[0]

            console.log(_exclude, exclude)

            // exclude characters
            const characters = _characters.filter(x => !exclude.includes(x))

            return function stat_add() {
                const party = context.GetChar().GetParty()
                const allMembers = party ? party.GetMembers() : [context.GetChar()]

                const members = allMembers.filter(x => {
                    const lowerName = x.GetCharacter().Options.Name.toLowerCase()
                    if (all) {
                        return !exclude.includes(lowerName)
                    }
                    return characters.includes(lowerName)
                })

                const names = members.map(x => x.GetCharacter().Options.Name)

                for (const member of members) {
                    const char = member.GetCharacter()
                    member.AddModifier(char.CreateModifier(stat, value))

                }

                logger.logf("Added stat %s+=%.2f for %s", stats.stat.Name(stat), value, names.join(", "))
            }
        }
    }
}))