import { stats } from "@src/core"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_effect = RunnerCmd(() => ({
    "all": {
        description: "List all effects in the party",
        arguments: [],
        compile({ Value, Log }) {
            return function effect_all() {
                Log.Log("\n" + strings.Effect(...Value.Party.GetAllEffects()))
            }
        }
    },
    "list": {
        description: "Lists the effects of the current character",
        arguments: [],
        compile({ Value, Log }) {
            return function effect_list() {
                const char = Value.GetChar()
                const efs = [...char.GetEffects(), ...Value.Party.GetResonances()]
                Log.Log("\n" + strings.Effect(...efs))
            }
        }
    },
    "applied": {
        description: "Lists all the effects in the party that are applied to the current character.",
        arguments: [],
        compile({ Value, Log }) {
            return function effect_applied() {
                const char = Value.GetChar()
                const efs = Value.Party.GetAppliedEffects(char)
                Log.Log("\n" + strings.Effect(...efs))
            }
        }
    },
    "set": {
        description: "Sets the current effect",
        example: "effect set RaidenE",
        arguments: ["name"],
        compile({ Value, Log }, [name]) {
            return function effect_set() {
                const char = Value.GetChar()
                let ef = char.FindEffect(name)
                if (!ef) {
                    ef = Value.Party.GetResonances().find(ef => ef.Options.Name.toLowerCase() === name.toLowerCase())
                }
                if (!ef) {
                    Log.Errorf("Cannot find effect %s", name)
                    return
                }
                Value.SetEffect(ef)
                Log.Logf("Effect set to %s", ef.Options.Name)
            }
        }
    },
    "unset": {
        description: "Unsets the current effect",
        arguments: [],
        compile({ Value, Log }) {
            return function effect_unset() {
                Value.SetEffect(undefined)
                Log.Log("Current effect unset")
            }
        }
    },
    "show": {
        description: "Shows details about the current effect",
        arguments: [],
        compile({ Value, Log }) {
            return function effect_show() {
                const ef = Value.GetEffect()
                Log.Log("\n" + strings.EffectDetail(ef))
            }
        }
    },
    "enable": {
        description: "Enables the current effect",
        arguments: [],
        compile({ Value, Log }) {
            return function effect_enable() {
                const ef = Value.GetEffect()
                ef.Enable()
                Log.Logf("Effect %s enabled", ef.Options.Name)
            }
        }
    },
    "disable": {
        description: "Disables the current effect",
        arguments: [],
        compile({ Value, Log }) {
            return function effect_disable() {
                const ef = Value.GetEffect()
                ef.Disable()
                Log.Logf("Effect %s disabled", ef.Options.Name)
            }
        }
    },
    "apply": {
        description: "Applies the current effect to the given characters, or all",
        example: "effect apply HuTao\neffect apply HuTao Xingqiu\neffect apply all",
        compile({ Value, Log }, names) {
            return function effect_apply() {
                const ef = Value.GetEffect()
                if (names[0] === "all") {
                    for (const member of Value.Party.GetMembers()) {
                        ef.Apply(member)
                    }
                    Log.Logf("Effect %s applied to all members", ef.Options.Name)
                    return
                }
                for (const name of names) {
                    const char = Value.Party.FindMember(name)
                    if (!char) {
                        Log.Errorf("Cannot find target %s", name)
                        return
                    }
                    if (ef.Apply(char)) {
                        Log.Logf("Effect %s applied to target %s", ef.Options.Name, char.GetCharacter().Options.Name)
                    } else {
                        Log.Warnf("Effect %s NOT applied to target %s", ef.Options.Name, char.GetCharacter().Options.Name)
                    }
                }
            }
        }
    },
    "unapply": {
        description: "Unapplies the current effect from the given characters, or all",
        example: "effect apply HuTao\neffect unapply HuTao Xingqiu\neffect unapply all",
        compile({ Value, Log }, names) {
            return function effect_unapply() {
                const ef = Value.GetEffect()
                if (names[0] === "all") {
                    for (const member of Value.Party.GetMembers()) {
                        ef.Unapply(member)
                    }
                    Log.Logf("Effect %s unapplied from all members", ef.Options.Name)
                    return
                }
                for (const name of names) {
                    const char = Value.Party.FindMember(name)
                    if (!char) {
                        Log.Errorf("Cannot find target %s", name)
                        return
                    }
                    if (ef.Unapply(char)) {
                        Log.Logf("Effect %s unapplied from target %s", ef.Options.Name, char.GetCharacter().Options.Name)
                    } else {
                        Log.Warnf("Effect %s NOT unapplied from target %s", ef.Options.Name, char.GetCharacter().Options.Name)
                    }
                }
            }
        }
    },
    "lock": {
        description:
            "Locks the effect to prevent being modified by character stat changes.\n\n" +
            "This will disable all the effect observers for the provided character.\n\n" +
            "Note that enabling the effect again will re-activate all the observers again.",
        example:
            "effect set HuTaoE\n" +
            "effect enable\n" +
            "effect lock HuTao\n" +
            "character level 1\n" +
            "// this code will lock the HP to ATK conversion of Hu Tao to prevent it from changing",

        arguments: ["character"],

        compile({ Value, Log }, [name]) {
            return function effect_lock() {
                const effect = Value.GetEffect()
                const member = Value.Party.FindMember(name)
                if (!member) {
                    Log.Errorf("Cannot find character %s in the party", name)
                    return
                }
                effect.Lock(member)
                Log.Logf(
                    "Effect %s locked for character %s. Note that enabling the effect again will re-activate all the observers again.",
                    effect.Options.Name,
                    member.GetCharacter().Options.Name,
                )
            }
        }
    },
    "stacks": {
        description: "Sets the current effect's stacks",
        example: "effect stacks 9",
        arguments: ["stacks"],
        compile({ Value, Log }, [strval]) {
            const stacks = toNumber(strval)
            return function effect_stacks() {
                const ef = Value.GetEffect()
                ef.SetStacks(stacks)
                Log.Logf("Effect stacks set to %f", ef.GetStacks())
            }
        }
    },
    "condition": {
        description: "Sets the current effect's condition (s)",
        example: "effect condition near\neffect condition far\neffect condition // this removes all conditions",
        compile({ Value, Log }, conditions) {
            return function effect_condition() {
                const ef = Value.GetEffect()
                ef.SetConditions(...conditions)
                const end = ef.GetConditions()
                Log.Logf("Effect conditions set to [" + "%s".repeat(end.length) + "]", ...end)
            }
        }
    },
    "aura": {
        description: "Sets the current effect's applied aura (s), or all",
        example: "effect aura frozen\neffect aura hydro electro\neffect aura // this removes all auras\neffect aura all // this applies all auras",
        compile({ Value, Log }, auras) {
            return function effect_auras() {
                const ef = Value.GetEffect()
                const vals = (auras.length > 0 && auras[0].match(/all/i)) ? (
                    stats.aura.Values().filter(s => s !== stats.aura.NONE)
                ) : (
                    auras.map(name => stats.aura.Get(name.toUpperCase()))
                )
                ef.SetAuras(...vals)
                const end = ef.GetAuras().map(s => stats.aura.Name(s))
                Log.Logf("Effect auras set to [" + "%s".repeat(end.length) + "]", ...end)
            }
        }
    },
    "details": {
        description: "Shows the registered modifiers of the current effect",
        arguments: [],
        compile({ Value, Log }) {
            return function effect_details() {
                const ef = Value.GetEffect()
                Log.Log("\n" + ef.Register())
            }
        }
    }
}))