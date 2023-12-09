import { artifact, effect, stats } from "@src/core"

export const NighttimeWhispersInTheEchoingWoods = artifact.Set({
    Name: "NighttimeWhispersInTheEchoingWoods",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "NighttimeWhispersInTheEchoingWoods2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.18)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "NighttimeWhispersInTheEchoingWoods4",
            MaxConditions: 2,
            Conditions: ["CAST_SKILL", "CRYSTALLIZE"],
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["CAST_SKILL"] } })
                .stat
                .Char(stats.stat.GEO_DMG)
                .Values(0.2)
                .Next()

                .Where({ effect: { conditions: ["CAST_SKILL", "CRYSTALLIZE"], conditionQuery: "every" } })
                .stat
                .Char(stats.stat.GEO_DMG)
                .Values(0.2 * 1.5)
                .Next()
                .Build()
        })
    ]
})