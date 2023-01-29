import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "RosariaA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .stat
        .Char(stats.stat.CRIT_RATE)
        .Values(0.12)
        .Build()
})

export const a4 = effect.Factory({
    Name: "RosariaA4",
    ApplySelf: false,
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(stats.stat.CRIT_RATE)
        .Where({ owner: { ascension: 4 } })
        .stat
        .Char(stats.stat.CRIT_RATE)
        .Values(0.15)
        .Map((v, _, ef) => (
            Math.max(0, Math.min(1,
                v * ef.Owner.GetCharacter().Get(stats.stat.CRIT_RATE)
            ))
        ))
        .Build()
})