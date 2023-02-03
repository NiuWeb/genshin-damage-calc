import { effect, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "NilouC1",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ALL_DMG)
        .Instance("HIT_E_3_1")
        .Values(0.65)
        .Build()
})

export const c2 = effect.Factory({
    Name: "NilouC2",
    ApplyOther: true,
    Conditions: ["BLOOM"],
    MaxConditions: 1,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 1 } })
        .stat
        .Enemy(stats.stat.HYDRO_RES)
        .Values(-0.35)
        .Next()
        .Where({ owner: { ascension: 1 }, effect: { conditions: ["BLOOM"] } })
        .stat
        .Enemy(stats.stat.DENDRO_RES)
        .Values(-0.35)
        .Build()
})

export const c3 = effect.Factory({
    Name: "NilouC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "NilouC4",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_BURST_DMG)
        .Values(0.5)
        .Build()
})

export const c5 = effect.Factory({
    Name: "NilouC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "NilouC6",
    OnApply: new effect.Builder()
        .observe.Target(stats.stat.HP_PERCENT, stats.stat.HP_BASE, stats.stat.HP_FLAT)
        .stat
        .Char(stats.stat.CRIT_RATE)
        .Values(0.6 / 100)
        .Map((v, target) => (
            Math.max(0, Math.min(0.3,
                v * target.GetCharacter().Get(stats.stat.HP) / 1000
            ))
        ))
        .Next()
        .observe.Target(stats.stat.HP_PERCENT, stats.stat.HP_BASE, stats.stat.HP_FLAT)
        .stat
        .Char(stats.stat.CRIT_DMG)
        .Values(1.2 / 100)
        .Map((v, target) => (
            Math.max(0, Math.min(0.6,
                v * target.GetCharacter().Get(stats.stat.HP) / 1000
            ))
        ))
        .Build()
})