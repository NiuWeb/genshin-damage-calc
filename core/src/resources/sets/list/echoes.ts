import { artifact, effect, stats } from "@src/core"

export const EchoesOfAnOffering = artifact.Set({
    Name: "EchoesOfAnOffering",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "EchoesOfAnOffering2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.18)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "EchoesOfAnOffering4",
            Conditions: ["AVERAGE", "MAXIMUM"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["MAXIMUM"] } })
                .mv
                .Mv(stats.stat.ATK, 0.7, (ins) => ins.Options.Talent === stats.stat.NORMAL_ATTACK_DMG)
                .Next()

                .Where({ effect: { conditions: ["AVERAGE"] } })
                .mv
                .Mv(stats.stat.ATK, 0.7 * 0.502, (ins) => ins.Options.Talent === stats.stat.NORMAL_ATTACK_DMG)

                .Build()
        })
    ]
})