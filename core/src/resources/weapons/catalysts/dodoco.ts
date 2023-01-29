import { effect, scaling, stats, weapon } from "@src/core"

export const DodocoTales = weapon.Factory({
    Name: "DodocoTales",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "DodocoTales1",
            MaxRank: 5,
            Conditions: ["HIT_NORMAL", "HIT_CHARGED"],
            MaxConditions: 2,
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["HIT_NORMAL"] } })
                .stat
                .Char(stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.16, 0.20, 0.24, 0.28, 0.32)
                .Next()

                .Where({ effect: { conditions: ["HIT_CHARGED"] } })
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.08, 0.10, 0.12, 0.14, 0.16)
                .Next()

                .Build()
        })
    ]
})