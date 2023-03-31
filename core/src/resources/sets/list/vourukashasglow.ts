import { artifact, effect, stats } from "@src/core"

export const VourukashasGlow = artifact.Set({
    Name: "VourukashasGlow",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "VourukashasGlow2",
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.HP_PERCENT).
                Values(0.2)
                .Build()
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "VourukashasGlow4",
            MaxStacks: 5,
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.ELEMENTAL_SKILL_DMG).
                Values(0.1).
                Next().

                stat.
                Char(stats.stat.ELEMENTAL_BURST_DMG).
                Values(0.1).
                Next().

                stat.
                Char(stats.stat.ELEMENTAL_SKILL_DMG).
                Values(0.08).
                Stacks().
                Next().

                stat.
                Char(stats.stat.ELEMENTAL_BURST_DMG).
                Values(0.08).
                Stacks().
                Next().

                Build()
        })
    ]
})