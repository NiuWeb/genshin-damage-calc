import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "SucroseA1",
    ApplySelf: false,
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 1 } })
        .stat
        .Char(stats.stat.ELEMENTAL_MASTERY)
        .Values(50)
        .Build()
})

export const a4 = effect.Factory({
    Name: "SucroseA4",
    ApplySelf: false,
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(stats.stat.ELEMENTAL_MASTERY)
        .Where({ owner: { ascension: 1 } })
        .stat
        .Char(stats.stat.ELEMENTAL_MASTERY)
        .Values(0.2)
        .Map((v, _, ef) => (
            v * ef.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_MASTERY)
        ))
        .Build()
})