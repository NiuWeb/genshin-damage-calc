import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "ColleiC1",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ENERGY_RECHARGE)
        .Values(0.2)
        .Build()
})

export const c3 = effect.Factory({
    Name: "ColleiC3",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "ColleiC4",
    ApplyOther: true,
    ApplySelf: false,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_MASTERY)
        .Values(60)
        .Build()
})

export const c5 = effect.Factory({
    Name: "ColleiC5",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "ColleiC6",
    OnApply: new effect.Builder()
        .instance
        .Location("Skill")
        .Options({
            Name: "HIT_C6",
            Element: stats.stat.DENDRO_DMG,
            Talent: stats.stat.ELEMENTAL_SKILL_DMG,
            Scaling: [
                {
                    Stat: stats.stat.ATK,
                    Scaling: scaling.TalentScaling.NONE,
                    Talent: stats.stat.NONE,
                    Initial: 2
                }
            ]
        })
        .Build()
})