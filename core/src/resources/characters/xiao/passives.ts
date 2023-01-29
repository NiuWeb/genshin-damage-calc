import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "XiaoA1",
    MaxStacks: 5,
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .stat
        .Char(stats.stat.ALL_DMG)
        .Values(0.05)
        .Stacks()
        .Build()
})

export const a4 = effect.Factory({
    Name: "XiaoA4",
    MaxStacks: 3,
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .stat
        .Char(stats.stat.ELEMENTAL_SKILL_DMG)
        .Values(0.15)
        .Stacks()
        .Build()

})