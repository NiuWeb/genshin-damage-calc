import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "IttoA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .mv
        .Mv(stats.stat.DEF, 0.35, /Kesagiri/i)
        .Build()
})