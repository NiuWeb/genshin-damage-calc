import { effect, scaling, stats, weapon } from "@src/core"

export const FinaleOfTheDeep = weapon.Factory({
    Name: "FinaleOfTheDeep",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Substat: stats.stat.ATK_PERCENT,
    Scaling: scaling.WeaponScaling.TYPE_44,

    Effects: [
        effect.Factory({
            Name: "FinaleOfTheDeep1",
            MaxRank: 5,
            MaxStacks: 100,
            MaxConditions: 1,
            Conditions: ["CAST_SKILL"],
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["CAST_SKILL"] } })
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .observe.Target(stats.stat.HP_BASE, stats.stat.HP_PERCENT, stats.stat.HP_FLAT)
                .stat
                .Char(stats.stat.ATK_FLAT)
                .Values(0.024, 0.03, 0.036, 0.042, 0.048)
                .Map((x, charbox, ef) => {
                    let atk = x * ef.GetStacks() / 100 * 0.25 * charbox.GetCharacter().Get(stats.stat.HP)
                    atk = Math.min(atk, 150 / 0.024 * x)
                    return atk
                })
                .Build()
        })
    ]
})