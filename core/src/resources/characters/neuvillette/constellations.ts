import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "NeuvilletteC2",
    OnApply(target, _, reg) {
        const a1 = target.FindEffect("NeuvilletteA1")
        if (!a1) {
            throw new Error("NeuvilletteC2: Could not find NeuvilletteA1")
        }

        const charged = target.FindInstance("HIT_CHARGED_2")
        const c6 = target.FindInstance("HIT_CHARGED_C6")
        if (!charged) {
            throw new Error("NeuvilletteC2: Could not find HIT_CHARGED_2")
        }
        if (!c6) {
            throw new Error("NeuvilletteC2: Could not find HIT_CHARGED_C6")
        }

        const mod1 = reg.Modifier(charged.Subject.CreateModifier(stats.stat.CRIT_DMG, 0))
        const mod2 = reg.Modifier(c6.Subject.CreateModifier(stats.stat.CRIT_DMG, 0))

        const update = () => {
            if (target.GetCharacter().GetAscension() < 1) {
                mod1.SetValue(0)
                mod2.SetValue(0)
                return
            }
            const stacks = a1.GetStacks()
            mod1.SetValue(0.14 * stacks)
            mod2.SetValue(0.14 * stacks)
        }

        update()

        reg.Observer(a1.CreateObserver(effect.EffectEvent.CHANGE_STACKS, update))
        reg.Observer(target.GetCharacter().CreateObserver(stats.stat.LEVEL, update))
        reg.Observer(target.GetCharacter().CreateObserver(stats.stat.ASCENSION, update))

        return () => 0
    }
})


export const c3 = effect.Factory({
    Name: "NeuvilletteC3",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.NORMAL_ATTACK_LEVEL_UP)
        .Values(3)
        .Build()
})

export const c5 = effect.Factory({
    Name: "NeuvilletteC5",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .Values(3)
        .Build()
})