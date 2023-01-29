import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "KleeA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .stat
        .Char(stats.stat.CHARGED_ATTACK_DMG)
        .Values(0.5)
        .Build()
})
