import { effect, stats } from "@src/core"
import { countGeos } from "./count-geos"

export const c3 = effect.Factory({
    Name: "GorouC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
export const c5 = effect.Factory({
    Name: "GorouC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})
export const c6 = effect.Factory({
    Name: "GorouC6",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Party(true)
        .stat
        .Char(stats.stat.GEO_CRIT_DMG)
        .Values(0.1, 0.2, 0.4)
        .Rank(tg => countGeos(tg))

        .Build()
})