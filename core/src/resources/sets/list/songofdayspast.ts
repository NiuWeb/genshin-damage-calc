import { artifact, effect, stats } from "@src/core"

export const SongOfDaysPast = artifact.Set({
    Name: "SongOfDaysPast",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "SongOfDaysPast2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HEALING_BONUS)
                .Values(0.15)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "SongOfDaysPast4",
            MaxStacks: 15_000,
            ApplyOther: true,
            MaxTargets: 1,
            OnApply: new effect.Builder()
                .stat
                .Char(
                    stats.stat.NORMAL_ATTACK_DMG_FLAT,
                    stats.stat.CHARGED_ATTACK_DMG_FLAT,
                    stats.stat.PLUNGE_ATTACK_DMG_FLAT,
                    stats.stat.ELEMENTAL_SKILL_DMG_FLAT,
                    stats.stat.ELEMENTAL_BURST_DMG_FLAT,
                )
                .Values(0.08)
                .Stacks()
                .Build()
        })
    ]
})