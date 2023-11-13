import { stats } from "@src/core"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_enemy = RunnerCmd(() => ({
    "show": {
        name: "show",
        description: "Shows all the enemies",
        compile(_, { context, logger }) {
            return function enemy_show() {
                const members = context.Party.GetMembers()
                const enemies = members.map(mem => mem.GetCharacter().GetEnemy())
                logger.logf("\n" + strings.Enemy(...enemies))
            }
        }
    },
    "level": {
        name: "level",
        description: "Sets the level of all enemies",
        example: "enemy level 100",
        arguments: "level",
        compile({ values: [strval] }, { context, logger }) {
            const level = toNumber(strval)
            return function enemy_level() {
                context.Party.GetMembers().forEach(member => (
                    member.GetCharacter().GetEnemy().SetLevel(level)
                ))
                logger.logf("All enemy levels changed to %d", level)
            }
        }
    },
    "aura": {
        name: "aura",
        arguments: "auras...",
        description: "Sets enemies applied aura (s), or all",
        example: "enemy aura frozen\nenemy aura hydro electro\nenemy aura // this removes all auras\nenemy aura all // this applies all auras",
        compile({ values: auras }, { context, logger }) {
            const vals = (auras.length > 0 && auras[0].match(/all/i)) ? (
                stats.aura.Values().filter(s => s !== stats.aura.NONE)
            ) : (
                auras.map(name => stats.aura.Get(name.toUpperCase()))
            )
            return function enemy_aura() {
                context.Party.GetMembers().forEach(member => (
                    member.GetCharacter().GetEnemy().SetAuras(...vals)
                ))
                logger.logf("All enemy auras changed to %s", vals.map(aura => stats.aura.Name(aura)).join(", "))
            }
        }
    }
}))