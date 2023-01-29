import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "AyatoC1",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ALL_DMG)
        .Instance(/HIT_N\d_E/i)
        .Values(0.4)
        .Build()
})

export const c2 = effect.Factory({
    Name: "AyatoC2",
    OnApply(tg, _, reg) {
        const eBonus = tg.FindEffect("AyatoE")
        if (!eBonus) {
            throw new Error("Cannot find Ayato Skill")
        }
        const mod = reg.Modifier(tg.GetCharacter().CreateModifier(stats.stat.HP_PERCENT, 0))

        const trigger = function () {
            if (eBonus.GetStacks() >= 3) {
                mod.SetValue(0.5)
            } else {
                mod.SetValue(0)
            }
        }
        trigger()

        reg.Observer(eBonus.CreateObserver(effect.EffectEvent.CHANGE_STACKS, trigger))
        return () => 0
    }
})

export const c3 = effect.Factory({
    Name: "AyatoC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
export const c5 = effect.Factory({
    Name: "AyatoC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "AyatoC6",
    OnApply: new effect.Builder()
        .instance
        .Location("Skill")
        .Options({
            Name: "HIT_C6",
            Element: stats.stat.HYDRO_DMG,
            Talent: stats.stat.NORMAL_ATTACK_DMG,
            Scaling: [{
                Scaling: scaling.TalentScaling.NONE,
                Talent: stats.stat.NONE,
                Stat: stats.stat.ATK,
                Initial: 4.5
            }]
        })
        .Build()
})