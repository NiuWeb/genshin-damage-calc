import { artifact, effect, stats } from "@src/core"

export const HuskOfOpulentDreams = artifact.Set({
    Name: "HuskOfOpulentDreams",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "HuskOfOpulentDreams2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.DEF_PERCENT)
                .Values(0.3)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "HuskOfOpulentDreams4",
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.DEF_PERCENT, stats.stat.GEO_DMG)
                .Values(0.06)
                .Stacks()
                .Build()
        })
    ]
})