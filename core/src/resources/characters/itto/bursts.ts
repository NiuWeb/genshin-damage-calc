import { effect, scaling, stats } from "@src/core"

export const qBonus = effect.Factory({
    Name: "IttoQ",
    OnApply: new effect.Builder()
        .observe.Target(
            stats.stat.DEF_FLAT,
            stats.stat.DEF_BASE,
            stats.stat.DEF_PERCENT,
            stats.stat.ELEMENTAL_BURST_LEVEL,
            stats.stat.ELEMENTAL_BURST_LEVEL_UP
        )
        .stat
        .Char(stats.stat.ATK_FLAT)
        .Values(...scaling.TalentScaling.ELEMENTAL_1)
        .Rank(tg => tg.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL))
        .Map((v, tg) => (
            0.576 * v * tg.GetCharacter().Get(stats.stat.DEF)
        ))
        .Next()

        .infusion
        .Set(stats.stat.GEO_DMG, true)
        .Build()
})