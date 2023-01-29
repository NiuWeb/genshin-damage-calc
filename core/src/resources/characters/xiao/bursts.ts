import { effect, scaling, stats } from "@src/core"

export const qBonus = effect.Factory({
    Name: "XiaoQ",
    OnApply: new effect.Builder()
        .infusion
        .Set(stats.stat.ANEMO_DMG, true)
        .Next()

        .observe.Target(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .stat
        .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG, stats.stat.PLUNGE_ATTACK_DMG)
        .Values(...scaling.TalentScaling.ELEMENTAL_2)
        .Rank((tg) => (
            tg.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL)
        ))
        .Map((v) => 0.5845 * v)
        .Build()
})