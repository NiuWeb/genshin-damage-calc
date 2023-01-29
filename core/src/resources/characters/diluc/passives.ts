import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "DilucA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .stat
        .Char(stats.stat.PYRO_DMG)
        .Values(0.2)
        .Build()
})