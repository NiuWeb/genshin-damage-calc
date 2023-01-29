import { effect, scaling, stats, weapon } from "@src/core"

export const LightOfFoliarIncision = weapon.Factory({
    Name: "LightOfFoliarIncision",
    Stars: 5,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_44b,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "LightOfFoliarIncision1",
            MaxRank: 5,
            Conditions: ["HIT_NORMAL"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.CRIT_RATE)
                .Values(0.04, 0.05, 0.06, 0.07, 0.08)
                .Next()

                .observe.Target(stats.stat.ELEMENTAL_MASTERY)
                .Where({ effect: { conditions: ["HIT_NORMAL"] } })
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG_FLAT, stats.stat.ELEMENTAL_SKILL_DMG_FLAT)
                .Values(1.2, 1.5, 1.8, 2.1, 2.4)
                .Map((x, target) => (
                    x * target.GetCharacter().Get(stats.stat.ELEMENTAL_MASTERY)
                ))
                .Build()
        })
    ]
})