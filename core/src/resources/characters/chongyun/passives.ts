import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "ChongyunA4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .stat
        .Enemy(stats.stat.CRYO_RES)
        .Values(-0.1)
        .Build()
})