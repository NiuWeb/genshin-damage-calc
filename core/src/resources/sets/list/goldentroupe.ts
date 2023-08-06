import { artifact, effect, stats } from "@src/core"

export const GoldenTroupe = artifact.Set({
    Name: "GoldenTroupe",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "GoldenTroupe2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.2)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "GoldenTroupe4",
            MaxConditions: 1,
            Conditions: ["OFF_FIELD", "ON_FIELD"],
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.25)
                .Next()
                .Where({ effect: { conditions: ["ON_FIELD"] } })
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.25)
                .Build()
        })
    ]
})