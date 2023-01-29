import { effect, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "RosariaC1",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.NORMAL_ATTACK_DMG)
        .Values(0.1)
        .Build()
})

export const c3 = effect.Factory({
    Name: "RosariaC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "RosariaC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "RosariaC6",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Enemy(stats.stat.PHYSICAL_RES)
        .Values(-0.2)
        .Build()
})