import { effect, stats } from "@src/core"

export const Blackcliff = (Name: string) => effect.Factory({
    Name,
    MaxRank: 5,
    MaxStacks: 3,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.12, 0.15, 0.18, 0.21, 0.24)
        .Stacks()
        .Build()
})