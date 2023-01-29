import { effect, scaling, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "NoelleC2",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.CHARGED_ATTACK_DMG)
        .Values(0.15)
        .Build()
})

export const c3 = effect.Factory({
    Name: "NoelleC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "NoelleC4",
    OnApply: new effect.Builder()
        .instance
        .Location("Skill")
        .Options({
            Name: "HIT_C4",
            Element: stats.stat.GEO_DMG,
            Talent: stats.stat.ELEMENTAL_SKILL_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.NONE,
                    Talent: stats.stat.NONE,
                    Stat: stats.stat.ATK,
                    Initial: 4,
                },
            ],
        })
        .Build()
})

export const c5 = effect.Factory({
    Name: "NoelleC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "NoelleC6",
    OnApply(tg, _, reg) {
        const char = tg.GetCharacter()
        const qBonus = tg.FindEffect("NoelleQ")
        if (!qBonus) {
            throw new Error("Noelle Q effect not found")
        }
        const mod = reg.Modifier(char.CreateModifier(stats.stat.ATK_FLAT, 0))

        const trigger = () => {
            if (!qBonus.Enabled()) {
                mod.SetValue(0)
            } else {
                mod.SetValue(0.5 * char.Get(stats.stat.DEF))
            }
        }
        trigger()

        reg.Observer(char.CreateObserver(stats.stat.DEF_FLAT, trigger))
        reg.Observer(char.CreateObserver(stats.stat.DEF_PERCENT, trigger))
        reg.Observer(char.CreateObserver(stats.stat.DEF_BASE, trigger))
        reg.Observer(qBonus.CreateObserver(effect.EffectEvent.ENABLE, trigger))
        reg.Observer(qBonus.CreateObserver(effect.EffectEvent.DISABLE, trigger))

        return () => 0
    }
})