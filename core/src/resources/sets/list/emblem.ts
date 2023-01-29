import { artifact, effect, stats } from "@src/core"

export const EmblemOfSeveredFate = artifact.Set({
    Name: "EmblemOfSeveredFate",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "EmblemOfSeveredFate2",
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.ENERGY_RECHARGE).
                Values(0.2).
                Build(),
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "EmblemOfSeveredFate4",
            OnApply: new effect.Builder().
                observe.Target(stats.stat.ENERGY_RECHARGE).
                stat.
                Char(stats.stat.ELEMENTAL_BURST_DMG).
                Values(0.25).
                Map((x, target) => (
                    Math.max(0, Math.min(0.75, x * target.GetCharacter().Get(stats.stat.ENERGY_RECHARGE)))
                )).
                Build(),
        })
    ]
})