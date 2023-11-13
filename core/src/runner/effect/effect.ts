import { stats } from "@src/core"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_effect = RunnerCmd(() => ({
    "all": {
        name: "all",
        description: "List all effects in the party",
        compile(_, { context, logger }) {
            return function effect_all() {
                logger.log("\n" + strings.Effect(...context.Party.GetAllEffects()))
            }
        }
    },
    "list": {
        name: "list",
        description: "Lists the effects of the current character",
        compile(_, { context, logger }) {
            return function effect_list() {
                const char = context.GetChar()
                const efs = [...char.GetEffects(), ...context.Party.GetResonances()]
                logger.log("\n" + strings.Effect(...efs))
            }
        }
    },
    "applied": {
        name: "applied",
        description: "Lists all the effects in the party that are applied to the current character.",
        compile(_, { context, logger }) {
            return function effect_applied() {
                const char = context.GetChar()
                const efs = context.Party.GetAppliedEffects(char)
                logger.log("\n" + strings.Effect(...efs))
            }
        }
    },
    "set": {
        name: "set",
        description: "Sets the current effect",
        example: "effect set RaidenE",
        arguments: "name",
        compile({ values: [name] }, { context, logger }) {
            return function effect_set() {
                const char = context.GetChar()
                let ef = char.FindEffect(name)
                if (!ef) {
                    ef = context.Party.GetResonances().find(ef => ef.Options.Name.toLowerCase() === name.toLowerCase())
                }
                if (!ef) {
                    logger.errorf("Cannot find effect %s", name)
                    return
                }
                context.SetEffect(ef)
                logger.logf("Effect set to %s", ef.Options.Name)
            }
        }
    },
    "unset": {
        name: "unset",
        description: "Unsets the current effect",
        compile(_, { context, logger }) {
            return function effect_unset() {
                context.SetEffect(undefined)
                logger.log("Current effect unset")
            }
        }
    },
    "show": {
        name: "show",
        description: "Shows details about the current effect",
        compile(_, { context, logger }) {
            return function effect_show() {
                const ef = context.GetEffect()
                logger.log("\n" + strings.EffectDetail(ef))
            }
        }
    },
    "enable": {
        name: "enable",
        description: "Enables the current effect",
        compile(_, { context, logger }) {
            return function effect_enable() {
                const ef = context.GetEffect()
                ef.Enable()
                logger.logf("Effect %s enabled", ef.Options.Name)
            }
        }
    },
    "disable": {
        name: "disable",
        description: "Disables the current effect",
        compile(_, { context, logger }) {
            return function effect_disable() {
                const ef = context.GetEffect()
                ef.Disable()
                logger.logf("Effect %s disabled", ef.Options.Name)
            }
        }
    },
    "apply": {
        name: "apply",
        arguments: "characters...",
        description: "Applies the current effect to the given characters, or all",
        example: "effect apply HuTao\neffect apply HuTao Xingqiu\neffect apply all",
        compile({ values: names }, { context, logger }) {
            return function effect_apply() {
                const ef = context.GetEffect()
                if (names[0] === "all") {
                    for (const member of context.Party.GetMembers()) {
                        ef.Apply(member)
                    }
                    logger.logf("Effect %s applied to all members", ef.Options.Name)
                    return
                }
                for (const name of names) {
                    const char = context.Party.FindMember(name)
                    if (!char) {
                        logger.errorf("Cannot find target %s", name)
                        return
                    }
                    if (ef.Apply(char)) {
                        logger.logf("Effect %s applied to target %s", ef.Options.Name, char.GetCharacter().Options.Name)
                    } else {
                        logger.warnf("Effect %s NOT applied to target %s", ef.Options.Name, char.GetCharacter().Options.Name)
                    }
                }
            }
        }
    },
    "unapply": {
        name: "unapply",
        arguments: "characters...",
        description: "Unapplies the current effect from the given characters, or all",
        example: "effect apply HuTao\neffect unapply HuTao Xingqiu\neffect unapply all",
        compile({ values: names }, { context, logger }) {
            return function effect_unapply() {
                const ef = context.GetEffect()
                if (names[0] === "all") {
                    for (const member of context.Party.GetMembers()) {
                        ef.Unapply(member)
                    }
                    logger.logf("Effect %s unapplied from all members", ef.Options.Name)
                    return
                }
                for (const name of names) {
                    const char = context.Party.FindMember(name)
                    if (!char) {
                        logger.errorf("Cannot find target %s", name)
                        return
                    }
                    if (ef.Unapply(char)) {
                        logger.logf("Effect %s unapplied from target %s", ef.Options.Name, char.GetCharacter().Options.Name)
                    } else {
                        logger.warnf("Effect %s NOT unapplied from target %s", ef.Options.Name, char.GetCharacter().Options.Name)
                    }
                }
            }
        }
    },
    "lock": {
        name: "lock",
        arguments: "characters",
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

        compile({ values: [name] }, { context, logger }) {
            return function effect_lock() {
                const effect = context.GetEffect()
                const member = context.Party.FindMember(name)
                if (!member) {
                    logger.errorf("Cannot find character %s in the party", name)
                    return
                }
                effect.Lock(member)
                logger.logf(
                    "Effect %s locked for character %s. Note that enabling the effect again will re-activate all the observers again.",
                    effect.Options.Name,
                    member.GetCharacter().Options.Name,
                )
            }
        }
    },
    "stacks": {
        name: "stacks",
        description: "Sets the current effect's stacks",
        example: "effect stacks 9",
        arguments: "stacks",
        compile({ values: [strval] }, { context, logger }) {
            const stacks = toNumber(strval)
            return function effect_stacks() {
                const ef = context.GetEffect()
                ef.SetStacks(stacks)
                logger.logf("Effect stacks set to %f", ef.GetStacks())
            }
        }
    },
    "condition": {
        name: "condition",
        arguments: "conditions...",
        description: "Sets the current effect's condition (s)",
        example: "effect condition near\neffect condition far\neffect condition // this removes all conditions",
        compile({ values }, { context, logger }) {
            return function effect_condition() {
                const ef = context.GetEffect()
                ef.SetConditions(...values)
                const end = ef.GetConditions()
                logger.logf("Effect conditions set to [" + "%s".repeat(end.length) + "]", ...end)
            }
        }
    },
    "aura": {
        name: "aura",
        arguments: "auras...",
        description: "Sets the current effect's applied aura (s), or all",
        example: "effect aura frozen\neffect aura hydro electro\neffect aura // this removes all auras\neffect aura all // this applies all auras",
        compile({ values: auras }, { context, logger }) {
            return function effect_auras() {
                const ef = context.GetEffect()
                const vals = (auras.length > 0 && auras[0].match(/all/i)) ? (
                    stats.aura.Values().filter(s => s !== stats.aura.NONE)
                ) : (
                    auras.map(name => stats.aura.Get(name.toUpperCase()))
                )
                ef.SetAuras(...vals)
                const end = ef.GetAuras().map(s => stats.aura.Name(s))
                logger.logf("Effect auras set to [" + "%s".repeat(end.length) + "]", ...end)
            }
        }
    },
    "details": {
        name: "details",
        description: "Shows the registered modifiers of the current effect",
        compile(_, { context, logger }) {
            return function effect_details() {
                const ef = context.GetEffect()
                logger.log("\n" + ef.Register())
            }
        }
    }
}))