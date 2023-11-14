import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_rotation = RunnerCmd(() => ({
    "clear": {
        name: "clear",
        description: "Clears all the rotation actions",
        compile(_, { context, logger }) {
            return function rotation_clear() {
                context.Rotation.Clear()
                logger.log("Rotation cleared")
            }
        }
    },
    "run": {
        name: "run",
        description: "Runs the rotation",
        compile(_, { context, logger }) {
            return function rotation_run() {
                logger.warn("Running rotation...")
                context.Rotation.SetCharacters(...context.Party.GetMembers())
                const damage = context.Rotation.Run()
                logger.logf("Rotation damage: %d", damage)
            }
        }
    },
    "log": {
        name: "log",
        description: "Controls rotation logs",
        children: {
            "enable": {
                name: "enable",
                description: "Enables the rotation logs",
                compile(_, { context, logger }) {
                    return function rotation_log_enable() {
                        context.Rotation.Log = logger
                        logger.log("Rotation log enabled")
                    }
                }
            },
            "disable": {
                name: "disable",
                description: "Disables the rotation logs",
                compile(_, { context, logger }) {
                    return function rotation_log_disable() {
                        context.Rotation.Log = undefined
                        logger.log("Rotation log disabled")
                    }
                }
            },
        }
    },
    "summary": {
        name: "summary",
        description: "Prints a summary of the last rotation run",
        compile(_, { context, logger }) {
            return function rotation_summary() {
                logger.log("\n" + strings.Rotation(context.Rotation.GetSummary()))
            }
        }
    },
    "hit": {
        name: "hit",
        arguments: "charname hitname [aura=] [reaction=] multipliers...",
        description: "Adds a hit to the rotation.",
        example:
            "rotation hit Hutao Charged *9 // 9 charged attacks from Hu Tao\n" +
            "rotation hit Hutao N1 aura=90% reaction=40% // hutao normal attack 1 with 90% aura and 40% reaction uptime",
        docs: {
            charname: "the name of the character",
            hitname: "the name of the hit, without the prefix `hit_`",
            aura: "the aura uptime, where `0 <= x <= 1`",
            reaction: "the reaction uptime, where `0 <= x <= aura`",
            multipliers: "a multiplier in the form `*3`, `*0.5`, etc.",
        },
        compile({ values: [charname, hitname, ...multipliers], named }, { context, logger }) {
            hitname = "HIT_" + hitname
            let multiplier = 1
            const aura = toNumber(named["aura"] ?? 1)
            const reaction = toNumber(named["reaction"] ?? 1)

            multipliers.forEach(param => {
                const multiplier_match = param.match(MULTIPLIER_EXP)
                if (!multiplier_match) {
                    return
                }
                const value = toNumber(multiplier_match[1])
                multiplier *= value
            })

            const line = logger.line

            return function rotation_hit() {
                context.Rotation.AddHit(charname, hitname, multiplier, reaction, aura, line)
                logger.logf("Added hit %s (%s) to rotation with multiplier=%.2f, aura=%.2f, reaction=%.2f",
                    hitname,
                    charname,
                    multiplier,
                    reaction,
                    aura,
                )
            }
        }
    },
    "do": {
        name: "do",
        arguments: "[*=] commands...",
        docs: {
            commands: "a list of commands to be executed as a rotation action",
        },
        description: "Saves a command to be executed as a rotation action.",
        example: "rotation do effect stacks 9",
        compile({ parts }, { context, logger }) {
            const line = logger.line
            const cmd = context.GetCompiler().compileString(
                parts.join(" "),
                { line }
            )

            return function rotation_do() {
                context.Rotation.AddFn(cmd, line)
                logger.logf("Added action to rotation: `%s`", parts.join(" "))
            }
        }
    },
    "duration": {
        name: "duration",
        arguments: "duration",
        description: "Sets the rotation duration, in seconds.",
        example: "rotation duration 22 // 22 seconds",
        compile({ values: [duration] }, { context, logger }) {
            const t = toNumber(duration)
            return function rotation_duration() {
                context.Rotation.Duration = t
                logger.logf("Rotation duration set to %.2f seconds.", t)
            }
        }
    }
}))

const MULTIPLIER_EXP = /^\*([0-9]+(?:\.[0-9]+)?%?)$/i