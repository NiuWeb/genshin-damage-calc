import { effect, scaling, stats, weapon } from "@src/core"

export const MistsplitterReforged = weapon.Factory({
    Name: "MistsplitterReforged",
    Stars: 5,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_48,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "MistsplitterReforged1",
            MaxRank: 5,
            MaxStacks: 3,
            OnApply: new effect.Builder()
                .stat
                .Char(...stats.Elements.filter(s => s !== stats.stat.PHYSICAL_DMG))
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .stat
                .Char()
                .MapStat(target => [target.GetCharacter().Options.Element])
                .Stacks(
                    [0, 0.08, 0.16, 0.28],
                    [0, 0.10, 0.20, 0.35],
                    [0, 0.12, 0.24, 0.42],
                    [0, 0.14, 0.28, 0.49],
                    [0, 0.16, 0.32, 0.56]
                )
                .Build()
        })
    ]
})