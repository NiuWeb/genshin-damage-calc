import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_rotation = RunnerCmd(() => ({
    "clear": {
        description: "Clears all the rotation actions",
        arguments: [],
        compile({ Value, Log }) {
            return function rotation_clear() {
                Value.Rotation.Clear()
                Log.Log("Rotation cleared")
            }
        }
    },
    "run": {
        description: "Runs the rotation",
        arguments: [],
        compile({ Value, Log }) {
            return function rotation_run() {
                Log.Warn("Running rotation...")
                Value.Rotation.SetCharacters(...Value.Party.GetMembers())
                const damage = Value.Rotation.Run()
                Log.Logf("Rotation damage: %d", damage)
            }
        }
    },
    "log": {
        description: "Controls rotation logs",
        children: {
            "enable": {
                description: "Enables the rotation logs",
                arguments: [],
                compile({ Value, Log }) {
                    return function rotation_log_enable() {
                        Value.Rotation.Log = Log
                        Log.Log("Rotation log enabled")
                    }
                }
            },
            "disable": {
                description: "Disables the rotation logs",
                arguments: [],
                compile({ Value, Log }) {
                    return function rotation_log_disable() {
                        Value.Rotation.Log = undefined
                        Log.Log("Rotation log disabled")
                    }
                }
            },
        }
    },
    "summary": {
        description: "Prints a summary of the last rotation run",
        arguments: [],
        compile({ Value, Log }) {
            return function rotation_summary() {
                Log.Log("\n" + strings.Rotation(Value.Rotation.GetSummary()))
            }
        }
    },
    "hit": {
        description:
            "Adds a hit to the rotation. Arguments in the form:\n" +
            "\t`rotation hit [character_name] [hit_name] [extra...]`.\n\n" +
            "Where `[extra...]` can be one or more of the following:\n" +
            "\t- a multiplier in the form `*3`, `*0.5`, etc.\n" +
            "\t- `aura=x` to set the aura uptime, where `0 <= x <= 1`.\n" +
            "\t- `reaction=x` to set the reaction uptime, where `0 <= x <= aura`.\n\n" +
            "If no values provided for `aura` or `reaction`, they will be set to 1 by default.\n\n" +
            "If `reaction` is greater than `aura`, it will be set to the value of `aura`.\n\n" +
            "DO NOT include the prefix \"hit_\" for the hit name, it will be automatically added.",
        example:
            "rotation hit Hutao Charged *9 // 9 charged attacks from Hu Tao\n" +
            "rotation hit Hutao N1 aura=90% reaction=40% // hutao normal attack 1 with 90% aura and 40% reaction uptime",
        arguments: ["charname", "hitname", "extra..."],
        compile({ Value, Log }, [charname, hitname, ...extra]) {
            hitname = "HIT_" + hitname
            let multiplier = 1
            let aura = 1
            let reaction = 1

            extra.forEach(param => {
                const multiplier_match = param.match(MULTIPLIER_EXP)
                if (multiplier_match) {
                    const value = toNumber(multiplier_match[1])
                    multiplier *= value
                    return
                }
                const param_match = param.match(PARAM_EXP)
                if (param_match) {
                    const key = param_match[1].toLowerCase()
                    const val = toNumber(param_match[2])
                    if (key === "aura") {
                        aura = val
                    } else if (key === "reaction") {
                        reaction = val
                    }
                }
            })

            return function rotation_hit() {
                Value.Rotation.AddHit(charname, hitname, multiplier, reaction, aura, Log.Line)
                Log.Logf("Added hit %s (%s) to rotation with multiplier=%.2f, aura=%.2f, reaction=%.2f",
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
        description: "Saves a command to be executed as a rotation action.",
        example: "rotation do effect stacks 9",
        compile(program, args) {
            const { Value, Log } = program
            const cmd = program.Compile(args, { line: Log.Line })

            return function rotation_do() {
                Value.Rotation.AddFn(cmd, Log.Line)
                Log.Logf("Added action to rotation: `%s`", args.join(" "))
            }
        }
    },
    "duration": {
        description: "Sets the rotation duration, in seconds.",
        example: "rotation duration 22 // 22 seconds",
        compile({ Value, Log }, [duration]) {
            const t = toNumber(duration)
            return function rotation_duration() {
                Value.Rotation.Duration = t
                Log.Logf("Rotation duration set to %.2f seconds.", t)
            }
        }
    }
}))

const MULTIPLIER_EXP = /^\*([0-9]+(?:\.[0-9]+)?%?)$/i
const PARAM_EXP = /^(reaction|aura)=([0-9]+(?:\.[0-9]+)?%?)$/i