import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "BeidouA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .stat
        .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
        .Values(0.15)
        .Build()
})