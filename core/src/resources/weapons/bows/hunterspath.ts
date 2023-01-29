import { effect, scaling, stats, weapon } from "@src/core"

export const HuntersPath = weapon.Factory({
    Name: "HuntersPath",
    Stars: 5,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_44b,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "HuntersPath1",
            MaxRank: 5,
            Conditions: ["HIT_CHARGED"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .stat
                .Char(...stats.Elements.filter(s => s !== stats.stat.PHYSICAL_DMG))
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .observe.Target(stats.stat.ELEMENTAL_MASTERY)
                .Where({ effect: { conditions: ["HIT_CHARGED"] } })
                .stat
                .Char(stats.stat.CHARGED_ATTACK_DMG_FLAT)
                .Values(1.6, 2, 2.4, 2.8, 3.2)
                .Map((v, t) => (
                    v * t.GetCharacter().Get(stats.stat.ELEMENTAL_MASTERY)
                ))
                .Build()
        })
    ]
})