import { stats } from "@src/core"
import { SubstatTier } from "@core/scaling"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_artifacts_rolls = RunnerCmd(() => ({
    "show": {
        name: "show",
        description: "Shows the rolls of the character artifacts",
        compile(_, { context, logger }) {
            return function artifact_rolls_show() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                logger.log(
                    "\n" + arts.GetArtifacts()
                        .map(art => strings.ArtifactRolls(art))
                        .join("\n")
                )
            }
        }
    },
    "tier": {
        name: "tier",
        arguments: "tier",
        description: "Sets the rolls tier to equip.`",
        example: "artifact rolls tier 3",
        docs: {
            tier: "a number from 0 to 4, where 0 is the lowest tier and 3 is the highest tier." +
                "Also, the number 4 or the word `avg` can be used to set the tier to the average."
        },
        compile({ values: [str] }, { context, logger }) {
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
                context.Config.substats.tier = tier
                logger.logf("Rolls tier set to %s", msg)
            }
        }
    },
    "equip": {
        name: "equip",
        arguments: "stat rolls more...",
        description:
            "Equips the given rolls to the artifacts." +
            "Arguments in the form `[stat] [rolls] [stat] [rolls] ...`.",
        example: "artifact rolls equip crit_rate 10 crit_dmg 12 elemental_mastery 3",
        compile({ values: args }, { context, logger }) {
            const toequip: [stat: number, value: number][] = []
            for (let i = 0; i < args.length; i += 2) {
                const sname = args[i].toUpperCase()
                const stat = stats.stat.Get(sname)
                const name = stats.stat.Name(stat)
                const strv = args[i + 1]
                if (!strv) {
                    throw new Error("Missing # of rolls for stat " + name)
                }
                const val = Math.max(0, Math.floor(toNumber(strv)))
                toequip.push([stat, val])
            }
            return function artifact_rolls_equip() {
                const arts = context.GetChar().GetArtifacts()
                if (!arts) {
                    throw new Error("Current character has no artifacts")
                }
                const ok = arts.EquipRolls({
                    substats: toequip,
                    tier: context.Config.substats.tier,
                })
                if (ok) {
                    if (context.Config.substats.tier === SubstatTier.ROLL_AVG) {
                        logger.logf("Equipped rolls of tier %s", "AVERAGE")
                    } else {
                        logger.logf("Equipped rolls of tier %d", context.Config.substats.tier)
                    }
                } else {
                    logger.error("Rolls could not be equipped")
                }
            }
        }
    }
}))