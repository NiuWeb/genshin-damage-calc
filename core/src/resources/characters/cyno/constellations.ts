import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "CynoC2",
    MaxStacks: 5,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELECTRO_DMG)
        .Values(0.1)
        .Stacks()
        .Build()
})

export const c3 = effect.Factory({
    Name: "CynoC3",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "CynoC5",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
