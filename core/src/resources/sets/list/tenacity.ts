import { artifact, effect, stats } from "@src/core"

export const TenacityOfTheMillelith = artifact.Set({
    Name: "TenacityOfTheMillelith",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "TenacityOfTheMillelith2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HP_PERCENT)
                .Values(0.2)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "TenacityOfTheMillelith4",
            ApplyOther: true,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.2)
                .Build()
        })
    ]
})
