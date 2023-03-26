import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "MikaA1",
    MaxStacks: 4,
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 1 } })
        .stat
        .Char(stats.stat.PHYSICAL_DMG)
        .Values(0.1)
        .Stacks()
        .Build()
})