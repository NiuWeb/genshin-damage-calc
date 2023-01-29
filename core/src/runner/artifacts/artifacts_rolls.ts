import { stats } from "@src/core"
import { SubstatTier } from "@core/scaling"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_artifacts_rolls = RunnerCmd(() => ({
    "show": {
        description: "Shows the rolls of the character artifacts",
        arguments: [],
        compile({ Value, Log }) {
            return function artifact_rolls_show() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                Log.Log("\n" + arts.GetArtifacts().map(art => strings.ArtifactRolls(art)).join("\n"))
            }
        }
    },
    "tier": {
        description: "Sets the rolls tier to equip.`",
        example: "artifact rolls tier avg",
        arguments: ["0 | 1 | 2 | 3 | avg = 4"],
        compile({ Value, Log }, [str]) {
            let tier: number
            let msg: string

            if (str === "avg") {
                tier = SubstatTier.ROLL_AVG
                msg = "AVERAGE"
            } else {
                tier = Math.max(0, Math.min(4, Math.floor(toNumber(str))))
                msg = tier + ""
            }
            return function artifact_rolls_tier() {
                Value.Config.substats.tier = tier
                Log.Logf("Rolls tier set to %s", msg)
            }
        }
    },
    "equip": {
        description:
            "Equips the given rolls to the artifacts." +
            "Arguments in the form `[stat] [rolls] [stat] [rolls] ...`.",
        example: "artifact rolls equip crit_rate 10 crit_dmg 12 elemental_mastery 3",
        compile({ Value, Log }, args) {
            const toequip: [stat: number, value: number][] = []
            for (let i = 0; i < args.length; i += 2) {
                const sname = args[i].toUpperCase()
                const stat = stats.stat.Get(sname)
                const name = stats.stat.Name(stat)
                const strv = args[i + 1]
                if (!strv) {
                    throw Log.Throwf("Missing # of rolls for stat %s", name)
                }
                const val = Math.max(0, Math.floor(toNumber(strv)))
                toequip.push([stat, val])
            }
            return function artifact_rolls_equip() {
                const arts = Value.GetChar().GetArtifacts()
                if (!arts) {
                    throw Log.Throw("Current character has no artifacts")
                }
                const ok = arts.EquipRolls({
                    substats: toequip,
                    tier: Value.Config.substats.tier,
                })
                if (ok) {
                    if (Value.Config.substats.tier === SubstatTier.ROLL_AVG) {
                        Log.Logf("Equipped rolls of tier %s", "AVERAGE")
                    } else {
                        Log.Logf("Equipped rolls of tier %d", Value.Config.substats.tier)
                    }
                } else {
                    Log.Error("Rolls could not be equipped")
                }
            }
        }
    }
}))