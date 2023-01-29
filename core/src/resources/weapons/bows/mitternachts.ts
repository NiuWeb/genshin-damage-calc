import { effect, scaling, stats, weapon } from "@src/core"

export const MitternachtsWaltz = weapon.Factory({
    Name: "MitternachtsWaltz",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.PHYSICAL_DMG,

    Effects: [
        effect.Factory({
            Name: "MitternachtsWaltz1",
            MaxRank: 5,
            Conditions: ["HIT_NORMAL", "HIT_SKILL"],
            MaxConditions: 2,
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["HIT_NORMAL"] } })
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Next()

                .Where({ effect: { conditions: ["HIT_SKILL"] } })
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                
                .Build()
        })
    ]
})