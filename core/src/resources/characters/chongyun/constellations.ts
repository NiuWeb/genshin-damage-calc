import { effect, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "ChongyunC1",
    OnApply: new effect.Builder()
        .instance
        .Basic({
            Name: "HIT_C1",
            Element: stats.stat.CRYO_DMG,
            Stat: stats.stat.ATK,
            Values: [0.5]
        })
        .Build()
})

export const c3 = effect.Factory({
    Name: "ChongyunC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "ChongyunC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "ChongyunC6",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_DMG).
        Values(0.15).
        Build(),
})
