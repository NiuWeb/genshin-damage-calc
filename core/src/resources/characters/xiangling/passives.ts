import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "XianglingA4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 4 } })
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.1)
        .Build()
})