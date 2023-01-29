import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "RaidenA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .observe.Target(stats.stat.ENERGY_RECHARGE)
        .stat
        .Char(stats.stat.ELECTRO_DMG)
        .Values(0.4)
        .Map((x, target) => (
            x * Math.max(0, target.GetCharacter().Get(stats.stat.ENERGY_RECHARGE) - 1)
        ))
        .Build()
})