import { effect, scaling, stats, weapon } from "@src/core"

export const KeyOfKhajNisut = weapon.Factory({
    Name: "KeyOfKhajNisut",
    Stars: 5,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_44b,
    Substat: stats.stat.HP_PERCENT,

    Effects: [
        effect.Factory({
            Name: "KeyOfKhajNisut1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HP_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Build()
        }),
        effect.Factory({
            Name: "KeyOfKhajNisut2",
            MaxRank: 5,
            MaxStacks: 3,
            ApplyOther: true,
            OnApply: new effect.Builder()
                .observe.Owner(stats.stat.HP, stats.stat.HP_PERCENT, stats.stat.HP_FLAT)
                .Where({ target: { isOwner: true } })
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Stacks()
                .Map((x, target) => (
                    x * target.GetCharacter().Get(stats.stat.HP) / 100
                ))
                .Next()

                .observe.Owner(stats.stat.HP, stats.stat.HP_PERCENT, stats.stat.HP_FLAT)
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Stacks(
                    [0, 0, 0, 0.2],
                    [0, 0, 0, 0.25],
                    [0, 0, 0, 0.3],
                    [0, 0, 0, 0.35],
                    [0, 0, 0, 0.4],
                )
                .Map((x, _, { Owner }) => (
                    x * Owner.GetCharacter().Get(stats.stat.HP) / 100
                ))
                .Build()
        }),
    ]
})