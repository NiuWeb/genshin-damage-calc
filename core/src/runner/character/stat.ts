import { stats } from "@src/core"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_character_stat = RunnerCmd(() => ({
    "list": {
        name: "list",
        description: "Lists the stats of the current character",
        compile(_, { context, logger }) {
            return function character_stat_list() {
                const char = context.GetChar().GetCharacter()
                const table = new strings.Table(strings.labels.STAT, strings.labels.VALUE)
                table.DecimalPlaces = 4
                for (const stat of stats.stat.Values()) {
                    table.AddRow(stats.stat.Name(stat), char.Get(stat))
                }
                logger.log("\n" + table.String())
            }
        }
    },
    "get": {
        name: "get",
        description: "Gets the value of stats in the current character",
        example: "character stat get crit_rate crit_dmg",
        arguments: "stats...",
        compile({ values }, { context, logger }) {
            const list = values.map(name => stats.stat.Get(name.toUpperCase()))
            return function artifact_stat_get() {
                const char = context.GetChar().GetCharacter()
                const table = new strings.Table(strings.labels.STAT, strings.labels.VALUE)
                table.DecimalPlaces = 4
                for (const stat of list) {
                    table.AddRow(stats.stat.Name(stat), char.Get(stat))
                }
                logger.log("\n" + table.String())
            }
        }
    },
    "set": {
        name: "set",
        description: "Sets the value of a stat in the current character",
        example: "character stat set atk_percent 45%",
        arguments: "stat value",
        compile({ values: [_stat, _value] }, { context, logger }) {
            const stat = stats.stat.Get(_stat.toUpperCase())
            const value = toNumber(_value)
            return function artifact_stat_set() {
                const box = context.GetChar()
                const char = box.GetCharacter()
                if (stat === stats.stat.HP_CURRENT || stat === stats.stat.ENERGY_CURRENT) {
                    char.Set(stat, value)
                } else {
                    const current = char.Get(stat)
                    box.AddModifier(char.CreateModifier(stat, value - current))
                }
                logger.logf("Character stat %s set to %.4f", stats.stat.Name(stat), value)
            }
        }
    },
    "add": {
        name: "add",
        description: "Adds to the value of a stat in the current character",
        example: "character stat add atk_percent 10%",
        arguments: "stat value",
        compile({ values: [_stat, _value] }, { context, logger }) {
            const stat = stats.stat.Get(_stat.toUpperCase())
            const value = toNumber(_value)

            return function character_stat_add() {
                const box = context.GetChar()
                const char = box.GetCharacter()
                box.AddModifier(char.CreateModifier(stat, value))
                logger.logf("Modified %s + %.4f = %.4f", stats.stat.Name(stat), value, char.Get(stat))
            }
        }
    },
    "mods": {
        name: "mods",
        description: "Lists the stats added to the character with `stat add [...]`",
        compile(_, { context, logger }) {
            return function artifact_stat_mods() {
                const box = context.GetChar()
                const table = new strings.Table(strings.labels.STAT, strings.labels.VALUE)
                table.DecimalPlaces = 4
                box.GetModifiers().forEach(mod => table.AddRow(stats.stat.Name(mod.GetProp()), mod.GetValue()))
                logger.log("\n" + table.String())
            }
        }
    },
    "clear": {
        name: "clear",
        description: "Removes the stat modifiers created by `stat add [...]`",
        compile(_, { context, logger }) {
            return function character_stat_clear() {
                const box = context.GetChar()
                box.ClearModifiers()
                logger.log("Cleared modifiers")
            }
        }
    }
}))