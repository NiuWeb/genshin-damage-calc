import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "ChevreuseA1",
    Conditions: ["HIT_OVERLOAD"],
    ApplyOther: true,
    MaxConditions: 1,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 1 }, effect: { conditions: ["HIT_OVERLOAD"] } })
        .stat
        .Enemy(stats.stat.PYRO_RES, stats.stat.ELECTRO_RES)
        .Values(-0.4)
        .Build()
})

export const a4 = effect.Factory({
    Name: "ChevreuseA4",
    ApplyOther: true,
    MaxConditions: 1,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 4 }, target: { element: [stats.stat.PYRO_DMG, stats.stat.ELECTRO_DMG] } })
        .observe.Owner(stats.stat.HP_BASE, stats.stat.HP_PERCENT, stats.stat.HP_FLAT)
        .stat
        .Enemy(stats.stat.ATK_PERCENT)
        .Values(1 / 100)
        .Map((value, _, ef) => {
            const owner = ef.Owner
            const hp = owner.GetCharacter().Get(stats.stat.HP)
            return Math.min(value * hp / 1000, 0.4)
        })
        .Build()
})