import { artifact, effect, stats } from "@src/core"

export const ThunderingFury = artifact.Set({
    Name: "ThunderingFury",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "ThunderingFury2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELECTRO_DMG)
                .Values(0.15)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "ThunderingFury4",
            OnApply: new effect.Builder()
                .stat
                .Char(
                    stats.stat.OVERLOAD_DMG,
                    stats.stat.ELECTROCHARGE_DMG,
                    stats.stat.SUPERCONDUCT_DMG,
                    stats.stat.HYPERBLOOM_DMG
                )
                .Values(0.4)
                .Next()

                .stat
                .Char(stats.stat.AGGRAVATE_DMG)
                .Values(0.2)
                .Build()
        })
    ]
})