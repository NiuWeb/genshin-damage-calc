import { artifact, effect, stats } from "@src/core"

export const FlowerOfParadiseLost = artifact.Set({
    Name: "FlowerOfParadiseLost",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "FlowerOfParadiseLost2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(80)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "FlowerOfParadiseLost4",
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.BLOOM_DMG, stats.stat.HYPERBLOOM_DMG, stats.stat.BURGEON_DMG)
                .Values(0.4)
                .Next()

                .stat
                .Char(stats.stat.BLOOM_DMG, stats.stat.HYPERBLOOM_DMG, stats.stat.BURGEON_DMG)
                .Values(0.4 * 0.25)
                .Stacks()
                .Next()
                .Build()
        })
    ]
})