import { effect, scaling, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "ChevreuseC2",
    OnApply: new effect.Builder()
        .instance
        .Options({
            Name: "HIT_C2",
            Element: stats.stat.PYRO_DMG,
            Talent: stats.stat.ELEMENTAL_SKILL_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.NONE,
                    Stat: stats.stat.ATK,
                    Initial: 1.2,
                    Talent: stats.stat.NONE,
                },
            ],
        })
        .Build()
})


export const c3 = effect.Factory({
    Name: "ChevreuseC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "ChevreuseC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "ChevreuseC6",
    ApplyOther: true,
    MaxStacks: 3,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.PYRO_DMG, stats.stat.ELECTRO_DMG)
        .Values(0.2)
        .Stacks()
        .Build()
})