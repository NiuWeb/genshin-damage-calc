import { stats } from "@src/core"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_character_stat = RunnerCmd(() => ({
    "list": {
        description: "Lists the stats of the current character",
        arguments: [],
        compile({ Value, Log }) {
            return function character_stat_list() {
                const char = Value.GetChar().GetCharacter()
                const table = new strings.Table(strings.labels.STAT, strings.labels.VALUE)
                table.DecimalPlaces = 4
                for (const stat of stats.stat.Values()) {
                    table.AddRow(stats.stat.Name(stat), char.Get(stat))
                }
                Log.Log("\n" + table.String())
            }
        }
    },
    "get": {
        description: "Gets the value of stats in the current character",
        example: "character stat get crit_rate crit_dmg",
        compile({ Value, Log }, args) {
            const list = args.map(name => stats.stat.Get(name.toUpperCase()))
            return function artifact_stat_get() {
                const char = Value.GetChar().GetCharacter()
                const table = new strings.Table(strings.labels.STAT, strings.labels.VALUE)
                table.DecimalPlaces = 4
                for (const stat of list) {
                    table.AddRow(stats.stat.Name(stat), char.Get(stat))
                }
                Log.Log("\n" + table.String())
            }
        }
    },
    "set": {
        description: "Sets the value of a stat in the current character",
        example: "character stat set atk_percent 45%",
        arguments: ["stat", "value"],
        compile({ Value, Log }, [_stat, _value]) {
            const stat = stats.stat.Get(_stat.toUpperCase())
            const value = toNumber(_value)
            return function artifact_stat_set() {
                const box = Value.GetChar()
                const char = box.GetCharacter()
                if (stat === stats.stat.HP_CURRENT || stat === stats.stat.ENERGY_CURRENT) {
                    char.Set(stat, value)
                } else {
                    const current = char.Get(stat)
                    box.AddModifier(char.CreateModifier(stat, value - current))
                }
                Log.Logf("Character stat %s set to %.4f", stats.stat.Name(stat), value)
            }
        }
    },
    "add": {
        description: "Adds to the value of a stat in the current character",
        example: "character stat add atk_percent 10%",
        arguments: ["stat", "value"],
        compile({ Value, Log }, [_stat, _value]) {
            const stat = stats.stat.Get(_stat.toUpperCase())
            const value = toNumber(_value)

            return function character_stat_add() {
                const box = Value.GetChar()
                const char = box.GetCharacter()
                box.AddModifier(char.CreateModifier(stat, value))
                Log.Logf("Modified %s + %.4f = %.4f", stats.stat.Name(stat), value, char.Get(stat))
            }
        }
    },
    "mods": {
        description: "Lists the stats added to the character with `stat add [...]`",
        arguments: [],
        compile({ Value, Log }) {
            return function artifact_stat_mods() {
                const box = Value.GetChar()
                const table = new strings.Table(strings.labels.STAT, strings.labels.VALUE)
                table.DecimalPlaces = 4
                box.GetModifiers().forEach(mod => table.AddRow(stats.stat.Name(mod.GetProp()), mod.GetValue()))
                Log.Log("\n" + table.String())
            }
        }
    },
    "clear": {
        description: "Removes the stat modifiers created by `stat add [...]`",
        arguments: [],
        compile({ Value, Log }) {
            return function character_stat_clear() {
                const box = Value.GetChar()
                box.ClearModifiers()
                Log.Log("Cleared modifiers")
            }
        }
    }
}))