import { effect, stats } from "@src/core"

export const GoldenMajesty = (Name: string) => effect.Factory({
    Name,
    MaxRank: 5,
    MaxStacks: 5,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.04, 0.05, 0.06, 0.07, 0.08)
        .Stacks()
        .Next()

        .Where({ target: { shielded: true } })
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.04, 0.05, 0.06, 0.07, 0.08)
        .Stacks()
        .Build()
})