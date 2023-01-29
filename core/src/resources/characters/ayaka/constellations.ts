import { effect, scaling, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "AyakaC2",
    OnApply: new effect.Builder()
        .instance
        .Location("Burst")
        .Options({
            Name: "HIT_C2",
            Element: stats.stat.CRYO_DMG,
            Talent: stats.stat.ELEMENTAL_BURST_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.ELEMENTAL_1,
                    Talent: stats.stat.ELEMENTAL_BURST_LEVEL,
                    Stat: stats.stat.ATK,
                    Initial: 1.123,
                },
            ],
        })
        .Build()
})

export const c3 = effect.Factory({
    Name: "AyakaC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "AyakaC4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Enemy(stats.stat.DEFREDUCTION)
        .Values(0.3)
        .Build()
})

export const c5 = effect.Factory({
    Name: "AyakaC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "AyakaC6",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.CHARGED_ATTACK_DMG)
        .Values(2.98)
        .Build()
})