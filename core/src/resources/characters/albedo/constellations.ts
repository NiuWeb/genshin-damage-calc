import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "AlbedoC2",
    MaxStacks: 4,
    OnApply: new effect.Builder()
        .mv
        .Mv(stats.stat.DEF, 0.3, /HIT_Q/i)
        .Map((v, _, ef) => (
            v * ef.GetStacks()
        ))
        .Build()
})

export const c3 = effect.Factory({
    Name: "AlbedoC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "AlbedoC4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.PLUNGE_ATTACK_DMG)
        .Values(0.3)
        .Build()
})

export const c5 = effect.Factory({
    Name: "AlbedoC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})


export const c6 = effect.Factory({
    Name: "AlbedoC6",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ target: { shielded: true } })
        .stat
        .Char(stats.stat.ALL_DMG)
        .Values(0.17)
        .Build()
})