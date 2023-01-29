import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "KazuhaC2",
    ApplyOther: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_MASTERY).
        Values(200).
        Build(),
})
export const c3 = effect.Factory({
    Name: "KazuhaC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
export const c5 = effect.Factory({
    Name: "KazuhaC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})
export const c6 = effect.Factory({
    Name: "KazuhaC6",
    OnApply: new effect.Builder()
        .infusion
        .Set(stats.stat.ANEMO_DMG, false)
        .Build(),
})