import { effect, scaling, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "WandererA1",
    MaxAuras: 1,
    ValidAuras: stats.Swirlable,
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 }, effect: { affected: [stats.stat.PYRO_DMG] } })
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.3)
        .Next()
        .Where({ target: { ascension: 1 }, effect: { affected: [stats.stat.CRYO_DMG] } })
        .stat
        .Char(stats.stat.CRIT_RATE)
        .Values(0.2)
        .Build()
})

export const a4 = effect.Factory({
    Name: "WandererA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .instance
        .Options({
            Name: "HIT_A4",
            Element: stats.stat.ANEMO_DMG,
            Talent: stats.stat.NONE,
            Scaling: [{
                Stat: stats.stat.ATK,
                Initial: 0.35,
                Scaling: scaling.TalentScaling.NONE,
                Talent: stats.stat.NONE,
            }]
        })
        .Build()
})