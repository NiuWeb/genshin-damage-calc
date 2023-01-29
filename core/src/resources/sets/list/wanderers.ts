import { artifact, effect, stats } from "@src/core"

export const WanderersTroupe = artifact.Set({
    Name: "WanderersTroupe",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "WanderersTroupe2",
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.ELEMENTAL_MASTERY).
                Values(80).
                Build(),
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "WanderersTroupe4",
            OnApply: new effect.Builder().
                stat.
                Where({ target: { weapon: [stats.weapon.BOW, stats.weapon.CATALYST] } }).
                Char(stats.stat.CHARGED_ATTACK_DMG).
                Values(0.35).
                Build(),
        })
    ]
})