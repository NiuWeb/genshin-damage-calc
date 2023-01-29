import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "GorouA1",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 1 } })
        .stat
        .Char(stats.stat.DEF_PERCENT)
        .Values(0.25)
        .Build()
})

export const a4 = effect.Factory({
    Name: "GorouA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .mv
        .Mv(stats.stat.DEF, 1.56, "HIT_E")
        .Next()

        .Where({ target: { ascension: 4 } })
        .mv
        .Mv(stats.stat.DEF, 0.156, "HIT_Q", "HIT_Q_DOT")
        .Next()
        .Build()
})