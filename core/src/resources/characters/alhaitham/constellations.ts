import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "AlhaithamC2",
    MaxStacks: 4,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_MASTERY)
        .Values(50)
        .Stacks()
        .Build()
})

export const c3 = effect.Factory({
    Name: "AlhaithamC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "AlhaithamC4",
    MaxStacks: 3,
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ target: { isOwner: true } })
        .stat
        .Char(stats.stat.DENDRO_DMG)
        .Values(0.1)
        .Stacks()
        .Next()

        .Where({ target: { isOwner: false } })
        .stat
        .Char(stats.stat.ELEMENTAL_MASTERY)
        .Values(30)
        .Stacks()

        .Build(),
})


export const c5 = effect.Factory({
    Name: "AlhaithamC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})


export const c6 = effect.Factory({
    Name: "AlhaithamC6",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.CRIT_RATE).
        Values(0.1).
        Next().

        stat.
        Char(stats.stat.CRIT_DMG).
        Values(0.7).
        Build(),
})
