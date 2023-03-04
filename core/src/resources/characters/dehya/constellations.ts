import { effect, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "DehyaC1",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.HP_PERCENT)
        .Values(0.2)
        .Next()

        .mv
        .Mv(stats.stat.HP, 0.036, ins => ins.Options.Talent === stats.stat.ELEMENTAL_SKILL_DMG)
        .Next()

        .mv
        .Mv(stats.stat.HP, 0.06, ins => ins.Options.Talent === stats.stat.ELEMENTAL_BURST_DMG)

        .Build()
})

export const c2 = effect.Factory({
    Name: "DehyaC2",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ALL_DMG)
        .Instance("HIT_E_DOT")
        .Values(0.5)
        .Build()
})


export const c3 = effect.Factory({
    Name: "DehyaC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "DehyaC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "DehyaC6",
    MaxStacks: 4,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_BURST_CRIT_RATE)
        .Values(0.1)
        .Next()

        .stat
        .Char(stats.stat.ELEMENTAL_BURST_CRIT_DMG)
        .Values(0.15)
        .Stacks()
        .Build()
})