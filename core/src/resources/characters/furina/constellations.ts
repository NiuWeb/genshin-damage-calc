import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "FurinaC2",
    MaxStacks: 400,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.HP_PERCENT)
        .Values(0.35 / 100)
        .Stacks()
        .Build()
})

export const c3 = effect.Factory({
    Name: "FurinaC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "FurinaC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "FurinaC6",
    Conditions: ["ARKHE_PNEUMA"],
    MaxConditions: 1,
    OnApply: new effect.Builder()
        .infusion
        .Set(stats.stat.HYDRO_DMG, true)
        .Next()

        .mv
        .Mv(stats.stat.HP, 0.18, /N\d|Charged|Plunge/i)
        .Next()

        .Where({ effect: { conditions: ["ARKHE_PNEUMA"] } })
        .mv
        .Mv(stats.stat.HP, 0.25, /N\d|Charged|Plunge/i)
        .Build()
})