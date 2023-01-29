import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "XingqiuC2",
    ApplySelf: true,
    ApplyOther: true,
    OnApply: new effect.Builder().
        stat.
        Enemy(stats.stat.HYDRO_RES).
        Values(-0.15).
        Build(),
})

export const c3 = effect.Factory({
    Name: "XingqiuC3",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "XingqiuC4",
    ApplySelf: true,
    OnApply: new effect.Builder().
        mv.
        Multiplier(1.5, /^HIT_E_/i).
        Build(),
})

export const c5 = effect.Factory({
    Name: "XingqiuC5",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
