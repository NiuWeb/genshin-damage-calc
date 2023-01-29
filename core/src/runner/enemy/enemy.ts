import { stats } from "@src/core"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_enemy = RunnerCmd(() => ({
    "show": {
        description: "Shows all the enemies",
        arguments: [],
        compile({ Value, Log }) {
            return function enemy_show() {
                const members = Value.Party.GetMembers()
                const enemies = members.map(mem => mem.GetCharacter().GetEnemy())
                Log.Logf("\n" + strings.Enemy(...enemies))
            }
        }
    },
    "level": {
        description: "Sets the level of all enemies",
        example: "enemy level 100",
        arguments: ["level"],
        compile({ Value, Log }, [strval]) {
            const level = toNumber(strval)
            return function enemy_level() {
                Value.Party.GetMembers().forEach(member => (
                    member.GetCharacter().GetEnemy().SetLevel(level)
                ))
                Log.Logf("All enemy levels changed to %d", level)
            }
        }
    },
    "aura": {
        description: "Sets enemies applied aura (s), or all",
        example: "enemy aura frozen\nenemy aura hydro electro\nenemy aura // this removes all auras\nenemy aura all // this applies all auras",
        compile({ Value, Log }, auras) {
            const vals = (auras.length > 0 && auras[0].match(/all/i)) ? (
                stats.aura.Values().filter(s => s !== stats.aura.NONE)
            ) : (
                auras.map(name => stats.aura.Get(name.toUpperCase()))
            )
            return function enemy_aura() {
                Value.Party.GetMembers().forEach(member => (
                    member.GetCharacter().GetEnemy().SetAuras(...vals)
                ))
                Log.Logf("All enemy auras changed to %s", vals.map(aura => stats.aura.Name(aura)).join(", "))
            }
        }
    }
}))