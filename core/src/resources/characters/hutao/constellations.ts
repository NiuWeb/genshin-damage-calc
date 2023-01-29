import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "HuTaoC2",
    ApplySelf: true,
    OnApply: new effect.Builder().
        mv.
        Mv(stats.stat.HP, 0.1, "HIT_E").
        Build(),
})

export const c3 = effect.Factory({
    Name: "HuTaoC3",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "HuTaoC4",
    ApplySelf: false,
    ApplyOther: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.CRIT_RATE).
        Values(0.12).
        Build(),
})

export const c5 = effect.Factory({
    Name: "HuTaoC5",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "HuTaoC6",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.CRIT_RATE).
        Values(1).
        Build(),
})