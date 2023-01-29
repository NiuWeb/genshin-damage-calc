import { effect, scaling, stats, weapon } from "@src/core"

export const EngulfingLightning = weapon.Factory({
    Name: "EngulfingLightning",
    Stars: 5,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "EngulfingLightning1",
            MaxRank: 5,
            Conditions: ["CAST_BURST", "NO_BURST"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .observe.Target(stats.stat.ENERGY_RECHARGE)
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.28, 0.35, 0.42, 0.49, 0.56)
                .Map((value, target, effect) => (
                    calculate(value, target.GetCharacter().Get(stats.stat.ENERGY_RECHARGE), effect.GetRank())
                ))
                .Next()

                .Where({ effect: { conditions: ["CAST_BURST"] } })
                .stat
                .Char(stats.stat.ENERGY_RECHARGE)
                .Values(0.30, 0.35, 0.40, 0.45, 0.50)

                .Build()
        })
    ]
})

function calculate(value: number, er: number, rank: number): number {
    return Math.min(value * Math.max(0, er - 1), maxValues[rank - 1])
}
const maxValues = [0.8, 0.9, 1, 1.1, 1.2]