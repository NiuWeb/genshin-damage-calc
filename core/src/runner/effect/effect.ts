import { stats } from "@src/core"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { SplitString2D } from "@src/utils/strlist"
import { RunnerCmd } from "../cmd"

export const cmd_effect = RunnerCmd(() => ({
    "config": {
        name: "config",
        description: "shortcut for all effect configurations (stacks, condition, aura, etc.) in one command",
        arguments: "owner effect [enable=1|0] [stacks=] [condition=] [aura=] [target=] [target_add=] [lock=]",
        docs: {
            owner: "the owner of the effect",
            effect: "the effect name",
            enable: "enable (1) or disable (0) the effect. If not provided, the effect will not be changed",
            stacks: "the effect stacks. If not provided, the effect will not be changed",
            condition: "the effect condition or conditions, separated by commas. If not provided, the effect will not be changed",
            aura: "the effect aura or auras, separated by commas. If not provided, the effect will not be changed",
            target: "the effect target or targets, separated by commas. Also accepts `all`. If not provided, the effect will not be changed",
            target_add: "Similar to `target`, but adds the targets instead of replacing them",
            lock: "If provided, the effect will be locked to prevent being modified by character stat changes. " +
                "Read more about this in the `effect lock` command."
        },
        example: "effect config Yelan YelanQ stacks=9 target=Hutao",
        compile({ values: [ownerName, effectName], named }, { context, logger }) {
            return function effect_config() {
                const owner = context.Party.FindMember(ownerName)
                if (!owner) {
                    logger.errorf("Cannot find owner %s", ownerName)
                    return
                }
                const effect = owner.FindEffect(effectName)

                if (!effect) {
                    logger.errorf("Cannot find effect %s", effectName)
                    return
                }

                const name = effect.Options.Name

                if (named["enable"] !== undefined) {
                    if (named["enable"] === "1") {
                        effect.Enable()
                        logger.logf("Effect %s enabled", name)
                    } else {
                        effect.Disable()
                        logger.logf("Effect %s disabled", name)
                    }
                }

                if (named["stacks"] !== undefined) {
                    const stacks = toNumber(named["stacks"])
                    effect.SetStacks(stacks)
                    logger.logf("Effect %s stacks set to %d", name, effect.GetStacks())
                }

                if (named["condition"] !== undefined) {
                    const conditions = SplitString2D(named["condition"], x => x)[0]
                    effect.SetConditions(...conditions)
                    const end = effect.GetConditions()
                    logger.logf("Effect %s conditions set to [" + "%s".repeat(end.length) + "]", name, ...end)
                }

                if (named["aura"] !== undefined) {
                    const auras = SplitString2D(named["aura"], x => x)[0]
                    const vals = (auras.length > 0 && auras[0].match(/all/i)) ? (
                        stats.aura.Values().filter(s => s !== stats.aura.NONE)
                    ) : (
                        auras.map(name => stats.aura.Get(name.toUpperCase()))
                    )
                    effect.SetAuras(...vals)
                    const end = effect.GetAuras().map(s => stats.aura.Name(s))
                    logger.logf("Effect %s auras set to [" + "%s".repeat(end.length) + "]", name, ...end)
                }

                if (named["target"] !== undefined) {
                    const targets = SplitString2D(named["target"], x => x)[0]
                    if (targets[0] === "all") {
                        for (const member of context.Party.GetMembers()) {
                            effect.Apply(member)
                        }
                        logger.logf("Effect %s applied to all members", name)
                        return
                    }

                    effect.UnapplyAll()

                    for (const name of targets) {
                        const char = context.Party.FindMember(name)
                        if (!char) {
                            logger.errorf("Cannot find target %s", name)
                            return
                        }
                        if (effect.Apply(char)) {
                            logger.logf("Effect %s applied to target %s", name, char.GetCharacter().Options.Name)
                        } else {
                            logger.warnf("Effect %s NOT applied to target %s", name, char.GetCharacter().Options.Name)
                        }
                    }
                }

                if (named["target_add"] !== undefined) {
                    const targets = SplitString2D(named["target_add"], x => x)[0]
                    if (targets[0] === "all") {
                        for (const member of context.Party.GetMembers()) {
                            effect.Apply(member)
                        }
                        logger.logf("Effect %s applied to all members", name)
                        return
                    }

                    for (const name of targets) {
                        const char = context.Party.FindMember(name)
                        if (!char) {
                            logger.errorf("Cannot find target %s", name)
                            return
                        }
                        if (effect.Apply(char)) {
                            logger.logf("Effect %s applied to target %s", name, char.GetCharacter().Options.Name)
                        } else {
                            logger.warnf("Effect %s NOT applied to target %s", name, char.GetCharacter().Options.Name)
                        }
                    }
                }

                if (named["lock"] !== undefined) {
                    const targets = SplitString2D(named["lock"], x => x)[0]
                    if (targets[0] === "all") {
                        for (const member of context.Party.GetMembers()) {
                            effect.Lock(member)
                        }
                        logger.logf("Effect %s locked for all members", name)
                        return
                    }

                    for (const charName of targets) {
                        const char = context.Party.FindMember(charName)
                        if (!char) {
                            logger.errorf("Cannot find target %s", charName)
                            return
                        }
                        effect.Lock(char)
                        logger.logf("Effect %s locked for target %s", charName, char.GetCharacter().Options.Name)
                    }
                }
            }

        }
    },
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