import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "KleeC1",
    OnApply: new effect.Builder()
        .instance
        .Location("Burst")
        .Options({
            Name: "HIT_C1",
            Element: stats.stat.PYRO_DMG,
            Talent: stats.stat.ELEMENTAL_BURST_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.ELEMENTAL_1,
                    Talent: stats.stat.ELEMENTAL_BURST_LEVEL,
                    Stat: stats.stat.ATK,
                    Initial: 0.4264 * 1.2,
                },
            ],
        })
        .Build()
})

export const c2 = effect.Factory({
    Name: "KleeC2",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Enemy(stats.stat.DEFREDUCTION)
        .Values(0.23)
        .Build()
})

export const c3 = effect.Factory({
    Name: "KleeC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "KleeC4",
    OnApply: new effect.Builder()
        .instance
        .Location("Burst")
        .Options({
            Name: "HIT_C4",
            Element: stats.stat.PYRO_DMG,
            Talent: stats.stat.ELEMENTAL_BURST_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.NONE,
                    Talent: stats.stat.NONE,
                    Stat: stats.stat.ATK,
                    Initial: 5.55,
                },
            ],
        })
        .Build()
})

export const c5 = effect.Factory({
    Name: "KleeC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "KleeC6",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.PYRO_DMG)
        .Build()
})